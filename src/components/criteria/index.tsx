/* eslint-disable prefer-const */
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import CartContext from '../../context/cartContext';
import { selectMinProduct } from '../../functions/selectEqual';
import FinalCart from '../modals/finalCart';

const Criterias: React.FC<IComponentProps> = ({ criteria, setCriteria, setFeedback, approveCart, approveProduct }) => {
    const { carts, setCarts } = useContext(CartContext);
    const list = localStorage.getItem('CartList');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    Modal.setAppElement('#root');

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const oldCarts = list
        ? JSON.parse(list).map((cart: ICart) => ({
              ...cart,
              isInCart: true
          }))
        : '';
    // selects only favourite gifts from all of the carts
    const selectFavourites = () => {
        const favourites = carts.map((cart) => ({
            ...cart,
            isInCart: true,
            products: cart.products.map((product) =>
                product.isFavourite === true ? { ...product, isApproved: true } : { ...product, isApproved: false }
            )
        }));
        setCarts([...favourites]);
        setFeedback('');
        setCriteria('Only favourite gifts from the all the wishlists added to carts');
    };

    // selects all gifts of only well-behaved children from their wishlists

    const selectBehaved = () => {
        const wellbehaved = carts.map((cart) =>
            cart.isWellBehaved === true
                ? {
                      ...cart,
                      isInCart: true,
                      products: cart.products.map((product) => ({ ...product, isApproved: true }))
                  }
                : { ...cart, isApproved: false }
        );
        setCarts([...wellbehaved]);
        setFeedback('');
        setCriteria('Wishlist of only well behaved children added to carts.');
    };

    //selects equal number of gifts from the wishlists
    const optimizeEqualNumber = (oldCarts: ICart[]) => {
        const updatedCarts = oldCarts.map(
            (cart: ICart) => selectMinProduct(cart, oldCarts).filter((selected) => selected.id === cart.id)[0]
        );
        const itemsArray = updatedCarts.map(
            (cart) => cart.products.filter((product) => product.isApproved === true).length
        );
        const isEqual = itemsArray.every((value) => value !== 0 && value === itemsArray[0]);
        if (!isEqual) {
            optimizeEqualNumber(updatedCarts);
        }
        setCarts([...updatedCarts]);
        setFeedback('');

        setCriteria('Equal number of gifts with mimimum total price approved from the wishlists ');
    };

    return (
        <div className="flex flex-row justify-between mx-10 items-center">
            <div className="flex flex-row justify-center items-center m-2 space-x-4">
                <div className=" text-center">Select cart products:</div>
                <div className="flex flex-row justify-between space-x-4">
                    <button
                        onClick={selectFavourites}
                        type="button"
                        className="p-2 text-blue-400 hover:bg-blue-800 hover:text-white  text-sm w-20 border rounded shadow-lg border-blue-400 hover:border-blue-800 focus:outline-none"
                    >
                        Favorite
                    </button>
                    <button
                        onClick={() => optimizeEqualNumber(oldCarts)}
                        type="button"
                        className="p-2 text-blue-400 hover:bg-blue-800 hover:text-white  text-sm w-20 border rounded shadow-lg border-blue-400 hover:border-blue-800 focus:outline-none"
                    >
                        Equal
                    </button>
                    <button
                        onClick={selectBehaved}
                        type="button"
                        className="p-2 text-blue-400 hover:bg-blue-800 hover:text-white  text-sm w-20 border rounded shadow-lg border-blue-400 hover:border-blue-800 focus:outline-none"
                    >
                        Behaved
                    </button>
                </div>
                <div className="text-red-500 text-sm">{criteria}</div>
            </div>
            <button
                onClick={openModal}
                type="button"
                className="group w-11 h-11 border-2 rounded border-blue-400 hover:bg-blue-800 hover:text-white hover:border-blue-800 flex items-center justify-center focus:outline-none"
            >
                <div className="absolute right-5 w-6 h-6 top-1 border rounded-full bg-red-500 text-white flex items-center justify-center">
                    <div>
                        {
                            carts.filter(
                                (cart) =>
                                    cart.isInCart === true &&
                                    cart.products.filter((product) => product.isApproved === true).length !== 0
                            ).length
                        }
                    </div>
                </div>
                <svg
                    className="w-7 h-7 text-blue-400 group-hover:text-white text-center"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            </button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                overlayClassName="fixed inset-0 flex justify-center items-center bg-blue-800 bg-opacity-75"
                className="relative bg-white overflow-y-auto rounded-lg focus:outline-none w-5/6"
            >
                <FinalCart
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    approveCart={approveCart}
                    approveProduct={approveProduct}
                />
            </Modal>
        </div>
    );
};

export default Criterias;
