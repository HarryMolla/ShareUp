import { NavLink } from "react-router-dom";
import MaxProfitCounter from "./MaxProfitCounter";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("created_at", "desc"));

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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (message?.type === "error") return <p>{message.text}</p>;

  return (
    <div className="grid md:grid-cols-3 rounded-xl md:gap-6 gap-4">
      {products.length === 0 ? (
        <p className="text-gray-500">No Products</p>
      ) : (
        products.map((p) => (
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
                <h1 className="text-lg font-bold text-gray-700 line-clamp-1">
                  {p.title}
                </h1>
                <p className="text-gray-400 line-clamp-1">{p.description}</p>
                <div className="flex divide-x-2 divide-gray-100 justify-between mt-4">
                  <div className="w-1/2 text-left">
                    <p className="text-gray-400">Base Price (ETB)</p>
                    <p className="font-medium text-lg text-gray-700">
                      {p.base_price}
                    </p>
                  </div>
                  <div className="w-1/2 text-right">
                    <p className="text-gray-400">Max Retail (ETB)</p>
                    <p className="font-medium text-lg text-gray-700">
                      {p.max_price}
                    </p>
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
  );
};

export default Cards;
