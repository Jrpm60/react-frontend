import {useState} from "react";

const useShoppingCart = (curreency = "Euros") => {

    const [items, setItems] = useState([]);

    const addItem = (newItems) => {
        setItems(prevItems => [...prevItems, newItems]);
    }

    const clearCart = () => {
        setItems([]);
    }

    return {
        items, addItem, clearCart


    }
}

export default useShoppingCart;