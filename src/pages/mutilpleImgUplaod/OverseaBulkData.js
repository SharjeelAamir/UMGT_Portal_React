import React from "react";
import MultipleFileUpload from "../../components/multipleFileUpload";
import { handlePostRequest } from "../../services/PostTemplate";
import { useDispatch } from "react-redux";

const OverseaBulkData = () => {
    const dispatch = useDispatch();

    const handleUpload = (files) => {
        dispatch(handlePostRequest(files, "api/uploadFiles", true, false));

        // for (var pair of files.entries()) {
        //     console.log(pair[0] + ", " + pair[1]);
        // }
    };

    //

    return (
        <div>
            <MultipleFileUpload handleUpload={handleUpload} heading="Oversea Bulk Data" isMulti={true} isConvert64={false} />
        </div>
    );
};

export default OverseaBulkData;
