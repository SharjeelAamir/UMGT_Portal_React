import React, { useState, useEffect } from "react";

/*eslint-disable*/

function OversearBulkDataCustom({ handleImages }) {
    const upload = React.useRef(null);
    const [files, setfiles] = useState([]);
    const [filesImage, setfilesImage] = useState([]);
    const [loading, setloading] = useState(false);

    const onFileChange = async (e) => {
        setloading(true);
        await getBase64(e.target.files[0]);
        let newfiles = filesImage;
        newfiles.push(e.target.files[0]);
        setfilesImage(newfiles);
        setloading(false);
    };

    async function getBase64(file) {
        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "file/*") {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                if (!files.some((file) => file?.fileBase64 === reader.result)) {
                    let newfiles = JSON.parse(JSON.stringify(files));
                    const filetype = file.type.split("/");
                    newfiles.push({
                        fileBase64: reader.result,
                        fileName: file.name,
                        fileSize: file.size,
                        fileExt: `.${filetype[1]}`,
                    });
                    setfiles(newfiles);
                }
            };
        } else {
            alert("This File type not supported");
        }
    }

    const handleRemove = (b64) => {
        let rmfile = "";
        files.forEach((element) => {
            if (JSON.stringify(element?.fileBase64) === JSON.stringify(b64)) {
                rmfile = element;
            }
        });
        let newArr = files.filter((file) => JSON.stringify(file?.fileBase64) !== JSON.stringify(b64));
        setfiles(newArr);
        let newArrImage = filesImage.filter((file) => file?.name !== rmfile?.fileName);
        setfilesImage(newArrImage);
    };

    const handleChange = (b64, desc) => {
        let idx = files.findIndex((file) => JSON.stringify(file?.fileBase64) === JSON.stringify(b64));
        let newArr = JSON.parse(JSON.stringify(files));
        newArr[idx].filedescr = desc;
        setfiles(newArr);
    };

    const handleClear = () => {
        setfiles([]);
    };

    useEffect(() => {
        handleImages(filesImage);
    }, [filesImage, handleImages]);

    return (
        <div className="uploadWrapper">
            <input type="file" accept="image/gif, image/jpeg, image/png" style={{ display: "none" }} ref={upload} multiple="multiple" onChange={onFileChange} />
            <button variant="contained" onClick={() => upload.current.click()} color="default">
                Upload
            </button>
            &nbsp;
            <button onClick={handleClear} variant="contained">
                Clear
            </button>
            <div className="imageflex">
                {files.length ? (
                    files.map((file) => (
                        <div className="cardflex" key={file?.fileBase64}>
                            <img src={file?.fileBase64} width="60px" alt="img" />
                            <p>{(file?.fileSize / (1024 * 1024)).toFixed(2) + " MB"}</p>
                            <button className="removeBtn" onClick={() => handleRemove(file?.fileBase64)}>
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <center>
                        <h6 className="imageplaceholder">Please Upload Images</h6>
                    </center>
                )}
                {loading && <h5>Loading</h5>}
            </div>
        </div>
    );
}

export default OversearBulkDataCustom;
