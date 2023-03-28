import React, { useState } from "react";
import { handlePostRequest } from "../../services/PostTemplate";
import MultipleFileUploadCustom from "../../components/multiFileUplaodCustom";
import { useDispatch } from "react-redux";

const OverseaBulkDataCustome = () => {
    const [imgData, setImgData] = useState([]);
    const dispatch = useDispatch();

    //uplaod file code
    const handleImages = (images) => {
        setImgData(images);
    };

    const uploadHandler = (e) => {
        e.preventDefault();
        const data = new FormData();
        let x = 1;
        imgData.forEach((item) => {
            if (x === 1) data.append("file", item);
            else data.append("file-" + x, item);
            x++;
        });
        dispatch(handlePostRequest(data, "/api/upload", true, true, 8081));
    };

    return (
        <div>
            <MultipleFileUploadCustom handleImages={handleImages} variant="contained" />
            <button onClick={(e) => uploadHandler(e)}>upload</button>
        </div>
    );
};

export default OverseaBulkDataCustome;
