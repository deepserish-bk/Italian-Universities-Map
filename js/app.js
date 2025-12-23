// ===== ITALIAN UNIVERSITIES & COURSES - INTEGRATED APP =====

// Configuration
const CONFIG = {
  map: {
    bounds: { north: 47.5, south: 35.5, west: 6.6, east: 18.8 },
    center: [41.8719, 12.5674],
    zoom: 6,
    minZoom: 5,
    maxZoom: 16,
    regionStyle: {
      color: '#2D3748',
      weight: 1.5,
      opacity: 0.9,
      fillOpacity: 0.15,
      fillColor: '#008C45'
    }
  },
  colors: {
    italyGreen: '#008C45',
    italyWhite: '#F4F5F0',
    italyRed: '#CD212A',
    stemCS: '#34C759',
    stemEng: '#0A84FF',
    business: '#FF9F0A',
    health: '#AF52DE',
    humanities: '#FF453A',
    science: '#30D158',
    env: '#32D74B',
    law: '#5E5CE6',
    tourism: '#64D2FF'
  }
};

// Complete Italian Universities Data
const universities = [
  { id: "aquila", name: "Università degli Studi dell'Aquila", city: "L'Aquila", region: "Abruzzo", type: "university", founded: 1952, website: "https://www.univaq.it", lat: 42.3499, lng: 13.3995, description: "A public research university located in L'Aquila, offering programs in sciences, engineering, medicine, and humanities." },
  { id: "teramo", name: "Università degli Studi di Teramo", city: "Teramo", region: "Abruzzo", type: "university", founded: 1993, website: "https://www.unite.it", lat: 42.6589, lng: 13.7044, description: "A modern university focusing on agricultural, veterinary, and legal sciences in the Abruzzo region." },
  { id: "bari", name: "Università degli Studi di Bari Aldo Moro", city: "Bari", region: "Apulia", type: "university", founded: 1925, website: "https://www.uniba.it", lat: 41.1171, lng: 16.8719, description: "One of the most important universities in Southern Italy, named after former Prime Minister Aldo Moro." },
  { id: "poliba", name: "Politecnico di Bari", city: "Bari", region: "Apulia", type: "polytechnic", founded: 1990, website: "https://www.poliba.it", lat: 41.1075, lng: 16.8782, description: "The technical university of Apulia, specializing in engineering and architecture." },
  { id: "foggia", name: "Università degli Studi di Foggia", city: "Foggia", region: "Apulia", type: "university", founded: 1991, website: "https://www.unifg.it", lat: 41.4612, lng: 15.5448, description: "A young university in the northern part of Apulia, with strong programs in agriculture and medicine." },
  { id: "salento", name: "Università del Salento", city: "Lecce", region: "Apulia", type: "university", founded: 1955, website: "https://www.unisalento.it", lat: 40.3541, lng: 18.1698, description: "Located in the heel of Italy's boot, known for its programs in humanities, sciences, and engineering." },
  { id: "basilicata", name: "Università degli Studi della Basilicata", city: "Potenza/Matera", region: "Basilicata", type: "university", founded: 1982, website: "https://www.unibas.it", lat: 40.6401, lng: 15.8027, description: "The main university of Basilicata, with campuses in Potenza and the UNESCO World Heritage city of Matera." },
  { id: "calabria", name: "Università della Calabria", city: "Arcavacata di Rende", region: "Calabria", type: "university", founded: 1972, website: "https://www.unical.it", lat: 39.3633, lng: 16.2284, description: "A campus university near Cosenza, known for its modern architecture and comprehensive academic offerings." },
  { id: "reggiocalabria", name: "Università Mediterranea di Reggio Calabria", city: "Reggio Calabria", region: "Calabria", type: "university", founded: 1997, website: "https://www.unirc.it", lat: 38.1118, lng: 15.6470, description: "Focuses on Mediterranean studies, with strong programs in architecture, engineering, and agriculture." },
  { id: "catanzaro", name: "Università degli Studi di Catanzaro 'Magna Græcia'", city: "Catanzaro", region: "Calabria", type: "university", founded: 1998, website: "https://www.unicz.it", lat: 38.9026, lng: 16.5871, description: "A medical-focused university named after the ancient Greek colonization of Southern Italy." },
  { id: "unina", name: "Università degli Studi di Napoli Federico II", city: "Naples", region: "Campania", type: "university", founded: 1224, website: "https://www.unina.it", lat: 40.8485, lng: 14.2621, description: "One of the oldest universities in the world and the oldest public non-sectarian university." },
  { id: "lorientale", name: "Università degli Studi di Napoli 'L'Orientale'", city: "Naples", region: "Campania", type: "university", founded: 1732, website: "https://www.unior.it", lat: 40.8459, lng: 14.2507, description: "The oldest school of Sinology and Oriental Studies in Europe, now a comprehensive university." },
  { id: "parthenope", name: "Università degli Studi di Napoli 'Parthenope'", city: "Naples", region: "Campania", type: "university", founded: 1920, website: "https://www.uniparthenope.it", lat: 40.8389, lng: 14.2525, description: "Named after the ancient Greek name for Naples, specializing in economics, engineering, and sports sciences." },
  { id: "salerno", name: "Università degli Studi di Salerno", city: "Salerno", region: "Campania", type: "university", founded: 1968, website: "https://www.unisa.it", lat: 40.6773, lng: 14.7775, description: "A modern campus university with strong research programs in sciences, engineering, and humanities." },
  { id: "vanvitelli", name: "Università degli Studi della Campania 'Luigi Vanvitelli'", city: "Naples/Caserta", region: "Campania", type: "university", founded: 1991, website: "https://www.unicampania.it", lat: 41.0836, lng: 14.3308, description: "Named after the famous architect, with campuses in Naples and Caserta, focusing on multidisciplinary studies." },
  { id: "suororsola", name: "Università degli Studi di Napoli 'Suor Orsola Benincasa'", city: "Naples", region: "Campania", type: "special", founded: 1895, website: "https://www.unisob.na.it", lat: 40.8463, lng: 14.2432, description: "A unique university with roots in a 16th-century monastery, now offering humanities and education programs." },
  { id: "unibo", name: "Università di Bologna", city: "Bologna", region: "Emilia-Romagna", type: "university", founded: 1088, website: "https://www.unibo.it", lat: 44.4961, lng: 11.3532, description: "The oldest university in continuous operation in the world, and one of the most prestigious academic institutions in Italy." },
  { id: "ferrara", name: "Università degli Studi di Ferrara", city: "Ferrara", region: "Emilia-Romagna", type: "university", founded: 1391, website: "https://www.unife.it", lat: 44.8378, lng: 11.6198, description: "Founded by the Este family, known for its research in sciences, engineering, and medicine." },
  { id: "unimore", name: "Università degli Studi di Modena e Reggio Emilia", city: "Modena/Reggio Emilia", region: "Emilia-Romagna", type: "university", founded: 1175, website: "https://www.unimore.it", lat: 44.6471, lng: 10.9256, description: "One of the oldest universities in Italy, with strong programs in engineering, economics, and life sciences." },
  { id: "parma", name: "Università degli Studi di Parma", city: "Parma", region: "Emilia-Romagna", type: "university", founded: 962, website: "https://www.unipr.it", lat: 44.8012, lng: 10.3284, description: "Traces its origins to a cathedral school, now a comprehensive university with international recognition." },
  { id: "trieste", name: "Università degli Studi di Trieste", city: "Trieste", region: "Friuli-Venezia Giulia", type: "university", founded: 1924, website: "https://www.units.it", lat: 45.6536, lng: 13.7784, description: "Located at the crossroads of Latin, Slavic, and Germanic cultures, with strong international focus." },
  { id: "udine", name: "Università degli Studi di Udine", city: "Udine", region: "Friuli-Venezia Giulia", type: "university", founded: 1978, website: "https://www.uniud.it", lat: 46.0648, lng: 13.2344, description: "Founded after the 1976 earthquake to contribute to the cultural and economic development of Friuli." },
  { id: "sapienza", name: "Università degli Studi di Roma 'La Sapienza'", city: "Rome", region: "Lazio", type: "university", founded: 1303, website: "https://www.uniroma1.it", lat: 41.9028, lng: 12.5140, description: "The largest university in Europe by enrollment, and one of the oldest and most prestigious in the world." },
  { id: "torvergata", name: "Università degli Studi di Roma 'Tor Vergata'", city: "Rome", region: "Lazio", type: "university", founded: 1982, website: "https://www.uniroma2.it", lat: 41.8490, lng: 12.6222, description: "A modern campus university in Rome, known for its research in sciences, engineering, and economics." },
  { id: "romatre", name: "Università degli Studi di Roma 'Roma Tre'", city: "Rome", region: "Lazio", type: "university", founded: 1992, website: "https://www.uniroma3.it", lat: 41.8573, lng: 12.4694, description: "The youngest of Rome's state universities, focusing on innovation and interdisciplinary studies." },
  { id: "cassino", name: "Università degli Studi di Cassino e del Lazio Meridionale", city: "Cassino", region: "Lazio", type: "university", founded: 1979, website: "https://www.unicas.it", lat: 41.4865, lng: 13.8315, description: "Serving southern Lazio, known for its engineering, economics, and humanities programs." },
  { id: "tuscia", name: "Università degli Studi della Tuscia", city: "Viterbo", region: "Lazio", type: "university", founded: 1979, website: "https://www.unitus.it", lat: 42.4287, lng: 12.1048, description: "Located in historical Viterbo, specializing in agricultural, environmental, and cultural heritage studies." },
  { id: "genova", name: "Università degli Studi di Genova", city: "Genoa", region: "Liguria", type: "university", founded: 1481, website: "https://www.unige.it", lat: 44.4056, lng: 8.9463, description: "One of the largest universities in Italy, with historical ties to maritime studies and navigation." },
  { id: "unimi", name: "Università degli Studi di Milano", city: "Milan", region: "Lombardy", type: "university", founded: 1924, website: "https://www.unimi.it", lat: 45.4605, lng: 9.1909, description: "The largest university in Lombardy, known for its research in sciences, humanities, and medicine." },
  { id: "unimib", name: "Università degli Studi di Milano-Bicocca", city: "Milan", region: "Lombardy", type: "university", founded: 1998, website: "https://www.unimib.it", lat: 45.5167, lng: 9.2106, description: "A modern university created on a redeveloped industrial area, focusing on interdisciplinary research." },
  { id: "unipv", name: "Università degli Studi di Pavia", city: "Pavia", region: "Lombardy", type: "university", founded: 1361, website: "https://www.unipv.it", lat: 45.1865, lng: 9.1560, description: "One of the oldest universities in the world, with a rich history and strong scientific tradition." },
  { id: "unibg", name: "Università degli Studi di Bergamo", city: "Bergamo", region: "Lombardy", type: "university", founded: 1968, website: "https://www.unibg.it", lat: 45.6940, lng: 9.6699, description: "Known for its economics, engineering, and foreign language programs in the Lombardy region." },
  { id: "unibs", name: "Università degli Studi di Brescia", city: "Brescia", region: "Lombardy", type: "university", founded: 1982, website: "https://www.unibs.it", lat: 45.5391, lng: 10.2205, description: "A young university with strong programs in engineering, economics, and medicine." },
  { id: "uninsubria", name: "Università degli Studi dell'Insubria", city: "Como/Varese", region: "Lombardy", type: "university", founded: 1998, website: "https://www.uninsubria.it", lat: 45.8121, lng: 8.8284, description: "Named after the ancient Roman region, with campuses in Como and Varese near the Swiss border." },
  { id: "urbino", name: "Università di Urbino 'Carlo Bo'", city: "Urbino", region: "Marche", type: "university", founded: 1506, website: "https://www.uniurb.it", lat: 43.7255, lng: 12.6373, description: "Located in a Renaissance jewel city, known for its humanities, law, and economics programs." },
  { id: "macerata", name: "Università degli Studi di Macerata", city: "Macerata", region: "Marche", type: "university", founded: 1290, website: "https://www.unimc.it", lat: 43.3006, lng: 13.4525, description: "One of the oldest universities in Italy, specializing in humanities, law, and political sciences." },
  { id: "camerino", name: "Università degli Studi di Camerino", city: "Camerino", region: "Marche", type: "university", founded: 1336, website: "https://www.unicam.it", lat: 43.1355, lng: 13.0686, description: "A small university with a long tradition, strong in sciences, pharmacy, and veterinary medicine." },
  { id: "univpm", name: "Università Politecnica delle Marche", city: "Ancona", region: "Marche", type: "polytechnic", founded: 1959, website: "https://www.univpm.it", lat: 43.6158, lng: 13.5189, description: "The technical university of Marche, focusing on engineering, architecture, and agricultural sciences." },
  { id: "molise", name: "Università degli Studi del Molise", city: "Campobasso", region: "Molise", type: "university", founded: 1982, website: "https://www.unimol.it", lat: 41.5604, lng: 14.6634, description: "The main university of the Molise region, contributing to the cultural and economic development of the area." },
  { id: "unito", name: "Università degli Studi di Torino", city: "Turin", region: "Piedmont", type: "university", founded: 1404, website: "https://www.unito.it", lat: 45.0703, lng: 7.6869, description: "One of Italy's most ancient and prestigious universities, with comprehensive academic offerings." },
  { id: "polito", name: "Politecnico di Torino", city: "Turin", region: "Piedmont", type: "polytechnic", founded: 1859, website: "https://www.polito.it", lat: 45.0636, lng: 7.6612, description: "One of the oldest and most prestigious technical universities in Italy, internationally recognized." },
  { id: "upo", name: "Università del Piemonte Orientale 'Amedeo Avogadro'", city: "Alessandria/Novara/Vercelli", region: "Piedmont", type: "university", founded: 1998, website: "https://www.uniupo.it", lat: 45.0186, lng: 8.5326, description: "A multi-campus university in eastern Piedmont, named after the famous scientist Amedeo Avogadro." },
  { id: "cagliari", name: "Università degli Studi di Cagliari", city: "Cagliari", region: "Sardinia", type: "university", founded: 1606, website: "https://www.unica.it", lat: 39.2238, lng: 9.1217, description: "The main university of Sardinia, with a rich history and strong research programs." },
  { id: "sassari", name: "Università degli Studi di Sassari", city: "Sassari", region: "Sardinia", type: "university", founded: 1562, website: "https://www.uniss.it", lat: 40.7267, lng: 8.5593, description: "One of the oldest universities in Italy, particularly strong in agricultural and veterinary sciences." },
  { id: "unipa", name: "Università degli Studi di Palermo", city: "Palermo", region: "Sicily", type: "university", founded: 1806, website: "https://www.unipa.it", lat: 38.1157, lng: 13.3615, description: "The main university of Sicily, with roots dating back to the 15th century, offering comprehensive programs." },
  { id: "unict", name: "Università degli Studi di Catania", city: "Catania", region: "Sicily", type: "university", founded: 1434, website: "https://www.unict.it", lat: 37.5025, lng: 15.0873, description: "The oldest university in Sicily, located at the foot of Mount Etna, with strong scientific tradition." },
  { id: "unime", name: "Università degli Studi di Messina", city: "Messina", region: "Sicily", type: "university", founded: 1548, website: "https://www.unime.it", lat: 38.1937, lng: 15.5542, description: "Founded by Pope Paul III, playing a key role in the cultural life of northeastern Sicily." },
  { id: "kore", name: "Università degli Studi di Enna 'Kore'", city: "Enna", region: "Sicily", type: "university", founded: 2005, website: "https://www.unikore.it", lat: 37.5679, lng: 14.2794, description: "The first free university in Sicily, named after the ancient Greek name for the goddess Persephone." },
  { id: "unifi", name: "Università degli Studi di Firenze", city: "Florence", region: "Tuscany", type: "university", founded: 1321, website: "https://www.unifi.it", lat: 43.7793, lng: 11.2463, description: "One of Italy's most important public research universities, located in the heart of the Renaissance." },
  { id: "unipi", name: "Università di Pisa", city: "Pisa", region: "Tuscany", type: "university", founded: 1343, website: "https://www.unipi.it", lat: 43.7167, lng: 10.4000, description: "One of the oldest universities in Italy, internationally renowned for its leaning tower and scientific research." },
  { id: "unisi", name: "Università degli Studi di Siena", city: "Siena", region: "Tuscany", type: "university", founded: 1240, website: "https://www.unisi.it", lat: 43.3186, lng: 11.3308, description: "One of the oldest universities in Italy, located in the medieval city famous for its Palio horse race." },
  { id: "unisistraf", name: "Università per Stranieri di Siena", city: "Siena", region: "Tuscany", type: "special", founded: 1982, website: "https://www.unistrasi.it", lat: 43.3211, lng: 11.3286, description: "Specializes in teaching Italian language and culture to international students." },
  { id: "sns", name: "Scuola Normale Superiore di Pisa", city: "Pisa", region: "Tuscany", type: "special", founded: 1810, website: "https://www.sns.it", lat: 43.7191, lng: 10.4012, description: "One of Italy's most prestigious and selective universities, modeled after the École Normale Supérieure." },
  { id: "santanna", name: "Scuola Superiore Sant'Anna di Pisa", city: "Pisa", region: "Tuscany", type: "special", founded: 1987, website: "https://www.santannapisa.it", lat: 43.7189, lng: 10.4033, description: "A special statute university focusing on applied sciences, social sciences, and experimental medicine." },
  { id: "unitn", name: "Università degli Studi di Trento", city: "Trento", region: "Trentino-Alto Adige", type: "university", founded: 1962, website: "https://www.unitn.it", lat: 46.0667, lng: 11.1191, description: "A research-intensive university in the Alps, known for its international outlook and interdisciplinary approach." },
  { id: "unibz", name: "Libera Università di Bolzano", city: "Bolzano", region: "Trentino-Alto Adige", type: "university", founded: 1997, website: "https://www.unibz.it", lat: 46.4983, lng: 11.3545, description: "A trilingual university (Italian, German, English) in the heart of the Dolomites, focusing on innovation." },
  { id: "unipg", name: "Università degli Studi di Perugia", city: "Perugia", region: "Umbria", type: "university", founded: 1308, website: "https://www.unipg.it", lat: 43.1122, lng: 12.3888, description: "One of the oldest universities in Italy, located in the historic hill town of Perugia." },
  { id: "unistrapp", name: "Università per Stranieri di Perugia", city: "Perugia", region: "Umbria", type: "special", founded: 1925, website: "https://www.unistrapg.it", lat: 43.1107, lng: 12.3906, description: "Dedicated to Italian language and culture studies for international students." },
  { id: "aosta", name: "Università della Valle d'Aosta", city: "Aosta", region: "Aosta Valley", type: "university", founded: 2000, website: "https://www.univda.it", lat: 45.7376, lng: 7.3172, description: "The youngest Italian university, serving the bilingual French-Italian region in the Alps." },
  { id: "unipd", name: "Università degli Studi di Padova", city: "Padua", region: "Veneto", type: "university", founded: 1222, website: "https://www.unipd.it", lat: 45.4064, lng: 11.8768, description: "One of the oldest universities in the world, where Galileo Galilei was a lecturer, with a strong research tradition." },
  { id: "unive", name: "Università Ca' Foscari Venezia", city: "Venice", region: "Veneto", type: "university", founded: 1868, website: "https://www.unive.it", lat: 45.4333, lng: 12.3267, description: "Located in the historic palaces of Venice, specializing in economics, languages, and humanities." },
  { id: "univr", name: "Università degli Studi di Verona", city: "Verona", region: "Veneto", type: "university", founded: 1959, website: "https://www.univr.it", lat: 45.4386, lng: 10.9928, description: "A young university in the city of Romeo and Juliet, with strong programs in medicine, humanities, and sciences." },
  { id: "iuav", name: "Università Iuav di Venezia", city: "Venice", region: "Veneto", type: "special", founded: 1926, website: "https://www.iuav.it", lat: 45.4318, lng: 12.3253, description: "One of Italy's most prestigious schools of architecture, urban planning, and design." }
];

// University name mapping for course linking
const universityNameMapping = {
  // University of Bologna variations
  "University of Bologna": "Università di Bologna",
  "University degli Studi di BOLOGNA": "Università di Bologna",
  
  // Politecnico di Milano variations
  "Politecnico di MILANO": "Politecnico di Milano",
  
  // University of Padova variations
  "University of Padova": "Università degli Studi di Padova",
  
  // University of Sapienza variations
  "University of Sapienza": "Università degli Studi di Roma 'La Sapienza'",
  "University degli Studi di ROMA \"La Sapienza\"": "Università degli Studi di Roma 'La Sapienza'",
  
  // University of Pavia variations
  "University of Pavia": "Università degli Studi di Pavia",
  
  // University of Turin variations
  "University of Turin": "Università degli Studi di Torino",
  "Polytechnic University of Turin": "Politecnico di Torino",
  
  // University of Genoa variations
  "University of GENOVA": "Università degli Studi di Genova",
  
  // University of Pisa variations
  "University of Pisa": "Università di Pisa",
  
  // University of Florence variations
  "University of Florence": "Università degli Studi di Firenze",
  "University degli Studi di FIRENZE": "Università degli Studi di Firenze",
  
  // University of Milan variations
  "Milan University": "Università degli Studi di Milano",
  "Milan University-BICOCCA": "Università degli Studi di Milano-Bicocca",
  
  // University of Trento variations
  "University of Trento": "Università degli Studi di Trento",
  
  // University of Siena variations
  "University of Siena": "Università degli Studi di Siena",
  
  // University of Verona variations
  "University of Verona": "Università degli Studi di Verona",
  
  // University of Udine variations
  "University of Udine": "Università degli Studi di Udine",
  
  // University of Trieste variations
  "University of Trieste": "Università degli Studi di Trieste",
  
  // University of Camerino variations
  "University of Camerino": "Università degli Studi di Camerino",
  "University degli Studi di CAMERINO": "Università degli Studi di Camerino",
  
  // University of Insubria variations
  "University of Insubria": "Università degli Studi dell'Insubria",
  
  // University of Calabria variations
  "University of Calabria": "Università della Calabria",
  
  // University of Catania variations
  "University of Catania": "Università degli Studi di Catania",
  "University degli Studi di CATANIA": "Università degli Studi di Catania",
  
  // University of Modena variations
  "University of Modena": "Università degli Studi di Modena e Reggio Emilia",
  
  // University of Palermo variations
  "University of Palermo": "Università degli Studi di Palermo",
  
  // University of Messina variations
  "University of Messina": "Università degli Studi di Messina",
  
  // University of Foggia variations
  "University of Foggia": "Università degli Studi di Foggia",
  
  // University of Ferrara variations
  "University of FERRARA": "Università degli Studi di Ferrara",
  "University degli Studi di FERRARA": "Università degli Studi di Ferrara",
  
  // University of Perugia variations
  "University of Perugia": "Università degli Studi di Perugia",
  
  // University of Cassino variations
  "University of Cassino": "Università degli Studi di Cassino e del Lazio Meridionale",
  
  // University of Tuscia variations
  "University of Tuscia": "Università degli Studi della Tuscia",
  
  // University of Salento variations
  "University del SALENTO": "Università del Salento",
  
  // University of Bari variations
  "University degli Studi di BARI ALDO MORO": "Università degli Studi di Bari Aldo Moro",
  "Polytechnic University of Bari": "Politecnico di Bari",
  
  // University of Rome "Tor Vergata" variations
  "University of Rome \"Tor Vergata\"": "Università degli Studi di Roma 'Tor Vergata'",
  "University degli Studi di ROMA \"Tor Vergata\"": "Università degli Studi di Roma 'Tor Vergata'",
  
  // University of Naples variations
  "University of Naples Federico II": "Università degli Studi di Napoli Federico II",
  "University degli Studi di Napoli Federico II": "Università degli Studi di Napoli Federico II",
  "University degli Studi di NAPOLI \"Parthenope\"": "Università degli Studi di Napoli 'Parthenope'",
  
  // University of Salerno variations
  "University degli Studi di SALERNO": "Università degli Studi di Salerno",
  
  // University of Teramo variations
  "University degli Studi di TERAMO": "Università degli Studi di Teramo",
  
  // University of Sassari variations
  "University degli Studi di SASSARI": "Università degli Studi di Sassari",
  
  // University of Cagliari variations
  "University degli Studi di CAGLIARI": "Università degli Studi di Cagliari",
  
  // University of Aquila variations
  "University degli Studi dell'AQUILA": "Università degli Studi dell'Aquila",
  
  // University of Brescia variations
  "University degli Studi di BRESCIA": "Università degli Studi di Brescia",
  
  // Roma Tre University
  "Roma Tre University": "Università degli Studi di Roma 'Roma Tre'",
  
  // Marche Polytechnic University
  "Marche Polytechnic University": "Università Politecnica delle Marche",
  
  // University of Bergamo variations
  "University of Bergamo": "Università degli Studi di Bergamo",
  
  // Ca' Foscari University variations
  "Ca' Foscari University of Venice": "Università Ca' Foscari Venezia",
  
  // University of Bozen-Bolzano variations
  "University of Bozen-Bolzano": "Libera Università di Bolzano",
  
  // University of Macerata variations
  "University of Macerata": "Università degli Studi di Macerata",
  
  // University of Parma variations
  "University of Parma": "Università degli Studi di Parma",
  
  // Special universities - add fallback coordinates
  "University of Rome \"Foro Italico\"": null, // Will use fallback coordinates
};

// Fallback city coordinates for unmatched universities
const cityCoordinates = {
  'Rome': [41.9028, 12.4964],
  'Milano': [45.4642, 9.1900],
  'Bologna': [44.4938, 11.3388],
  'Torino': [45.0703, 7.6869],
  'Firenze': [43.7696, 11.2558],
  'Napoli': [40.8518, 14.2681],
  'Palermo': [38.1157, 13.3615],
  'Genova': [44.4056, 8.9463],
  'Venezia': [45.4408, 12.3155],
  'Padova': [45.4064, 11.8768],
  'Pisa': [43.7167, 10.4000],
  'Siena': [43.3186, 11.3308],
  'Trento': [46.0667, 11.1191],
  'Trieste': [45.6536, 13.7784],
  'Udine': [46.0648, 13.2344],
  'Camerino': [43.1355, 13.0686],
  'Ferrara': [44.8378, 11.6198],
  'Modena': [44.6471, 10.9256],
  'Parma': [44.8012, 10.3284],
  'Pavia': [45.1865, 9.1560],
  'Bergamo': [45.6940, 9.6699],
  'Brescia': [45.5391, 10.2205],
  'Como': [45.8121, 8.8284],
  'Urbino': [43.7255, 12.6373],
  'Macerata': [43.3006, 13.4525],
  'Ancona': [43.6158, 13.5189],
  'Campobasso': [41.5604, 14.6634],
  'Cagliari': [39.2238, 9.1217],
  'Sassari': [40.7267, 8.5593],
  'Catania': [37.5025, 15.0873],
  'Messina': [38.1937, 15.5542],
  'Enna': [37.5679, 14.2794],
  'Perugia': [43.1122, 12.3888],
  'Verona': [45.4386, 10.9928],
  'Aosta': [45.7376, 7.3172],
  'Bolzano': [46.4983, 11.3545],
  'L\'Aquila': [42.3499, 13.3995],
  'Teramo': [42.6589, 13.7044],
  'Bari': [41.1171, 16.8719],
  'Foggia': [41.4612, 15.5448],
  'Lecce': [40.3541, 18.1698],
  'Potenza': [40.6401, 15.8027],
  'Cosenza': [39.3633, 16.2284],
  'Reggio Calabria': [38.1118, 15.6470],
  'Catanzaro': [38.9026, 16.5871],
  'Salerno': [40.6773, 14.7775],
  'Caserta': [41.0836, 14.3308],
  'Viterbo': [42.4287, 12.1048],
};

// Master Courses Data
let coursesData = {
  fields: [],
  stats: { total_courses: 0, total_fields: 0, total_subfields: 0 }
};

// Application State
const state = {
  currentView: 'universities',
  coursesViewMode: 'fields',
  selectedRegion: null,
  selectedUniversity: null,
  selectedField: null,
  selectedSubfield: null,
  selectedCourse: null,
  filteredUniversities: [...universities],
  filteredCourses: [],
  sidebarOpen: false,
  coursesPanelOpen: false,
  map: null,
  markersCluster: null,
  courseMarkers: null,
  universityMarkers: []
};

// ===== INITIALIZATION =====
function initializeApp() {
  hideLoadingScreen();
  loadCoursesData();
  initMap();
  setupEventListeners();
  renderUniversitiesList();
  updateResultsCount();
}

function hideLoadingScreen() {
  const loading = document.getElementById('loading');
  loading.classList.add('fade-out');
  setTimeout(() => loading.style.display = 'none', 300);
}

async function loadCoursesData() {
  try {
    const response = await fetch('json/PG_courses.json');
    const rawData = await response.json();
    processCoursesData(rawData);
    linkCoursesToUniversities();
    updateCoursesCount();
    populateFieldFilter();
  } catch (error) {
    console.log('Courses data not loaded, continuing with universities only');
  }
}

function processCoursesData(rawData) {
  coursesData.fields = rawData.fields.map(field => ({
    id: slugify(field.name),
    name: field.name,
    color: getFieldColor(field.name),
    icon: getFieldIcon(field.name),
    subfields: field.subfields.map(subfield => ({
      id: slugify(subfield.name),
      name: subfield.name,
      courses: subfield.courses.map(course => ({
        id: slugify(course.course_name + ' ' + course.university),
        name: course.course_name,
        university: course.university,
        universityId: null,
        coordinates: null,
        city: null,
        region: null,
        duration: '2 years',
        language: "English",
        courseType: 'MSc',
        field: field.name,
        subfield: subfield.name,
        matchedUniversity: null,
        exactUniversityName: null
      }))
    }))
  }));
  
  coursesData.stats.total_courses = rawData.fields.reduce((total, field) => 
    total + field.subfields.reduce((subTotal, subfield) => 
      subTotal + subfield.courses.length, 0), 0);
  coursesData.stats.total_fields = rawData.fields.length;
  coursesData.stats.total_subfields = rawData.fields.reduce((total, field) => 
    total + field.subfields.length, 0);
}

function linkCoursesToUniversities() {
  // Reset courses for all universities
  universities.forEach(uni => {
    uni.courses = [];
  });
  
  let linkedCount = 0;
  let unlinkedCount = 0;
  
  // Process all courses
  coursesData.fields.forEach(field => {
    field.subfields.forEach(subfield => {
      subfield.courses.forEach(course => {
        let matchedUniversity = null;
        let foundBy = '';
        
        // Try direct mapping first
        const mappedName = universityNameMapping[course.university];
        if (mappedName) {
          matchedUniversity = universities.find(u => u.name === mappedName);
          if (matchedUniversity) foundBy = 'direct mapping';
        }
        
        // If not found by mapping, try string matching
        if (!matchedUniversity) {
          const courseUniLower = course.university.toLowerCase().trim();
          
          // Try exact match first
          matchedUniversity = universities.find(uni => 
            uni.name.toLowerCase() === courseUniLower
          );
          if (matchedUniversity) foundBy = 'exact match';
          
          // Try partial match
          if (!matchedUniversity) {
            matchedUniversity = universities.find(uni => {
              const uniNameLower = uni.name.toLowerCase();
              return uniNameLower.includes(courseUniLower) || 
                     courseUniLower.includes(uniNameLower) ||
                     uniNameLower.replace(/università degli studi di |università di |politecnico di /gi, '').includes(courseUniLower.replace(/university of |polytechnic of /gi, '')) ||
                     courseUniLower.replace(/university of |polytechnic of /gi, '').includes(uniNameLower.replace(/università degli studi di |università di |politecnico di /gi, ''));
            });
            if (matchedUniversity) foundBy = 'partial match';
          }
          
          // Try city matching
          if (!matchedUniversity) {
            matchedUniversity = universities.find(uni => 
              courseUniLower.includes(uni.city.toLowerCase()) ||
              courseUniLower.includes(uni.region.toLowerCase())
            );
            if (matchedUniversity) foundBy = 'city/region match';
          }
          
          // Try keyword matching
          if (!matchedUniversity) {
            const keywords = {
              'bologna': 'Università di Bologna',
              'milano': 'Politecnico di Milano',
              'torino': 'Politecnico di Torino',
              'padova': 'Università degli Studi di Padova',
              'firenze': 'Università degli Studi di Firenze',
              'roma sapienza': 'Università degli Studi di Roma \'La Sapienza\'',
              'roma tor vergata': 'Università degli Studi di Roma \'Tor Vergata\'',
              'roma tre': 'Università degli Studi di Roma \'Roma Tre\'',
              'pavia': 'Università degli Studi di Pavia',
              'siena': 'Università degli Studi di Siena',
              'trento': 'Università degli Studi di Trento',
              'verona': 'Università degli Studi di Verona',
              'genova': 'Università degli Studi di Genova',
              'pisa': 'Università di Pisa'
            };
            
            for (const [keyword, uniName] of Object.entries(keywords)) {
              if (courseUniLower.includes(keyword)) {
                matchedUniversity = universities.find(u => u.name === uniName);
                if (matchedUniversity) {
                  foundBy = 'keyword match';
                  break;
                }
              }
            }
          }
        }
        
        // If university found, link the course
        if (matchedUniversity) {
          course.universityId = matchedUniversity.id;
          course.coordinates = [matchedUniversity.lat, matchedUniversity.lng];
          course.city = matchedUniversity.city;
          course.region = matchedUniversity.region;
          course.exactUniversityName = matchedUniversity.name;
          course.matchedUniversity = matchedUniversity.name;
          
          // Add to university's courses
          matchedUniversity.courses.push({
            ...course,
            field: field.name,
            subfield: subfield.name
          });
          
          linkedCount++;
          
          // Debug log (comment out in production)
          // console.log(`✓ Linked: ${course.name.substring(0, 40)}... → ${matchedUniversity.name} (${foundBy})`);
        } else {
          // Use fallback coordinates based on city
          const fallbackCoords = getFallbackCoordinates(course.university);
          course.coordinates = fallbackCoords;
          course.city = 'Unknown (approximate location)';
          course.region = 'Italy';
          
          unlinkedCount++;
          
          // Debug log for unlinked courses
          console.warn(`✗ Could not link: ${course.name} (${course.university}) - using fallback coordinates`);
        }
      });
    });
  });
  
  // Log linking results
  console.log(`\n📊 Course Linking Results:`);
  console.log(`   Total courses: ${coursesData.stats.total_courses}`);
  console.log(`   Successfully linked: ${linkedCount}`);
  console.log(`   Using fallback coordinates: ${unlinkedCount}`);
  console.log(`   Success rate: ${((linkedCount / coursesData.stats.total_courses) * 100).toFixed(1)}%`);
  
  if (unlinkedCount > 0) {
    console.log(`\n⚠️  ${unlinkedCount} courses need manual university matching.`);
    console.log(`   These courses will show on the map with approximate city coordinates.`);
  }
}

function getFallbackCoordinates(universityName) {
  const uniLower = universityName.toLowerCase();
  
  // Try to match by city name
  for (const [city, coords] of Object.entries(cityCoordinates)) {
    if (uniLower.includes(city.toLowerCase())) {
      return coords;
    }
  }
  
  // Special cases
  if (uniLower.includes('foro italico') || uniLower.includes('rome "foro italico"')) {
    return [41.9286, 12.4622]; // Rome coordinates
  }
  
  // Default to Rome
  return [41.9028, 12.4964];
}

function populateFieldFilter() {
  const fieldFilter = document.getElementById('field-filter');
  fieldFilter.innerHTML = '<option value="all">All Fields</option>';
  
  coursesData.fields.forEach(field => {
    const option = document.createElement('option');
    option.value = field.id;
    option.textContent = field.name;
    fieldFilter.appendChild(option);
  });
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function getFieldColor(fieldName) {
  const colors = {
    'STEM – Computer Science & Artificial Intelligence': CONFIG.colors.stemCS,
    'STEM – Engineering & Technology': CONFIG.colors.stemEng,
    'Business, Economics & Management': CONFIG.colors.business,
    'Health & Medical Sciences': CONFIG.colors.health,
    'Social Sciences & Humanities': CONFIG.colors.humanities,
    'Arts, Architecture & Design': CONFIG.colors.humanities,
    'STEM – Physical & Chemical Sciences': CONFIG.colors.science,
    'STEM – Biological & Life Sciences': CONFIG.colors.science,
    'Environmental, Sustainability & Agricultural Sciences': CONFIG.colors.env,
    'Law, Governance & Public Policy': CONFIG.colors.law,
    'Tourism, Hospitality & Cultural Studies': CONFIG.colors.tourism
  };
  return colors[fieldName] || CONFIG.colors.italyGreen;
}

function getFieldIcon(fieldName) {
  const icons = {
    'STEM – Computer Science & Artificial Intelligence': 'fas fa-microchip',
    'STEM – Engineering & Technology': 'fas fa-cogs',
    'Business, Economics & Management': 'fas fa-chart-line',
    'Health & Medical Sciences': 'fas fa-heartbeat',
    'Social Sciences & Humanities': 'fas fa-users',
    'Arts, Architecture & Design': 'fas fa-paint-brush',
    'STEM – Physical & Chemical Sciences': 'fas fa-flask',
    'STEM – Biological & Life Sciences': 'fas fa-dna',
    'Environmental, Sustainability & Agricultural Sciences': 'fas fa-leaf',
    'Law, Governance & Public Policy': 'fas fa-gavel',
    'Tourism, Hospitality & Cultural Studies': 'fas fa-umbrella-beach'
  };
  return icons[fieldName] || 'fas fa-graduation-cap';
}

function detectLanguage(courseName) {
  const lower = courseName.toLowerCase();
  if (lower.includes('english') || lower.includes('international')) return 'English';
  if (lower.includes('italian') || /^[A-Z\s]+$/.test(courseName)) return 'Italian';
  return 'Both';
}

// ===== MAP FUNCTIONS =====
function initMap() {
  state.map = L.map('map', {
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

  L.control.zoom({ position: 'topright' }).addTo(state.map);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(state.map);

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
            if (state.currentView === 'universities') {
              state.selectedRegion = regionName;
              filterUniversitiesByRegion(regionName);
              openSidebar();
            }
          });
        }
      }).addTo(state.map);
    })
    .catch(err => console.log('Regions GeoJSON not loaded'));

  state.markersCluster = L.markerClusterGroup({
    maxClusterRadius: 80,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true
  });
  state.map.addLayer(state.markersCluster);

  state.courseMarkers = L.layerGroup();
  state.map.addLayer(state.courseMarkers);

  state.map.on('drag', () => {
    state.map.panInsideBounds([
      [CONFIG.map.bounds.south, CONFIG.map.bounds.west],
      [CONFIG.map.bounds.north, CONFIG.map.bounds.east]
    ], { animate: false });
  });

  renderUniversityMarkers(state.filteredUniversities);
  
  setTimeout(() => {
    state.map.fitBounds([
      [CONFIG.map.bounds.south, CONFIG.map.bounds.west],
      [CONFIG.map.bounds.north, CONFIG.map.bounds.east]
    ]);
  }, 500);
}

function renderUniversityMarkers(universities) {
  state.markersCluster.clearLayers();
  state.universityMarkers = [];
  
  const redPinIcon = L.icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEM3LjE2MyAwIDAgNy4xNjMgMCAxNkMwIDI0IDE2IDQ4IDE2IDQ4QzE2IDQ4IDMyIDI0IDMyIDE2QzMyIDcuMTYzIDI0LjgzNyAwIDE2IDBaIiBmaWxsPSIjRTAzMDI1Ii8+PHBhdGggZD0iTTE2IDIyQzIwLjQxODMgMjIgMjQgMTguNDE4MyAyNCAxNEMyNCA5LjU4MTcyIDIwLjQxODMgNiAxNiA2QzExLjU4MTcgNiA4IDkuNTgxNzIgOCAxNEM4IDE4LjQxODMgMTEuNTgxNyAyMiAxNiAyMloiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTE2IDE4QzE4LjIwOTEgMTggMjAgMTYuMjA5MSAyMCAxNEMyMCAxMS43OTA5IDE4LjIwOTEgMTAgMTYgMTBDMTMuNzkwOSAxMCAxMiAxMS43OTA5IDEyIDE0QzEyIDE2LjIwOTEgMTMuNzkwOSAxOCAxNiAxOFoiIGZpbGw9IiNFMDMwMjUiLz48L3N2Zz4=',
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -40]
  });
  
  universities.forEach(uni => {
    const marker = L.marker([uni.lat, uni.lng], { 
      icon: redPinIcon,
      title: uni.name
    });
    
    marker.bindPopup(`
      <div style="padding: 10px; font-family: 'Inter', sans-serif; max-width: 250px;">
        <h3 style="margin: 0 0 8px 0; color: #008C45; font-size: 16px; font-weight: 600;">${uni.name}</h3>
        <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
          <i class="fas fa-map-marker-alt"></i> ${uni.city}, ${uni.region}
        </p>
        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
          <i class="fas fa-calendar-alt"></i> Founded: ${uni.founded}
        </p>
        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
          <i class="fas fa-graduation-cap"></i> ${uni.courses ? uni.courses.length : 0} master courses
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
          width: 100%;
          font-family: 'Inter', sans-serif;
        ">
          <i class="fas fa-info-circle"></i> View Details
        </button>
      </div>
    `);
    
    marker.on('click', () => showUniversityDetails(uni.id));
    state.markersCluster.addLayer(marker);
    state.universityMarkers.push(marker);
  });
  
  if (universities.length > 0) {
    setTimeout(() => {
      state.map.fitBounds(state.markersCluster.getBounds(), { 
        padding: [50, 50],
        maxZoom: CONFIG.map.zoom
      });
    }, 100);
  }
}

function renderCourseMarkers(courses) {
  state.courseMarkers.clearLayers();
  
  courses.forEach(course => {
    if (!course.coordinates) {
      console.warn(`Course missing coordinates: ${course.name}`);
      return;
    }
    
    const icon = L.divIcon({
      className: 'course-marker',
      html: `
        <div class="course-icon" style="background: ${getFieldColor(course.field)};">
          <i class="fas fa-graduation-cap"></i>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    
    const marker = L.marker(course.coordinates, { icon });
    
    const universityName = course.exactUniversityName || course.university;
    const locationText = course.city && course.region ? 
      `${course.city}, ${course.region}` : 
      'Approximate location';
    
    marker.bindPopup(`
      <div style="padding: 10px; font-family: 'Inter', sans-serif; max-width: 250px;">
        <h3 style="margin: 0 0 8px 0; color: #008C45; font-size: 16px; font-weight: 600;">${course.name}</h3>
        <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
          <i class="fas fa-university"></i> ${universityName}
        </p>
        <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
          <i class="fas fa-map-marker-alt"></i> ${locationText}
        </p>
        <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
          <i class="fas fa-tag"></i> ${course.field}
        </p>
        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
          <i class="fas fa-language"></i> Language: ${course.language}
        </p>
        <button onclick="selectCourseFromMap('${course.id}')" style="
          background: ${getFieldColor(course.field)};
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          width: 100%;
          font-family: 'Inter', sans-serif;
        ">
          <i class="fas fa-info-circle"></i> View Course
        </button>
      </div>
    `);
    
    marker.addTo(state.courseMarkers);
  });
  
  if (courses.length > 0) {
    const validCourses = courses.filter(c => c.coordinates);
    if (validCourses.length > 0) {
      const bounds = L.latLngBounds(validCourses.map(c => c.coordinates));
      state.map.fitBounds(bounds, { padding: [50, 50] });
    }
  }
}

// ===== VIEW MANAGEMENT =====
function switchView(viewType) {
  state.currentView = viewType;
  
  document.querySelectorAll('.view-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewType);
  });
  
  document.querySelectorAll('.control-group').forEach(group => {
    group.style.display = group.classList.contains(`${viewType}-view`) ? 'flex' : 'none';
  });
  
  document.getElementById('universities-legend').style.display = 
    viewType === 'universities' ? 'block' : 'none';
  document.getElementById('courses-legend').style.display = 
    viewType === 'courses' ? 'block' : 'none';
  
  if (viewType === 'universities') {
    if (state.coursesPanelOpen) closeCoursesPanel();
    updateMapForCurrentView();
  } else {
    if (state.sidebarOpen) closeSidebar();
    if (!state.coursesPanelOpen) openCoursesPanel();
    loadFieldsView();
    updateMapForCurrentView();
  }
}

function updateMapForCurrentView() {
  if (state.currentView === 'universities') {
    state.markersCluster.clearLayers();
    state.courseMarkers.clearLayers();
    renderUniversityMarkers(state.filteredUniversities);
  } else {
    state.markersCluster.clearLayers();
    updateCoursesMap();
  }
}

function updateCoursesMap() {
  state.courseMarkers.clearLayers();
  
  if (state.selectedCourse) {
    renderCourseMarkers([state.selectedCourse]);
    if (state.selectedCourse.coordinates) {
      state.map.setView(state.selectedCourse.coordinates, 12);
    }
  } else if (state.selectedSubfield) {
    const courses = getAllCoursesFromSubfield(state.selectedSubfield);
    renderCourseMarkers(courses);
    zoomToCourses(courses);
  } else if (state.selectedField) {
    const courses = getAllCoursesFromField(state.selectedField);
    renderCourseMarkers(courses);
    zoomToCourses(courses);
  } else {
    const allCourses = getAllCourses();
    renderCourseDensity(allCourses);
  }
}

function getAllCoursesFromSubfield(subfieldId) {
  for (const field of coursesData.fields) {
    const subfield = field.subfields.find(s => s.id === subfieldId);
    if (subfield) return subfield.courses;
  }
  return [];
}

function getAllCoursesFromField(fieldId) {
  const field = coursesData.fields.find(f => f.id === fieldId);
  return field ? field.subfields.flatMap(s => s.courses) : [];
}

function getAllCourses() {
  return coursesData.fields.flatMap(f => 
    f.subfields.flatMap(s => s.courses)
  );
}

function renderCourseDensity(courses) {
  const universityCounts = {};
  
  courses.forEach(course => {
    if (course.coordinates) {
      const key = `${course.coordinates[0]},${course.coordinates[1]}`;
      universityCounts[key] = (universityCounts[key] || 0) + 1;
    }
  });
  
  Object.entries(universityCounts).forEach(([coords, count]) => {
    const [lat, lng] = coords.split(',').map(Number);
    const radius = Math.min(20 + (count * 5), 50);
    
    const circle = L.circle([lat, lng], {
      radius: radius * 100,
      color: CONFIG.colors.italyGreen,
      fillColor: CONFIG.colors.italyGreen,
      fillOpacity: 0.3,
      weight: 2
    });
    
    circle.addTo(state.courseMarkers);
  });
}

function zoomToCourses(courses) {
  const validCourses = courses.filter(c => c.coordinates);
  if (validCourses.length === 0) return;
  
  if (validCourses.length === 1) {
    state.map.setView(validCourses[0].coordinates, 12);
  } else {
    const bounds = L.latLngBounds(validCourses.map(c => c.coordinates));
    state.map.fitBounds(bounds, { padding: [50, 50] });
  }
}

// ===== SIDEBAR & PANEL FUNCTIONS =====
function toggleSidebar() {
  state.sidebarOpen = !state.sidebarOpen;
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-sidebar');
  
  if (state.sidebarOpen) {
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
  if (!state.sidebarOpen) toggleSidebar();
}

function closeSidebar() {
  if (state.sidebarOpen) toggleSidebar();
}

function toggleCoursesPanel() {
  state.coursesPanelOpen = !state.coursesPanelOpen;
  const panel = document.getElementById('courses-panel');
  panel.style.right = state.coursesPanelOpen ? '0' : '-100%';
}

function openCoursesPanel() {
  if (!state.coursesPanelOpen) toggleCoursesPanel();
}

function closeCoursesPanel() {
  if (state.coursesPanelOpen) toggleCoursesPanel();
}

// ===== UNIVERSITIES LIST FUNCTIONS =====
function renderUniversitiesList() {
  const container = document.getElementById('university-list');
  const emptyState = document.getElementById('empty-state');
  const sortValue = document.getElementById('sort-filter').value;
  
  if (state.filteredUniversities.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  
  let html = '';
  if (sortValue === 'region') {
    html = renderGroupedByRegion(state.filteredUniversities);
  } else {
    html = renderSimpleList(state.filteredUniversities);
  }
  
  container.innerHTML = html;
  
  container.querySelectorAll('.university-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
    card.addEventListener('click', () => {
      const universityId = card.dataset.id;
      showUniversityDetails(universityId);
    });
  });
}

function renderSimpleList(universities) {
  return universities.map((uni, index) => `
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
      ${uni.courses && uni.courses.length > 0 ? `
        <div class="course-count" style="margin-top: 5px; font-size: 0.8rem; color: var(--text-tertiary);">
          <i class="fas fa-graduation-cap"></i>
          ${uni.courses.length} master courses
        </div>
      ` : ''}
    </div>
  `).join('');
}

function renderGroupedByRegion(universities) {
  const grouped = {};
  universities.forEach(uni => {
    if (!grouped[uni.region]) grouped[uni.region] = [];
    grouped[uni.region].push(uni);
  });
  
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
              ${uni.courses && uni.courses.length > 0 ? `
                <div class="course-count" style="margin-top: 5px; font-size: 0.8rem; color: var(--text-tertiary);">
                  <i class="fas fa-graduation-cap"></i>
                  ${uni.courses.length} master courses
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
  });
  
  return html;
}

function filterUniversities() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const typeFilter = document.getElementById('type-filter').value;
  const sortBy = document.getElementById('sort-filter').value;
  
  let filtered = [...universities];
  
  if (searchTerm) {
    filtered = filtered.filter(uni =>
      uni.name.toLowerCase().includes(searchTerm) ||
      uni.city.toLowerCase().includes(searchTerm) ||
      uni.region.toLowerCase().includes(searchTerm)
    );
  }
  
  if (typeFilter !== 'all') {
    filtered = filtered.filter(uni => uni.type === typeFilter);
  }
  
  if (state.selectedRegion) {
    filtered = filtered.filter(uni => uni.region === state.selectedRegion);
  }
  
  switch(sortBy) {
    case 'founded':
      filtered.sort((a, b) => a.founded - b.founded);
      break;
    case 'region':
      filtered.sort((a, b) => a.region.localeCompare(b.region));
      break;
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  state.filteredUniversities = filtered;
  renderUniversitiesList();
  renderUniversityMarkers(filtered);
  updateResultsCount();
}

function filterUniversitiesByRegion(region) {
  state.selectedRegion = region;
  document.getElementById('sidebar-title').textContent = `${region} Universities`;
  filterUniversities();
}

function updateResultsCount() {
  const total = universities.length;
  const current = state.filteredUniversities.length;
  document.getElementById('results-count').textContent = 
    current === total ? `${total} universities` : `${current} of ${total} universities`;
}

// ===== COURSES VIEW FUNCTIONS =====
function loadFieldsView() {
  state.coursesViewMode = 'fields';
  state.selectedField = null;
  state.selectedSubfield = null;
  state.selectedCourse = null;
  
  document.getElementById('fields-list').style.display = 'grid';
  document.getElementById('subfields-list').style.display = 'none';
  document.getElementById('courses-list').style.display = 'none';
  document.getElementById('courses-empty-state').style.display = 'none';
  
  const fieldsList = document.getElementById('fields-list');
  fieldsList.innerHTML = coursesData.fields.map(field => `
    <div class="field-card" data-field-id="${field.id}">
      <div class="field-icon" style="background: ${field.color}; color: white;">
        <i class="${field.icon}"></i>
      </div>
      <h3>${field.name}</h3>
      <p style="color: var(--text-tertiary); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">
        Explore ${field.subfields.reduce((total, subfield) => total + subfield.courses.length, 0)} master courses
      </p>
      <div class="field-stats">
        <span class="field-stat">
          <i class="fas fa-graduation-cap"></i>
          ${field.subfields.length} subfields
        </span>
      </div>
    </div>
  `).join('');
  
  fieldsList.querySelectorAll('.field-card').forEach(card => {
    card.addEventListener('click', () => selectField(card.dataset.fieldId));
  });
  
  updateBreadcrumb('field', 'All Fields');
  updateCoursesCount();
}

function selectField(fieldId) {
  const field = coursesData.fields.find(f => f.id === fieldId);
  if (!field) return;
  
  state.selectedField = field;
  state.selectedSubfield = null;
  state.selectedCourse = null;
  state.coursesViewMode = 'subfields';
  
  document.getElementById('fields-list').style.display = 'none';
  document.getElementById('subfields-list').style.display = 'flex';
  document.getElementById('courses-list').style.display = 'none';
  
  const subfieldsList = document.getElementById('subfields-list');
  subfieldsList.innerHTML = field.subfields.map(subfield => `
    <div class="subfield-card" data-subfield-id="${subfield.id}">
      <h4>${subfield.name}</h4>
      <div class="course-count">
        <i class="fas fa-graduation-cap"></i>
        ${subfield.courses.length} courses available
      </div>
    </div>
  `).join('');
  
  subfieldsList.querySelectorAll('.subfield-card').forEach(card => {
    card.addEventListener('click', () => selectSubfield(card.dataset.subfieldId));
  });
  
  updateBreadcrumb('field', field.name);
  updateBreadcrumb('subfield', 'Select Subfield');
  updateMapForCurrentView();
}

function selectSubfield(subfieldId) {
  if (!state.selectedField) return;
  
  const subfield = state.selectedField.subfields.find(s => s.id === subfieldId);
  if (!subfield) return;
  
  state.selectedSubfield = subfield;
  state.selectedCourse = null;
  state.coursesViewMode = 'courses';
  
  document.getElementById('subfields-list').style.display = 'none';
  document.getElementById('courses-list').style.display = 'flex';
  
  filterCoursesForList(subfield.courses);
  
  updateBreadcrumb('subfield', subfield.name);
  updateBreadcrumb('course', 'Select Course');
  updateMapForCurrentView();
}

function filterCoursesForList(courses) {
  const searchTerm = document.getElementById('course-search').value.toLowerCase();
  const fieldFilter = document.getElementById('field-filter').value;
  const languageFilter = document.getElementById('language-filter').value;
  
  let filtered = [...courses];
  
  if (searchTerm) {
    filtered = filtered.filter(course =>
      course.name.toLowerCase().includes(searchTerm) ||
      course.university.toLowerCase().includes(searchTerm) ||
      (course.exactUniversityName && course.exactUniversityName.toLowerCase().includes(searchTerm))
    );
  }
  
  if (fieldFilter !== 'all' && !state.selectedField) {
    filtered = filtered.filter(course => {
      const field = coursesData.fields.find(f => f.id === fieldFilter);
      return field && course.field === field.name;
    });
  }
  
  if (languageFilter !== 'all') {
    filtered = filtered.filter(course => course.language === languageFilter);
  }
  
  state.filteredCourses = filtered;
  
  const coursesList = document.getElementById('courses-list');
  const emptyState = document.getElementById('courses-empty-state');
  
  if (filtered.length === 0) {
    coursesList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    coursesList.innerHTML = filtered.map((course, index) => `
      <div class="course-card" data-course-id="${course.id}" style="animation-delay: ${index * 0.05}s">
        <h4>${course.name}</h4>
        <div class="university-name">
          <i class="fas fa-university"></i>
          ${course.exactUniversityName || course.university}
        </div>
        <div class="course-meta">
          <span class="course-duration">
            <i class="fas fa-clock"></i>
            ${course.duration}
          </span>
          <span class="course-language language-${course.language.toLowerCase()}">
            ${course.language}
          </span>
        </div>
        ${course.city && course.city !== 'Unknown (approximate location)' ? `
          <div class="location-info" style="font-size: 0.8rem; color: var(--text-tertiary); margin-top: 5px;">
            <i class="fas fa-map-marker-alt"></i>
            ${course.city}, ${course.region}
          </div>
        ` : ''}
      </div>
    `).join('');
    
    coursesList.querySelectorAll('.course-card').forEach(card => {
      card.addEventListener('click', () => selectCourse(card.dataset.courseId));
    });
  }
}

function selectCourse(courseId) {
  const course = state.filteredCourses.find(c => c.id === courseId);
  if (!course) return;
  
  state.selectedCourse = course;
  updateBreadcrumb('course', course.name.substring(0, 30) + (course.name.length > 30 ? '...' : ''));
  showCourseDetailsModal(course);
  updateMapForCurrentView();
}

function filterCourses() {
  if (state.coursesViewMode === 'fields') {
    const searchTerm = document.getElementById('course-search').value.toLowerCase();
    const fieldFilter = document.getElementById('field-filter').value;
    
    const fieldsList = document.getElementById('fields-list');
    const emptyState = document.getElementById('courses-empty-state');
    
    let fieldsToShow = coursesData.fields;
    
    if (fieldFilter !== 'all') {
      fieldsToShow = fieldsToShow.filter(field => field.id === fieldFilter);
    }
    
    if (searchTerm) {
      fieldsToShow = fieldsToShow.filter(field =>
        field.name.toLowerCase().includes(searchTerm) ||
        field.subfields.some(subfield =>
          subfield.name.toLowerCase().includes(searchTerm) ||
          subfield.courses.some(course =>
            course.name.toLowerCase().includes(searchTerm) ||
            course.university.toLowerCase().includes(searchTerm) ||
            (course.exactUniversityName && course.exactUniversityName.toLowerCase().includes(searchTerm))
          )
        )
      );
    }
    
    if (fieldsToShow.length === 0) {
      fieldsList.style.display = 'none';
      emptyState.style.display = 'block';
    } else {
      fieldsList.style.display = 'grid';
      emptyState.style.display = 'none';
      fieldsList.innerHTML = fieldsToShow.map(field => `
        <div class="field-card" data-field-id="${field.id}">
          <div class="field-icon" style="background: ${field.color}; color: white;">
            <i class="${field.icon}"></i>
          </div>
          <h3>${field.name}</h3>
          <p style="color: var(--text-tertiary); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">
            Explore ${field.subfields.reduce((total, subfield) => total + subfield.courses.length, 0)} master courses
          </p>
          <div class="field-stats">
            <span class="field-stat">
              <i class="fas fa-graduation-cap"></i>
              ${field.subfields.length} subfields
            </span>
          </div>
        </div>
      `).join('');
      
      fieldsList.querySelectorAll('.field-card').forEach(card => {
        card.addEventListener('click', () => selectField(card.dataset.fieldId));
      });
    }
  } else if (state.coursesViewMode === 'subfields' && state.selectedField) {
    const searchTerm = document.getElementById('course-search').value.toLowerCase();
    
    const subfieldsList = document.getElementById('subfields-list');
    const emptyState = document.getElementById('courses-empty-state');
    
    let subfieldsToShow = state.selectedField.subfields;
    
    if (searchTerm) {
      subfieldsToShow = subfieldsToShow.filter(subfield =>
        subfield.name.toLowerCase().includes(searchTerm) ||
        subfield.courses.some(course =>
          course.name.toLowerCase().includes(searchTerm) ||
          course.university.toLowerCase().includes(searchTerm) ||
          (course.exactUniversityName && course.exactUniversityName.toLowerCase().includes(searchTerm))
        )
      );
    }
    
    if (subfieldsToShow.length === 0) {
      subfieldsList.style.display = 'none';
      emptyState.style.display = 'block';
    } else {
      subfieldsList.style.display = 'flex';
      emptyState.style.display = 'none';
      subfieldsList.innerHTML = subfieldsToShow.map(subfield => `
        <div class="subfield-card" data-subfield-id="${subfield.id}">
          <h4>${subfield.name}</h4>
          <div class="course-count">
            <i class="fas fa-graduation-cap"></i>
            ${subfield.courses.length} courses available
          </div>
        </div>
      `).join('');
      
      subfieldsList.querySelectorAll('.subfield-card').forEach(card => {
        card.addEventListener('click', () => selectSubfield(card.dataset.subfieldId));
      });
    }
  } else if (state.coursesViewMode === 'courses' && state.selectedSubfield) {
    filterCoursesForList(state.selectedSubfield.courses);
  }
  
  updateMapForCurrentView();
}

function updateBreadcrumb(level, text) {
  const breadcrumb = document.getElementById(`breadcrumb-${level}`);
  if (breadcrumb) {
    breadcrumb.textContent = text;
    breadcrumb.disabled = false;
    
    const levels = ['field', 'subfield', 'course'];
    const currentIndex = levels.indexOf(level);
    
    for (let i = currentIndex + 1; i < levels.length; i++) {
      const nextBreadcrumb = document.getElementById(`breadcrumb-${levels[i]}`);
      if (nextBreadcrumb) {
        nextBreadcrumb.textContent = levels[i].charAt(0).toUpperCase() + levels[i].slice(1);
        nextBreadcrumb.disabled = true;
      }
    }
  }
}

function updateCoursesCount() {
  document.getElementById('courses-count').textContent = 
    `${coursesData.stats.total_courses} master courses`;
}

function resetCoursesView() {
  document.getElementById('course-search').value = '';
  document.getElementById('field-filter').value = 'all';
  document.getElementById('language-filter').value = 'all';
  
  resetBreadcrumb();
  state.selectedField = null;
  state.selectedSubfield = null;
  state.selectedCourse = null;
  state.coursesViewMode = 'fields';
  
  loadFieldsView();
  updateMapForCurrentView();
}

function resetBreadcrumb() {
  document.querySelectorAll('.breadcrumb-item').forEach(item => {
    if (item.dataset.level === 'field') {
      item.textContent = 'All Fields';
      item.disabled = false;
    } else {
      item.textContent = item.dataset.level.charAt(0).toUpperCase() + item.dataset.level.slice(1);
      item.disabled = true;
    }
  });
}

// ===== MODAL FUNCTIONS =====
function showUniversityDetails(universityId) {
  const university = universities.find(u => u.id === universityId);
  if (!university) return;
  
  document.getElementById('modal-name').textContent = university.name;
  document.getElementById('modal-city').textContent = university.city;
  document.getElementById('modal-region').textContent = university.region;
  document.getElementById('modal-region-full').textContent = university.region;
  document.getElementById('modal-founded').textContent = university.founded;
  document.getElementById('modal-year').textContent = `Est. ${university.founded}`;
  
  const typeElement = document.getElementById('modal-type');
  typeElement.textContent = university.type.charAt(0).toUpperCase() + university.type.slice(1);
  typeElement.className = 'university-type';
  
  if (university.type === 'university') {
    typeElement.style.background = 'rgba(52, 199, 89, 0.2)';
  } else if (university.type === 'polytechnic') {
    typeElement.style.background = 'rgba(10, 132, 255, 0.2)';
  } else {
    typeElement.style.background = 'rgba(255, 159, 10, 0.2)';
  }
  
  document.getElementById('modal-type-full').textContent = 
    university.type === 'university' ? 'University' : 
    university.type === 'polytechnic' ? 'Polytechnic' : 'Special Statute';
  
  document.getElementById('modal-description').textContent = university.description;
  document.getElementById('modal-website').href = university.website;
  
  const coursesSection = document.querySelector('.modal-courses');
  const coursesList = document.getElementById('modal-courses-list');
  
  if (university.courses && university.courses.length > 0) {
    coursesSection.style.display = 'block';
    coursesList.innerHTML = university.courses.map(course => `
      <div class="modal-course-item">
        <h4>${course.name}</h4>
        <div>
          <span class="course-field-badge" style="background: ${getFieldColor(course.field)}; color: white;">
            ${course.field.split(' – ')[0]}
          </span>
          <span style="color: var(--text-tertiary); font-size: 0.85rem;">
            <i class="fas fa-clock"></i> ${course.duration} • 
            <i class="fas fa-language"></i> ${course.language}
          </span>
        </div>
      </div>
    `).join('');
  } else {
    coursesSection.style.display = 'none';
  }
  
  document.getElementById('university-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function showCourseDetailsModal(course) {
  // Find the exact university if linked
  const university = universities.find(u => u.id === course.universityId);
  const universityName = university ? university.name : course.exactUniversityName || course.university;
  const locationText = university ? `${university.city}, ${university.region}` : 
    (course.city && course.region ? `${course.city}, ${course.region}` : 'Location information not available');
  
  document.getElementById('course-name').textContent = course.name;
  document.getElementById('course-university').textContent = universityName;
  document.getElementById('course-location').textContent = locationText;
  document.getElementById('course-duration').textContent = course.duration;
  document.getElementById('course-lang').textContent = course.language;
  document.getElementById('course-degree').textContent = course.courseType;
  
  const fieldElement = document.getElementById('course-field');
  fieldElement.textContent = course.field;
  fieldElement.style.background = getFieldColor(course.field);
  
  document.getElementById('course-language').textContent = course.language;
  
  // Enhanced description
  let description = `This ${course.duration.toLowerCase()} ${course.courseType} program in ${course.subfield} `;
  
  if (university) {
    description += `is offered by ${university.name} in ${university.city}, ${university.region}. `;
    description += `Founded in ${university.founded}, this university ${university.description.toLowerCase()}. `;
  } else {
    description += `is offered by ${course.university}. `;
    if (course.city && course.city !== 'Unknown (approximate location)') {
      description += `Located in ${course.city}, ${course.region}. `;
    }
  }
  
  description += course.language === 'English' ? 
    'The program is taught entirely in English, making it accessible to international students.' : 
    course.language === 'Italian' ? 
    'The program is taught in Italian, providing immersion in the local language and culture.' :
    'The program offers courses in both English and Italian.';
  
  if (!university) {
    description += ' (Note: University location is approximate based on city name matching.)';
  }
  
  document.getElementById('course-description').textContent = description;
  
  // Update website link
  const websiteBtn = document.getElementById('course-website');
  if (university && university.website) {
    websiteBtn.href = university.website;
    websiteBtn.style.display = 'flex';
  } else {
    websiteBtn.href = '#';
    websiteBtn.style.display = 'flex';
  }
  
  // Update locate button visibility
  const locateBtn = document.getElementById('course-locate-university');
  if (course.coordinates) {
    locateBtn.style.display = 'flex';
  } else {
    locateBtn.style.display = 'none';
  }
  
  document.getElementById('course-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function locateUniversityOnMap() {
  const universityName = document.getElementById('modal-name').textContent;
  const university = universities.find(u => u.name === universityName);
  if (!university || !state.map) return;
  
  state.map.setView([university.lat, university.lng], 14);
  document.getElementById('university-modal').style.display = 'none';
  document.body.style.overflow = '';
  
  state.markersCluster.eachLayer(layer => {
    if (layer.getLatLng().lat === university.lat && layer.getLatLng().lng === university.lng) {
      layer.openPopup();
    }
  });
}

function locateCourseUniversity() {
  if (!state.selectedCourse || !state.selectedCourse.coordinates || !state.map) return;
  
  state.map.setView(state.selectedCourse.coordinates, 14);
  document.getElementById('course-modal').style.display = 'none';
  document.body.style.overflow = '';
  
  // Highlight the course marker
  state.courseMarkers.eachLayer(layer => {
    if (layer.getLatLng().lat === state.selectedCourse.coordinates[0] && 
        layer.getLatLng().lng === state.selectedCourse.coordinates[1]) {
      layer.openPopup();
    }
  });
}

function showSimilarCourses() {
  if (!state.selectedCourse) return;
  
  const similarCourses = [];
  coursesData.fields.forEach(field => {
    field.subfields.forEach(subfield => {
      if (subfield.name === state.selectedCourse.subfield) {
        subfield.courses.forEach(course => {
          if (course.id !== state.selectedCourse.id) {
            similarCourses.push(course);
          }
        });
      }
    });
  });
  
  state.selectedSubfield = {
    id: 'similar-courses',
    name: `Similar to: ${state.selectedCourse.name}`,
    courses: similarCourses
  };
  
  state.coursesViewMode = 'courses';
  document.getElementById('subfields-list').style.display = 'none';
  document.getElementById('courses-list').style.display = 'flex';
  
  filterCoursesForList(similarCourses);
  
  updateBreadcrumb('subfield', `Similar Courses (${similarCourses.length})`);
  updateBreadcrumb('course', 'Select Course');
  
  updateMapForCurrentView();
  
  document.getElementById('course-modal').style.display = 'none';
  document.body.style.overflow = '';
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // View toggles
  document.getElementById('view-universities').addEventListener('click', () => switchView('universities'));
  document.getElementById('view-courses').addEventListener('click', () => switchView('courses'));
  
  // Universities view
  document.getElementById('search-input').addEventListener('input', debounce(filterUniversities, 300));
  document.getElementById('clear-search').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    filterUniversities();
  });
  
  document.getElementById('type-filter').addEventListener('change', filterUniversities);
  document.getElementById('sort-filter').addEventListener('change', filterUniversities);
  
  document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
  document.getElementById('sidebar-close').addEventListener('click', closeSidebar);
  
  // Courses view
  document.getElementById('clear-course-search').addEventListener('click', () => {
    document.getElementById('course-search').value = '';
    filterCourses();
  });
  
  document.getElementById('reset-courses').addEventListener('click', resetCoursesView);
  document.getElementById('courses-close').addEventListener('click', closeCoursesPanel);
  
  document.getElementById('field-filter').addEventListener('change', filterCourses);
  document.getElementById('language-filter').addEventListener('change', filterCourses);
  document.getElementById('course-search').addEventListener('input', debounce(filterCourses, 300));
  
  // Breadcrumb
  document.querySelectorAll('.breadcrumb-item').forEach(item => {
    item.addEventListener('click', () => {
      if (!item.disabled) {
        handleBreadcrumbClick(item.dataset.level);
      }
    });
  });
  
  // Reset buttons
  document.getElementById('reset-view').addEventListener('click', resetAll);
  document.getElementById('reset-filters').addEventListener('click', resetAll);
  document.getElementById('reset-filters-empty').addEventListener('click', resetAll);
  document.getElementById('reset-courses-filters').addEventListener('click', resetCoursesView);
  document.getElementById('reset-courses-filters-empty').addEventListener('click', resetCoursesView);
  
  // Modals
  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('university-modal').style.display = 'none';
    document.body.style.overflow = '';
  });
  
  document.querySelector('#university-modal .modal-overlay').addEventListener('click', () => {
    document.getElementById('university-modal').style.display = 'none';
    document.body.style.overflow = '';
  });
  
  document.getElementById('modal-locate').addEventListener('click', locateUniversityOnMap);
  
  document.getElementById('course-modal-close').addEventListener('click', () => {
    document.getElementById('course-modal').style.display = 'none';
    document.body.style.overflow = '';
  });
  
  document.querySelector('#course-modal .modal-overlay').addEventListener('click', () => {
    document.getElementById('course-modal').style.display = 'none';
    document.body.style.overflow = '';
  });
  
  document.getElementById('course-locate-university').addEventListener('click', locateCourseUniversity);
  document.getElementById('course-show-similar').addEventListener('click', showSimilarCourses);
  
  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (document.getElementById('university-modal').style.display === 'flex') {
        document.getElementById('university-modal').style.display = 'none';
        document.body.style.overflow = '';
      }
      if (document.getElementById('course-modal').style.display === 'flex') {
        document.getElementById('course-modal').style.display = 'none';
        document.body.style.overflow = '';
      }
    }
  });
  
  // Back to top
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Explore button
  document.getElementById('explore-btn')?.addEventListener('click', () => {
    document.querySelector('.map-section')?.scrollIntoView({ behavior: 'smooth' });
  });
  
  // Mobile click outside
  if (window.innerWidth <= 768) {
    document.addEventListener('click', (e) => {
      const sidebar = document.getElementById('sidebar');
      const coursesPanel = document.getElementById('courses-panel');
      const toggleBtn = document.getElementById('toggle-sidebar');
      
      if (state.sidebarOpen && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeSidebar();
      }
      
      if (state.coursesPanelOpen && !coursesPanel.contains(e.target)) {
        closeCoursesPanel();
      }
    });
  }
}

function handleBreadcrumbClick(level) {
  switch(level) {
    case 'field':
      loadFieldsView();
      break;
    case 'subfield':
      if (state.selectedField) {
        selectField(state.selectedField.id);
      }
      break;
    case 'course':
      if (state.selectedSubfield) {
        selectSubfield(state.selectedSubfield.id);
      }
      break;
  }
}

function selectCourseFromMap(courseId) {
  let foundCourse = null;
  
  for (const field of coursesData.fields) {
    for (const subfield of field.subfields) {
      const course = subfield.courses.find(c => c.id === courseId);
      if (course) {
        foundCourse = course;
        break;
      }
    }
    if (foundCourse) break;
  }
  
  if (foundCourse) {
    state.selectedCourse = foundCourse;
    showCourseDetailsModal(foundCourse);
  }
}

function resetAll() {
  // Reset map
  state.map.setView(CONFIG.map.center, CONFIG.map.zoom);
  
  // Reset universities view
  document.getElementById('search-input').value = '';
  document.getElementById('type-filter').value = 'all';
  document.getElementById('sort-filter').value = 'name';
  document.getElementById('sidebar-title').textContent = 'Italian Universities';
  
  state.selectedRegion = null;
  state.filteredUniversities = [...universities];
  
  filterUniversities();
  
  if (window.innerWidth <= 768) {
    closeSidebar();
  }
}

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

// ===== GLOBAL EXPORTS =====
window.showUniversityDetails = showUniversityDetails;
window.selectCourseFromMap = selectCourseFromMap;
window.handleBreadcrumbClick = handleBreadcrumbClick;

// ===== INITIALIZE =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}