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

  if (handshakeComplete == true) {
    setInterval(function () {
      //console.log("5 second interval");
      myPort.write("T")
    }, 3000);
    console.log("interval for Tpinging set")
  }

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
      console.log("Handshake Complete, Protocol begun ")
    } else if (handshakeComplete == true) {
      //myPort.write("T") // writing T here once to set off the chain
      // console.log(data);
      // Set Interval to Ping the Arduino for Temps
      if (data[0] == "T") {
        console.log('got an array of Temps :)')
        //assignTemps(data)
        var tempsFromArduino = CSV.parse(data, {
          cast: ['String', 'Number', 'Number', 'Number', 'Number', 'Number']
        });
        tempsFromArduino.shift();
        console.log(tempsFromArduino[0])

      }

    }
  });
}




// for (var i of arrayName) {
//   arrayName[i] = parseInt(arrayName[i], 10)
// }



// Next put readline parser in

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
    height: 563,
    useContentSize: true,
    width: 1000
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

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('got-port-name', (event, arg) => {
  initializePort(arg)
  event.sender.send('got-port-confirmed', myPort)
})

ipcMain.on('give-me-temps', (event, arg) => {

})




//ipc.on('close-main-window', function () {
//   app.quit();
// })
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