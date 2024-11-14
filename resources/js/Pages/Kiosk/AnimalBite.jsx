import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import RhuName from "@/Components/RhuName";
import QnnectLogo from "@/Components/QnnectLogo";
import { Button } from "primereact/button";
import { useState } from "react";
import ServiceDialog from "./ServiceDialog";
import PriorityDialog from "./PriorityDialog";
import BoosterDialog from "./BoosterDialog";

export default function AnimalBite({ subServices }) {
    const [showServiceDialog, setShowServiceDialog] = useState(false);
    const [showPriorityDialog, setShowPriorityDialog] = useState(false);
    const [showBoosterDialog, setShowBoosterDialog] = useState(false);
    const [selectedService] = useState({ id: 5 }); // Ensure this ID corresponds to "Animal Bite"
    const [selectedSubService, setSelectedSubService] = useState(null);
    const [boosterServices, setBoosterServices] = useState([]);
    const [selectedBoosterDay, setSelectedBoosterDay] = useState(null);

    const filteredSubServices = subServices.filter(
        (subService) => subService.id >= 1 && subService.id <= 6
    );

    const handleSubServiceClick = (subService) => {
        setSelectedSubService(subService);
        if (subService.id === 6) {
            // Assuming this ID corresponds to "Booster"
            const selectedBoosterServices = subServices.filter(
                (service) => service.parent_id === subService.id // Filter by parent_id
            );
            setBoosterServices(selectedBoosterServices);
            setShowBoosterDialog(true);
        } else {
            setShowServiceDialog(true);
        }
    };

    const closeServiceDialog = () => {
        setShowServiceDialog(false);
    };

    const confirmServiceDialog = (confirmed) => {
        closeServiceDialog();
        if (confirmed) {
            setShowPriorityDialog(true);
        }
    };

    const closePriorityDialog = () => {
        setShowPriorityDialog(false);
    };

    const closeBoosterDialog = () => {
        console.log("Booster Day ID before closing:", selectedBoosterDay);
        setShowBoosterDialog(false);
    };

    const handleBoosterServiceClick = (service) => {
        setSelectedBoosterDay(service); // Capture the entire service object
        console.log("Selected Booster Service:", service); // Log the selected booster service
        setShowBoosterDialog(false); // Close the booster dialog
        setShowServiceDialog(true); // Show the service dialog
    };

    const handlePriorityConfirmation = (isPriority) => {
        if (selectedService && selectedSubService) {
            Inertia.visit("/kiosk/ticket", {
                method: "get",
                data: {
                    service_id: selectedService.id,
                    sub_service: selectedSubService.id,
                    booster_day: selectedBoosterDay
                        ? selectedBoosterDay.id
                        : null, // Pass the booster day ID or null
                    is_priority: isPriority,
                },
            });
        } else {
            console.log("No selected service or sub-service");
        }
        closePriorityDialog();
    };

    return (
        <div className="w-full flex flex-col p-12 h-screen items-center bg-gradient-to-br from-teal-50 via-green-100 to-teal-50">
            <RhuName />
            <Head title="Animal Bite" />
            <div className="w-5/6">
                <h3 className="mt-10 font-poppins font-semibold text-green-900 text-xl text-center">
                    Animal Bite
                </h3>
                <p className="mt-1 font-poppins font-medium text-lg text-center">
                    Select the Day for Vaccine or Type
                </p>

                <Button
                    icon="pi pi-chevron-left"
                    className="hover:bg-lime-300 hover:text-gray-900 bg-buttonsColor shadow-custom h-back px-6 text-white font-semibold text-xl"
                    onClick={() => Inertia.visit("/kiosk")}
                />

                <div className="mt-3 font-poppins grid grid-cols-2 gap-5">
                    {filteredSubServices.map((subService) => (
                        <button
                            key={subService.id}
                            className="hover:shadow-none transition-shadow duration-300 ease-in-out shadow-buttonShadow rounded-md h-button text-xl font-medium bg-buttonsColor text-slate-50"
                            onClick={() => handleSubServiceClick(subService)}
                        >
                            {subService.name}
                        </button>
                    ))}
                </div>
            </div>

            <QnnectLogo />

            <ServiceDialog
                isOpen={showServiceDialog}
                onClose={closeServiceDialog}
                onConfirm={confirmServiceDialog}
                selectedService={selectedSubService}
            />

            <PriorityDialog
                isOpen={showPriorityDialog}
                onClose={closePriorityDialog}
                onConfirm={handlePriorityConfirmation}
            />

            <BoosterDialog
                isOpen={showBoosterDialog}
                onClose={closeBoosterDialog}
                boosterServices={boosterServices}
                onSelectBooster={handleBoosterServiceClick}
            />
        </div>
    );
}
