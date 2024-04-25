const config = {
  user: "creditadmin", // sql user
  password: "abcd@456", //sql user password
  server: "creditapp.database.windows.net", // if it does not work try- localhost
  database: "credit",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "SQLEXPRESS01", // SQL Server instance name
  },
  port: 1433,
};

module.exports = config;
