const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

// const getAddrInfo = () => {
//   var networkInterfaces = os.networkInterfaces();
//   return Object.entries(networkInterfaces)
//     .map((el) => el[1])
//     .flat()
//     .filter((el) => el.family === "IPv4")
//     .find((el) => {
//       return el.address !== "127.0.0.1" && el.address !== "localhost";
//     });
// };

// const getMyLocalAdd = () => {
//   return getAddrInfo().cidr;
// };

// const getBroadcastAddr = () => {
//   const addr_info = getAddrInfo();
//   var addr_splitted = addr_info.address.split(".");
//   var netmask_splitted = addr_info.netmask.split(".");
//   return addr_splitted
//     .map((e, i) => (~netmask_splitted[i] & 0xff) | e)
//     .join(".");
// };

contextBridge.exposeInMainWorld("electron", {
  //doThing: () => ipcRenderer.send("do-a-thing"),
  //   userInfo: { username: process.env.USERNAME, domain: process.env.USERDOMAIN },
  getUserData: () => ipcRenderer.invoke("get-user-data"),
  saveUserData: (data) => ipcRenderer.send("save-user-data", data),
});
