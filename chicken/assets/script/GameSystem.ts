import GameManager from "./gamecore/managers/GameManager";
import GameEventNames from "./GameEventNames";
import AnswerStart from "./commands/AnswerStart";
import ResponseAnswer from "./commands/ResponseAnswer";
import LeadingOver from "./commands/LeadingOver";
import GameData from "./GameData";
import ShareFriend from "./commands/ShareFriend";
import GameOver from "./commands/GameOver";
import PowerTip from "./commands/PowerTip";
import RankFriend from "./commands/RankFriend";
import RankWorld from "./commands/RankWorld";
import SkinTipCommand from "./commands/SkinTipCommand";
import PowerManage from "./power/PowerManage";
import PunishCommand from "./commands/PunishCommand";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameSystem extends cc.Node {

    public static init(){
        // 开始答题
        GameManager.context.mapEvent(GameEventNames.ONANSWER_START,AnswerStart);
        // 回答动作
        GameManager.context.mapEvent(GameEventNames.ONBETWEEN,ResponseAnswer);
        // 主角挂了
        GameManager.context.mapEvent(GameEventNames.ONLEADINGOVER,LeadingOver);
        // 游戏结束
        GameManager.context.mapEvent(GameEventNames.GAMEOVER,GameOver);
        // 分享朋友圈
        GameManager.context.mapEvent(GameEventNames.SHARE_FRIEND,ShareFriend);
        // 体力说明
        GameManager.context.mapEvent(GameEventNames.POWER_TIP,PowerTip);
        // 世界排行榜
        GameManager.context.mapEvent(GameEventNames.RANK_WORLD,RankWorld)
        // 朋友排行榜
        GameManager.context.mapEvent(GameEventNames.RANK_FRIEND,RankFriend)
        // 皮肤说明
        GameManager.context.mapEvent(GameEventNames.SKIN_TIP,SkinTipCommand)
        // 游戏惩罚
        GameManager.context.mapEvent(GameEventNames.ONPUNISH,PunishCommand)
    }
}
