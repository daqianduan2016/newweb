/**
 * Created by SXX on 2017/10/8.
 */
let loginRender = (()=> {
    let $userName = $('#userName'), $userPass = $('#userPass'), $submit = $('#submit');
    return {
        init(){
            $submit.tap(function () {
                $.ajax({
                    url: '/login',
                    type: 'post',
                    typeData: 'json',
                    data: {
                        name: $userName.val().trim(),
                        password: hex_md5($userPass.val().trim())
                    }
                    , success: function (result) {
                        if(parseFloat(result['code'])===1){
                            // alert('登录失败，请重试');
                            new Dialog('登录失败，重试',function () {
                                window.location.href=window.location.href;
                            });
                            return
                        }else{
                        cookie.set({
                            name:'userInfo',
                            value:JSON.stringify(result['data'])
                        });
                        window.location.href='index.html';}
                    }
                })
            })
        }
    }
})();
loginRender.init();
/*或获取了三个按钮*/