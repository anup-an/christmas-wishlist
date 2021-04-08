import React from 'react';

const UpdatedList: React.FC<IUpdatedListProps> = ({ updatedCarts }): JSX.Element => {
    return (
        <div>
            <div className="grid grid-cols-3">
                {updatedCarts.map((cart) => (
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

export default UpdatedList;
