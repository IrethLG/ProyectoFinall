<?php

include 'bd/BD.php';

header('Access-Control-Allow-origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');
    
if ($_SERVER['REQUEST_METHOD']=='GET'){
if(isset($_GET['id'])){
$query="select * from Producto where idProducto=".$_GET['id'];
$resultado=metodoGet($query);
echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));

}else{

$query ="select *from Producto";
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
     $categoria=$_POST['categoria'];
    $descripccion=$_POST['descripccion']; 
    $precio=$_POST['precio'];  
    $cantidadStock=$_POST['cantidadStock'];  
    $marca =$_POST['marca'];
    
    $query="INSERT INTO Producto (nombre,categoria, descripccion, precio, cantidadStock, marca ) 
    values('$nombre','$categoria', '$descripccion', '$precio', '$cantidadStock', '$marca')";
    
    $queryAutoIncrement="select MAX(idProducto) as id from Producto";
    
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
     $categoria=$_POST['categoria'];
    $descripccion=$_POST['descripccion']; 
    $precio=$_POST['precio'];  
    $cantidadStock=$_POST['cantidadStock'];  
    $marca =$_POST['marca'];
    $estatus=$_POST['estatus'];

    $query="UPDATE Producto set nombre='$nombre',categoria='$categoria', descripccion='$descripccion',
     precio= '$precio', cantidadStock='$cantidadStock', marca='$marca',estatus=$estatus
     WHERE idProducto ='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
////////////////////////////////7

if($_POST['METHOD']=='DELETE'){
    unset ($_POST['METHOD']);

    $idProducto=$_GET['id'];
    $query="DELETE FROM Producto  WHERE idProducto='$idProducto'";
    $resultado =metodoDelete ($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>