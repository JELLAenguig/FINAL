import Dropdown from "@/Components/Dropdown";
import { usePage } from "@inertiajs/react";
import { useState, useCallback } from "react";
import Sidebar from "@/Components/SideBar";

function UserDropdown({ user }) {
    if (!user) return null; // Ensure user is defined

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    type="button"
                    className="inline-flex items-center py-2 text-base font-semibold text-slate-50 transition duration-150 ease-in-out hover:text-slate-300 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    {user.name}
                    <svg
                        className="ml-2 h-4 w-4"
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
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Link href={route("profile.edit")}>
                    Profile
                </Dropdown.Link>
                <Dropdown.Link href={route("logout")} method="post" as="button">
                    Log Out
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
}

function Header({ header, user }) {
    return (
        <header className="border-b border-sky-800 bg-sky-800 dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                {header && <div>{header}</div>}
                {user && <UserDropdown user={user} />}
            </div>
        </header>
    );
}

export default function AuthenticatedLayout({ header, children }) {
    const { user } = usePage().props.auth || {}; // Check for auth object in props
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((prev) => !prev);
    }, []);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-poppins">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div
                className={`flex flex-col flex-1 transition-all duration-300 ${
                    isSidebarOpen ? "w-40" : "w-20"
                }`}
            >
                <Header header={header} user={user} />
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
