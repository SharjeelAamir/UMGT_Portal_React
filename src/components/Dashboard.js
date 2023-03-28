import React from "react";

const Dashboard = (props) => {
    return (
        <div className="grid">
            <div className="col-12 lg:col-12 xl:col-12">
                <div className="mb-0">
                    <h1 className="Welcome__UMGT">Welcome to home Page </h1>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
};

export default React.memo(Dashboard, comparisonFn);
