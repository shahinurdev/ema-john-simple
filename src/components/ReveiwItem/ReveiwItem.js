import React from 'react';

const ReveiwItem = (props) => {
    const {name,quantity,key,price} = props.product;
    const reviewItemStyle ={
        borderBottom:'1px solid red',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    };
    return (
        <div style={reviewItemStyle}>
            <h4 className="productName">{name}</h4>
            <p> Quantity: {quantity} </p>
            <p>Price: {price}</p>
            <button className="mainBtn"
            onClick={()=>props.removeProduct(key)}
            >
                Remove
            </button>
        </div>
    );
};

export default ReveiwItem;