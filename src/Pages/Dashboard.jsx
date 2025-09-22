import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import {
  Monitor,
  Shirt,
  Package,
  Coffee,
  Heart,
  ToyBrick,
  ChevronDownIcon,
  CloudUpload,
} from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    base_price: "",
    max_price: "",
    category: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const categories = [
    { name: "Electronics", icon: Monitor },
    { name: "Clothing", icon: Shirt },
    { name: "Accessories", icon: Package },
    { name: "Home Appliances", icon: Coffee },
    { name: "Beauty & Personal Care", icon: Heart },
    { name: "Toys & Games", icon: ToyBrick },
  ];

  const [open, setOpen] = useState(false);

  // Auth listener
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          navigate("/login");
        } else {
          setUser(session.user);
          fetchProducts(session.user.id);
          setLoading(false);
        }
      }
    );
    return () => authListener.subscription.unsubscribe();
  }, [navigate]);

  // Fetch products
  const fetchProducts = async (userId) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage({ type: "error", text: "Failed to fetch products." });
    } else {
      setProducts(data);
    }
  };

  // Input handlers
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleThumbnailChange = (e) => setThumbnail(e.target.files[0]);
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 7) {
      setMessage({
        type: "error",
        text: "You can only upload up to 7 gallery images.",
      });
    }
    setGallery(files.slice(0, 7));
  };

  // Sanitize file names
  const sanitizeFileName = (name) =>
    name.replace(/[^a-z0-9.-]/gi, "_").toLowerCase();

  // Upload file
  const uploadFile = async (file, path) => {
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file, { cacheControl: "3600", upsert: true });
    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(path);

    return publicUrl;
  };

  // Validation
  const validateForm = () => {
    const { title, description, base_price, max_price, category } = form;
    if (
      !title ||
      !description ||
      !base_price ||
      !max_price ||
      !category ||
      !thumbnail
    ) {
      return "Please fill in all fields and upload a thumbnail.";
    }
    const base = Number(base_price);
    const max = Number(max_price);
    if (isNaN(base) || base <= 0)
      return "Base price must be a positive number.";
    if (isNaN(max) || max <= 0) return "Max price must be a positive number.";
    if (max < base) return "Max price must be greater than base price.";
    return null;
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      setMessage({ type: "error", text: errorMsg });
      return;
    }

    try {
      setSubmitting(true);
      setMessage({ type: "", text: "" });

      // Always prefix with user.id to match policy
      const safeThumbName = sanitizeFileName(thumbnail.name);
      const thumbPath = `${user.id}/thumbnails/${Date.now()}-${safeThumbName}`;
      const thumbnailUrl = await uploadFile(thumbnail, thumbPath);

      const galleryUrls = await Promise.all(
        gallery.map((file, index) => {
          const safeName = sanitizeFileName(file.name);
          const path = `${user.id}/gallery/${Date.now()}-${index}-${safeName}`;
          return uploadFile(file, path);
        })
      );

      const insertPayload = {
        user_id: user.id,
        title: form.title,
        description: form.description,
        base_price: Number(form.base_price),
        max_price: Number(form.max_price),
        category: form.category,
        thumbnail_url: thumbnailUrl,
        gallery_urls: galleryUrls,
      };

      const { data, error } = await supabase
        .from("products")
        .insert([insertPayload])
        .select()
        .single();

      if (error) {
        setMessage({ type: "error", text: "Failed to add product." });
      } else {
        setProducts([data, ...products]);
        setForm({
          title: "",
          description: "",
          base_price: "",
          max_price: "",
          category: "",
        });
        setThumbnail(null);
        setGallery([]);
        setMessage({ type: "success", text: "Product added successfully!" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Upload failed. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full py-6 ">
      <div className="md:w-full md:mx-40 mx-4">
        <header className="grid md:grid-cols-2 gap-4 justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 
                       focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                       text-sm px-5 py-2.5 text-center"
          >
            Logout
          </button>
        </header>

        {/* Feedback */}
        {message.text && (
          <div
            className={`mb-6 p-3 rounded-lg text-sm font-medium ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Add Product Form */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg 
             focus:outline-none focus-border-2 focus:border-green-500 block w-full p-2.5"
                  placeholder="e.g. Wireless Mouse"
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative w-full">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Category
                </label>
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="w-full border-2 border-gray-200 text-gray-900 text-sm rounded-lg p-2.5 text-left flex justify-between items-center"
                >
                  {form.category || "Select a category"}
                  <span>
                    <ChevronDownIcon size={18} />
                  </span>
                </button>

                {open && (
                  <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {categories.map((cat) => (
                      <li
                        key={cat.name}
                        onClick={() => {
                          handleChange({
                            target: { name: "category", value: cat.name },
                          });
                          setOpen(false);
                        }}
                        className="px-4 py-2 m-2 rounded-md cursor-pointer hover:bg-gray-100"
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label
                  htmlFor="base_price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Base Price (ETB)
                </label>
                <input
                  type="number"
                  id="base_price"
                  name="base_price"
                  value={form.base_price}
                  onChange={handleChange}
                  step="1"
                  min="0"
                  className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg 
             focus:outline-none focus-border-2 focus:border-green-500 block w-full p-2.5"
                  placeholder="1000"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="max_price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Max Retail Price (ETB)
                </label>
                <input
                  type="number"
                  id="max_price"
                  name="max_price"
                  value={form.max_price}
                  onChange={handleChange}
                  step="1"
                  min="0"
                  className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg 
             focus:outline-none focus-border-2 focus:border-green-500 block w-full p-2.5"
                  placeholder="1200"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg 
             focus:outline-none focus-border-2 focus:border-green-500 block w-full p-2.5"
                placeholder="Enter product details"
                required
              />
            </div>

            {/* Thumbnail Upload */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Thumbnail
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center justify-center w-full h-35 border-2 
                 border-gray-200 border-dashed rounded-lg cursor-pointer
                 hover:bg-gray-50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudUpload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>
              {thumbnail && (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            {/* Gallery Upload */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Gallery (max 7)
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="gallery"
                  className="flex flex-col items-center justify-center w-full h-35 border-2 
                 border-gray-200 border-dashed rounded-lg cursor-pointer
                 hover:bg-gray-50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudUpload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF (MAX. 7 files)
                    </p>
                  </div>
                  <input
                    id="gallery"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Previews */}
              {gallery.length > 0 && (
                <div className="mt-2 md:flex md:justify-start gap-1 grid grid-cols-7 justify-between ">
                  {gallery.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-22 h-22 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 
                         focus:outline-none focus:ring-green-300 font-medium rounded-lg 
                         text-sm px-5 py-4 w-full text-center"
            >
              {submitting ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Your Products</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">No products added yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {products.map((p) => (
                <div key={p.id} className="border rounded-lg p-4 flex gap-4">
                  {p.thumbnail_url && (
                    <img
                      src={p.thumbnail_url}
                      alt={p.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{p.title}</h3>
                    <p className="text-gray-600 text-sm mb-1">
                      {p.description}
                    </p>
                    <p className="text-green-700 text-sm font-medium">
                      {p.base_price.toFixed(2)} ETB – {p.max_price.toFixed(2)}{" "}
                      ETB
                    </p>
                    <p className="text-gray-400 text-xs">{p.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
