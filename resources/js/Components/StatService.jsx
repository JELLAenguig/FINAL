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

    {
        /*const exportChartToPDF = () => {
        const pdf = new jsPDF();
        const title = "Service Statistics";
        const margin = 10;

        html2canvas(chartRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 150;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const pageHeight = pdf.internal.pageSize.height;

            const xPosition = (pdf.internal.pageSize.width - imgWidth) / 2;

            let position = margin + 10;

            pdf.setFontSize(18);
            pdf.text(title, margin, position);
            position += 10;

            pdf.addImage(
                imgData,
                "PNG",
                xPosition,
                position,
                imgWidth,
                imgHeight
            );
            position += imgHeight;

            if (position >= pageHeight - margin) {
                position = margin + 10;
                pdf.addPage();
                pdf.text(title, margin, position);
                position += 10;
                pdf.addImage(
                    imgData,
                    "PNG",
                    xPosition,
                    position,
                    imgWidth,
                    imgHeight
                );
            }

            pdf.save("chart.pdf");
        });
    };

    // New function to export data to Excel (CSV)
    const exportDataToExcel = () => {
        const csvHeader =
            "Service,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec\n";
        const csvRows = Object.keys(serviceData).map((service) => {
            const data = serviceData[service].join(","); // Join monthly data with commas
            return `${service},${data}`; // Format: Service,Data
        });

        const csvData = csvHeader + csvRows.join("\n");
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "service_statistics.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };*/
    }

    return (
        <motion.div
            className="bg-white backdrop-blur-md shadow-custom rounded p-4 border border-gray-50 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-sky-800">
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
