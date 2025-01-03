# Task Challenge

Este proyecto es una aplicación de tareas desarrollada con **Angular** para el frontend, **Node.js y Express** para el backend, y **Firebase Firestore** como base de datos. La aplicación permite a los usuarios iniciar sesión con su correo electrónico y gestionar una lista de tareas.

## **Tecnologías Utilizadas**

- **Frontend:**
  - **Angular 15**: Framework frontend basado en TypeScript utilizado para construir una SPA (Single Page Application). Angular facilita la creación de componentes reutilizables y la gestión eficiente del estado de la aplicación.
  
- **Backend:**
  - **Node.js V18.18.2**: Entorno de ejecución para JavaScript en el servidor. Node.js es utilizado para manejar las peticiones HTTP y procesar la lógica de negocio del API.
  - **Express**: Framework minimalista de Node.js para la creación de APIs RESTful. Utilizado para gestionar las rutas del servidor y el manejo de peticiones HTTP.
  - **Firebase Firestore**: Base de datos NoSQL proporcionada por Firebase, utilizada para almacenar los usuarios y las tareas de manera escalable.

- **Desarrollo:**
  - **TypeScript**: Lenguaje de programación basado en JavaScript, que agrega tipado estático. Es utilizado tanto en el frontend (Angular) como en el backend (Node.js/Express).


## **Características de la Aplicación**

La aplicación consta de dos páginas principales:

### 1. **Página de Inicio de Sesión:**
   - Un formulario donde solo se pide el **correo electrónico** del usuario.
   - Si el usuario **existe en la base de datos**, es redirigido a la página principal.
   - Si el usuario **no existe**, se presenta un diálogo preguntando si desea **crear una cuenta**. Si acepta, el usuario es creado y redirigido a la página principal.

### 2. **Página Principal:**
   - Muestra una lista de tareas pendientes del usuario, ordenadas por fecha de creación que se asigna cuando se crea cada tarea.
   - Cada tarea tiene un título, descripción, fecha de creación y estado.
   - Las tareas pueden ser:
     - **Completadas** o **Pendientes** a través de una casilla de verificación.
     - **Editadas** o **Eliminadas** mediante botones de acción.
   - Un modal que contiene un formulario para agregar nuevas tareas.

### 3. **Diseño Responsive:**
   - La interfaz es **responsiva**, adaptándose a dispositivos móviles, tabletas y pantallas de escritorio.

---

## **Estructura del Proyecto**

La estructura del proyecto está organizada de la siguiente manera:

### **Frontend (Sitio Web)**
-     /Frontend
-     /src
-     /app
      - /components
      - /environment
      - /inteface
      - /pages
      - /services
      - /assets

### **Backend (API)**

-     /Backend
-     /src
      - /connectionFirebase
      - /controllers
      - /middlewares
      - /routes
### Descripción de la Estructura del Proyecto

#### **Frontend (Sitio Web)**


- **/Frontend**: Esta es la carpeta principal del proyecto frontend, que contiene todos los archivos necesarios para construir y ejecutar la aplicación web.
  
- **/src**: Dentro de `src`, se encuentra el código fuente de la aplicación web, es donde se encuentran los archivos TypeScript, HTML, SCSS y los módulos de la aplicación.

- **/app**: Es la carpeta central que agrupa todos los módulos y componentes que componen la interfaz y la lógica de la aplicación.

  - **/components**: Esta carpeta contiene los componentes reutilizables de la aplicación como el modal para crear tareas.

  - **/environment**: En esta carpeta se gestionan las configuraciones específicas del entorno de desarrollo o producción. En Angular, los archivos típicos aquí son `environment.ts` (desarrollo) y `environment.prod.ts` (producción), donde se guardan las variables de configuración como las URL de la API o claves de API.

  - **/interface**: Aquí se definen las interfaces TypeScript utilizadas para tipar los datos de la aplicación. Por ejemplo, interfaces para las tareas, los usuarios y otras entidades que se utilizan en el frontend.

  - **/pages**: Esta carpeta contiene los componentes que representan las distintas páginas o vistas de la aplicación. Cada archivo de esta carpeta se corresponde con una ruta o sección de la aplicación, como la página de inicio de sesión o la página principal de tareas.

  - **/services**: Aquí se definen los servicios que gestionan la lógica de negocio y la comunicación con el backend. Entre ellos esta un servicio de autenticación, un servicio para la gestión de tareas,un servicio para la interacción con Firebase, incluyendo utilidades como alertas y el manejo de la gestión de las rutas.

  - **/assets**: Esta carpeta alberga los recursos estáticos de la aplicación, como imágenes, fuentes, iconos y archivos multimedia que son utilizados en la interfaz de usuario.

---

#### **Backend (API)**


- **/Backend**: Esta es la carpeta principal del proyecto backend, donde se maneja toda la lógica del servidor y la API que interactúa con la base de datos, en este caso Firebase. Todo el código relacionado con el backend se encuentra en esta carpeta.

- **/src**: Dentro de esta carpeta se encuentra el código fuente del servidor, como los controladores de las rutas y la lógica de negocio que maneja las peticiones HTTP.

  - **/connectionFirebase**: Esta carpeta contiene el código necesario para la configuración e inicialización de Firebase en el backend. Aquí se gestionan las credenciales y conexiones con la base de datos Firestore, así como la configuración de Firebase Admin SDK.

  - **/controllers**: En esta carpeta se encuentran los controladores, que son responsables de manejar la lógica de negocio y de responder a las peticiones HTTP del cliente (frontend). Se encuentran el controlador de usuarios para el registro e inicio de sesión, así como también el controlador de tareas que manejará las peticiones para agregar, actualizar o eliminar tareas.

  - **/middlewares**: Los middlewares son funciones que se ejecutan durante el ciclo de vida de la solicitud HTTP. Realiza tareas como la verificación de autenticación o la manipulación de la solicitud antes de que llegue al controlador correspondiente.

  - **/routes**: Esta carpeta contiene la definición de las rutas de la API. Cada archivo en esta carpeta define las rutas y los métodos HTTP (GET, POST, PUT, DELETE) que se utilizarán para interactuar con los recursos del servidor. Cada conjunto de rutas generalmente corresponde a un controlador específico (por ejemplo, `taskRoutes.ts` o `userRoutes.ts`).

---

## **Resumen de la Estructura**

- El **frontend** está organizado en módulos y componentes independientes que facilitan el desarrollo y la reutilización de las distintas partes de la aplicación.
- El **backend** está compuesto por controladores, servicios y rutas que gestionan las solicitudes y la lógica de la API, así como la interacción con la base de datos Firebase.

Cada parte del proyecto tiene una clara separación de responsabilidades, lo que mejora la escalabilidad y el mantenimiento a largo plazo.


## **Decisiones de Diseño**

### **Frontend (Sitio Web - Angular)**

1. **Uso de Angular para el Frontend**:
   Se eligió **Angular** para el desarrollo del frontend debido a su arquitectura modular, basada en componentes. Esto facilita la creación de aplicaciones escalables y mantenibles. Además, Angular proporciona un sistema de inyección de dependencias, manejo de rutas y formularios reactivos, lo cual se adapta perfectamente a las necesidades del proyecto.

2. **Componentización**:
   El proyecto se organiza utilizando una estructura basada en componentes, cada uno con su propia lógica y vista. Esto permite reutilizar y mantener los componentes de manera eficiente.
   
3. **Servicios para la Gestión de la Lógica de Negocio**:
   Para mantener el código organizado y desacoplado, se implementaron servicios Angular que gestionan la lógica de negocio y la comunicación con el backend y Firebase. Esto permite que los componentes se centren únicamente en la interacción con la UI.

4. **Interfaz para Tipado Seguro**:
   Utilizamos **interfaces TypeScript** en la carpeta `/interface` para garantizar que los datos se manejen de manera coherente en toda la aplicación. Estas interfaces tipan las entidades, como `Task` y `User`, proporcionando una capa de seguridad adicional al código.

5. **Estilo Responsive**:
   Se optó por el uso de SCSS  para el estilo visual y se implementó un diseño **responsive**. Esto asegura que la aplicación se vea correctamente en dispositivos móviles, tabletas y escritorios.

---

### **Backend (API - Node.js + Express)**

1. **Uso de Node.js y Express para el Backend**:
   Se seleccionó **Node.js** junto con **Express** debido a su eficiencia en la gestión de peticiones asíncronas, lo que lo hace ideal para aplicaciones web en tiempo real como la nuestra. Express es un framework minimalista que permite definir rutas y middleware de manera rápida y sencilla.

2. **Firebase Firestore como Base de Datos**:
   Firebase fue elegido como la base de datos por su facilidad de integración, escalabilidad y manejo en tiempo real de los datos. **Firestore**, la base de datos NoSQL de Firebase, permite almacenar y sincronizar datos entre el cliente y el servidor de forma eficiente. Además, la integración con Firebase Authentication simplifica la autenticación de usuarios.

3. **Arquitectura Modular y Separación de Responsabilidades**:
   El backend está organizado de manera modular, separando claramente las distintas funcionalidades:
   - **Controllers**: Encargados de manejar la lógica de negocio y responder a las peticiones HTTP. 
   - **Routes**: Definen las rutas RESTful para interactuar con los controladores.
   - **Services**: Proporcionan la lógica central para interactuar con Firestore y realizar operaciones CRUD.
   - **Middlewares**: Para validación y manejo de errores, así como la gestión de autenticación y autorización.

4. **Middlewares para Seguridad**:
   Se utilizan **middlewares** para asegurar que las peticiones que acceden a las rutas protegidas (como las de agregar o editar tareas) estén autenticadas correctamente. Este enfoque permite un control centralizado de la seguridad y la validación.

5. **Escalabilidad y Despliegue en Firebase Cloud Functions**:
   Las funciones de backend están alojadas en **Firebase Cloud Functions**, lo que permite que el proyecto escale automáticamente según la demanda sin necesidad de gestionar servidores físicos. Firebase Functions también se integran fácilmente con Firestore, lo que mejora el rendimiento y la facilidad de desarrollo.

---

### ** Decisiones de Diseño**

- Comunicación Frontend - Backend:
  La aplicación utiliza el patrón **RESTful** para la comunicación entre el frontend y el backend. Se hace uso de métodos HTTP estándar (GET, POST, PUT, DELETE) para interactuar con los recursos de la API (tareas y usuarios).

- **Autenticación Basada en Correo Electrónico**:
  Para simplificar la autenticación, se utiliza un sistema basado en correo electrónico. Si el usuario ya existe en la base de datos de Firebase, se le redirige a la página principal. Si no, se le ofrece la opción de crear una cuenta.

- **Simplicidad y Escalabilidad**:
  El diseño de la aplicación sigue principios de **simplicidad** y **escalabilidad**. En el frontend, se ha optado por una arquitectura sencilla, sin implementar patrones complejos como NgRx, ya que no son necesarios para este caso de uso. El backend también sigue una estructura clara y modular, lo que permite agregar nuevas funcionalidades sin complicaciones.

---