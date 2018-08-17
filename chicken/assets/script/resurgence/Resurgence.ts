import GameConfig from "../GameConfig";
import GameManager from "../gamecore/managers/GameManager";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Resurgence extends cc.Component {

    @property(cc.Label)
    timer: cc.Label = null;
    @property(cc.Node)
    close: cc.Node = null;
    @property(cc.Node)
    resuBtn:cc.Node = null;

    private time:number = GameConfig.RESURGENCE_TIME;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.close.on(cc.Node.EventType.TOUCH_END,this.onClose,this);
        this.resuBtn.on(cc.Node.EventType.TOUCH_END,this.onResurgence,this)
        this.schedule(this.timerFn,1)
    }
    private timerFn(){
        this.time-=1;
        this.timer.string = '' + this.time;
        if(this.time <= 0){
            this.onClose();
            this.unschedule(this.timerFn);
        }
    }
    private onClose(){
        GameManager.popUpManager.removePopUp(this.node);
        cc.director.loadScene('gameEndScene');
    }
    // 复活逻辑
    private onResurgence(){
        GameManager.popUpManager.removePopUp(this.node);

    }
}
