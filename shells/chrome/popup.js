console.log('abc');
document.getElementById('create').addEventListener('click', function () {
    window.close();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"create"});
    });
})

document.getElementById('save').addEventListener('click', function () {
    window.close();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"save"});
    });
})

document.getElementById('cancel').addEventListener('click', function () {
    window.close();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"cancel"});
    });
})
