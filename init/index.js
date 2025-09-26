const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

// Step 1: Configure dotenv to find the .env file
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const mapToken = process.env.MAP_TOKEN;
const dbUrl = process.env.ATLASDB_URL; // Use dbUrl for clarity
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

console.log("--- Seeding Script Started ---");

async function main() {
  console.log("Connecting to database...");
  console.log("Database URL:", dbUrl); // This will show if the URL is loaded correctly
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("✅ Database connection successful.");
    initDB();
  })
  .catch((err) => {
    console.error("❌ DATABASE CONNECTION FAILED:", err);
  });

const initDB = async () => {
  try {
    console.log("Step 1: Clearing existing listings...");
    await Listing.deleteMany({});
    console.log("Step 1 Complete: Listings cleared.");

    console.log("Step 2: Adding owner ID to sample data...");
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "68d64c71f12e3b51e24816d7" // Replace with a valid owner ID from your User collection
    }));
    console.log("Step 2 Complete: Owner ID added.");

    console.log("Step 3: Geocoding locations for each listing...");
    for (let listing of initData.data) {
        let response = await geocodingClient.forwardGeocode({
            query: `${listing.location}, ${listing.country}`,
            limit: 1
        }).send();
        listing.geometry = response.body.features[0].geometry;
    }
    console.log("Step 3 Complete: All locations geocoded.");

    console.log("Step 4: Inserting new data into the database...");
    await Listing.insertMany(initData.data);
    console.log("✅ Step 4 Complete: Data was initialized successfully!");

  } catch (err) {
    console.error("❌ An error occurred during the seeding process:", err);
  } finally {
    console.log("--- Seeding Script Finished ---");
    mongoose.connection.close();
  }
};