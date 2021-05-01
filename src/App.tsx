import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/App.scss';
import './assets/main.css';
import WishListArray from './components/wishlist';
import Criterias from './components/criteria';
import CartContext from './context/cartContext';

const App = (): JSX.Element => {
    const [carts, setCarts] = useState<ICart[]>([]);
    const [feedback, setFeedback] = useState<string>('');
    const [criteria, setCriteria] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    //fetches data from api
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

    // selects cart
    const approveCart = (selectedCart: ICart) => {
        const myCarts: ICart[] = [...carts];
        const arrLength = selectedCart.products.filter((product) => product.isApproved === true).length;
        setCriteria('');

        for (let i = 0; i < myCarts.length; i++) {
            if (selectedCart.id == myCarts[i].id && arrLength !== 0) {
                if (myCarts[i].isApproved === true) {
                    myCarts[i] = {
                        ...myCarts[i],
                        isApproved: false,
                        products: myCarts[i].products.map((product) => ({ ...product, isApproved: false }))
                    };
                    setFeedback(`Cart of child ${selectedCart.id} is unselected`);
                } else if (myCarts[i].isApproved === false) {
                    myCarts[i] = { ...myCarts[i], isApproved: true };

                    setFeedback(`Cart of child ${selectedCart.id}  is selected. Click add button to add it to cart`);
                }
            } else if (selectedCart.id == myCarts[i].id && arrLength == 0) {
                setFeedback(
                    `Selection error!! Please select at least gift item from the wishlist of child ${selectedCart.id}.`
                );
            }
        }
        setCarts(myCarts);
    };

    //selects product
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
        const updateByProduct = updatedCarts.map((cart) =>
            cart.id === cartId && cart.products.filter((product) => product.isApproved === true).length === 0
                ? { ...cart, isApproved: false }
                : { ...cart }
        );
        setCarts([...updateByProduct]);
        setCriteria('');
        setFeedback(`1 product edited in wishlist of child ${cartId}`);
    };

    // adds selected wishlists to cart
    const addToCart = () => {
        const addedCarts = carts.map((cart) =>
            cart.isApproved === true ? { ...cart, isInCart: true } : { ...cart, isInCart: false }
        );
        addedCarts.filter((cart) => cart.isInCart === true).length !== 0
            ? setFeedback('Added selected wishlist to cart')
            : setFeedback('Error!! Wishlist not added to cart. Select at least 1 wishlist');

        setCarts([...addedCarts]);
        setCriteria('');
    };

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const data = await axios.get('https://fakestoreapi.com/carts?limit=5');

                const cartData = data.data.map((cart: ICart) => {
                    const productArray = cart.products.map((product) => getProduct(product));
                    (async function () {
                        for await (const val of productArray) {
                            setLoading(false);

                            return val;
                        }
                    })();
                    setLoading(false);

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
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div>
            {!loading ? (
                <CartContext.Provider value={{ carts, setCarts }}>
                    <div className="app">
                        <Criterias
                            criteria={criteria}
                            setCriteria={setCriteria}
                            feedback={feedback}
                            setFeedback={setFeedback}
                            approveCart={approveCart}
                            approveProduct={approveProduct}
                            addToCart={addToCart}
                        />
                        <WishListArray
                            criteria={criteria}
                            setCriteria={setCriteria}
                            feedback={feedback}
                            setFeedback={setFeedback}
                            approveCart={approveCart}
                            approveProduct={approveProduct}
                            addToCart={addToCart}
                        />
                    </div>
                </CartContext.Provider>
            ) : (
                <div className="app-loader">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M14.66 15.66A8 8 0 1117 10h-2a6 6 0 10-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z" />
                        </svg>
                        <div>Loading page .....</div>
                        <div>This may take a few seconds, please don't close the page.</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
