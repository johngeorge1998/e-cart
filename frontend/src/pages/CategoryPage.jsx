import { useState, useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import {
  ArrowDown01,
  ArrowUp10,
  Search,
} from "lucide-react";

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceOrder, setPriceOrder] = useState("asc");

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

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

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-black mt-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.h1>

          <div className="flex items-center space-x-20">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
                className="block w-full sm:w-auto px-3 py-2 pl-10 bg-[#f5f5f5] border-b-2 border-[#000] rounded-none shadow-none placeholder-gray-600 text-[#000] focus:outline-none focus:ring-0 focus:border-black sm:text-sm"
              />
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                <Search size={20} className="text-black" />
              </div>
            </div>

            <div
              className="flex items-center cursor-pointer gap-2"
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

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filteredProducts.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
              No products found
            </h2>
          )}

          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;