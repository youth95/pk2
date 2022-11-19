import {
  createInjectAbleRemoteWindow,
  CreateInjectAbleRemoteWindowOptions,
  RedirectConfig
} from './createInjectAbleRemoteWindow';
import path from 'path';
import { fromDY, fromTK } from './protocol';
import { Message } from './protocol/types';
// import { PROXY_PORT } from './constants';

export const DefaultCreateInjectAbleRemoteWindowOptions: CreateInjectAbleRemoteWindowOptions = {
  width: 800,
  height: 600,
  webPreferences: {
    preload: path.join(__dirname, '../preload/index.js')
  }
};

export function createStudioWindow(url: string, cb: (msg: Message) => void): void {
  const redirects: RedirectConfig[] = [];
  const disableCSP = ['https://live.douyin.com/*', 'https://www.tiktok.com/*'];
  let transform;

  if (url.includes('tiktok')) {
    redirects.push({
      urls: ['https://*.com/*'],
      include: '1813',
      to: `https://hostfile.vercel.app/tk.1.js`
    });
    transform = fromTK;
  }
  if (url.includes('douyin')) {
    redirects.push({
      urls: ['https://*.com/*'],
      include: '8954',
      to: `https://hostfile.vercel.app/dy.3.js`
    });
    transform = fromDY;
  }

  const win = createInjectAbleRemoteWindow({
    ...DefaultCreateInjectAbleRemoteWindowOptions,
    redirects,
    disableCSP
  });
  win.webContents.on('ipc-message', (_, chanel, msg) => {
    if (chanel === 'dm') {
      cb(transform(msg));
    }
  });
  win.loadURL(url);
}
