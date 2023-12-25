import React from 'react';
import { Icon } from '../ui';
import './index.scss';

const Balance = ({ value }) => {
    return (
        <div className='balance'>
            <span>{value}</span>
            <Icon slug='int' />
        </div>
    );
}

export default Balance;
