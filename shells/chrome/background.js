var windowId = undefined;
chrome.runtime.onInstalled.addListener(function() {
//    chrome.tabs.executeScript({
//        file: 'contentScript.js'
//    });

    chrome.browserAction.onClicked.addListener(function callback () {

        console.log(windowId)
        if (windowId) {
            console.log(chrome.windows.get(windowId, {},function (window) {
                if (!window) {
                    createWindow();
                } else {
                    if (!window.focused) {
                        chrome.windows.update(windowId, {focused: true}, function callback() {

                        });
                    }
                }
            }));
        } else {
            createWindow();
        }


    });
});

function createWindow () {
    chrome.windows.getAll(function (windows) {
        chrome.windows.create({'url': 'index.html', 'type': 'popup'}, function(window) {
            console.log('sdfsdf');
            windowId = window.id;
        });
    });
}
