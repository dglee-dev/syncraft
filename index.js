const { app, BrowserWindow } = require("electron");

console.log("Hello, Syncraft!");

const createWindow = () => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  browserWindow.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});
