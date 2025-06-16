# Collar de Perlas Interactivo 🧵💎

Este proyecto simula un collar circular compuesto por perlas **negras y blancas**, donde en cada iteración se van transformando las perlas negras en blancas siguiendo un patrón cíclico y progresivo. La simulación muestra gráficamente el collar, las iteraciones y los estados de cada perla a lo largo del tiempo.

## 🚀 Características

- Representación visual del collar circular con animaciones.
- Registro de cada iteración con el estado (`bN` o `nN`) de cada perla.
- Control de inicio y detención del proceso.
- Comportamiento conforme al patrón esperado:
  - La perla blanca "avanza" una posición en cada iteración.
  - Se agrega una nueva perla blanca tras completar un ciclo completo.
  - El proceso continúa hasta que todas las perlas son blancas.

## 🧰 Tecnologías Usadas

- **[Bulma CSS](https://bulma.io/)** – Framework CSS moderno, ligero y responsivo.
- **[SweetAlert2](https://sweetalert2.github.io/)** – Para mostrar alertas elegantes e interactivas.
- **[Electron.js](https://www.electronjs.org/)** – Para empaquetar la aplicación como app de escritorio.
- **[Node.js](https://nodejs.org/)** – Entorno de ejecución para la lógica en segundo plano.

## 📦 Estructura del Proyecto

- `index.html`: Estructura del DOM.
- `styles.css`: Estilos del collar y la tabla.
- `script.js`: Lógica de rotación, transformación y registro.
- `main.js`: Script principal de Electron para inicializar la app.
- `package.json`: Archivo de configuración de Node y Electron.
- `README.md`: Descripción del proyecto.

## 🛠️ Cómo usar

1. Clona este repositorio:
   ```bash
   git clone https://github.com/jcm78411/el-collar-de-gandalf.git
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Lanza la aplicación:
   ```bash
   npm start
   ```

4. Empaqueta la aplicación:
   ```bash
   npm run package
   ```

   O si quieres otras plataformas (Linux, MacOS, 32-bits):

   - En el archivo "package.json" busca la clave "mp_packager"
   - Reemplaza el campo "--platform=win32" por alguno d elos valores:
     
   ```bash
   --platform=linux
   ```

   ```bash
   --platform=darwin
   ```

   ```bash
   --arch=ia32
   ```
   
