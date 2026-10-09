## Preguntas y Respuestas de la Práctica

### Ejercicio 1: Un botón reutilizable

> **¿Por qué el nombre de una etiqueta propia (Custom Element) debe llevar guion?**

Por especificación del estándar de Web Components de la W3C/HTML, todos los Custom Elements **deben incluir al menos un guion (`-`)** en su nombre por dos razones principales:

1. **Evitar colisiones con elementos nativos:** Evita que el nombre de nuestro componente choque con etiquetas HTML existentes o futuras creadas por el comité de HTML (por ejemplo, si definiéramos `<button>`, sobrescribiría o colisionaría con el botón nativo de HTML).
2. **Identificación temprana en el parser de HTML:** El motor del navegador puede diferenciar instantáneamente entre un elemento estándar y un Custom Element desde el momento en que parsea la etiqueta, aplicando el tratamiento correspondiente.

---

### Ejercicio 2: La tarjeta de producto

> **1. ¿Por qué se debe convertir el atributo de existencia/precio a número si llega como texto?**

Los atributos en el DOM (`getAttribute`) **siempre retornan un tipo de dato `string`** o `null`. Para poder realizar operaciones matemáticas (como sumar precios, validar si `existencia <= 0` o realizar comparaciones numéricas), es necesario castear o convertir explícitamente el valor textual a un número (mediante `Number()`, `parseInt()` o `parseFloat()`). De lo contrario, JavaScript realizaría concatenaciones de texto en lugar de operaciones numéricas.

---

> **2. ¿Qué sucede si el evento no puede salir del árbol de sombra (Shadow DOM)?**

Si al emitir el evento personalizado desde un Web Component no se configura la propiedad `bubbles: true` y/o `composed: true`:
* El evento se queda **atrapado internamente** dentro del Shadow DOM del componente.
* No se propaga (no hace "bubbling") hacia los elementos padres del DOM principal (como la contenedor/rejilla).
* **Resultado:** Los listeners registrados fuera del componente (como `rejilla.addEventListener('agregar', ...)` en `main.ts`) nunca se enteran de que el evento ocurrió. No se muestra ningún error en la consola porque sintácticamente es válido, pero el estado de la aplicación (como el contador del carrito) no se actualiza.

Para que un Custom Event atraviese la frontera del Shadow DOM y suba hasta el DOM principal, debe instanciarse así:
```javascript
this.dispatchEvent(new CustomEvent('agregar', {
  detail: { id, nombre, precio },
  bubbles: true,   // Permite que el evento suba por el árbol HTML
  composed: true   // Permite que el evento atraviese la frontera del Shadow DOM
}));

---

## Asignación 3: Respuestas a la Asignación

### Parte A: Tabla Genérica (`<tabla-generica>`)

#### 1. ¿Por qué esta tabla se puede llamar «genérica»?
Se le llama **genérica** porque no está acoplada a ningún tipo de dato específico ni conoce de antemano la estructura de la información que va a desplegar. La tabla es un componente declarativo de representación que recibe un arreglo de definición de columnas (`{ clave, titulo }`) y un arreglo de objetos de datos. 

Accede dinámicamente a las propiedades de cada objeto usando la sintaxis de corchetes (`fila[col.clave]`), lo que permite que el mismo componente sirva para mostrar productos, alumnos, calificaciones o cualquier otra entidad sin modificar una sola línea de su código fuente.

#### 2. ¿Qué tendría que cambiar para mostrar alumnos en lugar de productos?
El código interno del Web Component `<tabla-generica>` se mantendría exactamente **igual**. Únicamente tendría que cambiar la configuración de las columnas y de las filas enviadas desde el archivo principal (`main.ts`):

```typescript
// Configuración para mostrar alumnos en lugar de productos
tabla.columnas = [
  { clave: 'matricula', titulo: 'Matrícula' },
  { clave: 'nombre', titulo: 'Nombre del Alumno' },
  { clave: 'carrera', titulo: 'Carrera' }
];

tabla.filas = [
  { matricula: '00000212345', nombre: 'Ivan Arce', carrera: 'Ingeniería en Software' },
  { matricula: '00000216789', nombre: 'María López', carrera: 'Ingeniería en Software' }
];