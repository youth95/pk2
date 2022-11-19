import { ElectronAPI } from '@electron-toolkit/preload';
import type { Message } from '../main/protocol/types';
import type { IpcRenderer } from 'electron';
declare global {
  interface Window {
    electron: ElectronAPI;
    api: unknown;
    dm_bridge: {
      onDM: (callback: (event: IpcRendererEvent, msg: Message) => void) => IpcRenderer;
      on_action: (
        callback: (event: IpcRendererEvent, action: { type: string; payload: unknown }) => void
      ) => IpcRenderer;
      emit_load_game_config: () => void;
      emit_action: (action: { type: string; payload: unknown }) => void;
    };
  }
}
