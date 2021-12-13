import React from 'react';

import  {Link} from "react-router-dom";
 import "./Navbar.css";

const Navbar = () => {

return (

<nav className="navbar">
<h3 className="1ogo"></h3>
<ul className="nav-links">

<Link to="/Home" className="Home">
<li>Inicio</li>
</Link>

<Link to="/Cliente" className="Cliente">
<li>Cliente</li>
</Link>
<Link to="/Users" className="Users">
<li>Users</li>
</Link>

<Link to="/Producto" className="Producto">
<li>Producto</li>
</Link>

<Link to="/Empleado" className="Empleado">
<li>Empleado</li>
</Link>

<Link to="/Producto" className="Producto">
<li>Producto</li>
</Link>

<Link to="/Proveedor" className="Proveedor">
<li>Proveedor</li>
</Link>

<Link to="/Venta" className="Venta">
<li>Venta</li>
</Link>

<Link to="/ProductoVenta" className="ProductoVenta">
<li>ProductoVenta</li>
</Link>

</ul>
</nav>
)



}
export default Navbar;