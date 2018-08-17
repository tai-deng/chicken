
import GameManager from "../gamecore/managers/GameManager";
import GameEventNames from "../GameEventNames";
import GoodsProto from "./GoodsProto";
import StoreManage from "./StoreManage";
import GameData from "../GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StoreItem extends cc.Component {
    private _data:GoodsProto;
    public set data(o:GoodsProto){
        if(this._data != o){
            this._data = o;
            this.refreshUI();
        }
    }
    public get data():GoodsProto{
        return this._data;
    }

    @property(cc.Sprite)
    sprite:cc.Sprite = null;

    @property(cc.Node)
    unlockBtn:cc.Node = null;

    @property(cc.SpriteFrame)
    useImg:cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    buyImg:cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    currentImg:cc.SpriteFrame = null;

    private refreshUI(){
        this.sprite.spriteFrame = new cc.SpriteFrame(
            cc.textureCache.addImage(
                cc.url.raw(this.data.url),null,null
            )
        );

        if(this.data.isUnlock){
            if(this.data.isUse){
                this.unlockBtn.getComponent(cc.Sprite).spriteFrame = this.currentImg;
            }else{
                this.unlockBtn.getComponent(cc.Sprite).spriteFrame = this.useImg;
            }
        }else{
            this.unlockBtn.getComponent(cc.Sprite).spriteFrame = this.buyImg;
        }
    }
    start () {
        this.unlockBtn.on(cc.Node.EventType.TOUCH_END,this.onunlock,this);
    }
    // 购买/解锁/使用
    private onunlock(){
        // 1.是否解锁 2.是否使用 
        if(this.data.isUnlock){
            if(!this.data.isUse){
                StoreManage.instance.useSkin(this.data);
            }
        }else{
            let term:number = GameManager.dataManager.getData(this.data.keyword);
            let count:number = this.data.count;
            if(term >= count){
                if(this.data.keyword == 'gold'){
                    let temp:number = term - count;
                    GameManager.dataManager.setData(GameData.KEY_GOLDALL,temp,true);
                    console.log('金币购买')
                }else{
                    GameManager.dataManager.setData(this.data.keyword,0,true);
                    console.log('任务解锁')
                }
                StoreManage.instance.unlockSkin(this.data);
            }else{
                GameManager.eventManager.dispatchEventWith(GameEventNames.SKIN_TIP,[this.data])
            }
        }
    }
}
