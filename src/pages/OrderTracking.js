import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";



const ORDERS_KEY = "palate_orders";



const STATUS_FLOW = ["Processing", "Preparing", "Out for Delivery", "Delivered"];



function loadOrders() {

try {

return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");

} catch {

return [];

}

}



function saveOrders(orders) {

localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

}



function OrderTracking() {

const [orders, setOrders] = useState(() => loadOrders());

const [filter, setFilter] = useState("");

const { orderId } = useParams();



useEffect(() => {

setOrders(loadOrders());

}, []);



function advanceStatus(id) {

const updated = orders.map(o => {

if (o.id !== id) return o;

const currentIndex = STATUS_FLOW.indexOf(o.status);

const nextStatus = STATUS_FLOW[Math.min(STATUS_FLOW.length - 1, currentIndex + 1)];

return { ...o, status: nextStatus };

});

saveOrders(updated);

setOrders(updated);

}



function searchResult() {

if (!filter && !orderId) return orders;

const q = (filter || orderId || "").trim();

return orders.filter(o => o.id.includes(q));

}



return (

<div className="container mt-5">

<h2>Order Tracking</h2>



<div className="mb-4 d-flex gap-2">

<input className="form-control" placeholder="Search by Order ID" value={filter} onChange={(e) => setFilter(e.target.value)} />

<button className="btn btn-outline-secondary" onClick={() => setOrders(loadOrders())}>Refresh</button>

</div>



{searchResult().length === 0 ? (

<div className="alert alert-info">No orders found.</div>

) : (

<div className="list-group">

{searchResult().map(order => (

<div key={order.id} className="list-group-item">

<div className="d-flex justify-content-between align-items-center">

<div>

<h5 className="mb-1">{order.id}</h5>

<small className="text-muted">Placed at: {new Date(order.createdAt).toLocaleString()}</small>

<div className="mt-2">

<strong>Status:</strong> <span className="badge bg-info text-dark">{order.status}</span>

</div>

<div className="mt-2">

<strong>Items:</strong>

<ul className="mb-0">

{order.items.map(i => <li key={i.id}>{i.qty} × {i.name}</li>)}

</ul>

</div>

</div>

<div className="text-end">

<p className="mb-2 fw-bold">${order.total.toFixed(2)}</p>

<div className="d-flex flex-column">

<button className="btn btn-sm btn-outline-primary mb-2" onClick={() => advanceStatus(order.id)}>Advance Status</button>

<Link to={`/orders/${order.id}`} state={{ order }} className="btn btn-sm btn-secondary">View</Link>

</div>

</div>

</div>

</div>

))}

</div>

)}

</div>

);

}



export default OrderTracking;
