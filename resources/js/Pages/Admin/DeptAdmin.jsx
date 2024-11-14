import AuthLayDept from "@/Layouts/AuthLayDept";
import { Head } from "@inertiajs/react";
import Timer from "@/Dashboard/Timer";
import QueueButtons from "@/Dashboard/QueueButtons";
import List from "@/Dashboard/List";

export default function DeptAdmin() {
    return (
        <AuthLayDept
            header={
                <h2 className="text-lg font-semibold text-slate-50 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="QueueDashboard" />
            <div className="flex gap-9 p-5 h-full">
                <Timer />
                <QueueButtons />
                <List />
            </div>
        </AuthLayDept>
    );
}
