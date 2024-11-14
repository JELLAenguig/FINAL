import MHOLogo from "@/logo/MHO LOGO_NEW.png";
import LGULogo from "@/logo/LGU LOGO NEW.png";
import qnnect from "@/logo/qnnect.png";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import React, { useMemo, useCallback, useState } from "react";
import axios from "axios";

const StaticLogos = React.memo(() => (
    <div className="flex justify-between">
        <img src={LGULogo} className="w-12 h-12" alt="LGU Logo" />
        <img src={MHOLogo} className="w-12 h-12" alt="MHO Logo" />
    </div>
));

export default function Ticket({
    selectedService,
    selectedSubService,
    selectedBoosterDay,
    isPriority,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const currentDate = useMemo(() => {
        const now = new Date();
        return {
            time: now.toLocaleTimeString(),
            date: now.toLocaleDateString(),
        };
    }, []);

    const handleGetTicket = useCallback(async () => {
        setIsLoading(true);
        try {
            const ticketData = {
                service_id: selectedService?.id,
                is_priority: isPriority,
                status: "waiting",
            };

            if (selectedSubService) {
                ticketData.sub_service = selectedSubService.id;
            }
            if (selectedBoosterDay) {
                ticketData.booster_day = selectedBoosterDay.id;
            }

            // Send the request to create the ticket
            const response = await axios.post("/kiosk/tickets", ticketData);

            // Check if the response indicates success
            if (response.data.success) {
                // Redirect to the kiosk page after successful ticket creation
                Inertia.visit("/kiosk");
            } else {
                console.error("Error creating ticket:", response.data.message);
            }
        } catch (error) {
            console.error(
                "Error saving ticket:",
                error.response ? error.response.data : error.message
            );
        } finally {
            setIsLoading(false);
        }
    }, [selectedService, isPriority, selectedSubService, selectedBoosterDay]);

    const handleReturn = () => {
        // Navigate back to the previous page or a specific route
        Inertia.visit("/kiosk"); // You can change this to the desired route
    };

    return (
        <div className="w-full flex flex-col p-12 h-screen items-center bg-gradient-to-br from-teal-50 via-green-100 to-teal-50 opacity-80">
            <Head title="Ticket" />
            <div className="px-3 py-5 w-80 bg-white shadow-custom rounded-md h-ticket">
                <StaticLogos />
                <div className="flex flex-col text-center relative -mt-12">
                    <h1 className="text-lg font-semibold font-ticket text-gray-700">
                        Mariveles
                    </h1>
                    <h1 className="text-lg font-semibold font-ticket text-gray-700">
                        Rural Health Center
                    </h1>
                </div>
                <div className="text-center py-7 mt-5 border-t-2 border-b-2 border-gray-950 border-dotted">
                    <h1 className="text-5xl font-mono mb-4">
                        {selectedService?.ticketNumber}
                    </h1>
                    <p className="text-gray-800 font-semibold font-ticket text-lg">
                        {selectedService?.name}
                    </p>
                    {(selectedSubService || selectedBoosterDay) && (
                        <p className="text-gray-800 font-semibold font-ticket text-lg mt-2">
                            {selectedSubService ? selectedSubService.name : ""}
                            {selectedBoosterDay
                                ? ` - ${selectedBoosterDay.name}`
                                : ""}
                        </p>
                    )}
                    <div className="text-sm mt-2 font-ticket flex justify-center gap-2">
                        <p>{currentDate.time}</p>
                        <p>{currentDate.date}</p>
                    </div>
                </div>
                <p className="text-center font-ticket mt-3 font-semibold text-lg">
                    {selectedService?.patientsAhead} patient
                    {selectedService?.patientsAhead !== 1 && "s"} ahead of you
                </p>
                <p className="text-center font-ticket mt-1">
                    Please wait for your number to be called.
                </p>
                <div className="flex justify-center mt-10">
                    <img src={qnnect} className="w-20" alt="qnnect logo" />
                </div>
                <p className="text-center text-xs">
                    Developed by PUP Bataan - BSIT
                </p>
            </div>
            <div className="flex gap-3 justify-center w-full mt-8">
                <button
                    className={`bg-gray-300 py-2 px-5 border rounded-lg text-slate-600 font-semibold shadow-custom`}
                    onClick={handleReturn}
                >
                    CANCEL
                </button>
                <button
                    className={`bg-cyan-600 py-2 px-5 rounded-lg text-white font-semibold shadow-custom hover:bg-teal-700 hover:shadow-none ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleGetTicket}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "GET TICKET"}
                </button>
            </div>
        </div>
    );
}
