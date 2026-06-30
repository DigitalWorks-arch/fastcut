const { app, BrowserWindow, Tray, Menu, ipcMain, globalShortcut, shell, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(app.getPath('userData'));
const dataFile = path.join(dataDir, 'urls.json');

let mainWindow = null;
let tray = null;

// ---------- storage ----------
function loadItems() {
  try {
    const raw = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveItems(items) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(items, null, 2), 'utf-8');
}

let items = loadItems();

// ---------- shortcuts ----------
function registerAllShortcuts() {
  globalShortcut.unregisterAll();
  items.forEach((item) => {
    if (!item.shortcut) return;
    try {
      globalShortcut.register(item.shortcut, () => {
        shell.openExternal(item.url);
      });
    } catch (e) {
      console.error('Failed to register shortcut for', item.title, e);
    }
  });
}

// ---------- window ----------
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 640,
    height: 480,
    title: 'FastCut',
    icon: path.join(__dirname, '..', 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('close', (e) => {
    // Hide instead of quit so the tray keeps working, like a menu bar app
    if (!app.isQuiting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}

function buildTrayMenu() {
  const menuItems = items.map((item) => ({
    label: item.title + (item.shortcut ? `  (${item.shortcut})` : ''),
    click: () => shell.openExternal(item.url)
  }));

  const template = [
    ...(menuItems.length ? menuItems : [{ label: 'No URLs saved yet', enabled: false }]),
    { type: 'separator' },
    {
      label: 'Open FastCut',
      click: () => {
        mainWindow.show();
        mainWindow.focus();
      }
    },
    {
      label: 'Quit FastCut',
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    }
  ];

  tray.setContextMenu(Menu.buildFromTemplate(template));
}

function refreshTray() {
  if (!tray) return;
  buildTrayMenu();
}

// ---------- IPC ----------
ipcMain.handle('get-items', () => items);

ipcMain.handle('add-item', (event, { title, url }) => {
  items.push({ id: Date.now().toString(), title, url, shortcut: null });
  saveItems(items);
  refreshTray();
  return items;
});

ipcMain.handle('update-shortcut', (event, { id, shortcut }) => {
  const item = items.find((i) => i.id === id);
  if (item) {
    item.shortcut = shortcut;
    saveItems(items);
    registerAllShortcuts();
    refreshTray();
  }
  return items;
});

ipcMain.handle('delete-item', (event, { id }) => {
  items = items.filter((i) => i.id !== id);
  saveItems(items);
  registerAllShortcuts();
  refreshTray();
  return items;
});

ipcMain.handle('open-item', (event, { url }) => {
  shell.openExternal(url);
});

// ---------- app lifecycle ----------
app.whenReady().then(() => {
  createWindow();

  const trayIconPath = path.join(__dirname, '..', 'assets', 'tray-icon.png');
  let trayIcon = nativeImage.createFromPath(trayIconPath);
  if (trayIcon.isEmpty()) {
    trayIcon = nativeImage.createEmpty();
  }
  tray = new Tray(trayIcon);
  tray.setToolTip('FastCut');
  buildTrayMenu();

  registerAllShortcuts();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
    else mainWindow.show();
  });
});

app.on('window-all-closed', () => {
  // keep running in tray; do nothing
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
