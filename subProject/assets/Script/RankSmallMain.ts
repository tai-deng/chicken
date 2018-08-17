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
export default class RankSmallMain extends cc.Component {

    @property({
        type:[cc.Label],
        displayName:'名次'
    })
    rankNum: Array<cc.Label> = [];
    @property({
        type:[cc.Sprite],
        displayName:'头像'
    })
    imgs:Array<cc.Sprite> = [];
    @property({
        type:[cc.Label],
        displayName:'得分'
    })
    scores:Array<cc.Label> = [];
    @property([cc.Node])
    nodes:Array<cc.Node> = [];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
