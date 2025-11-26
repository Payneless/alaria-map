# Firebase Failed to Load - Debugging Guide

If you're seeing "Firebase failed to load after 5 seconds", here are the solutions:

## Quick Fixes (Try These First)

### 1. Hard Refresh Browser Cache
This is the #1 solution - do this first:

**Windows/Linux:**
- Press `Ctrl + Shift + R` (not just Ctrl+R)

**Mac:**
- Press `Cmd + Shift + R`

**Or manually clear cache:**
1. Press `F12` to open Developer Tools
2. Right-click the refresh button
3. Click "Empty cache and hard refresh"

### 2. Check Your Internet Connection
- Open https://www.google.com in another tab
- If Google loads, your internet is fine
- If nothing loads, you have a network issue

### 3. Disable Browser Extensions
Some extensions block Firebase CDN:
1. Open browser settings
2. Go to Extensions/Add-ons
3. Temporarily disable all extensions
4. Reload the page
5. If Firebase loads now, a blocking extension was the problem

### 4. Try a Different Browser
1. Try Chrome, Firefox, Safari, or Edge
2. If it works in a different browser, your first browser has issues
3. Clear that browser's cache completely

### 5. Open in Incognito/Private Window
1. Open an incognito/private window (Ctrl+Shift+N or Cmd+Shift+N)
2. Visit your map URL
3. If it works in incognito, your browser cache or extensions are the issue

## Check the Browser Console for Errors

1. Press `F12` to open Developer Tools
2. Click the **Console** tab
3. Look for these specific errors:

### Error: "net::ERR_BLOCKED_BY_CLIENT"
**Cause:** Ad blocker or security software is blocking Firebase CDN
**Solution:**
- Disable ad blocker for this site
- Check browser security settings
- Try a different browser

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"
**Cause:** Network or firewall blocking cross-origin requests
**Solution:**
- Try a different network (mobile hotspot, different WiFi)
- Check if you're on a corporate/school network with restrictions
- Try VPN if available

### Error: "Firebase failed to load"
**Cause:** Firebase CDN took too long
**Solution:**
1. Hard refresh (Ctrl+Shift+R)
2. Wait longer and try again
3. Try different network
4. Check if Firebase CDN is down (see below)

### Error: "firebase is not defined"
**Cause:** Firebase script didn't load
**Solution:**
- Same as "Firebase failed to load"
- Hard refresh
- Try incognito window
- Disable extensions

## Check if Firebase CDN is Down

Firebase uses Google's CDN. If it's down worldwide:

1. Visit: https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js
2. If you see JavaScript code, CDN is working
3. If you see an error page, Firebase CDN might be temporarily down
4. Wait a few minutes and try again

## Network Tab Debugging

1. Open Developer Tools (F12)
2. Click **Network** tab
3. Reload the page
4. Look for these requests:
   - `firebase-app.js` - should show status 200
   - `firebase-firestore.js` - should show status 200
5. If either shows:
   - **Red X or 0** = Network/DNS issue
   - **404** = File not found (unlikely)
   - **503** = Server down (rare, Firebase is very reliable)

## If You See These Status Codes

| Status | Meaning | Solution |
|--------|---------|----------|
| 200 | OK - file loaded | Firebase should work |
| 0 | Blocked by extension or network | Disable extensions, try incognito |
| 404 | Not found | Unlikely - contact support |
| 503 | Service unavailable | Firebase is down - wait and retry |
| Network error | DNS/Connection issue | Try different network |

## Still Not Working? Try This

### Option A: Temporary Workaround
The app can work WITHOUT Firebase (without syncing):
1. The modal will still appear
2. You can draw on the map
3. Annotations won't save or sync
4. Good for testing the UI while you troubleshoot Firebase

### Option B: Check Firebase Project Status
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **alaria-c1fc7**
3. Check if there are any warning messages
4. Verify your Firestore database exists and is active

### Option C: Check Firestore Rules
Even if Firebase loads, wrong rules will cause issues:
1. In Firebase Console, click **Firestore Database**
2. Click **Rules** tab
3. You should see:
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
4. If different, update to above

## Most Common Solution

**80% of "Firebase failed to load" issues are fixed by:**

1. **Ctrl+Shift+R** (hard refresh)
2. **Disable browser extensions temporarily**
3. **Try incognito window**

## If None of These Work

Check these in order:
1. ✅ Hard refresh (Ctrl+Shift+R)
2. ✅ Different browser
3. ✅ Incognito window
4. ✅ Disable all extensions
5. ✅ Different network (mobile hotspot)
6. ✅ Check Firebase CDN is up
7. ✅ Check Firestore rules are correct
8. ✅ Check Firestore database exists

If you've tried all of these and still see "Firebase failed to load", the issue is likely:
- Your internet connection/network blocking Firebase
- Firestore database not created properly
- Firestore security rules not set

## Verify Everything Works

Once Firebase loads (you'll see "Firebase Firestore initialized successfully"):

1. Enter a character name
2. Click "Join Campaign"
3. Tools should become enabled
4. Try drawing
5. Open Firestore console to see your data being saved

## Getting Help

If still stuck, check:
1. Browser console (F12) for exact error message
2. Network tab to see which requests failed
3. Firebase Console to confirm database exists
4. Firestore Rules are set correctly

The exact error message in the console will help diagnose the real problem.
