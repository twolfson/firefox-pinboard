setTimeout(function() {
    var uri = window._content.document.location.href;
    console.log('uri', uri);
    var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    var token = prefManager.getCharPref('extensions.pinboardff.pinboard-token');
    console.log('token', token);

    if (token) {
        var req = new XMLHttpRequest();
        // https://pinboard.in/settings/password
        var getBase = 'https://api.pinboard.in/v1/posts/get';
        req.open('GET', getBase + '?format=json&url=' + encodeURIComponent(uri) + '&auth_token=' + token, true);
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                console.log('done', req.responseText);
            }
        };
        req.send(null);
    }
}, 1000);
var PinboardFXT = {

    logmsg: function(err) {
        window.console.log(err);
    },


    openTab: function(uri) {
        var newTab = gBrowser.addTab(uri);
        gBrowser.selectedTab = newTab;
    },

    bookmarkCurrent: function() {
        var q = window._content.document.location.href;
        var d = '';

        if (window._content.document.getSelection) {
            d = window._content.document.getSelection();
        }

        var p = window._content.document.title;

        this.bookmark(q, d, p);
    },

    readLaterCurrent: function() {
        var uri = window._content.document.location.href;
        var title = window._content.document.title;

        this.readLater(uri, title);
    },

    bookmarkLink: function() {
        var title;
        try {
            title = gContextMenu.linkText();
        } catch (err) {

        }
        var desc = '';
        var uri = gContextMenu.linkURL ? gContextMenu.linkURL : window._content.document.location.href;
        this.bookmark(uri, desc, title);
    },

    readLaterLink: function() {
        var uri = gContextMenu.linkURL ? gContextMenu.linkURL : window._content.document.location.href;
        var title = gContextMenu.linkText();
        this.readLater(uri, title);
    },

    readLater: function(uri, title) {
        var q = uri;
        var p = title;

        void(t = open('https://pinboard.in/add?later=yes&noui=yes&jump=close&url=' + encodeURIComponent(q) + '&title=' + encodeURIComponent(p), 'Pinboard', 'toolbar=no,width=100,height=100'));
        t.blur();

        var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);


        if (prefManager.getBoolPref("extensions.pinboardff.notifications")) {
            var alertsService = Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService);
            alertsService.showAlertNotification("chrome://pinboardff/skin/pin_16x16.png", "Pinboard.in", "Saved to read later", true, "", null);
        }
    },

    bookmark: function(uri, desc, title) {
        q = uri;
        d = desc;
        p = title;

        void(open('https://pinboard.in/add?showtags=yes&url=' + encodeURIComponent(q) + '&description=' + encodeURIComponent(d) + '&title=' + encodeURIComponent(p), 'Pinboard', 'toolbar=no,scrollbars=yes,width=700,height=700'));
    },

    contextPopupShowing: function() {
        gContextMenu.showItem("pbff-bookmark-menu", gContextMenu.onLink);
        gContextMenu.showItem("pbff-readlater-menu", gContextMenu.onLink);
    },

    initOverlay: function() {
        var menu = document.getElementById("contentAreaContextMenu");
        menu.addEventListener("popupshowing", this.contextPopupShowing, false);

        // clear the default bookmark shortcut
        var ffKey = document.getElementById("addBookmarkAsKb"); // FF native bookmark <key>
        ffKey.setAttribute("key", "");
        ffKey.setAttribute("modifiers", "");

    },

    makeTabList: function() {
        var winz = [];

        var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
        var browserEnumerator = wm.getEnumerator("navigator:browser");
        // Check each browser instance for our URL
        var found = false;
        while (browserEnumerator.hasMoreElements()) {
            var win = browserEnumerator.getNext();
            var browser = win.gBrowser;

            // Check each tab of this browser instance
            var num = browser.browsers.length;
            var tabz = [];
            for (var i = 0; i < num; i++) {
                var curr = browser.getBrowserAtIndex(i);
                var url = curr.currentURI.spec;
                var title = curr.contentTitle;
                tabz.push({
                    title: title,
                    url: url
                });
            }
            winz.push(tabz);
        }

        var result = {
            browser: "ffox",
            windows: winz
        };

        var req = new XMLHttpRequest();
        var json = JSON.stringify(result);
        var params = new FormData();
        params.append("data", json);
        //var reqstring = 'data=' + json;
        req.open("POST", 'https://pinboard.in/tabs/save/', true);

        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                void(open('https://pinboard.in/tabs/show/'));
            }
        };
        req.send(params);
    }
};


window.addEventListener("load", PinboardFXT.initOverlay, false);