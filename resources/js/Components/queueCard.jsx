import { motion } from "framer-motion";
const QueueCard = () => {
    return (
        <motion.div
            className="bg-slate-50 w-full shadow-custom mb-3 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="w-full">
                <h3
                    className="w-full p-1 bg-slate-100 font-semibold
         text-sky-800 text-center"
                >
                    Queue Status
                </h3>
                <div className="py-1 px-2">
                    <table className="w-full border-spacing-1 border-separate">
                        <thead>
                            <tr className="font-medium text-cyan-50 bg-teal-700 text-sm">
                                <td className="p-1 text-center ">Service</td>
                                <td className="p-1 text-center ">Serving</td>
                                <td className="p-1 text-center ">
                                    Next Patient
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm">
                                    Consultation
                                </td>
                                <td className="text-center py-4 px-2 font-semibold text-2xl text-teal-900 bg-white"></td>
                                <td className="text-center py-4 px-2 font-semibold text-2xl text-teal-900 bg-white"></td>
                            </tr>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm">
                                    Laboratory
                                </td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white"></td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white"></td>
                            </tr>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm">
                                    X-Ray
                                </td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white"></td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white"></td>
                            </tr>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm">
                                    Ultrasound
                                </td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white"></td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white"></td>
                            </tr>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm">
                                    ECG
                                </td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white"></td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white"></td>
                            </tr>
                            <tr>
                                <td className="text-center py-4 px-1 text-sm">
                                    Animal Bite
                                </td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white"></td>
                                <td className="text-center py-4 px-1 font-semibold text-2xl text-teal-900 bg-white"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default QueueCard;
