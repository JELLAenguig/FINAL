const QueueButtons = () => {
    return (
        <div className="flex flex-col w-full lg:w-1/2 md:w-1/2">
            <div className="flex flex-col bg-white shadow-custom rounded-lg">
                <div className="text-center p-1 bg-cyan-600 text-white">
                    Current Patient
                </div>
                <h1 className="text-2xl lg:text-4xl md:text-2xl text-gray-700 h-14 lg:h-24 flex items-center justify-center"></h1>
            </div>
            <div className="flex gap-2 w-full justify-center mt-2">
                <button className="bg-cyan-600 w-1/2 lg:p-10 md:p-7 p-4 text-base lg:text-2xl md:text-xl text-white rounded-lg shadow-custom transition-transform duration-200 hover:scale-105 ">
                    Call
                </button>
                <button className="bg-cyan-600 w-1/2 lg:p-10 md:p-7 p-4  text-base lg:text-2xl md:text-xl text-white rounded-lg shadow-custom transition-transform duration-200 hover:scale-105 ">
                    Serve
                </button>
            </div>
            <div className="flex flex-col gap-3 mt-2">
                <button className="bg-teal-600 w-full lg:p-10 md:p-7 p-4  text-base lg:text-2xl md:text-xl text-white rounded-lg shadow-custom transition-transform duration-200 hover:scale-105 ">
                    Skip
                </button>
                <button className="bg-gray-600 w-full lg:p-10 md:p-7 p-4  text-base lg:text-2xl md:text-xl text-white rounded-lg shadow-custom transition-transform duration-200 hover:scale-105 ">
                    End
                </button>
            </div>
        </div>
    );
};

export default QueueButtons;
