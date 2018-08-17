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
export default class ShopMallMain extends cc.Component {

    @property(cc.Node)
    one: cc.Node = null;
    @property(cc.Node)
    two: cc.Node = null;
    @property(cc.Node)
    three: cc.Node = null;
    @property(cc.Node)
    four: cc.Node = null;
    @property(cc.Node)
    five: cc.Node = null;
    @property(cc.Node)
    six: cc.Node = null;

    @property(cc.Node)
    close:cc.Node = null;

    start () {
        this.one.on(cc.Node.EventType.TOUCH_END,this.onOneHander,this)
        this.two.on(cc.Node.EventType.TOUCH_END,this.onTwoHander,this)
        this.three.on(cc.Node.EventType.TOUCH_END,this.onThreeHander,this)
        this.four.on(cc.Node.EventType.TOUCH_END,this.onFourHander,this)
        this.five.on(cc.Node.EventType.TOUCH_END,this.onFiveHander,this)
        this.six.on(cc.Node.EventType.TOUCH_END,this.onSixHander,this)
        this.close.on(cc.Node.EventType.TOUCH_END,this.onCloseHander,this)
    }
    private onOneHander(){
        this.payment({recharge:1,acquisition:300})
    }
    private onTwoHander(){
        this.payment({recharge:6,acquisition:900})
    }
    private onThreeHander(){
        this.payment({recharge:25,acquisition:8000})
    }
    private onFourHander(){
        this.payment({recharge:73,acquisition:25000})
    }
    private onFiveHander(){
        this.payment({recharge:168,acquisition:63000})
    }
    private onSixHander(){
        this.payment({recharge:328,acquisition:136000})
    }
    // 支付
    private payment(e:object){
        let recharge:number = e['recharge'];
        let acquisition:number = e['acquisition'];
        console.log('支付-->',recharge,'获得金币-->',acquisition)
    }
    // 关闭
    private onCloseHander(){
        GameManager.popUpManager.removePopUp(this.node)
    }

    // update (dt) {}
}
