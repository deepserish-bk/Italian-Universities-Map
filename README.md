# 🎓 Università d'Italia - Interactive Map

An immersive, interactive map of Italian public universities with beautiful UI and smooth animations.

## 🌟 Features

### 🗺️ Map Features
- Italy-restricted map view (cannot zoom out to world view)
- Dark charcoal region borders (not white)
- Custom red thumb pin markers
- Region click interaction
- Marker clustering for dense areas
- Full-screen map mode

### 🎨 UI/UX Features
- Beautiful hero section with smooth scroll to map
- Collapsible sidebar (can be hidden for full immersion)
- Regional grouping of universities (north-to-south)
- Advanced filtering and sorting
- Elegant modal with university details
- Mobile-optimized responsive design
- Italian flag color theme throughout

### ⚡ Performance Features
- Debounced search (no lag)
- Optimized marker rendering
- Smooth animations and transitions
- Progressive loading

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   cd italian-universities-map
   npm install
  ```
Add GeoJSON file:

Download Italy regions GeoJSON file
Place it in geojson/italy-regions.geojson
Run the application:

```bash
npm start
```
# or
```bash
python3 -m http.server 8000
Open in browser:
```
Navigate to http://localhost:8000
📁 Project Structure

text
```bash
italian-universities-map/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Complete CSS with Italian theme
├── js/
│   ├── config.js          # Configuration constants
│   ├── utils.js           # Utility functions
│   ├── data.js            # Complete university data with coordinates
│   ├── map.js             # Map management module
│   ├── ui.js              # UI management module
│   └── app.js             # Main application file
├── geojson/
│   └── italy-regions.geojson  # Italy regions data (to be added)
├── images/                # Image assets
├── fonts/                 # Custom fonts (optional)
└── README.md              # This file
🎯 Usage
```
Exploring Universities

Start at the hero section - Click "Explore the Map" or scroll down
Interact with the map - Click regions to filter universities
Use the sidebar - Search, filter by type, sort options
View details - Click any university card or map marker
Toggle full-screen - Click the expand button for immersive view
Navigation Tips

Click a region → Shows only universities from that region
Click same region again → Clears regional filter
Click sidebar toggle → Shows/hides the sidebar
Use ESC key → Closes modal or sidebar on mobile
Arrow keys → Navigate between universities in modal
🎨 Customization

Changing Colors

Edit CSS variables in css/style.css:

css
:root {
  --italy-green: #008C45;
  --italy-white: #F4F5F0;
  --italy-red: #CD212A;
  /* ... other variables */
}
Adding Universities

Edit js/data.js and add to the UNIVERSITIES array:

javascript
{
  id: "unique-id",
  name: "University Name",
  city: "City",
  region: "Region",
  type: "university", // or "polytechnic" or "special"
  founded: 2024,
  website: "https://example.com",
  lat: 45.1234,
  lng: 9.8765,
  description: "Description here..."
}
Map Configuration

Edit js/config.js to adjust:

Map bounds
Initial view
Tile layers
Region styling
Cluster settings
📱 Responsive Design

Desktop (>1024px): Full sidebar, map controls
Tablet (768px-1024px): Responsive sidebar, adjusted layout
Mobile (<768px): Bottom sheet modals, optimized touch targets
🐛 Troubleshooting

Map Not Loading

Ensure geojson/italy-regions.geojson exists
Check browser console for errors
Verify internet connection (OpenStreetMap tiles require internet)
Markers Not Showing

Check coordinates in js/data.js
Verify university data structure
Check browser console for JavaScript errors
Performance Issues

Use Chrome DevTools Performance tab
Check network tab for slow resources
Consider reducing animation complexity on low-end devices
🔧 Development

Build Tools

No build tools required! This is vanilla JavaScript.

Adding Features

Add new functionality to appropriate module
Update event bridges in app.js if needed
Test across browsers and devices
Testing

Open in multiple browsers (Chrome, Firefox, Safari)
Test on mobile devices
Verify keyboard navigation
Check screen reader compatibility
📄 License

MIT License - feel free to use, modify, and distribute.

🙏 Acknowledgments

Leaflet.js for mapping
OpenStreetMap for tile data
Font Awesome for icons
Google Fonts for typography
All Italian universities for their data
Made with ❤️ in Italy 🇮🇹
