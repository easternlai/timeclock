import React, { Fragment, useEffect, useState } from 'react'

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import HomeBody from '../../components/HomeBody/HomeBody';

const HomePage = () => {
    

    return (
        <Fragment>
            <body>
                <Header />
                <Sidebar />
                <HomeBody />
            </body>
        </Fragment>
    )
}

export default HomePage;
