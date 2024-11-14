import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AnimalBiteCases from "./AnimalBiteCases";
import CompReq from "./CompRequest";
export default function Reports() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-lg font-semibold text-slate-50 dark:text-gray-200">
                    Reports
                </h2>
            }
        >
            <Head title="Reports" />

            <div className="py-5">
                <div className="mx-auto w-8xl sm:px-6 lg:px-20">
                    <div className="flex cases gap-3">
                        <CompReq />
                        <AnimalBiteCases />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
