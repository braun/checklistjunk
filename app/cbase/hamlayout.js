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
