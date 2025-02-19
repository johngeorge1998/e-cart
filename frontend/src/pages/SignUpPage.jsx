
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader,
  CircleUser,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-[36px] font-extrabold text-black">
          JOIN US
        </h2>
      </motion.div>

      <motion.div
        className="mt-5 sm:mx-auto  sm:w-full sm:max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative bg-[#fff]  py-8 px-4 shadow-md  sm:rounded-xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-[14px]">
            <div>
              <label
                htmlFor="name"
                className="block text-[14px] text-gray-600 font-semibold"
              >
                Full name
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    className="h-5 w-5 text-black"
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-[#fff] border border-[#c5c5c5] rounded-lg shadow-none
									 placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="Enter Your Full Name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[14px] text-gray-600 font-semibold"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    className="h-5 w-5 text-black"
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className=" block w-full px-3 py-2 pl-10 bg-[#fff] border border-[#c5c5c5] 
									rounded-lg shadow-sm
									 placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black 
									 focus:border-black sm:text-sm"
                  placeholder="Enter Your Email Address"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-[14px] text-gray-600 font-semibold"
              >
                Role
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CircleUser
                    className="h-5 w-5 text-black"
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>
                <select
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-[#fff] border border-[#c5c5c5]  
                 rounded-lg shadow-sm placeholder-gray-600 text-[#000] focus:outline-none 
                 focus:ring-black focus:border-black sm:text-sm appearance-none"
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-[14px] text-gray-600 font-semibold"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    className="h-5 w-5 text-black"
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className=" block w-full px-3 py-2 pl-10 bg-[#fff] border border-[#c5c5c5] 
									rounded-lg shadow-sm placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="Enter Your Password"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[14px] text-gray-600 font-semibold"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    className="h-5 w-5 text-black"
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className=" block w-full px-3 py-2 pl-10 bg-[#fff] border
									 border-[#c5c5c5]  rounded-lg shadow-sm placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="Confirm Your Password"
                />
              </div>
            </div>

           <div className="flex items-end justify-end">
           	 <button
	              type="submit"
	              className="mt-6  w-full lg:w-[140px] flex justify-center items-center  py-[10px] px-4 border border-transparent 
								rounded-lg hover:rounded-full shadow-sm text-sm font-medium text-white bg-black
								 focus:outline-none focus:ring-2 focus:ring-offset-2
								  focus:ring-black transition duration-150 ease-in-out disabled:opacity-50"
	              disabled={loading}
	            >
	              {loading ? (
	                <>
	                  <Loader
	                    className="mr-2 h-5 w-5 animate-spin"
	                    aria-hidden="true"
	                  />
	                  Loading...
	                </>
	              ) : (
	                <>
	                  <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
	                  Sign up
	                </>
	              )}
	            </button>
           </div>
          </form>

          <p className="lg:-mt-8 mt-8 text-left text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black hover:text-gray-600"
            >
              Login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default SignUpPage;