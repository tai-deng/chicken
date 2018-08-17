
import GameManager from "../gamecore/managers/GameManager";
import GameData from "../GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameEndScnen extends cc.Component {

    @property(cc.Sprite)
    image: cc.Sprite = null;

    @property(cc.Node)
    shareBtn: cc.Node = null;
    @property(cc.SpriteFrame)
    baskImg:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    shareImg:cc.SpriteFrame = null;

    @property(cc.Node)
    goonBtn: cc.Node = null;

    @property(cc.Prefab)
    winPrefab:cc.Prefab = null;
    @property(cc.Prefab)
    failPrefab:cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.shareBtn.on(cc.Node.EventType.TOUCH_END,this.onShare,this);
        this.goonBtn.on(cc.Node.EventType.TOUCH_END,this.onGoon,this);
        this.init();
    }
    // 初始化
    private init(){
        let result:boolean = GameManager.dataManager.getData(GameData.KEY_GAME_RESULT);
        if(result){
            this.shareBtn.getComponent(cc.Sprite).spriteFrame = this.baskImg;
            let node:cc.Node = cc.instantiate(this.winPrefab);
            GameManager.popUpManager.addPopUp(node)
        }else{
            this.shareBtn.getComponent(cc.Sprite).spriteFrame = this.shareImg;
        }
        let img:string = GameManager.dataManager.getData(GameData.KEY_USERINFO);
        // this.image.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.textureCache.addImage(
        //     cc.url.raw(img['avatarUrl']),null,null
        // ))
        // 加载预制体处理题目



    }
    // 分享
    private onShare(){
        console.log('分享')
    }
    // 继续
    private onGoon(){
        cc.director.loadScene('indexScene');
    }
    // update (dt) {}
}
