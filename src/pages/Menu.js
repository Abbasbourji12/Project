import { useState } from "react";

import { menuData } from "../data/menuData";

import MenuCard from "../components/MenuCard";



function Menu() {

const [filter, setFilter] = useState("All");

const categories = ["All", ...new Set(menuData.map(item => item.category))];

const filteredItems = filter === "All" ? menuData : menuData.filter(item => item.category === filter);



return (

<div className="container mt-5">

<h2 className="text-center mb-4">Our Menu</h2>

<div className="text-center mb-4">

{categories.map(cat => (

<button key={cat} className={`btn me-2 mb-2 ${filter === cat ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFilter(cat)}>

{cat}

</button>

))}

</div>

<div className="row">

{filteredItems.map(item => (

<MenuCard key={item.id} item={item} />

))}

</div>

</div>

);

}

export default Menu;