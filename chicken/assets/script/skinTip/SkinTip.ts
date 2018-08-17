import GoodsProto from "../indexScene/GoodsProto";
import StoreManage from "../indexScene/StoreManage";
import GameManager from "../gamecore/managers/GameManager";
import GameData from "../GameData";
import GameEventNames from "../GameEventNames";

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
export default class SkinTip extends cc.Component {

    @property(cc.Node)
    unlock:cc.Node = null;
    @property(cc.Label)
    tipText:cc.Label = null;
    @property(cc.Sprite)
    skin:cc.Sprite = null;

    @property(cc.SpriteFrame)
    btnInvite:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    btnmore:cc.SpriteFrame = null;

    @property(cc.Node)
    bold:cc.Node = null;

    data:GoodsProto;
    
    start(){
        this.unlock.on(cc.Node.EventType.TOUCH_END,this.onUnlock,this);
        this.skin.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(
            cc.textureCache.addImage(
                cc.url.raw(this.data['url']),null,null)
            );
        this.tipText.string = this.data.describe;
        this.initBtn();
    }
    private initBtn(){
        switch(this.data.keyword){
            case 'gold':
            this.bold.active = true;
            this.unlock.getComponent(cc.Sprite).spriteFrame = this.btnmore;
            break;
            case 'taskShare':
            this.bold.active = false;
            this.unlock.getComponent(cc.Sprite).spriteFrame = this.btnInvite;
            break;
            case 'taskLogIn':
            this.bold.active = false;
            this.unlock.getComponent(cc.Sprite).spriteFrame = this.btnInvite;
            break;
        }

    }
    // 解锁
    private onUnlock(){
        switch(this.data.keyword){
            case 'gold':
            this.onunlock();
            break;
            case 'taskShare':
            GameManager.eventManager.dispatchEventWith(GameEventNames.SHARE_FRIEND);
            console.log('分享')
            break;
        }
    }
    // 购买/解锁/使用
    private onunlock(){
        cc.director.loadScene('gameScene');
    }
}
