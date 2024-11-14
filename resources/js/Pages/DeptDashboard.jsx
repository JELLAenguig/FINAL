import React, { useState, useEffect } from "react";
import AuthLayDept from "@/Layouts/AuthLayDept";
import { Head } from "@inertiajs/react";
import Timer from "@/Components/Timer";
import QueueButtons from "@/Components/QueueButtons";
import List from "@/Components/List";
import echo from "@/echo";

export default function DeptDashboard({ tickets: initialTickets, user }) {
    const [tickets, setTickets] = useState(initialTickets);
    const userDepartment = user ? user.department : "";

    useEffect(() => {
        // Listen for 'DepartmentTicketUpdate' event
        const channel = echo.channel("department-tickets-update");

        channel.listen(".DepartmentTicketUpdate", (event) => {
            console.log("Received department ticket update:", event);

            if (event.departmentTickets) {
                // Set tickets directly from the event data
                setTickets(event.departmentTickets);
            }
        });

        // Cleanup listener on component unmount
        return () => {
            channel.stopListening(".DepartmentTicketUpdate");
        };
    }, [userDepartment]);

    return (
        <AuthLayDept
            header={
                <h2 className="text-lg font-semibold text-slate-50 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="QueueDashboard" />
            <div className="lg:grid lg:grid-cols-[0.4fr,1fr] gap-3 p-5 h-full">
                <Timer />
                <div className="flex md:mt-3 mt-3 lg:m-0 flex-wrap">
                    <QueueButtons />
                    <List tickets={tickets} />
                </div>
            </div>
        </AuthLayDept>
    );
}
