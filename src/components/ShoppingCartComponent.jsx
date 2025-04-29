import React, {useState} from "react";
import ShoppingCart from "../models/shoppingCart";
import { Button } from "@mui/material"; 


const ShoppingCartComponent = () => {
    const [cart, setCart]=useState(new ShoppingCart("Euros"));

    const handleAddItem = () => {
        console.log("adding Item");

        const newItem = {
            id: 1,
            nombre: "Camiseta",
            precio: 2.99,
            cantidad: 2
        }

        const updatedCart = new ShoppingCart(cart.currency);
        updatedCart.items = [...cart.getItems(), newItem];
        setCart(updatedCart);
    
    }

    return (
        <>

            <Button onClick={handleAddItem}>
                Add Item
            </Button> 

            <ul>
                {cart.getItems().map(item=> ( 

                    <li key={item.id}>{item.nombre} - {item.precio} -{item.cantidad} </li>

                ))}                
                
                </ul>     
                
        </>

    )

}

export default ShoppingCartComponent