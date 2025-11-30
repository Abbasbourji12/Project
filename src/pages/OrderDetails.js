import { useParams, useNavigate } from "react-router-dom";

import { menuData } from "../data/menuData";

import { useState } from "react";

import { useCart } from "../context/CartContext";



function OrderDetails() {

const { id } = useParams();

const item = menuData.find(food => String(food.id) === String(id));

const { addToCart } = useCart();

const [qty, setQty] = useState(1);

const navigate = useNavigate();



if (!item) {

return <div className="container mt-5"><h3>Item not found</h3></div>;

}



function handleAdd() {

addToCart(item, Number(qty));

navigate("/cart");

}



return (

<div className="container mt-5">

<div className="row">

<div className="col-md-5">

<img src={item.img} className="img-fluid rounded" alt={item.name} />

</div>

<div className="col-md-7">

<h2>{item.name}</h2>

<p className="text-muted">{item.description}</p>

<h4 className="text-primary">${item.price.toFixed(2)}</h4>



<div className="d-flex align-items-center gap-3 mt-3">

<label className="mb-0">Quantity</label>

<input type="number" min="1" value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} className="form-control" style={{ width: 100 }} />

<button onClick={handleAdd} className="btn btn-success">Add to Cart</button>

</div>

</div>

</div>

</div>

);

}



export default OrderDetails;