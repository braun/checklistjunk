
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