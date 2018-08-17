

export default class GoodsProto {
    public url:string;          // 图片资源
    public count:number;        // 解锁数量
    public describe:string;     // 解锁条件说明
    public keyword:string;      // 金币解锁/登录解锁/分享解锁  gold/taskLogIn/taskShare
    public attr:string;         // 商品属性 task -> 任务属性 goods -> 商品属性
    public isUnlock:boolean;    // 是否解锁 true -> 已解锁  false -> 未解锁
    public isUse:boolean;       // 是否使用 true -> 已使用  false -> 未使用 具有唯一性
    public shopId:string;       // 商品ID
}
