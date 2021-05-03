/* eslint-disable prefer-const */
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import CartContext from '../../context/cartContext';
import { selectMinProduct } from '../../functions/selectEqual';
import FinalCart from '../modals/finalCart';
import '../../assets/Criteria.scss';

const Criterias: React.FC<IComponentProps> = ({
    criteria,
    setCriteria,
    setFeedback,
    approveCart,
    approveProduct,
    addToCart
}) => {
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

    const addApprovedToCart = (approvedCart: ICart) => {
        const x = carts.map((cart: ICart) =>
            cart.id === approvedCart.id ? { ...cart, isInCart: approvedCart.isInCart } : { ...cart }
        );
        setCarts([...x]);
    };

    const oldCarts = list
        ? JSON.parse(list).map((cart: ICart) => ({
              ...cart,
              isApproved: true
          }))
        : '';
    // selects only favourite gifts from all of the carts
    const selectFavourites = () => {
        const favourites = carts.map((cart) => ({
            ...cart,
            isApproved: true,
            products: cart.products.map((product) =>
                product.isFavourite === true ? { ...product, isApproved: true } : { ...product, isApproved: false }
            )
        }));
        setCarts([...favourites]);
        setFeedback('');
        setCriteria('Only favourite gifts selected from the all the wishlists');
    };

    // selects all gifts of only well-behaved children from their wishlists

    const selectBehaved = () => {
        const wellbehaved = carts.map((cart) =>
            cart.isWellBehaved === true
                ? {
                      ...cart,
                      isApproved: true,
                      products: cart.products.map((product) => ({ ...product, isApproved: true }))
                  }
                : { ...cart, isApproved: false }
        );
        setCarts([...wellbehaved]);
        setFeedback('');
        setCriteria('Wishlist of only well behaved children approved.');
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
        <div className="criteria">
            <div>
                <h1>Select cart products:</h1>
                <div>
                    <button onClick={selectFavourites} type="button">
                        Favorite
                    </button>
                    <button onClick={() => optimizeEqualNumber(oldCarts)} type="button">
                        Equal
                    </button>
                    <button onClick={selectBehaved} type="button">
                        Behaved
                    </button>
                </div>
                <p>{criteria}</p>
            </div>
            <button onClick={openModal} type="button">
                <div className="counter">
                    <h1>
                        {
                            carts.filter(
                                (cart) =>
                                    cart.isInCart === true &&
                                    cart.products.filter((product) => product.isApproved === true).length !== 0
                            ).length
                        }
                    </h1>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            </button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} overlayClassName="modal-overlay" className="modal">
                <FinalCart
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    approveCart={approveCart}
                    approveProduct={approveProduct}
                    addApprovedToCart={addApprovedToCart}
                />
            </Modal>
        </div>
    );
};

export default Criterias;
