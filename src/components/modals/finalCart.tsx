import React, { useState, useContext, useEffect } from 'react';
import WishList from '../wishlist/wishList';
import CartContext from '../../context/cartContext';
import CartSummary from './cartSummary';

const FinalCart: React.FC<IFinalCartProps> = ({ setIsOpen, approveCart, approveProduct }) => {
    const { carts } = useContext(CartContext);

    const approvedCarts = carts
        .filter((cart) => cart.isInCart === true && cart.isApproved === true)
        .filter((cart) => cart.products.filter((product) => product.isApproved === true) !== [])
        .map((cart) => ({ ...cart, products: cart.products.filter((product) => product.isApproved === true) }));
    const notApproved = carts.filter(
        (cart) =>
            cart.isInCart === false ||
            (cart.isInCart === true && cart.products.filter((product) => product.isApproved === false) !== []) ||
            cart.isApproved === false
    );

    const discardedCarts = notApproved.map((cart) => ({
        ...cart,
        products:
            cart.isApproved === false ? cart.products : cart.products.filter((product) => product.isApproved === false)
    }));

    const [displayApprovedCart, setDisplayApprovedCart] = useState<ICart>(approvedCarts[0]);
    const [displayDiscardedCart, setDisplayDiscardedCart] = useState<ICart>(discardedCarts[0]);
    console.log(displayApprovedCart);

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
        const approvedCarts = carts
            .filter((cart) => cart.isInCart === true && cart.isApproved === true)
            .filter((cart) => cart.products.filter((product) => product.isApproved === true) !== [])
            .map((cart) => ({ ...cart, products: cart.products.filter((product) => product.isApproved === true) }));
        const notApproved = carts.filter(
            (cart) =>
                cart.isInCart === false ||
                (cart.isInCart === true && cart.products.filter((product) => product.isApproved === false) !== []) ||
                cart.isApproved === false
        );

        const discardedCarts = notApproved.map((cart) => ({
            ...cart,
            products:
                cart.isApproved === false
                    ? cart.products
                    : cart.products.filter((product) => product.isApproved === false)
        }));

        setDisplayApprovedCart(approvedCarts[0]);
        setDisplayDiscardedCart(discardedCarts[0]);
    }, [carts]);

    return (
        <div>
            <div className="right-0 top-0">
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
            </div>
            <div className="flex flex-row justify-center items-start space-x-10 mt-2">
                <div className="flex flex-col justify-center w-1/3 space-y-4 mb-10">
                    <div className="text-center">Approved carts</div>
                    <div className="flex flex-row space-x-4 justify-between">
                        <div className="flex flex-row space-x-4">
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
                            <div className="flex flex-row justify-between">
                                <WishList
                                    cart={displayApprovedCart}
                                    approveCart={approveCart}
                                    approveProduct={approveProduct}
                                />
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
                <div className="flex flex-col justify-center items-center space-y-4 w-1/3">
                    <div>Discarded carts</div>
                    <div className="flex flex-row space-x-4">
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
                        <div className="flex flex-row justify-between ">
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
                <div className="w-1/3">
                    <CartSummary approvedCarts={approvedCarts} discardedCarts={discardedCarts} />
                </div>
            </div>
        </div>
    );
};

export default FinalCart;
