import { motion } from "framer-motion";
import { Chart } from "primereact/chart";
import { useRef } from "react";

const StatService = () => {
    const chartRef = useRef();

    // Data for different services
    const serviceData = {
        Consultation: [],
        Laboratory: [],
        Ultrasound: [],
        ECG: [],
        XRay: [],
        AnimalBite: [],
    };

    const chartData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: Object.keys(serviceData).map((service, index) => {
            const colors = [
                "rgba(15, 99, 132, 0.7)",
                "rgba(24, 162, 235, 0.7)",
                "rgba(55, 6, 86, 0.3)",
                "rgba(125, 132, 116, 0.7)",
                "rgba(112, 102, 255, 0.7)",
                "rgba(125, 225, 104, 0.7)",
            ];

            return {
                label: service,
                data: serviceData[service],
                backgroundColor: colors[index % colors.length],
                borderColor: colors[index % colors.length].replace("0.7", "1"),
                tension: 0.4,
            };
        }),
    };

    const chartOptions = {
        plugins: {
            legend: { display: true },
        },
        scales: {
            x: {
                ticks: { color: "#9CA3AF" },
            },
            y: {
                ticks: { color: "#9CA3AF" },
            },
        },
    };

    return (
        <motion.div
            className="bg-white backdrop-blur-md shadow-custom rounded p-4 mb-3 dark:bg-slate-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-sky-800 dark:text-cyan-50">
                    Service Statistics
                </h2>

                {/* Add Export Buttons */}
                <div>
                    <button
                        onClick=""
                        className="bg-sky-50 rounded-md px-3 py-1 ml-2"
                    >
                        Export to PDF
                    </button>
                    <button
                        onClick=""
                        className="bg-sky-50 rounded-md px-3 py-1 ml-2"
                    >
                        Export to Excel
                    </button>
                </div>
            </div>

            <div className="w-full" ref={chartRef}>
                <Chart
                    type="bar"
                    data={chartData}
                    options={chartOptions}
                    className="h-full"
                />
            </div>
        </motion.div>
    );
};

export default StatService;
