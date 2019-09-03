var curWindowId = undefined;
chrome.tabs.executeScript({
    file: 'contentScript.js'
});
/**
chrome.browserAction.onClicked.addListener(function callback () {


    if (!curWindowId) {
        chrome.windows.getAll(function (windows) {
            chrome.windows.create({'url': 'index.html', 'type': 'popup'}, function(window) {
                curWindowId = window.id;



                chrome.tabs.query({active: true,  currentWindow: true}, function(tabs) {

                    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                        console.log(response.farewell);
                    });
                });

            });
        });
    }

});
 **/
/**
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("message received!", request);
//    document.body.style.backgroundColor = request.color;
    sendResponse({farewell: "goodbye"});
});

setInterval(function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            console.log(response.farewell);
        });
    });
    console.log('start');
}, 5000);

**/
