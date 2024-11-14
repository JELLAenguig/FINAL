import qnnect from "@/logo/qnnect.png";

const QnnectLogo = () => {
    return (
        <div className="absolute bottom-2 w-full items-center justify-center flex flex-col z-10">
            <img src={qnnect} className="w-32 md:w-36 lg:w-56" />
            <p className="font-medium text-center">
                Developed by PUP Bataan - BSIT
            </p>
        </div>
    );
};

export default QnnectLogo;
