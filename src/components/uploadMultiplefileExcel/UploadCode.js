import React,{useState,useRef} from 'react'
import { handlePostRequest } from '../../../service/PostTemplate';
import {Button} from 'primereact/button'
import { useDispatch } from 'react-redux';

function UploadCode() {

const dispatch = useDispatch()
    const upload = useRef(null);
    const [selectedFile, setselectedFile] = useState();
    const [fileName, setfileName] = useState("");
    const handleExcelFile = async (selectedFile) => {
        console.log(selectedFile);
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res = await dispatch(handlePostRequest(formData, "aisWC/hsCode/readHSCodesFromExcel", true));
        console.log(res)
    };


    const onFileChange = (e) => {
        setselectedFile(e.target.files[0]);
        setfileName(e.target.files[0].name);
    };

  return (
    <div className="card mt-4">
    <div className="formgrid grid mt-4">
        <div className="field col-12 md:col-12 button-style">
            <h3>Please Select an Excel file to upload</h3>
            <label>Upload Excel File:</label>
            <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ref={upload} style={{ display: "none" }} onChange={onFileChange} />
            <Button
                style={{ marginLeft: "10px" }}
                className="button-style"
                onClick={(e) => {
                    e.preventDefault();
                    upload.current.click();
                }}
                label="Upload"
            />{" "}
            <label>{fileName}</label>
            {fileName !== ""?  <Button
                style={{ marginLeft: "10px" }}
                className="button-style"
                onClick={(e) => {
                    e.preventDefault();
                    handleExcelFile(selectedFile)
                }}
                label="Submit"
            />: null}
           
        </div>
        </div>
        </div>
  )
}

export default UploadCode