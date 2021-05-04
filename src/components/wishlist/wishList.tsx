import React from 'react';
import './../../assets/WishList.scss';

interface IWishListProps {
    cart: ICart;
    approveCart: (selectedCart: ICart) => void;
    approveProduct: (productId: number, cartId: number) => void;
}

const WishList: React.FC<IWishListProps> = ({ cart, approveCart, approveProduct }) => {
    return (
        <div className="WishList">
            <div className={`ListHeader ${cart.isApproved ? 'bg-blue-800' : 'bg-blue-400'}`}>
                <div>
                    <h1>Child {cart.id}</h1>
                    {cart.isWellBehaved ? (
                        <div>
                            <svg
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
                        </div>
                    ) : (
                        <div className="invisible" />
                    )}
                </div>
                <div>
                    {cart.isInCart && cart.isApproved ? (
                        <div>
                            <svg
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
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div>
                    {cart.isApproved ? (
                        cart.products.length !== 0 ? (
                            <div>
                                <p>Click to deselect</p>
                                <button onClick={() => approveCart(cart)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            ''
                        )
                    ) : (
                        <div className={`${cart.products.length === 0 ? 'inivisible' : 'visible'}`}>
                            <p>Click to select</p>
                            <button onClick={() => approveCart(cart)}></button>
                        </div>
                    )}
                </div>
            </div>
            <div className="ListProducts">
                {cart.products.length !== 0 ? (
                    <div className="bg-gray-200">
                        <p>Product</p>
                        <p>Price</p>
                    </div>
                ) : (
                    ''
                )}
                <div>
                    {cart.products.length === 0 ? (
                        <div className="EmptyList">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <p>Empty</p>
                        </div>
                    ) : (
                        ''
                    )}
                </div>

                <div>
                    {cart.products.map((product) => (
                        <div key={product.productId}>
                            {product.isApproved ? (
                                <button onClick={() => approveProduct(product.productId, cart.id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </button>
                            ) : (
                                <button onClick={() => approveProduct(product.productId, cart.id)}></button>
                            )}
                            <img src={product.image} alt="image" />
                            <div>
                                <div>
                                    {product.isFavourite ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ) : (
                                        ''
                                    )}
                                    <p>{product.title}</p>
                                </div>
                            </div>

                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            {cart.products.length !== 0 ? (
                <div className={` ListFooter`}>
                    <div>Total price</div>
                    <div>
                        {cart.products.length !== 0
                            ? cart.products.map((product) => parseFloat(product.price)).reduce((a, b) => a + b)
                            : ''}
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default WishList;
