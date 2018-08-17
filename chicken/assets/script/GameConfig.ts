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
export default class GameConfig{
    static KEY_MAX_POWER:number = 10;               // 最大体力值
    static PER_MINUTE:number = 5;                   // 多久恢复一点体力值
    static RESURGENCE_TIME:number = 10;             // 复活倒计时
    static AWARD1:number = 0;                       // 单题得分
    static AWARD2:number = 10;
    static AWARD3:number = 20;
    static AWARD4:number = 30;
    static AWARD5:number = 40;
    static AWARD6:number = 50;
    static AWARD7:number = 60;
    static AWARD8:number = 70;
    static AWARD9:number = 80;
    static AWARD10:number = 90;
}
