import express from "express";
import axios from "axios";
import redis from "redis";

const app = express();
const DEFAULT_EX = 1000;
const redisClient = redis.createClient();

// Connect to Redis once when the server starts
redisClient.connect().catch(console.error);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to weather api");
});

app.get("/weather/:city", async (req, res) => {
  const { city } = req.params;
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

  try {
    const cachedResult = await redisClient.get(city);
    if (cachedResult) {
      console.log("Cache hit");
      return res.json(JSON.parse(cachedResult));
    } else {
      console.log("Cache miss");
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: city,
              appid: WEATHER_API_KEY,
              units: "metric",
            },
          },
        );
        await redisClient.setEx(
          city,
          DEFAULT_EX,
          JSON.stringify(response.data),
        );
        res.json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
      }
    }
  } catch (error) {
    console.error("Redis error:", error);
    res.status(500).send("An error occurred");
  }
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
