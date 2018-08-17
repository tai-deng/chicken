

export default class GameData {

    static KEY_USE_SKIN:string = 'useSkin';                     // 当前使用的皮肤
    static KEY_STORE_GOODS:string = 'storeGoods';               // 个人皮肤数据
    static KEY_GOLDALL:string = 'gold';                         // 获得金币总数
    static KEY_TASKLOGIN:string = 'taskLogIn';                  // 登录任务次数
    static KEY_TASKSHARE:string = 'taskShare';                  // 分享任务次数
    static KEY_USERINFO:string = 'userInfo';                    // 用户信息
    static KEY_COMMITANSWER:string = 'commitAnswer';            // 自己的站队
    static KEY_CONTAINERSIZE:string = 'containerSize';          // 容器大小
    static KEY_LEFTPOS:string = 'leftPos';                      // 左边容器坐标
    static KEY_RIGHTPOS:string = 'rightPos';                    // 右边容器坐标
    static KEY_RIGHT_ANSWER:string = 'rightAnswer'              // 正确答案
    static KEY_PUNISH:string = 'punish'                         // 公布结果
    static KEY_POWER_VALUE:string = 'powerValue'                // 当前体力值
    static KEY_LAST_DATE:string = 'lastDate'                    // 上一次获得体力的时间
    static KEY_GAME_RESULT:string = 'gameResult'                // 游戏结束
    
    static KEY_MATCHING_TIME:number = 10;                       // 匹配倒计时时间
    static KEY_ANSWER_TIME:number = 5;                          // 回答时间
    static KEY_POS_ERROR:number = 0;                            // 队列整齐误差
    static KEY_MOVE_STEP:number = 3;                            // 背景移动速度
    static KEY_MWIDTH:number = 125;                             // 皮肤宽
    static KEY_MHEIGHT:number = 141;                            // 皮肤高
    static KEY_ROW:number = 3;                                  // game 一行几个玩家
    static KEY_LINE:number = 8;                                 // game 一列几个玩家
    static KEY_GAP_L:number = 30;                               // game 两列间隔-左
    static KEY_GAP_R:number = 30;                               // game 两列间隔-右
}
