var config = require("./dbConfig");
const sql = require("mssql");
<<<<<<< HEAD:transactx/now-ui-dashboard-react-main/src/database/connection.js
// const person = require("./pojo/person");
async function getPerson() {
  try {
    console.log("trying to connect");
    let pool = await sql.connect(config);

    let persons = await pool.request().query("SELECT * from Person");
    console.log(persons);
    return persons.recordsets;
  } catch (error) {
    console.log(error);
  }
}
getPerson();

=======
const person = require("./pojo/person");
// async function getPerson() {
//   try {
//     console.log("trying to connect");
//     let pool = await sql.connect(config);

//     let persons = await pool.request().query("SELECT * from Admin");
//     console.log(persons.recordsets);
//     return persons.recordsets;
//   } catch (error) {
//     console.log(error);
//   }
// }
>>>>>>> e0d66e0535496494f436a0d2664731a05a2be68d:transactx/Backend/connection.js
async function getPerson(ssn) {
  try {
    let pool = await sql.connect(config);
    let person = await pool
      .request()
      .input("input_parameter", sql.Int, ssn)
      .query("SELECT * from Person where SSN = @input_parameter");
    console.log(person);
    return person.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function addPerson(person) {
  try {
    let pool = await sql.connect(config);
    let insertPerson = await pool
      .request()
      .input("SSN", sql.Int, person.ssn)
      .input("Firstname", sql.NVarChar, person.Firstname)
      .input("Lastname", sql.Int, person.Lastname)
      .input("StreetAddress", sql.NVarChar, person.StreetAddress)
      .input("City", sql.NVarChar, person.City)
      .input("State", sql.NVarChar, person.State)
      .execute("InsertPerson");
    return insertPerson.recordsets;
  } catch (err) {
    console.log(err);
  }
}
<<<<<<< HEAD:transactx/now-ui-dashboard-react-main/src/database/connection.js
//getPerson(12345);
=======
//getPerson();
getPerson(12345);
>>>>>>> e0d66e0535496494f436a0d2664731a05a2be68d:transactx/Backend/connection.js
