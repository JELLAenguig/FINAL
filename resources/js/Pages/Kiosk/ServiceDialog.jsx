import React from "react";

const ServiceDialog = ({ isOpen, onClose, onConfirm, selectedService }) => {
    if (!isOpen) return null; // Render nothing if the dialog is not open

    return (
        <div className="fixed inset-0 flex items-center justify-center z-100">
            <div className="absolute inset-0 bg-gray-500 opacity-30 transition-opacity duration-300" />
            <div className="relative z-10 bg-white rounded-lg shadow-lg transform transition-transform duration-300 scale-0 animate-popup animate-fade-in w-96 max-w-full p-8">
                <div className="flex justify-center -mt-16">
                    <i className="pi pi-question text-4xl text-center p-3 rounded-full text-white bg-cyan-500 "></i>
                </div>

                <h2 className="text-xl font-semibold mb-4 text-center">
                    Confirmation
                </h2>
                <p className="text-center text-xl">
                    Are you sure with your chosen service:{" "}
                    <strong className="text-cyan-800">
                        {selectedService?.name}
                    </strong>
                    ?
                </p>
                <div className="flex mt-4 justify-center gap-3">
                    <button
                        className="px-6 py-3 text-lg bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all shadow-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-3 text-lg bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all shadow-md"
                        onClick={onConfirm} // When "Yes" is clicked, trigger onConfirm
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDialog;
