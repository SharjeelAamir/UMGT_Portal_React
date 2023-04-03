import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { handlePostRequest } from "../../../services/PostTemplate";
import { handlePutRequest } from "../../../services/PutTemplate";
import { handleGetRequest } from "../../../services/GetTemplate";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import classNames from "classnames";

const AddEditModule = ({ onHide, editable, roleRightsRowData, getRoleRights, roleId }) => {
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("pi pi-save");
    const [menuOptions, setmenuOptions] = useState([]);

    const dispatch = useDispatch();
    const appUserId = useSelector((state) => state?.userIdSlice?.userId);

    useEffect(() => {
        const rowData = JSON.parse(JSON.stringify(roleRightsRowData));
        const keys = Object.keys(rowData);
        keys.forEach((item) => {
            formik.setFieldValue(`${item}`, rowData[item]);
        });
        formik.setFieldValue("umgtMenuId", rowData?.umgtMenu?.umgtMenuId?.toString());
    }, [roleRightsRowData]);

    const getMenuOptions = async () => {
        const res = await handleGetRequest("/zmiles_user_management/lov/lovMenu");
        setmenuOptions(res?.data);
    };

    useEffect(() => {
        getMenuOptions();
    }, []);

    useEffect(() => {
        if (!editable) {
            formik.resetForm();
        }
    }, [editable]);

    const menuTypeOptions = [
        { label: "Yes", value: "Y" },
        { label: "No", value: "N" },
    ];

    const activeOptions = [
        { label: "Yes", value: "Y" },
        { label: "No", value: "N" },
    ];

    const validationSchema = Yup.object().shape({
        umgtMenuId: Yup.mixed().required("This field is required.").nullable(),
        viewAllowed: Yup.mixed().required("This field is required.").nullable(),
        insertAllowed: Yup.mixed().required("This field is required.").nullable(),
        updateAllowed: Yup.mixed().required("This field is required.").nullable(),
        isActive: Yup.mixed().required("This field is required.").nullable(),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            umgtMenuId: "",
            viewAllowed: "",
            insertAllowed: "",
            updateAllowed: "",
            isActive: "",
        },

        onSubmit: async (data) => {
            setloading(true);
            data["roleId"] = roleId;
            data["userId"] = appUserId;

            setloadingIcon("pi pi-spin pi-spinner");
            if (editable === true) {
                const res = await dispatch(handlePutRequest(data, "/zmiles_user_management/zumngt/updateRoleRights", true, true));
                if (res?.responsecode === 1) {
                    await getRoleRights();
                    onHide();
                    formik.resetForm();
                }
            } else {
                const res = await dispatch(handlePostRequest(data, "/zmiles_user_management/zumngt/saveRoleRights", true, true));
                if (res?.responsecode === 1) {
                    await getRoleRights();
                    onHide();
                    formik.resetForm();
                }
            }

            setloading(false);
            setloadingIcon("pi pi-save");
        },
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <>
            <div className="card Card__Round">
                {/* <div className="Form__Header">
                    <h1>{editable ? 'Edit Roles Right' : 'Add Roles Right'}</h1>
                </div> */}
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="p-fluid p-formgrid grid mb-5">
                        <div className="p-field col-12 md:col-4">
                            <div className="p-field">
                                <label htmlFor="umgtMenuId" className={classNames({ "p-error": isFormFieldValid("umgtMenuId") }, "Label__Text")}>
                                    Menu<span className="Label__Required">*</span>
                                </label>
                                <Dropdown
                                    id="umgtMenuId"
                                    placeholder="Select Menu"
                                    options={menuOptions}
                                    optionLabel="description"
                                    optionValue="id"
                                    name="umgtMenuId"
                                    value={formik.values.umgtMenuId}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": isFormFieldValid("umgtMenuId") }, "Dropdown__Round")}
                                />
                                {getFormErrorMessage("umgtMenuId")}
                            </div>
                        </div>
                        <div className="p-field col-12 md:col-4">
                            <div className="p-field">
                                <label htmlFor="viewAllowed" className={classNames({ "p-error": isFormFieldValid("viewAllowed") }, "Label__Text")}>
                                    View Allowed<span className="Label__Required">*</span>
                                </label>
                                <Dropdown
                                    id="viewAllowed"
                                    placeholder="Select Authorize Allowed"
                                    options={menuTypeOptions}
                                    optionLabel="label"
                                    name="viewAllowed"
                                    value={formik.values.viewAllowed}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": isFormFieldValid("viewAllowed") }, "Dropdown__Round")}
                                />
                                {getFormErrorMessage("viewAllowed")}
                            </div>
                        </div>

                        <div className="p-field col-12 md:col-4">
                            <div className="p-field">
                                <label htmlFor="insertAllowed" className={classNames({ "p-error": isFormFieldValid("insertAllowed") }, "Label__Text")}>
                                    Insert Allowed<span className="Label__Required">*</span>
                                </label>
                                <Dropdown
                                    id="insertAllowed"
                                    placeholder="Select Insert Allowed"
                                    options={menuTypeOptions}
                                    optionLabel="label"
                                    name="insertAllowed"
                                    value={formik.values.insertAllowed}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": isFormFieldValid("insertAllowed") }, "Dropdown__Round")}
                                />
                                {getFormErrorMessage("insertAllowed")}
                            </div>
                        </div>
                        <div className="p-field col-12 md:col-4">
                            <div className="p-field">
                                <label htmlFor="updateAllowed" className={classNames({ "p-error": isFormFieldValid("updateAllowed") }, "Label__Text")}>
                                    Update Allowed<span className="Label__Required">*</span>
                                </label>
                                <Dropdown
                                    id="updateAllowed"
                                    placeholder="Select Updated Allowed"
                                    options={menuTypeOptions}
                                    optionLabel="label"
                                    name="updateAllowed"
                                    value={formik.values.updateAllowed}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": isFormFieldValid("updateAllowed") }, "Dropdown__Round")}
                                />
                                {getFormErrorMessage("updateAllowed")}
                            </div>
                        </div>
                        <div className="p-field col-12 md:col-4">
                            <div className="p-field">
                                <label htmlFor="isActive" className={classNames({ "p-error": isFormFieldValid("isActive") }, "Label__Text")}>
                                    Is Active<span className="Label__Required">*</span>
                                </label>
                                <Dropdown
                                    id="isActive"
                                    placeholder="Select Is Active"
                                    options={activeOptions}
                                    optionLabel="label"
                                    optionValue="value"
                                    name="isActive"
                                    value={formik.values.isActive}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": isFormFieldValid("isActive") }, "Dropdown__Round")}
                                />
                                {getFormErrorMessage("isActive")}
                            </div>
                        </div>
                    </div>
                    <div className="Down__Btn__End" style={{ marginTop: "10px" }}>
                        <Button label="Cancel" className="Btn__Transparent" onClick={onHide} />
                        <Button disabled={loading} icon={loadingIcon || ""} iconPos="right" label={editable ? "Update" : "Add"} className="Btn__Dark" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddEditModule;
