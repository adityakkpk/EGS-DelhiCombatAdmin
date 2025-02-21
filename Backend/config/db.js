const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  connectionLimit: 10,
  host: "89.187.162.81",
  user: "alpinetopschool_delhicombatdb",
  password: "delhicombat@db",
  database: "alpinetopschool_delhicombatdb",
});

module.exports = pool;
