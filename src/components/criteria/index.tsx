/* eslint-disable prefer-const */
import React, { useContext, useState } from 'react';
import CartContext from '../../context/cartContext';

const Criterias: React.FC = () => {
    const { carts, setCarts } = useContext(CartContext);

    const newCarts = carts.map((cart) => ({
        ...cart,
        products: []
    }));
    const oldCarts = carts.map((cart) => ({
        ...cart
    }));
    // finds index of the product with minimum price from a list of products
    const findIndex = (products: IProduct[]) => {
        const index = products
            .map((product) => parseFloat(product.price))
            .indexOf(Math.min(...products.map((product) => parseFloat(product.price))));
        return index;
    };
    const findCart = (cart: ICart, oldCarts: ICart[]) => {
        const foundCart = oldCarts.filter((e) => e.id === cart.id)[0];
        return foundCart;
    };

    const findMinProduct = (cart: ICart, oldCarts: ICart[]) => {
        const MinProduct = findCart(cart, oldCarts).products.filter(
            (product) => product === findCart(cart, oldCarts).products[findIndex(findCart(cart, oldCarts).products)]
        );
        return MinProduct;
    };

    const selectFavourites = () => {
        const favourites = carts.map((cart) => ({
            ...cart,
            products: cart.products.filter((product) => product.isFavourite === true)
        }));
        setCarts([...favourites]);
    };

    // Returns array of carts containing only the product with minimum price
    const getCartsMin = (oldCarts: ICart[], newCarts: ICart[]) => {
        const x = newCarts.map((cart: ICart) => ({
            ...cart,
            products: [...cart.products, ...findMinProduct(cart, oldCarts)].map((product) => ({
                ...product,
                quantity: 1
            }))
        }));

        const y = oldCarts.map((cart: ICart) => ({
            ...cart,
            products: cart.products
                .filter((product) => product.productId !== findMinProduct(cart, oldCarts)[0].productId)
                .map((product) => ({
                    ...product,
                    quantity: product.quantity - 1
                }))
        }));
        const n = newCarts.map((cart) => ({
            cart_id: cart.id,
            num_items: cart.products.length
        }));

        return { y, x, n };
    };
    const optimizeEqualNumber = (oldCarts: ICart[], newCarts: ICart[]) => {
        const updatedCarts = getCartsMin(oldCarts, newCarts);
        const itemsArray = updatedCarts.n.map((cart) => cart.num_items);
        const isEqual = itemsArray.every((value) => value !== 0 && value === itemsArray[0]);

        if (isEqual) {
            optimizeEqualNumber(updatedCarts.y, updatedCarts.x);
        } else {
            setCarts(updatedCarts.x);
        }

        /*         const arr1 = carts.x;
        const arr2 = carts.y;
        const cost = carts.cost;
        const x = arr2.map((cart) => cart.products.length).reduce((a, b) => a + b);

        if (cost < 500 && x !== 0) {
            maximizeTotalNumber(arr1, arr2);
        }
 */
    };

    return (
        <div>
            <div className="flex flex-row justify-center items-center m-2 space-x-4">
                <div className=" text-center">Select the priority:</div>
                <div className="flex flex-row justify-between space-x-4">
                    <button
                        onClick={selectFavourites}
                        type="button"
                        className="flex-grow border p-2 rounded shadow-lg focus:bg-blue-800 focus:text-white"
                    >
                        Favorite
                    </button>
                    <button
                        onClick={() => optimizeEqualNumber(oldCarts, newCarts)}
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
        </div>
    );
};

export default Criterias;
