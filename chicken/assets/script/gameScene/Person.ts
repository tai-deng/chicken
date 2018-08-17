
import GameData from "../GameData";

/**
 * 玩家属性
 */
export default class Person {
    public image:string;               // 形象
    public god:boolean;                // 是否是自己
    public map:object;                 // 地图
    public step:number;                // 跑步速度
    public part:number;                // 1 左边正确阵营 2 右边错误阵营
    public num:number;                 // 序列号
}
