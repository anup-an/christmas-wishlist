interface ICart {
    id: number;
    userId: number;
    date: string;
    products: IProduct[];
}

interface IProduct {
    productId: number;
    title: string;
    price: string;
    quantity: string;
    image: string;
}

interface IWishListProps {
    carts: ICart[];
}

interface IUpdatedListProps {
    updatedCarts: ICart[];
}

interface ICounterProps {
    quantity: string;
}

interface IContext {
    carts: ICart[];
}
