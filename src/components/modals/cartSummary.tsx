import axios from 'axios';
import React from 'react';
import Summary from './summary';

const findTotalNum = (carts: ICart[]) => {
    const num = carts.map((cart) => (cart.products.length !== 0 ? cart.products.length : 0)).reduce((a, b) => a + b);
    return num;
};
const findTotalSum = (carts: ICart[]) => {
    let sum = 0;
    for (let i = 0; i < carts.length; i++) {
        for (let j = 0; j < carts[i].products.length; j++) {
            sum = sum + parseFloat(carts[i].products[j].price);
        }
    }
    return sum;
};

const applyDiscount = (approvedCarts: ICart[]) => {
    let productArr: number[] = [];
    let cartArr: ICartArr[] = [];
    for (let i = 0; i < approvedCarts.length; i++) {
        for (let j = 0; j < approvedCarts[i].products.length; j++) {
            cartArr = [
                ...cartArr,
                {
                    cart_id: approvedCarts[i].id,
                    product_id: approvedCarts[i].products[j].productId,
                    product_price: parseFloat(approvedCarts[i].products[j].price)
                }
            ];
            productArr = [...productArr, approvedCarts[i].products[j].productId];
        }
    }
    const uniqueProductArr = [...new Set(productArr)].map((product) => ({
        product_id: product,
        quantity: 0,
        sum: 0
    }));

    for (let i = 0; i < uniqueProductArr.length; i++) {
        for (let j = 0; j < cartArr.length; j++) {
            if (cartArr[j].product_id === uniqueProductArr[i].product_id) {
                uniqueProductArr[i].quantity += 1;
                uniqueProductArr[i].sum += cartArr[j].product_price;
            }
        }
    }
    let discount = 0;
    for (let i = 0; i < uniqueProductArr.length - 1; i++) {
        if (uniqueProductArr[i].quantity > 1) {
            discount += uniqueProductArr[i].sum * (uniqueProductArr[i].quantity * 0.1);
        }
    }
    return discount;
};

const CartSummary: React.FC<ICartSummaryProps> = ({ approvedCarts, discardedCarts }) => {
    return (
        <div className="text-sm mx-4 flex flex-col space-y-4 mb-4">
            <Summary
                finalCarts={approvedCarts}
                findTotalNum={findTotalNum}
                findTotalSum={findTotalSum}
                isApproved={true}
            />
            <Summary
                finalCarts={discardedCarts}
                findTotalNum={findTotalNum}
                findTotalSum={findTotalSum}
                isApproved={false}
            />
            <div className="font-bold text-base text-red-500">Discount = {applyDiscount(approvedCarts)} </div>
            <div className="font-bold text-base text-blue-800">
                You Pay: {findTotalSum(approvedCarts) - applyDiscount(approvedCarts)}
            </div>
            <button
                type="button"
                className="p-2 border rounded ahadow-2xl border-blue-800 hover:bg-blue-800 text-lg hover:text-white"
            >
                Submit
            </button>
        </div>
    );
};

export default CartSummary;
