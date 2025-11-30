import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import Navbar from "./components/Navbar";

import Footer from "./components/Footer";



import Home from "./pages/Home";

import About from "./pages/About";

import Services from "./pages/Services";

import Contact from "./pages/Contact";

import Menu from "./pages/Menu";

import OrderDetails from "./pages/OrderDetails";



import CartPage from "./pages/CartPage";

import OrderTracking from "./pages/OrderTracking";

import OrderConfirmation from "./pages/OrderConfirmation";

import SingleOrderPage from "./pages/SingleOrderPage";



function App() {

return (

<Router>

<Navbar />

<Routes>

<Route path="/" element={<Home />} />

<Route path="/about" element={<About />} />

<Route path="/services" element={<Services />} />

<Route path="/contact" element={<Contact />} />

<Route path="/menu" element={<Menu />} />

<Route path="/order/:id" element={<OrderDetails />} />

<Route path="/cart" element={<CartPage />} />

<Route path="/orders" element={<OrderTracking />} />

<Route path="/orders/:orderId" element={<SingleOrderPage />} />

<Route path="/order-confirmation" element={<OrderConfirmation />} />

<Route path="/orders/:orderId/confirm" element={<SingleOrderPage />} />

{/* Fallback route (optional) */}

<Route path="*" element={<div className="container mt-5"><h3>Page not found</h3></div>} />

</Routes>

<Footer />

</Router>

);

}



export default App;

