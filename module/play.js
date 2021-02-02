import * as map from './map.js';

/*
* @param {*} direction left right up down
*/
export function playerMove(direction){
    var playerPoint = getPlayerPoint();//得到玩家位置
    console.log(playerPoint);
    var nextInfo = getNextInfo(playerPoint.row,playerPoint.col,direction);//得到玩家下一个位置的信息
    console.log(nextInfo);

    // 什么情况不能移动
    if(nextInfo.value === map.WALL){
        return false;//下个位置是墙
    }
    //能移动
    if(nextInfo.value === map.SPACE){
        //下个位置是空白
        exchange(playerPoint,nextInfo);
        return true;
    }else{
        //下一个位置是箱子
        // 获取箱子的下一个位置
        var nextNextInfo = getNextInfo(nextInfo.row,nextInfo.col,direction);
        if(nextNextInfo.value === map.SPACE){
            //可以移动
            exchange(nextInfo,nextNextInfo);//移动箱子
            exchange(playerPoint,nextInfo);//移动玩家
            return true;
        }else{
            return false;
        }
    }
}
export function isWin(){
    // 是否每个正确位置都有箱子
    for(var i = 0;i < map.correct.length;i ++){
        var point = map.correct[i];
        if(map.content[point.row][point.col] != map.BOX){
            //该正确位置上没有箱子
            return false;
        }
    }
    return true;
}
function exchange(point1,point2){
    var temp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = temp;
}

function getPlayerPoint(){
    for(var row = 0;row < map.rowNumber;row ++){
        for(var col = 0;col < map.colNumber;col ++){
            if(map.content[row][col] === map.PLAYER){
                return{
                    row:row,
                    col:col
                }
            }
        }
    }
    throw new Error('no player');
}

// 得到某个位置在指定方向上的下一个位置的信息（第几行，第几列，内容是啥）
function getNextInfo(row,col,direction){
    if(direction === 'left'){
        return{
            row:row,
            col:col - 1,
            value:map.content[row][col - 1]
        }
    }else if(direction === 'right'){
        return{
            row:row,
            col:col + 1,
            value:map.content[row][col + 1]
        }
    }else if(direction === 'up'){
        return{
            row:row - 1,
            col:col,
            value:map.content[row - 1][col]
        }
    }else{
        return{
            row:row + 1,
            col:col,
            value:map.content[row + 1][col]
        }
    }
}