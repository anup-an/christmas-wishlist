import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/main.css';
import WishList from './components/wishlist';
import Criterias from './components/criteria';
import CartContext from './context/cartContext';

const App = (): JSX.Element => {
    const [carts, setCarts] = useState<ICart[]>([]);

    const getProduct = async (product: IProduct) => {
        try {
            const p = await axios.get(`https://fakestoreapi.com/products/${product.productId}`);

            product.title = p.data.title;
            product.image = p.data.image;
            product.price = p.data.price;
            return product;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const data = await axios.get('https://fakestoreapi.com/carts?limit=5');

                const cartData = data.data.map((cart: ICart) => {
                    const productArray = cart.products.map((product) => getProduct(product));
                    (async function () {
                        for await (const val of productArray) {
                            return val;
                        }
                    })();

                    return {
                        ...cart
                    };
                });
                setTimeout(function () {
                    const updatedData = cartData
                        .map((cart: ICart, cartIndex: number) =>
                            cartIndex === 1 || cartIndex === 3
                                ? { ...cart, isWellBehaved: true }
                                : { ...cart, isWellBehaved: false }
                        )
                        .map((cart: ICart) => ({ ...cart, isApproved: false }))
                        .map((cart: ICart) => ({
                            ...cart,
                            products: cart.products.map((product: IProduct, productIndex: number) =>
                                productIndex === 0
                                    ? { ...product, isFavourite: true }
                                    : { ...product, isFavourite: false }
                            )
                        }));
                    localStorage.setItem('CartList', JSON.stringify(updatedData));

                    setCarts([...updatedData]);
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div>
            {carts !== [] ? (
                <CartContext.Provider value={{ carts, setCarts }}>
                    <div className="flex flex-col space-y-16">
                        <Criterias />
                        <WishList />
                    </div>
                </CartContext.Provider>
            ) : (
                <div>Loading data .....</div>
            )}
        </div>
    );
};

export default App;
