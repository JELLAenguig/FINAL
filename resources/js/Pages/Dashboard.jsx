import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import StatCard from "@/Components/StatCard";
import QueueCard from "@/Components/QueueCard";
import StatService from "@/Components/StatService";
import Requests from "@/Components/Requests";
import echo from "@/echo";
import { motion } from "framer-motion";
import { Loader, Timer, LayoutList, SkipForward } from "lucide-react";

const statData = [
    { name: "Pending Requests", icon: Loader, color: "#359605" },
    { name: "Total Requests", icon: LayoutList, color: "#0c8280" },
    { name: "Skipped Requests", icon: SkipForward, color: "#2f3434" },
    { name: "Patients Served", icon: LayoutList, color: "#d310c6" },
    {
        name: "Average Waiting Time",
        icon: Timer,
        color: "#3a9505",
        value: "00:00",
    },
];

export default function Dashboard({
    tickets: initialTickets,
    totalRequests,
    pendingRequests,
    servedPatients,
    skippedPatients,
}) {
    const [total, setTotal] = useState(totalRequests);
    const [pending, setPending] = useState(pendingRequests);
    const [served, setServed] = useState(servedPatients);
    const [skipped, setSkipped] = useState(skippedPatients);
    const [tickets, setTickets] = useState(initialTickets);

    useEffect(() => {
        const channel = echo.channel("statistics-update");

        // Listen for 'StatisticsUpdate' and update the state
        channel.listen(".StatisticsUpdate", ({ statistics }) => {
            console.log("Statistics Update Event:", statistics);
            setTotal(statistics.totalRequests);
            setPending(statistics.pendingRequests);
            setServed(statistics.servedPatients);
            setSkipped(statistics.skippedPatients);
            setTickets(statistics.tickets); // Update tickets state
        });

        return () => {
            channel.stopListening(".StatisticsUpdate");
        };
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-lg font-semibold text-slate-50 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="mx-auto w-8xl sm:px-6 lg:px-19">
                    <motion.div
                        className="w-full grid grid-cols-1 gap-4 md:grid-cols-5 mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {statData.map((stat, index) => (
                            <StatCard
                                key={stat.name}
                                name={stat.name}
                                icon={stat.icon}
                                value={
                                    index === 0
                                        ? pending
                                        : index === 1
                                        ? total
                                        : index === 2
                                        ? skipped
                                        : index === 3
                                        ? served
                                        : stat.value
                                }
                                color={stat.color}
                            />
                        ))}
                    </motion.div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 panel">
                        <QueueCard />
                        <StatService />
                    </div>

                    <div className="w-full">
                        <Requests tickets={tickets} />
                        {/* Pass tickets to Requests component */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
