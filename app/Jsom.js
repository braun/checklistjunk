
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