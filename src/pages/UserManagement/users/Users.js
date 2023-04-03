import React, { useState, useEffect } from "react";
import { handleGetRequest } from "../../../services/GetTemplate";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
// import "../../../../src/components/DataTable.css";
import AddUserDialog from "./AddUserDialog";
import UpdateUserDialog from "./UpdateUserDialog";
// import AddEditModule from "./AddEditModule";

function Users() {
    const [module, setModule] = useState([]);
    const [loading, setloading] = useState([]);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayModalUpdate, setDisplayModalUpdate] = useState(false);
    const [editable, setEditable] = useState(false);
    const [userRowData, setUserRowData] = useState("");

    const addHandler = (rowData) => {
        setDisplayModal(true);
        setUserRowData(rowData);
        setEditable(true);
    };
    const editHandler = (rowData) => {
        setDisplayModalUpdate(true);
        setUserRowData(rowData);
        setEditable(true);
    };

    const getUsers = async () => {
        setloading(true);
        const response = await handleGetRequest("/zmiles_user_management/zumngt/getAllUsers");
        setModule(response?.data);
        setloading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button tooltip="Add User Roles" tooltipOptions={{ position: "top" }} icon="pi pi-plus" onClick={() => addHandler(rowData)} className="p-button-rounded p-button-primary mr-2" />
                <Button tooltip="Update Status" icon="pi pi-pencil" tooltipOptions={{ position: "top" }} onClick={() => editHandler(rowData)} className="p-button-rounded p-button-warning mr-2" />
            </div>
        );
    };

    const onHide = () => {
        setDisplayModal(false);
    };

    const onHideUpdate = () => {
        setDisplayModalUpdate(false);
    };

    const activeBody = (rowData) => {
        return <React.Fragment>{rowData?.isActive === "Y" ? "Yes" : rowData?.isActive === "N" ? "No" : null}</React.Fragment>;
    };
    const usersData = [
        {
            firstName: "Example Name",
            lastName: "Last Name",
            mobileNo: "03335252525",
            username: "Example User Name",
            isActive: "Y",
        },
        {
            firstName: "Example Name",
            lastName: "Last Name",
            mobileNo: "03335252525",
            username: "Example User Name",
            isActive: "Y",
        },
    ];
    return (
        <div>
            <Dialog visible={displayModal} header="Add User Roles" style={{ width: "50vw" }} onHide={() => setDisplayModal(false)}>
                <AddUserDialog onHide={onHide} editable={editable} userRowData={userRowData} />
            </Dialog>

            <Dialog visible={displayModalUpdate} header="Update User Status" style={{ width: "50vw" }} onHide={() => setDisplayModalUpdate(false)}>
                <UpdateUserDialog onHideUpdate={onHideUpdate} editable={editable} userRowData={userRowData} getUsers={getUsers} />
            </Dialog>

            <div className="card p-datatable-sm">
                <DataTable header="Users List" paginator rows={10} value={usersData} emptyMessage="No data found.">
                    <Column filter field="firstName" header="First Name" />
                    <Column filter field="lastName" header="Last Name" />
                    <Column filter field="mobileNo" header="Mobile No" />
                    <Column filter field="username" header="User Name" />
                    <Column filter field="isActive" header="Is Active" body={activeBody} />
                    <Column body={actionTemplate} header="Action" />
                </DataTable>
            </div>
        </div>
    );
}

export default Users;
