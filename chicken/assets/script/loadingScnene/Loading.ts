import GameManager from "../gamecore/managers/GameManager";
import GameData from "../GameData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(cc.Node)
    progressBar: cc.Node = null;

    @property(cc.Node)
    progress: cc.Node = null;

    start () {
        this.gameGo();
        // GameManager.soundsManager.playTapSound();
    }
    private gameGo(){
        let w:number = this.progressBar.getContentSize().width - 10;
        let fn:Function = ()=>{
            let len:number = Math.floor(Math.random()*100)
            let pro:number = this.progress.getContentSize().width;
            if(pro+len >= w){
                this.progress.width = w;
                cc.director.loadScene('indexScene')
                this.unschedule(fn)
            }else{
                this.progress.width = pro+len;
            }
        }
        this.schedule(fn,0.3)
    }
    // update (dt) {}
}
