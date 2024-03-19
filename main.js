 const { app, BrowserWindow } = require('electron')

 app.on('ready', () => {
 // 4. create a new window
 let window = new BrowserWindow({
 width: 500,
 height: 800,
 webPreferences: {
 nodeIntegration: true
 }
 });
 // 5. load window content
 window.loadFile('frontend/index.html');
 });