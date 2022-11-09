import { _decorator, Component, EventTouch, EventTarget, Vec3, Node, Camera, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('tick_touch_effect')
export class tick_touch_effect extends Component {

    @property({
        type: Node,
        visible: true,
    })
    cameraNode: Node | null = null;

    start() {

    }

    play(event: EventTouch) {
        const eventTarget = new EventTarget();
        const { x, y } = event.getLocation();
        const location = new Vec3(x, y, 0);
        const worldPosition = new Vec3();
        const uiCamera = this.cameraNode.getComponent(Camera)!;
        uiCamera.screenToWorld(location, worldPosition);

        this.node.setWorldPosition(worldPosition);
        this.node.getComponent(Animation).play();
    }

    update(deltaTime: number) {

    }
}

