/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
const CartContext = createContext<ICart[]>([]);
export default CartContext;
