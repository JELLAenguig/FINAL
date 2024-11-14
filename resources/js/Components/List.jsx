import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import React, { useCallback } from "react";

const List = ({ tickets }) => {
    console.log("Tickets received by List component:", tickets);

    const actionTemplate = useCallback((rowData) => {
        const hasPriority = rowData.priorityLevel === "Priority";

        const handleNext = () => {
            console.log("Next button clicked for:", rowData);
        };

        return (
            <>
                {hasPriority && (
                    <Button
                        label="Call"
                        className="bg-green-600 py-1 px-3 text-white"
                        onClick={handleNext}
                    />
                )}
            </>
        );
    }, []);

    return (
        <div className="flex w-full lg:w-1/2 md:w-full px-4">
            <div className="w-full">
                <h2 className="text-center text-base lg:text-2xl md:text-xl mb-2">
                    Queue List
                </h2>
                <DataTable
                    key={tickets.length} // This forces the table to re-render whenever tickets change
                    value={tickets}
                    paginator
                    rows={7}
                    className="datatable border shadow-custom rounded-lg lg:text-base text-sm"
                    showGridlines
                    emptyMessage="No patients in the queue."
                >
                    <Column field="service.name" header="Service" />
                    <Column field="ticket_number" header="Number" />
                    <Column field="priorityLevel" header="Priority Level" />
                    <Column body={actionTemplate} header="Action" />
                </DataTable>
            </div>
        </div>
    );
};

export default React.memo(List);
