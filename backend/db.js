const sql = require("mssql/msnodesqlv8");
require("dotenv").config();

const dbConfig = {
  connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;TrustServerCertificate=Yes;`
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("MSSQL ühendus toimib");
    return pool;
  })
  .catch((err) => {
    console.error("MSSQL ühenduse viga:", err);
  });

module.exports = {
  sql,
  poolPromise
};