# firefox-extension-start-project

[Firefox addons](about:debugging#/runtime/this-firefox)

![img.png](docs%2Fimg.png)

https://developer.chrome.com/docs/extensions/reference/

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension

https://extensionworkshop.com/documentation/publish/distribute-sideloading/

https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging

```shell
npm install --global web-ext
```

```shell
web-ext run --firefox="C:\Program Files\Mozilla Firefox\firefox.exe"
```

```shell
web-ext run --pre-install
```

ZIP (XPI)

```shell
web-ext build --overwrite-dest
```

Permissions

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions

```json
{
    "permissions": [
        "activeTab",
        "alarms",
        "background",
        "bookmarks",
        "browserSettings",
        "browsingData",
        "captivePortal",
        "clipboardRead",
        "clipboardWrite",
        "contentSettings",
        "contextMenus",
        "contextualIdentities",
        "cookies",
        "debugger",
        "declarativeNetRequest",
        "declarativeNetRequestFeedback",
        "declarativeNetRequestWithHostAccess",
        "dns",
        "downloads",
        "downloads.open",
        "find",
        "geolocation",
        "history",
        "identity",
        "idle",
        "management",
        "menus",
        "menus.overrideContext",
        "nativeMessaging",
        "notifications",
        "pageCapture",
        "pkcs11",
        "privacy",
        "proxy",
        "scripting",
        "search",
        "sessions",
        "storage",
        "tabHide",
        "tabs",
        "theme",
        "topSites",
        "unlimitedStorage",
        "webNavigation",
        "webRequest",
        "webRequestBlocking",
        "webRequestFilterResponse",
        "webRequestFilterResponse.serviceWorkerScript"
    ]
}
```

XPI without signing

Use FF Developers edition and set in **xpinstall.signatures.required** **xpinstall.signatures.required** to **false**
