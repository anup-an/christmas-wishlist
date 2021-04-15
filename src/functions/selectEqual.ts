// finds index of the product with minimum price from a list of products

export const findIndex = (products: IProduct[]): number => {
    const index = products
        .map((product) => parseFloat(product.price))
        .indexOf(Math.min(...products.map((product) => parseFloat(product.price))));
    return index;
};
// finds a cart from an array of carts
export const findCart = (cart: ICart, oldCarts: ICart[]): ICart => {
    const foundCart = oldCarts.filter((e) => e.id === cart.id)[0];
    return foundCart;
};

//selects the product with minimum or maximum value inside a cart in an array of carts
export const selectMinProduct = (mycart: ICart, oldCarts: ICart[]): ICart[] => {
    const MinProduct = findCart(mycart, oldCarts)
        .products.filter((product) => product.isApproved === false)
        .filter(
            (product) => product === findCart(mycart, oldCarts).products[findIndex(findCart(mycart, oldCarts).products)]
        );
    const selected = oldCarts.map((cart) =>
        cart.id === mycart.id
            ? {
                  ...cart,
                  products: cart.products.map((product) =>
                      product.productId === MinProduct[0].productId
                          ? { ...product, isApproved: true }
                          : { ...product, isApproved: false }
                  )
              }
            : { ...cart }
    );

    return selected;
};
