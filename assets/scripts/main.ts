import { _decorator, Component, director, Vec3, AudioSource, Event, NodeEventType, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

const step: number = 15;
const SCORE: number = 15; // 谁先10分谁胜利

@ccclass('main')
export class main extends Component {

    score = 0;

    start() {
        // this.getComponent(AudioSource).play();
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
            console.log('boys win');
            director.loadScene('boys_win');
            return true;
        }

        if (this.score <= -SCORE) {
            console.log('girls win');
            director.loadScene('girls_win');
            return true;
        }

        return false;
    }
}

