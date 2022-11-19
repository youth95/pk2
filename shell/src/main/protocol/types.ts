export interface User {
  id: string;
  name: string;
  avatar: string;
}
/**
 * 聊天消息
 */
export interface ChatMessage {
  type: 'chat';
  chat: {
    content: string;
  };
}

/**
 * 礼物消息
 */
export interface GiftMessage {
  type: 'gift';
  gift: {
    id: string;
    name: string;
    icon: string;
  };
}

/**
 * 加入消息
 */
export interface JoinedMessage {
  type: 'joined';
}

/**
 * 点赞消息
 */
export interface LikedMessage {
  type: 'liked';
}

/**
 * 直播间状态信息
 */
export interface StatusMessage {
  type: 'status';
  total: number; // 当前人数
  totalUser: number; // 历史人数
  // TODO 榜单
}

/**
 * 未知消息
 */
export interface UnknownMessage {
  type: 'unknown';
  original: unknown;
}

export type Message =
  | ({
      user: User;
      original: unknown;
    } & (ChatMessage | GiftMessage | JoinedMessage | LikedMessage | StatusMessage))
  | UnknownMessage;
