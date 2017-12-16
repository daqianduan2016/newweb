/**
 * Created by SXX on 2017/10/9.
 */
 class  Dialog{
    constructor(content, callback){
        this.content = content;
        this.callback = callback;
        this.init();
    }
    init(){
        this.createMark();
        this.eventMark();
        this.timer=setTimeout(()=>{
            this.removeMark();
        },2000);
}
    createMark(){this.removeMark();
        let mark = document.createElement('div');
        mark.innerHTML = `<div class="mark">
                 <div class="box">
                     <h3>系统提示</h3>
                  <div class="content">${this.content}</div>
                  </div>`;
        document.body.appendChild(mark);
        this.mark = mark;
    }
    removeMark(){
        let mark = this.mark;
        if (mark) {
            document.body.removeChild(mark);
            this.callback && this.callback();
        }
    }
    eventMark(){ clearTimeout(this.timer);
        let mark=this.mark;
        if(!mark){return;}
        if(typeof $!=='undefined'){
           $(mark).tap((e)=>{
               if(e.target.className==='mark'){
                   this.removeMark();
               }
           })
         }
    }
}
