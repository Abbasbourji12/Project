import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";



function MenuCard({ item }) {

const { addToCart } = useCart();



return (

<div className="col-sm-6 col-md-4 col-lg-3 mt-4">

<div className="card h-100 shadow">

<img src={item.img} className="card-img-top" alt={item.name} style={{ objectFit: 'cover', height: 180 }} />

<div className="card-body d-flex flex-column">

<h5 className="card-title">{item.name}</h5>

<p className="card-text small text-muted">{item.description}</p>

<div className="mt-auto">

<p className="fw-bold mb-2">${item.price.toFixed(2)}</p>

<div className="d-flex gap-2">

<button onClick={() => addToCart(item, 1)} className="btn btn-sm btn-success flex-fill">

+ Add

</button>

<Link to={`/order/${item.id}`} className="btn btn-sm btn-primary flex-fill">Details</Link>

</div>

</div>

</div>

</div>

</div>

);

}



export default MenuCard;

