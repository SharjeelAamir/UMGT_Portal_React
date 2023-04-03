import React, { useState, useEffect } from "react";
import { handleGetRequest } from "../../../services/GetTemplate";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
// import "../../../components/DataTable.css";
import AddEditRolesRights from "./AddEditRolesRights";
import { useLocation } from "react-router-dom";

function RoleRights() {
    const [menu, setMenu] = useState([]);
    const [loading, setloading] = useState([]);
    const [displayModal, setDisplayModal] = useState(false);
    const [editable, setEditable] = useState(false);
    const [roleRightsRowData, setroleRightsRowData] = useState("");

    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const roleId = query.get("rid");

    const editHandler = (rowData) => {
        setDisplayModal(true);
        setroleRightsRowData(rowData);
        setEditable(true);
    };

    const getRoleRights = async () => {
        setloading(true);
        const response = await handleGetRequest(`/zmiles_user_management/zumngt/getRoleRights/${roleId}`);
        setMenu(response?.data);
        setloading(false);
    };

    useEffect(() => {
        getRoleRights();
    }, []); // eslint-disable-line
    const rights = [
        {
            menuDescription: "Example description",
            viewAllowed: "Y",
            insertAllowed: "N",
            updateAllowed: "Y",
            isActive: "Y",
        },
        {
            menuDescription: "Example description",
            viewAllowed: "Y",
            insertAllowed: "N",
            updateAllowed: "Y",
            isActive: "Y",
        },
    ];
    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button tooltip="Edit" icon="pi pi-pencil" tooltipOptions={{ position: "top" }} onClick={() => editHandler(rowData)} className="p-button-rounded p-button-warning p-mr-2" />
            </div>
        );
    };

    const onHide = () => {
        setDisplayModal(false);
        setEditable(false);
    };

    const viewedBody = (rowData) => {
        return <React.Fragment>{rowData?.viewAllowed === "Y" ? "Yes" : "No"}</React.Fragment>;
    };
    const insertBody = (rowData) => {
        return <React.Fragment>{rowData?.insertAllowed === "Y" ? "Yes" : "No"}</React.Fragment>;
    };
    const updateBody = (rowData) => {
        return <React.Fragment>{rowData?.updateAllowed === "Y" ? "Yes" : "No"}</React.Fragment>;
    };
    const isActiveBody = (rowData) => {
        return <React.Fragment>{rowData?.isActive === "Y" ? "Yes" : rowData?.isActive === "N" ? "No" : null}</React.Fragment>;
    };

    return (
        <div>
            <div className="Top__Btn">
                <Button label="Add New" className="Btn__Dark" onClick={() => setDisplayModal(true)} />
            </div>

            <Dialog header={editable ? "Edit Roles Right" : "Add Roles Right"} visible={displayModal} blockScroll={true} draggable={true} style={{ width: "50vw" }} onHide={() => onHide()}>
                <AddEditRolesRights onHide={onHide} editable={editable} roleRightsRowData={roleRightsRowData} getRoleRights={getRoleRights} roleId={roleId} />
            </Dialog>

            <div className="card p-datatable-sm">
                <DataTable header="Role Rights" paginator rows={10} value={rights} emptyMessage="No data found.">
                    <Column filter field="menuDescription" header="Decsription" />
                    <Column filter field="viewAllowed" body={viewedBody} header="View Allowed" />
                    <Column filter field="insertAllowed" body={insertBody} header="Insert Allowed" />
                    <Column filter field="updateAllowed" body={updateBody} header="Update Allowed" />
                    <Column filter field="isActive" body={isActiveBody} header="Is Active" />
                    <Column body={actionTemplate} header="Action" />
                </DataTable>
            </div>
        </div>
    );
}

export default RoleRights;
