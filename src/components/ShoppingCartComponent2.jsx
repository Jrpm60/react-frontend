import React, {useState} from "react";
import useShoppingCart from "../hooks/useShoppingCart";
import { Button } from "@mui/material"; 


const ShoppingCartComponent2 = () => {

    const {items, addItem, clearCart} = useShoppingCart("Euros");
   
    const handleAddItem = () => {
        console.log("adding Item");

        const newItem = {
            id: 1,
            nombre: "Camiseta",
            precio: 2.99,
            cantidad: 2
        }

        addItem(newItem);
    
    }

    return (
        <>

            <Button onClick={handleAddItem}>
                Add Item
            </Button> 

               <ul>
                {items.map(item=> ( 

                    <li key={item.id}>{item.nombre} - {item.precio} -{item.cantidad} </li>
 
                ))}                
                
                </ul>     
                
        </>

    )

}

export default ShoppingCartComponent2