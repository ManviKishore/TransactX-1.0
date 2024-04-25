var config = require("./dbConfig");
const sql = require("mssql");
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
//getPerson(12345);
