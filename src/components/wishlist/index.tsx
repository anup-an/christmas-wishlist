import React, { useContext } from 'react';
import CartContext from '../../context/cartContext';
import WishList from './wishList';

const WishListArray: React.FC<IComponentProps> = ({
    setCriteria,
    feedback,
    setFeedback,
    approveProduct,
    approveCart,
    addToCart
}): JSX.Element => {
    const { carts, setCarts } = useContext(CartContext);

    // clears all selections and clears carts
    const resetCarts = () => {
        const list = localStorage.getItem('CartList');
        list ? setCarts(JSON.parse(list)) : '';
        setFeedback('All wishlists and product selections cleared ');
    };

    // selects all carts and their items

    const approveAll = () => {
        const editedCarts = carts.map((cart) => ({
            ...cart,
            isApproved: true,
            products: cart.products.map((product) => ({ ...product, isApproved: true }))
        }));
        setCarts([...editedCarts]);
        setCriteria('');
        setFeedback('All wishlists and their products selected');
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
                        Select all
                    </button>
                    <button
                        type="button"
                        onClick={addToCart}
                        className="p-2 hover:bg-blue-800 hover:text-white w-20 text-sm text-blue-400 border border-blue-400 hover:border-blue-800 rounded shadow-lg focus:outline-none"
                    >
                        {' '}
                        Add
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
