// ===== ITALIAN UNIVERSITIES MAP - FINAL VERSION =====

// Configuration
const CONFIG = {
  map: {
    bounds: { north: 47.5, south: 35.5, west: 6.6, east: 18.8 },
    center: [41.8719, 12.5674], // Rome
    zoom: 6,
    minZoom: 5,
    maxZoom: 16,
    regionStyle: {
      color: '#2D3748', // Dark charcoal borders
      weight: 1.5,
      opacity: 0.9,
      fillOpacity: 0.15,
      fillColor: '#008C45'
    }
  }
};

// Complete Italian Universities Data (Your original list)
const universities = [
  // Abruzzo
  { id: "aquila", name: "Università degli Studi dell'Aquila", city: "L'Aquila", region: "Abruzzo", type: "university", founded: 1952, website: "https://www.univaq.it", lat: 42.3499, lng: 13.3995, description: "A public research university located in L'Aquila, offering programs in sciences, engineering, medicine, and humanities." },
  { id: "teramo", name: "Università degli Studi di Teramo", city: "Teramo", region: "Abruzzo", type: "university", founded: 1993, website: "https://www.unite.it", lat: 42.6589, lng: 13.7044, description: "A modern university focusing on agricultural, veterinary, and legal sciences in the Abruzzo region." },
  
  // Apulia
  { id: "bari", name: "Università degli Studi di Bari Aldo Moro", city: "Bari", region: "Apulia", type: "university", founded: 1925, website: "https://www.uniba.it", lat: 41.1171, lng: 16.8719, description: "One of the most important universities in Southern Italy, named after former Prime Minister Aldo Moro." },
  { id: "poliba", name: "Politecnico di Bari", city: "Bari", region: "Apulia", type: "polytechnic", founded: 1990, website: "https://www.poliba.it", lat: 41.1075, lng: 16.8782, description: "The technical university of Apulia, specializing in engineering and architecture." },
  { id: "foggia", name: "Università degli Studi di Foggia", city: "Foggia", region: "Apulia", type: "university", founded: 1991, website: "https://www.unifg.it", lat: 41.4612, lng: 15.5448, description: "A young university in the northern part of Apulia, with strong programs in agriculture and medicine." },
  { id: "salento", name: "Università del Salento", city: "Lecce", region: "Apulia", type: "university", founded: 1955, website: "https://www.unisalento.it", lat: 40.3541, lng: 18.1698, description: "Located in the heel of Italy's boot, known for its programs in humanities, sciences, and engineering." },
  
  // Basilicata
  { id: "basilicata", name: "Università degli Studi della Basilicata", city: "Potenza/Matera", region: "Basilicata", type: "university", founded: 1982, website: "https://www.unibas.it", lat: 40.6401, lng: 15.8027, description: "The main university of Basilicata, with campuses in Potenza and the UNESCO World Heritage city of Matera." },
  
  // Calabria
  { id: "calabria", name: "Università della Calabria", city: "Arcavacata di Rende", region: "Calabria", type: "university", founded: 1972, website: "https://www.unical.it", lat: 39.3633, lng: 16.2284, description: "A campus university near Cosenza, known for its modern architecture and comprehensive academic offerings." },
  { id: "reggiocalabria", name: "Università Mediterranea di Reggio Calabria", city: "Reggio Calabria", region: "Calabria", type: "university", founded: 1997, website: "https://www.unirc.it", lat: 38.1118, lng: 15.6470, description: "Focuses on Mediterranean studies, with strong programs in architecture, engineering, and agriculture." },
  { id: "catanzaro", name: "Università degli Studi di Catanzaro 'Magna Græcia'", city: "Catanzaro", region: "Calabria", type: "university", founded: 1998, website: "https://www.unicz.it", lat: 38.9026, lng: 16.5871, description: "A medical-focused university named after the ancient Greek colonization of Southern Italy." },
  
  // Campania
  { id: "unina", name: "Università degli Studi di Napoli Federico II", city: "Naples", region: "Campania", type: "university", founded: 1224, website: "https://www.unina.it", lat: 40.8485, lng: 14.2621, description: "One of the oldest universities in the world and the oldest public non-sectarian university." },
  { id: "lorientale", name: "Università degli Studi di Napoli 'L'Orientale'", city: "Naples", region: "Campania", type: "university", founded: 1732, website: "https://www.unior.it", lat: 40.8459, lng: 14.2507, description: "The oldest school of Sinology and Oriental Studies in Europe, now a comprehensive university." },
  { id: "parthenope", name: "Università degli Studi di Napoli 'Parthenope'", city: "Naples", region: "Campania", type: "university", founded: 1920, website: "https://www.uniparthenope.it", lat: 40.8389, lng: 14.2525, description: "Named after the ancient Greek name for Naples, specializing in economics, engineering, and sports sciences." },
  { id: "salerno", name: "Università degli Studi di Salerno", city: "Salerno", region: "Campania", type: "university", founded: 1968, website: "https://www.unisa.it", lat: 40.6773, lng: 14.7775, description: "A modern campus university with strong research programs in sciences, engineering, and humanities." },
  { id: "vanvitelli", name: "Università degli Studi della Campania 'Luigi Vanvitelli'", city: "Naples/Caserta", region: "Campania", type: "university", founded: 1991, website: "https://www.unicampania.it", lat: 41.0836, lng: 14.3308, description: "Named after the famous architect, with campuses in Naples and Caserta, focusing on multidisciplinary studies." },
  { id: "suororsola", name: "Università degli Studi di Napoli 'Suor Orsola Benincasa'", city: "Naples", region: "Campania", type: "special", founded: 1895, website: "https://www.unisob.na.it", lat: 40.8463, lng: 14.2432, description: "A unique university with roots in a 16th-century monastery, now offering humanities and education programs." },
  
  // Emilia-Romagna
  { id: "unibo", name: "Università di Bologna", city: "Bologna", region: "Emilia-Romagna", type: "university", founded: 1088, website: "https://www.unibo.it", lat: 44.4961, lng: 11.3532, description: "The oldest university in continuous operation in the world, and one of the most prestigious academic institutions in Italy." },
  { id: "ferrara", name: "Università degli Studi di Ferrara", city: "Ferrara", region: "Emilia-Romagna", type: "university", founded: 1391, website: "https://www.unife.it", lat: 44.8378, lng: 11.6198, description: "Founded by the Este family, known for its research in sciences, engineering, and medicine." },
  { id: "unimore", name: "Università degli Studi di Modena e Reggio Emilia", city: "Modena/Reggio Emilia", region: "Emilia-Romagna", type: "university", founded: 1175, website: "https://www.unimore.it", lat: 44.6471, lng: 10.9256, description: "One of the oldest universities in Italy, with strong programs in engineering, economics, and life sciences." },
  { id: "parma", name: "Università degli Studi di Parma", city: "Parma", region: "Emilia-Romagna", type: "university", founded: 962, website: "https://www.unipr.it", lat: 44.8012, lng: 10.3284, description: "Traces its origins to a cathedral school, now a comprehensive university with international recognition." },
  
  // Friuli-Venezia Giulia
  { id: "trieste", name: "Università degli Studi di Trieste", city: "Trieste", region: "Friuli-Venezia Giulia", type: "university", founded: 1924, website: "https://www.units.it", lat: 45.6536, lng: 13.7784, description: "Located at the crossroads of Latin, Slavic, and Germanic cultures, with strong international focus." },
  { id: "udine", name: "Università degli Studi di Udine", city: "Udine", region: "Friuli-Venezia Giulia", type: "university", founded: 1978, website: "https://www.uniud.it", lat: 46.0648, lng: 13.2344, description: "Founded after the 1976 earthquake to contribute to the cultural and economic development of Friuli." },
  
  // Lazio
  { id: "sapienza", name: "Università degli Studi di Roma 'La Sapienza'", city: "Rome", region: "Lazio", type: "university", founded: 1303, website: "https://www.uniroma1.it", lat: 41.9028, lng: 12.5140, description: "The largest university in Europe by enrollment, and one of the oldest and most prestigious in the world." },
  { id: "torvergata", name: "Università degli Studi di Roma 'Tor Vergata'", city: "Rome", region: "Lazio", type: "university", founded: 1982, website: "https://www.uniroma2.it", lat: 41.8490, lng: 12.6222, description: "A modern campus university in Rome, known for its research in sciences, engineering, and economics." },
  { id: "romatre", name: "Università degli Studi di Roma 'Roma Tre'", city: "Rome", region: "Lazio", type: "university", founded: 1992, website: "https://www.uniroma3.it", lat: 41.8573, lng: 12.4694, description: "The youngest of Rome's state universities, focusing on innovation and interdisciplinary studies." },
  { id: "cassino", name: "Università degli Studi di Cassino e del Lazio Meridionale", city: "Cassino", region: "Lazio", type: "university", founded: 1979, website: "https://www.unicas.it", lat: 41.4865, lng: 13.8315, description: "Serving southern Lazio, known for its engineering, economics, and humanities programs." },
  { id: "tuscia", name: "Università degli Studi della Tuscia", city: "Viterbo", region: "Lazio", type: "university", founded: 1979, website: "https://www.unitus.it", lat: 42.4287, lng: 12.1048, description: "Located in historical Viterbo, specializing in agricultural, environmental, and cultural heritage studies." },
  
  // Liguria
  { id: "genova", name: "Università degli Studi di Genova", city: "Genoa", region: "Liguria", type: "university", founded: 1481, website: "https://www.unige.it", lat: 44.4056, lng: 8.9463, description: "One of the largest universities in Italy, with historical ties to maritime studies and navigation." },
  
  // Lombardy
  { id: "unimi", name: "Università degli Studi di Milano", city: "Milan", region: "Lombardy", type: "university", founded: 1924, website: "https://www.unimi.it", lat: 45.4605, lng: 9.1909, description: "The largest university in Lombardy, known for its research in sciences, humanities, and medicine." },
  { id: "unimib", name: "Università degli Studi di Milano-Bicocca", city: "Milan", region: "Lombardy", type: "university", founded: 1998, website: "https://www.unimib.it", lat: 45.5167, lng: 9.2106, description: "A modern university created on a redeveloped industrial area, focusing on interdisciplinary research." },
  { id: "unipv", name: "Università degli Studi di Pavia", city: "Pavia", region: "Lombardy", type: "university", founded: 1361, website: "https://www.unipv.it", lat: 45.1865, lng: 9.1560, description: "One of the oldest universities in the world, with a rich history and strong scientific tradition." },
  { id: "unibg", name: "Università degli Studi di Bergamo", city: "Bergamo", region: "Lombardy", type: "university", founded: 1968, website: "https://www.unibg.it", lat: 45.6940, lng: 9.6699, description: "Known for its economics, engineering, and foreign language programs in the Lombardy region." },
  { id: "unibs", name: "Università degli Studi di Brescia", city: "Brescia", region: "Lombardy", type: "university", founded: 1982, website: "https://www.unibs.it", lat: 45.5391, lng: 10.2205, description: "A young university with strong programs in engineering, economics, and medicine." },
  { id: "uninsubria", name: "Università degli Studi dell'Insubria", city: "Como/Varese", region: "Lombardy", type: "university", founded: 1998, website: "https://www.uninsubria.it", lat: 45.8121, lng: 8.8284, description: "Named after the ancient Roman region, with campuses in Como and Varese near the Swiss border." },
  
  // Marche
  { id: "urbino", name: "Università di Urbino 'Carlo Bo'", city: "Urbino", region: "Marche", type: "university", founded: 1506, website: "https://www.uniurb.it", lat: 43.7255, lng: 12.6373, description: "Located in a Renaissance jewel city, known for its humanities, law, and economics programs." },
  { id: "macerata", name: "Università degli Studi di Macerata", city: "Macerata", region: "Marche", type: "university", founded: 1290, website: "https://www.unimc.it", lat: 43.3006, lng: 13.4525, description: "One of the oldest universities in Italy, specializing in humanities, law, and political sciences." },
  { id: "camerino", name: "Università degli Studi di Camerino", city: "Camerino", region: "Marche", type: "university", founded: 1336, website: "https://www.unicam.it", lat: 43.1355, lng: 13.0686, description: "A small university with a long tradition, strong in sciences, pharmacy, and veterinary medicine." },
  { id: "univpm", name: "Università Politecnica delle Marche", city: "Ancona", region: "Marche", type: "polytechnic", founded: 1959, website: "https://www.univpm.it", lat: 43.6158, lng: 13.5189, description: "The technical university of Marche, focusing on engineering, architecture, and agricultural sciences." },
  
  // Molise
  { id: "molise", name: "Università degli Studi del Molise", city: "Campobasso", region: "Molise", type: "university", founded: 1982, website: "https://www.unimol.it", lat: 41.5604, lng: 14.6634, description: "The main university of the Molise region, contributing to the cultural and economic development of the area." },
  
  // Piedmont
  { id: "unito", name: "Università degli Studi di Torino", city: "Turin", region: "Piedmont", type: "university", founded: 1404, website: "https://www.unito.it", lat: 45.0703, lng: 7.6869, description: "One of Italy's most ancient and prestigious universities, with comprehensive academic offerings." },
  { id: "polito", name: "Politecnico di Torino", city: "Turin", region: "Piedmont", type: "polytechnic", founded: 1859, website: "https://www.polito.it", lat: 45.0636, lng: 7.6612, description: "One of the oldest and most prestigious technical universities in Italy, internationally recognized." },
  { id: "upo", name: "Università del Piemonte Orientale 'Amedeo Avogadro'", city: "Alessandria/Novara/Vercelli", region: "Piedmont", type: "university", founded: 1998, website: "https://www.uniupo.it", lat: 45.0186, lng: 8.5326, description: "A multi-campus university in eastern Piedmont, named after the famous scientist Amedeo Avogadro." },
  
  // Sardinia
  { id: "cagliari", name: "Università degli Studi di Cagliari", city: "Cagliari", region: "Sardinia", type: "university", founded: 1606, website: "https://www.unica.it", lat: 39.2238, lng: 9.1217, description: "The main university of Sardinia, with a rich history and strong research programs." },
  { id: "sassari", name: "Università degli Studi di Sassari", city: "Sassari", region: "Sardinia", type: "university", founded: 1562, website: "https://www.uniss.it", lat: 40.7267, lng: 8.5593, description: "One of the oldest universities in Italy, particularly strong in agricultural and veterinary sciences." },
  
  // Sicily
  { id: "unipa", name: "Università degli Studi di Palermo", city: "Palermo", region: "Sicily", type: "university", founded: 1806, website: "https://www.unipa.it", lat: 38.1157, lng: 13.3615, description: "The main university of Sicily, with roots dating back to the 15th century, offering comprehensive programs." },
  { id: "unict", name: "Università degli Studi di Catania", city: "Catania", region: "Sicily", type: "university", founded: 1434, website: "https://www.unict.it", lat: 37.5025, lng: 15.0873, description: "The oldest university in Sicily, located at the foot of Mount Etna, with strong scientific tradition." },
  { id: "unime", name: "Università degli Studi di Messina", city: "Messina", region: "Sicily", type: "university", founded: 1548, website: "https://www.unime.it", lat: 38.1937, lng: 15.5542, description: "Founded by Pope Paul III, playing a key role in the cultural life of northeastern Sicily." },
  { id: "kore", name: "Università degli Studi di Enna 'Kore'", city: "Enna", region: "Sicily", type: "university", founded: 2005, website: "https://www.unikore.it", lat: 37.5679, lng: 14.2794, description: "The first free university in Sicily, named after the ancient Greek name for the goddess Persephone." },
  
  // Tuscany
  { id: "unifi", name: "Università degli Studi di Firenze", city: "Florence", region: "Tuscany", type: "university", founded: 1321, website: "https://www.unifi.it", lat: 43.7793, lng: 11.2463, description: "One of Italy's most important public research universities, located in the heart of the Renaissance." },
  { id: "unipi", name: "Università di Pisa", city: "Pisa", region: "Tuscany", type: "university", founded: 1343, website: "https://www.unipi.it", lat: 43.7167, lng: 10.4000, description: "One of the oldest universities in Italy, internationally renowned for its leaning tower and scientific research." },
  { id: "unisi", name: "Università degli Studi di Siena", city: "Siena", region: "Tuscany", type: "university", founded: 1240, website: "https://www.unisi.it", lat: 43.3186, lng: 11.3308, description: "One of the oldest universities in Italy, located in the medieval city famous for its Palio horse race." },
  { id: "unisistraf", name: "Università per Stranieri di Siena", city: "Siena", region: "Tuscany", type: "special", founded: 1982, website: "https://www.unistrasi.it", lat: 43.3211, lng: 11.3286, description: "Specializes in teaching Italian language and culture to international students." },
  { id: "sns", name: "Scuola Normale Superiore di Pisa", city: "Pisa", region: "Tuscany", type: "special", founded: 1810, website: "https://www.sns.it", lat: 43.7191, lng: 10.4012, description: "One of Italy's most prestigious and selective universities, modeled after the École Normale Supérieure." },
  { id: "santanna", name: "Scuola Superiore Sant'Anna di Pisa", city: "Pisa", region: "Tuscany", type: "special", founded: 1987, website: "https://www.santannapisa.it", lat: 43.7189, lng: 10.4033, description: "A special statute university focusing on applied sciences, social sciences, and experimental medicine." },
  
  // Trentino-Alto Adige
  { id: "unitn", name: "Università degli Studi di Trento", city: "Trento", region: "Trentino-Alto Adige", type: "university", founded: 1962, website: "https://www.unitn.it", lat: 46.0667, lng: 11.1191, description: "A research-intensive university in the Alps, known for its international outlook and interdisciplinary approach." },
  { id: "unibz", name: "Libera Università di Bolzano", city: "Bolzano", region: "Trentino-Alto Adige", type: "university", founded: 1997, website: "https://www.unibz.it", lat: 46.4983, lng: 11.3545, description: "A trilingual university (Italian, German, English) in the heart of the Dolomites, focusing on innovation." },
  
  // Umbria
  { id: "unipg", name: "Università degli Studi di Perugia", city: "Perugia", region: "Umbria", type: "university", founded: 1308, website: "https://www.unipg.it", lat: 43.1122, lng: 12.3888, description: "One of the oldest universities in Italy, located in the historic hill town of Perugia." },
  { id: "unistrapp", name: "Università per Stranieri di Perugia", city: "Perugia", region: "Umbria", type: "special", founded: 1925, website: "https://www.unistrapg.it", lat: 43.1107, lng: 12.3906, description: "Dedicated to Italian language and culture studies for international students." },
  
  // Aosta Valley
  { id: "aosta", name: "Università della Valle d'Aosta", city: "Aosta", region: "Aosta Valley", type: "university", founded: 2000, website: "https://www.univda.it", lat: 45.7376, lng: 7.3172, description: "The youngest Italian university, serving the bilingual French-Italian region in the Alps." },
  
  // Veneto
  { id: "unipd", name: "Università degli Studi di Padova", city: "Padua", region: "Veneto", type: "university", founded: 1222, website: "https://www.unipd.it", lat: 45.4064, lng: 11.8768, description: "One of the oldest universities in the world, where Galileo Galilei was a lecturer, with a strong research tradition." },
  { id: "unive", name: "Università Ca' Foscari Venezia", city: "Venice", region: "Veneto", type: "university", founded: 1868, website: "https://www.unive.it", lat: 45.4333, lng: 12.3267, description: "Located in the historic palaces of Venice, specializing in economics, languages, and humanities." },
  { id: "univr", name: "Università degli Studi di Verona", city: "Verona", region: "Veneto", type: "university", founded: 1959, website: "https://www.univr.it", lat: 45.4386, lng: 10.9928, description: "A young university in the city of Romeo and Juliet, with strong programs in medicine, humanities, and sciences." },
  { id: "iuav", name: "Università Iuav di Venezia", city: "Venice", region: "Veneto", type: "special", founded: 1926, website: "https://www.iuav.it", lat: 45.4318, lng: 12.3253, description: "One of Italy's most prestigious schools of architecture, urban planning, and design." }
];

// ===== GLOBAL VARIABLES =====
let map, markersCluster, currentRegion = null, sidebarOpen = false;
let currentUniversities = [...universities];

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function hideLoadingScreen() {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.classList.add('fade-out');
    setTimeout(() => {
      loading.style.display = 'none';
    }, 300);
  }
}

function getRegionDisplayName(region) {
  const regionMap = {
    'Abruzzo': 'Abruzzo',
    'Apulia': 'Apulia', 
    'Basilicata': 'Basilicata',
    'Calabria': 'Calabria',
    'Campania': 'Campania',
    'Emilia-Romagna': 'Emilia-Romagna',
    'Friuli-Venezia Giulia': 'Friuli-Venezia Giulia',
    'Lazio': 'Lazio',
    'Liguria': 'Liguria',
    'Lombardy': 'Lombardy',
    'Marche': 'Marche',
    'Molise': 'Molise',
    'Piedmont': 'Piedmont',
    'Sardinia': 'Sardinia',
    'Sicily': 'Sicily',
    'Trentino-Alto Adige': 'Trentino-Alto Adige',
    'Tuscany': 'Tuscany',
    'Umbria': 'Umbria',
    'Aosta Valley': 'Aosta Valley',
    'Veneto': 'Veneto'
  };
  return regionMap[region] || region;
}

function sortByRegion(universities) {
  const regionOrder = [
    'Aosta Valley', 'Piedmont', 'Lombardy', 'Trentino-Alto Adige',
    'Veneto', 'Friuli-Venezia Giulia', 'Liguria', 'Emilia-Romagna',
    'Tuscany', 'Umbria', 'Marche', 'Lazio', 'Abruzzo', 'Molise',
    'Campania', 'Apulia', 'Basilicata', 'Calabria', 'Sicily', 'Sardinia'
  ];
  
  return universities.sort((a, b) => {
    const regionA = getRegionDisplayName(a.region);
    const regionB = getRegionDisplayName(b.region);
    return regionOrder.indexOf(regionA) - regionOrder.indexOf(regionB);
  });
}

function groupByRegion(universities) {
  const grouped = {};
  universities.forEach(uni => {
    const region = getRegionDisplayName(uni.region);
    if (!grouped[region]) grouped[region] = [];
    grouped[region].push(uni);
  });
  return grouped;
}

// ===== MAP FUNCTIONS =====
function initMap() {
  // Create map with Italy bounds restriction
  map = L.map('map', {
    center: CONFIG.map.center,
    zoom: CONFIG.map.zoom,
    minZoom: CONFIG.map.minZoom,
    maxZoom: CONFIG.map.maxZoom,
    maxBounds: [
      [CONFIG.map.bounds.south, CONFIG.map.bounds.west],
      [CONFIG.map.bounds.north, CONFIG.map.bounds.east]
    ],
    maxBoundsViscosity: 1.0,
    zoomControl: false
  });

  // Add zoom control with Italian theme
  L.control.zoom({
    position: 'topright'
  }).addTo(map);

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  // Load regions with dark charcoal borders
  fetch('geojson/italy-regions.geojson')
    .then(res => res.json())
    .then(geojson => {
      L.geoJSON(geojson, {
        style: CONFIG.map.regionStyle,
        onEachFeature: (feature, layer) => {
          const regionName = feature.properties.reg_name || feature.properties.NAME_1;
          layer.bindPopup(`
            <div style="padding: 10px; font-family: 'Inter', sans-serif; min-width: 180px;">
              <h3 style="margin: 0 0 10px 0; color: #008C45; font-size: 16px; font-weight: 600;">${regionName}</h3>
              <p style="margin: 0; color: #666; font-size: 14px;">Click to view universities in this region</p>
            </div>
          `);
          
          layer.on('click', () => {
            currentRegion = regionName;
            const filtered = universities.filter(u => u.region === regionName);
            currentUniversities = filtered;
            renderList(filtered);
            renderMarkers(filtered);
            document.getElementById('sidebar-title').textContent = `${regionName} Universities`;
            openSidebar();
          });
        }
      }).addTo(map);
    })
    .catch(err => {
      console.log('Regions GeoJSON not loaded, continuing without region highlighting');
    });

  // Initialize marker cluster
  markersCluster = L.markerClusterGroup({
    maxClusterRadius: 80,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true
  });
  map.addLayer(markersCluster);

  // Add drag restriction to keep map in Italy
  map.on('drag', () => {
    map.panInsideBounds([
      [CONFIG.map.bounds.south, CONFIG.map.bounds.west],
      [CONFIG.map.bounds.north, CONFIG.map.bounds.east]
    ], { animate: false });
  });

  // Add initial markers
  renderMarkers(currentUniversities);
  
  // Fit bounds to Italy
  setTimeout(() => {
    map.fitBounds([
      [CONFIG.map.bounds.south, CONFIG.map.bounds.west],
      [CONFIG.map.bounds.north, CONFIG.map.bounds.east]
    ]);
  }, 500);
}

function renderMarkers(data) {
  markersCluster.clearLayers();
  
  // Custom red pin icon
  const redPinIcon = L.icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEM3LjE2MyAwIDAgNy4xNjMgMCAxNkMwIDI0IDE2IDQ4IDE2IDQ4QzE2IDQ4IDMyIDI0IDMyIDE2QzMyIDcuMTYzIDI0LjgzNyAwIDE2IDBaIiBmaWxsPSIjRTAzMDI1Ii8+PHBhdGggZD0iTTE2IDIyQzIwLjQxODMgMjIgMjQgMTguNDE4MyAyNCAxNEMyNCA5LjU4MTcyIDIwLjQxODMgNiAxNiA2QzExLjU4MTcgNiA4IDkuNTgxNzIgOCAxNEM4IDE4LjQxODMgMTEuNTgxNyAyMiAxNiAyMloiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTE2IDE4QzE4LjIwOTEgMTggMjAgMTYuMjA5MSAyMCAxNEMyMCAxMS43OTA5IDE4LjIwOTEgMTAgMTYgMTBDMTMuNzkwOSAxMCAxMiAxMS43OTA5IDEyIDE0QzEyIDE2LjIwOTEgMTMuNzkwOSAxOCAxNiAxOFoiIGZpbGw9IiNFMDMwMjUiLz48L3N2Zz4=',
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -40]
  });
  
  data.forEach(uni => {
    const marker = L.marker([uni.lat, uni.lng], { 
      icon: redPinIcon,
      title: uni.name
    });
    
    marker.bindPopup(`
      <div style="padding: 10px; font-family: 'Inter', sans-serif; max-width: 250px;">
        <h3 style="margin: 0 0 8px 0; color: #008C45; font-size: 16px; font-weight: 600;">${uni.name}</h3>
        <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
          <i class="fas fa-map-marker-alt" style="margin-right: 5px;"></i>${uni.city}, ${uni.region}
        </p>
        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
          <i class="fas fa-calendar-alt" style="margin-right: 5px;"></i>Founded: ${uni.founded}
        </p>
        <button onclick="showUniversityDetails('${uni.id}')" style="
          background: linear-gradient(135deg, #008C45, #006B36);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: transform 0.2s ease;
          width: 100%;
          font-family: 'Inter', sans-serif;
        ">
          <i class="fas fa-info-circle" style="margin-right: 5px;"></i>View Details
        </button>
      </div>
    `);
    
    marker.on('click', () => {
      showUniversityDetails(uni.id);
    });
    
    markersCluster.addLayer(marker);
  });
  
  // Fit bounds to markers
  if (data.length > 0) {
    setTimeout(() => {
      map.fitBounds(markersCluster.getBounds(), { 
        padding: [50, 50],
        maxZoom: CONFIG.map.zoom
      });
    }, 100);
  }
}

// ===== SIDEBAR FUNCTIONS =====
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-sidebar');
  
  sidebarOpen = !sidebarOpen;
  
  if (sidebarOpen) {
    sidebar.classList.add('open');
    toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
    if (window.innerWidth > 768) {
      toggleBtn.innerHTML = '<i class="fas fa-times"></i><span class="btn-text">Close List</span>';
    }
  } else {
    sidebar.classList.remove('open');
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    if (window.innerWidth > 768) {
      toggleBtn.innerHTML = '<i class="fas fa-bars"></i><span class="btn-text">Universities List</span>';
    }
  }
}

function openSidebar() {
  if (!sidebarOpen) {
    toggleSidebar();
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    toggleSidebar();
  }
}

function resetView() {
  // Reset map view
  map.setView(CONFIG.map.center, CONFIG.map.zoom);
  
  // Reset filters
  document.getElementById('search-input').value = '';
  document.getElementById('type-filter').value = 'all';
  document.getElementById('sort-filter').value = 'name';
  document.getElementById('sidebar-title').textContent = 'Italian Universities';
  
  // Reset current data
  currentRegion = null;
  currentUniversities = [...universities];
  
  // Re-render
  filterAndSort();
  
  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    closeSidebar();
  }
}

// ===== LIST RENDERING =====
function renderList(data) {
  const container = document.getElementById('university-list');
  const emptyState = document.getElementById('empty-state');
  const sortValue = document.getElementById('sort-filter').value;
  
  if (data.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  
  if (sortValue === 'region') {
    container.innerHTML = renderGroupedByRegion(data);
  } else {
    container.innerHTML = renderSimpleList(data);
  }
  
  // Update results count
  const totalCount = universities.length;
  const currentCount = data.length;
  document.getElementById('results-count').textContent = 
    currentCount === totalCount ? 
    `${totalCount} universities` : 
    `${currentCount} of ${totalCount} universities`;
  
  // Add click handlers
  container.querySelectorAll('.university-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
    card.addEventListener('click', () => {
      const universityId = card.dataset.id;
      showUniversityDetails(universityId);
    });
  });
}

function renderSimpleList(data) {
  return data.map((uni, index) => `
    <div class="university-card" data-id="${uni.id}" style="animation-delay: ${index * 0.05}s">
      <h3>${uni.name}</h3>
      <div class="location">
        <i class="fas fa-map-marker-alt"></i>
        ${uni.city}, ${uni.region}
      </div>
      <div class="meta">
        <span class="year">
          <i class="fas fa-calendar-alt"></i>
          ${uni.founded}
        </span>
        <span class="type type-${uni.type}">
          ${uni.type.charAt(0).toUpperCase() + uni.type.slice(1)}
        </span>
      </div>
    </div>
  `).join('');
}

function renderGroupedByRegion(data) {
  const grouped = groupByRegion(data);
  
  // Sort regions (north to south)
  const regionOrder = [
    'Aosta Valley', 'Piedmont', 'Lombardy', 'Trentino-Alto Adige',
    'Veneto', 'Friuli-Venezia Giulia', 'Liguria', 'Emilia-Romagna',
    'Tuscany', 'Umbria', 'Marche', 'Lazio', 'Abruzzo', 'Molise',
    'Campania', 'Apulia', 'Basilicata', 'Calabria', 'Sicily', 'Sardinia'
  ];
  
  let html = '';
  let cardIndex = 0;
  
  regionOrder.forEach(region => {
    if (grouped[region] && grouped[region].length > 0) {
      html += `
        <div class="region-group">
          <div class="region-header">
            ${region}
            <span class="region-count">${grouped[region].length}</span>
          </div>
          ${grouped[region].map(uni => `
            <div class="university-card" data-id="${uni.id}" style="animation-delay: ${cardIndex++ * 0.05}s">
              <h4>${uni.name}</h4>
              <div class="location">
                <i class="fas fa-map-marker-alt"></i>
                ${uni.city}
              </div>
              <div class="meta">
                <span class="year">
                  <i class="fas fa-calendar-alt"></i>
                  ${uni.founded}
                </span>
                <span class="type type-${uni.type}">
                  ${uni.type.charAt(0).toUpperCase() + uni.type.slice(1)}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  });
  
  return html;
}

// ===== FILTERING =====
function filterAndSort() {
  let filtered = [...universities];
  
  // Search filter
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(uni =>
      uni.name.toLowerCase().includes(searchTerm) ||
      uni.city.toLowerCase().includes(searchTerm) ||
      uni.region.toLowerCase().includes(searchTerm)
    );
  }
  
  // Type filter
  const typeFilter = document.getElementById('type-filter').value;
  if (typeFilter !== 'all') {
    filtered = filtered.filter(uni => uni.type === typeFilter);
  }
  
  // Sorting
  const sortBy = document.getElementById('sort-filter').value;
  switch(sortBy) {
    case 'founded':
      filtered.sort((a, b) => a.founded - b.founded);
      break;
    case 'region':
      filtered = sortByRegion(filtered);
      break;
    default: // 'name'
      filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  currentUniversities = filtered;
  renderList(filtered);
  renderMarkers(filtered);
}

// ===== MODAL FUNCTIONS =====
function showUniversityDetails(universityId) {
  const university = universities.find(u => u.id === universityId);
  if (!university) return;
  
  // Update modal content
  document.getElementById('modal-name').textContent = university.name;
  document.getElementById('modal-city').textContent = university.city;
  document.getElementById('modal-region').textContent = university.region;
  document.getElementById('modal-region-full').textContent = university.region;
  document.getElementById('modal-founded').textContent = university.founded;
  document.getElementById('modal-year').textContent = `Est. ${university.founded}`;
  
  // Set type with proper styling
  const typeElement = document.getElementById('modal-type');
  typeElement.textContent = university.type.charAt(0).toUpperCase() + university.type.slice(1);
  typeElement.className = 'university-type';
  if (university.type === 'university') typeElement.style.background = 'rgba(52, 199, 89, 0.2)';
  else if (university.type === 'polytechnic') typeElement.style.background = 'rgba(10, 132, 255, 0.2)';
  else typeElement.style.background = 'rgba(255, 159, 10, 0.2)';
  
  document.getElementById('modal-type-full').textContent = 
    university.type === 'university' ? 'University' : 
    university.type === 'polytechnic' ? 'Polytechnic' : 'Special Statute';
  
  document.getElementById('modal-description').textContent = university.description;
  document.getElementById('modal-website').href = university.website;
  
  // Show modal
  document.getElementById('university-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function locateUniversityOnMap() {
  const universityId = document.getElementById('modal-name').textContent;
  const university = universities.find(u => u.name === universityId);
  if (!university || !map) return;
  
  map.setView([university.lat, university.lng], 14);
  document.getElementById('university-modal').style.display = 'none';
  document.body.style.overflow = '';
  
  // Open the marker popup
  markersCluster.eachLayer(layer => {
    if (layer.getLatLng().lat === university.lat && layer.getLatLng().lng === university.lng) {
      layer.openPopup();
    }
  });
}

// Make functions available globally for HTML onclick
window.showUniversityDetails = showUniversityDetails;

// ===== SCROLL FUNCTIONS =====
function setupScrollListener() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Hero explore button
  document.getElementById('explore-btn')?.addEventListener('click', () => {
    document.querySelector('.map-section')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Search with debounce
  document.getElementById('search-input').addEventListener('input', 
    debounce(filterAndSort, 300)
  );
  
  document.getElementById('clear-search').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    filterAndSort();
  });
  
  // Filters
  document.getElementById('type-filter').addEventListener('change', filterAndSort);
  document.getElementById('sort-filter').addEventListener('change', filterAndSort);
  
  // Sidebar toggle (top button)
  document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
  
  // Sidebar close (inside sidebar)
  document.getElementById('sidebar-close').addEventListener('click', closeSidebar);
  
  // Reset view
  document.getElementById('reset-view').addEventListener('click', resetView);
  
  // Reset filters
  document.getElementById('reset-filters').addEventListener('click', resetView);
  document.getElementById('reset-filters-empty').addEventListener('click', resetView);
  
  // Modal
  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('university-modal').style.display = 'none';
    document.body.style.overflow = '';
  });
  
  document.querySelector('.modal-overlay').addEventListener('click', () => {
    document.getElementById('university-modal').style.display = 'none';
    document.body.style.overflow = '';
  });
  
  document.getElementById('modal-locate').addEventListener('click', locateUniversityOnMap);
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('university-modal').style.display === 'flex') {
      document.getElementById('university-modal').style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  // Close sidebar when clicking outside on mobile
  if (window.innerWidth <= 768) {
    document.addEventListener('click', (e) => {
      const sidebar = document.getElementById('sidebar');
      const toggleBtn = document.getElementById('toggle-sidebar');
      
      if (sidebarOpen && 
          !sidebar.contains(e.target) && 
          !toggleBtn.contains(e.target)) {
        closeSidebar();
      }
    });
  }
  
  // Setup scroll listener
  setupScrollListener();
}

// ===== INITIALIZATION =====
function initializeApp() {
  console.log('🚀 Initializing Italian Universities Map...');
  
  // Hide loading screen
  setTimeout(hideLoadingScreen, 1500);
  
  // Initialize map
  initMap();
  
  // Setup event listeners
  setupEventListeners();
  
  // Initial render
  filterAndSort();
  
  console.log('✅ App initialized successfully');
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
