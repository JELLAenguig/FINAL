import QnnectLogo from "@/Components/QnnectLogo";
import RhuName from "@/Components/RhuName";
import { Head } from "@inertiajs/react";
import PriorityDialog from "./PriorityDialog";
import CustomDialog from "./CustomDialog";
import { useState, useRef, memo, useCallback } from "react";
import { Toast } from "primereact/toast";
import { Inertia } from "@inertiajs/inertia";

const PriorityDialogMemo = memo(PriorityDialog);
const CustomDialogMemo = memo(CustomDialog);

export default function Index({ services }) {
    const toast = useRef(null);
    const [dialogState, setDialogState] = useState({
        showPriority: false,
        showCustom: false,
        selectedService: null,
    });

    const toggleDialog = useCallback((dialog, state) => {
        setDialogState((prev) => ({ ...prev, [dialog]: state }));
    }, []);

    const handleServiceClick = useCallback(
        (service) => {
            setDialogState((prev) => ({ ...prev, selectedService: service }));

            if (service.name === "Consultation") {
                toggleDialog("showPriority", true);
            } else if (service.name === "Animal Bite") {
                Inertia.visit("/kiosk/animal-bite");
            } else {
                toggleDialog("showCustom", true);
            }
        },
        [toggleDialog]
    );

    const handleConfirmPriorityDialog = useCallback(
        (isPriority) => {
            const { id: service_id, ticketNumber } =
                dialogState.selectedService || {};

            Inertia.visit(`/kiosk/ticket`, {
                method: "get",
                data: {
                    service_id,
                    ticket_number: ticketNumber,
                    is_priority: isPriority,
                },
            });
            toggleDialog("showPriority", false);
        },
        [dialogState.selectedService, toggleDialog]
    );

    const handleConfirmCustomDialog = useCallback(
        (confirmed) => {
            toggleDialog("showCustom", false);

            if (!confirmed) {
                toast.current?.show({
                    severity: "warn",
                    summary: "Doctor's Request",
                    detail: "No Doctor's Request. Please select the Consultation service instead.",
                    life: 4000,
                });
            } else if (dialogState.selectedService?.name !== "Animal Bite") {
                toggleDialog("showPriority", true);
            }
        },
        [dialogState.selectedService, toggleDialog]
    );

    return (
        <div className="w-full flex flex-col p-12 h-screen items-center bg-gradient-to-br from-teal-50 via-green-100 to-teal-50">
            <RhuName />
            <Head title="Kiosk" />
            <div className="w-5/6">
                <h3 className="mt-10 font-poppins font-semibold text-green-900 text-xl text-center">
                    Welcome!
                </h3>
                <p className="mt-1 font-poppins font-medium text-lg text-center">
                    Please Select a Service
                </p>
                <div className="mt-8 font-poppins grid grid-cols-2 gap-5">
                    {services.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => handleServiceClick(service)}
                            className="transition-shadow duration-300 ease-in-out hover:shadow-none shadow-buttonShadow rounded-md h-button text-xl font-medium bg-buttonsColor text-slate-50"
                        >
                            {service.name}
                        </button>
                    ))}
                </div>
            </div>
            <Toast ref={toast} />
            <QnnectLogo />

            <CustomDialogMemo
                isOpen={dialogState.showCustom}
                onClose={() => toggleDialog("showCustom", false)}
                onConfirm={handleConfirmCustomDialog}
            />

            <PriorityDialogMemo
                isOpen={dialogState.showPriority}
                onClose={() => toggleDialog("showPriority", false)}
                onConfirm={handleConfirmPriorityDialog}
            />
        </div>
    );
}
