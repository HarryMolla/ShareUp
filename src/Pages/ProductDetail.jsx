import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import Cards from "../Components/Cards";
import { Check, Copy, Download, Forward, Truck } from "lucide-react";
import { FaShare } from "react-icons/fa";
import MaxProfitCounter from "../Components/MaxProfitCounter";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [copiedField, setCopiedField] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Product not found in Firestore");
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const downloadZip = async () => {
    if (!product) return;
    const zip = new JSZip();

    zip.file("product-title.txt", product.title);
    zip.file("product-description.txt", product.description);

    // Add images
    const imgFolder = zip.folder("images");
    const allImages = product.gallery_urls?.length
      ? product.gallery_urls
      : [product.thumbnail_url];

    for (let i = 0; i < allImages.length; i++) {
      const imgData = await fetch(allImages[i]).then((res) => res.blob());
      imgFolder.file(`image-${i + 1}.jpg`, imgData);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${product.title.replace(/\s+/g, "_")}.zip`);
    });
  };

  // -------------------- Copy Text Handlers --------------------
  const handleCopy = (text, field) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedField(field);
        setTimeout(() => setCopiedField(""), 3000);
      })
      .catch((err) => console.error("Failed to copy!", err));
  };

  // -------------------- Render --------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] text-gray-500">
        Loading product details…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] text-gray-500">
        Product not found.
      </div>
    );
  }

  // Use gallery URLs if available, otherwise fallback to single thumbnail
  const images = product.gallery_urls?.length
    ? product.gallery_urls
    : [product.thumbnail_url];

  return (
    <div className="md:mx-10 p-4 md:my-5 grid gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Photos */}
        <div className="flex flex-col md:flex-row gap-3 w-full">
          {/* Thumbnails */}
          <div className="order-2 md:order-1 flex md:flex-col overflow-x-auto md:overflow-y-auto md:max-h-[80vh] scroll-smooth scrollbar-hide">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                aria-label={`Select image ${index + 1}`}
                aria-selected={selectedImage === index}
                className={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border-3 ${
                  selectedImage === index
                    ? "border-green-500"
                    : "border-gray-300/0"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="order-1 md:order-2 flex-1 rounded-xl overflow-hidden mt-4 md:mt-0">
            <img
              src={images[selectedImage]}
              alt={`Product ${selectedImage + 1}`}
              className="md:w-[80vh] w-full md:h-[80vh] object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 justify-between w-full gap-3">
          {/* Product Infos */}
          <div className="rounded-2xl bg-white p-4 md:h-[80vh] h-[50vh]">
            <div className="divide-y-1 divide-gray-100">
              {/* Title */}
              <div className="relative flex items-start mb-2 space-x-2 pt-8 pb-5">
                <h1 className="text-1xl md:text-md font-bold text-gray-600 line-clamp-2">
                  {product.title}
                </h1>
                <button
                  onClick={() => handleCopy(product.title, "title")}
                  className="absolute top-0 right-0 flex items-center gap-2 border border-gray-100 hover:bg-gray-50 text-gray-800 px-2 py-1 rounded-lg text-sm transition"
                >
                  {copiedField === "title" ? (
                    <>
                      <Check size={14} className="text-green-600" />
                      <span className="text-green-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Description */}
              <div className="relative flex items-start mb-2 rounded-2xl pb-4">
                <div className="flex-1 relative">
                  <div className="md:h-105 h-55 overflow-y-auto pr-2 scrollbar-hide">
                    <p className="text-gray-600 whitespace-pre-wrap pt-8">
                      {product.description}
                    </p>
                  </div>
                  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[3.5em] bg-gradient-to-t from-white to-transparent"></div>
                  <div className="pointer-events-none absolute top-0 left-0 w-full h-[3.5em] bg-gradient-to-b from-white to-transparent"></div>
                </div>
                <button
                  onClick={() => handleCopy(product.description, "content")}
                  className="absolute top-1 right-0 flex items-center gap-1 border border-gray-100 hover:bg-gray-50 text-gray-800 px-2 py-1 rounded-lg text-sm transition"
                >
                  {copiedField === "content" ? (
                    <>
                      <Check size={14} className="text-green-600" />
                      <span className="text-green-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy text</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Numbers and others */}
          <div className="flex flex-col p-4 bg-white rounded-2xl justify-between gap-4">
            {/* Prices & Max Profit */}
            <div className="grid gap-2 divide-y-1 divide-gray-200 border border-gray-200 rounded-lg p-4">
              <div className="grid gap-1">
                <div className="flex justify-between">
                  <p className="text-gray-400">Base Price</p>
                  <p className="font-bold text-lg text-gray-500">
                    {product.base_price} ETB
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-400">Max Retail</p>
                  <p className="font-bold text-lg text-gray-500">
                    {product.max_price} ETB
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-400">Max Profit</p>
                <p className="font-bold text-2xl text-green-500">
                  <MaxProfitCounter
                    base={product.base_price}
                    max={product.max_price}
                  />
                </p>
              </div>
            </div>
            <div className="grid h-fit p-4 rounded-lg border border-gray-200 gap-4">
              <div className="flex justify-between h-fit">
                <p className="flex gap-2 items-center font-medium text-gray-600 text-md">
                  <span className="p-1 bg-green-50 rounded-sm text-green-500">
                    <Truck />
                  </span>
                  Shipping
                </p>
                <p className="py-1 px-3 bg-green-100 rounded-lg text-green-500">
                  Free Delivery
                </p>
              </div>
              <div className="flex justify-between h-fit">
                <p className="flex gap-2 items-center font-medium text-gray-600 text-md">
                  <span className="p-1 bg-green-50 rounded-sm text-green-500">
                    <Truck />
                  </span>
                  Shipping
                </p>
                <p className="py-1 px-3 bg-green-100 rounded-lg text-green-500">
                  Free Delivery
                </p>
              </div>
              <div className="flex justify-between h-fit">
                <p className="flex gap-2 items-center font-medium text-gray-600 text-md">
                  <span className="p-1 bg-green-50 rounded-sm text-green-500">
                    <Truck />
                  </span>
                  Shipping
                </p>
                <p className="py-1 px-3 bg-green-100 rounded-lg text-green-500">
                  Free Delivery
                </p>
              </div>
            </div>
            {/* Buttons */}
            <div className="grid col-1 w-full gap-2 h-fit">
              <button
                onClick={downloadZip}
                className="flex justify-center gap-3 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-medium"
              >
                <Download /> Download Zip File
              </button>
              <button
                onClick={() => console.log("Share clicked")}
                className="flex justify-center gap-3 text-green-500 py-3 rounded-xl border-2 border-green-500 hover:bg-green-100 transition font-medium"
              >
                <Forward size={24} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h1 className="text-1xl md:text-2xl font-bold mb-10">
          Related Products
        </h1>
        <Cards />
      </div>
    </div>
  );
};

export default ProductDetail;
