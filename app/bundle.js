(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

window.onload = function()
{
  jsomBoot();
}

function jsomBoot()
{
    var domNode = root.build();
    document.body.appendChild(domNode)
}
var root;
function setJsomRoot(jsomNode)
{
    root = jsomNode;
}

function setTitle(title)
{
  document.title = title;
}
module.exports.setJsomRoot = setJsomRoot;

module.exports.setTitle = setTitle;
},{}],2:[function(require,module,exports){

class JsomElement
{
    constructor(id,domElementName,options)
    {
        this.options = options;
        if(typeof id == "object")
        {
            this.options = options;
            id = options.id;
        }           

        if(typeof domElementName == "object")
        {
            this.options = options;
            domElementName = options.domElementName;
        }
        if(this.options == null)
            this.options = {};

            this.children =[];
        this.options.domElementName = domElementName;
        this.id = this.generateId(id)
        this.domElement = document.createElement(this.options.domElementName);
        this.domElement.id = this.id;
        this.domElement._jsElement = this;

        
    }

    binder(bindFunc)
    {
        this.bindFunc = bindFunc;
        return this;
    }
    textBinder(bindFunc)
    {
        this.textBindFunc = bindFunc;
        return this;
    }
    rebind()
    {
        this.bind(this.model)
    }
    bind(data)
    {
        this.model = data;
        if(!this.handleVisibility())
            return;
        if(this.bindFunc != null)
            data = this.bindFunc(data,this);
        this.extractedModel = data;

       this.handleTextBind();
       
       this.handleCollectionBind();

        this.children.forEach(child=>{
            child.bind(child.model ? child.model: data,data);
            })
        return this;
    }
    handleTextBind()
    {
        if(this.textBindFunc != null)
             this.text(this.textBindFunc(this.extractedModel,this))
    }
    handleVisibility()
    {
        if(this.visibleCallback)
        {
            if(this.originalDisplay == undefined)
            {
                this.originalDisplay = this.build().style.display;
                if(!this.originalDisplay)
                    this.originalDisplay = false;
            }
            var visible = this.visibleCallback(this.model,this);
            if(!visible)
                this.build().style.display = 'none';
            else if(this.originalDisplay == false)
                this.build().style.display = null;
            else    
                this.build().style.display = this.originalDisplay;

          return visible === true;
        }
        return true;
    }
    handleCollectionBind()
    {
        if(this.itemCallback != null)
        {
            var col = this.itemCallback(this.extractedModel);
            var its = [];
            col.forEach(item=>
                {
                    var view = this.itemViewCallback(item,this.extractedModel,this.model);
                    its.push(view);
                    view.model = item;
                });
            this.build().textContent="";
            this.stack(its);
        } 
      
    }
   build()
   {
       return this.domElement;
   }
    
   generateId(id)
   {
       if(id == null)
        {
            
            id = "id_"+JsomElement.idSequence++;
        }
       return id;
   }

   class(spec)
   {
       if(typeof spec == "string")
            spec = [spec];
        spec.forEach(cl=>
            {
                this.build().classList.add(cl)
            })
        return this;
   }

   text(text)
   {
       this.build().innerHTML = text;
       return this;
   }



   stack(children)
   {
       this.children = children;
       this.children.forEach(child=>
        {
            child.parent = this;
            this.build().appendChild(child.build());
        })

        return this;
   }

   click(clickCallback)
   {
       this.clickCallback = clickCallback;
       this.build().addEventListener('click',
       (event)=>{
           event.preventDefault();
           this.clickCallback(event,this);
       });
       return this;
   }
   
   visible(callback)
   {
       this.visibleCallback = callback;
       return this;
   }

   collection(itemCallback,itemViewCallback)
   {
       this.itemCallback = itemCallback;
       this.itemViewCallback = itemViewCallback;
       return this;
   }
}
JsomElement.idSequence = 0;

class elDIV extends JsomElement
{
    constructor(id,options)
    {
        super(id,"DIV",options)
    }
}
window.DIV = function(id,options)
{
    return new elDIV(id,options);
}
class elSPAN extends JsomElement
{
    constructor(id,options)
    {
        super(id,"SPAN",options)
    }
}
window.SPAN = function(text,id,options)
{
    return new elSPAN(id,options).text(text);
}

class elLABEL extends JsomElement
{
    constructor(id,options)
    {
        super(id,"LABEL",options)
    }
}

window.LABEL = function(text,id,options)
{
    return new elLABEL(id,options).text(text);
}

class elSTRONG extends JsomElement
{
    constructor(id,options)
    {
        super(id,"STRONG",options)
    }
}
window.STRONG = function(text,id,options)
{
    return new elSTRONG(id,options).text(text);
}

window.DIV = function(id,options)
{
    return new elDIV(id,options);
}
class elH1 extends JsomElement
{
    constructor(id,options)
    {
        super(id,"H1",options)
    }
}
window.H1 = function (text,id,options)
{
    return new elH1(id,options).text(text);
}

class elH2 extends JsomElement
{
    constructor(id,options)
    {
        super(id,"H2",options)
    }
}
window.H2 = function (text,id,options)
{
    return new elH2(id,options).text(text);
}

class elH3 extends JsomElement
{
    constructor(id,options)
    {
        super(id,"H3",options)
    }
}
window.H3 = function (text,id,options)
{
    return new elH3(id,options).text(text);
}
class elH4 extends JsomElement
{
    constructor(id,options)
    {
        super(id,"H4",options)
    }
}
window.H4 = function (text,id,options)
{
    return new elH4(id,options).text(text);
}
class elBUTTON extends JsomElement
{
    constructor(id,options)
    {
        super(id,"BUTTON",options)
    }
    build()
    {
        var rv = super.build();
        rv.setAttribute("type","button")
        return rv;
    }
}
window.BUTTON = function(text,clickCallback,id,options)
{
    return new elBUTTON(id,options).text(text).click(clickCallback);
}



class elIMG extends JsomElement
{
    constructor(id,options)
    {
        super(id,"IMG",options)
    }
    
    src(src)
    {
        this.build().src = src;
        return this;
    }
}
window.IMG = function(id,options)
{
    return new elIMG(id,options);
}

class elHEADER extends JsomElement
{
    constructor(id,options)
    {
        super(id,"HEADER",options)
    }
    
}
window.HEADER = function(id,options)
{
    return new elHEADER(id,options);
}

class elINPUT extends JsomElement
{
    constructor(id,options)
    {
        super(id,"INPUT",options)
        this.type = "TEXT";
    }
    type(tp)
    {
        this.type =tp;
    }
    build()
    {
        var rv = super.build();
        rv.setAttribute("type",this.type);
        
        return rv;
    }
    text(txt)
    {
        this.build().setAttribute("value",txt);
    }

}
window.INPUT = function (id,options)
{
    return new elINPUT(id,options);
}


window.HORIZONTAL = function(id,options)
{
    return DIV().class("horizontal");
}


module.exports.elDIV = elDIV;
module.exports.JsomElement = JsomElement;
},{}],3:[function(require,module,exports){
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
},{"./Jsom":1,"./JsomElement":2,"./cbase/hamLayout":4,"./httpHelper":5}],4:[function(require,module,exports){
var jsom = require('../Jsom');
var {JsomElement } = require('../JsomElement');



class elHamLayout extends JsomElement
{
    constructor(id,options)
    {
        super(id,"DIV",options);
        this.class(["hamLayout"]);

        this.sidenav = SIDENAV();
        this.hamButton = new elHamButton();
        this.sideNavVisible = false;
        this.hamButton.click(()=>{
            this.sideNavVisible = !this.sideNavVisible
            this.sidenav.handleVisibility();
            this.hamButton.rebind();
        });
        this.hamButton.binder((data,bt)=>
        {
            if(this.sideNavVisible)
                bt.build().classList.add("opened");
            else
                bt.build().classList.remove("opened");

        })
        this.sidenav.visible(()=>this.sideNavVisible);
    }

    content(cnt)
    {
        this.content = cnt;
        this.content.class("hamContent");
        this.stack([this.hamButton,this.sidenav,this.content]);
        return this;
    }
}

window.HAMLAYOUT = function(id,options)
{
    return new elHamLayout(id,options);
}

class elHamButton extends JsomElement
{
    constructor(id,options)
    {
        if(typeof id == "object")
        {
            options = id
            id = null;
        }
        if(id == null)
            id="HamButton"

        super(id,"DIV",options);
        this.class(["hamButton","fa","fa-2x","fa-bars"]);

       // this.sidenav = SIDENAV();
    }

}

class elSideNav extends JsomElement
{
    constructor(id,options)
    {
        super(id,"DIV",options);
        this.class("sidenav");
       // this.class(["horizontal","relative"]);
       this.logoCont = DIV("logoCont").class("relative");
       this.logo = IMG("logo").src("/images/logo.svg");
       this.logoCont.stack([this.logo])
       this.menuCont = DIV("menuCont").class("vertical");
        this.stackUp();
       // this.sidenav = SIDENAV();
    }
    stackUp()
    {
        this.stack([this.logoCont,this.menuCont]);
    }
}
window.SIDENAV = function(id,options)
{
    return new elSideNav(id,options);
}

function sideMenuItem(id,iconClasses,label,callback)
{

    var rv = DIV(id).class("navBarMenuItem").stack([SPAN(null,id+"_icon").class(iconClasses),SPAN(label,id+"_text")]).click(callback);
    return rv;
}

window.sideMenuItem = sideMenuItem;
module.exports.elHamLayout = elHamLayout;

},{"../Jsom":1,"../JsomElement":2}],5:[function(require,module,exports){



var httpGetCache = {}

/**
 * @callback loadCallback
 * @param {String} loadedText loaded data as text
 */
/**
 * 
 * @param {String} url url of http resource  file to be loaded
 * @param {loadCallback} callback 
 */
var httpGet = function(url,callback,tryCache,options)
{
  try
{
  if(tryCache)
  {
    if(httpGetCache.hasOwnProperty(url))
      {
        var rv = httpGetCache[url];
        callback(rv);
        return ;
      }
  }

      var xhr = createCORSRequest((options != null && options.method) ? options.method : "GET",url);
      if(options && options.headers)
      {
        for(var header in options.headers)
          xhr.setRequestHeader(header,options.headers[header]);
      }
    xhr.onreadystatechange = function() {
          if (xhr.readyState == 4)
          {
              if(xhr.status == 200)
         {
           if(tryCache)
              httpGetCache[url] = xhr.responseText;
                callback(xhr.responseText,xhr);
         }
              else
                callback(null,xhr);
          }
     };

    
      xhr.timeout = 30000;
      xhr.send((options != null && options.data) ? options.data :null);
    }
    catch(error)
    {

      console.log(error.stack);
      callback(null,null,error);
    }
   
 }

  function renderUrlTemplate(url,model)
  {
    var promise = new Promise(function(resolve,reject)
    {  httpGet(url,function(data,rq)
      {
        if(data == null)
        {
          reject(rq);
          return;
        }
        var rv = data.renderTemplate(model);
        resolve(rv);
      });
    });
    return promise;
 }

 function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
  
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
  
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
  
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
  
    }
    return xhr;
  }

  window.httpGet = httpGet;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VzZXJzL3N0YW5pL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIkpzb20uanMiLCJKc29tRWxlbWVudC5qcyIsImFwcC5qcyIsImNiYXNlL2hhbUxheW91dC5qcyIsImh0dHBIZWxwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKVxyXG57XHJcbiAganNvbUJvb3QoKTtcclxufVxyXG5cclxuZnVuY3Rpb24ganNvbUJvb3QoKVxyXG57XHJcbiAgICB2YXIgZG9tTm9kZSA9IHJvb3QuYnVpbGQoKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9tTm9kZSlcclxufVxyXG52YXIgcm9vdDtcclxuZnVuY3Rpb24gc2V0SnNvbVJvb3QoanNvbU5vZGUpXHJcbntcclxuICAgIHJvb3QgPSBqc29tTm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0VGl0bGUodGl0bGUpXHJcbntcclxuICBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzLnNldEpzb21Sb290ID0gc2V0SnNvbVJvb3Q7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5zZXRUaXRsZSA9IHNldFRpdGxlOyIsIlxyXG5jbGFzcyBKc29tRWxlbWVudFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihpZCxkb21FbGVtZW50TmFtZSxvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgaWYodHlwZW9mIGlkID09IFwib2JqZWN0XCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgICAgICBpZCA9IG9wdGlvbnMuaWQ7XHJcbiAgICAgICAgfSAgICAgICAgICAgXHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBkb21FbGVtZW50TmFtZSA9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICAgICAgZG9tRWxlbWVudE5hbWUgPSBvcHRpb25zLmRvbUVsZW1lbnROYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm9wdGlvbnMgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0ge307XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuID1bXTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuZG9tRWxlbWVudE5hbWUgPSBkb21FbGVtZW50TmFtZTtcclxuICAgICAgICB0aGlzLmlkID0gdGhpcy5nZW5lcmF0ZUlkKGlkKVxyXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5vcHRpb25zLmRvbUVsZW1lbnROYW1lKTtcclxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQuaWQgPSB0aGlzLmlkO1xyXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5fanNFbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgYmluZGVyKGJpbmRGdW5jKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYmluZEZ1bmMgPSBiaW5kRnVuYztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHRleHRCaW5kZXIoYmluZEZ1bmMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50ZXh0QmluZEZ1bmMgPSBiaW5kRnVuYztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlYmluZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5iaW5kKHRoaXMubW9kZWwpXHJcbiAgICB9XHJcbiAgICBiaW5kKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IGRhdGE7XHJcbiAgICAgICAgaWYoIXRoaXMuaGFuZGxlVmlzaWJpbGl0eSgpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYodGhpcy5iaW5kRnVuYyAhPSBudWxsKVxyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5iaW5kRnVuYyhkYXRhLHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZXh0cmFjdGVkTW9kZWwgPSBkYXRhO1xyXG5cclxuICAgICAgIHRoaXMuaGFuZGxlVGV4dEJpbmQoKTtcclxuICAgICAgIFxyXG4gICAgICAgdGhpcy5oYW5kbGVDb2xsZWN0aW9uQmluZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQ9PntcclxuICAgICAgICAgICAgY2hpbGQuYmluZChjaGlsZC5tb2RlbCA/IGNoaWxkLm1vZGVsOiBkYXRhLGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlVGV4dEJpbmQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMudGV4dEJpbmRGdW5jICE9IG51bGwpXHJcbiAgICAgICAgICAgICB0aGlzLnRleHQodGhpcy50ZXh0QmluZEZ1bmModGhpcy5leHRyYWN0ZWRNb2RlbCx0aGlzKSlcclxuICAgIH1cclxuICAgIGhhbmRsZVZpc2liaWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMudmlzaWJsZUNhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5vcmlnaW5hbERpc3BsYXkgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsRGlzcGxheSA9IHRoaXMuYnVpbGQoKS5zdHlsZS5kaXNwbGF5O1xyXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMub3JpZ2luYWxEaXNwbGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxEaXNwbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZpc2libGUgPSB0aGlzLnZpc2libGVDYWxsYmFjayh0aGlzLm1vZGVsLHRoaXMpO1xyXG4gICAgICAgICAgICBpZighdmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGQoKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMub3JpZ2luYWxEaXNwbGF5ID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZCgpLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICBlbHNlICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZCgpLnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9yaWdpbmFsRGlzcGxheTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gdmlzaWJsZSA9PT0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVDb2xsZWN0aW9uQmluZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pdGVtQ2FsbGJhY2sgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjb2wgPSB0aGlzLml0ZW1DYWxsYmFjayh0aGlzLmV4dHJhY3RlZE1vZGVsKTtcclxuICAgICAgICAgICAgdmFyIGl0cyA9IFtdO1xyXG4gICAgICAgICAgICBjb2wuZm9yRWFjaChpdGVtPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IHRoaXMuaXRlbVZpZXdDYWxsYmFjayhpdGVtLHRoaXMuZXh0cmFjdGVkTW9kZWwsdGhpcy5tb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRzLnB1c2godmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy5tb2RlbCA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZCgpLnRleHRDb250ZW50PVwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhY2soaXRzKTtcclxuICAgICAgICB9IFxyXG4gICAgICBcclxuICAgIH1cclxuICAgYnVpbGQoKVxyXG4gICB7XHJcbiAgICAgICByZXR1cm4gdGhpcy5kb21FbGVtZW50O1xyXG4gICB9XHJcbiAgICBcclxuICAgZ2VuZXJhdGVJZChpZClcclxuICAge1xyXG4gICAgICAgaWYoaWQgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZCA9IFwiaWRfXCIrSnNvbUVsZW1lbnQuaWRTZXF1ZW5jZSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgIHJldHVybiBpZDtcclxuICAgfVxyXG5cclxuICAgY2xhc3Moc3BlYylcclxuICAge1xyXG4gICAgICAgaWYodHlwZW9mIHNwZWMgPT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgc3BlYyA9IFtzcGVjXTtcclxuICAgICAgICBzcGVjLmZvckVhY2goY2w9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkKCkuY2xhc3NMaXN0LmFkZChjbClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgfVxyXG5cclxuICAgdGV4dCh0ZXh0KVxyXG4gICB7XHJcbiAgICAgICB0aGlzLmJ1aWxkKCkuaW5uZXJIVE1MID0gdGV4dDtcclxuICAgICAgIHJldHVybiB0aGlzO1xyXG4gICB9XHJcblxyXG5cclxuXHJcbiAgIHN0YWNrKGNoaWxkcmVuKVxyXG4gICB7XHJcbiAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XHJcbiAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQ9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5idWlsZCgpLmFwcGVuZENoaWxkKGNoaWxkLmJ1aWxkKCkpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICB9XHJcblxyXG4gICBjbGljayhjbGlja0NhbGxiYWNrKVxyXG4gICB7XHJcbiAgICAgICB0aGlzLmNsaWNrQ2FsbGJhY2sgPSBjbGlja0NhbGxiYWNrO1xyXG4gICAgICAgdGhpcy5idWlsZCgpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcclxuICAgICAgIChldmVudCk9PntcclxuICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIHRoaXMuY2xpY2tDYWxsYmFjayhldmVudCx0aGlzKTtcclxuICAgICAgIH0pO1xyXG4gICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgIH1cclxuICAgXHJcbiAgIHZpc2libGUoY2FsbGJhY2spXHJcbiAgIHtcclxuICAgICAgIHRoaXMudmlzaWJsZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICByZXR1cm4gdGhpcztcclxuICAgfVxyXG5cclxuICAgY29sbGVjdGlvbihpdGVtQ2FsbGJhY2ssaXRlbVZpZXdDYWxsYmFjaylcclxuICAge1xyXG4gICAgICAgdGhpcy5pdGVtQ2FsbGJhY2sgPSBpdGVtQ2FsbGJhY2s7XHJcbiAgICAgICB0aGlzLml0ZW1WaWV3Q2FsbGJhY2sgPSBpdGVtVmlld0NhbGxiYWNrO1xyXG4gICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgIH1cclxufVxyXG5Kc29tRWxlbWVudC5pZFNlcXVlbmNlID0gMDtcclxuXHJcbmNsYXNzIGVsRElWIGV4dGVuZHMgSnNvbUVsZW1lbnRcclxue1xyXG4gICAgY29uc3RydWN0b3IoaWQsb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpZCxcIkRJVlwiLG9wdGlvbnMpXHJcbiAgICB9XHJcbn1cclxud2luZG93LkRJViA9IGZ1bmN0aW9uKGlkLG9wdGlvbnMpXHJcbntcclxuICAgIHJldHVybiBuZXcgZWxESVYoaWQsb3B0aW9ucyk7XHJcbn1cclxuY2xhc3MgZWxTUEFOIGV4dGVuZHMgSnNvbUVsZW1lbnRcclxue1xyXG4gICAgY29uc3RydWN0b3IoaWQsb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpZCxcIlNQQU5cIixvcHRpb25zKVxyXG4gICAgfVxyXG59XHJcbndpbmRvdy5TUEFOID0gZnVuY3Rpb24odGV4dCxpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gbmV3IGVsU1BBTihpZCxvcHRpb25zKS50ZXh0KHRleHQpO1xyXG59XHJcblxyXG5jbGFzcyBlbExBQkVMIGV4dGVuZHMgSnNvbUVsZW1lbnRcclxue1xyXG4gICAgY29uc3RydWN0b3IoaWQsb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpZCxcIkxBQkVMXCIsb3B0aW9ucylcclxuICAgIH1cclxufVxyXG5cclxud2luZG93LkxBQkVMID0gZnVuY3Rpb24odGV4dCxpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gbmV3IGVsTEFCRUwoaWQsb3B0aW9ucykudGV4dCh0ZXh0KTtcclxufVxyXG5cclxuY2xhc3MgZWxTVFJPTkcgZXh0ZW5kcyBKc29tRWxlbWVudFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihpZCxvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGlkLFwiU1RST05HXCIsb3B0aW9ucylcclxuICAgIH1cclxufVxyXG53aW5kb3cuU1RST05HID0gZnVuY3Rpb24odGV4dCxpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gbmV3IGVsU1RST05HKGlkLG9wdGlvbnMpLnRleHQodGV4dCk7XHJcbn1cclxuXHJcbndpbmRvdy5ESVYgPSBmdW5jdGlvbihpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gbmV3IGVsRElWKGlkLG9wdGlvbnMpO1xyXG59XHJcbmNsYXNzIGVsSDEgZXh0ZW5kcyBKc29tRWxlbWVudFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihpZCxvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGlkLFwiSDFcIixvcHRpb25zKVxyXG4gICAgfVxyXG59XHJcbndpbmRvdy5IMSA9IGZ1bmN0aW9uICh0ZXh0LGlkLG9wdGlvbnMpXHJcbntcclxuICAgIHJldHVybiBuZXcgZWxIMShpZCxvcHRpb25zKS50ZXh0KHRleHQpO1xyXG59XHJcblxyXG5jbGFzcyBlbEgyIGV4dGVuZHMgSnNvbUVsZW1lbnRcclxue1xyXG4gICAgY29uc3RydWN0b3IoaWQsb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpZCxcIkgyXCIsb3B0aW9ucylcclxuICAgIH1cclxufVxyXG53aW5kb3cuSDIgPSBmdW5jdGlvbiAodGV4dCxpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gbmV3IGVsSDIoaWQsb3B0aW9ucykudGV4dCh0ZXh0KTtcclxufVxyXG5cclxuY2xhc3MgZWxIMyBleHRlbmRzIEpzb21FbGVtZW50XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGlkLG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoaWQsXCJIM1wiLG9wdGlvbnMpXHJcbiAgICB9XHJcbn1cclxud2luZG93LkgzID0gZnVuY3Rpb24gKHRleHQsaWQsb3B0aW9ucylcclxue1xyXG4gICAgcmV0dXJuIG5ldyBlbEgzKGlkLG9wdGlvbnMpLnRleHQodGV4dCk7XHJcbn1cclxuY2xhc3MgZWxINCBleHRlbmRzIEpzb21FbGVtZW50XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGlkLG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoaWQsXCJINFwiLG9wdGlvbnMpXHJcbiAgICB9XHJcbn1cclxud2luZG93Lkg0ID0gZnVuY3Rpb24gKHRleHQsaWQsb3B0aW9ucylcclxue1xyXG4gICAgcmV0dXJuIG5ldyBlbEg0KGlkLG9wdGlvbnMpLnRleHQodGV4dCk7XHJcbn1cclxuY2xhc3MgZWxCVVRUT04gZXh0ZW5kcyBKc29tRWxlbWVudFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihpZCxvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGlkLFwiQlVUVE9OXCIsb3B0aW9ucylcclxuICAgIH1cclxuICAgIGJ1aWxkKClcclxuICAgIHtcclxuICAgICAgICB2YXIgcnYgPSBzdXBlci5idWlsZCgpO1xyXG4gICAgICAgIHJ2LnNldEF0dHJpYnV0ZShcInR5cGVcIixcImJ1dHRvblwiKVxyXG4gICAgICAgIHJldHVybiBydjtcclxuICAgIH1cclxufVxyXG53aW5kb3cuQlVUVE9OID0gZnVuY3Rpb24odGV4dCxjbGlja0NhbGxiYWNrLGlkLG9wdGlvbnMpXHJcbntcclxuICAgIHJldHVybiBuZXcgZWxCVVRUT04oaWQsb3B0aW9ucykudGV4dCh0ZXh0KS5jbGljayhjbGlja0NhbGxiYWNrKTtcclxufVxyXG5cclxuXHJcblxyXG5jbGFzcyBlbElNRyBleHRlbmRzIEpzb21FbGVtZW50XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGlkLG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoaWQsXCJJTUdcIixvcHRpb25zKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzcmMoc3JjKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYnVpbGQoKS5zcmMgPSBzcmM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxud2luZG93LklNRyA9IGZ1bmN0aW9uKGlkLG9wdGlvbnMpXHJcbntcclxuICAgIHJldHVybiBuZXcgZWxJTUcoaWQsb3B0aW9ucyk7XHJcbn1cclxuXHJcbmNsYXNzIGVsSEVBREVSIGV4dGVuZHMgSnNvbUVsZW1lbnRcclxue1xyXG4gICAgY29uc3RydWN0b3IoaWQsb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpZCxcIkhFQURFUlwiLG9wdGlvbnMpXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG53aW5kb3cuSEVBREVSID0gZnVuY3Rpb24oaWQsb3B0aW9ucylcclxue1xyXG4gICAgcmV0dXJuIG5ldyBlbEhFQURFUihpZCxvcHRpb25zKTtcclxufVxyXG5cclxuY2xhc3MgZWxJTlBVVCBleHRlbmRzIEpzb21FbGVtZW50XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGlkLG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoaWQsXCJJTlBVVFwiLG9wdGlvbnMpXHJcbiAgICAgICAgdGhpcy50eXBlID0gXCJURVhUXCI7XHJcbiAgICB9XHJcbiAgICB0eXBlKHRwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHlwZSA9dHA7XHJcbiAgICB9XHJcbiAgICBidWlsZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJ2ID0gc3VwZXIuYnVpbGQoKTtcclxuICAgICAgICBydi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsdGhpcy50eXBlKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcnY7XHJcbiAgICB9XHJcbiAgICB0ZXh0KHR4dClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmJ1aWxkKCkuc2V0QXR0cmlidXRlKFwidmFsdWVcIix0eHQpO1xyXG4gICAgfVxyXG5cclxufVxyXG53aW5kb3cuSU5QVVQgPSBmdW5jdGlvbiAoaWQsb3B0aW9ucylcclxue1xyXG4gICAgcmV0dXJuIG5ldyBlbElOUFVUKGlkLG9wdGlvbnMpO1xyXG59XHJcblxyXG5cclxud2luZG93LkhPUklaT05UQUwgPSBmdW5jdGlvbihpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gRElWKCkuY2xhc3MoXCJob3Jpem9udGFsXCIpO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMuZWxESVYgPSBlbERJVjtcclxubW9kdWxlLmV4cG9ydHMuSnNvbUVsZW1lbnQgPSBKc29tRWxlbWVudDsiLCJ2YXIganNvbSA9IHJlcXVpcmUoJy4vSnNvbScpO1xyXG52YXIganNvbUVsID0gcmVxdWlyZSgnLi9Kc29tRWxlbWVudCcpO1xyXG5yZXF1aXJlKCcuL2NiYXNlL2hhbUxheW91dCcpO1xyXG5yZXF1aXJlKCcuL2h0dHBIZWxwZXInKTtcclxuXHJcbmZ1bmN0aW9uIENBUkQoY29sb3IsdGl0bGUsYmluZGVyKVxyXG57XHJcbiAgICB2YXIgY3VyZGF0YTtcclxuICAgIHZhciBteWRhdGE7XHJcbiAgICB2YXIgcnYgPSBESVYoKS5jbGFzcyhjb2xvcitcIkNhcmRcIikuYmluZGVyKChkYXRhKT0+e1xyXG4gICAgICAgICBjdXJkYXRhPWRhdGE7XHJcbiAgICAgICAgbXlkYXRhID0gIGJpbmRlcihkYXRhKTtcclxuICAgICAgICByZXR1cm4gbXlkYXRhOyBcclxuICAgIH0pLnN0YWNrKFtcclxuICAgICAgICBIRUFERVIoKS5jbGFzcyhbXCJob3Jpem9udGFsXCIsXCJzcGFjZUJldHdlZW5cIl0pLnN0YWNrKFtcclxuICAgICAgICAgICAgSDIodGl0bGUpLFxyXG4gICAgICAgICAgICBCVVRUT04oXCJUb2dnbGVcIiwoZXZlbnQsYnV0dG9uKT0+e1xyXG4gICAgICAgICAgICAgICAgcnYuc2hvd0JvZHkgPSAhcnYuc2hvd0JvZHk7XHJcbiAgICAgICAgICAgICAgICBydi5iaW5kKGN1cmRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIERJVihcImNhcmRib2R5XCIpLmNsYXNzKFtcImNvbnRhaW5lclwiLFwidGFiTGVmdFwiXSlcclxuICAgICAgICAgICAgLmNvbGxlY3Rpb24oZGF0YT0+ZGF0YS5pdGVtcyxcclxuICAgICAgICAgICAgIChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgIHZhciBydmkgPSBIT1JJWk9OVEFMKCkuY2xhc3MoXCJzcGFjZUJldHdlZW5cIikuc3RhY2soW1xyXG4gICAgICAgICAgICAgICAgICAgICBTVFJPTkcoKS50ZXh0QmluZGVyKCgpPT5pdGVtLnRpdGxlKSxcclxuICAgICAgICAgICAgICAgICAgICAgQlVUVE9OKFwiT0tcIiwoKT0+e30pXHJcbiAgICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgICByZXR1cm4gcnZpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICkudmlzaWJsZSgoKT0+cnYuc2hvd0JvZHkpXHJcbiAgICBdKVxyXG4gICAgcmV0dXJuIHJ2O1xyXG59XHJcbnZhciBqc29tQ29udGVudCA9IERJVigpLmNsYXNzKFwiY29udGFpbmVyXCIpLmNvbGxlY3Rpb24oZGF0YT0+ZGF0YSxcclxuICAgIChjaGVja2xpc3QpPT4gQ0FSRChcIm5hdnlcIixjaGVja2xpc3QudGl0bGUsY2hlY2tsaXN0PT5jaGVja2xpc3QpXHJcbilcclxuXHJcbnZhciBqc29tUm9vdCA9IEhBTUxBWU9VVCgpLmNvbnRlbnQoanNvbUNvbnRlbnQpO1xyXG52YXIgc2lkZU5hdiA9IGpzb21Sb290LnNpZGVuYXY7XHJcblxyXG52YXIgbG9nb092ZXJsYXkgPSBESVYoXCJsb2dvT3ZlcmxheVwiKS5jbGFzcyhcImJvdHJpZ2h0XCIpLnN0YWNrKFtcclxuICAgIFNQQU4oKS50ZXh0KFwiU3RhbmlzbGF2IEt1bnRcIikuY2xhc3MoXCJvdmVybG9nb1wiKVxyXG5dKTtcclxuc2lkZU5hdi5sb2dvQ29udC5idWlsZCgpLmFwcGVuZENoaWxkKGxvZ29PdmVybGF5LmJ1aWxkKCkpO1xyXG5cclxudmFyIG1lbnVJdGVtcyA9IFtcclxuICAgIHNpZGVNZW51SXRlbShcIm1pVGVtcGxhdGVzXCIsW1wiZmFcIiwsXCJmYS1ib29rXCJdLFwiQ2hlY2tsaXN0IFRlbXBsYXRlc1wiKSxcclxuICAgIHNpZGVNZW51SXRlbShcIm1pdE5ld1wiLFtcImZhXCIsXCJmYS1wbHVzXCJdLFwiTmV3IENoZWNrbGlzdFwiKVxyXG5dXHJcbnNpZGVOYXYubWVudUNvbnQuc3RhY2sobWVudUl0ZW1zKTtcclxuLy8gICAgQ0FSRChcImJsdWVcIixcIlBST0NFU1NJTkdcIiwoZGF0YSk9PmRhdGEucHJvY2Vzc2luZyksXHJcbi8vICAgIENBUkQoXCJ5ZWxsb3dcIixcIldBUk5JTkdcIiwoZGF0YSk9PmRhdGEud2FybmluZyksXHJcbi8vICAgIENBUkQoXCJyZWRcIixcIkFMRVJUXCIsZGF0YT0+ZGF0YS5hbGVydCksXHJcbi8vICAgIENBUkQoXCJncmVlblwiLFwiRklOSVNIRURcIixkYXRhPT5cclxuLy8gICAge1xyXG4vLyAgICAgICAgdmFyIHJ2ID0gZGF0YS5maW5pc2hlZDtcclxuLy8gICAgICAgIHJldHVybiBydjtcclxuLy8gICAgfSlcclxuXHJcbmpzb20uc2V0VGl0bGUoXCJDaGVja2xpc3RcIik7XHJcbmpzb20uc2V0SnNvbVJvb3QoanNvbVJvb3QpO1xyXG4gICAgXHJcbmh0dHBHZXQoXCIvdGVtcGxhdGVzXCIsZnVuY3Rpb24oZGF0YSlcclxue1xyXG4gICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAganNvbVJvb3QuYmluZChqc29uKTtcclxufSkiLCJ2YXIganNvbSA9IHJlcXVpcmUoJy4uL0pzb20nKTtcclxudmFyIHtKc29tRWxlbWVudCB9ID0gcmVxdWlyZSgnLi4vSnNvbUVsZW1lbnQnKTtcclxuXHJcblxyXG5cclxuY2xhc3MgZWxIYW1MYXlvdXQgZXh0ZW5kcyBKc29tRWxlbWVudFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihpZCxvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGlkLFwiRElWXCIsb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5jbGFzcyhbXCJoYW1MYXlvdXRcIl0pO1xyXG5cclxuICAgICAgICB0aGlzLnNpZGVuYXYgPSBTSURFTkFWKCk7XHJcbiAgICAgICAgdGhpcy5oYW1CdXR0b24gPSBuZXcgZWxIYW1CdXR0b24oKTtcclxuICAgICAgICB0aGlzLnNpZGVOYXZWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5oYW1CdXR0b24uY2xpY2soKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zaWRlTmF2VmlzaWJsZSA9ICF0aGlzLnNpZGVOYXZWaXNpYmxlXHJcbiAgICAgICAgICAgIHRoaXMuc2lkZW5hdi5oYW5kbGVWaXNpYmlsaXR5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFtQnV0dG9uLnJlYmluZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaGFtQnV0dG9uLmJpbmRlcigoZGF0YSxidCk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5zaWRlTmF2VmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIGJ0LmJ1aWxkKCkuY2xhc3NMaXN0LmFkZChcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgYnQuYnVpbGQoKS5jbGFzc0xpc3QucmVtb3ZlKFwib3BlbmVkXCIpO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2lkZW5hdi52aXNpYmxlKCgpPT50aGlzLnNpZGVOYXZWaXNpYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50KGNudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjbnQ7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzKFwiaGFtQ29udGVudFwiKTtcclxuICAgICAgICB0aGlzLnN0YWNrKFt0aGlzLmhhbUJ1dHRvbix0aGlzLnNpZGVuYXYsdGhpcy5jb250ZW50XSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5IQU1MQVlPVVQgPSBmdW5jdGlvbihpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gbmV3IGVsSGFtTGF5b3V0KGlkLG9wdGlvbnMpO1xyXG59XHJcblxyXG5jbGFzcyBlbEhhbUJ1dHRvbiBleHRlbmRzIEpzb21FbGVtZW50XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGlkLG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodHlwZW9mIGlkID09IFwib2JqZWN0XCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvcHRpb25zID0gaWRcclxuICAgICAgICAgICAgaWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpZCA9PSBudWxsKVxyXG4gICAgICAgICAgICBpZD1cIkhhbUJ1dHRvblwiXHJcblxyXG4gICAgICAgIHN1cGVyKGlkLFwiRElWXCIsb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5jbGFzcyhbXCJoYW1CdXR0b25cIixcImZhXCIsXCJmYS0yeFwiLFwiZmEtYmFyc1wiXSk7XHJcblxyXG4gICAgICAgLy8gdGhpcy5zaWRlbmF2ID0gU0lERU5BVigpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgZWxTaWRlTmF2IGV4dGVuZHMgSnNvbUVsZW1lbnRcclxue1xyXG4gICAgY29uc3RydWN0b3IoaWQsb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpZCxcIkRJVlwiLG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuY2xhc3MoXCJzaWRlbmF2XCIpO1xyXG4gICAgICAgLy8gdGhpcy5jbGFzcyhbXCJob3Jpem9udGFsXCIsXCJyZWxhdGl2ZVwiXSk7XHJcbiAgICAgICB0aGlzLmxvZ29Db250ID0gRElWKFwibG9nb0NvbnRcIikuY2xhc3MoXCJyZWxhdGl2ZVwiKTtcclxuICAgICAgIHRoaXMubG9nbyA9IElNRyhcImxvZ29cIikuc3JjKFwiL2ltYWdlcy9sb2dvLnN2Z1wiKTtcclxuICAgICAgIHRoaXMubG9nb0NvbnQuc3RhY2soW3RoaXMubG9nb10pXHJcbiAgICAgICB0aGlzLm1lbnVDb250ID0gRElWKFwibWVudUNvbnRcIikuY2xhc3MoXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICB0aGlzLnN0YWNrVXAoKTtcclxuICAgICAgIC8vIHRoaXMuc2lkZW5hdiA9IFNJREVOQVYoKTtcclxuICAgIH1cclxuICAgIHN0YWNrVXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhY2soW3RoaXMubG9nb0NvbnQsdGhpcy5tZW51Q29udF0pO1xyXG4gICAgfVxyXG59XHJcbndpbmRvdy5TSURFTkFWID0gZnVuY3Rpb24oaWQsb3B0aW9ucylcclxue1xyXG4gICAgcmV0dXJuIG5ldyBlbFNpZGVOYXYoaWQsb3B0aW9ucyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNpZGVNZW51SXRlbShpZCxpY29uQ2xhc3NlcyxsYWJlbCxjYWxsYmFjaylcclxue1xyXG5cclxuICAgIHZhciBydiA9IERJVihpZCkuY2xhc3MoXCJuYXZCYXJNZW51SXRlbVwiKS5zdGFjayhbU1BBTihudWxsLGlkK1wiX2ljb25cIikuY2xhc3MoaWNvbkNsYXNzZXMpLFNQQU4obGFiZWwsaWQrXCJfdGV4dFwiKV0pLmNsaWNrKGNhbGxiYWNrKTtcclxuICAgIHJldHVybiBydjtcclxufVxyXG5cclxud2luZG93LnNpZGVNZW51SXRlbSA9IHNpZGVNZW51SXRlbTtcclxubW9kdWxlLmV4cG9ydHMuZWxIYW1MYXlvdXQgPSBlbEhhbUxheW91dDtcclxuIiwiXHJcblxyXG5cclxudmFyIGh0dHBHZXRDYWNoZSA9IHt9XHJcblxyXG4vKipcclxuICogQGNhbGxiYWNrIGxvYWRDYWxsYmFja1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gbG9hZGVkVGV4dCBsb2FkZWQgZGF0YSBhcyB0ZXh0XHJcbiAqL1xyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgdXJsIG9mIGh0dHAgcmVzb3VyY2UgIGZpbGUgdG8gYmUgbG9hZGVkXHJcbiAqIEBwYXJhbSB7bG9hZENhbGxiYWNrfSBjYWxsYmFjayBcclxuICovXHJcbnZhciBodHRwR2V0ID0gZnVuY3Rpb24odXJsLGNhbGxiYWNrLHRyeUNhY2hlLG9wdGlvbnMpXHJcbntcclxuICB0cnlcclxue1xyXG4gIGlmKHRyeUNhY2hlKVxyXG4gIHtcclxuICAgIGlmKGh0dHBHZXRDYWNoZS5oYXNPd25Qcm9wZXJ0eSh1cmwpKVxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyIHJ2ID0gaHR0cEdldENhY2hlW3VybF07XHJcbiAgICAgICAgY2FsbGJhY2socnYpO1xyXG4gICAgICAgIHJldHVybiA7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gICAgICB2YXIgeGhyID0gY3JlYXRlQ09SU1JlcXVlc3QoKG9wdGlvbnMgIT0gbnVsbCAmJiBvcHRpb25zLm1ldGhvZCkgPyBvcHRpb25zLm1ldGhvZCA6IFwiR0VUXCIsdXJsKTtcclxuICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmhlYWRlcnMpXHJcbiAgICAgIHtcclxuICAgICAgICBmb3IodmFyIGhlYWRlciBpbiBvcHRpb25zLmhlYWRlcnMpXHJcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsb3B0aW9ucy5oZWFkZXJzW2hlYWRlcl0pO1xyXG4gICAgICB9XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZih4aHIuc3RhdHVzID09IDIwMClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgIGlmKHRyeUNhY2hlKVxyXG4gICAgICAgICAgICAgIGh0dHBHZXRDYWNoZVt1cmxdID0geGhyLnJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhoci5yZXNwb25zZVRleHQseGhyKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwseGhyKTtcclxuICAgICAgICAgIH1cclxuICAgICB9O1xyXG5cclxuICAgIFxyXG4gICAgICB4aHIudGltZW91dCA9IDMwMDAwO1xyXG4gICAgICB4aHIuc2VuZCgob3B0aW9ucyAhPSBudWxsICYmIG9wdGlvbnMuZGF0YSkgPyBvcHRpb25zLmRhdGEgOm51bGwpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2goZXJyb3IpXHJcbiAgICB7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XHJcbiAgICAgIGNhbGxiYWNrKG51bGwsbnVsbCxlcnJvcik7XHJcbiAgICB9XHJcbiAgIFxyXG4gfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJVcmxUZW1wbGF0ZSh1cmwsbW9kZWwpXHJcbiAge1xyXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdClcclxuICAgIHsgIGh0dHBHZXQodXJsLGZ1bmN0aW9uKGRhdGEscnEpXHJcbiAgICAgIHtcclxuICAgICAgICBpZihkYXRhID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcmVqZWN0KHJxKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJ2ID0gZGF0YS5yZW5kZXJUZW1wbGF0ZShtb2RlbCk7XHJcbiAgICAgICAgcmVzb2x2ZShydik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuIH1cclxuXHJcbiBmdW5jdGlvbiBjcmVhdGVDT1JTUmVxdWVzdChtZXRob2QsIHVybCkge1xyXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgaWYgKFwid2l0aENyZWRlbnRpYWxzXCIgaW4geGhyKSB7XHJcbiAgXHJcbiAgICAgIC8vIENoZWNrIGlmIHRoZSBYTUxIdHRwUmVxdWVzdCBvYmplY3QgaGFzIGEgXCJ3aXRoQ3JlZGVudGlhbHNcIiBwcm9wZXJ0eS5cclxuICAgICAgLy8gXCJ3aXRoQ3JlZGVudGlhbHNcIiBvbmx5IGV4aXN0cyBvbiBYTUxIVFRQUmVxdWVzdDIgb2JqZWN0cy5cclxuICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG4gIFxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgWERvbWFpblJlcXVlc3QgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gIFxyXG4gICAgICAvLyBPdGhlcndpc2UsIGNoZWNrIGlmIFhEb21haW5SZXF1ZXN0LlxyXG4gICAgICAvLyBYRG9tYWluUmVxdWVzdCBvbmx5IGV4aXN0cyBpbiBJRSwgYW5kIGlzIElFJ3Mgd2F5IG9mIG1ha2luZyBDT1JTIHJlcXVlc3RzLlxyXG4gICAgICB4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcclxuICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwpO1xyXG4gIFxyXG4gICAgfSBlbHNlIHtcclxuICBcclxuICAgICAgLy8gT3RoZXJ3aXNlLCBDT1JTIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXIuXHJcbiAgICAgIHhociA9IG51bGw7XHJcbiAgXHJcbiAgICB9XHJcbiAgICByZXR1cm4geGhyO1xyXG4gIH1cclxuXHJcbiAgd2luZG93Lmh0dHBHZXQgPSBodHRwR2V0O1xyXG4iXX0=
