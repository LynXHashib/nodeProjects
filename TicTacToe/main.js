const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    webPreferences: {
      nodeIntegration: true, // Allow Node.js in the renderer process
      contextIsolation: false, // Required for Node.js integration
    },
  });

  // Load the index.html file
  mainWindow.loadFile("index.html");

  // Open the DevTools (optional)
  // mainWindow.webContents.openDevTools();

  // Handle window close
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// When the app is ready, create the window
app.on("ready", createWindow);

// Quit when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
