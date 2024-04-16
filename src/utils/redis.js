const { createClient } = require('redis');
const redis = createClient();

redis.on('connect', () => {
  console.log(`redis running on : localhost`)
})

redis.on('error', err => {
  console.log('Redis Client Error', err)
});

module.exports = {
  redis
}
