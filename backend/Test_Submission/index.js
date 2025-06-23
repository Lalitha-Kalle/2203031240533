const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const app = express();

const port = 3030

app.use(bodyParser.json());

const shortLinks = {}; // In-memory store


app.post("/shorturls", (req, res) => {
    const { url, validity = 30, shortcode } = req.body;

    let code = shortcode;

    // Check for existing code
    if (shortLinks[code] && shortcode) {
        return res.status(409).json({ error: "Shortcode already in use" });
    }

    // Calculate expiry time in ISO 8601 format
    const expiryDate = new Date(Date.now() + validity * 60000).toISOString();

    // Store mapping
    shortLinks[code] = { url, expiry: expiryDate };

    // Response
    res.status(201).json({
        shortLink: `https://hostname:port/${code}`,
        expiry: expiryDate
    });
});



app.listen(port, () => {
    console.log(`URL shortener service running at http://localhost:${port}`);
});

