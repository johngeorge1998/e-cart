import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { useOrderStore } from "../stores/useOrderStore";
import { useUserStore } from "../stores/useUserStore";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Edit3, MoveRight } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

const OrderSummary = () => {
  const { cart, total } = useCartStore();
  const { createOrder, loading } = useOrderStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(user?.address || {});

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveAddress = () => {
    setIsEditing(false);
    toast.success("Address updated successfully!");
  };

  const handleProceedToCheckout = async () => {
    if (!user) {
      toast.error("User is not logged in!");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = {
      userId: user._id,
      products: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      totalAmount: total,
      address: address,
    };

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
      className="space-y-4 rounded-lg bg-white border-[1px] p-4 shadow-none sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
     {!isEditing &&(<p className="text-xl font-semibold text-black">Order summary</p>)}
    { !isEditing &&(<div className="border-t border-gray-600"></div>)}

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <p className={`${isEditing?'text-xl':'text-base'} font-semibold text-black ${isEditing ? 'mb-1' : ''}`}>
                {isEditing? "Change Delivery Address":"Delivery Address"}
              </p>
 
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-green-400 hover:text-green-300"
                >
                  <Edit3 className="h-5 w-5" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="streetAddress"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    value={address.streetAddress}
                    onChange={handleAddressChange}
                    className=" block w-full px-3 py-2 pl-5 bg-[#fff] border border-[#c5c5c5] 
									rounded-lg shadow-sm
									 placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black 
									 focus:border-black sm:text-sm"
                    placeholder="Enter your street address"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className=" block w-full px-3 py-2 pl-5 bg-[#fff] border border-[#c5c5c5] 
                    rounded-lg shadow-sm
                     placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black 
                     focus:border-black sm:text-sm"
                    placeholder="Enter your city"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="province"
                  >
                    Province
                  </label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    value={address.province}
                    onChange={handleAddressChange}
                    className=" block w-full px-3 py-2 pl-5 bg-[#fff] border border-[#c5c5c5] 
                    rounded-lg shadow-sm
                     placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black 
                     focus:border-black sm:text-sm"
                    placeholder="Enter your province"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="postalCode"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={address.postalCode}
                    onChange={handleAddressChange}
                    className=" block w-full px-3 py-2 pl-5 bg-[#fff] border border-[#c5c5c5] 
                    rounded-lg shadow-sm
                     placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black 
                     focus:border-black sm:text-sm"
                    placeholder="Enter your postal code"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <div className="mt-1 relative rounded-xl shadow-sm">
                    <select
                      id="country"
                      required
                      name="country"
                      value={address.country}
                      onChange={handleAddressChange}
                      className="block w-full px-3 py-2 pl-5 bg-[#fff] border border-[#c5c5c5]  
                    rounded-lg shadow-sm placeholder-gray-600 text-[#000] focus:outline-none 
                    focus:ring-black focus:border-black sm:text-sm appearance-none"
                    >
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveAddress}
                  className="flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:rounded-full focus:outline-none focus:ring-4 focus:ring-black mb-2 mt-7"
                >
                  Save Address
                </button>
              </div>
            ) : (
              <div className="text-base font-normal text-gray-700">
                <p>{address.streetAddress}</p>
                <p>
                  {address.city}, {address.province}, {address.postalCode},{" "}
                  {address.country}
                </p>
              </div>
            )}
          </div>

         { !isEditing && (<><dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-700">
              Original price
            </dt>
            <dd className="text-base font-medium text-black">${(total.toFixed(2))}</dd>
          </dl><dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
              <dt className="text-base font-bold text-black">Total</dt>
              <dd className="text-base font-bold text-black">${total.toFixed(2)}</dd>
            </dl></>)}
        </div>

       {!isEditing &&( <><motion.button
          className="flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:rounded-full focus:outline-none focus:ring-4 focus:ring-black"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProceedToCheckout}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Proceed to Checkout"}
        </motion.button><div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-400">or</span>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-black underline hover:text-gray-700 hover:no-underline"
            >
              Continue Shopping
              <MoveRight size={16} />
            </Link>
          </div></>)}
      </div>
    </motion.div>
  );
};

export default OrderSummary;
