import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useProductStore } from "../stores/useProductStore";
import { useEffect, useState } from "react";

const CartItem = ({ item }) => {
 	const { removeFromCart, updateQuantity } = useCartStore();
	const { products,fetchAllProducts } = useProductStore();
	const [cartItemQuantity, setCartItemQuantity] = useState(null)
  
	useEffect(() => {
 		fetchAllProducts();
	}, [fetchAllProducts]);

	useEffect(() => {
 		if (products.length > 0) {
			const currentProduct = products.find((product) => product._id === item._id);
			setCartItemQuantity(currentProduct?.quantity || 0);
		}
	}, [products, item._id]);
	
	return (
		<div className='rounded-lg  p-4 shadow-sm border-[1px] bg-white md:p-6 relative'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				<div className='shrink-0 md:order-1'>
					<img className='h-20 md:h-32 rounded object-cover border-[1px] hover:shadow-lg hover:border-none' src={item.image} />
				</div>
				<label className='sr-only text-black'>Choose quantity:</label>

				<div className='flex items-center justify-between md:order-3 md:justify-end'>
					<div className='flex items-center gap-2'>
						<button
							className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1px]
							 border-gray-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2
							  focus:ring-gray-900'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className='text-black' />
						</button>
						<p className="text-black">{item.quantity}</p>
						<button
							className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1px]
							 border-gray-600 bg-white hover:bg-gray-100 focus:outline-none 
						focus:ring-2 focus:ring-gray-600'
						onClick={() => {
							if (item.quantity < cartItemQuantity) {
								updateQuantity(item._id, item.quantity + 1)
							}
						}}
						disabled={item.quantity >= cartItemQuantity}
						>
							<Plus className='text-black' />
						</button>
					</div>
					

					<div className='text-end md:order-4 md:w-32'>
						<p className='text-base font-bold text-black'>${(item.price * item.quantity).toFixed(2)}
						</p>
					</div>
					
				</div>

				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
					<div className="flex items-center justify-between">
						<p className='text-[18px] font-semibold text-black hover:text-gray-600 hover:underline'>
							{item.name}
						</p>
						<div className='flex items-center gap-4'>
							<button
								className='absolute right-5 text-sm font-medium text-red-500
								 hover:text-red-700 hover:underline'
								onClick={() => removeFromCart(item._id)}
							>
								<Trash className="h-5 w-5"/>
							</button>
						</div>
						
					</div>
					<p className='text-sm text-gray-700'>{item.description}</p>

					
				</div>
			</div>
		</div>
	);
};
export default CartItem;