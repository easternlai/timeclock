import React from 'react';
import classNames from 'classnames';

const PunchButton = ({children, onClick, clockedIn}) => {

const buttonClasses = classNames({
    'button': true,
    'w-button': true,
    'button-red': clockedIn
})

    return (
        <div onClick={onClick}>
            <a href="#" class={buttonClasses}>{children}</a>
        </div>
    )
}

export default PunchButton;
