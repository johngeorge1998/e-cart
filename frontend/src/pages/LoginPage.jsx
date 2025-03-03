import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
     login(email, password);
  };

  return (
    <div className="flex flex-col justify-center mt-5 py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className=" text-center text-[36px] font-extrabold text-black">
          SIGN IN
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative  bg-[#fff]  py-8 px-4 shadow-md  sm:rounded-xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-[14px] text-gray-600 font-semibold"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" block w-full px-3 py-2 pl-10 bg-[#fff] border border-[#c5c5c5] 
									rounded-lg shadow-sm
									 placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black 
									 focus:border-black sm:text-sm"
                  placeholder="Enter Your Email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[14px] text-gray-600 font-semibold"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" block w-full px-3 py-2 pl-10 bg-[#fff] border border-[#c5c5c5] 
									rounded-lg shadow-sm placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="Enter Your Password"
                />
              </div>
            </div>

          <div className="flex justify-end items-end">
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
	                  Loading
	                </>
	              ) : (
	                <>
	                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
	                  Login
	                </>
	              )}
	            </button>
          </div>
          </form>

          <p className=" mt-4 lg:-mt-8  text-left text-sm text-gray-400">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-medium text-black hover:text-gray-600"
            >
              Sign up now <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default LoginPage;