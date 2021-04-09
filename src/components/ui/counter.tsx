import React, { useContext } from 'react';
import CartContext from '../../context/cartContext';

const Counter: React.FC<ICounterProps> = ({ quantity, cartId, productId }) => {
    const { carts, setCarts } = useContext(CartContext);

    const decreaseQuantity = () => {
        carts.map((cart) => {
            cart.id === cartId
                ? cart.products.map((product) => {
                      product.productId === productId && product.quantity > 0
                          ? (product.quantity = product.quantity - 1)
                          : '';
                  })
                : '';
        });
        setCarts([...carts]);
    };

    const increaseQuantity = () => {
        carts.forEach((cart) => {
            cart.id === cartId
                ? cart.products.map((product) => {
                      product.productId === productId ? (product.quantity = product.quantity + 1) : '';
                  })
                : '';
        });
        setCarts([...carts]);
    };

    return (
        <div className="border shadow-lg border-red-500 flex flex-row space-around divide-x">
            <button type="button" className="p-1 focus:outline-none" onClick={decreaseQuantity}>
                -
            </button>
            <div className="p-1">{quantity}</div>
            <button type="button" className="p-1 focus:outline-none" onClick={increaseQuantity}>
                +
            </button>
        </div>
    );
};

export default Counter;
