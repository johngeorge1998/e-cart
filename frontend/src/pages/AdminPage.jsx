import { BarChart, PlusSquare, ShoppingBasket, UserPlus2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";
import SignUpPage from "./SignUpPage";

const tabs = [
  { id: "createUser", label: "Add User", icon: UserPlus2 },
  { id: "create", label: "Add Product", icon: PlusSquare },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className=" px-10 ">
      <div className=" z-10  py-8">
        <motion.h1
          className="text-4xl font-bold mb-8 text-black text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className="flex justify-center md:justify-start  mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-none text-[13px] md:text-[14px] transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-white border-[1px] text-black"
                  : "bg-[white] text-black hover:shadow-lg hover:border-none"
              }`}
            >
              <tab.icon className="mr-2 h-4 w-4 hidden md:flex" />
              {tab.label}
            </button>
          ))}
        </div>
		{activeTab === "createUser" && <SignUpPage isCreateUser={true} />}

        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};
export default AdminPage;
