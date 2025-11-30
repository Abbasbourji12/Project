
import { useLocation } from "react-router-dom";



function OrderConfirmation() {

const location = useLocation();

const order = location.state?.order;



if (!order) {

return <div className="container mt-5"><h3>No order to show.</h3></div>;

}



return (

<div className="container mt-5">

<h2>Order Placed</h2>

<p className="lead">Thank you! Your order <strong>{order.id}</strong> has been placed.</p>



<div className="card">

<div className="card-body">

<p><strong>Order ID:</strong> {order.id}</p>

<p><strong>Placed at:</strong> {new Date(order.createdAt).toLocaleString()}</p>

<p><strong>Status:</strong> {order.status}</p>

<h5>Items</h5>

<ul>

{order.items.map(it => (

<li key={it.id}>{it.qty} × {it.name} — ${ (it.price * it.qty).toFixed(2) }</li>

))}

</ul>

<h4>Total: ${order.total.toFixed(2)}</h4>

</div>

</div>

</div>

);

}



export default OrderConfirmation;

