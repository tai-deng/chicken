import PersonModel from "./PersonModel";
import Person from "./Person";
import GameManager from "../gamecore/managers/GameManager";
import GameData from "../GameData";
import Map from "./Map";
import PersonItem from "./PersonItem";

const {ccclass, property} = cc._decorator;

@ccclass
/**
 * 位置管理
 */
export default class Player extends cc.Component {

    @property({
        type:cc.Node,
        displayName:'玩家容器'
    })
    container:cc.Node = null;
    // 图片模型
    @property(cc.SpriteFrame)
    m_pic:cc.SpriteFrame = null;
    // 人物模型
    private personModel:Array<object> = new PersonModel().personModel;

    start () {
        this.matching();
    }
    // 1. 随机游戏玩家数量 40 - 47 实例化
    private matching(){
        // let peoples = this.random(7,40);
        let peoples:number = 47;
        cc.loader.loadRes('prefab/person',cc.Prefab,(error:Error,res:any)=>{
            let row = this.random(peoples);
            for(let i = 0;i < peoples;i++){
                let node:cc.Node = cc.instantiate(res)
                let personModel:object = this.personModel[this.random(this.personModel.length)];
                let person:Person = new Person();
                if(row == i){
                    person.image = GameManager.dataManager.getData(GameData.KEY_USE_SKIN);
                    person.god = true;
                }else{
                    person.image = personModel['mark'];
                    person.god = false;
                }
                person.map = Map.instance.partPos();
                node.getComponent(PersonItem).data = person;
                this.container.addChild(node);
            }
        })
    }
    /**
     * 生成区间随机数
     * @param num 最大值
     * @param least 最小值不传为0
     */
    private random(num:number,least:number=0):number{
        let rand = Math.floor(Math.random() * num) + least;
        if(rand == num) rand = rand - 1;
        return  rand;
    }
}