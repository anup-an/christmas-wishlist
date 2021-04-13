import React, { useContext, useEffect } from 'react';
import Counter from '../ui/counter';
import CartContext from '../../context/cartContext';

const WishList: React.FC = (): JSX.Element => {
    const { carts, setCarts } = useContext(CartContext);
    const sumPrice = (cart: ICart) => {
        const arr = cart.products.map((product) => parseFloat(product.price));
        return arr.reduce((a, b) => a + b);
    };
    const deleteProduct = (cartId: number, productId: number) => {
        const updatedCarts = carts.map((cart) =>
            cart.id === cartId
                ? { ...cart, products: cart.products.filter((product) => product.productId !== productId) }
                : { ...cart }
        );
        setCarts([...updatedCarts]);
    };
    const resetCarts = () => {
        const list = localStorage.getItem('CartList');
        list ? setCarts(JSON.parse(list)) : '';
    };

    const approveCart = (selectedCart: ICart) => {
        const editedCarts = carts.map((cart) =>
            selectedCart.id === cart.id ? { ...cart, isApproved: cart.isApproved === true ? false : true } : { ...cart }
        );
        setCarts([...editedCarts]);
    };

    const approveAll = () => {
        const editedCarts = carts.map((cart) => ({ ...cart, isApproved: true }));
        setCarts([...editedCarts]);
    };

    console.log(carts);

    return (
        <div>
            <div className="flex flex-row space-x-4 mx-10">
                <button
                    type="button"
                    onClick={resetCarts}
                    className="p-2 bg-red-500 text-white border rounded shadow-lg focus:outline-none"
                >
                    Reset
                </button>
                <button
                    type="button"
                    onClick={approveAll}
                    className="p-2 bg-blue-400 text-white border rounded shadow-lg focus:outline-none"
                >
                    Approve all
                </button>
            </div>
            ;
            <div className="grid grid-cols-3 gap-x-4 gap-y-4 mx-10 mb-10">
                {carts
                    ? [...carts].map((cart) => (
                          <div key={cart.id} className="border rounded shadow-lg text-xs divide-y">
                              <div className="flex flex-row justify-between items-center bg-blue-400 p-4 h-14">
                                  <div className="text-base text-white">Child {cart.id}</div>
                                  <div className="flex flex-row space-x-4 items-center">
                                      {cart.isWellBehaved ? (
                                          <svg
                                              className="w-6 h-6 bg-yellow-400 border rounded"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                          >
                                              <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                              <path
                                                  fill="#fff"
                                                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                              />
                                              <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                              />
                                          </svg>
                                      ) : (
                                          <svg
                                              className="w-6 h-6 bg-yellow-400 border rounded invisible"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                          >
                                              <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                              <path
                                                  fill="#fff"
                                                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                              />
                                              <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                              />
                                          </svg>
                                      )}
                                      {cart.isApproved ? (
                                          <button
                                              onClick={() => approveCart(cart)}
                                              className="w-6 h-6 border rounded bg-white flex items-center justify-center focus:outline-none"
                                          >
                                              <svg
                                                  className="w-6 h-6 text-green-500"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  viewBox="0 0 24 24"
                                              >
                                                  <path
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      stroke-width="2"
                                                      d="M5 13l4 4L19 7"
                                                  />
                                              </svg>
                                          </button>
                                      ) : (
                                          <button
                                              onClick={() => approveCart(cart)}
                                              className="w-6 h-6 border rounded bg-white focus:outline-none"
                                          ></button>
                                      )}
                                  </div>
                              </div>
                              <div className="flex flex-row justify-around p-2">
                                  <div>Product</div>

                                  <div>Price</div>
                              </div>
                              <div className="divide-y">
                                  {cart.products.map((product) => (
                                      <div
                                          key={product.productId}
                                          className="flex flex-row justify-between items-center p-2"
                                      >
                                          <button
                                              onClick={() => deleteProduct(cart.id, product.productId)}
                                              className="w-4 h-4 rounded-full border border-red-500 flex items-center justify-center"
                                          >
                                              <svg
                                                  className="w-4 h-4 text-red-500"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  viewBox="0 0 24 24"
                                              >
                                                  <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M6 18L18 6M6 6l12 12"
                                                  />
                                              </svg>
                                          </button>
                                          <img src={product.image} alt="image" className="w-1/6 h-1/6" />
                                          <div className="w-2/6">
                                              {product.isFavourite ? (
                                                  <svg
                                                      className="w-4 h-4 fill-current text-yellow-400"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 20 20"
                                                  >
                                                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                  </svg>
                                              ) : (
                                                  ''
                                              )}
                                              <div>{product.title}</div>
                                          </div>
                                          {/* <div>
                                          <Counter
                                              quantity={product.quantity}
                                              cartId={cart.id}
                                              productId={product.productId}
                                          />
                                      </div> */}
                                          <div>{product.price}</div>
                                          {/*                                       <div>{product.quantity * parseFloat(product.price)}</div>
                                           */}{' '}
                                      </div>
                                  ))}
                              </div>
                              <footer className="flex flex-row justify-around p-4">
                                  <div>Total price</div>
                                  <div>{sumPrice(cart)}</div>
                              </footer>
                          </div>
                      ))
                    : ''}
            </div>
        </div>
    );
};

export default WishList;
