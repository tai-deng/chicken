import { GameMeta, QuestionsMeta } from "./pbcus";
import GameCoreEvent from "../gamecore/GameCoreEvent";


// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**
 * protobuf数据中心
 * 
 * @see https://github.com/dcodeIO/protobuf.js
 * 
 */
@ccclass
export default class PBManager extends cc.Node {

    private static _instance: PBManager;


    public static get instance(): PBManager {
        if (!PBManager._instance) new PBManager();

        return PBManager._instance;
    }


    private _gameMeta:GameMeta;

    constructor() {
        super();

        if (PBManager._instance) throw new Error("please use PBManager.instance");
        PBManager._instance = this;

        this.init();
    }


    private _isReady: boolean;


    /**
     * 是否已准备好
     */
    public get isReady(): boolean {
        return this._isReady;
    }



    //已经使用了的题目
    private _usedQuestions:Array<QuestionsMeta> = [];


    /**
     * 获取已经使用了的题目列表
     */
    public get usedQuestions():Array<QuestionsMeta> {
        return this._usedQuestions.concat();
    }



    /**
     * 获得一个问题。有可能返回null对象。
     * 
     * 
     * @param difficulty        难度系数。0表示任意难度
     * 
     */
    public getAQuestion(difficulty:number = 0):QuestionsMeta {
        if (this._gameMeta.questionsMeta.length == 0) {
            if (this._usedQuestions.length > 0) {
                //如果有已经使用的题目，重复使用
                this._gameMeta.questionsMeta = this._usedQuestions.concat();
            } else {
                return null;
            }
        }

        let len:number = this._gameMeta.questionsMeta.length;
        
        let theQ:QuestionsMeta;

        if (difficulty <= 0) {
            let index:number = Math.floor(Math.random() * len);
            theQ = this._gameMeta.questionsMeta[index] as QuestionsMeta;
        } else {
            let targetQ:Array<QuestionsMeta> = [];
            for (let i:number = 0; i < len; i++) {
                let question:QuestionsMeta = this._gameMeta.questionsMeta[i] as QuestionsMeta;
                if (question.difficulty == difficulty) {
                    targetQ.push(question);
                }
            }

            if (targetQ.length > 0) {
                let index:number = Math.floor(Math.random() * targetQ.length);
                theQ = targetQ[index] as QuestionsMeta;
            }
        }

        if (!theQ) return null;

        let index:number = this._gameMeta.questionsMeta.indexOf(theQ);
        this._gameMeta.questionsMeta.splice(index, 1);

        //记录已取出的题目
        if (this._usedQuestions.indexOf(theQ) == -1) {
            this._usedQuestions.push(theQ);
        }

        return theQ;
    }


    /**
     * 初始化
     */
    private init(): void {
        var url = cc.url.raw("resources/data/meta.json");

        if (typeof wx == "undefined") {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload =  (oEvent) => {
                // cc.info("oEvent", oEvent)
                this.dataLoadedCallback(xhr.response);
            }
            // 错误处理
            xhr.onerror = (err) => {
                cc.info("【PBManager】init, by XMLHttpRequest")
                cc.info(err)
            }
            
            xhr.send(null);
        } else {
            let FileSystemManager = wx.getFileSystemManager();
            let data = FileSystemManager.readFileSync(url);
            this.dataLoadedCallback(data);

            // wx.request({
            //     url: url,
            //     dataType:"arraybuffer",
            //     success: (res) => {
            //         cc.info(res);
            //         this.dataLoadedCallback(res["data"]);
            //     },
            //     fail: (err) => {
            //         cc.info("【PBManager】init by WX")
            //         cc.info(err);
            //     }
            // });
        }

    }
    
    
    
    private dataLoadedCallback(data):void {
        this._gameMeta = GameMeta.decode(new Uint8Array(data));
        // var msg:QuestionsMeta = QuestionsMeta.decode();
        // cc.info(JSON.stringify(msg, null, 4)); // Correctly decoded
        cc.info(this._gameMeta.questionsMeta.length);
    
    
        this._isReady = true;
        //抛出事件
        this.dispatchEvent(new cc.Event(GameCoreEvent.COMMON_READY, false));
    }



}
