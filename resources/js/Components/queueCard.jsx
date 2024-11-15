import { motion } from "framer-motion";
const QueueCard = () => {
    return (
        <motion.div
            className="bg-slate-50 w-full shadow-custom mb-3 rounded dark:bg-slate-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="w-full">
                <h3
                    className="w-full p-1 bg-slate-100 font-semibold
         text-sky-800 text-center dark:text-emerald-50 dark:bg-teal-800"
                >
                    Queue Status
                </h3>
                <div className="py-1 px-2">
                    <table className="w-full border-spacing-1 border-separate">
                        <thead>
                            <tr className="font-medium text-cyan-50 bg-teal-700 text-sm dark:bg-teal-700">
                                <td className="p-1 text-center ">Service</td>
                                <td className="p-1 text-center ">Serving</td>
                                <td className="p-1 text-center ">
                                    Next Patient
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm dark:text-white">
                                    Consultation
                                </td>
                                <td className="text-center py-4 px-2 font-semibold text-2xl text-teal-900 bg-white dark:text-white dark:bg-slate-800"></td>
                                <td className="text-center py-4 px-2 font-semibold text-2xl text-teal-900 bg-white dark:text-white dark:bg-slate-800"></td>
                            </tr>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm dark:text-white">
                                    Laboratory
                                </td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white dark:bg-slate-800"></td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white dark:bg-slate-800"></td>
                            </tr>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm dark:text-white">
                                    X-Ray
                                </td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white dark:bg-slate-800"></td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white dark:bg-slate-800"></td>
                            </tr>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm dark:text-white">
                                    Ultrasound
                                </td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white dark:bg-slate-800"></td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white dark:bg-slate-800"></td>
                            </tr>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm dark:text-white">
                                    ECG
                                </td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white dark:bg-slate-800"></td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white dark:bg-slate-800"></td>
                            </tr>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm dark:text-white">
                                    Animal Bite
                                </td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white dark:text-white dark:bg-slate-800"></td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white dark:text-white dark:bg-slate-800"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default QueueCard;
