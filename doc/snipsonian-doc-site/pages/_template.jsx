import React from 'react';
import PropTypes from 'prop-types';

import '../css/styles.scss';

import Header from '../components/header/Header';

const template = ({children}) => (
    <div className="main-wrapper">
        <Header />
        <div className="content-wrapper">
            {children}
        </div>
    </div>
);

template.propTypes = {
    children: PropTypes.node
};

export default template;
