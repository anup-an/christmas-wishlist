import React from 'react';

interface IWishListProps {
    cart: ICart;
    approveCart: (selectedCart: ICart) => void;
    approveProduct: (productId: number, cartId: number) => void;
}

const WishList: React.FC<IWishListProps> = ({ cart, approveCart, approveProduct }) => {
    return (
        <div className="border rounded shadow-lg text-xs divide-y">
            <div
                className={`flex flex-row justify-between items-center ${
                    cart.isApproved ? 'bg-blue-800' : 'bg-blue-400'
                } p-4 h-14`}
            >
                <div className="flex flex-row space-x-2">
                    <div className="text-base text-white">Child {cart.id}</div>
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
                </div>
                <div className="flex flex-row space-x-4 items-center">
                    {cart.isApproved ? (
                        <div className="flex flex-row space-x-1 items-center">
                            <div className="text-xs text-white">Click to deselect</div>
                            <button
                                onClick={() => approveCart(cart)}
                                className="w-5 h-5 border rounded bg-white flex items-center justify-center focus:outline-none"
                            >
                                <svg
                                    className="w-5 h-5 text-blue-800"
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
                        <div className="flex flex-row space-x-1 items-center">
                            <div className="text-xs text-white">Click to select</div>
                            <button
                                onClick={() => approveCart(cart)}
                                className="w-5 h-5 border rounded bg-white focus:outline-none"
                            ></button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-row justify-around p-2">
                <div>Product</div>

                <div>Price</div>
            </div>
            <div className="divide-y">
                {cart.products.map((product) => (
                    <div key={product.productId} className="flex flex-row justify-between items-center p-2">
                        {product.isApproved ? (
                            <button
                                onClick={() => approveProduct(product.productId, cart.id)}
                                className="w-5 h-5 border rounded border-blue-400 shadow-lg bg-white flex items-center justify-center focus:outline-none"
                            >
                                <svg
                                    className="w-5 h-5 text-green-500"
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
                            <button
                                onClick={() => approveProduct(product.productId, cart.id)}
                                className="w-5 h-5 border rounded shadow-lg border-blue-500 bg-white focus:outline-none"
                            ></button>
                        )}
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

                        <div>{product.price}</div>
                    </div>
                ))}
            </div>
            <footer className="flex flex-row justify-around p-4">
                <div>Total price</div>
                <div>
                    {cart.products.length !== 0
                        ? cart.products.map((product) => parseFloat(product.price)).reduce((a, b) => a + b)
                        : ''}
                </div>
            </footer>
        </div>
    );
};

export default WishList;
