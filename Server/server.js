const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server working fine");
});

// Endpoint to store historical requests
app.post("/api/store-request", async (req, res) => {
  const { method, url, responseData } = req.body;

  try {
    const request = await prisma.request.create({
      data: {
        method,
        url,
        responseData,
      },
    });

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to retrieve historical requests
app.get("/api/get-requests", async (_, res) => {
  try {
    const requests = await prisma.request.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/delete-requests", async (_, res) => {
  try {
    await prisma.request.deleteMany();
    res.json({ message: "All requests deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
