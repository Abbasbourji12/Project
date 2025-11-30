import { Link, NavLink } from "react-router-dom";

import { useCart } from "../context/CartContext";



function Navbar() {

const { cart } = useCart();

const totalItems = cart.reduce((s, i) => s + i.qty, 0);



return (

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">

<div className="container">

<Link className="navbar-brand" to="/">Palate Pleasures</Link>

<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">

<span className="navbar-toggler-icon"></span>

</button>

<div className="collapse navbar-collapse" id="mainNav">

<ul className="navbar-nav ms-auto">

<li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>

<li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>

<li className="nav-item"><NavLink className="nav-link" to="/services">Services</NavLink></li>

<li className="nav-item"><NavLink className="nav-link" to="/menu">Menu</NavLink></li>

<li className="nav-item"><NavLink className="nav-link" to="/orders">Orders</NavLink></li>

<li className="nav-item">

<NavLink className="nav-link" to="/cart">

Cart {totalItems > 0 && <span className="badge bg-primary ms-1">{totalItems}</span>}

</NavLink>

</li>

<li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>

</ul>

</div>

</div>

</nav>

);

}



export default Navbar;

