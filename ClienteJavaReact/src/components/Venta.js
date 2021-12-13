import React ,{useState,useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import axios from 'axios';

const Venta=()=>{
  const baseurl="http://localhost:81/TiendaAPI/Venta.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
    
    
    idVenta: '',
    cantidad: '',
	 fecha  : '',
	 estatus : '',
	 idEmpleado  : '',
	 idCliente  : '',
	
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
    f.append("cantidad", frameworkSeleccionado.cantidad);
    f.append("fecha", frameworkSeleccionado.fecha);
    f.append("estatus", frameworkSeleccionado.estatus);
    f.append("idEmpleado", frameworkSeleccionado.idEmpleado);
    f.append("idCliente", frameworkSeleccionado.idCliente);

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
    f.append("cantidad", frameworkSeleccionado.cantidad);
    f.append("fecha", frameworkSeleccionado.fecha);
    f.append("estatus", frameworkSeleccionado.estatus);
    f.append("idEmpleado", frameworkSeleccionado.idEmpleado);
    f.append("idCliente", frameworkSeleccionado.idCliente);
    f.append("METHOD", "PUT");
    await axios.post(baseurl, f, {params: {idVenta: frameworkSeleccionado.idVenta}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(framework=>{
        if(framework.idVenta===frameworkSeleccionado.idVenta){
          framework.cantidad=frameworkSeleccionado.cantidad;
          framework.fecha=frameworkSeleccionado.fecha;     
               framework.estatus=frameworkSeleccionado.estatus;

          framework.idEmpleado=frameworkSeleccionado.idEmpleado;
          framework.idCliente=frameworkSeleccionado.idCliente;


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
    await axios.post(baseurl, f, {params: {idVenta: frameworkSeleccionado.idVenta}})
    .then(response=>{
      setData(data.filter(framework=>framework.idVenta!==frameworkSeleccionado.idVenta));
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
          <th>ID</th>
          <th>Cantidad</th>
          <th>Fecha  </th>
          <th>Estatus</th>
          <th>IdEmpleado</th>
          <th>IdCliente</th>
          
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(framework=>(
          <tr key={framework.idVenta}>
            <td>{framework.idVenta}</td>
            <td>{framework.cantidad}</td>
            <td>{framework.fecha}</td>
            <td>{framework.estatus}</td>
            <td>{framework.idEmpleado}</td>
            <td>{framework.idCliente}</td>
          
          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarFramework(framework, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarFramework(framework, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar Framework</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Cantidad: </label>
          <br />
          <input type="text" className="form-control" name="cantidad" onChange={handleChange}/>
          <br />
          <label>Fecha: </label>
          <br />
          <input type="text" className="form-control" name="fecha" onChange={handleChange}/>
          <br />
          <label>Estatus: </label>
          <br />
          <input type="text" className="form-control" name="estatus" onChange={handleChange}/>
          <br />
          <label>idEmpleado: </label>
          <br />
          <input type="text" className="form-control" name="idEmpleado" onChange={handleChange}/>
          <br />
          <label>idCliente: </label>
          <br />
          <input type="text" className="form-control" name="idCliente" onChange={handleChange}/>
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
          <label>Cantidad: </label>
          <br />
          <input type="text" className="form-control" name="cantidad" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.cantidad}/>
          <br />
          <label>fecha: </label>
          <br />
          <input type="text" className="form-control" name="fecha" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.fecha}/>
          <br />
          <label>Estatus: </label>
          <br />
          <input type="text" className="form-control" name="estatus" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.estatus}/>
          <br />
          <label>idEmpleado: </label>
          <br />
          <input type="text" className="form-control" name="idEmpleado" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.idEmpleado}/>
          <br />
          <label>idCliente: </label>
          <br />
          <input type="text" className="form-control" name="idCliente" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.idCliente}/>
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
        ¿Estás seguro que deseas eliminar el Cliente {frameworkSeleccionado && frameworkSeleccionado.idVenta}?
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


    export default Venta;