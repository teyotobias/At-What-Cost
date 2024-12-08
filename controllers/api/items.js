const Item = require("../../models/item");
const redisClient = require("../../config/redis");
module.exports = {
  index,
  show,
};

async function index(req, res) {
  try {
    const cacheKey = "items";

    const cachedItems = await redisClient.get(cacheKey);
    if (cachedItems) {
      console.log("Cache hit for items!");
      return res.json(JSON.parse(cachedItems));
    }

    console.log("Cache miss for items!");

    const items = await Item.find({}).sort("name").populate("category").exec();
    // re-sort based upon the sortOrder of the populated categories
    items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);

    await redisClient.set(cacheKey, JSON.stringify(items), {
      EX: 3600,
    });

    // return items
    res.json(items);
  } catch (error) {
    console.error("Error fetching items", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function show(req, res) {
  const item = await Item.findById(req.params.id);
  res.json(item);
}
