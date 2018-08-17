import StoreItem from "./StoreItem";

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
export default class StoreImgsMain extends cc.Component {

    private static R_VALUE:number = 1000;

    private static EACH_ANGLE:number = 25;
   

    @property(cc.Prefab)
    storeItemPrefab:cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:


    private storeItems:Array<cc.Node> = [];

    onLoad() {
        this.node.y += StoreImgsMain.R_VALUE - 340;

        

    }

    start () {

    }



    private _data:Array<any> = null;


    public setData(value:Array<any>):void  {
        if (!value) return;
        if (this._data) return;

        this._data = value.concat();

        for (let i:number = 0; i < this._data.length; i++) {
            let item:cc.Node = cc.instantiate(this.storeItemPrefab);
            item.y = - StoreImgsMain.R_VALUE;
            item.rotation = 8 - Math.random() * 16;
            this.storeItems.push(item);
            item.getComponent(StoreItem).data = this._data[i];
            this.node.addChild(item)
        }

        this._currentIndex = Math.ceil(this.storeItems.length / 2);

        this.scheduleOnce(this.dispatchItems, 0.3)
    }

    // update (dt) {}



    /**
     * 分布所有item
     */
    private dispatchItems():void {

        for (let i:number = 0; i < this.storeItems.length; i++) {
            let item:cc.Node = this.storeItems[i];

            let toRotation:number = (i - Math.floor(this._data.length / 2)) * StoreImgsMain.EACH_ANGLE;
            
            let toX:number = Math.sin(Math.abs(toRotation)/180*Math.PI) * StoreImgsMain.R_VALUE;
            if (toRotation > 0) toX *= -1;
            let toY:number = -Math.cos(Math.abs(toRotation)/180*Math.PI) * StoreImgsMain.R_VALUE;

            item.runAction(cc.sequence(
                cc.delayTime(Math.random() / 2),
                // cc.delayTime(0.1),
                cc.spawn(
                    cc.moveTo(0.3, toX, toY).easing(cc.easeBackIn()),
                    cc.rotateTo(0.3, toRotation)
                )
                
            ))
        }
    }


    private _isMoving:boolean = false;


    public isMoving():boolean {
        return this._isMoving;
    }


    private _currentIndex:number = 0;


    public get currentIndex():number {
        return this._currentIndex;
    }

    public set currentIndex(v:number) {
        // if (this._isMoving) return;

        if (this._currentIndex == v) return;
        if (v < 0 || v >= this._data.length) return;

        this._currentIndex = v;

        this.refreshUI();

    }


    public next():void {
        this.currentIndex++;
    }


    public preview():void {
        this.currentIndex--;
    }


    private refreshUI():void {
        // cc.info(this._currentIndex)
        let toRotation:number = -this.storeItems[this._currentIndex].rotation;//(this._currentIndex - Math.ceil(this._data.length / 2)) * StoreImgsMain.EACH_ANGLE;

        this.node.stopAllActions();

        this._isMoving = true;
        this.node.runAction(
            cc.sequence(
                cc.rotateTo(0.2, toRotation).easing(cc.easeBackOut()),
                cc.callFunc(this.rotateComplete, this)
            )
        )
    }


    private rotateComplete():void {
        this._isMoving = false;
    }
}
