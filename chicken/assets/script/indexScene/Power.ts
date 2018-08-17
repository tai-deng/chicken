import GameManager from "../gamecore/managers/GameManager";
import GameData from "../GameData";
import GameConfig from "../GameConfig";
import GameEventNames from "../GameEventNames";
import PowerManage from "../power/PowerManage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Power extends cc.Component {
    // 体力值显示
    @property(cc.Label)
    label: cc.Label = null;
    // 跟多体力
    @property(cc.Node)
    more: cc.Node = null;
    // 关闭
    @property(cc.Node)
    close:cc.Node = null;

    @property([cc.Sprite])
    helps:Array<cc.Sprite> = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.more.on(cc.Node.EventType.TOUCH_END,this.onMore,this);
        this.close.on(cc.Node.EventType.TOUCH_END,this.onClose,this);
        this.init();
    }
    private init(){
        let current:number = PowerManage.instance.getPower();

        let max:number = GameConfig.KEY_MAX_POWER;
        this.label.string = current +'/'+ max;
    }
    // 分享朋友 获取体力值
    private onMore(){
        GameManager.eventManager.dispatchEventWith(GameEventNames.SHARE_FRIEND);
    }
    // 关闭
    private onClose(){
        GameManager.popUpManager.removePopUp(this.node);
    }
}
