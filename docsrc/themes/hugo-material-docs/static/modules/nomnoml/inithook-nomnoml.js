function createElement(str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    var container = document.createDocumentFragment();
    for (var i=0; i < div.childNodes.length; i++) {
        var node = div.childNodes[i].cloneNode(true);
        container.appendChild(node);
    }
    return container.childNodes[0];
}

var thisScript=document.currentScript;
var sourceTextDiv=thisScript.previousElementSibling;
var nomlNode=sourceTextDiv.childNodes[0];
var diagramText=nomlNode.innerText||nomlNode.textContext;

try {
    var canvas = createElement("<canvas></canvas>");
    nomnoml.draw(canvas,diagramText);
    canvas.setAttribute("class","nomnoml-rendered");
    sourceTextDiv.replaceChild(canvas,sourceTextDiv.childNodes[0]);
//    textDiv.parentNode.insertBefore(canvas,thisScript);
} catch (err) {
    var errorDiv = createElement("<div></div>");
    errorDiv.setAttribute("class", "nomnoml-error");

    var errorSourceDiv = createElement("<pre></pre>");
    errorSourceDiv.innerText = diagramText;
    errorDiv.appendChild(errorSourceDiv);

    var errMsgDiv = createElement("<div><pre>" + err + "</pre></div>");
    errorDiv.appendChild(errMsgDiv);
    sourceTextDiv.parentNode.replaceChild(errorDiv, sourceTextDiv);
}

// // create diagram from text
// var diagram=flowchart.parse(diagramText);
// // insert new after text node.
// // // var diagramDiv=document.createElement('div');
// textDiv.innerHTML="";
// // // textDiv.parentNode.insertBefore(diagramDiv,textDiv.nextSibling);
// diagram.drawSVG(textDiv);
// //textDiv.style.visibility='hidden';
//
//
// try {
//     var canvas = createElement("<canvas></canvas>");
//     elem.parentNode.insertBefore(canvas,elem.nextSibling);
//
//     nomnoml.draw(canvas,noml);
//     elem.setAttribute("class","nomnoml-rendered");
// } catch (err) {
//     var errdiv = createElement("<div></div>");
//     var textDiv = createElement("<pre></pre>");
//     textDiv.innerText=elem.innerText;
//     var errnode = createElement("<div><pre>" + err + "</pre></div>");
//     errdiv.appendChild(textDiv);
//     errdiv.appendChild(errnode);
//     errdiv.setAttribute("class", "nomnoml-error");
//     elem.parentNode.replaceChild(errdiv,elem);
// }
//
// //            var target = document.getElementById('nomnoml-view1');
// //            var noml = document.getElementById('nomnoml-text1').innerHTML;
//
// function escapeHtml(str) {
//     var div = document.createElement('div');
//     div.appendChild(document.createTextNode(str));
//     return div.innerHTML;
// }
//
// function createElement(str) {
//     var div = document.createElement('div');
//     div.innerHTML = str;
//     var container = document.createDocumentFragment();
//     for (var i=0; i < div.childNodes.length; i++) {
//         var node = div.childNodes[i].cloneNode(true);
//         container.appendChild(node);
//     }
//     return container.childNodes[0];
// }
// var elems = document.getElementsByClassName("nomnoml-text");
// while (elems.length>0) {
//     var elem = elems[0];
//     var noml = elem.innerHTML;
//
//     try {
//         var canvas = createElement("<canvas></canvas>");
//         elem.parentNode.insertBefore(canvas,elem.nextSibling);
//
//         nomnoml.draw(canvas,noml);
//         elem.setAttribute("class","nomnoml-rendered");
//     } catch (err) {
//         var errdiv = createElement("<div></div>");
//         var textDiv = createElement("<pre></pre>");
//         textDiv.innerText=elem.innerText;
//         var errnode = createElement("<div><pre>" + err + "</pre></div>");
//         errdiv.appendChild(textDiv);
//         errdiv.appendChild(errnode);
//         errdiv.setAttribute("class", "nomnoml-error");
//         elem.parentNode.replaceChild(errdiv,elem);
//     }
//     // refresh
//     var elems = document.getElementsByClassName("nomnoml-text");
// }
