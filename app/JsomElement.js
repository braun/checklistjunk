
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