<?php

include 'bd/BD.php';

header('Access-Control-Allow-origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');
    
if ($_SERVER['REQUEST_METHOD']=='GET'){
if(isset($_GET['id'])){
$query="select * from Proveedor where idProveedor=".$_GET['id'];
$resultado=metodoGet($query);
echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));

}else{

$query ="select *from Proveedor";
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
 
    $direccion=$_POST['direccion'];  
    $telefono =$_POST['telefono'];
    
    $query="INSERT INTO Proveedor (nombre, direccion, telefono ) 
    values('$nombre', '$direccion', '$telefono')";
    
    $queryAutoIncrement="select MAX(idProveedor) as id from Proveedor";
    
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
    $direccion=$_POST['direccion'];
    $telefono =$_POST['telefono'];
    $estatus=$_POST['estatus'];

    $query="UPDATE Proveedor set nombre='$nombre', direccion='$direccion', telefono='$telefono',estatus=$estatus
     WHERE idProveedor ='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
////////////////////////////////7

if($_POST['METHOD']=='DELETE'){
    unset ($_POST['METHOD']);

    $idProveedor=$_GET['id'];
    $query="DELETE FROM Proveedor  WHERE idProveedor='$idProveedor'";
    $resultado =metodoDelete ($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>