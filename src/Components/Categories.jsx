import {
  Monitor,
  Shirt,
  Package,
  Coffee,
  Heart,
  ToyBrick,
} from "lucide-react";

const Categories = ({ selectedCategory = "All", onSelectCategory }) => {
  const categories = [
    { name: "All", icon: null },
    { name: "Electronics", icon: Monitor },
    { name: "Clothing", icon: Shirt },
    { name: "Accessories", icon: Package },
    { name: "Home Appliances", icon: Coffee },
    { name: "Beauty & Personal Care", icon: Heart },
    { name: "Toys & Games", icon: ToyBrick },
  ];

  const getButtonClasses = (categoryName) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200
     ${
       selectedCategory === categoryName
         ? "bg-green-100 text-green-600 border-green-300"
         : "bg-white text-gray-600 border-gray-200 hover:bg-green-50 hover:border-green-200 hover:text-green-500"
     }`;
     
  return (
  <div className="w-full overflow-x-auto scroll-smooth px-4 scrollbar-hidden scrollbar-hide md:justify-items-center">
    <div className="flex md:gap-2 gap-1 min-w-max">
      {categories.map((cat, idx) => {
        const Icon = cat.icon;
        return (
          <button
            key={idx}
            onClick={() => onSelectCategory(cat.name)}
            className={getButtonClasses(cat.name)}
          >
            {Icon && <Icon className="w-5 h-5" />}
            {cat.name}
          </button>
        );
      })}
    </div>
  </div>
);

};

export default Categories;
