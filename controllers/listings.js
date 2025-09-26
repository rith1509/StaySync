const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.searchListings = async (req, res) => {
  const { q } = req.query;
  const allListings = await Listing.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } }
    ]
  });

  if (allListings.length === 0) {
    req.flash("error", `No listings found for "${q}".`);
    return res.redirect("/listings");
  }

  res.render("listings/index.ejs", { allListings });
};

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "The listing you requested does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient.forwardGeocode({
    query: `${req.body.listing.location}, ${req.body.listing.country}`,
    limit: 1
  }).send();

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url: req.file.path, filename: req.file.filename };
  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "The listing you requested does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    listing.image = { url: req.file.path, filename: req.file.filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

module.exports.filterByCategory = async (req, res) => {
  let { category } = req.params;
  const allListings = await Listing.find({ category: { $in: [category] } });

  if (allListings.length === 0) {
    req.flash("error", `No listings found for the "${category}" category.`);
    return res.redirect("/listings");
  }

  res.render("listings/index.ejs", { allListings });
};