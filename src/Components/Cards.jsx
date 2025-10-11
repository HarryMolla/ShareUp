import { NavLink } from "react-router-dom";
import MaxProfitCounter from "./MaxProfitCounter";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Categories from "./Categories";
import Search from "./Search";

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // search state
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch products
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("created_at", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        setMessage({ type: "error", text: "Failed to fetch products." });
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Filter products whenever category OR search query changes
  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      updatedProducts = updatedProducts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, products, searchQuery]);

  if (loading) return <p>Loading...</p>;
  if (message?.type === "error") return <p>{message.text}</p>;

  return (
    <div className="grid gap-10 justify-items-center">
      {/* Search */}
      <Search onSearch={setSearchQuery} />

      {/* Categories */}
      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Products */}
      <div className="grid md:grid-cols-3 rounded-xl md:gap-6 gap-4">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">
            No products found for "{selectedCategory}"{searchQuery && ` and "${searchQuery}"`}
          </p>
        ) : (
          filteredProducts.map(p => (
            <NavLink key={p.id} to={`/productdetail/${p.id}`}>
              <div className="overflow-hidden bg-white rounded-2xl hover:shadow-2xl transform transition-shadow duration-300">
                <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden">
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-900 hover:scale-115"
                    src={p.thumbnail_url}
                    alt={p.title}
                  />
                </div>

                <div className="px-4 pb-6 pt-4">
                  <h1 className="text-lg font-bold text-gray-700 line-clamp-1">{p.title}</h1>
                  <p className="text-gray-400 line-clamp-1">{p.description}</p>

                  <div className="flex divide-x-2 divide-gray-100 justify-between mt-4">
                    <div className="w-1/2 text-left">
                      <p className="text-gray-400">Base Price</p>
                      <p className="font-medium text-lg text-gray-700">{p.base_price} ETB</p>
                    </div>
                    <div className="w-1/2 text-right">
                      <p className="text-gray-400">Max Retail</p>
                      <p className="font-medium text-lg text-gray-700">{p.max_price} ETB</p>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <p className="text-gray-400 font-normal text-center">
                      Max Profit{" "}
                      <span className="text-3xl font-bold text-green-500">
                        <MaxProfitCounter base={p.base_price} max={p.max_price} />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default Cards;
