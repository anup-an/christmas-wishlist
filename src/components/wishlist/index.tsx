import React, { useContext } from 'react';
import CartContext from '../../context/cartContext';
import WishList from './wishList';

const WishListArray: React.FC<IComponentProps> = ({
    setCriteria,
    feedback,
    setFeedback,
    approveProduct,
    approveCart
}): JSX.Element => {
    const { carts, setCarts } = useContext(CartContext);

    // clears all selections and clears carts
    const resetCarts = () => {
        const editedCarts = carts.map((cart) => ({
            ...cart,
            isInCart: false,
            products: cart.products.map((product) => ({ ...product, isApproved: false }))
        }));
        setCarts([...editedCarts]);
        setCriteria('');
        setFeedback('All wishlists and product selections cleared ');
    };

    // selects all carts and their items

    const approveAll = () => {
        const editedCarts = carts.map((cart) => ({
            ...cart,
            isInCart: true,
            products: cart.products.map((product) => ({ ...product, isApproved: true }))
        }));
        setCarts([...editedCarts]);
        setCriteria('');
        setFeedback('All wishlists and their products added to cart');
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

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-row items-center space-x-4 mx-10">
                <div className="flex flex-row space-x-4">
                    <button
                        type="button"
                        onClick={resetCarts}
                        className="p-2 text-red-500 hover:bg-red-500 hover:text-white text-sm border-red-500 w-20 text-white border rounded shadow-lg focus:outline-none"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={approveAll}
                        className="p-2 text-blue-400 hover:bg-blue-800 hover:text-white  text-sm w-20 border rounded shadow-lg border-blue-400 hover:border-blue-800 focus:outline-none"
                    >
                        Add all
                    </button>
                </div>
                <div className="text-sm text-red-500">{feedback}</div>
            </div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-4 gap-y-4 mx-10">
                {carts
                    ? [...carts].map((cart) => (
                          <div key={cart.id}>
                              <WishList cart={cart} approveCart={approveCart} approveProduct={approveProduct} />
                          </div>
                      ))
                    : ''}
            </div>
        </div>
    );
};

export default WishListArray;
