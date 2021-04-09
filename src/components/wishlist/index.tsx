import React, { useContext } from 'react';
import Counter from '../ui/counter';
import CartContext from '../../context/cartContext';

const WishList: React.FC = (): JSX.Element => {
    const carts = useContext(CartContext);
    return (
        <div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-4 mx-10">
                {carts
                    ? carts.map((cart) => (
                          <div key={cart.id} className="border rounded shadow-lg text-xs divide-y p-2">
                              {cart.products.map((product) => (
                                  <div
                                      key={product.productId}
                                      className="flex flex-row justify-between items-center mx-2 p-2 "
                                  >
                                      <img src={product.image} alt="image" className="w-1/5 h-1/5" />
                                      <div className="w-1/4 overflow-ellipsis overflow-hidden">{product.title}</div>
                                      <div>
                                          <Counter quantity={product.quantity} />
                                      </div>
                                      <div>{product.price}</div>
                                      <div>{Number(product.quantity) * Number(product.price)}</div>
                                  </div>
                              ))}
                          </div>
                      ))
                    : ''}
            </div>
        </div>
    );
};

export default WishList;
