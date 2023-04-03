import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { handlePostRequest } from "../../../services/PostTemplate";
import { handlePutRequest } from "../../../services/PutTemplate";
import { handleGetRequest } from "../../../services/GetTemplate";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { MultiSelect } from "primereact/multiselect";
import classNames from "classnames";

const AddUserDialog = ({ onHide, editable, userRowData }) => {
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("pi pi-save");
    const [roleTypeOptions, setRoleTypeOptions] = useState([]);

    const dispatch = useDispatch();

    const getRoleTypeOptions = async () => {
        const res = await handleGetRequest("/zmiles_user_management/lov/lovRole");
        setRoleTypeOptions(res?.data);
    };

    useEffect(() => {
        getRoleTypeOptions();
    }, []);

    useEffect(() => {
        if (!editable) {
            formik.resetForm();
        }
    }, [editable]);

    const validationSchema = Yup.object().shape({
        roles: Yup.mixed().required("This field is required.").nullable(),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            roles: [],
        },

        onSubmit: async (data) => {
            setloading(true);
            setloadingIcon("pi pi-spin pi-spinner");
            data["userId"] = userRowData?.umgtUserId;
            console.log("data", data);
            const res = await dispatch(handlePostRequest(data, "/zmiles_user_management/zumngt/addUserRoles", true, true));
            if (res?.responsecode === 1) {
                onHide();
                formik.resetForm();
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
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="p-fluid p-formgrid grid mb-5">
                        <div className="p-field col-12 md:col-4">
                            <div className="p-field">
                                <label htmlFor="roles" className={classNames({ "p-error": isFormFieldValid("roles") }, "Label__Text")}>
                                    Role<span className="Label__Required">*</span>
                                </label>
                                <MultiSelect
                                    id="roles"
                                    placeholder="Select Role"
                                    options={roleTypeOptions}
                                    optionLabel="description"
                                    name="roles"
                                    optionValue="id"
                                    value={formik.values.roles}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": isFormFieldValid("roles") }, "Dropdown__Round")}
                                />
                                {getFormErrorMessage("roles")}
                            </div>
                        </div>
                    </div>
                    <div className="Down__Btn" style={{ marginTop: "10px" }}>
                        <Button label="Cancel" className="Btn__Transparent" onClick={onHide} />
                        <Button disabled={loading} icon={loadingIcon || ""} iconPos="right" label="Add" className="Btn__Dark" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddUserDialog;
