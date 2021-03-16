import React from 'react';
const Cart = (props) => {
    const cart = props.cart;
    // const total =cart.reduce((total,prd)=>total+prd.price * prd.quantity,0);
    let total =0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total+product.price * product.quantity;
    }
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping =4.99 ;
    }
    else if(total > 0){
        shipping = 12.99
    }
    const tax = (total/10).toFixed(2);
    const grandTotal = (total + shipping+Number(tax)).toFixed(2);
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered:{cart.length}</p>
            <p>Productt price: {total}</p>
            <p><small>shipping Cost: {shipping}</small></p>
            <p><small>Tax:{tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br/>
            {
             props.children
             }
        </div>
    );
};

export default Cart;