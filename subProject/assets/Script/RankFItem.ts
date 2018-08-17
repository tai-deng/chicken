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
export default class RankFItem extends cc.Component {

    @property(cc.Sprite)
    rankImg: cc.Sprite = null;
    @property(cc.Label)
    rankNum: cc.Label = null;
    @property(cc.Sprite)
    rankBg:cc.Sprite = null;

    @property(cc.Sprite)
    userImg: cc.Sprite = null;
    @property(cc.Label)
    userName:cc.Label = null;
    @property(cc.Label)
    usesrScore:cc.Label = null;

    @property({
        type:[cc.SpriteFrame],
        displayName:'奖牌纹理'
    })
    userRankImgs:Array<cc.SpriteFrame> = [];
    @property({
        type:[cc.SpriteFrame],
        displayName:'背景纹理'
    })
    rankBgAll:Array<cc.SpriteFrame> = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
