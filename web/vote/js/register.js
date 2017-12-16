/**
 * Created by SXX on 2017/10/8.
 */
let registerRender=(()=>{
  let $userNume=$('#userName'),
      $spanName=$('#spanName'),
      $userPhone=$('#userPhone'),
      $spanPhone=$('#spanPhone'),
      $userPass=$('#userPass'),
      $spanPass=$('#spanPass'),
      $userPassRepeat=$('#userPassRepeat'),
      $spanPassRepeat=$('#spanPassRepeat'),
      $userBio=$('#userBio'),
      $spanBio=$('#spanBio'),
      $man=$('#man'),
      $woman=$('#woman'),
      $submit=$('#submit');
let checkName=()=>{
     let val=$userNume.val().trim() ,
         reg = /^[\u4E00-\u9FA5]{2,5}(·[\u4E00-\u9FA5]{2,5})?$/;
     if(val.length==0){
         $spanName.html('用户名不能为空').addClass('error');
         return false;
       }
     if(!reg.test(val)){
         $spanName.html('用户名格式不正确').addClass('error');
         return false;
       }
       $spanName.html('').removeClass('error');
       return true;
};
let checkPhone=()=>{
    let val=$userPhone.val().trim(),
        reg = /^1\d{10}$/;
    if(val.length==0){
        $spanPhone.html('电话号码不能为空').addClass('error');
        return false;
    }
    if(!reg.test(val)){
        $spanPhone.html('电话号码格式不正确').addClass('error');
        return false;
    }
    let code=0;
    $.ajax({
        url:'/checkPhone',type:'get',typeData:'json',data:{
            phone:val
        },async:false,cache:false,success:function (result) {
           code=parseFloat(result['code']);
         }
    });
    if(code===1){
        $spanPhone.html('该手机号码已经被注册了').addClass('error');
        return false;
    }
    $spanPhone.html('').removeClass('error');
    return true;
};
let checkPass=()=>{
    let val = $userPass.val().trim(),
        reg = /^[0-9a-zA-Z]{6,12}$/;
    if (val.length === 0) {
        $spanPass.html('密码不能为空').addClass('error');
        return false;
    }
    if (!reg.test(val)) {
        $spanPass.html('密码格式:6~12位数字和字母组成').addClass('error');
        return false;
    }
    $spanPass.html('').removeClass('error');
    return true;
};
let checkPassRepeat=()=>{
    let val = $userPass.val().trim(),
        val2 = $userPassRepeat.val().trim();
    if (val !== val2) {
        $spanPassRepeat.html('两次输入的密码不一致').addClass('error');
        return false;
    }
    $spanPassRepeat.html('').removeClass('error');
        return true;
};
let checkBio=()=>{
    let val=$userBio.val().trim();
    if(val.length<10){
        $spanBio.html('至少10个字').addClass('error');
        return false
    }
    if(val.length>100){
        $spanBio.html('不能多于100个字').addClass('error');
        return false
    }
    $spanBio.html('').removeClass('error');
    return true;

};
    return {
        init(){
            $userNume.on('blur',checkName);
            $userPhone.on('blur',checkPhone);
            $userPass.on('blur',checkPass);
            $userPassRepeat.on('blur',checkPassRepeat);
            $userBio.on('blur',checkBio);
            $submit.tap(function () {
                if(checkName()&&checkPass()&&checkPhone()&&checkPassRepeat()&&checkBio()){
                    $.ajax({
                     url:'/register',type:'post',typeData:'json',data:{
                            name:$userNume.val().trim(),
                            password:hex_md5($userPass.val().trim()),
                            phone:$userPhone.val().trim(),
                            bio:$userBio.val().trim(),
                            sex:$man[0].checked ? 0:1
                        },success:function (result) {
                            if(result['code']==0){
                                alert('注册成功');
                                /*如果我们注册成功了我们需要将当前数据进行存储用cookie */               cookie.set({
                                    name:"userInfo",
                                    value:JSON.stringify(result['data'])
                                });
                                window.location.href='index.html';
                            }else{
                                // alert('注册失败');
                                new Dialog('注册失败',function () {
                                    let adrress=window.location.href;
                                    window.location.href=address;
                                });
                              }
                        }
                })

                }
            })
        }
    }
})();
registerRender.init();