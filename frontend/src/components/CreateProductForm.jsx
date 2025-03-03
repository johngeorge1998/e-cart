import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, ChevronDown } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "jeans",
  "shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: 1,
    image: "",
  });
  const navigate = useNavigate();

  const { state } = useLocation();
  const { createProduct, editProduct, loading } = useProductStore();

  const isEdit = state?.isEdit || false;
  const productToEdit = state?.product || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await editProduct(productToEdit._id, newProduct);
      } else {
        await createProduct(newProduct);
      }
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: 1,
        image: "",
      });
      navigate("/secret-dashboard");
    } catch (error) {
      console.log("Error saving product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file); // base64
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewProduct({
        name: productToEdit.name || "",
        description: productToEdit.description || "",
        price: productToEdit.price || "",
        category: productToEdit.category || "",
        quantity: productToEdit.quantity || 1,
        image: productToEdit.image || "",
      });
    }
  }, [isEdit, productToEdit]);

  return (
    <div className="grid grid-cols-12">
      <motion.div
        className={`col-span-5 bg-white shadow-none border-[1px] rounded-xl px-6 py-5 mb-6 max-w-full ${
          isEdit ? "ml-5" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-black">
          {isEdit ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div
              htmlFor="name"
              className="block text-[14px] text-gray-600 font-semibold mb-2"
            >
              Product Name
            </div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className=" block w-full px-3 py-2 pl-5 bg-[#fff] border border-[#c5c5c5] 
  									rounded-lg shadow-sm placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black focus:border-black  sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-[14px] text-gray-600 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              placeholder="Enter Description"
              id="description"
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              rows={isEdit?"6":"3"}
              className=" block w-full px-3 py-2 pl-5 bg-[#fff] border border-[#c5c5c5] 
  						rounded-lg shadow-sm placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black focus:border-black  sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-[14px] text-gray-600 font-semibold mb-2"
            >
              Price
            </label>
            <input
              placeholder="Enter Price"
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              step="0.01"
              className=" block w-full px-3 py-2 pl-5 bg-[#fff] border border-[#c5c5c5] 
  						rounded-lg shadow-sm placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black focus:border-black  sm:text-sm"
              required
            />
          </div>

         {!isEdit && ( <div>
            <label
              htmlFor="category"
              className="block text-[14px] text-gray-600 font-semibold mb-2"
            >
              Category
            </label>

            <div className="relative">
              <select
                placeholder="Select a category"
                id="category"
                name="category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="appearance-none block w-full px-3 py-2 pl-5 bg-[#fff] border border-[#c5c5c5] 
  							rounded-lg shadow-sm placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black focus:border-black  sm:text-sm"
                required
                disabled={isEdit}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className=" absolute right-1 top-[10px] pr-3 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>)
          }

          <div>
            <label
              htmlFor="quantity"
              className="block text-[14px] text-gray-600 font-semibold mb-2"
            >
              Quantity
            </label>
            <input
              placeholder="Enter Quantity (Max 10 items)"
              type="number"
              id="quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: e.target.value })
              }
              step="1"
              min={0}
              max={10}
              className=" block w-full px-3 py-2 pl-5 bg-[#fff] border border-[#c5c5c5] 
  						rounded-lg shadow-sm placeholder-gray-600 text-[#000] focus:outline-none focus:ring-black focus:border-black  sm:text-sm"
              required
            />
          </div>

          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="cursor-pointer my-2 bg-[#fff] py-2 px-3 border border-dashed border-gray-500 rounded-md shadow-sm text-sm leading-4 font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Upload className="h-4 w-4 inline-block mr-2" />
              Upload Image
            </label>
            {newProduct.image && (
              <span className="ml-3 text-sm text-gray-400">
                Image uploaded{" "}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg 
  					shadow-sm text-sm font-medium text-white bg-black hover:rounded-full
  					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
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
                {isEdit ? "" : <PlusCircle className="mr-2 h-5 w-5" />}
                {isEdit ? "Update Product" : "Create Product"}
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default CreateProductForm;
