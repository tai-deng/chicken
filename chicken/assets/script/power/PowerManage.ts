import GameManager from "../gamecore/managers/GameManager";
import GameData from "../GameData";
import GameEventNames from "../GameEventNames";
import GameConfig from "../GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PowerManage extends cc.Node {
    constructor(){
        super();
        this.initPower();
    }
    private static _instance:PowerManage;
    static get instance():PowerManage{
        if(!PowerManage._instance) PowerManage._instance = new PowerManage();
        return PowerManage._instance;
    }

    // 体力值
    private powerValue:number;

    //上一次的时间
    private last:number;

    private setpowerValue(v:number){
        let va:number = this.powerValue + v;
        if(va >= GameConfig.KEY_MAX_POWER){
            va = GameConfig.KEY_MAX_POWER;
        }
        this.powerValue = va;
        // this.dispatchEvent(new cc.Event(GameEventNames.POWER_CHANGE,false))
    }
    // 初始化体力值
    private initPower(){
        let v:number = GameManager.dataManager.getData(GameData.KEY_POWER_VALUE);
        let last:number = GameManager.dataManager.getData(GameData.KEY_LAST_DATE);
        if(typeof v == 'undefined'){
            v = GameConfig.KEY_MAX_POWER;
        }
        if(typeof last == 'undefined'){
            last = new Date().getTime();
        }
        this.powerValue = v;
        this.last = last;
        this.compute();
    }
    // 计算体力
    private compute(){
        let current:number = new Date().getTime();
        let bad:number = (current-this.last)/1000/60;
        let goal_m:number = GameConfig.PER_MINUTE;
        let v:number = Math.floor(bad/goal_m);
        if(v > 0){
            this.last = current;
            this.setpowerValue(v);
        }
    }
    // 获取体力值
    public getPower():number{
        this.compute();
        return this.powerValue;
    }
    // 使用体力
    public usePower(){
        this.powerValue -= 1;
    }
    onDestroy(){
        GameManager.dataManager.setData(GameData.KEY_LAST_DATE,this.last,true)
        GameManager.dataManager.setData(GameData.KEY_POWER_VALUE,this.powerValue,true);

    }
}
