import React ,{useState,useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import axios from 'axios';

const ProductoVenta=()=>{
  const baseurl="http://localhost:81/TiendaAPI/ProductoVenta.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
    
    
    idProductoVenta: '',
    idProducto: '',
	 idVenta  : '',
	 nombreProducto : '',
	
	 cantidadProducto: '',
	 estatus : '',
  
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setFrameworkSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(frameworkSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseurl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("idProducto", frameworkSeleccionado.idProducto);
    f.append("idVenta", frameworkSeleccionado.idVenta);
    f.append("nombreProducto", frameworkSeleccionado.nombreProducto);
    f.append("cantidadProducto", frameworkSeleccionado.cantidadProducto);
    
    f.append("estatus", frameworkSeleccionado.estatus);

    f.append("METHOD", "POST");
    await axios.post(baseurl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("idProducto", frameworkSeleccionado.idProducto);
    f.append("idVenta", frameworkSeleccionado.idVenta);
    f.append("nombreProducto", frameworkSeleccionado.nombreProducto);
    f.append("cantidadProducto", frameworkSeleccionado.cantidadProducto);
    
    f.append("estatus", frameworkSeleccionado.estatus);
    f.append("METHOD", "PUT");
    await axios.post(baseurl, f, {params: {idProductoVenta: frameworkSeleccionado.idProductoVenta}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(framework=>{
        if(framework.idProductoVenta===frameworkSeleccionado.idProductoVenta){
          framework.idProducto=frameworkSeleccionado.idProducto;
          framework.idVenta=frameworkSeleccionado.idVenta;
          framework.nombreProducto=frameworkSeleccionado.nombreProducto;
          framework.cantidadProducto=frameworkSeleccionado.cantidadProducto;

          framework.estatus=frameworkSeleccionado.estatus;

        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseurl, f, {params: {idProductoVenta: frameworkSeleccionado.idProductoVenta}})
    .then(response=>{
      setData(data.filter(framework=>framework.idProductoVenta!==frameworkSeleccionado.idProductoVenta));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarFramework=(framework, caso)=>{
    setFrameworkSeleccionado(framework);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div style={{textAlign: 'center'}}>
<br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>IdProductoVenta</th>
          <th>idProducto</th>
          <th>idVenta  </th>
          <th>Nombre Producto</th>
          <th>Cantidad Producto</th>
       

          <th>Estatus</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(framework=>(
          <tr key={framework.idProductoVenta}>
                        <td>{framework.idProductoVenta}</td>

            <td>{framework.idProducto}</td>
            <td>{framework.idVenta}</td>
            <td>{framework.nombreProducto}</td>
            <td>{framework.cantidadProducto}</td>
        

            <td>{framework.estatus}</td>
          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarFramework(framework, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarFramework(framework, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>idProducto: </label>
          <br />
          <input type="text" className="form-control" name="idProducto" onChange={handleChange}/>
          <br />
          <label>idVenta: </label>
          <br />
          <input type="text" className="form-control" name="idVenta" onChange={handleChange}/>
          <br />
          <label>Nombre Producto: </label>
          <br />
          <input type="text" className="form-control" name="nombreProducto " onChange={handleChange}/>
          <br />
          <label>Cantidad Producto: </label>
          <br />
          <input type="text" className="form-control" name="cantidadProducto" onChange={handleChange}/>
          <br />
         
          <label>Estatus: </label>
          <br />
          <input type="text" className="form-control" name="estatus" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>idProducto: </label>
          <br />
          <input type="text" className="form-control" name="idProducto" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.idProducto}/>
          <br />
          <label>idVenta: </label>
          <br />
          <input type="text" className="form-control" name="idVenta" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.idVenta}/>
          <br />
          <label>Nombre Producto: </label>
          <br />
          <input type="text" className="form-control" name="nombreProducto" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.nombreProducto}/>
          <br />
          <label>Cantidad Producto: </label>
          <br />
          <input type="text" className="form-control" name="cantidadProducto" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.cantidadProducto}/>
          <br />
          
          <label>Estatus: </label>
          <br />
          <input type="text" className="form-control" name="estatus" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.estatus}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Producto Venta {frameworkSeleccionado && frameworkSeleccionado.idProductoVenta}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}


    export default ProductoVenta;