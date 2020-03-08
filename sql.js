require("openssl")

const { Pool, Client } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

module.exports = {
    merchantAuth:  function(shop, accessToken) {
        pool.connect((err, client, release) => {
            if (err) {
              console.log(err)
              return console.error('Error acquiring client', err.stack)
            }
             client.query("insert into merchant_entries (shop_name, offline_token) values ($1, $2) ON CONFLICT (shop_name) DO UPDATE SET offline_token = $2", [shop, accessToken], (err, result) => {
              release()
              if (err) {
                return console.error('Error executing query', err.stack)
              }
              console.log(result.rows)
            })
          })
    },

    getOfflineToken:  function(shop, accessToken) {
        pool.connect((err, client, release) => {
            if (err) {
              console.log(err)
              return console.error('Error acquiring client', err.stack)
            }
             client.query("insert into merchant_entries (shop_name, offline_token) values ($1, $2) ON CONFLICT (shop_name) DO UPDATE SET offline_token = $2", [shop, accessToken], (err, result) => {
              release()
              if (err) {
                return console.error('Error executing query', err.stack)
              }
              console.log(result.rows)
            })
          })
    }
}