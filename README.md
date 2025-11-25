# Alaria Map - Collaborative D&D Campaign Annotation Tool

A real-time collaborative map annotation tool built for D&D campaign reference maps. Multiple players can draw, annotate, and share observations on a fantasy map embed with instant synchronization.

## Features

- **🎭 Multi-User Collaboration** - Multiple players can annotate simultaneously with real-time sync
- **✏️ Drawing Tools** - Pen, lines, rectangles, circles, and text labels
- **🎨 Customizable Colors & Sizes** - Full control over brush color and size
- **📋 Annotation List** - Sidebar shows all annotations with creator attribution
- **⚔️ Session-Based** - Create shareable campaign sessions via URL parameters
- **🔄 Live Presence** - See who's currently viewing/editing the map
- **🗺️ ZoomHub Integration** - High-resolution fantasy map embed
- **💾 Auto-Save** - All annotations sync to Firestore in real-time
- **⌨️ Keyboard Shortcuts** - Quick access to tools (p=pen, l=line, r=rect, c=circle, t=text, z=undo)

## Getting Started

### Deploy to GitHub Pages

1. Push code to your repository
2. Go to **Settings → Pages**
3. Select "Deploy from a branch"
4. Choose your branch and save
5. Your site will be available at: `https://yourusername.github.io/alaria-map/`

### Hosting Anywhere Else

Since this is a single static HTML file, you can host it anywhere that serves static files:
- GitHub Pages (recommended)
- Netlify
- Vercel
- Any static file host
- Local file (`file://` in browser)

## How to Use

### Joining a Campaign

1. Open the map in your browser
2. Enter your character name in the modal
3. Click "Join Campaign" (or press Enter)
4. You'll see the active players list at the top

### Creating a Campaign Session

By default, all players join the `default-session`. To create separate campaigns, use URL parameters:

```
https://yourusername.github.io/alaria-map/?session=lost-mines
https://yourusername.github.io/alaria-map/?session=curse-of-strahd
https://yourusername.github.io/alaria-map/?session=waterdeep-intrigue
```

Each session has its own set of annotations that persist in Firebase.

### Drawing Tools

| Tool | Shortcut | Usage |
|------|----------|-------|
| **Pen** | `P` | Freehand drawing for marks and notes |
| **Line** | `L` | Draw straight lines between points |
| **Rectangle** | `R` | Create rectangular regions or areas |
| **Circle** | `C` | Draw circular areas (radius from center) |
| **Text** | `T` | Add location names or descriptions |
| **Undo** | `Z` | Revert last action |
| **Delete** | `Delete` | Remove selected annotation |

### Map Navigation

- **Draw Mode** (default): Make annotations on the map
- **Navigate Mode**: Pan and zoom the map
  - Click the "✏️ Draw" button to toggle between modes
  - In Navigate Mode, you can freely pan/zoom the ZoomHub map

### Features in Detail

#### Active Players Display
The toolbar shows all players currently in the session with badges:
- Your name is highlighted as "(You)"
- Other players show their character names
- Players are automatically removed when they disconnect

#### Annotation Attribution
In the sidebar, each annotation shows:
- Type (Text Label, Line, Rectangle, Circle, Drawn Path)
- Details (dimensions, point count, text preview)
- Creator's name (who drew it)

Click any annotation to select it on the map.

#### Color & Size Customization
- Use the color picker to choose your brush color
- Adjust brush size with the slider (1-20px)
- These settings apply to all future annotations

## How It Works

### Data Structure

Annotations are stored in Firestore with the following structure:

```
alaria-map/
├── [sessionId]/
│   ├── annotations/
│   │   ├── ann_[id]/
│   │   │   ├── object: {} (Fabric.js object data)
│   │   │   ├── creator: "Character Name"
│   │   │   ├── creatorId: "player_[unique_id]"
│   │   │   ├── timestamp: [server timestamp]
│   │   │   └── type: "path|line|rect|circle|text"
│   │
│   └── players/
│       └── player_[id]/
│           ├── name: "Character Name"
│           ├── joinedAt: [timestamp]
│           └── lastActive: [timestamp]
```

### Real-Time Synchronization

- **Listeners**: Each client listens to their session's annotations and players collections
- **Debounced Saves**: Annotations are saved when objects are added/modified/removed
- **Conflict Resolution**: Server-side timestamps ensure consistent ordering
- **Live Presence**: Player documents automatically update every 30 seconds
- **Auto-Cleanup**: Players are removed from the list when they disconnect or close the page

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `P` | Activate Pen tool |
| `L` | Activate Line tool |
| `R` | Activate Rectangle tool |
| `C` | Activate Circle tool |
| `T` | Activate Text tool |
| `Z` | Undo last action |
| `Delete` | Delete selected annotation |
| `Enter` (in modal) | Join campaign |

## Troubleshooting

### Annotations not syncing?
- Check browser console for errors (F12 → Console)
- Ensure you're connected to the internet
- Try refreshing the page

### Can't see other players?
- They may have just joined - refresh to see them
- Check if they're in the same session URL
- Ensure Firebase is loading (check network tab)

### Performance issues?
- Try closing/reopening the sidebar
- Clear browser cache and reload
- Close other tabs using the map

### Local Testing
- Open `index.html` directly in your browser
- It will try to connect to Firestore (requires internet)
- Other players can join the same session to test collaboration

## Customization

### Change the Default Session Name
Edit the `getSessionId()` function in `index.html`:
```javascript
function getSessionId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('session') || 'your-campaign-name'; // Change this
}
```

### Change the Map Embed
The ZoomHub embed is at line 311 in `index.html`. Replace with your own map:
```html
<script src="https://zoomhub.net/YOUR_MAP_ID.js?width=100%&height=100%&border=none"></script>
```

### Customize the Theme
Modify the CSS variables in the `<style>` section:
- `#d4af37` - Gold/accent color
- `#1a1429` - Dark background
- `#8b7355` - Brown borders

## Technical Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Firebase sync)
- JavaScript enabled
- No server-side code (100% client-side)

## Browser Support

- ✅ Chrome/Edge 95+
- ✅ Firefox 90+
- ✅ Safari 14+
- ⚠️ Mobile (touch support limited)

## Deployment Checklist

- [ ] Push code to GitHub repository
- [ ] Enable GitHub Pages in repository settings
- [ ] Test the live site with multiple browser windows
- [ ] Share session URLs with your D&D group
- [ ] Verify annotations sync in real-time
- [ ] Test on mobile devices (if needed)

## Tips for D&D Campaigns

1. **Create unique session URLs** for each campaign (e.g., `?session=dragon-heist`)
2. **Share the full URL** with your party (bookmark it)
3. **Use text labels** to mark locations (cities, dungeons, forests)
4. **Use different colors** for different players or annotation types
5. **Keep the sidebar open** to see who's contributing
6. **Use circles** to mark areas of interest or danger zones
7. **Use lines** to show travel routes between locations
8. **Draw freehand** for fog of war or special areas

## Architecture

- **Frontend**: Vanilla JavaScript + Fabric.js (canvas drawing)
- **Mapping**: ZoomHub embed (fantasy map viewer)
- **Backend**: Firebase Firestore (real-time database)
- **Deployment**: Static hosting (GitHub Pages, etc.)
- **Synchronization**: Firestore `onSnapshot` listeners

## License

Created for collaborative D&D campaign mapping.

## Support

For issues or feature requests, check the browser console (F12) for error messages and share them if reporting issues.

---

**Happy mapping! May your campaigns be legendary.** ⚔️🗺️🐉
