import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
// import { parse } from 'url';

export interface CreateInjectAbleRemoteWindowOptions extends BrowserWindowConstructorOptions {
  redirects?: RedirectConfig[];
  disableCSP?: string[];
}

export interface RedirectConfig {
  urls: string[];
  include: string;
  to: string;
}

export function createInjectAbleRemoteWindow(
  options: CreateInjectAbleRemoteWindowOptions
): BrowserWindow {
  const win = new BrowserWindow(options);
  if (options.disableCSP) {
    win.webContents.session.webRequest.onHeadersReceived(
      {
        urls: options.disableCSP
      },
      (details, cb) => {
        const responseHeaders = { ...details.responseHeaders };
        if (responseHeaders['content-security-policy']) {
          delete responseHeaders['content-security-policy'];
        }
        cb({
          responseHeaders
        });
      }
    );
  }

  if (options.redirects) {
    for (const redirect of options.redirects) {
      win.webContents.session.webRequest.onBeforeRequest(
        {
          urls: redirect.urls
        },
        (details, cb) => {
          if (details.url.includes(redirect.include)) {
            cb({ redirectURL: redirect.to });
            return;
          }
          cb({});
        }
      );
    }
  }
  return win;
}
