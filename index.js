let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -8.095204, lng: -34.885819 },
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow();

  const predefinedIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 6,
    fillColor: '#0066FF',
    fillOpacity: 1,
    strokeColor: '#FFF',
    strokeWeight: 2
  }

  const symbolMarker = new google.maps.Marker({
    position: {lat: -8.095204, lng: -34.885819},
    map: map,
    icon: predefinedIcon
  })

  // Carrega o JSON com os dados dos locais
  fetch("./restaurantes.json")
    .then(response => response.json())
    .then(data => {
      // Para cada item no JSON, cria um marcador no mapa
      data.forEach(item => {
        const nome = item.nome;
        const lat = item.latitude;
        const lng = item.longitude;
        const endereco = item.endereco;
        const latLng = new google.maps.LatLng(lat, lng);

        const marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: nome,
          address: endereco,
        });

        // Adiciona um evento de clique para mostrar as informações do local
        marker.addListener("click", function () {
          infoWindow.setContent(
            "<h3>" + nome + "</h3><p>" + endereco + "</p>"
          );
          infoWindow.open(map, marker);
        });
      });
    })
    .catch(error => {
      console.error("Erro ao carregar os dados JSON:", error);
    });
}

initMap();
