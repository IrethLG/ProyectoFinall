
CREATE DATABASE	TiendaApiDbMysql;

USE TiendaApiDbMysql;

/*TABLAS*/


CREATE TABLE Cliente
(   
	 idCliente int auto_increment ,
	 nombre varchar(25) NOT NULL,
	 apellidoP varchar(50) NOT NULL,
	 apellidoM  varchar(20) NOT NULL, 
	 direccion  varchar(100) NOT NULL,
	 telefono  varchar (20) NOT NULL,
     estatus bit NOT NULL DEFAULT 1,
	 CONSTRAINT PK_Cliente PRIMARY KEY (idCliente)
);
CREATE TABLE Empleado
(   
	 idEmpleado int auto_increment,
	 rfc varchar(25) NOT NULL,
	 nombre varchar(25) NOT NULL,
	 apellidoP varchar(50) NOT NULL,
	 apellidoM  varchar(20) NOT NULL, 
	 direccion  varchar(100) NOT NULL,
	 telefono  varchar(20) NOT NULL,
	 estatus bit NOT NULL DEFAULT 1,
	 CONSTRAINT PK_Empleado PRIMARY KEY (idEmpleado)
);
CREATE TABLE Proveedor
(   
	 idProveedor int auto_increment,
	 nombre varchar(25) NOT NULL,
	 direccion  varchar(100) NOT NULL,
	 telefono  varchar(20) NOT NULL,
	 estatus bit NOT NULL DEFAULT 1,
	 CONSTRAINT PK_Proveedor PRIMARY KEY (idProveedor)
);
CREATE TABLE Producto
(   
	 idProducto int auto_increment,
	 nombre varchar(50) NOT NULL,
	 categoria  varchar(50) NOT NULL,
	 descripccion varchar(250) NOT NULL,
	 precio  decimal (10,2) NOT NULL,
	 cantidadStock  int NOT NULL,
	 marca varchar(50) NOT NULL,
	 estatus bit NOT NULL DEFAULT 1,
	 CONSTRAINT PK_Producto PRIMARY KEY (idProducto)
);
CREATE TABLE Venta
(       
	 idVenta int auto_increment,
	 cantidad  decimal (10,2) NOT NULL,
     fecha datetime NOT NULL,
	 estatus bit NOT NULL DEFAULT 1,
	  idEmpleado int NOT NULL,
	   idCliente int NOT NULL,
	   CONSTRAINT PK_Venta PRIMARY KEY (idVenta)

);
CREATE TABLE ProductoVenta

(   
     idProductoVenta int auto_increment,
	 idProducto int NOT NULL,
	 idVenta int NOT NULL,
	 nombreProducto varchar(50) NOT NULL,
	 cantidadProducto int NOT NULL,
	 estatus bit NOT NULL DEFAULT 1,
	 CONSTRAINT PK_ProductoVenta PRIMARY KEY (idProductoVenta)

);

CREATE TABLE ProductoProveedor

(   
     idProductoProveedor int auto_increment,
	 idProducto int NOT NULL, 
	 idProveedor int NOT NULL,
	 estatus bit NOT NULL DEFAULT 1,
	 CONSTRAINT PK_ProductoProveedor PRIMARY KEY (idProductoProveedor)

);
CREATE TABLE Users 
(
    idUser  int auto_increment,
    UserName VARCHAR(50),
    passwd VARCHAR(8000),
	role VARCHAR(20),
    	 CONSTRAINT PK_Users PRIMARY KEY (idUser)

);

/*INDEX*/
CREATE INDEX IX_Cliente ON Cliente(idCliente);
CREATE INDEX IX_Proveedor ON Proveedor(idProveedor);
CREATE INDEX IX_Empleado ON Empleado(idEmpleado);
CREATE INDEX IX_Producto ON Producto(idProducto);
CREATE INDEX IX_Venta ON Venta(idVenta);
CREATE INDEX IX_Users ON Users(idUser);
CREATE INDEX IX_ProductoVenta ON ProductoVenta(idProducto,idVenta);
CREATE INDEX IX_ProductoProveedor ON ProductoProveedor(idProducto,idProveedor);



/*RELACIONES*/

----
ALTER TABLE Venta
ADD CONSTRAINT FK_VentaEmpleado
FOREIGN KEY (idEmpleado) REFERENCES Empleado(idEmpleado);

ALTER TABLE Venta
ADD CONSTRAINT FK_VentaCliente
FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente);


-------
ALTER TABLE ProductoProveedor
ADD CONSTRAINT FK_ProductoProveedorProducto
FOREIGN KEY (idProducto) REFERENCES Producto(idProducto);

ALTER TABLE ProductoProveedor
ADD CONSTRAINT FK_ProductoProveedorProveedor
FOREIGN KEY (idProveedor) REFERENCES Proveedor(idProveedor);

----
ALTER TABLE ProductoVenta
ADD CONSTRAINT FK_ProductoVentaProducto
FOREIGN KEY (idProducto) REFERENCES Producto(idProducto);

ALTER TABLE ProductoVenta
ADD CONSTRAINT FK_ProductoVentaVenta
FOREIGN KEY (idVenta) REFERENCES Venta(idVenta);

----


 
/*POBLAR*/



	INSERT INTO Empleado(rfc,nombre, apellidoP,apellidoM,direccion,telefono)
    VALUES    ('VATL900113MW8','Ireth','Leyva','Garcia','Cd. Deportiva, Cd Deportiva, 25750 Monclova, Coah.','+866-168-16-56'),
	           ('CEL880421GG0','Jose Luis','Hernandez','Garza','Av. Huemac, Brasil Esq, Anáhuac, 25750 Monclova, Coah.','+866-198-11-56'),
			   ('FIM9203207K0','Flor Elizabeth','Flores','Perez','Brasil #201, Guadalupe, 25750 Monclova, Coah.','+844-188-56-34'),
			   ('GRA011009MW1','Marcos','Mireles','Tovar','Valparaíso 212, Guadalupe, 25750 Monclova, Coah.','+866-111-13-59'),
			   ('HDA100714HW5','Nataly','Meza','Rodriguez','Calle Guatemala S/N, Guadalupe, 25750 Monclova, Coah.','+866-677-23-12'),
			   ('ILA020311473','Samuel Israel','Vazquez','Villarial','Blvd Harold R. Pape 6201, Guadalupe, 25750 Monclova, Coah.','+844-190-23-45'),
			   ('RIPF800312AZ0','Juan de dios','Del Bosque','Saldua','Carretera 30, Magisterio, 25716 Frontera, Coah.','+866-166-78-01');
		
		
	 INSERT INTO Proveedor(nombre,direccion,telefono)
     VALUES   ('MAC','Calle Guatemala S/N, Guadalupe, 25750 Monclova, Coah.','+866-168-16-56'),
	           ('Avon','Carretera 30, Magisterio, 25716 Frontera, Coah.','+866-198-11-56'),
			   ('Revlon','Valparaíso 212, Guadalupe, 25750 Monclova, Coah.','+844-188-56-34'),
			   ('Bissu','Cd. Deportiva, Cd Deportiva, 25750 Monclova, Coah.','+866-111-13-59'),
			   ('NYX','Brasil #201, Guadalupe, 25750 Monclova, Coah.','+866-677-23-12'),
			   ('Maybelline New York ','Calle Guatemala S/N, Guadalupe, 25750 Monclova, Coah.','+844-190-23-45'),
			   ('NARS','Av. Huemac, Brasil Esq, Anáhuac, 25750 Monclova, Coah.','+866-166-78-01'),
			   ('Estée Lauder','Valparaíso 212, Guadalupe, 25750 Monclova, Coah.','+866-166-78-01');
	         
	  
	INSERT INTO Producto(nombre,categoria,descripccion,precio,cantidadStock,marca)
     VALUES  	('Base de maquillaje','Rostro','Base de maquillaje de larga duración (24h)',343,18,'MAC Cosmetics'),
				('Brush Cleaner','Accesorios','Limpia, acondiciona y desodoriza pinceles y brochas en un solo paso.',119,10,'Revlon'),
				('Corrector','Rostro','Corrector facial anti-ojeras',222,4,'NYX Profesional'),
				('Espejo de Aumento','Accesorios','Espejo de Maquillaje Iluminado, Regulable Luz',243,6,'Avon'),
				('Fotoprotector Compact','Rostro','Protege y matifica en un único gesto.',265,10,'MAC Cosmetics'),
				('Iluminador','Rostro','Fórmula líquida para construir la cobertura y el brillo',939,8,'NARS Cosmetics'),
				('Labial','Rostro','Color intenso y alta cobertura',99,32,'Maybelline New York'),
				('Limpiador de Brochas','Accesorios','Limpia y seca tu brocha de maquillaje en 10 segundos profundamente.',653,2,'Estée Lauder'),
				('Mascara','Rostro','Volumen tridimesional: las pestañas se densifican, se rizan y se separan.',233,2,'MAC Cosmetics'),
				('Organizador','Accesorios','Organizador de bolsas de cosméticos de viaje portátil ',639,9,'NYX Profesional'),
				('Paleta de sombras','Paletas','Colores cremosos e intensos',345,6,'Estée Lauder'),
				('Pestañas Magneticas ','Ojos','5 Pares Pestañas Postizas Magnéticas ',344,5,'Revlon'),
				('Polvo','Rostro','Maquillaje en polvo de larga duración',349,14,'MAC Cosmetics'),
				('Prime Plus ','Rostro','Para piel grasa y poros abiertos.',144,11,'Maybelline New York'),
				('Rimel','Ojos','Su cepillo efecto abanico con cerdas cortas y largas ',739,18,'Estée Lauder'),
				('Sombras Glitter','Ojos','Textura que se fija fácilmente a tu piel',849,20,'NYX Profesional'),
				('Spray fijador','Rostro','Rocía en tu rostro a una distancia de 5 cm y deja secar',243,10,'Revlon'),
				('Tintes Labial','Labios','Labial indeleble y de larga duración que no mancha el cubrebocas',78,2,'Maybelline New York');

	


	 INSERT INTO Cliente(nombre,apellidoP,apellidoM  ,direccion,telefono)
     VALUES    ('prueba con mysql  ','Leyva','Garcia','Cd. Deportiva, Cd Deportiva, 25750 Monclova, Coah.','+866-168-16-56'),
	           ('Jose Luis','Hernandez','Garza','Av. Huemac, Brasil Esq, Anáhuac, 25750 Monclova, Coah.','+866-198-11-56'),
			   ('Flor Elizabeth','Flores','Perez','Brasil #201, Guadalupe, 25750 Monclova, Coah.','+844-188-56-34'),
			   ('Marcos','Mireles','Tovar','Valparaíso 212, Guadalupe, 25750 Monclova, Coah.','+866-111-13-59'),
			   ('Nataly','Meza','Rodriguez','Calle Guatemala S/N, Guadalupe, 25750 Monclova, Coah.','+866-677-23-12'),
			   ('Samuel Israel','Vazquez','Villarial','Blvd Harold R. Pape 6201, Guadalupe, 25750 Monclova, Coah.','+844-190-23-45'),
			   ('Juan de dios','Del Bosque','Saldua','Carretera 30, Magisterio, 25716 Frontera, Coah.','+866-166-78-01');
     
	 

	 INSERT INTO Venta(cantidad,fecha,idEmpleado,idCliente)
	    VALUES   (234,'2021-11-12  12:00:00',3,2),
		         (123,'2021-12-11  12:00:00',6,4),
				 (433,'2021-06-08  12:00:00',1,2),
				 (67,'2021-10-12  12:00:00',3,1),
				 (256,'2021-12-04  12:00:00',4,3),
				 (785,'2021-11-06  12:00:00',5,5),
				 (32,'2021-03-11  12:00:00',3,3),
				 (165,'2021-05-10  12:00:00',7,2),
			     (436,'2021-06-12  12:00:00',4,2);

		

		INSERT INTO ProductoVenta(idProducto,idVenta,nombreProducto,cantidadProducto)
		VALUES (3,1,'Paleta de sombras',436),
		       (6,2,'Corrector',785),
			   (9,3,'Iluminador',67),
			   (12,4,'Brochas para maquillaje',165),
			   (2,5,'Mascara',234),
			   (4,6,'Organizador',56),
			   (8,7,'Rizador de pestañas',433),
			   (1,8,'Polvo Compacto',32);

	INSERT INTO ProductoProveedor(idProducto,idProveedor)
		VALUES (2,1),
		       (4,2),
			   (6,3),
			   (8,4),
			   (10,5),
			   (12,6),
			   (14,7),
			   (16,8);
			 
INSERT INTO Users (UserName, passwd, role)
VALUES ('usuario1',MD5( '1234'), 'Administrador'),
       ('usuario2',MD5('1234'), 'Usuario');
       
       SELECT * FROM  Users;

SELECT * FROM  Cliente;
SELECT * FROM    Proveedor;
SELECT * FROM  Empleado;
SELECT * FROM  Producto;
SELECT * FROM Venta;
SELECT * FROM    ProductoProveedor;
SELECT * FROM    ProductoVenta;

