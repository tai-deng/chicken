
import StoreManage from "./StoreManage";
import StoreItem from "./StoreItem";
import StoreImgsMain from "./StoreImgsMain";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Store extends cc.Component {

    @property(cc.Node)
    leftBtn: cc.Node = null;

    @property(cc.Node)
    rightBtn:cc.Node = null;

    @property(StoreImgsMain)
    storeImgMain:StoreImgsMain = null;

    private data:Array<object>=[];

    start () {
        this.leftBtn.on(cc.Node.EventType.TOUCH_END,this.onSlideshowLeft,this);
        this.rightBtn.on(cc.Node.EventType.TOUCH_END,this.onSlideshowRight,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        StoreManage.instance.on("onStoreDataChange",this.onStoreDataChange,this);
        this.data = StoreManage.instance.getData('shopShow');

        this.refreshUI();
    }
    private onStoreDataChange(){
        let key:string = StoreManage.instance.lastChangeKey;
        if(key == 'shopShow'){
            this.data = StoreManage.instance.getData('shopShow');
            this.refreshUI();
        }
    }

    // 渲染 数据
    private refreshUI(){
        this.storeImgMain.setData(this.data)
    }
    // 点击左边按钮 待选图片往右边走
    private onSlideshowLeft(){
        this.storeImgMain.next();
        return;
    }
    // 点击右边按钮 待选图片往左边走
    private onSlideshowRight(){
        this.storeImgMain.preview();
        return;
    }
    // 结束滑动
    private onTouchEnd(event:cc.Event){
        let startX = event["touch"]["_point"]['x'];
        let endX = event["touch"]["_startPoint"]['x'];
        if(Math.abs(startX) - Math.abs(endX) > 100){
            this.onSlideshowLeft();
        }
        if(Math.abs(endX) - Math.abs(startX) > 100){
            this.onSlideshowRight();
        }
    }
    // 渐隐动作
    private onFadeAction(node:cc.Node){
        node.runAction(
            cc.sequence(
                cc.fadeTo(0.5, 200),
                cc.fadeTo(0.5, 255)
            )
        );
    }
    private solidNum:number = 0;
    // update (dt) {}
}