# Troubleshooting Guide - Alaria Map

## Console Errors You're Seeing

### 1. "export declarations may only appear at the top level of a module"
**Cause**: This is likely from a third-party script (possibly an analytics or extension)
**Solution**: Ignore this error - it's not from our code. Check if you have browser extensions that inject scripts.

### 2. "import declarations may only appear at the top level of a module"
**Cause**: Same as above - external script issue
**Solution**: Same as above

### 3. "firebase is not defined on database.js:4"
**Cause**: Another external file trying to use Firebase
**Solution**: This might be a browser extension. Check your extensions or open the page in an incognito window.

### 4. "multiple cookies rejected for invalid domain"
**Cause**: Browser security policy for cookies
**Solution**: This is normal for GitHub Pages and local files. Should not affect functionality.

## Testing the Multi-User Features

### Step 1: Check if the Player Modal Shows
1. Open your browser's Developer Console (F12)
2. Look for the message: `"Initializing player modal..."`
3. If you see this, the modal loaded correctly
4. The player name input should be focused and ready

### Step 2: Enter a Player Name
1. Type a character name (e.g., "Aragorn")
2. Click "Join Campaign" or press Enter
3. Watch the console for: `"Player joined: { playerName, sessionId, playerId }"`

### Step 3: Check Firebase Connection
1. After joining, look for: `"Firebase initialized successfully"`
2. You should see: `"Initializing session..."`
3. Then: `"Registering player presence..."`
4. And: `"Setting up annotation listener..."`

### Step 4: Test Drawing
1. The player name modal should disappear
2. The map should load with the toolbar
3. Active players should show in the toolbar (e.g., "🎭 Players: Aragorn (You)")
4. Try drawing on the map with the pen tool
5. You should see the annotation appear in the sidebar

## Full Console Output Should Look Like:

```
Firebase initialized successfully
Initializing player modal...
Player joined: {playerName: "Aragorn", sessionId: "default-session", playerId: "player_..."}
Initializing session...
Registering player presence...
Setting up annotation listener...
Setting up player presence listener...
```

## If You Don't See These Messages

### Modal not appearing?
- Check: `document.getElementById('player-modal')` in console
- Look for error: `"Player modal element not found!"`
- Make sure JavaScript is enabled

### Can't join?
- Check: `document.getElementById('player-name-input')` in console
- Look for error: `"Player name input not found!"`
- Try typing a name and checking the border color change

### Firebase errors?
- Check console for: `"Firebase not initialized"`
- Wait 1-2 seconds for Firebase to load (it comes from CDN)
- Try refreshing the page

## Testing Multi-User (Two Browsers)

1. **Browser 1**: Open the map, enter player name "Player 1"
2. **Browser 2**: Open the SAME URL in a different browser window
3. **Enter name "Player 2"** in Browser 2
4. **Check Browser 1**: You should see "🎭 Players: Player 1 (You)  Player 2"
5. **Draw in Browser 1**: The annotation should appear in Browser 2
6. **Draw in Browser 2**: The annotation should appear in Browser 1

## Browser Console Commands to Test

### Check if Firebase is loaded:
```javascript
typeof firebase
// Should return: "object" (not "undefined")
```

### Check if database is connected:
```javascript
db
// Should return: the Firestore database instance
```

### Check active players:
```javascript
activePlayersMap
// Should return an object with player entries
```

### Check current session:
```javascript
sessionId
// Should return something like: "default-session"
```

### Check player name:
```javascript
playerName
// Should return your entered name
```

## Next Steps if Something Doesn't Work

1. Check your browser's Network tab - are Firebase scripts loading?
2. Try in a different browser (Chrome, Firefox, Safari)
3. Try in an incognito/private window (disables extensions)
4. Clear browser cache and reload
5. Check that your Firebase project allows unauthenticated reads/writes

## GitHub Pages Specific

If you're testing via GitHub Pages (not localhost):

1. Your site: `https://yourusername.github.io/repo-name/`
2. Add `?session=test-session` to the URL to test session separation
3. Open the page in multiple tabs/windows with the SAME session URL
4. All windows should sync in real-time

## Firebase Permissions

The console errors related to Firebase might indicate the database doesn't allow unauthenticated access.

Your Firestore rules should allow unauthenticated reads and writes for testing:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

If you see "Permission denied" errors, update your Firebase rules in the Google Cloud Console.
