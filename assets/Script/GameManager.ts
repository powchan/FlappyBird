import { _decorator, Component, instantiate, Node, Prefab, } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property speedX: number = 10;
    @property pipe_num: number = 5;
    @property pipe_interval: number = 250;
    @property pipe_gap: number = 200;
    @property limitPipePositionY: number = 100;
    @property pipe_length: number = 250;
    @property({ type: Prefab })
    public topPrefab: Prefab | null = null;
    @property({ type: Prefab })
    public buttomPrefab: Prefab | null = null;
    @property({ type: Node })
    private playerNode: Player | null = null;
    @property
    public startPipeIv: number = 100;

    public pipes = [];

    generatePipes(player: Player) {
        for (let i = 0; i < this.pipe_num; i++) {
            let tempTop = instantiate(this.topPrefab);
            let tempButtom = instantiate(this.buttomPrefab);

            this.node.addChild(tempTop);
            this.node.addChild(tempButtom);

            let pipePositionY = Math.random() * this.limitPipePositionY * 2 - this.limitPipePositionY;
            tempTop.setPosition(player.initPositionX + this.startPipeIv + this.pipe_interval * i, pipePositionY + this.pipe_length);
            tempButtom.setPosition(player.initPositionX + this.startPipeIv + this.pipe_interval * i, pipePositionY - this.pipe_gap - this.pipe_length)

            this.pipes.push([tempTop, tempButtom]);

        }
    }

    movePipes(deltaTime: number) {
        for (let i = 0; i < this.pipe_num; i++) {
            let tempTop = this.pipes[i][0];
            let tempButtom = this.pipes[i][1];

            let tempX = tempTop.position.x - this.speedX * deltaTime;

            if (tempX <= -700) {
                tempX = 700;
                let tempY = Math.random() * this.limitPipePositionY * 2 - this.limitPipePositionY;
                tempTop.setPosition(tempX, tempY + this.pipe_length);
                tempButtom.setPosition(tempX, tempY - this.pipe_gap - this.pipe_length);
            }
            else {
                tempTop.setPosition(tempX, tempTop.position.y);
                tempButtom.setPosition(tempX, tempButtom.position.y)
            }
        }
    }




    start() {
        const player = this.playerNode.getComponent(Player);
        this.generatePipes(player);

    }

    update(deltaTime: number) {
        this.movePipes(deltaTime);
    }
}


