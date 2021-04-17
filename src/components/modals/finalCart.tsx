import React, { useState, useContext, useEffect } from 'react';
import WishList from '../wishlist/wishList';
import CartContext from '../../context/cartContext';
import CartSummary from './cartSummary';
import axios from 'axios';

const FinalCart: React.FC<IFinalCartProps> = ({ setIsOpen, approveCart, approveProduct }) => {
    const { carts, setCarts } = useContext(CartContext);

    const approveCarts = () => {
        return carts
            .filter((cart) => cart.isInCart === true && cart.isApproved === true)
            .filter((cart) => cart.products.filter((product) => product.isApproved === true) !== [])
            .map((cart) => ({ ...cart, products: cart.products.filter((product) => product.isApproved === true) }));
    };

    const discardCarts = () => {
        const notApproved = carts.filter(
            (cart) =>
                cart.isInCart === false ||
                (cart.isInCart === true && cart.products.filter((product) => product.isApproved === false) !== []) ||
                cart.isApproved === false
        );
        const discardCarts = notApproved.map((cart) => ({
            ...cart,
            products:
                cart.isApproved === false
                    ? cart.products
                    : cart.products.filter((product) => product.isApproved === false)
        }));
        return discardCarts;
    };

    const approvedCarts: ICart[] = approveCarts();
    const discardedCarts: ICart[] = discardCarts();

    const [displayApprovedCart, setDisplayApprovedCart] = useState<ICart>(approvedCarts[0]);
    const [displayDiscardedCart, setDisplayDiscardedCart] = useState<ICart>(discardedCarts[0]);

    const slideLeft = (selectedCarts: ICart[], displayCart: ICart, type: string) => {
        const index = selectedCarts.map((e) => e.id).indexOf(displayCart.id);
        if (type === 'approved') {
            index > 0
                ? setDisplayApprovedCart(selectedCarts[index - 1])
                : setDisplayApprovedCart(selectedCarts[selectedCarts.length - 1]);
        } else if (type === 'discarded') {
            index > 0
                ? setDisplayDiscardedCart(selectedCarts[index - 1])
                : setDisplayDiscardedCart(selectedCarts[selectedCarts.length - 1]);
        }
    };

    const slideRight = (selectedCarts: ICart[], displayCart: ICart, type: string) => {
        const index = selectedCarts.map((e) => e.id).indexOf(displayCart.id);
        if (type === 'approved') {
            index < selectedCarts.length - 1
                ? setDisplayApprovedCart(selectedCarts[index + 1])
                : setDisplayApprovedCart(selectedCarts[0]);
        } else if (type === 'discarded') {
            index < selectedCarts.length - 1
                ? setDisplayDiscardedCart(selectedCarts[index + 1])
                : setDisplayDiscardedCart(selectedCarts[0]);
        }
    };

    useEffect(() => {
        const approvedCarts = approveCarts();
        const discardedCarts = discardCarts();
        setDisplayApprovedCart(approvedCarts[0]);
        setDisplayDiscardedCart(discardedCarts[0]);
    }, [carts]);

    return (
        <div>
            <span className="left-0 top-0">
                <button
                    onClick={() => setIsOpen(false)}
                    className="group border rounded shadow-lg border-red-500 w-5 h-5 flex items-center justify-center focus:outline-none hover:bg-red-500"
                >
                    <svg
                        className="w-5 h-5 text-red-500 group-hover:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </span>
            {carts.filter((cart) => cart.isInCart === true).length !== 0 ? (
                <div className="flex flex-row justify-center items-start space-x-4 mt-2 mx-4">
                    <div className="flex flex-col justify-center">
                        <div className="text-center">Approved carts</div>
                        <div className="flex flex-row space-x-6 justify-between">
                            <div className="flex flex-row">
                                <div className="flex flex-row items-center justify-center">
                                    <button
                                        onClick={() => slideLeft(approvedCarts, displayApprovedCart, 'approved')}
                                        type="button"
                                        className={`border visible rounded-full flex items-center justify-center bg-gray-200 hover:bg-blue-800 hover:text-white focus:outline-none`}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <div>
                                        <WishList
                                            cart={displayApprovedCart}
                                            approveCart={approveCart}
                                            approveProduct={approveProduct}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={() => slideRight(approvedCarts, displayApprovedCart, 'approved')}
                                        type="button"
                                        className={`border visible
                         rounded-full flex items-center justify-center bg-gray-200 hover:bg-blue-800 hover:text-white focus:outline-none`}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div>Discarded carts</div>
                        <div className="flex flex-row">
                            <div className="flex flex-row items-center justify-center">
                                <button
                                    onClick={() => slideLeft(discardedCarts, displayDiscardedCart, 'discarded')}
                                    type="button"
                                    className={`border visible rounded-full flex items-center justify-center bg-gray-200 hover:bg-blue-800 hover:text-white focus:outline-none`}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center">
                                <WishList
                                    cart={displayDiscardedCart}
                                    approveCart={approveCart}
                                    approveProduct={approveProduct}
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => slideRight(discardedCarts, displayDiscardedCart, 'discarded')}
                                    type="button"
                                    className={`border visible
                         rounded-full flex items-center justify-center bg-gray-200 hover:bg-blue-800 hover:text-white focus:outline-none`}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <CartSummary
                            approveCarts={approveCarts}
                            discardCarts={discardCarts}
                            approvedCarts={approvedCarts}
                        />
                    </div>
                </div>
            ) : (
                <div className="text-red-500 text-center h-1/2 p-48 flex flex-col space-y-10 text-lg">
                    <div className="flex flex-row space-x-4 items-center justify-center">
                        <svg
                            className="w-24 h-24 text-blue-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <div>Your cart is empty</div>
                    </div>
                    <div className="h-screen-1/2 flex flex-row space-x-4 items-center">
                        <div>Please approve the wishlists from the main page</div>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-blue-800 hover:text-white border rounded border-blue-800 text-blue-800"
                        >
                            Click here
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinalCart;
