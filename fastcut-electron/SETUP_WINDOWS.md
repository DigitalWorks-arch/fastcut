# FastCut (Electron) — Build the Windows Installer

This is the full app source. I couldn't compile the actual `.exe` on my end —
Electron's runtime binaries download from a CDN my sandbox can't reach — but
building it yourself takes two commands and about 2 minutes.

## What you need
- **Node.js** installed on the Windows machine (download from nodejs.org,
  any recent LTS version, e.g. 20.x). The installer is the default — just
  click through it.

## Steps
1. Unzip/copy this whole `fastcut-electron` folder onto your Windows PC.
2. Open **Command Prompt** or **PowerShell** in that folder
   (Shift+Right-click inside the folder → "Open PowerShell window here").
3. Run:
   ```
   npm install
   ```
   This downloads Electron + the builder tool (~200MB, only happens once).
4. To just try the app immediately without building an installer:
   ```
   npm start
   ```
   This launches FastCut right away — good for quick testing.
5. To build the actual installer (`FastCut Setup.exe`):
   ```
   npm run dist:win
   ```
   When it finishes, find the installer in the `dist` folder. Double-click
   it to install FastCut like any normal Windows app (Start Menu + Desktop
   shortcut included).

## Using the app
- The window lets you add a URL with a title.
- Click the **"Set shortcut"** box next to any URL, then press the key combo
  you want (e.g. Ctrl+Alt+1) — it's saved instantly and works system-wide,
  even when FastCut is minimized.
- There's also a tray icon (bottom-right system tray) with all your URLs —
  click any to open it, or right-click for the full menu.
- Closing the window just hides it to the tray; use "Quit FastCut" from the
  tray menu to fully exit.
- Your URLs are saved in `%APPDATA%\FastCut\urls.json`.

## Building the Mac version later
When you're back on your Mac, with the same Node.js installed, from this
same folder run:
```
npm install
npm run dist:mac
```
That produces a `FastCut.dmg` in the `dist` folder — same codebase, no
changes needed. (One caveat: unsigned Mac builds will need
right-click → Open the first time to bypass Gatekeeper, unless you set up
an Apple Developer signing certificate.)

## Notes
- The icons included are simple placeholders I generated — swap
  `assets/icon.png`, `assets/icon.ico`, and `assets/tray-icon.png` for your
  own anytime; no code changes needed.
- If you want a `.icns` file for a nicer Mac dock icon later, I can generate
  one from a PNG when you're ready for that build.
