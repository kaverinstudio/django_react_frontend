import React from 'react';
import PortfolioListComponent from "./PortfolioListComponent";
import PortfolioHeader from "./PortfolioHeader";

const PortfolioComponent = () => {

    const breadcrumbs = [
        {name: 'Портфолио', link: ''},
    ]

    return (
        <>
        <PortfolioHeader breadcrumbs={breadcrumbs}/>
         <PortfolioListComponent />
        </>
    );
};

export default PortfolioComponent;