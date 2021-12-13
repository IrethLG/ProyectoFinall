import React ,{useState,useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import axios from 'axios';

const Users=()=>{
  const baseurl="http://localhost:81/TiendaAPI/users.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
    idUser: '',
    UserName: '',
    passwd: '',
    role: '',
   
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
    f.append("UserName", frameworkSeleccionado.UserName);
    f.append("passwd", frameworkSeleccionado.passwd);
    f.append("role", frameworkSeleccionado.role);
  
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
    f.append("UserName", frameworkSeleccionado.UserName);
    f.append("passwd", frameworkSeleccionado.passwd);
    f.append("role", frameworkSeleccionado.role);
    f.append("METHOD", "PUT");
    await axios.post(baseurl, f, {params: {idUser: frameworkSeleccionado.idUser}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(framework=>{
        if(framework.idUser===frameworkSeleccionado.idUser){
          framework.UserName=frameworkSeleccionado.UserName;
          framework.passwd=frameworkSeleccionado.passwd;
          framework.role=frameworkSeleccionado.role;
        

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
    await axios.post(baseurl, f, {params: {idUser: frameworkSeleccionado.idUser}})
    .then(response=>{
      setData(data.filter(framework=>framework.idUser!==frameworkSeleccionado.idUser));
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
          <th>User Name</th>
          <th>Password</th>
          <th>Role</th>
         
        </tr>
      </thead>
      <tbody>
        {data.map(framework=>(
          <tr key={framework.idUser}>
            <td>{framework.idUser}</td>
            <td>{framework.UserName}</td>
            <td>{framework.passwd}</td>
            <td>{framework.role}</td>
           
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
          <label>User Name: </label>
          <br />
          <input type="text" className="form-control" name="UserName" onChange={handleChange}/>
          <br />
          <label>Password: </label>
          <br />
          <input type="text" className="form-control" name="passwd" onChange={handleChange}/>
          <br />
          <label>Role : </label>
          <br />
          <input type="text" className="form-control" name="role" onChange={handleChange}/>
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
          <label>User Name: </label>
          <br />
          <input type="text" className="form-control" name="UserName" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.UserName}/>
          <br />
          <label>Passwd : </label>
          <br />
          <input type="text" className="form-control" name="passwd" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.passwd}/>
          <br />
          <label>role: </label>
          <br />
          <input type="text" className="form-control" name="role" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.role}/>
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
        ¿Estás seguro que deseas eliminar el User {frameworkSeleccionado && frameworkSeleccionado.idUser}?
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


    export default Users;