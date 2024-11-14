import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar"; // Import Calendar for date filtering

export default function CompReq() {
    const completedRequests = [];

    const [globalFilter, setGlobalFilter] = useState("");
    const [dateFilter, setDateFilter] = useState(null);
    const [loading, setLoading] = useState(false); // Track loading state

    const exportCSV = () => {
        const csvHeader = "Number,Service,Completion Time,Status,Date"; // Include Date in CSV
        const csvData = [
            csvHeader, // Add the header to the beginning
            ...completedRequests.map(
                (item) =>
                    `${item.number},${item.service},${item.completionTime},${item.status},${item.date}`
            ),
        ].join("\n");

        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `completed_requests.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const printTable = () => {
        const printWindow = window.open("", "", "width=800,height=600");
        printWindow.document.write(
            "<html><head><title>Completed Requests</title>"
        );

        printWindow.document.write("</head><body>");
        printWindow.document.write("<h2>Completed Requests</h2>");
        printWindow.document.write(
            "<table border><thead><tr><th>Number</th><th>Service</th><th>Completion Time</th><th>Status</th><th>Date</th></tr></thead><tbody>"
        );

        completedRequests.forEach((req) => {
            printWindow.document.write(
                `<tr><td>${req.number}</td><td>${req.service}</td><td>${req.completionTime}</td><td>${req.status}</td><td>${req.date}</td></tr>`
            );
        });

        printWindow.document.write("</tbody></table>");
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
    };

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
    };

    const onDateFilterChange = (e) => {
        setDateFilter(e.value);
    };

    const dateFilterFunction = (request) => {
        if (!dateFilter) return true; // If no date filter is set
        return (
            new Date(request.date).toDateString() ===
            new Date(dateFilter).toDateString()
        );
    };

    // Define the header for the DataTable
    const header = (
        <div className="flex justify-between">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText
                    type="search"
                    value={globalFilter}
                    onChange={onGlobalFilterChange}
                    placeholder="Search"
                    className="ml-9 rounded-lg w-60"
                />
            </IconField>
            <Calendar
                value={dateFilter}
                onChange={onDateFilterChange}
                dateFormat="mm/dd/yy"
                placeholder="Select a date"
                className="ml-2 rounded-lg w-40"
            />
            <div className="flex space-x-2">
                <Button
                    label="Excel"
                    icon="pi pi-file"
                    onClick={exportCSV}
                    className="lg:px-3 bg-cyan-500 text-white text-sm"
                />
                <Button
                    label="Print"
                    icon="pi pi-print"
                    onClick={printTable}
                    className="lg:px-3 bg-gray-500 text-white text-sm"
                />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col bg-white p-2 rounded-md shadow-custom w-2/3">
            <h2 className="text-lg text-cyan-900 font-semibold p-2 w-full bg-slate-100">
                Completed Requests
            </h2>
            <DataTable
                value={completedRequests.filter(dateFilterFunction)} // Apply date filter
                paginator
                rows={7}
                globalFilter={globalFilter}
                loading={loading} // Set loading state
                header={header}
                emptyMessage="No completed requests found."
                className="w-full"
            >
                <Column field="number" header="Number" sortable />
                <Column field="service" header="Service" sortable />
                <Column
                    field="completionTime"
                    header="Completion Time"
                    sortable
                />
                <Column field="date" header="Date" sortable />
            </DataTable>
        </div>
    );
}
