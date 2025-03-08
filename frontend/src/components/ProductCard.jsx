import React, { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useNavigate } from "react-router-dom";
 
const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
 
  const handleAddToCart = () => {
     if (user===null) {
      navigate('/login')
      return;
    } else {
       addToCart(product);
    }
  };


  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border-[1px] shadow-none bg-white">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="object-cover w-full"
          src={product.image}
          alt="product image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-black">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-black">
              ${product.price}
            </span>
          </p>
        </div>
        <button
          className={`flex items-center justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-black ${
            product.quantity === 0
              ? "bg-gray-400 cursor-not-allowed opacity-50"
              : "bg-black hover:rounded-full"
          }`}
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
        >
          {product.quantity === 0 ? (
            ""
          ) : (
            <ShoppingCart size={22} className="mr-2" />
          )}
          {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

     
    </div>
  );
};

export default ProductCard;
