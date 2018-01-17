
var screenWidth = window.screen.width;
var screenHeight = window.screen.height;
var bodyHeight = window.document.body.clientHeight

/**
 * 判断是否为null
 * @param e
 * @returns {boolean}
 */
function is_null(e) {
    if (e === "" || e === null || e === undefined || e === "undefined")
        return true;
    else
        return false;
}

/**
 * 生成随机坐标
 * @returns {{x: number, y: number}}
 */
function randomCoordinate() {
    var coordinate = {
        "x":0,
        "y":Math.round(Math.random() * bodyHeight),
    }
    return coordinate;
}

/**
 * 创建div并返回element
 * @param option
 * @returns {HTMLDivElement}
 */
function createDiv(option) {
    var bodyD = document.getElementsByTagName("body")[0];
    var cdiv = document.createElement("div");
    cdiv.innerHTML = repalceUrlToStr(option.html);
    cdiv.style.position = "fixed";
    cdiv.id  = "info" + timingNum;
    cdiv.setAttribute("name","answer_div");
    if(!is_null(option.l)){
        cdiv.style.left = option.l;
    }
    if(!is_null(option.r)){
        cdiv.style.right = option.r;
    }
    if(!is_null(option.t)){
        cdiv.style.top = option.t;
    }
    if(!is_null(option.b)){
        cdiv.style.bottom = option.b;
    }
    bodyD.appendChild(cdiv);
    return cdiv;
}

/**
 * 解析字符串中的链接地址
 * @param str
 * @returns {string}
 */
function getUrlToString(str) {
    if(!is_null(str)) {
        var reg = /(http:\/\/|ftp:\/\/|https:\/\/){0,1}[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if (!reg.test(str)) {
            console.log("不是正确的网址吧，请注意检查一下");
        }else{
            var res = reg.exec(str);
            /*for(var i = 0;i<res.length;i++){
                console.log(res[i]);
            }*/
            return reg.exec(str)[0];
        }
    }else{
        console.log("请输入网址");
        return "";
    }
}

/**
 * 获取链接
 * @param us
 * @returns {*}
 */
function repalceUrlToStr(us) {
    if(!is_null(us)){
        var url = getUrlToString(us);
        return us.replace(url,"<a onclick='open_url(\""+url+"\")'>"+url+"</a>");
    }else{
        console.log("无效的链接")
        return us;
    }
}

/**
 * 打开链接
 * @param url
 */
function open_url(url) {

    if(url.indexOf("http://") === -1 && url.indexOf("https://")  === -1 && url.indexOf("ftp://")  === -1){
        url = "http://" + url;
    }

    layui.use('layer', function(){
        var layer = layui.layer;
        layer.open({
            type: 2,
            title:url,
            scrollbar:true,
            moveOut:true ,
            area:['80%','80%'],
            content: url
        });
    });
}

var moveDistance = 3;//每次移动距离
var moveTime = 20;//多长时间移动一次

var timingArray = new Array();//存放所有定时任务
var timingNum = 0;//当前定时个数

/**
 * 创建定时任务
 * @param ele
 */
function createTiming(ele,type) {
    switch (type){
        case 0://上

            break;
        case 1://下
            break;
        case 2://左
            moveDcoumentLeft(ele);
            break;
        case 3://右
            moveDcoumentRight(ele)
            break;
    }
    timingNum++;
}



/**
 * 元素向左移动
 * @param dco
 */
function moveDcoumentLeft(ele,timeN) {
    if(is_null(timeN)){
        timeN = timingNum;
    }
    var rigNum = parseInt(ele.style.right.split("px")[0]);
    var widthNum = parseInt(ele.clientWidth);
    ele.style.right = (rigNum + moveDistance) + "px";
    if(rigNum < (screenWidth + widthNum)){
        timingArray[timeN] = setTimeout(function(){ moveDcoumentLeft(ele,timingNum);},moveTime);
    }else{
        ele.parentNode.removeChild(ele);
        clearTimeout(timingArray[timeN]);
    }
}
/**
 * 元素向右移动
 * @param dco
 */
function moveDcoumentRight(ele) {
    var leNum = parseInt(ele.style.left.split("px")[0]);
    var widthNum = parseInt(ele.clientWidth);
    ele.style.left = (leNum + moveDistance) + "px";
    if(leNum < (screenWidth + widthNum)){
        clearTimeout(timingArray[timingNum]);
        timingArray[timingNum] = setTimeout(function(){ moveDcoumentLeft(ele);},moveTime);
    }else{
        clearTimeout(timingArray[timingNum]);
        element.parentNode.removeChild(ele);
    }
}
