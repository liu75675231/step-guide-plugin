function click(e) {
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
