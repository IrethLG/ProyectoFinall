import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar";
import Producto from "./components/Producto";
import Cliente from "./components/Cliente";
import Empleado from "./components/Empleado";
import Proveedor from "./components/Proveedor";
import Venta from "./components/Venta";
import Users from "./components/Users";

import ProductoVenta from "./components/ProductoVenta";

import Home from "./components/Home";


const App=()=>{
  return (
  <Router>
    <Navbar/>
    <Switch>
<Route path="/" component={Home} exact>
<Home/>
</Route>

<Route path="/Producto" component={Producto} exact>
<Producto/>
</Route>

<Route path="/Cliente" component={Cliente} exact>
<Cliente/>
</Route>
<Route path="/Users" component={Users} exact>
<Users/>
</Route>
<Route path="/Empleado" component={Empleado} exact>
<Empleado/>
</Route>

<Route path="/Proveedor" component={Proveedor} exact>
<Proveedor/>
</Route>

<Route path="/Venta" component={Venta} exact>
<Venta/>
</Route>

<Route path="/ProductoVenta" component={ProductoVenta} exact>
<ProductoVenta/>
</Route>

</Switch>
     </Router>
     );
};
export default App;