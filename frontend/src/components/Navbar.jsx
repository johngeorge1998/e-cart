import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
 	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	return (
		<header className='fixed top-0 left-0 w-full bg-[#000] bg-opacity-90 backdrop-blur-md shadow-2xl z-40 transition-all duration-300 border-b border-emerald-800'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex flex-wrap justify-between items-center'>
					
					
					
					<Link to='/' className='text-2xl font-bold text-white items-center space-x-2 flex'>
					{user&&
						<p className="text-[14px] font-light">Welcome, <span className="text-[16px] font-semibold ml-1">{user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ''}
						</span></p>
						}
					</Link>

					<nav className='flex flex-wrap items-center gap-4'>
						<Link
							to={"/"}
							className='flex items-center gap-2 text-[14px] text-white hover:animate-pulse transition duration-300
					 ease-in-out'
						>
							<Home className="h-4 w-4"/>Home
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='gap-2 text-[14px] flex items-center relative group text-white hover:animate-pulse transition duration-300 
							ease-in-out'
							>
								<ShoppingCart className='h-4 w-4   group-hover:animate-pulse' size={20} />
								<span className='hidden sm:inline'>Cart</span>
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -left-2 bg-white text-black rounded-full px-[6px]  
									text-xs group-hover:bg-[#f5f5f5] transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className='text-[14px] hover:animate-pulse text-white px-1 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block  h-4 w-4 mr-2'  />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='text-[14px] hover:animate-pulse hover:text-red-300 text-white py-2 px-0 
						rounded-md flex items-center transition duration-300 ease-in-out'
								onClick={logout}
							>
								<LogOut className="h-4 w-4" />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
										className='text-[14px] hover:animate-pulse hover:text-yellow-600 text-white py-2 px-0 
						rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='text-[14px] hover:animate-pulse hover:text-green-300 text-white py-2 px-0 
						rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;