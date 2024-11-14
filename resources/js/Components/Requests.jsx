import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext"; // Assuming you're using PrimeReact's InputText

const Requests = ({ tickets }) => {
    const [filters, setFilters] = useState({ global: { value: null } });
    const toastRef = useRef(null);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            global: { value: value },
        });
    };

    const renderHeader = () => {
        const value = filters["global"] ? filters["global"].value : "";

        return (
            <div className="border-b pb-2 border-gray-300 flex justify-between items-center">
                <h2>Overview of Request</h2>
                <span className="p-input-icon-left ml-9">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        value={value || ""}
                        onChange={onGlobalFilterChange}
                        placeholder="Search"
                        className="ml-8 rounded-lg w-30 md:w-56 lg:w-72"
                    />
                </span>
            </div>
        );
    };

    return (
        <div className="w-full h-auto shadow-custom rounded-lg bg-white">
            <Toast ref={toastRef} />
            <DataTable
                className="m-2 rounded-lg"
                paginator
                rows={5}
                emptyMessage="No requests found."
                header={renderHeader()}
                value={tickets}
                globalFilter={filters.global.value}
            >
                <Column field="service.name" header="Service" sortable />
                <Column field="ticket_number" header="Queue Number" sortable />
                <Column
                    field="priorityLevel"
                    header="Priority Level"
                    sortable
                />
                <Column field="status" header="Status" sortable />
            </DataTable>
        </div>
    );
};

export default Requests;
