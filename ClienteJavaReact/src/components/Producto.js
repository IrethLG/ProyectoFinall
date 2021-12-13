import React ,{useState,useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import axios from 'axios';

const Producto=()=>{
  const baseurl="http://localhost:81/TiendaAPI/Producto.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
    
    
    idProducto: '',
    nombre: '',
	 categoria  : '',
	 descripccion : '',
	 precio  : '',
	 cantidadStock  : '',
	 marca : '',
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
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("categoria", frameworkSeleccionado.categoria);
    f.append("descripccion", frameworkSeleccionado.descripccion);
    f.append("precio", frameworkSeleccionado.precio);
    f.append("cantidadStock", frameworkSeleccionado.cantidadStock);
    f.append("marca", frameworkSeleccionado.marca);
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
    f.append("categoria", frameworkSeleccionado.categoria);
    f.append("descripccion", frameworkSeleccionado.descripccion);
    f.append("precio", frameworkSeleccionado.precio);
    f.append("cantidadStock", frameworkSeleccionado.cantidadStock);
    f.append("marca", frameworkSeleccionado.marca);
    f.append("estatus", frameworkSeleccionado.estatus);
    f.append("METHOD", "PUT");
    await axios.post(baseurl, f, {params: {idProducto: frameworkSeleccionado.idProducto}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(framework=>{
        if(framework.idProducto===frameworkSeleccionado.idProducto){
          framework.nombre=frameworkSeleccionado.nombre;
          framework.categoria=frameworkSeleccionado.categoria;
          framework.descripccion=frameworkSeleccionado.descripccion;
          framework.precio=frameworkSeleccionado.precio;
          framework.cantidadStock=frameworkSeleccionado.cantidadStock;
          framework.marca=frameworkSeleccionado.marca;

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
    await axios.post(baseurl, f, {params: {idProducto: frameworkSeleccionado.idProducto}})
    .then(response=>{
      setData(data.filter(framework=>framework.idProducto!==frameworkSeleccionado.idProducto));
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
          <th>Categoria  </th>
          <th>Descripccion</th>
          <th>Precio</th>
          <th>Cantidad Stock</th>
          <th>Marca</th>

          <th>Estatus</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(framework=>(
          <tr key={framework.idProducto}>
            <td>{framework.idProducto}</td>
            <td>{framework.nombre}</td>
            <td>{framework.categoria}</td>
            <td>{framework.descripccion}</td>
            <td>{framework.precio}</td>
            <td>{framework.cantidadStock}</td>
            <td>{framework.marca}</td>

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
          <label>Categoria: </label>
          <br />
          <input type="text" className="form-control" name="categoria" onChange={handleChange}/>
          <br />
          <label>Descripccion: </label>
          <br />
          <input type="text" className="form-control" name="descripccion" onChange={handleChange}/>
          <br />
          <label>Precio: </label>
          <br />
          <input type="text" className="form-control" name="precio" onChange={handleChange}/>
          <br />
          <label>Cantidad Stock: </label>
          <br />
          <input type="text" className="form-control" name="cantidadStock" onChange={handleChange}/>
          <br />
          <label>Marca: </label>
          <br />
          <input type="text" className="form-control" name="marca" onChange={handleChange}/>
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
          <label>Categoria: </label>
          <br />
          <input type="text" className="form-control" name="categoria" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.categoria}/>
          <br />
          <label>Descripccion: </label>
          <br />
          <input type="text" className="form-control" name="descripccion" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.descripccion}/>
          <br />
          <label>Precio: </label>
          <br />
          <input type="text" className="form-control" name="precio" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.precio}/>
          <br />
          <label>Cantidad Stock: </label>
          <br />
          <input type="text" className="form-control" name="cantidadStock" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.cantidadStock}/>
          <br />
          <label>Marca: </label>
          <br />
          <input type="text" className="form-control" name="marca" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.marca}/>
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
        ¿Estás seguro que deseas eliminar el Cliente {frameworkSeleccionado && frameworkSeleccionado.idProducto}?
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


    export default Producto;