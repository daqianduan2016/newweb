/**
 * Created by SXX on 2017/10/8.
 */
let  indexrRender=(()=>{
    let $plan=$.Callbacks(),limit=10,page=1,userId=0,search='',pageNum=0,total=0;
    let $userList=$('.userList'),
        $userItem=$userList.children('ul'),
        $tip=$userList.children('.tip');
    let $search=$('.search'),$searchIpt=$search.children('input'),$searchBtn=$search.children('.searchBtn');
    let userInfo=null;
    let $person=$('#person');
    let bindData=(resultList)=>{
        let str=``;
        /*使用的是zepto中的each属性然后进行遍历循环*/
        $.each(resultList,(index,item)=>{
            str+=` <li>
                <a href="detail.html?userId=${item.id}">
                    <img src="${item.picture}" alt="" class="picture">
                    <p class="title">
                        <span>${item.name}</span>
                        |
                        <span>编号 #${item.matchId}</span>
                    </p>
                    <p class="slogan">${item.slogan}</p>
                </a>
                <div class="vote">
                    <span class="voteNum">${item.voteNum}</span>
                    ${item['isVote']===0?` <a href="javascript:;" class="voteBtn" data-id="${item['id']}">投他一票</a>`:``}
                  
                </div>
            </li>`
        })
        $userItem.append(str);
    };
    $plan.add(bindData);
    /*vote 是要在数据碧绑定结束的时候才执行这个方法,我们点击的时候传递一个event的事件 let target =event.target ,如果target.className!==*/
    let vote=()=>{
        $userItem.tap(function (e) {
            let target =e.target;
            if(target.className!=='voteBtn')return;
                if(userId==0){
                    new Dialog('先登录才能投票');
                    return;}
                let participantId=parseFloat(target.getAttribute('data-id'));
             $.ajax({
                 url:'/vote',dataType:'json',data:{
                     userId:userId,
                     participantId:participantId
                 },cache:false,success:function (result) {
                       if(result['code']==1){
                           new Dialog('投票失败');
                           return
                       }
                       new Dialog('感谢你的支持',function () {
                          let $target=$(target),
                           $prev= $target.prev();
                           $prev.html(parseFloat($prev.html())+1);
                           $target.remove();
                     })
                 }
             })

        })
    };
    $plan.add(vote);
    let scrollEvent=()=>{
         let fn=()=>{
             let clientH=document.documentElement.clientHeight||document.body.clientHeight,scrollT=document.documentElement.scrollTop||document.body.scrollTop,scrollH=document.documentElement.scrollHeight||document.body.scrollHeight;
             if(clientH+scrollT+200>=scrollH){
                 $(window).off('scroll',fn);
                 page++;
                 if(page>10){
                     return page;
                 }
                 $.ajax({
                     url:('/getMatchList'),type:'get',typeData:'json',data:{
                         limit:limit,page:page,search:search,userId:userId
                     },cache:false,success:function (result) {
                         if(result['list']&&result['list'].length>0&&result['code']==0){
                            bindData(result['list']);
                             $(window).on('scroll',fn);
                         }
                     }
                 })

             }
         };
         $(window).on('scroll',fn);
    };
    $plan.add(scrollEvent);
    let sendAjax=()=>{
        $.ajax({
            url:('/getMatchList'),type:'get',typeData:'json',data:{
                limit:limit,page:page,search:search,userId:userId
            },cache:false,success:function (result) {
                if(result['list']&&result['list'].length>0&&result['code']==0){
                    pageNum=parseFloat(result['pageNum']);
                    total=parseFloat(result['total']);
                    $tip.css('display','none');
                    $userItem.css('display','block');
                    $plan.fire(result['list']);
                }else{
                    $tip.css('display','block');
                    $userItem.css('display','none');
                }
            }
        });
    };
    return {
        init(){
            userInfo=cookie.get('userInfo');
            if(userInfo){
                userInfo=JSON.parse(userInfo);
                userId=userInfo['id'];
                $person.css('display','block').html(`HELLO${userInfo['name']}`).siblings().css('display','none');
            }
           sendAjax();
            $searchBtn.tap(function () {
                search=$searchIpt.val().trim();
                 page=1;
                 $userItem.html('');
                 sendAjax();
            })
        }
    }
})();
indexrRender.init();
