const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "34.42.99.34",
  database: "postgres",
  password: "0000",
  port: 5432,
});
client.connect();
client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});