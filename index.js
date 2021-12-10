const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const connection = require('./connection')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preloader.js')
    }
  })

  mainWindow.loadFile('index.html')
}

ipcMain.on("job:getAll", (e, data) => {
  connection("read_jobs", JSON.stringify(data), (res,err) => {
    if(err) {
      dialog.showErrorBox("Error", err.toString())
    } else {
      mainWindow.webContents.send('job:getAll', res);
    }
  })
})

ipcMain.on("job:create", (e, data) => {
  connection("create_job", JSON.stringify(data), (res, err) => {
    if(err) {
      dialog.showErrorBox("Error", err.toString())
    } else {
      mainWindow.webContents.send('job:create', res);
    }
  })
})


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})