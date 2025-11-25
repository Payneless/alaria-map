# Testing Guide - What Should Happen Now

## What You Should See When You Load the Page

### Expected Behavior:

1. **Page loads** → Browser console shows:
   ```
   Waiting for DOMContentLoaded...
   startApp() called
   Tools disabled until player joins
   Modal visibility ensured
   Initializing player modal...
   Player modal initialized
   Input focused
   ```

2. **Modal appears** → Beautiful dark modal with:
   - ⚔️ "Enter Your Name" heading
   - Text input field (auto-focused)
   - "Join Campaign" button
   - Dark background with blur effect

3. **Toolbar is visible** → But all tools are:
   - Grayed out (50% opacity)
   - Disabled (cannot click)
   - Shows: Pen, Line, Rectangle, Circle, Text, Color picker, Brush size, etc.

4. **Map is visible** → Behind the modal with the ZoomHub fantasy map

## Testing Steps

### Step 1: Join as a Player
1. Type your character name (e.g., "Aragorn")
2. Click "Join Campaign" or press Enter
3. Watch console for:
   ```
   Player joined: {playerName: "Aragorn", sessionId: "default-session", playerId: "player_..."}
   Initializing session...
   Tools enabled for player
   Registering player presence...
   Setting up annotation listener...
   Setting up player presence listener...
   ```

### Step 2: Modal Should Disappear
- Modal fades/hides
- Toolbar tools become enabled (full opacity, clickable)
- "🎭 Players: Aragorn (You)" appears in toolbar
- Status shows: "Joined as Aragorn"

### Step 3: Test Drawing
1. Click the pen tool (✏️) - should be active
2. Draw on the map - should see your strokes
3. Click sidebar toggle (📋) - should show your annotation
4. Close sidebar, draw more - annotations should appear in list

### Step 4: Test Multi-User (Two Browser Windows)
1. **Window 1**: Already joined as "Aragorn"
2. **Window 2**: Open same URL with `?session=default-session`
3. **Window 2**: Join as "Legolas"
4. **Check Window 1**: Should show both players
   - "🎭 Players: Aragorn (You)  Legolas"
5. **Draw in Window 1**: Should sync to Window 2
6. **Draw in Window 2**: Should sync to Window 1

### Step 5: Test Different Sessions
1. **Window 1**: `https://yoursite/alaria-map/?session=campaign-1`
2. **Window 2**: `https://yoursite/alaria-map/?session=campaign-2`
3. Each session should have separate annotations
4. Drawings in session 1 don't appear in session 2

## Console Commands to Verify Setup

```javascript
// Check if modal is visible
document.getElementById('player-modal').style.display
// Should return: "flex" (or empty string = visible)

// Check if tools are enabled
document.getElementById('tool-pen').disabled
// Should return: false after joining, true before

// Check current player
playerName
// Should return your character name

// Check current session
sessionId
// Should return "default-session" or your session param

// Check active players
activePlayersMap
// Should show all players in session
```

## If Modal Doesn't Appear

### Debug in Console:
```javascript
// Is the modal in the DOM?
document.getElementById('player-modal')
// Should return: the div element (not null)

// Is it visible?
document.getElementById('player-modal').style.display
// Should be: "flex"

// Has hidden class?
document.getElementById('player-modal').classList.contains('hidden')
// Should be: false
```

### Try Forcing It Visible:
```javascript
document.getElementById('player-modal').style.display = 'flex'
document.getElementById('player-modal').style.zIndex = '9999'
```

## If Tools Don't Enable After Joining

### Check:
```javascript
// Are tools still disabled?
document.getElementById('tool-pen').disabled
// Should be: false

// Check opacity
document.getElementById('tool-pen').style.opacity
// Should be: "1"
```

### Try Enabling Manually:
```javascript
enableTools()
```

## Expected Console Output Timeline

```
1. Waiting for DOMContentLoaded...
2. startApp() called
3. Tools disabled until player joins
4. Modal visibility ensured
5. Initializing player modal...
6. Player modal initialized
7. Input focused
   [Player enters name and presses Enter]
8. Player joined: {playerName: "Aragorn", ...}
9. Initializing session...
10. Tools enabled for player
11. Registering player presence...
12. Setting up annotation listener...
13. Setting up player presence listener...
14. Firebase initialized successfully
15. [Drawing and syncing works]
```

## Troubleshooting

| Problem | Check | Solution |
|---------|-------|----------|
| Modal doesn't show | Console for errors | Refresh page, check console |
| Can't click Join button | Is input field empty? | Type a name first |
| Tools still disabled after join | Check console for errors | Refresh and try again |
| No players shown | Check session URL | Make sure both windows use same session param |
| Drawings don't sync | Check Firebase errors | Verify Firebase is loaded |
| Drawing is invisible | Check canvas z-index | Try switching to nav mode and back |

## Next Steps After Successful Testing

1. Deploy to GitHub Pages
2. Share campaign session URL with your D&D group
3. Everyone opens the URL with same session parameter
4. All players join with their character names
5. Start annotating the map together!
