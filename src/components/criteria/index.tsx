import React from 'react';

const Criterias: React.FC = () => {
    return (
        <div className="flex flex-row justify-center items-center m-2 space-x-4">
            <div className=" text-center">Select the priority:</div>
            <div className="flex flex-row justify-between space-x-4">
                <button
                    type="button"
                    className="flex-grow border rounded p-2 shadow-lg focus:bg-blue-800 focus:text-white"
                >
                    Savings
                </button>
                <button
                    type="button"
                    className="flex-grow border p-2 rounded shadow-lg focus:bg-blue-800 focus:text-white"
                >
                    Favorite
                </button>
                <button
                    type="button"
                    className="flex-grow border p-2 rounded shadow-lg focus:bg-blue-800 focus:text-white"
                >
                    Equal
                </button>
                <button
                    type="button"
                    className="flex-grow border p-2 rounded shadow-lg focus:bg-blue-800 focus:text-white"
                >
                    Well behaved
                </button>
            </div>
        </div>
    );
};

export default Criterias;
