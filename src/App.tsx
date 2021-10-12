import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/main.css';
import WishListArray from './components/wishlist';
import Criterias from './components/criteria';
import CartContext from './context/cartContext';

const App = (): JSX.Element => {
    const [carts, setCarts] = useState<ICart[]>([]);
    console.log(carts, 'state cart');
    const [feedback, setFeedback] = useState<string>('');
    const [criteria, setCriteria] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<any[]>([]);
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
                if (myCarts[i].isInCart === true) {
                    myCarts[i] = {
                        ...myCarts[i],
                        isInCart: false
                        //products: myCarts[i].products.map((product) => ({ ...product, isApproved: false }))
                    };
                    setFeedback(`Wishlist of child ${selectedCart.id} is removed from the cart`);
                } else if (myCarts[i].isInCart === false) {
                    myCarts[i] = { ...myCarts[i], isInCart: true };

                    setFeedback(`Wishlist of child ${selectedCart.id}  is added to the cart.`);
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
                ? { ...cart, isInCart: false }
                : { ...cart }
        );
        setCarts([...updateByProduct]);
        setCriteria('');
        setFeedback(`1 product edited in wishlist of child ${cartId}`);
    };

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const data = await axios.get('https://fakestoreapi.com/carts?limit=5');
                setCarts(data.data);
                localStorage.setItem('Carts', JSON.stringify(data.data));

                const cartData2 = data.data.map((cart: ICart) => {
                    return cart.products.map((product) => getProduct(product));
                    /* Promise.all(productArray); */
                    // (async function () {
                    //     for await (const val of productArray) {
                    //         return val;
                    //     }
                    // })();
                    // return {
                    //     ...cart
                    // };
                });
                const updatedData = Promise.all(cartData2.flat(2)).then((data) =>
                    data.map((cart: any, cartIndex: any) => ({
                        ...cart,
                        isApproved: false,
                        isWellBehaved: cartIndex === 1 || cartIndex === 3 ? true : false,
                        isInCart: false,
                        products: cart?.products?.map((product: any, productIndex: any) => ({
                            ...product,
                            isApproved: false,
                            isFavourite: productIndex === 0 ? true : false
                        }))
                    }))
                );
                console.log(await updatedData, 'updated data');
                // added additional properties to the cart and product arrays to facilitate the selection and approval of carts and products
                // setTimeout(function () {
                // const updatedData = cartData?.map((cart: ICart, cartIndex: number) => ({
                //     ...cart,
                //     isApproved: false,
                //     isWellBehaved: cartIndex === 1 || cartIndex === 3 ? true : false,
                //     isInCart: false,
                //     products: cart?.products?.map((product, productIndex) => ({
                //         ...product,
                //         isApproved: false,
                //         isFavourite: productIndex === 0 ? true : false
                //     }))
                // }));
                localStorage.setItem('CartList', JSON.stringify([...(await updatedData)]));
                setLoading(false);

                setProducts([...(await updatedData)]);
                // }, 2000);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className="w-full h-full">
            {!loading ? (
                <CartContext.Provider value={{ carts, setCarts }}>
                    <div className="flex flex-col space-y-16 mb-10">
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
                <div className="flex justify-center items-center m-56 text-lg">
                    <div className="flex flex-col justify-center">
                        <div className="animate-spin w-5 h-5">
                            <svg
                                className="fill-current text-red-500 "
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M14.66 15.66A8 8 0 1117 10h-2a6 6 0 10-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z" />
                            </svg>
                        </div>
                        <div>Loading page .....</div>
                        <div>This may take a few seconds, please don't close the page.</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
