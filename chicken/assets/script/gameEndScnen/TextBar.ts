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
export default class TextBar extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    image: cc.Sprite = null;

    @property(cc.SpriteFrame)
    upImg: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    downImg: cc.SpriteFrame = null;

    text:string;
    pic:number;     // 1左边 2右边
    start () {
        this.init();
    }
    private init(){
        if(this.text){
            this.label.string = this.text;
        }
        if(this.pic){
            if(this.pic == 1){
                this.image.spriteFrame = this.upImg;
            }
            if(this.pic == 2){
                this.image.spriteFrame = this.downImg;
            }
        }
    }
    // update (dt) {}
}
