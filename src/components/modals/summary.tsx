import React from 'react';

const Summary: React.FC<ISummaryProps> = ({ finalCarts, findTotalNum, findTotalSum, isApproved }) => {
    return (
        <div>
            <div className="bg-blue-800 text-white col-span-3 p-2 text-base">
                {isApproved ? 'Approved cart' : 'Discarded cart'}
            </div>
            <div className="grid grid-cols-3 justify-items-stretch border shadow-lg divide-y">
                <div className="col-span-3 grid grid-cols-3 bg-gray-200 w-full p-1 font-medium">
                    <div>Name</div>
                    <div>Gifts</div>
                    <div>Sum</div>
                </div>
                {finalCarts.map((cart) => (
                    <div className="col-span-3 grid grid-cols-3 p-1">
                        <div>Child {cart.id}</div>
                        <div>{cart.products.length}</div>
                        <div>
                            {cart.products.length !== 0
                                ? cart.products.map((product) => parseFloat(product.price)).reduce((a, b) => a + b)
                                : ''}
                        </div>
                    </div>
                ))}
                <div className="col-span-3 grid grid-cols-3 bg-gray-200 w-full p-1 font-medium">
                    <div>Total :</div>
                    <div>{findTotalNum(finalCarts)}</div>

                    <div>{findTotalSum(finalCarts)}</div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
