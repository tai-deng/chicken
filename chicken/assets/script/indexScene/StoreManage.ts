import GoodsProto from "./GoodsProto";
import ShopJson from "./ShopJson";
import GameManager from "../gamecore/managers/GameManager";
import GameData from "../GameData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class StoreManage extends cc.Node {
    constructor(){
        super();
        this.initData();
    }
    private static _instance:StoreManage = null;
    public static get instance():StoreManage {
        if(!StoreManage._instance) StoreManage._instance = new StoreManage();
        return StoreManage._instance;
    }
    // 配置文件
    private shopJson:Array<object> = new ShopJson().shopData;
    // 商店商品
    private shopShow:Array<object> =[];

    // 初始化商品
    public initData(){
        let shopShow = this.getData('shopShow');
        // 初始化json数据
        for(let i = 0;i < this.shopJson.length;i++){
            let goods = new GoodsProto();
            goods.url = this.shopJson[i]['url'];
            goods.count = this.shopJson[i]['count'];
            goods.describe = this.shopJson[i]['describe'];
            goods.keyword = this.shopJson[i]['keyword'];
            goods.attr = this.shopJson[i]['attr'];
            goods.shopId = this.shopJson[i]['shopId'];
            if(this.shopJson[i]['default'] == '1'){
                goods.isUse = true;
                goods.isUnlock = true;
                GameManager.dataManager.setData(GameData.KEY_USE_SKIN,this.shopJson[i]["shopId"],true);
            }else{
                goods.isUse = false;
                goods.isUnlock = false;
            }
            let v:number = GameManager.dataManager.getData(this.shopJson[i]['keyword']);
            if(typeof v == 'undefined'){
                v = 0;
                GameManager.dataManager.setData(this.shopJson[i]['keyword'],v);
            }
            shopShow.push(goods);
        }
        // 合并缓存数据
        let storage = GameManager.dataManager.getData(GameData.KEY_STORE_GOODS);
        for(let i = 0;i < shopShow.length;i++){
            if(storage){
                for(let j = 0;j < storage.length;j++){
                    if(shopShow[i]["shopId"] == storage[j]["shopId"]){
                        shopShow[i]['isUnlock'] = storage[j]['isUnlock'];
                        shopShow[i]['isUse'] = storage[j]['isUse'];
                    }
                }
            }
        }
        // 排序
        let temp:Array<object> = [];
        for(let i = 0;i < shopShow.length;i++){
            if(shopShow[i]['isUse']){
                temp[1] = shopShow[i];
                if(i-1 >= 0){
                    temp[0] = shopShow[i-1];
                }else{
                    temp[0] = shopShow[shopShow.length-1];
                }
            }
        }
        for(let i = 0;i < shopShow.length;i++){
            if(shopShow[i]["shopId"] != temp[0]["shopId"] && shopShow[i]["shopId"] != temp[1]["shopId"]){
                temp.push(shopShow[i])
            }
        }
        this.setData('shopShow',temp)
    }

    // 使用皮肤
    public useSkin(skin:object){
        let shopShow = this.getData('shopShow');
        for(let i = 0;i < shopShow.length;i++){
            shopShow[i]['isUse'] = false;
            if(shopShow[i]["shopId"] == skin[i]["shopId"]){
                shopShow[i]['isUnlock'] = true;
                shopShow[i]['isUse'] = true;
                this.updateStorage(shopShow[i]);
                GameManager.dataManager.setData(GameData.KEY_USE_SKIN,shopShow[i]["shopId"],true);
            }
        }
        this.setData('shopShow',shopShow)
    }
    // 解锁新皮肤
    public unlockSkin(skin:object){
        let shopShow = this.getData('shopShow');
        for(let i = 0;i < shopShow.length;i++){
            shopShow[i]['isUse'] = false;
            if(shopShow[i]["shopId"] == skin[i]["shopId"]){
                shopShow[i]['isUnlock'] = true;
                shopShow[i]['isUse'] = true;
                this.updateStorage(shopShow[i]);
                GameManager.dataManager.setData(GameData.KEY_USE_SKIN,shopShow[i]["shopId"],true);
            }
        }
        this.setData('shopShow',shopShow)
    }

    // 储存个人使用数据
    private updateStorage(data:object){
        let storage = GameManager.dataManager.getData(GameData.KEY_STORE_GOODS);
        storage = storage ? storage : [];
        let flag:boolean = true;
        if(storage){
            for(let i = 0;i < storage.length;i++){
                if(data['shopId'] == storage[i]['shopId']){
                    flag = false;
                    storage[i]['isUnlock'] = data['isUnlock'];
                    storage[i]['isUse'] = data['isUse'];
                }
            }
        }
        if(flag){
            storage.push(data);
        }
        GameManager.dataManager.setData(GameData.KEY_STORE_GOODS,storage);
    }

    // 最后一个改变的数据
    private _lastChangeKey:string;
    public get lastChangeKey():string{
        return this._lastChangeKey;
    }
    public getData(key:string):any{
        return this[key];
    }
    private setData(key:string,value:any){
        this[key] = value;
        this._lastChangeKey = key;
        this.dispatchEvent(new cc.Event("onStoreDataChange",false))
    }
}
