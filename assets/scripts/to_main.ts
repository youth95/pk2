import { _decorator, Component, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('to_main')
export class to_main extends Component {
    start() {
        setTimeout(() => {
            director.loadScene('main')
        }, 3000);
    }

    update(deltaTime: number) {

    }
}

