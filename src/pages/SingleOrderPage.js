import { useLocation, useParams } from "react-router-dom";



function SingleOrderPage() {

const { orderId } = useParams();

const location = useLocation();

const providedOrder = location.state?.order;



let order = providedOrder;



if (!order) {

const all = JSON.parse(localStorage.getItem("palate_orders") || "[]");

order = all.find(o => o.id === orderId);

}



if (!order) {

return <div className="container mt-5"><h3>Order not found.</h3></div>;

}



return (

<div className="container mt-5">

<h2>Order {order.id}</h2>

<p><strong>Placed:</strong> {new Date(order.createdAt).toLocaleString()}</p>

<p><strong>Status:</strong> {order.status}</p>



<div className="card">

<div className="card-body">

<h5>Items</h5>

<ul>

{order.items.map(i => <li key={i.id}>{i.qty} × {i.name} — ${ (i.price * i.qty).toFixed(2) }</li>)}

</ul>

<h4>Total: ${order.total.toFixed(2)}</h4>

</div>

</div>

</div>

);

}



export default SingleOrderPage;
