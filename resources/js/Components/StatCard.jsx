import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, color }) => {
    return (
        <motion.div
            className="bg-white bg-opacity-80 backdrop-blur-md overflow-hidden
      shadow-custom rounded-xl border border-gray-50 dark:bg-slate-900 dark:border-slate-600"
            whileHover={{
                y: -5,
                boxShadow: "0 15px 15px -19px rgba(0, 0, 0, 0.5)",
            }}
        >
            <div className="px-4 py-5">
                <span className="flex items-center text-sm font-medium dark:text-teal-50">
                    <Icon size={20} className="mr-2" style={{ color }} /> {name}
                </span>
                <p className="mt-1 text-3xl font-semibold text-sky-800 dark:text-emerald-100">
                    {value}
                </p>
            </div>
        </motion.div>
    );
};

export default StatCard;
