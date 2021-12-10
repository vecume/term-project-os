const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const connection = require('./connection')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preloader.js')
    }
  })

  win.loadFile('index.html')
}

ipcMain.on("get:jobs", () => {
  console.log("getting jobs")
})

ipcMain.on("job:create", (e, data) => {
  connection("create_job", JSON.stringify(data))
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