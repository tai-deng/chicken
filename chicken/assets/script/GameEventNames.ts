

/**
 * 游戏事件名
 */
export default class GameEventNames {

    static ONANSWER_START:string = 'onAnswerStart';         // 开始答题
    static ONBETWEEN:string = 'onBetween';                  // 回答事件 
    static ONLEADINGOVER:string = 'onLeadingOver'           // 主角OVER事件
    static GAMEOVER:string = 'onGameOver';                  // 游戏结束
    static SHARE_FRIEND:string = 'onShareF'                 // 分享给朋友
    static POWER_TIP:string = 'onPowerTip'                  // 体力说明面板
    static RANK_WORLD:string = 'onRankWorld'                // 世界榜
    static RANK_FRIEND:string = 'onRankFriend'              // 朋友榜
    static SKIN_TIP:string = 'onSkinTip'                    // 皮肤说明
    static POWER_CHANGE:string = 'powerChange'              // 体力改变事件      
    static ONPUNISH:string = 'onPunish'                     // 惩罚事件
    static DIEACTIONFINISH:string = 'ondieactionfinish'     // 死亡动画完成
}
