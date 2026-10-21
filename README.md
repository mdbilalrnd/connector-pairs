# Connector Pairs: setup (about 10 minutes)

A no-login quiz. Students open a link or scan a QR code, enter their name, and wait. You start the quiz from the host page, students are paired at random (a group of three if the count is odd), and a pair scores only when every partner answers correctly.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Student page (the link you share) |
| `host.html` | Your host page with QR code, Start button, and leaderboard |
| `config.js` | **The only file you edit**: Firebase settings + host PIN |
| `quiz.js` | Questions and scoring |
| `style.css` | Design |
| `database.rules.json` | Database rules to paste into Firebase |

## 1. Create a free Firebase project

1. Go to https://console.firebase.google.com and sign in with any Google account.
2. Click **Create a project**, name it `connector-pairs`, and turn off Google Analytics (not needed). Click **Create**.
3. In the left menu, open **Build → Realtime Database** and click **Create Database**.
4. Choose the location **Singapore (asia-southeast1)**, which is the closest to India. Pick **Start in locked mode** and click **Enable**.

## 2. Copy your settings into config.js

1. Click the gear icon next to **Project Overview → Project settings**.
2. Under **Your apps**, click the **</>** (Web) icon. Name it `quiz` and click **Register app** (don't tick Hosting).
3. Firebase shows a `firebaseConfig = { ... }` block. Copy the lines inside the `{ }`.
4. Open `config.js` and replace the `PASTE_HERE` lines with what you copied. Make sure `databaseURL` is included. If it's missing, copy the URL shown at the top of the Realtime Database page.
5. Change `HOST_PIN` to a PIN that only you know.

## 3. Set the database rules

1. Go to **Realtime Database → Rules**.
2. Delete what's there, paste everything from `database.rules.json`, and click **Publish**.

## 4. Put it online with GitHub Pages

1. On https://github.com, click **New repository**. Name it `connector-pairs`, set it to **Public**, and click **Create**.
2. Click **uploading an existing file** and drag in all six files. Click **Commit changes**.
3. Go to **Settings → Pages**. Under **Branch**, pick `main` and `/ (root)`, then click **Save**.
4. Wait 1–2 minutes. Your links will be:
   - Students: `https://bilal23106.github.io/connector-pairs/`
   - Host: `https://bilal23106.github.io/connector-pairs/host.html`

## 5. Test before class

1. Open the host page on your laptop and enter your PIN.
2. Open the student link on two phones (or one phone plus a private window) and enter two names.
3. Press **Start quiz & make pairs**, then answer a couple of questions on both phones.
4. Press **Reset everything** so the class starts fresh.

## In class

1. Project `host.html`. Students scan the QR code and enter their names.
2. Ask the class whether everyone is in. Remove any wrong or duplicate names with the ×.
3. Press **Start**. The leaderboard updates live on the projector.
4. If someone joins late, press **Pair late students**. A single late student is added to the smallest group.

## If something goes wrong

- **"Setup not finished"**: `config.js` still has `PASTE_HERE` in it. Fix it and upload `config.js` again.
- **"Can't reach the quiz database"**: re-check step 3 (rules), and that `databaseURL` is correct.
- **Changes don't show**: GitHub Pages can take a minute. Refresh the page.

Note: the host PIN keeps students out of the host page in class, but it isn't real security. Press **Reset everything** after class to clear students' names.
