import React from "react";

const BoosterDialog = ({
    isOpen,
    onClose,
    boosterServices,
    onSelectBooster,
}) => {
    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/3 bg-white">
                <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-900 float-right"
                >
                    <i className="pi pi-times text-xl" />
                </button>
                <h2 className="text-xl font-semibold text-center mb-4">
                    Select Booster Day
                </h2>
                <div className="flex flex-col gap-4">
                    {boosterServices.map((service) => (
                        <button
                            key={service.id}
                            className="px-6 py-2 bg-cyan-500 text-white rounded text-lg"
                            onClick={() => onSelectBooster(service)} // Trigger onSelectBooster
                        >
                            {service.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BoosterDialog;
