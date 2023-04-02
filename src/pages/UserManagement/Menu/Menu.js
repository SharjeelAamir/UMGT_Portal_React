import React, { useState, useEffect } from "react";
import { handleGetRequest } from "../../../services/GetTemplate";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useHistory } from "react-router-dom";
import AddEditMenu from "./AddEditMenu";

function Menu() {
    const [menu, setMenu] = useState([]);
    const [loading, setloading] = useState([]);
    const [displayModal, setDisplayModal] = useState(false);
    const [editable, setEditable] = useState(false);
    const [menuRowData, setmenuRowData] = useState("");

    let history = useHistory();

    const editHandler = (rowData) => {
        setDisplayModal(true);
        setmenuRowData(rowData);
        setEditable(true);
    };

    const menuData = [
        {

            iconName: "example 1",
            iconPath: "example 1",
            menuDescr: "example 1",
            menuCode: "example 1",
            menuPath: "example 1"
        },
        {
            iconName: "example 2",
            iconPath: "example 2",
            menuDescr: "example 2",
            menuCode: "example 2",
            menuPath: "example 2"
        },
        {
            iconName: "example 3",
            iconPath: "example 3",
            menuDescr: "example 3",
            menuCode: "example 3",
            menuPath: "example 3"
        },
    ];

    const getMenu = async () => {
        setloading(true);
        // const response = await handleGetRequest("/zmiles_user_management/zumngt/getAllMenu");
        // setMenu(response?.data);
        setloading(false);
    };

    useEffect(() => {
        getMenu();
    }, []);

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button tooltip="Edit" icon="pi pi-pencil" tooltipOptions={{ position: "top" }} onClick={() => editHandler(rowData)} className="p-button-rounded p-button-warning mr-2" />
                {/* <Button tooltip="View Details" tooltipOptions={{ position: "top" }} icon="pi pi-eye" onClick={() => history.push(`/getmenu`)} className="p-button-rounded p-button-primary p-mr-2" /> */}
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
                <AddEditMenu onHide={onHide} editable={editable} menuRowData={menuRowData} getMenu={getMenu} />
            </Dialog>

            <div className="card p-datatable-sm">
                <DataTable header="Menu"
                    // filterDisplay="row"
                    paginator rows={10}
                    value={menuData}
                    emptyMessage="No data found.">
                    <Column filter field="iconName" header="Icon Name" />
                    <Column filter field="iconPath" header="Icon Path" />
                    <Column filter field="menuDescr" header="Description" />
                    <Column body={actionTemplate} header="Action" />
                </DataTable>
            </div>
        </div>
    );
}

export default Menu;
