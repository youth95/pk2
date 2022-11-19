import { _decorator, Component, Node, Button, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

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

@ccclass('auto_click')
export class auto_click extends Component {

    @property({
        type: Node,
    })
    left_win: Node;

    @property({
        type: Node,
    })
    right_win: Node;


    @property({
        type: Node,
    })
    left_btn: Node;

    @property({
        type: Node,
    })
    right_btn: Node;

    stop = false;
    start() {
        console.log('auto click');
        /**
         * 
         * Vec2 { x: 95.98000000000002, y: 344.65 }
[Preview] Vec2 { x: 487.98, y: 354.65 }
         */
        (window as any).dm_bridge.onDM((_, message: Message) => {
            if (this.left_win.active || this.right_win.active) {
                return;
            }
            // TODO 这是一段测试的假逻辑
            // if (message.type === 'chat') {
            //     if (Math.random() >= 0.5) {
            //         this.left_btn.getComponent(Button).clickEvents.forEach(h => {
            //             h.emit([{
            //                 getLocation: () => new Vec2(95, 344),
            //             }]);
            //         })
            //     } else {
            //         this.right_btn.getComponent(Button).clickEvents.forEach(h => {
            //             h.emit([{
            //                 getLocation: () => new Vec2(487, 354),
            //             }]);
            //         })
            //     }
            // }
            // TODO 真实的逻辑应该是这个
            if (message.type === 'gift') {
                const { name } = message.gift;
                if(name === 'Rose') {
                    this.right_btn.getComponent(Button).clickEvents.forEach(h => {
                        h.emit([{
                            getLocation: () => new Vec2(487, 354),
                        }]);
                    })
                }else {
                    this.left_btn.getComponent(Button).clickEvents.forEach(h => {
                        h.emit([{
                            getLocation: () => new Vec2(95, 344),
                        }]);
                    })
                }
            }
            // if (message.type === 'liked') {
            //     this.addBomb(message.user.avatar, this.config.liked ?? this.config.defaultGiftBomb);
            // }
            // if (message.type === 'joined') {
            //     this.addBomb(message.user.avatar, this.config.joinedBomb ?? this.config.defaultGiftBomb);
            // }
            // if (message.type === 'unknown') {
            //     const original = message.original as { common: { method: string } };
            //     console.log(`[unknown] ${original.common.method}`, original);
            // }
        });
    }

    update(deltaTime: number) {

    }
}

