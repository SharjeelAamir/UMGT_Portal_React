import React, { useState, useEffect } from "react";
import { handleGetRequest } from "../../../services/GetTemplate";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
import { Dialog } from "primereact/dialog";
// import "../../../../src/components/DataTable.css";
import AddEditRole from "./AddEditRole";

function Roles() {
    const [roles, setRoles] = useState([]);
    const [loading, setloading] = useState([]);
    const [displayModal, setDisplayModal] = useState(false);
    const [editable, setEditable] = useState(false);
    const [roleRowData, setroleRowData] = useState("");

    const users = [
        {
            roleDescr: "Description whatever",
            role: "Admin",
        },
        {
            roleDescr: "Description whatever",
            role: "Admin",
        },
    ];
    let history = useHistory();

    const editHandler = (rowData) => {
        setDisplayModal(true);
        setroleRowData(rowData);
        setEditable(true);
    };
    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button tooltip="Edit" icon="pi pi-pencil" tooltipOptions={{ position: "top" }} onClick={() => editHandler(rowData)} className="p-button-rounded p-button-warning mr-2" />
                <Button tooltip="View Details" icon="pi pi-eye" tooltipOptions={{ position: "top" }} onClick={() => history.push(`/getrolerights?rid=${rowData?.umgtRoleId}`)} className="p-button-rounded p-button-primary p-mr-2" />
            </div>
        );
    };
    const getRoles = async () => {
        setloading(true);
        const response = await handleGetRequest("/zmiles_user_management/zumngt/getAllRole");
        setRoles(response?.data);
        setloading(false);
    };

    useEffect(() => {
        getRoles();
    }, []);

    const onHide = () => {
        setDisplayModal(false);
        setEditable(false);
    };
    return (
        <div>
            <div className="Top__Btn">
                <Button label="Add New" className="Btn__Dark" onClick={() => setDisplayModal(true)} />
            </div>

            <Dialog header={editable ? "Edit Role" : "Add Role"} visible={displayModal} style={{ width: "50vw" }} onHide={() => onHide()}>
                <AddEditRole onHide={onHide} editable={editable} roleRowData={roleRowData} getRoles={getRoles} />
            </Dialog>
            <div className="card p-datatable-sm">
                <DataTable header="Roles" paginator rows={10} value={users} emptyMessage="No data found.">
                    <Column className="Table__Alignment" filter field="roleDescr" header="Role Description" />
                    <Column className="Table__Alignment" body={actionTemplate} header="Action" />
                </DataTable>
            </div>
        </div>
    );
}

export default Roles;
