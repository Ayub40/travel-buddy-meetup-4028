import React from "react";

const PatientDashboardLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <h1>Hello World</h1>
            {children}
        </div>
    );

};

export default PatientDashboardLayout;
