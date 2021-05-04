import React from 'react';
import Summary from './summary';
import './../../assets/CartSummary.scss';

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

// applies discount to approved carts
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

const CartSummary: React.FC<ICartSummaryProps> = ({ approveCarts, discardCarts, approvedCarts }) => {
    return (
        <div className="CartSummary">
            <Summary
                findTotalNum={findTotalNum}
                findTotalSum={findTotalSum}
                filterFunction={approveCarts}
                isApproved={true}
            />
            <Summary
                findTotalNum={findTotalNum}
                findTotalSum={findTotalSum}
                filterFunction={discardCarts}
                isApproved={false}
            />
            <h1>Discount : {applyDiscount(approvedCarts).toFixed(2)} EUR </h1>
            <h1>You Pay: {(findTotalSum(approvedCarts) - applyDiscount(approvedCarts)).toFixed(2)} EUR</h1>
            <button type="button">Submit</button>
        </div>
    );
};

export default CartSummary;
