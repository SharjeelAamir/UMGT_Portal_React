import React, { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { useFormik } from "formik";
import classNames from "classnames";
import { handlePostRequest } from "../../../services/PostTemplate";
import { handlePutRequest } from "../../../services/PutTemplate";
import { Button } from "primereact/button";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const AddEditMenu = ({ onHide, editable, menuRowData, getMenu }) => {
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("pi pi-save");
    const menuId = menuRowData.umgtMenuId;

    const dispatch = useDispatch();
    const appUserId = useSelector((state) => state?.userIdSlice?.userId);
    useEffect(() => {
        if (menuRowData !== undefined || menuRowData !== null) {
            formik.setFieldValue("iconName", menuRowData.iconName);
        }
    }, [menuRowData]);

    useEffect(() => {
        if (menuRowData !== undefined || menuRowData !== null) {
            formik.setFieldValue("iconPath", menuRowData.iconPath);
        }
    }, [menuRowData]);
    useEffect(() => {
        if (menuRowData !== undefined || menuRowData !== null) {
            formik.setFieldValue("menuCode", menuRowData.menuCode);
        }
    }, [menuRowData]);
    useEffect(() => {
        if (menuRowData !== undefined || menuRowData !== null) {
            formik.setFieldValue("menuPath", menuRowData.menuPath);
        }
    }, [menuRowData]);
    useEffect(() => {
        if (menuRowData !== undefined || menuRowData !== null) {
            formik.setFieldValue("menuDescr", menuRowData.menuDescr);
        }
    }, [menuRowData]);
    useEffect(() => {
        if (!editable) {
            formik.resetForm();
        }
    }, [editable]);

    const validationSchema = Yup.object().shape({
        menuDescr: Yup.string().required("This field is required."),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            menuDescr: "",
        },
        onSubmit: async (data) => {
            setloading(true);
            setloadingIcon("pi pi-spin pi-spinner");
            data["userId"] = appUserId;

            if (editable === true) {
                data["menuId"] = menuId;
                const res = await dispatch(handlePutRequest(data, "/zmiles_user_management/zumngt/updateMenu", true, true));
                if (res?.responsecode === 1) {
                    await getMenu();
                    onHide();
                    formik.resetForm();
                }
            } else {
                const res = await dispatch(handlePostRequest(data, "/zmiles_user_management/zumngt/saveMenu", true, true));
                if (res?.responsecode === 1) {
                    await getMenu();
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

    //dropdown
    const [selectedValue, setSelectedValue] = useState(null);
    const onValueChange = (e) => {
        setSelectedValue(e.value);
    }
    const values = [
        { name: 'value 1', },
        { name: 'value 2', },
        { name: 'value 3', },
    ];
    return (
        <>
            <div className="card Card__Round">
                <div className="Form__Header">
                    <h1>{editable ? "Edit Menu" : "Add Menu"}</h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="p-fluid p-mt-2">
                    <div className="p-field p-col-12 p-md-12">
                        <div className="p-field">
                            <label htmlFor="iconName" className={classNames({ "p-error": isFormFieldValid("iconName") }, "Label__Text")}>
                                Icon Name<span className="Label__Required">*</span>
                            </label>
                            <InputText
                                placeholder="Add Icon Name"
                                id="iconName"
                                name="iconName"
                                value={formik?.values?.iconName?.replace(/\s\s+/g, " ")}
                                onChange={formik.handleChange}
                                className={classNames({ "p-invalid": isFormFieldValid("iconName") }, "TextArea__Round")}
                            />
                            {getFormErrorMessage("iconName")}
                        </div>

                        <div className="p-field">
                            <label htmlFor="iconPath" className={classNames({ "p-error": isFormFieldValid("iconPath") }, "Label__Text")}>
                                Icon Path<span className="Label__Required">*</span>
                            </label>
                            <InputText
                                placeholder="Add Icon Path"
                                id="iconPath"
                                name="iconPath"
                                value={formik?.values?.iconPath?.replace(/\s\s+/g, " ")}
                                onChange={formik.handleChange}
                                className={classNames({ "p-invalid": isFormFieldValid("iconPath") }, "TextArea__Round")}
                            />
                            {getFormErrorMessage("iconPath")}
                        </div>
                        <div className="p-field">
                            <label htmlFor="menuCode" className={classNames({ "p-error": isFormFieldValid("menuCode") }, "Label__Text")}>
                                Menu Code<span className="Label__Required">*</span>
                            </label>
                            <InputText
                                placeholder="Add Menu Code"
                                id="menuCode"
                                name="menuCode"
                                value={formik?.values?.menuCode?.replace(/\s\s+/g, " ")}
                                onChange={formik.handleChange}
                                className={classNames({ "p-invalid": isFormFieldValid("menuCode") }, "TextArea__Round")}
                            />
                            {getFormErrorMessage("menuCode")}
                        </div>
                        <div className="p-field">
                            <label htmlFor="menuPath" className={classNames({ "p-error": isFormFieldValid("menuPath") }, "Label__Text")}>
                                Menu Path<span className="Label__Required">*</span>
                            </label>
                            <InputText
                                placeholder="Add Menu Path"
                                id="menuPath"
                                name="menuPath"
                                value={formik?.values?.menuPath?.replace(/\s\s+/g, " ")}
                                onChange={formik.handleChange}
                                className={classNames({ "p-invalid": isFormFieldValid("menuPath") }, "TextArea__Round")}
                            />
                            {getFormErrorMessage("menuPath")}
                        </div>
                        <div className="p-field">
                            <label htmlFor="menuType" className={classNames({ "p-error": isFormFieldValid("menuType") }, "Label__Text")}>
                                Menu Type<span className="Label__Required">*</span>
                            </label>
                            <Dropdown
                                // className="p-dropdown"
                                style={{ "lineHeight": 0.2 }}
                                value={selectedValue}
                                options={values}
                                onChange={onValueChange}
                                optionLabel="name"
                                // placeholder="Add Menu Type"
                                className={classNames({ "p-invalid": isFormFieldValid("menuPath") }, "TextArea__Round")}
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="menuDescr" className={classNames({ "p-error": isFormFieldValid("menuDescr") }, "Label__Text")}>
                                Description<span className="Label__Required">*</span>
                            </label>
                            <InputTextarea
                                placeholder="Add Description"
                                id="menuDescr"
                                name="menuDescr"
                                value={formik?.values?.menuDescr?.replace(/\s\s+/g, " ")}
                                rows={5}
                                cols={10}
                                autoResize="false"
                                onChange={formik.handleChange}
                                className={classNames({ "p-invalid": isFormFieldValid("menuDescr") }, "TextArea__Round")}
                            />
                            {getFormErrorMessage("menuDescr")}
                        </div>

                    </div>
                    <div className="Down__Btn">
                        <Button disabled={loading} icon={loadingIcon || ""} iconPos="right" label={editable ? "Update" : "Add"} className="Btn__Dark" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddEditMenu;
