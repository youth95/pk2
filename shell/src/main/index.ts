import { app, shell, BrowserWindow, dialog } from 'electron';
import * as path from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import JSON5 from 'json5';
import { readFileSync } from 'fs';
// import { createServer } from './serve';
import { createStudioWindow } from './createStudioWindow';
// import { PROXY_PORT } from './constants';

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? {
        icon: path.join(__dirname, '../../build/icon.png')
      }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  });

  // gameWindow

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  console.log(
    `is.dev && process.env['ELECTRON_RENDERER_URL']`,
    is.dev && process.env['ELECTRON_RENDERER_URL']
  );
  // localhost:7456
  if (is.dev) {
    mainWindow.loadURL('http://localhost:7456');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.webContents.on('ipc-message', (_, chanel, msg) => {
    const _createStudioWindow = (url: string): void =>
      createStudioWindow(url, (msg) => {
        if (msg.type === 'chat') {
          console.log(`[chat] ${msg.user.name} : ${msg.chat.content}`);
        }
        if (msg.type === 'gift') {
          console.log(`[gift] ${msg.user.name} : ${msg.gift.id} ${msg.gift.name}`);
        }
        mainWindow.webContents.send('tt_msg', msg);
      });
    if (chanel === 'action') {
      const { type } = msg;
      if (type === 'open') {
        const {
          payload: { url }
        } = msg;
        _createStudioWindow(url);
      } else if (type === 'load_game_config') {
        const result = dialog.showOpenDialogSync(mainWindow, { properties: ['openFile'] });
        if (result) {
          const gameConfig = JSON5.parse(readFileSync(result[0], { encoding: 'utf-8' }));
          const { studios, width, height } = gameConfig;
          for (const url of studios) {
            _createStudioWindow(url);
          }
          if (width && height) {
            mainWindow.setSize(width, height, true);
          }
          gameConfig.configFilePath = result[0];
          gameConfig.configFileDir = path.dirname(result[0]);
          mainWindow.webContents.send('action', { type: 'load_game_config', payload: gameConfig });
        }
      }
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  // createServer(PROXY_PORT);

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
