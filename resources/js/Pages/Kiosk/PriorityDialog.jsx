import React from "react";

const PriorityDialog = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 opacity-30 transition-opacity duration-300"></div>

            <div className="transform scale-0 animate-popup rounded-lg shadow-lg z-10 p-4 w-11/12 md:w-2/3 lg:w-1/3 bg-white">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <i className="pi pi-times text-xl" />
                    </button>
                </div>
                <div className="flex justify-center -mt-20">
                    <i className="pi pi-question text-4xl text-center p-3 rounded-full text-white bg-cyan-500"></i>
                </div>
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Please confirm your priority group status
                </h2>
                <p className="text-center text-xl mb-4">
                    Are you a senior citizen, pregnant, or PWD?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        className="px-6 py-2 border bg-cyan-500 text-white rounded text-lg shadow-md"
                        onClick={() => onConfirm(0)}
                    >
                        No
                    </button>
                    <button
                        className="px-6 py-2 border bg-cyan-500 text-white rounded text-lg shadow-md"
                        onClick={() => onConfirm(1)}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PriorityDialog;
