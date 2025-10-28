# Sistema de Consulta de Permisos

Una aplicación web moderna y responsiva para consultar información de permisos estudiantiles basada en un archivo CSV.

## Características

- 🔍 **Búsqueda múltiple**: Por nombre, matrícula, carrera o grupo
- 📱 **Diseño responsivo**: Funciona perfectamente en dispositivos móviles y escritorio
- 📊 **Tabla interactiva**: Con paginación y ordenamiento
- 🎨 **Interfaz moderna**: Diseño atractivo con gradientes y animaciones
- ⚡ **Carga rápida**: Optimizado para manejar grandes volúmenes de datos
- 🔄 **Tiempo real**: Filtros instantáneos sin recarga de página

## Archivos incluidos

- `index.html` - Estructura principal de la página
- `styles.css` - Estilos CSS modernos y responsivos
- `script.js` - Funcionalidad JavaScript completa
- `PERMISOS.csv` - Archivo de datos (debe estar en la misma carpeta)

## Instalación y uso

1. **Descargar archivos**: Asegúrate de tener todos los archivos en la misma carpeta
2. **Servidor local**: Para evitar problemas de CORS, ejecuta la aplicación desde un servidor local
3. **Abrir aplicación**: Abre `index.html` en tu navegador web

### Opciones para servidor local:

#### Opción 1: Python (recomendado)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Luego visita: `http://localhost:8000`

#### Opción 2: Node.js
```bash
npx http-server
```

#### Opción 3: PHP
```bash
php -S localhost:8000
```

## Funcionalidades

### Búsqueda
- **Por Nombre**: Busca estudiantes por su nombre completo
- **Por Matrícula**: Busca por número de matrícula específico
- **Por Carrera**: Filtra por carrera técnica
- **Por Grupo**: Busca por grupo específico

### Controles
- **Buscar**: Ejecuta la búsqueda con los criterios seleccionados
- **Limpiar**: Borra el campo de búsqueda y muestra todos los registros
- **Mostrar Todos**: Muestra todos los permisos sin filtros

### Paginación
- Navegación por páginas con botones anterior/siguiente
- Números de página para acceso directo
- Información de registros mostrados
- 20 registros por página por defecto

## Estructura de datos

El archivo CSV debe tener las siguientes columnas:
- MATRICULA
- NOMBRECOMPLETO
- CARRERA
- GRUPO
- PERIODO
- QUIEN LO TRAMITA
- PARENTESCO
- TOTAL DE DIAS
- DESDE
- HASTA
- JUSTIFICACION
- FOLIO

## Personalización

### Cambiar registros por página
En `script.js`, modifica la variable:
```javascript
const recordsPerPage = 20; // Cambia este número
```

### Modificar colores
En `styles.css`, puedes cambiar los colores principales:
```css
/* Colores principales */
--primary-color: #3498db;
--secondary-color: #2c3e50;
--accent-color: #e74c3c;
```

### Agregar nuevas funcionalidades
El código está bien estructurado y comentado para facilitar modificaciones:
- Funciones de filtrado en `script.js`
- Estilos responsivos en `styles.css`
- Estructura HTML semántica en `index.html`

## Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móviles

## Solución de problemas

### Error de CORS
Si ves errores de CORS, asegúrate de ejecutar la aplicación desde un servidor local, no abriendo directamente el archivo HTML.

### Archivo CSV no encontrado
Verifica que el archivo `PERMISOS.csv` esté en la misma carpeta que `index.html`.

### Datos no se cargan
Revisa la consola del navegador (F12) para ver errores específicos.

## Tecnologías utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript ES6+**: Funcionalidad interactiva
- **Font Awesome**: Iconos
- **Fetch API**: Carga de datos CSV

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Soporte

Para reportar problemas o solicitar nuevas funcionalidades, por favor contacta al desarrollador.
