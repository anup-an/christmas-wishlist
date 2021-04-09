/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
const CartContext = createContext({ carts: <ICart[]>[], setCarts: (carts: ICart[]): void => {} });
export default CartContext;
