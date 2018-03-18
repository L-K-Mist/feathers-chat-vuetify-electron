import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'
//import ipc from 'ipc'
// const {
//   ipcMain
// } = require('electron');
var CSV = require("comma-separated-values")
var SerialPort = require("serialport-builds-electron");
// const myPort = {}
// var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
// var parser = new Readline(); // make a new parser to read ASCII lines
var myPort = {}

function initializePort(portname) {
  var handshakeComplete = false

  // if (handshakeComplete == true) {
  //   setInterval(function () {
  //     //console.log("5 second interval");
  //     myPort.write("T")
  //   }, 3000);
  //   console.log("interval for Tpinging set")
  // }

  myPort = new SerialPort(portname, {
    parser: SerialPort.parsers.readline('\n')
  });
  myPort.on('open', () => {
    console.log("Port is open")
  })
  myPort.on('data', (data) => {
    // console.log("got data ", data)
    if (data[0] == 'A') {
      myPort.write("A\n")
      console.log('data0', data[0], 'data1', data[1])
      handshakeComplete = true
      mainWindow.webContents.send('handshakeComplete', true)
      console.log("Handshake Complete, Protocol begun ")
    } else if (handshakeComplete == true) {
      if (data[0] == "T") {

        var stringToCSV = CSV.parse(data, {
          cast: ['String', 'Number', 'Number', 'Number', 'Number', 'Number']
        });
        stringToCSV[0].shift();
        let tempsFromArduino = stringToCSV[0]
        mainWindow.webContents.send("tempsArrayReady", tempsFromArduino)
      }
    }
  });
}

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9081` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width: 1000,
    height: 700,
    darkTheme: true,
    //fullscreen: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


ipcMain.on('got-port-name', (event, arg) => {
  initializePort(arg)
  event.sender.send('got-port-confirmed', myPort)
})

ipcMain.on('give-me-temps', (event) => {
  myPort.write("T")
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */