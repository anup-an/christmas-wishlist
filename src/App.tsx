import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/main.css';
import WishListArray from './components/wishlist';
import Criterias from './components/criteria';
import CartContext from './context/cartContext';

const App = (): JSX.Element => {
    const [carts, setCarts] = useState<ICart[]>([]);
    const [feedback, setFeedback] = useState<string>('');
    const [criteria, setCriteria] = useState<string>('');

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

    const approveCart = (selectedCart: ICart) => {
        const editedCarts = carts.map((cart) =>
            selectedCart.id === cart.id ? { ...cart, isApproved: cart.isApproved === true ? false : true } : { ...cart }
        );
        setCarts([...editedCarts]);
        setCriteria('');
        setFeedback(
            `Cart of child ${
                selectedCart.isApproved ? selectedCart.id + ' is unselected' : selectedCart.id + ' is selected'
            }`
        );
    };
    const approveProduct = (productId: number, cartId: number) => {
        const updatedCarts = carts.map((cart) =>
            cart.id === cartId
                ? {
                      ...cart,
                      products: cart.products.map((product) =>
                          product.productId === productId
                              ? { ...product, isApproved: product.isApproved === true ? false : true }
                              : { ...product }
                      )
                  }
                : { ...cart }
        );
        setCarts([...updatedCarts]);
        setCriteria('');
        setFeedback(`1 product edited in wishlist of child ${cartId}`);
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
                // added additional properties to the cart and product arrays to facilitate the selection and approval of carts and products
                setTimeout(function () {
                    const updatedData = cartData.map((cart: ICart, cartIndex: number) => ({
                        ...cart,
                        isApproved: false,
                        isWellBehaved: cartIndex === 1 || cartIndex === 3 ? true : false,
                        isInCart: false,
                        products: cart.products.map((product, productIndex) => ({
                            ...product,
                            isApproved: false,
                            isFavourite: productIndex === 0 ? true : false
                        }))
                    }));
                    localStorage.setItem('CartList', JSON.stringify(updatedData));

                    setCarts([...updatedData]);
                }, 2000);
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
                        <Criterias
                            criteria={criteria}
                            setCriteria={setCriteria}
                            feedback={feedback}
                            setFeedback={setFeedback}
                            approveCart={approveCart}
                            approveProduct={approveProduct}
                        />
                        <WishListArray
                            criteria={criteria}
                            setCriteria={setCriteria}
                            feedback={feedback}
                            setFeedback={setFeedback}
                            approveCart={approveCart}
                            approveProduct={approveProduct}
                        />
                    </div>
                </CartContext.Provider>
            ) : (
                <div>Loading data .....</div>
            )}
        </div>
    );
};

export default App;