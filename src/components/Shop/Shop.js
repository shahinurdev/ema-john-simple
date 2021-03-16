import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from'../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
   const [products,setProducts] = useState(first10);
   const [cart,setCart] =useState([]);
   useEffect(()=>{
    const saveCart = getDatabaseCart();
    // console.log("SaveCart",saveCart);
    const productKeys = Object.keys(saveCart);
    const previousCart = productKeys.map(exctingkey=>{
        const product = fakeData.find(pd=>pd.key===exctingkey);
        product.quantity =saveCart[exctingkey];
        return product;
    })
    setCart(previousCart);

},[]);
      const dandelAddproduct = (product) =>{
    //    console.log("product add",product);
    const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd=>pd.key===toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
        count = sameProduct.quantity + 1;
        sameProduct.quantity = count;
        const others = cart.filter(pd=>pd.key !== toBeAddedKey)
        newCart =[...others,sameProduct]
    }
    else {
        product.quantity = 1;
        newCart =[...cart,product]
    }
       setCart(newCart);
       addToDatabaseCart(product.key,count)

   }
    return (
            <div className="shopContainer">
                <div className="productContainer">
                
                {
                    products.map(pd => <Product 
                        showAddToCart={true}
                        dandelAddproduct ={dandelAddproduct} product = {pd} key={pd.kec}> </Product>)
                }
                </div>
                <div className="cartContainer">
                    <Cart cart={cart}>
                    <Link to="/review"> <button className="mainBtn">Review</button></Link>
                    </Cart>
                </div>
            </div>
    );
};

export default Shop;