import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/main.css';
import WishList from './components/wishlist';
import Suggestions from './components/suggestions';
import Criterias from './components/criteria';
import CartContext from './context/cartContext';
import initialState from './context/cartContext';

const App = (): JSX.Element => {
    const [carts, setCarts] = useState<ICart[]>([]);
    console.log(carts);

    useEffect(() => {
        (async (): Promise<void> => {
            axios
                .get('https://fakestoreapi.com/carts?limit=5')
                .then((cartResponse) => {
                    cartResponse.data.forEach((cart: ICart) => {
                        cart.products.forEach((product) => {
                            axios
                                .get(`https://fakestoreapi.com/products/${product.productId}`)
                                .then((productResponse) => {
                                    product.title = productResponse.data.title;
                                    product.price = productResponse.data.price;
                                    product.image = productResponse.data.image;
                                })
                                .catch((err) => console.log(err));
                        });
                    });
                    localStorage.setItem('Carts', JSON.stringify(cartResponse.data));

                    setCarts(cartResponse.data);
                })
                .catch((err) => console.log(err));
        })();
    }, []);

    return (
        <div>
            {carts !== [] ? (
                <CartContext.Provider value={{ carts, setCarts }}>
                    <div className="flex flex-col space-y-16">
                        <Criterias />
                        <Suggestions />;
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
