import GameManager from "../gamecore/managers/GameManager";
import GameEventNames from "../GameEventNames";



const {ccclass, property} = cc._decorator;
/**
 * 惩罚类
 */
@ccclass
export default class Punish extends cc.Component {
    @property(cc.Node)
    left:cc.Node = null;
    @property(cc.Node)
    right:cc.Node = null;

    // 复位坐标
    private recover:number;
    start(){
        GameManager.eventManager.on(GameEventNames.ONPUNISH,this.onPunish,this)
        this.recover = cc.winSize.height / 2 + this.node.height / 2;
        this.node.y = -this.recover;
    }
    // 死亡动作监听
    private onPunish(e:cc.Event){
        let dir:number = e['data'].pos;
        if(dir == 1){
            this.dieActionLeft()
        }
        if(dir == 2){
            this.dieActionRight();
        }
    }
    // 死亡动画
    private demise:Array<object> = [{name:'stone',time:4},{name:'panda',time:5},{name:'hole',time:6},{name:'alpaca',time:7}]
    // 执行左边死亡动画
    public dieActionLeft(){
        let index:number = Math.floor(Math.random()*this.demise.length);
        let data:string = this.demise[index]['name'];
        this.left.getComponent(sp.Skeleton).animation = data;
        this.runCorps(this.left,this.demise[index]['time'])
    }
    //执行右边死亡动画
    public dieActionRight(){
        let index:number = Math.floor(Math.random()*this.demise.length);
        let data:string = this.demise[index]['name'];
        this.right.getComponent(sp.Skeleton).animation = data;
        this.runCorps(this.right,this.demise[index]['time'])
    }
    // 运行
    private runCorps(node:cc.Node,time:number){
        node.active = true;
        let x:number = node.getPositionX();
        let y:number = cc.winSize.height;
        let pos:cc.Vec2 = cc.p(x,y);
        node.runAction(cc.sequence(
            cc.moveTo(time,pos),
            cc.callFunc((node)=>{
                node.active = false;
                node.y = -this.recover;
                GameManager.eventManager.dispatchEventWith(GameEventNames.DIEACTIONFINISH)
            })
        ))
    }
}
