import React, { useState, useEffect } from "react";
import MHO from "@/logo/MHO LOGO_NEW.png";

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen w-full overflow-hidden bg-slate-100 items-center">
            <div className="flex flex-col items-center justify-center w-full h-full p-10 login">
                <img src={MHO} alt="MarivelesLogo" className="w-28" />
                <h1 className="drop-shadow-text-shadow text-sm sm:text-xl md:text-xl lg:text-3xl text-lime-500 text-center mt-3">
                    Mariveles Municipal Health Office
                </h1>

                <div className="justify-center flex flex-col mt-6 w-full overflow-hidden z-10 bg-white px-6 py-4 shadow-custom sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                    {children}
                    <div className="flex justify-center mt-6"></div>
                </div>
            </div>
        </div>
    );
}
