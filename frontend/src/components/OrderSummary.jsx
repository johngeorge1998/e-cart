import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { useOrderStore } from "../stores/useOrderStore";
import { useUserStore } from "../stores/useUserStore";

import { Link, useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
 import toast from "react-hot-toast";

const OrderSummary = () => {
  const { cart, total  } = useCartStore(); // Get cart data
  const { createOrder, loading } = useOrderStore(); // Access createOrder and loading state from Zustand
  const { user  } = useUserStore();
  const navigate = useNavigate();
  console.log('cart',cart);
  console.log('user',user);


  // Create order data
  const prepareOrderData = () => {
    return {
		userId:user._id,  
      products: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      totalAmount: total,
    };
  };

  // Handle the proceed to checkout
  const handleProceedToCheckout = async () => {
    if (!user) {
      toast.error("User is not logged in!");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = prepareOrderData();

    try {
      await createOrder(orderData); 
      toast.success("Order placed successfully!");
      useCartStore.getState().clearCart();
      navigate("/purchase-success");
    
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <motion.div
      className='space-y-4 rounded-lg bg-white border-[1px] p-4 shadow-none sm:p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className='text-xl font-semibold text-black'>Order summary</p>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <dl className='flex items-center justify-between gap-4'>
            <dt className='text-base font-normal text-gray-700'>Original price</dt>
            <dd className='text-base font-medium text-black'>₹{total}</dd>
          </dl>

         

          <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
            <dt className='text-base font-bold text-black'>Total</dt>
            <dd className='text-base font-bold text-black'>₹{total}</dd>
          </dl>
        </div>

        <motion.button
          className='flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:rounded-full focus:outline-none focus:ring-4 focus:ring-black'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProceedToCheckout}
          disabled={loading}  
        >
          {loading ? "Placing Order..." : "Proceed to Checkout"}
        </motion.button>

        <div className='flex items-center justify-center gap-2'>
          <span className='text-sm font-normal text-gray-400'>or</span>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-sm font-medium text-black underline hover:text-gray-700 hover:no-underline'
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
