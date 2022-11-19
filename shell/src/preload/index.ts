import { contextBridge, ipcRenderer, IpcRendererEvent, IpcRenderer } from 'electron';
import { Message } from '../main/protocol/types';
// import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {};
const dm_bridge = {
  onDM: (callback: (event: IpcRendererEvent, msg: Message) => void): IpcRenderer =>
    ipcRenderer.on('tt_msg', callback),
  on_action: (
    callback: (event: IpcRendererEvent, msg: { type: string; payload: unknown }) => void
  ): IpcRenderer => ipcRenderer.on('action', callback),
  emit_action: (payload: unknown): void => ipcRenderer.send('action', payload),
  emit_dm: (payload: unknown): void => ipcRenderer.send('dm', payload),
  emit_load_game_config: (): void => ipcRenderer.send('action', { type: 'load_game_config' })
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
    contextBridge.exposeInMainWorld('dm_bridge', dm_bridge);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
