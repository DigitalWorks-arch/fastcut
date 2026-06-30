# FastCut — Build the Mac Installer

Same project as the Windows version, run on your Mac instead. A `.icns`
icon is already included now.

## What you need
- **Node.js** installed (download the macOS LTS installer from nodejs.org
  if you don't already have it, e.g. via `node -v` in Terminal to check).
- **Xcode Command Line Tools** (usually already installed; if not, macOS
  will prompt you to install them the first time you run `npm install`).

## Steps
1. Unzip this `fastcut-electron` folder anywhere on your Mac.
2. Open **Terminal**, then `cd` into the folder, e.g.:
   ```
   cd ~/Downloads/fastcut-electron
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Quick test without building an installer:
   ```
   npm start
   ```
5. Build the actual `.dmg` installer:
   ```
   npm run dist:mac
   ```
   When it finishes, open the `dist` folder — you'll find **`FastCut-1.0.0.dmg`**.
   Double-click it, then drag FastCut into your Applications folder, same as
   any normal Mac app.

## First launch (Gatekeeper warning)
Since this isn't signed with a paid Apple Developer certificate, macOS will
likely block the first launch with "FastCut can't be opened because it is
from an unidentified developer." To get around this:
- Right-click (or Control-click) **FastCut.app** in Applications → **Open**
  → click **Open** again in the dialog that appears.
- This only needs to be done once.

(If you want a fully signed, no-warning version later, that requires a paid
$99/year Apple Developer account — let me know if you want to set that up
and I'll add the signing config.)

## Using the app
Identical to the Windows version:
- Add a URL with a title in the window.
- Click "Set shortcut" next to any URL and press your desired key combo
  (e.g. ⌘⌥1) — works system-wide.
- Menu bar icon (top-right) lists all URLs for one-click opening.
- Closing the window hides it to the menu bar; use "Quit FastCut" from
  the menu bar dropdown to fully exit.
- Data is saved in `~/Library/Application Support/FastCut/urls.json`.

## Keeping Windows and Mac in sync
Both installers come from this exact same source folder — if you edit
`src/main.js`, `src/index.html`, etc., just rerun the relevant `npm run
dist:win` / `npm run dist:mac` command on each OS to rebuild.
