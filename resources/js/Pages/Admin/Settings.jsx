import React, { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProfileInfo from "@/Pages/Profile/Partials/UpdateProfileInformationForm";
import ChangePassword from "@/Pages/Profile/Partials/UpdatePasswordForm";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Settings() {
    const [theme, setTheme] = useState("light");

    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
        document.documentElement.classList.toggle(
            "dark",
            selectedTheme === "dark"
        );
        localStorage.setItem("theme", selectedTheme);
    };

    return (
        <Authenticated
            header={
                <h2 className="text-lg font-semibold text-slate-50 dark:text-gray-200">
                    Settings
                </h2>
            }
        >
            <Head title="Settings" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-6">
                {/* Update Information Section */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-3 dark:bg-gray-800">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        Update Information
                    </h3>
                    <ProfileInfo className="mb-3" />
                    <ChangePassword />
                </div>

                {/* Appearance Section */}
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        Appearance
                    </h3>
                    <div className="flex space-x-8 mt-4">
                        {/* Light Theme Button */}
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Light Mode
                            </span>
                            <button
                                onClick={() => handleThemeChange("light")}
                                className={`flex items-center justify-center w-40 h-24 rounded-lg shadow-md ${
                                    theme === "light"
                                        ? "border-2 border-blue-500"
                                        : "border border-gray-300"
                                } bg-white hover:bg-gray-100`}
                            >
                                <SunIcon className="w-10 h-10 text-yellow-500" />
                            </button>
                        </div>

                        {/* Dark Theme Button */}
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Dark Mode
                            </span>
                            <button
                                onClick={() => handleThemeChange("dark")}
                                className={`flex items-center justify-center w-40 h-24 rounded-lg shadow-md ${
                                    theme === "dark"
                                        ? "border-2 border-blue-500"
                                        : "border border-gray-300"
                                } bg-gray-800 hover:bg-gray-700`}
                            >
                                <MoonIcon className="w-10 h-10 text-gray-200" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
