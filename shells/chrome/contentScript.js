var prevTarget = '';
var prevTargetColor = '';
var prev = {
  target: undefined,
  backgroundColor: '',
};

function addCss(fileName) {
    var head = document.head;
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;
    head.appendChild(link);
}

addCss(chrome.runtime.getURL("css/contentScript.css"));


var isSettingShow = false;
document.addEventListener('mousemove', function (event) {
    var target = event.target;
    if (target === prevTarget) {
        return;
    }
    if (isSettingShow) {
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
    target.style.backgroundColor = '#000';
});
function createTemplate () {
    return `
        <div id="guide-plugin-popup">
            <div class="guide-plugin-popup-mask"></div>
            <div class="guide-plugin-popup-content">
                <div class="guide-plugin-popup-layout">
                    <div class="guide-plugin-popup-form">
                        <div class="guide-plugin-popup-form-item">
                            <div class="guide-plugin-popup-form-label">
                                标题
                            </div>
                            <div class="guide-plugin-popup-form-content">
                                <input type="text" class="guide-plugin-popup-input"/>
                            </div>
                        </div>
                        <div class="guide-plugin-popup-form-item">
                            <div class="guide-plugin-popup-form-label">
                                内容
                            </div>
                            <div class="guide-plugin-popup-form-content">
                                <textarea class="guide-plugin-popup-textarea"></textarea>
                            </div>
                        </div>   
                        <div class="guide-plugin-popup-form-item">
                            <input id="guide-plugin-popup-step-save" type="button" value="确定">
                            <input id="guide-plugin-popup-step-cancel" type="button" value="取消">
                        </div>                 
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initGuidePluginPopup () {
    document.getElementById('guide-plugin-popup-step-save').addEventListener("click", function (event) {
        document.getElementById('guide-plugin-popup').style.display = 'none';
        isSettingShow = false;
        event.stopPropagation();
    });
    document.getElementById('guide-plugin-popup-step-cancel').addEventListener("click", function (event) {
        document.getElementById('guide-plugin-popup').style.display = 'none';
        isSettingShow = false;
        event.stopPropagation();
    });
}

document.addEventListener('click', function (event) {
    if (isSettingShow) {
        return;
    }
    isSettingShow = true;
    var oldDom = document.getElementById('guide-plugin-popup');
    if (oldDom) {
        oldDom.style.display = 'block';
    } else {
        var html = createTemplate();
        document.body.innerHTML += html;
        initGuidePluginPopup();
    }
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
