import React, { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { useFormik } from "formik";
import { handlePostRequest } from "../../../services/PostTemplate";
import { handlePutRequest } from "../../../services/PutTemplate";
import { Button } from "primereact/button";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import classNames from "classnames";

const AddEditRole = ({ onHide, editable, roleRowData, getRoles }) => {
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("pi pi-save");

    const dispatch = useDispatch();

    const roleId = roleRowData.umgtRoleId;

    useEffect(() => {
        if (roleRowData !== undefined || roleRowData !== null) {
            formik.setFieldValue("roleDescr", roleRowData.roleDescr);
        }
    }, [roleRowData]); // eslint-disable-line

    const validationSchema = Yup.object().shape({
        roleDescr: Yup.string().required("This field is required."),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            roleDescr: "",
        },
        onSubmit: async (data) => {
            setloading(true);
            setloadingIcon("pi pi-spin pi-spinner");

            if (editable === true) {
                data["roleId"] = roleId;
                const res = await dispatch(handlePutRequest(data, "/zmiles_user_management/zumngt/updateRole", true, true));
                if (res?.responsecode === 1) {
                    await getRoles();
                    onHide();
                    formik.resetForm();
                }
            } else {
                const res = await dispatch(handlePostRequest(data, "/zmiles_user_management/zumngt/saveRole", true, true));
                if (res?.responsecode === 1) {
                    await getRoles();
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
                    <h1>{editable ? 'Edit Role' : 'Add Role'}</h1>
                </div> */}
                <form onSubmit={formik.handleSubmit} className="p-fluid p-mt-2">
                    <div className="p-field col-12 md:col-12">
                        <div className="p-field">
                            <label htmlFor="roleDescr" className={classNames({ "p-error": isFormFieldValid("roleDescr") }, "Label__Text")}>
                                Description<span className="Label__Required">*</span>
                            </label>
                            <InputTextarea
                                placeholder="Add Description"
                                id="roleDescr"
                                name="roleDescr"
                                value={formik?.values?.roleDescr?.replace(/\s\s+/g, " ")}
                                rows={5}
                                cols={10}
                                autoResize="false"
                                onChange={formik.handleChange}
                                className={classNames({ "p-invalid": isFormFieldValid("roleDescr") }, "TextArea__Round")}
                            />
                            {getFormErrorMessage("roleDescr")}
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

export default AddEditRole;
