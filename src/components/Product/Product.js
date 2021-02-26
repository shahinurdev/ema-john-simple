import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    console.log(props);
    const {img,name,seller,price,stock} = props.product;
    return (
        <div className = "product">
            <div>
               <img src={img} alt=""/> 
            </div>
            <div>
            <h4 className="productName">{name}</h4>
            <br/>
            <p><small>by: {seller}</small></p>
            <p><small>${price}</small></p>
            <br/>
            <p><small>Only {stock} left in stock </small></p>
            <button className="mainBtn"
             onClick={()=>props.dandelAddproduct(props.product)}>
                 <FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            </div>
        </div>
    );
};

export default Product;