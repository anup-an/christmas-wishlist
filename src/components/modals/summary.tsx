import React, { useEffect, useContext, useState } from 'react';
import CartContext from '../../context/cartContext';

const Summary: React.FC<ISummaryProps> = ({ findTotalNum, findTotalSum, filterFunction, isApproved }) => {
    const { carts } = useContext(CartContext);
    const [filterCarts, setFilterCarts] = useState<ICart[]>([]);

    useEffect(() => {
        setFilterCarts([...filterFunction()]);
    }, [carts]);

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
                {filterCarts.map((cart) => (
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
                    <div>{filterCarts.length !== 0 ? findTotalNum(filterCarts) : ''}</div>

                    <div>{filterCarts.length !== 0 ? findTotalSum(filterCarts).toFixed(2) : ''}</div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
