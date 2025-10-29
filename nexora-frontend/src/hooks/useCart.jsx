import { useContext } from "react";
import { CartContext } from "../context/CartContext";


const useCart = () => {
    const cartAction = useContext( CartContext);
    return cartAction;
};

export default useCart;