import React from 'react'

const Square = ({value, onClick}) => {
    
    return (
        <button className={'square'} onClick={onClick}>
            <span className={value}>{value}</span>
        </button>
    );
}

export default Square;