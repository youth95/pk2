import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('routers')
export class routers extends Component {

    @property({
        type: Node,
    })
    menu: Node;


    @property({
        type: Node,
    })
    boys_and_girls: Node;

    @property({
        type: Node,
    })
    dog_and_cat: Node;


    start() {
    }

    update(deltaTime: number) {

    }

    to_boys_and_girls() {
        this.boys_and_girls.active = true;
        this.menu.active = false;
    }

    to_dog_and_cat() {
        this.dog_and_cat.active = true;
        this.menu.active = false;
    }
}

