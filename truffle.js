module.exports = {
  networks:{
    development : {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gas: 0x3D0900 //gas amount very important: 4 000 000 (4E6)
    }
  }
};
