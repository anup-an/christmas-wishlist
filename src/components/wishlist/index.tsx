import React from 'react';

const WishList: React.FC<IWishListProps> = ({ carts }): JSX.Element => {
    return (
        <div>
            <div className="grid grid-cols-3">
                {carts.map((cart) => (
                    <div key={cart.id} className="border rounded shadow-lg">
                        {cart.products.map((product) => (
                            <div key={product.productId}>{product.productId}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishList;
