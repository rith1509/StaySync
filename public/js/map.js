mapboxgl.accessToken = mapToken; // mapToken is from show.ejs
// 'listing' is the full object passed from show.ejs

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: listing.geometry.coordinates, // Use the listing's coordinates
    zoom: 9, // starting zoom
});

// Add a marker to the map using the listing's coordinates
const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${listing.location}</h4><p>Exact Location provided after booking.</p>`))
    .addTo(map);