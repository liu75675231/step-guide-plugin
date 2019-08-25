var prevTarget = '';
var prevTargetColor = '';
var prev = {
  target: undefined,
  backgroundColor: '',
};

document.addEventListener('mousemove', function (event) {
    var target = event.target;
    if (target === prevTarget) {
        return;
    }

    if (prev.target !== undefined) {
        prev.target.style.backgroundColor = prev.backgroundColor;
    }


    var prevColor = target.style.backgroundColor;
    prev = {
      backgroundColor: target.style.backgroundColor,
      target: target,
    };
    target.style.backgroundColor = '#ccc';
});
function createTemplate () {
    return `
        <div id="guide-plugin-popup">
            <div>abcd</div>
        </div>
    `;
}
document.addEventListener('click', function (event) {
   console.log(event);
});

/**function click(e) {
    console.log("set page color click");
    chrome.runtime.sendMessage(null, "aaa", function () {
        console.log('success');
    });
}
document.getElementsByClassName('sub-title')[0].addEventListener('click', click);

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("message received!111", request);
//    document.body.style.backgroundColor = request.color;
    sendResponse({farewell: "goodbye1111"});
});


**/