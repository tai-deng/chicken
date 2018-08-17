import GameManager from "../gamecore/managers/GameManager";
import GameData from "../GameData";
import Map from "./Map";
import GameEventNames from "../GameEventNames";
import Person from "./Person";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PersonItem extends cc.Component {

    @property(cc.Node)
    god:cc.Node = null;
    @property(sp.Skeleton)
    span:sp.Skeleton = null;
    @property(cc.Sprite)
    avatar:cc.Sprite = null;

    private _data:Person=null;
    public get data():Person{
        return this._data;
    }
    public set data(v:Person){
        if(v != this._data){
            this._data = v;
            this.refreshUI();
        }
    }
    private pos_go:cc.Vec2;
    start () {
        // console.log('go',this.data)
        GameManager.eventManager.on(GameEventNames.ONBETWEEN,this.onBetweenHander,this)
        GameManager.eventManager.on(GameEventNames.ONANSWER_START,this.onAnswerStartHander,this)
        Map.instance.on('onKeepOff',this.onKeepOff,this);
    }
    // 位置被主角占
    private onKeepOff(event:cc.Event.EventCustom){
        let obj:object = event.getUserData();
        if(obj['fresh']['pos'].x == this.data.map['pos'].x&&
            obj['fresh']['pos'].y == this.data.map['pos'].y){
                this.data.map = obj['old'];
                this.refreshUI();
        }
    }
    private spanAction:Array<string> = ['run','die_pit','die_stone']
    private refreshUI(){
        this.node.active = true;
        this.god.active = false;
        this.pos_go = this.data.map['pos'];
        if(this.data.god){
            this.god.active = true;
            GameManager.dataManager.setData(GameData.KEY_COMMITANSWER,this.data.map['dir'],false);
        }
        // come positon
        this.node.zIndex = this.data.map['zIndex'];
        this.span.animation = this.spanAction[0];
        this.span.defaultSkin = this.data.image;
        var newVec2 = this.beginPos();
        this.node.setPosition(newVec2);
        this.enterAction();
    }
    // go position
    private enterAction(){
        let action = this.moveBy(this.pos_go);
        this.node.runAction(action)
    }
    // 检测碰撞
    private testCrash(){
        let dir = this.data.map['dir'];
        let punish:cc.Rect;
        let node:cc.Rect = this.node.getBoundingBoxToWorld();
        if(dir == 1){
            punish = cc.find('Canvas/answer/punish/left').getBoundingBoxToWorld();
        }else if(dir == 2){
            punish = cc.find('Canvas/answer/punish/right').getBoundingBoxToWorld();
        }
        if(cc.rectIntersectsRect(node,punish)){
            let action1 = cc.fadeOut(1);
            let action2 = cc.removeSelf();
            let fn = cc.callFunc((node)=>{
                if(node.getComponent('PersonItem').data.god){
                    GameManager.eventManager.dispatchEventWith(GameEventNames.ONLEADINGOVER);
                }
                this.scheduleOnce(()=>{
                    Map.instance.recycle(this.data);
                    this.node.runAction(action2)
                },.4)
            })

            this.node.runAction(cc.sequence(action1,fn))
        }
    }
    // god 回答
    private onBetweenHander(e:cc.Event){
        if(this.data.god){
            let answer:number = e['data'].answer;
            if(answer == 1){
                this.data.map = Map.instance.toLeftPos(this.data,true);
            }else if(answer == 2){
                this.data.map = Map.instance.toRightPos(this.data,true);
            }
            GameManager.dataManager.setData(GameData.KEY_COMMITANSWER,this.data.map['dir'],false);
        }
    }
    // ai -> 开始答题
    private onAnswerStartHander(e:cc.Event){
        let over:boolean = e['data'].end;
        if(!over && !this.data.god){
            let ran:number = this.random(2);
            let flag:boolean = ran % 2 == 0 ? true : false;
            if(this.data.map['dir'] == 2 && flag){

                this.data.map = Map.instance.toLeftPos(this.data.map,false);
            }else if(this.data.map['dir'] == 1 && flag){

                this.data.map = Map.instance.toRightPos(this.data.map,false);
            }
            this.refreshUI();
        }
    }
    update(){
        if(GameManager.dataManager.getData(GameData.KEY_PUNISH))
        this.testCrash();
    }
    // a -> b action
    private moveBy(go:cc.Vec2):cc.ActionInterval{
        let deviation = this.random(GameData.KEY_MATCHING_TIME - 2);
        this.startPos = go;
        let x:number = go.x + this.random(GameData.KEY_POS_ERROR,-GameData.KEY_POS_ERROR);
        let y:number = go.y + this.random(GameData.KEY_POS_ERROR,-GameData.KEY_POS_ERROR);
        return cc.moveTo(deviation, cc.p(x,y));
    }
    private startPos:cc.Vec2;
    // 开始的位置
    private beginPos(){
        if(!this.startPos) this.startPos = this.enterPosition();
        return this.startPos;
    }
    // 随机进场位置
    private enterPosition():cc.Vec2{
        let dir:number = this.random(5,1);
        let size:object = cc.director.getWinSize();
        let x:number = this.random(size['width'])/2;
        let y:number = this.random(size['height'])/2;
        x = x - this.random(size['width']) / 2;
        y = y - this.random(size['height']) / 2;
        switch(dir){
            case 1:
            y = size['height'] / 2;
            break;
            case 2:
            x = size['width'] / 2;
            break;
            case 3:
            x = -size['width'] / 2;
            break;
            case 4:
            y = -size['height'] / 2;
            break;
        }
        return new cc.Vec2(x,y);
    }
    private random(num:number,least:number=0):number{
        let rand = Math.floor(Math.random() * num) + least;
        if(rand == num) rand = rand - 1;
        return  rand;
    }
}
