import { _decorator, Component, Node, EditBox } from 'cc';
const { ccclass, property } = _decorator;

interface CheckResult {
    ok: boolean
}

@ccclass('check_code')
export class check_code extends Component {

    @property({
        type: Node
    })
    next: Node;

    @property({
        type: Node
    })
    self: Node;

    @property({
        type: Node
    })
    tips: Node;


    @property({
        type: Node
    })
    username: Node;


    @property({
        type: Node
    })
    code: Node;



    start() {
        console.log(window);
    }

    update(deltaTime: number) {

    }

    check() {
        const { string: username } = this.username.getComponent(EditBox);
        const { string: code } = this.code.getComponent(EditBox);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                const response = xhr.responseText;
                console.log(response);
                const { ok } = JSON.parse(response) as CheckResult;
                if (ok) {
                    this.self.active = false;
                    this.next.active = true;
                    const url = `https://www.tiktok.com/${username}/live`;
                    (window as any).dm_bridge.emit_action({ type: 'open', payload: { url } });
                } else {
                    this.tips.active = true;
                }
            }
        };
        xhr.open("GET", `http://localhost:8080/check/${code}`, true);
        xhr.send();
    }

}

