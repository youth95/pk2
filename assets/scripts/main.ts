import { _decorator, Component, Node, Vec3, AudioSource, Event, NodeEventType, find, VideoPlayer, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

const step: number = 15;
const SCORE: number = 15; // 谁先10分谁胜利

@ccclass('main')
export class main extends Component {

    @property({
        type: Node,
    })
    game: Node;

    @property({
        type: Node,
    })
    left_win: Node;

    @property({
        type: Node,
    })
    right_win: Node;




    score = 0;

    start() {
        this.game.active = true;
        this.left_win.active = false;
        this.right_win.active = false;
    }

    update(deltaTime: number) {

    }

    to_left() {
        if (this.check()) {
            return
        }
        this.score -= 1;
        this.node.position = this.node.position.add(new Vec3(-step, 0, 0));
    }

    to_right() {
        if (this.check()) {
            return
        }
        this.score += 1;
        this.node.position = this.node.position.add(new Vec3(step, 0, 0));
        this.check();
    }

    check() {
        if (this.score >= SCORE) {
            this.game.active = false;
            this.left_win.active = true;
            this.right_win.active = false;
            const player = this.left_win.getComponentInChildren(VideoPlayer);
            player.play();
            return true;
        }

        if (this.score <= -SCORE) {
            this.game.active = false;
            this.left_win.active = false;
            this.right_win.active = true;
            const player = this.right_win.getComponentInChildren(VideoPlayer);
            player.play();
            return true;
        }

        return false;
    }

    win_finish(player: VideoPlayer, eventType: string) {
        console.log('win finish', player, eventType);
        if (eventType === 'completed') {
            this.game.active = true;
            this.left_win.active = false;
            this.right_win.active = false;
            this.score = 0;
            this.node.position = new Vec3(0, 0);

        }
    }
}

