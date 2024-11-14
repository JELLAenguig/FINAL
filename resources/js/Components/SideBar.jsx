import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@inertiajs/react";

import {
    LayoutDashboard,
    Menu,
    Settings,
    TrendingUp,
    Users,
} from "lucide-react";

const SIDEBAR_ITEMS = [
    { name: "Dashboard", icon: LayoutDashboard, route: "/dashboard" },
    { name: "Users", icon: Users, route: "/users" },
    { name: "Reports", icon: TrendingUp, route: "/reports" },
    { name: "Settings", icon: Settings, route: "/settings" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <motion.div
            className={`relative h-screen z-40 transition-all duration-100 ease-in-out flex-shrink-0 ${
                isOpen ? "w-40" : "w-20"
            }`}
            animate={{ width: isOpen ? 200 : 80 }}
        >
            <div className="h-full bg-slate-50 bg-opacity-80 backdrop-blur-md p-4 flex flex-col border-r border-gray-300 shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleSidebar}
                        className="p-2 ml-1 rounded-full text-gray-900 hover:bg-gray-200 transition-colors"
                    >
                        <Menu size={28} />
                    </motion.button>
                </div>
                <div className="Logo">
                    <AnimatePresence>
                        {isOpen && (
                            <motion.span
                                className="text-3xl font-bold text-sky-900 ml-3 transition-all"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                Q-NNECT
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <nav className="flex-grow my-3.5">
                    {SIDEBAR_ITEMS.map((item, index) => (
                        <Link key={index} href={item.route}>
                            <motion.button className="flex items-center w-full p-4 text-xs font-medium rounded-md hover:bg-gray-300 hover:bg-opacity-20 hover:text-cyan-200 transition-colors mb-2">
                                <item.icon
                                    size={20}
                                    style={{ color: "#000", minWidth: "20px" }}
                                />
                                {isOpen && (
                                    <motion.span
                                        className="ml-4 whitespace-nowrap text-sm text-sky-950"
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{
                                            duration: 0.2,
                                            delay: 0.3,
                                        }}
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </motion.button>
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.div>
    );
};

export default Sidebar;
