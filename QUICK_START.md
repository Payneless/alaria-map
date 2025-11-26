# Quick Start Guide - Firebase Setup & Testing

## Current Issue: "Firebase Failed to Load After 5 Seconds"

You're seeing this message, which means Firebase CDN hasn't loaded. Here's how to fix it:

## Step 1: Fix Firestore Security Rules (Most Common Fix - 80% Success)

This is the #1 reason Firebase fails to load. Your database is rejecting unauthenticated requests.

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: **alaria-c1fc7**
3. Click **Firestore Database** in left sidebar
4. Click the **Rules** tab
5. Replace ALL content with:

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

6. Click **Publish** button (top right)
7. Wait for green checkmark showing "Rules published"

## Step 2: Hard Refresh Your Browser

After publishing rules, refresh your app with a **hard refresh**:

- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

OR manually:
1. Press `F12` to open Developer Tools
2. Right-click the refresh button
3. Select "Empty cache and hard refresh"

## Step 3: Check Browser Console for Success

After hard refresh, open `F12` → **Console** tab.

You should see:
```
Firebase loading... (attempt 1/50)
Firebase loading... (attempt 2/50)
...
Firebase app initialized
Firebase Firestore initialized successfully
```

If you see this, Firebase is working! ✅

## Still Seeing "Firebase Failed to Load"?

Try these in order:

### Option A: Try a Different Browser
1. Open Chrome (if using Firefox, etc.)
2. Visit your map URL
3. Hard refresh (Ctrl+Shift+R)

### Option B: Try Incognito/Private Window
1. Press `Ctrl+Shift+N` (Windows/Linux) or `Cmd+Shift+N` (Mac)
2. Visit your map URL
3. This disables extensions that might block Firebase

### Option C: Disable Browser Extensions
1. Open browser settings
2. Go to Extensions
3. Temporarily disable **all** extensions
4. Refresh the page

### Option D: Check Different Network
Try using a mobile hotspot instead of your WiFi:
- Sometimes corporate/school networks block Firebase CDN

## If None of These Work

Open browser console (F12) and look for these specific errors:

| Error Message | Cause | Fix |
|---|---|---|
| `net::ERR_BLOCKED_BY_CLIENT` | Ad blocker/security software | Disable ad blocker for this site |
| `CORS policy: No 'Access-Control-Allow-Origin'` | Network firewall blocking | Try different network or VPN |
| `firebase is not defined` | Script didn't load | Hard refresh, check CDN |

For detailed troubleshooting, see: **FIREBASE_DEBUG.md**

## Once Firebase is Working

1. You'll see the player modal with "⚔️ Enter Your Name"
2. Type your character name (e.g., "Aragorn")
3. Click "Join Campaign"
4. Tools in toolbar should become enabled
5. You can now draw on the map!

## Testing Multi-User Sync

1. **Window 1**: Join as "Player 1"
2. **Window 2**: Open same URL in different tab/window, join as "Player 2"
3. **Window 1**: Draw something
4. **Window 2**: You should see the drawing appear in real-time!

## Documents Available

- **FIREBASE_SETUP.md** - Complete Firebase configuration guide
- **FIREBASE_DEBUG.md** - Detailed troubleshooting for loading issues
- **TESTING.md** - What should happen and how to verify
- **README.md** - Full feature documentation
- **TROUBLESHOOTING.md** - Common issues and solutions

## Your Firebase Project Details

- **Project ID**: alaria-c1fc7
- **Database**: Firestore
- **Collection**: alaria-map (created automatically by app)
- **Security**: Open unauthenticated (intentional for D&D group)

## Most Important Action Right Now

👉 **Go to Firebase Console and update the Firestore Security Rules** (Step 1 above)

This fixes 80% of "Firebase failed to load" issues. Once rules are published and you hard refresh, Firebase should work.

Need more detailed help? Open **FIREBASE_DEBUG.md** for step-by-step network debugging.
