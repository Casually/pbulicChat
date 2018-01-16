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
 *
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
            area:['1024px','512px'],
            content: [url, 'no']
        });
    });
}