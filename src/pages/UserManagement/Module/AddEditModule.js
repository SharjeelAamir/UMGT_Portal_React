import React, { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { useFormik } from "formik";
import classNames from "classnames";
import { handlePostRequest } from "../../../services/PostTemplate";
import { handlePutRequest } from "../../../services/PutTemplate";
import { Button } from "primereact/button";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const AddEditModule = ({ onHide, editable, moduleRowData, getModule }) => {
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("pi pi-save");
    const moduleId = moduleRowData.umgtModuleId;

    const dispatch = useDispatch();
    const appUserId = useSelector((state) => state?.userIdSlice?.userId);

    useEffect(() => {
        if (moduleRowData !== undefined || moduleRowData !== null) {
            formik.setFieldValue("moduleDescr", moduleRowData.moduleDescr);
        }
    }, [moduleRowData]);

    useEffect(() => {
        if (!editable) {
            formik.resetForm();
        }
    }, [editable]);

    const validationSchema = Yup.object().shape({
        moduleDescr: Yup.string().required("This field is required."),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            moduleDescr: "",
        },
        onSubmit: async (data) => {
            setloading(true);
            setloadingIcon("pi pi-spin pi-spinner");
            data["userId"] = appUserId;

            if (editable === true) {
                data["moduleId"] = moduleId;
                const res = await dispatch(handlePutRequest(data, "/zmiles_user_management/zumngt/updateModule", true, true));
                if (res?.responsecode === 1) {
                    await getModule();
                    onHide();
                    formik.resetForm();
                }
            } else {
                const res = await dispatch(handlePostRequest(data, "/zmiles_user_management/zumngt/saveModule", true, true));
                if (res?.responsecode === 1) {
                    await getModule();
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
                <div className="Form__Header">
                    <h1>{editable ? "Edit Module" : "Add Module"}</h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="p-fluid p-mt-2">
                    <div className="p-field p-col-12 p-md-12">
                        <div className="p-field">
                            <label htmlFor="moduleDescr" className={classNames({ "p-error": isFormFieldValid("moduleDescr") }, "Label__Text")}>
                                Description<span className="Label__Required">*</span>
                            </label>
                            <InputTextarea
                                placeholder="Add Description"
                                id="moduleDescr"
                                name="moduleDescr"
                                value={formik?.values?.moduleDescr?.replace(/\s\s+/g, " ")}
                                rows={5}
                                cols={10}
                                autoResize="false"
                                onChange={formik.handleChange}
                                className={classNames({ "p-invalid": isFormFieldValid("moduleDescr") }, "TextArea__Round")}
                            />
                            {getFormErrorMessage("moduleDescr")}
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

export default AddEditModule;
