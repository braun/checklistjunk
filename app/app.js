var jsom = require('./Jsom');
var jsomEl = require('./JsomElement');
require('./httpHelper');

function CARD(color,title,binder)
{
    var curdata;
    var mydata;
    var rv = DIV().class(color+"Card").binder((data)=>{
         curdata=data;
        mydata =  binder(data);
        return mydata; 
    }).stack([
        HEADER().class(["horizontal","spaceBetween"]).stack([
            H2(title),
            BUTTON("Toggle",(event,button)=>{
                rv.showBody = !rv.showBody;
                rv.bind(curdata);
            })
        ]),
        DIV("cardbody").class(["container","tabLeft"])
            .collection(data=>data.items,
             (item)=>{
                 var rvi = HORIZONTAL().class("spaceBetween").stack([
                     STRONG().textBinder(()=>item.title),
                     BUTTON("OK",()=>{})
                 ])
                 return rvi;
             }
        ).visible(()=>rv.showBody)
    ])
    return rv;
}
var jsomRoot = DIV().class("container").collection(data=>data,
    (checklist)=> CARD("orange",checklist.title,checklist=>checklist)
)
//    CARD("blue","PROCESSING",(data)=>data.processing),
//    CARD("yellow","WARNING",(data)=>data.warning),
//    CARD("red","ALERT",data=>data.alert),
//    CARD("green","FINISHED",data=>
//    {
//        var rv = data.finished;
//        return rv;
//    })


jsom.setJsomRoot(jsomRoot);
    
httpGet("/templates",function(data)
{
    var json = JSON.parse(data);
    jsomRoot.bind(json);
})