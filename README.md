# maed_rest

Grupo JoRaCaFra

Integrantes:

- Franz Ferrufino Quispe
- Carlos Montellano Barriga
- Raúl Vargas Choquilla
- Jorge Escobar Pacheco

Stack:
	- MySQL - Items - Categorias
	- MongoDb - Usuarios
	- Api Gateway
	- Microservicios
		- NodeJS
		- Java Spring Boot
	- TICKS
	- JMeter
	- Document Swagger
	
API Documentation
	- Swagger

- API Testing A working script (or a Web App, alternatively) to illustrate all of the API flows (e.g. jasmine.js).
	- Postman
	- Si terminamos todo hasta el jueves vemos de crear la aplicación
		
Scalability Strategy
	- JMeter
		- Definir métricas
	- Usar TICKS
		
GIT Access to all code
	- Listo

API published online (Cloud)
	- Listo	

Requirements
	Usuarios
		- Registrar
				- Id :int 
				- Nombre : string
				- Email : string
				- FechaCreación :Timestamp
				- Estado : string
				- Rol : string
			
			- Usuarios comunes
				- Comprador
		
		- Vendedor
			- Admin
		- Login
		- Buscar
		- Deshabilitar Usuarios

	Items (Logs transactions per user buy / sell)
		
		- Publicar un item con foto (CREAR)
			- Id
			- Nombre 
			- Descripción
			- Estado
			- Precio
			- UsuarioId
			- CategoriaId
			- FechaPublicación
			
		- Comprar el item 
		- Borrar items
		- Listar items
			- Incluir queries
		- Buscar

	Categorias
		- Crear categorias
			- Id
			- Nombre
			- Descripción
		- Listar categorias
		- Actualizar
		- Borrar
		- Buscar

	Propuesta Busquedas:
		- Buscar 
			- Usuarios
			- Items
			- Categorias

Forma de trabajo:

- Cada feature tiene un branch
- Hacemos pull request a master
	- Code Review

Branch naming


Estándares:

- Todo en inglés
- Nombre columnas pascalCase
- Nombre tablas todo en singular
- Palabras clave MAYÚSCULAS (SELECT, UPDATE, INSERT, WHERE)
- Nombre clases CamelCase

Estandares rest
- Recurso en plural

