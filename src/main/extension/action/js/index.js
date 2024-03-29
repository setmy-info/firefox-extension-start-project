/**
 * CSS to hide everything on the page,
 * except for elements that have the "changed-image" class.
 */
const hidePage = `body > :not(.changed-image) {
                    display: none;
                  }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {
        /**
         * Given the name of a beast, get the URL to the corresponding image.
         */
        function beastNameToURL(beastName) {
            switch (beastName) {
                case "First":
                    return browser.runtime.getURL("src/main/extension/images/icons/icon-32.png");
                case "Second":
                    return browser.runtime.getURL("src/main/extension/images/icons/icon-48.png");
                case "Third":
                    return browser.runtime.getURL("src/main/extension/images/icons/icon-96.png");
            }
        }

        /**
         * Insert the page-hiding CSS into the active tab,
         * then get the beast URL and
         * send a "beastify" message to the content script in the active tab.
         */
        function beastify(tabs) {
            browser.scripting.insertCSS({code: hidePage}).then(() => {
                const url = beastNameToURL(e.target.textContent);
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "beastify",
                    beastURL: url
                });
            });
        }

        /**
         * Remove the page-hiding CSS from the active tab,
         * send a "reset" message to the content script in the active tab.
         */
        function reset(tabs) {
            browser.tabs.removeCSS({code: hidePage}).then(() => {
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "reset",
                });
            });
        }

        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`Could not beastify: ${error}`);
        }

        /**
         * Get the active tab,
         * then call "beastify()" or "reset()" as appropriate.
         */
        if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
            // Ignore when click is not on a button within <div id="popup-content">.
            return;
        }
        if (e.target.type === "reset") {
            browser.tabs.query({active: true, currentWindow: true})
                .then(reset)
                .catch(reportError);
        } else {
            browser.tabs.query({active: true, currentWindow: true})
                .then(beastify)
                .catch(reportError);
        }
    });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
/**
 * Get the active tab,
 * then execute the content script using "browser.scripting.executeScript".
 */
browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        const activeTab = tabs[0];
        console.log("activeTab.title: ", activeTab.title);
        browser.scripting.executeScript({
            target: {
                tabId: activeTab.id,
                allFrames: true,
            },
            files: ["/src/main/extension/action/js/iconsChanger.js"]
        });
    })
    .then(() => {
        // Script execution was successful.
        listenForClicks();
    })
    .catch((error) => {
        // Handle errors here.
        reportExecuteScriptError(error);
    });
