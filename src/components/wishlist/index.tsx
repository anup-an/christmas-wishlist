import React, { useContext } from 'react';
import CartContext from '../../context/cartContext';
import WishList from './wishList';
import './../../assets/WishListArray.scss';

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
        <div className="WishListArray">
            <div>
                <button type="button" onClick={resetCarts}>
                    Reset
                </button>
                <button type="button" onClick={approveAll}>
                    Select all
                </button>
                <button type="button" onClick={addToCart}>
                    Add
                </button>
                <p>{feedback}</p>
            </div>
            <div>
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
