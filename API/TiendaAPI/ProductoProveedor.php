<?php

include 'bd/BD.php';

header('Access-Control-Allow-origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');
    
if ($_SERVER['REQUEST_METHOD']=='GET'){
if(isset($_GET['id'])){
$query="select * from ProductoProveedor where idProductoProveedor=".$_GET['id'];
$resultado=metodoGet($query);
echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));

}else{

$query ="select *from ProductoProveedor";
$resultado =metodoGet ($query);
echo json_encode($resultado->fetchAll());

}

header("HITP/1.1 200 OK");
exit();
/////////////////////////////////////////////////////////////////
}
if($_POST['METHOD'] == 'POST'){ 
    unset ($_POST['METHOD']);
    $idProducto =$_POST['idProducto'];
    $idProveedor =$_POST['idProveedor'];
   
    
    
    $query="INSERT INTO ProductoProveedor (idProducto,idProveedor) 
    values( '$idProducto', '$idProveedor')";
    
    $queryAutoIncrement="select MAX(idProductoProveedor) as id from ProductoProveedor";
    
    $resultado =metodoPost ($query, $queryAutoIncrement); 
    echo json_encode ($resultado); 
    header("HTTP/1.1 200 OK");
    
    exit();
    
    }

//////////////////////////////////////////////////////
if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_POST['id'];
    $idProducto =$_POST['idProducto'];
    $idProveedor =$_POST['idProveedor'];

    $estatus=$_POST['estatus'];

    $query="UPDATE ProductoProveedor set idProducto='$idProducto',idProveedor='$idProveedor', estatus=$estatus
     WHERE idProductoProveedor ='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
////////////////////////////////7

if($_POST['METHOD']=='DELETE'){
    unset ($_POST['METHOD']);

    $idProductoProveedor=$_GET['id'];
    $query="DELETE FROM ProductoProveedor  WHERE idProductoProveedor='$idProductoProveedor'";
    $resultado =metodoDelete ($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>