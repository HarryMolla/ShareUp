import { Monitor, Shirt, Package, Coffee, Heart, ToyBrick } from "lucide-react";

const Categories = () => {
  const categories = [
    { name: "Electronics", icon: Monitor },
    { name: "Clothing", icon: Shirt },
    { name: "Accessories", icon: Package },
    { name: "Home Appliances", icon: Coffee },
    { name: "Beauty & Personal Care", icon: Heart },
    { name: "Toys & Games", icon: ToyBrick },
  ];

  return (
    <div className="flex gap-2 flex-wrap mt-8 overflow-hidden">
      <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full hover:bg-green-100 text-gray-600 border border-gray-200">
        All
      </button>
      {categories.map((cat, idx) => {
        const Icon = cat.icon;
        return (
          <button
            key={idx}
            className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full hover:bg-green-100 text-gray-600 border border-gray-200"
          >
            <Icon className="w-5 h-5" />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
