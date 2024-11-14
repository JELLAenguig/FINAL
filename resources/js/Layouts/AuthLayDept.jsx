import Dropdown from "@/Components/Dropdown";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import SideNav from "@/Components/SideNav";

export default function Authenticated({ header, children }) {
    const { user } = usePage().props.auth; // Access the user object
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-poppins">
            <SideNav
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <div
                className={`flex flex-col flex-1 transition-all duration-300 ${
                    isSidebarOpen ? "w-40" : "w-20"
                }`}
            >
                <nav className="border-b border-sky-800 bg-sky-800 dark:border-gray-700 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            {/* Left Section: Header */}
                            <div className="flex items-center w-1/3">
                                {header && (
                                    <header className="text-lg font-semibold text-slate-50 dark:text-gray-300">
                                        {header}
                                    </header>
                                )}
                            </div>

                            {/* Center Section: Department */}
                            {user.department && (
                                <div className="absolute left-1/2 transform -translate-x-1/2 text-center text-lg font-medium text-gray-200 dark:text-gray-400">
                                    {user.department}
                                </div>
                            )}

                            {/* Right Section: User's Name & Dropdown */}
                            <div className="relative sm:ms-6 sm:flex sm:items-center w-1/3 justify-end">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center border border-transparent py-2 text-base font-semibold leading-4 text-slate-50 transition duration-150 ease-in-out hover:text-slate-300 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link>Profile</Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
