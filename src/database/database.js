const { Client } = require("pg");

async function query(queryString) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    client.connect();
    const result = await client.query(queryString);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

module.exports = {
  query: query
}
