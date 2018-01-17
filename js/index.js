window.addEventListener("click",function (ev) {

})

var isEnter = false;

window.addEventListener("keydown",function (ev) {
    if(ev.key === "Enter"){
        if(isEnter){
            createCoordinate();
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
function createCoordinate() {
    if(is_null($("#info_enter").val())){
        return;
    }
    var x = randomCoordinate().x;
    var y = randomCoordinate().y;
    var option = {
        "html":$("#info_enter").val(),
        "t":y + "px",
        "r":x + "px"
    }
    var ele = createDiv(option);

    createTiming(ele,2);
}
