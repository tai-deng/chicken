
import GameManager from "../gamecore/managers/GameManager";
import GameEventNames from "../GameEventNames";
import GameSystem from "../GameSystem";
import { QuestionsMeta } from "../pb/pbcus";
import PBManager from "../pb/PBManager";
import GameData from "../GameData";
import GameConfig from "../GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {
    // 计时器 / tip 面板
    @property(cc.Label)
    timer:cc.Label = null;

    @property(cc.Label)
    mainText:cc.Label = null;

    // 金币
    @property(cc.Label)
    gold:cc.Label = null;

    // 回答按钮
    @property(cc.Node)
    rightBtn:cc.Node = null;

    @property(cc.Node)
    wrongBtn:cc.Node = null;

    // 处罚
    @property(cc.Node)
    punishLeft:cc.Node = null;

    @property(cc.Node)
    punishRight:cc.Node = null;

    // 背景图 a / b
    @property(cc.Node)
    bgA:cc.Node = null;

    @property(cc.Node)
    bgB:cc.Node = null;

    // 左右位置容器 / 总容器
    // @property(cc.Node)
    // leftPos:cc.Node = null;

    // @property(cc.Node)
    // rightPos:cc.Node = null;

    @property(cc.Node)
    container:cc.Node = null;

    // 复活窗
    @property(cc.Prefab)
    resPre:cc.Prefab = null;

    // 左边闪烁图
    @property(cc.Node)
    flashL:cc.Node = null;
    @property(cc.Node)
    flashR:cc.Node = null;

    onLoad () {
        this.rightBtn.on(cc.Node.EventType.TOUCH_END,this.onRightHander);
        this.wrongBtn.on(cc.Node.EventType.TOUCH_END,this.onWrongHander);
        GameSystem.init();
    }

    start () {
        GameManager.eventManager.on(GameEventNames.ONLEADINGOVER,this.onLeadingOver,this)
        GameManager.eventManager.on(GameEventNames.DIEACTIONFINISH,this.onDieActionFinish,this)
        PBManager.instance.isReady;
        this.enter();
    }
    // 进场
    private enter(){
        this.mainText.string = '匹配中...';
        this.rightBtn.active = false;
        this.wrongBtn.active = false;
        this.punishLeft.active = false;
        this.punishRight.active = false;
        this.gold.string = ''+this.integral;
        this.flashL.active =false;
        this.flashR.active = false;

        this.matching();
    }
    // 答题
    private battleGo(){
        if(PBManager.instance.isReady){
            this.getTopic();
            this.onStart();
        }else{
            this.mainText.string = '正在加载题库';
        }
    }
    // 第一阶段 -> 匹配
    private matching(){
        let time:number = GameData.KEY_MATCHING_TIME;
        let callback:Function = ()=>{
            time -=1;
            if(time == 0){
                this.battleGo();
                this.unschedule(callback);
            }
            this.timer.string = '' + time;
        }
        GameManager.dataManager.setData(GameData.KEY_PUNISH,false);
        this.schedule(callback,1)
    }
    // 第二阶段 -> 开始答题
    private onStart(){
        GameManager.eventManager.dispatchEventWith(GameEventNames.ONANSWER_START,{end:false});
        this.rightBtn.active = true;
        this.wrongBtn.active = true;
        this.timer.string = '' + GameData.KEY_ANSWER_TIME;
        let time:number = GameData.KEY_ANSWER_TIME;
        let callback:Function = ()=>{
            time -=1;
            if(time == 0){
                this.onReveal();
                GameManager.dataManager.setData(GameData.KEY_PUNISH,true);
                this.unschedule(callback);
            }
            this.timer.string = '' + time;
        }
        this.schedule(callback,1)
    }
    // 第三阶段 -> 时间到公布结果
    // 选择 1 -> 左边 2 -> 右边
    private question:QuestionsMeta;
    private onReveal(){
        this.rightBtn.active = false;
        this.wrongBtn.active = false;
        let key = this.question.answer;
        GameManager.dataManager.setData(GameData.KEY_RIGHT_ANSWER,key,false);
        if(key){
            this.punishLeft.active = false;
            this.punishRight.active = true;
            GameManager.eventManager.dispatchEventWith(GameEventNames.ONPUNISH,{pos:1})
        }else{
            this.punishLeft.active = true;
            this.punishRight.active = false;
            GameManager.eventManager.dispatchEventWith(GameEventNames.ONPUNISH,{pos:2})
        }
        GameManager.eventManager.dispatchEventWith(GameEventNames.ONANSWER_START,{end:true});
    }
    // 死亡动画结束
    private onDieActionFinish(){
        if(!this.gameOver){
            if(this.rightAnswer == 10){
                cc.director.loadScene('gameEndScene');
            }else{
                this.battleGo();
            }
        }
    }
    // 主角挂了
    private gameOver:boolean = false;
    private onLeadingOver(event:cc.Event){
        if(this.gameOver) return
        this.gameOver = true;
        let node:cc.Node = cc.instantiate(this.resPre);
        GameManager.popUpManager.addPopUp(node,true,false,1);
        this.node.stopAllActions()
    }
    // 左边答题按钮
    private onRightHander(){
        GameManager.eventManager.dispatchEventWith(GameEventNames.ONBETWEEN,{answer:1});
        let sprict:GameScene = cc.find('Canvas').getComponent(GameScene);
        sprict.flashFn(sprict.flashL)
    }
    // 右边答题按钮
    private onWrongHander(){
        GameManager.eventManager.dispatchEventWith(GameEventNames.ONBETWEEN,{answer:2});
        let sprict:GameScene = cc.find('Canvas').getComponent(GameScene);
        sprict.flashFn(sprict.flashR)
    }
    // 第几题
    private rightAnswer:number = 0;
    // 积分
    private integral:number = 0;
    // 获取题目
    private getTopic(){
        let question:QuestionsMeta = PBManager.instance.getAQuestion();
        if (question) {
            this.mainText.string = question.question;
            this.question = question;
            this.rightAnswer += 1;
            this.gold.string = ''+this.integral;
            this.integral = this.integral + this.getAward(this.rightAnswer);
        }
    }
    // 答题奖励
    private getAward(v:number):number{
        let num:number;
        switch(v){
            case 1:
            num = GameConfig.AWARD1;
            break;
            case 2:
            num = GameConfig.AWARD2;
            break;
            case 3:
            num = GameConfig.AWARD3;
            break;
            case 4:
            num = GameConfig.AWARD4;
            break;
            case 5:
            num = GameConfig.AWARD5;
            break;
            case 6:
            num = GameConfig.AWARD6;
            break;
            case 7:
            num = GameConfig.AWARD7;
            break;
            case 8:
            num = GameConfig.AWARD8;
            break;
            case 9:
            num = GameConfig.AWARD9;
            break;
            case 10:
            num = GameConfig.AWARD10;
            break;
        }
        return num;
    }
    // 背景动画
    private winHeight:number = cc.director.getWinSize().height;
    private isStart:boolean = true;
    private bgAction(){
        if(this.isStart){
            this.bgA.setPosition(cc.p(0,0))
            this.bgB.setPosition(cc.p(0,-this.winHeight+2))
            this.isStart = false;
        }
        let fnA = cc.callFunc((event)=>{
            if(event.y >= this.winHeight){
                event.zIndex = 0;
                event.setPosition(cc.p(0,-this.winHeight+2))
                this.bgB.zIndex = 1
            }
        })
        let fnB = cc.callFunc((event)=>{
            if(event.y >= this.winHeight){
                event.zIndex = 0;
                event.setPosition(cc.p(0,-this.winHeight+2))
                this.bgA.zIndex = 1;
            }
        })
        let acA = cc.moveBy(0,new cc.Vec2(0,GameData.KEY_MOVE_STEP));
        let acB = cc.moveBy(0,new cc.Vec2(0,GameData.KEY_MOVE_STEP));

        this.bgA.runAction(cc.sequence(acA,fnA))
        this.bgB.runAction(cc.sequence(acB,fnB))
    }
    // 闪烁动作
    private flashFn(node:cc.Node){
        node.active = true;
        let action:cc.Action = cc.sequence(
            cc.blink(1,2),
            cc.callFunc(()=>{
                node.active = false;
            })
        )
        node.runAction(action);
    }
    update(){
        this.bgAction();
    }
    onDestroy(){
        GameManager.eventManager.off(GameEventNames.ONBETWEEN,null);
        GameManager.eventManager.off(GameEventNames.ONANSWER_START,null);
        GameManager.dataManager.setData(GameData.KEY_GOLDALL,this.integral,true)
    }
}
