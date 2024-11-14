import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function BasicDemo() {
    return (
        <Authenticated
            header={
                <h2 className="text-lg font-semibold text-slate-50 dark:text-gray-200">
                    Settings
                </h2>
            }
        >
            <Head title="Settings" />
        </Authenticated>
    );
}
