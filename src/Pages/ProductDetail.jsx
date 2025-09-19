import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import Cards from "../Components/Cards";
import { Check, Copy, Download } from "lucide-react";
import { FaShare, FaShareAlt } from "react-icons/fa";
import MaxProfitCounter from "../Components/MaxProfitCounter";

const ProductDetail = () => {
  const downloadZip = async () => {
    const zip = new JSZip();

    // Add product text
    zip.file("product-title.txt", productTitle);
    zip.file("product-description.txt", productDescription);

    // Add images
    const imgFolder = zip.folder("images");
    for (let i = 0; i < images.length; i++) {
      const imgData = await fetch(images[i]).then((res) => res.blob());
      imgFolder.file(`image-${i + 1}.jpg`, imgData);
    }

    // Generate the zip
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "product.zip");
    });
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [copiedField, setCopiedField] = useState(""); // "title" or "content"

  const images = [
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/1/200/300",
  ];

  const productTitle =
    "Amazing Product of the same that need to longer than wha";
  const productDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
condimentum tortor sem, in semper nisl bibendum eu. Proin vitae
vehicula arcu. Vestibulum ante ipsum primis in faucibus orci
luctus et ultrices posuere cubilia curae;tus et ultrices posuere cubilia curtus et ultrices posuere cubilia cur
tus et ultrices posuere cubilia curtus et ultrices posuere cubilia cur
 Mauris varius turpis tus et ultrices posuere cubilia cur
 Mauris varius turpis tus et ultrices posuere cubilia cur
 Mauris varius turpis tus et ultrices posuere cubilia cur
nec lacus facilisis, eget tincidunt lorem bibendum.`;

  const handleCopy = (text, field) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedField(field);
        setTimeout(() => setCopiedField(""), 3000); // reset after 3s
      })
      .catch((err) => console.error("Failed to copy!", err));
  };

  return (
    <div className="md:mx-40 p-4 md:my-10 grid gap-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Main Image */}
          <img
            src={images[selectedImage]}
            alt={`Product ${selectedImage}`}
            className="w-full h-auto md:max-h-[500px] max-h-[400px] object-cover rounded-xl mb-4"
          />

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 md:w-30 md:h-30 rounded-lg overflow-hidden ${
                  selectedImage === index ? "border-3 border-green-500" : "border-white"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          {/* Product Infos */}
          <div className="bg-white rounded-3xl p-4">
            <div className="divide-y-1 divide-gray-100">
              {/* Title with copy button */}
              <div className="relative flex items-start mb-2 space-x-2 pt-8 pb-5">
                <h1 className="text-1xl md:text-lg font-bold text-gray-800">
                  {productTitle}
                </h1>
                <button
                  onClick={() => handleCopy(productTitle, "title")}
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

              {/* Description with copy button */}
              <div className="relative flex items-start mb-2  rounded-2xl pb-4">
                {/* Scrollable descripiton */}
                <div className="flex-1 relative">
                  <div className="max-h-[15em] overflow-y-auto pr-2 scrollbar-hide">
                    <p className="text-gray-600 whitespace-pre-wrap pt-8">
                      {productDescription}
                    </p>
                  </div>
                  {/* Bottom fade overlay */}
                  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[3.5em] bg-gradient-to-t from-white to-transparent"></div>

                  {/* Top fade overlay */}
                  <div className="pointer-events-none absolute top-0 left-0 w-full h-[3.5em] bg-gradient-to-b from-white to-transparent"></div>
                </div>

                {/* Copy button */}
                <button
                  onClick={() => handleCopy(productDescription, "content")}
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
            <div>
        <div className="flex divide-x-2 divide-gray-100 mb-6">
          <div className="w-1/2 text-left">
            <p className="text-gray-400">Base Price</p>
            <p className="font-bold text-lg text-gray-700">500 ETB</p>
          </div>
          <div className="w-1/2 text-right">
            <p className="text-gray-400">Max Retail</p>
            <p className="font-bold text-lg text-gray-700">800 ETB</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <p className="text-gray-400 font-medium text-center">
              Max Profit
              <span className="font-bold text-3xl text-green-400 block">
                <MaxProfitCounter />
              </span>
            </p>
          </div>
        </div>
      </div>
          </div>

          <div className="flex col-end-2 gap-2">
            <button
              onClick={downloadZip}
              className="flex justify-center w-3xl gap-3 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition font-medium mt-4"
            >
              <Download /> Download Zip File
            </button>
            <button
              onClick={""}
              className="flex justify-center gap-3 text-green-500 py-3 px-6 rounded-xl border-2 border-green-500 hover:bg-green-100 transition font-medium mt-4"
            >
              <FaShare size={24} />
            </button>
          </div>
        </div>
      </div>

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
