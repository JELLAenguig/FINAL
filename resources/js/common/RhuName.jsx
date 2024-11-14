import LGULogo from "../logo/LGU LOGO NEW.png";
import MHOLogo from "../logo/MHO LOGO_NEW.png";

const RhuName = () => {
    return (
        <div className="w-full">
            <div className="absolute top-0 left-0 w-full flex justify-between p-2">
                <img src={LGULogo} className="w-24 lg:w-40 md:w-32 p-2" />
                <img src={MHOLogo} className="w-24 lg:w-40 md:w-32 p-2" />
            </div>

            <div className="relative w-full flex justify-center flex-col text-center">
                <h1 className="drop-shadow-text-shadow text-xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-lime-500 font-poppins">
                    Mariveles
                </h1>
                <h2 className="drop-shadow-text-shadow text-xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-green-900 font-poppins">
                    Rural Health Unit
                </h2>
            </div>
        </div>
    );
};

export default RhuName;
