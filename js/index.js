window.addEventListener("click",function (ev) {

})

var isEnter = false;

window.addEventListener("keydown",function (ev) {
    if(ev.key === "Enter"){
        if(isEnter){
            if(!is_null($("#info_enter").val())){
                var html = $("#info_enter").val()
                createCoordinate(html);
            }
            $("#info_enter").blur();
            $("#info_enter").val("");
            $("#input_enter").animate({bottom:'-80px'});
            isEnter = false;
        }else {
            $("#input_enter").animate({bottom:'100px'});
            $("#info_enter").focus();
            isEnter = true;
        }
    }
})

/**
 * 创建弹幕
 */
function createCoordinate(html) {
    var x = randomCoordinate().x;
    var y = randomCoordinate().y;
    var option = {
        "html":html,
        "t":y + "px",
        "r":x + "px"
    }
    var ele = createDiv(option);
    createTiming(ele,2);
}

//var getInfoTime = setInterval(getInfo,5000);

/**
 * 获取消息
 */
function getInfo() {
    $.ajax({
        "url":"",
        "data":{},
        "dataType":"json",
        "type":"POST",
        success:function (data) {
            
        },
        error:function () {
            alert(123)
        }
    })
}