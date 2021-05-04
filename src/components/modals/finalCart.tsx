import React, { useState, useContext, useEffect } from 'react';
import WishList from '../wishlist/wishList';
import CartContext from '../../context/cartContext';
import CartSummary from './cartSummary';
import './../../assets/FinalCart.scss';

const FinalCart: React.FC<IFinalCartProps> = ({ setIsOpen, approveCart, approveProduct, addApprovedToCart }) => {
    const { carts } = useContext(CartContext);

    //filters approved products in approved carts
    const approveCarts = () => {
        const x = carts.map((cart) => ({
            ...cart,
            products: cart.products.filter((product) => cart.isApproved && product.isApproved)
        }));
        const y = x.map((cart) =>
            cart.products.filter((product) => product.isApproved === true).length !== 0 && cart.isApproved === true
                ? { ...cart, isInCart: true }
                : { ...cart }
        );
        return y;
    };

    //filters discarded products in discarded carts
    const discardCarts = () => {
        return carts.map((cart) => ({
            ...cart,
            products: cart.products.filter((product) => product.isApproved === false || cart.isApproved === false)
        }));
    };

    const approvedCarts: ICart[] = approveCarts();
    const discardedCarts: ICart[] = discardCarts();

    const [displayApprovedCart, setDisplayApprovedCart] = useState<ICart>(approvedCarts[0]);
    const [displayDiscardedCart, setDisplayDiscardedCart] = useState<ICart>(discardedCarts[0]);

    // slides carts display left
    const slideLeft = (displayApprove: ICart, displayDiscard: ICart) => {
        const index1 = approvedCarts.map((e) => e.id).indexOf(displayApprove.id);
        const index2 = discardedCarts.map((e) => e.id).indexOf(displayDiscard.id);
        index1 > 0
            ? setDisplayApprovedCart(approvedCarts[index1 - 1])
            : setDisplayApprovedCart(approvedCarts[approvedCarts.length - 1]);
        index2 > 0
            ? setDisplayDiscardedCart(discardedCarts[index2 - 1])
            : setDisplayDiscardedCart(discardedCarts[discardedCarts.length - 1]);
    };

    // slides carts display left
    const slideRight = (displayApprove: ICart, displayDiscard: ICart) => {
        const index1 = approvedCarts.map((e) => e.id).indexOf(displayApprove.id);
        const index2 = discardedCarts.map((e) => e.id).indexOf(displayDiscard.id);
        index1 < approvedCarts.length - 1
            ? setDisplayApprovedCart(approvedCarts[index1 + 1])
            : setDisplayApprovedCart(approvedCarts[0]);
        index2 < discardedCarts.length - 1
            ? setDisplayDiscardedCart(discardedCarts[index2 + 1])
            : setDisplayDiscardedCart(discardedCarts[0]);
    };

    useEffect(() => {
        const x = approveCarts().filter((cart) => cart.id === displayApprovedCart.id)[0];
        const y = discardCarts().filter((cart) => cart.id === displayDiscardedCart.id)[0];
        setDisplayApprovedCart(x);
        setDisplayDiscardedCart(y);
    }, [carts]);

    return (
        <div className="h-full">
            <div className="CloseModal">
                <button onClick={() => setIsOpen(false)}>
                    <svg
                        className="w-5 h-5 text-red-500 hover:text-white"
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
            </div>
            {carts.filter((cart) => cart.isInCart === true).length !== 0 ? (
                <div className="Carts">
                    <div className="ApprovedCart">
                        <p>Approved carts</p>
                        <div>
                            <div>
                                <div>
                                    <button
                                        onClick={() => slideLeft(displayApprovedCart, displayDiscardedCart)}
                                        type="button"
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
                                <div>
                                    <div>
                                        <WishList
                                            cart={displayApprovedCart}
                                            approveCart={approveCart}
                                            approveProduct={approveProduct}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="DiscardedCart">
                        <p>Discarded carts</p>
                        <div>
                            <div>
                                <WishList
                                    cart={displayDiscardedCart}
                                    approveCart={approveCart}
                                    approveProduct={approveProduct}
                                />
                            </div>
                            <div>
                                <button
                                    onClick={() => slideRight(displayApprovedCart, displayDiscardedCart)}
                                    type="button"
                                >
                                    <svg
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
                    <div className="FinalSummary">
                        <CartSummary
                            approveCarts={approveCarts}
                            discardCarts={discardCarts}
                            approvedCarts={approvedCarts}
                        />
                    </div>
                </div>
            ) : (
                <div className="EmptyCart">
                    <div>
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
                        <p>Your cart is empty</p>
                    </div>
                    <div>
                        <p>Please approve the wishlists from the main page</p>
                        <button type="button" onClick={() => setIsOpen(false)}>
                            Click here
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinalCart;
