// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
// The below code has been copied from: https://developers.google.com/maps/documentation/javascript/examples/place-search?hl=en_GB#maps_place_search-javascript
// It has been modified for the purpose of this site.

let map;
let service;
let infowindow;

function createMap(clubLocation, club) {

    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("club-location-map"), {
        zoom: 15,
    });

    let request = {
        query: clubLocation,
        fields: ["name", "geometry"],
    };

    service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            createMarker(results[0], club);
            map.setCenter(results[0].geometry.location);
        };
    });
}

function createMarker(place, clubResults) {
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });
    google.maps.event.addListener(marker, "click", function() {
        infowindow.setContent(`
            <img src="${clubResults.logo}" class="small-img" aria-label="Club badge.">
        `);
        infowindow.open(map, marker);
    });
};