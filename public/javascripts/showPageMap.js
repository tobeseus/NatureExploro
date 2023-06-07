mapboxgl.accessToken = mapBoxToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: park.geometry.coordinates,
    zoom: 9
});

map.addControl(new mapboxgl.NavigationControl());

const marker = new mapboxgl.Marker({ color: 'Green' })
    .setLngLat(park.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 35 })
            .setHTML(
                `<h4>${park.title}</h4><p>${park.location}</p>`
            )
    )
    .addTo(map);