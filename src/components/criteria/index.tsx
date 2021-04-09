import React from 'react';

const Criterias: React.FC = () => {
    return (
        <div className="flex flex-row justify-center items-center m-2 space-x-4">
            <div className=" text-center">Select the priority:</div>
            <div className="flex flex-row justify-between space-x-4">
                <div className="flex-grow border p-2 shadow-lg">Savings</div>
                <div className="flex-grow border p-2 shadow-lg">Favorite</div>
                <div className="flex-grow border p-2 shadow-lg">Equal</div>
                <div className="flex-grow border p-2 shadow-lg">Well behaved</div>
            </div>
        </div>
    );
};

export default Criterias;
