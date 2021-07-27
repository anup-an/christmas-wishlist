import React from 'react';

interface IWishListProps {
    cart: ICart;
    approveCart: (selectedCart: ICart) => void;
    approveProduct: (productId: number, cartId: number) => void;
}

const WishList: React.FC<IWishListProps> = ({ cart, approveCart, approveProduct }) => {
    return (
        <div className="border rounded shadow-lg text-xs divide-y h-100 w-106">
            <div
                className={`flex flex-row justify-between items-center ${
                    cart.isInCart ? 'bg-blue-800' : 'bg-blue-400'
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
                {cart.isInCart ? (
                    <div>
                        <svg
                            className="w-6 h-6 text-white text-center"
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

                <div className="flex flex-row space-x-4 items-center">
                    {cart.isInCart ? (
                        <div
                            className={`flex flex-row space-x-1 items-center ${
                                cart.products.length === 0 ||
                                cart.products.filter((product) => product.isApproved == true).length == 0
                                    ? 'hidden'
                                    : 'block'
                            }`}
                        >
                            <div className="text-xs text-white">Click to remove</div>
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
                        <div
                            className={`flex flex-row space-x-1 items-center ${
                                cart.products.length === 0 ? 'hidden' : 'block'
                            }`}
                        >
                            <div className="text-xs text-white">Click to add</div>
                            <button
                                onClick={() => approveCart(cart)}
                                className="w-5 h-5 border rounded bg-white focus:outline-none"
                            ></button>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-4">
                <div
                    className={`col-span-4 grid grid-cols-4 py-2 border-b bg-gray-100 justify-items-stretch ${
                        cart.products.length === 0 ? 'hidden' : 'block'
                    }`}
                >
                    <div className="col-span-3 justify-self-center">Product</div>
                    <div className="justify-self-center">Price</div>
                </div>

                {cart.products.length === 0 ? (
                    <div className="col-span-4 place-content-center row-span-2">
                        <div className="flex flex-row space-x-4 items-center justify-center">
                            <svg
                                className="w-24 h-24 text-blue-800"
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
                            <div className="text-base">Empty</div>
                        </div>
                    </div>
                ) : (
                    ''
                )}

                <div className="divide-y col-span-4">
                    {cart.products.map((product) => (
                        <div
                            key={product.productId}
                            className="p-2 grid grid-cols-4 justify-items-stretch place-items-center"
                        >
                            {product.isApproved ? (
                                <button
                                    onClick={() => approveProduct(product.productId, cart.id)}
                                    className="w-5 h-5 border rounded border-blue-400 shadow-lg bg-white focus:outline-none"
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
                            <img src={product.image} alt="image" className="w-1/2 justify-self-start" />
                            <div>
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

                            <div className="justify-self-center">{product.price}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className={`relative col-span-4 grid grid-cols-4 place-items-center ${
                    cart.products.length === 0 ? 'hidden' : 'block'
                }`}
            >
                <div className="py-2 col-span-3">Total price</div>
                <div className="col-span-1">
                    {cart.products.length !== 0
                        ? cart.products.map((product) => parseFloat(product.price)).reduce((a, b) => a + b)
                        : ''}
                </div>
            </div>
        </div>
    );
};

export default WishList;
