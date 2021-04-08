interface ICart {
    id: number;
    userId: number;
    date: string;
    products: IProduct[];
}

interface IProduct {
    productId: number;
    quantity: number;
}

interface IWishListProps {
    carts: ICart[];
}

interface IUpdatedListProps {
    updatedCarts: ICart[];
}
