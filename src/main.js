const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const electron = require("electron");
const fs = require("fs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: "src/fav.png",
    webPreferences: {
      spellcheck: false,
      preload: path.join(app.getAppPath(), "src", "preload.js"),
    },
  });

  win.webContents.openDevTools();

  win.loadURL(`file://${__dirname}/index.html`);
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const userDataPath = (electron.app || electron.remote.app).getPath("userData");
const userDataPathFile = path.join(userDataPath, "data.json");

ipcMain.handle("get-user-data", () => {
  console.log("GET USER DATA");
  const file = fs.readFileSync(userDataPathFile);
  return JSON.parse(file);
});

ipcMain.on("save-user-data", (event, value) => {
  console.log("SAVE USER DATA");
  console.log(value);
  fs.writeFileSync(userDataPathFile, JSON.stringify(value));
});
