var config = require("./dbConfig");
const sql = require("mssql");
async function getOrders() {
  try {
    console.log("trying to connect");
    let pool = await sql.connect(config);

    let products = await pool.request().query("SELECT * from Admin");
    console.log(products.recordsets);
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}
getOrders();
