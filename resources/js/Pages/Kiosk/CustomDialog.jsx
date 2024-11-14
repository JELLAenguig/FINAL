import React from "react";

const CustomDialog = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background overlay */}
            <div
                className="absolute inset-0 bg-gray-500 opacity-30 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Dialog container */}
            <div className="relative z-10 bg-white rounded-lg shadow-lg transform transition-transform duration-300 scale-100 animate-popup animate-fade-in w-96 max-w-full p-8">
                {/* Icon section */}
                <div className="flex justify-center -mt-14 mb-4">
                    <div className="p-4 rounded-full bg-cyan-500 text-white shadow-lg">
                        <i className="pi pi-question text-4xl"></i>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-4">
                    Confirmation
                </h2>

                {/* Message */}
                <p className="text-xl text-center mb-6">
                    Do you have a doctor's request?
                </p>

                {/* Action buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => {
                            onConfirm(false); // Indicate "No" was clicked
                            onClose(); // Close the dialog
                        }}
                        className="px-6 py-3 text-lg bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all shadow-md"
                    >
                        No
                    </button>
                    <button
                        onClick={() => {
                            onConfirm(true); // Indicate "Yes" was clicked
                            onClose(); // Close the dialog
                        }}
                        className="px-6 py-3 text-lg bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all shadow-md"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomDialog;
