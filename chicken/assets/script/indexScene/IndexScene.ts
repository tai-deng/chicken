import GameManager from "../gamecore/managers/GameManager";
import GameData from "../GameData";
import GameConfig from "../GameConfig";
import GameSystem from "../GameSystem";
import GameEventNames from "../GameEventNames";
import PowerManage from "../power/PowerManage";
import EventManager from "../gamecore/managers/EventManager";

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
export default class IndexScene extends cc.Component {

    @property(cc.Node)
    gameGo:cc.Node = null
    @property(cc.Node)
    wolrdRank:cc.Node = null
    @property(cc.Node)
    rank:cc.Node = null
    @property(cc.Label)
    powerText:cc.Label = null
    @property(cc.Node)
    powerBtn:cc.Node = null;
    @property(cc.Node)
    shopMall:cc.Node = null;
    @property(cc.Prefab)
    shopMallPrefab:cc.Prefab = null;

    start(){
        this.gameGo.on(cc.Node.EventType.TOUCH_END,this.onGameGo,this);
        this.wolrdRank.on(cc.Node.EventType.TOUCH_END,this.onWorldRan,this);
        this.rank.on(cc.Node.EventType.TOUCH_END,this.onRank,this);
        this.powerBtn.on(cc.Node.EventType.TOUCH_END,this.onPower,this);
        this.shopMall.on(cc.Node.EventType.TOUCH_END,this.onShopMall,this)
        GameSystem.init();
        this.init();
    }
    // 初始化
    private init(){
        this.powerUpdate();
    }
    // 进入游戏
    private onGameGo(){
        let v:number = PowerManage.instance.getPower();
        if(v > 0){
            cc.director.loadScene('gameScene');
            PowerManage.instance.usePower();
            this.powerUpdate();
        }else{
            this.onPower();
        }
    }
    // 世界排行榜
    private onWorldRan(){
        GameManager.eventManager.dispatchEventWith(GameEventNames.RANK_WORLD);
    }
    // 好友排行榜
    private onRank(){
        GameManager.eventManager.dispatchEventWith(GameEventNames.RANK_FRIEND);
    }
    // 体力按钮
    private onPower(){
        GameManager.eventManager.dispatchEventWith(GameEventNames.POWER_TIP);
    }
    // 金币商店
    private onShopMall(){
        let node:cc.Node = cc.instantiate(this.shopMallPrefab);
        GameManager.popUpManager.addPopUp(node,true,false,1);
    }
    // 渲染体力
    private powerUpdate(){
        let current:number = PowerManage.instance.getPower();
        let max:number = GameConfig.KEY_MAX_POWER;
        this.powerText.string = current +'/'+ max;
    }
}
