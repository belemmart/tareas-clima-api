# API de Gestión de Tareas (Sesión 2)

Proyecto integrador que implementa un servicio web tipo REST para la gestión de tareas, incluyendo operaciones CRUD, validación de datos y manejo de estados HTTP.

## Guía de Códigos de Estado HTTP
* **200 OK:** Petición procesada exitosamente.
* **201 Created:** Recurso creado correctamente (POST).
* **204 No Content:** Eliminación exitosa (DELETE).
* **400 Bad Request:** Error de validación en los datos del usuario.
* **404 Not Found:** El recurso solicitado no existe.

* **502 Bad Gateway** Error de servicio externo. Nuestro servidor funciona, pero el proveedor de clima falló o no respondió.