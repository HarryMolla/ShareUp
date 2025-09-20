import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "" });
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Auth listener
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/login");
      } else {
        setUser(session.user);
        console.log("Logged-in user:", session.user); // 🔍 Debug
        fetchProducts(session.user.id);
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Fetch products
  const fetchProducts = async (userId) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching products:", error);
    else {
      console.log("Fetched products:", data); // 🔍 Debug
      setProducts(data);
    }
  };

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => setThumbnail(e.target.files[0]);
  const handleGalleryChange = (e) => setGallery(Array.from(e.target.files).slice(0, 7));

  // Upload file
  const uploadFile = async (file, path) => {
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file, { cacheControl: "3600", upsert: true });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from("product-images")
      .getPublicUrl(path);

    return publicUrl;
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { title, description, price, category } = form;

    if (!title || !description || !price || !category || !thumbnail) {
      alert("Please fill in all fields and upload a thumbnail.");
      return;
    }

    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert("Price must be a positive number.");
      return;
    }

    try {
      setSubmitting(true);

      // Upload thumbnail
      const thumbnailUrl = await uploadFile(
        thumbnail,
        `thumbnails/${user.id}-${Date.now()}-${thumbnail.name}`
      );

      // Upload gallery
      const galleryUrls = await Promise.all(
        gallery.map((file, index) =>
          uploadFile(file, `gallery/${user.id}-${Date.now()}-${index}-${file.name}`)
        )
      );

      // 🔍 Log what we’re about to insert
      const insertPayload = {
        user_id: user.id,
        title,
        description,
        price: priceNumber,
        category,
        thumbnail_url: thumbnailUrl,
        gallery_urls: galleryUrls,
      };
      console.log("Inserting product:", insertPayload);

      // Insert into DB
      const { data, error } = await supabase
        .from("products")
        .insert([insertPayload])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error); // 🔍 Debug
      } else {
        console.log("Inserted product:", data); // 🔍 Debug
        setProducts([data, ...products]);
        setForm({ title: "", description: "", price: "", category: "" });
        setThumbnail(null);
        setGallery([]);
      }
    } catch (err) {
      console.error("Upload failed:", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error.message);
    else navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        {/* Add Product */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form className="space-y-4" onSubmit={handleAddProduct}>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="number"
              name="price"
              placeholder="Price (USD)"
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              step="0.01"
              min="0"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />

            <div>
              <label className="block mb-1 font-semibold">Thumbnail</label>
              <input type="file" accept="image/*" onChange={handleThumbnailChange} />
              {thumbnail && <p className="text-gray-500 mt-1">{thumbnail.name}</p>}
            </div>

            <div>
              <label className="block mb-1 font-semibold">Gallery (max 7)</label>
              <input type="file" accept="image/*" multiple onChange={handleGalleryChange} />
              {gallery.length > 0 && (
                <p className="text-gray-500 mt-1">{gallery.length} file(s) selected</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`py-2 px-4 text-white rounded-xl transition ${
                submitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitting ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Your Products</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">No products added yet.</p>
          ) : (
            <ul className="space-y-4">
              {products.map((p) => (
                <li key={p.id} className="border p-4 rounded-lg">
                  <h3 className="font-bold">{p.title}</h3>
                  <p>{p.description}</p>
                  <p>${p.price.toFixed(2)}</p>
                  <p className="text-gray-400">{p.category}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
