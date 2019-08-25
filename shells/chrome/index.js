/**
function click(e) {
    console.log("it is index js");
    chrome.runtime.sendMessage(null, "aaa", function () {
        console.log('success');
    });
}
document.getElementById('button').addEventListener('click', click);
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("message received!111", request);
//    document.body.style.backgroundColor = request.color;
    sendResponse({farewell: "goodbye1111"});
});
**/