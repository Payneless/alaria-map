# Firebase Setup - Visual Step-by-Step Guide

This guide shows you exactly where to click in Firebase Console to get your database working.

## What You Need to Have Already Done

✅ Created a Firebase project (you said you have a database made)
✅ Created a Firestore database

## Your Project Info

Your app is looking for this specific Firebase config. Check if you have these values:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "alaria-c1fc7.firebaseapp.com",
    projectId: "alaria-c1fc7",
    storageBucket: "alaria-c1fc7.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

**Note**: These values are safe to share - they're public. The security comes from Firestore Rules, not keeping these secret.

---

## CRITICAL STEP: Update Firestore Security Rules

**This is 90% likely what's causing your Firebase errors.**

### Step 1: Go to Firebase Console

1. Visit https://console.firebase.google.com
2. Click on your **alaria-c1fc7** project

### Step 2: Open Firestore Database Rules

```
Left Sidebar:
  └── Build
      └── Firestore Database
          └── Rules tab (click this)
```

**What you see**: A code editor with blue/gray text

### Step 3: Clear the Existing Rules

You'll see something like this (this is WRONG for our app):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Select all this text** (Ctrl+A) and **delete it**.

### Step 4: Paste the New Rules

Copy and paste **exactly** this into the editor:

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

**Key difference**:
- OLD: `if request.auth != null;` ← Requires authentication (blocks your app)
- NEW: `if true;` ← Allows anyone to read/write (what we want for your D&D group)

### Step 5: Publish the Rules

1. Look for the **"Publish"** button (top right of the editor)
2. Click it
3. You'll see a blue notification: "Publishing..."
4. Wait for it to turn **green** with a checkmark: "Rules published"

**This is critical** - if you don't see the green checkmark, the rules aren't active yet.

---

## Verify Your Firestore Database Exists

While you're in Firebase Console:

1. Go to **Firestore Database** (left sidebar)
2. Click the **Data** tab
3. You should see a mostly empty database

**What you're looking for**: Just the default view. You don't need any data pre-created - the app will create collections automatically.

---

## Verify Your Firebase Config in the App

Now check if the app has the right Firebase config:

### Step 1: Open your map URL in browser

### Step 2: Press F12 to open Developer Tools

### Step 3: Go to **Console** tab

### Step 4: Type this command:

```javascript
console.log(firebaseConfig)
```

### Step 5: Press Enter

**You should see**:
```javascript
{
  apiKey: "AIzaSyD...",
  authDomain: "alaria-c1fc7.firebaseapp.com",
  projectId: "alaria-c1fc7",
  storageBucket: "alaria-c1fc7.appspot.com",
  messagingSenderId: "...",
  appId: "1:..."
}
```

**If you see `firebaseConfig is not defined`**:
- The app didn't load the Firebase config
- Check if you pasted your config into index.html correctly
- See "Finding Your Firebase Config" section below

---

## Finding Your Firebase Config Values

If you don't have your Firebase config, get it from Firebase Console:

### Step 1: Open Firebase Console
https://console.firebase.google.com

### Step 2: Select your project (alaria-c1fc7)

### Step 3: Click the gear icon ⚙️ (top left, next to "Project Overview")

### Step 4: Select "Project Settings"

### Step 5: Scroll down to "Your apps"

### Step 6: Find your web app (looks like `</>`)

### Step 7: Click "Config"

You'll see a code block like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "alaria-c1fc7.firebaseapp.com",
  projectId: "alaria-c1fc7",
  storageBucket: "alaria-c1fc7.appspot.com",
  messagingSenderId: "12345678",
  appId: "1:12345678:web:abc123"
};
```

### Step 8: Copy this entire code block

### Step 9: Paste it into your index.html

In index.html, find the line that starts with `const firebaseConfig = {` (around line 321 in current file)

**Replace** everything from `const firebaseConfig = {` to the closing `};` with what you just copied from Firebase Console.

---

## Testing After Setup

### Quick Test (2 minutes)

1. **Hard refresh** your map URL:
   - Windows: Ctrl+Shift+R
   - Mac: Cmd+Shift+R

2. **Open Developer Console** (F12)

3. **Look for these success messages** in Console tab:
   ```
   Firebase loading... (attempt 1/50)
   Firebase loading... (attempt 2/50)
   ...
   Firebase app initialized
   Firebase Firestore initialized successfully
   ```

4. **You should see a modal** that says "⚔️ Enter Your Name"

5. **Type your name** and click "Join Campaign"

### Multi-User Test (5 minutes)

1. **Open your map** in one window/tab - join as "Player 1"
2. **Open same URL** in a different window/tab - join as "Player 2"
3. **In Player 1's window**: Click the pen tool and draw something
4. **Check Player 2's window**: You should see the drawing appear instantly!

If you see the drawing in both windows, **Firebase is working correctly**! ✅

---

## Troubleshooting: What if it Still Doesn't Work?

### Error: "Firebase failed to load after 5 seconds"

**Most Common Causes:**

1. **Firestore Rules not published**
   - Go back to step "Update Firestore Security Rules"
   - Make sure you see the green checkmark
   - Hard refresh (Ctrl+Shift+R)

2. **Wrong Firebase Config**
   - Verify you copied the config from Firebase Console
   - Check it matches your project ID (alaria-c1fc7)
   - Make sure there are no typos

3. **Browser/Network Issue**
   - Try a different browser (Chrome, Firefox, Edge)
   - Try an incognito window (Ctrl+Shift+N)
   - Try a different network (mobile hotspot)

### Error: "Uncaught SyntaxError: Unexpected token '<'"

This means Firebase didn't load. Usually caused by:
- Wrong CDN URL in HTML
- Browser blocking the CDN
- Network issue

**Fix**: Check that your `<script>` tags are correct:
```html
<script src="https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"></script>
```

These should be near the top of index.html (around line 8-9).

### Error: "PERMISSION_DENIED: Missing or insufficient permissions"

This means:
- Firebase loaded successfully ✅
- But Firestore rules are still blocking access ❌

**Fix**:
- Go back to "Update Firestore Security Rules"
- Make sure the rules have `if true;` not `if request.auth != null;`
- Publish again
- Hard refresh

---

## Quick Reference Checklist

- [ ] Firebase project created
- [ ] Firestore database created
- [ ] Firebase config copied into index.html
- [ ] Firestore security rules updated to `if true;`
- [ ] Rules are published (green checkmark visible)
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Player modal appears
- [ ] Can join with character name
- [ ] Tools in toolbar are enabled
- [ ] Can draw on map
- [ ] Multi-user test: drawing syncs between windows

---

## Still Stuck?

The most likely issue is **Step 1** (Firestore Rules).

Before doing anything else:
1. Go to Firebase Console
2. Firestore Database → Rules tab
3. **Verify the rules contain** `if true;` (not `if request.auth != null;`)
4. **Verify you see a green checkmark** saying "Rules published"
5. Hard refresh your map page

If you see the green checkmark and it still doesn't work, please check:
- Browser console (F12 → Console) for the exact error message
- Try a different browser
- Try incognito window

Let me know what error you see in the browser console and I can help from there!
