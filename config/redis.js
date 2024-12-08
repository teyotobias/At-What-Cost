const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

client.on("error", (err) => console.error("Redis Client Error: ", err));

(async () => {
  try {
    await client.connect();
    console.log("Connected to Redis!");
  } catch (error) {
    console.error("Error connecting to Redis: ", error);
  }
})();

module.exports = client;
