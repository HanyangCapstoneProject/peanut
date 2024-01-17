const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "34.42.99.34",
  database: "postgres",
  password: "0000",
  port: 5432,
});
client.connect();

const query = {
  text: "SELECT * FROM alarm",
};
client
  .query(query)
  .then((res) => {
    console.log(res.rows[0]);
    client.end();
  })
  .catch((e) => console.error(e.stack));