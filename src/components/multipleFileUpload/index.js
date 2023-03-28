import React, { useRef, useState, useEffect } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";

const MultipleFileUpload = ({ handleUpload, isMulti, heading, isConvert64 }) => {
    const [allFiles, setAllFiles] = useState([]);
    const toast = useRef(null);

    const onUpload = async ({ files }) => {
        if (isConvert64) {
            let uploadImages = [];
            await files.forEach(async (file) => {
                getBase64(file).then((data) => {
                    uploadImages.push(data);
                });
            });
            setAllFiles(uploadImages);
        } else {
            const data = new FormData();
            let x = 1;
            files.forEach((item) => {
                if (x === 1) data.append("file", item);
                else data.append("file-" + x, item);
                x++;
            });
            setAllFiles(data);

            // for (var pair of data.entries()) {     for log formdata
            //     console.log(pair[0] + ", " + pair[1]);
            // }
            // console.log("Form data", uploadImages);
        }
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        handleUpload(allFiles);
    }, [allFiles]);

    return (
        <div>
            <Toast ref={toast}></Toast>

            <div className="card">
                <h5>{heading}</h5>
                {/* just change the accept value it will it will work for img and files else
               accept= "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"   for excel files */}
                <FileUpload name="demo[]" multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} customUpload={true} uploadHandler={onUpload} chooseLabel="Select Files" mode={isMulti ? "advanced" : "basic"} />
            </div>
        </div>
    );
};

export default MultipleFileUpload;
