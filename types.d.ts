interface ICart {
    id: number;
    userId: number;
    date: string;
    products: IProduct[];
    isWellBehaved: boolean;
    isApproved: boolean;
    isInCart: boolean;
}

interface IComponentProps {
    criteria: string;
    setCriteria: Dispatch<SetStateAction<string>>;
    feedback: string;
    setFeedback: Dispatch<SetStateAction<string>>;
    approveProduct: (productId: number, cartId: number) => void;
    approveCart: (selectedCart: ICart) => void;
}

interface IFinalCartProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    approveCart: (selectedCart: ICart) => void;
    approveProduct: (productId: number, cartId: number) => void;
}

interface IProduct {
    productId: number;
    title: string;
    price: string;
    quantity: number;
    image: string;
    isFavourite: boolean;
    isApproved: boolean;
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
