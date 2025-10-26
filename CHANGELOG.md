# Historial de Cambios

## Versión 2.0.0

Esta versión introduce mejoras críticas de seguridad en toda la aplicación para fortalecer la protección de los datos del usuario y la infraestructura del backend.

### Mejoras de Seguridad

- **Prevención de Enumeración de Usuarios:** Se han modificado los endpoints de autenticación y registro para devolver respuestas genéricas. Esto elimina la posibilidad de que un actor malicioso pueda identificar qué correos electrónicos están registrados en el sistema.

- **Validación y Sanitización de Entradas:** Se implementó un esquema de validación estricto para todas las entradas del cliente. Esto previene ataques de inyección de datos, asegurando que solo se procesen los campos esperados y con el formato correcto, y rechazando cualquier campo malicioso como `role` o `isLocked`.

- **Seguridad de Token JWT Reforzada:** Se actualizó el mecanismo de JSON Web Tokens. Se reemplazó el algoritmo simétrico `HS256` por el asimétrico `RS256` y se implementó una estrategia de `refresh tokens` para reducir el tiempo de vida de los tokens de acceso, minimizando el riesgo en caso de que un token sea comprometido.

- **Mitigación de Ataques de "Timing":** Se ha hecho más robusto el proceso de inicio de sesión para asegurar que el tiempo de respuesta del servidor sea constante, independientemente de si el usuario existe o si la contraseña es incorrecta. Esto neutraliza la capacidad de un atacante para inferir información a través de ataques de temporización.
