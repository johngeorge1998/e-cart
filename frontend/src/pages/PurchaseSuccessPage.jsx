import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
 import { Link } from "react-router-dom";
  import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
 

	 

	return (
		<div className='h-screen bg-[#f5f5f5] flex items-center justify-center px-4'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className='max-w-md w-full bg-[#f5f5f5] rounded-lg shadow-xl overflow-hidden relative z-10'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-black w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-black mb-2'>
						Purchase Successful!
					</h1>

					<p className='text-gray-700 text-center mb-2'>
						Thank you for your order. {"We're"} processing it now.
					</p>
					<p className='text-black text-center text-sm mb-6'>
						Check your email for order details and updates.
					</p>
					

					<div className='space-y-4'>
						<div
							className='w-full bg-[#f5f5f5]  text-black font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center'
						>
							<HandHeart className='mr-2' size={18} />
							Thanks for trusting us!
						</div>
						<Link
							to={"/"}
							className='w-full bg-black hover:rounded-full text-white font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center'
						>
							Continue Shopping
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;