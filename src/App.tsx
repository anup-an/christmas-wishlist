import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/main.css';
import WishList from './components/wishlist';
import Suggestions from './components/suggestions';
import Criterias from './components/criteria';
import CartContext from './context/cartContext';

const App = (): JSX.Element => {
    const [carts, setCarts] = useState<ICart[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const response = await axios.get('https://fakestoreapi.com/carts?limit=5');
                await response.data.forEach((cart: ICart) => {
                    cart.products.forEach((product) => {
                        axios.get(`https://fakestoreapi.com/products/${product.productId}`).then((response) => {
                            product.title = response.data.title;
                            product.price = response.data.price;
                            product.image = response.data.image;
                        });
                    });
                });
                await setCarts(response.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    console.log(carts);

    return (
        <CartContext.Provider value={carts}>
            <div className="flex flex-col space-y-16">
                <Criterias />
                <Suggestions />;
                <WishList />
            </div>
        </CartContext.Provider>
    );
};

export default App;
