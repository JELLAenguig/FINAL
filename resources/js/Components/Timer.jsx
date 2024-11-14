const Timer = () => {
    return (
        <div className="flex flex-col p-3 bg-white shadow-custom rounded-lg lg:h-5/6 h-30 items-center justify-center">
            <h1 className="lg:text-7xl md:text-6xl text-3xl text-gray-700">
                00:00
            </h1>
            <small className="mt-4 text-gray-600">Serving Time</small>
        </div>
    );
};

export default Timer;
