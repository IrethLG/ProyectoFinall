import React ,{useState,useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import axios from 'axios';

const Cliente=()=>{
  const baseurl="http://localhost:81/TiendaAPI/cliente.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
    idCliente: '',
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    direccion: '',
    telefono: '',
    estatus: '',
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
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("apellidoP", frameworkSeleccionado.apellidoP);
    f.append("apellidoM", frameworkSeleccionado.apellidoM);
    f.append("direccion", frameworkSeleccionado.direccion);
    f.append("telefono", frameworkSeleccionado.telefono);
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
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("apellidoP", frameworkSeleccionado.apellidoP);
    f.append("apellidoM", frameworkSeleccionado.apellidoM);
    f.append("direccion", frameworkSeleccionado.direccion);
    f.append("telefono", frameworkSeleccionado.telefono);
    f.append("estatus", frameworkSeleccionado.estatus);
    f.append("METHOD", "PUT");
    await axios.post(baseurl, f, {params: {idCliente: frameworkSeleccionado.idCliente}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(framework=>{
        if(framework.idCliente===frameworkSeleccionado.idCliente){
          framework.nombre=frameworkSeleccionado.nombre;
          framework.apellidoP=frameworkSeleccionado.apellidoP;
          framework.apellidoM=frameworkSeleccionado.apellidoM;
          framework.direccion=frameworkSeleccionado.direccion;
          framework.telefono=frameworkSeleccionado.telefono;
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
    await axios.post(baseurl, f, {params: {idCliente: frameworkSeleccionado.idCliente}})
    .then(response=>{
      setData(data.filter(framework=>framework.idCliente!==frameworkSeleccionado.idCliente));
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
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Apellido</th>
          <th>Direccion</th>
          <th>Telefono</th>
          <th>Estatus</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(framework=>(
          <tr key={framework.idCliente}>
            <td>{framework.idCliente}</td>
            <td>{framework.nombre}</td>
            <td>{framework.apellidoP}</td>
            <td>{framework.apellidoM}</td>
            <td>{framework.direccion}</td>
            <td>{framework.telefono}</td>
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
      <ModalHeader>Insertar Framework</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
          <br />
          <label>Apellidp P: </label>
          <br />
          <input type="text" className="form-control" name="apellidoP" onChange={handleChange}/>
          <br />
          <label>Apellidp M: </label>
          <br />
          <input type="text" className="form-control" name="apellidoM" onChange={handleChange}/>
          <br />
          <label>Direccion: </label>
          <br />
          <input type="text" className="form-control" name="direccion" onChange={handleChange}/>
          <br />
          <label>Telefono: </label>
          <br />
          <input type="text" className="form-control" name="telefono" onChange={handleChange}/>
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
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.nombre}/>
          <br />
          <label>Apellido p: </label>
          <br />
          <input type="text" className="form-control" name="apellidoP" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.apellidoP}/>
          <br />
          <label>Apellido m: </label>
          <br />
          <input type="text" className="form-control" name="apellidoM" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.apellidoM}/>
          <br />
          <label>Direccion: </label>
          <br />
          <input type="text" className="form-control" name="direccion" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.direccion}/>
          <br />
          <label>Telefono: </label>
          <br />
          <input type="text" className="form-control" name="telefono" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.telefono}/>
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
        ¿Estás seguro que deseas eliminar el Cliente {frameworkSeleccionado && frameworkSeleccionado.idCliente}?
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


    export default Cliente;