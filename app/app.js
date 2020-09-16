var jsom = require('./Jsom');
var jsomEl = require('./JsomElement');
require('./cbase/hamLayout');
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
var jsomContent = DIV().class("container").collection(data=>data,
    (checklist)=> CARD("navy",checklist.title,checklist=>checklist)
)

var jsomRoot = HAMLAYOUT().content(jsomContent);
var sideNav = jsomRoot.sidenav;

var logoOverlay = DIV("logoOverlay").class("botright").stack([
    SPAN().text("Stanislav Kunt").class("overlogo")
]);
sideNav.logoCont.build().appendChild(logoOverlay.build());

var menuItems = [
    sideMenuItem("miTemplates",["fa",,"fa-book"],"Checklist Templates"),
    sideMenuItem("mitNew",["fa","fa-plus"],"New Checklist")
]
sideNav.menuCont.stack(menuItems);
//    CARD("blue","PROCESSING",(data)=>data.processing),
//    CARD("yellow","WARNING",(data)=>data.warning),
//    CARD("red","ALERT",data=>data.alert),
//    CARD("green","FINISHED",data=>
//    {
//        var rv = data.finished;
//        return rv;
//    })

jsom.setTitle("Checklist");
jsom.setJsomRoot(jsomRoot);
    
httpGet("/templates",function(data)
{
    var json = JSON.parse(data);
    jsomRoot.bind(json);
})