const { app, BrowserWindow, screen } = require('electron'); // Importar los módulos necesarios de Electron
const path = require('node:path'); // Importar el módulo 'path' para manejar rutas de archivos

try { // Intentar cargar electron-reloader para recargar la aplicación automáticamente durante el desarrollo
  require('electron-reloader')(module); // Requiere el módulo electron-reloader para recargar la aplicación
} catch (err) { // Capturar cualquier error al cargar electron-reloader
  console.log('Error al cargar electron-reloader:', err);
}

if (require('electron-squirrel-startup')) { // Verifica si la aplicación se inició con Squirrel (instalador de Windows)
  app.quit(); // Si es así, cierra la aplicación inmediatamente
}

const createWindow = () => { // Función para crear la ventana principal de la aplicación

  // Obtiene el tamaño de la pantalla principal para establecer el tamaño de la ventana
  const { width, height } = screen.getPrimaryDisplay().size;
 
  const mainWindow = new BrowserWindow({ // Crear una nueva ventana del navegador
    width, // Establecer el ancho de la ventana al ancho de la pantalla
    height, // Establecer la altura de la ventana a la altura de la pantalla
    webPreferences: { // Configurar las preferencias web de la ventana
      preload: path.join(__dirname, 'preload.js'), // Cargar el script de preload
      contextIsolation: true, // Aislar el contexto para mayor seguridad
      nodeIntegration: true, // Habilitar la integración de Node.js en el contexto de la ventana
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html')); // Cargar el archivo HTML principal en la ventana

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  // mainWindow.setMenuBarVisibility(false);
  // mainWindow.resizable = false;
  mainWindow.setMenu(null);
};

app.whenReady().then(() => { // Cuando la aplicación esté lista, crear la ventana principal
  createWindow(); // Llamar a la función para crear la ventana

  app.on('activate', () => { // Cuando la aplicación se active (por ejemplo, al hacer clic en el icono en la barra de tareas)
    if (BrowserWindow.getAllWindows().length === 0) { // Si no hay ventanas abiertas, crear una nueva ventana
      createWindow(); // Llamar a la función para crear la ventana
    }
  });
});

app.on('window-all-closed', () => { // Cuando todas las ventanas estén cerradas
  if (process.platform !== 'darwin') { // Si la plataforma no es macOS
    // En plataformas diferentes a macOS, salir de la aplicación
    app.quit();
  }
});


