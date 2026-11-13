/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "c9fead80a3bc5726b3f7247d56725df3"
  }, {
    "url": "pwa-512x512.png",
    "revision": "29e9fa8a923a6a5193e49f03aaf6e35c"
  }, {
    "url": "pwa-192x192.png",
    "revision": "21d3471ddd6511afcc19f56014cb86df"
  }, {
    "url": "index.html",
    "revision": "a626c65d7a26ce5cbd9541e67254a18b"
  }, {
    "url": "icon.svg",
    "revision": "61d91945ee6024a80754efdb95b8ab74"
  }, {
    "url": "icon-maskable.svg",
    "revision": "5fbd1ccdc76fcc0ab811fb74f543fc84"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "72eca45506bbaac18c0fa373ddf366ed"
  }, {
    "url": "assets/index-DLuVYPyf.js",
    "revision": null
  }, {
    "url": "assets/index-BeeCmlEk.css",
    "revision": null
  }, {
    "url": "assets/aistudio/image_c0ad8657.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_bc9bdc9f.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_b4d5fb65.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_9d8079c2.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_5110076a.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_25503caf.png",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "72eca45506bbaac18c0fa373ddf366ed"
  }, {
    "url": "icon-maskable.svg",
    "revision": "5fbd1ccdc76fcc0ab811fb74f543fc84"
  }, {
    "url": "icon.svg",
    "revision": "61d91945ee6024a80754efdb95b8ab74"
  }, {
    "url": "manifest.json",
    "revision": "d4218efc0f95f82832ba2c910fefa623"
  }, {
    "url": "pwa-192x192.png",
    "revision": "21d3471ddd6511afcc19f56014cb86df"
  }, {
    "url": "pwa-512x512.png",
    "revision": "29e9fa8a923a6a5193e49f03aaf6e35c"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "c9fead80a3bc5726b3f7247d56725df3"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
