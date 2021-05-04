import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import CartContext from '../../context/cartContext';
import './../../assets/Summary.scss';

const Summary: React.FC<ISummaryProps> = ({ findTotalNum, findTotalSum, filterFunction, isApproved }) => {
    const { carts } = useContext(CartContext);
    const [filterCarts, setFilterCarts] = useState<ICart[]>([]);

    useEffect(() => {
        const filterArr = filterFunction();
        // get data from fakestore api
        (async () => {
            let cartArr: ICart[] = [];
            for (let i = 0; i < filterArr.length; i++) {
                const response = await axios.patch(`https://fakestoreapi.com/carts/${filterArr[i].id}`, {
                    ...filterArr[i]
                });
                cartArr = [...cartArr, { ...response.data }];
            }
            setFilterCarts([...cartArr]);
        })();
    }, [carts]);

    return (
        <div className="Summary">
            <div>{isApproved ? 'Approved cart' : 'Discarded cart'}</div>
            <div>
                <div>
                    <div>Name</div>
                    <div>Gifts</div>
                    <div>Sum</div>
                </div>
                <div>
                    {filterCarts.map((cart) => (
                        <div>
                            <div>Child {cart.id}</div>
                            <div>{cart.products.length}</div>
                            <div>
                                {cart.products.length !== 0
                                    ? cart.products.map((product) => parseFloat(product.price)).reduce((a, b) => a + b)
                                    : ''}
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div>Total :</div>
                    <div>{filterCarts.length !== 0 ? findTotalNum(filterCarts) : ''}</div>

                    <div>{filterCarts.length !== 0 ? findTotalSum(filterCarts).toFixed(2) : ''}</div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
