
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const getImageSrc = (categoryName) => {
    switch (categoryName) {
      case "Jeans":
        return "/jeans2.webp";
      case "Shirts":
        return "/shirt2.webp";
      case "Jackets":
        return "/jacket2.webp";
      case "Glasses":
        return "/glass2.webp";
      case "Suits":
        return "/suits2.avif";
      case "Bags":
        return "/bags2.jpeg";
      case "Shoes":
        return "/shoes2.webp";

      default:
        return "";
    }
  };

  return (
    <div className="relative overflow-hidden h-64 w-full rounded-lg group">
      <Link to={"/category" + category.href}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
          <div className="relative overflow-hidden group w-full h-full">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="absolute w-full h-full object-cover transition-transform duration-500 ease-out group-hover:-translate-x-full"
              loading="lazy"
            />

            <img
              src={getImageSrc(category.name)}
              alt={category.name}
              className="absolute w-full h-full object-cover transition-transform duration-500 ease-out translate-x-full group-hover:translate-x-0"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-white text-2xl font-bold mb-2">
              {category.name}
            </h3>
            <p className="text-gray-200 text-sm">Explore {category.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;