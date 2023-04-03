import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { handlePutRequest } from "../../../services/PutTemplate";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import classNames from "classnames";

const UpdateUserDialog = ({ onHideUpdate, editable, userRowData, getUsers }) => {
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("pi pi-save");

    const dispatch = useDispatch();

    useEffect(() => {
        const rowData = JSON?.parse(JSON?.stringify(userRowData));
        const keys = Object?.keys(rowData);
        keys.forEach((item) => {
            formik.setFieldValue(`${item}`, rowData[item]);
        });
        formik.setFieldValue("isActive", rowData?.isActive?.toString());
    }, [userRowData]);

    const isActiveOptions = [
        {
            label: "Yes",
            value: "Y",
        },
        {
            label: "No",
            value: "N",
        },
    ];

    useEffect(() => {
        if (!editable) {
            formik.resetForm();
        }
    }, [editable]);

    const validationSchema = Yup.object().shape({
        isActive: Yup.mixed().required("This field is required.").nullable(),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            isActive: "",
        },

        onSubmit: async (data) => {
            setloading(true);
            setloadingIcon("pi pi-spin pi-spinner");
            data["userId"] = userRowData?.umgtUserId;

            // const res = await dispatch(handlePutRequest(data, "/zmiles_user_management/zumngt/updateUserStatus", true, true));
            // if (res?.responsecode === 1) {
            //     onHideUpdate();
            //     formik.resetForm();
            //     await getUsers();
            // }

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
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="p-fluid p-formgrid grid mb-5">
                        <div className="p-field col-12 md:col-4">
                            <div className="p-field">
                                <label htmlFor="isActive" className={classNames({ "p-error": isFormFieldValid("isActive") }, "Label__Text")}>
                                    Active<span className="Label__Required">*</span>
                                </label>
                                <Dropdown
                                    id="isActive"
                                    placeholder="Select Active"
                                    options={isActiveOptions}
                                    optionLabel="label"
                                    name="isActive"
                                    optionValue="value"
                                    value={formik.values.isActive}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": isFormFieldValid("isActive") }, "Dropdown__Round")}
                                />
                                {getFormErrorMessage("isActive")}
                            </div>
                        </div>
                    </div>
                    <div className="Down__Btn" style={{ marginTop: "10px" }}>
                        <Button label="Cancel" className="Btn__Transparent" onClick={onHideUpdate} />
                        <Button disabled={loading} icon={loadingIcon || ""} iconPos="right" label="Update" className="Btn__Dark" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateUserDialog;
