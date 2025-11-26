# Firebase Setup Guide for Alaria Map

This guide will help you set up Firebase Firestore for the collaborative annotation map.

## Prerequisites

- A Firebase project already created (you mentioned you have one)
- Firestore database created
- Admin access to your Firebase project
- Your Firebase config already embedded in `index.html`

## Step 1: Verify Your Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **alaria-c1fc7**
3. In the left sidebar, click **Firestore Database**
4. Verify that you see your database listed

## Step 2: Create Firestore Database (If Not Done)

If you haven't created a Firestore database yet:

1. Click **Create database** in the Firestore section
2. Choose a region (e.g., `us-east1` or closest to your location)
3. Click **Create**
4. Wait 1-2 minutes for the database to initialize

## Step 3: Set Firestore Security Rules

**IMPORTANT:** Your database currently has default restrictive rules. We need to update them to allow unauthenticated reads and writes for the app to work.

1. In the Firestore Database console, click the **Rules** tab
2. Replace the entire content with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads and writes for now
    // In production, restrict these rules!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **Publish**
4. You should see a green checkmark confirming the rules are published

**⚠️ Security Note:** These rules allow anyone to read/write to your database. For a private D&D group, this is fine. If you want to make it more secure later, you can require authentication.

## Step 4: Verify Configuration in index.html

The Firebase config is already in your `index.html` file (lines 320-332). Verify it matches:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBsVxNMoodWncO_gPMHjsb2G_KSPi--Uas",
    authDomain: "alaria-c1fc7.firebaseapp.com",
    projectId: "alaria-c1fc7",
    storageBucket: "alaria-c1fc7.firebasestorage.app",
    messagingSenderId: "901757045086",
    appId: "1:901757045086:web:19fa17a73a0fcc1e0e27cf",
    measurementId: "G-MWG8H88QG7"
};
```

**Note:** This API key is visible in your code, which is fine for client-side Firebase apps. This is intentional design by Google.

## Step 5: Enable Firestore for Your Domain

1. Go to Firebase Console → **Settings** (gear icon) → **Project Settings**
2. Click the **Apps** tab
3. Find your web app (should show your Firebase config)
4. Click on it to see the registration details
5. Note the app name for reference

## Step 6: Test the Connection

1. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Open the map at: `https://yourusername.github.io/alaria-map/`
3. Open the browser console (F12 → Console tab)
4. You should see:
   ```
   Firebase loading... (attempt 1/50)
   Firebase loading... (attempt 2/50)
   ...
   Firebase app initialized
   Firebase Firestore initialized successfully
   ```

## Step 7: Create Test Data

1. In the Firestore console, click **Start collection**
2. Create a collection named: `alaria-map`
3. Click **Next**
4. Add your first document:
   - Document ID: `default-session` (or leave auto-generated)
   - Fields: Leave empty for now
5. Click **Save**

Now when you use the map, documents will be created automatically!

## Step 8: Deploy to GitHub Pages

If you haven't deployed yet:

1. Go to your GitHub repository: https://github.com/Payneless/alaria-map
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: Select `dazzling-proskuriakova`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes for deployment
6. Your site will be live at: `https://payneless.github.io/alaria-map/`

## Testing Multi-User Collaboration

Once Firebase is working:

1. **Open first tab:**
   - Visit: `https://payneless.github.io/alaria-map/?session=test-campaign`
   - Enter name: "Player 1"
   - Click "Join Campaign"

2. **Open second tab (same browser or different browser):**
   - Visit: `https://payneless.github.io/alaria-map/?session=test-campaign`
   - Enter name: "Player 2"
   - Click "Join Campaign"

3. **In first tab:**
   - You should see: `🎭 Players: Player 1 (You)  Player 2`
   - Draw something with the pen tool

4. **Check second tab:**
   - Your drawing should appear in real-time!
   - Try drawing in the second tab
   - Check first tab for the sync

## Troubleshooting Firebase Issues

### "Firebase Firestore initialized successfully" doesn't appear

1. Check your internet connection
2. Make sure Firestore is created in your project
3. Check the browser console for specific errors
4. Try a different browser (Chrome, Firefox, Safari)

### "Permission denied" errors in console

1. Go to Firestore Rules (see Step 3)
2. Make sure your rules are published correctly
3. The test rule should be: `allow read, write: if true;`

### Annotations not saving

1. Check browser console (F12) for errors
2. Verify Firestore rules are set correctly
3. Make sure `alaria-map` collection exists
4. Check network tab to see if Firebase requests are working

### App starts but no Firebase connection

1. The app will show a warning: "Firebase unavailable"
2. This is normal if Firebase CDN is blocked
3. You can still use the app locally without sync
4. Try:
   - Disabling browser extensions (especially ad blockers)
   - Opening in incognito/private window
   - Using a different network

## Advanced: Firestore Data Structure

Once you start using the app, your Firestore will look like:

```
alaria-map/
├── default-session/
│   ├── annotations/
│   │   ├── ann_1732012345_xyz123/
│   │   │   ├── object: { type: "path", ... }
│   │   │   ├── creator: "Player 1"
│   │   │   ├── creatorId: "player_1732012345_abc"
│   │   │   ├── timestamp: [server timestamp]
│   │   │   └── type: "path"
│   │   └── ann_1732012346_xyz456/
│   │       └── ...
│   │
│   └── players/
│       ├── player_1732012345_abc/
│       │   ├── name: "Player 1"
│       │   ├── joinedAt: [timestamp]
│       │   └── lastActive: [timestamp]
│       └── player_1732012346_def/
│           └── ...
```

This structure is created automatically by the app!

## Firestore Pricing

Good news: Firestore has a **free tier**:

- **Read operations:** 50,000 per day (FREE)
- **Write operations:** 20,000 per day (FREE)
- **Delete operations:** 20,000 per day (FREE)
- **Storage:** 1 GB (FREE)

A D&D campaign will easily stay within these limits!

## Production Security (Optional)

If you want to secure your database later:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow reads, no writes from clients
    match /{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

Then you'd need a backend service to write annotations, but this is more complex.

## Next Steps

1. ✅ Verify Firestore database is created
2. ✅ Update Firestore security rules
3. ✅ Test Firebase connection in the app
4. ✅ Deploy to GitHub Pages
5. ✅ Test multi-user sync with friends
6. ✅ Share the session URL with your D&D group!

## Need Help?

Check the **TROUBLESHOOTING.md** file for more debugging tips, or check the browser console (F12) for detailed error messages.

Happy mapping! 🗺️⚔️
