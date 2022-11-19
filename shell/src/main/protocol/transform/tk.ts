import { Message } from '../types';

interface TKMessage {
  common: { method: string };
  user?: { nickname: string; avatarThumb?: { urlListList: string[] }; id: string };
  content: string;
  giftId: string;
  gift?: { name: string; image: { urlListList: string[] } };
  describe: string;
  total: number;
  totalUser: number;
}

export function toMessage(msg: TKMessage): Message {
  if (msg.common.method === 'WebcastChatMessage') {
    const user = {
      avatar: msg.user?.avatarThumb?.urlListList[0] ?? '',
      id: msg.user?.id ?? '',
      name: msg.user?.nickname ?? ''
    };
    return {
      user,
      type: 'chat',
      chat: { content: msg.content },
      original: msg
    };
  }

  if (msg.common.method === 'WebcastGiftMessage' && msg.gift) {
    const user = {
      avatar: msg.user?.avatarThumb?.urlListList[0] ?? '',
      id: msg.user?.id ?? '',
      name: msg.user?.nickname ?? ''
    };
    return {
      user,
      type: 'gift',
      gift: {
        id: msg.giftId,
        name: msg.gift.name,
        icon: msg.gift.image.urlListList[0]
      },
      original: msg
    };
  }

  if (msg.common.method === 'WebcastMemberMessage') {
    const user = {
      avatar: msg.user?.avatarThumb?.urlListList[0] ?? '',
      id: msg.user?.id ?? '',
      name: msg.user?.nickname ?? ''
    };
    return {
      user,
      type: 'joined',
      original: msg
    };
  }

  if (msg.common.method === 'WebcastLikeMessage') {
    const user = {
      avatar: msg.user?.avatarThumb?.urlListList[0] ?? '',
      id: msg.user?.id ?? '',
      name: msg.user?.nickname ?? ''
    };
    return {
      user,
      type: 'liked',
      original: msg
    };
  }

  if (msg.common.method === 'WebcastRoomUserSeqMessage') {
    const user = {
      avatar: msg.user?.avatarThumb?.urlListList[0] ?? '',
      id: msg.user?.id ?? '',
      name: msg.user?.nickname ?? ''
    };
    return {
      user,
      type: 'status',
      total: msg.total,
      totalUser: msg.totalUser,
      original: msg
    };
  }

  return { type: 'unknown', original: msg };
}
