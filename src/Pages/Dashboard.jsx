import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  collection, 
  serverTimestamp, 
  addDoc 
} from "firebase/firestore";
import { 
  auth, 
  db 
} from "../firebase";
import { 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";
import axios from "axios";

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
import MaxProfitCounter from "../Components/MaxProfitCounter";

function Dashboard() {
  const navigate = useNavigate();
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
  const [open, setOpen] = useState(false);

  const categories = [
    { name: "Electronics", icon: Monitor },
    { name: "Clothing", icon: Shirt },
    { name: "Accessories", icon: Package },
    { name: "Home Appliances", icon: Coffee },
    { name: "Beauty & Personal Care", icon: Heart },
    { name: "Toys & Games", icon: ToyBrick },
  ];

  // Cloudinary config
  const CLOUD_NAME = "dfreutetj";
  const UPLOAD_PRESET = "wpzosuaq";

  // -------------------- Auth & Firestore listener --------------------
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);

        const q = query(
          collection(db, "products"),
          where("user_id", "==", currentUser.uid),
          orderBy("created_at", "desc")
        );

        const unsubscribeProducts = onSnapshot(
          q,
          (snapshot) => {
            const productList = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setProducts(productList);
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching products:", error);
            setMessage({ type: "error", text: "Failed to fetch products." });
            setLoading(false);
          }
        );

        return () => unsubscribeProducts();
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  // -------------------- Handlers --------------------
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
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
  const sanitizeFileName = (name) => name.replace(/[^a-z0-9.-]/gi, "_").toLowerCase();

  // -------------------- Cloudinary Upload --------------------
  const uploadFileToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  };

  // -------------------- Form Validation --------------------
  const validateForm = () => {
    const { title, description, base_price, max_price, category } = form;
    if (!title || !description || !base_price || !max_price || !category || !thumbnail) {
      return "Please fill in all fields and upload a thumbnail.";
    }
    const base = Number(base_price);
    const max = Number(max_price);
    if (isNaN(base) || base <= 0) return "Base price must be a positive number.";
    if (isNaN(max) || max <= 0) return "Max price must be a positive number.";
    if (max < base) return "Max price must be greater than base price.";
    return null;
  };

  // -------------------- Add Product --------------------
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

      // Upload images to Cloudinary
      const thumbnailUrl = await uploadFileToCloudinary(thumbnail);
      const galleryUrls = await Promise.all(
        gallery.map((file) => uploadFileToCloudinary(file))
      );

      const productData = {
        user_id: user.uid,
        title: form.title,
        description: form.description,
        base_price: Number(form.base_price),
        max_price: Number(form.max_price),
        category: form.category,
        thumbnail_url: thumbnailUrl,
        gallery_urls: galleryUrls,
        created_at: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "products"), productData);

      setProducts([{ id: docRef.id, ...productData }, ...products]);
      setForm({ title: "", description: "", base_price: "", max_price: "", category: "" });
      setThumbnail(null);
      setGallery([]);
      setMessage({ type: "success", text: "Product added successfully!" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Upload failed. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  // -------------------- Logout --------------------
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // -------------------- Render --------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full py-6">
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

        {/* -------------------- Add Product Form -------------------- */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            {/* Product inputs (title, description, prices, category) */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                  Product Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Wireless Mouse"
                  required
                  className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>

              <div className="relative w-full">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                  Category
                </label>
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="w-full border-2 border-gray-200 text-gray-900 text-sm rounded-lg p-2.5 text-left flex justify-between items-center"
                >
                  {form.category || "Select a category"}
                  <ChevronDownIcon size={18} />
                </button>
                {open && (
                  <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {categories.map((cat) => (
                      <li
                        key={cat.name}
                        onClick={() => {
                          setForm({ ...form, category: cat.name });
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
                <label htmlFor="base_price" className="block mb-2 text-sm font-medium text-gray-900">
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
                  placeholder="1000"
                  required
                  className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>

              <div>
                <label htmlFor="max_price" className="block mb-2 text-sm font-medium text-gray-900">
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
                  placeholder="1200"
                  required
                  className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter product details"
                required
                className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
              className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-4 w-full"
            >
              {submitting ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-3 rounded-xl gap-5">
          {products.length === 0 ? (
            <p className="text-gray-500">No products added yet.</p>
          ) : (
            products.map((p) => (
              <NavLink key={p.id} to={`/productdetail/${p.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img className="w-full h-full object-cover object-center" src={p.thumbnail_url} alt={p.title} />
                  </div>
                  <div className="px-4 pb-6 pt-4">
                    <h1 className="text-lg font-bold text-gray-700 line-clamp-1">{p.title}</h1>
                    <p className="text-gray-400 line-clamp-1">{p.description}</p>
                    <div className="flex divide-x-2 divide-gray-100 justify-between mt-4">
                      <div className="w-1/2 text-left">
                        <p className="text-gray-400">Base Price (ETB)</p>
                        <p className="font-medium text-lg text-gray-700">{p.base_price}</p>
                      </div>
                      <div className="w-1/2 text-right">
                        <p className="text-gray-400">Max Retail (ETB)</p>
                        <p className="font-medium text-lg text-gray-700">{p.max_price}</p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <p className="text-gray-400 font-normal text-center">
                        Max Profit <MaxProfitCounter base={p.base_price} max={p.max_price} />
                      </p>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
