import React, { createContext, useContext, useEffect, useState } from "react";



const CartContext = createContext();



export function useCart() {

return useContext(CartContext);

}



const CART_KEY = "palate_cart";



export function CartProvider({ children }) {

const [cart, setCart] = useState(() => {

try {

const saved = localStorage.getItem(CART_KEY);

return saved ? JSON.parse(saved) : [];

} catch {

return [];

}

});



useEffect(() => {

localStorage.setItem(CART_KEY, JSON.stringify(cart));

}, [cart]);



function addToCart(item, quantity = 1) {

setCart(prev => {

const existing = prev.find(p => p.id === item.id);

if (existing) {

return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + quantity } : p);

} else {

return [...prev, { ...item, qty: quantity }];

}

});

}



function updateQty(id, qty) {

setCart(prev => prev.map(p => p.id === id ? { ...p, qty: qty } : p));

}



function removeFromCart(id) {

setCart(prev => prev.filter(p => p.id !== id));

}



function clearCart() {

setCart([]);

}



function getTotal() {

return cart.reduce((s, i) => s + i.price * i.qty, 0);

}



const value = { cart, addToCart, updateQty, removeFromCart, clearCart, getTotal };



return <CartContext.Provider value={value}>{children}</CartContext.Provider>;

}

