<?php

include 'bd/BD.php';
header('Access-Control-Allow-origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');
    
if ($_SERVER['REQUEST_METHOD']=='GET'){
if(isset($_GET['id'])){
$query="select * from ProductoVenta where idProductoVenta=".$_GET['id'];
$resultado=metodoGet($query);
echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));

}else{

$query ="select *from ProductoVenta";
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
    $idVenta =$_POST['idVenta'];
    $nombreProducto=$_POST['nombreProducto'];   
    $cantidadProducto=$_POST['cantidadProducto'];  
    
    
    $query="INSERT INTO ProductoVenta (idProducto,idVenta, nombreProducto,cantidadProducto) 
    values( '$idProducto', '$idVenta', '$nombreProducto', '$cantidadProducto')";
    
    $queryAutoIncrement="select MAX(idProductoVenta) as id from ProductoVenta";
    
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
    $idVenta =$_POST['idVenta'];
    $nombreProducto=$_POST['nombreProducto'];   
    $cantidadProducto=$_POST['cantidadProducto']; 
    $estatus=$_POST['estatus'];

    $query="UPDATE ProductoVenta set idProducto='$idProducto',idVenta='$idVenta',
    nombreProducto='$nombreProducto', cantidadProducto='$cantidadProducto', estatus=$estatus
     WHERE idProductoVenta ='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
////////////////////////////////7

if($_POST['METHOD']=='DELETE'){
    unset ($_POST['METHOD']);

    $idProductoVenta=$_GET['id'];
    $query="DELETE FROM ProductoVenta  WHERE idProductoVenta='$idProductoVenta'";
    $resultado =metodoDelete ($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>