


export default class ShopJson {
    public shopData = [
        {
            url:'resources/texture/common/personModel/deer.png', // 图片资源
            default:'1',// 默认时下列属性不生效
            count:500, // 解锁数量
            describe:'使用500金币购买', // 解锁条件说明
            keyword:'gold', // 金币解锁/登录解锁/分享解锁 gold/taskLogIn/taskShare
            attr:'goods', // 商品属性 task -> 任务属性 goods -> 商品属性
            shopId:'10', // 商品 ID 不可重复和修改
        },
        {
            url:'resources/texture/common/personModel/hare.png',
            count:500,
            describe:'使用500金币购买',
            keyword:'gold',
            attr:'goods',
            shopId:'05',
        },
        {
            url:'resources/texture/common/personModel/duck.png',
            count:3000,
            describe:'使用3000金币购买',
            keyword:'gold',
            attr:'goods',
            shopId:'03',
        },
        {
            url:'resources/texture/common/personModel/bear.png',
            count:2,
            describe:'登录2次',
            keyword:'taskLogIn',
            attr:'task',
            shopId:'02',
        },
        {
            url:'resources/texture/common/personModel/lion.png',
            count:1,
            describe:'分享1次',
            keyword:'taskShare',
            attr:'task',
            shopId:'01',
        },
        {
            url:'resources/texture/common/personModel/geezer.png',
            count:100000,
            describe:'使用100000金币购买',
            keyword:'gold',
            attr:'goods',
            shopId:'09',
        },
        {
            url:'resources/texture/common/personModel/cat.png',
            count:200000,
            describe:'使用200000金币购买',
            keyword:'gold',
            attr:'goods',
            shopId:'06',
        },
        {
            url:'resources/texture/common/personModel/pig.png',
            count:10000,
            describe:'使用10000金币购买',
            keyword:'gold',
            attr:'goods',
            shopId:'07',
        },
        {
            url:'resources/texture/common/personModel/witch.png',
            count:30000,
            describe:'使用30000金币购买',
            keyword:'gold',
            attr:'goods',
            shopId:'08',
        },
        {
            url:'resources/texture/common/personModel/penguin.png',
            count:70000,
            describe:'使用70000金币购买',
            keyword:'gold',
            attr:'goods',
            shopId:'04',
        },
    ]
}
