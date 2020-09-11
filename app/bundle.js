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


module.exports.setJsomRoot = setJsomRoot;
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
        this.bind(model)
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
},{}],3:[function(require,module,exports){
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
},{"./Jsom":1,"./JsomElement":2,"./httpHelper":4}],4:[function(require,module,exports){



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VzZXJzL3N0YW5pL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIkpzb20uanMiLCJKc29tRWxlbWVudC5qcyIsImFwcC5qcyIsImh0dHBIZWxwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKClcclxue1xyXG4gIGpzb21Cb290KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGpzb21Cb290KClcclxue1xyXG4gICAgdmFyIGRvbU5vZGUgPSByb290LmJ1aWxkKCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbU5vZGUpXHJcbn1cclxudmFyIHJvb3Q7XHJcbmZ1bmN0aW9uIHNldEpzb21Sb290KGpzb21Ob2RlKVxyXG57XHJcbiAgICByb290ID0ganNvbU5vZGU7XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cy5zZXRKc29tUm9vdCA9IHNldEpzb21Sb290OyIsIlxyXG5jbGFzcyBKc29tRWxlbWVudFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihpZCxkb21FbGVtZW50TmFtZSxvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgaWYodHlwZW9mIGlkID09IFwib2JqZWN0XCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgICAgICBpZCA9IG9wdGlvbnMuaWQ7XHJcbiAgICAgICAgfSAgICAgICAgICAgXHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBkb21FbGVtZW50TmFtZSA9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICAgICAgZG9tRWxlbWVudE5hbWUgPSBvcHRpb25zLmRvbUVsZW1lbnROYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm9wdGlvbnMgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0ge307XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuID1bXTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuZG9tRWxlbWVudE5hbWUgPSBkb21FbGVtZW50TmFtZTtcclxuICAgICAgICB0aGlzLmlkID0gdGhpcy5nZW5lcmF0ZUlkKGlkKVxyXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5vcHRpb25zLmRvbUVsZW1lbnROYW1lKTtcclxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQuaWQgPSB0aGlzLmlkO1xyXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5fanNFbGVtZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgYmluZGVyKGJpbmRGdW5jKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYmluZEZ1bmMgPSBiaW5kRnVuYztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHRleHRCaW5kZXIoYmluZEZ1bmMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50ZXh0QmluZEZ1bmMgPSBiaW5kRnVuYztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlYmluZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5iaW5kKG1vZGVsKVxyXG4gICAgfVxyXG4gICAgYmluZChkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBkYXRhO1xyXG4gICAgICAgIGlmKCF0aGlzLmhhbmRsZVZpc2liaWxpdHkoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMuYmluZEZ1bmMgIT0gbnVsbClcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuYmluZEZ1bmMoZGF0YSx0aGlzKTtcclxuICAgICAgICB0aGlzLmV4dHJhY3RlZE1vZGVsID0gZGF0YTtcclxuXHJcbiAgICAgICB0aGlzLmhhbmRsZVRleHRCaW5kKCk7XHJcbiAgICAgICBcclxuICAgICAgIHRoaXMuaGFuZGxlQ29sbGVjdGlvbkJpbmQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkPT57XHJcbiAgICAgICAgICAgIGNoaWxkLmJpbmQoY2hpbGQubW9kZWwgPyBjaGlsZC5tb2RlbDogZGF0YSxkYXRhKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGhhbmRsZVRleHRCaW5kKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnRleHRCaW5kRnVuYyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgdGhpcy50ZXh0KHRoaXMudGV4dEJpbmRGdW5jKHRoaXMuZXh0cmFjdGVkTW9kZWwsdGhpcykpXHJcbiAgICB9XHJcbiAgICBoYW5kbGVWaXNpYmlsaXR5KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnZpc2libGVDYWxsYmFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMub3JpZ2luYWxEaXNwbGF5ID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbERpc3BsYXkgPSB0aGlzLmJ1aWxkKCkuc3R5bGUuZGlzcGxheTtcclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLm9yaWdpbmFsRGlzcGxheSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsRGlzcGxheSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB2aXNpYmxlID0gdGhpcy52aXNpYmxlQ2FsbGJhY2sodGhpcy5tb2RlbCx0aGlzKTtcclxuICAgICAgICAgICAgaWYoIXZpc2libGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkKCkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLm9yaWdpbmFsRGlzcGxheSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGQoKS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgZWxzZSAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGQoKS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vcmlnaW5hbERpc3BsYXk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHZpc2libGUgPT09IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlQ29sbGVjdGlvbkJpbmQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuaXRlbUNhbGxiYWNrICE9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY29sID0gdGhpcy5pdGVtQ2FsbGJhY2sodGhpcy5leHRyYWN0ZWRNb2RlbCk7XHJcbiAgICAgICAgICAgIHZhciBpdHMgPSBbXTtcclxuICAgICAgICAgICAgY29sLmZvckVhY2goaXRlbT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSB0aGlzLml0ZW1WaWV3Q2FsbGJhY2soaXRlbSx0aGlzLmV4dHJhY3RlZE1vZGVsLHRoaXMubW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0cy5wdXNoKHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcubW9kZWwgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGQoKS50ZXh0Q29udGVudD1cIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWNrKGl0cyk7XHJcbiAgICAgICAgfSBcclxuICAgICAgXHJcbiAgICB9XHJcbiAgIGJ1aWxkKClcclxuICAge1xyXG4gICAgICAgcmV0dXJuIHRoaXMuZG9tRWxlbWVudDtcclxuICAgfVxyXG4gICAgXHJcbiAgIGdlbmVyYXRlSWQoaWQpXHJcbiAgIHtcclxuICAgICAgIGlmKGlkID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWQgPSBcImlkX1wiK0pzb21FbGVtZW50LmlkU2VxdWVuY2UrKztcclxuICAgICAgICB9XHJcbiAgICAgICByZXR1cm4gaWQ7XHJcbiAgIH1cclxuXHJcbiAgIGNsYXNzKHNwZWMpXHJcbiAgIHtcclxuICAgICAgIGlmKHR5cGVvZiBzcGVjID09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgIHNwZWMgPSBbc3BlY107XHJcbiAgICAgICAgc3BlYy5mb3JFYWNoKGNsPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZCgpLmNsYXNzTGlzdC5hZGQoY2wpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgIH1cclxuXHJcbiAgIHRleHQodGV4dClcclxuICAge1xyXG4gICAgICAgdGhpcy5idWlsZCgpLmlubmVySFRNTCA9IHRleHQ7XHJcbiAgICAgICByZXR1cm4gdGhpcztcclxuICAgfVxyXG5cclxuXHJcblxyXG4gICBzdGFjayhjaGlsZHJlbilcclxuICAge1xyXG4gICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xyXG4gICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGQoKS5hcHBlbmRDaGlsZChjaGlsZC5idWlsZCgpKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgfVxyXG5cclxuICAgY2xpY2soY2xpY2tDYWxsYmFjaylcclxuICAge1xyXG4gICAgICAgdGhpcy5jbGlja0NhbGxiYWNrID0gY2xpY2tDYWxsYmFjaztcclxuICAgICAgIHRoaXMuYnVpbGQoKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXHJcbiAgICAgICAoZXZlbnQpPT57XHJcbiAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICB0aGlzLmNsaWNrQ2FsbGJhY2soZXZlbnQsdGhpcyk7XHJcbiAgICAgICB9KTtcclxuICAgICAgIHJldHVybiB0aGlzO1xyXG4gICB9XHJcbiAgIFxyXG4gICB2aXNpYmxlKGNhbGxiYWNrKVxyXG4gICB7XHJcbiAgICAgICB0aGlzLnZpc2libGVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgIH1cclxuXHJcbiAgIGNvbGxlY3Rpb24oaXRlbUNhbGxiYWNrLGl0ZW1WaWV3Q2FsbGJhY2spXHJcbiAgIHtcclxuICAgICAgIHRoaXMuaXRlbUNhbGxiYWNrID0gaXRlbUNhbGxiYWNrO1xyXG4gICAgICAgdGhpcy5pdGVtVmlld0NhbGxiYWNrID0gaXRlbVZpZXdDYWxsYmFjaztcclxuICAgICAgIHJldHVybiB0aGlzO1xyXG4gICB9XHJcbn1cclxuSnNvbUVsZW1lbnQuaWRTZXF1ZW5jZSA9IDA7XHJcblxyXG5jbGFzcyBlbERJViBleHRlbmRzIEpzb21FbGVtZW50XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGlkLG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoaWQsXCJESVZcIixvcHRpb25zKVxyXG4gICAgfVxyXG59XHJcbndpbmRvdy5ESVYgPSBmdW5jdGlvbihpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gbmV3IGVsRElWKGlkLG9wdGlvbnMpO1xyXG59XHJcbmNsYXNzIGVsU1BBTiBleHRlbmRzIEpzb21FbGVtZW50XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGlkLG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoaWQsXCJTUEFOXCIsb3B0aW9ucylcclxuICAgIH1cclxufVxyXG53aW5kb3cuU1BBTiA9IGZ1bmN0aW9uKHRleHQsaWQsb3B0aW9ucylcclxue1xyXG4gICAgcmV0dXJuIG5ldyBlbFNQQU4oaWQsb3B0aW9ucykudGV4dCh0ZXh0KTtcclxufVxyXG5cclxuY2xhc3MgZWxMQUJFTCBleHRlbmRzIEpzb21FbGVtZW50XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGlkLG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoaWQsXCJMQUJFTFwiLG9wdGlvbnMpXHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5MQUJFTCA9IGZ1bmN0aW9uKHRleHQsaWQsb3B0aW9ucylcclxue1xyXG4gICAgcmV0dXJuIG5ldyBlbExBQkVMKGlkLG9wdGlvbnMpLnRleHQodGV4dCk7XHJcbn1cclxuXHJcbmNsYXNzIGVsU1RST05HIGV4dGVuZHMgSnNvbUVsZW1lbnRcclxue1xyXG4gICAgY29uc3RydWN0b3IoaWQsb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpZCxcIlNUUk9OR1wiLG9wdGlvbnMpXHJcbiAgICB9XHJcbn1cclxud2luZG93LlNUUk9ORyA9IGZ1bmN0aW9uKHRleHQsaWQsb3B0aW9ucylcclxue1xyXG4gICAgcmV0dXJuIG5ldyBlbFNUUk9ORyhpZCxvcHRpb25zKS50ZXh0KHRleHQpO1xyXG59XHJcblxyXG53aW5kb3cuRElWID0gZnVuY3Rpb24oaWQsb3B0aW9ucylcclxue1xyXG4gICAgcmV0dXJuIG5ldyBlbERJVihpZCxvcHRpb25zKTtcclxufVxyXG5jbGFzcyBlbEgxIGV4dGVuZHMgSnNvbUVsZW1lbnRcclxue1xyXG4gICAgY29uc3RydWN0b3IoaWQsb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpZCxcIkgxXCIsb3B0aW9ucylcclxuICAgIH1cclxufVxyXG53aW5kb3cuSDEgPSBmdW5jdGlvbiAodGV4dCxpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gbmV3IGVsSDEoaWQsb3B0aW9ucykudGV4dCh0ZXh0KTtcclxufVxyXG5cclxuY2xhc3MgZWxIMiBleHRlbmRzIEpzb21FbGVtZW50XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGlkLG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoaWQsXCJIMlwiLG9wdGlvbnMpXHJcbiAgICB9XHJcbn1cclxud2luZG93LkgyID0gZnVuY3Rpb24gKHRleHQsaWQsb3B0aW9ucylcclxue1xyXG4gICAgcmV0dXJuIG5ldyBlbEgyKGlkLG9wdGlvbnMpLnRleHQodGV4dCk7XHJcbn1cclxuXHJcbmNsYXNzIGVsSDMgZXh0ZW5kcyBKc29tRWxlbWVudFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihpZCxvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGlkLFwiSDNcIixvcHRpb25zKVxyXG4gICAgfVxyXG59XHJcbndpbmRvdy5IMyA9IGZ1bmN0aW9uICh0ZXh0LGlkLG9wdGlvbnMpXHJcbntcclxuICAgIHJldHVybiBuZXcgZWxIMyhpZCxvcHRpb25zKS50ZXh0KHRleHQpO1xyXG59XHJcbmNsYXNzIGVsSDQgZXh0ZW5kcyBKc29tRWxlbWVudFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihpZCxvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGlkLFwiSDRcIixvcHRpb25zKVxyXG4gICAgfVxyXG59XHJcbndpbmRvdy5INCA9IGZ1bmN0aW9uICh0ZXh0LGlkLG9wdGlvbnMpXHJcbntcclxuICAgIHJldHVybiBuZXcgZWxINChpZCxvcHRpb25zKS50ZXh0KHRleHQpO1xyXG59XHJcbmNsYXNzIGVsQlVUVE9OIGV4dGVuZHMgSnNvbUVsZW1lbnRcclxue1xyXG4gICAgY29uc3RydWN0b3IoaWQsb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpZCxcIkJVVFRPTlwiLG9wdGlvbnMpXHJcbiAgICB9XHJcbiAgICBidWlsZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJ2ID0gc3VwZXIuYnVpbGQoKTtcclxuICAgICAgICBydi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJidXR0b25cIilcclxuICAgICAgICByZXR1cm4gcnY7XHJcbiAgICB9XHJcbn1cclxud2luZG93LkJVVFRPTiA9IGZ1bmN0aW9uKHRleHQsY2xpY2tDYWxsYmFjayxpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gbmV3IGVsQlVUVE9OKGlkLG9wdGlvbnMpLnRleHQodGV4dCkuY2xpY2soY2xpY2tDYWxsYmFjayk7XHJcbn1cclxuXHJcblxyXG5cclxuY2xhc3MgZWxIRUFERVIgZXh0ZW5kcyBKc29tRWxlbWVudFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihpZCxvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGlkLFwiSEVBREVSXCIsb3B0aW9ucylcclxuICAgIH1cclxuICAgIFxyXG59XHJcbndpbmRvdy5IRUFERVIgPSBmdW5jdGlvbihpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gbmV3IGVsSEVBREVSKGlkLG9wdGlvbnMpO1xyXG59XHJcblxyXG5jbGFzcyBlbElOUFVUIGV4dGVuZHMgSnNvbUVsZW1lbnRcclxue1xyXG4gICAgY29uc3RydWN0b3IoaWQsb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpZCxcIklOUFVUXCIsb3B0aW9ucylcclxuICAgICAgICB0aGlzLnR5cGUgPSBcIlRFWFRcIjtcclxuICAgIH1cclxuICAgIHR5cGUodHApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50eXBlID10cDtcclxuICAgIH1cclxuICAgIGJ1aWxkKClcclxuICAgIHtcclxuICAgICAgICB2YXIgcnYgPSBzdXBlci5idWlsZCgpO1xyXG4gICAgICAgIHJ2LnNldEF0dHJpYnV0ZShcInR5cGVcIix0aGlzLnR5cGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBydjtcclxuICAgIH1cclxuICAgIHRleHQodHh0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYnVpbGQoKS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLHR4dCk7XHJcbiAgICB9XHJcblxyXG59XHJcbndpbmRvdy5JTlBVVCA9IGZ1bmN0aW9uIChpZCxvcHRpb25zKVxyXG57XHJcbiAgICByZXR1cm4gbmV3IGVsSU5QVVQoaWQsb3B0aW9ucyk7XHJcbn1cclxuXHJcblxyXG53aW5kb3cuSE9SSVpPTlRBTCA9IGZ1bmN0aW9uKGlkLG9wdGlvbnMpXHJcbntcclxuICAgIHJldHVybiBESVYoKS5jbGFzcyhcImhvcml6b250YWxcIik7XHJcbn0iLCJ2YXIganNvbSA9IHJlcXVpcmUoJy4vSnNvbScpO1xyXG52YXIganNvbUVsID0gcmVxdWlyZSgnLi9Kc29tRWxlbWVudCcpO1xyXG5yZXF1aXJlKCcuL2h0dHBIZWxwZXInKTtcclxuXHJcbmZ1bmN0aW9uIENBUkQoY29sb3IsdGl0bGUsYmluZGVyKVxyXG57XHJcbiAgICB2YXIgY3VyZGF0YTtcclxuICAgIHZhciBteWRhdGE7XHJcbiAgICB2YXIgcnYgPSBESVYoKS5jbGFzcyhjb2xvcitcIkNhcmRcIikuYmluZGVyKChkYXRhKT0+e1xyXG4gICAgICAgICBjdXJkYXRhPWRhdGE7XHJcbiAgICAgICAgbXlkYXRhID0gIGJpbmRlcihkYXRhKTtcclxuICAgICAgICByZXR1cm4gbXlkYXRhOyBcclxuICAgIH0pLnN0YWNrKFtcclxuICAgICAgICBIRUFERVIoKS5jbGFzcyhbXCJob3Jpem9udGFsXCIsXCJzcGFjZUJldHdlZW5cIl0pLnN0YWNrKFtcclxuICAgICAgICAgICAgSDIodGl0bGUpLFxyXG4gICAgICAgICAgICBCVVRUT04oXCJUb2dnbGVcIiwoZXZlbnQsYnV0dG9uKT0+e1xyXG4gICAgICAgICAgICAgICAgcnYuc2hvd0JvZHkgPSAhcnYuc2hvd0JvZHk7XHJcbiAgICAgICAgICAgICAgICBydi5iaW5kKGN1cmRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIERJVihcImNhcmRib2R5XCIpLmNsYXNzKFtcImNvbnRhaW5lclwiLFwidGFiTGVmdFwiXSlcclxuICAgICAgICAgICAgLmNvbGxlY3Rpb24oZGF0YT0+ZGF0YS5pdGVtcyxcclxuICAgICAgICAgICAgIChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgIHZhciBydmkgPSBIT1JJWk9OVEFMKCkuY2xhc3MoXCJzcGFjZUJldHdlZW5cIikuc3RhY2soW1xyXG4gICAgICAgICAgICAgICAgICAgICBTVFJPTkcoKS50ZXh0QmluZGVyKCgpPT5pdGVtLnRpdGxlKSxcclxuICAgICAgICAgICAgICAgICAgICAgQlVUVE9OKFwiT0tcIiwoKT0+e30pXHJcbiAgICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgICByZXR1cm4gcnZpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICkudmlzaWJsZSgoKT0+cnYuc2hvd0JvZHkpXHJcbiAgICBdKVxyXG4gICAgcmV0dXJuIHJ2O1xyXG59XHJcbnZhciBqc29tUm9vdCA9IERJVigpLmNsYXNzKFwiY29udGFpbmVyXCIpLmNvbGxlY3Rpb24oZGF0YT0+ZGF0YSxcclxuICAgIChjaGVja2xpc3QpPT4gQ0FSRChcIm9yYW5nZVwiLGNoZWNrbGlzdC50aXRsZSxjaGVja2xpc3Q9PmNoZWNrbGlzdClcclxuKVxyXG4vLyAgICBDQVJEKFwiYmx1ZVwiLFwiUFJPQ0VTU0lOR1wiLChkYXRhKT0+ZGF0YS5wcm9jZXNzaW5nKSxcclxuLy8gICAgQ0FSRChcInllbGxvd1wiLFwiV0FSTklOR1wiLChkYXRhKT0+ZGF0YS53YXJuaW5nKSxcclxuLy8gICAgQ0FSRChcInJlZFwiLFwiQUxFUlRcIixkYXRhPT5kYXRhLmFsZXJ0KSxcclxuLy8gICAgQ0FSRChcImdyZWVuXCIsXCJGSU5JU0hFRFwiLGRhdGE9PlxyXG4vLyAgICB7XHJcbi8vICAgICAgICB2YXIgcnYgPSBkYXRhLmZpbmlzaGVkO1xyXG4vLyAgICAgICAgcmV0dXJuIHJ2O1xyXG4vLyAgICB9KVxyXG5cclxuXHJcbmpzb20uc2V0SnNvbVJvb3QoanNvbVJvb3QpO1xyXG4gICAgXHJcbmh0dHBHZXQoXCIvdGVtcGxhdGVzXCIsZnVuY3Rpb24oZGF0YSlcclxue1xyXG4gICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAganNvbVJvb3QuYmluZChqc29uKTtcclxufSkiLCJcclxuXHJcblxyXG52YXIgaHR0cEdldENhY2hlID0ge31cclxuXHJcbi8qKlxyXG4gKiBAY2FsbGJhY2sgbG9hZENhbGxiYWNrXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBsb2FkZWRUZXh0IGxvYWRlZCBkYXRhIGFzIHRleHRcclxuICovXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtTdHJpbmd9IHVybCB1cmwgb2YgaHR0cCByZXNvdXJjZSAgZmlsZSB0byBiZSBsb2FkZWRcclxuICogQHBhcmFtIHtsb2FkQ2FsbGJhY2t9IGNhbGxiYWNrIFxyXG4gKi9cclxudmFyIGh0dHBHZXQgPSBmdW5jdGlvbih1cmwsY2FsbGJhY2ssdHJ5Q2FjaGUsb3B0aW9ucylcclxue1xyXG4gIHRyeVxyXG57XHJcbiAgaWYodHJ5Q2FjaGUpXHJcbiAge1xyXG4gICAgaWYoaHR0cEdldENhY2hlLmhhc093blByb3BlcnR5KHVybCkpXHJcbiAgICAgIHtcclxuICAgICAgICB2YXIgcnYgPSBodHRwR2V0Q2FjaGVbdXJsXTtcclxuICAgICAgICBjYWxsYmFjayhydik7XHJcbiAgICAgICAgcmV0dXJuIDtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgICAgIHZhciB4aHIgPSBjcmVhdGVDT1JTUmVxdWVzdCgob3B0aW9ucyAhPSBudWxsICYmIG9wdGlvbnMubWV0aG9kKSA/IG9wdGlvbnMubWV0aG9kIDogXCJHRVRcIix1cmwpO1xyXG4gICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMuaGVhZGVycylcclxuICAgICAge1xyXG4gICAgICAgIGZvcih2YXIgaGVhZGVyIGluIG9wdGlvbnMuaGVhZGVycylcclxuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlcixvcHRpb25zLmhlYWRlcnNbaGVhZGVyXSk7XHJcbiAgICAgIH1cclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgaWYodHJ5Q2FjaGUpXHJcbiAgICAgICAgICAgICAgaHR0cEdldENhY2hlW3VybF0gPSB4aHIucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soeGhyLnJlc3BvbnNlVGV4dCx4aHIpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCx4aHIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgIH07XHJcblxyXG4gICAgXHJcbiAgICAgIHhoci50aW1lb3V0ID0gMzAwMDA7XHJcbiAgICAgIHhoci5zZW5kKChvcHRpb25zICE9IG51bGwgJiYgb3B0aW9ucy5kYXRhKSA/IG9wdGlvbnMuZGF0YSA6bnVsbCk7XHJcbiAgICB9XHJcbiAgICBjYXRjaChlcnJvcilcclxuICAgIHtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcclxuICAgICAgY2FsbGJhY2sobnVsbCxudWxsLGVycm9yKTtcclxuICAgIH1cclxuICAgXHJcbiB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlclVybFRlbXBsYXRlKHVybCxtb2RlbClcclxuICB7XHJcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KVxyXG4gICAgeyAgaHR0cEdldCh1cmwsZnVuY3Rpb24oZGF0YSxycSlcclxuICAgICAge1xyXG4gICAgICAgIGlmKGRhdGEgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICByZWplY3QocnEpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcnYgPSBkYXRhLnJlbmRlclRlbXBsYXRlKG1vZGVsKTtcclxuICAgICAgICByZXNvbHZlKHJ2KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gfVxyXG5cclxuIGZ1bmN0aW9uIGNyZWF0ZUNPUlNSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICBpZiAoXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHIpIHtcclxuICBcclxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIFhNTEh0dHBSZXF1ZXN0IG9iamVjdCBoYXMgYSBcIndpdGhDcmVkZW50aWFsc1wiIHByb3BlcnR5LlxyXG4gICAgICAvLyBcIndpdGhDcmVkZW50aWFsc1wiIG9ubHkgZXhpc3RzIG9uIFhNTEhUVFBSZXF1ZXN0MiBvYmplY3RzLlxyXG4gICAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XHJcbiAgXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgXHJcbiAgICAgIC8vIE90aGVyd2lzZSwgY2hlY2sgaWYgWERvbWFpblJlcXVlc3QuXHJcbiAgICAgIC8vIFhEb21haW5SZXF1ZXN0IG9ubHkgZXhpc3RzIGluIElFLCBhbmQgaXMgSUUncyB3YXkgb2YgbWFraW5nIENPUlMgcmVxdWVzdHMuXHJcbiAgICAgIHhociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xyXG4gICAgICB4aHIub3BlbihtZXRob2QsIHVybCk7XHJcbiAgXHJcbiAgICB9IGVsc2Uge1xyXG4gIFxyXG4gICAgICAvLyBPdGhlcndpc2UsIENPUlMgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3Nlci5cclxuICAgICAgeGhyID0gbnVsbDtcclxuICBcclxuICAgIH1cclxuICAgIHJldHVybiB4aHI7XHJcbiAgfVxyXG5cclxuICB3aW5kb3cuaHR0cEdldCA9IGh0dHBHZXQ7XHJcbiJdfQ==
