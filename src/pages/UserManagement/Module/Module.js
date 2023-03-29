import React, { useState, useEffect } from "react";
import { handleGetRequest } from "../../../services/GetTemplate";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useHistory } from "react-router-dom";
import AddEditModule from "./AddEditModule";

function Module() {
    const [module, setModule] = useState([]);
    const [loading, setloading] = useState([]);
    const [displayModal, setDisplayModal] = useState(false);
    const [editable, setEditable] = useState(false);
    const [moduleRowData, setmoduleRowData] = useState("");

    let history = useHistory();

    const editHandler = (rowData) => {
        setDisplayModal(true);
        setmoduleRowData(rowData);
        setEditable(true);
    };

    const moduleData = [
        {
            moduleDescr: "example 1",
        },
        { moduleDescr: "example 2" },
        { moduleDescr: "example 3" },
    ];

    const getModule = async () => {
        setloading(true);
        // const response = await handleGetRequest("/zmiles_user_management/zumngt/getAllModule");
        // setModule(response?.data);
        setloading(false);
    };

    useEffect(() => {
        getModule();
    }, []);

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button tooltip="Edit" icon="pi pi-pencil" tooltipOptions={{ position: "top" }} onClick={() => editHandler(rowData)} className="p-button-rounded p-button-warning mr-2" />
                <Button tooltip="View Details" tooltipOptions={{ position: "top" }} icon="pi pi-eye" onClick={() => history.push(`/getmenu`)} className="p-button-rounded p-button-primary p-mr-2" />
            </div>
        );
    };

    const onHide = () => {
        setDisplayModal(false);
        setEditable(false);
    };

    return (
        <div>
            <div className="Top__Btn">
                <Button label="Add New" className="Btn__Dark" onClick={() => setDisplayModal(true)} />
            </div>
            <Dialog visible={displayModal} style={{ width: "50vw" }} onHide={() => onHide()}>
                <AddEditModule onHide={onHide} editable={editable} moduleRowData={moduleRowData} getModule={getModule} />
            </Dialog>

            <div className="card p-datatable-sm">
                <DataTable header="Module" filterDisplay="row" paginator rows={10} value={moduleData} emptyMessage="No data found.">
                    <Column filter field="moduleDescr" header="Description" />
                    <Column body={actionTemplate} header="Action" />
                </DataTable>
            </div>
        </div>
    );
}

export default Module;
