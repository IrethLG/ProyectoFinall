<?php

include 'bd/BD.php';

header('Access-Control-Allow-origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');
    
if ($_SERVER['REQUEST_METHOD']=='GET'){
if(isset($_GET['id'])){
$query="select * from Venta where idVenta=".$_GET['id'];
$resultado=metodoGet($query);
echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));

}else{

$query ="select *from Venta";
$resultado =metodoGet ($query);
echo json_encode($resultado->fetchAll());

}

header("HITP/1.1 200 OK");
exit();
/////////////////////////////////////////////////////////////////
}
if($_POST['METHOD'] == 'POST'){ 
    unset ($_POST['METHOD']);
    $cantidad=$_POST['cantidad'];  
    $fecha=$_POST['fecha'];  
    $idEmpleado =$_POST['idEmpleado'];
    $idCliente =$_POST['idCliente'];
    
    $query="INSERT INTO Venta ( cantidad, fecha, idEmpleado,idCliente ) 
    values( '$cantidad', '$fecha', '$idEmpleado', '$idCliente')";
    
    $queryAutoIncrement="select MAX(idVenta) as id from Venta";
    
    $resultado =metodoPost ($query, $queryAutoIncrement); 
    echo json_encode ($resultado); 
    header("HTTP/1.1 200 OK");
    
    exit();
    
    }

//////////////////////////////////////////////////////
if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_POST['id'];
    $cantidad=$_POST['cantidad'];  
    $fecha=$_POST['fecha'];  
    $estatus=$_POST['estatus'];
    $idEmpleado =$_POST['idEmpleado'];
    $idCliente =$_POST['idCliente'];
    

    $query="UPDATE Venta set cantidad='$cantidad',fecha='$fecha',estatus=$estatus, idEmpleado='$idEmpleado'
         WHERE idVenta ='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
////////////////////////////////7

if($_POST['METHOD']=='DELETE'){
    unset ($_POST['METHOD']);

    $idVenta=$_GET['id'];
    $query="DELETE FROM Venta  WHERE idVenta='$idVenta'";
    $resultado =metodoDelete ($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>