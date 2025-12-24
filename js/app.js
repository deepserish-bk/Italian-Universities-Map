// ===== ITALIAN UNIVERSITIES & COURSES - RESTRUCTURED APP =====

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
    tourism: '#64D2FF',
    bachelorStem: '#5AC8FA',
    bachelorBusiness: '#FF9500',
    bachelorHumanities: '#FF2D55'
  },
  courseTypes: {
    masters: {
      name: 'Master',
      icon: 'fa-graduation-cap',
      duration: '2 years',
      degree: 'Masters',
      legendId: 'masters-legend'
    },
    bachelors: {
      name: 'Bachelor',
      icon: 'fa-book-open',
      duration: '3 years',
      degree: 'Bachelors',
      legendId: 'bachelors-legend'
    }
  }
};

// ===== SECURITY & PERFORMANCE HELPERS =====
class SecurityHelper {
  static sanitizeHTML(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  static escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

class PerformanceHelper {
  static debounce(func, wait) {
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
  
  static memoize(fn) {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  }
}

// Cache for field colors to avoid recreating objects
const fieldColorCache = new Map();

// ===== DATA MANAGER =====
class DataManager {
  constructor() {
    this.universities = [];
    this.courses = {
      masters: { fields: [], stats: { total_courses: 0, total_fields: 0, total_subfields: 0 } },
      bachelors: { fields: [], stats: { total_courses: 0, total_fields: 0, total_subfields: 0 } }
    };
    
    this.universityNameMapping = {
      // University of Bologna variations
      "University of Bologna": "Università di Bologna",
      "University degli Studi di BOLOGNA": "Università di Bologna",
      "University Of Bologna": "Università di Bologna",
      "University Of Bologna - Revenna Campus": "Università di Bologna",
      "University Of Bologna - Rimini Campus": "Università di Bologna",
      "University Of Bologna - Forli Campus": "Università di Bologna",
      
      // Politecnico di Milano variations
      "Politecnico di MILANO": "Politecnico di Milano",
      
      // University of Padova variations
      "University of Padova": "Università degli Studi di Padova",
      
      // University of Sapienza variations
      "University of Sapienza": "Università degli Studi di Roma 'La Sapienza'",
      "University degli Studi di ROMA \"La Sapienza\"": "Università degli Studi di Roma 'La Sapienza'",
      "Sapienza University of Rome": "Università degli Studi di Roma 'La Sapienza'",
      
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
      "University Of Milan": "Università degli Studi di Milano",
      
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
      "University Of Camerino": "Università degli Studi di Camerino",
      
      // University of Insubria variations
      "University of Insubria": "Università degli Studi dell'Insubria",
      
      // University of Calabria variations
      "University of Calabria": "Università della Calabria",
      
      // University of Catania variations
      "University of Catania": "Università degli Studi di Catania",
      "University gli Studi di CATANIA": "Università degli Studi di Catania",
      
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
      "University gli Studi di FERRARA": "Università degli Studi di Ferrara",
      
      // University of Perugia variations
      "University of Perugia": "Università degli Studi di Perugia",
      
      // University of Cassino variations
      "University of Cassino": "Università degli Studi di Cassino e del Lazio Meridionale",
      
      // University of Tuscia variations
      "University of Tuscia": "Università degli Studi della Tuscia",
      
      // University of Salento variations
      "University del SALENTO": "Università del Salento",
      
      // University of Bari variations
      "University gli Studi di BARI ALDO MORO": "Università degli Studi di Bari Aldo Moro",
      "Polytechnic University of Bari": "Politecnico di Bari",
      
      // University of Rome "Tor Vergata" variations
      "University of Rome \"Tor Vergata\"": "Università degli Studi di Roma 'Tor Vergata'",
      "University gli Studi di ROMA \"Tor Vergata\"": "Università degli Studi di Roma 'Tor Vergata'",
      "Tor Vergata University of Rome": "Università degli Studi di Roma 'Tor Vergata'",
      
      // University of Naples variations
      "University of Naples Federico II": "Università degli Studi di Napoli Federico II",
      "University gli Studi di Napoli Federico II": "Università degli Studi di Napoli Federico II",
      "University gli Studi di NAPOLI \"Parthenope\"": "Università degli Studi di Napoli 'Parthenope'",
      
      // University of Salerno variations
      "University gli Studi di SALERNO": "Università degli Studi di Salerno",

      //Univeersity of Messina Variations
      "University of Messina": "Università degli Study di Messina",
      
      // University of Teramo variations
      "University gli Studi di TERAMO": "Università degli Studi di Teramo",
      
      // University of Sassari variations
      "University gli Studi di SASSARI": "Università degli Studi di Sassari",
      
      // University of Cagliari variations
      "University gli Studi di CAGLIARI": "Università degli Studi di Cagliari",
      
      // University of Aquila variations
      "University gli Studi dell'AQUILA": "Università degli Studi dell'Aquila",
      
      // University of Brescia variations
      "University gli Studi di BRESCIA": "Università degli Studi di Brescia",
      
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
      
      // University of Campania variations
      "University of Campania": "Università degli Studi della Campania 'Luigi Vanvitelli'"
    };
    
    this.cityCoordinates = {
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
      'Revenna': [44.4184, 12.2035],
      'Rimini': [44.0596, 12.5684],
      'Forli': [44.2227, 12.0408]
    };
  }

  // Load universities data
  loadUniversities() {
    this.universities = [
      { 
        id: "aquila", 
        name: "Università degli Studi dell'Aquila", 
        city: "L'Aquila", 
        region: "Abruzzo", 
        type: "university", 
        founded: 1952, 
        website: "https://www.univaq.it", 
        lat: 42.3499, 
        lng: 13.3995, 
        description: "A public research university located in L'Aquila, offering programs in sciences, engineering, medicine, and humanities.",
        apply_link: "" // University of L'Aquila - empty
      },
      { 
        id: "teramo", 
        name: "Università degli Studi di Teramo", 
        city: "Teramo", 
        region: "Abruzzo", 
        type: "university", 
        founded: 1993, 
        website: "https://www.unite.it", 
        lat: 42.6589, 
        lng: 13.7044, 
        description: "A modern university focusing on agricultural, veterinary, and legal sciences in the Abruzzo region.",
        apply_link: "" // University of Teramo - Send email to program coordinator / Direct Pre Enrollment on Universitaly
      },
      { 
        id: "bari", 
        name: "Università degli Studi di Bari Aldo Moro", 
        city: "Bari", 
        region: "Apulia", 
        type: "university", 
        founded: 1925, 
        website: "https://www.uniba.it", 
        lat: 41.1171, 
        lng: 16.8719, 
        description: "One of the most important universities in Southern Italy, named after former Prime Minister Aldo Moro.",
        apply_link: "" // University of Bari Aldo Moro - empty
      },
      { 
        id: "poliba", 
        name: "Politecnico di Bari", 
        city: "Bari", 
        region: "Apulia", 
        type: "polytechnic", 
        founded: 1990, 
        website: "https://www.poliba.it", 
        lat: 41.1075, 
        lng: 16.8782, 
        description: "The technical university of Apulia, specializing in engineering and architecture.",
        apply_link: "" // Polytechnic University of Bari - empty
      },
      { 
        id: "foggia", 
        name: "Università degli Studi di Foggia", 
        city: "Foggia", 
        region: "Apulia", 
        type: "university", 
        founded: 1991, 
        website: "https://www.unifg.it", 
        lat: 41.4612, 
        lng: 15.5448, 
        description: "A young university in the northern part of Apulia, with strong programs in agriculture and medicine.",
        apply_link: "" // University of Foggia - Send email to program coordinator
      },
      { 
        id: "salento", 
        name: "Università del Salento", 
        city: "Lecce", 
        region: "Apulia", 
        type: "university", 
        founded: 1955, 
        website: "https://www.unisalento.it", 
        lat: 40.3541, 
        lng: 18.1698, 
        description: "Located in the heel of Italy's boot, known for its programs in humanities, sciences, and engineering.",
        apply_link: "" // University of Salento - Direct Pre Enrollment on Universitaly
      },
      { 
        id: "basilicata", 
        name: "Università degli Studi della Basilicata", 
        city: "Potenza/Matera", 
        region: "Basilicata", 
        type: "university", 
        founded: 1982, 
        website: "https://www.unibas.it", 
        lat: 40.6401, 
        lng: 15.8027, 
        description: "The main university of Basilicata, with campuses in Potenza and the UNESCO World Heritage city of Matera.",
        apply_link: "" // University of Basilicata - empty
      },
      { 
        id: "calabria", 
        name: "Università della Calabria", 
        city: "Arcavacata di Rende", 
        region: "Calabria", 
        type: "university", 
        founded: 1972, 
        website: "https://www.unical.it", 
        lat: 39.3633, 
        lng: 16.2284, 
        description: "A campus university near Cosenza, known for its modern architecture and comprehensive academic offerings.",
        apply_link: "" // University of Calabria - empty
      },
      { 
        id: "reggiocalabria", 
        name: "Università Mediterranea di Reggio Calabria", 
        city: "Reggio Calabria", 
        region: "Calabria", 
        type: "university", 
        founded: 1997, 
        website: "https://www.unirc.it", 
        lat: 38.1118, 
        lng: 15.6470, 
        description: "Focuses on Mediterranean studies, with strong programs in architecture, engineering, and agriculture.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "catanzaro", 
        name: "Università degli Studi di Catanzaro 'Magna Græcia'", 
        city: "Catanzaro", 
        region: "Calabria", 
        type: "university", 
        founded: 1998, 
        website: "https://www.unicz.it", 
        lat: 38.9026, 
        lng: 16.5871, 
        description: "A medical-focused university named after the ancient Greek colonization of Southern Italy.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "unina", 
        name: "Università degli Studi di Napoli Federico II", 
        city: "Naples", 
        region: "Campania", 
        type: "university", 
        founded: 1224, 
        website: "https://www.unina.it", 
        lat: 40.8485, 
        lng: 14.2621, 
        description: "One of the oldest universities in the world and the oldest public non-sectarian university.",
        apply_link: "" // University of Naples Federico II - Send email to program coordinator / Direct Pre Enrollment on Universitaly
      },
      { 
        id: "lorientale", 
        name: "Università degli Studi di Napoli 'L'Orientale'", 
        city: "Naples", 
        region: "Campania", 
        type: "university", 
        founded: 1732, 
        website: "https://www.unior.it", 
        lat: 40.8459, 
        lng: 14.2507, 
        description: "The oldest school of Sinology and Oriental Studies in Europe, now a comprehensive university.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "parthenope", 
        name: "Università degli Studi di Napoli 'Parthenope'", 
        city: "Naples", 
        region: "Campania", 
        type: "university", 
        founded: 1920, 
        website: "https://www.uniparthenope.it", 
        lat: 40.8389, 
        lng: 14.2525, 
        description: "Named after the ancient Greek name for Naples, specializing in economics, engineering, and sports sciences.",
        apply_link: "" // University of Naples Parthenope - Direct Pre Enrollment on Universitaly
      },
      { 
        id: "salerno", 
        name: "Università degli Studi di Salerno", 
        city: "Salerno", 
        region: "Campania", 
        type: "university", 
        founded: 1968, 
        website: "https://www.unisa.it", 
        lat: 40.6773, 
        lng: 14.7775, 
        description: "A modern campus university with strong research programs in sciences, engineering, and humanities.",
        apply_link: "" // University of Salerno - Direct Pre Enrollment on Universitaly
      },
      { 
        id: "vanvitelli", 
        name: "Università degli Studi della Campania 'Luigi Vanvitelli'", 
        city: "Naples/Caserta", 
        region: "Campania", 
        type: "university", 
        founded: 1991, 
        website: "https://www.unicampania.it", 
        lat: 41.0836, 
        lng: 14.3308, 
        description: "Named after the famous architect, with campuses in Naples and Caserta, focusing on multidisciplinary studies.",
        apply_link: "" // University of Campania Luigi Vanvitelli - Direct Pre Enrollment on Universitaly
      },
      { 
        id: "suororsola", 
        name: "Università degli Studi di Napoli 'Suor Orsola Benincasa'", 
        city: "Naples", 
        region: "Campania", 
        type: "special", 
        founded: 1895, 
        website: "https://www.unisob.na.it", 
        lat: 40.8463, 
        lng: 14.2432, 
        description: "A unique university with roots in a 16th-century monastery, now offering humanities and education programs.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "unibo", 
        name: "Università di Bologna", 
        city: "Bologna", 
        region: "Emilia-Romagna", 
        type: "university", 
        founded: 1088, 
        website: "https://www.unibo.it", 
        lat: 44.4961, 
        lng: 11.3532, 
        description: "The oldest university in continuous operation in the world, and one of the most prestigious academic institutions in Italy.",
        apply_link: "" // University of Bologna - empty
      },
      { 
        id: "ferrara", 
        name: "Università degli Studi di Ferrara", 
        city: "Ferrara", 
        region: "Emilia-Romagna", 
        type: "university", 
        founded: 1391, 
        website: "https://www.unife.it", 
        lat: 44.8378, 
        lng: 11.6198, 
        description: "Founded by the Este family, known for its research in sciences, engineering, and medicine.",
        apply_link: "https://apply.unife.it/"
      },
      { 
        id: "unimore", 
        name: "Università degli Studi di Modena e Reggio Emilia", 
        city: "Modena/Reggio Emilia", 
        region: "Emilia-Romagna", 
        type: "university", 
        founded: 1175, 
        website: "https://www.unimore.it", 
        lat: 44.6471, 
        lng: 10.9256, 
        description: "One of the oldest universities in Italy, with strong programs in engineering, economics, and life sciences.",
        apply_link: "https://www.esse3.unimore.it/AddressBook/IndirizziSubmit.do"
      },
      { 
        id: "parma", 
        name: "Università degli Studi di Parma", 
        city: "Parma", 
        region: "Emilia-Romagna", 
        type: "university", 
        founded: 962, 
        website: "https://www.unipr.it", 
        lat: 44.8012, 
        lng: 10.3284, 
        description: "Traces its origins to a cathedral school, now a comprehensive university with international recognition.",
        apply_link: "https://www.idem.unipr.it/"
      },
      { 
        id: "trieste", 
        name: "Università degli Studi di Trieste", 
        city: "Trieste", 
        region: "Friuli-Venezia Giulia", 
        type: "university", 
        founded: 1924, 
        website: "https://www.units.it", 
        lat: 45.6536, 
        lng: 13.7784, 
        description: "Located at the crossroads of Latin, Slavic, and Germanic cultures, with strong international focus.",
        apply_link: "https://apply.units.it/"
      },
      { 
        id: "udine", 
        name: "Università degli Studi di Udine", 
        city: "Udine", 
        region: "Friuli-Venezia Giulia", 
        type: "university", 
        founded: 1978, 
        website: "https://www.uniud.it", 
        lat: 46.0648, 
        lng: 13.2344, 
        description: "Founded after the 1976 earthquake to contribute to the cultural and economic development of Friuli.",
        apply_link: "https://www.uniud.it/en/uniud-international/International_Students/enrolment-recognition-of-foreign-titles-and-diplomas"
      },
      { 
        id: "sapienza", 
        name: "Università degli Studi di Roma 'La Sapienza'", 
        city: "Rome", 
        region: "Lazio", 
        type: "university", 
        founded: 1303, 
        website: "https://www.uniroma1.it", 
        lat: 41.9028, 
        lng: 12.5140, 
        description: "The largest university in Europe by enrollment, and one of the oldest and most prestigious in the world.",
        apply_link: "https://sapienza.gomovein.com"
      },
      { 
        id: "torvergata", 
        name: "Università degli Studi di Roma 'Tor Vergata'", 
        city: "Rome", 
        region: "Lazio", 
        type: "university", 
        founded: 1982, 
        website: "https://www.uniroma2.it", 
        lat: 41.8490, 
        lng: 12.6222, 
        description: "A modern campus university in Rome, known for its research in sciences, engineering, and economics.",
        apply_link: "https://delphi.uniroma2.it/totem/jsp/homeStudenti.jsp?language=EN"
      },
      { 
        id: "romatre", 
        name: "Università degli Studi di Roma 'Roma Tre'", 
        city: "Rome", 
        region: "Lazio", 
        type: "university", 
        founded: 1992, 
        website: "https://www.uniroma3.it", 
        lat: 41.8573, 
        lng: 12.4694, 
        description: "The youngest of Rome's state universities, focusing on innovation and interdisciplinary studies.",
        apply_link: "" // Roma Tre University - empty
      },
      { 
        id: "cassino", 
        name: "Università degli Studi di Cassino e del Lazio Meridionale", 
        city: "Cassino", 
        region: "Lazio", 
        type: "university", 
        founded: 1979, 
        website: "https://www.unicas.it", 
        lat: 41.4865, 
        lng: 13.8315, 
        description: "Serving southern Lazio, known for its engineering, economics, and humanities programs.",
        apply_link: "https://gomp.unicas.it/Home"
      },
      { 
        id: "tuscia", 
        name: "Università degli Studi della Tuscia", 
        city: "Viterbo", 
        region: "Lazio", 
        type: "university", 
        founded: 1979, 
        website: "https://www.unitus.it", 
        lat: 42.4287, 
        lng: 12.1048, 
        description: "Located in historical Viterbo, specializing in agricultural, environmental, and cultural heritage studies.",
        apply_link: "" // University of Tuscia - empty
      },
      { 
        id: "genova", 
        name: "Università degli Studi di Genova", 
        city: "Genoa", 
        region: "Liguria", 
        type: "university", 
        founded: 1481, 
        website: "https://www.unige.it", 
        lat: 44.4056, 
        lng: 8.9463, 
        description: "One of the largest universities in Italy, with historical ties to maritime studies and navigation.",
        apply_link: "" // University of Genoa - empty
      },
      { 
        id: "unimi", 
        name: "Università degli Studi di Milano", 
        city: "Milan", 
        region: "Lombardy", 
        type: "university", 
        founded: 1924, 
        website: "https://www.unimi.it", 
        lat: 45.4605, 
        lng: 9.1909, 
        description: "The largest university in Lombardy, known for its research in sciences, humanities, and medicine.",
        apply_link: "https://cas.unimi.it/login?service=https%3A%2F%2Fstudente.unimi.it%2Fammissioni%2Fa%2FmagistraliLibero%2FcheckLogin.asp"
      },
      { 
        id: "unimib", 
        name: "Università degli Studi di Milano-Bicocca", 
        city: "Milan", 
        region: "Lombardy", 
        type: "university", 
        founded: 1998, 
        website: "https://www.unimib.it", 
        lat: 45.5167, 
        lng: 9.2106, 
        description: "A modern university created on a redeveloped industrial area, focusing on interdisciplinary research.",
        apply_link: "https://apply.unimib.it/"
      },
      { 
        id: "unipv", 
        name: "Università degli Studi di Pavia", 
        city: "Pavia", 
        region: "Lombardy", 
        type: "university", 
        founded: 1361, 
        website: "https://www.unipv.it", 
        lat: 45.1865, 
        lng: 9.1560, 
        description: "One of the oldest universities in the world, with a rich history and strong scientific tradition.",
        apply_link: "https://apply.unipv.eu"
      },
      { 
        id: "unibg", 
        name: "Università degli Studi di Bergamo", 
        city: "Bergamo", 
        region: "Lombardy", 
        type: "university", 
        founded: 1968, 
        website: "https://www.unibg.it", 
        lat: 45.6940, 
        lng: 9.6699, 
        description: "Known for its economics, engineering, and foreign language programs in the Lombardy region.",
        apply_link: "https://apply.unibg.it/"
      },
      { 
        id: "unibs", 
        name: "Università degli Studi di Brescia", 
        city: "Brescia", 
        region: "Lombardy", 
        type: "university", 
        founded: 1982, 
        website: "https://www.unibs.it", 
        lat: 45.5391, 
        lng: 10.2205, 
        description: "A young university with strong programs in engineering, economics, and medicine.",
        apply_link: "" // University of Brescia - empty
      },
      { 
        id: "uninsubria", 
        name: "Università degli Studi dell'Insubria", 
        city: "Como/Varese", 
        region: "Lombardy", 
        type: "university", 
        founded: 1998, 
        website: "https://www.uninsubria.it", 
        lat: 45.8121, 
        lng: 8.8284, 
        description: "Named after the ancient Roman region, with campuses in Como and Varese near the Swiss border.",
        apply_link: "" // University of Insubria - empty
      },
      { 
        id: "urbino", 
        name: "Università di Urbino 'Carlo Bo'", 
        city: "Urbino", 
        region: "Marche", 
        type: "university", 
        founded: 1506, 
        website: "https://www.uniurb.it", 
        lat: 43.7255, 
        lng: 12.6373, 
        description: "Located in a Renaissance jewel city, known for its humanities, law, and economics programs.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "macerata", 
        name: "Università degli Studi di Macerata", 
        city: "Macerata", 
        region: "Marche", 
        type: "university", 
        founded: 1290, 
        website: "https://www.unimc.it", 
        lat: 43.3006, 
        lng: 13.4525, 
        description: "One of the oldest universities in Italy, specializing in humanities, law, and political sciences.",
        apply_link: "https://apply.unimc.it/"
      },
      { 
        id: "camerino", 
        name: "Università degli Studi di Camerino", 
        city: "Camerino", 
        region: "Marche", 
        type: "university", 
        founded: 1336, 
        website: "https://www.unicam.it", 
        lat: 43.1355, 
        lng: 13.0686, 
        description: "A small university with a long tradition, strong in sciences, pharmacy, and veterinary medicine.",
        apply_link: "https://international.unicam.it/admissions/pre-admissions-2025-2026"
      },
      { 
        id: "univpm", 
        name: "Università Politecnica delle Marche", 
        city: "Ancona", 
        region: "Marche", 
        type: "polytechnic", 
        founded: 1959, 
        website: "https://www.univpm.it", 
        lat: 43.6158, 
        lng: 13.5189, 
        description: "The technical university of Marche, focusing on engineering, architecture, and agricultural sciences.",
        apply_link: "https://www.international.univpm.it/international-admissions-ay-2025-26-final/"
      },
      { 
        id: "molise", 
        name: "Università degli Studi del Molise", 
        city: "Campobasso", 
        region: "Molise", 
        type: "university", 
        founded: 1982, 
        website: "https://www.unimol.it", 
        lat: 41.5604, 
        lng: 14.6634, 
        description: "The main university of the Molise region, contributing to the cultural and economic development of the area.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "unito", 
        name: "Università degli Studi di Torino", 
        city: "Turin", 
        region: "Piedmont", 
        type: "university", 
        founded: 1404, 
        website: "https://www.unito.it", 
        lat: 45.0703, 
        lng: 7.6869, 
        description: "One of Italy's most ancient and prestigious universities, with comprehensive academic offerings.",
        apply_link: "https://apply.unito.it/"
      },
      { 
        id: "polito", 
        name: "Politecnico di Torino", 
        city: "Turin", 
        region: "Piedmont", 
        type: "polytechnic", 
        founded: 1859, 
        website: "https://www.polito.it", 
        lat: 45.0636, 
        lng: 7.6612, 
        description: "One of the oldest and most prestigious technical universities in Italy, internationally recognized.",
        apply_link: "https://www.polito.it/en/education/applying-studying-graduating/admissions-and-enrolment/master-s-degree-programmes/applicants-with-a-non-italian-qualification"
      }, 
      {
        id: "unime",
        name: "Università degli Studi di Messina",
        city: "Messina",
        region: "Sicily",
        type: "university",
        founded: 1548,
        website: "https://www.unime.it",
        lat: 38.1952,
        lng: 15.5529,
        description: "A public research university located in Messina, Sicily, originally founded in 1548 and refounded in 1838.",
        apply_link: "https://unime.gomovein.com"
      },
      { 
        id: "upo", 
        name: "Università del Piemonte Orientale 'Amedeo Avogadro'", 
        city: "Alessandria/Novara/Vercelli", 
        region: "Piedmont", 
        type: "university", 
        founded: 1998, 
        website: "https://www.uniupo.it", 
        lat: 45.0186, 
        lng: 8.5326, 
        description: "A multi-campus university in eastern Piedmont, named after the famous scientist Amedeo Avogadro.",
        apply_link: "" // University of Eastern Piedmont - Send email to program coordinator
      },
      { 
        id: "cagliari", 
        name: "Università degli Studi di Cagliari", 
        city: "Cagliari", 
        region: "Sardinia", 
        type: "university", 
        founded: 1606, 
        website: "https://www.unica.it", 
        lat: 39.2238, 
        lng: 9.1217, 
        description: "The main university of Sardinia, with a rich history and strong research programs.",
        apply_link: "" // University of Cagliari - empty
      },
      { 
        id: "sassari", 
        name: "Università degli Studi di Sassari", 
        city: "Sassari", 
        region: "Sardinia", 
        type: "university", 
        founded: 1562, 
        website: "https://www.uniss.it", 
        lat: 40.7267, 
        lng: 8.5593, 
        description: "One of the oldest universities in Italy, particularly strong in agricultural and veterinary sciences.",
        apply_link: "" // University of Sassari - empty
      },
      { 
        id: "unipa", 
        name: "Università degli Studi di Palermo", 
        city: "Palermo", 
        region: "Sicily", 
        type: "university", 
        founded: 1806, 
        website: "https://www.unipa.it", 
        lat: 38.1157, 
        lng: 13.3615, 
        description: "The main university of Sicily, with roots dating back to the 15th century, offering comprehensive programs.",
        apply_link: "https://immaweb.unipa.it/immareg/facelets/anag/ins_anag_generale.seam?partnerId=IMMAWEB"
      },
      { 
        id: "unict", 
        name: "Università degli Studi di Catania", 
        city: "Catania", 
        region: "Sicily", 
        type: "university", 
        founded: 1434, 
        website: "https://www.unict.it", 
        lat: 37.5025, 
        lng: 15.0873, 
        description: "The oldest university in Sicily, located at the foot of Mount Etna, with strong scientific tradition.",
        apply_link: "https://www.unict.it/en/news-events/university-catania-scholarships-202526"
      },
      { 
        id: "unime", 
        name: "Università degli Studi di Messina", 
        city: "Messina", 
        region: "Sicily", 
        type: "university", 
        founded: 1548, 
        website: "https://www.unime.it", 
        lat: 38.1937, 
        lng: 15.5542, 
        description: "Founded by Pope Paul III, playing a key role in the cultural life of northeastern Sicily.",
        apply_link: "https://international.unime.it/study-us/application-and-admission"
      },
      { 
        id: "kore", 
        name: "Università degli Studi di Enna 'Kore'", 
        city: "Enna", 
        region: "Sicily", 
        type: "university", 
        founded: 2005, 
        website: "https://www.unikore.it", 
        lat: 37.5679, 
        lng: 14.2794, 
        description: "The first free university in Sicily, named after the ancient Greek name for the goddess Persephone.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "unifi", 
        name: "Università degli Studi di Firenze", 
        city: "Florence", 
        region: "Tuscany", 
        type: "university", 
        founded: 1321, 
        website: "https://www.unifi.it", 
        lat: 43.7793, 
        lng: 11.2463, 
        description: "One of Italy's most important public research universities, located in the heart of the Renaissance.",
        apply_link: "https://apply.unifi.it/"
      },
      { 
        id: "unipi", 
        name: "Università di Pisa", 
        city: "Pisa", 
        region: "Tuscany", 
        type: "university", 
        founded: 1343, 
        website: "https://www.unipi.it", 
        lat: 43.7167, 
        lng: 10.4000, 
        description: "One of the oldest universities in Italy, internationally renowned for its leaning tower and scientific research.",
        apply_link: "https://applymscenglish.unipi.it/en/studenti"
      },
      { 
        id: "unisi", 
        name: "Università degli Studi di Siena", 
        city: "Siena", 
        region: "Tuscany", 
        type: "university", 
        founded: 1240, 
        website: "https://www.unisi.it", 
        lat: 43.3186, 
        lng: 11.3308, 
        description: "One of the oldest universities in Italy, located in the medieval city famous for its Palio horse race.",
        apply_link: "http://apply.unisi.it/"
      },
      { 
        id: "unisistraf", 
        name: "Università per Stranieri di Siena", 
        city: "Siena", 
        region: "Tuscany", 
        type: "special", 
        founded: 1982, 
        website: "https://www.unistrasi.it", 
        lat: 43.3211, 
        lng: 11.3286, 
        description: "Specializes in teaching Italian language and culture to international students.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "sns", 
        name: "Scuola Normale Superiore di Pisa", 
        city: "Pisa", 
        region: "Tuscany", 
        type: "special", 
        founded: 1810, 
        website: "https://www.sns.it", 
        lat: 43.7191, 
        lng: 10.4012, 
        description: "One of Italy's most prestigious and selective universities, modeled after the École Normale Supérieure.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "santanna", 
        name: "Scuola Superiore Sant'Anna di Pisa", 
        city: "Pisa", 
        region: "Tuscany", 
        type: "special", 
        founded: 1987, 
        website: "https://www.santannapisa.it", 
        lat: 43.7189, 
        lng: 10.4033, 
        description: "A special statute university focusing on applied sciences, social sciences, and experimental medicine.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "unitn", 
        name: "Università degli Studi di Trento", 
        city: "Trento", 
        region: "Trentino-Alto Adige", 
        type: "university", 
        founded: 1962, 
        website: "https://www.unitn.it", 
        lat: 46.0667, 
        lng: 11.1191, 
        description: "A research-intensive university in the Alps, known for its international outlook and interdisciplinary approach.",
        apply_link: "" // University of Trento - empty
      },
      { 
        id: "unibz", 
        name: "Libera Università di Bolzano", 
        city: "Bolzano", 
        region: "Trentino-Alto Adige", 
        type: "university", 
        founded: 1997, 
        website: "https://www.unibz.it", 
        lat: 46.4983, 
        lng: 11.3545, 
        description: "A trilingual university (Italian, German, English) in the heart of the Dolomites, focusing on innovation.",
        apply_link: "" // University of Bozen-Bolzano - empty
      },
      { 
        id: "unipg", 
        name: "Università degli Studi di Perugia", 
        city: "Perugia", 
        region: "Umbria", 
        type: "university", 
        founded: 1308, 
        website: "https://www.unipg.it", 
        lat: 43.1122, 
        lng: 12.3888, 
        description: "One of the oldest universities in Italy, located in the historic hill town of Perugia.",
        apply_link: "" // University of Perugia - Direct Pre Enrollment on Universitaly
      },
      { 
        id: "unistrapp", 
        name: "Università per Stranieri di Perugia", 
        city: "Perugia", 
        region: "Umbria", 
        type: "special", 
        founded: 1925, 
        website: "https://www.unistrapg.it", 
        lat: 43.1107, 
        lng: 12.3906, 
        description: "Dedicated to Italian language and culture studies for international students.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "aosta", 
        name: "Università della Valle d'Aosta", 
        city: "Aosta", 
        region: "Aosta Valley", 
        type: "university", 
        founded: 2000, 
        website: "https://www.univda.it", 
        lat: 45.7376, 
        lng: 7.3172, 
        description: "The youngest Italian university, serving the bilingual French-Italian region in the Alps.",
        apply_link: "" // No link in your Excel data
      },
      { 
        id: "unipd", 
        name: "Università degli Studi di Padova", 
        city: "Padua", 
        region: "Veneto", 
        type: "university", 
        founded: 1222, 
        website: "https://www.unipd.it", 
        lat: 45.4064, 
        lng: 11.8768, 
        description: "One of the oldest universities in the world, where Galileo Galilei was a lecturer, with a strong research tradition.",
        apply_link: "https://apply.unipd.it/"
      },
      { 
        id: "unive", 
        name: "Università Ca' Foscari Venezia", 
        city: "Venice", 
        region: "Veneto", 
        type: "university", 
        founded: 1868, 
        website: "https://www.unive.it", 
        lat: 45.4333, 
        lng: 12.3267, 
        description: "Located in the historic palaces of Venice, specializing in economics, languages, and humanities.",
        apply_link: "https://apply.unive.it/"
      },
      { 
        id: "univr", 
        name: "Università degli Studi di Verona", 
        city: "Verona", 
        region: "Veneto", 
        type: "university", 
        founded: 1959, 
        website: "https://www.univr.it", 
        lat: 45.4386, 
        lng: 10.9928, 
        description: "A young university in the city of Romeo and Juliet, with strong programs in medicine, humanities, and sciences.",
        apply_link: "https://www.univr.it/en/our-services/international-degree-seeking-students"
      },
      { 
        id: "iuav", 
        name: "Università Iuav di Venezia", 
        city: "Venice", 
        region: "Veneto", 
        type: "special", 
        founded: 1926, 
        website: "https://www.iuav.it", 
        lat: 45.4318, 
        lng: 12.3253, 
        description: "One of Italy's most prestigious schools of architecture, urban planning, and design.",
        apply_link: "" // No link in your Excel data
      },
      // Additional universities from your Excel that might not be in the original list
      { 
        id: "polimi", 
        name: "Politecnico di Milano", 
        city: "Milan", 
        region: "Lombardy", 
        type: "polytechnic", 
        founded: 1863, 
        website: "https://www.polimi.it", 
        lat: 45.4781, 
        lng: 9.2282, 
        description: "One of Italy's leading technical universities, particularly strong in engineering, architecture and design.",
        apply_link: "https://aunicalogin.polimi.it/aunicalogin/aunicalogin.jsp?id_servizio=376&profile=0&__pj0=0&__pj1=a09e6bf1c059204105f6039e5361fe06"
      }
    ];
  }

  // Load courses data
  async loadCoursesData() {
    try {
      // Load masters data
      const mastersResponse = await fetch('json/PG_courses.json');
      const mastersData = await mastersResponse.json();
      this.processCourseData(mastersData, 'masters');
      this.linkCoursesToUniversities('masters');
      
      // Load bachelors data
      const bachelorsResponse = await fetch('json/UG_courses.json');
      const bachelorsData = await bachelorsResponse.json();
      this.processCourseData(bachelorsData, 'bachelors');
      this.linkCoursesToUniversities('bachelors');
      
      return true;
    } catch (error) {
      console.log('Courses data not loaded, continuing with universities only');
      return false;
    }
  }

  // Process course data (unified for masters/bachelors)
  processCourseData(rawData, courseType) {
    // Validate data structure
    if (!rawData || !rawData.fields || !Array.isArray(rawData.fields)) {
      console.error('Invalid course data structure');
      return;
    }
    
    const fields = rawData.fields.map(field => {
      // Sanitize field name
      const fieldName = SecurityHelper.sanitizeHTML(field.name);
      
      return {
        id: this.slugify(fieldName),
        name: fieldName,
        color: this.getFieldColor(fieldName, courseType),
        icon: this.getFieldIcon(fieldName, courseType),
        subfields: (field.subfields || []).map(subfield => ({
          id: this.slugify(SecurityHelper.sanitizeHTML(subfield.name)),
          name: SecurityHelper.sanitizeHTML(subfield.name),
          courses: (subfield.courses || []).map(course => ({
            id: this.slugify(
              SecurityHelper.sanitizeHTML(course.course_name + ' ' + course.university)
            ),
            name: SecurityHelper.sanitizeHTML(course.course_name),
            university: SecurityHelper.sanitizeHTML(course.university),
            universityId: null,
            coordinates: null,
            city: null,
            region: null,
            duration: CONFIG.courseTypes[courseType].duration,
            language: "English",
            courseType: CONFIG.courseTypes[courseType].degree,
            field: fieldName,
            subfield: SecurityHelper.sanitizeHTML(subfield.name),
            matchedUniversity: null,
            exactUniversityName: null,
            type: courseType
          }))
        }))
      };
    });
    
    this.courses[courseType].fields = fields;
    
    // Calculate stats
    this.courses[courseType].stats.total_courses = fields.reduce((total, field) => 
      total + field.subfields.reduce((subTotal, subfield) => 
        subTotal + subfield.courses.length, 0), 0);
    this.courses[courseType].stats.total_fields = fields.length;
    this.courses[courseType].stats.total_subfields = fields.reduce((total, field) => 
      total + field.subfields.length, 0);
  }

  // Link courses to universities (unified)
  linkCoursesToUniversities(courseType) {
    let linkedCount = 0;
    let unlinkedCount = 0;
    
    this.courses[courseType].fields.forEach(field => {
      field.subfields.forEach(subfield => {
        subfield.courses.forEach(course => {
          const matchedUniversity = this.findUniversityForCourse(course.university);
          
          if (matchedUniversity) {
            course.universityId = matchedUniversity.id;
            course.coordinates = [matchedUniversity.lat, matchedUniversity.lng];
            course.city = matchedUniversity.city;
            course.region = matchedUniversity.region;
            course.exactUniversityName = matchedUniversity.name;
            course.matchedUniversity = matchedUniversity.name;
            
            // Add to university's courses
            const courseKey = `${courseType}Courses`;
            if (!matchedUniversity[courseKey]) matchedUniversity[courseKey] = [];
            matchedUniversity[courseKey].push({
              ...course,
              field: field.name,
              subfield: subfield.name
            });
            
            linkedCount++;
          } else {
            // Use fallback coordinates based on city
            const fallbackCoords = this.getFallbackCoordinates(course.university);
            course.coordinates = fallbackCoords;
            course.city = 'Unknown (approximate location)';
            course.region = 'Italy';
            
            unlinkedCount++;
          }
        });
      });
    });
    
    console.log(`📊 ${courseType.charAt(0).toUpperCase() + courseType.slice(1)} Courses Linking Results:`);
    console.log(`   Successfully linked: ${linkedCount}`);
    console.log(`   Using fallback coordinates: ${unlinkedCount}`);
  }

  // Helper methods
  findUniversityForCourse(universityName) {
    // Try direct mapping first
    const mappedName = this.universityNameMapping[universityName];
    if (mappedName) {
      const university = this.universities.find(u => u.name === mappedName);
      if (university) return university;
    }
    
    // Try string matching
    const courseUniLower = universityName.toLowerCase().trim();
    
    // Try exact match
    let university = this.universities.find(uni => 
      uni.name.toLowerCase() === courseUniLower
    );
    if (university) return university;
    
    // Try partial match
    university = this.universities.find(uni => {
      const uniNameLower = uni.name.toLowerCase();
      return uniNameLower.includes(courseUniLower) || 
             courseUniLower.includes(uniNameLower) ||
             uniNameLower.replace(/università degli studi di |università di |politecnico di /gi, '').includes(courseUniLower.replace(/university of |polytechnic of /gi, '')) ||
             courseUniLower.replace(/university of |polytechnic of /gi, '').includes(uniNameLower.replace(/università degli studi di |università di |politecnico di /gi, ''));
    });
    if (university) return university;
    
    // Try city matching
    university = this.universities.find(uni => 
      courseUniLower.includes(uni.city.toLowerCase()) ||
      courseUniLower.includes(uni.region.toLowerCase())
    );
    if (university) return university;
    
    // Try keyword matching
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
        const foundUni = this.universities.find(u => u.name === uniName);
        if (foundUni) return foundUni;
      }
    }
    
    return null;
  }

  getFallbackCoordinates(universityName) {
    const uniLower = universityName.toLowerCase();
    
    // Try to match by city name
    for (const [city, coords] of Object.entries(this.cityCoordinates)) {
      if (uniLower.includes(city.toLowerCase())) {
        return coords;
      }
    }
    
    // Default to Rome
    return [41.9028, 12.4964];
  }

  getFieldColor(fieldName, courseType) {
    const cacheKey = `${courseType}-${fieldName}`;
    
    if (fieldColorCache.has(cacheKey)) {
      return fieldColorCache.get(cacheKey);
    }
    
    let color;
    if (courseType === 'masters') {
      const colors = {
        'STEM – Computer Science and Artificial Intelligence': CONFIG.colors.stemCS,
        'STEM – Engineering and Technology': CONFIG.colors.stemEng,
        'Business, Economics and Management': CONFIG.colors.business,
        'Health and Medical Sciences': CONFIG.colors.health,
        'Social Sciences and Humanities': CONFIG.colors.humanities,
        'Arts, Architecture and Design': CONFIG.colors.humanities,
        'STEM – Physical and Chemical Sciences': CONFIG.colors.science,
        'STEM – Biological and Life Sciences': CONFIG.colors.science,
        'Environmental, Sustainability and Agricultural Sciences': CONFIG.colors.env,
        'Law, Governance and Public Policy': CONFIG.colors.law,
        'Tourism, Hospitality and Cultural Studies': CONFIG.colors.tourism
      };
      color = colors[fieldName] || CONFIG.colors.italyGreen;
    } else {
      const colors = {
        'STEM – Computer Science and Artificial Intelligence': CONFIG.colors.bachelorStem,
        'STEM – Engineering and Technology': CONFIG.colors.bachelorStem,
        'Business, Economics and Management': CONFIG.colors.bachelorBusiness,
        'Health and Medical Sciences': CONFIG.colors.health,
        'Social Sciences and Humanities': CONFIG.colors.bachelorHumanities,
        'STEM – Biological and Life Sciences': CONFIG.colors.bachelorStem,
        'STEM – Earth and Environmental Sciences': CONFIG.colors.bachelorStem,
        'STEM – Mathematics and Statistics': CONFIG.colors.bachelorStem,
        'Agriculture and Animal Sciences': CONFIG.colors.env,
        'Tourism, Hospitality and Cultural Studies': CONFIG.colors.tourism,
        'Interdisciplinary Studies': CONFIG.colors.bachelorBusiness
      };
      color = colors[fieldName] || CONFIG.colors.bachelorStem;
    }
    
    fieldColorCache.set(cacheKey, color);
    return color;
  }

  getFieldIcon(fieldName, courseType) {
    if (courseType === 'masters') {
      const icons = {
        'STEM – Computer Science and Artificial Intelligence': 'fas fa-microchip',
        'STEM – Engineering and Technology': 'fas fa-cogs',
        'Business, Economics and Management': 'fas fa-chart-line',
        'Health and Medical Sciences': 'fas fa-heartbeat',
        'Social Sciences and Humanities': 'fas fa-users',
        'Arts, Architecture and Design': 'fas fa-paint-brush',
        'STEM – Physical and Chemical Sciences': 'fas fa-flask',
        'STEM – Biological and Life Sciences': 'fas fa-dna',
        'Environmental, Sustainability and Agricultural Sciences': 'fas fa-leaf',
        'Law, Governance and Public Policy': 'fas fa-gavel',
        'Tourism, Hospitality and Cultural Studies': 'fas fa-umbrella-beach'
      };
      return icons[fieldName] || 'fas fa-graduation-cap';
    } else {
      const icons = {
        'STEM – Computer Science and Artificial Intelligence': 'fas fa-laptop-code',
        'STEM – Engineering and Technology': 'fas fa-cogs',
        'Business, Economics and Management': 'fas fa-chart-line',
        'Health and Medical Sciences': 'fas fa-heartbeat',
        'Social Sciences and Humanities': 'fas fa-users',
        'STEM – Biological and Life Sciences': 'fas fa-dna',
        'STEM – Earth and Environmental Sciences': 'fas fa-globe-europe',
        'STEM – Mathematics and Statistics': 'fas fa-calculator',
        'Agriculture and Animal Sciences': 'fas fa-tractor',
        'Tourism, Hospitality and Cultural Studies': 'fas fa-umbrella-beach',
        'Interdisciplinary Studies': 'fas fa-brain'
      };
      return icons[fieldName] || 'fas fa-book-open';
    }
  }

  slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
}

// ===== UI MANAGER =====
class UIManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.currentView = 'universities';
    this.currentCourseType = null;
    this.courseViewMode = 'fields';
    
    this.selectedRegion = null;
    this.selectedUniversity = null;
    this.selectedField = null;
    this.selectedSubfield = null;
    this.selectedCourse = null;
    
    this.filteredUniversities = [];
    this.filteredCourses = [];
    
    this.sidebarOpen = false;
    this.coursesPanelOpen = false;
    
    this.map = null;
    this.markersCluster = null;
    this.courseMarkers = null;
    this.universityMarkers = [];

    this.heroVisible = true;
    this.lastScrollTop = 0;
    this.scrollTimeout = null;

    this.initializeUI();
  }
  
  // ===== SCROLL BEHAVIOR FOR STICKY NAV =====
  setupScrollBehavior() {
    const heroSection = document.querySelector('.hero-section');
    const navContainer = document.querySelector('.sticky-nav-container');
    const viewToggle = document.querySelector('.view-toggle');
    
    if (!heroSection || !navContainer || !viewToggle) return;
    
    const heroHeight = heroSection.offsetHeight;
    const transitionThreshold = heroHeight * 0.7;
    let isScrolled = false;
    
    const updateNavPosition = PerformanceHelper.debounce(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldBeScrolled = scrollTop > transitionThreshold;
      
      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        
        if (isScrolled) {
          navContainer.classList.add('scrolled');
          // Update ARIA attributes for accessibility
          document.getElementById('toggle-sidebar')?.setAttribute('aria-expanded', 'false');
        } else {
          navContainer.classList.remove('scrolled');
        }
      }
    }, 100);
    
    window.addEventListener('scroll', updateNavPosition);
    window.addEventListener('resize', updateNavPosition);
    updateNavPosition();
  }
  
  initializeUI() {
    console.log('🔄 Initializing UI...');
    
    // 1. Verify we have universities data
    if (!this.dataManager.universities || this.dataManager.universities.length === 0) {
      console.error('❌ No universities data available for UI!');
      // Show error in loading screen
      const loading = document.getElementById('loading');
      if (loading) {
        loading.innerHTML = `
          <div class="loading-content">
            <div class="loading-logo">
              <div class="flag-stripes">
                <div class="stripe green"></div>
                <div class="stripe white"></div>
                <div class="stripe red"></div>
              </div>
              <h1>Università d'Italia</h1>
            </div>
            <p class="loading-text" style="color: var(--italy-red);">
              <i class="fas fa-exclamation-triangle"></i>
              Failed to load universities data. Please refresh.
            </p>
          </div>
        `;
      }
      setTimeout(() => this.initializeUI(), 100);
      return;
    }
    
    // 2. Initialize filteredUniversities with ALL universities
    this.filteredUniversities = [...this.dataManager.universities];
    console.log(`📋 Set filteredUniversities to ${this.filteredUniversities.length} universities`);
    
    // 3. Hide loading screen
    this.hideLoadingScreen();
    
    // 4. Initialize map
    this.initMap();
    
    // 5. Setup event listeners
    this.setupEventListeners();

    // 6. Setup scroll behavior for sticky nav 
    this.setupScrollBehavior();
    
    // 7. Render universities list
    this.renderUniversitiesList();
    
    // 8. Update results count
    this.updateResultsCount();
    
    // 9. Initial render of university markers
    this.renderUniversityMarkers(this.filteredUniversities);
    
    console.log('✅ UI Initialization complete');
  }

  hideLoadingScreen() {
    const loading = document.getElementById('loading');
    loading.classList.add('fade-out');
    setTimeout(() => {
      loading.style.display = 'none';
      console.log('👋 Loading screen hidden');
    }, 300);
  }

  // ===== MAP FUNCTIONS =====
  initMap() {
    this.map = L.map('map', {
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

    L.control.zoom({ position: 'topright' }).addTo(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(this.map);

    fetch('geojson/italy-regions.geojson')
      .then(res => res.json())
      .then(geojson => {
        // === SIMPLE, ELEGANT ITALIAN-THEMED BORDERS ===
        
        // 1. National border - Green (like Italian flag)
        L.geoJSON(geojson, {
          style: {
            color: '#efff09ff',
            weight: 1.75,
            opacity: 0.9,
            fillColor: 'transparent',
            fillOpacity: 0,
            lineCap: 'round',
            lineJoin: 'round'
          }
        }).addTo(this.map).bringToBack();

        // 2. Region borders - Red (like Italian flag)
        const regionsLayer = L.geoJSON(geojson, {
          style: {
            color: '#CD212A',
            weight: 1.5,
            opacity: 0.7,
            fillColor: '#F4F5F0',
            fillOpacity: 0.15,
            lineCap: 'round',
            lineJoin: 'round'
          },
          onEachFeature: (feature, layer) => {
            const regionName = SecurityHelper.sanitizeHTML(feature.properties.reg_name || feature.properties.NAME_1);
            
            layer.bindPopup(`
              <div style="padding: 10px; font-family: 'Inter', sans-serif; min-width: 180px;">
                <h3 style="margin: 0 0 10px 0; color: #008C45; font-size: 16px; font-weight: 600;">${regionName}</h3>
                <p style="margin: 0; color: #ee0e0eff; font-size: 14px;">Click to view universities in this region</p>
              </div>
            `);
            
            layer.on('click', () => {
              if (this.currentView === 'universities') {
                this.selectedRegion = regionName;
                this.filterUniversitiesByRegion(regionName);
                this.openSidebar();
              }
            });

            // Subtle hover effects
            layer.on('mouseover', function() {
              this.setStyle({
                weight: 2.5,
                color: '#CD212A',
                opacity: 1,
                fillOpacity: 0.25
              });
            });
            
            layer.on('mouseout', function() {
              this.setStyle({
                weight: 1.5,
                color: '#CD212A',
                opacity: 0.7,
                fillOpacity: 0.15
              });
            });
          }
        }).addTo(this.map);
        
        // Bring region layer to front for interaction
        regionsLayer.bringToFront();

        console.log('🗺️ GeoJSON regions loaded successfully');
      })
      .catch(err => {
        console.log('⚠️ Regions GeoJSON not loaded, continuing without region borders');
      });

    this.markersCluster = L.markerClusterGroup({
      maxClusterRadius: 80,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true
    });
    this.map.addLayer(this.markersCluster);

    this.courseMarkers = L.layerGroup();
    this.map.addLayer(this.courseMarkers);

    this.map.on('drag', () => {
      this.map.panInsideBounds([
        [CONFIG.map.bounds.south, CONFIG.map.bounds.west],
        [CONFIG.map.bounds.north, CONFIG.map.bounds.east]
      ], { animate: false });
    });

    console.log('🗺️ Map initialized');
  }

  renderUniversityMarkers(universities) {
    this.markersCluster.clearLayers();
    this.universityMarkers = [];
    
    console.log(`📍 Rendering ${universities.length} university markers`);
    
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
      
      const mastersCount = uni.mastersCourses ? uni.mastersCourses.length : 0;
      const bachelorsCount = uni.bachelorsCourses ? uni.bachelorsCourses.length : 0;
      
      // Sanitize data for security
      const uniName = SecurityHelper.sanitizeHTML(uni.name);
      const uniCity = SecurityHelper.sanitizeHTML(uni.city);
      const uniRegion = SecurityHelper.sanitizeHTML(uni.region);
      
      marker.bindPopup(`
        <div style="padding: 10px; font-family: 'Inter', sans-serif; max-width: 250px;">
          <h3 style="margin: 0 0 8px 0; color: #008C45; font-size: 16px; font-weight: 600;">${uniName}</h3>
          <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
            <i class="fas fa-map-marker-alt"></i> ${uniCity}, ${uniRegion}
          </p>
          <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
            <i class="fas fa-calendar-alt"></i> Founded: ${uni.founded}
          </p>
          <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
            <i class="fas fa-graduation-cap"></i> ${mastersCount} master courses
          </p>
          <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
            <i class="fas fa-book-open"></i> ${bachelorsCount} bachelor courses
          </p>
          <button onclick="app.ui.showUniversityDetails('${uni.id}')" style="
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
      
      marker.on('click', () => this.showUniversityDetails(uni.id));
      this.markersCluster.addLayer(marker);
      this.universityMarkers.push(marker);
    });
    
    if (universities.length > 0) {
      setTimeout(() => {
        this.map.fitBounds(this.markersCluster.getBounds(), { 
          padding: [50, 50],
          maxZoom: CONFIG.map.zoom
        });
        console.log('📍 Map fitted to university bounds');
      }, 100);
    }
  }

  renderCourseMarkers(courses, courseType) {
    this.courseMarkers.clearLayers();
    
    courses.forEach(course => {
      if (!course.coordinates) return;
      
      const icon = L.divIcon({
        className: 'course-marker',
        html: `
          <div class="course-icon" style="background: ${this.dataManager.getFieldColor(course.field, courseType)};">
            <i class="fas ${CONFIG.courseTypes[courseType].icon}"></i>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      
      const marker = L.marker(course.coordinates, { icon });
      
      const universityName = SecurityHelper.sanitizeHTML(course.exactUniversityName || course.university);
      const locationText = course.city && course.region ? 
        `${SecurityHelper.sanitizeHTML(course.city)}, ${SecurityHelper.sanitizeHTML(course.region)}` : 
        'Approximate location';
      
      marker.bindPopup(`
        <div style="padding: 10px; font-family: 'Inter', sans-serif; max-width: 250px;">
          <h3 style="margin: 0 0 8px 0; color: #008C45; font-size: 16px; font-weight: 600;">${SecurityHelper.sanitizeHTML(course.name)}</h3>
          <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
            <i class="fas fa-university"></i> ${universityName}
          </p>
          <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
            <i class="fas fa-map-marker-alt"></i> ${locationText}
          </p>
          <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
            <i class="fas fa-tag"></i> ${SecurityHelper.sanitizeHTML(course.field)}
          </p>
          <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
            <i class="fas fa-clock"></i> ${course.duration}
          </p>
          <button onclick="app.ui.selectCourseFromMap('${course.id}', '${courseType}')" style="
            background: ${this.dataManager.getFieldColor(course.field, courseType)};
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
      
      marker.addTo(this.courseMarkers);
    });
    
    if (courses.length > 0) {
      const validCourses = courses.filter(c => c.coordinates);
      if (validCourses.length > 0) {
        const bounds = L.latLngBounds(validCourses.map(c => c.coordinates));
        this.map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }

  renderCourseDensity(courses, courseType) {
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
      const color = courseType === 'masters' ? CONFIG.colors.stemCS : CONFIG.colors.bachelorStem;
      
      const circle = L.circle([lat, lng], {
        radius: radius * 100,
        color: color,
        fillColor: color,
        fillOpacity: 0.3,
        weight: 2
      });
      
      circle.addTo(this.courseMarkers);
    });
  }

  // ===== VIEW MANAGEMENT =====
  switchView(viewType) {
    console.log(`🔄 Switching to ${viewType} view from ${this.currentView}`);
    
    this.currentView = viewType;
    
    // Update toggle buttons with accessibility
    document.querySelectorAll('.view-option').forEach(btn => {
      const isActive = btn.dataset.view === viewType;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
    
    // Show/hide control groups
    document.querySelectorAll('.control-group').forEach(group => {
      group.style.display = group.classList.contains(`${viewType}-view`) ? 'flex' : 'none';
    });
    
    // Show/hide legends
    document.getElementById('universities-legend').style.display = 
      viewType === 'universities' ? 'block' : 'none';
    document.getElementById('masters-legend').style.display = 
      viewType === 'masters' ? 'block' : 'none';
    document.getElementById('bachelors-legend').style.display = 
      viewType === 'bachelors' ? 'block' : 'none';
    
    // Set current course type for masters/bachelors views
    if (viewType === 'masters' || viewType === 'bachelors') {
      this.currentCourseType = viewType;
    }
    
    // Close panels if switching away
    if (viewType !== 'universities' && this.sidebarOpen) this.closeSidebar();
    
    // Handle courses view switching
    if ((viewType === 'masters' || viewType === 'bachelors')) {
      // Reset course selection state when switching between masters/bachelors
      if (this.currentView !== viewType) {
        this.selectedField = null;
        this.selectedSubfield = null;
        this.selectedCourse = null;
        this.courseViewMode = 'fields';
        this.filteredCourses = [];
      }
      
      // MOBILE FIXED VERSION: Handle mobile panels properly
      if (window.innerWidth <= 768) {
        // Close universities sidebar if open
        if (this.sidebarOpen) {
          this.closeSidebar();
        }
        
        // Open courses panel on mobile
        this.openCoursesPanel();
        
        // Mobile: DO NOT add body.panel-open class that locks scrolling
        // This is the key fix for scroll locking
      } else {
        // Desktop behavior
        if (!this.coursesPanelOpen) {
          this.openCoursesPanel();
        }
      }
      
      // Load the appropriate view
      this.loadFieldsView();
    } else {
      // Close courses panel if switching to universities
      if (this.coursesPanelOpen) this.closeCoursesPanel();
    }
    
    this.updateMapForCurrentView();
    
    // Announce view change for screen readers
    this.announceToScreenReader(`Switched to ${viewType} view`);
  }

  // Screen reader announcement helper
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (announcement.parentNode) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  updateMapForCurrentView() {
    this.markersCluster.clearLayers();
    this.courseMarkers.clearLayers();
    
    if (this.currentView === 'universities') {
      this.renderUniversityMarkers(this.filteredUniversities);
    } else if (this.currentView === 'masters' || this.currentView === 'bachelors') {
      this.updateCourseMap();
    }
  }

  updateCourseMap() {
    if (this.selectedCourse) {
      this.renderCourseMarkers([this.selectedCourse], this.currentCourseType);
      if (this.selectedCourse.coordinates) {
        this.map.setView(this.selectedCourse.coordinates, 12);
      }
    } else if (this.selectedSubfield) {
      const courses = this.getAllCoursesFromSubfield(this.selectedSubfield);
      this.renderCourseMarkers(courses, this.currentCourseType);
      this.zoomToCourses(courses);
    } else if (this.selectedField) {
      const courses = this.getAllCoursesFromField(this.selectedField);
      this.renderCourseMarkers(courses, this.currentCourseType);
      this.zoomToCourses(courses);
    } else {
      const allCourses = this.getAllCourses();
      this.renderCourseDensity(allCourses, this.currentCourseType);
    }
  }

  getAllCoursesFromSubfield(subfieldId) {
    const fields = this.dataManager.courses[this.currentCourseType].fields;
    for (const field of fields) {
      const subfield = field.subfields.find(s => s.id === subfieldId);
      if (subfield) return subfield.courses;
    }
    return [];
  }

  getAllCoursesFromField(fieldId) {
    const field = this.dataManager.courses[this.currentCourseType].fields.find(f => f.id === fieldId);
    return field ? field.subfields.flatMap(s => s.courses) : [];
  }

  getAllCourses() {
    return this.dataManager.courses[this.currentCourseType].fields.flatMap(f => 
      f.subfields.flatMap(s => s.courses)
    );
  }

  zoomToCourses(courses) {
    const validCourses = courses.filter(c => c.coordinates);
    if (validCourses.length === 0) return;
    
    if (validCourses.length === 1) {
      this.map.setView(validCourses[0].coordinates, 12);
    } else {
      const bounds = L.latLngBounds(validCourses.map(c => c.coordinates));
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }
  }

  // ===== SIDEBAR & PANEL FUNCTIONS =====
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');
    
    if (this.sidebarOpen) {
      sidebar.classList.add('open');
      toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (window.innerWidth > 768) {
        toggleBtn.innerHTML = '<i class="fas fa-times"></i><span class="btn-text">Close List</span>';
      }
    } else {
      sidebar.classList.remove('open');
      toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (window.innerWidth > 768) {
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i><span class="btn-text">Universities List</span>';
      }
    }
  }

  openSidebar() {
    if (!this.sidebarOpen) this.toggleSidebar();
  }

  closeSidebar() {
    if (this.sidebarOpen) this.toggleSidebar();
  }

  toggleCoursesPanel() {
    this.coursesPanelOpen = !this.coursesPanelOpen;
    const panel = document.getElementById('courses-panel');
    
    if (panel) {
      if (this.coursesPanelOpen) {
        panel.style.right = '0';
        panel.style.display = 'flex';
        
        // Update ARIA attributes
        document.getElementById('courses-panel-close')?.setAttribute('aria-expanded', 'true');
        
        // Ensure body scroll is never locked
        document.body.style.overflow = 'auto';
      } else {
        panel.style.right = '-100%';
        document.getElementById('courses-panel-close')?.setAttribute('aria-expanded', 'false');
      }
    }
  }

  openCoursesPanel() {
    if (!this.coursesPanelOpen) {
      // Use toggle to properly set the state
      this.toggleCoursesPanel();
    }
    
    // CRITICAL: Clean up any scroll locking
    document.body.classList.remove('panel-open');
    document.body.style.overflow = 'auto';
    
    if (this.currentCourseType) {
      this.loadFieldsView();
    }
  }

  closeCoursesPanel() {
    if (this.coursesPanelOpen) {
      this.toggleCoursesPanel();
    }
    
    // Ensure scroll is never locked
    document.body.classList.remove('panel-open');
    document.body.style.overflow = 'auto';
  }

  // ===== UNIVERSITIES LIST FUNCTIONS =====
  renderUniversitiesList() {
    const container = document.getElementById('university-list');
    const emptyState = document.getElementById('empty-state');
    const sortValue = document.getElementById('sort-filter').value;
    
    if (this.filteredUniversities.length === 0) {
      container.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }
    
    emptyState.style.display = 'none';
    
    let html = '';
    if (sortValue === 'region') {
      html = this.renderGroupedByRegion(this.filteredUniversities);
    } else {
      html = this.renderSimpleList(this.filteredUniversities);
    }
    
    container.innerHTML = html;
    
    container.querySelectorAll('.university-card').forEach((card, index) => {
      card.style.animationDelay = `${index * 0.05}s`;
      card.addEventListener('click', () => {
        const universityId = card.dataset.id;
        this.showUniversityDetails(universityId);
      });
    });
    
    console.log(`📋 Rendered ${this.filteredUniversities.length} universities in list`);
  }

  renderSimpleList(universities) {
    return universities.map((uni, index) => {
      const uniName = SecurityHelper.sanitizeHTML(uni.name);
      const uniCity = SecurityHelper.sanitizeHTML(uni.city);
      const uniRegion = SecurityHelper.sanitizeHTML(uni.region);
      
      return `
      <div class="university-card" data-id="${uni.id}" style="animation-delay: ${index * 0.05}s">
        <h3>${uniName}</h3>
        <div class="location">
          <i class="fas fa-map-marker-alt"></i>
          ${uniCity}, ${uniRegion}
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
        <div class="course-counts" style="margin-top: 5px; display: flex; gap: 10px; font-size: 0.8rem; color: var(--text-tertiary);">
          ${uni.mastersCourses && uni.mastersCourses.length > 0 ? `
            <span>
              <i class="fas fa-graduation-cap"></i>
              ${uni.mastersCourses.length} masters
            </span>
          ` : ''}
          ${uni.bachelorsCourses && uni.bachelorsCourses.length > 0 ? `
            <span>
              <i class="fas fa-book-open"></i>
              ${uni.bachelorsCourses.length} bachelors
            </span>
          ` : ''}
        </div>
      </div>
    `}).join('');
  }

  renderGroupedByRegion(universities) {
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
        const regionName = SecurityHelper.sanitizeHTML(region);
        html += `
          <div class="region-group">
            <div class="region-header">
              ${regionName}
              <span class="region-count">${grouped[region].length}</span>
            </div>
            ${grouped[region].map(uni => {
              const uniName = SecurityHelper.sanitizeHTML(uni.name);
              const uniCity = SecurityHelper.sanitizeHTML(uni.city);
              
              return `
              <div class="university-card" data-id="${uni.id}" style="animation-delay: ${cardIndex++ * 0.05}s">
                <h4>${uniName}</h4>
                <div class="location">
                  <i class="fas fa-map-marker-alt"></i>
                  ${uniCity}
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
                <div class="course-counts" style="margin-top: 5px; display: flex; gap: 10px; font-size: 0.8rem; color: var(--text-tertiary);">
                  ${uni.mastersCourses && uni.mastersCourses.length > 0 ? `
                    <span>
                      <i class="fas fa-graduation-cap"></i>
                      ${uni.mastersCourses.length} masters
                    </span>
                  ` : ''}
                  ${uni.bachelorsCourses && uni.bachelorsCourses.length > 0 ? `
                    <span>
                      <i class="fas fa-book-open"></i>
                      ${uni.bachelorsCourses.length} bachelors
                    </span>
                  ` : ''}
                </div>
              </div>
            `}).join('')}
          </div>
        `;
      }
    });
    
    return html;
  }

  filterUniversities() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;
    const sortBy = document.getElementById('sort-filter').value;
    
    let filtered = [...this.dataManager.universities];
    
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
    
    if (this.selectedRegion) {
      filtered = filtered.filter(uni => uni.region === this.selectedRegion);
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
    
    this.filteredUniversities = filtered;
    this.renderUniversitiesList();
    this.renderUniversityMarkers(filtered);
    this.updateResultsCount();
  }

  filterUniversitiesByRegion(region) {
    // Map region names (Italian to English)
    const regionMap = {
      'Toscana': 'Tuscany',
      'Piemonte': 'Piedmont',
      'Lombardia': 'Lombardy',
      'Veneto': 'Veneto',
      'Lazio': 'Lazio',
      'Campania': 'Campania',
      'Sicilia': 'Sicily',
      'Sardegna': 'Sardinia',
      'Emilia-Romagna': 'Emilia-Romagna',
      'Friuli-Venezia Giulia': 'Friuli-Venezia Giulia',
      'Trentino-Alto Adige': 'Trentino-Alto Adige',
      'Valle d\'Aosta': 'Aosta Valley',
      'Marche': 'Marche',
      'Umbria': 'Umbria',
      'Abruzzo': 'Abruzzo',
      'Molise': 'Molise',
      'Puglia': 'Apulia',
      'Basilicata': 'Basilicata',
      'Calabria': 'Calabria',
      'Liguria': 'Liguria'
    };
    
    // Get both possible region names
    const englishRegion = regionMap[region] || region;
    const italianRegion = Object.keys(regionMap).find(key => regionMap[key] === region) || region;
    
    this.selectedRegion = englishRegion;
    
    const regionName = SecurityHelper.sanitizeHTML(region);
    document.getElementById('sidebar-title').textContent = `${regionName} Universities`;
    
    // Filter by both English and Italian region names
    let filtered = [...this.dataManager.universities].filter(uni => 
      uni.region === englishRegion || uni.region === italianRegion
    );
    
    this.filteredUniversities = filtered;
    this.renderUniversitiesList();
    this.renderUniversityMarkers(filtered);
    this.updateResultsCount();
  }

  updateResultsCount() {
    const total = this.dataManager.universities.length;
    const current = this.filteredUniversities.length;
    document.getElementById('results-count').textContent = 
      current === total ? `${total} universities` : `${current} of ${total} universities`;
  }

  // ===== COURSES VIEW FUNCTIONS =====
  loadFieldsView() {
    console.log(`📚 Loading fields view for ${this.currentCourseType}`);
    
    if (!this.currentCourseType) {
      console.error('No currentCourseType set!');
      return;
    }
    
    this.courseViewMode = 'fields';
    this.selectedField = null;
    this.selectedSubfield = null;
    this.selectedCourse = null;
    
    // Update UI elements
    const icon = document.getElementById('courses-panel-icon');
    const title = document.getElementById('courses-panel-title');
    icon.className = `fas ${CONFIG.courseTypes[this.currentCourseType].icon}`;
    title.textContent = `${CONFIG.courseTypes[this.currentCourseType].name} Degree Courses`;
    
    // Update field filter based on current course type
    this.populateFieldFilter();
    
    // Show/hide sections
    document.getElementById('fields-list').style.display = 'grid';
    document.getElementById('subfields-list').style.display = 'none';
    document.getElementById('courses-list').style.display = 'none';
    document.getElementById('courses-empty-state').style.display = 'none';
    
    // Render fields
    this.renderFieldsList();
    
    // Update breadcrumb and count
    this.updateBreadcrumb('field', 'All Fields');
    this.updateCoursesCount();
  }

  populateFieldFilter() {
    const fieldFilter = document.getElementById('courses-field-filter');
    if (!fieldFilter) return;
    
    fieldFilter.innerHTML = '<option value="all">All Fields</option>';
    
    this.dataManager.courses[this.currentCourseType].fields.forEach(field => {
      const option = document.createElement('option');
      option.value = field.id;
      option.textContent = field.name;
      fieldFilter.appendChild(option);
    });
    
    // Reset filter to "all"
    fieldFilter.value = 'all';
  }

  renderFieldsList() {
    const fieldsList = document.getElementById('fields-list');
    const fields = this.dataManager.courses[this.currentCourseType].fields;
    
    if (!fieldsList || !fields) return;
    
    fieldsList.innerHTML = fields.map(field => `
      <div class="field-card" data-field-id="${field.id}">
        <div class="field-icon" style="background: ${field.color}; color: white;">
          <i class="${field.icon}"></i>
        </div>
        <h3>${SecurityHelper.sanitizeHTML(field.name)}</h3>
        <p style="color: var(--text-tertiary); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">
          Explore ${field.subfields.reduce((total, subfield) => total + subfield.courses.length, 0)} ${this.currentCourseType} courses
        </p>
        <div class="field-stats">
          <span class="field-stat">
            <i class="fas ${this.currentCourseType === 'masters' ? 'fa-graduation-cap' : 'fa-book-open'}"></i>
            ${field.subfields.length} subfields
          </span>
        </div>
      </div>
    `).join('');
    
    fieldsList.querySelectorAll('.field-card').forEach(card => {
      card.addEventListener('click', () => this.selectField(card.dataset.fieldId));
    });
  }

  selectField(fieldId) {
    const field = this.dataManager.courses[this.currentCourseType].fields.find(f => f.id === fieldId);
    if (!field) return;
    
    this.selectedField = field;
    this.selectedSubfield = null;
    this.selectedCourse = null;
    this.courseViewMode = 'subfields';
    
    document.getElementById('fields-list').style.display = 'none';
    document.getElementById('subfields-list').style.display = 'flex';
    document.getElementById('courses-list').style.display = 'none';
    
    const subfieldsList = document.getElementById('subfields-list');
    subfieldsList.innerHTML = field.subfields.map(subfield => `
      <div class="subfield-card" data-subfield-id="${subfield.id}">
        <h4>${SecurityHelper.sanitizeHTML(subfield.name)}</h4>
        <div class="course-count">
          <i class="fas ${this.currentCourseType === 'masters' ? 'fa-graduation-cap' : 'fa-book-open'}"></i>
          ${subfield.courses.length} courses available
        </div>
      </div>
    `).join('');
    
    subfieldsList.querySelectorAll('.subfield-card').forEach(card => {
      card.addEventListener('click', () => this.selectSubfield(card.dataset.subfieldId));
    });
    
    this.updateBreadcrumb('field', field.name);
    this.updateBreadcrumb('subfield', 'Select Subfield');
    this.updateMapForCurrentView();
  }

  selectSubfield(subfieldId) {
    if (!this.selectedField) return;
    
    const subfield = this.selectedField.subfields.find(s => s.id === subfieldId);
    if (!subfield) return;
    
    this.selectedSubfield = subfield;
    this.selectedCourse = null;
    this.courseViewMode = 'courses';
    
    document.getElementById('subfields-list').style.display = 'none';
    document.getElementById('courses-list').style.display = 'flex';
    
    this.filterCoursesForList(subfield.courses);
    
    this.updateBreadcrumb('subfield', subfield.name);
    this.updateBreadcrumb('course', 'Select Course');
    this.updateMapForCurrentView();
  }

  filterCoursesForList(courses) {
    const searchInput = document.getElementById(`${this.currentCourseType}-search`);
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const fieldFilter = document.getElementById('courses-field-filter');
    const fieldFilterValue = fieldFilter ? fieldFilter.value : 'all';
    
    let filtered = [...courses];
    
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm) ||
        course.university.toLowerCase().includes(searchTerm) ||
        (course.exactUniversityName && course.exactUniversityName.toLowerCase().includes(searchTerm))
      );
    }
    
    if (fieldFilterValue !== 'all' && !this.selectedField) {
      filtered = filtered.filter(course => {
        const field = this.dataManager.courses[this.currentCourseType].fields.find(f => f.id === fieldFilterValue);
        return field && course.field === field.name;
      });
    }
    
    this.filteredCourses = filtered;
    
    const coursesList = document.getElementById('courses-list');
    const emptyState = document.getElementById('courses-empty-state');
    
    if (filtered.length === 0) {
      coursesList.innerHTML = '';
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      coursesList.innerHTML = filtered.map((course, index) => {
        const courseName = SecurityHelper.sanitizeHTML(course.name);
        const uniName = SecurityHelper.sanitizeHTML(course.exactUniversityName || course.university);
        const city = course.city && course.city !== 'Unknown (approximate location)' ? SecurityHelper.sanitizeHTML(course.city) : '';
        const region = course.region ? SecurityHelper.sanitizeHTML(course.region) : '';
        
        return `
        <div class="course-card" data-course-id="${course.id}" style="animation-delay: ${index * 0.05}s">
          <h4>${courseName}</h4>
          <div class="university-name">
            <i class="fas fa-university"></i>
            ${uniName}
          </div>
          <div class="course-meta">
            <span class="course-duration">
              <i class="fas fa-clock"></i>
              ${course.duration}
            </span>
            <span class="course-language language-english">
              ${course.language}
            </span>
          </div>
          ${city ? `
            <div class="location-info" style="font-size: 0.8rem; color: var(--text-tertiary); margin-top: 5px;">
              <i class="fas fa-map-marker-alt"></i>
              ${city}, ${region}
            </div>
          ` : ''}
        </div>
      `}).join('');
      
      coursesList.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => this.selectCourse(card.dataset.courseId));
      });
    }
  }

  selectCourse(courseId) {
    const course = this.filteredCourses.find(c => c.id === courseId);
    if (!course) return;
    
    this.selectedCourse = course;
    this.updateBreadcrumb('course', course.name.substring(0, 30) + (course.name.length > 30 ? '...' : ''));
    this.showCourseDetailsModal(course);
    this.updateMapForCurrentView();
  }

  filterCourses() {
    // Get the search input based on current course type
    const searchInput = document.getElementById(`${this.currentCourseType}-search`);
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    // Get the field filter
    const fieldFilter = document.getElementById('courses-field-filter');
    const fieldFilterValue = fieldFilter ? fieldFilter.value : 'all';
    
    if (this.courseViewMode === 'fields') {
      const fieldsList = document.getElementById('fields-list');
      const emptyState = document.getElementById('courses-empty-state');
      
      let fieldsToShow = this.dataManager.courses[this.currentCourseType].fields;
      
      if (fieldFilterValue !== 'all') {
        fieldsToShow = fieldsToShow.filter(field => field.id === fieldFilterValue);
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
        this.renderFilteredFields(fieldsToShow);
      }
    } else if (this.courseViewMode === 'subfields' && this.selectedField) {
      const subfieldsList = document.getElementById('subfields-list');
      const emptyState = document.getElementById('courses-empty-state');
      
      let subfieldsToShow = this.selectedField.subfields;
      
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
            <h4>${SecurityHelper.sanitizeHTML(subfield.name)}</h4>
            <div class="course-count">
              <i class="fas ${this.currentCourseType === 'masters' ? 'fa-graduation-cap' : 'fa-book-open'}"></i>
              ${subfield.courses.length} courses available
            </div>
          </div>
        `).join('');
        
        subfieldsList.querySelectorAll('.subfield-card').forEach(card => {
          card.addEventListener('click', () => this.selectSubfield(card.dataset.subfieldId));
        });
      }
    } else if (this.courseViewMode === 'courses' && this.selectedSubfield) {
      this.filterCoursesForList(this.selectedSubfield.courses);
    }
    
    this.updateMapForCurrentView();
  }

  renderFilteredFields(fieldsToShow) {
    const fieldsList = document.getElementById('fields-list');
    fieldsList.innerHTML = fieldsToShow.map(field => `
      <div class="field-card" data-field-id="${field.id}">
        <div class="field-icon" style="background: ${field.color}; color: white;">
          <i class="${field.icon}"></i>
        </div>
        <h3>${SecurityHelper.sanitizeHTML(field.name)}</h3>
        <p style="color: var(--text-tertiary); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">
          Explore ${field.subfields.reduce((total, subfield) => total + subfield.courses.length, 0)} ${this.currentCourseType} courses
        </p>
        <div class="field-stats">
          <span class="field-stat">
            <i class="fas ${this.currentCourseType === 'masters' ? 'fa-graduation-cap' : 'fa-book-open'}"></i>
            ${field.subfields.length} subfields
          </span>
        </div>
      </div>
    `).join('');
    
    fieldsList.querySelectorAll('.field-card').forEach(card => {
      card.addEventListener('click', () => this.selectField(card.dataset.fieldId));
    });
  }

  updateBreadcrumb(level, text) {
    const breadcrumb = document.getElementById(`${this.currentCourseType}-breadcrumb-${level}`);
    if (breadcrumb) {
      breadcrumb.textContent = text;
      breadcrumb.disabled = false;
      
      const levels = ['field', 'subfield', 'course'];
      const currentIndex = levels.indexOf(level);
      
      for (let i = currentIndex + 1; i < levels.length; i++) {
        const nextBreadcrumb = document.getElementById(`${this.currentCourseType}-breadcrumb-${levels[i]}`);
        if (nextBreadcrumb) {
          nextBreadcrumb.textContent = levels[i].charAt(0).toUpperCase() + levels[i].slice(1);
          nextBreadcrumb.disabled = true;
        }
      }
    }
  }

  updateCoursesCount() {
    const count = this.dataManager.courses[this.currentCourseType].stats.total_courses;
    document.getElementById('courses-count').textContent = 
      `${count} ${this.currentCourseType} courses`;
  }

  resetCoursesView() {
    const searchInput = document.getElementById(`${this.currentCourseType}-search`);
    const fieldFilter = document.getElementById('courses-field-filter');
    
    if (searchInput) searchInput.value = '';
    if (fieldFilter) fieldFilter.value = 'all';
    
    this.resetBreadcrumb();
    this.selectedField = null;
    this.selectedSubfield = null;
    this.selectedCourse = null;
    this.courseViewMode = 'fields';
    
    this.loadFieldsView();
    this.updateMapForCurrentView();
  }

  resetBreadcrumb() {
    const levels = ['field', 'subfield', 'course'];
    levels.forEach(level => {
      const breadcrumb = document.getElementById(`${this.currentCourseType}-breadcrumb-${level}`);
      if (breadcrumb) {
        if (level === 'field') {
          breadcrumb.textContent = 'All Fields';
          breadcrumb.disabled = false;
        } else {
          breadcrumb.textContent = level.charAt(0).toUpperCase() + level.slice(1);
          breadcrumb.disabled = true;
        }
      }
    });
  }

  // ===== MODAL FUNCTIONS =====
  showUniversityDetails(universityId) {
    const university = this.dataManager.universities.find(u => u.id === universityId);
    if (!university) return;
    
    this.createUniversityModal(university);
  }

  showCourseDetailsModal(course) {
    this.createCourseModal(course);
  }

  createModal(type, data) {
    if (type === 'university') {
      this.createUniversityModal(data);
    } else if (type === 'course') {
      this.createCourseModal(data);
    }
  }

  createUniversityModal(university) {
    // Count courses
    const mastersCount = university.mastersCourses ? university.mastersCourses.length : 0;
    const bachelorsCount = university.bachelorsCourses ? university.bachelorsCourses.length : 0;
    const totalCourses = mastersCount + bachelorsCount;
    
    // Sanitize data
    const uniName = SecurityHelper.sanitizeHTML(university.name);
    const uniCity = SecurityHelper.sanitizeHTML(university.city);
    const uniRegion = SecurityHelper.sanitizeHTML(university.region);
    const uniDescription = SecurityHelper.sanitizeHTML(university.description);
    
    // Create courses HTML if available
    let coursesHTML = '';
    if (totalCourses > 0) {
      coursesHTML = `
        <div class="modal-courses">
          <h3>Available Courses (${totalCourses})</h3>
          <div class="modal-courses-list">
            ${mastersCount > 0 ? `
              <div class="course-category">
                <h4><i class="fas fa-graduation-cap"></i> Master Degrees (${mastersCount})</h4>
                ${university.mastersCourses.slice(0, 5).map(course => {
                  const courseName = SecurityHelper.sanitizeHTML(course.name);
                  const fieldName = SecurityHelper.sanitizeHTML(course.field);
                  return `
                  <div class="modal-course-item" data-course-id="${course.id}" data-course-type="masters">
                    <h4>${courseName}</h4>
                    <div class="course-meta">
                      <span class="course-field-badge" style="background: ${this.dataManager.getFieldColor(course.field, 'masters')}">
                        ${fieldName.split('–')[0].trim()}
                      </span>
                      <span class="course-duration">
                        <i class="fas fa-clock"></i> ${course.duration}
                      </span>
                    </div>
                  </div>
                `}).join('')}
                ${mastersCount > 5 ? `
                  <div class="show-more">
                    <span>+ ${mastersCount - 5} more master courses</span>
                  </div>
                ` : ''}
              </div>
            ` : ''}
            
            ${bachelorsCount > 0 ? `
              <div class="course-category">
                <h4><i class="fas fa-book-open"></i> Bachelor Degrees (${bachelorsCount})</h4>
                ${university.bachelorsCourses.slice(0, 5).map(course => {
                  const courseName = SecurityHelper.sanitizeHTML(course.name);
                  const fieldName = SecurityHelper.sanitizeHTML(course.field);
                  return `
                  <div class="modal-course-item" data-course-id="${course.id}" data-course-type="bachelors">
                    <h4>${courseName}</h4>
                    <div class="course-meta">
                      <span class="course-field-badge" style="background: ${this.dataManager.getFieldColor(course.field, 'bachelors')}">
                        ${fieldName.split('–')[0].trim()}
                      </span>
                      <span class="course-duration">
                        <i class="fas fa-clock"></i> ${course.duration}
                      </span>
                    </div>
                  </div>
                `}).join('')}
                ${bachelorsCount > 5 ? `
                  <div class="show-more">
                    <span>+ ${bachelorsCount - 5} more bachelor courses</span>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    } else {
      coursesHTML = `
        <div class="modal-courses">
          <h3>Available Courses</h3>
          <p style="color: var(--text-tertiary); font-style: italic;">
            No English-taught courses data available for this university.
          </p>
        </div>
      `;
    }
    
    // Determine which link to use for the apply button
    const applyLink = university.apply_link && university.apply_link.trim() !== '' 
      ? university.apply_link 
      : university.website;
    
    const applyButtonText = university.apply_link && university.apply_link.trim() !== ''
      ? 'Apply Now'
      : 'Visit University Website';
    
    // Create modal HTML
    const modalHTML = `
      <div id="university-modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-name">
        <div class="modal-overlay"></div>
        <div class="modal-content">
          <button class="modal-close" id="university-modal-close" aria-label="Close modal">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="modal-header">
            <div class="university-type" id="modal-type" style="background: ${
              university.type === 'university' ? 'rgba(52, 199, 89, 0.2)' :
              university.type === 'polytechnic' ? 'rgba(10, 132, 255, 0.2)' :
              'rgba(255, 159, 10, 0.2)'
            };">
              ${university.type.charAt(0).toUpperCase() + university.type.slice(1)}
            </div>
            <div class="university-year" id="modal-year">Est. ${university.founded}</div>
          </div>
          
          <div class="modal-body">
            <h2 id="modal-name">${uniName}</h2>
            <div class="modal-location">
              <i class="fas fa-map-marker-alt"></i>
              <span id="modal-city">${uniCity}</span>, 
              <span id="modal-region">${uniRegion}</span>
            </div>
            
            <div class="modal-stats">
              <div class="stat">
                <div class="stat-icon">
                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="stat-content">
                  <div class="stat-label">Founded</div>
                  <div class="stat-value" id="modal-founded">${university.founded}</div>
                </div>
              </div>
              <div class="stat">
                <div class="stat-icon">
                  <i class="fas fa-flag"></i>
                </div>
                <div class="stat-content">
                  <div class="stat-label">Region</div>
                  <div class="stat-value" id="modal-region-full">${uniRegion}</div>
                </div>
              </div>
              <div class="stat">
                <div class="stat-icon">
                  <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="stat-content">
                  <div class="stat-label">Courses</div>
                  <div class="stat-value">${totalCourses}</div>
                </div>
              </div>
            </div>
            
            <div class="modal-description">
              <h3>About</h3>
              <p id="modal-description">${uniDescription}</p>
            </div>
            
            ${coursesHTML}
            
            <div class="modal-actions">
              <a href="${applyLink}" target="_blank" class="btn-primary">
                <i class="fas fa-external-link-alt"></i>
                ${applyButtonText}
              </a>
              <button class="btn-secondary" id="modal-locate">
                <i class="fas fa-map-pin"></i>
                Show on Map
              </button>
            </div>
          </div>
          
          <div class="modal-footer">
            <div class="italian-flag">
              <div class="flag-stripe green"></div>
              <div class="flag-stripe white"></div>
              <div class="flag-stripe red"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Setup event listeners
    const modal = document.getElementById('university-modal');
    const closeBtn = document.getElementById('university-modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const locateBtn = document.getElementById('modal-locate');
    
    const closeModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      setTimeout(() => {
        if (modal.parentNode) {
          modal.remove();
        }
      }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    locateBtn.addEventListener('click', () => {
      this.locateUniversityOnMap(university);
      closeModal();
    });
    
    // Add click listeners to course items
    modal.querySelectorAll('.modal-course-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const courseId = item.dataset.courseId;
        const courseType = item.dataset.courseType;
        this.showCourseFromUniversityModal(courseId, courseType);
        closeModal();
      });
    });
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEscape, { once: true });
  }

  // New method to show course from university modal
  showCourseFromUniversityModal(courseId, courseType) {
    // Switch to the appropriate view
    this.switchView(courseType === 'masters' ? 'masters' : 'bachelors');
    
    // Find the course
    let foundCourse = null;
    const courses = this.dataManager.courses[courseType];
    
    for (const field of courses.fields) {
      for (const subfield of field.subfields) {
        const course = subfield.courses.find(c => c.id === courseId);
        if (course) {
          foundCourse = course;
          
          // Set the selected field/subfield/course to navigate to it
          this.selectedField = field;
          this.selectedSubfield = subfield;
          this.selectedCourse = course;
          this.courseViewMode = 'courses';
          
          // Update UI
          this.loadFieldsView(); // Reset to fields view
          this.selectField(field.id); // Navigate to field
          this.selectSubfield(subfield.id); // Navigate to subfield
          this.filterCoursesForList(subfield.courses); // Show courses
          this.selectCourse(courseId); // Select and show the course modal
          
          break;
        }
      }
      if (foundCourse) break;
    }
    
    // Open courses panel if not already open
    if (!this.coursesPanelOpen) {
      this.openCoursesPanel();
    }
  }

  createCourseModal(course) {
    const university = this.dataManager.universities.find(u => u.id === course.universityId);
    const universityName = SecurityHelper.sanitizeHTML(university ? university.name : course.exactUniversityName || course.university);
    const locationText = university ? 
      `${SecurityHelper.sanitizeHTML(university.city)}, ${SecurityHelper.sanitizeHTML(university.region)}` : 
      (course.city && course.region ? 
        `${SecurityHelper.sanitizeHTML(course.city)}, ${SecurityHelper.sanitizeHTML(course.region)}` : 
        'Location information not available');
    
    const courseType = course.type || this.currentCourseType;
    const isMasters = courseType === 'masters';
    const modalId = isMasters ? 'master-course-modal' : 'bachelor-course-modal';
    const fieldColor = this.dataManager.getFieldColor(course.field, courseType);
    
    // Determine which link to use for the apply button
    const applyLink = university && university.apply_link && university.apply_link.trim() !== '' 
      ? university.apply_link 
      : (university ? university.website : '#');
    
    const applyButtonText = university && university.apply_link && university.apply_link.trim() !== ''
      ? 'Apply Now'
      : (university ? 'Visit University Website' : 'More Information');
    
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
    
    description += ' (Note: University location is approximate based on city name matching.)';
    
    const modalHTML = `
      <div id="${modalId}" class="modal" role="dialog" aria-modal="true" aria-labelledby="${modalId}-name">
        <div class="modal-overlay"></div>
        <div class="modal-content">
          <button class="modal-close" id="${modalId}-close" aria-label="Close modal">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="modal-header">
            <div class="course-field" id="${modalId}-field" style="background: ${fieldColor};">${SecurityHelper.sanitizeHTML(course.field)}</div>
            <div class="course-language" id="${modalId}-language">${course.language}</div>
          </div>
          
          <div class="modal-body">
            <h2 id="${modalId}-name">${SecurityHelper.sanitizeHTML(course.name)}</h2>
            <div class="modal-location">
              <i class="fas fa-university"></i>
              <span id="${modalId}-university">${universityName}</span>
              <span class="location-separator">•</span>
              <i class="fas fa-map-marker-alt"></i>
              <span id="${modalId}-location">${locationText}</span>
            </div>
            
            <div class="modal-stats">
              <div class="stat">
                <div class="stat-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="stat-content">
                  <div class="stat-label">Duration</div>
                  <div class="stat-value" id="${modalId}-duration">${course.duration}</div>
                </div>
              </div>
              <div class="stat">
                <div class="stat-icon">
                  <i class="fas fa-language"></i>
                </div>
                <div class="stat-content">
                  <div class="stat-label">Language</div>
                  <div class="stat-value" id="${modalId}-lang">${course.language}</div>
                </div>
              </div>
              <div class="stat">
                <div class="stat-icon">
                  <i class="fas fa-certificate"></i>
                </div>
                <div class="stat-content">
                  <div class="stat-label">Degree</div>
                  <div class="stat-value" id="${modalId}-degree">${course.courseType}</div>
                </div>
              </div>
            </div>
            
            <div class="modal-description">
              <h3>About this Program</h3>
              <p id="${modalId}-description">${SecurityHelper.sanitizeHTML(description)}</p>
            </div>
            
            <div class="modal-actions">
              <a href="${applyLink}" target="_blank" class="btn-primary">
                <i class="fas fa-external-link-alt"></i>
                ${applyButtonText}
              </a>
              ${course.coordinates ? `
                <button class="btn-secondary" id="${modalId}-locate-university">
                  <i class="fas fa-map-pin"></i>
                  Show University
                </button>
              ` : ''}
            </div>
          </div>
          
          <div class="modal-footer">
            <div class="italian-flag">
              <div class="flag-stripe green"></div>
              <div class="flag-stripe white"></div>
              <div class="flag-stripe red"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Setup event listeners
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(`${modalId}-close`);
    const overlay = modal.querySelector('.modal-overlay');
    const locateBtn = document.getElementById(`${modalId}-locate-university`);
    
    const closeModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      setTimeout(() => {
        if (modal.parentNode) {
          modal.remove();
        }
      }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    if (course.coordinates && locateBtn) {
      locateBtn.addEventListener('click', () => {
        this.locateCourseOnMap(course);
        closeModal();
      });
    }
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEscape, { once: true });
  }

  locateUniversityOnMap(university) {
    if (!university || !this.map) return;
    
    this.map.setView([university.lat, university.lng], 14);
    
    this.markersCluster.eachLayer(layer => {
      if (layer.getLatLng().lat === university.lat && layer.getLatLng().lng === university.lng) {
        layer.openPopup();
      }
    });
  }

  locateCourseOnMap(course) {
    if (!course || !course.coordinates || !this.map) return;
    
    this.map.setView(course.coordinates, 14);
    
    this.courseMarkers.eachLayer(layer => {
      if (layer.getLatLng().lat === course.coordinates[0] && 
          layer.getLatLng().lng === course.coordinates[1]) {
        layer.openPopup();
      }
    });
  }

  selectCourseFromMap(courseId, courseType) {
    let foundCourse = null;
    
    for (const field of this.dataManager.courses[courseType].fields) {
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
      this.selectedCourse = foundCourse;
      this.showCourseDetailsModal(foundCourse);
    }
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    console.log('🔌 Setting up event listeners...');
    
    // View toggles
    document.getElementById('view-universities').addEventListener('click', () => this.switchView('universities'));
    document.getElementById('view-masters').addEventListener('click', () => this.switchView('masters'));
    document.getElementById('view-bachelors').addEventListener('click', () => this.switchView('bachelors'));
    
    // Universities view
    document.getElementById('search-input').addEventListener('input', 
      PerformanceHelper.debounce(() => this.filterUniversities(), 300)
    );
    document.getElementById('clear-search').addEventListener('click', () => {
      document.getElementById('search-input').value = '';
      this.filterUniversities();
    });
    
    document.getElementById('type-filter').addEventListener('change', () => this.filterUniversities());
    document.getElementById('sort-filter').addEventListener('change', () => this.filterUniversities());
    
    document.getElementById('toggle-sidebar').addEventListener('click', () => this.toggleSidebar());
    document.getElementById('sidebar-close').addEventListener('click', () => this.closeSidebar());
    
    // Courses view search and filter events
    const clearMastersSearch = document.getElementById('clear-masters-search');
    const resetMasters = document.getElementById('reset-masters');
    const mastersSearch = document.getElementById('masters-search');
    
    if (clearMastersSearch) {
      clearMastersSearch.addEventListener('click', () => {
        if (mastersSearch) mastersSearch.value = '';
        this.filterCourses();
      });
    }
    
    if (resetMasters) resetMasters.addEventListener('click', () => this.resetCoursesView());
    if (mastersSearch) mastersSearch.addEventListener('input', 
      PerformanceHelper.debounce(() => this.filterCourses(), 300)
    );
    
    // Bachelors view
    const clearBachelorsSearch = document.getElementById('clear-bachelors-search');
    const resetBachelors = document.getElementById('reset-bachelors');
    const bachelorsSearch = document.getElementById('bachelors-search');
    
    if (clearBachelorsSearch) {
      clearBachelorsSearch.addEventListener('click', () => {
        if (bachelorsSearch) bachelorsSearch.value = '';
        this.filterCourses();
      });
    }
    
    if (resetBachelors) resetBachelors.addEventListener('click', () => this.resetCoursesView());
    if (bachelorsSearch) bachelorsSearch.addEventListener('input', 
      PerformanceHelper.debounce(() => this.filterCourses(), 300)
    );
    
    // Field filter for courses panel (shared between masters and bachelors)
    const coursesFieldFilter = document.getElementById('courses-field-filter');
    if (coursesFieldFilter) {
      coursesFieldFilter.addEventListener('change', () => this.filterCourses());
    }
    
    // Courses panel close
    document.getElementById('courses-panel-close').addEventListener('click', () => this.closeCoursesPanel());
    
    // Reset buttons
    document.getElementById('reset-view').addEventListener('click', () => this.resetAll());
    document.getElementById('reset-filters').addEventListener('click', () => this.resetAll());
    document.getElementById('reset-filters-empty').addEventListener('click', () => this.resetAll());
    document.getElementById('reset-courses-filters').addEventListener('click', () => this.resetCoursesView());
    document.getElementById('reset-courses-filters-empty').addEventListener('click', () => this.resetCoursesView());
    
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
    
    // Breadcrumb listeners
    this.setupBreadcrumbListeners();
    
    // Mobile-specific event handling
    this.setupMobileEventListeners();
    
    console.log('✅ Event listeners setup complete');
  }

  setupMobileEventListeners() {
    // Mobile-specific: Close courses panel when tapping outside
    if (window.innerWidth <= 768) {
      document.addEventListener('click', (e) => {
        const coursesPanel = document.getElementById('courses-panel');
        const mastersBtn = document.getElementById('view-masters');
        const bachelorsBtn = document.getElementById('view-bachelors');
        
        // Check if click is outside courses panel
        if (this.coursesPanelOpen && 
            coursesPanel && 
            !coursesPanel.contains(e.target) &&
            e.target !== mastersBtn && 
            e.target !== bachelorsBtn &&
            !mastersBtn.contains(e.target) &&
            !bachelorsBtn.contains(e.target)) {
          this.closeCoursesPanel();
        }
      });
    }
  }

  setupBreadcrumbListeners() {
    // Masters breadcrumb
    const mastersLevels = ['field', 'subfield', 'course'];
    mastersLevels.forEach(level => {
      const breadcrumb = document.getElementById(`masters-breadcrumb-${level}`);
      if (breadcrumb) {
        breadcrumb.addEventListener('click', () => {
          if (!breadcrumb.disabled) {
            this.handleBreadcrumbClick(level);
          }
        });
      }
    });
    
    // Bachelors breadcrumb
    const bachelorsLevels = ['field', 'subfield', 'course'];
    bachelorsLevels.forEach(level => {
      const breadcrumb = document.getElementById(`bachelors-breadcrumb-${level}`);
      if (breadcrumb) {
        breadcrumb.addEventListener('click', () => {
          if (!breadcrumb.disabled) {
            this.handleBreadcrumbClick(level);
          }
        });
      }
    });
  }

  handleBreadcrumbClick(level) {
    switch(level) {
      case 'field':
        this.loadFieldsView();
        break;
      case 'subfield':
        if (this.selectedField) {
          this.selectField(this.selectedField.id);
        }
        break;
      case 'course':
        if (this.selectedSubfield) {
          this.selectSubfield(this.selectedSubfield.id);
        }
        break;
    }
  }

  resetAll() {
    // Reset map
    this.map.setView(CONFIG.map.center, CONFIG.map.zoom);
    
    // Reset universities view
    document.getElementById('search-input').value = '';
    document.getElementById('type-filter').value = 'all';
    document.getElementById('sort-filter').value = 'name';
    document.getElementById('sidebar-title').textContent = 'Italian Universities';
    
    this.selectedRegion = null;
    this.filteredUniversities = [...this.dataManager.universities];
    
    this.filterUniversities();
    
    if (window.innerWidth <= 768) {
      this.closeSidebar();
      this.closeCoursesPanel();
    }
  }
}

// ===== GLOBAL APP INSTANCE =====
const app = {
  dataManager: null,
  ui: null,
  
  async initialize() {
    console.log('🚀 Initializing Italian Universities App...');
    
    try {
      this.dataManager = new DataManager();
      
      // 1. Load universities
      this.dataManager.loadUniversities();
      
      if (!this.dataManager.universities || this.dataManager.universities.length === 0) {
        throw new Error('No universities loaded');
      }
      
      console.log(`✅ Loaded ${this.dataManager.universities.length} universities`);
      
      // 2. Load courses data with better error handling
      try {
        const loaded = await this.dataManager.loadCoursesData();
        if (loaded) {
          console.log(`📊 Courses data loaded successfully`);
        } else {
          console.warn('⚠️ Courses data not available, continuing with universities only');
          this.showUserNotification('Courses data could not be loaded. Some features may be limited.', 'warning');
        }
      } catch (courseError) {
        console.warn('⚠️ Courses data loading failed:', courseError);
        this.showUserNotification('Unable to load course data. Universities map is still available.', 'info');
      }
      
      // 3. Initialize UI
      this.ui = new UIManager(this.dataManager);
      
      // 4. Validate data
      setTimeout(() => {
        if (this.ui.filteredUniversities.length === 0) {
          console.warn('⚠️ filteredUniversities is empty! Forcing reload...');
          this.ui.filteredUniversities = [...this.dataManager.universities];
          this.ui.renderUniversitiesList();
          this.ui.updateResultsCount();
          this.ui.renderUniversityMarkers(this.ui.filteredUniversities);
        }
      }, 500);
      
    } catch (error) {
      console.error('❌ Initialization failed:', error);
      this.showUserNotification('Failed to load application data. Please refresh the page.', 'error');
      
      const loading = document.getElementById('loading');
      if (loading) {
        loading.innerHTML = `
          <div class="loading-content">
            <div class="loading-logo">
              <div class="flag-stripes">
                <div class="stripe green"></div>
                <div class="stripe white"></div>
                <div class="stripe red"></div>
              </div>
              <h1>Università d'Italia</h1>
            </div>
            <p class="loading-text" style="color: var(--italy-red);">
              <i class="fas fa-exclamation-triangle"></i>
              Failed to load data. Please refresh the page.
            </p>
            <button onclick="location.reload()" style="
              background: var(--italy-green);
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 6px;
              cursor: pointer;
              margin-top: 20px;
              font-family: 'Inter', sans-serif;
            ">
              Reload Page
            </button>
          </div>
        `;
      }
    }
  },

  // User notification helper
  showUserNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `user-notification ${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
      <span>${SecurityHelper.sanitizeHTML(message)}</span>
      <button class="notification-close" aria-label="Close notification">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'error' ? 'var(--italy-red)' : type === 'warning' ? 'var(--field-business)' : 'var(--italy-green)'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 2000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
  }
};

// ===== DEBUG HELPER =====
window.debugApp = function() {
  console.log('=== APP DEBUG INFO ===');
  console.log('DataManager universities:', app.dataManager?.universities?.length || 0);
  console.log('UI filteredUniversities:', app.ui?.filteredUniversities?.length || 0);
  console.log('Current view:', app.ui?.currentView || 'N/A');
  console.log('Current course type:', app.ui?.currentCourseType || 'N/A');
  
  if (app.dataManager?.universities) {
    console.log('First 3 universities:', app.dataManager.universities.slice(0, 3).map(u => u.name));
  }
  
  // Force reload if needed
  if (app.ui && app.ui.filteredUniversities.length === 0 && app.dataManager?.universities?.length > 0) {
    console.log('⚠️ Forcing reload of filteredUniversities...');
    app.ui.filteredUniversities = [...this.dataManager.universities];
    app.ui.renderUniversitiesList();
    app.ui.updateResultsCount();
    app.ui.renderUniversityMarkers(app.ui.filteredUniversities);
  }
};

// ===== GLOBAL EXPORTS =====
window.app = app;
window.showUniversityDetails = (id) => app.ui.showUniversityDetails(id);
window.selectCourseFromMap = (id, type) => app.ui.selectCourseFromMap(id, type);

// ===== INITIALIZE =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.initialize());
} else {
  app.initialize();
}