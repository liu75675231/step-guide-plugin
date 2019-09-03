function getQueryObj () {
    var queries = {};
    var search = document.location.search;
    if (!search) {
        return queries;
    }
    $.each(document.location.search.substr(1).split('&'),function(c,q){
        var i = q.split('=');
        queries[i[0].toString()] = i[1].toString();
    });
    return queries;
}
var queries = getQueryObj();
if (queries['step-guide-id']) {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/guides/get-conf?id=' + queries['step-guide-id'],
        success: function(data){
            var list = JSON.parse(data).conf;
            list.forEach(function (elem, index) {
                $(elem.selector).attr("data-intro", elem.content).attr("data-step", index + 1);
            });
            introJs().start();

        },
        error: function(e){
            console.error(e);
        }
    });
}

chrome.runtime.onMessage.addListener(msgObj => {
    if (msgObj.type === 'create') {
        createGuide();
    }
    if (msgObj.type === 'cancel') {
        cancelGuide();
    }
    if (msgObj.type === 'save') {
        saveGuide();
    }
});


function saveGuide() {
    console.log('save');
    let conf = generateConf();
    $.post('http://localhost:3000/guides/add-conf', {
        conf: conf,
    },  function (resp) {
        console.log(resp);
    });
}

function cancelGuide() {
    console.log('cancel');
}
let stepConfList = [];

function createGuide() {
    console.log('create');
    var prevTarget = '';
    var prev = {
        target: undefined,
        backgroundColor: '',
    };
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
        target.style.backgroundColor = '#555';
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
    let selectorName = '';
    let curStepConf = {
        selector: '',
        title: '',
        content: '',
    };
    function initGuidePluginPopup () {
        document.getElementById('guide-plugin-popup-step-save').addEventListener("click", function (event) {
            var $popup = $("#guide-plugin-popup");
            curStepConf.title = $popup.find(".guide-plugin-popup-input").val();
            curStepConf.content = $popup.find(".guide-plugin-popup-textarea").val();
            stepConfList.push(curStepConf);
            $popup.css({
                display: 'none',
            });
            isSettingShow = false;
            event.stopPropagation();
        });
        document.getElementById('guide-plugin-popup-step-cancel').addEventListener("click", function (event) {
            var $popup = $("#guide-plugin-popup");
            $popup.css({
                display: 'none',
            });
            isSettingShow = false;
            event.stopPropagation();
        });
    }


    document.addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (isSettingShow) {
            return;
        }

        var target = event.target;
        if (target.id) {
            selectorName = "#" + target.id;
        } else {
            selectorName = target.tagName;
            if (target.className) {
                selectorName += '.' + target.className;
            }
        }

        curStepConf = {
            selector: selectorName,
            title: '',
            content: '',
        };
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
}

function generateConf () {
    return stepConfList;
}
/**
var prevTarget = '';
var prevTargetColor = '';
var prev = {
  target: undefined,
  backgroundColor: '',
};


setTimeout(function () {
    console.log('start running');
    document.getElementById("hplogo").setAttribute("data-intro", "it is 啊");
    document.getElementById("hplogo").setAttribute("data-step", "1");
    document.getElementsByClassName("Fx4vi")[0].setAttribute("data-intro", "你赶紧点啊");
    document.getElementsByClassName("Fx4vi")[0].setAttribute("data-step", "2");
    introJs().start();
}, 3000);


 **/
/**
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
    target.style.backgroundColor = '#555';
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
    event.stopPropagation();
    event.preventDefault();
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
**/

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
