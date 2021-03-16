import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReveiwItem from '../ReveiwItem/ReveiwItem';
import happyImg from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
   const[cart,setCart]= useState([]);
   const [orderPlaced,setOrderPlaced] = useState(false)
   const history= useHistory()
   const handleProceedCheckOut = () =>{
    //    console.log('addded');
    // setCart([]);
    // setOrderPlaced(true)
    // processOrder()
    history.push('/shipment')

   };
   const removeProduct = (productKey)=>{
       console.log('remClick',productKey);
    const newCart = cart.filter(pd=>pd.key!==productKey);
    setCart(newCart); 
    removeFromDatabaseCart(productKey);
   }
   useEffect(()=>{
       //cart
       const saveCart= getDatabaseCart();
       const productKeys = Object.keys(saveCart);
       const cartProduct = productKeys.map(key=>{
       const product=fakeData.find(pd =>pd.key===key);
       product.quantity = saveCart[key];
       return product;
       },);
       setCart(cartProduct);
   },[])
   let thankYou;
   if(orderPlaced){
       thankYou = <img src={happyImg} alt=""/>
   } 
    return (
        <div className="shopContainer">
                <div className="productContainer">
                {
                      cart.map(pd=> <ReveiwItem 
                        product={pd}
                        removeProduct={removeProduct}
                         > </ReveiwItem>)
                }
                {thankYou}

                </div>
                <div className="cartContainer">
                    <Cart cart={cart}>
                     <button className="mainBtn" onClick={handleProceedCheckOut}>
                        Procced Check Out
                    </button>
                    </Cart>
                </div>
            </div>
    );
};

export default Review;