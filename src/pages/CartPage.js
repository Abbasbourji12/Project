import { useCart } from "../context/CartContext";

import { Link, useNavigate } from "react-router-dom";



const ORDERS_KEY = "palate_orders";



function saveOrderToLocalStorage(order) {

const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");

existing.unshift(order);

localStorage.setItem(ORDERS_KEY, JSON.stringify(existing));

}



function createOrderObject(cartItems, total) {

const id = `ORD-${Date.now()}`;

const createdAt = new Date().toISOString();

return {

id,

items: cartItems,

total,

status: "Processing",

createdAt

};

}



function CartPage() {

const { cart, updateQty, removeFromCart, clearCart, getTotal } = useCart();

const navigate = useNavigate();



function handleCheckout() {

if (cart.length === 0) return alert("Cart is empty");

const order = createOrderObject(cart, getTotal());

saveOrderToLocalStorage(order);

clearCart();

navigate(`/orders/${order.id}`, { state: { order } });

}



return (

<div className="container mt-5">

<h2>Your Cart</h2>

{cart.length === 0 ? (

<div className="alert alert-info">Your cart is empty. <Link to="/menu">Browse menu</Link></div>

) : (

<>

<div className="table-responsive">

<table className="table">

<thead>

<tr>

<th>Item</th>

<th>Price</th>

<th style={{ width: 120 }}>Qty</th>

<th>Subtotal</th>

<th></th>

</tr>

</thead>

<tbody>

{cart.map(item => (

<tr key={item.id}>

<td>

<div className="d-flex align-items-center gap-3">

<img src={item.img} alt={item.name} style={{ width: 64, height: 64, objectFit: 'cover' }} className="rounded" />

<div>

<div className="fw-bold">{item.name}</div>

</div>

</div>

</td>

<td>${item.price.toFixed(2)}</td>

<td>

<input type="number" min="1" value={item.qty} onChange={(e) => updateQty(item.id, Math.max(1, Number(e.target.value)))} className="form-control" />

</td>

<td>${(item.price * item.qty).toFixed(2)}</td>

<td><button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>Remove</button></td>

</tr>

))}

</tbody>

</table>

</div>



<div className="d-flex justify-content-between align-items-center mt-3">

<div>

<Link to="/menu" className="btn btn-outline-secondary">Continue shopping</Link>

</div>

<div className="text-end">

<h4>Total: ${getTotal().toFixed(2)}</h4>

<button className="btn btn-success mt-2" onClick={handleCheckout}>Checkout & Place Order</button>

</div>

</div>

</>

)}

</div>

);

}



export default CartPage;