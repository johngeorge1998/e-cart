import { useEffect, useState } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductCard from "../components/ProductCard";
import { ArrowDown01, ArrowUp10, Search } from "lucide-react";
 
const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/shirts", name: "Shirts", imageUrl: "/shirt.webp" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts,featuredProducts, products, isLoading, fetchAllProducts } =
    useProductStore();
    
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceOrder, setPriceOrder] = useState("asc");

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (priceOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products, priceOrder]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceOrderChange = () => {
    setPriceOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);


  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-start text-5xl sm:text-5xl font-bold text-black mb-4">
          Explore Our Categories
        </h1>
        <p className="text-start text-xl text-gray-600 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

		{!isLoading && featuredProducts.length > 0 && (
          <FeaturedProducts featuredProducts={featuredProducts} />
        )}

        <div className="flex items-center justify-between px-1">
          <p className="text-start text-3xl sm:text-3xl font-bold text-black mt-10">
            View All Products
          </p>
          <div className="flex items-center space-x-20">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
                className="block w-full sm:w-auto px-3 py-2 mt-5 pl-10 bg-[#f5f5f5] border-b-2 border-[#000] rounded-none shadow-none placeholder-gray-600 text-[#000] focus:outline-none focus:ring-0 focus:border-black sm:text-sm"
              />
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                <Search size={20} className="text-black mt-5" />
              </div>
            </div>

            <div
              className="flex items-center cursor-pointer gap-2 mt-5"
              onClick={handlePriceOrderChange}
            >
              <div className="text-black">Price</div>
              {priceOrder === "asc" ? (
                <ArrowUp10 size={20} className="text-black" />
              ) : (
                <ArrowDown01 size={20} className="text-black" />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 mt-8 gap-6">
          {filteredProducts.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
              No products found
            </h2>
          )}
          {filteredProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

       
      </div>
    </div>
  );
};
export default HomePage;