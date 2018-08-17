import GameData from "../GameData";
import GameManager from "../gamecore/managers/GameManager";
import Utils from "../gamecore/managers/Utils";

export default class Map extends cc.Node {
    constructor(){
        super();
        this.initMap();
        console.log('---init---')
    }
    private static _instance:Map;
    public static get instance():Map{
        if(!Map._instance) Map._instance = new Map();
        return Map._instance;
    }
    // 初始化地图
    private left_map:Array<object> = [];
    private right_map:Array<object> = [];
    private initMap(){
        let winSize:cc.Size = cc.director.getWinSize();
        let bottomY:number = -winSize.height / 2 / 2;
        let totalH:number = winSize.height * 0.518;

        let centerGap:number = 30;
        let sizeGap:number = 30;
        
        let totalW:number = winSize.width / 2 - centerGap / 2 - sizeGap;
        let rowH:number = totalH / 8;
        let colomnW:number = totalW / 3;

        let fromX:number = -winSize.width / 2 + sizeGap + colomnW / 2;
        let fromY:number = bottomY;

        let personIndex:number = 24;
        let num:number = 0;
        for (let i:number = 0; i < 8; i++) {
            for (let j:number = 0; j < 3; j++) {
                this.left_map.push({
                    pos:cc.v2(fromX , fromY),
                    empty:true,
                    dir:1,
                    zIndex:personIndex,
                    number:num,
                });
                personIndex--;
                num++;
                fromX += colomnW;
            }
            fromY += rowH;
            fromX = -winSize.width / 2 + sizeGap + colomnW / 2;
        }
        fromX = winSize.width / 2 - sizeGap - colomnW / 2;
        fromY = bottomY;
        num = 0;
        personIndex = 24;
        for (let i:number = 0; i < 8; i++) {
            for (let j:number = 0; j < 3; j++) {
                this.right_map.push({
                    pos:cc.v2(fromX , fromY),
                    empty:true,
                    dir:2,
                    zIndex:personIndex,
                    number:num,
                });
                personIndex--;
                num++;
                fromX -= colomnW;
            }
            fromY += rowH;
            fromX = winSize.width / 2 - sizeGap - colomnW / 2;
        }
    }
    // 获取位置
    public partPos():object{
        let obj:object;
        let dif:number = this.random(2);
        if(dif % 2 == 0){
            obj = this.toLeftPos();
        }else{
            obj = this.toRightPos();
        }
        return obj;
    }
    // 去左边
    public toLeftPos(item:object=null,god:boolean=false):any{
        this.upDataMap();
        let left_can:Array<object> = this.left_can;
        let right_can:Array<object> = this.right_can;
        let obj:object;
        if(god){
            if(left_can.length > 0){
                obj = left_can[0];
                this.left_map[left_can[0]['number']]['empty'] = false;
            }else{
                obj = this.left_map[this.left_map.length-1];
                this.left_map[this.left_map[this.left_map.length-1]['number']]['empty'] = false;
                let even:cc.Event.EventCustom = new cc.Event.EventCustom('onKeepOff',false);
                even.setUserData({old:item['map'],fresh:obj});
                this.dispatchEvent(even);
            }
            if(item['dir'] == 1){
                this.left_map[item['number']]['empty'] = true;
            }else if(item['dir'] == 2){
                this.right_map[item['number']]['empty'] = true;                    
            }
        }else{
            if(left_can.length > 0){
                obj = left_can[0];
                this.left_map[left_can[0]['number']]['empty'] = false;
                if(item)this.right_map[item['number']]['empty'] = true;
            }else if(right_can.length > 0){
                obj = right_can[0];
                this.right_map[right_can[0]['number']]['empty'] = false;
                if(item)this.right_map[item['number']]['empty'] = true;
            }else{
                console.log("BUG--POS-L1-")
            }
        }
        return obj;
    }
    // 去右边
    public toRightPos(item:object=null,god:boolean=false):any{
        this.upDataMap();
        let left_can:Array<object> = this.left_can;
        let right_can:Array<object> = this.right_can;
        let obj:object;
        if(god){
            if(right_can.length > 0){
                obj = right_can[0];
                this.right_map[right_can[0]['number']]['empty'] = false;
            }else{
                obj = this.right_map[this.right_map.length-1];
                this.right_map[this.right_map[this.right_map.length-1]['number']]['empty'] = false;
                let even:cc.Event.EventCustom = new cc.Event.EventCustom('onKeepOff',false);
                even.setUserData({old:item['map'],fresh:obj});
                this.dispatchEvent(even);
            }
            
            if(item['dir'] == 1){
                this.left_map[item['number']]['empty'] = true;
            }else if(item['dir'] == 2){
                this.right_map[item['number']]['empty'] = true;                    
            }
        }else{
            if(right_can.length > 0){
                obj = right_can[0];
                this.right_map[right_can[0]['number']]['empty'] = false;
                if(item)this.left_map[item['number']]['empty'] = true;
            }else if(left_can.length > 0){
                obj = left_can[0];
                this.left_map[left_can[0]['number']]['empty'] = false;
                if(item)this.left_map[item['number']]['empty'] = true;
            }else{
                console.log("BUG--POS-L2-")
            }
        }
        return obj;
        
    }
    private left_can:Array<object>;
    private right_can:Array<object>;
    // 更新使用
    private upDataMap(){
        let left_can:Array<object> = [];
        let right_can:Array<object> = [];
        this.loop(this.left_map,(i,item)=>{
            if(item.empty){
                left_can.push(item)
            }
        })
        this.loop(this.right_map,(i,item)=>{
            if(item.empty){
                right_can.push(item)
            }
        })
        this.left_can = left_can;
        this.right_can = right_can;
    }
    // 位置回收
    public recycle(item:object){
        if(item['dir'] == 1){
            this.left_map[item['number']]['empty'] = true;
        }else if(item['dir'] == 2){
            this.right_map[item['number']]['empty'] = true;
        }
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
    // loop
    private loop(arr:Array<any>,callback:Function){
        for(let i = 0;i < arr.length;i++){
            callback(i,arr[i]);
        }
    }
}
