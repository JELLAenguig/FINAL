import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import AddUser from "./AddUser";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Users({ users: initialUsers }) {
    const [users, setUsers] = useState(initialUsers || []);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);

    useEffect(() => {
        if (!initialUsers.length) {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get("/users");
                    setUsers(response.data);
                } catch (error) {
                    console.error("Error fetching users:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUsers();
        } else {
            setLoading(false);
        }
    }, [initialUsers]);

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };

    const renderHeader = () => (
        <div className="border-b p-2 border-gray-300 flex justify-between items-center">
            <Button
                icon="pi pi-user-plus"
                className="bg-emerald-500 p-2 text-white"
                label="Add User"
                onClick={() => setIsAddUserOpen(true)}
            />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search"
                    className="ml-9 rounded-lg w-96"
                />
            </span>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-lg font-semibold text-slate-50 dark:text-gray-200">
                    Users Management Settings
                </h2>
            }
        >
            <Head title="Users Management" />
            <div className="py-5 flex justify-center">
                <div className="card w-11/12 shadow-custom rounded-lg bg-white">
                    <DataTable
                        value={users}
                        paginator
                        rows={5}
                        loading={loading}
                        globalFilterFields={["name", "email", "role"]}
                        header={renderHeader()}
                        emptyMessage="No users found."
                        className="m-5 border rounded"
                        globalFilter={globalFilterValue}
                    >
                        <Column
                            field="id"
                            header="ID"
                            style={{ width: "5rem" }}
                            sortable
                        />
                        <Column
                            field="name"
                            header="Name"
                            style={{ minWidth: "8rem" }}
                            sortable
                        />
                        <Column
                            field="email"
                            header="Email"
                            style={{ minWidth: "6rem" }}
                            sortable
                        />
                        <Column
                            field="role"
                            header="Role"
                            style={{ minWidth: "6rem" }}
                            sortable
                        />
                        <Column
                            field="created_at"
                            header="Created At"
                            body={(rowData) => (
                                <span>{rowData.created_at?.split("T")[0]}</span>
                            )}
                            sortable
                        />
                        <Column
                            header="Action"
                            body={(rowData) => (
                                <div className="flex space-x-7">
                                    <Button
                                        label="Edit"
                                        icon="pi pi-pencil"
                                        onClick={() =>
                                            console.log(
                                                "Edit user with ID:",
                                                rowData.id
                                            )
                                        }
                                        className="p-button-sm bg-cyan-600 px-2 py-1 text-white"
                                    />
                                    <Button
                                        label="Delete"
                                        icon="pi pi-trash"
                                        onClick={() =>
                                            console.log(
                                                "Delete user with ID:",
                                                rowData.id
                                            )
                                        }
                                        className="p-button-sm bg-red-600 px-2 py-1 text-white"
                                    />
                                </div>
                            )}
                            style={{ minWidth: "8rem" }}
                        />
                    </DataTable>
                </div>
            </div>
            {isAddUserOpen && (
                <AddUser onClose={() => setIsAddUserOpen(false)} />
            )}
        </AuthenticatedLayout>
    );
}
