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
    quantity: number;
    image: string;
}

interface IWishListProps {
    carts: ICart[];
}

interface IUpdatedListProps {
    updatedCarts: ICart[];
}

interface ICounterProps {
    quantity: number;
    cartId: number;
    productId: number;
}

interface IContext {
    carts: ICart[];
    setCarts: (carts: ICart[]) => void;
}
