/**
 * Created by ccy on 2018/8/10.
 */

//手机号输入框
var tel = document.getElementById('tel');
var btn = document.getElementById('btn');
var login = document.getElementById('login');
var vcode = document.getElementById('vcode');


tel.onblur = function () {

    checkPhone();
}

function checkPhone(){


    var reg=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if(!(reg.test(tel.value))){
        $("#hint").html("手机号不正确，请重新输入");
        console.log($("#tel").value);
        return false;
    }
    $('#hint').html('');
    return true;
}

//倒计时
var step=59;
btn.onclick = function () {
    if (checkPhone() == true){
        settime(btn);
        // var url = "http://192.168.1.207:8080/momole/api/common/msg.json"
        var url = "http://anmoyi.momole.com.cn/momole_test/api/common/msg.json"



        var url = URI + '/api/common/msg.json';

        var parameters = {"mobile":tel.value, "msgType":1};

        $.ajax({
            url:url,
            xhrFields: {
                withCredentials: true
            },
            type:"POST",
            dataType:"json",
            data: parameters,
            success:function (data) {

                if (data.code == '1'){
                    settime(btn);
                    console.log(data.object);
                }else {
                    alert(data.message);
                }


            },error:function(data){　　　　//请求出错误时的处理

                console(data.message);

            }

        })
    }else {
        alert("手机号不正确");
    }
}

function settime(val) {
    if (step == 0) {
        val.removeAttribute("disabled");
        val.value="获取验证码";
        step = 59;
        return false;
    } else {
        val.setAttribute("disabled", true);
        val.value="重新发送" + step + ""+"s";
        step--;
    }
    setTimeout(function() {
        settime(val);
    },1000);
}

//登陆
login.onclick = function () {
    if (tel.value != "" && vcode.value != '') {

        // var url = "http://192.168.1.207:8080/momole/api/auths/loginByCode.json";
        var url = 'http://anmoyi.momole.com.cn/momole_test/api/auths/loginByCode.json'


        var url = URI + '/api/auths/loginByCode.json'


        console.log(vcode.value);
        $.ajax({
            url:url,
            xhrFields: {
                withCredentials: true
            },
            type:"POST",
            dataType:"json",
            data:{"mobile":tel.value,"vcode":vcode.value},
            success:function (data) {
                console.log(data);
                if (data.code == "1"){

                    sessionStorage.setItem('sessionid',data.object.sessionid);
                    sessionStorage.setItem('isLogin','yes');
                    sessionStorage.setItem('nickname',data.object.nickname);
                    sessionStorage.setItem('balance',data.object.balance);
                    sessionStorage.setItem('integral',data.object.integral);
                    sessionStorage.setItem('userId',data.object.userId);
                    sessionStorage.setItem('avatar',data.object.avatar);
                    console.log(data.object);
                    window.location.href = 'index.html';

                    console.log(data.object.sessionid)

                }else {
                    alert(data);

                }
            },
            error:function (data) {
                console.log(data);
            }

        })
    }
}


  // var url = "weixin://";
  //        $('#a1').attr('href',url)
  //        var lj = "PIWI_SUBMIT.Weixin_Open()";
  //        $('#a1').attr('onclick',lj);

function is_weixin(){
       var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
                return true;
        } else {
                return false;
        }
}