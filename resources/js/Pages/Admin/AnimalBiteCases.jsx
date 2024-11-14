import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const AnimalBiteCases = () => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    // Create year options from 999 years ago to the current year
    const yearOptions = Array.from(
        { length: 10 }, // Total of 1000 years
        (_, i) => ({
            label: (currentYear - 9 + i).toString(),
            value: currentYear - 9 + i,
        })
    ).filter((year) => year.value <= currentYear); // Filter to ensure only years up to the current year

    const caseData = {};

    const exportCSV = () => {
        const csvHeader = "Month,Total Cases"; // Define the headers
        const selectedCaseData = caseData[selectedYear];

        const csvData = selectedCaseData
            ? [
                  csvHeader, // Add the header to the beginning
                  ...selectedCaseData.map(
                      (item) => `${item.month},${item.cases}`
                  ),
                  `Total,${totalCases}`, // Add the total cases as a new row
              ].join("\n")
            : "No data available for this year.";

        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `animal_bite_cases_${selectedYear}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const printTable = () => {
        const printWindow = window.open("", "", "width=800,height=600");
        printWindow.document.write(
            "<html><head><title>Animal Bite Cases</title>"
        );
        printWindow.document.write("<style>");
        printWindow.document.write("body { font-family: Arial, sans-serif; }");
        printWindow.document.write(
            "table { width: 100%; border-collapse: collapse; }"
        );
        printWindow.document.write(
            "th, td { border: 1px solid #000; padding: 8px; text-align: center; }"
        );
        printWindow.document.write("</style></head><body>");
        printWindow.document.write(document.querySelector(".animal").outerHTML);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
    };

    // Calculate total cases for the selected year
    const totalCases = caseData[selectedYear]
        ? caseData[selectedYear].reduce((sum, item) => sum + item.cases, 0)
        : 0;

    return (
        <div className="bg-white p-2 rounded-md shadow-custom w-1/3">
            <div className="flex justify-end gap-3 items-center px-2">
                <p className="font-semibold text-cyan-800 text-left w-1/2">
                    Animal Bite Cases
                </p>
                <Button
                    label="Excel"
                    icon="pi pi-file"
                    onClick={exportCSV}
                    className="p-1 lg:px-3 bg-cyan-500 text-white text-sm"
                />
                <Button
                    label="Print"
                    icon="pi pi-print"
                    onClick={printTable}
                    className="p-1 lg:px-3 bg-gray-500 text-white text-sm"
                />
            </div>

            <Dropdown
                value={selectedYear}
                options={yearOptions}
                onChange={(e) => setSelectedYear(e.value)}
                placeholder="Select Year"
                className="h-9 p-0 flex items-center text-center mt-2 bg-gray-50 border shadow-sm"
            />
            {caseData[selectedYear] && caseData[selectedYear].length > 0 ? (
                <DataTable
                    value={caseData[selectedYear]}
                    className="w-full text-base overflow-auto h-5/6 mt-3 animal"
                >
                    <Column field="month" header="Month" footer="Total" />
                    <Column field="cases" header="Cases" footer={totalCases} />
                </DataTable>
            ) : (
                <div className="h-5/6  flex items-center justify-center">
                    No data available for this year.
                </div>
            )}
        </div>
    );
};

export default AnimalBiteCases;
