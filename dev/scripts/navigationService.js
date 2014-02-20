define(["window"], function (window) {

  var listeners = [],
      isListening = false,
      addListener = function (listener) {
        if (typeof listener !== "function") {
          throw new Error("The provided listener must be a function.");
        }
        listeners.push(listener);
        if (isListening) {
          listener(getCurrentPath());
        }
      },
      startListening = function() {
        if (!isListening) {
          window.addEventListener("hashchange", notifyListeners, false);
          notifyListeners();
          isListening = true;
        }
      },
      notifyListeners = function () {
        var currentHash = getCurrentPath();
        listeners.forEach(function (listener) {
          listener(currentHash);
        });
      },
      getCurrentPath = function () {
        return unhashify(window.location.hash);
      },
      navigateTo = function (path) {
        var url = window.location;
        url.href = url.protocol + "//" + url.host + url.pathname + url.search + hashify(path);
      },
      redirectTo = function (path) {
        var url = window.location;
        url.replace(url.protocol + "//" + url.host + url.pathname + url.search + hashify(path));
      },
      hashify = function (path) {
        // Ensure leading hash + slash (except for empty path), no trailing slash:
        var stripped = unhashify(path);
        return stripped ? "#/" + stripped : "";
      },
      unhashify = function (path) {
        // Ensure trimmed, no leading hash, no leading slash, no trailing slash, also let's be restrictive about the allowed characters in URL path segments:
        // Each path segment must begin and end with a word character and may contain "_" "-" and "." one at a time (to prevent directory transversal holes).
        return "" + ("" + path).replace(/^\s*#*\/*((?:(?:[a-zA-Z0-9]+(?:(?:_|\-|\.)[a-zA-Z0-9]+)*)\/)*(?:[a-zA-Z0-9]+(?:(?:_|\-|\.)[a-zA-Z0-9]+)*))*\/*\s*$/g, "$1");
      };

  return {
    addListener: addListener,
    startListening: startListening,
    getCurrentPath: getCurrentPath,
    navigateTo: navigateTo,
    redirectTo: redirectTo
  };

});