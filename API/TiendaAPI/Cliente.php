<?php

include 'bd/BD.php';

header('Access-Control-Allow-origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');
    
if ($_SERVER['REQUEST_METHOD']=='GET'){
if(isset($_GET['id'])){
$query="select * from Cliente where idCliente=".$_GET['id'];
$resultado=metodoGet($query);
echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));

}else{

$query ="select *from Cliente";
$resultado =metodoGet ($query);
echo json_encode($resultado->fetchAll());

}

header("HITP/1.1 200 OK");
exit();
/////////////////////////////////////////////////////////////////
}
if($_POST['METHOD'] == 'POST'){ 
    unset ($_POST['METHOD']);
    $nombre=$_POST['nombre'];   
    $apellidoP=$_POST['apellidoP']; 
    $apellidoM=$_POST['apellidoM'];  
    $direccion=$_POST['direccion'];  
    $telefono =$_POST['telefono'];
    
    $query="INSERT INTO Cliente (nombre, apellidoP, apellidoM, direccion, telefono ) 
    values('$nombre', '$apellidoP', '$apellidoM', '$direccion', '$telefono')";
    
    $queryAutoIncrement="select MAX(idCliente) as id from Cliente";
    
    $resultado =metodoPost ($query, $queryAutoIncrement); 
    echo json_encode ($resultado); 
    header("HTTP/1.1 200 OK");
    
    exit();
    
    }

//////////////////////////////////////////////////////
if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_POST['id'];
    $nombre=$_POST['nombre'];
    $apellidoP =$_POST['apellidoP'];
    $apellidoM=$_POST['apellidoM'];
    $direccion=$_POST['direccion'];
    $telefono =$_POST['telefono'];
    $estatus=$_POST['estatus'];

    $query="UPDATE Cliente set nombre='$nombre', apellidoP='$apellidoP',
     apellidoM= '$apellidoM', direccion='$direccion', telefono='$telefono',estatus=$estatus
     WHERE idCliente ='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
////////////////////////////////7

if($_POST['METHOD']=='DELETE'){
    unset ($_POST['METHOD']);

    $idCliente=$_GET['id'];
    $query="DELETE FROM Cliente  WHERE idCliente='$idCliente'";
    $resultado =metodoDelete ($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>