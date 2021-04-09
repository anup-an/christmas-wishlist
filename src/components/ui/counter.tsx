import React from 'react';

const Counter: React.FC<ICounterProps> = ({ quantity }) => {
    return (
        <div className="border shadow-lg border-red-500 flex flex-row space-around divide-x">
            <button type="button" className="p-1 focus:outline-none">
                -
            </button>
            <div className="p-1">{quantity}</div>
            <button type="button" className="p-1 focus:outline-none">
                +
            </button>
        </div>
    );
};

export default Counter;
