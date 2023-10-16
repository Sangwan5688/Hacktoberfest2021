/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/algoliasearch/node_modules/isarray/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/algoliasearch/node_modules/isarray/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/AlgoliaSearchCore.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/AlgoliaSearchCore.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {module.exports = AlgoliaSearchCore;

var errors = __webpack_require__(/*! ./errors */ "./node_modules/algoliasearch/src/errors.js");
var exitPromise = __webpack_require__(/*! ./exitPromise.js */ "./node_modules/algoliasearch/src/exitPromise.js");
var IndexCore = __webpack_require__(/*! ./IndexCore.js */ "./node_modules/algoliasearch/src/IndexCore.js");
var store = __webpack_require__(/*! ./store.js */ "./node_modules/algoliasearch/src/store.js");

// We will always put the API KEY in the JSON body in case of too long API KEY,
// to avoid query string being too long and failing in various conditions (our server limit, browser limit,
// proxies limit)
var MAX_API_KEY_LENGTH = 500;
var RESET_APP_DATA_TIMER =
  process.env.RESET_APP_DATA_TIMER && parseInt(process.env.RESET_APP_DATA_TIMER, 10) ||
  60 * 2 * 1000; // after 2 minutes reset to first host

/*
 * Algolia Search library initialization
 * https://www.algolia.com/
 *
 * @param {string} applicationID - Your applicationID, found in your dashboard
 * @param {string} apiKey - Your API key, found in your dashboard
 * @param {Object} [opts]
 * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
 * another request will be issued after this timeout
 * @param {string} [opts.protocol='https:'] - The protocol used to query Algolia Search API.
 *                                        Set to 'http:' to force using http.
 * @param {Object|Array} [opts.hosts={
 *           read: [this.applicationID + '-dsn.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]),
 *           write: [this.applicationID + '.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]) - The hosts to use for Algolia Search API.
 *           If you provide them, you will less benefit from our HA implementation
 */
function AlgoliaSearchCore(applicationID, apiKey, opts) {
  var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('algoliasearch');

  var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';

  if (opts._allowEmptyCredentials !== true && !applicationID) {
    throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
  }

  if (opts._allowEmptyCredentials !== true && !apiKey) {
    throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
  }

  this.applicationID = applicationID;
  this.apiKey = apiKey;

  this.hosts = {
    read: [],
    write: []
  };

  opts = opts || {};

  this._timeouts = opts.timeouts || {
    connect: 1 * 1000, // 500ms connect is GPRS latency
    read: 2 * 1000,
    write: 30 * 1000
  };

  // backward compat, if opts.timeout is passed, we use it to configure all timeouts like before
  if (opts.timeout) {
    this._timeouts.connect = this._timeouts.read = this._timeouts.write = opts.timeout;
  }

  var protocol = opts.protocol || 'https:';
  // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
  // we also accept `http` and `https`. It's a common error.
  if (!/:$/.test(protocol)) {
    protocol = protocol + ':';
  }

  if (protocol !== 'http:' && protocol !== 'https:') {
    throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
  }

  this._checkAppIdData();

  if (!opts.hosts) {
    var defaultHosts = map(this._shuffleResult, function(hostNumber) {
      return applicationID + '-' + hostNumber + '.algolianet.com';
    });

    // no hosts given, compute defaults
    var mainSuffix = (opts.dsn === false ? '' : '-dsn') + '.algolia.net';
    this.hosts.read = [this.applicationID + mainSuffix].concat(defaultHosts);
    this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
  } else if (isArray(opts.hosts)) {
    // when passing custom hosts, we need to have a different host index if the number
    // of write/read hosts are different.
    this.hosts.read = clone(opts.hosts);
    this.hosts.write = clone(opts.hosts);
  } else {
    this.hosts.read = clone(opts.hosts.read);
    this.hosts.write = clone(opts.hosts.write);
  }

  // add protocol and lowercase hosts
  this.hosts.read = map(this.hosts.read, prepareHost(protocol));
  this.hosts.write = map(this.hosts.write, prepareHost(protocol));

  this.extraHeaders = {};

  // In some situations you might want to warm the cache
  this.cache = opts._cache || {};

  this._ua = opts._ua;
  this._useCache = opts._useCache === undefined || opts._cache ? true : opts._useCache;
  this._useRequestCache = this._useCache && opts._useRequestCache;
  this._useFallback = opts.useFallback === undefined ? true : opts.useFallback;

  this._setTimeout = opts._setTimeout;

  debug('init done, %j', this);
}

/*
 * Get the index object initialized
 *
 * @param indexName the name of index
 * @param callback the result callback with one argument (the Index instance)
 */
AlgoliaSearchCore.prototype.initIndex = function(indexName) {
  return new IndexCore(this, indexName);
};

/**
* Add an extra field to the HTTP request
*
* @param name the header field name
* @param value the header field value
*/
AlgoliaSearchCore.prototype.setExtraHeader = function(name, value) {
  this.extraHeaders[name.toLowerCase()] = value;
};

/**
* Get the value of an extra HTTP header
*
* @param name the header field name
*/
AlgoliaSearchCore.prototype.getExtraHeader = function(name) {
  return this.extraHeaders[name.toLowerCase()];
};

/**
* Remove an extra field from the HTTP request
*
* @param name the header field name
*/
AlgoliaSearchCore.prototype.unsetExtraHeader = function(name) {
  delete this.extraHeaders[name.toLowerCase()];
};

/**
* Augment sent x-algolia-agent with more data, each agent part
* is automatically separated from the others by a semicolon;
*
* @param algoliaAgent the agent to add
*/
AlgoliaSearchCore.prototype.addAlgoliaAgent = function(algoliaAgent) {
  var algoliaAgentWithDelimiter = '; ' + algoliaAgent;

  if (this._ua.indexOf(algoliaAgentWithDelimiter) === -1) {
    this._ua += algoliaAgentWithDelimiter;
  }
};

/*
 * Wrapper that try all hosts to maximize the quality of service
 */
AlgoliaSearchCore.prototype._jsonRequest = function(initialOpts) {
  this._checkAppIdData();

  var requestDebug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('algoliasearch:' + initialOpts.url);


  var body;
  var cacheID;
  var additionalUA = initialOpts.additionalUA || '';
  var cache = initialOpts.cache;
  var client = this;
  var tries = 0;
  var usingFallback = false;
  var hasFallback = client._useFallback && client._request.fallback && initialOpts.fallback;
  var headers;

  if (
    this.apiKey.length > MAX_API_KEY_LENGTH &&
    initialOpts.body !== undefined &&
    (initialOpts.body.params !== undefined || // index.search()
    initialOpts.body.requests !== undefined) // client.search()
  ) {
    initialOpts.body.apiKey = this.apiKey;
    headers = this._computeRequestHeaders({
      additionalUA: additionalUA,
      withApiKey: false,
      headers: initialOpts.headers
    });
  } else {
    headers = this._computeRequestHeaders({
      additionalUA: additionalUA,
      headers: initialOpts.headers
    });
  }

  if (initialOpts.body !== undefined) {
    body = safeJSONStringify(initialOpts.body);
  }

  requestDebug('request start');
  var debugData = [];


  function doRequest(requester, reqOpts) {
    client._checkAppIdData();

    var startTime = new Date();

    if (client._useCache && !client._useRequestCache) {
      cacheID = initialOpts.url;
    }

    // as we sometime use POST requests to pass parameters (like query='aa'),
    // the cacheID must also include the body to be different between calls
    if (client._useCache && !client._useRequestCache && body) {
      cacheID += '_body_' + reqOpts.body;
    }

    // handle cache existence
    if (isCacheValidWithCurrentID(!client._useRequestCache, cache, cacheID)) {
      requestDebug('serving response from cache');

      var responseText = cache[cacheID];

      // Cache response must match the type of the original one
      return client._promise.resolve({
        body: JSON.parse(responseText),
        responseText: responseText
      });
    }

    // if we reached max tries
    if (tries >= client.hosts[initialOpts.hostType].length) {
      if (!hasFallback || usingFallback) {
        requestDebug('could not get any response');
        // then stop
        return client._promise.reject(new errors.AlgoliaSearchError(
          'Cannot connect to the AlgoliaSearch API.' +
          ' Send an email to support@algolia.com to report and resolve the issue.' +
          ' Application id was: ' + client.applicationID, {debugData: debugData}
        ));
      }

      requestDebug('switching to fallback');

      // let's try the fallback starting from here
      tries = 0;

      // method, url and body are fallback dependent
      reqOpts.method = initialOpts.fallback.method;
      reqOpts.url = initialOpts.fallback.url;
      reqOpts.jsonBody = initialOpts.fallback.body;
      if (reqOpts.jsonBody) {
        reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
      }
      // re-compute headers, they could be omitting the API KEY
      headers = client._computeRequestHeaders({
        additionalUA: additionalUA,
        headers: initialOpts.headers
      });

      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
      client._setHostIndexByType(0, initialOpts.hostType);
      usingFallback = true; // the current request is now using fallback
      return doRequest(client._request.fallback, reqOpts);
    }

    var currentHost = client._getHostByType(initialOpts.hostType);

    var url = currentHost + reqOpts.url;
    var options = {
      body: reqOpts.body,
      jsonBody: reqOpts.jsonBody,
      method: reqOpts.method,
      headers: headers,
      timeouts: reqOpts.timeouts,
      debug: requestDebug,
      forceAuthHeaders: reqOpts.forceAuthHeaders
    };

    requestDebug('method: %s, url: %s, headers: %j, timeouts: %d',
      options.method, url, options.headers, options.timeouts);

    if (requester === client._request.fallback) {
      requestDebug('using fallback');
    }

    // `requester` is any of this._request or this._request.fallback
    // thus it needs to be called using the client as context
    return requester.call(client, url, options).then(success, tryFallback);

    function success(httpResponse) {
      // compute the status of the response,
      //
      // When in browser mode, using XDR or JSONP, we have no statusCode available
      // So we rely on our API response `status` property.
      // But `waitTask` can set a `status` property which is not the statusCode (it's the task status)
      // So we check if there's a `message` along `status` and it means it's an error
      //
      // That's the only case where we have a response.status that's not the http statusCode
      var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status ||

        // this is important to check the request statusCode AFTER the body eventual
        // statusCode because some implementations (jQuery XDomainRequest transport) may
        // send statusCode 200 while we had an error
        httpResponse.statusCode ||

        // When in browser mode, using XDR or JSONP
        // we default to success when no error (no response.status && response.message)
        // If there was a JSON.parse() error then body is null and it fails
        httpResponse && httpResponse.body && 200;

      requestDebug('received response: statusCode: %s, computed statusCode: %d, headers: %j',
        httpResponse.statusCode, status, httpResponse.headers);

      var httpResponseOk = Math.floor(status / 100) === 2;

      var endTime = new Date();
      debugData.push({
        currentHost: currentHost,
        headers: removeCredentials(headers),
        content: body || null,
        contentLength: body !== undefined ? body.length : null,
        method: reqOpts.method,
        timeouts: reqOpts.timeouts,
        url: reqOpts.url,
        startTime: startTime,
        endTime: endTime,
        duration: endTime - startTime,
        statusCode: status
      });

      if (httpResponseOk) {
        if (client._useCache && !client._useRequestCache && cache) {
          cache[cacheID] = httpResponse.responseText;
        }

        return {
          responseText: httpResponse.responseText,
          body: httpResponse.body
        };
      }

      var shouldRetry = Math.floor(status / 100) !== 4;

      if (shouldRetry) {
        tries += 1;
        return retryRequest();
      }

      requestDebug('unrecoverable error');

      // no success and no retry => fail
      var unrecoverableError = new errors.AlgoliaSearchError(
        httpResponse.body && httpResponse.body.message, {debugData: debugData, statusCode: status}
      );

      return client._promise.reject(unrecoverableError);
    }

    function tryFallback(err) {
      // error cases:
      //  While not in fallback mode:
      //    - CORS not supported
      //    - network error
      //  While in fallback mode:
      //    - timeout
      //    - network error
      //    - badly formatted JSONP (script loaded, did not call our callback)
      //  In both cases:
      //    - uncaught exception occurs (TypeError)
      requestDebug('error: %s, stack: %s', err.message, err.stack);

      var endTime = new Date();
      debugData.push({
        currentHost: currentHost,
        headers: removeCredentials(headers),
        content: body || null,
        contentLength: body !== undefined ? body.length : null,
        method: reqOpts.method,
        timeouts: reqOpts.timeouts,
        url: reqOpts.url,
        startTime: startTime,
        endTime: endTime,
        duration: endTime - startTime
      });

      if (!(err instanceof errors.AlgoliaSearchError)) {
        err = new errors.Unknown(err && err.message, err);
      }

      tries += 1;

      // stop the request implementation when:
      if (
        // we did not generate this error,
        // it comes from a throw in some other piece of code
        err instanceof errors.Unknown ||

        // server sent unparsable JSON
        err instanceof errors.UnparsableJSON ||

        // max tries and already using fallback or no fallback
        tries >= client.hosts[initialOpts.hostType].length &&
        (usingFallback || !hasFallback)) {
        // stop request implementation for this command
        err.debugData = debugData;
        return client._promise.reject(err);
      }

      // When a timeout occurred, retry by raising timeout
      if (err instanceof errors.RequestTimeout) {
        return retryRequestWithHigherTimeout();
      }

      return retryRequest();
    }

    function retryRequest() {
      requestDebug('retrying request');
      client._incrementHostIndex(initialOpts.hostType);
      return doRequest(requester, reqOpts);
    }

    function retryRequestWithHigherTimeout() {
      requestDebug('retrying request with higher timeout');
      client._incrementHostIndex(initialOpts.hostType);
      client._incrementTimeoutMultipler();
      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
      return doRequest(requester, reqOpts);
    }
  }

  function isCacheValidWithCurrentID(
    useRequestCache,
    currentCache,
    currentCacheID
  ) {
    return (
      client._useCache &&
      useRequestCache &&
      currentCache &&
      currentCache[currentCacheID] !== undefined
    );
  }


  function interopCallbackReturn(request, callback) {
    if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
      request.catch(function() {
        // Release the cache on error
        delete cache[cacheID];
      });
    }

    if (typeof initialOpts.callback === 'function') {
      // either we have a callback
      request.then(function okCb(content) {
        exitPromise(function() {
          initialOpts.callback(null, callback(content));
        }, client._setTimeout || setTimeout);
      }, function nookCb(err) {
        exitPromise(function() {
          initialOpts.callback(err);
        }, client._setTimeout || setTimeout);
      });
    } else {
      // either we are using promises
      return request.then(callback);
    }
  }

  if (client._useCache && client._useRequestCache) {
    cacheID = initialOpts.url;
  }

  // as we sometime use POST requests to pass parameters (like query='aa'),
  // the cacheID must also include the body to be different between calls
  if (client._useCache && client._useRequestCache && body) {
    cacheID += '_body_' + body;
  }

  if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
    requestDebug('serving request from cache');

    var maybePromiseForCache = cache[cacheID];

    // In case the cache is warmup with value that is not a promise
    var promiseForCache = typeof maybePromiseForCache.then !== 'function'
      ? client._promise.resolve({responseText: maybePromiseForCache})
      : maybePromiseForCache;

    return interopCallbackReturn(promiseForCache, function(content) {
      // In case of the cache request, return the original value
      return JSON.parse(content.responseText);
    });
  }

  var request = doRequest(
    client._request, {
      url: initialOpts.url,
      method: initialOpts.method,
      body: body,
      jsonBody: initialOpts.body,
      timeouts: client._getTimeoutsForRequest(initialOpts.hostType),
      forceAuthHeaders: initialOpts.forceAuthHeaders
    }
  );

  if (client._useCache && client._useRequestCache && cache) {
    cache[cacheID] = request;
  }

  return interopCallbackReturn(request, function(content) {
    // In case of the first request, return the JSON value
    return content.body;
  });
};

/*
* Transform search param object in query string
* @param {object} args arguments to add to the current query string
* @param {string} params current query string
* @return {string} the final query string
*/
AlgoliaSearchCore.prototype._getSearchParams = function(args, params) {
  if (args === undefined || args === null) {
    return params;
  }
  for (var key in args) {
    if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
      params += params === '' ? '' : '&';
      params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
    }
  }
  return params;
};

/**
 * Compute the headers for a request
 *
 * @param [string] options.additionalUA semi-colon separated string with other user agents to add
 * @param [boolean=true] options.withApiKey Send the api key as a header
 * @param [Object] options.headers Extra headers to send
 */
AlgoliaSearchCore.prototype._computeRequestHeaders = function(options) {
  var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

  var ua = options.additionalUA ?
    this._ua + '; ' + options.additionalUA :
    this._ua;

  var requestHeaders = {
    'x-algolia-agent': ua,
    'x-algolia-application-id': this.applicationID
  };

  // browser will inline headers in the url, node.js will use http headers
  // but in some situations, the API KEY will be too long (big secured API keys)
  // so if the request is a POST and the KEY is very long, we will be asked to not put
  // it into headers but in the JSON body
  if (options.withApiKey !== false) {
    requestHeaders['x-algolia-api-key'] = this.apiKey;
  }

  if (this.userToken) {
    requestHeaders['x-algolia-usertoken'] = this.userToken;
  }

  if (this.securityTags) {
    requestHeaders['x-algolia-tagfilters'] = this.securityTags;
  }

  forEach(this.extraHeaders, function addToRequestHeaders(value, key) {
    requestHeaders[key] = value;
  });

  if (options.headers) {
    forEach(options.headers, function addToRequestHeaders(value, key) {
      requestHeaders[key] = value;
    });
  }

  return requestHeaders;
};

/**
 * Search through multiple indices at the same time
 * @param  {Object[]}   queries  An array of queries you want to run.
 * @param {string} queries[].indexName The index name you want to target
 * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
 * @param {Object} queries[].params Any search param like hitsPerPage, ..
 * @param  {Function} callback Callback to be called
 * @return {Promise|undefined} Returns a promise if no callback given
 */
AlgoliaSearchCore.prototype.search = function(queries, opts, callback) {
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: client.search(arrayOfQueries[, callback])';

  if (!isArray(queries)) {
    throw new Error(usage);
  }

  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else if (opts === undefined) {
    opts = {};
  }

  var client = this;

  var postObj = {
    requests: map(queries, function prepareRequest(query) {
      var params = '';

      // allow query.query
      // so we are mimicing the index.search(query, params) method
      // {indexName:, query:, params:}
      if (query.query !== undefined) {
        params += 'query=' + encodeURIComponent(query.query);
      }

      return {
        indexName: query.indexName,
        params: client._getSearchParams(query.params, params)
      };
    })
  };

  var JSONPParams = map(postObj.requests, function prepareJSONPParams(request, requestId) {
    return requestId + '=' +
      encodeURIComponent(
        '/1/indexes/' + encodeURIComponent(request.indexName) + '?' +
        request.params
      );
  }).join('&');

  var url = '/1/indexes/*/queries';

  if (opts.strategy !== undefined) {
    postObj.strategy = opts.strategy;
  }

  return this._jsonRequest({
    cache: this.cache,
    method: 'POST',
    url: url,
    body: postObj,
    hostType: 'read',
    fallback: {
      method: 'GET',
      url: '/1/indexes/*',
      body: {
        params: JSONPParams
      }
    },
    callback: callback
  });
};

/**
* Search for facet values
* https://www.algolia.com/doc/rest-api/search#search-for-facet-values
* This is the top-level API for SFFV.
*
* @param {object[]} queries An array of queries to run.
* @param {string} queries[].indexName Index name, name of the index to search.
* @param {object} queries[].params Query parameters.
* @param {string} queries[].params.facetName Facet name, name of the attribute to search for values in.
* Must be declared as a facet
* @param {string} queries[].params.facetQuery Query for the facet search
* @param {string} [queries[].params.*] Any search parameter of Algolia,
* see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
* Pagination is not supported. The page and hitsPerPage parameters will be ignored.
*/
AlgoliaSearchCore.prototype.searchForFacetValues = function(queries) {
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: client.searchForFacetValues([{indexName, params: {facetName, facetQuery, ...params}}, ...queries])'; // eslint-disable-line max-len

  if (!isArray(queries)) {
    throw new Error(usage);
  }

  var client = this;

  return client._promise.all(map(queries, function performQuery(query) {
    if (
      !query ||
      query.indexName === undefined ||
      query.params.facetName === undefined ||
      query.params.facetQuery === undefined
    ) {
      throw new Error(usage);
    }

    var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
    var omit = __webpack_require__(/*! ./omit.js */ "./node_modules/algoliasearch/src/omit.js");

    var indexName = query.indexName;
    var params = query.params;

    var facetName = params.facetName;
    var filteredParams = omit(clone(params), function(keyName) {
      return keyName === 'facetName';
    });
    var searchParameters = client._getSearchParams(filteredParams, '');

    return client._jsonRequest({
      cache: client.cache,
      method: 'POST',
      url:
        '/1/indexes/' +
        encodeURIComponent(indexName) +
        '/facets/' +
        encodeURIComponent(facetName) +
        '/query',
      hostType: 'read',
      body: {params: searchParameters}
    });
  }));
};

/**
 * Set the extra security tagFilters header
 * @param {string|array} tags The list of tags defining the current security filters
 */
AlgoliaSearchCore.prototype.setSecurityTags = function(tags) {
  if (Object.prototype.toString.call(tags) === '[object Array]') {
    var strTags = [];
    for (var i = 0; i < tags.length; ++i) {
      if (Object.prototype.toString.call(tags[i]) === '[object Array]') {
        var oredTags = [];
        for (var j = 0; j < tags[i].length; ++j) {
          oredTags.push(tags[i][j]);
        }
        strTags.push('(' + oredTags.join(',') + ')');
      } else {
        strTags.push(tags[i]);
      }
    }
    tags = strTags.join(',');
  }

  this.securityTags = tags;
};

/**
 * Set the extra user token header
 * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
 */
AlgoliaSearchCore.prototype.setUserToken = function(userToken) {
  this.userToken = userToken;
};

/**
 * Clear all queries in client's cache
 * @return undefined
 */
AlgoliaSearchCore.prototype.clearCache = function() {
  this.cache = {};
};

/**
* Set the number of milliseconds a request can take before automatically being terminated.
* @deprecated
* @param {Number} milliseconds
*/
AlgoliaSearchCore.prototype.setRequestTimeout = function(milliseconds) {
  if (milliseconds) {
    this._timeouts.connect = this._timeouts.read = this._timeouts.write = milliseconds;
  }
};

/**
* Set the three different (connect, read, write) timeouts to be used when requesting
* @param {Object} timeouts
*/
AlgoliaSearchCore.prototype.setTimeouts = function(timeouts) {
  this._timeouts = timeouts;
};

/**
* Get the three different (connect, read, write) timeouts to be used when requesting
* @param {Object} timeouts
*/
AlgoliaSearchCore.prototype.getTimeouts = function() {
  return this._timeouts;
};

AlgoliaSearchCore.prototype._getAppIdData = function() {
  var data = store.get(this.applicationID);
  if (data !== null) this._cacheAppIdData(data);
  return data;
};

AlgoliaSearchCore.prototype._setAppIdData = function(data) {
  data.lastChange = (new Date()).getTime();
  this._cacheAppIdData(data);
  return store.set(this.applicationID, data);
};

AlgoliaSearchCore.prototype._checkAppIdData = function() {
  var data = this._getAppIdData();
  var now = (new Date()).getTime();
  if (data === null || now - data.lastChange > RESET_APP_DATA_TIMER) {
    return this._resetInitialAppIdData(data);
  }

  return data;
};

AlgoliaSearchCore.prototype._resetInitialAppIdData = function(data) {
  var newData = data || {};
  newData.hostIndexes = {read: 0, write: 0};
  newData.timeoutMultiplier = 1;
  newData.shuffleResult = newData.shuffleResult || shuffle([1, 2, 3]);
  return this._setAppIdData(newData);
};

AlgoliaSearchCore.prototype._cacheAppIdData = function(data) {
  this._hostIndexes = data.hostIndexes;
  this._timeoutMultiplier = data.timeoutMultiplier;
  this._shuffleResult = data.shuffleResult;
};

AlgoliaSearchCore.prototype._partialAppIdDataUpdate = function(newData) {
  var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");
  var currentData = this._getAppIdData();
  foreach(newData, function(value, key) {
    currentData[key] = value;
  });

  return this._setAppIdData(currentData);
};

AlgoliaSearchCore.prototype._getHostByType = function(hostType) {
  return this.hosts[hostType][this._getHostIndexByType(hostType)];
};

AlgoliaSearchCore.prototype._getTimeoutMultiplier = function() {
  return this._timeoutMultiplier;
};

AlgoliaSearchCore.prototype._getHostIndexByType = function(hostType) {
  return this._hostIndexes[hostType];
};

AlgoliaSearchCore.prototype._setHostIndexByType = function(hostIndex, hostType) {
  var clone = __webpack_require__(/*! ./clone */ "./node_modules/algoliasearch/src/clone.js");
  var newHostIndexes = clone(this._hostIndexes);
  newHostIndexes[hostType] = hostIndex;
  this._partialAppIdDataUpdate({hostIndexes: newHostIndexes});
  return hostIndex;
};

AlgoliaSearchCore.prototype._incrementHostIndex = function(hostType) {
  return this._setHostIndexByType(
    (this._getHostIndexByType(hostType) + 1) % this.hosts[hostType].length, hostType
  );
};

AlgoliaSearchCore.prototype._incrementTimeoutMultipler = function() {
  var timeoutMultiplier = Math.max(this._timeoutMultiplier + 1, 4);
  return this._partialAppIdDataUpdate({timeoutMultiplier: timeoutMultiplier});
};

AlgoliaSearchCore.prototype._getTimeoutsForRequest = function(hostType) {
  return {
    connect: this._timeouts.connect * this._timeoutMultiplier,
    complete: this._timeouts[hostType] * this._timeoutMultiplier
  };
};

function prepareHost(protocol) {
  return function prepare(host) {
    return protocol + '//' + host.toLowerCase();
  };
}

// Prototype.js < 1.7, a widely used library, defines a weird
// Array.prototype.toJSON function that will fail to stringify our content
// appropriately
// refs:
//   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
//   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
//   - http://stackoverflow.com/a/3148441/147079
function safeJSONStringify(obj) {
  /* eslint no-extend-native:0 */

  if (Array.prototype.toJSON === undefined) {
    return JSON.stringify(obj);
  }

  var toJSON = Array.prototype.toJSON;
  delete Array.prototype.toJSON;
  var out = JSON.stringify(obj);
  Array.prototype.toJSON = toJSON;

  return out;
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function removeCredentials(headers) {
  var newHeaders = {};

  for (var headerName in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, headerName)) {
      var value;

      if (headerName === 'x-algolia-api-key' || headerName === 'x-algolia-application-id') {
        value = '**hidden for security purposes**';
      } else {
        value = headers[headerName];
      }

      newHeaders[headerName] = value;
    }
  }

  return newHeaders;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/algoliasearch/src/IndexCore.js":
/*!*****************************************************!*\
  !*** ./node_modules/algoliasearch/src/IndexCore.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var buildSearchMethod = __webpack_require__(/*! ./buildSearchMethod.js */ "./node_modules/algoliasearch/src/buildSearchMethod.js");
var deprecate = __webpack_require__(/*! ./deprecate.js */ "./node_modules/algoliasearch/src/deprecate.js");
var deprecatedMessage = __webpack_require__(/*! ./deprecatedMessage.js */ "./node_modules/algoliasearch/src/deprecatedMessage.js");

module.exports = IndexCore;

/*
* Index class constructor.
* You should not use this method directly but use initIndex() function
*/
function IndexCore(algoliasearch, indexName) {
  this.indexName = indexName;
  this.as = algoliasearch;
  this.typeAheadArgs = null;
  this.typeAheadValueOption = null;

  // make sure every index instance has it's own cache
  this.cache = {};
}

/*
* Clear all queries in cache
*/
IndexCore.prototype.clearCache = function() {
  this.cache = {};
};

/*
* Search inside the index using XMLHttpRequest request (Using a POST query to
* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
*
* @param {string} [query] the full text query
* @param {object} [args] (optional) if set, contains an object with query parameters:
* - page: (integer) Pagination parameter used to select the page to retrieve.
*                   Page is zero-based and defaults to 0. Thus,
*                   to retrieve the 10th page you need to set page=9
* - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
* - attributesToRetrieve: a string that contains the list of object attributes
* you want to retrieve (let you minimize the answer size).
*   Attributes are separated with a comma (for example "name,address").
*   You can also use an array (for example ["name","address"]).
*   By default, all attributes are retrieved. You can also use '*' to retrieve all
*   values when an attributesToRetrieve setting is specified for your index.
* - attributesToHighlight: a string that contains the list of attributes you
*   want to highlight according to the query.
*   Attributes are separated by a comma. You can also use an array (for example ["name","address"]).
*   If an attribute has no match for the query, the raw value is returned.
*   By default all indexed text attributes are highlighted.
*   You can use `*` if you want to highlight all textual attributes.
*   Numerical attributes are not highlighted.
*   A matchLevel is returned for each highlighted attribute and can contain:
*      - full: if all the query terms were found in the attribute,
*      - partial: if only some of the query terms were found,
*      - none: if none of the query terms were found.
* - attributesToSnippet: a string that contains the list of attributes to snippet alongside
* the number of words to return (syntax is `attributeName:nbWords`).
*    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
*    You can also use an array (Example: attributesToSnippet: ['name:10','content:10']).
*    By default no snippet is computed.
* - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word.
* Defaults to 3.
* - minWordSizefor2Typos: the minimum number of characters in a query word
* to accept two typos in this word. Defaults to 7.
* - getRankingInfo: if set to 1, the result hits will contain ranking
* information in _rankingInfo attribute.
* - aroundLatLng: search for entries around a given
* latitude/longitude (specified as two floats separated by a comma).
*   For example aroundLatLng=47.316669,5.016670).
*   You can specify the maximum distance in meters with the aroundRadius parameter (in meters)
*   and the precision for ranking with aroundPrecision
*   (for example if you set aroundPrecision=100, two objects that are distant of
*   less than 100m will be considered as identical for "geo" ranking parameter).
*   At indexing, you should specify geoloc of an object with the _geoloc attribute
*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
* - insideBoundingBox: search entries inside a given area defined by the two extreme points
* of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
*   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
*   At indexing, you should specify geoloc of an object with the _geoloc attribute
*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
* - numericFilters: a string that contains the list of numeric filters you want to
* apply separated by a comma.
*   The syntax of one filter is `attributeName` followed by `operand` followed by `value`.
*   Supported operands are `<`, `<=`, `=`, `>` and `>=`.
*   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
*   You can also use an array (for example numericFilters: ["price>100","price<1000"]).
* - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
*   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
*   You can also use an array, for example tagFilters: ["tag1",["tag2","tag3"]]
*   means tag1 AND (tag2 OR tag3).
*   At indexing, tags should be added in the _tags** attribute
*   of objects (for example {"_tags":["tag1","tag2"]}).
* - facetFilters: filter the query by a list of facets.
*   Facets are separated by commas and each facet is encoded as `attributeName:value`.
*   For example: `facetFilters=category:Book,author:John%20Doe`.
*   You can also use an array (for example `["category:Book","author:John%20Doe"]`).
* - facets: List of object attributes that you want to use for faceting.
*   Comma separated list: `"category,author"` or array `['category','author']`
*   Only attributes that have been added in **attributesForFaceting** index setting
*   can be used in this parameter.
*   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
* - queryType: select how the query words are interpreted, it can be one of the following value:
*    - prefixAll: all query words are interpreted as prefixes,
*    - prefixLast: only the last word is interpreted as a prefix (default behavior),
*    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
* - optionalWords: a string that contains the list of words that should
* be considered as optional when found in the query.
*   Comma separated and array are accepted.
* - distinct: If set to 1, enable the distinct feature (disabled by default)
* if the attributeForDistinct index setting is set.
*   This feature is similar to the SQL "distinct" keyword: when enabled
*   in a query with the distinct=1 parameter,
*   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
*   For example, if the chosen attribute is show_name and several hits have
*   the same value for show_name, then only the best
*   one is kept and others are removed.
* - restrictSearchableAttributes: List of attributes you want to use for
* textual search (must be a subset of the attributesToIndex index setting)
* either comma separated or as an array
* @param {function} [callback] the result callback called with two arguments:
*  error: null or Error('message'). If false, the content contains the error.
*  content: the server answer that contains the list of results.
*/
IndexCore.prototype.search = buildSearchMethod('query');

/*
* -- BETA --
* Search a record similar to the query inside the index using XMLHttpRequest request (Using a POST query to
* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
*
* @param {string} [query] the similar query
* @param {object} [args] (optional) if set, contains an object with query parameters.
*   All search parameters are supported (see search function), restrictSearchableAttributes and facetFilters
*   are the two most useful to restrict the similar results and get more relevant content
*/
IndexCore.prototype.similarSearch = deprecate(
  buildSearchMethod('similarQuery'),
  deprecatedMessage(
    'index.similarSearch(query[, callback])',
    'index.search({ similarQuery: query }[, callback])'
  )
);

/*
* Browse index content. The response content will have a `cursor` property that you can use
* to browse subsequent pages for this query. Use `index.browseFrom(cursor)` when you want.
*
* @param {string} query - The full text query
* @param {Object} [queryParameters] - Any search query parameter
* @param {Function} [callback] - The result callback called with two arguments
*   error: null or Error('message')
*   content: the server answer with the browse result
* @return {Promise|undefined} Returns a promise if no callback given
* @example
* index.browse('cool songs', {
*   tagFilters: 'public,comments',
*   hitsPerPage: 500
* }, callback);
* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
*/
IndexCore.prototype.browse = function(query, queryParameters, callback) {
  var merge = __webpack_require__(/*! ./merge.js */ "./node_modules/algoliasearch/src/merge.js");

  var indexObj = this;

  var page;
  var hitsPerPage;

  // we check variadic calls that are not the one defined
  // .browse()/.browse(fn)
  // => page = 0
  if (arguments.length === 0 || arguments.length === 1 && typeof arguments[0] === 'function') {
    page = 0;
    callback = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'number') {
    // .browse(2)/.browse(2, 10)/.browse(2, fn)/.browse(2, 10, fn)
    page = arguments[0];
    if (typeof arguments[1] === 'number') {
      hitsPerPage = arguments[1];
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
      hitsPerPage = undefined;
    }
    query = undefined;
    queryParameters = undefined;
  } else if (typeof arguments[0] === 'object') {
    // .browse(queryParameters)/.browse(queryParameters, cb)
    if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }
    queryParameters = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
    // .browse(query, cb)
    callback = arguments[1];
    queryParameters = undefined;
  }

  // otherwise it's a .browse(query)/.browse(query, queryParameters)/.browse(query, queryParameters, cb)

  // get search query parameters combining various possible calls
  // to .browse();
  queryParameters = merge({}, queryParameters || {}, {
    page: page,
    hitsPerPage: hitsPerPage,
    query: query
  });

  var params = this.as._getSearchParams(queryParameters, '');

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse',
    body: {params: params},
    hostType: 'read',
    callback: callback
  });
};

/*
* Continue browsing from a previous position (cursor), obtained via a call to `.browse()`.
*
* @param {string} query - The full text query
* @param {Object} [queryParameters] - Any search query parameter
* @param {Function} [callback] - The result callback called with two arguments
*   error: null or Error('message')
*   content: the server answer with the browse result
* @return {Promise|undefined} Returns a promise if no callback given
* @example
* index.browseFrom('14lkfsakl32', callback);
* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
*/
IndexCore.prototype.browseFrom = function(cursor, callback) {
  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse',
    body: {cursor: cursor},
    hostType: 'read',
    callback: callback
  });
};

/*
* Search for facet values
* https://www.algolia.com/doc/rest-api/search#search-for-facet-values
*
* @param {string} params.facetName Facet name, name of the attribute to search for values in.
* Must be declared as a facet
* @param {string} params.facetQuery Query for the facet search
* @param {string} [params.*] Any search parameter of Algolia,
* see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
* Pagination is not supported. The page and hitsPerPage parameters will be ignored.
* @param callback (optional)
*/
IndexCore.prototype.searchForFacetValues = function(params, callback) {
  var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
  var omit = __webpack_require__(/*! ./omit.js */ "./node_modules/algoliasearch/src/omit.js");
  var usage = 'Usage: index.searchForFacetValues({facetName, facetQuery, ...params}[, callback])';

  if (params.facetName === undefined || params.facetQuery === undefined) {
    throw new Error(usage);
  }

  var facetName = params.facetName;
  var filteredParams = omit(clone(params), function(keyName) {
    return keyName === 'facetName';
  });
  var searchParameters = this.as._getSearchParams(filteredParams, '');

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' +
      encodeURIComponent(this.indexName) + '/facets/' + encodeURIComponent(facetName) + '/query',
    hostType: 'read',
    body: {params: searchParameters},
    callback: callback
  });
};

IndexCore.prototype.searchFacet = deprecate(function(params, callback) {
  return this.searchForFacetValues(params, callback);
}, deprecatedMessage(
  'index.searchFacet(params[, callback])',
  'index.searchForFacetValues(params[, callback])'
));

IndexCore.prototype._search = function(params, url, callback, additionalUA) {
  return this.as._jsonRequest({
    cache: this.cache,
    method: 'POST',
    url: url || '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
    body: {params: params},
    hostType: 'read',
    fallback: {
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(this.indexName),
      body: {params: params}
    },
    callback: callback,
    additionalUA: additionalUA
  });
};

/*
* Get an object from this index
*
* @param objectID the unique identifier of the object to retrieve
* @param attrs (optional) if set, contains the array of attribute names to retrieve
* @param callback (optional) the result callback called with two arguments
*  error: null or Error('message')
*  content: the object to retrieve or the error message if a failure occurred
*/
IndexCore.prototype.getObject = function(objectID, attrs, callback) {
  var indexObj = this;

  if (arguments.length === 1 || typeof attrs === 'function') {
    callback = attrs;
    attrs = undefined;
  }

  var params = '';
  if (attrs !== undefined) {
    params = '?attributes=';
    for (var i = 0; i < attrs.length; ++i) {
      if (i !== 0) {
        params += ',';
      }
      params += attrs[i];
    }
  }

  return this.as._jsonRequest({
    method: 'GET',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
    hostType: 'read',
    callback: callback
  });
};

/*
* Get several objects from this index
*
* @param objectIDs the array of unique identifier of objects to retrieve
*/
IndexCore.prototype.getObjects = function(objectIDs, attributesToRetrieve, callback) {
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: index.getObjects(arrayOfObjectIDs[, callback])';

  if (!isArray(objectIDs)) {
    throw new Error(usage);
  }

  var indexObj = this;

  if (arguments.length === 1 || typeof attributesToRetrieve === 'function') {
    callback = attributesToRetrieve;
    attributesToRetrieve = undefined;
  }

  var body = {
    requests: map(objectIDs, function prepareRequest(objectID) {
      var request = {
        indexName: indexObj.indexName,
        objectID: objectID
      };

      if (attributesToRetrieve) {
        request.attributesToRetrieve = attributesToRetrieve.join(',');
      }

      return request;
    })
  };

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/*/objects',
    hostType: 'read',
    body: body,
    callback: callback
  });
};

IndexCore.prototype.as = null;
IndexCore.prototype.indexName = null;
IndexCore.prototype.typeAheadArgs = null;
IndexCore.prototype.typeAheadValueOption = null;


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js":
/*!****************************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AlgoliaSearchCore = __webpack_require__(/*! ../../AlgoliaSearchCore.js */ "./node_modules/algoliasearch/src/AlgoliaSearchCore.js");
var createAlgoliasearch = __webpack_require__(/*! ../createAlgoliasearch.js */ "./node_modules/algoliasearch/src/browser/createAlgoliasearch.js");

module.exports = createAlgoliasearch(AlgoliaSearchCore, 'Browser (lite)');


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/createAlgoliasearch.js":
/*!***********************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/createAlgoliasearch.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! global */ "./node_modules/global/window.js");
var Promise = global.Promise || __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").Promise;

// This is the standalone browser build entry point
// Browser implementation of the Algolia Search JavaScript client,
// using XMLHttpRequest, XDomainRequest and JSONP as fallback
module.exports = function createAlgoliasearch(AlgoliaSearch, uaSuffix) {
  var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
  var errors = __webpack_require__(/*! ../errors */ "./node_modules/algoliasearch/src/errors.js");
  var inlineHeaders = __webpack_require__(/*! ./inline-headers */ "./node_modules/algoliasearch/src/browser/inline-headers.js");
  var jsonpRequest = __webpack_require__(/*! ./jsonp-request */ "./node_modules/algoliasearch/src/browser/jsonp-request.js");
  var places = __webpack_require__(/*! ../places.js */ "./node_modules/algoliasearch/src/places.js");
  uaSuffix = uaSuffix || '';

  if (false) {}

  function algoliasearch(applicationID, apiKey, opts) {
    var cloneDeep = __webpack_require__(/*! ../clone.js */ "./node_modules/algoliasearch/src/clone.js");

    opts = cloneDeep(opts || {});

    opts._ua = opts._ua || algoliasearch.ua;

    return new AlgoliaSearchBrowser(applicationID, apiKey, opts);
  }

  algoliasearch.version = __webpack_require__(/*! ../version.js */ "./node_modules/algoliasearch/src/version.js");

  algoliasearch.ua =
    'Algolia for JavaScript (' + algoliasearch.version + '); ' + uaSuffix;

  algoliasearch.initPlaces = places(algoliasearch);

  // we expose into window no matter how we are used, this will allow
  // us to easily debug any website running algolia
  global.__algolia = {
    debug: __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js"),
    algoliasearch: algoliasearch
  };

  var support = {
    hasXMLHttpRequest: 'XMLHttpRequest' in global,
    hasXDomainRequest: 'XDomainRequest' in global
  };

  if (support.hasXMLHttpRequest) {
    support.cors = 'withCredentials' in new XMLHttpRequest();
  }

  function AlgoliaSearchBrowser() {
    // call AlgoliaSearch constructor
    AlgoliaSearch.apply(this, arguments);
  }

  inherits(AlgoliaSearchBrowser, AlgoliaSearch);

  AlgoliaSearchBrowser.prototype._request = function request(url, opts) {
    return new Promise(function wrapRequest(resolve, reject) {
      // no cors or XDomainRequest, no request
      if (!support.cors && !support.hasXDomainRequest) {
        // very old browser, not supported
        reject(new errors.Network('CORS not supported'));
        return;
      }

      url = inlineHeaders(url, opts.headers);

      var body = opts.body;
      var req = support.cors ? new XMLHttpRequest() : new XDomainRequest();
      var reqTimeout;
      var timedOut;
      var connected = false;

      reqTimeout = setTimeout(onTimeout, opts.timeouts.connect);
      // we set an empty onprogress listener
      // so that XDomainRequest on IE9 is not aborted
      // refs:
      //  - https://github.com/algolia/algoliasearch-client-js/issues/76
      //  - https://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
      req.onprogress = onProgress;
      if ('onreadystatechange' in req) req.onreadystatechange = onReadyStateChange;
      req.onload = onLoad;
      req.onerror = onError;

      // do not rely on default XHR async flag, as some analytics code like hotjar
      // breaks it and set it to false by default
      if (req instanceof XMLHttpRequest) {
        req.open(opts.method, url, true);

        // The Analytics API never accepts Auth headers as query string
        // this option exists specifically for them.
        if (opts.forceAuthHeaders) {
          req.setRequestHeader(
            'x-algolia-application-id',
            opts.headers['x-algolia-application-id']
          );
          req.setRequestHeader(
            'x-algolia-api-key',
            opts.headers['x-algolia-api-key']
          );
        }
      } else {
        req.open(opts.method, url);
      }

      // headers are meant to be sent after open
      if (support.cors) {
        if (body) {
          if (opts.method === 'POST') {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
            req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
          } else {
            req.setRequestHeader('content-type', 'application/json');
          }
        }
        req.setRequestHeader('accept', 'application/json');
      }

      if (body) {
        req.send(body);
      } else {
        req.send();
      }

      // event object not received in IE8, at least
      // but we do not use it, still important to note
      function onLoad(/* event */) {
        // When browser does not supports req.timeout, we can
        // have both a load and timeout event, since handled by a dumb setTimeout
        if (timedOut) {
          return;
        }

        clearTimeout(reqTimeout);

        var out;

        try {
          out = {
            body: JSON.parse(req.responseText),
            responseText: req.responseText,
            statusCode: req.status,
            // XDomainRequest does not have any response headers
            headers: req.getAllResponseHeaders && req.getAllResponseHeaders() || {}
          };
        } catch (e) {
          out = new errors.UnparsableJSON({
            more: req.responseText
          });
        }

        if (out instanceof errors.UnparsableJSON) {
          reject(out);
        } else {
          resolve(out);
        }
      }

      function onError(event) {
        if (timedOut) {
          return;
        }

        clearTimeout(reqTimeout);

        // error event is trigerred both with XDR/XHR on:
        //   - DNS error
        //   - unallowed cross domain request
        reject(
          new errors.Network({
            more: event
          })
        );
      }

      function onTimeout() {
        timedOut = true;
        req.abort();

        reject(new errors.RequestTimeout());
      }

      function onConnect() {
        connected = true;
        clearTimeout(reqTimeout);
        reqTimeout = setTimeout(onTimeout, opts.timeouts.complete);
      }

      function onProgress() {
        if (!connected) onConnect();
      }

      function onReadyStateChange() {
        if (!connected && req.readyState > 1) onConnect();
      }
    });
  };

  AlgoliaSearchBrowser.prototype._request.fallback = function requestFallback(url, opts) {
    url = inlineHeaders(url, opts.headers);

    return new Promise(function wrapJsonpRequest(resolve, reject) {
      jsonpRequest(url, opts, function jsonpRequestDone(err, content) {
        if (err) {
          reject(err);
          return;
        }

        resolve(content);
      });
    });
  };

  AlgoliaSearchBrowser.prototype._promise = {
    reject: function rejectPromise(val) {
      return Promise.reject(val);
    },
    resolve: function resolvePromise(val) {
      return Promise.resolve(val);
    },
    delay: function delayPromise(ms) {
      return new Promise(function resolveOnTimeout(resolve/* , reject*/) {
        setTimeout(resolve, ms);
      });
    },
    all: function all(promises) {
      return Promise.all(promises);
    }
  };

  return algoliasearch;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/inline-headers.js":
/*!******************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/inline-headers.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = inlineHeaders;

var encode = __webpack_require__(/*! querystring-es3/encode */ "./node_modules/querystring-es3/encode.js");

function inlineHeaders(url, headers) {
  if (/\?/.test(url)) {
    url += '&';
  } else {
    url += '?';
  }

  return url + encode(headers);
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/jsonp-request.js":
/*!*****************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/jsonp-request.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = jsonpRequest;

var errors = __webpack_require__(/*! ../errors */ "./node_modules/algoliasearch/src/errors.js");

var JSONPCounter = 0;

function jsonpRequest(url, opts, cb) {
  if (opts.method !== 'GET') {
    cb(new Error('Method ' + opts.method + ' ' + url + ' is not supported by JSONP.'));
    return;
  }

  opts.debug('JSONP: start');

  var cbCalled = false;
  var timedOut = false;

  JSONPCounter += 1;
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  var cbName = 'algoliaJSONP_' + JSONPCounter;
  var done = false;

  window[cbName] = function(data) {
    removeGlobals();

    if (timedOut) {
      opts.debug('JSONP: Late answer, ignoring');
      return;
    }

    cbCalled = true;

    clean();

    cb(null, {
      body: data,
      responseText: JSON.stringify(data)/* ,
      // We do not send the statusCode, there's no statusCode in JSONP, it will be
      // computed using data.status && data.message like with XDR
      statusCode*/
    });
  };

  // add callback by hand
  url += '&callback=' + cbName;

  // add body params manually
  if (opts.jsonBody && opts.jsonBody.params) {
    url += '&' + opts.jsonBody.params;
  }

  var ontimeout = setTimeout(timeout, opts.timeouts.complete);

  // script onreadystatechange needed only for
  // <= IE8
  // https://github.com/angular/angular.js/issues/4523
  script.onreadystatechange = readystatechange;
  script.onload = success;
  script.onerror = error;

  script.async = true;
  script.defer = true;
  script.src = url;
  head.appendChild(script);

  function success() {
    opts.debug('JSONP: success');

    if (done || timedOut) {
      return;
    }

    done = true;

    // script loaded but did not call the fn => script loading error
    if (!cbCalled) {
      opts.debug('JSONP: Fail. Script loaded but did not call the callback');
      clean();
      cb(new errors.JSONPScriptFail());
    }
  }

  function readystatechange() {
    if (this.readyState === 'loaded' || this.readyState === 'complete') {
      success();
    }
  }

  function clean() {
    clearTimeout(ontimeout);
    script.onload = null;
    script.onreadystatechange = null;
    script.onerror = null;
    head.removeChild(script);
  }

  function removeGlobals() {
    try {
      delete window[cbName];
      delete window[cbName + '_loaded'];
    } catch (e) {
      window[cbName] = window[cbName + '_loaded'] = undefined;
    }
  }

  function timeout() {
    opts.debug('JSONP: Script timeout');
    timedOut = true;
    clean();
    cb(new errors.RequestTimeout());
  }

  function error() {
    opts.debug('JSONP: Script error');

    if (done || timedOut) {
      return;
    }

    clean();
    cb(new errors.JSONPScriptError());
  }
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/buildSearchMethod.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/buildSearchMethod.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = buildSearchMethod;

var errors = __webpack_require__(/*! ./errors.js */ "./node_modules/algoliasearch/src/errors.js");

/**
 * Creates a search method to be used in clients
 * @param {string} queryParam the name of the attribute used for the query
 * @param {string} url the url
 * @return {function} the search method
 */
function buildSearchMethod(queryParam, url) {
  /**
   * The search method. Prepares the data and send the query to Algolia.
   * @param {string} query the string used for query search
   * @param {object} args additional parameters to send with the search
   * @param {function} [callback] the callback to be called with the client gets the answer
   * @return {undefined|Promise} If the callback is not provided then this methods returns a Promise
   */
  return function search(query, args, callback) {
    // warn V2 users on how to search
    if (typeof query === 'function' && typeof args === 'object' ||
      typeof callback === 'object') {
      // .search(query, params, cb)
      // .search(cb, params)
      throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
    }

    // Normalizing the function signature
    if (arguments.length === 0 || typeof query === 'function') {
      // Usage : .search(), .search(cb)
      callback = query;
      query = '';
    } else if (arguments.length === 1 || typeof args === 'function') {
      // Usage : .search(query/args), .search(query, cb)
      callback = args;
      args = undefined;
    }
    // At this point we have 3 arguments with values

    // Usage : .search(args) // careful: typeof null === 'object'
    if (typeof query === 'object' && query !== null) {
      args = query;
      query = undefined;
    } else if (query === undefined || query === null) { // .search(undefined/null)
      query = '';
    }

    var params = '';

    if (query !== undefined) {
      params += queryParam + '=' + encodeURIComponent(query);
    }

    var additionalUA;
    if (args !== undefined) {
      if (args.additionalUA) {
        additionalUA = args.additionalUA;
        delete args.additionalUA;
      }
      // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
      params = this.as._getSearchParams(args, params);
    }


    return this._search(params, url, callback, additionalUA);
  };
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/clone.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/clone.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/deprecate.js":
/*!*****************************************************!*\
  !*** ./node_modules/algoliasearch/src/deprecate.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function deprecate(fn, message) {
  var warned = false;

  function deprecated() {
    if (!warned) {
      /* eslint no-console:0 */
      console.warn(message);
      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/deprecatedMessage.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/deprecatedMessage.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function deprecatedMessage(previousUsage, newUsage) {
  var githubAnchorLink = previousUsage.toLowerCase()
    .replace(/[\.\(\)]/g, '');

  return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage +
    '`. Please see https://github.com/algolia/algoliasearch-client-javascript/wiki/Deprecated#' + githubAnchorLink;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/errors.js":
/*!**************************************************!*\
  !*** ./node_modules/algoliasearch/src/errors.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This file hosts our error definitions
// We use custom error "types" so that we can act on them when we need it
// e.g.: if error instanceof errors.UnparsableJSON then..

var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

function AlgoliaSearchError(message, extraProperties) {
  var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

  var error = this;

  // try to get a stacktrace
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    error.stack = (new Error()).stack || 'Cannot get a stacktrace, browser is too old';
  }

  this.name = 'AlgoliaSearchError';
  this.message = message || 'Unknown error';

  if (extraProperties) {
    forEach(extraProperties, function addToErrorObject(value, key) {
      error[key] = value;
    });
  }
}

inherits(AlgoliaSearchError, Error);

function createCustomError(name, message) {
  function AlgoliaSearchCustomError() {
    var args = Array.prototype.slice.call(arguments, 0);

    // custom message not set, use default
    if (typeof args[0] !== 'string') {
      args.unshift(message);
    }

    AlgoliaSearchError.apply(this, args);
    this.name = 'AlgoliaSearch' + name + 'Error';
  }

  inherits(AlgoliaSearchCustomError, AlgoliaSearchError);

  return AlgoliaSearchCustomError;
}

// late exports to let various fn defs and inherits take place
module.exports = {
  AlgoliaSearchError: AlgoliaSearchError,
  UnparsableJSON: createCustomError(
    'UnparsableJSON',
    'Could not parse the incoming response as JSON, see err.more for details'
  ),
  RequestTimeout: createCustomError(
    'RequestTimeout',
    'Request timed out before getting a response'
  ),
  Network: createCustomError(
    'Network',
    'Network issue, see err.more for details'
  ),
  JSONPScriptFail: createCustomError(
    'JSONPScriptFail',
    '<script> was loaded but did not call our provided callback'
  ),
  ValidUntilNotFound: createCustomError(
    'ValidUntilNotFound',
    'The SecuredAPIKey does not have a validUntil parameter.'
  ),
  JSONPScriptError: createCustomError(
    'JSONPScriptError',
    '<script> unable to load due to an `error` event on it'
  ),
  ObjectNotFound: createCustomError(
    'ObjectNotFound',
    'Object not found'
  ),
  Unknown: createCustomError(
    'Unknown',
    'Unknown error occured'
  )
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/exitPromise.js":
/*!*******************************************************!*\
  !*** ./node_modules/algoliasearch/src/exitPromise.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Parse cloud does not supports setTimeout
// We do not store a setTimeout reference in the client everytime
// We only fallback to a fake setTimeout when not available
// setTimeout cannot be override globally sadly
module.exports = function exitPromise(fn, _setTimeout) {
  _setTimeout(fn, 0);
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/map.js":
/*!***********************************************!*\
  !*** ./node_modules/algoliasearch/src/map.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

module.exports = function map(arr, fn) {
  var newArr = [];
  foreach(arr, function(item, itemIndex) {
    newArr.push(fn(item, itemIndex, arr));
  });
  return newArr;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/merge.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/merge.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

module.exports = function merge(destination/* , sources */) {
  var sources = Array.prototype.slice.call(arguments);

  foreach(sources, function(source) {
    for (var keyName in source) {
      if (source.hasOwnProperty(keyName)) {
        if (typeof destination[keyName] === 'object' && typeof source[keyName] === 'object') {
          destination[keyName] = merge({}, destination[keyName], source[keyName]);
        } else if (source[keyName] !== undefined) {
          destination[keyName] = source[keyName];
        }
      }
    }
  });

  return destination;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/omit.js":
/*!************************************************!*\
  !*** ./node_modules/algoliasearch/src/omit.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function omit(obj, test) {
  var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
  var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

  var filtered = {};

  foreach(keys(obj), function doFilter(keyName) {
    if (test(keyName) !== true) {
      filtered[keyName] = obj[keyName];
    }
  });

  return filtered;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/places.js":
/*!**************************************************!*\
  !*** ./node_modules/algoliasearch/src/places.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = createPlacesClient;

var qs3 = __webpack_require__(/*! querystring-es3 */ "./node_modules/querystring-es3/index.js");
var buildSearchMethod = __webpack_require__(/*! ./buildSearchMethod.js */ "./node_modules/algoliasearch/src/buildSearchMethod.js");

function createPlacesClient(algoliasearch) {
  return function places(appID, apiKey, opts) {
    var cloneDeep = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");

    opts = opts && cloneDeep(opts) || {};
    opts.hosts = opts.hosts || [
      'places-dsn.algolia.net',
      'places-1.algolianet.com',
      'places-2.algolianet.com',
      'places-3.algolianet.com'
    ];

    // allow initPlaces() no arguments => community rate limited
    if (arguments.length === 0 || typeof appID === 'object' || appID === undefined) {
      appID = '';
      apiKey = '';
      opts._allowEmptyCredentials = true;
    }

    var client = algoliasearch(appID, apiKey, opts);
    var index = client.initIndex('places');
    index.search = buildSearchMethod('query', '/1/places/query');
    index.reverse = function(options, callback) {
      var encoded = qs3.encode(options);

      return this.as._jsonRequest({
        method: 'GET',
        url: '/1/places/reverse?' + encoded,
        hostType: 'read',
        callback: callback
      });
    };

    index.getObject = function(objectID, callback) {
      return this.as._jsonRequest({
        method: 'GET',
        url: '/1/places/' + encodeURIComponent(objectID),
        hostType: 'read',
        callback: callback
      });
    };
    return index;
  };
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/store.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/store.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('algoliasearch:src/hostIndexState.js');
var localStorageNamespace = 'algoliasearch-client-js';

var store;
var moduleStore = {
  state: {},
  set: function(key, data) {
    this.state[key] = data;
    return this.state[key];
  },
  get: function(key) {
    return this.state[key] || null;
  }
};

var localStorageStore = {
  set: function(key, data) {
    moduleStore.set(key, data); // always replicate localStorageStore to moduleStore in case of failure

    try {
      var namespace = JSON.parse(global.localStorage[localStorageNamespace]);
      namespace[key] = data;
      global.localStorage[localStorageNamespace] = JSON.stringify(namespace);
      return namespace[key];
    } catch (e) {
      return localStorageFailure(key, e);
    }
  },
  get: function(key) {
    try {
      return JSON.parse(global.localStorage[localStorageNamespace])[key] || null;
    } catch (e) {
      return localStorageFailure(key, e);
    }
  }
};

function localStorageFailure(key, e) {
  debug('localStorage failed with', e);
  cleanup();
  store = moduleStore;
  return store.get(key);
}

store = supportsLocalStorage() ? localStorageStore : moduleStore;

module.exports = {
  get: getOrSet,
  set: getOrSet,
  supportsLocalStorage: supportsLocalStorage
};

function getOrSet(key, data) {
  if (arguments.length === 1) {
    return store.get(key);
  }

  return store.set(key, data);
}

function supportsLocalStorage() {
  try {
    if ('localStorage' in global &&
      global.localStorage !== null) {
      if (!global.localStorage[localStorageNamespace]) {
        // actual creation of the namespace
        global.localStorage.setItem(localStorageNamespace, JSON.stringify({}));
      }
      return true;
    }

    return false;
  } catch (_) {
    return false;
  }
}

// In case of any error on localStorage, we clean our own namespace, this should handle
// quota errors when a lot of keys + data are used
function cleanup() {
  try {
    global.localStorage.removeItem(localStorageNamespace);
  } catch (_) {
    // nothing to do
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/algoliasearch/src/version.js":
/*!***************************************************!*\
  !*** ./node_modules/algoliasearch/src/version.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = '3.35.1';


/***/ }),

/***/ "./node_modules/autocomplete.js/index.js":
/*!***********************************************!*\
  !*** ./node_modules/autocomplete.js/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./src/standalone/ */ "./node_modules/autocomplete.js/src/standalone/index.js");


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/css.js":
/*!**************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/css.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");

var css = {
  wrapper: {
    position: 'relative',
    display: 'inline-block'
  },
  hint: {
    position: 'absolute',
    top: '0',
    left: '0',
    borderColor: 'transparent',
    boxShadow: 'none',
    // #741: fix hint opacity issue on iOS
    opacity: '1'
  },
  input: {
    position: 'relative',
    verticalAlign: 'top',
    backgroundColor: 'transparent'
  },
  inputWithNoHint: {
    position: 'relative',
    verticalAlign: 'top'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '100',
    display: 'none'
  },
  suggestions: {
    display: 'block'
  },
  suggestion: {
    whiteSpace: 'nowrap',
    cursor: 'pointer'
  },
  suggestionChild: {
    whiteSpace: 'normal'
  },
  ltr: {
    left: '0',
    right: 'auto'
  },
  rtl: {
    left: 'auto',
    right: '0'
  },
  defaultClasses: {
    root: 'algolia-autocomplete',
    prefix: 'aa',
    noPrefix: false,
    dropdownMenu: 'dropdown-menu',
    input: 'input',
    hint: 'hint',
    suggestions: 'suggestions',
    suggestion: 'suggestion',
    cursor: 'cursor',
    dataset: 'dataset',
    empty: 'empty'
  },
  // will be merged with the default ones if appendTo is used
  appendTo: {
    wrapper: {
      position: 'absolute',
      zIndex: '100',
      display: 'none'
    },
    input: {},
    inputWithNoHint: {},
    dropdown: {
      display: 'block'
    }
  }
};

// ie specific styling
if (_.isMsie()) {
  // ie6-8 (and 9?) doesn't fire hover and click events for elements with
  // transparent backgrounds, for a workaround, use 1x1 transparent gif
  _.mixin(css.input, {
    backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
  });
}

// ie7 and under specific styling
if (_.isMsie() && _.isMsie() <= 7) {
  // if someone can tell me why this is necessary to align
  // the hint with the query in ie7, i'll send you $5 - @JakeHarding
  _.mixin(css.input, {marginTop: '-1px'});
}

module.exports = css;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/dataset.js":
/*!******************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/dataset.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var datasetKey = 'aaDataset';
var valueKey = 'aaValue';
var datumKey = 'aaDatum';

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var html = __webpack_require__(/*! ./html.js */ "./node_modules/autocomplete.js/src/autocomplete/html.js");
var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");
var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");

// constructor
// -----------

function Dataset(o) {
  o = o || {};
  o.templates = o.templates || {};

  if (!o.source) {
    _.error('missing source');
  }

  if (o.name && !isValidName(o.name)) {
    _.error('invalid dataset name: ' + o.name);
  }

  // tracks the last query the dataset was updated for
  this.query = null;
  this._isEmpty = true;

  this.highlight = !!o.highlight;
  this.name = typeof o.name === 'undefined' || o.name === null ? _.getUniqueId() : o.name;

  this.source = o.source;
  this.displayFn = getDisplayFn(o.display || o.displayKey);

  this.debounce = o.debounce;

  this.cache = o.cache !== false;

  this.templates = getTemplates(o.templates, this.displayFn);

  this.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
  this.cssClasses.prefix =
    o.cssClasses.formattedPrefix || _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);

  var clazz = _.className(this.cssClasses.prefix, this.cssClasses.dataset);
  this.$el = o.$menu && o.$menu.find(clazz + '-' + this.name).length > 0 ?
    DOM.element(o.$menu.find(clazz + '-' + this.name)[0]) :
    DOM.element(
      html.dataset.replace('%CLASS%', this.name)
        .replace('%PREFIX%', this.cssClasses.prefix)
        .replace('%DATASET%', this.cssClasses.dataset)
    );

  this.$menu = o.$menu;
  this.clearCachedSuggestions();
}

// static methods
// --------------

Dataset.extractDatasetName = function extractDatasetName(el) {
  return DOM.element(el).data(datasetKey);
};

Dataset.extractValue = function extractValue(el) {
  return DOM.element(el).data(valueKey);
};

Dataset.extractDatum = function extractDatum(el) {
  var datum = DOM.element(el).data(datumKey);
  if (typeof datum === 'string') {
    // Zepto has an automatic deserialization of the
    // JSON encoded data attribute
    datum = JSON.parse(datum);
  }
  return datum;
};

// instance methods
// ----------------

_.mixin(Dataset.prototype, EventEmitter, {

  // ### private

  _render: function render(query, suggestions) {
    if (!this.$el) {
      return;
    }
    var that = this;

    var hasSuggestions;
    var renderArgs = [].slice.call(arguments, 2);
    this.$el.empty();

    hasSuggestions = suggestions && suggestions.length;
    this._isEmpty = !hasSuggestions;

    if (!hasSuggestions && this.templates.empty) {
      this.$el
        .html(getEmptyHtml.apply(this, renderArgs))
        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
    } else if (hasSuggestions) {
      this.$el
        .html(getSuggestionsHtml.apply(this, renderArgs))
        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
    } else if (suggestions && !Array.isArray(suggestions)) {
      throw new TypeError('suggestions must be an array');
    }

    if (this.$menu) {
      this.$menu.addClass(
        this.cssClasses.prefix + (hasSuggestions ? 'with' : 'without') + '-' + this.name
      ).removeClass(
        this.cssClasses.prefix + (hasSuggestions ? 'without' : 'with') + '-' + this.name
      );
    }

    this.trigger('rendered', query);

    function getEmptyHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: true}].concat(args);
      return that.templates.empty.apply(this, args);
    }

    function getSuggestionsHtml() {
      var args = [].slice.call(arguments, 0);
      var $suggestions;
      var nodes;
      var self = this;

      var suggestionsHtml = html.suggestions.
        replace('%PREFIX%', this.cssClasses.prefix).
        replace('%SUGGESTIONS%', this.cssClasses.suggestions);
      $suggestions = DOM
        .element(suggestionsHtml)
        .css(this.css.suggestions);

      // jQuery#append doesn't support arrays as the first argument
      // until version 1.8, see http://bugs.jquery.com/ticket/11231
      nodes = _.map(suggestions, getSuggestionNode);
      $suggestions.append.apply($suggestions, nodes);

      return $suggestions;

      function getSuggestionNode(suggestion) {
        var $el;

        var suggestionHtml = html.suggestion.
          replace('%PREFIX%', self.cssClasses.prefix).
          replace('%SUGGESTION%', self.cssClasses.suggestion);
        $el = DOM.element(suggestionHtml)
          .attr({
            role: 'option',
            id: ['option', Math.floor(Math.random() * 100000000)].join('-')
          })
          .append(that.templates.suggestion.apply(this, [suggestion].concat(args)));

        $el.data(datasetKey, that.name);
        $el.data(valueKey, that.displayFn(suggestion) || undefined); // this led to undefined return value
        $el.data(datumKey, JSON.stringify(suggestion));
        $el.children().each(function() { DOM.element(this).css(self.css.suggestionChild); });

        return $el;
      }
    }

    function getHeaderHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
      return that.templates.header.apply(this, args);
    }

    function getFooterHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
      return that.templates.footer.apply(this, args);
    }
  },

  // ### public

  getRoot: function getRoot() {
    return this.$el;
  },

  update: function update(query) {
    function handleSuggestions(suggestions) {
      // if the update has been canceled or if the query has changed
      // do not render the suggestions as they've become outdated
      if (!this.canceled && query === this.query) {
        // concat all the other arguments that could have been passed
        // to the render function, and forward them to _render
        var extraArgs = [].slice.call(arguments, 1);
        this.cacheSuggestions(query, suggestions, extraArgs);
        this._render.apply(this, [query, suggestions].concat(extraArgs));
      }
    }

    this.query = query;
    this.canceled = false;

    if (this.shouldFetchFromCache(query)) {
      handleSuggestions.apply(this, [this.cachedSuggestions].concat(this.cachedRenderExtraArgs));
    } else {
      var that = this;
      var execSource = function() {
        // When the call is debounced the condition avoid to do a useless
        // request with the last character when the input has been cleared
        if (!that.canceled) {
          that.source(query, handleSuggestions.bind(that));
        }
      };

      if (this.debounce) {
        var later = function() {
          that.debounceTimeout = null;
          execSource();
        };
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(later, this.debounce);
      } else {
        execSource();
      }
    }
  },

  cacheSuggestions: function cacheSuggestions(query, suggestions, extraArgs) {
    this.cachedQuery = query;
    this.cachedSuggestions = suggestions;
    this.cachedRenderExtraArgs = extraArgs;
  },

  shouldFetchFromCache: function shouldFetchFromCache(query) {
    return this.cache &&
      this.cachedQuery === query &&
      this.cachedSuggestions &&
      this.cachedSuggestions.length;
  },

  clearCachedSuggestions: function clearCachedSuggestions() {
    delete this.cachedQuery;
    delete this.cachedSuggestions;
    delete this.cachedRenderExtraArgs;
  },

  cancel: function cancel() {
    this.canceled = true;
  },

  clear: function clear() {
    if (this.$el) {
      this.cancel();
      this.$el.empty();
      this.trigger('rendered', '');
    }
  },

  isEmpty: function isEmpty() {
    return this._isEmpty;
  },

  destroy: function destroy() {
    this.clearCachedSuggestions();
    this.$el = null;
  }
});

// helper functions
// ----------------

function getDisplayFn(display) {
  display = display || 'value';

  return _.isFunction(display) ? display : displayFn;

  function displayFn(obj) {
    return obj[display];
  }
}

function getTemplates(templates, displayFn) {
  return {
    empty: templates.empty && _.templatify(templates.empty),
    header: templates.header && _.templatify(templates.header),
    footer: templates.footer && _.templatify(templates.footer),
    suggestion: templates.suggestion || suggestionTemplate
  };

  function suggestionTemplate(context) {
    return '<p>' + displayFn(context) + '</p>';
  }
}

function isValidName(str) {
  // dashes, underscores, letters, and numbers
  return (/^[_a-zA-Z0-9-]+$/).test(str);
}

module.exports = Dataset;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/dropdown.js":
/*!*******************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/dropdown.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");
var Dataset = __webpack_require__(/*! ./dataset.js */ "./node_modules/autocomplete.js/src/autocomplete/dataset.js");
var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");

// constructor
// -----------

function Dropdown(o) {
  var that = this;
  var onSuggestionClick;
  var onSuggestionMouseEnter;
  var onSuggestionMouseLeave;

  o = o || {};

  if (!o.menu) {
    _.error('menu is required');
  }

  if (!_.isArray(o.datasets) && !_.isObject(o.datasets)) {
    _.error('1 or more datasets required');
  }
  if (!o.datasets) {
    _.error('datasets is required');
  }

  this.isOpen = false;
  this.isEmpty = true;
  this.minLength = o.minLength || 0;
  this.templates = {};
  this.appendTo = o.appendTo || false;
  this.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
  this.cssClasses.prefix =
    o.cssClasses.formattedPrefix || _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);

  // bound functions
  onSuggestionClick = _.bind(this._onSuggestionClick, this);
  onSuggestionMouseEnter = _.bind(this._onSuggestionMouseEnter, this);
  onSuggestionMouseLeave = _.bind(this._onSuggestionMouseLeave, this);

  var cssClass = _.className(this.cssClasses.prefix, this.cssClasses.suggestion);
  this.$menu = DOM.element(o.menu)
    .on('mouseenter.aa', cssClass, onSuggestionMouseEnter)
    .on('mouseleave.aa', cssClass, onSuggestionMouseLeave)
    .on('click.aa', cssClass, onSuggestionClick);

  this.$container = o.appendTo ? o.wrapper : this.$menu;

  if (o.templates && o.templates.header) {
    this.templates.header = _.templatify(o.templates.header);
    this.$menu.prepend(this.templates.header());
  }

  if (o.templates && o.templates.empty) {
    this.templates.empty = _.templatify(o.templates.empty);
    this.$empty = DOM.element('<div class="' +
      _.className(this.cssClasses.prefix, this.cssClasses.empty, true) + '">' +
      '</div>');
    this.$menu.append(this.$empty);
    this.$empty.hide();
  }

  this.datasets = _.map(o.datasets, function(oDataset) {
    return initializeDataset(that.$menu, oDataset, o.cssClasses);
  });
  _.each(this.datasets, function(dataset) {
    var root = dataset.getRoot();
    if (root && root.parent().length === 0) {
      that.$menu.append(root);
    }
    dataset.onSync('rendered', that._onRendered, that);
  });

  if (o.templates && o.templates.footer) {
    this.templates.footer = _.templatify(o.templates.footer);
    this.$menu.append(this.templates.footer());
  }

  var self = this;
  DOM.element(window).resize(function() {
    self._redraw();
  });
}

// instance methods
// ----------------

_.mixin(Dropdown.prototype, EventEmitter, {

  // ### private

  _onSuggestionClick: function onSuggestionClick($e) {
    this.trigger('suggestionClicked', DOM.element($e.currentTarget));
  },

  _onSuggestionMouseEnter: function onSuggestionMouseEnter($e) {
    var elt = DOM.element($e.currentTarget);
    if (elt.hasClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))) {
      // we're already on the cursor
      // => we're probably entering it again after leaving it for a nested div
      return;
    }
    this._removeCursor();

    // Fixes iOS double tap behaviour, by modifying the DOM right before the
    // native href clicks happens, iOS will requires another tap to follow
    // a suggestion that has an <a href> element inside
    // https://www.google.com/search?q=ios+double+tap+bug+href
    var suggestion = this;
    setTimeout(function() {
      // this exact line, when inside the main loop, will trigger a double tap bug
      // on iOS devices
      suggestion._setCursor(elt, false);
    }, 0);
  },

  _onSuggestionMouseLeave: function onSuggestionMouseLeave($e) {
    // $e.relatedTarget is the `EventTarget` the pointing device entered to
    if ($e.relatedTarget) {
      var elt = DOM.element($e.relatedTarget);
      if (elt.closest('.' + _.className(this.cssClasses.prefix, this.cssClasses.cursor, true)).length > 0) {
        // our father is a cursor
        // => it means we're just leaving the suggestion for a nested div
        return;
      }
    }
    this._removeCursor();
    this.trigger('cursorRemoved');
  },

  _onRendered: function onRendered(e, query) {
    this.isEmpty = _.every(this.datasets, isDatasetEmpty);

    if (this.isEmpty) {
      if (query.length >= this.minLength) {
        this.trigger('empty');
      }

      if (this.$empty) {
        if (query.length < this.minLength) {
          this._hide();
        } else {
          var html = this.templates.empty({
            query: this.datasets[0] && this.datasets[0].query
          });
          this.$empty.html(html);
          this.$empty.show();
          this._show();
        }
      } else if (_.any(this.datasets, hasEmptyTemplate)) {
        if (query.length < this.minLength) {
          this._hide();
        } else {
          this._show();
        }
      } else {
        this._hide();
      }
    } else if (this.isOpen) {
      if (this.$empty) {
        this.$empty.empty();
        this.$empty.hide();
      }

      if (query.length >= this.minLength) {
        this._show();
      } else {
        this._hide();
      }
    }

    this.trigger('datasetRendered');

    function isDatasetEmpty(dataset) {
      return dataset.isEmpty();
    }

    function hasEmptyTemplate(dataset) {
      return dataset.templates && dataset.templates.empty;
    }
  },

  _hide: function() {
    this.$container.hide();
  },

  _show: function() {
    // can't use jQuery#show because $menu is a span element we want
    // display: block; not dislay: inline;
    this.$container.css('display', 'block');

    this._redraw();

    this.trigger('shown');
  },

  _redraw: function redraw() {
    if (!this.isOpen || !this.appendTo) return;

    this.trigger('redrawn');
  },

  _getSuggestions: function getSuggestions() {
    return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.suggestion));
  },

  _getCursor: function getCursor() {
    return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.cursor)).first();
  },

  _setCursor: function setCursor($el, updateInput) {
    $el.first()
      .addClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))
      .attr('aria-selected', 'true');
    this.trigger('cursorMoved', updateInput);
  },

  _removeCursor: function removeCursor() {
    this._getCursor()
      .removeClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))
      .removeAttr('aria-selected');
  },

  _moveCursor: function moveCursor(increment) {
    var $suggestions;
    var $oldCursor;
    var newCursorIndex;
    var $newCursor;

    if (!this.isOpen) {
      return;
    }

    $oldCursor = this._getCursor();
    $suggestions = this._getSuggestions();

    this._removeCursor();

    // shifting before and after modulo to deal with -1 index
    newCursorIndex = $suggestions.index($oldCursor) + increment;
    newCursorIndex = (newCursorIndex + 1) % ($suggestions.length + 1) - 1;

    if (newCursorIndex === -1) {
      this.trigger('cursorRemoved');

      return;
    } else if (newCursorIndex < -1) {
      newCursorIndex = $suggestions.length - 1;
    }

    this._setCursor($newCursor = $suggestions.eq(newCursorIndex), true);

    // in the case of scrollable overflow
    // make sure the cursor is visible in the menu
    this._ensureVisible($newCursor);
  },

  _ensureVisible: function ensureVisible($el) {
    var elTop;
    var elBottom;
    var menuScrollTop;
    var menuHeight;

    elTop = $el.position().top;
    elBottom = elTop + $el.height() +
      parseInt($el.css('margin-top'), 10) +
      parseInt($el.css('margin-bottom'), 10);
    menuScrollTop = this.$menu.scrollTop();
    menuHeight = this.$menu.height() +
      parseInt(this.$menu.css('padding-top'), 10) +
      parseInt(this.$menu.css('padding-bottom'), 10);

    if (elTop < 0) {
      this.$menu.scrollTop(menuScrollTop + elTop);
    } else if (menuHeight < elBottom) {
      this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
    }
  },

  // ### public

  close: function close() {
    if (this.isOpen) {
      this.isOpen = false;

      this._removeCursor();
      this._hide();

      this.trigger('closed');
    }
  },

  open: function open() {
    if (!this.isOpen) {
      this.isOpen = true;

      if (!this.isEmpty) {
        this._show();
      }

      this.trigger('opened');
    }
  },

  setLanguageDirection: function setLanguageDirection(dir) {
    this.$menu.css(dir === 'ltr' ? this.css.ltr : this.css.rtl);
  },

  moveCursorUp: function moveCursorUp() {
    this._moveCursor(-1);
  },

  moveCursorDown: function moveCursorDown() {
    this._moveCursor(+1);
  },

  getDatumForSuggestion: function getDatumForSuggestion($el) {
    var datum = null;

    if ($el.length) {
      datum = {
        raw: Dataset.extractDatum($el),
        value: Dataset.extractValue($el),
        datasetName: Dataset.extractDatasetName($el)
      };
    }

    return datum;
  },

  getCurrentCursor: function getCurrentCursor() {
    return this._getCursor().first();
  },

  getDatumForCursor: function getDatumForCursor() {
    return this.getDatumForSuggestion(this._getCursor().first());
  },

  getDatumForTopSuggestion: function getDatumForTopSuggestion() {
    return this.getDatumForSuggestion(this._getSuggestions().first());
  },

  cursorTopSuggestion: function cursorTopSuggestion() {
    this._setCursor(this._getSuggestions().first(), false);
  },

  update: function update(query) {
    _.each(this.datasets, updateDataset);

    function updateDataset(dataset) {
      dataset.update(query);
    }
  },

  empty: function empty() {
    _.each(this.datasets, clearDataset);
    this.isEmpty = true;

    function clearDataset(dataset) {
      dataset.clear();
    }
  },

  isVisible: function isVisible() {
    return this.isOpen && !this.isEmpty;
  },

  destroy: function destroy() {
    this.$menu.off('.aa');

    this.$menu = null;

    _.each(this.datasets, destroyDataset);

    function destroyDataset(dataset) {
      dataset.destroy();
    }
  }
});

// helper functions
// ----------------
Dropdown.Dataset = Dataset;

function initializeDataset($menu, oDataset, cssClasses) {
  return new Dropdown.Dataset(_.mixin({$menu: $menu, cssClasses: cssClasses}, oDataset));
}

module.exports = Dropdown;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js":
/*!********************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/event_bus.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var namespace = 'autocomplete:';

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");

// constructor
// -----------

function EventBus(o) {
  if (!o || !o.el) {
    _.error('EventBus initialized without el');
  }

  this.$el = DOM.element(o.el);
}

// instance methods
// ----------------

_.mixin(EventBus.prototype, {

  // ### public

  trigger: function(type, suggestion, dataset, context) {
    var event = _.Event(namespace + type);
    this.$el.trigger(event, [suggestion, dataset, context]);
    return event;
  }
});

module.exports = EventBus;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js":
/*!************************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/event_emitter.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var immediate = __webpack_require__(/*! immediate */ "./node_modules/immediate/lib/index.js");
var splitter = /\s+/;

module.exports = {
  onSync: onSync,
  onAsync: onAsync,
  off: off,
  trigger: trigger
};

function on(method, types, cb, context) {
  var type;

  if (!cb) {
    return this;
  }

  types = types.split(splitter);
  cb = context ? bindContext(cb, context) : cb;

  this._callbacks = this._callbacks || {};

  while (type = types.shift()) {
    this._callbacks[type] = this._callbacks[type] || {sync: [], async: []};
    this._callbacks[type][method].push(cb);
  }

  return this;
}

function onAsync(types, cb, context) {
  return on.call(this, 'async', types, cb, context);
}

function onSync(types, cb, context) {
  return on.call(this, 'sync', types, cb, context);
}

function off(types) {
  var type;

  if (!this._callbacks) {
    return this;
  }

  types = types.split(splitter);

  while (type = types.shift()) {
    delete this._callbacks[type];
  }

  return this;
}

function trigger(types) {
  var type;
  var callbacks;
  var args;
  var syncFlush;
  var asyncFlush;

  if (!this._callbacks) {
    return this;
  }

  types = types.split(splitter);
  args = [].slice.call(arguments, 1);

  while ((type = types.shift()) && (callbacks = this._callbacks[type])) { // eslint-disable-line
    syncFlush = getFlush(callbacks.sync, this, [type].concat(args));
    asyncFlush = getFlush(callbacks.async, this, [type].concat(args));

    if (syncFlush()) {
      immediate(asyncFlush);
    }
  }

  return this;
}

function getFlush(callbacks, context, args) {
  return flush;

  function flush() {
    var cancelled;

    for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
      // only cancel if the callback explicitly returns false
      cancelled = callbacks[i].apply(context, args) === false;
    }

    return !cancelled;
  }
}

function bindContext(fn, context) {
  return fn.bind ?
    fn.bind(context) :
    function() { fn.apply(context, [].slice.call(arguments, 0)); };
}


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/html.js":
/*!***************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/html.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  wrapper: '<span class="%ROOT%"></span>',
  dropdown: '<span class="%PREFIX%%DROPDOWN_MENU%"></span>',
  dataset: '<div class="%PREFIX%%DATASET%-%CLASS%"></div>',
  suggestions: '<span class="%PREFIX%%SUGGESTIONS%"></span>',
  suggestion: '<div class="%PREFIX%%SUGGESTION%"></div>'
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/input.js":
/*!****************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/input.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var specialKeyCodeMap;

specialKeyCodeMap = {
  9: 'tab',
  27: 'esc',
  37: 'left',
  39: 'right',
  13: 'enter',
  38: 'up',
  40: 'down'
};

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");

// constructor
// -----------

function Input(o) {
  var that = this;
  var onBlur;
  var onFocus;
  var onKeydown;
  var onInput;

  o = o || {};

  if (!o.input) {
    _.error('input is missing');
  }

  // bound functions
  onBlur = _.bind(this._onBlur, this);
  onFocus = _.bind(this._onFocus, this);
  onKeydown = _.bind(this._onKeydown, this);
  onInput = _.bind(this._onInput, this);

  this.$hint = DOM.element(o.hint);
  this.$input = DOM.element(o.input)
    .on('blur.aa', onBlur)
    .on('focus.aa', onFocus)
    .on('keydown.aa', onKeydown);

  // if no hint, noop all the hint related functions
  if (this.$hint.length === 0) {
    this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
  }

  // ie7 and ie8 don't support the input event
  // ie9 doesn't fire the input event when characters are removed
  // not sure if ie10 is compatible
  if (!_.isMsie()) {
    this.$input.on('input.aa', onInput);
  } else {
    this.$input.on('keydown.aa keypress.aa cut.aa paste.aa', function($e) {
      // if a special key triggered this, ignore it
      if (specialKeyCodeMap[$e.which || $e.keyCode]) {
        return;
      }

      // give the browser a chance to update the value of the input
      // before checking to see if the query changed
      _.defer(_.bind(that._onInput, that, $e));
    });
  }

  // the query defaults to whatever the value of the input is
  // on initialization, it'll most likely be an empty string
  this.query = this.$input.val();

  // helps with calculating the width of the input's value
  this.$overflowHelper = buildOverflowHelper(this.$input);
}

// static methods
// --------------

Input.normalizeQuery = function(str) {
  // strips leading whitespace and condenses all whitespace
  return (str || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' ');
};

// instance methods
// ----------------

_.mixin(Input.prototype, EventEmitter, {

  // ### private

  _onBlur: function onBlur() {
    this.resetInputValue();
    this.$input.removeAttr('aria-activedescendant');
    this.trigger('blurred');
  },

  _onFocus: function onFocus() {
    this.trigger('focused');
  },

  _onKeydown: function onKeydown($e) {
    // which is normalized and consistent (but not for ie)
    var keyName = specialKeyCodeMap[$e.which || $e.keyCode];

    this._managePreventDefault(keyName, $e);
    if (keyName && this._shouldTrigger(keyName, $e)) {
      this.trigger(keyName + 'Keyed', $e);
    }
  },

  _onInput: function onInput() {
    this._checkInputValue();
  },

  _managePreventDefault: function managePreventDefault(keyName, $e) {
    var preventDefault;
    var hintValue;
    var inputValue;

    switch (keyName) {
    case 'tab':
      hintValue = this.getHint();
      inputValue = this.getInputValue();

      preventDefault = hintValue &&
        hintValue !== inputValue &&
        !withModifier($e);
      break;

    case 'up':
    case 'down':
      preventDefault = !withModifier($e);
      break;

    default:
      preventDefault = false;
    }

    if (preventDefault) {
      $e.preventDefault();
    }
  },

  _shouldTrigger: function shouldTrigger(keyName, $e) {
    var trigger;

    switch (keyName) {
    case 'tab':
      trigger = !withModifier($e);
      break;

    default:
      trigger = true;
    }

    return trigger;
  },

  _checkInputValue: function checkInputValue() {
    var inputValue;
    var areEquivalent;
    var hasDifferentWhitespace;

    inputValue = this.getInputValue();
    areEquivalent = areQueriesEquivalent(inputValue, this.query);
    hasDifferentWhitespace = areEquivalent && this.query ?
      this.query.length !== inputValue.length : false;

    this.query = inputValue;

    if (!areEquivalent) {
      this.trigger('queryChanged', this.query);
    } else if (hasDifferentWhitespace) {
      this.trigger('whitespaceChanged', this.query);
    }
  },

  // ### public

  focus: function focus() {
    this.$input.focus();
  },

  blur: function blur() {
    this.$input.blur();
  },

  getQuery: function getQuery() {
    return this.query;
  },

  setQuery: function setQuery(query) {
    this.query = query;
  },

  getInputValue: function getInputValue() {
    return this.$input.val();
  },

  setInputValue: function setInputValue(value, silent) {
    if (typeof value === 'undefined') {
      value = this.query;
    }
    this.$input.val(value);

    // silent prevents any additional events from being triggered
    if (silent) {
      this.clearHint();
    } else {
      this._checkInputValue();
    }
  },

  expand: function expand() {
    this.$input.attr('aria-expanded', 'true');
  },

  collapse: function collapse() {
    this.$input.attr('aria-expanded', 'false');
  },

  setActiveDescendant: function setActiveDescendant(activedescendantId) {
    this.$input.attr('aria-activedescendant', activedescendantId);
  },

  removeActiveDescendant: function removeActiveDescendant() {
    this.$input.removeAttr('aria-activedescendant');
  },

  resetInputValue: function resetInputValue() {
    this.setInputValue(this.query, true);
  },

  getHint: function getHint() {
    return this.$hint.val();
  },

  setHint: function setHint(value) {
    this.$hint.val(value);
  },

  clearHint: function clearHint() {
    this.setHint('');
  },

  clearHintIfInvalid: function clearHintIfInvalid() {
    var val;
    var hint;
    var valIsPrefixOfHint;
    var isValid;

    val = this.getInputValue();
    hint = this.getHint();
    valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
    isValid = val !== '' && valIsPrefixOfHint && !this.hasOverflow();

    if (!isValid) {
      this.clearHint();
    }
  },

  getLanguageDirection: function getLanguageDirection() {
    return (this.$input.css('direction') || 'ltr').toLowerCase();
  },

  hasOverflow: function hasOverflow() {
    // 2 is arbitrary, just picking a small number to handle edge cases
    var constraint = this.$input.width() - 2;

    this.$overflowHelper.text(this.getInputValue());

    return this.$overflowHelper.width() >= constraint;
  },

  isCursorAtEnd: function() {
    var valueLength;
    var selectionStart;
    var range;

    valueLength = this.$input.val().length;
    selectionStart = this.$input[0].selectionStart;

    if (_.isNumber(selectionStart)) {
      return selectionStart === valueLength;
    } else if (document.selection) {
      // NOTE: this won't work unless the input has focus, the good news
      // is this code should only get called when the input has focus
      range = document.selection.createRange();
      range.moveStart('character', -valueLength);

      return valueLength === range.text.length;
    }

    return true;
  },

  destroy: function destroy() {
    this.$hint.off('.aa');
    this.$input.off('.aa');

    this.$hint = this.$input = this.$overflowHelper = null;
  }
});

// helper functions
// ----------------

function buildOverflowHelper($input) {
  return DOM.element('<pre aria-hidden="true"></pre>')
    .css({
      // position helper off-screen
      position: 'absolute',
      visibility: 'hidden',
      // avoid line breaks and whitespace collapsing
      whiteSpace: 'pre',
      // use same font css as input to calculate accurate width
      fontFamily: $input.css('font-family'),
      fontSize: $input.css('font-size'),
      fontStyle: $input.css('font-style'),
      fontVariant: $input.css('font-variant'),
      fontWeight: $input.css('font-weight'),
      wordSpacing: $input.css('word-spacing'),
      letterSpacing: $input.css('letter-spacing'),
      textIndent: $input.css('text-indent'),
      textRendering: $input.css('text-rendering'),
      textTransform: $input.css('text-transform')
    })
    .insertAfter($input);
}

function areQueriesEquivalent(a, b) {
  return Input.normalizeQuery(a) === Input.normalizeQuery(b);
}

function withModifier($e) {
  return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
}

module.exports = Input;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/typeahead.js":
/*!********************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/typeahead.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var attrsKey = 'aaAttrs';

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var EventBus = __webpack_require__(/*! ./event_bus.js */ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js");
var Input = __webpack_require__(/*! ./input.js */ "./node_modules/autocomplete.js/src/autocomplete/input.js");
var Dropdown = __webpack_require__(/*! ./dropdown.js */ "./node_modules/autocomplete.js/src/autocomplete/dropdown.js");
var html = __webpack_require__(/*! ./html.js */ "./node_modules/autocomplete.js/src/autocomplete/html.js");
var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");

// constructor
// -----------

// THOUGHT: what if datasets could dynamically be added/removed?
function Typeahead(o) {
  var $menu;
  var $hint;

  o = o || {};

  if (!o.input) {
    _.error('missing input');
  }

  this.isActivated = false;
  this.debug = !!o.debug;
  this.autoselect = !!o.autoselect;
  this.autoselectOnBlur = !!o.autoselectOnBlur;
  this.openOnFocus = !!o.openOnFocus;
  this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
  this.autoWidth = (o.autoWidth === undefined) ? true : !!o.autoWidth;
  this.clearOnSelected = !!o.clearOnSelected;
  this.tabAutocomplete = (o.tabAutocomplete === undefined) ? true : !!o.tabAutocomplete;

  o.hint = !!o.hint;

  if (o.hint && o.appendTo) {
    throw new Error('[autocomplete.js] hint and appendTo options can\'t be used at the same time');
  }

  this.css = o.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
  this.cssClasses.prefix =
    o.cssClasses.formattedPrefix = _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);
  this.listboxId = o.listboxId = [this.cssClasses.root, 'listbox', _.getUniqueId()].join('-');

  var domElts = buildDom(o);

  this.$node = domElts.wrapper;
  var $input = this.$input = domElts.input;
  $menu = domElts.menu;
  $hint = domElts.hint;

  if (o.dropdownMenuContainer) {
    DOM.element(o.dropdownMenuContainer)
      .css('position', 'relative') // ensure the container has a relative position
      .append($menu.css('top', '0')); // override the top: 100%
  }

  // #705: if there's scrollable overflow, ie doesn't support
  // blur cancellations when the scrollbar is clicked
  //
  // #351: preventDefault won't cancel blurs in ie <= 8
  $input.on('blur.aa', function($e) {
    var active = document.activeElement;
    if (_.isMsie() && ($menu[0] === active || $menu[0].contains(active))) {
      $e.preventDefault();
      // stop immediate in order to prevent Input#_onBlur from
      // getting exectued
      $e.stopImmediatePropagation();
      _.defer(function() { $input.focus(); });
    }
  });

  // #351: prevents input blur due to clicks within dropdown menu
  $menu.on('mousedown.aa', function($e) { $e.preventDefault(); });

  this.eventBus = o.eventBus || new EventBus({el: $input});

  this.dropdown = new Typeahead.Dropdown({
    appendTo: o.appendTo,
    wrapper: this.$node,
    menu: $menu,
    datasets: o.datasets,
    templates: o.templates,
    cssClasses: o.cssClasses,
    minLength: this.minLength
  })
    .onSync('suggestionClicked', this._onSuggestionClicked, this)
    .onSync('cursorMoved', this._onCursorMoved, this)
    .onSync('cursorRemoved', this._onCursorRemoved, this)
    .onSync('opened', this._onOpened, this)
    .onSync('closed', this._onClosed, this)
    .onSync('shown', this._onShown, this)
    .onSync('empty', this._onEmpty, this)
    .onSync('redrawn', this._onRedrawn, this)
    .onAsync('datasetRendered', this._onDatasetRendered, this);

  this.input = new Typeahead.Input({input: $input, hint: $hint})
    .onSync('focused', this._onFocused, this)
    .onSync('blurred', this._onBlurred, this)
    .onSync('enterKeyed', this._onEnterKeyed, this)
    .onSync('tabKeyed', this._onTabKeyed, this)
    .onSync('escKeyed', this._onEscKeyed, this)
    .onSync('upKeyed', this._onUpKeyed, this)
    .onSync('downKeyed', this._onDownKeyed, this)
    .onSync('leftKeyed', this._onLeftKeyed, this)
    .onSync('rightKeyed', this._onRightKeyed, this)
    .onSync('queryChanged', this._onQueryChanged, this)
    .onSync('whitespaceChanged', this._onWhitespaceChanged, this);

  this._bindKeyboardShortcuts(o);

  this._setLanguageDirection();
}

// instance methods
// ----------------

_.mixin(Typeahead.prototype, {
  // ### private

  _bindKeyboardShortcuts: function(options) {
    if (!options.keyboardShortcuts) {
      return;
    }
    var $input = this.$input;
    var keyboardShortcuts = [];
    _.each(options.keyboardShortcuts, function(key) {
      if (typeof key === 'string') {
        key = key.toUpperCase().charCodeAt(0);
      }
      keyboardShortcuts.push(key);
    });
    DOM.element(document).keydown(function(event) {
      var elt = (event.target || event.srcElement);
      var tagName = elt.tagName;
      if (elt.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA') {
        // already in an input
        return;
      }

      var which = event.which || event.keyCode;
      if (keyboardShortcuts.indexOf(which) === -1) {
        // not the right shortcut
        return;
      }

      $input.focus();
      event.stopPropagation();
      event.preventDefault();
    });
  },

  _onSuggestionClicked: function onSuggestionClicked(type, $el) {
    var datum;
    var context = {selectionMethod: 'click'};

    if (datum = this.dropdown.getDatumForSuggestion($el)) {
      this._select(datum, context);
    }
  },

  _onCursorMoved: function onCursorMoved(event, updateInput) {
    var datum = this.dropdown.getDatumForCursor();
    var currentCursorId = this.dropdown.getCurrentCursor().attr('id');
    this.input.setActiveDescendant(currentCursorId);

    if (datum) {
      if (updateInput) {
        this.input.setInputValue(datum.value, true);
      }

      this.eventBus.trigger('cursorchanged', datum.raw, datum.datasetName);
    }
  },

  _onCursorRemoved: function onCursorRemoved() {
    this.input.resetInputValue();
    this._updateHint();
    this.eventBus.trigger('cursorremoved');
  },

  _onDatasetRendered: function onDatasetRendered() {
    this._updateHint();

    this.eventBus.trigger('updated');
  },

  _onOpened: function onOpened() {
    this._updateHint();
    this.input.expand();

    this.eventBus.trigger('opened');
  },

  _onEmpty: function onEmpty() {
    this.eventBus.trigger('empty');
  },

  _onRedrawn: function onRedrawn() {
    this.$node.css('top', 0 + 'px');
    this.$node.css('left', 0 + 'px');

    var inputRect = this.$input[0].getBoundingClientRect();

    if (this.autoWidth) {
      this.$node.css('width', inputRect.width + 'px');
    }

    var wrapperRect = this.$node[0].getBoundingClientRect();

    var top = inputRect.bottom - wrapperRect.top;
    this.$node.css('top', top + 'px');
    var left = inputRect.left - wrapperRect.left;
    this.$node.css('left', left + 'px');

    this.eventBus.trigger('redrawn');
  },

  _onShown: function onShown() {
    this.eventBus.trigger('shown');
    if (this.autoselect) {
      this.dropdown.cursorTopSuggestion();
    }
  },

  _onClosed: function onClosed() {
    this.input.clearHint();
    this.input.removeActiveDescendant();
    this.input.collapse();

    this.eventBus.trigger('closed');
  },

  _onFocused: function onFocused() {
    this.isActivated = true;

    if (this.openOnFocus) {
      var query = this.input.getQuery();
      if (query.length >= this.minLength) {
        this.dropdown.update(query);
      } else {
        this.dropdown.empty();
      }

      this.dropdown.open();
    }
  },

  _onBlurred: function onBlurred() {
    var cursorDatum;
    var topSuggestionDatum;

    cursorDatum = this.dropdown.getDatumForCursor();
    topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
    var context = {selectionMethod: 'blur'};

    if (!this.debug) {
      if (this.autoselectOnBlur && cursorDatum) {
        this._select(cursorDatum, context);
      } else if (this.autoselectOnBlur && topSuggestionDatum) {
        this._select(topSuggestionDatum, context);
      } else {
        this.isActivated = false;
        this.dropdown.empty();
        this.dropdown.close();
      }
    }
  },

  _onEnterKeyed: function onEnterKeyed(type, $e) {
    var cursorDatum;
    var topSuggestionDatum;

    cursorDatum = this.dropdown.getDatumForCursor();
    topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
    var context = {selectionMethod: 'enterKey'};

    if (cursorDatum) {
      this._select(cursorDatum, context);
      $e.preventDefault();
    } else if (this.autoselect && topSuggestionDatum) {
      this._select(topSuggestionDatum, context);
      $e.preventDefault();
    }
  },

  _onTabKeyed: function onTabKeyed(type, $e) {
    if (!this.tabAutocomplete) {
      // Closing the dropdown enables further tabbing
      this.dropdown.close();
      return;
    }

    var datum;
    var context = {selectionMethod: 'tabKey'};

    if (datum = this.dropdown.getDatumForCursor()) {
      this._select(datum, context);
      $e.preventDefault();
    } else {
      this._autocomplete(true);
    }
  },

  _onEscKeyed: function onEscKeyed() {
    this.dropdown.close();
    this.input.resetInputValue();
  },

  _onUpKeyed: function onUpKeyed() {
    var query = this.input.getQuery();

    if (this.dropdown.isEmpty && query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.moveCursorUp();
    }

    this.dropdown.open();
  },

  _onDownKeyed: function onDownKeyed() {
    var query = this.input.getQuery();

    if (this.dropdown.isEmpty && query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.moveCursorDown();
    }

    this.dropdown.open();
  },

  _onLeftKeyed: function onLeftKeyed() {
    if (this.dir === 'rtl') {
      this._autocomplete();
    }
  },

  _onRightKeyed: function onRightKeyed() {
    if (this.dir === 'ltr') {
      this._autocomplete();
    }
  },

  _onQueryChanged: function onQueryChanged(e, query) {
    this.input.clearHintIfInvalid();

    if (query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.empty();
    }

    this.dropdown.open();
    this._setLanguageDirection();
  },

  _onWhitespaceChanged: function onWhitespaceChanged() {
    this._updateHint();
    this.dropdown.open();
  },

  _setLanguageDirection: function setLanguageDirection() {
    var dir = this.input.getLanguageDirection();

    if (this.dir !== dir) {
      this.dir = dir;
      this.$node.css('direction', dir);
      this.dropdown.setLanguageDirection(dir);
    }
  },

  _updateHint: function updateHint() {
    var datum;
    var val;
    var query;
    var escapedQuery;
    var frontMatchRegEx;
    var match;

    datum = this.dropdown.getDatumForTopSuggestion();

    if (datum && this.dropdown.isVisible() && !this.input.hasOverflow()) {
      val = this.input.getInputValue();
      query = Input.normalizeQuery(val);
      escapedQuery = _.escapeRegExChars(query);

      // match input value, then capture trailing text
      frontMatchRegEx = new RegExp('^(?:' + escapedQuery + ')(.+$)', 'i');
      match = frontMatchRegEx.exec(datum.value);

      // clear hint if there's no trailing text
      if (match) {
        this.input.setHint(val + match[1]);
      } else {
        this.input.clearHint();
      }
    } else {
      this.input.clearHint();
    }
  },

  _autocomplete: function autocomplete(laxCursor) {
    var hint;
    var query;
    var isCursorAtEnd;
    var datum;

    hint = this.input.getHint();
    query = this.input.getQuery();
    isCursorAtEnd = laxCursor || this.input.isCursorAtEnd();

    if (hint && query !== hint && isCursorAtEnd) {
      datum = this.dropdown.getDatumForTopSuggestion();
      if (datum) {
        this.input.setInputValue(datum.value);
      }

      this.eventBus.trigger('autocompleted', datum.raw, datum.datasetName);
    }
  },

  _select: function select(datum, context) {
    if (typeof datum.value !== 'undefined') {
      this.input.setQuery(datum.value);
    }
    if (this.clearOnSelected) {
      this.setVal('');
    } else {
      this.input.setInputValue(datum.value, true);
    }

    this._setLanguageDirection();

    var event = this.eventBus.trigger('selected', datum.raw, datum.datasetName, context);
    if (event.isDefaultPrevented() === false) {
      this.dropdown.close();

      // #118: allow click event to bubble up to the body before removing
      // the suggestions otherwise we break event delegation
      _.defer(_.bind(this.dropdown.empty, this.dropdown));
    }
  },

  // ### public

  open: function open() {
    // if the menu is not activated yet, we need to update
    // the underlying dropdown menu to trigger the search
    // otherwise we're not gonna see anything
    if (!this.isActivated) {
      var query = this.input.getInputValue();
      if (query.length >= this.minLength) {
        this.dropdown.update(query);
      } else {
        this.dropdown.empty();
      }
    }
    this.dropdown.open();
  },

  close: function close() {
    this.dropdown.close();
  },

  setVal: function setVal(val) {
    // expect val to be a string, so be safe, and coerce
    val = _.toStr(val);

    if (this.isActivated) {
      this.input.setInputValue(val);
    } else {
      this.input.setQuery(val);
      this.input.setInputValue(val, true);
    }

    this._setLanguageDirection();
  },

  getVal: function getVal() {
    return this.input.getQuery();
  },

  destroy: function destroy() {
    this.input.destroy();
    this.dropdown.destroy();

    destroyDomStructure(this.$node, this.cssClasses);

    this.$node = null;
  },

  getWrapper: function getWrapper() {
    return this.dropdown.$container[0];
  }
});

function buildDom(options) {
  var $input;
  var $wrapper;
  var $dropdown;
  var $hint;

  $input = DOM.element(options.input);
  $wrapper = DOM
    .element(html.wrapper.replace('%ROOT%', options.cssClasses.root))
    .css(options.css.wrapper);

  // override the display property with the table-cell value
  // if the parent element is a table and the original input was a block
  //  -> https://github.com/algolia/autocomplete.js/issues/16
  if (!options.appendTo && $input.css('display') === 'block' && $input.parent().css('display') === 'table') {
    $wrapper.css('display', 'table-cell');
  }
  var dropdownHtml = html.dropdown.
    replace('%PREFIX%', options.cssClasses.prefix).
    replace('%DROPDOWN_MENU%', options.cssClasses.dropdownMenu);
  $dropdown = DOM.element(dropdownHtml)
    .css(options.css.dropdown)
    .attr({
      role: 'listbox',
      id: options.listboxId
    });
  if (options.templates && options.templates.dropdownMenu) {
    $dropdown.html(_.templatify(options.templates.dropdownMenu)());
  }
  $hint = $input.clone().css(options.css.hint).css(getBackgroundStyles($input));

  $hint
    .val('')
    .addClass(_.className(options.cssClasses.prefix, options.cssClasses.hint, true))
    .removeAttr('id name placeholder required')
    .prop('readonly', true)
    .attr({
      'aria-hidden': 'true',
      autocomplete: 'off',
      spellcheck: 'false',
      tabindex: -1
    });
  if ($hint.removeData) {
    $hint.removeData();
  }

  // store the original values of the attrs that get modified
  // so modifications can be reverted on destroy
  $input.data(attrsKey, {
    'aria-autocomplete': $input.attr('aria-autocomplete'),
    'aria-expanded': $input.attr('aria-expanded'),
    'aria-owns': $input.attr('aria-owns'),
    autocomplete: $input.attr('autocomplete'),
    dir: $input.attr('dir'),
    role: $input.attr('role'),
    spellcheck: $input.attr('spellcheck'),
    style: $input.attr('style'),
    type: $input.attr('type')
  });

  $input
    .addClass(_.className(options.cssClasses.prefix, options.cssClasses.input, true))
    .attr({
      autocomplete: 'off',
      spellcheck: false,

      // Accessibility features
      // Give the field a presentation of a "select".
      // Combobox is the combined presentation of a single line textfield
      // with a listbox popup.
      // https://www.w3.org/WAI/PF/aria/roles#combobox
      role: 'combobox',
      // Let the screen reader know the field has an autocomplete
      // feature to it.
      'aria-autocomplete': (options.datasets &&
        options.datasets[0] && options.datasets[0].displayKey ? 'both' : 'list'),
      // Indicates whether the dropdown it controls is currently expanded or collapsed
      'aria-expanded': 'false',
      'aria-label': options.ariaLabel,
      // Explicitly point to the listbox,
      // which is a list of suggestions (aka options)
      'aria-owns': options.listboxId
    })
    .css(options.hint ? options.css.input : options.css.inputWithNoHint);

  // ie7 does not like it when dir is set to auto
  try {
    if (!$input.attr('dir')) {
      $input.attr('dir', 'auto');
    }
  } catch (e) {
    // ignore
  }

  $wrapper = options.appendTo
    ? $wrapper.appendTo(DOM.element(options.appendTo).eq(0)).eq(0)
    : $input.wrap($wrapper).parent();

  $wrapper
    .prepend(options.hint ? $hint : null)
    .append($dropdown);

  return {
    wrapper: $wrapper,
    input: $input,
    hint: $hint,
    menu: $dropdown
  };
}

function getBackgroundStyles($el) {
  return {
    backgroundAttachment: $el.css('background-attachment'),
    backgroundClip: $el.css('background-clip'),
    backgroundColor: $el.css('background-color'),
    backgroundImage: $el.css('background-image'),
    backgroundOrigin: $el.css('background-origin'),
    backgroundPosition: $el.css('background-position'),
    backgroundRepeat: $el.css('background-repeat'),
    backgroundSize: $el.css('background-size')
  };
}

function destroyDomStructure($node, cssClasses) {
  var $input = $node.find(_.className(cssClasses.prefix, cssClasses.input));

  // need to remove attrs that weren't previously defined and
  // revert attrs that originally had a value
  _.each($input.data(attrsKey), function(val, key) {
    if (val === undefined) {
      $input.removeAttr(key);
    } else {
      $input.attr(key, val);
    }
  });

  $input
    .detach()
    .removeClass(_.className(cssClasses.prefix, cssClasses.input, true))
    .insertAfter($node);
  if ($input.removeData) {
    $input.removeData(attrsKey);
  }

  $node.remove();
}

Typeahead.Dropdown = Dropdown;
Typeahead.Input = Input;
Typeahead.sources = __webpack_require__(/*! ../sources/index.js */ "./node_modules/autocomplete.js/src/sources/index.js");

module.exports = Typeahead;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/common/dom.js":
/*!********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/dom.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  element: null
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js":
/*!******************************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseAlgoliaClientVersion(agent) {
  var parsed =
    // User agent for algoliasearch >= 3.33.0
    agent.match(/Algolia for JavaScript \((\d+\.)(\d+\.)(\d+)\)/) ||
    // User agent for algoliasearch < 3.33.0
    agent.match(/Algolia for vanilla JavaScript (\d+\.)(\d+\.)(\d+)/);

  if (parsed) {
    return [parsed[1], parsed[2], parsed[3]];
  }

  return undefined;
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/common/utils.js":
/*!**********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/utils.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DOM = __webpack_require__(/*! ./dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

module.exports = {
  // those methods are implemented differently
  // depending on which build it is, using
  // $... or angular... or Zepto... or require(...)
  isArray: null,
  isFunction: null,
  isObject: null,
  bind: null,
  each: null,
  map: null,
  mixin: null,

  isMsie: function(agentString) {
    if (agentString === undefined) { agentString = navigator.userAgent; }
    // from https://github.com/ded/bowser/blob/master/bowser.js
    if ((/(msie|trident)/i).test(agentString)) {
      var match = agentString.match(/(msie |rv:)(\d+(.\d+)?)/i);
      if (match) { return match[2]; }
    }
    return false;
  },

  // http://stackoverflow.com/a/6969486
  escapeRegExChars: function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  },

  isNumber: function(obj) { return typeof obj === 'number'; },

  toStr: function toStr(s) {
    return s === undefined || s === null ? '' : s + '';
  },

  cloneDeep: function cloneDeep(obj) {
    var clone = this.mixin({}, obj);
    var self = this;
    this.each(clone, function(value, key) {
      if (value) {
        if (self.isArray(value)) {
          clone[key] = [].concat(value);
        } else if (self.isObject(value)) {
          clone[key] = self.cloneDeep(value);
        }
      }
    });
    return clone;
  },

  error: function(msg) {
    throw new Error(msg);
  },

  every: function(obj, test) {
    var result = true;
    if (!obj) {
      return result;
    }
    this.each(obj, function(val, key) {
      if (result) {
        result = test.call(null, val, key, obj) && result;
      }
    });
    return !!result;
  },

  any: function(obj, test) {
    var found = false;
    if (!obj) {
      return found;
    }
    this.each(obj, function(val, key) {
      if (test.call(null, val, key, obj)) {
        found = true;
        return false;
      }
    });
    return found;
  },

  getUniqueId: (function() {
    var counter = 0;
    return function() { return counter++; };
  })(),

  templatify: function templatify(obj) {
    if (this.isFunction(obj)) {
      return obj;
    }
    var $template = DOM.element(obj);
    if ($template.prop('tagName') === 'SCRIPT') {
      return function template() { return $template.text(); };
    }
    return function template() { return String(obj); };
  },

  defer: function(fn) { setTimeout(fn, 0); },

  noop: function() {},

  formatPrefix: function(prefix, noPrefix) {
    return noPrefix ? '' : prefix + '-';
  },

  className: function(prefix, clazz, skipDot) {
    return (skipDot ? '' : '.') + prefix + clazz;
  },

  escapeHighlightedString: function(str, highlightPreTag, highlightPostTag) {
    highlightPreTag = highlightPreTag || '<em>';
    var pre = document.createElement('div');
    pre.appendChild(document.createTextNode(highlightPreTag));

    highlightPostTag = highlightPostTag || '</em>';
    var post = document.createElement('div');
    post.appendChild(document.createTextNode(highlightPostTag));

    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML
      .replace(RegExp(escapeRegExp(pre.innerHTML), 'g'), highlightPreTag)
      .replace(RegExp(escapeRegExp(post.innerHTML), 'g'), highlightPostTag);
  }
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/sources/hits.js":
/*!**********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/hits.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var version = __webpack_require__(/*! ../../version.js */ "./node_modules/autocomplete.js/version.js");
var parseAlgoliaClientVersion = __webpack_require__(/*! ../common/parseAlgoliaClientVersion.js */ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js");

module.exports = function search(index, params) {
  var algoliaVersion = parseAlgoliaClientVersion(index.as._ua);
  if (algoliaVersion && algoliaVersion[0] >= 3 && algoliaVersion[1] > 20) {
    params = params || {};
    params.additionalUA = 'autocomplete.js ' + version;
  }
  return sourceFn;

  function sourceFn(query, cb) {
    index.search(query, params, function(error, content) {
      if (error) {
        _.error(error.message);
        return;
      }
      cb(content.hits, content);
    });
  }
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/sources/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  hits: __webpack_require__(/*! ./hits.js */ "./node_modules/autocomplete.js/src/sources/hits.js"),
  popularIn: __webpack_require__(/*! ./popularIn.js */ "./node_modules/autocomplete.js/src/sources/popularIn.js")
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/sources/popularIn.js":
/*!***************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/popularIn.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var version = __webpack_require__(/*! ../../version.js */ "./node_modules/autocomplete.js/version.js");
var parseAlgoliaClientVersion = __webpack_require__(/*! ../common/parseAlgoliaClientVersion.js */ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js");

module.exports = function popularIn(index, params, details, options) {
  var algoliaVersion = parseAlgoliaClientVersion(index.as._ua);
  if (algoliaVersion && algoliaVersion[0] >= 3 && algoliaVersion[1] > 20) {
    params = params || {};
    params.additionalUA = 'autocomplete.js ' + version;
  }
  if (!details.source) {
    return _.error("Missing 'source' key");
  }
  var source = _.isFunction(details.source) ? details.source : function(hit) { return hit[details.source]; };

  if (!details.index) {
    return _.error("Missing 'index' key");
  }
  var detailsIndex = details.index;

  options = options || {};

  return sourceFn;

  function sourceFn(query, cb) {
    index.search(query, params, function(error, content) {
      if (error) {
        _.error(error.message);
        return;
      }

      if (content.hits.length > 0) {
        var first = content.hits[0];

        var detailsParams = _.mixin({hitsPerPage: 0}, details);
        delete detailsParams.source; // not a query parameter
        delete detailsParams.index; // not a query parameter

        var detailsAlgoliaVersion = parseAlgoliaClientVersion(detailsIndex.as._ua);
        if (detailsAlgoliaVersion && detailsAlgoliaVersion[0] >= 3 && detailsAlgoliaVersion[1] > 20) {
          params.additionalUA = 'autocomplete.js ' + version;
        }

        detailsIndex.search(source(first), detailsParams, function(error2, content2) {
          if (error2) {
            _.error(error2.message);
            return;
          }

          var suggestions = [];

          // add the 'all department' entry before others
          if (options.includeAll) {
            var label = options.allTitle || 'All departments';
            suggestions.push(_.mixin({
              facet: {value: label, count: content2.nbHits}
            }, _.cloneDeep(first)));
          }

          // enrich the first hit iterating over the facets
          _.each(content2.facets, function(values, facet) {
            _.each(values, function(count, value) {
              suggestions.push(_.mixin({
                facet: {facet: facet, value: value, count: count}
              }, _.cloneDeep(first)));
            });
          });

          // append all other hits
          for (var i = 1; i < content.hits.length; ++i) {
            suggestions.push(content.hits[i]);
          }

          cb(suggestions, content);
        });

        return;
      }

      cb([]);
    });
  }
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/standalone/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/standalone/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// this will inject Zepto in window, unfortunately no easy commonJS zepto build
var zepto = __webpack_require__(/*! ../../zepto.js */ "./node_modules/autocomplete.js/zepto.js");

// setup DOM element
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
DOM.element = zepto;

// setup utils functions
var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
_.isArray = zepto.isArray;
_.isFunction = zepto.isFunction;
_.isObject = zepto.isPlainObject;
_.bind = zepto.proxy;
_.each = function(collection, cb) {
  // stupid argument order for jQuery.each
  zepto.each(collection, reverseArgs);
  function reverseArgs(index, value) {
    return cb(value, index);
  }
};
_.map = zepto.map;
_.mixin = zepto.extend;
_.Event = zepto.Event;

var typeaheadKey = 'aaAutocomplete';
var Typeahead = __webpack_require__(/*! ../autocomplete/typeahead.js */ "./node_modules/autocomplete.js/src/autocomplete/typeahead.js");
var EventBus = __webpack_require__(/*! ../autocomplete/event_bus.js */ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js");

function autocomplete(selector, options, datasets, typeaheadObject) {
  datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 2);

  var inputs = zepto(selector).each(function(i, input) {
    var $input = zepto(input);
    var eventBus = new EventBus({el: $input});
    var typeahead = typeaheadObject || new Typeahead({
      input: $input,
      eventBus: eventBus,
      dropdownMenuContainer: options.dropdownMenuContainer,
      hint: options.hint === undefined ? true : !!options.hint,
      minLength: options.minLength,
      autoselect: options.autoselect,
      autoselectOnBlur: options.autoselectOnBlur,
      tabAutocomplete: options.tabAutocomplete,
      openOnFocus: options.openOnFocus,
      templates: options.templates,
      debug: options.debug,
      clearOnSelected: options.clearOnSelected,
      cssClasses: options.cssClasses,
      datasets: datasets,
      keyboardShortcuts: options.keyboardShortcuts,
      appendTo: options.appendTo,
      autoWidth: options.autoWidth,
      ariaLabel: options.ariaLabel || input.getAttribute('aria-label')
    });
    $input.data(typeaheadKey, typeahead);
  });

  // expose all methods in the `autocomplete` attribute
  inputs.autocomplete = {};
  _.each(['open', 'close', 'getVal', 'setVal', 'destroy', 'getWrapper'], function(method) {
    inputs.autocomplete[method] = function() {
      var methodArguments = arguments;
      var result;
      inputs.each(function(j, input) {
        var typeahead = zepto(input).data(typeaheadKey);
        result = typeahead[method].apply(typeahead, methodArguments);
      });
      return result;
    };
  });

  return inputs;
}

autocomplete.sources = Typeahead.sources;
autocomplete.escapeHighlightedString = _.escapeHighlightedString;

var wasAutocompleteSet = 'autocomplete' in window;
var oldAutocomplete = window.autocomplete;
autocomplete.noConflict = function noConflict() {
  if (wasAutocompleteSet) {
    window.autocomplete = oldAutocomplete;
  } else {
    delete window.autocomplete;
  }
  return autocomplete;
};

module.exports = autocomplete;


/***/ }),

/***/ "./node_modules/autocomplete.js/version.js":
/*!*************************************************!*\
  !*** ./node_modules/autocomplete.js/version.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "0.37.1";


/***/ }),

/***/ "./node_modules/autocomplete.js/zepto.js":
/*!***********************************************!*\
  !*** ./node_modules/autocomplete.js/zepto.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* istanbul ignore next */
/* Zepto v1.2.0 - zepto event assets data - zeptojs.com/license */
(function(global, factory) {
  module.exports = factory(global);
}(/* this ##### UPDATED: here we want to use window/global instead of this which is the current file context ##### */ window, function(window) {
  var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.matches || element.webkitMatchesSelector ||
                          element.mozMatchesSelector || element.oMatchesSelector ||
                          element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }

  function likeArray(obj) {
    var length = !!obj && 'length' in obj && obj.length,
      type = $.type(obj)

    return 'function' != type && !isWindow(obj) && (
      'array' == type || length === 0 ||
        (typeof length == 'number' && length > 0 && (length - 1) in obj)
    )
  }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overridden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. This method can be overridden in plugins.
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overridden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overridden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overridden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
      slice.call(
        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          +value + "" == value ? +value :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.isNumeric = function(val) {
    var num = Number(val), type = typeof val
    return val != null && type != 'boolean' &&
      (type != 'string' || val.length) &&
      !isNaN(num) && isFinite(num) || false
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }
  $.noop = function() {}

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    constructor: zepto.Z,
    length: 0,

    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    splice: emptyArray.splice,
    indexOf: emptyArray.indexOf,
    concat: function(){
      var i, value, args = []
      for (i = 0; i < arguments.length; i++) {
        value = arguments[i]
        args[i] = zepto.isZ(value) ? value.toArray() : value
      }
      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
    },

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (!selector) result = $()
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var nodes = [], collection = typeof selector == 'object' && $(selector)
      this.each(function(_, node){
        while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
          node = node !== context && !isDocument(node) && node.parentNode
        if (node && nodes.indexOf(node) < 0) nodes.push(node)
      })
      return $(nodes)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this.pluck('textContent').join("") : null)
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
        setAttribute(this, attribute)
      }, this)})
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :
        (this[0] && this[0][name])
    },
    removeProp: function(name){
      name = propMap[name] || name
      return this.each(function(){ delete this[name] })
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      if (0 in arguments) {
        if (value == null) value = ""
        return this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
      } else {
        return this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
      }
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (!this.length) return null
      if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))
        return {top: 0, left: 0}
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var element = this[0]
        if (typeof property == 'string') {
          if (!element) return
          return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
        } else if (isArray(property)) {
          if (!element) return
          var props = {}
          var computedStyle = getComputedStyle(element, '')
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        if (!('className' in this)) return
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (!('className' in this)) return
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            var arr = []
            argType = type(arg)
            if (argType == "array") {
              arg.forEach(function(el) {
                if (el.nodeType !== undefined) return arr.push(el)
                else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())
                arr = arr.concat(zepto.fragment(el))
              })
              return arr
            }
            return argType == "object" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src){
              var target = el.ownerDocument ? el.ownerDocument.defaultView : window
              target['eval'].call(target, el.innerHTML)
            }
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        try {
          var dataPropDescriptor = Object.getOwnPropertyDescriptor(e, 'data')
          if (!dataPropDescriptor || dataPropDescriptor.writable)
            e.data = data
        } catch (e) {} // when using strict mode dataPropDescriptor will be undefined when e is InputEvent (even though data property exists). So we surround with try/catch
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2)
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn)
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      try {
        event.timeStamp || (event.timeStamp = Date.now())
      } catch (ignored) { }

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (callback === undefined || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return (0 in arguments) ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function($){
  var cache = [], timeout

  $.fn.remove = function(){
    return this.each(function(){
      if(this.parentNode){
        if(this.tagName === 'IMG'){
          cache.push(this)
          this.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
          if (timeout) clearTimeout(timeout)
          timeout = setTimeout(function(){ cache = [] }, 60000)
        }
        this.parentNode.removeChild(this)
      }
    })
  }
})(Zepto)

;(function($){
  var data = {}, dataAttr = $.fn.data, camelize = $.camelCase,
    exp = $.expando = 'Zepto' + (+new Date()), emptyArray = []

  // Get value from node:
  // 1. first try key as given,
  // 2. then try camelized key,
  // 3. fall back to reading "data-*" attribute.
  function getData(node, name) {
    var id = node[exp], store = id && data[id]
    if (name === undefined) return store || setData(node)
    else {
      if (store) {
        if (name in store) return store[name]
        var camelName = camelize(name)
        if (camelName in store) return store[camelName]
      }
      return dataAttr.call($(node), name)
    }
  }

  // Store value under camelized key on node
  function setData(node, name, value) {
    var id = node[exp] || (node[exp] = ++$.uuid),
      store = data[id] || (data[id] = attributeData(node))
    if (name !== undefined) store[camelize(name)] = value
    return store
  }

  // Read all "data-*" attributes from a node
  function attributeData(node) {
    var store = {}
    $.each(node.attributes || emptyArray, function(i, attr){
      if (attr.name.indexOf('data-') == 0)
        store[camelize(attr.name.replace('data-', ''))] =
          $.zepto.deserializeValue(attr.value)
    })
    return store
  }

  $.fn.data = function(name, value) {
    return value === undefined ?
      // set multiple values via object
      $.isPlainObject(name) ?
        this.each(function(i, node){
          $.each(name, function(key, value){ setData(node, key, value) })
        }) :
        // get value from first element
        (0 in this ? getData(this[0], name) : undefined) :
      // set value on all elements
      this.each(function(){ setData(this, name, value) })
  }

  $.data = function(elem, name, value) {
    return $(elem).data(name, value)
  }

  $.hasData = function(elem) {
    var id = elem[exp], store = id && data[id]
    return store ? !$.isEmptyObject(store) : false
  }

  $.fn.removeData = function(names) {
    if (typeof names == 'string') names = names.split(/\s+/)
    return this.each(function(){
      var id = this[exp], store = id && data[id]
      if (store) $.each(names || store, function(key){
        delete store[names ? camelize(this) : key]
      })
    })
  }

  // Generate extended `remove` and `empty` functions
  ;['remove', 'empty'].forEach(function(methodName){
    var origFn = $.fn[methodName]
    $.fn[methodName] = function() {
      var elements = this.find('*')
      if (methodName === 'remove') elements = elements.add(this)
      elements.removeData()
      return origFn.call(this)
    }
  })
})(Zepto)
  return Zepto
}))


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style/style.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style/style.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ../images/summer.jpg */ "./src/images/summer.jpg");
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(/*! ../images/sunset.jpg */ "./src/images/sunset.jpg");
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
// Module
exports.push([module.i, "#main {\r\n  display: block;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n  background-size: cover;\r\n  background-position-y: 100%;\r\n  height: 80vh;\r\n}\r\n\r\n#image {\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\r\n  background-size: cover;\r\n  background-position-y: 100%;\r\n  height: 75vh;\r\n}\r\n\r\n#section {\r\n  display: none;\r\n  height: 80vh;\r\n}\r\n\r\n#temp,\r\n#feel,\r\n#desc,\r\n#pressure,\r\n#humidity,\r\n#minTemp,\r\n#maxTemp,\r\n#wind,\r\n#windDir,\r\n#clouds,\r\n#sunrise,\r\n#sunset {\r\n  background-color: rgba(255, 255, 255, 0.1);\r\n}\r\n\r\n#home {\r\n  cursor: pointer;\r\n}\r\n\r\n/* Main input wrapper */\r\n.algolia-places {}\r\n\r\n/* The algolia-places input */\r\n.ap-input, .ap-hint {}\r\n\r\n/* The style of the svg icons when the input is on hover */\r\n.ap-input:hover ~ .ap-input-icon svg,\r\n.ap-input:focus ~ .ap-input-icon svg,\r\n.ap-input-icon:hover svg {}\r\n\r\n/* The dropdown style */\r\n.ap-dropdown-menu {}\r\n\r\n/* The suggestions style */\r\n.ap-suggestion {\r\n  text-align: start;\r\n}\r\n\r\n/* The highlighted names style */\r\n.ap-suggestion em {}\r\n\r\n/* The addresses style */\r\n.ap-address {}\r\n\r\n/* The icons of each suggestions ( can be a building or a pin ) */\r\n.ap-suggestion-icon {}\r\n\r\n/* The style of the svg inside the .ap-suggestion-icon */\r\n.ap-suggestion-icon svg {}\r\n\r\n/* The icons inside the input ( can be a pin or a cross ) */\r\n.ap-input-icon {right: 235px;}\r\n\r\n/* The style of the svg inside the .ap-input-icon */\r\n.ap-input-icon svg {}\r\n\r\n/* .a-cursor is the class a suggestion go on hover */\r\n.ap-cursor {}\r\n\r\n/* The style of the svg icon, when the .ap-suggestion is on hover */\r\n.ap-cursor .ap-suggestion-icon svg {}\r\n\r\n/* The styles of the Algolia Places input footer */\r\n.ap-footer {}\r\n\r\n/* The styles of the Algolia Places input footer links */\r\n.ap-footer a {}\r\n\r\n/* The styles of the Algolia Places input footer svg icons */\r\n.ap-footer a svg {}\r\n\r\n/* The styles of the Algolia Places input footer on hover */\r\n.ap-footer:hover {}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/debug/src/debug.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/debug.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/foreach/index.js":
/*!***************************************!*\
  !*** ./node_modules/foreach/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),

/***/ "./node_modules/global/window.js":
/*!***************************************!*\
  !*** ./node_modules/global/window.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/immediate/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var types = [
  __webpack_require__(/*! ./nextTick */ 0),
  __webpack_require__(/*! ./queueMicrotask */ "./node_modules/immediate/lib/queueMicrotask.js"),
  __webpack_require__(/*! ./mutation.js */ "./node_modules/immediate/lib/mutation.js"),
  __webpack_require__(/*! ./messageChannel */ "./node_modules/immediate/lib/messageChannel.js"),
  __webpack_require__(/*! ./stateChange */ "./node_modules/immediate/lib/stateChange.js"),
  __webpack_require__(/*! ./timeout */ "./node_modules/immediate/lib/timeout.js")
];
var draining;
var currentQueue;
var queueIndex = -1;
var queue = [];
var scheduled = false;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    nextTick();
  }
}

//named nextTick for less confusing stack traces
function nextTick() {
  if (draining) {
    return;
  }
  scheduled = false;
  draining = true;
  var len = queue.length;
  var timeout = setTimeout(cleanUpNextTick);
  while (len) {
    currentQueue = queue;
    queue = [];
    while (currentQueue && ++queueIndex < len) {
      currentQueue[queueIndex].run();
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  queueIndex = -1;
  draining = false;
  clearTimeout(timeout);
}
var scheduleDrain;
var i = -1;
var len = types.length;
while (++i < len) {
  if (types[i] && types[i].test && types[i].test()) {
    scheduleDrain = types[i].install(nextTick);
    break;
  }
}
// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  var fun = this.fun;
  var array = this.array;
  switch (array.length) {
  case 0:
    return fun();
  case 1:
    return fun(array[0]);
  case 2:
    return fun(array[0], array[1]);
  case 3:
    return fun(array[0], array[1], array[2]);
  default:
    return fun.apply(null, array);
  }

};
module.exports = immediate;
function immediate(task) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(task, args));
  if (!scheduled && !draining) {
    scheduled = true;
    scheduleDrain();
  }
}


/***/ }),

/***/ "./node_modules/immediate/lib/messageChannel.js":
/*!******************************************************!*\
  !*** ./node_modules/immediate/lib/messageChannel.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.test = function () {
  if (global.setImmediate) {
    // we can only get here in IE10
    // which doesn't handel postMessage well
    return false;
  }
  return typeof global.MessageChannel !== 'undefined';
};

exports.install = function (func) {
  var channel = new global.MessageChannel();
  channel.port1.onmessage = func;
  return function () {
    channel.port2.postMessage(0);
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/mutation.js":
/*!************************************************!*\
  !*** ./node_modules/immediate/lib/mutation.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
//based off rsvp https://github.com/tildeio/rsvp.js
//license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

var Mutation = global.MutationObserver || global.WebKitMutationObserver;

exports.test = function () {
  return Mutation;
};

exports.install = function (handle) {
  var called = 0;
  var observer = new Mutation(handle);
  var element = global.document.createTextNode('');
  observer.observe(element, {
    characterData: true
  });
  return function () {
    element.data = (called = ++called % 2);
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/queueMicrotask.js":
/*!******************************************************!*\
  !*** ./node_modules/immediate/lib/queueMicrotask.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
exports.test = function () {
  return typeof global.queueMicrotask === 'function';
};

exports.install = function (func) {
  return function () {
    global.queueMicrotask(func);
  };
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/stateChange.js":
/*!***************************************************!*\
  !*** ./node_modules/immediate/lib/stateChange.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.test = function () {
  return 'document' in global && 'onreadystatechange' in global.document.createElement('script');
};

exports.install = function (handle) {
  return function () {

    // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
    // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
    var scriptEl = global.document.createElement('script');
    scriptEl.onreadystatechange = function () {
      handle();

      scriptEl.onreadystatechange = null;
      scriptEl.parentNode.removeChild(scriptEl);
      scriptEl = null;
    };
    global.document.documentElement.appendChild(scriptEl);

    return handle;
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/timeout.js":
/*!***********************************************!*\
  !*** ./node_modules/immediate/lib/timeout.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.test = function () {
  return true;
};

exports.install = function (t) {
  return function () {
    setTimeout(t, 0);
  };
};

/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/insert-css/index.js":
/*!******************************************!*\
  !*** ./node_modules/insert-css/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var containers = []; // will store container HTMLElement references
var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

function insertCss(css, options) {
    options = options || {};

    if (css === undefined) {
        throw new Error(usage);
    }

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css
    } else {
        styleElement.textContent += css;
    }

    return styleElement;
};

function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

module.exports = insertCss;
module.exports.insertCss = insertCss;


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/places.js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/places.js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// we need to export using commonjs for ease of usage in all
// JavaScript environments
// We therefore need to import in commonjs too. see:
// https://github.com/webpack/webpack/issues/4039

/* eslint-disable import/no-commonjs */
var places = __webpack_require__(/*! ./src/places */ "./node_modules/places.js/src/places.js");

var version = __webpack_require__(/*! ./src/version */ "./node_modules/places.js/src/version.js"); // must use module.exports to be commonJS compatible


module.exports = places["default"];
module.exports.version = version["default"];
/* eslint-enable import/no-commonjs */


/***/ }),

/***/ "./node_modules/places.js/src/configure/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/places.js/src/configure/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var extractParams = function extractParams(_ref) {
  var hitsPerPage = _ref.hitsPerPage,
      postcodeSearch = _ref.postcodeSearch,
      aroundLatLng = _ref.aroundLatLng,
      aroundRadius = _ref.aroundRadius,
      aroundLatLngViaIP = _ref.aroundLatLngViaIP,
      insideBoundingBox = _ref.insideBoundingBox,
      insidePolygon = _ref.insidePolygon,
      getRankingInfo = _ref.getRankingInfo,
      countries = _ref.countries,
      language = _ref.language,
      type = _ref.type;
  var extracted = {
    countries: countries,
    hitsPerPage: hitsPerPage || 5,
    language: language || navigator.language.split('-')[0],
    type: type
  };

  if (Array.isArray(countries)) {
    extracted.countries = extracted.countries.map(function (country) {
      return country.toLowerCase();
    });
  }

  if (typeof extracted.language === 'string') {
    extracted.language = extracted.language.toLowerCase();
  }

  if (aroundLatLng) {
    extracted.aroundLatLng = aroundLatLng;
  } else if (aroundLatLngViaIP !== undefined) {
    extracted.aroundLatLngViaIP = aroundLatLngViaIP;
  }

  if (postcodeSearch) {
    extracted.restrictSearchableAttributes = 'postcode';
  }

  return _objectSpread(_objectSpread({}, extracted), {}, {
    aroundRadius: aroundRadius,
    insideBoundingBox: insideBoundingBox,
    insidePolygon: insidePolygon,
    getRankingInfo: getRankingInfo
  });
};

var extractControls = function extractControls(_ref2) {
  var _ref2$useDeviceLocati = _ref2.useDeviceLocation,
      useDeviceLocation = _ref2$useDeviceLocati === void 0 ? false : _ref2$useDeviceLocati,
      _ref2$computeQueryPar = _ref2.computeQueryParams,
      computeQueryParams = _ref2$computeQueryPar === void 0 ? function (params) {
    return params;
  } : _ref2$computeQueryPar,
      formatInputValue = _ref2.formatInputValue,
      _ref2$onHits = _ref2.onHits,
      onHits = _ref2$onHits === void 0 ? function () {} : _ref2$onHits,
      _ref2$onError = _ref2.onError,
      onError = _ref2$onError === void 0 ? function (e) {
    throw e;
  } : _ref2$onError,
      onRateLimitReached = _ref2.onRateLimitReached,
      onInvalidCredentials = _ref2.onInvalidCredentials;
  return {
    useDeviceLocation: useDeviceLocation,
    computeQueryParams: computeQueryParams,
    formatInputValue: formatInputValue,
    onHits: onHits,
    onError: onError,
    onRateLimitReached: onRateLimitReached,
    onInvalidCredentials: onInvalidCredentials
  };
};

var params = {};
var controls = {};

var configure = function configure(configuration) {
  params = extractParams(_objectSpread(_objectSpread({}, params), configuration));
  controls = extractControls(_objectSpread(_objectSpread({}, controls), configuration));
  return {
    params: params,
    controls: controls
  };
};

var _default = configure;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/places.js/src/createAutocompleteDataset.js":
/*!*****************************************************************!*\
  !*** ./node_modules/places.js/src/createAutocompleteDataset.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createAutocompleteDataset;

var _createAutocompleteSource = _interopRequireDefault(__webpack_require__(/*! ./createAutocompleteSource */ "./node_modules/places.js/src/createAutocompleteSource.js"));

var _defaultTemplates = _interopRequireDefault(__webpack_require__(/*! ./defaultTemplates */ "./node_modules/places.js/src/defaultTemplates.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAutocompleteDataset(options) {
  var templates = _objectSpread(_objectSpread({}, _defaultTemplates["default"]), options.templates);

  var source = (0, _createAutocompleteSource["default"])(_objectSpread(_objectSpread({}, options), {}, {
    formatInputValue: templates.value,
    templates: undefined
  }));
  return {
    source: source,
    templates: templates,
    displayKey: 'value',
    name: 'places',
    cache: false
  };
}

/***/ }),

/***/ "./node_modules/places.js/src/createAutocompleteSource.js":
/*!****************************************************************!*\
  !*** ./node_modules/places.js/src/createAutocompleteSource.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createAutocompleteSource;

var _configure = _interopRequireDefault(__webpack_require__(/*! ./configure */ "./node_modules/places.js/src/configure/index.js"));

var _formatHit = _interopRequireDefault(__webpack_require__(/*! ./formatHit */ "./node_modules/places.js/src/formatHit.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version */ "./node_modules/places.js/src/version.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAutocompleteSource(_ref) {
  var algoliasearch = _ref.algoliasearch,
      clientOptions = _ref.clientOptions,
      apiKey = _ref.apiKey,
      appId = _ref.appId,
      hitsPerPage = _ref.hitsPerPage,
      postcodeSearch = _ref.postcodeSearch,
      aroundLatLng = _ref.aroundLatLng,
      aroundRadius = _ref.aroundRadius,
      aroundLatLngViaIP = _ref.aroundLatLngViaIP,
      insideBoundingBox = _ref.insideBoundingBox,
      insidePolygon = _ref.insidePolygon,
      getRankingInfo = _ref.getRankingInfo,
      countries = _ref.countries,
      formatInputValue = _ref.formatInputValue,
      _ref$computeQueryPara = _ref.computeQueryParams,
      computeQueryParams = _ref$computeQueryPara === void 0 ? function (params) {
    return params;
  } : _ref$computeQueryPara,
      _ref$useDeviceLocatio = _ref.useDeviceLocation,
      useDeviceLocation = _ref$useDeviceLocatio === void 0 ? false : _ref$useDeviceLocatio,
      _ref$language = _ref.language,
      language = _ref$language === void 0 ? navigator.language.split('-')[0] : _ref$language,
      _ref$onHits = _ref.onHits,
      onHits = _ref$onHits === void 0 ? function () {} : _ref$onHits,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? function (e) {
    throw e;
  } : _ref$onError,
      onRateLimitReached = _ref.onRateLimitReached,
      onInvalidCredentials = _ref.onInvalidCredentials,
      type = _ref.type;
  var placesClient = algoliasearch.initPlaces(appId, apiKey, clientOptions);
  placesClient.as.addAlgoliaAgent("Algolia Places ".concat(_version["default"]));
  var configuration = (0, _configure["default"])({
    hitsPerPage: hitsPerPage,
    type: type,
    postcodeSearch: postcodeSearch,
    countries: countries,
    language: language,
    aroundLatLng: aroundLatLng,
    aroundRadius: aroundRadius,
    aroundLatLngViaIP: aroundLatLngViaIP,
    insideBoundingBox: insideBoundingBox,
    insidePolygon: insidePolygon,
    getRankingInfo: getRankingInfo,
    formatInputValue: formatInputValue,
    computeQueryParams: computeQueryParams,
    useDeviceLocation: useDeviceLocation,
    onHits: onHits,
    onError: onError,
    onRateLimitReached: onRateLimitReached,
    onInvalidCredentials: onInvalidCredentials
  });
  var params = configuration.params;
  var controls = configuration.controls;
  var userCoords;
  var tracker = null;

  if (controls.useDeviceLocation) {
    tracker = navigator.geolocation.watchPosition(function (_ref2) {
      var coords = _ref2.coords;
      userCoords = "".concat(coords.latitude, ",").concat(coords.longitude);
    });
  }

  function searcher(query, cb) {
    var searchParams = _objectSpread(_objectSpread({}, params), {}, {
      query: query
    });

    if (userCoords) {
      searchParams.aroundLatLng = userCoords;
    }

    return placesClient.search(controls.computeQueryParams(searchParams)).then(function (content) {
      var hits = content.hits.map(function (hit, hitIndex) {
        return (0, _formatHit["default"])({
          formatInputValue: controls.formatInputValue,
          hit: hit,
          hitIndex: hitIndex,
          query: query,
          rawAnswer: content
        });
      });
      controls.onHits({
        hits: hits,
        query: query,
        rawAnswer: content
      });
      return hits;
    }).then(cb)["catch"](function (e) {
      if (e.statusCode === 403 && e.message === 'Invalid Application-ID or API key') {
        controls.onInvalidCredentials();
        return;
      } else if (e.statusCode === 429) {
        controls.onRateLimitReached();
        return;
      }

      controls.onError(e);
    });
  }

  searcher.configure = function (partial) {
    var updated = (0, _configure["default"])(_objectSpread(_objectSpread(_objectSpread({}, params), controls), partial));
    params = updated.params;
    controls = updated.controls;

    if (controls.useDeviceLocation && tracker === null) {
      tracker = navigator.geolocation.watchPosition(function (_ref3) {
        var coords = _ref3.coords;
        userCoords = "".concat(coords.latitude, ",").concat(coords.longitude);
      });
    } else if (!controls.useDeviceLocation && tracker !== null) {
      navigator.geolocation.clearWatch(tracker);
      tracker = null;
      userCoords = null;
    }
  };

  return searcher;
}

/***/ }),

/***/ "./node_modules/places.js/src/createReverseGeocodingSource.js":
/*!********************************************************************!*\
  !*** ./node_modules/places.js/src/createReverseGeocodingSource.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _configure = _interopRequireDefault(__webpack_require__(/*! ./configure */ "./node_modules/places.js/src/configure/index.js"));

var _formatHit = _interopRequireDefault(__webpack_require__(/*! ./formatHit */ "./node_modules/places.js/src/formatHit.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version */ "./node_modules/places.js/src/version.js"));

var _defaultTemplates = _interopRequireDefault(__webpack_require__(/*! ./defaultTemplates */ "./node_modules/places.js/src/defaultTemplates.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var filterApplicableParams = function filterApplicableParams(params) {
  var hitsPerPage = params.hitsPerPage,
      aroundLatLng = params.aroundLatLng,
      getRankingInfo = params.getRankingInfo,
      language = params.language;
  var filtered = {};

  if (typeof hitsPerPage === 'number') {
    filtered.hitsPerPage = hitsPerPage;
  }

  if (typeof language === 'string') {
    filtered.language = language;
  }

  if (typeof getRankingInfo === 'boolean') {
    filtered.getRankingInfo = getRankingInfo;
  }

  if (typeof aroundLatLng === 'string') {
    filtered.aroundLatLng = aroundLatLng;
  }

  return filtered;
};

var createReverseGeocodingSource = function createReverseGeocodingSource(_ref) {
  var algoliasearch = _ref.algoliasearch,
      clientOptions = _ref.clientOptions,
      apiKey = _ref.apiKey,
      appId = _ref.appId,
      hitsPerPage = _ref.hitsPerPage,
      aroundLatLng = _ref.aroundLatLng,
      getRankingInfo = _ref.getRankingInfo,
      _ref$formatInputValue = _ref.formatInputValue,
      formatInputValue = _ref$formatInputValue === void 0 ? _defaultTemplates["default"].value : _ref$formatInputValue,
      _ref$language = _ref.language,
      language = _ref$language === void 0 ? navigator.language.split('-')[0] : _ref$language,
      _ref$onHits = _ref.onHits,
      onHits = _ref$onHits === void 0 ? function () {} : _ref$onHits,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? function (e) {
    throw e;
  } : _ref$onError,
      onRateLimitReached = _ref.onRateLimitReached,
      onInvalidCredentials = _ref.onInvalidCredentials;
  var placesClient = algoliasearch.initPlaces(appId, apiKey, clientOptions);
  placesClient.as.addAlgoliaAgent("Algolia Places ".concat(_version["default"]));
  var configuration = (0, _configure["default"])({
    apiKey: apiKey,
    appId: appId,
    hitsPerPage: hitsPerPage,
    aroundLatLng: aroundLatLng,
    getRankingInfo: getRankingInfo,
    language: language,
    formatInputValue: formatInputValue,
    onHits: onHits,
    onError: onError,
    onRateLimitReached: onRateLimitReached,
    onInvalidCredentials: onInvalidCredentials
  });
  var params = filterApplicableParams(configuration.params);
  var controls = configuration.controls;

  var searcher = function searcher(queryAroundLatLng, cb) {
    var finalAroundLatLng = queryAroundLatLng || params.aroundLatLng;

    if (!finalAroundLatLng) {
      var error = new Error('A location must be provided for reverse geocoding');
      return Promise.reject(error);
    }

    return placesClient.reverse(_objectSpread(_objectSpread({}, params), {}, {
      aroundLatLng: finalAroundLatLng
    })).then(function (content) {
      var hits = content.hits.map(function (hit, hitIndex) {
        return (0, _formatHit["default"])({
          formatInputValue: controls.formatInputValue,
          hit: hit,
          hitIndex: hitIndex,
          query: finalAroundLatLng,
          rawAnswer: content
        });
      });
      controls.onHits({
        hits: hits,
        query: finalAroundLatLng,
        rawAnswer: content
      });
      return hits;
    }).then(cb)["catch"](function (e) {
      if (e.statusCode === 403 && e.message === 'Invalid Application-ID or API key') {
        controls.onInvalidCredentials();
        return;
      } else if (e.statusCode === 429) {
        controls.onRateLimitReached();
        return;
      }

      controls.onError(e);
    });
  };

  searcher.configure = function (partial) {
    var updated = (0, _configure["default"])(_objectSpread(_objectSpread(_objectSpread({}, params), controls), partial));
    params = filterApplicableParams(updated.params);
    controls = updated.controls;
    return searcher;
  };

  return searcher;
};

var _default = createReverseGeocodingSource;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/places.js/src/defaultTemplates.js":
/*!********************************************************!*\
  !*** ./node_modules/places.js/src/defaultTemplates.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _formatInputValue = _interopRequireDefault(__webpack_require__(/*! ./formatInputValue */ "./node_modules/places.js/src/formatInputValue.js"));

var _formatDropdownValue = _interopRequireDefault(__webpack_require__(/*! ./formatDropdownValue */ "./node_modules/places.js/src/formatDropdownValue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* babel-plugin-inline-import './icons/algolia.svg' */
var algoliaLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"117\" height=\"17\" viewBox=\"0 0 130 19\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill-rule=\"nonzero\"><path fill=\"#5468FF\" d=\"M59.399.044h13.299a2.372 2.372 0 0 1 2.377 2.364v13.234a2.372 2.372 0 0 1-2.377 2.364H59.399a2.372 2.372 0 0 1-2.377-2.364V2.403A2.368 2.368 0 0 1 59.399.044z\"/><path fill=\"#FFF\" d=\"M66.257 4.582c-2.815 0-5.1 2.272-5.1 5.078 0 2.806 2.284 5.072 5.1 5.072 2.815 0 5.1-2.272 5.1-5.078 0-2.806-2.279-5.072-5.1-5.072zm0 8.652c-1.983 0-3.593-1.602-3.593-3.574 0-1.972 1.61-3.574 3.593-3.574 1.983 0 3.593 1.602 3.593 3.574a3.582 3.582 0 0 1-3.593 3.574zm0-6.418V9.48c0 .076.082.131.153.093l2.377-1.226c.055-.027.071-.093.044-.147a2.96 2.96 0 0 0-2.465-1.487c-.055 0-.11.044-.11.104h.001zm-3.33-1.956l-.312-.31a.783.783 0 0 0-1.106 0l-.372.37a.773.773 0 0 0 0 1.1l.307.305c.049.05.121.038.164-.01.181-.246.378-.48.597-.698.225-.223.455-.42.707-.599.055-.033.06-.109.016-.158h-.001zm5.001-.806v-.616a.781.781 0 0 0-.783-.779h-1.824a.78.78 0 0 0-.783.78v.631c0 .071.066.12.137.104a5.736 5.736 0 0 1 1.588-.223c.52 0 1.035.071 1.534.207a.106.106 0 0 0 .131-.104z\"/><path fill=\"#252C61\" d=\"M5.027 10.246c0 .698-.252 1.246-.757 1.644-.505.397-1.201.596-2.089.596-.888 0-1.615-.138-2.181-.414v-1.214c.358.168.739.301 1.141.397.403.097.778.145 1.125.145.508 0 .884-.097 1.125-.29a.945.945 0 0 0 .363-.779.978.978 0 0 0-.333-.747c-.222-.204-.68-.446-1.375-.725C1.33 8.57.825 8.24.531 7.865c-.294-.372-.44-.82-.44-1.343 0-.655.233-1.17.698-1.547.465-.376 1.09-.564 1.875-.564.752 0 1.5.165 2.245.494l-.408 1.047c-.698-.294-1.321-.44-1.869-.44-.415 0-.73.09-.945.271a.89.89 0 0 0-.322.717c0 .204.043.38.129.524.086.145.227.282.424.411.197.13.551.3 1.063.51.577.24.999.464 1.268.671.269.208.465.442.591.704.125.261.188.57.188.924l-.001.002zm3.98 2.24c-.924 0-1.646-.269-2.167-.808-.521-.539-.781-1.28-.781-2.226 0-.97.242-1.733.725-2.288.483-.555 1.148-.833 1.993-.833.784 0 1.404.238 1.858.714.455.476.682 1.132.682 1.966v.682H7.359c.018.577.174 1.02.467 1.33.294.31.707.464 1.241.464.351 0 .678-.033.98-.099a5.1 5.1 0 0 0 .975-.33v1.026a3.865 3.865 0 0 1-.935.312 5.723 5.723 0 0 1-1.08.091zm7.46-.107l-.252-.827h-.043c-.286.362-.575.608-.865.74-.29.13-.662.195-1.117.195-.584 0-1.039-.158-1.367-.473-.328-.315-.491-.76-.491-1.337 0-.612.227-1.074.682-1.386.455-.312 1.148-.482 2.079-.51l1.026-.032v-.317c0-.38-.089-.663-.266-.85-.177-.189-.452-.283-.824-.283-.304 0-.596.045-.875.134a6.68 6.68 0 0 0-.806.317l-.408-.902a4.414 4.414 0 0 1 1.058-.384 4.856 4.856 0 0 1 1.085-.132c.756 0 1.326.165 1.711.494.385.33.577.847.577 1.552v4.001h-.904zm5.677-6.048c.254 0 .464.018.628.054l-.124 1.176a2.383 2.383 0 0 0-.559-.064c-.505 0-.914.165-1.227.494-.313.33-.47.757-.47 1.284v3.104H19.13V6.44h.988l.167 1.047h.064c.197-.354.454-.636.771-.843a1.83 1.83 0 0 1 1.023-.312h.001zm4.125 6.155c-.899 0-1.582-.262-2.049-.787-.467-.525-.701-1.277-.701-2.259 0-.999.244-1.767.733-2.304.489-.537 1.195-.806 2.119-.806.627 0 1.191.116 1.692.35l-.381 1.014c-.534-.208-.974-.312-1.321-.312-1.028 0-1.542.682-1.542 2.046 0 .666.128 1.166.384 1.501.256.335.631.502 1.125.502a3.23 3.23 0 0 0 1.595-.419v1.101a2.53 2.53 0 0 1-.722.285 4.356 4.356 0 0 1-.932.086v.002zm8.277-.107h-1.268V8.727c0-.458-.092-.8-.277-1.026-.184-.226-.477-.338-.878-.338-.53 0-.919.158-1.168.475-.249.317-.373.848-.373 1.593v2.95H29.32V4.022h1.262v2.122c0 .34-.021.704-.064 1.09h.081a1.76 1.76 0 0 1 .717-.666c.306-.158.663-.236 1.072-.236 1.439 0 2.159.725 2.159 2.175v3.873l-.001-.002zm7.648-6.048c.741 0 1.319.27 1.732.806.414.537.62 1.291.62 2.261 0 .974-.209 1.732-.628 2.275-.419.542-1.001.814-1.746.814-.752 0-1.336-.27-1.751-.81h-.086l-.231.703h-.945V4.023h1.262V6.01l-.021.655-.032.553h.054c.401-.59.992-.886 1.772-.886zm2.917.107h1.375l1.208 3.368c.183.48.304.931.365 1.354h.043c.032-.197.091-.436.177-.717.086-.28.541-1.616 1.364-4.004h1.364l-2.541 6.73c-.462 1.235-1.232 1.853-2.31 1.853-.279 0-.551-.03-.816-.09v-1c.19.043.406.064.65.064.609 0 1.037-.353 1.284-1.058l.22-.559-2.385-5.94h.002zm-3.244.924c-.508 0-.875.15-1.098.448-.224.3-.339.8-.346 1.501v.086c0 .723.115 1.247.344 1.571.229.324.603.486 1.123.486.448 0 .787-.177 1.018-.532.231-.354.346-.867.346-1.536 0-1.35-.462-2.025-1.386-2.025l-.001.001zm-27.28 4.157c.458 0 .826-.128 1.104-.384.278-.256.416-.615.416-1.077v-.516l-.763.032c-.594.021-1.027.121-1.297.298s-.406.448-.406.814c0 .265.079.47.236.615.158.145.394.218.709.218h.001zM8.775 7.287c-.401 0-.722.127-.964.381s-.386.625-.432 1.112h2.696c-.007-.49-.125-.862-.354-1.115-.229-.252-.544-.379-.945-.379l-.001.001z\"/></g><path fill=\"#5468FF\" d=\"M102.162 13.784c0 1.455-.372 2.517-1.123 3.193-.75.676-1.895 1.013-3.44 1.013-.564 0-1.736-.109-2.673-.316l.345-1.689c.783.163 1.819.207 2.361.207.86 0 1.473-.174 1.84-.523.367-.349.548-.866.548-1.553v-.349a6.374 6.374 0 0 1-.838.316 4.151 4.151 0 0 1-1.194.158 4.515 4.515 0 0 1-1.616-.278 3.385 3.385 0 0 1-1.254-.817 3.744 3.744 0 0 1-.811-1.35c-.192-.54-.29-1.505-.29-2.213 0-.665.104-1.498.307-2.054a3.925 3.925 0 0 1 .904-1.433 4.124 4.124 0 0 1 1.441-.926 5.31 5.31 0 0 1 1.945-.365c.696 0 1.337.087 1.961.191a15.86 15.86 0 0 1 1.588.332v8.456h-.001zm-5.955-4.206c0 .893.197 1.885.592 2.3.394.413.904.62 1.528.62.34 0 .663-.049.964-.142a2.75 2.75 0 0 0 .734-.332v-5.29a8.531 8.531 0 0 0-1.413-.18c-.778-.022-1.369.294-1.786.801-.411.507-.619 1.395-.619 2.223zm16.121 0c0 .72-.104 1.264-.318 1.858a4.389 4.389 0 0 1-.904 1.52c-.389.42-.854.746-1.402.975-.548.23-1.391.36-1.813.36-.422-.005-1.26-.125-1.802-.36a4.088 4.088 0 0 1-1.397-.975 4.486 4.486 0 0 1-.909-1.52 5.037 5.037 0 0 1-.329-1.858c0-.719.099-1.41.318-1.999.219-.588.526-1.09.92-1.509.394-.42.865-.74 1.402-.97a4.547 4.547 0 0 1 1.786-.338 4.69 4.69 0 0 1 1.791.338c.548.23 1.019.55 1.402.97.389.42.69.921.909 1.51.23.587.345 1.28.345 1.998h.001zm-2.192.005c0-.92-.203-1.689-.597-2.223-.394-.539-.948-.806-1.654-.806-.707 0-1.26.267-1.654.806-.394.54-.586 1.302-.586 2.223 0 .932.197 1.558.592 2.098.394.545.948.812 1.654.812.707 0 1.26-.272 1.654-.812.394-.545.592-1.166.592-2.098h-.001zm6.963 4.708c-3.511.016-3.511-2.822-3.511-3.274L113.583.95l2.142-.338v10.003c0 .256 0 1.88 1.375 1.885v1.793h-.001zM120.873 14.291h-2.153V5.095l2.153-.338zM119.794 3.75c.718 0 1.304-.579 1.304-1.292 0-.714-.581-1.29-1.304-1.29-.723 0-1.304.577-1.304 1.29 0 .714.586 1.291 1.304 1.291zm6.431 1.012c.707 0 1.304.087 1.786.262.482.174.871.42 1.156.73.285.311.488.735.608 1.182.126.447.186.937.186 1.476v5.481a25.24 25.24 0 0 1-1.495.251c-.668.098-1.419.147-2.251.147a6.829 6.829 0 0 1-1.517-.158 3.213 3.213 0 0 1-1.178-.507 2.455 2.455 0 0 1-.761-.904c-.181-.37-.274-.893-.274-1.438 0-.523.104-.855.307-1.215.208-.36.487-.654.838-.883a3.609 3.609 0 0 1 1.227-.49 7.073 7.073 0 0 1 2.202-.103c.263.027.537.076.833.147v-.349c0-.245-.027-.479-.088-.697a1.486 1.486 0 0 0-.307-.583c-.148-.169-.34-.3-.581-.392a2.536 2.536 0 0 0-.915-.163c-.493 0-.942.06-1.353.131-.411.071-.75.153-1.008.245l-.257-1.749c.268-.093.668-.185 1.183-.278a9.335 9.335 0 0 1 1.66-.142h-.001zm.179 7.73c.657 0 1.145-.038 1.484-.104V10.22a5.097 5.097 0 0 0-1.978-.104c-.241.033-.46.098-.652.191a1.167 1.167 0 0 0-.466.392c-.121.17-.175.267-.175.523 0 .501.175.79.493.981.323.196.75.29 1.293.29h.001zM84.108 4.816c.707 0 1.304.087 1.786.262.482.174.871.42 1.156.73.29.316.487.735.608 1.182.126.447.186.937.186 1.476v5.481a25.24 25.24 0 0 1-1.495.251c-.668.098-1.419.147-2.251.147a6.829 6.829 0 0 1-1.517-.158 3.213 3.213 0 0 1-1.178-.507 2.455 2.455 0 0 1-.761-.904c-.181-.37-.274-.893-.274-1.438 0-.523.104-.855.307-1.215.208-.36.487-.654.838-.883a3.609 3.609 0 0 1 1.227-.49 7.073 7.073 0 0 1 2.202-.103c.257.027.537.076.833.147v-.349c0-.245-.027-.479-.088-.697a1.486 1.486 0 0 0-.307-.583c-.148-.169-.34-.3-.581-.392a2.536 2.536 0 0 0-.915-.163c-.493 0-.942.06-1.353.131-.411.071-.75.153-1.008.245l-.257-1.749c.268-.093.668-.185 1.183-.278a8.89 8.89 0 0 1 1.66-.142h-.001zm.185 7.736c.657 0 1.145-.038 1.484-.104V10.28a5.097 5.097 0 0 0-1.978-.104c-.241.033-.46.098-.652.191a1.167 1.167 0 0 0-.466.392c-.121.17-.175.267-.175.523 0 .501.175.79.493.981.318.191.75.29 1.293.29h.001zm8.683 1.738c-3.511.016-3.511-2.822-3.511-3.274L89.46.948 91.602.61v10.003c0 .256 0 1.88 1.375 1.885v1.793h-.001z\"/></g></svg>";

/* babel-plugin-inline-import './icons/osm.svg' */
var osmLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\">\n  <path fill=\"#797979\" fill-rule=\"evenodd\" d=\"M6.577.5L5.304.005 2.627 1.02 0 0l.992 2.767-.986 2.685.998 2.76-1 2.717.613.22 3.39-3.45.563.06.726-.69s-.717-.92-.91-1.86c.193-.146.184-.14.355-.285C4.1 1.93 6.58.5 6.58.5zm-4.17 11.354l.22.12 2.68-1.05 2.62 1.04 2.644-1.03 1.02-2.717-.33-.944s-1.13 1.26-3.44.878c-.174.29-.25.37-.25.37s-1.11-.31-1.683-.89c-.573.58-.795.71-.795.71l.08.634-2.76 2.89zm6.26-4.395c1.817 0 3.29-1.53 3.29-3.4 0-1.88-1.473-3.4-3.29-3.4s-3.29 1.52-3.29 3.4c0 1.87 1.473 3.4 3.29 3.4z\"/>\n</svg>\n";
var _default = {
  footer: "<div class=\"ap-footer\">\n  <a href=\"https://www.algolia.com/places\" title=\"Search by Algolia\" class=\"ap-footer-algolia\">".concat(algoliaLogo.trim(), "</a>\n  using <a href=\"https://community.algolia.com/places/documentation.html#license\" class=\"ap-footer-osm\" title=\"Algolia Places data \xA9 OpenStreetMap contributors\">").concat(osmLogo.trim(), " <span>data</span></a>\n  </div>"),
  value: _formatInputValue["default"],
  suggestion: _formatDropdownValue["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/places.js/src/errors.js":
/*!**********************************************!*\
  !*** ./node_modules/places.js/src/errors.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  multiContainers: "Algolia Places: 'container' must point to a single <input> element.\nExample: instantiate the library twice if you want to bind two <inputs>.\n\nSee https://community.algolia.com/places/documentation.html#api-options-container",
  badContainer: "Algolia Places: 'container' must point to an <input> element.\n\nSee https://community.algolia.com/places/documentation.html#api-options-container",
  rateLimitReached: "Algolia Places: Current rate limit reached.\n\nSign up for a free 100,000 queries/month account at\nhttps://www.algolia.com/users/sign_up/places.\n\nOr upgrade your 100,000 queries/month plan by contacting us at\nhttps://community.algolia.com/places/contact.html.",
  invalidCredentials: "The APP ID or API key provided is invalid.",
  invalidAppId: "Your APP ID is invalid. A Places APP ID starts with 'pl'. You must create a valid Places app first.\n\nCreate a free Places app here: https://www.algolia.com/users/sign_up/places"
};
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/places.js/src/findCountryCode.js":
/*!*******************************************************!*\
  !*** ./node_modules/places.js/src/findCountryCode.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = findCountryCode;

function findCountryCode(tags) {
  for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
    var tag = tags[tagIndex];
    var find = tag.match(/country\/(.*)?/);

    if (find) {
      return find[1];
    }
  }

  return undefined;
}

/***/ }),

/***/ "./node_modules/places.js/src/findType.js":
/*!************************************************!*\
  !*** ./node_modules/places.js/src/findType.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = findType;

function findType(tags) {
  var types = {
    country: 'country',
    city: 'city',
    'amenity/bus_station': 'busStop',
    'amenity/townhall': 'townhall',
    'railway/station': 'trainStation',
    'aeroway/aerodrome': 'airport',
    'aeroway/terminal': 'airport',
    'aeroway/gate': 'airport'
  };

  for (var t in types) {
    if (tags.indexOf(t) !== -1) {
      return types[t];
    }
  }

  return 'address';
}

/***/ }),

/***/ "./node_modules/places.js/src/formatDropdownValue.js":
/*!***********************************************************!*\
  !*** ./node_modules/places.js/src/formatDropdownValue.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatDropdownValue;

/* babel-plugin-inline-import './icons/address.svg' */
var addressIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n";

/* babel-plugin-inline-import './icons/city.svg' */
var cityIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 18 19\"><path d=\"M12 9V3L9 0 6 3v2H0v14h18V9h-6zm-8 8H2v-2h2v2zm0-4H2v-2h2v2zm0-4H2V7h2v2zm6 8H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V7h2v2zm0-4H8V3h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z\"/></svg>\n";

/* babel-plugin-inline-import './icons/country.svg' */
var countryIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n  <path d=\"M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L7 13v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H6V8h2c.55 0 1-.45 1-1V5h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\"/>\n</svg>\n";

/* babel-plugin-inline-import './icons/bus.svg' */
var busIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 54.9 50.5\"><path d=\"M9.6 12.7H8.5c-2.3 0-4.1 1.9-4.1 4.1v1.1c0 2.2 1.8 4 4 4.1v21.7h-.7c-1.3 0-2.3 1-2.3 2.3h7.1c0-1.3-1-2.3-2.3-2.3h-.5V22.1c2.2-.1 4-1.9 4-4.1v-1.1c0-2.3-1.8-4.2-4.1-4.2zM46 7.6h-7.5c0-1.8-1.5-3.3-3.3-3.3h-3.6c-1.8 0-3.3 1.5-3.3 3.3H21c-2.5 0-4.6 2-4.6 4.6v26.3c0 1.7 1.3 3.1 3 3.1h.8v1.6c0 1.7 1.4 3.1 3.1 3.1 1.7 0 3-1.4 3-3.1v-1.6h14.3v1.6c0 1.7 1.4 3.1 3.1 3.1 1.7 0 3.1-1.4 3.1-3.1v-1.6h.8c1.7 0 3.1-1.4 3.1-3.1V12.2c-.2-2.5-2.2-4.6-4.7-4.6zm-27.4 4.6c0-1.3 1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4v.3c0 1.3-1.1 2.4-2.4 2.4H21c-1.3 0-2.4-1.1-2.4-2.4v-.3zM21 38c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7zm0-10.1c-1.3 0-2.4-1.1-2.4-2.4v-6.6c0-1.3 1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4v6.6c0 1.3-1.1 2.4-2.4 2.4H21zm24.8 10c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7z\"/></svg>\n";

/* babel-plugin-inline-import './icons/train.svg' */
var trainIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 15 20\">\n  <path d=\"M13.105 20l-2.366-3.354H4.26L1.907 20H0l3.297-4.787c-1.1-.177-2.196-1.287-2.194-2.642V2.68C1.1 1.28 2.317-.002 3.973 0h7.065c1.647-.002 2.863 1.28 2.86 2.676v9.895c.003 1.36-1.094 2.47-2.194 2.647L15 20h-1.895zM6.11 2h2.78c.264 0 .472-.123.472-.27v-.46c0-.147-.22-.268-.472-.27H6.11c-.252.002-.47.123-.47.27v.46c0 .146.206.27.47.27zm6.26 3.952V4.175c-.004-.74-.5-1.387-1.436-1.388H4.066c-.936 0-1.43.648-1.436 1.388v1.777c-.002.86.644 1.384 1.436 1.388h6.868c.793-.004 1.44-.528 1.436-1.388zm-8.465 5.386c-.69-.003-1.254.54-1.252 1.21-.002.673.56 1.217 1.252 1.222.697-.006 1.26-.55 1.262-1.22-.002-.672-.565-1.215-1.262-1.212zm8.42 1.21c-.005-.67-.567-1.213-1.265-1.21-.69-.003-1.253.54-1.25 1.21-.003.673.56 1.217 1.25 1.222.698-.006 1.26-.55 1.264-1.22z\"/>\n</svg>\n";

/* babel-plugin-inline-import './icons/townhall.svg' */
var townhallIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\"><path d=\"M12 .6L2.5 6.9h18.9L12 .6zM3.8 8.2c-.7 0-1.3.6-1.3 1.3v8.8L.3 22.1c-.2.3-.3.5-.3.6 0 .6.8.6 1.3.6h21.5c.4 0 1.3 0 1.3-.6 0-.2-.1-.3-.3-.6l-2.2-3.8V9.5c0-.7-.6-1.3-1.3-1.3H3.8zm2.5 2.5c.7 0 1.1.6 1.3 1.3v7.6H5.1V12c0-.7.5-1.3 1.2-1.3zm5.7 0c.7 0 1.3.6 1.3 1.3v7.6h-2.5V12c-.1-.7.5-1.3 1.2-1.3zm5.7 0c.7 0 1.3.6 1.3 1.3v7.6h-2.5V12c-.1-.7.5-1.3 1.2-1.3z\"/></svg>\n";

/* babel-plugin-inline-import './icons/plane.svg' */
var planeIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\"><path d=\"M22.9 1.1s1.3.3-4.3 6.5l.7 3.8.2-.2c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-1.2 1.2.3 1.7.1-.1c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-1.1 1.1c.2 1.9.3 3.6.1 4.5 0 0-1.2 1.2-1.8.5 0 0-2.3-7.7-3.8-11.1-5.9 6-6.4 5.6-6.4 5.6s1.2 3.8-.2 5.2l-2.3-4.3h.1l-4.3-2.3c1.3-1.3 5.2-.2 5.2-.2s-.5-.4 5.6-6.3C8.9 7.7 1.2 5.5 1.2 5.5c-.7-.7.5-1.8.5-1.8.9-.2 2.6-.1 4.5.1l1.1-1.1c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l1.7.3 1.2-1.2c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-.2.2 3.8.7c6.2-5.5 6.5-4.2 6.5-4.2z\"/></svg>\n";
var icons = {
  address: addressIcon,
  city: cityIcon,
  country: countryIcon,
  busStop: busIcon,
  trainStation: trainIcon,
  townhall: townhallIcon,
  airport: planeIcon
};

function formatDropdownValue(_ref) {
  var type = _ref.type,
      highlight = _ref.highlight;
  var name = highlight.name,
      administrative = highlight.administrative,
      city = highlight.city,
      country = highlight.country;
  var out = "<span class=\"ap-suggestion-icon\">".concat(icons[type].trim(), "</span>\n<span class=\"ap-name\">").concat(name, "</span>\n<span class=\"ap-address\">\n  ").concat([city, administrative, country].filter(function (token) {
    return token !== undefined;
  }).join(', '), "</span>").replace(/\s*\n\s*/g, ' ');
  return out;
}

/***/ }),

/***/ "./node_modules/places.js/src/formatHit.js":
/*!*************************************************!*\
  !*** ./node_modules/places.js/src/formatHit.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatHit;

var _findCountryCode = _interopRequireDefault(__webpack_require__(/*! ./findCountryCode */ "./node_modules/places.js/src/findCountryCode.js"));

var _findType = _interopRequireDefault(__webpack_require__(/*! ./findType */ "./node_modules/places.js/src/findType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getBestHighlightedForm(highlightedValues) {
  var defaultValue = highlightedValues[0].value; // collect all other matches

  var bestAttributes = [];

  for (var i = 1; i < highlightedValues.length; ++i) {
    if (highlightedValues[i].matchLevel !== 'none') {
      bestAttributes.push({
        index: i,
        words: highlightedValues[i].matchedWords
      });
    }
  } // no matches in this attribute, retrieve first value


  if (bestAttributes.length === 0) {
    return defaultValue;
  } // sort the matches by `desc(words), asc(index)`


  bestAttributes.sort(function (a, b) {
    if (a.words > b.words) {
      return -1;
    } else if (a.words < b.words) {
      return 1;
    }

    return a.index - b.index;
  }); // and append the best match to the first value

  return bestAttributes[0].index === 0 ? "".concat(defaultValue, " (").concat(highlightedValues[bestAttributes[1].index].value, ")") : "".concat(highlightedValues[bestAttributes[0].index].value, " (").concat(defaultValue, ")");
}

function getBestPostcode(postcodes, highlightedPostcodes) {
  var defaultValue = highlightedPostcodes[0].value; // collect all other matches

  var bestAttributes = [];

  for (var i = 1; i < highlightedPostcodes.length; ++i) {
    if (highlightedPostcodes[i].matchLevel !== 'none') {
      bestAttributes.push({
        index: i,
        words: highlightedPostcodes[i].matchedWords
      });
    }
  } // no matches in this attribute, retrieve first value


  if (bestAttributes.length === 0) {
    return {
      postcode: postcodes[0],
      highlightedPostcode: defaultValue
    };
  } // sort the matches by `desc(words)`


  bestAttributes.sort(function (a, b) {
    if (a.words > b.words) {
      return -1;
    } else if (a.words < b.words) {
      return 1;
    }

    return a.index - b.index;
  });
  var postcode = postcodes[bestAttributes[0].index];
  return {
    postcode: postcode,
    highlightedPostcode: highlightedPostcodes[bestAttributes[0].index].value
  };
}

function formatHit(_ref) {
  var formatInputValue = _ref.formatInputValue,
      hit = _ref.hit,
      hitIndex = _ref.hitIndex,
      query = _ref.query,
      rawAnswer = _ref.rawAnswer;

  try {
    var name = hit.locale_names[0];
    var country = hit.country;
    var administrative = hit.administrative && hit.administrative[0] !== name ? hit.administrative[0] : undefined;
    var city = hit.city && hit.city[0] !== name ? hit.city[0] : undefined;
    var suburb = hit.suburb && hit.suburb[0] !== name ? hit.suburb[0] : undefined;
    var county = hit.county && hit.county[0] !== name ? hit.county[0] : undefined;

    var _ref2 = hit.postcode && hit.postcode.length ? getBestPostcode(hit.postcode, hit._highlightResult.postcode) : {
      postcode: undefined,
      highlightedPostcode: undefined
    },
        postcode = _ref2.postcode,
        highlightedPostcode = _ref2.highlightedPostcode;

    var highlight = {
      name: getBestHighlightedForm(hit._highlightResult.locale_names),
      city: city ? getBestHighlightedForm(hit._highlightResult.city) : undefined,
      administrative: administrative ? getBestHighlightedForm(hit._highlightResult.administrative) : undefined,
      country: country ? hit._highlightResult.country.value : undefined,
      suburb: suburb ? getBestHighlightedForm(hit._highlightResult.suburb) : undefined,
      county: county ? getBestHighlightedForm(hit._highlightResult.county) : undefined,
      postcode: highlightedPostcode
    };
    var suggestion = {
      name: name,
      administrative: administrative,
      county: county,
      city: city,
      suburb: suburb,
      country: country,
      countryCode: (0, _findCountryCode["default"])(hit._tags),
      type: (0, _findType["default"])(hit._tags),
      latlng: {
        lat: hit._geoloc.lat,
        lng: hit._geoloc.lng
      },
      postcode: postcode,
      postcodes: hit.postcode && hit.postcode.length ? hit.postcode : undefined
    }; // this is the value to put inside the <input value=

    var value = formatInputValue(suggestion);
    return _objectSpread(_objectSpread({}, suggestion), {}, {
      highlight: highlight,
      hit: hit,
      hitIndex: hitIndex,
      query: query,
      rawAnswer: rawAnswer,
      value: value
    });
  } catch (e) {
    /* eslint-disable no-console */
    console.error('Could not parse object', hit);
    console.error(e);
    /* eslint-enable no-console */

    return {
      value: 'Could not parse object'
    };
  }
}

/***/ }),

/***/ "./node_modules/places.js/src/formatInputValue.js":
/*!********************************************************!*\
  !*** ./node_modules/places.js/src/formatInputValue.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatInputValue;

function formatInputValue(_ref) {
  var administrative = _ref.administrative,
      city = _ref.city,
      country = _ref.country,
      name = _ref.name,
      type = _ref.type;
  var out = "".concat(name).concat(type !== 'country' && country !== undefined ? ',' : '', "\n ").concat(city ? "".concat(city, ",") : '', "\n ").concat(administrative ? "".concat(administrative, ",") : '', "\n ").concat(country ? country : '').replace(/\s*\n\s*/g, ' ').trim();
  return out;
}

/***/ }),

/***/ "./node_modules/places.js/src/navigatorLanguage.js":
/*!*********************************************************!*\
  !*** ./node_modules/places.js/src/navigatorLanguage.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// polyfill for navigator.language (IE <= 10)
// not polyfilled by https://cdn.polyfill.io/v2/docs/
// Defined: http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#navigatorlanguage
//   with allowable values at http://www.ietf.org/rfc/bcp/bcp47.txt
// Note that the HTML spec suggests that anonymizing services return "en-US" by default for
//   user privacy (so your app may wish to provide a means of changing the locale)
if (!('language' in navigator)) {
  navigator.language = // IE 10 in IE8 mode on Windows 7 uses upper-case in
  // navigator.userLanguage country codes but per
  // http://msdn.microsoft.com/en-us/library/ie/ms533052.aspx (via
  // http://msdn.microsoft.com/en-us/library/ie/ms534713.aspx), they
  // appear to be in lower case, so we bring them into harmony with navigator.language.
  navigator.userLanguage && navigator.userLanguage.replace(/-[a-z]{2}$/, String.prototype.toUpperCase) || 'en-US'; // Default for anonymizing services: http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#navigatorlanguage
}

/***/ }),

/***/ "./node_modules/places.js/src/places.js":
/*!**********************************************!*\
  !*** ./node_modules/places.js/src/places.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = places;

var _events = _interopRequireDefault(__webpack_require__(/*! events */ "./node_modules/events/events.js"));

var _algoliasearchLite = _interopRequireDefault(__webpack_require__(/*! algoliasearch/src/browser/builds/algoliasearchLite */ "./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js"));

var _autocomplete = _interopRequireDefault(__webpack_require__(/*! autocomplete.js */ "./node_modules/autocomplete.js/index.js"));

__webpack_require__(/*! ./navigatorLanguage */ "./node_modules/places.js/src/navigatorLanguage.js");

var _createAutocompleteDataset = _interopRequireDefault(__webpack_require__(/*! ./createAutocompleteDataset */ "./node_modules/places.js/src/createAutocompleteDataset.js"));

var _insertCss = _interopRequireDefault(__webpack_require__(/*! insert-css */ "./node_modules/insert-css/index.js"));

var _errors = _interopRequireDefault(__webpack_require__(/*! ./errors */ "./node_modules/places.js/src/errors.js"));

var _createReverseGeocodingSource = _interopRequireDefault(__webpack_require__(/*! ./createReverseGeocodingSource */ "./node_modules/places.js/src/createReverseGeocodingSource.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* babel-plugin-inline-import './icons/clear.svg' */
var clearIcon = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M.566 1.698L0 1.13 1.132 0l.565.566L6 4.868 10.302.566 10.868 0 12 1.132l-.566.565L7.132 6l4.302 4.3.566.568L10.868 12l-.565-.566L6 7.132l-4.3 4.302L1.13 12 0 10.868l.566-.565L4.868 6 .566 1.698z\"/></svg>\n";

/* babel-plugin-inline-import './icons/address.svg' */
var pinIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n";

/* babel-plugin-inline-import './places.css' */
var css = ".algolia-places {\n  width: 100%;\n}\n\n.ap-input, .ap-hint {\n  width: 100%;\n  padding-right: 35px;\n  padding-left: 16px;\n  line-height: 40px;\n  height: 40px;\n  border: 1px solid #CCC;\n  border-radius: 3px;\n  outline: none;\n  font: inherit;\n  appearance: none;\n  -webkit-appearance: none;\n  box-sizing: border-box;\n}\n\n.ap-input::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n.ap-input::-ms-clear {\n  display: none;\n}\n\n.ap-input:hover ~ .ap-input-icon svg,\n.ap-input:focus ~ .ap-input-icon svg,\n.ap-input-icon:hover svg {\n  fill: #aaaaaa;\n}\n\n.ap-dropdown-menu {\n  width: 100%;\n  background: #ffffff;\n  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  margin-top: 3px;\n  overflow: hidden;\n}\n\n.ap-suggestion {\n  cursor: pointer;\n  height: 46px;\n  line-height: 46px;\n  padding-left: 18px;\n  overflow: hidden;\n}\n\n.ap-suggestion em {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.ap-address {\n  font-size: smaller;\n  margin-left: 12px;\n  color: #aaaaaa;\n}\n\n.ap-suggestion-icon {\n  margin-right: 10px;\n  width: 14px;\n  height: 20px;\n  vertical-align: middle;\n}\n\n.ap-suggestion-icon svg {\n  display: inherit;\n  -webkit-transform: scale(0.9) translateY(2px);\n          transform: scale(0.9) translateY(2px);\n  fill: #cfcfcf;\n}\n\n.ap-input-icon {\n  border: 0;\n  background: transparent;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 16px;\n  outline: none;\n}\n\n.ap-input-icon.ap-icon-pin {\n  cursor: pointer;\n}\n\n.ap-input-icon svg {\n  fill: #cfcfcf;\n  position: absolute;\n  top: 50%;\n  right: 0;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.ap-cursor {\n  background: #efefef;\n}\n\n.ap-cursor .ap-suggestion-icon svg {\n  -webkit-transform: scale(1) translateY(2px);\n          transform: scale(1) translateY(2px);\n  fill: #aaaaaa;\n}\n\n.ap-footer {\n  opacity: .8;\n  text-align: right;\n  padding: .5em 1em .5em 0;\n  font-size: 12px;\n  line-height: 12px;\n}\n\n.ap-footer a {\n  color: inherit;\n  text-decoration: none;\n}\n\n.ap-footer a svg {\n  vertical-align: middle;\n}\n\n.ap-footer:hover {\n  opacity: 1;\n}\n";
(0, _insertCss["default"])(css, {
  prepend: true
});

var applyAttributes = function applyAttributes(elt, attrs) {
  Object.entries(attrs).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        value = _ref2[1];

    elt.setAttribute(name, "".concat(value));
  });
  return elt;
};

function places(options) {
  var container = options.container,
      style = options.style,
      accessibility = options.accessibility,
      _options$autocomplete = options.autocompleteOptions,
      userAutocompleteOptions = _options$autocomplete === void 0 ? {} : _options$autocomplete; // multiple DOM elements targeted

  if (container instanceof NodeList) {
    if (container.length > 1) {
      throw new Error(_errors["default"].multiContainers);
    } // if single node NodeList received, resolve to the first one


    return places(_objectSpread(_objectSpread({}, options), {}, {
      container: container[0]
    }));
  } // container sent as a string, resolve it for multiple DOM elements issue


  if (typeof container === 'string') {
    var resolvedContainer = document.querySelectorAll(container);
    return places(_objectSpread(_objectSpread({}, options), {}, {
      container: resolvedContainer
    }));
  } // if not an <input>, error


  if (!(container instanceof HTMLInputElement)) {
    throw new Error(_errors["default"].badContainer);
  }

  var placesInstance = new _events["default"]();
  var prefix = "ap".concat(style === false ? '-nostyle' : '');

  var autocompleteOptions = _objectSpread({
    autoselect: true,
    hint: false,
    cssClasses: {
      root: "algolia-places".concat(style === false ? '-nostyle' : ''),
      prefix: prefix
    },
    debug: "development" === 'development'
  }, userAutocompleteOptions);

  var autocompleteDataset = (0, _createAutocompleteDataset["default"])(_objectSpread(_objectSpread({}, options), {}, {
    algoliasearch: _algoliasearchLite["default"],
    onHits: function onHits(_ref3) {
      var hits = _ref3.hits,
          rawAnswer = _ref3.rawAnswer,
          query = _ref3.query;
      return placesInstance.emit('suggestions', {
        rawAnswer: rawAnswer,
        query: query,
        suggestions: hits
      });
    },
    onError: function onError(e) {
      return placesInstance.emit('error', e);
    },
    onRateLimitReached: function onRateLimitReached() {
      var listeners = placesInstance.listenerCount('limit');

      if (listeners === 0) {
        console.log(_errors["default"].rateLimitReached); // eslint-disable-line no-console

        return;
      }

      placesInstance.emit('limit', {
        message: _errors["default"].rateLimitReached
      });
    },
    onInvalidCredentials: function onInvalidCredentials() {
      if (options && options.appId && options.appId.startsWith('pl')) {
        console.error(_errors["default"].invalidCredentials); // eslint-disable-line no-console
      } else {
        console.error(_errors["default"].invalidAppId); // eslint-disable-line no-console
      }
    },
    container: undefined
  }));
  var autocompleteInstance = (0, _autocomplete["default"])(container, autocompleteOptions, autocompleteDataset);
  var autocompleteContainer = container.parentNode;
  var autocompleteChangeEvents = ['selected', 'autocompleted'];
  autocompleteChangeEvents.forEach(function (eventName) {
    autocompleteInstance.on("autocomplete:".concat(eventName), function (_, suggestion) {
      placesInstance.emit('change', {
        rawAnswer: suggestion.rawAnswer,
        query: suggestion.query,
        suggestion: suggestion,
        suggestionIndex: suggestion.hitIndex
      });
    });
  });
  autocompleteInstance.on('autocomplete:cursorchanged', function (_, suggestion) {
    placesInstance.emit('cursorchanged', {
      rawAnswer: suggestion.rawAnswer,
      query: suggestion.query,
      suggestion: suggestion,
      suggestionIndex: suggestion.hitIndex
    });
  });
  var clear = document.createElement('button');
  clear.setAttribute('type', 'button');
  clear.setAttribute('aria-label', 'clear');

  if (accessibility && accessibility.clearButton && accessibility.clearButton instanceof Object) {
    applyAttributes(clear, accessibility.clearButton);
  }

  clear.classList.add("".concat(prefix, "-input-icon"));
  clear.classList.add("".concat(prefix, "-icon-clear"));
  clear.innerHTML = clearIcon;
  autocompleteContainer.appendChild(clear);
  clear.style.display = 'none';
  var pin = document.createElement('button');
  pin.setAttribute('type', 'button');
  pin.setAttribute('aria-label', 'focus');

  if (accessibility && accessibility.pinButton && accessibility.pinButton instanceof Object) {
    applyAttributes(pin, accessibility.pinButton);
  }

  pin.classList.add("".concat(prefix, "-input-icon"));
  pin.classList.add("".concat(prefix, "-icon-pin"));
  pin.innerHTML = pinIcon;
  autocompleteContainer.appendChild(pin);
  pin.addEventListener('click', function () {
    autocompleteDataset.source.configure({
      useDeviceLocation: true
    });
    autocompleteInstance.focus();
    placesInstance.emit('locate');
  });
  clear.addEventListener('click', function () {
    autocompleteInstance.autocomplete.setVal('');
    autocompleteInstance.focus();
    clear.style.display = 'none';
    pin.style.display = '';
    placesInstance.emit('clear');
  });
  var previousQuery = '';

  var inputListener = function inputListener() {
    var query = autocompleteInstance.val();

    if (query === '') {
      pin.style.display = '';
      clear.style.display = 'none';

      if (previousQuery !== query) {
        placesInstance.emit('clear');
      }
    } else {
      clear.style.display = '';
      pin.style.display = 'none';
    }

    previousQuery = query;
  };

  autocompleteContainer.querySelector(".".concat(prefix, "-input")).addEventListener('input', inputListener);
  var autocompleteIsomorphicMethods = ['open', 'close'];
  autocompleteIsomorphicMethods.forEach(function (methodName) {
    placesInstance[methodName] = function () {
      var _autocompleteInstance;

      (_autocompleteInstance = autocompleteInstance.autocomplete)[methodName].apply(_autocompleteInstance, arguments);
    };
  });

  placesInstance.getVal = function () {
    return autocompleteInstance.val();
  };

  placesInstance.destroy = function () {
    var _autocompleteInstance2;

    autocompleteContainer.querySelector(".".concat(prefix, "-input")).removeEventListener('input', inputListener);

    (_autocompleteInstance2 = autocompleteInstance.autocomplete).destroy.apply(_autocompleteInstance2, arguments);
  };

  placesInstance.setVal = function () {
    var _autocompleteInstance3;

    previousQuery = arguments.length <= 0 ? undefined : arguments[0];

    if (previousQuery === '') {
      pin.style.display = '';
      clear.style.display = 'none';
    } else {
      clear.style.display = '';
      pin.style.display = 'none';
    }

    (_autocompleteInstance3 = autocompleteInstance.autocomplete).setVal.apply(_autocompleteInstance3, arguments);
  };

  placesInstance.autocomplete = autocompleteInstance;

  placesInstance.search = function () {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return new Promise(function (resolve) {
      autocompleteDataset.source(query, resolve);
    });
  };

  placesInstance.configure = function (configuration) {
    var safeConfig = _objectSpread({}, configuration);

    delete safeConfig.onHits;
    delete safeConfig.onError;
    delete safeConfig.onRateLimitReached;
    delete safeConfig.onInvalidCredentials;
    delete safeConfig.templates;
    autocompleteDataset.source.configure(safeConfig);
    return placesInstance;
  };

  placesInstance.reverse = (0, _createReverseGeocodingSource["default"])(_objectSpread(_objectSpread({}, options), {}, {
    algoliasearch: _algoliasearchLite["default"],
    formatInputValue: (options.templates || {}).value,
    onHits: function onHits(_ref4) {
      var hits = _ref4.hits,
          rawAnswer = _ref4.rawAnswer,
          query = _ref4.query;
      return placesInstance.emit('reverse', {
        rawAnswer: rawAnswer,
        query: query,
        suggestions: hits
      });
    },
    onError: function onError(e) {
      return placesInstance.emit('error', e);
    },
    onRateLimitReached: function onRateLimitReached() {
      var listeners = placesInstance.listenerCount('limit');

      if (listeners === 0) {
        console.log(_errors["default"].rateLimitReached); // eslint-disable-line no-console

        return;
      }

      placesInstance.emit('limit', {
        message: _errors["default"].rateLimitReached
      });
    },
    onInvalidCredentials: function onInvalidCredentials() {
      if (options && options.appId && options.appId.startsWith('pl')) {
        console.error(_errors["default"].invalidCredentials); // eslint-disable-line no-console
      } else {
        console.error(_errors["default"].invalidAppId); // eslint-disable-line no-console
      }
    }
  }));
  return placesInstance;
}

/***/ }),

/***/ "./node_modules/places.js/src/version.js":
/*!***********************************************!*\
  !*** ./node_modules/places.js/src/version.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = '1.19.0';
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/images/summer.jpg":
/*!*******************************!*\
  !*** ./src/images/summer.jpg ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "025fab35f0783766510c70c14bac33b6.jpg");

/***/ }),

/***/ "./src/images/sunset.jpg":
/*!*******************************!*\
  !*** ./src/images/sunset.jpg ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "6dc4a6844d690975a6189296f8cc54ee.jpg");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/dom */ "./src/js/dom.js");
/* harmony import */ var _js_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/events */ "./src/js/events.js");
/* harmony import */ var _js_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/search */ "./src/js/search.js");
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style/style.css */ "./src/style/style.css");
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_style_css__WEBPACK_IMPORTED_MODULE_3__);





const event = Object(_js_events__WEBPACK_IMPORTED_MODULE_1__["default"])();
Object(_js_search__WEBPACK_IMPORTED_MODULE_2__["default"])();
const submit = document.getElementById('submit');
submit.addEventListener('click', event.getLocation.bind(undefined, 'search'));

const submit2 = document.getElementById('submit2');
submit2.addEventListener('click', event.getForecast.bind(undefined));

const search2 = document.getElementById('search2');
search2.addEventListener('click', event.getLocation.bind(undefined, 'searchBar'));

const home = document.getElementById('home');
home.addEventListener('click', () => { Object(_js_dom__WEBPACK_IMPORTED_MODULE_0__["default"])().show('aaa'); });


/***/ }),

/***/ "./src/js/dom.js":
/*!***********************!*\
  !*** ./src/js/dom.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dom; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/js/helpers.js");


const dom = function dom() {
  function show(value) {
    switch (true) {
      case value === 'search':
        document.getElementById('main').style.display = 'none';
        document.getElementById('section').style.display = 'block';
        document.getElementById('section2').style.display = 'none';
        break;
      case value === 'forecast':
        document.getElementById('main').style.display = 'none';
        document.getElementById('section').style.display = 'none';
        document.getElementById('section2').style.display = 'block';
        break;
      default:
        document.getElementById('main').style.display = 'block';
        document.getElementById('section').style.display = 'none';
        document.getElementById('section2').style.display = 'none';
        break;
    }
  }

  function fillCard(data) {
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('title', `${data.name}, ${data.sys.country}`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('temp', `<i class="fas fa-thermometer-half text-warning my-2"></i> Temp: ${data.main.temp} Celsius`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('feel', `<i class="fas fa-meteor text-warning my-2"></i> Feel: ${data.main.feels_like} Celsius`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('desc', `<i class="fas fa-cloud-sun-rain text-warning my-2"></i> ${data.weather[0].main}`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('pressure', `<i class="fas fa-compress-arrows-alt text-warning my-2"></i> Pressure: ${data.main.pressure} hPa`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('humidity', `<i class="fas fa-percent text-warning my-2"></i> Humidity: ${data.main.humidity}%`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('minTemp', `<i class="fas fa-temperature-low text-warning my-2"></i> Min: ${data.main.temp_min} Celsius`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('maxTemp', `<i class="fas fa-temperature-high text-warning my-2"></i> Max: ${data.main.temp_max} Celsius`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('wind', `<i class="fas fa-wind text-warning my-2"></i> ${data.wind.speed} meter/sec`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('windDir', `<i class="fas fa-compass text-warning my-2"></i> ${data.wind.deg} degrees`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('clouds', `<i class="fas fa-cloud text-warning my-2"></i> Clouds: ${data.clouds.all}%`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('sunrise', `<i class="fas fa-sun text-warning my-2"></i> Sunrise: ${new Date((data.sys.sunrise + data.timezone) * 1000).toUTCString().slice(-11, -7)} AM`);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('sunset', `<i class="fas fa-sun text-warning my-2"></i> Sunset: ${new Date((data.sys.sunset + data.timezone) * 1000).toUTCString().slice(-11, -7)} PM`);
  }

  function imageSwitch(data, id) {
    const code = data.weather[0].id;
    switch (true) {
      case code >= 200 && code <= 232:
        document.getElementById(id).style.backgroundImage = "url('../src/images/lighting.jpg')";
        break;
      case code >= 300 && code <= 321:
        document.getElementById(id).style.backgroundImage = "url('../src/images/drizzle.jpg')";
        break;
      case code >= 500 && code <= 531:
        document.getElementById(id).style.backgroundImage = "url('../src/images/rain.jpg')";
        break;
      case code >= 600 && code <= 622:
        document.getElementById(id).style.backgroundImage = "url('../src/images/snow.jpg')";
        break;
      case code >= 701 && code <= 781:
        document.getElementById(id).style.backgroundImage = "url('../src/images/mist.jpg')";
        break;
      case code >= 801 && code <= 804:
        document.getElementById(id).style.backgroundImage = "url('../src/images/rainclouds.jpg')";
        break;
      case code === 800:
        document.getElementById(id).style.backgroundImage = "url('../src/images/shiningsun.jpg')";
        break;
      default:
        document.getElementById(id).style.backgroundImage = "url('../src/images/bluesky.jpg')";
        break;
    }
  }

  function clearForms() {
    document.getElementById('searching').reset();
    document.getElementById('navSearch').reset();
  }

  function createCard(data) {
    const name = document.getElementById('cityName');
    name.innerHTML = `${data.city.name}, ${data.city.country}`;
    const row = document.getElementById('row');
    row.innerHTML = '';
    const forecastFive = data.list.filter((value, index) => index % 8 === 0);
    forecastFive.forEach((day, index) => {
      const cont = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElement('div', 'col-5');
      const card = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElement('div', 'card bg-dark text-white w-100 mb-2 mx-2');
      const imgBg = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElement('div', '');
      imgBg.id = `images${index + 1}`;
      imgBg.style = 'background-size: cover;background-position-y: 100%;height: 75vh;';
      const over = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElement('div', 'card-img-overlay');
      const h5 = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElement('h5', 'card-title text-center text-warning');
      h5.innerHTML = day.dt_txt.slice(0, -9);
      const listCont = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElement('div', 'd-flex flex-row justify-content-around');
      const ul1 = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElement('ul', 'list-group list-unstyled');
      const ul2 = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElement('ul', 'list-group list-unstyled');
      const temp = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-thermometer-half text-warning my-2"></i> Temp: ${day.main.temp} Celsius`);
      const feel = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-meteor text-warning my-2"></i> Feel: ${day.main.feels_like} Celsius`);
      const pressure = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-compress-arrows-alt text-warning my-2"></i> Pressure: ${day.main.pressure} hPa`);
      const humidity = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-percent text-warning my-2"></i> Humidity: ${day.main.humidity}%`);
      const desc = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-cloud-sun-rain text-warning my-2"></i> ${day.weather[0].main}`);
      const minTemp = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-temperature-low text-warning my-2"></i> Min: ${day.main.temp_min} Celsius`);
      const maxTemp = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-temperature-high text-warning my-2"></i> Max: ${day.main.temp_max} Celsius`);
      const clouds = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-cloud text-warning my-2"></i> Clouds: ${day.clouds.all}%`);
      const wind = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-wind text-warning my-2"></i> ${day.wind.speed} meter/sec`);
      const windDir = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-compass text-warning my-2"></i> ${day.wind.deg} degrees`);
      const color = document.getElementsByClassName('list-group-item');

      ul2.appendChild(minTemp);
      ul2.appendChild(maxTemp);
      ul2.appendChild(wind);
      ul2.appendChild(windDir);
      ul2.appendChild(clouds);

      ul1.appendChild(temp);
      ul1.appendChild(feel);
      ul1.appendChild(desc);
      ul1.appendChild(pressure);
      ul1.appendChild(humidity);

      listCont.appendChild(ul1);
      listCont.appendChild(ul2);

      over.appendChild(h5);
      over.appendChild(listCont);

      card.appendChild(imgBg);
      card.appendChild(over);

      cont.appendChild(card);
      row.appendChild(cont);

      for (let i = 0; i < color.length; i += 1) {
        color[i].style = 'background-color: rgba(255,255,255,0.1);';
      }


      imageSwitch(day, (`images${index + 1}`));
    });
  }


  async function converter(data) {
    const data2 = await Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().getFahrenheit(data.name);
    if (document.getElementById('temp').innerHTML.includes(' Celsius')) {
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('temp', `<i class="fas fa-thermometer-half text-warning my-2"></i> Temp: ${data2.main.temp} &#8457`);
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('feel', `<i class="fas fa-meteor text-warning my-2"></i> Feel: ${data2.main.feels_like} &#8457`);
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('minTemp', `<i class="fas fa-temperature-low text-warning my-2"></i> Min: ${data2.main.temp_min} &#8457`);
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('maxTemp', `<i class="fas fa-temperature-high text-warning my-2"></i> Max: ${data2.main.temp_max} &#8457`);
    } else {
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('temp', `<i class="fas fa-thermometer-half text-warning my-2"></i> Temp: ${data.main.temp} Celsius`);
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('feel', `<i class="fas fa-meteor text-warning my-2"></i> Feel: ${data.main.feels_like} Celsius`);
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('minTemp', `<i class="fas fa-temperature-low text-warning my-2"></i> Min: ${data.main.temp_min} Celsius`);
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])().addInnerText('maxTemp', `<i class="fas fa-temperature-high text-warning my-2"></i> Max: ${data.main.temp_max} Celsius`);
    }
  }


  return {
    show, fillCard, imageSwitch, createCard, clearForms, converter,
  };
};



/***/ }),

/***/ "./src/js/events.js":
/*!**************************!*\
  !*** ./src/js/events.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return events; });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/js/dom.js");
/* eslint-disable no-alert */
/* eslint-disable no-console */


const events = function events() {
  function showFlow(data) {
    Object(_dom__WEBPACK_IMPORTED_MODULE_0__["default"])().clearForms();
    Object(_dom__WEBPACK_IMPORTED_MODULE_0__["default"])().fillCard(data);
    Object(_dom__WEBPACK_IMPORTED_MODULE_0__["default"])().imageSwitch(data, 'image');
    Object(_dom__WEBPACK_IMPORTED_MODULE_0__["default"])().show('search');

    const farCel = document.getElementById('farCel');
    farCel.onclick = function changeTemp() { Object(_dom__WEBPACK_IMPORTED_MODULE_0__["default"])().converter(data); };
  }

  function forecastFlow(data) {
    Object(_dom__WEBPACK_IMPORTED_MODULE_0__["default"])().clearForms();
    Object(_dom__WEBPACK_IMPORTED_MODULE_0__["default"])().createCard(data);
    Object(_dom__WEBPACK_IMPORTED_MODULE_0__["default"])().show('forecast');
  }

  async function getSearch(city) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=903507f17d707fecd352d38301efba77&units=metric`;
      const response = await fetch(url, { mode: 'cors' });
      const cityData = await response.json();
      showFlow(cityData);
    } catch (error) {
      console.error('Error:', error);
      alert('Could not find the location');
    }
  }

  function getLocation(searchBar) {
    const city = (document.getElementById(searchBar).value).toLowerCase();
    getSearch(city);
  }

  async function getForecast() {
    try {
      const value = (document.getElementById('search').value).toLowerCase();
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=903507f17d707fecd352d38301efba77`;
      const response = await fetch(url, { mode: 'cors' });
      const cityData = await response.json();
      forecastFlow(cityData);
    } catch (error) {
      console.error('Error:', error);
      alert('Could not find the location');
    }
  }


  return {
    getSearch, showFlow, getForecast, getLocation,
  };
};



/***/ }),

/***/ "./src/js/helpers.js":
/*!***************************!*\
  !*** ./src/js/helpers.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return helpers; });
/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-console */

const helpers = function helpers() {
  const createElement = function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  };

  const createElementWithInnerText = function createElementWithInnerText(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.innerHTML = text;
    return element;
  };

  const addInnerText = function addInnerText(className, text) {
    const element = document.getElementById(className);
    element.innerHTML = text;
    return element.innerHTML;
  };

  async function getFahrenheit(city) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=903507f17d707fecd352d38301efba77&units=imperial`;
      const response = await fetch(url, { mode: 'cors' });
      const cityFahr = await response.json();
      return cityFahr;
    } catch (error) {
      console.error('Error:', error);
      alert('Could not find the location');
    }
  }

  return {
    addInnerText, createElement, createElementWithInnerText, getFahrenheit,
  };
};




/***/ }),

/***/ "./src/js/search.js":
/*!**************************!*\
  !*** ./src/js/search.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const places = __webpack_require__(/*! places.js */ "./node_modules/places.js/index.js");

function autoComplete() {
  const KEY = 'f7093e7853be493e407d46a434f9c54b';
  const ID = 'plBAKYUGY2FI';
  const placesAutocomplete = places({
    appId: ID,
    apiKey: KEY,
    container: document.querySelector('#search'),
    templates: {
      value(suggestion) {
        return suggestion.name;
      },
    },
  }).configure({
    type: 'city',
    aroundLatLngViaIP: true,
  });
  return placesAutocomplete;
}


/* harmony default export */ __webpack_exports__["default"] = (autoComplete);

/***/ }),

/***/ "./src/style/style.css":
/*!*****************************!*\
  !*** ./src/style/style.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style/style.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** ./nextTick (ignored) ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvc3JjL0FsZ29saWFTZWFyY2hDb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9JbmRleENvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvc3JjL2Jyb3dzZXIvYnVpbGRzL2FsZ29saWFzZWFyY2hMaXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9icm93c2VyL2NyZWF0ZUFsZ29saWFzZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvc3JjL2Jyb3dzZXIvaW5saW5lLWhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvc3JjL2Jyb3dzZXIvanNvbnAtcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvYnVpbGRTZWFyY2hNZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvc3JjL2Nsb25lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9kZXByZWNhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvc3JjL2RlcHJlY2F0ZWRNZXNzYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvc3JjL2V4aXRQcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvc3JjL21lcmdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9vbWl0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9wbGFjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvc3JjL3N0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy92ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2Nzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9hdXRvY29tcGxldGUvZGF0YXNldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9hdXRvY29tcGxldGUvZHJvcGRvd24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2V2ZW50X2J1cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9hdXRvY29tcGxldGUvZXZlbnRfZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9hdXRvY29tcGxldGUvaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9hdXRvY29tcGxldGUvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL3R5cGVhaGVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9jb21tb24vZG9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvc3JjL2NvbW1vbi9wYXJzZUFsZ29saWFDbGllbnRWZXJzaW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvc3JjL2NvbW1vbi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9zb3VyY2VzL2hpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvc291cmNlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9zb3VyY2VzL3BvcHVsYXJJbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9zdGFuZGFsb25lL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3plcHRvLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3JlYWNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbW1lZGlhdGUvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbW1lZGlhdGUvbGliL21lc3NhZ2VDaGFubmVsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbW1lZGlhdGUvbGliL211dGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbW1lZGlhdGUvbGliL3F1ZXVlTWljcm90YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbW1lZGlhdGUvbGliL3N0YXRlQ2hhbmdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbW1lZGlhdGUvbGliL3RpbWVvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2luc2VydC1jc3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wbGFjZXMuanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvY29uZmlndXJlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wbGFjZXMuanMvc3JjL2NyZWF0ZUF1dG9jb21wbGV0ZURhdGFzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvY3JlYXRlQXV0b2NvbXBsZXRlU291cmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wbGFjZXMuanMvc3JjL2NyZWF0ZVJldmVyc2VHZW9jb2RpbmdTb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvZGVmYXVsdFRlbXBsYXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvZmluZENvdW50cnlDb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wbGFjZXMuanMvc3JjL2ZpbmRUeXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wbGFjZXMuanMvc3JjL2Zvcm1hdERyb3Bkb3duVmFsdWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvZm9ybWF0SGl0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wbGFjZXMuanMvc3JjL2Zvcm1hdElucHV0VmFsdWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvbmF2aWdhdG9yTGFuZ3VhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvcGxhY2VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wbGFjZXMuanMvc3JjL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2RlY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvc3VtbWVyLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL3N1bnNldC5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VhcmNoLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9zdHlsZS5jc3M/YzlmMCIsIndlYnBhY2s6Ly8vLi9uZXh0VGljayAoaWdub3JlZCkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNKQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsNERBQVU7QUFDL0Isa0JBQWtCLG1CQUFPLENBQUMseUVBQWtCO0FBQzVDLGdCQUFnQixtQkFBTyxDQUFDLHFFQUFnQjtBQUN4QyxZQUFZLG1CQUFPLENBQUMsNkRBQVk7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1CQUFPLENBQUMsa0RBQU87O0FBRTdCLGNBQWMsbUJBQU8sQ0FBQyw2REFBWTtBQUNsQyxnQkFBZ0IsbUJBQU8sQ0FBQywyRUFBUztBQUNqQyxZQUFZLG1CQUFPLENBQUMseURBQVU7O0FBRTlCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsbUJBQU8sQ0FBQyxrREFBTzs7O0FBR3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FB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QUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVI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RUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ3BWYTs7QUFFYjs7QUFFQSxRQUFRLG1CQUFPLENBQUMsOEVBQW9CO0FBQ3BDLFVBQVUsbUJBQU8sQ0FBQywwRUFBa0I7QUFDcEMsZUFBZSxtQkFBTyxDQUFDLG9GQUFnQjtBQUN2QyxZQUFZLG1CQUFPLENBQUMsNEVBQVk7QUFDaEMsZUFBZSxtQkFBTyxDQUFDLGtGQUFlO0FBQ3RDLFdBQVcsbUJBQU8sQ0FBQywwRUFBVztBQUM5QixVQUFVLG1CQUFPLENBQUMsd0VBQVU7O0FBRTVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLHFDQUFxQztBQUNwRSw2Q0FBNkMsd0NBQXdDO0FBQ3JGO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixnQkFBZ0IsRUFBRTtBQUM1QztBQUNBLEdBQUc7O0FBRUg7QUFDQSx5Q0FBeUMscUJBQXFCLEVBQUU7O0FBRWhFLDhDQUE4QyxXQUFXOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0MsMkJBQTJCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7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O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixzQkFBc0I7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUMseUNBQXlDLFVBQWM7QUFDeEQ7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxJQUFJO0FBQ2Q7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsd0JBQXdCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsNkNBQTZDO0FBQ2hFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFVBQVUsTUFBTTtBQUNoQixVQUFVLE9BQU87QUFDakI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EscUJBQXFCLFlBQVk7QUFDakM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxVQUFVLElBQUk7QUFDZDtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLFVBQVUsU0FBUztBQUNuQixVQUFVLFNBQVM7QUFDbkI7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsVUFBVSxTQUFTO0FBQ25CO0FBQ0EsV0FBVztBQUNYOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxZQUFZLFNBQVM7QUFDckIsYUFBYTtBQUNiOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOzs7O0FBSUQ7Ozs7Ozs7Ozs7Ozs7O0FDcnBDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7Ozs7QUN2THRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFD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SSxvREFBRztBQUNQLElBQUksb0RBQUc7QUFDUDs7QUFFQTtBQUNBO0FBQ0EsdUVBQXVFLEtBQUs7QUFDNUUseUNBQXlDLGVBQWU7QUFDeEQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsTUFBTTtBQUM5RSx5Q0FBeUMsZUFBZTtBQUN4RDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN2REE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVFQUF1RSxLQUFLO0FBQzVFLHlDQUF5QyxlQUFlO0FBQ3hEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUFBLGVBQWUsbUJBQU8sQ0FBQyxvREFBVzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7OztBQUdlLDJFQUFZLEU7Ozs7Ozs7Ozs7O0FDdEIzQixVQUFVLG1CQUFPLENBQUMsc0pBQTJFO0FBQzdGLDBCQUEwQixtQkFBTyxDQUFDLDJIQUF5RDs7QUFFM0Y7O0FBRUE7QUFDQSwwQkFBMEIsUUFBUztBQUNuQzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7O0FBSUEsc0M7Ozs7Ozs7Ozs7O0FDbEJBLGUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEFsZ29saWFTZWFyY2hDb3JlO1xuXG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciBleGl0UHJvbWlzZSA9IHJlcXVpcmUoJy4vZXhpdFByb21pc2UuanMnKTtcbnZhciBJbmRleENvcmUgPSByZXF1aXJlKCcuL0luZGV4Q29yZS5qcycpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi9zdG9yZS5qcycpO1xuXG4vLyBXZSB3aWxsIGFsd2F5cyBwdXQgdGhlIEFQSSBLRVkgaW4gdGhlIEpTT04gYm9keSBpbiBjYXNlIG9mIHRvbyBsb25nIEFQSSBLRVksXG4vLyB0byBhdm9pZCBxdWVyeSBzdHJpbmcgYmVpbmcgdG9vIGxvbmcgYW5kIGZhaWxpbmcgaW4gdmFyaW91cyBjb25kaXRpb25zIChvdXIgc2VydmVyIGxpbWl0LCBicm93c2VyIGxpbWl0LFxuLy8gcHJveGllcyBsaW1pdClcbnZhciBNQVhfQVBJX0tFWV9MRU5HVEggPSA1MDA7XG52YXIgUkVTRVRfQVBQX0RBVEFfVElNRVIgPVxuICBwcm9jZXNzLmVudi5SRVNFVF9BUFBfREFUQV9USU1FUiAmJiBwYXJzZUludChwcm9jZXNzLmVudi5SRVNFVF9BUFBfREFUQV9USU1FUiwgMTApIHx8XG4gIDYwICogMiAqIDEwMDA7IC8vIGFmdGVyIDIgbWludXRlcyByZXNldCB0byBmaXJzdCBob3N0XG5cbi8qXG4gKiBBbGdvbGlhIFNlYXJjaCBsaWJyYXJ5IGluaXRpYWxpemF0aW9uXG4gKiBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwbGljYXRpb25JRCAtIFlvdXIgYXBwbGljYXRpb25JRCwgZm91bmQgaW4geW91ciBkYXNoYm9hcmRcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcGlLZXkgLSBZb3VyIEFQSSBrZXksIGZvdW5kIGluIHlvdXIgZGFzaGJvYXJkXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHNdXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMudGltZW91dD0yMDAwXSAtIFRoZSByZXF1ZXN0IHRpbWVvdXQgc2V0IGluIG1pbGxpc2Vjb25kcyxcbiAqIGFub3RoZXIgcmVxdWVzdCB3aWxsIGJlIGlzc3VlZCBhZnRlciB0aGlzIHRpbWVvdXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5wcm90b2NvbD0naHR0cHM6J10gLSBUaGUgcHJvdG9jb2wgdXNlZCB0byBxdWVyeSBBbGdvbGlhIFNlYXJjaCBBUEkuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXQgdG8gJ2h0dHA6JyB0byBmb3JjZSB1c2luZyBodHRwLlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IFtvcHRzLmhvc3RzPXtcbiAqICAgICAgICAgICByZWFkOiBbdGhpcy5hcHBsaWNhdGlvbklEICsgJy1kc24uYWxnb2xpYS5uZXQnXS5jb25jYXQoW1xuICogICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbklEICsgJy0xLmFsZ29saWFuZXQuY29tJyxcbiAqICAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25JRCArICctMi5hbGdvbGlhbmV0LmNvbScsXG4gKiAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uSUQgKyAnLTMuYWxnb2xpYW5ldC5jb20nXVxuICogICAgICAgICAgIF0pLFxuICogICAgICAgICAgIHdyaXRlOiBbdGhpcy5hcHBsaWNhdGlvbklEICsgJy5hbGdvbGlhLm5ldCddLmNvbmNhdChbXG4gKiAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uSUQgKyAnLTEuYWxnb2xpYW5ldC5jb20nLFxuICogICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbklEICsgJy0yLmFsZ29saWFuZXQuY29tJyxcbiAqICAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25JRCArICctMy5hbGdvbGlhbmV0LmNvbSddXG4gKiAgICAgICAgICAgXSkgLSBUaGUgaG9zdHMgdG8gdXNlIGZvciBBbGdvbGlhIFNlYXJjaCBBUEkuXG4gKiAgICAgICAgICAgSWYgeW91IHByb3ZpZGUgdGhlbSwgeW91IHdpbGwgbGVzcyBiZW5lZml0IGZyb20gb3VyIEhBIGltcGxlbWVudGF0aW9uXG4gKi9cbmZ1bmN0aW9uIEFsZ29saWFTZWFyY2hDb3JlKGFwcGxpY2F0aW9uSUQsIGFwaUtleSwgb3B0cykge1xuICB2YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdhbGdvbGlhc2VhcmNoJyk7XG5cbiAgdmFyIGNsb25lID0gcmVxdWlyZSgnLi9jbG9uZS5qcycpO1xuICB2YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbiAgdmFyIG1hcCA9IHJlcXVpcmUoJy4vbWFwLmpzJyk7XG5cbiAgdmFyIHVzYWdlID0gJ1VzYWdlOiBhbGdvbGlhc2VhcmNoKGFwcGxpY2F0aW9uSUQsIGFwaUtleSwgb3B0cyknO1xuXG4gIGlmIChvcHRzLl9hbGxvd0VtcHR5Q3JlZGVudGlhbHMgIT09IHRydWUgJiYgIWFwcGxpY2F0aW9uSUQpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkFsZ29saWFTZWFyY2hFcnJvcignUGxlYXNlIHByb3ZpZGUgYW4gYXBwbGljYXRpb24gSUQuICcgKyB1c2FnZSk7XG4gIH1cblxuICBpZiAob3B0cy5fYWxsb3dFbXB0eUNyZWRlbnRpYWxzICE9PSB0cnVlICYmICFhcGlLZXkpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkFsZ29saWFTZWFyY2hFcnJvcignUGxlYXNlIHByb3ZpZGUgYW4gQVBJIGtleS4gJyArIHVzYWdlKTtcbiAgfVxuXG4gIHRoaXMuYXBwbGljYXRpb25JRCA9IGFwcGxpY2F0aW9uSUQ7XG4gIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xuXG4gIHRoaXMuaG9zdHMgPSB7XG4gICAgcmVhZDogW10sXG4gICAgd3JpdGU6IFtdXG4gIH07XG5cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgdGhpcy5fdGltZW91dHMgPSBvcHRzLnRpbWVvdXRzIHx8IHtcbiAgICBjb25uZWN0OiAxICogMTAwMCwgLy8gNTAwbXMgY29ubmVjdCBpcyBHUFJTIGxhdGVuY3lcbiAgICByZWFkOiAyICogMTAwMCxcbiAgICB3cml0ZTogMzAgKiAxMDAwXG4gIH07XG5cbiAgLy8gYmFja3dhcmQgY29tcGF0LCBpZiBvcHRzLnRpbWVvdXQgaXMgcGFzc2VkLCB3ZSB1c2UgaXQgdG8gY29uZmlndXJlIGFsbCB0aW1lb3V0cyBsaWtlIGJlZm9yZVxuICBpZiAob3B0cy50aW1lb3V0KSB7XG4gICAgdGhpcy5fdGltZW91dHMuY29ubmVjdCA9IHRoaXMuX3RpbWVvdXRzLnJlYWQgPSB0aGlzLl90aW1lb3V0cy53cml0ZSA9IG9wdHMudGltZW91dDtcbiAgfVxuXG4gIHZhciBwcm90b2NvbCA9IG9wdHMucHJvdG9jb2wgfHwgJ2h0dHBzOic7XG4gIC8vIHdoaWxlIHdlIGFkdm9jYXRlIGZvciBjb2xvbi1hdC10aGUtZW5kIHZhbHVlczogJ2h0dHA6JyBmb3IgYG9wdHMucHJvdG9jb2xgXG4gIC8vIHdlIGFsc28gYWNjZXB0IGBodHRwYCBhbmQgYGh0dHBzYC4gSXQncyBhIGNvbW1vbiBlcnJvci5cbiAgaWYgKCEvOiQvLnRlc3QocHJvdG9jb2wpKSB7XG4gICAgcHJvdG9jb2wgPSBwcm90b2NvbCArICc6JztcbiAgfVxuXG4gIGlmIChwcm90b2NvbCAhPT0gJ2h0dHA6JyAmJiBwcm90b2NvbCAhPT0gJ2h0dHBzOicpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkFsZ29saWFTZWFyY2hFcnJvcigncHJvdG9jb2wgbXVzdCBiZSBgaHR0cDpgIG9yIGBodHRwczpgICh3YXMgYCcgKyBvcHRzLnByb3RvY29sICsgJ2ApJyk7XG4gIH1cblxuICB0aGlzLl9jaGVja0FwcElkRGF0YSgpO1xuXG4gIGlmICghb3B0cy5ob3N0cykge1xuICAgIHZhciBkZWZhdWx0SG9zdHMgPSBtYXAodGhpcy5fc2h1ZmZsZVJlc3VsdCwgZnVuY3Rpb24oaG9zdE51bWJlcikge1xuICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uSUQgKyAnLScgKyBob3N0TnVtYmVyICsgJy5hbGdvbGlhbmV0LmNvbSc7XG4gICAgfSk7XG5cbiAgICAvLyBubyBob3N0cyBnaXZlbiwgY29tcHV0ZSBkZWZhdWx0c1xuICAgIHZhciBtYWluU3VmZml4ID0gKG9wdHMuZHNuID09PSBmYWxzZSA/ICcnIDogJy1kc24nKSArICcuYWxnb2xpYS5uZXQnO1xuICAgIHRoaXMuaG9zdHMucmVhZCA9IFt0aGlzLmFwcGxpY2F0aW9uSUQgKyBtYWluU3VmZml4XS5jb25jYXQoZGVmYXVsdEhvc3RzKTtcbiAgICB0aGlzLmhvc3RzLndyaXRlID0gW3RoaXMuYXBwbGljYXRpb25JRCArICcuYWxnb2xpYS5uZXQnXS5jb25jYXQoZGVmYXVsdEhvc3RzKTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KG9wdHMuaG9zdHMpKSB7XG4gICAgLy8gd2hlbiBwYXNzaW5nIGN1c3RvbSBob3N0cywgd2UgbmVlZCB0byBoYXZlIGEgZGlmZmVyZW50IGhvc3QgaW5kZXggaWYgdGhlIG51bWJlclxuICAgIC8vIG9mIHdyaXRlL3JlYWQgaG9zdHMgYXJlIGRpZmZlcmVudC5cbiAgICB0aGlzLmhvc3RzLnJlYWQgPSBjbG9uZShvcHRzLmhvc3RzKTtcbiAgICB0aGlzLmhvc3RzLndyaXRlID0gY2xvbmUob3B0cy5ob3N0cyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5ob3N0cy5yZWFkID0gY2xvbmUob3B0cy5ob3N0cy5yZWFkKTtcbiAgICB0aGlzLmhvc3RzLndyaXRlID0gY2xvbmUob3B0cy5ob3N0cy53cml0ZSk7XG4gIH1cblxuICAvLyBhZGQgcHJvdG9jb2wgYW5kIGxvd2VyY2FzZSBob3N0c1xuICB0aGlzLmhvc3RzLnJlYWQgPSBtYXAodGhpcy5ob3N0cy5yZWFkLCBwcmVwYXJlSG9zdChwcm90b2NvbCkpO1xuICB0aGlzLmhvc3RzLndyaXRlID0gbWFwKHRoaXMuaG9zdHMud3JpdGUsIHByZXBhcmVIb3N0KHByb3RvY29sKSk7XG5cbiAgdGhpcy5leHRyYUhlYWRlcnMgPSB7fTtcblxuICAvLyBJbiBzb21lIHNpdHVhdGlvbnMgeW91IG1pZ2h0IHdhbnQgdG8gd2FybSB0aGUgY2FjaGVcbiAgdGhpcy5jYWNoZSA9IG9wdHMuX2NhY2hlIHx8IHt9O1xuXG4gIHRoaXMuX3VhID0gb3B0cy5fdWE7XG4gIHRoaXMuX3VzZUNhY2hlID0gb3B0cy5fdXNlQ2FjaGUgPT09IHVuZGVmaW5lZCB8fCBvcHRzLl9jYWNoZSA/IHRydWUgOiBvcHRzLl91c2VDYWNoZTtcbiAgdGhpcy5fdXNlUmVxdWVzdENhY2hlID0gdGhpcy5fdXNlQ2FjaGUgJiYgb3B0cy5fdXNlUmVxdWVzdENhY2hlO1xuICB0aGlzLl91c2VGYWxsYmFjayA9IG9wdHMudXNlRmFsbGJhY2sgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRzLnVzZUZhbGxiYWNrO1xuXG4gIHRoaXMuX3NldFRpbWVvdXQgPSBvcHRzLl9zZXRUaW1lb3V0O1xuXG4gIGRlYnVnKCdpbml0IGRvbmUsICVqJywgdGhpcyk7XG59XG5cbi8qXG4gKiBHZXQgdGhlIGluZGV4IG9iamVjdCBpbml0aWFsaXplZFxuICpcbiAqIEBwYXJhbSBpbmRleE5hbWUgdGhlIG5hbWUgb2YgaW5kZXhcbiAqIEBwYXJhbSBjYWxsYmFjayB0aGUgcmVzdWx0IGNhbGxiYWNrIHdpdGggb25lIGFyZ3VtZW50ICh0aGUgSW5kZXggaW5zdGFuY2UpXG4gKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5pbml0SW5kZXggPSBmdW5jdGlvbihpbmRleE5hbWUpIHtcbiAgcmV0dXJuIG5ldyBJbmRleENvcmUodGhpcywgaW5kZXhOYW1lKTtcbn07XG5cbi8qKlxuKiBBZGQgYW4gZXh0cmEgZmllbGQgdG8gdGhlIEhUVFAgcmVxdWVzdFxuKlxuKiBAcGFyYW0gbmFtZSB0aGUgaGVhZGVyIGZpZWxkIG5hbWVcbiogQHBhcmFtIHZhbHVlIHRoZSBoZWFkZXIgZmllbGQgdmFsdWVcbiovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuc2V0RXh0cmFIZWFkZXIgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB0aGlzLmV4dHJhSGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gdmFsdWU7XG59O1xuXG4vKipcbiogR2V0IHRoZSB2YWx1ZSBvZiBhbiBleHRyYSBIVFRQIGhlYWRlclxuKlxuKiBAcGFyYW0gbmFtZSB0aGUgaGVhZGVyIGZpZWxkIG5hbWVcbiovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuZ2V0RXh0cmFIZWFkZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHJldHVybiB0aGlzLmV4dHJhSGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4qIFJlbW92ZSBhbiBleHRyYSBmaWVsZCBmcm9tIHRoZSBIVFRQIHJlcXVlc3RcbipcbiogQHBhcmFtIG5hbWUgdGhlIGhlYWRlciBmaWVsZCBuYW1lXG4qL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLnVuc2V0RXh0cmFIZWFkZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gIGRlbGV0ZSB0aGlzLmV4dHJhSGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4qIEF1Z21lbnQgc2VudCB4LWFsZ29saWEtYWdlbnQgd2l0aCBtb3JlIGRhdGEsIGVhY2ggYWdlbnQgcGFydFxuKiBpcyBhdXRvbWF0aWNhbGx5IHNlcGFyYXRlZCBmcm9tIHRoZSBvdGhlcnMgYnkgYSBzZW1pY29sb247XG4qXG4qIEBwYXJhbSBhbGdvbGlhQWdlbnQgdGhlIGFnZW50IHRvIGFkZFxuKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5hZGRBbGdvbGlhQWdlbnQgPSBmdW5jdGlvbihhbGdvbGlhQWdlbnQpIHtcbiAgdmFyIGFsZ29saWFBZ2VudFdpdGhEZWxpbWl0ZXIgPSAnOyAnICsgYWxnb2xpYUFnZW50O1xuXG4gIGlmICh0aGlzLl91YS5pbmRleE9mKGFsZ29saWFBZ2VudFdpdGhEZWxpbWl0ZXIpID09PSAtMSkge1xuICAgIHRoaXMuX3VhICs9IGFsZ29saWFBZ2VudFdpdGhEZWxpbWl0ZXI7XG4gIH1cbn07XG5cbi8qXG4gKiBXcmFwcGVyIHRoYXQgdHJ5IGFsbCBob3N0cyB0byBtYXhpbWl6ZSB0aGUgcXVhbGl0eSBvZiBzZXJ2aWNlXG4gKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fanNvblJlcXVlc3QgPSBmdW5jdGlvbihpbml0aWFsT3B0cykge1xuICB0aGlzLl9jaGVja0FwcElkRGF0YSgpO1xuXG4gIHZhciByZXF1ZXN0RGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdhbGdvbGlhc2VhcmNoOicgKyBpbml0aWFsT3B0cy51cmwpO1xuXG5cbiAgdmFyIGJvZHk7XG4gIHZhciBjYWNoZUlEO1xuICB2YXIgYWRkaXRpb25hbFVBID0gaW5pdGlhbE9wdHMuYWRkaXRpb25hbFVBIHx8ICcnO1xuICB2YXIgY2FjaGUgPSBpbml0aWFsT3B0cy5jYWNoZTtcbiAgdmFyIGNsaWVudCA9IHRoaXM7XG4gIHZhciB0cmllcyA9IDA7XG4gIHZhciB1c2luZ0ZhbGxiYWNrID0gZmFsc2U7XG4gIHZhciBoYXNGYWxsYmFjayA9IGNsaWVudC5fdXNlRmFsbGJhY2sgJiYgY2xpZW50Ll9yZXF1ZXN0LmZhbGxiYWNrICYmIGluaXRpYWxPcHRzLmZhbGxiYWNrO1xuICB2YXIgaGVhZGVycztcblxuICBpZiAoXG4gICAgdGhpcy5hcGlLZXkubGVuZ3RoID4gTUFYX0FQSV9LRVlfTEVOR1RIICYmXG4gICAgaW5pdGlhbE9wdHMuYm9keSAhPT0gdW5kZWZpbmVkICYmXG4gICAgKGluaXRpYWxPcHRzLmJvZHkucGFyYW1zICE9PSB1bmRlZmluZWQgfHwgLy8gaW5kZXguc2VhcmNoKClcbiAgICBpbml0aWFsT3B0cy5ib2R5LnJlcXVlc3RzICE9PSB1bmRlZmluZWQpIC8vIGNsaWVudC5zZWFyY2goKVxuICApIHtcbiAgICBpbml0aWFsT3B0cy5ib2R5LmFwaUtleSA9IHRoaXMuYXBpS2V5O1xuICAgIGhlYWRlcnMgPSB0aGlzLl9jb21wdXRlUmVxdWVzdEhlYWRlcnMoe1xuICAgICAgYWRkaXRpb25hbFVBOiBhZGRpdGlvbmFsVUEsXG4gICAgICB3aXRoQXBpS2V5OiBmYWxzZSxcbiAgICAgIGhlYWRlcnM6IGluaXRpYWxPcHRzLmhlYWRlcnNcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBoZWFkZXJzID0gdGhpcy5fY29tcHV0ZVJlcXVlc3RIZWFkZXJzKHtcbiAgICAgIGFkZGl0aW9uYWxVQTogYWRkaXRpb25hbFVBLFxuICAgICAgaGVhZGVyczogaW5pdGlhbE9wdHMuaGVhZGVyc1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGluaXRpYWxPcHRzLmJvZHkgIT09IHVuZGVmaW5lZCkge1xuICAgIGJvZHkgPSBzYWZlSlNPTlN0cmluZ2lmeShpbml0aWFsT3B0cy5ib2R5KTtcbiAgfVxuXG4gIHJlcXVlc3REZWJ1ZygncmVxdWVzdCBzdGFydCcpO1xuICB2YXIgZGVidWdEYXRhID0gW107XG5cblxuICBmdW5jdGlvbiBkb1JlcXVlc3QocmVxdWVzdGVyLCByZXFPcHRzKSB7XG4gICAgY2xpZW50Ll9jaGVja0FwcElkRGF0YSgpO1xuXG4gICAgdmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgICBpZiAoY2xpZW50Ll91c2VDYWNoZSAmJiAhY2xpZW50Ll91c2VSZXF1ZXN0Q2FjaGUpIHtcbiAgICAgIGNhY2hlSUQgPSBpbml0aWFsT3B0cy51cmw7XG4gICAgfVxuXG4gICAgLy8gYXMgd2Ugc29tZXRpbWUgdXNlIFBPU1QgcmVxdWVzdHMgdG8gcGFzcyBwYXJhbWV0ZXJzIChsaWtlIHF1ZXJ5PSdhYScpLFxuICAgIC8vIHRoZSBjYWNoZUlEIG11c3QgYWxzbyBpbmNsdWRlIHRoZSBib2R5IHRvIGJlIGRpZmZlcmVudCBiZXR3ZWVuIGNhbGxzXG4gICAgaWYgKGNsaWVudC5fdXNlQ2FjaGUgJiYgIWNsaWVudC5fdXNlUmVxdWVzdENhY2hlICYmIGJvZHkpIHtcbiAgICAgIGNhY2hlSUQgKz0gJ19ib2R5XycgKyByZXFPcHRzLmJvZHk7XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIGNhY2hlIGV4aXN0ZW5jZVxuICAgIGlmIChpc0NhY2hlVmFsaWRXaXRoQ3VycmVudElEKCFjbGllbnQuX3VzZVJlcXVlc3RDYWNoZSwgY2FjaGUsIGNhY2hlSUQpKSB7XG4gICAgICByZXF1ZXN0RGVidWcoJ3NlcnZpbmcgcmVzcG9uc2UgZnJvbSBjYWNoZScpO1xuXG4gICAgICB2YXIgcmVzcG9uc2VUZXh0ID0gY2FjaGVbY2FjaGVJRF07XG5cbiAgICAgIC8vIENhY2hlIHJlc3BvbnNlIG11c3QgbWF0Y2ggdGhlIHR5cGUgb2YgdGhlIG9yaWdpbmFsIG9uZVxuICAgICAgcmV0dXJuIGNsaWVudC5fcHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgYm9keTogSlNPTi5wYXJzZShyZXNwb25zZVRleHQpLFxuICAgICAgICByZXNwb25zZVRleHQ6IHJlc3BvbnNlVGV4dFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gaWYgd2UgcmVhY2hlZCBtYXggdHJpZXNcbiAgICBpZiAodHJpZXMgPj0gY2xpZW50Lmhvc3RzW2luaXRpYWxPcHRzLmhvc3RUeXBlXS5sZW5ndGgpIHtcbiAgICAgIGlmICghaGFzRmFsbGJhY2sgfHwgdXNpbmdGYWxsYmFjaykge1xuICAgICAgICByZXF1ZXN0RGVidWcoJ2NvdWxkIG5vdCBnZXQgYW55IHJlc3BvbnNlJyk7XG4gICAgICAgIC8vIHRoZW4gc3RvcFxuICAgICAgICByZXR1cm4gY2xpZW50Ll9wcm9taXNlLnJlamVjdChuZXcgZXJyb3JzLkFsZ29saWFTZWFyY2hFcnJvcihcbiAgICAgICAgICAnQ2Fubm90IGNvbm5lY3QgdG8gdGhlIEFsZ29saWFTZWFyY2ggQVBJLicgK1xuICAgICAgICAgICcgU2VuZCBhbiBlbWFpbCB0byBzdXBwb3J0QGFsZ29saWEuY29tIHRvIHJlcG9ydCBhbmQgcmVzb2x2ZSB0aGUgaXNzdWUuJyArXG4gICAgICAgICAgJyBBcHBsaWNhdGlvbiBpZCB3YXM6ICcgKyBjbGllbnQuYXBwbGljYXRpb25JRCwge2RlYnVnRGF0YTogZGVidWdEYXRhfVxuICAgICAgICApKTtcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdERlYnVnKCdzd2l0Y2hpbmcgdG8gZmFsbGJhY2snKTtcblxuICAgICAgLy8gbGV0J3MgdHJ5IHRoZSBmYWxsYmFjayBzdGFydGluZyBmcm9tIGhlcmVcbiAgICAgIHRyaWVzID0gMDtcblxuICAgICAgLy8gbWV0aG9kLCB1cmwgYW5kIGJvZHkgYXJlIGZhbGxiYWNrIGRlcGVuZGVudFxuICAgICAgcmVxT3B0cy5tZXRob2QgPSBpbml0aWFsT3B0cy5mYWxsYmFjay5tZXRob2Q7XG4gICAgICByZXFPcHRzLnVybCA9IGluaXRpYWxPcHRzLmZhbGxiYWNrLnVybDtcbiAgICAgIHJlcU9wdHMuanNvbkJvZHkgPSBpbml0aWFsT3B0cy5mYWxsYmFjay5ib2R5O1xuICAgICAgaWYgKHJlcU9wdHMuanNvbkJvZHkpIHtcbiAgICAgICAgcmVxT3B0cy5ib2R5ID0gc2FmZUpTT05TdHJpbmdpZnkocmVxT3B0cy5qc29uQm9keSk7XG4gICAgICB9XG4gICAgICAvLyByZS1jb21wdXRlIGhlYWRlcnMsIHRoZXkgY291bGQgYmUgb21pdHRpbmcgdGhlIEFQSSBLRVlcbiAgICAgIGhlYWRlcnMgPSBjbGllbnQuX2NvbXB1dGVSZXF1ZXN0SGVhZGVycyh7XG4gICAgICAgIGFkZGl0aW9uYWxVQTogYWRkaXRpb25hbFVBLFxuICAgICAgICBoZWFkZXJzOiBpbml0aWFsT3B0cy5oZWFkZXJzXG4gICAgICB9KTtcblxuICAgICAgcmVxT3B0cy50aW1lb3V0cyA9IGNsaWVudC5fZ2V0VGltZW91dHNGb3JSZXF1ZXN0KGluaXRpYWxPcHRzLmhvc3RUeXBlKTtcbiAgICAgIGNsaWVudC5fc2V0SG9zdEluZGV4QnlUeXBlKDAsIGluaXRpYWxPcHRzLmhvc3RUeXBlKTtcbiAgICAgIHVzaW5nRmFsbGJhY2sgPSB0cnVlOyAvLyB0aGUgY3VycmVudCByZXF1ZXN0IGlzIG5vdyB1c2luZyBmYWxsYmFja1xuICAgICAgcmV0dXJuIGRvUmVxdWVzdChjbGllbnQuX3JlcXVlc3QuZmFsbGJhY2ssIHJlcU9wdHMpO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50SG9zdCA9IGNsaWVudC5fZ2V0SG9zdEJ5VHlwZShpbml0aWFsT3B0cy5ob3N0VHlwZSk7XG5cbiAgICB2YXIgdXJsID0gY3VycmVudEhvc3QgKyByZXFPcHRzLnVybDtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIGJvZHk6IHJlcU9wdHMuYm9keSxcbiAgICAgIGpzb25Cb2R5OiByZXFPcHRzLmpzb25Cb2R5LFxuICAgICAgbWV0aG9kOiByZXFPcHRzLm1ldGhvZCxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICB0aW1lb3V0czogcmVxT3B0cy50aW1lb3V0cyxcbiAgICAgIGRlYnVnOiByZXF1ZXN0RGVidWcsXG4gICAgICBmb3JjZUF1dGhIZWFkZXJzOiByZXFPcHRzLmZvcmNlQXV0aEhlYWRlcnNcbiAgICB9O1xuXG4gICAgcmVxdWVzdERlYnVnKCdtZXRob2Q6ICVzLCB1cmw6ICVzLCBoZWFkZXJzOiAlaiwgdGltZW91dHM6ICVkJyxcbiAgICAgIG9wdGlvbnMubWV0aG9kLCB1cmwsIG9wdGlvbnMuaGVhZGVycywgb3B0aW9ucy50aW1lb3V0cyk7XG5cbiAgICBpZiAocmVxdWVzdGVyID09PSBjbGllbnQuX3JlcXVlc3QuZmFsbGJhY2spIHtcbiAgICAgIHJlcXVlc3REZWJ1ZygndXNpbmcgZmFsbGJhY2snKTtcbiAgICB9XG5cbiAgICAvLyBgcmVxdWVzdGVyYCBpcyBhbnkgb2YgdGhpcy5fcmVxdWVzdCBvciB0aGlzLl9yZXF1ZXN0LmZhbGxiYWNrXG4gICAgLy8gdGh1cyBpdCBuZWVkcyB0byBiZSBjYWxsZWQgdXNpbmcgdGhlIGNsaWVudCBhcyBjb250ZXh0XG4gICAgcmV0dXJuIHJlcXVlc3Rlci5jYWxsKGNsaWVudCwgdXJsLCBvcHRpb25zKS50aGVuKHN1Y2Nlc3MsIHRyeUZhbGxiYWNrKTtcblxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoaHR0cFJlc3BvbnNlKSB7XG4gICAgICAvLyBjb21wdXRlIHRoZSBzdGF0dXMgb2YgdGhlIHJlc3BvbnNlLFxuICAgICAgLy9cbiAgICAgIC8vIFdoZW4gaW4gYnJvd3NlciBtb2RlLCB1c2luZyBYRFIgb3IgSlNPTlAsIHdlIGhhdmUgbm8gc3RhdHVzQ29kZSBhdmFpbGFibGVcbiAgICAgIC8vIFNvIHdlIHJlbHkgb24gb3VyIEFQSSByZXNwb25zZSBgc3RhdHVzYCBwcm9wZXJ0eS5cbiAgICAgIC8vIEJ1dCBgd2FpdFRhc2tgIGNhbiBzZXQgYSBgc3RhdHVzYCBwcm9wZXJ0eSB3aGljaCBpcyBub3QgdGhlIHN0YXR1c0NvZGUgKGl0J3MgdGhlIHRhc2sgc3RhdHVzKVxuICAgICAgLy8gU28gd2UgY2hlY2sgaWYgdGhlcmUncyBhIGBtZXNzYWdlYCBhbG9uZyBgc3RhdHVzYCBhbmQgaXQgbWVhbnMgaXQncyBhbiBlcnJvclxuICAgICAgLy9cbiAgICAgIC8vIFRoYXQncyB0aGUgb25seSBjYXNlIHdoZXJlIHdlIGhhdmUgYSByZXNwb25zZS5zdGF0dXMgdGhhdCdzIG5vdCB0aGUgaHR0cCBzdGF0dXNDb2RlXG4gICAgICB2YXIgc3RhdHVzID0gaHR0cFJlc3BvbnNlICYmIGh0dHBSZXNwb25zZS5ib2R5ICYmIGh0dHBSZXNwb25zZS5ib2R5Lm1lc3NhZ2UgJiYgaHR0cFJlc3BvbnNlLmJvZHkuc3RhdHVzIHx8XG5cbiAgICAgICAgLy8gdGhpcyBpcyBpbXBvcnRhbnQgdG8gY2hlY2sgdGhlIHJlcXVlc3Qgc3RhdHVzQ29kZSBBRlRFUiB0aGUgYm9keSBldmVudHVhbFxuICAgICAgICAvLyBzdGF0dXNDb2RlIGJlY2F1c2Ugc29tZSBpbXBsZW1lbnRhdGlvbnMgKGpRdWVyeSBYRG9tYWluUmVxdWVzdCB0cmFuc3BvcnQpIG1heVxuICAgICAgICAvLyBzZW5kIHN0YXR1c0NvZGUgMjAwIHdoaWxlIHdlIGhhZCBhbiBlcnJvclxuICAgICAgICBodHRwUmVzcG9uc2Uuc3RhdHVzQ29kZSB8fFxuXG4gICAgICAgIC8vIFdoZW4gaW4gYnJvd3NlciBtb2RlLCB1c2luZyBYRFIgb3IgSlNPTlBcbiAgICAgICAgLy8gd2UgZGVmYXVsdCB0byBzdWNjZXNzIHdoZW4gbm8gZXJyb3IgKG5vIHJlc3BvbnNlLnN0YXR1cyAmJiByZXNwb25zZS5tZXNzYWdlKVxuICAgICAgICAvLyBJZiB0aGVyZSB3YXMgYSBKU09OLnBhcnNlKCkgZXJyb3IgdGhlbiBib2R5IGlzIG51bGwgYW5kIGl0IGZhaWxzXG4gICAgICAgIGh0dHBSZXNwb25zZSAmJiBodHRwUmVzcG9uc2UuYm9keSAmJiAyMDA7XG5cbiAgICAgIHJlcXVlc3REZWJ1ZygncmVjZWl2ZWQgcmVzcG9uc2U6IHN0YXR1c0NvZGU6ICVzLCBjb21wdXRlZCBzdGF0dXNDb2RlOiAlZCwgaGVhZGVyczogJWonLFxuICAgICAgICBodHRwUmVzcG9uc2Uuc3RhdHVzQ29kZSwgc3RhdHVzLCBodHRwUmVzcG9uc2UuaGVhZGVycyk7XG5cbiAgICAgIHZhciBodHRwUmVzcG9uc2VPayA9IE1hdGguZmxvb3Ioc3RhdHVzIC8gMTAwKSA9PT0gMjtcblxuICAgICAgdmFyIGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgZGVidWdEYXRhLnB1c2goe1xuICAgICAgICBjdXJyZW50SG9zdDogY3VycmVudEhvc3QsXG4gICAgICAgIGhlYWRlcnM6IHJlbW92ZUNyZWRlbnRpYWxzKGhlYWRlcnMpLFxuICAgICAgICBjb250ZW50OiBib2R5IHx8IG51bGwsXG4gICAgICAgIGNvbnRlbnRMZW5ndGg6IGJvZHkgIT09IHVuZGVmaW5lZCA/IGJvZHkubGVuZ3RoIDogbnVsbCxcbiAgICAgICAgbWV0aG9kOiByZXFPcHRzLm1ldGhvZCxcbiAgICAgICAgdGltZW91dHM6IHJlcU9wdHMudGltZW91dHMsXG4gICAgICAgIHVybDogcmVxT3B0cy51cmwsXG4gICAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lLFxuICAgICAgICBlbmRUaW1lOiBlbmRUaW1lLFxuICAgICAgICBkdXJhdGlvbjogZW5kVGltZSAtIHN0YXJ0VGltZSxcbiAgICAgICAgc3RhdHVzQ29kZTogc3RhdHVzXG4gICAgICB9KTtcblxuICAgICAgaWYgKGh0dHBSZXNwb25zZU9rKSB7XG4gICAgICAgIGlmIChjbGllbnQuX3VzZUNhY2hlICYmICFjbGllbnQuX3VzZVJlcXVlc3RDYWNoZSAmJiBjYWNoZSkge1xuICAgICAgICAgIGNhY2hlW2NhY2hlSURdID0gaHR0cFJlc3BvbnNlLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVzcG9uc2VUZXh0OiBodHRwUmVzcG9uc2UucmVzcG9uc2VUZXh0LFxuICAgICAgICAgIGJvZHk6IGh0dHBSZXNwb25zZS5ib2R5XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHZhciBzaG91bGRSZXRyeSA9IE1hdGguZmxvb3Ioc3RhdHVzIC8gMTAwKSAhPT0gNDtcblxuICAgICAgaWYgKHNob3VsZFJldHJ5KSB7XG4gICAgICAgIHRyaWVzICs9IDE7XG4gICAgICAgIHJldHVybiByZXRyeVJlcXVlc3QoKTtcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdERlYnVnKCd1bnJlY292ZXJhYmxlIGVycm9yJyk7XG5cbiAgICAgIC8vIG5vIHN1Y2Nlc3MgYW5kIG5vIHJldHJ5ID0+IGZhaWxcbiAgICAgIHZhciB1bnJlY292ZXJhYmxlRXJyb3IgPSBuZXcgZXJyb3JzLkFsZ29saWFTZWFyY2hFcnJvcihcbiAgICAgICAgaHR0cFJlc3BvbnNlLmJvZHkgJiYgaHR0cFJlc3BvbnNlLmJvZHkubWVzc2FnZSwge2RlYnVnRGF0YTogZGVidWdEYXRhLCBzdGF0dXNDb2RlOiBzdGF0dXN9XG4gICAgICApO1xuXG4gICAgICByZXR1cm4gY2xpZW50Ll9wcm9taXNlLnJlamVjdCh1bnJlY292ZXJhYmxlRXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyeUZhbGxiYWNrKGVycikge1xuICAgICAgLy8gZXJyb3IgY2FzZXM6XG4gICAgICAvLyAgV2hpbGUgbm90IGluIGZhbGxiYWNrIG1vZGU6XG4gICAgICAvLyAgICAtIENPUlMgbm90IHN1cHBvcnRlZFxuICAgICAgLy8gICAgLSBuZXR3b3JrIGVycm9yXG4gICAgICAvLyAgV2hpbGUgaW4gZmFsbGJhY2sgbW9kZTpcbiAgICAgIC8vICAgIC0gdGltZW91dFxuICAgICAgLy8gICAgLSBuZXR3b3JrIGVycm9yXG4gICAgICAvLyAgICAtIGJhZGx5IGZvcm1hdHRlZCBKU09OUCAoc2NyaXB0IGxvYWRlZCwgZGlkIG5vdCBjYWxsIG91ciBjYWxsYmFjaylcbiAgICAgIC8vICBJbiBib3RoIGNhc2VzOlxuICAgICAgLy8gICAgLSB1bmNhdWdodCBleGNlcHRpb24gb2NjdXJzIChUeXBlRXJyb3IpXG4gICAgICByZXF1ZXN0RGVidWcoJ2Vycm9yOiAlcywgc3RhY2s6ICVzJywgZXJyLm1lc3NhZ2UsIGVyci5zdGFjayk7XG5cbiAgICAgIHZhciBlbmRUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgIGRlYnVnRGF0YS5wdXNoKHtcbiAgICAgICAgY3VycmVudEhvc3Q6IGN1cnJlbnRIb3N0LFxuICAgICAgICBoZWFkZXJzOiByZW1vdmVDcmVkZW50aWFscyhoZWFkZXJzKSxcbiAgICAgICAgY29udGVudDogYm9keSB8fCBudWxsLFxuICAgICAgICBjb250ZW50TGVuZ3RoOiBib2R5ICE9PSB1bmRlZmluZWQgPyBib2R5Lmxlbmd0aCA6IG51bGwsXG4gICAgICAgIG1ldGhvZDogcmVxT3B0cy5tZXRob2QsXG4gICAgICAgIHRpbWVvdXRzOiByZXFPcHRzLnRpbWVvdXRzLFxuICAgICAgICB1cmw6IHJlcU9wdHMudXJsLFxuICAgICAgICBzdGFydFRpbWU6IHN0YXJ0VGltZSxcbiAgICAgICAgZW5kVGltZTogZW5kVGltZSxcbiAgICAgICAgZHVyYXRpb246IGVuZFRpbWUgLSBzdGFydFRpbWVcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIShlcnIgaW5zdGFuY2VvZiBlcnJvcnMuQWxnb2xpYVNlYXJjaEVycm9yKSkge1xuICAgICAgICBlcnIgPSBuZXcgZXJyb3JzLlVua25vd24oZXJyICYmIGVyci5tZXNzYWdlLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICB0cmllcyArPSAxO1xuXG4gICAgICAvLyBzdG9wIHRoZSByZXF1ZXN0IGltcGxlbWVudGF0aW9uIHdoZW46XG4gICAgICBpZiAoXG4gICAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgdGhpcyBlcnJvcixcbiAgICAgICAgLy8gaXQgY29tZXMgZnJvbSBhIHRocm93IGluIHNvbWUgb3RoZXIgcGllY2Ugb2YgY29kZVxuICAgICAgICBlcnIgaW5zdGFuY2VvZiBlcnJvcnMuVW5rbm93biB8fFxuXG4gICAgICAgIC8vIHNlcnZlciBzZW50IHVucGFyc2FibGUgSlNPTlxuICAgICAgICBlcnIgaW5zdGFuY2VvZiBlcnJvcnMuVW5wYXJzYWJsZUpTT04gfHxcblxuICAgICAgICAvLyBtYXggdHJpZXMgYW5kIGFscmVhZHkgdXNpbmcgZmFsbGJhY2sgb3Igbm8gZmFsbGJhY2tcbiAgICAgICAgdHJpZXMgPj0gY2xpZW50Lmhvc3RzW2luaXRpYWxPcHRzLmhvc3RUeXBlXS5sZW5ndGggJiZcbiAgICAgICAgKHVzaW5nRmFsbGJhY2sgfHwgIWhhc0ZhbGxiYWNrKSkge1xuICAgICAgICAvLyBzdG9wIHJlcXVlc3QgaW1wbGVtZW50YXRpb24gZm9yIHRoaXMgY29tbWFuZFxuICAgICAgICBlcnIuZGVidWdEYXRhID0gZGVidWdEYXRhO1xuICAgICAgICByZXR1cm4gY2xpZW50Ll9wcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgfVxuXG4gICAgICAvLyBXaGVuIGEgdGltZW91dCBvY2N1cnJlZCwgcmV0cnkgYnkgcmFpc2luZyB0aW1lb3V0XG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgZXJyb3JzLlJlcXVlc3RUaW1lb3V0KSB7XG4gICAgICAgIHJldHVybiByZXRyeVJlcXVlc3RXaXRoSGlnaGVyVGltZW91dCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0cnlSZXF1ZXN0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmV0cnlSZXF1ZXN0KCkge1xuICAgICAgcmVxdWVzdERlYnVnKCdyZXRyeWluZyByZXF1ZXN0Jyk7XG4gICAgICBjbGllbnQuX2luY3JlbWVudEhvc3RJbmRleChpbml0aWFsT3B0cy5ob3N0VHlwZSk7XG4gICAgICByZXR1cm4gZG9SZXF1ZXN0KHJlcXVlc3RlciwgcmVxT3B0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmV0cnlSZXF1ZXN0V2l0aEhpZ2hlclRpbWVvdXQoKSB7XG4gICAgICByZXF1ZXN0RGVidWcoJ3JldHJ5aW5nIHJlcXVlc3Qgd2l0aCBoaWdoZXIgdGltZW91dCcpO1xuICAgICAgY2xpZW50Ll9pbmNyZW1lbnRIb3N0SW5kZXgoaW5pdGlhbE9wdHMuaG9zdFR5cGUpO1xuICAgICAgY2xpZW50Ll9pbmNyZW1lbnRUaW1lb3V0TXVsdGlwbGVyKCk7XG4gICAgICByZXFPcHRzLnRpbWVvdXRzID0gY2xpZW50Ll9nZXRUaW1lb3V0c0ZvclJlcXVlc3QoaW5pdGlhbE9wdHMuaG9zdFR5cGUpO1xuICAgICAgcmV0dXJuIGRvUmVxdWVzdChyZXF1ZXN0ZXIsIHJlcU9wdHMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQ2FjaGVWYWxpZFdpdGhDdXJyZW50SUQoXG4gICAgdXNlUmVxdWVzdENhY2hlLFxuICAgIGN1cnJlbnRDYWNoZSxcbiAgICBjdXJyZW50Q2FjaGVJRFxuICApIHtcbiAgICByZXR1cm4gKFxuICAgICAgY2xpZW50Ll91c2VDYWNoZSAmJlxuICAgICAgdXNlUmVxdWVzdENhY2hlICYmXG4gICAgICBjdXJyZW50Q2FjaGUgJiZcbiAgICAgIGN1cnJlbnRDYWNoZVtjdXJyZW50Q2FjaGVJRF0gIT09IHVuZGVmaW5lZFxuICAgICk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGludGVyb3BDYWxsYmFja1JldHVybihyZXF1ZXN0LCBjYWxsYmFjaykge1xuICAgIGlmIChpc0NhY2hlVmFsaWRXaXRoQ3VycmVudElEKGNsaWVudC5fdXNlUmVxdWVzdENhY2hlLCBjYWNoZSwgY2FjaGVJRCkpIHtcbiAgICAgIHJlcXVlc3QuY2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFJlbGVhc2UgdGhlIGNhY2hlIG9uIGVycm9yXG4gICAgICAgIGRlbGV0ZSBjYWNoZVtjYWNoZUlEXTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaW5pdGlhbE9wdHMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIGVpdGhlciB3ZSBoYXZlIGEgY2FsbGJhY2tcbiAgICAgIHJlcXVlc3QudGhlbihmdW5jdGlvbiBva0NiKGNvbnRlbnQpIHtcbiAgICAgICAgZXhpdFByb21pc2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaW5pdGlhbE9wdHMuY2FsbGJhY2sobnVsbCwgY2FsbGJhY2soY29udGVudCkpO1xuICAgICAgICB9LCBjbGllbnQuX3NldFRpbWVvdXQgfHwgc2V0VGltZW91dCk7XG4gICAgICB9LCBmdW5jdGlvbiBub29rQ2IoZXJyKSB7XG4gICAgICAgIGV4aXRQcm9taXNlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGluaXRpYWxPcHRzLmNhbGxiYWNrKGVycik7XG4gICAgICAgIH0sIGNsaWVudC5fc2V0VGltZW91dCB8fCBzZXRUaW1lb3V0KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlaXRoZXIgd2UgYXJlIHVzaW5nIHByb21pc2VzXG4gICAgICByZXR1cm4gcmVxdWVzdC50aGVuKGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBpZiAoY2xpZW50Ll91c2VDYWNoZSAmJiBjbGllbnQuX3VzZVJlcXVlc3RDYWNoZSkge1xuICAgIGNhY2hlSUQgPSBpbml0aWFsT3B0cy51cmw7XG4gIH1cblxuICAvLyBhcyB3ZSBzb21ldGltZSB1c2UgUE9TVCByZXF1ZXN0cyB0byBwYXNzIHBhcmFtZXRlcnMgKGxpa2UgcXVlcnk9J2FhJyksXG4gIC8vIHRoZSBjYWNoZUlEIG11c3QgYWxzbyBpbmNsdWRlIHRoZSBib2R5IHRvIGJlIGRpZmZlcmVudCBiZXR3ZWVuIGNhbGxzXG4gIGlmIChjbGllbnQuX3VzZUNhY2hlICYmIGNsaWVudC5fdXNlUmVxdWVzdENhY2hlICYmIGJvZHkpIHtcbiAgICBjYWNoZUlEICs9ICdfYm9keV8nICsgYm9keTtcbiAgfVxuXG4gIGlmIChpc0NhY2hlVmFsaWRXaXRoQ3VycmVudElEKGNsaWVudC5fdXNlUmVxdWVzdENhY2hlLCBjYWNoZSwgY2FjaGVJRCkpIHtcbiAgICByZXF1ZXN0RGVidWcoJ3NlcnZpbmcgcmVxdWVzdCBmcm9tIGNhY2hlJyk7XG5cbiAgICB2YXIgbWF5YmVQcm9taXNlRm9yQ2FjaGUgPSBjYWNoZVtjYWNoZUlEXTtcblxuICAgIC8vIEluIGNhc2UgdGhlIGNhY2hlIGlzIHdhcm11cCB3aXRoIHZhbHVlIHRoYXQgaXMgbm90IGEgcHJvbWlzZVxuICAgIHZhciBwcm9taXNlRm9yQ2FjaGUgPSB0eXBlb2YgbWF5YmVQcm9taXNlRm9yQ2FjaGUudGhlbiAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBjbGllbnQuX3Byb21pc2UucmVzb2x2ZSh7cmVzcG9uc2VUZXh0OiBtYXliZVByb21pc2VGb3JDYWNoZX0pXG4gICAgICA6IG1heWJlUHJvbWlzZUZvckNhY2hlO1xuXG4gICAgcmV0dXJuIGludGVyb3BDYWxsYmFja1JldHVybihwcm9taXNlRm9yQ2FjaGUsIGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgIC8vIEluIGNhc2Ugb2YgdGhlIGNhY2hlIHJlcXVlc3QsIHJldHVybiB0aGUgb3JpZ2luYWwgdmFsdWVcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGNvbnRlbnQucmVzcG9uc2VUZXh0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciByZXF1ZXN0ID0gZG9SZXF1ZXN0KFxuICAgIGNsaWVudC5fcmVxdWVzdCwge1xuICAgICAgdXJsOiBpbml0aWFsT3B0cy51cmwsXG4gICAgICBtZXRob2Q6IGluaXRpYWxPcHRzLm1ldGhvZCxcbiAgICAgIGJvZHk6IGJvZHksXG4gICAgICBqc29uQm9keTogaW5pdGlhbE9wdHMuYm9keSxcbiAgICAgIHRpbWVvdXRzOiBjbGllbnQuX2dldFRpbWVvdXRzRm9yUmVxdWVzdChpbml0aWFsT3B0cy5ob3N0VHlwZSksXG4gICAgICBmb3JjZUF1dGhIZWFkZXJzOiBpbml0aWFsT3B0cy5mb3JjZUF1dGhIZWFkZXJzXG4gICAgfVxuICApO1xuXG4gIGlmIChjbGllbnQuX3VzZUNhY2hlICYmIGNsaWVudC5fdXNlUmVxdWVzdENhY2hlICYmIGNhY2hlKSB7XG4gICAgY2FjaGVbY2FjaGVJRF0gPSByZXF1ZXN0O1xuICB9XG5cbiAgcmV0dXJuIGludGVyb3BDYWxsYmFja1JldHVybihyZXF1ZXN0LCBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgLy8gSW4gY2FzZSBvZiB0aGUgZmlyc3QgcmVxdWVzdCwgcmV0dXJuIHRoZSBKU09OIHZhbHVlXG4gICAgcmV0dXJuIGNvbnRlbnQuYm9keTtcbiAgfSk7XG59O1xuXG4vKlxuKiBUcmFuc2Zvcm0gc2VhcmNoIHBhcmFtIG9iamVjdCBpbiBxdWVyeSBzdHJpbmdcbiogQHBhcmFtIHtvYmplY3R9IGFyZ3MgYXJndW1lbnRzIHRvIGFkZCB0byB0aGUgY3VycmVudCBxdWVyeSBzdHJpbmdcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcyBjdXJyZW50IHF1ZXJ5IHN0cmluZ1xuKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBmaW5hbCBxdWVyeSBzdHJpbmdcbiovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2dldFNlYXJjaFBhcmFtcyA9IGZ1bmN0aW9uKGFyZ3MsIHBhcmFtcykge1xuICBpZiAoYXJncyA9PT0gdW5kZWZpbmVkIHx8IGFyZ3MgPT09IG51bGwpIHtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBhcmdzKSB7XG4gICAgaWYgKGtleSAhPT0gbnVsbCAmJiBhcmdzW2tleV0gIT09IHVuZGVmaW5lZCAmJiBhcmdzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHBhcmFtcyArPSBwYXJhbXMgPT09ICcnID8gJycgOiAnJic7XG4gICAgICBwYXJhbXMgKz0ga2V5ICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmdzW2tleV0pID09PSAnW29iamVjdCBBcnJheV0nID8gc2FmZUpTT05TdHJpbmdpZnkoYXJnc1trZXldKSA6IGFyZ3Nba2V5XSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYXJhbXM7XG59O1xuXG4vKipcbiAqIENvbXB1dGUgdGhlIGhlYWRlcnMgZm9yIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSBbc3RyaW5nXSBvcHRpb25zLmFkZGl0aW9uYWxVQSBzZW1pLWNvbG9uIHNlcGFyYXRlZCBzdHJpbmcgd2l0aCBvdGhlciB1c2VyIGFnZW50cyB0byBhZGRcbiAqIEBwYXJhbSBbYm9vbGVhbj10cnVlXSBvcHRpb25zLndpdGhBcGlLZXkgU2VuZCB0aGUgYXBpIGtleSBhcyBhIGhlYWRlclxuICogQHBhcmFtIFtPYmplY3RdIG9wdGlvbnMuaGVhZGVycyBFeHRyYSBoZWFkZXJzIHRvIHNlbmRcbiAqL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9jb21wdXRlUmVxdWVzdEhlYWRlcnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yZWFjaCcpO1xuXG4gIHZhciB1YSA9IG9wdGlvbnMuYWRkaXRpb25hbFVBID9cbiAgICB0aGlzLl91YSArICc7ICcgKyBvcHRpb25zLmFkZGl0aW9uYWxVQSA6XG4gICAgdGhpcy5fdWE7XG5cbiAgdmFyIHJlcXVlc3RIZWFkZXJzID0ge1xuICAgICd4LWFsZ29saWEtYWdlbnQnOiB1YSxcbiAgICAneC1hbGdvbGlhLWFwcGxpY2F0aW9uLWlkJzogdGhpcy5hcHBsaWNhdGlvbklEXG4gIH07XG5cbiAgLy8gYnJvd3NlciB3aWxsIGlubGluZSBoZWFkZXJzIGluIHRoZSB1cmwsIG5vZGUuanMgd2lsbCB1c2UgaHR0cCBoZWFkZXJzXG4gIC8vIGJ1dCBpbiBzb21lIHNpdHVhdGlvbnMsIHRoZSBBUEkgS0VZIHdpbGwgYmUgdG9vIGxvbmcgKGJpZyBzZWN1cmVkIEFQSSBrZXlzKVxuICAvLyBzbyBpZiB0aGUgcmVxdWVzdCBpcyBhIFBPU1QgYW5kIHRoZSBLRVkgaXMgdmVyeSBsb25nLCB3ZSB3aWxsIGJlIGFza2VkIHRvIG5vdCBwdXRcbiAgLy8gaXQgaW50byBoZWFkZXJzIGJ1dCBpbiB0aGUgSlNPTiBib2R5XG4gIGlmIChvcHRpb25zLndpdGhBcGlLZXkgIT09IGZhbHNlKSB7XG4gICAgcmVxdWVzdEhlYWRlcnNbJ3gtYWxnb2xpYS1hcGkta2V5J10gPSB0aGlzLmFwaUtleTtcbiAgfVxuXG4gIGlmICh0aGlzLnVzZXJUb2tlbikge1xuICAgIHJlcXVlc3RIZWFkZXJzWyd4LWFsZ29saWEtdXNlcnRva2VuJ10gPSB0aGlzLnVzZXJUb2tlbjtcbiAgfVxuXG4gIGlmICh0aGlzLnNlY3VyaXR5VGFncykge1xuICAgIHJlcXVlc3RIZWFkZXJzWyd4LWFsZ29saWEtdGFnZmlsdGVycyddID0gdGhpcy5zZWN1cml0eVRhZ3M7XG4gIH1cblxuICBmb3JFYWNoKHRoaXMuZXh0cmFIZWFkZXJzLCBmdW5jdGlvbiBhZGRUb1JlcXVlc3RIZWFkZXJzKHZhbHVlLCBrZXkpIHtcbiAgICByZXF1ZXN0SGVhZGVyc1trZXldID0gdmFsdWU7XG4gIH0pO1xuXG4gIGlmIChvcHRpb25zLmhlYWRlcnMpIHtcbiAgICBmb3JFYWNoKG9wdGlvbnMuaGVhZGVycywgZnVuY3Rpb24gYWRkVG9SZXF1ZXN0SGVhZGVycyh2YWx1ZSwga2V5KSB7XG4gICAgICByZXF1ZXN0SGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcmVxdWVzdEhlYWRlcnM7XG59O1xuXG4vKipcbiAqIFNlYXJjaCB0aHJvdWdoIG11bHRpcGxlIGluZGljZXMgYXQgdGhlIHNhbWUgdGltZVxuICogQHBhcmFtICB7T2JqZWN0W119ICAgcXVlcmllcyAgQW4gYXJyYXkgb2YgcXVlcmllcyB5b3Ugd2FudCB0byBydW4uXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcmllc1tdLmluZGV4TmFtZSBUaGUgaW5kZXggbmFtZSB5b3Ugd2FudCB0byB0YXJnZXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcXVlcmllc1tdLnF1ZXJ5XSBUaGUgcXVlcnkgdG8gaXNzdWUgb24gdGhpcyBpbmRleC4gQ2FuIGFsc28gYmUgcGFzc2VkIGludG8gYHBhcmFtc2BcbiAqIEBwYXJhbSB7T2JqZWN0fSBxdWVyaWVzW10ucGFyYW1zIEFueSBzZWFyY2ggcGFyYW0gbGlrZSBoaXRzUGVyUGFnZSwgLi5cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBiZSBjYWxsZWRcbiAqIEByZXR1cm4ge1Byb21pc2V8dW5kZWZpbmVkfSBSZXR1cm5zIGEgcHJvbWlzZSBpZiBubyBjYWxsYmFjayBnaXZlblxuICovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24ocXVlcmllcywgb3B0cywgY2FsbGJhY2spIHtcbiAgdmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG4gIHZhciBtYXAgPSByZXF1aXJlKCcuL21hcC5qcycpO1xuXG4gIHZhciB1c2FnZSA9ICdVc2FnZTogY2xpZW50LnNlYXJjaChhcnJheU9mUXVlcmllc1ssIGNhbGxiYWNrXSknO1xuXG4gIGlmICghaXNBcnJheShxdWVyaWVzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcih1c2FnZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdHM7XG4gICAgb3B0cyA9IHt9O1xuICB9IGVsc2UgaWYgKG9wdHMgPT09IHVuZGVmaW5lZCkge1xuICAgIG9wdHMgPSB7fTtcbiAgfVxuXG4gIHZhciBjbGllbnQgPSB0aGlzO1xuXG4gIHZhciBwb3N0T2JqID0ge1xuICAgIHJlcXVlc3RzOiBtYXAocXVlcmllcywgZnVuY3Rpb24gcHJlcGFyZVJlcXVlc3QocXVlcnkpIHtcbiAgICAgIHZhciBwYXJhbXMgPSAnJztcblxuICAgICAgLy8gYWxsb3cgcXVlcnkucXVlcnlcbiAgICAgIC8vIHNvIHdlIGFyZSBtaW1pY2luZyB0aGUgaW5kZXguc2VhcmNoKHF1ZXJ5LCBwYXJhbXMpIG1ldGhvZFxuICAgICAgLy8ge2luZGV4TmFtZTosIHF1ZXJ5OiwgcGFyYW1zOn1cbiAgICAgIGlmIChxdWVyeS5xdWVyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBhcmFtcyArPSAncXVlcnk9JyArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeS5xdWVyeSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4TmFtZTogcXVlcnkuaW5kZXhOYW1lLFxuICAgICAgICBwYXJhbXM6IGNsaWVudC5fZ2V0U2VhcmNoUGFyYW1zKHF1ZXJ5LnBhcmFtcywgcGFyYW1zKVxuICAgICAgfTtcbiAgICB9KVxuICB9O1xuXG4gIHZhciBKU09OUFBhcmFtcyA9IG1hcChwb3N0T2JqLnJlcXVlc3RzLCBmdW5jdGlvbiBwcmVwYXJlSlNPTlBQYXJhbXMocmVxdWVzdCwgcmVxdWVzdElkKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RJZCArICc9JyArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICcvMS9pbmRleGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVxdWVzdC5pbmRleE5hbWUpICsgJz8nICtcbiAgICAgICAgcmVxdWVzdC5wYXJhbXNcbiAgICAgICk7XG4gIH0pLmpvaW4oJyYnKTtcblxuICB2YXIgdXJsID0gJy8xL2luZGV4ZXMvKi9xdWVyaWVzJztcblxuICBpZiAob3B0cy5zdHJhdGVneSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcG9zdE9iai5zdHJhdGVneSA9IG9wdHMuc3RyYXRlZ3k7XG4gIH1cblxuICByZXR1cm4gdGhpcy5fanNvblJlcXVlc3Qoe1xuICAgIGNhY2hlOiB0aGlzLmNhY2hlLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogdXJsLFxuICAgIGJvZHk6IHBvc3RPYmosXG4gICAgaG9zdFR5cGU6ICdyZWFkJyxcbiAgICBmYWxsYmFjazoge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy8xL2luZGV4ZXMvKicsXG4gICAgICBib2R5OiB7XG4gICAgICAgIHBhcmFtczogSlNPTlBQYXJhbXNcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICB9KTtcbn07XG5cbi8qKlxuKiBTZWFyY2ggZm9yIGZhY2V0IHZhbHVlc1xuKiBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kb2MvcmVzdC1hcGkvc2VhcmNoI3NlYXJjaC1mb3ItZmFjZXQtdmFsdWVzXG4qIFRoaXMgaXMgdGhlIHRvcC1sZXZlbCBBUEkgZm9yIFNGRlYuXG4qXG4qIEBwYXJhbSB7b2JqZWN0W119IHF1ZXJpZXMgQW4gYXJyYXkgb2YgcXVlcmllcyB0byBydW4uXG4qIEBwYXJhbSB7c3RyaW5nfSBxdWVyaWVzW10uaW5kZXhOYW1lIEluZGV4IG5hbWUsIG5hbWUgb2YgdGhlIGluZGV4IHRvIHNlYXJjaC5cbiogQHBhcmFtIHtvYmplY3R9IHF1ZXJpZXNbXS5wYXJhbXMgUXVlcnkgcGFyYW1ldGVycy5cbiogQHBhcmFtIHtzdHJpbmd9IHF1ZXJpZXNbXS5wYXJhbXMuZmFjZXROYW1lIEZhY2V0IG5hbWUsIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB0byBzZWFyY2ggZm9yIHZhbHVlcyBpbi5cbiogTXVzdCBiZSBkZWNsYXJlZCBhcyBhIGZhY2V0XG4qIEBwYXJhbSB7c3RyaW5nfSBxdWVyaWVzW10ucGFyYW1zLmZhY2V0UXVlcnkgUXVlcnkgZm9yIHRoZSBmYWNldCBzZWFyY2hcbiogQHBhcmFtIHtzdHJpbmd9IFtxdWVyaWVzW10ucGFyYW1zLipdIEFueSBzZWFyY2ggcGFyYW1ldGVyIG9mIEFsZ29saWEsXG4qIHNlZSBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kb2MvYXBpLWNsaWVudC9qYXZhc2NyaXB0L3NlYXJjaCNzZWFyY2gtcGFyYW1ldGVyc1xuKiBQYWdpbmF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQuIFRoZSBwYWdlIGFuZCBoaXRzUGVyUGFnZSBwYXJhbWV0ZXJzIHdpbGwgYmUgaWdub3JlZC5cbiovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuc2VhcmNoRm9yRmFjZXRWYWx1ZXMgPSBmdW5jdGlvbihxdWVyaWVzKSB7XG4gIHZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xuICB2YXIgbWFwID0gcmVxdWlyZSgnLi9tYXAuanMnKTtcblxuICB2YXIgdXNhZ2UgPSAnVXNhZ2U6IGNsaWVudC5zZWFyY2hGb3JGYWNldFZhbHVlcyhbe2luZGV4TmFtZSwgcGFyYW1zOiB7ZmFjZXROYW1lLCBmYWNldFF1ZXJ5LCAuLi5wYXJhbXN9fSwgLi4ucXVlcmllc10pJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBtYXgtbGVuXG5cbiAgaWYgKCFpc0FycmF5KHF1ZXJpZXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHVzYWdlKTtcbiAgfVxuXG4gIHZhciBjbGllbnQgPSB0aGlzO1xuXG4gIHJldHVybiBjbGllbnQuX3Byb21pc2UuYWxsKG1hcChxdWVyaWVzLCBmdW5jdGlvbiBwZXJmb3JtUXVlcnkocXVlcnkpIHtcbiAgICBpZiAoXG4gICAgICAhcXVlcnkgfHxcbiAgICAgIHF1ZXJ5LmluZGV4TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBxdWVyeS5wYXJhbXMuZmFjZXROYW1lID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHF1ZXJ5LnBhcmFtcy5mYWNldFF1ZXJ5ID09PSB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih1c2FnZSk7XG4gICAgfVxuXG4gICAgdmFyIGNsb25lID0gcmVxdWlyZSgnLi9jbG9uZS5qcycpO1xuICAgIHZhciBvbWl0ID0gcmVxdWlyZSgnLi9vbWl0LmpzJyk7XG5cbiAgICB2YXIgaW5kZXhOYW1lID0gcXVlcnkuaW5kZXhOYW1lO1xuICAgIHZhciBwYXJhbXMgPSBxdWVyeS5wYXJhbXM7XG5cbiAgICB2YXIgZmFjZXROYW1lID0gcGFyYW1zLmZhY2V0TmFtZTtcbiAgICB2YXIgZmlsdGVyZWRQYXJhbXMgPSBvbWl0KGNsb25lKHBhcmFtcyksIGZ1bmN0aW9uKGtleU5hbWUpIHtcbiAgICAgIHJldHVybiBrZXlOYW1lID09PSAnZmFjZXROYW1lJztcbiAgICB9KTtcbiAgICB2YXIgc2VhcmNoUGFyYW1ldGVycyA9IGNsaWVudC5fZ2V0U2VhcmNoUGFyYW1zKGZpbHRlcmVkUGFyYW1zLCAnJyk7XG5cbiAgICByZXR1cm4gY2xpZW50Ll9qc29uUmVxdWVzdCh7XG4gICAgICBjYWNoZTogY2xpZW50LmNhY2hlLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6XG4gICAgICAgICcvMS9pbmRleGVzLycgK1xuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoaW5kZXhOYW1lKSArXG4gICAgICAgICcvZmFjZXRzLycgK1xuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoZmFjZXROYW1lKSArXG4gICAgICAgICcvcXVlcnknLFxuICAgICAgaG9zdFR5cGU6ICdyZWFkJyxcbiAgICAgIGJvZHk6IHtwYXJhbXM6IHNlYXJjaFBhcmFtZXRlcnN9XG4gICAgfSk7XG4gIH0pKTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBleHRyYSBzZWN1cml0eSB0YWdGaWx0ZXJzIGhlYWRlclxuICogQHBhcmFtIHtzdHJpbmd8YXJyYXl9IHRhZ3MgVGhlIGxpc3Qgb2YgdGFncyBkZWZpbmluZyB0aGUgY3VycmVudCBzZWN1cml0eSBmaWx0ZXJzXG4gKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5zZXRTZWN1cml0eVRhZ3MgPSBmdW5jdGlvbih0YWdzKSB7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGFncykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICB2YXIgc3RyVGFncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0YWdzW2ldKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICB2YXIgb3JlZFRhZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0YWdzW2ldLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgb3JlZFRhZ3MucHVzaCh0YWdzW2ldW2pdKTtcbiAgICAgICAgfVxuICAgICAgICBzdHJUYWdzLnB1c2goJygnICsgb3JlZFRhZ3Muam9pbignLCcpICsgJyknKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0clRhZ3MucHVzaCh0YWdzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGFncyA9IHN0clRhZ3Muam9pbignLCcpO1xuICB9XG5cbiAgdGhpcy5zZWN1cml0eVRhZ3MgPSB0YWdzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGV4dHJhIHVzZXIgdG9rZW4gaGVhZGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gdXNlclRva2VuIFRoZSB0b2tlbiBpZGVudGlmeWluZyBhIHVuaXEgdXNlciAodXNlZCB0byBhcHBseSByYXRlIGxpbWl0cylcbiAqL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLnNldFVzZXJUb2tlbiA9IGZ1bmN0aW9uKHVzZXJUb2tlbikge1xuICB0aGlzLnVzZXJUb2tlbiA9IHVzZXJUb2tlbjtcbn07XG5cbi8qKlxuICogQ2xlYXIgYWxsIHF1ZXJpZXMgaW4gY2xpZW50J3MgY2FjaGVcbiAqIEByZXR1cm4gdW5kZWZpbmVkXG4gKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2FjaGUgPSB7fTtcbn07XG5cbi8qKlxuKiBTZXQgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgYSByZXF1ZXN0IGNhbiB0YWtlIGJlZm9yZSBhdXRvbWF0aWNhbGx5IGJlaW5nIHRlcm1pbmF0ZWQuXG4qIEBkZXByZWNhdGVkXG4qIEBwYXJhbSB7TnVtYmVyfSBtaWxsaXNlY29uZHNcbiovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuc2V0UmVxdWVzdFRpbWVvdXQgPSBmdW5jdGlvbihtaWxsaXNlY29uZHMpIHtcbiAgaWYgKG1pbGxpc2Vjb25kcykge1xuICAgIHRoaXMuX3RpbWVvdXRzLmNvbm5lY3QgPSB0aGlzLl90aW1lb3V0cy5yZWFkID0gdGhpcy5fdGltZW91dHMud3JpdGUgPSBtaWxsaXNlY29uZHM7XG4gIH1cbn07XG5cbi8qKlxuKiBTZXQgdGhlIHRocmVlIGRpZmZlcmVudCAoY29ubmVjdCwgcmVhZCwgd3JpdGUpIHRpbWVvdXRzIHRvIGJlIHVzZWQgd2hlbiByZXF1ZXN0aW5nXG4qIEBwYXJhbSB7T2JqZWN0fSB0aW1lb3V0c1xuKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5zZXRUaW1lb3V0cyA9IGZ1bmN0aW9uKHRpbWVvdXRzKSB7XG4gIHRoaXMuX3RpbWVvdXRzID0gdGltZW91dHM7XG59O1xuXG4vKipcbiogR2V0IHRoZSB0aHJlZSBkaWZmZXJlbnQgKGNvbm5lY3QsIHJlYWQsIHdyaXRlKSB0aW1lb3V0cyB0byBiZSB1c2VkIHdoZW4gcmVxdWVzdGluZ1xuKiBAcGFyYW0ge09iamVjdH0gdGltZW91dHNcbiovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuZ2V0VGltZW91dHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX3RpbWVvdXRzO1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9nZXRBcHBJZERhdGEgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRhdGEgPSBzdG9yZS5nZXQodGhpcy5hcHBsaWNhdGlvbklEKTtcbiAgaWYgKGRhdGEgIT09IG51bGwpIHRoaXMuX2NhY2hlQXBwSWREYXRhKGRhdGEpO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fc2V0QXBwSWREYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICBkYXRhLmxhc3RDaGFuZ2UgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICB0aGlzLl9jYWNoZUFwcElkRGF0YShkYXRhKTtcbiAgcmV0dXJuIHN0b3JlLnNldCh0aGlzLmFwcGxpY2F0aW9uSUQsIGRhdGEpO1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9jaGVja0FwcElkRGF0YSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZGF0YSA9IHRoaXMuX2dldEFwcElkRGF0YSgpO1xuICB2YXIgbm93ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgaWYgKGRhdGEgPT09IG51bGwgfHwgbm93IC0gZGF0YS5sYXN0Q2hhbmdlID4gUkVTRVRfQVBQX0RBVEFfVElNRVIpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzZXRJbml0aWFsQXBwSWREYXRhKGRhdGEpO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX3Jlc2V0SW5pdGlhbEFwcElkRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdmFyIG5ld0RhdGEgPSBkYXRhIHx8IHt9O1xuICBuZXdEYXRhLmhvc3RJbmRleGVzID0ge3JlYWQ6IDAsIHdyaXRlOiAwfTtcbiAgbmV3RGF0YS50aW1lb3V0TXVsdGlwbGllciA9IDE7XG4gIG5ld0RhdGEuc2h1ZmZsZVJlc3VsdCA9IG5ld0RhdGEuc2h1ZmZsZVJlc3VsdCB8fCBzaHVmZmxlKFsxLCAyLCAzXSk7XG4gIHJldHVybiB0aGlzLl9zZXRBcHBJZERhdGEobmV3RGF0YSk7XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2NhY2hlQXBwSWREYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLl9ob3N0SW5kZXhlcyA9IGRhdGEuaG9zdEluZGV4ZXM7XG4gIHRoaXMuX3RpbWVvdXRNdWx0aXBsaWVyID0gZGF0YS50aW1lb3V0TXVsdGlwbGllcjtcbiAgdGhpcy5fc2h1ZmZsZVJlc3VsdCA9IGRhdGEuc2h1ZmZsZVJlc3VsdDtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fcGFydGlhbEFwcElkRGF0YVVwZGF0ZSA9IGZ1bmN0aW9uKG5ld0RhdGEpIHtcbiAgdmFyIGZvcmVhY2ggPSByZXF1aXJlKCdmb3JlYWNoJyk7XG4gIHZhciBjdXJyZW50RGF0YSA9IHRoaXMuX2dldEFwcElkRGF0YSgpO1xuICBmb3JlYWNoKG5ld0RhdGEsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICBjdXJyZW50RGF0YVtrZXldID0gdmFsdWU7XG4gIH0pO1xuXG4gIHJldHVybiB0aGlzLl9zZXRBcHBJZERhdGEoY3VycmVudERhdGEpO1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9nZXRIb3N0QnlUeXBlID0gZnVuY3Rpb24oaG9zdFR5cGUpIHtcbiAgcmV0dXJuIHRoaXMuaG9zdHNbaG9zdFR5cGVdW3RoaXMuX2dldEhvc3RJbmRleEJ5VHlwZShob3N0VHlwZSldO1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9nZXRUaW1lb3V0TXVsdGlwbGllciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fdGltZW91dE11bHRpcGxpZXI7XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2dldEhvc3RJbmRleEJ5VHlwZSA9IGZ1bmN0aW9uKGhvc3RUeXBlKSB7XG4gIHJldHVybiB0aGlzLl9ob3N0SW5kZXhlc1tob3N0VHlwZV07XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX3NldEhvc3RJbmRleEJ5VHlwZSA9IGZ1bmN0aW9uKGhvc3RJbmRleCwgaG9zdFR5cGUpIHtcbiAgdmFyIGNsb25lID0gcmVxdWlyZSgnLi9jbG9uZScpO1xuICB2YXIgbmV3SG9zdEluZGV4ZXMgPSBjbG9uZSh0aGlzLl9ob3N0SW5kZXhlcyk7XG4gIG5ld0hvc3RJbmRleGVzW2hvc3RUeXBlXSA9IGhvc3RJbmRleDtcbiAgdGhpcy5fcGFydGlhbEFwcElkRGF0YVVwZGF0ZSh7aG9zdEluZGV4ZXM6IG5ld0hvc3RJbmRleGVzfSk7XG4gIHJldHVybiBob3N0SW5kZXg7XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2luY3JlbWVudEhvc3RJbmRleCA9IGZ1bmN0aW9uKGhvc3RUeXBlKSB7XG4gIHJldHVybiB0aGlzLl9zZXRIb3N0SW5kZXhCeVR5cGUoXG4gICAgKHRoaXMuX2dldEhvc3RJbmRleEJ5VHlwZShob3N0VHlwZSkgKyAxKSAlIHRoaXMuaG9zdHNbaG9zdFR5cGVdLmxlbmd0aCwgaG9zdFR5cGVcbiAgKTtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5faW5jcmVtZW50VGltZW91dE11bHRpcGxlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGltZW91dE11bHRpcGxpZXIgPSBNYXRoLm1heCh0aGlzLl90aW1lb3V0TXVsdGlwbGllciArIDEsIDQpO1xuICByZXR1cm4gdGhpcy5fcGFydGlhbEFwcElkRGF0YVVwZGF0ZSh7dGltZW91dE11bHRpcGxpZXI6IHRpbWVvdXRNdWx0aXBsaWVyfSk7XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2dldFRpbWVvdXRzRm9yUmVxdWVzdCA9IGZ1bmN0aW9uKGhvc3RUeXBlKSB7XG4gIHJldHVybiB7XG4gICAgY29ubmVjdDogdGhpcy5fdGltZW91dHMuY29ubmVjdCAqIHRoaXMuX3RpbWVvdXRNdWx0aXBsaWVyLFxuICAgIGNvbXBsZXRlOiB0aGlzLl90aW1lb3V0c1tob3N0VHlwZV0gKiB0aGlzLl90aW1lb3V0TXVsdGlwbGllclxuICB9O1xufTtcblxuZnVuY3Rpb24gcHJlcGFyZUhvc3QocHJvdG9jb2wpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHByZXBhcmUoaG9zdCkge1xuICAgIHJldHVybiBwcm90b2NvbCArICcvLycgKyBob3N0LnRvTG93ZXJDYXNlKCk7XG4gIH07XG59XG5cbi8vIFByb3RvdHlwZS5qcyA8IDEuNywgYSB3aWRlbHkgdXNlZCBsaWJyYXJ5LCBkZWZpbmVzIGEgd2VpcmRcbi8vIEFycmF5LnByb3RvdHlwZS50b0pTT04gZnVuY3Rpb24gdGhhdCB3aWxsIGZhaWwgdG8gc3RyaW5naWZ5IG91ciBjb250ZW50XG4vLyBhcHByb3ByaWF0ZWx5XG4vLyByZWZzOlxuLy8gICAtIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vZm9ydW0vIyF0b3BpYy9wcm90b3R5cGUtY29yZS9FLVNBVnZWX1Y5UVxuLy8gICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9zc3RlcGhlbnNvbi9wcm90b3R5cGUvY29tbWl0LzAzOGEyOTg1YTcwNTkzYzFhODZjMjMwZmFkYmRmZTJlNDg5OGE0OGNcbi8vICAgLSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zMTQ4NDQxLzE0NzA3OVxuZnVuY3Rpb24gc2FmZUpTT05TdHJpbmdpZnkob2JqKSB7XG4gIC8qIGVzbGludCBuby1leHRlbmQtbmF0aXZlOjAgKi9cblxuICBpZiAoQXJyYXkucHJvdG90eXBlLnRvSlNPTiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIH1cblxuICB2YXIgdG9KU09OID0gQXJyYXkucHJvdG90eXBlLnRvSlNPTjtcbiAgZGVsZXRlIEFycmF5LnByb3RvdHlwZS50b0pTT047XG4gIHZhciBvdXQgPSBKU09OLnN0cmluZ2lmeShvYmopO1xuICBBcnJheS5wcm90b3R5cGUudG9KU09OID0gdG9KU09OO1xuXG4gIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcbiAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aDtcbiAgdmFyIHRlbXBvcmFyeVZhbHVlO1xuICB2YXIgcmFuZG9tSW5kZXg7XG5cbiAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgd2hpbGUgKGN1cnJlbnRJbmRleCAhPT0gMCkge1xuICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICBjdXJyZW50SW5kZXggLT0gMTtcblxuICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcbiAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgfVxuXG4gIHJldHVybiBhcnJheTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ3JlZGVudGlhbHMoaGVhZGVycykge1xuICB2YXIgbmV3SGVhZGVycyA9IHt9O1xuXG4gIGZvciAodmFyIGhlYWRlck5hbWUgaW4gaGVhZGVycykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaGVhZGVycywgaGVhZGVyTmFtZSkpIHtcbiAgICAgIHZhciB2YWx1ZTtcblxuICAgICAgaWYgKGhlYWRlck5hbWUgPT09ICd4LWFsZ29saWEtYXBpLWtleScgfHwgaGVhZGVyTmFtZSA9PT0gJ3gtYWxnb2xpYS1hcHBsaWNhdGlvbi1pZCcpIHtcbiAgICAgICAgdmFsdWUgPSAnKipoaWRkZW4gZm9yIHNlY3VyaXR5IHB1cnBvc2VzKionO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBoZWFkZXJzW2hlYWRlck5hbWVdO1xuICAgICAgfVxuXG4gICAgICBuZXdIZWFkZXJzW2hlYWRlck5hbWVdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0hlYWRlcnM7XG59XG4iLCJ2YXIgYnVpbGRTZWFyY2hNZXRob2QgPSByZXF1aXJlKCcuL2J1aWxkU2VhcmNoTWV0aG9kLmpzJyk7XG52YXIgZGVwcmVjYXRlID0gcmVxdWlyZSgnLi9kZXByZWNhdGUuanMnKTtcbnZhciBkZXByZWNhdGVkTWVzc2FnZSA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlZE1lc3NhZ2UuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbmRleENvcmU7XG5cbi8qXG4qIEluZGV4IGNsYXNzIGNvbnN0cnVjdG9yLlxuKiBZb3Ugc2hvdWxkIG5vdCB1c2UgdGhpcyBtZXRob2QgZGlyZWN0bHkgYnV0IHVzZSBpbml0SW5kZXgoKSBmdW5jdGlvblxuKi9cbmZ1bmN0aW9uIEluZGV4Q29yZShhbGdvbGlhc2VhcmNoLCBpbmRleE5hbWUpIHtcbiAgdGhpcy5pbmRleE5hbWUgPSBpbmRleE5hbWU7XG4gIHRoaXMuYXMgPSBhbGdvbGlhc2VhcmNoO1xuICB0aGlzLnR5cGVBaGVhZEFyZ3MgPSBudWxsO1xuICB0aGlzLnR5cGVBaGVhZFZhbHVlT3B0aW9uID0gbnVsbDtcblxuICAvLyBtYWtlIHN1cmUgZXZlcnkgaW5kZXggaW5zdGFuY2UgaGFzIGl0J3Mgb3duIGNhY2hlXG4gIHRoaXMuY2FjaGUgPSB7fTtcbn1cblxuLypcbiogQ2xlYXIgYWxsIHF1ZXJpZXMgaW4gY2FjaGVcbiovXG5JbmRleENvcmUucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jYWNoZSA9IHt9O1xufTtcblxuLypcbiogU2VhcmNoIGluc2lkZSB0aGUgaW5kZXggdXNpbmcgWE1MSHR0cFJlcXVlc3QgcmVxdWVzdCAoVXNpbmcgYSBQT1NUIHF1ZXJ5IHRvXG4qIG1pbmltaXplIG51bWJlciBvZiBPUFRJT05TIHF1ZXJpZXM6IENyb3NzLU9yaWdpbiBSZXNvdXJjZSBTaGFyaW5nKS5cbipcbiogQHBhcmFtIHtzdHJpbmd9IFtxdWVyeV0gdGhlIGZ1bGwgdGV4dCBxdWVyeVxuKiBAcGFyYW0ge29iamVjdH0gW2FyZ3NdIChvcHRpb25hbCkgaWYgc2V0LCBjb250YWlucyBhbiBvYmplY3Qgd2l0aCBxdWVyeSBwYXJhbWV0ZXJzOlxuKiAtIHBhZ2U6IChpbnRlZ2VyKSBQYWdpbmF0aW9uIHBhcmFtZXRlciB1c2VkIHRvIHNlbGVjdCB0aGUgcGFnZSB0byByZXRyaWV2ZS5cbiogICAgICAgICAgICAgICAgICAgUGFnZSBpcyB6ZXJvLWJhc2VkIGFuZCBkZWZhdWx0cyB0byAwLiBUaHVzLFxuKiAgICAgICAgICAgICAgICAgICB0byByZXRyaWV2ZSB0aGUgMTB0aCBwYWdlIHlvdSBuZWVkIHRvIHNldCBwYWdlPTlcbiogLSBoaXRzUGVyUGFnZTogKGludGVnZXIpIFBhZ2luYXRpb24gcGFyYW1ldGVyIHVzZWQgdG8gc2VsZWN0IHRoZSBudW1iZXIgb2YgaGl0cyBwZXIgcGFnZS4gRGVmYXVsdHMgdG8gMjAuXG4qIC0gYXR0cmlidXRlc1RvUmV0cmlldmU6IGEgc3RyaW5nIHRoYXQgY29udGFpbnMgdGhlIGxpc3Qgb2Ygb2JqZWN0IGF0dHJpYnV0ZXNcbiogeW91IHdhbnQgdG8gcmV0cmlldmUgKGxldCB5b3UgbWluaW1pemUgdGhlIGFuc3dlciBzaXplKS5cbiogICBBdHRyaWJ1dGVzIGFyZSBzZXBhcmF0ZWQgd2l0aCBhIGNvbW1hIChmb3IgZXhhbXBsZSBcIm5hbWUsYWRkcmVzc1wiKS5cbiogICBZb3UgY2FuIGFsc28gdXNlIGFuIGFycmF5IChmb3IgZXhhbXBsZSBbXCJuYW1lXCIsXCJhZGRyZXNzXCJdKS5cbiogICBCeSBkZWZhdWx0LCBhbGwgYXR0cmlidXRlcyBhcmUgcmV0cmlldmVkLiBZb3UgY2FuIGFsc28gdXNlICcqJyB0byByZXRyaWV2ZSBhbGxcbiogICB2YWx1ZXMgd2hlbiBhbiBhdHRyaWJ1dGVzVG9SZXRyaWV2ZSBzZXR0aW5nIGlzIHNwZWNpZmllZCBmb3IgeW91ciBpbmRleC5cbiogLSBhdHRyaWJ1dGVzVG9IaWdobGlnaHQ6IGEgc3RyaW5nIHRoYXQgY29udGFpbnMgdGhlIGxpc3Qgb2YgYXR0cmlidXRlcyB5b3VcbiogICB3YW50IHRvIGhpZ2hsaWdodCBhY2NvcmRpbmcgdG8gdGhlIHF1ZXJ5LlxuKiAgIEF0dHJpYnV0ZXMgYXJlIHNlcGFyYXRlZCBieSBhIGNvbW1hLiBZb3UgY2FuIGFsc28gdXNlIGFuIGFycmF5IChmb3IgZXhhbXBsZSBbXCJuYW1lXCIsXCJhZGRyZXNzXCJdKS5cbiogICBJZiBhbiBhdHRyaWJ1dGUgaGFzIG5vIG1hdGNoIGZvciB0aGUgcXVlcnksIHRoZSByYXcgdmFsdWUgaXMgcmV0dXJuZWQuXG4qICAgQnkgZGVmYXVsdCBhbGwgaW5kZXhlZCB0ZXh0IGF0dHJpYnV0ZXMgYXJlIGhpZ2hsaWdodGVkLlxuKiAgIFlvdSBjYW4gdXNlIGAqYCBpZiB5b3Ugd2FudCB0byBoaWdobGlnaHQgYWxsIHRleHR1YWwgYXR0cmlidXRlcy5cbiogICBOdW1lcmljYWwgYXR0cmlidXRlcyBhcmUgbm90IGhpZ2hsaWdodGVkLlxuKiAgIEEgbWF0Y2hMZXZlbCBpcyByZXR1cm5lZCBmb3IgZWFjaCBoaWdobGlnaHRlZCBhdHRyaWJ1dGUgYW5kIGNhbiBjb250YWluOlxuKiAgICAgIC0gZnVsbDogaWYgYWxsIHRoZSBxdWVyeSB0ZXJtcyB3ZXJlIGZvdW5kIGluIHRoZSBhdHRyaWJ1dGUsXG4qICAgICAgLSBwYXJ0aWFsOiBpZiBvbmx5IHNvbWUgb2YgdGhlIHF1ZXJ5IHRlcm1zIHdlcmUgZm91bmQsXG4qICAgICAgLSBub25lOiBpZiBub25lIG9mIHRoZSBxdWVyeSB0ZXJtcyB3ZXJlIGZvdW5kLlxuKiAtIGF0dHJpYnV0ZXNUb1NuaXBwZXQ6IGEgc3RyaW5nIHRoYXQgY29udGFpbnMgdGhlIGxpc3Qgb2YgYXR0cmlidXRlcyB0byBzbmlwcGV0IGFsb25nc2lkZVxuKiB0aGUgbnVtYmVyIG9mIHdvcmRzIHRvIHJldHVybiAoc3ludGF4IGlzIGBhdHRyaWJ1dGVOYW1lOm5iV29yZHNgKS5cbiogICAgQXR0cmlidXRlcyBhcmUgc2VwYXJhdGVkIGJ5IGEgY29tbWEgKEV4YW1wbGU6IGF0dHJpYnV0ZXNUb1NuaXBwZXQ9bmFtZToxMCxjb250ZW50OjEwKS5cbiogICAgWW91IGNhbiBhbHNvIHVzZSBhbiBhcnJheSAoRXhhbXBsZTogYXR0cmlidXRlc1RvU25pcHBldDogWyduYW1lOjEwJywnY29udGVudDoxMCddKS5cbiogICAgQnkgZGVmYXVsdCBubyBzbmlwcGV0IGlzIGNvbXB1dGVkLlxuKiAtIG1pbldvcmRTaXplZm9yMVR5cG86IHRoZSBtaW5pbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIGluIGEgcXVlcnkgd29yZCB0byBhY2NlcHQgb25lIHR5cG8gaW4gdGhpcyB3b3JkLlxuKiBEZWZhdWx0cyB0byAzLlxuKiAtIG1pbldvcmRTaXplZm9yMlR5cG9zOiB0aGUgbWluaW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyBpbiBhIHF1ZXJ5IHdvcmRcbiogdG8gYWNjZXB0IHR3byB0eXBvcyBpbiB0aGlzIHdvcmQuIERlZmF1bHRzIHRvIDcuXG4qIC0gZ2V0UmFua2luZ0luZm86IGlmIHNldCB0byAxLCB0aGUgcmVzdWx0IGhpdHMgd2lsbCBjb250YWluIHJhbmtpbmdcbiogaW5mb3JtYXRpb24gaW4gX3JhbmtpbmdJbmZvIGF0dHJpYnV0ZS5cbiogLSBhcm91bmRMYXRMbmc6IHNlYXJjaCBmb3IgZW50cmllcyBhcm91bmQgYSBnaXZlblxuKiBsYXRpdHVkZS9sb25naXR1ZGUgKHNwZWNpZmllZCBhcyB0d28gZmxvYXRzIHNlcGFyYXRlZCBieSBhIGNvbW1hKS5cbiogICBGb3IgZXhhbXBsZSBhcm91bmRMYXRMbmc9NDcuMzE2NjY5LDUuMDE2NjcwKS5cbiogICBZb3UgY2FuIHNwZWNpZnkgdGhlIG1heGltdW0gZGlzdGFuY2UgaW4gbWV0ZXJzIHdpdGggdGhlIGFyb3VuZFJhZGl1cyBwYXJhbWV0ZXIgKGluIG1ldGVycylcbiogICBhbmQgdGhlIHByZWNpc2lvbiBmb3IgcmFua2luZyB3aXRoIGFyb3VuZFByZWNpc2lvblxuKiAgIChmb3IgZXhhbXBsZSBpZiB5b3Ugc2V0IGFyb3VuZFByZWNpc2lvbj0xMDAsIHR3byBvYmplY3RzIHRoYXQgYXJlIGRpc3RhbnQgb2ZcbiogICBsZXNzIHRoYW4gMTAwbSB3aWxsIGJlIGNvbnNpZGVyZWQgYXMgaWRlbnRpY2FsIGZvciBcImdlb1wiIHJhbmtpbmcgcGFyYW1ldGVyKS5cbiogICBBdCBpbmRleGluZywgeW91IHNob3VsZCBzcGVjaWZ5IGdlb2xvYyBvZiBhbiBvYmplY3Qgd2l0aCB0aGUgX2dlb2xvYyBhdHRyaWJ1dGVcbiogICAoaW4gdGhlIGZvcm0ge1wiX2dlb2xvY1wiOntcImxhdFwiOjQ4Ljg1MzQwOSwgXCJsbmdcIjoyLjM0ODgwMH19KVxuKiAtIGluc2lkZUJvdW5kaW5nQm94OiBzZWFyY2ggZW50cmllcyBpbnNpZGUgYSBnaXZlbiBhcmVhIGRlZmluZWQgYnkgdGhlIHR3byBleHRyZW1lIHBvaW50c1xuKiBvZiBhIHJlY3RhbmdsZSAoZGVmaW5lZCBieSA0IGZsb2F0czogcDFMYXQscDFMbmcscDJMYXQscDJMbmcpLlxuKiAgIEZvciBleGFtcGxlIGluc2lkZUJvdW5kaW5nQm94PTQ3LjMxNjUsNC45NjY1LDQ3LjM0MjQsNS4wMjAxKS5cbiogICBBdCBpbmRleGluZywgeW91IHNob3VsZCBzcGVjaWZ5IGdlb2xvYyBvZiBhbiBvYmplY3Qgd2l0aCB0aGUgX2dlb2xvYyBhdHRyaWJ1dGVcbiogICAoaW4gdGhlIGZvcm0ge1wiX2dlb2xvY1wiOntcImxhdFwiOjQ4Ljg1MzQwOSwgXCJsbmdcIjoyLjM0ODgwMH19KVxuKiAtIG51bWVyaWNGaWx0ZXJzOiBhIHN0cmluZyB0aGF0IGNvbnRhaW5zIHRoZSBsaXN0IG9mIG51bWVyaWMgZmlsdGVycyB5b3Ugd2FudCB0b1xuKiBhcHBseSBzZXBhcmF0ZWQgYnkgYSBjb21tYS5cbiogICBUaGUgc3ludGF4IG9mIG9uZSBmaWx0ZXIgaXMgYGF0dHJpYnV0ZU5hbWVgIGZvbGxvd2VkIGJ5IGBvcGVyYW5kYCBmb2xsb3dlZCBieSBgdmFsdWVgLlxuKiAgIFN1cHBvcnRlZCBvcGVyYW5kcyBhcmUgYDxgLCBgPD1gLCBgPWAsIGA+YCBhbmQgYD49YC5cbiogICBZb3UgY2FuIGhhdmUgbXVsdGlwbGUgY29uZGl0aW9ucyBvbiBvbmUgYXR0cmlidXRlIGxpa2UgZm9yIGV4YW1wbGUgbnVtZXJpY0ZpbHRlcnM9cHJpY2U+MTAwLHByaWNlPDEwMDAuXG4qICAgWW91IGNhbiBhbHNvIHVzZSBhbiBhcnJheSAoZm9yIGV4YW1wbGUgbnVtZXJpY0ZpbHRlcnM6IFtcInByaWNlPjEwMFwiLFwicHJpY2U8MTAwMFwiXSkuXG4qIC0gdGFnRmlsdGVyczogZmlsdGVyIHRoZSBxdWVyeSBieSBhIHNldCBvZiB0YWdzLiBZb3UgY2FuIEFORCB0YWdzIGJ5IHNlcGFyYXRpbmcgdGhlbSBieSBjb21tYXMuXG4qICAgVG8gT1IgdGFncywgeW91IG11c3QgYWRkIHBhcmVudGhlc2VzLiBGb3IgZXhhbXBsZSwgdGFncz10YWcxLCh0YWcyLHRhZzMpIG1lYW5zIHRhZzEgQU5EICh0YWcyIE9SIHRhZzMpLlxuKiAgIFlvdSBjYW4gYWxzbyB1c2UgYW4gYXJyYXksIGZvciBleGFtcGxlIHRhZ0ZpbHRlcnM6IFtcInRhZzFcIixbXCJ0YWcyXCIsXCJ0YWczXCJdXVxuKiAgIG1lYW5zIHRhZzEgQU5EICh0YWcyIE9SIHRhZzMpLlxuKiAgIEF0IGluZGV4aW5nLCB0YWdzIHNob3VsZCBiZSBhZGRlZCBpbiB0aGUgX3RhZ3MqKiBhdHRyaWJ1dGVcbiogICBvZiBvYmplY3RzIChmb3IgZXhhbXBsZSB7XCJfdGFnc1wiOltcInRhZzFcIixcInRhZzJcIl19KS5cbiogLSBmYWNldEZpbHRlcnM6IGZpbHRlciB0aGUgcXVlcnkgYnkgYSBsaXN0IG9mIGZhY2V0cy5cbiogICBGYWNldHMgYXJlIHNlcGFyYXRlZCBieSBjb21tYXMgYW5kIGVhY2ggZmFjZXQgaXMgZW5jb2RlZCBhcyBgYXR0cmlidXRlTmFtZTp2YWx1ZWAuXG4qICAgRm9yIGV4YW1wbGU6IGBmYWNldEZpbHRlcnM9Y2F0ZWdvcnk6Qm9vayxhdXRob3I6Sm9obiUyMERvZWAuXG4qICAgWW91IGNhbiBhbHNvIHVzZSBhbiBhcnJheSAoZm9yIGV4YW1wbGUgYFtcImNhdGVnb3J5OkJvb2tcIixcImF1dGhvcjpKb2huJTIwRG9lXCJdYCkuXG4qIC0gZmFjZXRzOiBMaXN0IG9mIG9iamVjdCBhdHRyaWJ1dGVzIHRoYXQgeW91IHdhbnQgdG8gdXNlIGZvciBmYWNldGluZy5cbiogICBDb21tYSBzZXBhcmF0ZWQgbGlzdDogYFwiY2F0ZWdvcnksYXV0aG9yXCJgIG9yIGFycmF5IGBbJ2NhdGVnb3J5JywnYXV0aG9yJ11gXG4qICAgT25seSBhdHRyaWJ1dGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIGluICoqYXR0cmlidXRlc0ZvckZhY2V0aW5nKiogaW5kZXggc2V0dGluZ1xuKiAgIGNhbiBiZSB1c2VkIGluIHRoaXMgcGFyYW1ldGVyLlxuKiAgIFlvdSBjYW4gYWxzbyB1c2UgYCpgIHRvIHBlcmZvcm0gZmFjZXRpbmcgb24gYWxsIGF0dHJpYnV0ZXMgc3BlY2lmaWVkIGluICoqYXR0cmlidXRlc0ZvckZhY2V0aW5nKiouXG4qIC0gcXVlcnlUeXBlOiBzZWxlY3QgaG93IHRoZSBxdWVyeSB3b3JkcyBhcmUgaW50ZXJwcmV0ZWQsIGl0IGNhbiBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZyB2YWx1ZTpcbiogICAgLSBwcmVmaXhBbGw6IGFsbCBxdWVyeSB3b3JkcyBhcmUgaW50ZXJwcmV0ZWQgYXMgcHJlZml4ZXMsXG4qICAgIC0gcHJlZml4TGFzdDogb25seSB0aGUgbGFzdCB3b3JkIGlzIGludGVycHJldGVkIGFzIGEgcHJlZml4IChkZWZhdWx0IGJlaGF2aW9yKSxcbiogICAgLSBwcmVmaXhOb25lOiBubyBxdWVyeSB3b3JkIGlzIGludGVycHJldGVkIGFzIGEgcHJlZml4LiBUaGlzIG9wdGlvbiBpcyBub3QgcmVjb21tZW5kZWQuXG4qIC0gb3B0aW9uYWxXb3JkczogYSBzdHJpbmcgdGhhdCBjb250YWlucyB0aGUgbGlzdCBvZiB3b3JkcyB0aGF0IHNob3VsZFxuKiBiZSBjb25zaWRlcmVkIGFzIG9wdGlvbmFsIHdoZW4gZm91bmQgaW4gdGhlIHF1ZXJ5LlxuKiAgIENvbW1hIHNlcGFyYXRlZCBhbmQgYXJyYXkgYXJlIGFjY2VwdGVkLlxuKiAtIGRpc3RpbmN0OiBJZiBzZXQgdG8gMSwgZW5hYmxlIHRoZSBkaXN0aW5jdCBmZWF0dXJlIChkaXNhYmxlZCBieSBkZWZhdWx0KVxuKiBpZiB0aGUgYXR0cmlidXRlRm9yRGlzdGluY3QgaW5kZXggc2V0dGluZyBpcyBzZXQuXG4qICAgVGhpcyBmZWF0dXJlIGlzIHNpbWlsYXIgdG8gdGhlIFNRTCBcImRpc3RpbmN0XCIga2V5d29yZDogd2hlbiBlbmFibGVkXG4qICAgaW4gYSBxdWVyeSB3aXRoIHRoZSBkaXN0aW5jdD0xIHBhcmFtZXRlcixcbiogICBhbGwgaGl0cyBjb250YWluaW5nIGEgZHVwbGljYXRlIHZhbHVlIGZvciB0aGUgYXR0cmlidXRlRm9yRGlzdGluY3QgYXR0cmlidXRlIGFyZSByZW1vdmVkIGZyb20gcmVzdWx0cy5cbiogICBGb3IgZXhhbXBsZSwgaWYgdGhlIGNob3NlbiBhdHRyaWJ1dGUgaXMgc2hvd19uYW1lIGFuZCBzZXZlcmFsIGhpdHMgaGF2ZVxuKiAgIHRoZSBzYW1lIHZhbHVlIGZvciBzaG93X25hbWUsIHRoZW4gb25seSB0aGUgYmVzdFxuKiAgIG9uZSBpcyBrZXB0IGFuZCBvdGhlcnMgYXJlIHJlbW92ZWQuXG4qIC0gcmVzdHJpY3RTZWFyY2hhYmxlQXR0cmlidXRlczogTGlzdCBvZiBhdHRyaWJ1dGVzIHlvdSB3YW50IHRvIHVzZSBmb3JcbiogdGV4dHVhbCBzZWFyY2ggKG11c3QgYmUgYSBzdWJzZXQgb2YgdGhlIGF0dHJpYnV0ZXNUb0luZGV4IGluZGV4IHNldHRpbmcpXG4qIGVpdGhlciBjb21tYSBzZXBhcmF0ZWQgb3IgYXMgYW4gYXJyYXlcbiogQHBhcmFtIHtmdW5jdGlvbn0gW2NhbGxiYWNrXSB0aGUgcmVzdWx0IGNhbGxiYWNrIGNhbGxlZCB3aXRoIHR3byBhcmd1bWVudHM6XG4qICBlcnJvcjogbnVsbCBvciBFcnJvcignbWVzc2FnZScpLiBJZiBmYWxzZSwgdGhlIGNvbnRlbnQgY29udGFpbnMgdGhlIGVycm9yLlxuKiAgY29udGVudDogdGhlIHNlcnZlciBhbnN3ZXIgdGhhdCBjb250YWlucyB0aGUgbGlzdCBvZiByZXN1bHRzLlxuKi9cbkluZGV4Q29yZS5wcm90b3R5cGUuc2VhcmNoID0gYnVpbGRTZWFyY2hNZXRob2QoJ3F1ZXJ5Jyk7XG5cbi8qXG4qIC0tIEJFVEEgLS1cbiogU2VhcmNoIGEgcmVjb3JkIHNpbWlsYXIgdG8gdGhlIHF1ZXJ5IGluc2lkZSB0aGUgaW5kZXggdXNpbmcgWE1MSHR0cFJlcXVlc3QgcmVxdWVzdCAoVXNpbmcgYSBQT1NUIHF1ZXJ5IHRvXG4qIG1pbmltaXplIG51bWJlciBvZiBPUFRJT05TIHF1ZXJpZXM6IENyb3NzLU9yaWdpbiBSZXNvdXJjZSBTaGFyaW5nKS5cbipcbiogQHBhcmFtIHtzdHJpbmd9IFtxdWVyeV0gdGhlIHNpbWlsYXIgcXVlcnlcbiogQHBhcmFtIHtvYmplY3R9IFthcmdzXSAob3B0aW9uYWwpIGlmIHNldCwgY29udGFpbnMgYW4gb2JqZWN0IHdpdGggcXVlcnkgcGFyYW1ldGVycy5cbiogICBBbGwgc2VhcmNoIHBhcmFtZXRlcnMgYXJlIHN1cHBvcnRlZCAoc2VlIHNlYXJjaCBmdW5jdGlvbiksIHJlc3RyaWN0U2VhcmNoYWJsZUF0dHJpYnV0ZXMgYW5kIGZhY2V0RmlsdGVyc1xuKiAgIGFyZSB0aGUgdHdvIG1vc3QgdXNlZnVsIHRvIHJlc3RyaWN0IHRoZSBzaW1pbGFyIHJlc3VsdHMgYW5kIGdldCBtb3JlIHJlbGV2YW50IGNvbnRlbnRcbiovXG5JbmRleENvcmUucHJvdG90eXBlLnNpbWlsYXJTZWFyY2ggPSBkZXByZWNhdGUoXG4gIGJ1aWxkU2VhcmNoTWV0aG9kKCdzaW1pbGFyUXVlcnknKSxcbiAgZGVwcmVjYXRlZE1lc3NhZ2UoXG4gICAgJ2luZGV4LnNpbWlsYXJTZWFyY2gocXVlcnlbLCBjYWxsYmFja10pJyxcbiAgICAnaW5kZXguc2VhcmNoKHsgc2ltaWxhclF1ZXJ5OiBxdWVyeSB9WywgY2FsbGJhY2tdKSdcbiAgKVxuKTtcblxuLypcbiogQnJvd3NlIGluZGV4IGNvbnRlbnQuIFRoZSByZXNwb25zZSBjb250ZW50IHdpbGwgaGF2ZSBhIGBjdXJzb3JgIHByb3BlcnR5IHRoYXQgeW91IGNhbiB1c2VcbiogdG8gYnJvd3NlIHN1YnNlcXVlbnQgcGFnZXMgZm9yIHRoaXMgcXVlcnkuIFVzZSBgaW5kZXguYnJvd3NlRnJvbShjdXJzb3IpYCB3aGVuIHlvdSB3YW50LlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgLSBUaGUgZnVsbCB0ZXh0IHF1ZXJ5XG4qIEBwYXJhbSB7T2JqZWN0fSBbcXVlcnlQYXJhbWV0ZXJzXSAtIEFueSBzZWFyY2ggcXVlcnkgcGFyYW1ldGVyXG4qIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBUaGUgcmVzdWx0IGNhbGxiYWNrIGNhbGxlZCB3aXRoIHR3byBhcmd1bWVudHNcbiogICBlcnJvcjogbnVsbCBvciBFcnJvcignbWVzc2FnZScpXG4qICAgY29udGVudDogdGhlIHNlcnZlciBhbnN3ZXIgd2l0aCB0aGUgYnJvd3NlIHJlc3VsdFxuKiBAcmV0dXJuIHtQcm9taXNlfHVuZGVmaW5lZH0gUmV0dXJucyBhIHByb21pc2UgaWYgbm8gY2FsbGJhY2sgZ2l2ZW5cbiogQGV4YW1wbGVcbiogaW5kZXguYnJvd3NlKCdjb29sIHNvbmdzJywge1xuKiAgIHRhZ0ZpbHRlcnM6ICdwdWJsaWMsY29tbWVudHMnLFxuKiAgIGhpdHNQZXJQYWdlOiA1MDBcbiogfSwgY2FsbGJhY2spO1xuKiBAc2VlIHtAbGluayBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kb2MvcmVzdF9hcGkjQnJvd3NlfEFsZ29saWEgUkVTVCBBUEkgRG9jdW1lbnRhdGlvbn1cbiovXG5JbmRleENvcmUucHJvdG90eXBlLmJyb3dzZSA9IGZ1bmN0aW9uKHF1ZXJ5LCBxdWVyeVBhcmFtZXRlcnMsIGNhbGxiYWNrKSB7XG4gIHZhciBtZXJnZSA9IHJlcXVpcmUoJy4vbWVyZ2UuanMnKTtcblxuICB2YXIgaW5kZXhPYmogPSB0aGlzO1xuXG4gIHZhciBwYWdlO1xuICB2YXIgaGl0c1BlclBhZ2U7XG5cbiAgLy8gd2UgY2hlY2sgdmFyaWFkaWMgY2FsbHMgdGhhdCBhcmUgbm90IHRoZSBvbmUgZGVmaW5lZFxuICAvLyAuYnJvd3NlKCkvLmJyb3dzZShmbilcbiAgLy8gPT4gcGFnZSA9IDBcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcGFnZSA9IDA7XG4gICAgY2FsbGJhY2sgPSBhcmd1bWVudHNbMF07XG4gICAgcXVlcnkgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ251bWJlcicpIHtcbiAgICAvLyAuYnJvd3NlKDIpLy5icm93c2UoMiwgMTApLy5icm93c2UoMiwgZm4pLy5icm93c2UoMiwgMTAsIGZuKVxuICAgIHBhZ2UgPSBhcmd1bWVudHNbMF07XG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09ICdudW1iZXInKSB7XG4gICAgICBoaXRzUGVyUGFnZSA9IGFyZ3VtZW50c1sxXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gYXJndW1lbnRzWzFdO1xuICAgICAgaGl0c1BlclBhZ2UgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHF1ZXJ5ID0gdW5kZWZpbmVkO1xuICAgIHF1ZXJ5UGFyYW1ldGVycyA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xuICAgIC8vIC5icm93c2UocXVlcnlQYXJhbWV0ZXJzKS8uYnJvd3NlKHF1ZXJ5UGFyYW1ldGVycywgY2IpXG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gYXJndW1lbnRzWzFdO1xuICAgIH1cbiAgICBxdWVyeVBhcmFtZXRlcnMgPSBhcmd1bWVudHNbMF07XG4gICAgcXVlcnkgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIC5icm93c2UocXVlcnksIGNiKVxuICAgIGNhbGxiYWNrID0gYXJndW1lbnRzWzFdO1xuICAgIHF1ZXJ5UGFyYW1ldGVycyA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIG90aGVyd2lzZSBpdCdzIGEgLmJyb3dzZShxdWVyeSkvLmJyb3dzZShxdWVyeSwgcXVlcnlQYXJhbWV0ZXJzKS8uYnJvd3NlKHF1ZXJ5LCBxdWVyeVBhcmFtZXRlcnMsIGNiKVxuXG4gIC8vIGdldCBzZWFyY2ggcXVlcnkgcGFyYW1ldGVycyBjb21iaW5pbmcgdmFyaW91cyBwb3NzaWJsZSBjYWxsc1xuICAvLyB0byAuYnJvd3NlKCk7XG4gIHF1ZXJ5UGFyYW1ldGVycyA9IG1lcmdlKHt9LCBxdWVyeVBhcmFtZXRlcnMgfHwge30sIHtcbiAgICBwYWdlOiBwYWdlLFxuICAgIGhpdHNQZXJQYWdlOiBoaXRzUGVyUGFnZSxcbiAgICBxdWVyeTogcXVlcnlcbiAgfSk7XG5cbiAgdmFyIHBhcmFtcyA9IHRoaXMuYXMuX2dldFNlYXJjaFBhcmFtcyhxdWVyeVBhcmFtZXRlcnMsICcnKTtcblxuICByZXR1cm4gdGhpcy5hcy5fanNvblJlcXVlc3Qoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogJy8xL2luZGV4ZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpbmRleE9iai5pbmRleE5hbWUpICsgJy9icm93c2UnLFxuICAgIGJvZHk6IHtwYXJhbXM6IHBhcmFtc30sXG4gICAgaG9zdFR5cGU6ICdyZWFkJyxcbiAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgfSk7XG59O1xuXG4vKlxuKiBDb250aW51ZSBicm93c2luZyBmcm9tIGEgcHJldmlvdXMgcG9zaXRpb24gKGN1cnNvciksIG9idGFpbmVkIHZpYSBhIGNhbGwgdG8gYC5icm93c2UoKWAuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSAtIFRoZSBmdWxsIHRleHQgcXVlcnlcbiogQHBhcmFtIHtPYmplY3R9IFtxdWVyeVBhcmFtZXRlcnNdIC0gQW55IHNlYXJjaCBxdWVyeSBwYXJhbWV0ZXJcbiogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIFRoZSByZXN1bHQgY2FsbGJhY2sgY2FsbGVkIHdpdGggdHdvIGFyZ3VtZW50c1xuKiAgIGVycm9yOiBudWxsIG9yIEVycm9yKCdtZXNzYWdlJylcbiogICBjb250ZW50OiB0aGUgc2VydmVyIGFuc3dlciB3aXRoIHRoZSBicm93c2UgcmVzdWx0XG4qIEByZXR1cm4ge1Byb21pc2V8dW5kZWZpbmVkfSBSZXR1cm5zIGEgcHJvbWlzZSBpZiBubyBjYWxsYmFjayBnaXZlblxuKiBAZXhhbXBsZVxuKiBpbmRleC5icm93c2VGcm9tKCcxNGxrZnNha2wzMicsIGNhbGxiYWNrKTtcbiogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZG9jL3Jlc3RfYXBpI0Jyb3dzZXxBbGdvbGlhIFJFU1QgQVBJIERvY3VtZW50YXRpb259XG4qL1xuSW5kZXhDb3JlLnByb3RvdHlwZS5icm93c2VGcm9tID0gZnVuY3Rpb24oY3Vyc29yLCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5hcy5fanNvblJlcXVlc3Qoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogJy8xL2luZGV4ZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmluZGV4TmFtZSkgKyAnL2Jyb3dzZScsXG4gICAgYm9keToge2N1cnNvcjogY3Vyc29yfSxcbiAgICBob3N0VHlwZTogJ3JlYWQnLFxuICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICB9KTtcbn07XG5cbi8qXG4qIFNlYXJjaCBmb3IgZmFjZXQgdmFsdWVzXG4qIGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL2RvYy9yZXN0LWFwaS9zZWFyY2gjc2VhcmNoLWZvci1mYWNldC12YWx1ZXNcbipcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5mYWNldE5hbWUgRmFjZXQgbmFtZSwgbmFtZSBvZiB0aGUgYXR0cmlidXRlIHRvIHNlYXJjaCBmb3IgdmFsdWVzIGluLlxuKiBNdXN0IGJlIGRlY2xhcmVkIGFzIGEgZmFjZXRcbiogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5mYWNldFF1ZXJ5IFF1ZXJ5IGZvciB0aGUgZmFjZXQgc2VhcmNoXG4qIEBwYXJhbSB7c3RyaW5nfSBbcGFyYW1zLipdIEFueSBzZWFyY2ggcGFyYW1ldGVyIG9mIEFsZ29saWEsXG4qIHNlZSBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kb2MvYXBpLWNsaWVudC9qYXZhc2NyaXB0L3NlYXJjaCNzZWFyY2gtcGFyYW1ldGVyc1xuKiBQYWdpbmF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQuIFRoZSBwYWdlIGFuZCBoaXRzUGVyUGFnZSBwYXJhbWV0ZXJzIHdpbGwgYmUgaWdub3JlZC5cbiogQHBhcmFtIGNhbGxiYWNrIChvcHRpb25hbClcbiovXG5JbmRleENvcmUucHJvdG90eXBlLnNlYXJjaEZvckZhY2V0VmFsdWVzID0gZnVuY3Rpb24ocGFyYW1zLCBjYWxsYmFjaykge1xuICB2YXIgY2xvbmUgPSByZXF1aXJlKCcuL2Nsb25lLmpzJyk7XG4gIHZhciBvbWl0ID0gcmVxdWlyZSgnLi9vbWl0LmpzJyk7XG4gIHZhciB1c2FnZSA9ICdVc2FnZTogaW5kZXguc2VhcmNoRm9yRmFjZXRWYWx1ZXMoe2ZhY2V0TmFtZSwgZmFjZXRRdWVyeSwgLi4ucGFyYW1zfVssIGNhbGxiYWNrXSknO1xuXG4gIGlmIChwYXJhbXMuZmFjZXROYW1lID09PSB1bmRlZmluZWQgfHwgcGFyYW1zLmZhY2V0UXVlcnkgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcih1c2FnZSk7XG4gIH1cblxuICB2YXIgZmFjZXROYW1lID0gcGFyYW1zLmZhY2V0TmFtZTtcbiAgdmFyIGZpbHRlcmVkUGFyYW1zID0gb21pdChjbG9uZShwYXJhbXMpLCBmdW5jdGlvbihrZXlOYW1lKSB7XG4gICAgcmV0dXJuIGtleU5hbWUgPT09ICdmYWNldE5hbWUnO1xuICB9KTtcbiAgdmFyIHNlYXJjaFBhcmFtZXRlcnMgPSB0aGlzLmFzLl9nZXRTZWFyY2hQYXJhbXMoZmlsdGVyZWRQYXJhbXMsICcnKTtcblxuICByZXR1cm4gdGhpcy5hcy5fanNvblJlcXVlc3Qoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogJy8xL2luZGV4ZXMvJyArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQodGhpcy5pbmRleE5hbWUpICsgJy9mYWNldHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChmYWNldE5hbWUpICsgJy9xdWVyeScsXG4gICAgaG9zdFR5cGU6ICdyZWFkJyxcbiAgICBib2R5OiB7cGFyYW1zOiBzZWFyY2hQYXJhbWV0ZXJzfSxcbiAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgfSk7XG59O1xuXG5JbmRleENvcmUucHJvdG90eXBlLnNlYXJjaEZhY2V0ID0gZGVwcmVjYXRlKGZ1bmN0aW9uKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMuc2VhcmNoRm9yRmFjZXRWYWx1ZXMocGFyYW1zLCBjYWxsYmFjayk7XG59LCBkZXByZWNhdGVkTWVzc2FnZShcbiAgJ2luZGV4LnNlYXJjaEZhY2V0KHBhcmFtc1ssIGNhbGxiYWNrXSknLFxuICAnaW5kZXguc2VhcmNoRm9yRmFjZXRWYWx1ZXMocGFyYW1zWywgY2FsbGJhY2tdKSdcbikpO1xuXG5JbmRleENvcmUucHJvdG90eXBlLl9zZWFyY2ggPSBmdW5jdGlvbihwYXJhbXMsIHVybCwgY2FsbGJhY2ssIGFkZGl0aW9uYWxVQSkge1xuICByZXR1cm4gdGhpcy5hcy5fanNvblJlcXVlc3Qoe1xuICAgIGNhY2hlOiB0aGlzLmNhY2hlLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogdXJsIHx8ICcvMS9pbmRleGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5pbmRleE5hbWUpICsgJy9xdWVyeScsXG4gICAgYm9keToge3BhcmFtczogcGFyYW1zfSxcbiAgICBob3N0VHlwZTogJ3JlYWQnLFxuICAgIGZhbGxiYWNrOiB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiAnLzEvaW5kZXhlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuaW5kZXhOYW1lKSxcbiAgICAgIGJvZHk6IHtwYXJhbXM6IHBhcmFtc31cbiAgICB9LFxuICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICBhZGRpdGlvbmFsVUE6IGFkZGl0aW9uYWxVQVxuICB9KTtcbn07XG5cbi8qXG4qIEdldCBhbiBvYmplY3QgZnJvbSB0aGlzIGluZGV4XG4qXG4qIEBwYXJhbSBvYmplY3RJRCB0aGUgdW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIG9iamVjdCB0byByZXRyaWV2ZVxuKiBAcGFyYW0gYXR0cnMgKG9wdGlvbmFsKSBpZiBzZXQsIGNvbnRhaW5zIHRoZSBhcnJheSBvZiBhdHRyaWJ1dGUgbmFtZXMgdG8gcmV0cmlldmVcbiogQHBhcmFtIGNhbGxiYWNrIChvcHRpb25hbCkgdGhlIHJlc3VsdCBjYWxsYmFjayBjYWxsZWQgd2l0aCB0d28gYXJndW1lbnRzXG4qICBlcnJvcjogbnVsbCBvciBFcnJvcignbWVzc2FnZScpXG4qICBjb250ZW50OiB0aGUgb2JqZWN0IHRvIHJldHJpZXZlIG9yIHRoZSBlcnJvciBtZXNzYWdlIGlmIGEgZmFpbHVyZSBvY2N1cnJlZFxuKi9cbkluZGV4Q29yZS5wcm90b3R5cGUuZ2V0T2JqZWN0ID0gZnVuY3Rpb24ob2JqZWN0SUQsIGF0dHJzLCBjYWxsYmFjaykge1xuICB2YXIgaW5kZXhPYmogPSB0aGlzO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxIHx8IHR5cGVvZiBhdHRycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gYXR0cnM7XG4gICAgYXR0cnMgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIgcGFyYW1zID0gJyc7XG4gIGlmIChhdHRycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcGFyYW1zID0gJz9hdHRyaWJ1dGVzPSc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgcGFyYW1zICs9ICcsJztcbiAgICAgIH1cbiAgICAgIHBhcmFtcyArPSBhdHRyc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcy5hcy5fanNvblJlcXVlc3Qoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiAnLzEvaW5kZXhlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGluZGV4T2JqLmluZGV4TmFtZSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQob2JqZWN0SUQpICsgcGFyYW1zLFxuICAgIGhvc3RUeXBlOiAncmVhZCcsXG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gIH0pO1xufTtcblxuLypcbiogR2V0IHNldmVyYWwgb2JqZWN0cyBmcm9tIHRoaXMgaW5kZXhcbipcbiogQHBhcmFtIG9iamVjdElEcyB0aGUgYXJyYXkgb2YgdW5pcXVlIGlkZW50aWZpZXIgb2Ygb2JqZWN0cyB0byByZXRyaWV2ZVxuKi9cbkluZGV4Q29yZS5wcm90b3R5cGUuZ2V0T2JqZWN0cyA9IGZ1bmN0aW9uKG9iamVjdElEcywgYXR0cmlidXRlc1RvUmV0cmlldmUsIGNhbGxiYWNrKSB7XG4gIHZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xuICB2YXIgbWFwID0gcmVxdWlyZSgnLi9tYXAuanMnKTtcblxuICB2YXIgdXNhZ2UgPSAnVXNhZ2U6IGluZGV4LmdldE9iamVjdHMoYXJyYXlPZk9iamVjdElEc1ssIGNhbGxiYWNrXSknO1xuXG4gIGlmICghaXNBcnJheShvYmplY3RJRHMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHVzYWdlKTtcbiAgfVxuXG4gIHZhciBpbmRleE9iaiA9IHRoaXM7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgfHwgdHlwZW9mIGF0dHJpYnV0ZXNUb1JldHJpZXZlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBhdHRyaWJ1dGVzVG9SZXRyaWV2ZTtcbiAgICBhdHRyaWJ1dGVzVG9SZXRyaWV2ZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciBib2R5ID0ge1xuICAgIHJlcXVlc3RzOiBtYXAob2JqZWN0SURzLCBmdW5jdGlvbiBwcmVwYXJlUmVxdWVzdChvYmplY3RJRCkge1xuICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgIGluZGV4TmFtZTogaW5kZXhPYmouaW5kZXhOYW1lLFxuICAgICAgICBvYmplY3RJRDogb2JqZWN0SURcbiAgICAgIH07XG5cbiAgICAgIGlmIChhdHRyaWJ1dGVzVG9SZXRyaWV2ZSkge1xuICAgICAgICByZXF1ZXN0LmF0dHJpYnV0ZXNUb1JldHJpZXZlID0gYXR0cmlidXRlc1RvUmV0cmlldmUuam9pbignLCcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9KVxuICB9O1xuXG4gIHJldHVybiB0aGlzLmFzLl9qc29uUmVxdWVzdCh7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgdXJsOiAnLzEvaW5kZXhlcy8qL29iamVjdHMnLFxuICAgIGhvc3RUeXBlOiAncmVhZCcsXG4gICAgYm9keTogYm9keSxcbiAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgfSk7XG59O1xuXG5JbmRleENvcmUucHJvdG90eXBlLmFzID0gbnVsbDtcbkluZGV4Q29yZS5wcm90b3R5cGUuaW5kZXhOYW1lID0gbnVsbDtcbkluZGV4Q29yZS5wcm90b3R5cGUudHlwZUFoZWFkQXJncyA9IG51bGw7XG5JbmRleENvcmUucHJvdG90eXBlLnR5cGVBaGVhZFZhbHVlT3B0aW9uID0gbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEFsZ29saWFTZWFyY2hDb3JlID0gcmVxdWlyZSgnLi4vLi4vQWxnb2xpYVNlYXJjaENvcmUuanMnKTtcbnZhciBjcmVhdGVBbGdvbGlhc2VhcmNoID0gcmVxdWlyZSgnLi4vY3JlYXRlQWxnb2xpYXNlYXJjaC5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFsZ29saWFzZWFyY2goQWxnb2xpYVNlYXJjaENvcmUsICdCcm93c2VyIChsaXRlKScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnZ2xvYmFsJyk7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlIHx8IHJlcXVpcmUoJ2VzNi1wcm9taXNlJykuUHJvbWlzZTtcblxuLy8gVGhpcyBpcyB0aGUgc3RhbmRhbG9uZSBicm93c2VyIGJ1aWxkIGVudHJ5IHBvaW50XG4vLyBCcm93c2VyIGltcGxlbWVudGF0aW9uIG9mIHRoZSBBbGdvbGlhIFNlYXJjaCBKYXZhU2NyaXB0IGNsaWVudCxcbi8vIHVzaW5nIFhNTEh0dHBSZXF1ZXN0LCBYRG9tYWluUmVxdWVzdCBhbmQgSlNPTlAgYXMgZmFsbGJhY2tcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlQWxnb2xpYXNlYXJjaChBbGdvbGlhU2VhcmNoLCB1YVN1ZmZpeCkge1xuICB2YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuICB2YXIgZXJyb3JzID0gcmVxdWlyZSgnLi4vZXJyb3JzJyk7XG4gIHZhciBpbmxpbmVIZWFkZXJzID0gcmVxdWlyZSgnLi9pbmxpbmUtaGVhZGVycycpO1xuICB2YXIganNvbnBSZXF1ZXN0ID0gcmVxdWlyZSgnLi9qc29ucC1yZXF1ZXN0Jyk7XG4gIHZhciBwbGFjZXMgPSByZXF1aXJlKCcuLi9wbGFjZXMuanMnKTtcbiAgdWFTdWZmaXggPSB1YVN1ZmZpeCB8fCAnJztcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZWJ1ZycpIHtcbiAgICByZXF1aXJlKCdkZWJ1ZycpLmVuYWJsZSgnYWxnb2xpYXNlYXJjaConKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFsZ29saWFzZWFyY2goYXBwbGljYXRpb25JRCwgYXBpS2V5LCBvcHRzKSB7XG4gICAgdmFyIGNsb25lRGVlcCA9IHJlcXVpcmUoJy4uL2Nsb25lLmpzJyk7XG5cbiAgICBvcHRzID0gY2xvbmVEZWVwKG9wdHMgfHwge30pO1xuXG4gICAgb3B0cy5fdWEgPSBvcHRzLl91YSB8fCBhbGdvbGlhc2VhcmNoLnVhO1xuXG4gICAgcmV0dXJuIG5ldyBBbGdvbGlhU2VhcmNoQnJvd3NlcihhcHBsaWNhdGlvbklELCBhcGlLZXksIG9wdHMpO1xuICB9XG5cbiAgYWxnb2xpYXNlYXJjaC52ZXJzaW9uID0gcmVxdWlyZSgnLi4vdmVyc2lvbi5qcycpO1xuXG4gIGFsZ29saWFzZWFyY2gudWEgPVxuICAgICdBbGdvbGlhIGZvciBKYXZhU2NyaXB0ICgnICsgYWxnb2xpYXNlYXJjaC52ZXJzaW9uICsgJyk7ICcgKyB1YVN1ZmZpeDtcblxuICBhbGdvbGlhc2VhcmNoLmluaXRQbGFjZXMgPSBwbGFjZXMoYWxnb2xpYXNlYXJjaCk7XG5cbiAgLy8gd2UgZXhwb3NlIGludG8gd2luZG93IG5vIG1hdHRlciBob3cgd2UgYXJlIHVzZWQsIHRoaXMgd2lsbCBhbGxvd1xuICAvLyB1cyB0byBlYXNpbHkgZGVidWcgYW55IHdlYnNpdGUgcnVubmluZyBhbGdvbGlhXG4gIGdsb2JhbC5fX2FsZ29saWEgPSB7XG4gICAgZGVidWc6IHJlcXVpcmUoJ2RlYnVnJyksXG4gICAgYWxnb2xpYXNlYXJjaDogYWxnb2xpYXNlYXJjaFxuICB9O1xuXG4gIHZhciBzdXBwb3J0ID0ge1xuICAgIGhhc1hNTEh0dHBSZXF1ZXN0OiAnWE1MSHR0cFJlcXVlc3QnIGluIGdsb2JhbCxcbiAgICBoYXNYRG9tYWluUmVxdWVzdDogJ1hEb21haW5SZXF1ZXN0JyBpbiBnbG9iYWxcbiAgfTtcblxuICBpZiAoc3VwcG9ydC5oYXNYTUxIdHRwUmVxdWVzdCkge1xuICAgIHN1cHBvcnQuY29ycyA9ICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gQWxnb2xpYVNlYXJjaEJyb3dzZXIoKSB7XG4gICAgLy8gY2FsbCBBbGdvbGlhU2VhcmNoIGNvbnN0cnVjdG9yXG4gICAgQWxnb2xpYVNlYXJjaC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgaW5oZXJpdHMoQWxnb2xpYVNlYXJjaEJyb3dzZXIsIEFsZ29saWFTZWFyY2gpO1xuXG4gIEFsZ29saWFTZWFyY2hCcm93c2VyLnByb3RvdHlwZS5fcmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QodXJsLCBvcHRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIHdyYXBSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgLy8gbm8gY29ycyBvciBYRG9tYWluUmVxdWVzdCwgbm8gcmVxdWVzdFxuICAgICAgaWYgKCFzdXBwb3J0LmNvcnMgJiYgIXN1cHBvcnQuaGFzWERvbWFpblJlcXVlc3QpIHtcbiAgICAgICAgLy8gdmVyeSBvbGQgYnJvd3Nlciwgbm90IHN1cHBvcnRlZFxuICAgICAgICByZWplY3QobmV3IGVycm9ycy5OZXR3b3JrKCdDT1JTIG5vdCBzdXBwb3J0ZWQnKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXJsID0gaW5saW5lSGVhZGVycyh1cmwsIG9wdHMuaGVhZGVycyk7XG5cbiAgICAgIHZhciBib2R5ID0gb3B0cy5ib2R5O1xuICAgICAgdmFyIHJlcSA9IHN1cHBvcnQuY29ycyA/IG5ldyBYTUxIdHRwUmVxdWVzdCgpIDogbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgICB2YXIgcmVxVGltZW91dDtcbiAgICAgIHZhciB0aW1lZE91dDtcbiAgICAgIHZhciBjb25uZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgcmVxVGltZW91dCA9IHNldFRpbWVvdXQob25UaW1lb3V0LCBvcHRzLnRpbWVvdXRzLmNvbm5lY3QpO1xuICAgICAgLy8gd2Ugc2V0IGFuIGVtcHR5IG9ucHJvZ3Jlc3MgbGlzdGVuZXJcbiAgICAgIC8vIHNvIHRoYXQgWERvbWFpblJlcXVlc3Qgb24gSUU5IGlzIG5vdCBhYm9ydGVkXG4gICAgICAvLyByZWZzOlxuICAgICAgLy8gIC0gaHR0cHM6Ly9naXRodWIuY29tL2FsZ29saWEvYWxnb2xpYXNlYXJjaC1jbGllbnQtanMvaXNzdWVzLzc2XG4gICAgICAvLyAgLSBodHRwczovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2llL2VuLVVTLzMwZWYzYWRkLTc2N2MtNDQzNi1iOGE5LWYxY2ExOWI0ODEyZS9pZTktcnRtLXhkb21haW5yZXF1ZXN0LWlzc3VlZC1yZXF1ZXN0cy1tYXktYWJvcnQtaWYtYWxsLWV2ZW50LWhhbmRsZXJzLW5vdC1zcGVjaWZpZWQ/Zm9ydW09aWV3ZWJkZXZlbG9wbWVudFxuICAgICAgcmVxLm9ucHJvZ3Jlc3MgPSBvblByb2dyZXNzO1xuICAgICAgaWYgKCdvbnJlYWR5c3RhdGVjaGFuZ2UnIGluIHJlcSkgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG9uUmVhZHlTdGF0ZUNoYW5nZTtcbiAgICAgIHJlcS5vbmxvYWQgPSBvbkxvYWQ7XG4gICAgICByZXEub25lcnJvciA9IG9uRXJyb3I7XG5cbiAgICAgIC8vIGRvIG5vdCByZWx5IG9uIGRlZmF1bHQgWEhSIGFzeW5jIGZsYWcsIGFzIHNvbWUgYW5hbHl0aWNzIGNvZGUgbGlrZSBob3RqYXJcbiAgICAgIC8vIGJyZWFrcyBpdCBhbmQgc2V0IGl0IHRvIGZhbHNlIGJ5IGRlZmF1bHRcbiAgICAgIGlmIChyZXEgaW5zdGFuY2VvZiBYTUxIdHRwUmVxdWVzdCkge1xuICAgICAgICByZXEub3BlbihvcHRzLm1ldGhvZCwgdXJsLCB0cnVlKTtcblxuICAgICAgICAvLyBUaGUgQW5hbHl0aWNzIEFQSSBuZXZlciBhY2NlcHRzIEF1dGggaGVhZGVycyBhcyBxdWVyeSBzdHJpbmdcbiAgICAgICAgLy8gdGhpcyBvcHRpb24gZXhpc3RzIHNwZWNpZmljYWxseSBmb3IgdGhlbS5cbiAgICAgICAgaWYgKG9wdHMuZm9yY2VBdXRoSGVhZGVycykge1xuICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFxuICAgICAgICAgICAgJ3gtYWxnb2xpYS1hcHBsaWNhdGlvbi1pZCcsXG4gICAgICAgICAgICBvcHRzLmhlYWRlcnNbJ3gtYWxnb2xpYS1hcHBsaWNhdGlvbi1pZCddXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcbiAgICAgICAgICAgICd4LWFsZ29saWEtYXBpLWtleScsXG4gICAgICAgICAgICBvcHRzLmhlYWRlcnNbJ3gtYWxnb2xpYS1hcGkta2V5J11cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXEub3BlbihvcHRzLm1ldGhvZCwgdXJsKTtcbiAgICAgIH1cblxuICAgICAgLy8gaGVhZGVycyBhcmUgbWVhbnQgdG8gYmUgc2VudCBhZnRlciBvcGVuXG4gICAgICBpZiAoc3VwcG9ydC5jb3JzKSB7XG4gICAgICAgIGlmIChib2R5KSB7XG4gICAgICAgICAgaWYgKG9wdHMubWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQWNjZXNzX2NvbnRyb2xfQ09SUyNTaW1wbGVfcmVxdWVzdHNcbiAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcignYWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJvZHkpIHtcbiAgICAgICAgcmVxLnNlbmQoYm9keSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXEuc2VuZCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBldmVudCBvYmplY3Qgbm90IHJlY2VpdmVkIGluIElFOCwgYXQgbGVhc3RcbiAgICAgIC8vIGJ1dCB3ZSBkbyBub3QgdXNlIGl0LCBzdGlsbCBpbXBvcnRhbnQgdG8gbm90ZVxuICAgICAgZnVuY3Rpb24gb25Mb2FkKC8qIGV2ZW50ICovKSB7XG4gICAgICAgIC8vIFdoZW4gYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0cyByZXEudGltZW91dCwgd2UgY2FuXG4gICAgICAgIC8vIGhhdmUgYm90aCBhIGxvYWQgYW5kIHRpbWVvdXQgZXZlbnQsIHNpbmNlIGhhbmRsZWQgYnkgYSBkdW1iIHNldFRpbWVvdXRcbiAgICAgICAgaWYgKHRpbWVkT3V0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHJlcVRpbWVvdXQpO1xuXG4gICAgICAgIHZhciBvdXQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBvdXQgPSB7XG4gICAgICAgICAgICBib2R5OiBKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpLFxuICAgICAgICAgICAgcmVzcG9uc2VUZXh0OiByZXEucmVzcG9uc2VUZXh0LFxuICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVxLnN0YXR1cyxcbiAgICAgICAgICAgIC8vIFhEb21haW5SZXF1ZXN0IGRvZXMgbm90IGhhdmUgYW55IHJlc3BvbnNlIGhlYWRlcnNcbiAgICAgICAgICAgIGhlYWRlcnM6IHJlcS5nZXRBbGxSZXNwb25zZUhlYWRlcnMgJiYgcmVxLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8IHt9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIG91dCA9IG5ldyBlcnJvcnMuVW5wYXJzYWJsZUpTT04oe1xuICAgICAgICAgICAgbW9yZTogcmVxLnJlc3BvbnNlVGV4dFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG91dCBpbnN0YW5jZW9mIGVycm9ycy5VbnBhcnNhYmxlSlNPTikge1xuICAgICAgICAgIHJlamVjdChvdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUob3V0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbkVycm9yKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aW1lZE91dCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyVGltZW91dChyZXFUaW1lb3V0KTtcblxuICAgICAgICAvLyBlcnJvciBldmVudCBpcyB0cmlnZXJyZWQgYm90aCB3aXRoIFhEUi9YSFIgb246XG4gICAgICAgIC8vICAgLSBETlMgZXJyb3JcbiAgICAgICAgLy8gICAtIHVuYWxsb3dlZCBjcm9zcyBkb21haW4gcmVxdWVzdFxuICAgICAgICByZWplY3QoXG4gICAgICAgICAgbmV3IGVycm9ycy5OZXR3b3JrKHtcbiAgICAgICAgICAgIG1vcmU6IGV2ZW50XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgICB0aW1lZE91dCA9IHRydWU7XG4gICAgICAgIHJlcS5hYm9ydCgpO1xuXG4gICAgICAgIHJlamVjdChuZXcgZXJyb3JzLlJlcXVlc3RUaW1lb3V0KCkpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbkNvbm5lY3QoKSB7XG4gICAgICAgIGNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIGNsZWFyVGltZW91dChyZXFUaW1lb3V0KTtcbiAgICAgICAgcmVxVGltZW91dCA9IHNldFRpbWVvdXQob25UaW1lb3V0LCBvcHRzLnRpbWVvdXRzLmNvbXBsZXRlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25Qcm9ncmVzcygpIHtcbiAgICAgICAgaWYgKCFjb25uZWN0ZWQpIG9uQ29ubmVjdCgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblJlYWR5U3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICghY29ubmVjdGVkICYmIHJlcS5yZWFkeVN0YXRlID4gMSkgb25Db25uZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgQWxnb2xpYVNlYXJjaEJyb3dzZXIucHJvdG90eXBlLl9yZXF1ZXN0LmZhbGxiYWNrID0gZnVuY3Rpb24gcmVxdWVzdEZhbGxiYWNrKHVybCwgb3B0cykge1xuICAgIHVybCA9IGlubGluZUhlYWRlcnModXJsLCBvcHRzLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIHdyYXBKc29ucFJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBqc29ucFJlcXVlc3QodXJsLCBvcHRzLCBmdW5jdGlvbiBqc29ucFJlcXVlc3REb25lKGVyciwgY29udGVudCkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzb2x2ZShjb250ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIEFsZ29saWFTZWFyY2hCcm93c2VyLnByb3RvdHlwZS5fcHJvbWlzZSA9IHtcbiAgICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdFByb21pc2UodmFsKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QodmFsKTtcbiAgICB9LFxuICAgIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmVQcm9taXNlKHZhbCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWwpO1xuICAgIH0sXG4gICAgZGVsYXk6IGZ1bmN0aW9uIGRlbGF5UHJvbWlzZShtcykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIHJlc29sdmVPblRpbWVvdXQocmVzb2x2ZS8qICwgcmVqZWN0Ki8pIHtcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBtcyk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGFsbDogZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gYWxnb2xpYXNlYXJjaDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5saW5lSGVhZGVycztcblxudmFyIGVuY29kZSA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUnKTtcblxuZnVuY3Rpb24gaW5saW5lSGVhZGVycyh1cmwsIGhlYWRlcnMpIHtcbiAgaWYgKC9cXD8vLnRlc3QodXJsKSkge1xuICAgIHVybCArPSAnJic7XG4gIH0gZWxzZSB7XG4gICAgdXJsICs9ICc/JztcbiAgfVxuXG4gIHJldHVybiB1cmwgKyBlbmNvZGUoaGVhZGVycyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ganNvbnBSZXF1ZXN0O1xuXG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi4vZXJyb3JzJyk7XG5cbnZhciBKU09OUENvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBqc29ucFJlcXVlc3QodXJsLCBvcHRzLCBjYikge1xuICBpZiAob3B0cy5tZXRob2QgIT09ICdHRVQnKSB7XG4gICAgY2IobmV3IEVycm9yKCdNZXRob2QgJyArIG9wdHMubWV0aG9kICsgJyAnICsgdXJsICsgJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IEpTT05QLicpKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBvcHRzLmRlYnVnKCdKU09OUDogc3RhcnQnKTtcblxuICB2YXIgY2JDYWxsZWQgPSBmYWxzZTtcbiAgdmFyIHRpbWVkT3V0ID0gZmFsc2U7XG5cbiAgSlNPTlBDb3VudGVyICs9IDE7XG4gIHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICB2YXIgY2JOYW1lID0gJ2FsZ29saWFKU09OUF8nICsgSlNPTlBDb3VudGVyO1xuICB2YXIgZG9uZSA9IGZhbHNlO1xuXG4gIHdpbmRvd1tjYk5hbWVdID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHJlbW92ZUdsb2JhbHMoKTtcblxuICAgIGlmICh0aW1lZE91dCkge1xuICAgICAgb3B0cy5kZWJ1ZygnSlNPTlA6IExhdGUgYW5zd2VyLCBpZ25vcmluZycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNiQ2FsbGVkID0gdHJ1ZTtcblxuICAgIGNsZWFuKCk7XG5cbiAgICBjYihudWxsLCB7XG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgcmVzcG9uc2VUZXh0OiBKU09OLnN0cmluZ2lmeShkYXRhKS8qICxcbiAgICAgIC8vIFdlIGRvIG5vdCBzZW5kIHRoZSBzdGF0dXNDb2RlLCB0aGVyZSdzIG5vIHN0YXR1c0NvZGUgaW4gSlNPTlAsIGl0IHdpbGwgYmVcbiAgICAgIC8vIGNvbXB1dGVkIHVzaW5nIGRhdGEuc3RhdHVzICYmIGRhdGEubWVzc2FnZSBsaWtlIHdpdGggWERSXG4gICAgICBzdGF0dXNDb2RlKi9cbiAgICB9KTtcbiAgfTtcblxuICAvLyBhZGQgY2FsbGJhY2sgYnkgaGFuZFxuICB1cmwgKz0gJyZjYWxsYmFjaz0nICsgY2JOYW1lO1xuXG4gIC8vIGFkZCBib2R5IHBhcmFtcyBtYW51YWxseVxuICBpZiAob3B0cy5qc29uQm9keSAmJiBvcHRzLmpzb25Cb2R5LnBhcmFtcykge1xuICAgIHVybCArPSAnJicgKyBvcHRzLmpzb25Cb2R5LnBhcmFtcztcbiAgfVxuXG4gIHZhciBvbnRpbWVvdXQgPSBzZXRUaW1lb3V0KHRpbWVvdXQsIG9wdHMudGltZW91dHMuY29tcGxldGUpO1xuXG4gIC8vIHNjcmlwdCBvbnJlYWR5c3RhdGVjaGFuZ2UgbmVlZGVkIG9ubHkgZm9yXG4gIC8vIDw9IElFOFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLmpzL2lzc3Vlcy80NTIzXG4gIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZWFkeXN0YXRlY2hhbmdlO1xuICBzY3JpcHQub25sb2FkID0gc3VjY2VzcztcbiAgc2NyaXB0Lm9uZXJyb3IgPSBlcnJvcjtcblxuICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICBzY3JpcHQuZGVmZXIgPSB0cnVlO1xuICBzY3JpcHQuc3JjID0gdXJsO1xuICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiAgZnVuY3Rpb24gc3VjY2VzcygpIHtcbiAgICBvcHRzLmRlYnVnKCdKU09OUDogc3VjY2VzcycpO1xuXG4gICAgaWYgKGRvbmUgfHwgdGltZWRPdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkb25lID0gdHJ1ZTtcblxuICAgIC8vIHNjcmlwdCBsb2FkZWQgYnV0IGRpZCBub3QgY2FsbCB0aGUgZm4gPT4gc2NyaXB0IGxvYWRpbmcgZXJyb3JcbiAgICBpZiAoIWNiQ2FsbGVkKSB7XG4gICAgICBvcHRzLmRlYnVnKCdKU09OUDogRmFpbC4gU2NyaXB0IGxvYWRlZCBidXQgZGlkIG5vdCBjYWxsIHRoZSBjYWxsYmFjaycpO1xuICAgICAgY2xlYW4oKTtcbiAgICAgIGNiKG5ldyBlcnJvcnMuSlNPTlBTY3JpcHRGYWlsKCkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWR5c3RhdGVjaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gJ2xvYWRlZCcgfHwgdGhpcy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICBzdWNjZXNzKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYW4oKSB7XG4gICAgY2xlYXJUaW1lb3V0KG9udGltZW91dCk7XG4gICAgc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgc2NyaXB0Lm9uZXJyb3IgPSBudWxsO1xuICAgIGhlYWQucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUdsb2JhbHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGRlbGV0ZSB3aW5kb3dbY2JOYW1lXTtcbiAgICAgIGRlbGV0ZSB3aW5kb3dbY2JOYW1lICsgJ19sb2FkZWQnXTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB3aW5kb3dbY2JOYW1lXSA9IHdpbmRvd1tjYk5hbWUgKyAnX2xvYWRlZCddID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVvdXQoKSB7XG4gICAgb3B0cy5kZWJ1ZygnSlNPTlA6IFNjcmlwdCB0aW1lb3V0Jyk7XG4gICAgdGltZWRPdXQgPSB0cnVlO1xuICAgIGNsZWFuKCk7XG4gICAgY2IobmV3IGVycm9ycy5SZXF1ZXN0VGltZW91dCgpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVycm9yKCkge1xuICAgIG9wdHMuZGVidWcoJ0pTT05QOiBTY3JpcHQgZXJyb3InKTtcblxuICAgIGlmIChkb25lIHx8IHRpbWVkT3V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xlYW4oKTtcbiAgICBjYihuZXcgZXJyb3JzLkpTT05QU2NyaXB0RXJyb3IoKSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gYnVpbGRTZWFyY2hNZXRob2Q7XG5cbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzZWFyY2ggbWV0aG9kIHRvIGJlIHVzZWQgaW4gY2xpZW50c1xuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5UGFyYW0gdGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB1c2VkIGZvciB0aGUgcXVlcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgdGhlIHVybFxuICogQHJldHVybiB7ZnVuY3Rpb259IHRoZSBzZWFyY2ggbWV0aG9kXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkU2VhcmNoTWV0aG9kKHF1ZXJ5UGFyYW0sIHVybCkge1xuICAvKipcbiAgICogVGhlIHNlYXJjaCBtZXRob2QuIFByZXBhcmVzIHRoZSBkYXRhIGFuZCBzZW5kIHRoZSBxdWVyeSB0byBBbGdvbGlhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgdGhlIHN0cmluZyB1c2VkIGZvciBxdWVyeSBzZWFyY2hcbiAgICogQHBhcmFtIHtvYmplY3R9IGFyZ3MgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIHRvIHNlbmQgd2l0aCB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja10gdGhlIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCB3aXRoIHRoZSBjbGllbnQgZ2V0cyB0aGUgYW5zd2VyXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZHxQcm9taXNlfSBJZiB0aGUgY2FsbGJhY2sgaXMgbm90IHByb3ZpZGVkIHRoZW4gdGhpcyBtZXRob2RzIHJldHVybnMgYSBQcm9taXNlXG4gICAqL1xuICByZXR1cm4gZnVuY3Rpb24gc2VhcmNoKHF1ZXJ5LCBhcmdzLCBjYWxsYmFjaykge1xuICAgIC8vIHdhcm4gVjIgdXNlcnMgb24gaG93IHRvIHNlYXJjaFxuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnIHx8XG4gICAgICB0eXBlb2YgY2FsbGJhY2sgPT09ICdvYmplY3QnKSB7XG4gICAgICAvLyAuc2VhcmNoKHF1ZXJ5LCBwYXJhbXMsIGNiKVxuICAgICAgLy8gLnNlYXJjaChjYiwgcGFyYW1zKVxuICAgICAgdGhyb3cgbmV3IGVycm9ycy5BbGdvbGlhU2VhcmNoRXJyb3IoJ2luZGV4LnNlYXJjaCB1c2FnZSBpcyBpbmRleC5zZWFyY2gocXVlcnksIHBhcmFtcywgY2IpJyk7XG4gICAgfVxuXG4gICAgLy8gTm9ybWFsaXppbmcgdGhlIGZ1bmN0aW9uIHNpZ25hdHVyZVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IHR5cGVvZiBxdWVyeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gVXNhZ2UgOiAuc2VhcmNoKCksIC5zZWFyY2goY2IpXG4gICAgICBjYWxsYmFjayA9IHF1ZXJ5O1xuICAgICAgcXVlcnkgPSAnJztcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgfHwgdHlwZW9mIGFyZ3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIFVzYWdlIDogLnNlYXJjaChxdWVyeS9hcmdzKSwgLnNlYXJjaChxdWVyeSwgY2IpXG4gICAgICBjYWxsYmFjayA9IGFyZ3M7XG4gICAgICBhcmdzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvLyBBdCB0aGlzIHBvaW50IHdlIGhhdmUgMyBhcmd1bWVudHMgd2l0aCB2YWx1ZXNcblxuICAgIC8vIFVzYWdlIDogLnNlYXJjaChhcmdzKSAvLyBjYXJlZnVsOiB0eXBlb2YgbnVsbCA9PT0gJ29iamVjdCdcbiAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSAnb2JqZWN0JyAmJiBxdWVyeSAhPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHF1ZXJ5O1xuICAgICAgcXVlcnkgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmIChxdWVyeSA9PT0gdW5kZWZpbmVkIHx8IHF1ZXJ5ID09PSBudWxsKSB7IC8vIC5zZWFyY2godW5kZWZpbmVkL251bGwpXG4gICAgICBxdWVyeSA9ICcnO1xuICAgIH1cblxuICAgIHZhciBwYXJhbXMgPSAnJztcblxuICAgIGlmIChxdWVyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMgKz0gcXVlcnlQYXJhbSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSk7XG4gICAgfVxuXG4gICAgdmFyIGFkZGl0aW9uYWxVQTtcbiAgICBpZiAoYXJncyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoYXJncy5hZGRpdGlvbmFsVUEpIHtcbiAgICAgICAgYWRkaXRpb25hbFVBID0gYXJncy5hZGRpdGlvbmFsVUE7XG4gICAgICAgIGRlbGV0ZSBhcmdzLmFkZGl0aW9uYWxVQTtcbiAgICAgIH1cbiAgICAgIC8vIGBfZ2V0U2VhcmNoUGFyYW1zYCB3aWxsIGF1Z21lbnQgcGFyYW1zLCBkbyBub3QgYmUgZm9vbGVkIGJ5IHRoZSA9IHZlcnN1cyArPSBmcm9tIHByZXZpb3VzIGlmXG4gICAgICBwYXJhbXMgPSB0aGlzLmFzLl9nZXRTZWFyY2hQYXJhbXMoYXJncywgcGFyYW1zKTtcbiAgICB9XG5cblxuICAgIHJldHVybiB0aGlzLl9zZWFyY2gocGFyYW1zLCB1cmwsIGNhbGxiYWNrLCBhZGRpdGlvbmFsVUEpO1xuICB9O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZXByZWNhdGUoZm4sIG1lc3NhZ2UpIHtcbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIC8qIGVzbGludCBuby1jb25zb2xlOjAgKi9cbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlcHJlY2F0ZWRNZXNzYWdlKHByZXZpb3VzVXNhZ2UsIG5ld1VzYWdlKSB7XG4gIHZhciBnaXRodWJBbmNob3JMaW5rID0gcHJldmlvdXNVc2FnZS50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoL1tcXC5cXChcXCldL2csICcnKTtcblxuICByZXR1cm4gJ2FsZ29saWFzZWFyY2g6IGAnICsgcHJldmlvdXNVc2FnZSArICdgIHdhcyByZXBsYWNlZCBieSBgJyArIG5ld1VzYWdlICtcbiAgICAnYC4gUGxlYXNlIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYWxnb2xpYS9hbGdvbGlhc2VhcmNoLWNsaWVudC1qYXZhc2NyaXB0L3dpa2kvRGVwcmVjYXRlZCMnICsgZ2l0aHViQW5jaG9yTGluaztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIFRoaXMgZmlsZSBob3N0cyBvdXIgZXJyb3IgZGVmaW5pdGlvbnNcbi8vIFdlIHVzZSBjdXN0b20gZXJyb3IgXCJ0eXBlc1wiIHNvIHRoYXQgd2UgY2FuIGFjdCBvbiB0aGVtIHdoZW4gd2UgbmVlZCBpdFxuLy8gZS5nLjogaWYgZXJyb3IgaW5zdGFuY2VvZiBlcnJvcnMuVW5wYXJzYWJsZUpTT04gdGhlbi4uXG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmZ1bmN0aW9uIEFsZ29saWFTZWFyY2hFcnJvcihtZXNzYWdlLCBleHRyYVByb3BlcnRpZXMpIHtcbiAgdmFyIGZvckVhY2ggPSByZXF1aXJlKCdmb3JlYWNoJyk7XG5cbiAgdmFyIGVycm9yID0gdGhpcztcblxuICAvLyB0cnkgdG8gZ2V0IGEgc3RhY2t0cmFjZVxuICBpZiAodHlwZW9mIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gIH0gZWxzZSB7XG4gICAgZXJyb3Iuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrIHx8ICdDYW5ub3QgZ2V0IGEgc3RhY2t0cmFjZSwgYnJvd3NlciBpcyB0b28gb2xkJztcbiAgfVxuXG4gIHRoaXMubmFtZSA9ICdBbGdvbGlhU2VhcmNoRXJyb3InO1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8ICdVbmtub3duIGVycm9yJztcblxuICBpZiAoZXh0cmFQcm9wZXJ0aWVzKSB7XG4gICAgZm9yRWFjaChleHRyYVByb3BlcnRpZXMsIGZ1bmN0aW9uIGFkZFRvRXJyb3JPYmplY3QodmFsdWUsIGtleSkge1xuICAgICAgZXJyb3Jba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICB9XG59XG5cbmluaGVyaXRzKEFsZ29saWFTZWFyY2hFcnJvciwgRXJyb3IpO1xuXG5mdW5jdGlvbiBjcmVhdGVDdXN0b21FcnJvcihuYW1lLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIEFsZ29saWFTZWFyY2hDdXN0b21FcnJvcigpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICAvLyBjdXN0b20gbWVzc2FnZSBub3Qgc2V0LCB1c2UgZGVmYXVsdFxuICAgIGlmICh0eXBlb2YgYXJnc1swXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGFyZ3MudW5zaGlmdChtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBBbGdvbGlhU2VhcmNoRXJyb3IuYXBwbHkodGhpcywgYXJncyk7XG4gICAgdGhpcy5uYW1lID0gJ0FsZ29saWFTZWFyY2gnICsgbmFtZSArICdFcnJvcic7XG4gIH1cblxuICBpbmhlcml0cyhBbGdvbGlhU2VhcmNoQ3VzdG9tRXJyb3IsIEFsZ29saWFTZWFyY2hFcnJvcik7XG5cbiAgcmV0dXJuIEFsZ29saWFTZWFyY2hDdXN0b21FcnJvcjtcbn1cblxuLy8gbGF0ZSBleHBvcnRzIHRvIGxldCB2YXJpb3VzIGZuIGRlZnMgYW5kIGluaGVyaXRzIHRha2UgcGxhY2Vcbm1vZHVsZS5leHBvcnRzID0ge1xuICBBbGdvbGlhU2VhcmNoRXJyb3I6IEFsZ29saWFTZWFyY2hFcnJvcixcbiAgVW5wYXJzYWJsZUpTT046IGNyZWF0ZUN1c3RvbUVycm9yKFxuICAgICdVbnBhcnNhYmxlSlNPTicsXG4gICAgJ0NvdWxkIG5vdCBwYXJzZSB0aGUgaW5jb21pbmcgcmVzcG9uc2UgYXMgSlNPTiwgc2VlIGVyci5tb3JlIGZvciBkZXRhaWxzJ1xuICApLFxuICBSZXF1ZXN0VGltZW91dDogY3JlYXRlQ3VzdG9tRXJyb3IoXG4gICAgJ1JlcXVlc3RUaW1lb3V0JyxcbiAgICAnUmVxdWVzdCB0aW1lZCBvdXQgYmVmb3JlIGdldHRpbmcgYSByZXNwb25zZSdcbiAgKSxcbiAgTmV0d29yazogY3JlYXRlQ3VzdG9tRXJyb3IoXG4gICAgJ05ldHdvcmsnLFxuICAgICdOZXR3b3JrIGlzc3VlLCBzZWUgZXJyLm1vcmUgZm9yIGRldGFpbHMnXG4gICksXG4gIEpTT05QU2NyaXB0RmFpbDogY3JlYXRlQ3VzdG9tRXJyb3IoXG4gICAgJ0pTT05QU2NyaXB0RmFpbCcsXG4gICAgJzxzY3JpcHQ+IHdhcyBsb2FkZWQgYnV0IGRpZCBub3QgY2FsbCBvdXIgcHJvdmlkZWQgY2FsbGJhY2snXG4gICksXG4gIFZhbGlkVW50aWxOb3RGb3VuZDogY3JlYXRlQ3VzdG9tRXJyb3IoXG4gICAgJ1ZhbGlkVW50aWxOb3RGb3VuZCcsXG4gICAgJ1RoZSBTZWN1cmVkQVBJS2V5IGRvZXMgbm90IGhhdmUgYSB2YWxpZFVudGlsIHBhcmFtZXRlci4nXG4gICksXG4gIEpTT05QU2NyaXB0RXJyb3I6IGNyZWF0ZUN1c3RvbUVycm9yKFxuICAgICdKU09OUFNjcmlwdEVycm9yJyxcbiAgICAnPHNjcmlwdD4gdW5hYmxlIHRvIGxvYWQgZHVlIHRvIGFuIGBlcnJvcmAgZXZlbnQgb24gaXQnXG4gICksXG4gIE9iamVjdE5vdEZvdW5kOiBjcmVhdGVDdXN0b21FcnJvcihcbiAgICAnT2JqZWN0Tm90Rm91bmQnLFxuICAgICdPYmplY3Qgbm90IGZvdW5kJ1xuICApLFxuICBVbmtub3duOiBjcmVhdGVDdXN0b21FcnJvcihcbiAgICAnVW5rbm93bicsXG4gICAgJ1Vua25vd24gZXJyb3Igb2NjdXJlZCdcbiAgKVxufTtcbiIsIi8vIFBhcnNlIGNsb3VkIGRvZXMgbm90IHN1cHBvcnRzIHNldFRpbWVvdXRcbi8vIFdlIGRvIG5vdCBzdG9yZSBhIHNldFRpbWVvdXQgcmVmZXJlbmNlIGluIHRoZSBjbGllbnQgZXZlcnl0aW1lXG4vLyBXZSBvbmx5IGZhbGxiYWNrIHRvIGEgZmFrZSBzZXRUaW1lb3V0IHdoZW4gbm90IGF2YWlsYWJsZVxuLy8gc2V0VGltZW91dCBjYW5ub3QgYmUgb3ZlcnJpZGUgZ2xvYmFsbHkgc2FkbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXhpdFByb21pc2UoZm4sIF9zZXRUaW1lb3V0KSB7XG4gIF9zZXRUaW1lb3V0KGZuLCAwKTtcbn07XG4iLCJ2YXIgZm9yZWFjaCA9IHJlcXVpcmUoJ2ZvcmVhY2gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXAoYXJyLCBmbikge1xuICB2YXIgbmV3QXJyID0gW107XG4gIGZvcmVhY2goYXJyLCBmdW5jdGlvbihpdGVtLCBpdGVtSW5kZXgpIHtcbiAgICBuZXdBcnIucHVzaChmbihpdGVtLCBpdGVtSW5kZXgsIGFycikpO1xuICB9KTtcbiAgcmV0dXJuIG5ld0Fycjtcbn07XG4iLCJ2YXIgZm9yZWFjaCA9IHJlcXVpcmUoJ2ZvcmVhY2gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZShkZXN0aW5hdGlvbi8qICwgc291cmNlcyAqLykge1xuICB2YXIgc291cmNlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgZm9yZWFjaChzb3VyY2VzLCBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICBmb3IgKHZhciBrZXlOYW1lIGluIHNvdXJjZSkge1xuICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXlOYW1lKSkge1xuICAgICAgICBpZiAodHlwZW9mIGRlc3RpbmF0aW9uW2tleU5hbWVdID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygc291cmNlW2tleU5hbWVdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGRlc3RpbmF0aW9uW2tleU5hbWVdID0gbWVyZ2Uoe30sIGRlc3RpbmF0aW9uW2tleU5hbWVdLCBzb3VyY2Vba2V5TmFtZV0pO1xuICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZVtrZXlOYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVzdGluYXRpb25ba2V5TmFtZV0gPSBzb3VyY2Vba2V5TmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0aW5hdGlvbjtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9taXQob2JqLCB0ZXN0KSB7XG4gIHZhciBrZXlzID0gcmVxdWlyZSgnb2JqZWN0LWtleXMnKTtcbiAgdmFyIGZvcmVhY2ggPSByZXF1aXJlKCdmb3JlYWNoJyk7XG5cbiAgdmFyIGZpbHRlcmVkID0ge307XG5cbiAgZm9yZWFjaChrZXlzKG9iaiksIGZ1bmN0aW9uIGRvRmlsdGVyKGtleU5hbWUpIHtcbiAgICBpZiAodGVzdChrZXlOYW1lKSAhPT0gdHJ1ZSkge1xuICAgICAgZmlsdGVyZWRba2V5TmFtZV0gPSBvYmpba2V5TmFtZV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZmlsdGVyZWQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVQbGFjZXNDbGllbnQ7XG5cbnZhciBxczMgPSByZXF1aXJlKCdxdWVyeXN0cmluZy1lczMnKTtcbnZhciBidWlsZFNlYXJjaE1ldGhvZCA9IHJlcXVpcmUoJy4vYnVpbGRTZWFyY2hNZXRob2QuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlUGxhY2VzQ2xpZW50KGFsZ29saWFzZWFyY2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHBsYWNlcyhhcHBJRCwgYXBpS2V5LCBvcHRzKSB7XG4gICAgdmFyIGNsb25lRGVlcCA9IHJlcXVpcmUoJy4vY2xvbmUuanMnKTtcblxuICAgIG9wdHMgPSBvcHRzICYmIGNsb25lRGVlcChvcHRzKSB8fCB7fTtcbiAgICBvcHRzLmhvc3RzID0gb3B0cy5ob3N0cyB8fCBbXG4gICAgICAncGxhY2VzLWRzbi5hbGdvbGlhLm5ldCcsXG4gICAgICAncGxhY2VzLTEuYWxnb2xpYW5ldC5jb20nLFxuICAgICAgJ3BsYWNlcy0yLmFsZ29saWFuZXQuY29tJyxcbiAgICAgICdwbGFjZXMtMy5hbGdvbGlhbmV0LmNvbSdcbiAgICBdO1xuXG4gICAgLy8gYWxsb3cgaW5pdFBsYWNlcygpIG5vIGFyZ3VtZW50cyA9PiBjb21tdW5pdHkgcmF0ZSBsaW1pdGVkXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgdHlwZW9mIGFwcElEID09PSAnb2JqZWN0JyB8fCBhcHBJRCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBhcHBJRCA9ICcnO1xuICAgICAgYXBpS2V5ID0gJyc7XG4gICAgICBvcHRzLl9hbGxvd0VtcHR5Q3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBjbGllbnQgPSBhbGdvbGlhc2VhcmNoKGFwcElELCBhcGlLZXksIG9wdHMpO1xuICAgIHZhciBpbmRleCA9IGNsaWVudC5pbml0SW5kZXgoJ3BsYWNlcycpO1xuICAgIGluZGV4LnNlYXJjaCA9IGJ1aWxkU2VhcmNoTWV0aG9kKCdxdWVyeScsICcvMS9wbGFjZXMvcXVlcnknKTtcbiAgICBpbmRleC5yZXZlcnNlID0gZnVuY3Rpb24ob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgIHZhciBlbmNvZGVkID0gcXMzLmVuY29kZShvcHRpb25zKTtcblxuICAgICAgcmV0dXJuIHRoaXMuYXMuX2pzb25SZXF1ZXN0KHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiAnLzEvcGxhY2VzL3JldmVyc2U/JyArIGVuY29kZWQsXG4gICAgICAgIGhvc3RUeXBlOiAncmVhZCcsXG4gICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGluZGV4LmdldE9iamVjdCA9IGZ1bmN0aW9uKG9iamVjdElELCBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRoaXMuYXMuX2pzb25SZXF1ZXN0KHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiAnLzEvcGxhY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQob2JqZWN0SUQpLFxuICAgICAgICBob3N0VHlwZTogJ3JlYWQnLFxuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIGluZGV4O1xuICB9O1xufVxuIiwidmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnYWxnb2xpYXNlYXJjaDpzcmMvaG9zdEluZGV4U3RhdGUuanMnKTtcbnZhciBsb2NhbFN0b3JhZ2VOYW1lc3BhY2UgPSAnYWxnb2xpYXNlYXJjaC1jbGllbnQtanMnO1xuXG52YXIgc3RvcmU7XG52YXIgbW9kdWxlU3RvcmUgPSB7XG4gIHN0YXRlOiB7fSxcbiAgc2V0OiBmdW5jdGlvbihrZXksIGRhdGEpIHtcbiAgICB0aGlzLnN0YXRlW2tleV0gPSBkYXRhO1xuICAgIHJldHVybiB0aGlzLnN0YXRlW2tleV07XG4gIH0sXG4gIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVba2V5XSB8fCBudWxsO1xuICB9XG59O1xuXG52YXIgbG9jYWxTdG9yYWdlU3RvcmUgPSB7XG4gIHNldDogZnVuY3Rpb24oa2V5LCBkYXRhKSB7XG4gICAgbW9kdWxlU3RvcmUuc2V0KGtleSwgZGF0YSk7IC8vIGFsd2F5cyByZXBsaWNhdGUgbG9jYWxTdG9yYWdlU3RvcmUgdG8gbW9kdWxlU3RvcmUgaW4gY2FzZSBvZiBmYWlsdXJlXG5cbiAgICB0cnkge1xuICAgICAgdmFyIG5hbWVzcGFjZSA9IEpTT04ucGFyc2UoZ2xvYmFsLmxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VOYW1lc3BhY2VdKTtcbiAgICAgIG5hbWVzcGFjZVtrZXldID0gZGF0YTtcbiAgICAgIGdsb2JhbC5sb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlTmFtZXNwYWNlXSA9IEpTT04uc3RyaW5naWZ5KG5hbWVzcGFjZSk7XG4gICAgICByZXR1cm4gbmFtZXNwYWNlW2tleV07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZUZhaWx1cmUoa2V5LCBlKTtcbiAgICB9XG4gIH0sXG4gIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGdsb2JhbC5sb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlTmFtZXNwYWNlXSlba2V5XSB8fCBudWxsO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2VGYWlsdXJlKGtleSwgZSk7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBsb2NhbFN0b3JhZ2VGYWlsdXJlKGtleSwgZSkge1xuICBkZWJ1ZygnbG9jYWxTdG9yYWdlIGZhaWxlZCB3aXRoJywgZSk7XG4gIGNsZWFudXAoKTtcbiAgc3RvcmUgPSBtb2R1bGVTdG9yZTtcbiAgcmV0dXJuIHN0b3JlLmdldChrZXkpO1xufVxuXG5zdG9yZSA9IHN1cHBvcnRzTG9jYWxTdG9yYWdlKCkgPyBsb2NhbFN0b3JhZ2VTdG9yZSA6IG1vZHVsZVN0b3JlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0OiBnZXRPclNldCxcbiAgc2V0OiBnZXRPclNldCxcbiAgc3VwcG9ydHNMb2NhbFN0b3JhZ2U6IHN1cHBvcnRzTG9jYWxTdG9yYWdlXG59O1xuXG5mdW5jdGlvbiBnZXRPclNldChrZXksIGRhdGEpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gc3RvcmUuZ2V0KGtleSk7XG4gIH1cblxuICByZXR1cm4gc3RvcmUuc2V0KGtleSwgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIHN1cHBvcnRzTG9jYWxTdG9yYWdlKCkge1xuICB0cnkge1xuICAgIGlmICgnbG9jYWxTdG9yYWdlJyBpbiBnbG9iYWwgJiZcbiAgICAgIGdsb2JhbC5sb2NhbFN0b3JhZ2UgIT09IG51bGwpIHtcbiAgICAgIGlmICghZ2xvYmFsLmxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VOYW1lc3BhY2VdKSB7XG4gICAgICAgIC8vIGFjdHVhbCBjcmVhdGlvbiBvZiB0aGUgbmFtZXNwYWNlXG4gICAgICAgIGdsb2JhbC5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbFN0b3JhZ2VOYW1lc3BhY2UsIEpTT04uc3RyaW5naWZ5KHt9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gSW4gY2FzZSBvZiBhbnkgZXJyb3Igb24gbG9jYWxTdG9yYWdlLCB3ZSBjbGVhbiBvdXIgb3duIG5hbWVzcGFjZSwgdGhpcyBzaG91bGQgaGFuZGxlXG4vLyBxdW90YSBlcnJvcnMgd2hlbiBhIGxvdCBvZiBrZXlzICsgZGF0YSBhcmUgdXNlZFxuZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgdHJ5IHtcbiAgICBnbG9iYWwubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9jYWxTdG9yYWdlTmFtZXNwYWNlKTtcbiAgfSBjYXRjaCAoXykge1xuICAgIC8vIG5vdGhpbmcgdG8gZG9cbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICczLjM1LjEnO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc3JjL3N0YW5kYWxvbmUvJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzLmpzJyk7XG5cbnZhciBjc3MgPSB7XG4gIHdyYXBwZXI6IHtcbiAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICB9LFxuICBoaW50OiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMCcsXG4gICAgbGVmdDogJzAnLFxuICAgIGJvcmRlckNvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgIGJveFNoYWRvdzogJ25vbmUnLFxuICAgIC8vICM3NDE6IGZpeCBoaW50IG9wYWNpdHkgaXNzdWUgb24gaU9TXG4gICAgb3BhY2l0eTogJzEnXG4gIH0sXG4gIGlucHV0OiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG4gIH0sXG4gIGlucHV0V2l0aE5vSGludDoge1xuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgIHZlcnRpY2FsQWxpZ246ICd0b3AnXG4gIH0sXG4gIGRyb3Bkb3duOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMTAwJScsXG4gICAgbGVmdDogJzAnLFxuICAgIHpJbmRleDogJzEwMCcsXG4gICAgZGlzcGxheTogJ25vbmUnXG4gIH0sXG4gIHN1Z2dlc3Rpb25zOiB7XG4gICAgZGlzcGxheTogJ2Jsb2NrJ1xuICB9LFxuICBzdWdnZXN0aW9uOiB7XG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgY3Vyc29yOiAncG9pbnRlcidcbiAgfSxcbiAgc3VnZ2VzdGlvbkNoaWxkOiB7XG4gICAgd2hpdGVTcGFjZTogJ25vcm1hbCdcbiAgfSxcbiAgbHRyOiB7XG4gICAgbGVmdDogJzAnLFxuICAgIHJpZ2h0OiAnYXV0bydcbiAgfSxcbiAgcnRsOiB7XG4gICAgbGVmdDogJ2F1dG8nLFxuICAgIHJpZ2h0OiAnMCdcbiAgfSxcbiAgZGVmYXVsdENsYXNzZXM6IHtcbiAgICByb290OiAnYWxnb2xpYS1hdXRvY29tcGxldGUnLFxuICAgIHByZWZpeDogJ2FhJyxcbiAgICBub1ByZWZpeDogZmFsc2UsXG4gICAgZHJvcGRvd25NZW51OiAnZHJvcGRvd24tbWVudScsXG4gICAgaW5wdXQ6ICdpbnB1dCcsXG4gICAgaGludDogJ2hpbnQnLFxuICAgIHN1Z2dlc3Rpb25zOiAnc3VnZ2VzdGlvbnMnLFxuICAgIHN1Z2dlc3Rpb246ICdzdWdnZXN0aW9uJyxcbiAgICBjdXJzb3I6ICdjdXJzb3InLFxuICAgIGRhdGFzZXQ6ICdkYXRhc2V0JyxcbiAgICBlbXB0eTogJ2VtcHR5J1xuICB9LFxuICAvLyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZSBkZWZhdWx0IG9uZXMgaWYgYXBwZW5kVG8gaXMgdXNlZFxuICBhcHBlbmRUbzoge1xuICAgIHdyYXBwZXI6IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgekluZGV4OiAnMTAwJyxcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0sXG4gICAgaW5wdXQ6IHt9LFxuICAgIGlucHV0V2l0aE5vSGludDoge30sXG4gICAgZHJvcGRvd246IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICB9XG4gIH1cbn07XG5cbi8vIGllIHNwZWNpZmljIHN0eWxpbmdcbmlmIChfLmlzTXNpZSgpKSB7XG4gIC8vIGllNi04IChhbmQgOT8pIGRvZXNuJ3QgZmlyZSBob3ZlciBhbmQgY2xpY2sgZXZlbnRzIGZvciBlbGVtZW50cyB3aXRoXG4gIC8vIHRyYW5zcGFyZW50IGJhY2tncm91bmRzLCBmb3IgYSB3b3JrYXJvdW5kLCB1c2UgMXgxIHRyYW5zcGFyZW50IGdpZlxuICBfLm1peGluKGNzcy5pbnB1dCwge1xuICAgIGJhY2tncm91bmRJbWFnZTogJ3VybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTcpJ1xuICB9KTtcbn1cblxuLy8gaWU3IGFuZCB1bmRlciBzcGVjaWZpYyBzdHlsaW5nXG5pZiAoXy5pc01zaWUoKSAmJiBfLmlzTXNpZSgpIDw9IDcpIHtcbiAgLy8gaWYgc29tZW9uZSBjYW4gdGVsbCBtZSB3aHkgdGhpcyBpcyBuZWNlc3NhcnkgdG8gYWxpZ25cbiAgLy8gdGhlIGhpbnQgd2l0aCB0aGUgcXVlcnkgaW4gaWU3LCBpJ2xsIHNlbmQgeW91ICQ1IC0gQEpha2VIYXJkaW5nXG4gIF8ubWl4aW4oY3NzLmlucHV0LCB7bWFyZ2luVG9wOiAnLTFweCd9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjc3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkYXRhc2V0S2V5ID0gJ2FhRGF0YXNldCc7XG52YXIgdmFsdWVLZXkgPSAnYWFWYWx1ZSc7XG52YXIgZGF0dW1LZXkgPSAnYWFEYXR1bSc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzLmpzJyk7XG52YXIgRE9NID0gcmVxdWlyZSgnLi4vY29tbW9uL2RvbS5qcycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwuanMnKTtcbnZhciBjc3MgPSByZXF1aXJlKCcuL2Nzcy5qcycpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJy4vZXZlbnRfZW1pdHRlci5qcycpO1xuXG4vLyBjb25zdHJ1Y3RvclxuLy8gLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gRGF0YXNldChvKSB7XG4gIG8gPSBvIHx8IHt9O1xuICBvLnRlbXBsYXRlcyA9IG8udGVtcGxhdGVzIHx8IHt9O1xuXG4gIGlmICghby5zb3VyY2UpIHtcbiAgICBfLmVycm9yKCdtaXNzaW5nIHNvdXJjZScpO1xuICB9XG5cbiAgaWYgKG8ubmFtZSAmJiAhaXNWYWxpZE5hbWUoby5uYW1lKSkge1xuICAgIF8uZXJyb3IoJ2ludmFsaWQgZGF0YXNldCBuYW1lOiAnICsgby5uYW1lKTtcbiAgfVxuXG4gIC8vIHRyYWNrcyB0aGUgbGFzdCBxdWVyeSB0aGUgZGF0YXNldCB3YXMgdXBkYXRlZCBmb3JcbiAgdGhpcy5xdWVyeSA9IG51bGw7XG4gIHRoaXMuX2lzRW1wdHkgPSB0cnVlO1xuXG4gIHRoaXMuaGlnaGxpZ2h0ID0gISFvLmhpZ2hsaWdodDtcbiAgdGhpcy5uYW1lID0gdHlwZW9mIG8ubmFtZSA9PT0gJ3VuZGVmaW5lZCcgfHwgby5uYW1lID09PSBudWxsID8gXy5nZXRVbmlxdWVJZCgpIDogby5uYW1lO1xuXG4gIHRoaXMuc291cmNlID0gby5zb3VyY2U7XG4gIHRoaXMuZGlzcGxheUZuID0gZ2V0RGlzcGxheUZuKG8uZGlzcGxheSB8fCBvLmRpc3BsYXlLZXkpO1xuXG4gIHRoaXMuZGVib3VuY2UgPSBvLmRlYm91bmNlO1xuXG4gIHRoaXMuY2FjaGUgPSBvLmNhY2hlICE9PSBmYWxzZTtcblxuICB0aGlzLnRlbXBsYXRlcyA9IGdldFRlbXBsYXRlcyhvLnRlbXBsYXRlcywgdGhpcy5kaXNwbGF5Rm4pO1xuXG4gIHRoaXMuY3NzID0gXy5taXhpbih7fSwgY3NzLCBvLmFwcGVuZFRvID8gY3NzLmFwcGVuZFRvIDoge30pO1xuICB0aGlzLmNzc0NsYXNzZXMgPSBvLmNzc0NsYXNzZXMgPSBfLm1peGluKHt9LCBjc3MuZGVmYXVsdENsYXNzZXMsIG8uY3NzQ2xhc3NlcyB8fCB7fSk7XG4gIHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXggPVxuICAgIG8uY3NzQ2xhc3Nlcy5mb3JtYXR0ZWRQcmVmaXggfHwgXy5mb3JtYXRQcmVmaXgodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLm5vUHJlZml4KTtcblxuICB2YXIgY2xhenogPSBfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuZGF0YXNldCk7XG4gIHRoaXMuJGVsID0gby4kbWVudSAmJiBvLiRtZW51LmZpbmQoY2xhenogKyAnLScgKyB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgP1xuICAgIERPTS5lbGVtZW50KG8uJG1lbnUuZmluZChjbGF6eiArICctJyArIHRoaXMubmFtZSlbMF0pIDpcbiAgICBET00uZWxlbWVudChcbiAgICAgIGh0bWwuZGF0YXNldC5yZXBsYWNlKCclQ0xBU1MlJywgdGhpcy5uYW1lKVxuICAgICAgICAucmVwbGFjZSgnJVBSRUZJWCUnLCB0aGlzLmNzc0NsYXNzZXMucHJlZml4KVxuICAgICAgICAucmVwbGFjZSgnJURBVEFTRVQlJywgdGhpcy5jc3NDbGFzc2VzLmRhdGFzZXQpXG4gICAgKTtcblxuICB0aGlzLiRtZW51ID0gby4kbWVudTtcbiAgdGhpcy5jbGVhckNhY2hlZFN1Z2dlc3Rpb25zKCk7XG59XG5cbi8vIHN0YXRpYyBtZXRob2RzXG4vLyAtLS0tLS0tLS0tLS0tLVxuXG5EYXRhc2V0LmV4dHJhY3REYXRhc2V0TmFtZSA9IGZ1bmN0aW9uIGV4dHJhY3REYXRhc2V0TmFtZShlbCkge1xuICByZXR1cm4gRE9NLmVsZW1lbnQoZWwpLmRhdGEoZGF0YXNldEtleSk7XG59O1xuXG5EYXRhc2V0LmV4dHJhY3RWYWx1ZSA9IGZ1bmN0aW9uIGV4dHJhY3RWYWx1ZShlbCkge1xuICByZXR1cm4gRE9NLmVsZW1lbnQoZWwpLmRhdGEodmFsdWVLZXkpO1xufTtcblxuRGF0YXNldC5leHRyYWN0RGF0dW0gPSBmdW5jdGlvbiBleHRyYWN0RGF0dW0oZWwpIHtcbiAgdmFyIGRhdHVtID0gRE9NLmVsZW1lbnQoZWwpLmRhdGEoZGF0dW1LZXkpO1xuICBpZiAodHlwZW9mIGRhdHVtID09PSAnc3RyaW5nJykge1xuICAgIC8vIFplcHRvIGhhcyBhbiBhdXRvbWF0aWMgZGVzZXJpYWxpemF0aW9uIG9mIHRoZVxuICAgIC8vIEpTT04gZW5jb2RlZCBkYXRhIGF0dHJpYnV0ZVxuICAgIGRhdHVtID0gSlNPTi5wYXJzZShkYXR1bSk7XG4gIH1cbiAgcmV0dXJuIGRhdHVtO1xufTtcblxuLy8gaW5zdGFuY2UgbWV0aG9kc1xuLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG5fLm1peGluKERhdGFzZXQucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIsIHtcblxuICAvLyAjIyMgcHJpdmF0ZVxuXG4gIF9yZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcihxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICBpZiAoIXRoaXMuJGVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgIHZhciBoYXNTdWdnZXN0aW9ucztcbiAgICB2YXIgcmVuZGVyQXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB0aGlzLiRlbC5lbXB0eSgpO1xuXG4gICAgaGFzU3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucyAmJiBzdWdnZXN0aW9ucy5sZW5ndGg7XG4gICAgdGhpcy5faXNFbXB0eSA9ICFoYXNTdWdnZXN0aW9ucztcblxuICAgIGlmICghaGFzU3VnZ2VzdGlvbnMgJiYgdGhpcy50ZW1wbGF0ZXMuZW1wdHkpIHtcbiAgICAgIHRoaXMuJGVsXG4gICAgICAgIC5odG1sKGdldEVtcHR5SHRtbC5hcHBseSh0aGlzLCByZW5kZXJBcmdzKSlcbiAgICAgICAgLnByZXBlbmQodGhhdC50ZW1wbGF0ZXMuaGVhZGVyID8gZ2V0SGVhZGVySHRtbC5hcHBseSh0aGlzLCByZW5kZXJBcmdzKSA6IG51bGwpXG4gICAgICAgIC5hcHBlbmQodGhhdC50ZW1wbGF0ZXMuZm9vdGVyID8gZ2V0Rm9vdGVySHRtbC5hcHBseSh0aGlzLCByZW5kZXJBcmdzKSA6IG51bGwpO1xuICAgIH0gZWxzZSBpZiAoaGFzU3VnZ2VzdGlvbnMpIHtcbiAgICAgIHRoaXMuJGVsXG4gICAgICAgIC5odG1sKGdldFN1Z2dlc3Rpb25zSHRtbC5hcHBseSh0aGlzLCByZW5kZXJBcmdzKSlcbiAgICAgICAgLnByZXBlbmQodGhhdC50ZW1wbGF0ZXMuaGVhZGVyID8gZ2V0SGVhZGVySHRtbC5hcHBseSh0aGlzLCByZW5kZXJBcmdzKSA6IG51bGwpXG4gICAgICAgIC5hcHBlbmQodGhhdC50ZW1wbGF0ZXMuZm9vdGVyID8gZ2V0Rm9vdGVySHRtbC5hcHBseSh0aGlzLCByZW5kZXJBcmdzKSA6IG51bGwpO1xuICAgIH0gZWxzZSBpZiAoc3VnZ2VzdGlvbnMgJiYgIUFycmF5LmlzQXJyYXkoc3VnZ2VzdGlvbnMpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzdWdnZXN0aW9ucyBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJG1lbnUpIHtcbiAgICAgIHRoaXMuJG1lbnUuYWRkQ2xhc3MoXG4gICAgICAgIHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXggKyAoaGFzU3VnZ2VzdGlvbnMgPyAnd2l0aCcgOiAnd2l0aG91dCcpICsgJy0nICsgdGhpcy5uYW1lXG4gICAgICApLnJlbW92ZUNsYXNzKFxuICAgICAgICB0aGlzLmNzc0NsYXNzZXMucHJlZml4ICsgKGhhc1N1Z2dlc3Rpb25zID8gJ3dpdGhvdXQnIDogJ3dpdGgnKSArICctJyArIHRoaXMubmFtZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnRyaWdnZXIoJ3JlbmRlcmVkJywgcXVlcnkpO1xuXG4gICAgZnVuY3Rpb24gZ2V0RW1wdHlIdG1sKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICBhcmdzID0gW3txdWVyeTogcXVlcnksIGlzRW1wdHk6IHRydWV9XS5jb25jYXQoYXJncyk7XG4gICAgICByZXR1cm4gdGhhdC50ZW1wbGF0ZXMuZW1wdHkuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3VnZ2VzdGlvbnNIdG1sKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICB2YXIgJHN1Z2dlc3Rpb25zO1xuICAgICAgdmFyIG5vZGVzO1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICB2YXIgc3VnZ2VzdGlvbnNIdG1sID0gaHRtbC5zdWdnZXN0aW9ucy5cbiAgICAgICAgcmVwbGFjZSgnJVBSRUZJWCUnLCB0aGlzLmNzc0NsYXNzZXMucHJlZml4KS5cbiAgICAgICAgcmVwbGFjZSgnJVNVR0dFU1RJT05TJScsIHRoaXMuY3NzQ2xhc3Nlcy5zdWdnZXN0aW9ucyk7XG4gICAgICAkc3VnZ2VzdGlvbnMgPSBET01cbiAgICAgICAgLmVsZW1lbnQoc3VnZ2VzdGlvbnNIdG1sKVxuICAgICAgICAuY3NzKHRoaXMuY3NzLnN1Z2dlc3Rpb25zKTtcblxuICAgICAgLy8galF1ZXJ5I2FwcGVuZCBkb2Vzbid0IHN1cHBvcnQgYXJyYXlzIGFzIHRoZSBmaXJzdCBhcmd1bWVudFxuICAgICAgLy8gdW50aWwgdmVyc2lvbiAxLjgsIHNlZSBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMTIzMVxuICAgICAgbm9kZXMgPSBfLm1hcChzdWdnZXN0aW9ucywgZ2V0U3VnZ2VzdGlvbk5vZGUpO1xuICAgICAgJHN1Z2dlc3Rpb25zLmFwcGVuZC5hcHBseSgkc3VnZ2VzdGlvbnMsIG5vZGVzKTtcblxuICAgICAgcmV0dXJuICRzdWdnZXN0aW9ucztcblxuICAgICAgZnVuY3Rpb24gZ2V0U3VnZ2VzdGlvbk5vZGUoc3VnZ2VzdGlvbikge1xuICAgICAgICB2YXIgJGVsO1xuXG4gICAgICAgIHZhciBzdWdnZXN0aW9uSHRtbCA9IGh0bWwuc3VnZ2VzdGlvbi5cbiAgICAgICAgICByZXBsYWNlKCclUFJFRklYJScsIHNlbGYuY3NzQ2xhc3Nlcy5wcmVmaXgpLlxuICAgICAgICAgIHJlcGxhY2UoJyVTVUdHRVNUSU9OJScsIHNlbGYuY3NzQ2xhc3Nlcy5zdWdnZXN0aW9uKTtcbiAgICAgICAgJGVsID0gRE9NLmVsZW1lbnQoc3VnZ2VzdGlvbkh0bWwpXG4gICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgcm9sZTogJ29wdGlvbicsXG4gICAgICAgICAgICBpZDogWydvcHRpb24nLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApXS5qb2luKCctJylcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hcHBlbmQodGhhdC50ZW1wbGF0ZXMuc3VnZ2VzdGlvbi5hcHBseSh0aGlzLCBbc3VnZ2VzdGlvbl0uY29uY2F0KGFyZ3MpKSk7XG5cbiAgICAgICAgJGVsLmRhdGEoZGF0YXNldEtleSwgdGhhdC5uYW1lKTtcbiAgICAgICAgJGVsLmRhdGEodmFsdWVLZXksIHRoYXQuZGlzcGxheUZuKHN1Z2dlc3Rpb24pIHx8IHVuZGVmaW5lZCk7IC8vIHRoaXMgbGVkIHRvIHVuZGVmaW5lZCByZXR1cm4gdmFsdWVcbiAgICAgICAgJGVsLmRhdGEoZGF0dW1LZXksIEpTT04uc3RyaW5naWZ5KHN1Z2dlc3Rpb24pKTtcbiAgICAgICAgJGVsLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbigpIHsgRE9NLmVsZW1lbnQodGhpcykuY3NzKHNlbGYuY3NzLnN1Z2dlc3Rpb25DaGlsZCk7IH0pO1xuXG4gICAgICAgIHJldHVybiAkZWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGVySHRtbCgpIHtcbiAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgYXJncyA9IFt7cXVlcnk6IHF1ZXJ5LCBpc0VtcHR5OiAhaGFzU3VnZ2VzdGlvbnN9XS5jb25jYXQoYXJncyk7XG4gICAgICByZXR1cm4gdGhhdC50ZW1wbGF0ZXMuaGVhZGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZvb3Rlckh0bWwoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgIGFyZ3MgPSBbe3F1ZXJ5OiBxdWVyeSwgaXNFbXB0eTogIWhhc1N1Z2dlc3Rpb25zfV0uY29uY2F0KGFyZ3MpO1xuICAgICAgcmV0dXJuIHRoYXQudGVtcGxhdGVzLmZvb3Rlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gIyMjIHB1YmxpY1xuXG4gIGdldFJvb3Q6IGZ1bmN0aW9uIGdldFJvb3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHF1ZXJ5KSB7XG4gICAgZnVuY3Rpb24gaGFuZGxlU3VnZ2VzdGlvbnMoc3VnZ2VzdGlvbnMpIHtcbiAgICAgIC8vIGlmIHRoZSB1cGRhdGUgaGFzIGJlZW4gY2FuY2VsZWQgb3IgaWYgdGhlIHF1ZXJ5IGhhcyBjaGFuZ2VkXG4gICAgICAvLyBkbyBub3QgcmVuZGVyIHRoZSBzdWdnZXN0aW9ucyBhcyB0aGV5J3ZlIGJlY29tZSBvdXRkYXRlZFxuICAgICAgaWYgKCF0aGlzLmNhbmNlbGVkICYmIHF1ZXJ5ID09PSB0aGlzLnF1ZXJ5KSB7XG4gICAgICAgIC8vIGNvbmNhdCBhbGwgdGhlIG90aGVyIGFyZ3VtZW50cyB0aGF0IGNvdWxkIGhhdmUgYmVlbiBwYXNzZWRcbiAgICAgICAgLy8gdG8gdGhlIHJlbmRlciBmdW5jdGlvbiwgYW5kIGZvcndhcmQgdGhlbSB0byBfcmVuZGVyXG4gICAgICAgIHZhciBleHRyYUFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHRoaXMuY2FjaGVTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMsIGV4dHJhQXJncyk7XG4gICAgICAgIHRoaXMuX3JlbmRlci5hcHBseSh0aGlzLCBbcXVlcnksIHN1Z2dlc3Rpb25zXS5jb25jYXQoZXh0cmFBcmdzKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuICAgIHRoaXMuY2FuY2VsZWQgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnNob3VsZEZldGNoRnJvbUNhY2hlKHF1ZXJ5KSkge1xuICAgICAgaGFuZGxlU3VnZ2VzdGlvbnMuYXBwbHkodGhpcywgW3RoaXMuY2FjaGVkU3VnZ2VzdGlvbnNdLmNvbmNhdCh0aGlzLmNhY2hlZFJlbmRlckV4dHJhQXJncykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgZXhlY1NvdXJjZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBXaGVuIHRoZSBjYWxsIGlzIGRlYm91bmNlZCB0aGUgY29uZGl0aW9uIGF2b2lkIHRvIGRvIGEgdXNlbGVzc1xuICAgICAgICAvLyByZXF1ZXN0IHdpdGggdGhlIGxhc3QgY2hhcmFjdGVyIHdoZW4gdGhlIGlucHV0IGhhcyBiZWVuIGNsZWFyZWRcbiAgICAgICAgaWYgKCF0aGF0LmNhbmNlbGVkKSB7XG4gICAgICAgICAgdGhhdC5zb3VyY2UocXVlcnksIGhhbmRsZVN1Z2dlc3Rpb25zLmJpbmQodGhhdCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5kZWJvdW5jZSkge1xuICAgICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGF0LmRlYm91bmNlVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgZXhlY1NvdXJjZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kZWJvdW5jZVRpbWVvdXQpO1xuICAgICAgICB0aGlzLmRlYm91bmNlVGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHRoaXMuZGVib3VuY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhlY1NvdXJjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjYWNoZVN1Z2dlc3Rpb25zOiBmdW5jdGlvbiBjYWNoZVN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucywgZXh0cmFBcmdzKSB7XG4gICAgdGhpcy5jYWNoZWRRdWVyeSA9IHF1ZXJ5O1xuICAgIHRoaXMuY2FjaGVkU3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucztcbiAgICB0aGlzLmNhY2hlZFJlbmRlckV4dHJhQXJncyA9IGV4dHJhQXJncztcbiAgfSxcblxuICBzaG91bGRGZXRjaEZyb21DYWNoZTogZnVuY3Rpb24gc2hvdWxkRmV0Y2hGcm9tQ2FjaGUocXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZSAmJlxuICAgICAgdGhpcy5jYWNoZWRRdWVyeSA9PT0gcXVlcnkgJiZcbiAgICAgIHRoaXMuY2FjaGVkU3VnZ2VzdGlvbnMgJiZcbiAgICAgIHRoaXMuY2FjaGVkU3VnZ2VzdGlvbnMubGVuZ3RoO1xuICB9LFxuXG4gIGNsZWFyQ2FjaGVkU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIGNsZWFyQ2FjaGVkU3VnZ2VzdGlvbnMoKSB7XG4gICAgZGVsZXRlIHRoaXMuY2FjaGVkUXVlcnk7XG4gICAgZGVsZXRlIHRoaXMuY2FjaGVkU3VnZ2VzdGlvbnM7XG4gICAgZGVsZXRlIHRoaXMuY2FjaGVkUmVuZGVyRXh0cmFBcmdzO1xuICB9LFxuXG4gIGNhbmNlbDogZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHRoaXMuY2FuY2VsZWQgPSB0cnVlO1xuICB9LFxuXG4gIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICBpZiAodGhpcy4kZWwpIHtcbiAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICB0aGlzLiRlbC5lbXB0eSgpO1xuICAgICAgdGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcsICcnKTtcbiAgICB9XG4gIH0sXG5cbiAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNFbXB0eTtcbiAgfSxcblxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHRoaXMuY2xlYXJDYWNoZWRTdWdnZXN0aW9ucygpO1xuICAgIHRoaXMuJGVsID0gbnVsbDtcbiAgfVxufSk7XG5cbi8vIGhlbHBlciBmdW5jdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheUZuKGRpc3BsYXkpIHtcbiAgZGlzcGxheSA9IGRpc3BsYXkgfHwgJ3ZhbHVlJztcblxuICByZXR1cm4gXy5pc0Z1bmN0aW9uKGRpc3BsYXkpID8gZGlzcGxheSA6IGRpc3BsYXlGbjtcblxuICBmdW5jdGlvbiBkaXNwbGF5Rm4ob2JqKSB7XG4gICAgcmV0dXJuIG9ialtkaXNwbGF5XTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUZW1wbGF0ZXModGVtcGxhdGVzLCBkaXNwbGF5Rm4pIHtcbiAgcmV0dXJuIHtcbiAgICBlbXB0eTogdGVtcGxhdGVzLmVtcHR5ICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMuZW1wdHkpLFxuICAgIGhlYWRlcjogdGVtcGxhdGVzLmhlYWRlciAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLmhlYWRlciksXG4gICAgZm9vdGVyOiB0ZW1wbGF0ZXMuZm9vdGVyICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMuZm9vdGVyKSxcbiAgICBzdWdnZXN0aW9uOiB0ZW1wbGF0ZXMuc3VnZ2VzdGlvbiB8fCBzdWdnZXN0aW9uVGVtcGxhdGVcbiAgfTtcblxuICBmdW5jdGlvbiBzdWdnZXN0aW9uVGVtcGxhdGUoY29udGV4dCkge1xuICAgIHJldHVybiAnPHA+JyArIGRpc3BsYXlGbihjb250ZXh0KSArICc8L3A+JztcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkTmFtZShzdHIpIHtcbiAgLy8gZGFzaGVzLCB1bmRlcnNjb3JlcywgbGV0dGVycywgYW5kIG51bWJlcnNcbiAgcmV0dXJuICgvXltfYS16QS1aMC05LV0rJC8pLnRlc3Qoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhc2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscy5qcycpO1xudmFyIERPTSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9kb20uanMnKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL2V2ZW50X2VtaXR0ZXIuanMnKTtcbnZhciBEYXRhc2V0ID0gcmVxdWlyZSgnLi9kYXRhc2V0LmpzJyk7XG52YXIgY3NzID0gcmVxdWlyZSgnLi9jc3MuanMnKTtcblxuLy8gY29uc3RydWN0b3Jcbi8vIC0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIERyb3Bkb3duKG8pIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgb25TdWdnZXN0aW9uQ2xpY2s7XG4gIHZhciBvblN1Z2dlc3Rpb25Nb3VzZUVudGVyO1xuICB2YXIgb25TdWdnZXN0aW9uTW91c2VMZWF2ZTtcblxuICBvID0gbyB8fCB7fTtcblxuICBpZiAoIW8ubWVudSkge1xuICAgIF8uZXJyb3IoJ21lbnUgaXMgcmVxdWlyZWQnKTtcbiAgfVxuXG4gIGlmICghXy5pc0FycmF5KG8uZGF0YXNldHMpICYmICFfLmlzT2JqZWN0KG8uZGF0YXNldHMpKSB7XG4gICAgXy5lcnJvcignMSBvciBtb3JlIGRhdGFzZXRzIHJlcXVpcmVkJyk7XG4gIH1cbiAgaWYgKCFvLmRhdGFzZXRzKSB7XG4gICAgXy5lcnJvcignZGF0YXNldHMgaXMgcmVxdWlyZWQnKTtcbiAgfVxuXG4gIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gIHRoaXMuaXNFbXB0eSA9IHRydWU7XG4gIHRoaXMubWluTGVuZ3RoID0gby5taW5MZW5ndGggfHwgMDtcbiAgdGhpcy50ZW1wbGF0ZXMgPSB7fTtcbiAgdGhpcy5hcHBlbmRUbyA9IG8uYXBwZW5kVG8gfHwgZmFsc2U7XG4gIHRoaXMuY3NzID0gXy5taXhpbih7fSwgY3NzLCBvLmFwcGVuZFRvID8gY3NzLmFwcGVuZFRvIDoge30pO1xuICB0aGlzLmNzc0NsYXNzZXMgPSBvLmNzc0NsYXNzZXMgPSBfLm1peGluKHt9LCBjc3MuZGVmYXVsdENsYXNzZXMsIG8uY3NzQ2xhc3NlcyB8fCB7fSk7XG4gIHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXggPVxuICAgIG8uY3NzQ2xhc3Nlcy5mb3JtYXR0ZWRQcmVmaXggfHwgXy5mb3JtYXRQcmVmaXgodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLm5vUHJlZml4KTtcblxuICAvLyBib3VuZCBmdW5jdGlvbnNcbiAgb25TdWdnZXN0aW9uQ2xpY2sgPSBfLmJpbmQodGhpcy5fb25TdWdnZXN0aW9uQ2xpY2ssIHRoaXMpO1xuICBvblN1Z2dlc3Rpb25Nb3VzZUVudGVyID0gXy5iaW5kKHRoaXMuX29uU3VnZ2VzdGlvbk1vdXNlRW50ZXIsIHRoaXMpO1xuICBvblN1Z2dlc3Rpb25Nb3VzZUxlYXZlID0gXy5iaW5kKHRoaXMuX29uU3VnZ2VzdGlvbk1vdXNlTGVhdmUsIHRoaXMpO1xuXG4gIHZhciBjc3NDbGFzcyA9IF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5zdWdnZXN0aW9uKTtcbiAgdGhpcy4kbWVudSA9IERPTS5lbGVtZW50KG8ubWVudSlcbiAgICAub24oJ21vdXNlZW50ZXIuYWEnLCBjc3NDbGFzcywgb25TdWdnZXN0aW9uTW91c2VFbnRlcilcbiAgICAub24oJ21vdXNlbGVhdmUuYWEnLCBjc3NDbGFzcywgb25TdWdnZXN0aW9uTW91c2VMZWF2ZSlcbiAgICAub24oJ2NsaWNrLmFhJywgY3NzQ2xhc3MsIG9uU3VnZ2VzdGlvbkNsaWNrKTtcblxuICB0aGlzLiRjb250YWluZXIgPSBvLmFwcGVuZFRvID8gby53cmFwcGVyIDogdGhpcy4kbWVudTtcblxuICBpZiAoby50ZW1wbGF0ZXMgJiYgby50ZW1wbGF0ZXMuaGVhZGVyKSB7XG4gICAgdGhpcy50ZW1wbGF0ZXMuaGVhZGVyID0gXy50ZW1wbGF0aWZ5KG8udGVtcGxhdGVzLmhlYWRlcik7XG4gICAgdGhpcy4kbWVudS5wcmVwZW5kKHRoaXMudGVtcGxhdGVzLmhlYWRlcigpKTtcbiAgfVxuXG4gIGlmIChvLnRlbXBsYXRlcyAmJiBvLnRlbXBsYXRlcy5lbXB0eSkge1xuICAgIHRoaXMudGVtcGxhdGVzLmVtcHR5ID0gXy50ZW1wbGF0aWZ5KG8udGVtcGxhdGVzLmVtcHR5KTtcbiAgICB0aGlzLiRlbXB0eSA9IERPTS5lbGVtZW50KCc8ZGl2IGNsYXNzPVwiJyArXG4gICAgICBfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuZW1wdHksIHRydWUpICsgJ1wiPicgK1xuICAgICAgJzwvZGl2PicpO1xuICAgIHRoaXMuJG1lbnUuYXBwZW5kKHRoaXMuJGVtcHR5KTtcbiAgICB0aGlzLiRlbXB0eS5oaWRlKCk7XG4gIH1cblxuICB0aGlzLmRhdGFzZXRzID0gXy5tYXAoby5kYXRhc2V0cywgZnVuY3Rpb24ob0RhdGFzZXQpIHtcbiAgICByZXR1cm4gaW5pdGlhbGl6ZURhdGFzZXQodGhhdC4kbWVudSwgb0RhdGFzZXQsIG8uY3NzQ2xhc3Nlcyk7XG4gIH0pO1xuICBfLmVhY2godGhpcy5kYXRhc2V0cywgZnVuY3Rpb24oZGF0YXNldCkge1xuICAgIHZhciByb290ID0gZGF0YXNldC5nZXRSb290KCk7XG4gICAgaWYgKHJvb3QgJiYgcm9vdC5wYXJlbnQoKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoYXQuJG1lbnUuYXBwZW5kKHJvb3QpO1xuICAgIH1cbiAgICBkYXRhc2V0Lm9uU3luYygncmVuZGVyZWQnLCB0aGF0Ll9vblJlbmRlcmVkLCB0aGF0KTtcbiAgfSk7XG5cbiAgaWYgKG8udGVtcGxhdGVzICYmIG8udGVtcGxhdGVzLmZvb3Rlcikge1xuICAgIHRoaXMudGVtcGxhdGVzLmZvb3RlciA9IF8udGVtcGxhdGlmeShvLnRlbXBsYXRlcy5mb290ZXIpO1xuICAgIHRoaXMuJG1lbnUuYXBwZW5kKHRoaXMudGVtcGxhdGVzLmZvb3RlcigpKTtcbiAgfVxuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgRE9NLmVsZW1lbnQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5fcmVkcmF3KCk7XG4gIH0pO1xufVxuXG4vLyBpbnN0YW5jZSBtZXRob2RzXG4vLyAtLS0tLS0tLS0tLS0tLS0tXG5cbl8ubWl4aW4oRHJvcGRvd24ucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIsIHtcblxuICAvLyAjIyMgcHJpdmF0ZVxuXG4gIF9vblN1Z2dlc3Rpb25DbGljazogZnVuY3Rpb24gb25TdWdnZXN0aW9uQ2xpY2soJGUpIHtcbiAgICB0aGlzLnRyaWdnZXIoJ3N1Z2dlc3Rpb25DbGlja2VkJywgRE9NLmVsZW1lbnQoJGUuY3VycmVudFRhcmdldCkpO1xuICB9LFxuXG4gIF9vblN1Z2dlc3Rpb25Nb3VzZUVudGVyOiBmdW5jdGlvbiBvblN1Z2dlc3Rpb25Nb3VzZUVudGVyKCRlKSB7XG4gICAgdmFyIGVsdCA9IERPTS5lbGVtZW50KCRlLmN1cnJlbnRUYXJnZXQpO1xuICAgIGlmIChlbHQuaGFzQ2xhc3MoXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLmN1cnNvciwgdHJ1ZSkpKSB7XG4gICAgICAvLyB3ZSdyZSBhbHJlYWR5IG9uIHRoZSBjdXJzb3JcbiAgICAgIC8vID0+IHdlJ3JlIHByb2JhYmx5IGVudGVyaW5nIGl0IGFnYWluIGFmdGVyIGxlYXZpbmcgaXQgZm9yIGEgbmVzdGVkIGRpdlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVDdXJzb3IoKTtcblxuICAgIC8vIEZpeGVzIGlPUyBkb3VibGUgdGFwIGJlaGF2aW91ciwgYnkgbW9kaWZ5aW5nIHRoZSBET00gcmlnaHQgYmVmb3JlIHRoZVxuICAgIC8vIG5hdGl2ZSBocmVmIGNsaWNrcyBoYXBwZW5zLCBpT1Mgd2lsbCByZXF1aXJlcyBhbm90aGVyIHRhcCB0byBmb2xsb3dcbiAgICAvLyBhIHN1Z2dlc3Rpb24gdGhhdCBoYXMgYW4gPGEgaHJlZj4gZWxlbWVudCBpbnNpZGVcbiAgICAvLyBodHRwczovL3d3dy5nb29nbGUuY29tL3NlYXJjaD9xPWlvcytkb3VibGUrdGFwK2J1ZytocmVmXG4gICAgdmFyIHN1Z2dlc3Rpb24gPSB0aGlzO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAvLyB0aGlzIGV4YWN0IGxpbmUsIHdoZW4gaW5zaWRlIHRoZSBtYWluIGxvb3AsIHdpbGwgdHJpZ2dlciBhIGRvdWJsZSB0YXAgYnVnXG4gICAgICAvLyBvbiBpT1MgZGV2aWNlc1xuICAgICAgc3VnZ2VzdGlvbi5fc2V0Q3Vyc29yKGVsdCwgZmFsc2UpO1xuICAgIH0sIDApO1xuICB9LFxuXG4gIF9vblN1Z2dlc3Rpb25Nb3VzZUxlYXZlOiBmdW5jdGlvbiBvblN1Z2dlc3Rpb25Nb3VzZUxlYXZlKCRlKSB7XG4gICAgLy8gJGUucmVsYXRlZFRhcmdldCBpcyB0aGUgYEV2ZW50VGFyZ2V0YCB0aGUgcG9pbnRpbmcgZGV2aWNlIGVudGVyZWQgdG9cbiAgICBpZiAoJGUucmVsYXRlZFRhcmdldCkge1xuICAgICAgdmFyIGVsdCA9IERPTS5lbGVtZW50KCRlLnJlbGF0ZWRUYXJnZXQpO1xuICAgICAgaWYgKGVsdC5jbG9zZXN0KCcuJyArIF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5jdXJzb3IsIHRydWUpKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIG91ciBmYXRoZXIgaXMgYSBjdXJzb3JcbiAgICAgICAgLy8gPT4gaXQgbWVhbnMgd2UncmUganVzdCBsZWF2aW5nIHRoZSBzdWdnZXN0aW9uIGZvciBhIG5lc3RlZCBkaXZcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVDdXJzb3IoKTtcbiAgICB0aGlzLnRyaWdnZXIoJ2N1cnNvclJlbW92ZWQnKTtcbiAgfSxcblxuICBfb25SZW5kZXJlZDogZnVuY3Rpb24gb25SZW5kZXJlZChlLCBxdWVyeSkge1xuICAgIHRoaXMuaXNFbXB0eSA9IF8uZXZlcnkodGhpcy5kYXRhc2V0cywgaXNEYXRhc2V0RW1wdHkpO1xuXG4gICAgaWYgKHRoaXMuaXNFbXB0eSkge1xuICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ2VtcHR5Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLiRlbXB0eSkge1xuICAgICAgICBpZiAocXVlcnkubGVuZ3RoIDwgdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGh0bWwgPSB0aGlzLnRlbXBsYXRlcy5lbXB0eSh7XG4gICAgICAgICAgICBxdWVyeTogdGhpcy5kYXRhc2V0c1swXSAmJiB0aGlzLmRhdGFzZXRzWzBdLnF1ZXJ5XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy4kZW1wdHkuaHRtbChodG1sKTtcbiAgICAgICAgICB0aGlzLiRlbXB0eS5zaG93KCk7XG4gICAgICAgICAgdGhpcy5fc2hvdygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKF8uYW55KHRoaXMuZGF0YXNldHMsIGhhc0VtcHR5VGVtcGxhdGUpKSB7XG4gICAgICAgIGlmIChxdWVyeS5sZW5ndGggPCB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICBpZiAodGhpcy4kZW1wdHkpIHtcbiAgICAgICAgdGhpcy4kZW1wdHkuZW1wdHkoKTtcbiAgICAgICAgdGhpcy4kZW1wdHkuaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAocXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Nob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRyaWdnZXIoJ2RhdGFzZXRSZW5kZXJlZCcpO1xuXG4gICAgZnVuY3Rpb24gaXNEYXRhc2V0RW1wdHkoZGF0YXNldCkge1xuICAgICAgcmV0dXJuIGRhdGFzZXQuaXNFbXB0eSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc0VtcHR5VGVtcGxhdGUoZGF0YXNldCkge1xuICAgICAgcmV0dXJuIGRhdGFzZXQudGVtcGxhdGVzICYmIGRhdGFzZXQudGVtcGxhdGVzLmVtcHR5O1xuICAgIH1cbiAgfSxcblxuICBfaGlkZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kY29udGFpbmVyLmhpZGUoKTtcbiAgfSxcblxuICBfc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgLy8gY2FuJ3QgdXNlIGpRdWVyeSNzaG93IGJlY2F1c2UgJG1lbnUgaXMgYSBzcGFuIGVsZW1lbnQgd2Ugd2FudFxuICAgIC8vIGRpc3BsYXk6IGJsb2NrOyBub3QgZGlzbGF5OiBpbmxpbmU7XG4gICAgdGhpcy4kY29udGFpbmVyLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgdGhpcy5fcmVkcmF3KCk7XG5cbiAgICB0aGlzLnRyaWdnZXIoJ3Nob3duJyk7XG4gIH0sXG5cbiAgX3JlZHJhdzogZnVuY3Rpb24gcmVkcmF3KCkge1xuICAgIGlmICghdGhpcy5pc09wZW4gfHwgIXRoaXMuYXBwZW5kVG8pIHJldHVybjtcblxuICAgIHRoaXMudHJpZ2dlcigncmVkcmF3bicpO1xuICB9LFxuXG4gIF9nZXRTdWdnZXN0aW9uczogZnVuY3Rpb24gZ2V0U3VnZ2VzdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuJG1lbnUuZmluZChfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuc3VnZ2VzdGlvbikpO1xuICB9LFxuXG4gIF9nZXRDdXJzb3I6IGZ1bmN0aW9uIGdldEN1cnNvcigpIHtcbiAgICByZXR1cm4gdGhpcy4kbWVudS5maW5kKF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5jdXJzb3IpKS5maXJzdCgpO1xuICB9LFxuXG4gIF9zZXRDdXJzb3I6IGZ1bmN0aW9uIHNldEN1cnNvcigkZWwsIHVwZGF0ZUlucHV0KSB7XG4gICAgJGVsLmZpcnN0KClcbiAgICAgIC5hZGRDbGFzcyhfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuY3Vyc29yLCB0cnVlKSlcbiAgICAgIC5hdHRyKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICB0aGlzLnRyaWdnZXIoJ2N1cnNvck1vdmVkJywgdXBkYXRlSW5wdXQpO1xuICB9LFxuXG4gIF9yZW1vdmVDdXJzb3I6IGZ1bmN0aW9uIHJlbW92ZUN1cnNvcigpIHtcbiAgICB0aGlzLl9nZXRDdXJzb3IoKVxuICAgICAgLnJlbW92ZUNsYXNzKF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5jdXJzb3IsIHRydWUpKVxuICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtc2VsZWN0ZWQnKTtcbiAgfSxcblxuICBfbW92ZUN1cnNvcjogZnVuY3Rpb24gbW92ZUN1cnNvcihpbmNyZW1lbnQpIHtcbiAgICB2YXIgJHN1Z2dlc3Rpb25zO1xuICAgIHZhciAkb2xkQ3Vyc29yO1xuICAgIHZhciBuZXdDdXJzb3JJbmRleDtcbiAgICB2YXIgJG5ld0N1cnNvcjtcblxuICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkb2xkQ3Vyc29yID0gdGhpcy5fZ2V0Q3Vyc29yKCk7XG4gICAgJHN1Z2dlc3Rpb25zID0gdGhpcy5fZ2V0U3VnZ2VzdGlvbnMoKTtcblxuICAgIHRoaXMuX3JlbW92ZUN1cnNvcigpO1xuXG4gICAgLy8gc2hpZnRpbmcgYmVmb3JlIGFuZCBhZnRlciBtb2R1bG8gdG8gZGVhbCB3aXRoIC0xIGluZGV4XG4gICAgbmV3Q3Vyc29ySW5kZXggPSAkc3VnZ2VzdGlvbnMuaW5kZXgoJG9sZEN1cnNvcikgKyBpbmNyZW1lbnQ7XG4gICAgbmV3Q3Vyc29ySW5kZXggPSAobmV3Q3Vyc29ySW5kZXggKyAxKSAlICgkc3VnZ2VzdGlvbnMubGVuZ3RoICsgMSkgLSAxO1xuXG4gICAgaWYgKG5ld0N1cnNvckluZGV4ID09PSAtMSkge1xuICAgICAgdGhpcy50cmlnZ2VyKCdjdXJzb3JSZW1vdmVkJyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKG5ld0N1cnNvckluZGV4IDwgLTEpIHtcbiAgICAgIG5ld0N1cnNvckluZGV4ID0gJHN1Z2dlc3Rpb25zLmxlbmd0aCAtIDE7XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0Q3Vyc29yKCRuZXdDdXJzb3IgPSAkc3VnZ2VzdGlvbnMuZXEobmV3Q3Vyc29ySW5kZXgpLCB0cnVlKTtcblxuICAgIC8vIGluIHRoZSBjYXNlIG9mIHNjcm9sbGFibGUgb3ZlcmZsb3dcbiAgICAvLyBtYWtlIHN1cmUgdGhlIGN1cnNvciBpcyB2aXNpYmxlIGluIHRoZSBtZW51XG4gICAgdGhpcy5fZW5zdXJlVmlzaWJsZSgkbmV3Q3Vyc29yKTtcbiAgfSxcblxuICBfZW5zdXJlVmlzaWJsZTogZnVuY3Rpb24gZW5zdXJlVmlzaWJsZSgkZWwpIHtcbiAgICB2YXIgZWxUb3A7XG4gICAgdmFyIGVsQm90dG9tO1xuICAgIHZhciBtZW51U2Nyb2xsVG9wO1xuICAgIHZhciBtZW51SGVpZ2h0O1xuXG4gICAgZWxUb3AgPSAkZWwucG9zaXRpb24oKS50b3A7XG4gICAgZWxCb3R0b20gPSBlbFRvcCArICRlbC5oZWlnaHQoKSArXG4gICAgICBwYXJzZUludCgkZWwuY3NzKCdtYXJnaW4tdG9wJyksIDEwKSArXG4gICAgICBwYXJzZUludCgkZWwuY3NzKCdtYXJnaW4tYm90dG9tJyksIDEwKTtcbiAgICBtZW51U2Nyb2xsVG9wID0gdGhpcy4kbWVudS5zY3JvbGxUb3AoKTtcbiAgICBtZW51SGVpZ2h0ID0gdGhpcy4kbWVudS5oZWlnaHQoKSArXG4gICAgICBwYXJzZUludCh0aGlzLiRtZW51LmNzcygncGFkZGluZy10b3AnKSwgMTApICtcbiAgICAgIHBhcnNlSW50KHRoaXMuJG1lbnUuY3NzKCdwYWRkaW5nLWJvdHRvbScpLCAxMCk7XG5cbiAgICBpZiAoZWxUb3AgPCAwKSB7XG4gICAgICB0aGlzLiRtZW51LnNjcm9sbFRvcChtZW51U2Nyb2xsVG9wICsgZWxUb3ApO1xuICAgIH0gZWxzZSBpZiAobWVudUhlaWdodCA8IGVsQm90dG9tKSB7XG4gICAgICB0aGlzLiRtZW51LnNjcm9sbFRvcChtZW51U2Nyb2xsVG9wICsgKGVsQm90dG9tIC0gbWVudUhlaWdodCkpO1xuICAgIH1cbiAgfSxcblxuICAvLyAjIyMgcHVibGljXG5cbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcblxuICAgICAgdGhpcy5fcmVtb3ZlQ3Vyc29yKCk7XG4gICAgICB0aGlzLl9oaWRlKCk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcignY2xvc2VkJyk7XG4gICAgfVxuICB9LFxuXG4gIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgICBpZiAoIXRoaXMuaXNFbXB0eSkge1xuICAgICAgICB0aGlzLl9zaG93KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudHJpZ2dlcignb3BlbmVkJyk7XG4gICAgfVxuICB9LFxuXG4gIHNldExhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBzZXRMYW5ndWFnZURpcmVjdGlvbihkaXIpIHtcbiAgICB0aGlzLiRtZW51LmNzcyhkaXIgPT09ICdsdHInID8gdGhpcy5jc3MubHRyIDogdGhpcy5jc3MucnRsKTtcbiAgfSxcblxuICBtb3ZlQ3Vyc29yVXA6IGZ1bmN0aW9uIG1vdmVDdXJzb3JVcCgpIHtcbiAgICB0aGlzLl9tb3ZlQ3Vyc29yKC0xKTtcbiAgfSxcblxuICBtb3ZlQ3Vyc29yRG93bjogZnVuY3Rpb24gbW92ZUN1cnNvckRvd24oKSB7XG4gICAgdGhpcy5fbW92ZUN1cnNvcigrMSk7XG4gIH0sXG5cbiAgZ2V0RGF0dW1Gb3JTdWdnZXN0aW9uOiBmdW5jdGlvbiBnZXREYXR1bUZvclN1Z2dlc3Rpb24oJGVsKSB7XG4gICAgdmFyIGRhdHVtID0gbnVsbDtcblxuICAgIGlmICgkZWwubGVuZ3RoKSB7XG4gICAgICBkYXR1bSA9IHtcbiAgICAgICAgcmF3OiBEYXRhc2V0LmV4dHJhY3REYXR1bSgkZWwpLFxuICAgICAgICB2YWx1ZTogRGF0YXNldC5leHRyYWN0VmFsdWUoJGVsKSxcbiAgICAgICAgZGF0YXNldE5hbWU6IERhdGFzZXQuZXh0cmFjdERhdGFzZXROYW1lKCRlbClcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdHVtO1xuICB9LFxuXG4gIGdldEN1cnJlbnRDdXJzb3I6IGZ1bmN0aW9uIGdldEN1cnJlbnRDdXJzb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEN1cnNvcigpLmZpcnN0KCk7XG4gIH0sXG5cbiAgZ2V0RGF0dW1Gb3JDdXJzb3I6IGZ1bmN0aW9uIGdldERhdHVtRm9yQ3Vyc29yKCkge1xuICAgIHJldHVybiB0aGlzLmdldERhdHVtRm9yU3VnZ2VzdGlvbih0aGlzLl9nZXRDdXJzb3IoKS5maXJzdCgpKTtcbiAgfSxcblxuICBnZXREYXR1bUZvclRvcFN1Z2dlc3Rpb246IGZ1bmN0aW9uIGdldERhdHVtRm9yVG9wU3VnZ2VzdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXR1bUZvclN1Z2dlc3Rpb24odGhpcy5fZ2V0U3VnZ2VzdGlvbnMoKS5maXJzdCgpKTtcbiAgfSxcblxuICBjdXJzb3JUb3BTdWdnZXN0aW9uOiBmdW5jdGlvbiBjdXJzb3JUb3BTdWdnZXN0aW9uKCkge1xuICAgIHRoaXMuX3NldEN1cnNvcih0aGlzLl9nZXRTdWdnZXN0aW9ucygpLmZpcnN0KCksIGZhbHNlKTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShxdWVyeSkge1xuICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCB1cGRhdGVEYXRhc2V0KTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZURhdGFzZXQoZGF0YXNldCkge1xuICAgICAgZGF0YXNldC51cGRhdGUocXVlcnkpO1xuICAgIH1cbiAgfSxcblxuICBlbXB0eTogZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGNsZWFyRGF0YXNldCk7XG4gICAgdGhpcy5pc0VtcHR5ID0gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGNsZWFyRGF0YXNldChkYXRhc2V0KSB7XG4gICAgICBkYXRhc2V0LmNsZWFyKCk7XG4gICAgfVxuICB9LFxuXG4gIGlzVmlzaWJsZTogZnVuY3Rpb24gaXNWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzT3BlbiAmJiAhdGhpcy5pc0VtcHR5O1xuICB9LFxuXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdGhpcy4kbWVudS5vZmYoJy5hYScpO1xuXG4gICAgdGhpcy4kbWVudSA9IG51bGw7XG5cbiAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgZGVzdHJveURhdGFzZXQpO1xuXG4gICAgZnVuY3Rpb24gZGVzdHJveURhdGFzZXQoZGF0YXNldCkge1xuICAgICAgZGF0YXNldC5kZXN0cm95KCk7XG4gICAgfVxuICB9XG59KTtcblxuLy8gaGVscGVyIGZ1bmN0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLVxuRHJvcGRvd24uRGF0YXNldCA9IERhdGFzZXQ7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVEYXRhc2V0KCRtZW51LCBvRGF0YXNldCwgY3NzQ2xhc3Nlcykge1xuICByZXR1cm4gbmV3IERyb3Bkb3duLkRhdGFzZXQoXy5taXhpbih7JG1lbnU6ICRtZW51LCBjc3NDbGFzc2VzOiBjc3NDbGFzc2VzfSwgb0RhdGFzZXQpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wZG93bjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG5hbWVzcGFjZSA9ICdhdXRvY29tcGxldGU6JztcblxudmFyIF8gPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMuanMnKTtcbnZhciBET00gPSByZXF1aXJlKCcuLi9jb21tb24vZG9tLmpzJyk7XG5cbi8vIGNvbnN0cnVjdG9yXG4vLyAtLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBFdmVudEJ1cyhvKSB7XG4gIGlmICghbyB8fCAhby5lbCkge1xuICAgIF8uZXJyb3IoJ0V2ZW50QnVzIGluaXRpYWxpemVkIHdpdGhvdXQgZWwnKTtcbiAgfVxuXG4gIHRoaXMuJGVsID0gRE9NLmVsZW1lbnQoby5lbCk7XG59XG5cbi8vIGluc3RhbmNlIG1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS1cblxuXy5taXhpbihFdmVudEJ1cy5wcm90b3R5cGUsIHtcblxuICAvLyAjIyMgcHVibGljXG5cbiAgdHJpZ2dlcjogZnVuY3Rpb24odHlwZSwgc3VnZ2VzdGlvbiwgZGF0YXNldCwgY29udGV4dCkge1xuICAgIHZhciBldmVudCA9IF8uRXZlbnQobmFtZXNwYWNlICsgdHlwZSk7XG4gICAgdGhpcy4kZWwudHJpZ2dlcihldmVudCwgW3N1Z2dlc3Rpb24sIGRhdGFzZXQsIGNvbnRleHRdKTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50QnVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1tZWRpYXRlID0gcmVxdWlyZSgnaW1tZWRpYXRlJyk7XG52YXIgc3BsaXR0ZXIgPSAvXFxzKy87XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvblN5bmM6IG9uU3luYyxcbiAgb25Bc3luYzogb25Bc3luYyxcbiAgb2ZmOiBvZmYsXG4gIHRyaWdnZXI6IHRyaWdnZXJcbn07XG5cbmZ1bmN0aW9uIG9uKG1ldGhvZCwgdHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gIHZhciB0eXBlO1xuXG4gIGlmICghY2IpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHR5cGVzID0gdHlwZXMuc3BsaXQoc3BsaXR0ZXIpO1xuICBjYiA9IGNvbnRleHQgPyBiaW5kQ29udGV4dChjYiwgY29udGV4dCkgOiBjYjtcblxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgd2hpbGUgKHR5cGUgPSB0eXBlcy5zaGlmdCgpKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzW3R5cGVdID0gdGhpcy5fY2FsbGJhY2tzW3R5cGVdIHx8IHtzeW5jOiBbXSwgYXN5bmM6IFtdfTtcbiAgICB0aGlzLl9jYWxsYmFja3NbdHlwZV1bbWV0aG9kXS5wdXNoKGNiKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBvbkFzeW5jKHR5cGVzLCBjYiwgY29udGV4dCkge1xuICByZXR1cm4gb24uY2FsbCh0aGlzLCAnYXN5bmMnLCB0eXBlcywgY2IsIGNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBvblN5bmModHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gIHJldHVybiBvbi5jYWxsKHRoaXMsICdzeW5jJywgdHlwZXMsIGNiLCBjb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gb2ZmKHR5cGVzKSB7XG4gIHZhciB0eXBlO1xuXG4gIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcblxuICB3aGlsZSAodHlwZSA9IHR5cGVzLnNoaWZ0KCkpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW3R5cGVdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHRyaWdnZXIodHlwZXMpIHtcbiAgdmFyIHR5cGU7XG4gIHZhciBjYWxsYmFja3M7XG4gIHZhciBhcmdzO1xuICB2YXIgc3luY0ZsdXNoO1xuICB2YXIgYXN5bmNGbHVzaDtcblxuICBpZiAoIXRoaXMuX2NhbGxiYWNrcykge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG4gIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgd2hpbGUgKCh0eXBlID0gdHlwZXMuc2hpZnQoKSkgJiYgKGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1t0eXBlXSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHN5bmNGbHVzaCA9IGdldEZsdXNoKGNhbGxiYWNrcy5zeW5jLCB0aGlzLCBbdHlwZV0uY29uY2F0KGFyZ3MpKTtcbiAgICBhc3luY0ZsdXNoID0gZ2V0Rmx1c2goY2FsbGJhY2tzLmFzeW5jLCB0aGlzLCBbdHlwZV0uY29uY2F0KGFyZ3MpKTtcblxuICAgIGlmIChzeW5jRmx1c2goKSkge1xuICAgICAgaW1tZWRpYXRlKGFzeW5jRmx1c2gpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBnZXRGbHVzaChjYWxsYmFja3MsIGNvbnRleHQsIGFyZ3MpIHtcbiAgcmV0dXJuIGZsdXNoO1xuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHZhciBjYW5jZWxsZWQ7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgIWNhbmNlbGxlZCAmJiBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgIC8vIG9ubHkgY2FuY2VsIGlmIHRoZSBjYWxsYmFjayBleHBsaWNpdGx5IHJldHVybnMgZmFsc2VcbiAgICAgIGNhbmNlbGxlZCA9IGNhbGxiYWNrc1tpXS5hcHBseShjb250ZXh0LCBhcmdzKSA9PT0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICFjYW5jZWxsZWQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gYmluZENvbnRleHQoZm4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIGZuLmJpbmQgP1xuICAgIGZuLmJpbmQoY29udGV4dCkgOlxuICAgIGZ1bmN0aW9uKCkgeyBmbi5hcHBseShjb250ZXh0LCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpOyB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgd3JhcHBlcjogJzxzcGFuIGNsYXNzPVwiJVJPT1QlXCI+PC9zcGFuPicsXG4gIGRyb3Bkb3duOiAnPHNwYW4gY2xhc3M9XCIlUFJFRklYJSVEUk9QRE9XTl9NRU5VJVwiPjwvc3Bhbj4nLFxuICBkYXRhc2V0OiAnPGRpdiBjbGFzcz1cIiVQUkVGSVglJURBVEFTRVQlLSVDTEFTUyVcIj48L2Rpdj4nLFxuICBzdWdnZXN0aW9uczogJzxzcGFuIGNsYXNzPVwiJVBSRUZJWCUlU1VHR0VTVElPTlMlXCI+PC9zcGFuPicsXG4gIHN1Z2dlc3Rpb246ICc8ZGl2IGNsYXNzPVwiJVBSRUZJWCUlU1VHR0VTVElPTiVcIj48L2Rpdj4nXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3BlY2lhbEtleUNvZGVNYXA7XG5cbnNwZWNpYWxLZXlDb2RlTWFwID0ge1xuICA5OiAndGFiJyxcbiAgMjc6ICdlc2MnLFxuICAzNzogJ2xlZnQnLFxuICAzOTogJ3JpZ2h0JyxcbiAgMTM6ICdlbnRlcicsXG4gIDM4OiAndXAnLFxuICA0MDogJ2Rvd24nXG59O1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscy5qcycpO1xudmFyIERPTSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9kb20uanMnKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL2V2ZW50X2VtaXR0ZXIuanMnKTtcblxuLy8gY29uc3RydWN0b3Jcbi8vIC0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIElucHV0KG8pIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgb25CbHVyO1xuICB2YXIgb25Gb2N1cztcbiAgdmFyIG9uS2V5ZG93bjtcbiAgdmFyIG9uSW5wdXQ7XG5cbiAgbyA9IG8gfHwge307XG5cbiAgaWYgKCFvLmlucHV0KSB7XG4gICAgXy5lcnJvcignaW5wdXQgaXMgbWlzc2luZycpO1xuICB9XG5cbiAgLy8gYm91bmQgZnVuY3Rpb25zXG4gIG9uQmx1ciA9IF8uYmluZCh0aGlzLl9vbkJsdXIsIHRoaXMpO1xuICBvbkZvY3VzID0gXy5iaW5kKHRoaXMuX29uRm9jdXMsIHRoaXMpO1xuICBvbktleWRvd24gPSBfLmJpbmQodGhpcy5fb25LZXlkb3duLCB0aGlzKTtcbiAgb25JbnB1dCA9IF8uYmluZCh0aGlzLl9vbklucHV0LCB0aGlzKTtcblxuICB0aGlzLiRoaW50ID0gRE9NLmVsZW1lbnQoby5oaW50KTtcbiAgdGhpcy4kaW5wdXQgPSBET00uZWxlbWVudChvLmlucHV0KVxuICAgIC5vbignYmx1ci5hYScsIG9uQmx1cilcbiAgICAub24oJ2ZvY3VzLmFhJywgb25Gb2N1cylcbiAgICAub24oJ2tleWRvd24uYWEnLCBvbktleWRvd24pO1xuXG4gIC8vIGlmIG5vIGhpbnQsIG5vb3AgYWxsIHRoZSBoaW50IHJlbGF0ZWQgZnVuY3Rpb25zXG4gIGlmICh0aGlzLiRoaW50Lmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuc2V0SGludCA9IHRoaXMuZ2V0SGludCA9IHRoaXMuY2xlYXJIaW50ID0gdGhpcy5jbGVhckhpbnRJZkludmFsaWQgPSBfLm5vb3A7XG4gIH1cblxuICAvLyBpZTcgYW5kIGllOCBkb24ndCBzdXBwb3J0IHRoZSBpbnB1dCBldmVudFxuICAvLyBpZTkgZG9lc24ndCBmaXJlIHRoZSBpbnB1dCBldmVudCB3aGVuIGNoYXJhY3RlcnMgYXJlIHJlbW92ZWRcbiAgLy8gbm90IHN1cmUgaWYgaWUxMCBpcyBjb21wYXRpYmxlXG4gIGlmICghXy5pc01zaWUoKSkge1xuICAgIHRoaXMuJGlucHV0Lm9uKCdpbnB1dC5hYScsIG9uSW5wdXQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuJGlucHV0Lm9uKCdrZXlkb3duLmFhIGtleXByZXNzLmFhIGN1dC5hYSBwYXN0ZS5hYScsIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAvLyBpZiBhIHNwZWNpYWwga2V5IHRyaWdnZXJlZCB0aGlzLCBpZ25vcmUgaXRcbiAgICAgIGlmIChzcGVjaWFsS2V5Q29kZU1hcFskZS53aGljaCB8fCAkZS5rZXlDb2RlXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGdpdmUgdGhlIGJyb3dzZXIgYSBjaGFuY2UgdG8gdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXRcbiAgICAgIC8vIGJlZm9yZSBjaGVja2luZyB0byBzZWUgaWYgdGhlIHF1ZXJ5IGNoYW5nZWRcbiAgICAgIF8uZGVmZXIoXy5iaW5kKHRoYXQuX29uSW5wdXQsIHRoYXQsICRlKSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyB0aGUgcXVlcnkgZGVmYXVsdHMgdG8gd2hhdGV2ZXIgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBpc1xuICAvLyBvbiBpbml0aWFsaXphdGlvbiwgaXQnbGwgbW9zdCBsaWtlbHkgYmUgYW4gZW1wdHkgc3RyaW5nXG4gIHRoaXMucXVlcnkgPSB0aGlzLiRpbnB1dC52YWwoKTtcblxuICAvLyBoZWxwcyB3aXRoIGNhbGN1bGF0aW5nIHRoZSB3aWR0aCBvZiB0aGUgaW5wdXQncyB2YWx1ZVxuICB0aGlzLiRvdmVyZmxvd0hlbHBlciA9IGJ1aWxkT3ZlcmZsb3dIZWxwZXIodGhpcy4kaW5wdXQpO1xufVxuXG4vLyBzdGF0aWMgbWV0aG9kc1xuLy8gLS0tLS0tLS0tLS0tLS1cblxuSW5wdXQubm9ybWFsaXplUXVlcnkgPSBmdW5jdGlvbihzdHIpIHtcbiAgLy8gc3RyaXBzIGxlYWRpbmcgd2hpdGVzcGFjZSBhbmQgY29uZGVuc2VzIGFsbCB3aGl0ZXNwYWNlXG4gIHJldHVybiAoc3RyIHx8ICcnKS5yZXBsYWNlKC9eXFxzKi9nLCAnJykucmVwbGFjZSgvXFxzezIsfS9nLCAnICcpO1xufTtcblxuLy8gaW5zdGFuY2UgbWV0aG9kc1xuLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG5fLm1peGluKElucHV0LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG5cbiAgLy8gIyMjIHByaXZhdGVcblxuICBfb25CbHVyOiBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgdGhpcy5yZXNldElucHV0VmFsdWUoKTtcbiAgICB0aGlzLiRpbnB1dC5yZW1vdmVBdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICB0aGlzLnRyaWdnZXIoJ2JsdXJyZWQnKTtcbiAgfSxcblxuICBfb25Gb2N1czogZnVuY3Rpb24gb25Gb2N1cygpIHtcbiAgICB0aGlzLnRyaWdnZXIoJ2ZvY3VzZWQnKTtcbiAgfSxcblxuICBfb25LZXlkb3duOiBmdW5jdGlvbiBvbktleWRvd24oJGUpIHtcbiAgICAvLyB3aGljaCBpcyBub3JtYWxpemVkIGFuZCBjb25zaXN0ZW50IChidXQgbm90IGZvciBpZSlcbiAgICB2YXIga2V5TmFtZSA9IHNwZWNpYWxLZXlDb2RlTWFwWyRlLndoaWNoIHx8ICRlLmtleUNvZGVdO1xuXG4gICAgdGhpcy5fbWFuYWdlUHJldmVudERlZmF1bHQoa2V5TmFtZSwgJGUpO1xuICAgIGlmIChrZXlOYW1lICYmIHRoaXMuX3Nob3VsZFRyaWdnZXIoa2V5TmFtZSwgJGUpKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoa2V5TmFtZSArICdLZXllZCcsICRlKTtcbiAgICB9XG4gIH0sXG5cbiAgX29uSW5wdXQ6IGZ1bmN0aW9uIG9uSW5wdXQoKSB7XG4gICAgdGhpcy5fY2hlY2tJbnB1dFZhbHVlKCk7XG4gIH0sXG5cbiAgX21hbmFnZVByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiBtYW5hZ2VQcmV2ZW50RGVmYXVsdChrZXlOYW1lLCAkZSkge1xuICAgIHZhciBwcmV2ZW50RGVmYXVsdDtcbiAgICB2YXIgaGludFZhbHVlO1xuICAgIHZhciBpbnB1dFZhbHVlO1xuXG4gICAgc3dpdGNoIChrZXlOYW1lKSB7XG4gICAgY2FzZSAndGFiJzpcbiAgICAgIGhpbnRWYWx1ZSA9IHRoaXMuZ2V0SGludCgpO1xuICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgpO1xuXG4gICAgICBwcmV2ZW50RGVmYXVsdCA9IGhpbnRWYWx1ZSAmJlxuICAgICAgICBoaW50VmFsdWUgIT09IGlucHV0VmFsdWUgJiZcbiAgICAgICAgIXdpdGhNb2RpZmllcigkZSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3VwJzpcbiAgICBjYXNlICdkb3duJzpcbiAgICAgIHByZXZlbnREZWZhdWx0ID0gIXdpdGhNb2RpZmllcigkZSk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBwcmV2ZW50RGVmYXVsdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0sXG5cbiAgX3Nob3VsZFRyaWdnZXI6IGZ1bmN0aW9uIHNob3VsZFRyaWdnZXIoa2V5TmFtZSwgJGUpIHtcbiAgICB2YXIgdHJpZ2dlcjtcblxuICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgIGNhc2UgJ3RhYic6XG4gICAgICB0cmlnZ2VyID0gIXdpdGhNb2RpZmllcigkZSk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0cmlnZ2VyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJpZ2dlcjtcbiAgfSxcblxuICBfY2hlY2tJbnB1dFZhbHVlOiBmdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XG4gICAgdmFyIGlucHV0VmFsdWU7XG4gICAgdmFyIGFyZUVxdWl2YWxlbnQ7XG4gICAgdmFyIGhhc0RpZmZlcmVudFdoaXRlc3BhY2U7XG5cbiAgICBpbnB1dFZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlKCk7XG4gICAgYXJlRXF1aXZhbGVudCA9IGFyZVF1ZXJpZXNFcXVpdmFsZW50KGlucHV0VmFsdWUsIHRoaXMucXVlcnkpO1xuICAgIGhhc0RpZmZlcmVudFdoaXRlc3BhY2UgPSBhcmVFcXVpdmFsZW50ICYmIHRoaXMucXVlcnkgP1xuICAgICAgdGhpcy5xdWVyeS5sZW5ndGggIT09IGlucHV0VmFsdWUubGVuZ3RoIDogZmFsc2U7XG5cbiAgICB0aGlzLnF1ZXJ5ID0gaW5wdXRWYWx1ZTtcblxuICAgIGlmICghYXJlRXF1aXZhbGVudCkge1xuICAgICAgdGhpcy50cmlnZ2VyKCdxdWVyeUNoYW5nZWQnLCB0aGlzLnF1ZXJ5KTtcbiAgICB9IGVsc2UgaWYgKGhhc0RpZmZlcmVudFdoaXRlc3BhY2UpIHtcbiAgICAgIHRoaXMudHJpZ2dlcignd2hpdGVzcGFjZUNoYW5nZWQnLCB0aGlzLnF1ZXJ5KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gIyMjIHB1YmxpY1xuXG4gIGZvY3VzOiBmdW5jdGlvbiBmb2N1cygpIHtcbiAgICB0aGlzLiRpbnB1dC5mb2N1cygpO1xuICB9LFxuXG4gIGJsdXI6IGZ1bmN0aW9uIGJsdXIoKSB7XG4gICAgdGhpcy4kaW5wdXQuYmx1cigpO1xuICB9LFxuXG4gIGdldFF1ZXJ5OiBmdW5jdGlvbiBnZXRRdWVyeSgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeTtcbiAgfSxcblxuICBzZXRRdWVyeTogZnVuY3Rpb24gc2V0UXVlcnkocXVlcnkpIHtcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gIH0sXG5cbiAgZ2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gZ2V0SW5wdXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy4kaW5wdXQudmFsKCk7XG4gIH0sXG5cbiAgc2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZSh2YWx1ZSwgc2lsZW50KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5xdWVyeTtcbiAgICB9XG4gICAgdGhpcy4kaW5wdXQudmFsKHZhbHVlKTtcblxuICAgIC8vIHNpbGVudCBwcmV2ZW50cyBhbnkgYWRkaXRpb25hbCBldmVudHMgZnJvbSBiZWluZyB0cmlnZ2VyZWRcbiAgICBpZiAoc2lsZW50KSB7XG4gICAgICB0aGlzLmNsZWFySGludCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jaGVja0lucHV0VmFsdWUoKTtcbiAgICB9XG4gIH0sXG5cbiAgZXhwYW5kOiBmdW5jdGlvbiBleHBhbmQoKSB7XG4gICAgdGhpcy4kaW5wdXQuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gIH0sXG5cbiAgY29sbGFwc2U6IGZ1bmN0aW9uIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuJGlucHV0LmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgfSxcblxuICBzZXRBY3RpdmVEZXNjZW5kYW50OiBmdW5jdGlvbiBzZXRBY3RpdmVEZXNjZW5kYW50KGFjdGl2ZWRlc2NlbmRhbnRJZCkge1xuICAgIHRoaXMuJGlucHV0LmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIGFjdGl2ZWRlc2NlbmRhbnRJZCk7XG4gIH0sXG5cbiAgcmVtb3ZlQWN0aXZlRGVzY2VuZGFudDogZnVuY3Rpb24gcmVtb3ZlQWN0aXZlRGVzY2VuZGFudCgpIHtcbiAgICB0aGlzLiRpbnB1dC5yZW1vdmVBdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgfSxcblxuICByZXNldElucHV0VmFsdWU6IGZ1bmN0aW9uIHJlc2V0SW5wdXRWYWx1ZSgpIHtcbiAgICB0aGlzLnNldElucHV0VmFsdWUodGhpcy5xdWVyeSwgdHJ1ZSk7XG4gIH0sXG5cbiAgZ2V0SGludDogZnVuY3Rpb24gZ2V0SGludCgpIHtcbiAgICByZXR1cm4gdGhpcy4kaGludC52YWwoKTtcbiAgfSxcblxuICBzZXRIaW50OiBmdW5jdGlvbiBzZXRIaW50KHZhbHVlKSB7XG4gICAgdGhpcy4kaGludC52YWwodmFsdWUpO1xuICB9LFxuXG4gIGNsZWFySGludDogZnVuY3Rpb24gY2xlYXJIaW50KCkge1xuICAgIHRoaXMuc2V0SGludCgnJyk7XG4gIH0sXG5cbiAgY2xlYXJIaW50SWZJbnZhbGlkOiBmdW5jdGlvbiBjbGVhckhpbnRJZkludmFsaWQoKSB7XG4gICAgdmFyIHZhbDtcbiAgICB2YXIgaGludDtcbiAgICB2YXIgdmFsSXNQcmVmaXhPZkhpbnQ7XG4gICAgdmFyIGlzVmFsaWQ7XG5cbiAgICB2YWwgPSB0aGlzLmdldElucHV0VmFsdWUoKTtcbiAgICBoaW50ID0gdGhpcy5nZXRIaW50KCk7XG4gICAgdmFsSXNQcmVmaXhPZkhpbnQgPSB2YWwgIT09IGhpbnQgJiYgaGludC5pbmRleE9mKHZhbCkgPT09IDA7XG4gICAgaXNWYWxpZCA9IHZhbCAhPT0gJycgJiYgdmFsSXNQcmVmaXhPZkhpbnQgJiYgIXRoaXMuaGFzT3ZlcmZsb3coKTtcblxuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgdGhpcy5jbGVhckhpbnQoKTtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0TGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIGdldExhbmd1YWdlRGlyZWN0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy4kaW5wdXQuY3NzKCdkaXJlY3Rpb24nKSB8fCAnbHRyJykudG9Mb3dlckNhc2UoKTtcbiAgfSxcblxuICBoYXNPdmVyZmxvdzogZnVuY3Rpb24gaGFzT3ZlcmZsb3coKSB7XG4gICAgLy8gMiBpcyBhcmJpdHJhcnksIGp1c3QgcGlja2luZyBhIHNtYWxsIG51bWJlciB0byBoYW5kbGUgZWRnZSBjYXNlc1xuICAgIHZhciBjb25zdHJhaW50ID0gdGhpcy4kaW5wdXQud2lkdGgoKSAtIDI7XG5cbiAgICB0aGlzLiRvdmVyZmxvd0hlbHBlci50ZXh0KHRoaXMuZ2V0SW5wdXRWYWx1ZSgpKTtcblxuICAgIHJldHVybiB0aGlzLiRvdmVyZmxvd0hlbHBlci53aWR0aCgpID49IGNvbnN0cmFpbnQ7XG4gIH0sXG5cbiAgaXNDdXJzb3JBdEVuZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbHVlTGVuZ3RoO1xuICAgIHZhciBzZWxlY3Rpb25TdGFydDtcbiAgICB2YXIgcmFuZ2U7XG5cbiAgICB2YWx1ZUxlbmd0aCA9IHRoaXMuJGlucHV0LnZhbCgpLmxlbmd0aDtcbiAgICBzZWxlY3Rpb25TdGFydCA9IHRoaXMuJGlucHV0WzBdLnNlbGVjdGlvblN0YXJ0O1xuXG4gICAgaWYgKF8uaXNOdW1iZXIoc2VsZWN0aW9uU3RhcnQpKSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uU3RhcnQgPT09IHZhbHVlTGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uKSB7XG4gICAgICAvLyBOT1RFOiB0aGlzIHdvbid0IHdvcmsgdW5sZXNzIHRoZSBpbnB1dCBoYXMgZm9jdXMsIHRoZSBnb29kIG5ld3NcbiAgICAgIC8vIGlzIHRoaXMgY29kZSBzaG91bGQgb25seSBnZXQgY2FsbGVkIHdoZW4gdGhlIGlucHV0IGhhcyBmb2N1c1xuICAgICAgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLXZhbHVlTGVuZ3RoKTtcblxuICAgICAgcmV0dXJuIHZhbHVlTGVuZ3RoID09PSByYW5nZS50ZXh0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHRoaXMuJGhpbnQub2ZmKCcuYWEnKTtcbiAgICB0aGlzLiRpbnB1dC5vZmYoJy5hYScpO1xuXG4gICAgdGhpcy4kaGludCA9IHRoaXMuJGlucHV0ID0gdGhpcy4kb3ZlcmZsb3dIZWxwZXIgPSBudWxsO1xuICB9XG59KTtcblxuLy8gaGVscGVyIGZ1bmN0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBidWlsZE92ZXJmbG93SGVscGVyKCRpbnB1dCkge1xuICByZXR1cm4gRE9NLmVsZW1lbnQoJzxwcmUgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9wcmU+JylcbiAgICAuY3NzKHtcbiAgICAgIC8vIHBvc2l0aW9uIGhlbHBlciBvZmYtc2NyZWVuXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgICAgLy8gYXZvaWQgbGluZSBicmVha3MgYW5kIHdoaXRlc3BhY2UgY29sbGFwc2luZ1xuICAgICAgd2hpdGVTcGFjZTogJ3ByZScsXG4gICAgICAvLyB1c2Ugc2FtZSBmb250IGNzcyBhcyBpbnB1dCB0byBjYWxjdWxhdGUgYWNjdXJhdGUgd2lkdGhcbiAgICAgIGZvbnRGYW1pbHk6ICRpbnB1dC5jc3MoJ2ZvbnQtZmFtaWx5JyksXG4gICAgICBmb250U2l6ZTogJGlucHV0LmNzcygnZm9udC1zaXplJyksXG4gICAgICBmb250U3R5bGU6ICRpbnB1dC5jc3MoJ2ZvbnQtc3R5bGUnKSxcbiAgICAgIGZvbnRWYXJpYW50OiAkaW5wdXQuY3NzKCdmb250LXZhcmlhbnQnKSxcbiAgICAgIGZvbnRXZWlnaHQ6ICRpbnB1dC5jc3MoJ2ZvbnQtd2VpZ2h0JyksXG4gICAgICB3b3JkU3BhY2luZzogJGlucHV0LmNzcygnd29yZC1zcGFjaW5nJyksXG4gICAgICBsZXR0ZXJTcGFjaW5nOiAkaW5wdXQuY3NzKCdsZXR0ZXItc3BhY2luZycpLFxuICAgICAgdGV4dEluZGVudDogJGlucHV0LmNzcygndGV4dC1pbmRlbnQnKSxcbiAgICAgIHRleHRSZW5kZXJpbmc6ICRpbnB1dC5jc3MoJ3RleHQtcmVuZGVyaW5nJyksXG4gICAgICB0ZXh0VHJhbnNmb3JtOiAkaW5wdXQuY3NzKCd0ZXh0LXRyYW5zZm9ybScpXG4gICAgfSlcbiAgICAuaW5zZXJ0QWZ0ZXIoJGlucHV0KTtcbn1cblxuZnVuY3Rpb24gYXJlUXVlcmllc0VxdWl2YWxlbnQoYSwgYikge1xuICByZXR1cm4gSW5wdXQubm9ybWFsaXplUXVlcnkoYSkgPT09IElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KGIpO1xufVxuXG5mdW5jdGlvbiB3aXRoTW9kaWZpZXIoJGUpIHtcbiAgcmV0dXJuICRlLmFsdEtleSB8fCAkZS5jdHJsS2V5IHx8ICRlLm1ldGFLZXkgfHwgJGUuc2hpZnRLZXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhdHRyc0tleSA9ICdhYUF0dHJzJztcblxudmFyIF8gPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMuanMnKTtcbnZhciBET00gPSByZXF1aXJlKCcuLi9jb21tb24vZG9tLmpzJyk7XG52YXIgRXZlbnRCdXMgPSByZXF1aXJlKCcuL2V2ZW50X2J1cy5qcycpO1xudmFyIElucHV0ID0gcmVxdWlyZSgnLi9pbnB1dC5qcycpO1xudmFyIERyb3Bkb3duID0gcmVxdWlyZSgnLi9kcm9wZG93bi5qcycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwuanMnKTtcbnZhciBjc3MgPSByZXF1aXJlKCcuL2Nzcy5qcycpO1xuXG4vLyBjb25zdHJ1Y3RvclxuLy8gLS0tLS0tLS0tLS1cblxuLy8gVEhPVUdIVDogd2hhdCBpZiBkYXRhc2V0cyBjb3VsZCBkeW5hbWljYWxseSBiZSBhZGRlZC9yZW1vdmVkP1xuZnVuY3Rpb24gVHlwZWFoZWFkKG8pIHtcbiAgdmFyICRtZW51O1xuICB2YXIgJGhpbnQ7XG5cbiAgbyA9IG8gfHwge307XG5cbiAgaWYgKCFvLmlucHV0KSB7XG4gICAgXy5lcnJvcignbWlzc2luZyBpbnB1dCcpO1xuICB9XG5cbiAgdGhpcy5pc0FjdGl2YXRlZCA9IGZhbHNlO1xuICB0aGlzLmRlYnVnID0gISFvLmRlYnVnO1xuICB0aGlzLmF1dG9zZWxlY3QgPSAhIW8uYXV0b3NlbGVjdDtcbiAgdGhpcy5hdXRvc2VsZWN0T25CbHVyID0gISFvLmF1dG9zZWxlY3RPbkJsdXI7XG4gIHRoaXMub3Blbk9uRm9jdXMgPSAhIW8ub3Blbk9uRm9jdXM7XG4gIHRoaXMubWluTGVuZ3RoID0gXy5pc051bWJlcihvLm1pbkxlbmd0aCkgPyBvLm1pbkxlbmd0aCA6IDE7XG4gIHRoaXMuYXV0b1dpZHRoID0gKG8uYXV0b1dpZHRoID09PSB1bmRlZmluZWQpID8gdHJ1ZSA6ICEhby5hdXRvV2lkdGg7XG4gIHRoaXMuY2xlYXJPblNlbGVjdGVkID0gISFvLmNsZWFyT25TZWxlY3RlZDtcbiAgdGhpcy50YWJBdXRvY29tcGxldGUgPSAoby50YWJBdXRvY29tcGxldGUgPT09IHVuZGVmaW5lZCkgPyB0cnVlIDogISFvLnRhYkF1dG9jb21wbGV0ZTtcblxuICBvLmhpbnQgPSAhIW8uaGludDtcblxuICBpZiAoby5oaW50ICYmIG8uYXBwZW5kVG8pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1thdXRvY29tcGxldGUuanNdIGhpbnQgYW5kIGFwcGVuZFRvIG9wdGlvbnMgY2FuXFwndCBiZSB1c2VkIGF0IHRoZSBzYW1lIHRpbWUnKTtcbiAgfVxuXG4gIHRoaXMuY3NzID0gby5jc3MgPSBfLm1peGluKHt9LCBjc3MsIG8uYXBwZW5kVG8gPyBjc3MuYXBwZW5kVG8gOiB7fSk7XG4gIHRoaXMuY3NzQ2xhc3NlcyA9IG8uY3NzQ2xhc3NlcyA9IF8ubWl4aW4oe30sIGNzcy5kZWZhdWx0Q2xhc3Nlcywgby5jc3NDbGFzc2VzIHx8IHt9KTtcbiAgdGhpcy5jc3NDbGFzc2VzLnByZWZpeCA9XG4gICAgby5jc3NDbGFzc2VzLmZvcm1hdHRlZFByZWZpeCA9IF8uZm9ybWF0UHJlZml4KHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5ub1ByZWZpeCk7XG4gIHRoaXMubGlzdGJveElkID0gby5saXN0Ym94SWQgPSBbdGhpcy5jc3NDbGFzc2VzLnJvb3QsICdsaXN0Ym94JywgXy5nZXRVbmlxdWVJZCgpXS5qb2luKCctJyk7XG5cbiAgdmFyIGRvbUVsdHMgPSBidWlsZERvbShvKTtcblxuICB0aGlzLiRub2RlID0gZG9tRWx0cy53cmFwcGVyO1xuICB2YXIgJGlucHV0ID0gdGhpcy4kaW5wdXQgPSBkb21FbHRzLmlucHV0O1xuICAkbWVudSA9IGRvbUVsdHMubWVudTtcbiAgJGhpbnQgPSBkb21FbHRzLmhpbnQ7XG5cbiAgaWYgKG8uZHJvcGRvd25NZW51Q29udGFpbmVyKSB7XG4gICAgRE9NLmVsZW1lbnQoby5kcm9wZG93bk1lbnVDb250YWluZXIpXG4gICAgICAuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpIC8vIGVuc3VyZSB0aGUgY29udGFpbmVyIGhhcyBhIHJlbGF0aXZlIHBvc2l0aW9uXG4gICAgICAuYXBwZW5kKCRtZW51LmNzcygndG9wJywgJzAnKSk7IC8vIG92ZXJyaWRlIHRoZSB0b3A6IDEwMCVcbiAgfVxuXG4gIC8vICM3MDU6IGlmIHRoZXJlJ3Mgc2Nyb2xsYWJsZSBvdmVyZmxvdywgaWUgZG9lc24ndCBzdXBwb3J0XG4gIC8vIGJsdXIgY2FuY2VsbGF0aW9ucyB3aGVuIHRoZSBzY3JvbGxiYXIgaXMgY2xpY2tlZFxuICAvL1xuICAvLyAjMzUxOiBwcmV2ZW50RGVmYXVsdCB3b24ndCBjYW5jZWwgYmx1cnMgaW4gaWUgPD0gOFxuICAkaW5wdXQub24oJ2JsdXIuYWEnLCBmdW5jdGlvbigkZSkge1xuICAgIHZhciBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIGlmIChfLmlzTXNpZSgpICYmICgkbWVudVswXSA9PT0gYWN0aXZlIHx8ICRtZW51WzBdLmNvbnRhaW5zKGFjdGl2ZSkpKSB7XG4gICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gc3RvcCBpbW1lZGlhdGUgaW4gb3JkZXIgdG8gcHJldmVudCBJbnB1dCNfb25CbHVyIGZyb21cbiAgICAgIC8vIGdldHRpbmcgZXhlY3R1ZWRcbiAgICAgICRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgXy5kZWZlcihmdW5jdGlvbigpIHsgJGlucHV0LmZvY3VzKCk7IH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gIzM1MTogcHJldmVudHMgaW5wdXQgYmx1ciBkdWUgdG8gY2xpY2tzIHdpdGhpbiBkcm9wZG93biBtZW51XG4gICRtZW51Lm9uKCdtb3VzZWRvd24uYWEnLCBmdW5jdGlvbigkZSkgeyAkZS5wcmV2ZW50RGVmYXVsdCgpOyB9KTtcblxuICB0aGlzLmV2ZW50QnVzID0gby5ldmVudEJ1cyB8fCBuZXcgRXZlbnRCdXMoe2VsOiAkaW5wdXR9KTtcblxuICB0aGlzLmRyb3Bkb3duID0gbmV3IFR5cGVhaGVhZC5Ecm9wZG93bih7XG4gICAgYXBwZW5kVG86IG8uYXBwZW5kVG8sXG4gICAgd3JhcHBlcjogdGhpcy4kbm9kZSxcbiAgICBtZW51OiAkbWVudSxcbiAgICBkYXRhc2V0czogby5kYXRhc2V0cyxcbiAgICB0ZW1wbGF0ZXM6IG8udGVtcGxhdGVzLFxuICAgIGNzc0NsYXNzZXM6IG8uY3NzQ2xhc3NlcyxcbiAgICBtaW5MZW5ndGg6IHRoaXMubWluTGVuZ3RoXG4gIH0pXG4gICAgLm9uU3luYygnc3VnZ2VzdGlvbkNsaWNrZWQnLCB0aGlzLl9vblN1Z2dlc3Rpb25DbGlja2VkLCB0aGlzKVxuICAgIC5vblN5bmMoJ2N1cnNvck1vdmVkJywgdGhpcy5fb25DdXJzb3JNb3ZlZCwgdGhpcylcbiAgICAub25TeW5jKCdjdXJzb3JSZW1vdmVkJywgdGhpcy5fb25DdXJzb3JSZW1vdmVkLCB0aGlzKVxuICAgIC5vblN5bmMoJ29wZW5lZCcsIHRoaXMuX29uT3BlbmVkLCB0aGlzKVxuICAgIC5vblN5bmMoJ2Nsb3NlZCcsIHRoaXMuX29uQ2xvc2VkLCB0aGlzKVxuICAgIC5vblN5bmMoJ3Nob3duJywgdGhpcy5fb25TaG93biwgdGhpcylcbiAgICAub25TeW5jKCdlbXB0eScsIHRoaXMuX29uRW1wdHksIHRoaXMpXG4gICAgLm9uU3luYygncmVkcmF3bicsIHRoaXMuX29uUmVkcmF3biwgdGhpcylcbiAgICAub25Bc3luYygnZGF0YXNldFJlbmRlcmVkJywgdGhpcy5fb25EYXRhc2V0UmVuZGVyZWQsIHRoaXMpO1xuXG4gIHRoaXMuaW5wdXQgPSBuZXcgVHlwZWFoZWFkLklucHV0KHtpbnB1dDogJGlucHV0LCBoaW50OiAkaGludH0pXG4gICAgLm9uU3luYygnZm9jdXNlZCcsIHRoaXMuX29uRm9jdXNlZCwgdGhpcylcbiAgICAub25TeW5jKCdibHVycmVkJywgdGhpcy5fb25CbHVycmVkLCB0aGlzKVxuICAgIC5vblN5bmMoJ2VudGVyS2V5ZWQnLCB0aGlzLl9vbkVudGVyS2V5ZWQsIHRoaXMpXG4gICAgLm9uU3luYygndGFiS2V5ZWQnLCB0aGlzLl9vblRhYktleWVkLCB0aGlzKVxuICAgIC5vblN5bmMoJ2VzY0tleWVkJywgdGhpcy5fb25Fc2NLZXllZCwgdGhpcylcbiAgICAub25TeW5jKCd1cEtleWVkJywgdGhpcy5fb25VcEtleWVkLCB0aGlzKVxuICAgIC5vblN5bmMoJ2Rvd25LZXllZCcsIHRoaXMuX29uRG93bktleWVkLCB0aGlzKVxuICAgIC5vblN5bmMoJ2xlZnRLZXllZCcsIHRoaXMuX29uTGVmdEtleWVkLCB0aGlzKVxuICAgIC5vblN5bmMoJ3JpZ2h0S2V5ZWQnLCB0aGlzLl9vblJpZ2h0S2V5ZWQsIHRoaXMpXG4gICAgLm9uU3luYygncXVlcnlDaGFuZ2VkJywgdGhpcy5fb25RdWVyeUNoYW5nZWQsIHRoaXMpXG4gICAgLm9uU3luYygnd2hpdGVzcGFjZUNoYW5nZWQnLCB0aGlzLl9vbldoaXRlc3BhY2VDaGFuZ2VkLCB0aGlzKTtcblxuICB0aGlzLl9iaW5kS2V5Ym9hcmRTaG9ydGN1dHMobyk7XG5cbiAgdGhpcy5fc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbn1cblxuLy8gaW5zdGFuY2UgbWV0aG9kc1xuLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG5fLm1peGluKFR5cGVhaGVhZC5wcm90b3R5cGUsIHtcbiAgLy8gIyMjIHByaXZhdGVcblxuICBfYmluZEtleWJvYXJkU2hvcnRjdXRzOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLmtleWJvYXJkU2hvcnRjdXRzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciAkaW5wdXQgPSB0aGlzLiRpbnB1dDtcbiAgICB2YXIga2V5Ym9hcmRTaG9ydGN1dHMgPSBbXTtcbiAgICBfLmVhY2gob3B0aW9ucy5rZXlib2FyZFNob3J0Y3V0cywgZnVuY3Rpb24oa2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAga2V5ID0ga2V5LnRvVXBwZXJDYXNlKCkuY2hhckNvZGVBdCgwKTtcbiAgICAgIH1cbiAgICAgIGtleWJvYXJkU2hvcnRjdXRzLnB1c2goa2V5KTtcbiAgICB9KTtcbiAgICBET00uZWxlbWVudChkb2N1bWVudCkua2V5ZG93bihmdW5jdGlvbihldmVudCkge1xuICAgICAgdmFyIGVsdCA9IChldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCk7XG4gICAgICB2YXIgdGFnTmFtZSA9IGVsdC50YWdOYW1lO1xuICAgICAgaWYgKGVsdC5pc0NvbnRlbnRFZGl0YWJsZSB8fCB0YWdOYW1lID09PSAnSU5QVVQnIHx8IHRhZ05hbWUgPT09ICdTRUxFQ1QnIHx8IHRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgLy8gYWxyZWFkeSBpbiBhbiBpbnB1dFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB3aGljaCA9IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGU7XG4gICAgICBpZiAoa2V5Ym9hcmRTaG9ydGN1dHMuaW5kZXhPZih3aGljaCkgPT09IC0xKSB7XG4gICAgICAgIC8vIG5vdCB0aGUgcmlnaHQgc2hvcnRjdXRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAkaW5wdXQuZm9jdXMoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfSxcblxuICBfb25TdWdnZXN0aW9uQ2xpY2tlZDogZnVuY3Rpb24gb25TdWdnZXN0aW9uQ2xpY2tlZCh0eXBlLCAkZWwpIHtcbiAgICB2YXIgZGF0dW07XG4gICAgdmFyIGNvbnRleHQgPSB7c2VsZWN0aW9uTWV0aG9kOiAnY2xpY2snfTtcblxuICAgIGlmIChkYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JTdWdnZXN0aW9uKCRlbCkpIHtcbiAgICAgIHRoaXMuX3NlbGVjdChkYXR1bSwgY29udGV4dCk7XG4gICAgfVxuICB9LFxuXG4gIF9vbkN1cnNvck1vdmVkOiBmdW5jdGlvbiBvbkN1cnNvck1vdmVkKGV2ZW50LCB1cGRhdGVJbnB1dCkge1xuICAgIHZhciBkYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JDdXJzb3IoKTtcbiAgICB2YXIgY3VycmVudEN1cnNvcklkID0gdGhpcy5kcm9wZG93bi5nZXRDdXJyZW50Q3Vyc29yKCkuYXR0cignaWQnKTtcbiAgICB0aGlzLmlucHV0LnNldEFjdGl2ZURlc2NlbmRhbnQoY3VycmVudEN1cnNvcklkKTtcblxuICAgIGlmIChkYXR1bSkge1xuICAgICAgaWYgKHVwZGF0ZUlucHV0KSB7XG4gICAgICAgIHRoaXMuaW5wdXQuc2V0SW5wdXRWYWx1ZShkYXR1bS52YWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignY3Vyc29yY2hhbmdlZCcsIGRhdHVtLnJhdywgZGF0dW0uZGF0YXNldE5hbWUpO1xuICAgIH1cbiAgfSxcblxuICBfb25DdXJzb3JSZW1vdmVkOiBmdW5jdGlvbiBvbkN1cnNvclJlbW92ZWQoKSB7XG4gICAgdGhpcy5pbnB1dC5yZXNldElucHV0VmFsdWUoKTtcbiAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdjdXJzb3JyZW1vdmVkJyk7XG4gIH0sXG5cbiAgX29uRGF0YXNldFJlbmRlcmVkOiBmdW5jdGlvbiBvbkRhdGFzZXRSZW5kZXJlZCgpIHtcbiAgICB0aGlzLl91cGRhdGVIaW50KCk7XG5cbiAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ3VwZGF0ZWQnKTtcbiAgfSxcblxuICBfb25PcGVuZWQ6IGZ1bmN0aW9uIG9uT3BlbmVkKCkge1xuICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICB0aGlzLmlucHV0LmV4cGFuZCgpO1xuXG4gICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdvcGVuZWQnKTtcbiAgfSxcblxuICBfb25FbXB0eTogZnVuY3Rpb24gb25FbXB0eSgpIHtcbiAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ2VtcHR5Jyk7XG4gIH0sXG5cbiAgX29uUmVkcmF3bjogZnVuY3Rpb24gb25SZWRyYXduKCkge1xuICAgIHRoaXMuJG5vZGUuY3NzKCd0b3AnLCAwICsgJ3B4Jyk7XG4gICAgdGhpcy4kbm9kZS5jc3MoJ2xlZnQnLCAwICsgJ3B4Jyk7XG5cbiAgICB2YXIgaW5wdXRSZWN0ID0gdGhpcy4kaW5wdXRbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBpZiAodGhpcy5hdXRvV2lkdGgpIHtcbiAgICAgIHRoaXMuJG5vZGUuY3NzKCd3aWR0aCcsIGlucHV0UmVjdC53aWR0aCArICdweCcpO1xuICAgIH1cblxuICAgIHZhciB3cmFwcGVyUmVjdCA9IHRoaXMuJG5vZGVbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICB2YXIgdG9wID0gaW5wdXRSZWN0LmJvdHRvbSAtIHdyYXBwZXJSZWN0LnRvcDtcbiAgICB0aGlzLiRub2RlLmNzcygndG9wJywgdG9wICsgJ3B4Jyk7XG4gICAgdmFyIGxlZnQgPSBpbnB1dFJlY3QubGVmdCAtIHdyYXBwZXJSZWN0LmxlZnQ7XG4gICAgdGhpcy4kbm9kZS5jc3MoJ2xlZnQnLCBsZWZ0ICsgJ3B4Jyk7XG5cbiAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ3JlZHJhd24nKTtcbiAgfSxcblxuICBfb25TaG93bjogZnVuY3Rpb24gb25TaG93bigpIHtcbiAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ3Nob3duJyk7XG4gICAgaWYgKHRoaXMuYXV0b3NlbGVjdCkge1xuICAgICAgdGhpcy5kcm9wZG93bi5jdXJzb3JUb3BTdWdnZXN0aW9uKCk7XG4gICAgfVxuICB9LFxuXG4gIF9vbkNsb3NlZDogZnVuY3Rpb24gb25DbG9zZWQoKSB7XG4gICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcbiAgICB0aGlzLmlucHV0LnJlbW92ZUFjdGl2ZURlc2NlbmRhbnQoKTtcbiAgICB0aGlzLmlucHV0LmNvbGxhcHNlKCk7XG5cbiAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ2Nsb3NlZCcpO1xuICB9LFxuXG4gIF9vbkZvY3VzZWQ6IGZ1bmN0aW9uIG9uRm9jdXNlZCgpIHtcbiAgICB0aGlzLmlzQWN0aXZhdGVkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLm9wZW5PbkZvY3VzKSB7XG4gICAgICB2YXIgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gICAgICBpZiAocXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24udXBkYXRlKHF1ZXJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uZW1wdHkoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kcm9wZG93bi5vcGVuKCk7XG4gICAgfVxuICB9LFxuXG4gIF9vbkJsdXJyZWQ6IGZ1bmN0aW9uIG9uQmx1cnJlZCgpIHtcbiAgICB2YXIgY3Vyc29yRGF0dW07XG4gICAgdmFyIHRvcFN1Z2dlc3Rpb25EYXR1bTtcblxuICAgIGN1cnNvckRhdHVtID0gdGhpcy5kcm9wZG93bi5nZXREYXR1bUZvckN1cnNvcigpO1xuICAgIHRvcFN1Z2dlc3Rpb25EYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JUb3BTdWdnZXN0aW9uKCk7XG4gICAgdmFyIGNvbnRleHQgPSB7c2VsZWN0aW9uTWV0aG9kOiAnYmx1cid9O1xuXG4gICAgaWYgKCF0aGlzLmRlYnVnKSB7XG4gICAgICBpZiAodGhpcy5hdXRvc2VsZWN0T25CbHVyICYmIGN1cnNvckRhdHVtKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdChjdXJzb3JEYXR1bSwgY29udGV4dCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b3NlbGVjdE9uQmx1ciAmJiB0b3BTdWdnZXN0aW9uRGF0dW0pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0KHRvcFN1Z2dlc3Rpb25EYXR1bSwgY29udGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzQWN0aXZhdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uZW1wdHkoKTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5jbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfb25FbnRlcktleWVkOiBmdW5jdGlvbiBvbkVudGVyS2V5ZWQodHlwZSwgJGUpIHtcbiAgICB2YXIgY3Vyc29yRGF0dW07XG4gICAgdmFyIHRvcFN1Z2dlc3Rpb25EYXR1bTtcblxuICAgIGN1cnNvckRhdHVtID0gdGhpcy5kcm9wZG93bi5nZXREYXR1bUZvckN1cnNvcigpO1xuICAgIHRvcFN1Z2dlc3Rpb25EYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JUb3BTdWdnZXN0aW9uKCk7XG4gICAgdmFyIGNvbnRleHQgPSB7c2VsZWN0aW9uTWV0aG9kOiAnZW50ZXJLZXknfTtcblxuICAgIGlmIChjdXJzb3JEYXR1bSkge1xuICAgICAgdGhpcy5fc2VsZWN0KGN1cnNvckRhdHVtLCBjb250ZXh0KTtcbiAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmF1dG9zZWxlY3QgJiYgdG9wU3VnZ2VzdGlvbkRhdHVtKSB7XG4gICAgICB0aGlzLl9zZWxlY3QodG9wU3VnZ2VzdGlvbkRhdHVtLCBjb250ZXh0KTtcbiAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LFxuXG4gIF9vblRhYktleWVkOiBmdW5jdGlvbiBvblRhYktleWVkKHR5cGUsICRlKSB7XG4gICAgaWYgKCF0aGlzLnRhYkF1dG9jb21wbGV0ZSkge1xuICAgICAgLy8gQ2xvc2luZyB0aGUgZHJvcGRvd24gZW5hYmxlcyBmdXJ0aGVyIHRhYmJpbmdcbiAgICAgIHRoaXMuZHJvcGRvd24uY2xvc2UoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZGF0dW07XG4gICAgdmFyIGNvbnRleHQgPSB7c2VsZWN0aW9uTWV0aG9kOiAndGFiS2V5J307XG5cbiAgICBpZiAoZGF0dW0gPSB0aGlzLmRyb3Bkb3duLmdldERhdHVtRm9yQ3Vyc29yKCkpIHtcbiAgICAgIHRoaXMuX3NlbGVjdChkYXR1bSwgY29udGV4dCk7XG4gICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hdXRvY29tcGxldGUodHJ1ZSk7XG4gICAgfVxuICB9LFxuXG4gIF9vbkVzY0tleWVkOiBmdW5jdGlvbiBvbkVzY0tleWVkKCkge1xuICAgIHRoaXMuZHJvcGRvd24uY2xvc2UoKTtcbiAgICB0aGlzLmlucHV0LnJlc2V0SW5wdXRWYWx1ZSgpO1xuICB9LFxuXG4gIF9vblVwS2V5ZWQ6IGZ1bmN0aW9uIG9uVXBLZXllZCgpIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG5cbiAgICBpZiAodGhpcy5kcm9wZG93bi5pc0VtcHR5ICYmIHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgdGhpcy5kcm9wZG93bi51cGRhdGUocXVlcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyb3Bkb3duLm1vdmVDdXJzb3JVcCgpO1xuICAgIH1cblxuICAgIHRoaXMuZHJvcGRvd24ub3BlbigpO1xuICB9LFxuXG4gIF9vbkRvd25LZXllZDogZnVuY3Rpb24gb25Eb3duS2V5ZWQoKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuXG4gICAgaWYgKHRoaXMuZHJvcGRvd24uaXNFbXB0eSAmJiBxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgIHRoaXMuZHJvcGRvd24udXBkYXRlKHF1ZXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wZG93bi5tb3ZlQ3Vyc29yRG93bigpO1xuICAgIH1cblxuICAgIHRoaXMuZHJvcGRvd24ub3BlbigpO1xuICB9LFxuXG4gIF9vbkxlZnRLZXllZDogZnVuY3Rpb24gb25MZWZ0S2V5ZWQoKSB7XG4gICAgaWYgKHRoaXMuZGlyID09PSAncnRsJykge1xuICAgICAgdGhpcy5fYXV0b2NvbXBsZXRlKCk7XG4gICAgfVxuICB9LFxuXG4gIF9vblJpZ2h0S2V5ZWQ6IGZ1bmN0aW9uIG9uUmlnaHRLZXllZCgpIHtcbiAgICBpZiAodGhpcy5kaXIgPT09ICdsdHInKSB7XG4gICAgICB0aGlzLl9hdXRvY29tcGxldGUoKTtcbiAgICB9XG4gIH0sXG5cbiAgX29uUXVlcnlDaGFuZ2VkOiBmdW5jdGlvbiBvblF1ZXJ5Q2hhbmdlZChlLCBxdWVyeSkge1xuICAgIHRoaXMuaW5wdXQuY2xlYXJIaW50SWZJbnZhbGlkKCk7XG5cbiAgICBpZiAocXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShxdWVyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcGRvd24uZW1wdHkoKTtcbiAgICB9XG5cbiAgICB0aGlzLmRyb3Bkb3duLm9wZW4oKTtcbiAgICB0aGlzLl9zZXRMYW5ndWFnZURpcmVjdGlvbigpO1xuICB9LFxuXG4gIF9vbldoaXRlc3BhY2VDaGFuZ2VkOiBmdW5jdGlvbiBvbldoaXRlc3BhY2VDaGFuZ2VkKCkge1xuICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICB0aGlzLmRyb3Bkb3duLm9wZW4oKTtcbiAgfSxcblxuICBfc2V0TGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIHNldExhbmd1YWdlRGlyZWN0aW9uKCkge1xuICAgIHZhciBkaXIgPSB0aGlzLmlucHV0LmdldExhbmd1YWdlRGlyZWN0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5kaXIgIT09IGRpcikge1xuICAgICAgdGhpcy5kaXIgPSBkaXI7XG4gICAgICB0aGlzLiRub2RlLmNzcygnZGlyZWN0aW9uJywgZGlyKTtcbiAgICAgIHRoaXMuZHJvcGRvd24uc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKTtcbiAgICB9XG4gIH0sXG5cbiAgX3VwZGF0ZUhpbnQ6IGZ1bmN0aW9uIHVwZGF0ZUhpbnQoKSB7XG4gICAgdmFyIGRhdHVtO1xuICAgIHZhciB2YWw7XG4gICAgdmFyIHF1ZXJ5O1xuICAgIHZhciBlc2NhcGVkUXVlcnk7XG4gICAgdmFyIGZyb250TWF0Y2hSZWdFeDtcbiAgICB2YXIgbWF0Y2g7XG5cbiAgICBkYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JUb3BTdWdnZXN0aW9uKCk7XG5cbiAgICBpZiAoZGF0dW0gJiYgdGhpcy5kcm9wZG93bi5pc1Zpc2libGUoKSAmJiAhdGhpcy5pbnB1dC5oYXNPdmVyZmxvdygpKSB7XG4gICAgICB2YWwgPSB0aGlzLmlucHV0LmdldElucHV0VmFsdWUoKTtcbiAgICAgIHF1ZXJ5ID0gSW5wdXQubm9ybWFsaXplUXVlcnkodmFsKTtcbiAgICAgIGVzY2FwZWRRdWVyeSA9IF8uZXNjYXBlUmVnRXhDaGFycyhxdWVyeSk7XG5cbiAgICAgIC8vIG1hdGNoIGlucHV0IHZhbHVlLCB0aGVuIGNhcHR1cmUgdHJhaWxpbmcgdGV4dFxuICAgICAgZnJvbnRNYXRjaFJlZ0V4ID0gbmV3IFJlZ0V4cCgnXig/OicgKyBlc2NhcGVkUXVlcnkgKyAnKSguKyQpJywgJ2knKTtcbiAgICAgIG1hdGNoID0gZnJvbnRNYXRjaFJlZ0V4LmV4ZWMoZGF0dW0udmFsdWUpO1xuXG4gICAgICAvLyBjbGVhciBoaW50IGlmIHRoZXJlJ3Mgbm8gdHJhaWxpbmcgdGV4dFxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHRoaXMuaW5wdXQuc2V0SGludCh2YWwgKyBtYXRjaFsxXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlucHV0LmNsZWFySGludCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlucHV0LmNsZWFySGludCgpO1xuICAgIH1cbiAgfSxcblxuICBfYXV0b2NvbXBsZXRlOiBmdW5jdGlvbiBhdXRvY29tcGxldGUobGF4Q3Vyc29yKSB7XG4gICAgdmFyIGhpbnQ7XG4gICAgdmFyIHF1ZXJ5O1xuICAgIHZhciBpc0N1cnNvckF0RW5kO1xuICAgIHZhciBkYXR1bTtcblxuICAgIGhpbnQgPSB0aGlzLmlucHV0LmdldEhpbnQoKTtcbiAgICBxdWVyeSA9IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcbiAgICBpc0N1cnNvckF0RW5kID0gbGF4Q3Vyc29yIHx8IHRoaXMuaW5wdXQuaXNDdXJzb3JBdEVuZCgpO1xuXG4gICAgaWYgKGhpbnQgJiYgcXVlcnkgIT09IGhpbnQgJiYgaXNDdXJzb3JBdEVuZCkge1xuICAgICAgZGF0dW0gPSB0aGlzLmRyb3Bkb3duLmdldERhdHVtRm9yVG9wU3VnZ2VzdGlvbigpO1xuICAgICAgaWYgKGRhdHVtKSB7XG4gICAgICAgIHRoaXMuaW5wdXQuc2V0SW5wdXRWYWx1ZShkYXR1bS52YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignYXV0b2NvbXBsZXRlZCcsIGRhdHVtLnJhdywgZGF0dW0uZGF0YXNldE5hbWUpO1xuICAgIH1cbiAgfSxcblxuICBfc2VsZWN0OiBmdW5jdGlvbiBzZWxlY3QoZGF0dW0sIGNvbnRleHQpIHtcbiAgICBpZiAodHlwZW9mIGRhdHVtLnZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5pbnB1dC5zZXRRdWVyeShkYXR1bS52YWx1ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNsZWFyT25TZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZXRWYWwoJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlucHV0LnNldElucHV0VmFsdWUoZGF0dW0udmFsdWUsIHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuX3NldExhbmd1YWdlRGlyZWN0aW9uKCk7XG5cbiAgICB2YXIgZXZlbnQgPSB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ3NlbGVjdGVkJywgZGF0dW0ucmF3LCBkYXR1bS5kYXRhc2V0TmFtZSwgY29udGV4dCk7XG4gICAgaWYgKGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5kcm9wZG93bi5jbG9zZSgpO1xuXG4gICAgICAvLyAjMTE4OiBhbGxvdyBjbGljayBldmVudCB0byBidWJibGUgdXAgdG8gdGhlIGJvZHkgYmVmb3JlIHJlbW92aW5nXG4gICAgICAvLyB0aGUgc3VnZ2VzdGlvbnMgb3RoZXJ3aXNlIHdlIGJyZWFrIGV2ZW50IGRlbGVnYXRpb25cbiAgICAgIF8uZGVmZXIoXy5iaW5kKHRoaXMuZHJvcGRvd24uZW1wdHksIHRoaXMuZHJvcGRvd24pKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gIyMjIHB1YmxpY1xuXG4gIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgLy8gaWYgdGhlIG1lbnUgaXMgbm90IGFjdGl2YXRlZCB5ZXQsIHdlIG5lZWQgdG8gdXBkYXRlXG4gICAgLy8gdGhlIHVuZGVybHlpbmcgZHJvcGRvd24gbWVudSB0byB0cmlnZ2VyIHRoZSBzZWFyY2hcbiAgICAvLyBvdGhlcndpc2Ugd2UncmUgbm90IGdvbm5hIHNlZSBhbnl0aGluZ1xuICAgIGlmICghdGhpcy5pc0FjdGl2YXRlZCkge1xuICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRJbnB1dFZhbHVlKCk7XG4gICAgICBpZiAocXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24udXBkYXRlKHF1ZXJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uZW1wdHkoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kcm9wZG93bi5vcGVuKCk7XG4gIH0sXG5cbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIHRoaXMuZHJvcGRvd24uY2xvc2UoKTtcbiAgfSxcblxuICBzZXRWYWw6IGZ1bmN0aW9uIHNldFZhbCh2YWwpIHtcbiAgICAvLyBleHBlY3QgdmFsIHRvIGJlIGEgc3RyaW5nLCBzbyBiZSBzYWZlLCBhbmQgY29lcmNlXG4gICAgdmFsID0gXy50b1N0cih2YWwpO1xuXG4gICAgaWYgKHRoaXMuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHRoaXMuaW5wdXQuc2V0SW5wdXRWYWx1ZSh2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlucHV0LnNldFF1ZXJ5KHZhbCk7XG4gICAgICB0aGlzLmlucHV0LnNldElucHV0VmFsdWUodmFsLCB0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZXRMYW5ndWFnZURpcmVjdGlvbigpO1xuICB9LFxuXG4gIGdldFZhbDogZnVuY3Rpb24gZ2V0VmFsKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gIH0sXG5cbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICB0aGlzLmRyb3Bkb3duLmRlc3Ryb3koKTtcblxuICAgIGRlc3Ryb3lEb21TdHJ1Y3R1cmUodGhpcy4kbm9kZSwgdGhpcy5jc3NDbGFzc2VzKTtcblxuICAgIHRoaXMuJG5vZGUgPSBudWxsO1xuICB9LFxuXG4gIGdldFdyYXBwZXI6IGZ1bmN0aW9uIGdldFdyYXBwZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZHJvcGRvd24uJGNvbnRhaW5lclswXTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGJ1aWxkRG9tKG9wdGlvbnMpIHtcbiAgdmFyICRpbnB1dDtcbiAgdmFyICR3cmFwcGVyO1xuICB2YXIgJGRyb3Bkb3duO1xuICB2YXIgJGhpbnQ7XG5cbiAgJGlucHV0ID0gRE9NLmVsZW1lbnQob3B0aW9ucy5pbnB1dCk7XG4gICR3cmFwcGVyID0gRE9NXG4gICAgLmVsZW1lbnQoaHRtbC53cmFwcGVyLnJlcGxhY2UoJyVST09UJScsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5yb290KSlcbiAgICAuY3NzKG9wdGlvbnMuY3NzLndyYXBwZXIpO1xuXG4gIC8vIG92ZXJyaWRlIHRoZSBkaXNwbGF5IHByb3BlcnR5IHdpdGggdGhlIHRhYmxlLWNlbGwgdmFsdWVcbiAgLy8gaWYgdGhlIHBhcmVudCBlbGVtZW50IGlzIGEgdGFibGUgYW5kIHRoZSBvcmlnaW5hbCBpbnB1dCB3YXMgYSBibG9ja1xuICAvLyAgLT4gaHR0cHM6Ly9naXRodWIuY29tL2FsZ29saWEvYXV0b2NvbXBsZXRlLmpzL2lzc3Vlcy8xNlxuICBpZiAoIW9wdGlvbnMuYXBwZW5kVG8gJiYgJGlucHV0LmNzcygnZGlzcGxheScpID09PSAnYmxvY2snICYmICRpbnB1dC5wYXJlbnQoKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ3RhYmxlJykge1xuICAgICR3cmFwcGVyLmNzcygnZGlzcGxheScsICd0YWJsZS1jZWxsJyk7XG4gIH1cbiAgdmFyIGRyb3Bkb3duSHRtbCA9IGh0bWwuZHJvcGRvd24uXG4gICAgcmVwbGFjZSgnJVBSRUZJWCUnLCBvcHRpb25zLmNzc0NsYXNzZXMucHJlZml4KS5cbiAgICByZXBsYWNlKCclRFJPUERPV05fTUVOVSUnLCBvcHRpb25zLmNzc0NsYXNzZXMuZHJvcGRvd25NZW51KTtcbiAgJGRyb3Bkb3duID0gRE9NLmVsZW1lbnQoZHJvcGRvd25IdG1sKVxuICAgIC5jc3Mob3B0aW9ucy5jc3MuZHJvcGRvd24pXG4gICAgLmF0dHIoe1xuICAgICAgcm9sZTogJ2xpc3Rib3gnLFxuICAgICAgaWQ6IG9wdGlvbnMubGlzdGJveElkXG4gICAgfSk7XG4gIGlmIChvcHRpb25zLnRlbXBsYXRlcyAmJiBvcHRpb25zLnRlbXBsYXRlcy5kcm9wZG93bk1lbnUpIHtcbiAgICAkZHJvcGRvd24uaHRtbChfLnRlbXBsYXRpZnkob3B0aW9ucy50ZW1wbGF0ZXMuZHJvcGRvd25NZW51KSgpKTtcbiAgfVxuICAkaGludCA9ICRpbnB1dC5jbG9uZSgpLmNzcyhvcHRpb25zLmNzcy5oaW50KS5jc3MoZ2V0QmFja2dyb3VuZFN0eWxlcygkaW5wdXQpKTtcblxuICAkaGludFxuICAgIC52YWwoJycpXG4gICAgLmFkZENsYXNzKF8uY2xhc3NOYW1lKG9wdGlvbnMuY3NzQ2xhc3Nlcy5wcmVmaXgsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5oaW50LCB0cnVlKSlcbiAgICAucmVtb3ZlQXR0cignaWQgbmFtZSBwbGFjZWhvbGRlciByZXF1aXJlZCcpXG4gICAgLnByb3AoJ3JlYWRvbmx5JywgdHJ1ZSlcbiAgICAuYXR0cih7XG4gICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICAgICAgc3BlbGxjaGVjazogJ2ZhbHNlJyxcbiAgICAgIHRhYmluZGV4OiAtMVxuICAgIH0pO1xuICBpZiAoJGhpbnQucmVtb3ZlRGF0YSkge1xuICAgICRoaW50LnJlbW92ZURhdGEoKTtcbiAgfVxuXG4gIC8vIHN0b3JlIHRoZSBvcmlnaW5hbCB2YWx1ZXMgb2YgdGhlIGF0dHJzIHRoYXQgZ2V0IG1vZGlmaWVkXG4gIC8vIHNvIG1vZGlmaWNhdGlvbnMgY2FuIGJlIHJldmVydGVkIG9uIGRlc3Ryb3lcbiAgJGlucHV0LmRhdGEoYXR0cnNLZXksIHtcbiAgICAnYXJpYS1hdXRvY29tcGxldGUnOiAkaW5wdXQuYXR0cignYXJpYS1hdXRvY29tcGxldGUnKSxcbiAgICAnYXJpYS1leHBhbmRlZCc6ICRpbnB1dC5hdHRyKCdhcmlhLWV4cGFuZGVkJyksXG4gICAgJ2FyaWEtb3ducyc6ICRpbnB1dC5hdHRyKCdhcmlhLW93bnMnKSxcbiAgICBhdXRvY29tcGxldGU6ICRpbnB1dC5hdHRyKCdhdXRvY29tcGxldGUnKSxcbiAgICBkaXI6ICRpbnB1dC5hdHRyKCdkaXInKSxcbiAgICByb2xlOiAkaW5wdXQuYXR0cigncm9sZScpLFxuICAgIHNwZWxsY2hlY2s6ICRpbnB1dC5hdHRyKCdzcGVsbGNoZWNrJyksXG4gICAgc3R5bGU6ICRpbnB1dC5hdHRyKCdzdHlsZScpLFxuICAgIHR5cGU6ICRpbnB1dC5hdHRyKCd0eXBlJylcbiAgfSk7XG5cbiAgJGlucHV0XG4gICAgLmFkZENsYXNzKF8uY2xhc3NOYW1lKG9wdGlvbnMuY3NzQ2xhc3Nlcy5wcmVmaXgsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5pbnB1dCwgdHJ1ZSkpXG4gICAgLmF0dHIoe1xuICAgICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgICAgIHNwZWxsY2hlY2s6IGZhbHNlLFxuXG4gICAgICAvLyBBY2Nlc3NpYmlsaXR5IGZlYXR1cmVzXG4gICAgICAvLyBHaXZlIHRoZSBmaWVsZCBhIHByZXNlbnRhdGlvbiBvZiBhIFwic2VsZWN0XCIuXG4gICAgICAvLyBDb21ib2JveCBpcyB0aGUgY29tYmluZWQgcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIGxpbmUgdGV4dGZpZWxkXG4gICAgICAvLyB3aXRoIGEgbGlzdGJveCBwb3B1cC5cbiAgICAgIC8vIGh0dHBzOi8vd3d3LnczLm9yZy9XQUkvUEYvYXJpYS9yb2xlcyNjb21ib2JveFxuICAgICAgcm9sZTogJ2NvbWJvYm94JyxcbiAgICAgIC8vIExldCB0aGUgc2NyZWVuIHJlYWRlciBrbm93IHRoZSBmaWVsZCBoYXMgYW4gYXV0b2NvbXBsZXRlXG4gICAgICAvLyBmZWF0dXJlIHRvIGl0LlxuICAgICAgJ2FyaWEtYXV0b2NvbXBsZXRlJzogKG9wdGlvbnMuZGF0YXNldHMgJiZcbiAgICAgICAgb3B0aW9ucy5kYXRhc2V0c1swXSAmJiBvcHRpb25zLmRhdGFzZXRzWzBdLmRpc3BsYXlLZXkgPyAnYm90aCcgOiAnbGlzdCcpLFxuICAgICAgLy8gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRyb3Bkb3duIGl0IGNvbnRyb2xzIGlzIGN1cnJlbnRseSBleHBhbmRlZCBvciBjb2xsYXBzZWRcbiAgICAgICdhcmlhLWV4cGFuZGVkJzogJ2ZhbHNlJyxcbiAgICAgICdhcmlhLWxhYmVsJzogb3B0aW9ucy5hcmlhTGFiZWwsXG4gICAgICAvLyBFeHBsaWNpdGx5IHBvaW50IHRvIHRoZSBsaXN0Ym94LFxuICAgICAgLy8gd2hpY2ggaXMgYSBsaXN0IG9mIHN1Z2dlc3Rpb25zIChha2Egb3B0aW9ucylcbiAgICAgICdhcmlhLW93bnMnOiBvcHRpb25zLmxpc3Rib3hJZFxuICAgIH0pXG4gICAgLmNzcyhvcHRpb25zLmhpbnQgPyBvcHRpb25zLmNzcy5pbnB1dCA6IG9wdGlvbnMuY3NzLmlucHV0V2l0aE5vSGludCk7XG5cbiAgLy8gaWU3IGRvZXMgbm90IGxpa2UgaXQgd2hlbiBkaXIgaXMgc2V0IHRvIGF1dG9cbiAgdHJ5IHtcbiAgICBpZiAoISRpbnB1dC5hdHRyKCdkaXInKSkge1xuICAgICAgJGlucHV0LmF0dHIoJ2RpcicsICdhdXRvJyk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gaWdub3JlXG4gIH1cblxuICAkd3JhcHBlciA9IG9wdGlvbnMuYXBwZW5kVG9cbiAgICA/ICR3cmFwcGVyLmFwcGVuZFRvKERPTS5lbGVtZW50KG9wdGlvbnMuYXBwZW5kVG8pLmVxKDApKS5lcSgwKVxuICAgIDogJGlucHV0LndyYXAoJHdyYXBwZXIpLnBhcmVudCgpO1xuXG4gICR3cmFwcGVyXG4gICAgLnByZXBlbmQob3B0aW9ucy5oaW50ID8gJGhpbnQgOiBudWxsKVxuICAgIC5hcHBlbmQoJGRyb3Bkb3duKTtcblxuICByZXR1cm4ge1xuICAgIHdyYXBwZXI6ICR3cmFwcGVyLFxuICAgIGlucHV0OiAkaW5wdXQsXG4gICAgaGludDogJGhpbnQsXG4gICAgbWVudTogJGRyb3Bkb3duXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldEJhY2tncm91bmRTdHlsZXMoJGVsKSB7XG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZEF0dGFjaG1lbnQ6ICRlbC5jc3MoJ2JhY2tncm91bmQtYXR0YWNobWVudCcpLFxuICAgIGJhY2tncm91bmRDbGlwOiAkZWwuY3NzKCdiYWNrZ3JvdW5kLWNsaXAnKSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICRlbC5jc3MoJ2JhY2tncm91bmQtY29sb3InKSxcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6ICRlbC5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcbiAgICBiYWNrZ3JvdW5kT3JpZ2luOiAkZWwuY3NzKCdiYWNrZ3JvdW5kLW9yaWdpbicpLFxuICAgIGJhY2tncm91bmRQb3NpdGlvbjogJGVsLmNzcygnYmFja2dyb3VuZC1wb3NpdGlvbicpLFxuICAgIGJhY2tncm91bmRSZXBlYXQ6ICRlbC5jc3MoJ2JhY2tncm91bmQtcmVwZWF0JyksXG4gICAgYmFja2dyb3VuZFNpemU6ICRlbC5jc3MoJ2JhY2tncm91bmQtc2l6ZScpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3lEb21TdHJ1Y3R1cmUoJG5vZGUsIGNzc0NsYXNzZXMpIHtcbiAgdmFyICRpbnB1dCA9ICRub2RlLmZpbmQoXy5jbGFzc05hbWUoY3NzQ2xhc3Nlcy5wcmVmaXgsIGNzc0NsYXNzZXMuaW5wdXQpKTtcblxuICAvLyBuZWVkIHRvIHJlbW92ZSBhdHRycyB0aGF0IHdlcmVuJ3QgcHJldmlvdXNseSBkZWZpbmVkIGFuZFxuICAvLyByZXZlcnQgYXR0cnMgdGhhdCBvcmlnaW5hbGx5IGhhZCBhIHZhbHVlXG4gIF8uZWFjaCgkaW5wdXQuZGF0YShhdHRyc0tleSksIGZ1bmN0aW9uKHZhbCwga2V5KSB7XG4gICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAkaW5wdXQucmVtb3ZlQXR0cihrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkaW5wdXQuYXR0cihrZXksIHZhbCk7XG4gICAgfVxuICB9KTtcblxuICAkaW5wdXRcbiAgICAuZGV0YWNoKClcbiAgICAucmVtb3ZlQ2xhc3MoXy5jbGFzc05hbWUoY3NzQ2xhc3Nlcy5wcmVmaXgsIGNzc0NsYXNzZXMuaW5wdXQsIHRydWUpKVxuICAgIC5pbnNlcnRBZnRlcigkbm9kZSk7XG4gIGlmICgkaW5wdXQucmVtb3ZlRGF0YSkge1xuICAgICRpbnB1dC5yZW1vdmVEYXRhKGF0dHJzS2V5KTtcbiAgfVxuXG4gICRub2RlLnJlbW92ZSgpO1xufVxuXG5UeXBlYWhlYWQuRHJvcGRvd24gPSBEcm9wZG93bjtcblR5cGVhaGVhZC5JbnB1dCA9IElucHV0O1xuVHlwZWFoZWFkLnNvdXJjZXMgPSByZXF1aXJlKCcuLi9zb3VyY2VzL2luZGV4LmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHlwZWFoZWFkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZWxlbWVudDogbnVsbFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUFsZ29saWFDbGllbnRWZXJzaW9uKGFnZW50KSB7XG4gIHZhciBwYXJzZWQgPVxuICAgIC8vIFVzZXIgYWdlbnQgZm9yIGFsZ29saWFzZWFyY2ggPj0gMy4zMy4wXG4gICAgYWdlbnQubWF0Y2goL0FsZ29saWEgZm9yIEphdmFTY3JpcHQgXFwoKFxcZCtcXC4pKFxcZCtcXC4pKFxcZCspXFwpLykgfHxcbiAgICAvLyBVc2VyIGFnZW50IGZvciBhbGdvbGlhc2VhcmNoIDwgMy4zMy4wXG4gICAgYWdlbnQubWF0Y2goL0FsZ29saWEgZm9yIHZhbmlsbGEgSmF2YVNjcmlwdCAoXFxkK1xcLikoXFxkK1xcLikoXFxkKykvKTtcblxuICBpZiAocGFyc2VkKSB7XG4gICAgcmV0dXJuIFtwYXJzZWRbMV0sIHBhcnNlZFsyXSwgcGFyc2VkWzNdXTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRE9NID0gcmVxdWlyZSgnLi9kb20uanMnKTtcblxuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCAnXFxcXCQmJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyB0aG9zZSBtZXRob2RzIGFyZSBpbXBsZW1lbnRlZCBkaWZmZXJlbnRseVxuICAvLyBkZXBlbmRpbmcgb24gd2hpY2ggYnVpbGQgaXQgaXMsIHVzaW5nXG4gIC8vICQuLi4gb3IgYW5ndWxhci4uLiBvciBaZXB0by4uLiBvciByZXF1aXJlKC4uLilcbiAgaXNBcnJheTogbnVsbCxcbiAgaXNGdW5jdGlvbjogbnVsbCxcbiAgaXNPYmplY3Q6IG51bGwsXG4gIGJpbmQ6IG51bGwsXG4gIGVhY2g6IG51bGwsXG4gIG1hcDogbnVsbCxcbiAgbWl4aW46IG51bGwsXG5cbiAgaXNNc2llOiBmdW5jdGlvbihhZ2VudFN0cmluZykge1xuICAgIGlmIChhZ2VudFN0cmluZyA9PT0gdW5kZWZpbmVkKSB7IGFnZW50U3RyaW5nID0gbmF2aWdhdG9yLnVzZXJBZ2VudDsgfVxuICAgIC8vIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2RlZC9ib3dzZXIvYmxvYi9tYXN0ZXIvYm93c2VyLmpzXG4gICAgaWYgKCgvKG1zaWV8dHJpZGVudCkvaSkudGVzdChhZ2VudFN0cmluZykpIHtcbiAgICAgIHZhciBtYXRjaCA9IGFnZW50U3RyaW5nLm1hdGNoKC8obXNpZSB8cnY6KShcXGQrKC5cXGQrKT8pL2kpO1xuICAgICAgaWYgKG1hdGNoKSB7IHJldHVybiBtYXRjaFsyXTsgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjk2OTQ4NlxuICBlc2NhcGVSZWdFeENoYXJzOiBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCAnXFxcXCQmJyk7XG4gIH0sXG5cbiAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ251bWJlcic7IH0sXG5cbiAgdG9TdHI6IGZ1bmN0aW9uIHRvU3RyKHMpIHtcbiAgICByZXR1cm4gcyA9PT0gdW5kZWZpbmVkIHx8IHMgPT09IG51bGwgPyAnJyA6IHMgKyAnJztcbiAgfSxcblxuICBjbG9uZURlZXA6IGZ1bmN0aW9uIGNsb25lRGVlcChvYmopIHtcbiAgICB2YXIgY2xvbmUgPSB0aGlzLm1peGluKHt9LCBvYmopO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmVhY2goY2xvbmUsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBpZiAoc2VsZi5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIGNsb25lW2tleV0gPSBbXS5jb25jYXQodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHNlbGYuaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgY2xvbmVba2V5XSA9IHNlbGYuY2xvbmVEZWVwKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfSxcblxuICBlcnJvcjogZnVuY3Rpb24obXNnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gIH0sXG5cbiAgZXZlcnk6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgIGlmICghb2JqKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB0aGlzLmVhY2gob2JqLCBmdW5jdGlvbih2YWwsIGtleSkge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikgJiYgcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiAhIXJlc3VsdDtcbiAgfSxcblxuICBhbnk6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgIGlmICghb2JqKSB7XG4gICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuICAgIHRoaXMuZWFjaChvYmosIGZ1bmN0aW9uKHZhbCwga2V5KSB7XG4gICAgICBpZiAodGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZDtcbiAgfSxcblxuICBnZXRVbmlxdWVJZDogKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb3VudGVyID0gMDtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBjb3VudGVyKys7IH07XG4gIH0pKCksXG5cbiAgdGVtcGxhdGlmeTogZnVuY3Rpb24gdGVtcGxhdGlmeShvYmopIHtcbiAgICBpZiAodGhpcy5pc0Z1bmN0aW9uKG9iaikpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIHZhciAkdGVtcGxhdGUgPSBET00uZWxlbWVudChvYmopO1xuICAgIGlmICgkdGVtcGxhdGUucHJvcCgndGFnTmFtZScpID09PSAnU0NSSVBUJykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRlbXBsYXRlKCkgeyByZXR1cm4gJHRlbXBsYXRlLnRleHQoKTsgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRlbXBsYXRlKCkgeyByZXR1cm4gU3RyaW5nKG9iaik7IH07XG4gIH0sXG5cbiAgZGVmZXI6IGZ1bmN0aW9uKGZuKSB7IHNldFRpbWVvdXQoZm4sIDApOyB9LFxuXG4gIG5vb3A6IGZ1bmN0aW9uKCkge30sXG5cbiAgZm9ybWF0UHJlZml4OiBmdW5jdGlvbihwcmVmaXgsIG5vUHJlZml4KSB7XG4gICAgcmV0dXJuIG5vUHJlZml4ID8gJycgOiBwcmVmaXggKyAnLSc7XG4gIH0sXG5cbiAgY2xhc3NOYW1lOiBmdW5jdGlvbihwcmVmaXgsIGNsYXp6LCBza2lwRG90KSB7XG4gICAgcmV0dXJuIChza2lwRG90ID8gJycgOiAnLicpICsgcHJlZml4ICsgY2xheno7XG4gIH0sXG5cbiAgZXNjYXBlSGlnaGxpZ2h0ZWRTdHJpbmc6IGZ1bmN0aW9uKHN0ciwgaGlnaGxpZ2h0UHJlVGFnLCBoaWdobGlnaHRQb3N0VGFnKSB7XG4gICAgaGlnaGxpZ2h0UHJlVGFnID0gaGlnaGxpZ2h0UHJlVGFnIHx8ICc8ZW0+JztcbiAgICB2YXIgcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGhpZ2hsaWdodFByZVRhZykpO1xuXG4gICAgaGlnaGxpZ2h0UG9zdFRhZyA9IGhpZ2hsaWdodFBvc3RUYWcgfHwgJzwvZW0+JztcbiAgICB2YXIgcG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBvc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaGlnaGxpZ2h0UG9zdFRhZykpO1xuXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTFxuICAgICAgLnJlcGxhY2UoUmVnRXhwKGVzY2FwZVJlZ0V4cChwcmUuaW5uZXJIVE1MKSwgJ2cnKSwgaGlnaGxpZ2h0UHJlVGFnKVxuICAgICAgLnJlcGxhY2UoUmVnRXhwKGVzY2FwZVJlZ0V4cChwb3N0LmlubmVySFRNTCksICdnJyksIGhpZ2hsaWdodFBvc3RUYWcpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscy5qcycpO1xudmFyIHZlcnNpb24gPSByZXF1aXJlKCcuLi8uLi92ZXJzaW9uLmpzJyk7XG52YXIgcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbiA9IHJlcXVpcmUoJy4uL2NvbW1vbi9wYXJzZUFsZ29saWFDbGllbnRWZXJzaW9uLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VhcmNoKGluZGV4LCBwYXJhbXMpIHtcbiAgdmFyIGFsZ29saWFWZXJzaW9uID0gcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbihpbmRleC5hcy5fdWEpO1xuICBpZiAoYWxnb2xpYVZlcnNpb24gJiYgYWxnb2xpYVZlcnNpb25bMF0gPj0gMyAmJiBhbGdvbGlhVmVyc2lvblsxXSA+IDIwKSB7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgIHBhcmFtcy5hZGRpdGlvbmFsVUEgPSAnYXV0b2NvbXBsZXRlLmpzICcgKyB2ZXJzaW9uO1xuICB9XG4gIHJldHVybiBzb3VyY2VGbjtcblxuICBmdW5jdGlvbiBzb3VyY2VGbihxdWVyeSwgY2IpIHtcbiAgICBpbmRleC5zZWFyY2gocXVlcnksIHBhcmFtcywgZnVuY3Rpb24oZXJyb3IsIGNvbnRlbnQpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBfLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjYihjb250ZW50LmhpdHMsIGNvbnRlbnQpO1xuICAgIH0pO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGl0czogcmVxdWlyZSgnLi9oaXRzLmpzJyksXG4gIHBvcHVsYXJJbjogcmVxdWlyZSgnLi9wb3B1bGFySW4uanMnKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF8gPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMuanMnKTtcbnZhciB2ZXJzaW9uID0gcmVxdWlyZSgnLi4vLi4vdmVyc2lvbi5qcycpO1xudmFyIHBhcnNlQWxnb2xpYUNsaWVudFZlcnNpb24gPSByZXF1aXJlKCcuLi9jb21tb24vcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbi5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBvcHVsYXJJbihpbmRleCwgcGFyYW1zLCBkZXRhaWxzLCBvcHRpb25zKSB7XG4gIHZhciBhbGdvbGlhVmVyc2lvbiA9IHBhcnNlQWxnb2xpYUNsaWVudFZlcnNpb24oaW5kZXguYXMuX3VhKTtcbiAgaWYgKGFsZ29saWFWZXJzaW9uICYmIGFsZ29saWFWZXJzaW9uWzBdID49IDMgJiYgYWxnb2xpYVZlcnNpb25bMV0gPiAyMCkge1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICBwYXJhbXMuYWRkaXRpb25hbFVBID0gJ2F1dG9jb21wbGV0ZS5qcyAnICsgdmVyc2lvbjtcbiAgfVxuICBpZiAoIWRldGFpbHMuc291cmNlKSB7XG4gICAgcmV0dXJuIF8uZXJyb3IoXCJNaXNzaW5nICdzb3VyY2UnIGtleVwiKTtcbiAgfVxuICB2YXIgc291cmNlID0gXy5pc0Z1bmN0aW9uKGRldGFpbHMuc291cmNlKSA/IGRldGFpbHMuc291cmNlIDogZnVuY3Rpb24oaGl0KSB7IHJldHVybiBoaXRbZGV0YWlscy5zb3VyY2VdOyB9O1xuXG4gIGlmICghZGV0YWlscy5pbmRleCkge1xuICAgIHJldHVybiBfLmVycm9yKFwiTWlzc2luZyAnaW5kZXgnIGtleVwiKTtcbiAgfVxuICB2YXIgZGV0YWlsc0luZGV4ID0gZGV0YWlscy5pbmRleDtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICByZXR1cm4gc291cmNlRm47XG5cbiAgZnVuY3Rpb24gc291cmNlRm4ocXVlcnksIGNiKSB7XG4gICAgaW5kZXguc2VhcmNoKHF1ZXJ5LCBwYXJhbXMsIGZ1bmN0aW9uKGVycm9yLCBjb250ZW50KSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgXy5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29udGVudC5oaXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGZpcnN0ID0gY29udGVudC5oaXRzWzBdO1xuXG4gICAgICAgIHZhciBkZXRhaWxzUGFyYW1zID0gXy5taXhpbih7aGl0c1BlclBhZ2U6IDB9LCBkZXRhaWxzKTtcbiAgICAgICAgZGVsZXRlIGRldGFpbHNQYXJhbXMuc291cmNlOyAvLyBub3QgYSBxdWVyeSBwYXJhbWV0ZXJcbiAgICAgICAgZGVsZXRlIGRldGFpbHNQYXJhbXMuaW5kZXg7IC8vIG5vdCBhIHF1ZXJ5IHBhcmFtZXRlclxuXG4gICAgICAgIHZhciBkZXRhaWxzQWxnb2xpYVZlcnNpb24gPSBwYXJzZUFsZ29saWFDbGllbnRWZXJzaW9uKGRldGFpbHNJbmRleC5hcy5fdWEpO1xuICAgICAgICBpZiAoZGV0YWlsc0FsZ29saWFWZXJzaW9uICYmIGRldGFpbHNBbGdvbGlhVmVyc2lvblswXSA+PSAzICYmIGRldGFpbHNBbGdvbGlhVmVyc2lvblsxXSA+IDIwKSB7XG4gICAgICAgICAgcGFyYW1zLmFkZGl0aW9uYWxVQSA9ICdhdXRvY29tcGxldGUuanMgJyArIHZlcnNpb247XG4gICAgICAgIH1cblxuICAgICAgICBkZXRhaWxzSW5kZXguc2VhcmNoKHNvdXJjZShmaXJzdCksIGRldGFpbHNQYXJhbXMsIGZ1bmN0aW9uKGVycm9yMiwgY29udGVudDIpIHtcbiAgICAgICAgICBpZiAoZXJyb3IyKSB7XG4gICAgICAgICAgICBfLmVycm9yKGVycm9yMi5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3VnZ2VzdGlvbnMgPSBbXTtcblxuICAgICAgICAgIC8vIGFkZCB0aGUgJ2FsbCBkZXBhcnRtZW50JyBlbnRyeSBiZWZvcmUgb3RoZXJzXG4gICAgICAgICAgaWYgKG9wdGlvbnMuaW5jbHVkZUFsbCkge1xuICAgICAgICAgICAgdmFyIGxhYmVsID0gb3B0aW9ucy5hbGxUaXRsZSB8fCAnQWxsIGRlcGFydG1lbnRzJztcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goXy5taXhpbih7XG4gICAgICAgICAgICAgIGZhY2V0OiB7dmFsdWU6IGxhYmVsLCBjb3VudDogY29udGVudDIubmJIaXRzfVxuICAgICAgICAgICAgfSwgXy5jbG9uZURlZXAoZmlyc3QpKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZW5yaWNoIHRoZSBmaXJzdCBoaXQgaXRlcmF0aW5nIG92ZXIgdGhlIGZhY2V0c1xuICAgICAgICAgIF8uZWFjaChjb250ZW50Mi5mYWNldHMsIGZ1bmN0aW9uKHZhbHVlcywgZmFjZXQpIHtcbiAgICAgICAgICAgIF8uZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uKGNvdW50LCB2YWx1ZSkge1xuICAgICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKF8ubWl4aW4oe1xuICAgICAgICAgICAgICAgIGZhY2V0OiB7ZmFjZXQ6IGZhY2V0LCB2YWx1ZTogdmFsdWUsIGNvdW50OiBjb3VudH1cbiAgICAgICAgICAgICAgfSwgXy5jbG9uZURlZXAoZmlyc3QpKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIGFwcGVuZCBhbGwgb3RoZXIgaGl0c1xuICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgY29udGVudC5oaXRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKGNvbnRlbnQuaGl0c1tpXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2Ioc3VnZ2VzdGlvbnMsIGNvbnRlbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNiKFtdKTtcbiAgICB9KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gdGhpcyB3aWxsIGluamVjdCBaZXB0byBpbiB3aW5kb3csIHVuZm9ydHVuYXRlbHkgbm8gZWFzeSBjb21tb25KUyB6ZXB0byBidWlsZFxudmFyIHplcHRvID0gcmVxdWlyZSgnLi4vLi4vemVwdG8uanMnKTtcblxuLy8gc2V0dXAgRE9NIGVsZW1lbnRcbnZhciBET00gPSByZXF1aXJlKCcuLi9jb21tb24vZG9tLmpzJyk7XG5ET00uZWxlbWVudCA9IHplcHRvO1xuXG4vLyBzZXR1cCB1dGlscyBmdW5jdGlvbnNcbnZhciBfID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzLmpzJyk7XG5fLmlzQXJyYXkgPSB6ZXB0by5pc0FycmF5O1xuXy5pc0Z1bmN0aW9uID0gemVwdG8uaXNGdW5jdGlvbjtcbl8uaXNPYmplY3QgPSB6ZXB0by5pc1BsYWluT2JqZWN0O1xuXy5iaW5kID0gemVwdG8ucHJveHk7XG5fLmVhY2ggPSBmdW5jdGlvbihjb2xsZWN0aW9uLCBjYikge1xuICAvLyBzdHVwaWQgYXJndW1lbnQgb3JkZXIgZm9yIGpRdWVyeS5lYWNoXG4gIHplcHRvLmVhY2goY29sbGVjdGlvbiwgcmV2ZXJzZUFyZ3MpO1xuICBmdW5jdGlvbiByZXZlcnNlQXJncyhpbmRleCwgdmFsdWUpIHtcbiAgICByZXR1cm4gY2IodmFsdWUsIGluZGV4KTtcbiAgfVxufTtcbl8ubWFwID0gemVwdG8ubWFwO1xuXy5taXhpbiA9IHplcHRvLmV4dGVuZDtcbl8uRXZlbnQgPSB6ZXB0by5FdmVudDtcblxudmFyIHR5cGVhaGVhZEtleSA9ICdhYUF1dG9jb21wbGV0ZSc7XG52YXIgVHlwZWFoZWFkID0gcmVxdWlyZSgnLi4vYXV0b2NvbXBsZXRlL3R5cGVhaGVhZC5qcycpO1xudmFyIEV2ZW50QnVzID0gcmVxdWlyZSgnLi4vYXV0b2NvbXBsZXRlL2V2ZW50X2J1cy5qcycpO1xuXG5mdW5jdGlvbiBhdXRvY29tcGxldGUoc2VsZWN0b3IsIG9wdGlvbnMsIGRhdGFzZXRzLCB0eXBlYWhlYWRPYmplY3QpIHtcbiAgZGF0YXNldHMgPSBfLmlzQXJyYXkoZGF0YXNldHMpID8gZGF0YXNldHMgOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgdmFyIGlucHV0cyA9IHplcHRvKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKGksIGlucHV0KSB7XG4gICAgdmFyICRpbnB1dCA9IHplcHRvKGlucHV0KTtcbiAgICB2YXIgZXZlbnRCdXMgPSBuZXcgRXZlbnRCdXMoe2VsOiAkaW5wdXR9KTtcbiAgICB2YXIgdHlwZWFoZWFkID0gdHlwZWFoZWFkT2JqZWN0IHx8IG5ldyBUeXBlYWhlYWQoe1xuICAgICAgaW5wdXQ6ICRpbnB1dCxcbiAgICAgIGV2ZW50QnVzOiBldmVudEJ1cyxcbiAgICAgIGRyb3Bkb3duTWVudUNvbnRhaW5lcjogb3B0aW9ucy5kcm9wZG93bk1lbnVDb250YWluZXIsXG4gICAgICBoaW50OiBvcHRpb25zLmhpbnQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiAhIW9wdGlvbnMuaGludCxcbiAgICAgIG1pbkxlbmd0aDogb3B0aW9ucy5taW5MZW5ndGgsXG4gICAgICBhdXRvc2VsZWN0OiBvcHRpb25zLmF1dG9zZWxlY3QsXG4gICAgICBhdXRvc2VsZWN0T25CbHVyOiBvcHRpb25zLmF1dG9zZWxlY3RPbkJsdXIsXG4gICAgICB0YWJBdXRvY29tcGxldGU6IG9wdGlvbnMudGFiQXV0b2NvbXBsZXRlLFxuICAgICAgb3Blbk9uRm9jdXM6IG9wdGlvbnMub3Blbk9uRm9jdXMsXG4gICAgICB0ZW1wbGF0ZXM6IG9wdGlvbnMudGVtcGxhdGVzLFxuICAgICAgZGVidWc6IG9wdGlvbnMuZGVidWcsXG4gICAgICBjbGVhck9uU2VsZWN0ZWQ6IG9wdGlvbnMuY2xlYXJPblNlbGVjdGVkLFxuICAgICAgY3NzQ2xhc3Nlczogb3B0aW9ucy5jc3NDbGFzc2VzLFxuICAgICAgZGF0YXNldHM6IGRhdGFzZXRzLFxuICAgICAga2V5Ym9hcmRTaG9ydGN1dHM6IG9wdGlvbnMua2V5Ym9hcmRTaG9ydGN1dHMsXG4gICAgICBhcHBlbmRUbzogb3B0aW9ucy5hcHBlbmRUbyxcbiAgICAgIGF1dG9XaWR0aDogb3B0aW9ucy5hdXRvV2lkdGgsXG4gICAgICBhcmlhTGFiZWw6IG9wdGlvbnMuYXJpYUxhYmVsIHx8IGlucHV0LmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpXG4gICAgfSk7XG4gICAgJGlucHV0LmRhdGEodHlwZWFoZWFkS2V5LCB0eXBlYWhlYWQpO1xuICB9KTtcblxuICAvLyBleHBvc2UgYWxsIG1ldGhvZHMgaW4gdGhlIGBhdXRvY29tcGxldGVgIGF0dHJpYnV0ZVxuICBpbnB1dHMuYXV0b2NvbXBsZXRlID0ge307XG4gIF8uZWFjaChbJ29wZW4nLCAnY2xvc2UnLCAnZ2V0VmFsJywgJ3NldFZhbCcsICdkZXN0cm95JywgJ2dldFdyYXBwZXInXSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgaW5wdXRzLmF1dG9jb21wbGV0ZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbWV0aG9kQXJndW1lbnRzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIHJlc3VsdDtcbiAgICAgIGlucHV0cy5lYWNoKGZ1bmN0aW9uKGosIGlucHV0KSB7XG4gICAgICAgIHZhciB0eXBlYWhlYWQgPSB6ZXB0byhpbnB1dCkuZGF0YSh0eXBlYWhlYWRLZXkpO1xuICAgICAgICByZXN1bHQgPSB0eXBlYWhlYWRbbWV0aG9kXS5hcHBseSh0eXBlYWhlYWQsIG1ldGhvZEFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIGlucHV0cztcbn1cblxuYXV0b2NvbXBsZXRlLnNvdXJjZXMgPSBUeXBlYWhlYWQuc291cmNlcztcbmF1dG9jb21wbGV0ZS5lc2NhcGVIaWdobGlnaHRlZFN0cmluZyA9IF8uZXNjYXBlSGlnaGxpZ2h0ZWRTdHJpbmc7XG5cbnZhciB3YXNBdXRvY29tcGxldGVTZXQgPSAnYXV0b2NvbXBsZXRlJyBpbiB3aW5kb3c7XG52YXIgb2xkQXV0b2NvbXBsZXRlID0gd2luZG93LmF1dG9jb21wbGV0ZTtcbmF1dG9jb21wbGV0ZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgaWYgKHdhc0F1dG9jb21wbGV0ZVNldCkge1xuICAgIHdpbmRvdy5hdXRvY29tcGxldGUgPSBvbGRBdXRvY29tcGxldGU7XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIHdpbmRvdy5hdXRvY29tcGxldGU7XG4gIH1cbiAgcmV0dXJuIGF1dG9jb21wbGV0ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYXV0b2NvbXBsZXRlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjAuMzcuMVwiO1xuIiwiLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbi8qIFplcHRvIHYxLjIuMCAtIHplcHRvIGV2ZW50IGFzc2V0cyBkYXRhIC0gemVwdG9qcy5jb20vbGljZW5zZSAqL1xuKGZ1bmN0aW9uKGdsb2JhbCwgZmFjdG9yeSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoZ2xvYmFsKTtcbn0oLyogdGhpcyAjIyMjIyBVUERBVEVEOiBoZXJlIHdlIHdhbnQgdG8gdXNlIHdpbmRvdy9nbG9iYWwgaW5zdGVhZCBvZiB0aGlzIHdoaWNoIGlzIHRoZSBjdXJyZW50IGZpbGUgY29udGV4dCAjIyMjIyAqLyB3aW5kb3csIGZ1bmN0aW9uKHdpbmRvdykge1xuICB2YXIgWmVwdG8gPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1bmRlZmluZWQsIGtleSwgJCwgY2xhc3NMaXN0LCBlbXB0eUFycmF5ID0gW10sIGNvbmNhdCA9IGVtcHR5QXJyYXkuY29uY2F0LCBmaWx0ZXIgPSBlbXB0eUFycmF5LmZpbHRlciwgc2xpY2UgPSBlbXB0eUFycmF5LnNsaWNlLFxuICAgIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50LFxuICAgIGVsZW1lbnREaXNwbGF5ID0ge30sIGNsYXNzQ2FjaGUgPSB7fSxcbiAgICBjc3NOdW1iZXIgPSB7ICdjb2x1bW4tY291bnQnOiAxLCAnY29sdW1ucyc6IDEsICdmb250LXdlaWdodCc6IDEsICdsaW5lLWhlaWdodCc6IDEsJ29wYWNpdHknOiAxLCAnei1pbmRleCc6IDEsICd6b29tJzogMSB9LFxuICAgIGZyYWdtZW50UkUgPSAvXlxccyo8KFxcdyt8ISlbXj5dKj4vLFxuICAgIHNpbmdsZVRhZ1JFID0gL148KFxcdyspXFxzKlxcLz8+KD86PFxcL1xcMT58KSQvLFxuICAgIHRhZ0V4cGFuZGVyUkUgPSAvPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbXFx3Ol0rKVtePl0qKVxcLz4vaWcsXG4gICAgcm9vdE5vZGVSRSA9IC9eKD86Ym9keXxodG1sKSQvaSxcbiAgICBjYXBpdGFsUkUgPSAvKFtBLVpdKS9nLFxuXG4gICAgLy8gc3BlY2lhbCBhdHRyaWJ1dGVzIHRoYXQgc2hvdWxkIGJlIGdldC9zZXQgdmlhIG1ldGhvZCBjYWxsc1xuICAgIG1ldGhvZEF0dHJpYnV0ZXMgPSBbJ3ZhbCcsICdjc3MnLCAnaHRtbCcsICd0ZXh0JywgJ2RhdGEnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ29mZnNldCddLFxuXG4gICAgYWRqYWNlbmN5T3BlcmF0b3JzID0gWyAnYWZ0ZXInLCAncHJlcGVuZCcsICdiZWZvcmUnLCAnYXBwZW5kJyBdLFxuICAgIHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKSxcbiAgICB0YWJsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyksXG4gICAgY29udGFpbmVycyA9IHtcbiAgICAgICd0cic6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JyksXG4gICAgICAndGJvZHknOiB0YWJsZSwgJ3RoZWFkJzogdGFibGUsICd0Zm9vdCc6IHRhYmxlLFxuICAgICAgJ3RkJzogdGFibGVSb3csICd0aCc6IHRhYmxlUm93LFxuICAgICAgJyonOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIH0sXG4gICAgcmVhZHlSRSA9IC9jb21wbGV0ZXxsb2FkZWR8aW50ZXJhY3RpdmUvLFxuICAgIHNpbXBsZVNlbGVjdG9yUkUgPSAvXltcXHctXSokLyxcbiAgICBjbGFzczJ0eXBlID0ge30sXG4gICAgdG9TdHJpbmcgPSBjbGFzczJ0eXBlLnRvU3RyaW5nLFxuICAgIHplcHRvID0ge30sXG4gICAgY2FtZWxpemUsIHVuaXEsXG4gICAgdGVtcFBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgIHByb3BNYXAgPSB7XG4gICAgICAndGFiaW5kZXgnOiAndGFiSW5kZXgnLFxuICAgICAgJ3JlYWRvbmx5JzogJ3JlYWRPbmx5JyxcbiAgICAgICdmb3InOiAnaHRtbEZvcicsXG4gICAgICAnY2xhc3MnOiAnY2xhc3NOYW1lJyxcbiAgICAgICdtYXhsZW5ndGgnOiAnbWF4TGVuZ3RoJyxcbiAgICAgICdjZWxsc3BhY2luZyc6ICdjZWxsU3BhY2luZycsXG4gICAgICAnY2VsbHBhZGRpbmcnOiAnY2VsbFBhZGRpbmcnLFxuICAgICAgJ3Jvd3NwYW4nOiAncm93U3BhbicsXG4gICAgICAnY29sc3Bhbic6ICdjb2xTcGFuJyxcbiAgICAgICd1c2VtYXAnOiAndXNlTWFwJyxcbiAgICAgICdmcmFtZWJvcmRlcic6ICdmcmFtZUJvcmRlcicsXG4gICAgICAnY29udGVudGVkaXRhYmxlJzogJ2NvbnRlbnRFZGl0YWJsZSdcbiAgICB9LFxuICAgIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8XG4gICAgICBmdW5jdGlvbihvYmplY3QpeyByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgQXJyYXkgfVxuXG4gIHplcHRvLm1hdGNoZXMgPSBmdW5jdGlvbihlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIGlmICghc2VsZWN0b3IgfHwgIWVsZW1lbnQgfHwgZWxlbWVudC5ub2RlVHlwZSAhPT0gMSkgcmV0dXJuIGZhbHNlXG4gICAgdmFyIG1hdGNoZXNTZWxlY3RvciA9IGVsZW1lbnQubWF0Y2hlcyB8fCBlbGVtZW50LndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm1vek1hdGNoZXNTZWxlY3RvciB8fCBlbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5tYXRjaGVzU2VsZWN0b3JcbiAgICBpZiAobWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gbWF0Y2hlc1NlbGVjdG9yLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpXG4gICAgLy8gZmFsbCBiYWNrIHRvIHBlcmZvcm1pbmcgYSBzZWxlY3RvcjpcbiAgICB2YXIgbWF0Y2gsIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSwgdGVtcCA9ICFwYXJlbnRcbiAgICBpZiAodGVtcCkgKHBhcmVudCA9IHRlbXBQYXJlbnQpLmFwcGVuZENoaWxkKGVsZW1lbnQpXG4gICAgbWF0Y2ggPSB+emVwdG8ucXNhKHBhcmVudCwgc2VsZWN0b3IpLmluZGV4T2YoZWxlbWVudClcbiAgICB0ZW1wICYmIHRlbXBQYXJlbnQucmVtb3ZlQ2hpbGQoZWxlbWVudClcbiAgICByZXR1cm4gbWF0Y2hcbiAgfVxuXG4gIGZ1bmN0aW9uIHR5cGUob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PSBudWxsID8gU3RyaW5nKG9iaikgOlxuICAgICAgY2xhc3MydHlwZVt0b1N0cmluZy5jYWxsKG9iaildIHx8IFwib2JqZWN0XCJcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHR5cGUodmFsdWUpID09IFwiZnVuY3Rpb25cIiB9XG4gIGZ1bmN0aW9uIGlzV2luZG93KG9iaikgICAgIHsgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iaiA9PSBvYmoud2luZG93IH1cbiAgZnVuY3Rpb24gaXNEb2N1bWVudChvYmopICAgeyByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqLm5vZGVUeXBlID09IG9iai5ET0NVTUVOVF9OT0RFIH1cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSAgICAgeyByZXR1cm4gdHlwZShvYmopID09IFwib2JqZWN0XCIgfVxuICBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuICAgIHJldHVybiBpc09iamVjdChvYmopICYmICFpc1dpbmRvdyhvYmopICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09IE9iamVjdC5wcm90b3R5cGVcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpa2VBcnJheShvYmopIHtcbiAgICB2YXIgbGVuZ3RoID0gISFvYmogJiYgJ2xlbmd0aCcgaW4gb2JqICYmIG9iai5sZW5ndGgsXG4gICAgICB0eXBlID0gJC50eXBlKG9iailcblxuICAgIHJldHVybiAnZnVuY3Rpb24nICE9IHR5cGUgJiYgIWlzV2luZG93KG9iaikgJiYgKFxuICAgICAgJ2FycmF5JyA9PSB0eXBlIHx8IGxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAodHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJyAmJiBsZW5ndGggPiAwICYmIChsZW5ndGggLSAxKSBpbiBvYmopXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gY29tcGFjdChhcnJheSkgeyByZXR1cm4gZmlsdGVyLmNhbGwoYXJyYXksIGZ1bmN0aW9uKGl0ZW0peyByZXR1cm4gaXRlbSAhPSBudWxsIH0pIH1cbiAgZnVuY3Rpb24gZmxhdHRlbihhcnJheSkgeyByZXR1cm4gYXJyYXkubGVuZ3RoID4gMCA/ICQuZm4uY29uY2F0LmFwcGx5KFtdLCBhcnJheSkgOiBhcnJheSB9XG4gIGNhbWVsaXplID0gZnVuY3Rpb24oc3RyKXsgcmV0dXJuIHN0ci5yZXBsYWNlKC8tKyguKT8vZywgZnVuY3Rpb24obWF0Y2gsIGNocil7IHJldHVybiBjaHIgPyBjaHIudG9VcHBlckNhc2UoKSA6ICcnIH0pIH1cbiAgZnVuY3Rpb24gZGFzaGVyaXplKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvOjovZywgJy8nKVxuICAgICAgICAgICAucmVwbGFjZSgvKFtBLVpdKykoW0EtWl1bYS16XSkvZywgJyQxXyQyJylcbiAgICAgICAgICAgLnJlcGxhY2UoLyhbYS16XFxkXSkoW0EtWl0pL2csICckMV8kMicpXG4gICAgICAgICAgIC5yZXBsYWNlKC9fL2csICctJylcbiAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgfVxuICB1bmlxID0gZnVuY3Rpb24oYXJyYXkpeyByZXR1cm4gZmlsdGVyLmNhbGwoYXJyYXksIGZ1bmN0aW9uKGl0ZW0sIGlkeCl7IHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pID09IGlkeCB9KSB9XG5cbiAgZnVuY3Rpb24gY2xhc3NSRShuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUgaW4gY2xhc3NDYWNoZSA/XG4gICAgICBjbGFzc0NhY2hlW25hbWVdIDogKGNsYXNzQ2FjaGVbbmFtZV0gPSBuZXcgUmVnRXhwKCcoXnxcXFxccyknICsgbmFtZSArICcoXFxcXHN8JCknKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1heWJlQWRkUHgobmFtZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PSBcIm51bWJlclwiICYmICFjc3NOdW1iZXJbZGFzaGVyaXplKG5hbWUpXSkgPyB2YWx1ZSArIFwicHhcIiA6IHZhbHVlXG4gIH1cblxuICBmdW5jdGlvbiBkZWZhdWx0RGlzcGxheShub2RlTmFtZSkge1xuICAgIHZhciBlbGVtZW50LCBkaXNwbGF5XG4gICAgaWYgKCFlbGVtZW50RGlzcGxheVtub2RlTmFtZV0pIHtcbiAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGVOYW1lKVxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KVxuICAgICAgZGlzcGxheSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgJycpLmdldFByb3BlcnR5VmFsdWUoXCJkaXNwbGF5XCIpXG4gICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudClcbiAgICAgIGRpc3BsYXkgPT0gXCJub25lXCIgJiYgKGRpc3BsYXkgPSBcImJsb2NrXCIpXG4gICAgICBlbGVtZW50RGlzcGxheVtub2RlTmFtZV0gPSBkaXNwbGF5XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50RGlzcGxheVtub2RlTmFtZV1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoaWxkcmVuKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gJ2NoaWxkcmVuJyBpbiBlbGVtZW50ID9cbiAgICAgIHNsaWNlLmNhbGwoZWxlbWVudC5jaGlsZHJlbikgOlxuICAgICAgJC5tYXAoZWxlbWVudC5jaGlsZE5vZGVzLCBmdW5jdGlvbihub2RlKXsgaWYgKG5vZGUubm9kZVR5cGUgPT0gMSkgcmV0dXJuIG5vZGUgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIFooZG9tLCBzZWxlY3Rvcikge1xuICAgIHZhciBpLCBsZW4gPSBkb20gPyBkb20ubGVuZ3RoIDogMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykgdGhpc1tpXSA9IGRvbVtpXVxuICAgIHRoaXMubGVuZ3RoID0gbGVuXG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yIHx8ICcnXG4gIH1cblxuICAvLyBgJC56ZXB0by5mcmFnbWVudGAgdGFrZXMgYSBodG1sIHN0cmluZyBhbmQgYW4gb3B0aW9uYWwgdGFnIG5hbWVcbiAgLy8gdG8gZ2VuZXJhdGUgRE9NIG5vZGVzIGZyb20gdGhlIGdpdmVuIGh0bWwgc3RyaW5nLlxuICAvLyBUaGUgZ2VuZXJhdGVkIERPTSBub2RlcyBhcmUgcmV0dXJuZWQgYXMgYW4gYXJyYXkuXG4gIC8vIFRoaXMgZnVuY3Rpb24gY2FuIGJlIG92ZXJyaWRkZW4gaW4gcGx1Z2lucyBmb3IgZXhhbXBsZSB0byBtYWtlXG4gIC8vIGl0IGNvbXBhdGlibGUgd2l0aCBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgdGhlIERPTSBmdWxseS5cbiAgemVwdG8uZnJhZ21lbnQgPSBmdW5jdGlvbihodG1sLCBuYW1lLCBwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIGRvbSwgbm9kZXMsIGNvbnRhaW5lclxuXG4gICAgLy8gQSBzcGVjaWFsIGNhc2Ugb3B0aW1pemF0aW9uIGZvciBhIHNpbmdsZSB0YWdcbiAgICBpZiAoc2luZ2xlVGFnUkUudGVzdChodG1sKSkgZG9tID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFJlZ0V4cC4kMSkpXG5cbiAgICBpZiAoIWRvbSkge1xuICAgICAgaWYgKGh0bWwucmVwbGFjZSkgaHRtbCA9IGh0bWwucmVwbGFjZSh0YWdFeHBhbmRlclJFLCBcIjwkMT48LyQyPlwiKVxuICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkgbmFtZSA9IGZyYWdtZW50UkUudGVzdChodG1sKSAmJiBSZWdFeHAuJDFcbiAgICAgIGlmICghKG5hbWUgaW4gY29udGFpbmVycykpIG5hbWUgPSAnKidcblxuICAgICAgY29udGFpbmVyID0gY29udGFpbmVyc1tuYW1lXVxuICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnICsgaHRtbFxuICAgICAgZG9tID0gJC5lYWNoKHNsaWNlLmNhbGwoY29udGFpbmVyLmNoaWxkTm9kZXMpLCBmdW5jdGlvbigpe1xuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGlzUGxhaW5PYmplY3QocHJvcGVydGllcykpIHtcbiAgICAgIG5vZGVzID0gJChkb20pXG4gICAgICAkLmVhY2gocHJvcGVydGllcywgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAobWV0aG9kQXR0cmlidXRlcy5pbmRleE9mKGtleSkgPiAtMSkgbm9kZXNba2V5XSh2YWx1ZSlcbiAgICAgICAgZWxzZSBub2Rlcy5hdHRyKGtleSwgdmFsdWUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBkb21cbiAgfVxuXG4gIC8vIGAkLnplcHRvLlpgIHN3YXBzIG91dCB0aGUgcHJvdG90eXBlIG9mIHRoZSBnaXZlbiBgZG9tYCBhcnJheVxuICAvLyBvZiBub2RlcyB3aXRoIGAkLmZuYCBhbmQgdGh1cyBzdXBwbHlpbmcgYWxsIHRoZSBaZXB0byBmdW5jdGlvbnNcbiAgLy8gdG8gdGhlIGFycmF5LiBUaGlzIG1ldGhvZCBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBwbHVnaW5zLlxuICB6ZXB0by5aID0gZnVuY3Rpb24oZG9tLCBzZWxlY3Rvcikge1xuICAgIHJldHVybiBuZXcgWihkb20sIHNlbGVjdG9yKVxuICB9XG5cbiAgLy8gYCQuemVwdG8uaXNaYCBzaG91bGQgcmV0dXJuIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGEgWmVwdG9cbiAgLy8gY29sbGVjdGlvbi4gVGhpcyBtZXRob2QgY2FuIGJlIG92ZXJyaWRkZW4gaW4gcGx1Z2lucy5cbiAgemVwdG8uaXNaID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCBpbnN0YW5jZW9mIHplcHRvLlpcbiAgfVxuXG4gIC8vIGAkLnplcHRvLmluaXRgIGlzIFplcHRvJ3MgY291bnRlcnBhcnQgdG8galF1ZXJ5J3MgYCQuZm4uaW5pdGAgYW5kXG4gIC8vIHRha2VzIGEgQ1NTIHNlbGVjdG9yIGFuZCBhbiBvcHRpb25hbCBjb250ZXh0IChhbmQgaGFuZGxlcyB2YXJpb3VzXG4gIC8vIHNwZWNpYWwgY2FzZXMpLlxuICAvLyBUaGlzIG1ldGhvZCBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBwbHVnaW5zLlxuICB6ZXB0by5pbml0ID0gZnVuY3Rpb24oc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgZG9tXG4gICAgLy8gSWYgbm90aGluZyBnaXZlbiwgcmV0dXJuIGFuIGVtcHR5IFplcHRvIGNvbGxlY3Rpb25cbiAgICBpZiAoIXNlbGVjdG9yKSByZXR1cm4gemVwdG8uWigpXG4gICAgLy8gT3B0aW1pemUgZm9yIHN0cmluZyBzZWxlY3RvcnNcbiAgICBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT0gJ3N0cmluZycpIHtcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IudHJpbSgpXG4gICAgICAvLyBJZiBpdCdzIGEgaHRtbCBmcmFnbWVudCwgY3JlYXRlIG5vZGVzIGZyb20gaXRcbiAgICAgIC8vIE5vdGU6IEluIGJvdGggQ2hyb21lIDIxIGFuZCBGaXJlZm94IDE1LCBET00gZXJyb3IgMTJcbiAgICAgIC8vIGlzIHRocm93biBpZiB0aGUgZnJhZ21lbnQgZG9lc24ndCBiZWdpbiB3aXRoIDxcbiAgICAgIGlmIChzZWxlY3RvclswXSA9PSAnPCcgJiYgZnJhZ21lbnRSRS50ZXN0KHNlbGVjdG9yKSlcbiAgICAgICAgZG9tID0gemVwdG8uZnJhZ21lbnQoc2VsZWN0b3IsIFJlZ0V4cC4kMSwgY29udGV4dCksIHNlbGVjdG9yID0gbnVsbFxuICAgICAgLy8gSWYgdGhlcmUncyBhIGNvbnRleHQsIGNyZWF0ZSBhIGNvbGxlY3Rpb24gb24gdGhhdCBjb250ZXh0IGZpcnN0LCBhbmQgc2VsZWN0XG4gICAgICAvLyBub2RlcyBmcm9tIHRoZXJlXG4gICAgICBlbHNlIGlmIChjb250ZXh0ICE9PSB1bmRlZmluZWQpIHJldHVybiAkKGNvbnRleHQpLmZpbmQoc2VsZWN0b3IpXG4gICAgICAvLyBJZiBpdCdzIGEgQ1NTIHNlbGVjdG9yLCB1c2UgaXQgdG8gc2VsZWN0IG5vZGVzLlxuICAgICAgZWxzZSBkb20gPSB6ZXB0by5xc2EoZG9jdW1lbnQsIHNlbGVjdG9yKVxuICAgIH1cbiAgICAvLyBJZiBhIGZ1bmN0aW9uIGlzIGdpdmVuLCBjYWxsIGl0IHdoZW4gdGhlIERPTSBpcyByZWFkeVxuICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSByZXR1cm4gJChkb2N1bWVudCkucmVhZHkoc2VsZWN0b3IpXG4gICAgLy8gSWYgYSBaZXB0byBjb2xsZWN0aW9uIGlzIGdpdmVuLCBqdXN0IHJldHVybiBpdFxuICAgIGVsc2UgaWYgKHplcHRvLmlzWihzZWxlY3RvcikpIHJldHVybiBzZWxlY3RvclxuICAgIGVsc2Uge1xuICAgICAgLy8gbm9ybWFsaXplIGFycmF5IGlmIGFuIGFycmF5IG9mIG5vZGVzIGlzIGdpdmVuXG4gICAgICBpZiAoaXNBcnJheShzZWxlY3RvcikpIGRvbSA9IGNvbXBhY3Qoc2VsZWN0b3IpXG4gICAgICAvLyBXcmFwIERPTSBub2Rlcy5cbiAgICAgIGVsc2UgaWYgKGlzT2JqZWN0KHNlbGVjdG9yKSlcbiAgICAgICAgZG9tID0gW3NlbGVjdG9yXSwgc2VsZWN0b3IgPSBudWxsXG4gICAgICAvLyBJZiBpdCdzIGEgaHRtbCBmcmFnbWVudCwgY3JlYXRlIG5vZGVzIGZyb20gaXRcbiAgICAgIGVsc2UgaWYgKGZyYWdtZW50UkUudGVzdChzZWxlY3RvcikpXG4gICAgICAgIGRvbSA9IHplcHRvLmZyYWdtZW50KHNlbGVjdG9yLnRyaW0oKSwgUmVnRXhwLiQxLCBjb250ZXh0KSwgc2VsZWN0b3IgPSBudWxsXG4gICAgICAvLyBJZiB0aGVyZSdzIGEgY29udGV4dCwgY3JlYXRlIGEgY29sbGVjdGlvbiBvbiB0aGF0IGNvbnRleHQgZmlyc3QsIGFuZCBzZWxlY3RcbiAgICAgIC8vIG5vZGVzIGZyb20gdGhlcmVcbiAgICAgIGVsc2UgaWYgKGNvbnRleHQgIT09IHVuZGVmaW5lZCkgcmV0dXJuICQoY29udGV4dCkuZmluZChzZWxlY3RvcilcbiAgICAgIC8vIEFuZCBsYXN0IGJ1dCBubyBsZWFzdCwgaWYgaXQncyBhIENTUyBzZWxlY3RvciwgdXNlIGl0IHRvIHNlbGVjdCBub2Rlcy5cbiAgICAgIGVsc2UgZG9tID0gemVwdG8ucXNhKGRvY3VtZW50LCBzZWxlY3RvcilcbiAgICB9XG4gICAgLy8gY3JlYXRlIGEgbmV3IFplcHRvIGNvbGxlY3Rpb24gZnJvbSB0aGUgbm9kZXMgZm91bmRcbiAgICByZXR1cm4gemVwdG8uWihkb20sIHNlbGVjdG9yKVxuICB9XG5cbiAgLy8gYCRgIHdpbGwgYmUgdGhlIGJhc2UgYFplcHRvYCBvYmplY3QuIFdoZW4gY2FsbGluZyB0aGlzXG4gIC8vIGZ1bmN0aW9uIGp1c3QgY2FsbCBgJC56ZXB0by5pbml0LCB3aGljaCBtYWtlcyB0aGUgaW1wbGVtZW50YXRpb25cbiAgLy8gZGV0YWlscyBvZiBzZWxlY3Rpbmcgbm9kZXMgYW5kIGNyZWF0aW5nIFplcHRvIGNvbGxlY3Rpb25zXG4gIC8vIHBhdGNoYWJsZSBpbiBwbHVnaW5zLlxuICAkID0gZnVuY3Rpb24oc2VsZWN0b3IsIGNvbnRleHQpe1xuICAgIHJldHVybiB6ZXB0by5pbml0KHNlbGVjdG9yLCBjb250ZXh0KVxuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCwgc291cmNlLCBkZWVwKSB7XG4gICAgZm9yIChrZXkgaW4gc291cmNlKVxuICAgICAgaWYgKGRlZXAgJiYgKGlzUGxhaW5PYmplY3Qoc291cmNlW2tleV0pIHx8IGlzQXJyYXkoc291cmNlW2tleV0pKSkge1xuICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChzb3VyY2Vba2V5XSkgJiYgIWlzUGxhaW5PYmplY3QodGFyZ2V0W2tleV0pKVxuICAgICAgICAgIHRhcmdldFtrZXldID0ge31cbiAgICAgICAgaWYgKGlzQXJyYXkoc291cmNlW2tleV0pICYmICFpc0FycmF5KHRhcmdldFtrZXldKSlcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IFtdXG4gICAgICAgIGV4dGVuZCh0YXJnZXRba2V5XSwgc291cmNlW2tleV0sIGRlZXApXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzb3VyY2Vba2V5XSAhPT0gdW5kZWZpbmVkKSB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gIH1cblxuICAvLyBDb3B5IGFsbCBidXQgdW5kZWZpbmVkIHByb3BlcnRpZXMgZnJvbSBvbmUgb3IgbW9yZVxuICAvLyBvYmplY3RzIHRvIHRoZSBgdGFyZ2V0YCBvYmplY3QuXG4gICQuZXh0ZW5kID0gZnVuY3Rpb24odGFyZ2V0KXtcbiAgICB2YXIgZGVlcCwgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09ICdib29sZWFuJykge1xuICAgICAgZGVlcCA9IHRhcmdldFxuICAgICAgdGFyZ2V0ID0gYXJncy5zaGlmdCgpXG4gICAgfVxuICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbihhcmcpeyBleHRlbmQodGFyZ2V0LCBhcmcsIGRlZXApIH0pXG4gICAgcmV0dXJuIHRhcmdldFxuICB9XG5cbiAgLy8gYCQuemVwdG8ucXNhYCBpcyBaZXB0bydzIENTUyBzZWxlY3RvciBpbXBsZW1lbnRhdGlvbiB3aGljaFxuICAvLyB1c2VzIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsYCBhbmQgb3B0aW1pemVzIGZvciBzb21lIHNwZWNpYWwgY2FzZXMsIGxpa2UgYCNpZGAuXG4gIC8vIFRoaXMgbWV0aG9kIGNhbiBiZSBvdmVycmlkZGVuIGluIHBsdWdpbnMuXG4gIHplcHRvLnFzYSA9IGZ1bmN0aW9uKGVsZW1lbnQsIHNlbGVjdG9yKXtcbiAgICB2YXIgZm91bmQsXG4gICAgICAgIG1heWJlSUQgPSBzZWxlY3RvclswXSA9PSAnIycsXG4gICAgICAgIG1heWJlQ2xhc3MgPSAhbWF5YmVJRCAmJiBzZWxlY3RvclswXSA9PSAnLicsXG4gICAgICAgIG5hbWVPbmx5ID0gbWF5YmVJRCB8fCBtYXliZUNsYXNzID8gc2VsZWN0b3Iuc2xpY2UoMSkgOiBzZWxlY3RvciwgLy8gRW5zdXJlIHRoYXQgYSAxIGNoYXIgdGFnIG5hbWUgc3RpbGwgZ2V0cyBjaGVja2VkXG4gICAgICAgIGlzU2ltcGxlID0gc2ltcGxlU2VsZWN0b3JSRS50ZXN0KG5hbWVPbmx5KVxuICAgIHJldHVybiAoZWxlbWVudC5nZXRFbGVtZW50QnlJZCAmJiBpc1NpbXBsZSAmJiBtYXliZUlEKSA/IC8vIFNhZmFyaSBEb2N1bWVudEZyYWdtZW50IGRvZXNuJ3QgaGF2ZSBnZXRFbGVtZW50QnlJZFxuICAgICAgKCAoZm91bmQgPSBlbGVtZW50LmdldEVsZW1lbnRCeUlkKG5hbWVPbmx5KSkgPyBbZm91bmRdIDogW10gKSA6XG4gICAgICAoZWxlbWVudC5ub2RlVHlwZSAhPT0gMSAmJiBlbGVtZW50Lm5vZGVUeXBlICE9PSA5ICYmIGVsZW1lbnQubm9kZVR5cGUgIT09IDExKSA/IFtdIDpcbiAgICAgIHNsaWNlLmNhbGwoXG4gICAgICAgIGlzU2ltcGxlICYmICFtYXliZUlEICYmIGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA/IC8vIERvY3VtZW50RnJhZ21lbnQgZG9lc24ndCBoYXZlIGdldEVsZW1lbnRzQnlDbGFzc05hbWUvVGFnTmFtZVxuICAgICAgICAgIG1heWJlQ2xhc3MgPyBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmFtZU9ubHkpIDogLy8gSWYgaXQncyBzaW1wbGUsIGl0IGNvdWxkIGJlIGEgY2xhc3NcbiAgICAgICAgICBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHNlbGVjdG9yKSA6IC8vIE9yIGEgdGFnXG4gICAgICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSAvLyBPciBpdCdzIG5vdCBzaW1wbGUsIGFuZCB3ZSBuZWVkIHRvIHF1ZXJ5IGFsbFxuICAgICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyZWQobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyAkKG5vZGVzKSA6ICQobm9kZXMpLmZpbHRlcihzZWxlY3RvcilcbiAgfVxuXG4gICQuY29udGFpbnMgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMgP1xuICAgIGZ1bmN0aW9uKHBhcmVudCwgbm9kZSkge1xuICAgICAgcmV0dXJuIHBhcmVudCAhPT0gbm9kZSAmJiBwYXJlbnQuY29udGFpbnMobm9kZSlcbiAgICB9IDpcbiAgICBmdW5jdGlvbihwYXJlbnQsIG5vZGUpIHtcbiAgICAgIHdoaWxlIChub2RlICYmIChub2RlID0gbm9kZS5wYXJlbnROb2RlKSlcbiAgICAgICAgaWYgKG5vZGUgPT09IHBhcmVudCkgcmV0dXJuIHRydWVcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICBmdW5jdGlvbiBmdW5jQXJnKGNvbnRleHQsIGFyZywgaWR4LCBwYXlsb2FkKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oYXJnKSA/IGFyZy5jYWxsKGNvbnRleHQsIGlkeCwgcGF5bG9hZCkgOiBhcmdcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEF0dHJpYnV0ZShub2RlLCBuYW1lLCB2YWx1ZSkge1xuICAgIHZhbHVlID09IG51bGwgPyBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKSA6IG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKVxuICB9XG5cbiAgLy8gYWNjZXNzIGNsYXNzTmFtZSBwcm9wZXJ0eSB3aGlsZSByZXNwZWN0aW5nIFNWR0FuaW1hdGVkU3RyaW5nXG4gIGZ1bmN0aW9uIGNsYXNzTmFtZShub2RlLCB2YWx1ZSl7XG4gICAgdmFyIGtsYXNzID0gbm9kZS5jbGFzc05hbWUgfHwgJycsXG4gICAgICAgIHN2ZyAgID0ga2xhc3MgJiYga2xhc3MuYmFzZVZhbCAhPT0gdW5kZWZpbmVkXG5cbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHN2ZyA/IGtsYXNzLmJhc2VWYWwgOiBrbGFzc1xuICAgIHN2ZyA/IChrbGFzcy5iYXNlVmFsID0gdmFsdWUpIDogKG5vZGUuY2xhc3NOYW1lID0gdmFsdWUpXG4gIH1cblxuICAvLyBcInRydWVcIiAgPT4gdHJ1ZVxuICAvLyBcImZhbHNlXCIgPT4gZmFsc2VcbiAgLy8gXCJudWxsXCIgID0+IG51bGxcbiAgLy8gXCI0MlwiICAgID0+IDQyXG4gIC8vIFwiNDIuNVwiICA9PiA0Mi41XG4gIC8vIFwiMDhcIiAgICA9PiBcIjA4XCJcbiAgLy8gSlNPTiAgICA9PiBwYXJzZSBpZiB2YWxpZFxuICAvLyBTdHJpbmcgID0+IHNlbGZcbiAgZnVuY3Rpb24gZGVzZXJpYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdmFsdWUgP1xuICAgICAgICB2YWx1ZSA9PSBcInRydWVcIiB8fFxuICAgICAgICAoIHZhbHVlID09IFwiZmFsc2VcIiA/IGZhbHNlIDpcbiAgICAgICAgICB2YWx1ZSA9PSBcIm51bGxcIiA/IG51bGwgOlxuICAgICAgICAgICt2YWx1ZSArIFwiXCIgPT0gdmFsdWUgPyArdmFsdWUgOlxuICAgICAgICAgIC9eW1xcW1xce10vLnRlc3QodmFsdWUpID8gJC5wYXJzZUpTT04odmFsdWUpIDpcbiAgICAgICAgICB2YWx1ZSApXG4gICAgICAgIDogdmFsdWVcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgfVxuXG4gICQudHlwZSA9IHR5cGVcbiAgJC5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvblxuICAkLmlzV2luZG93ID0gaXNXaW5kb3dcbiAgJC5pc0FycmF5ID0gaXNBcnJheVxuICAkLmlzUGxhaW5PYmplY3QgPSBpc1BsYWluT2JqZWN0XG5cbiAgJC5pc0VtcHR5T2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVcbiAgICBmb3IgKG5hbWUgaW4gb2JqKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgJC5pc051bWVyaWMgPSBmdW5jdGlvbih2YWwpIHtcbiAgICB2YXIgbnVtID0gTnVtYmVyKHZhbCksIHR5cGUgPSB0eXBlb2YgdmFsXG4gICAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHR5cGUgIT0gJ2Jvb2xlYW4nICYmXG4gICAgICAodHlwZSAhPSAnc3RyaW5nJyB8fCB2YWwubGVuZ3RoKSAmJlxuICAgICAgIWlzTmFOKG51bSkgJiYgaXNGaW5pdGUobnVtKSB8fCBmYWxzZVxuICB9XG5cbiAgJC5pbkFycmF5ID0gZnVuY3Rpb24oZWxlbSwgYXJyYXksIGkpe1xuICAgIHJldHVybiBlbXB0eUFycmF5LmluZGV4T2YuY2FsbChhcnJheSwgZWxlbSwgaSlcbiAgfVxuXG4gICQuY2FtZWxDYXNlID0gY2FtZWxpemVcbiAgJC50cmltID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0ciA9PSBudWxsID8gXCJcIiA6IFN0cmluZy5wcm90b3R5cGUudHJpbS5jYWxsKHN0cilcbiAgfVxuXG4gIC8vIHBsdWdpbiBjb21wYXRpYmlsaXR5XG4gICQudXVpZCA9IDBcbiAgJC5zdXBwb3J0ID0geyB9XG4gICQuZXhwciA9IHsgfVxuICAkLm5vb3AgPSBmdW5jdGlvbigpIHt9XG5cbiAgJC5tYXAgPSBmdW5jdGlvbihlbGVtZW50cywgY2FsbGJhY2spe1xuICAgIHZhciB2YWx1ZSwgdmFsdWVzID0gW10sIGksIGtleVxuICAgIGlmIChsaWtlQXJyYXkoZWxlbWVudHMpKVxuICAgICAgZm9yIChpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gY2FsbGJhY2soZWxlbWVudHNbaV0sIGkpXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB2YWx1ZXMucHVzaCh2YWx1ZSlcbiAgICAgIH1cbiAgICBlbHNlXG4gICAgICBmb3IgKGtleSBpbiBlbGVtZW50cykge1xuICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrKGVsZW1lbnRzW2tleV0sIGtleSlcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHZhbHVlcy5wdXNoKHZhbHVlKVxuICAgICAgfVxuICAgIHJldHVybiBmbGF0dGVuKHZhbHVlcylcbiAgfVxuXG4gICQuZWFjaCA9IGZ1bmN0aW9uKGVsZW1lbnRzLCBjYWxsYmFjayl7XG4gICAgdmFyIGksIGtleVxuICAgIGlmIChsaWtlQXJyYXkoZWxlbWVudHMpKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspXG4gICAgICAgIGlmIChjYWxsYmFjay5jYWxsKGVsZW1lbnRzW2ldLCBpLCBlbGVtZW50c1tpXSkgPT09IGZhbHNlKSByZXR1cm4gZWxlbWVudHNcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChrZXkgaW4gZWxlbWVudHMpXG4gICAgICAgIGlmIChjYWxsYmFjay5jYWxsKGVsZW1lbnRzW2tleV0sIGtleSwgZWxlbWVudHNba2V5XSkgPT09IGZhbHNlKSByZXR1cm4gZWxlbWVudHNcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudHNcbiAgfVxuXG4gICQuZ3JlcCA9IGZ1bmN0aW9uKGVsZW1lbnRzLCBjYWxsYmFjayl7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKGVsZW1lbnRzLCBjYWxsYmFjaylcbiAgfVxuXG4gIGlmICh3aW5kb3cuSlNPTikgJC5wYXJzZUpTT04gPSBKU09OLnBhcnNlXG5cbiAgLy8gUG9wdWxhdGUgdGhlIGNsYXNzMnR5cGUgbWFwXG4gICQuZWFjaChcIkJvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBPYmplY3QgRXJyb3JcIi5zcGxpdChcIiBcIiksIGZ1bmN0aW9uKGksIG5hbWUpIHtcbiAgICBjbGFzczJ0eXBlWyBcIltvYmplY3QgXCIgKyBuYW1lICsgXCJdXCIgXSA9IG5hbWUudG9Mb3dlckNhc2UoKVxuICB9KVxuXG4gIC8vIERlZmluZSBtZXRob2RzIHRoYXQgd2lsbCBiZSBhdmFpbGFibGUgb24gYWxsXG4gIC8vIFplcHRvIGNvbGxlY3Rpb25zXG4gICQuZm4gPSB7XG4gICAgY29uc3RydWN0b3I6IHplcHRvLlosXG4gICAgbGVuZ3RoOiAwLFxuXG4gICAgLy8gQmVjYXVzZSBhIGNvbGxlY3Rpb24gYWN0cyBsaWtlIGFuIGFycmF5XG4gICAgLy8gY29weSBvdmVyIHRoZXNlIHVzZWZ1bCBhcnJheSBmdW5jdGlvbnMuXG4gICAgZm9yRWFjaDogZW1wdHlBcnJheS5mb3JFYWNoLFxuICAgIHJlZHVjZTogZW1wdHlBcnJheS5yZWR1Y2UsXG4gICAgcHVzaDogZW1wdHlBcnJheS5wdXNoLFxuICAgIHNvcnQ6IGVtcHR5QXJyYXkuc29ydCxcbiAgICBzcGxpY2U6IGVtcHR5QXJyYXkuc3BsaWNlLFxuICAgIGluZGV4T2Y6IGVtcHR5QXJyYXkuaW5kZXhPZixcbiAgICBjb25jYXQ6IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaSwgdmFsdWUsIGFyZ3MgPSBbXVxuICAgICAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZSA9IGFyZ3VtZW50c1tpXVxuICAgICAgICBhcmdzW2ldID0gemVwdG8uaXNaKHZhbHVlKSA/IHZhbHVlLnRvQXJyYXkoKSA6IHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gY29uY2F0LmFwcGx5KHplcHRvLmlzWih0aGlzKSA/IHRoaXMudG9BcnJheSgpIDogdGhpcywgYXJncylcbiAgICB9LFxuXG4gICAgLy8gYG1hcGAgYW5kIGBzbGljZWAgaW4gdGhlIGpRdWVyeSBBUEkgd29yayBkaWZmZXJlbnRseVxuICAgIC8vIGZyb20gdGhlaXIgYXJyYXkgY291bnRlcnBhcnRzXG4gICAgbWFwOiBmdW5jdGlvbihmbil7XG4gICAgICByZXR1cm4gJCgkLm1hcCh0aGlzLCBmdW5jdGlvbihlbCwgaSl7IHJldHVybiBmbi5jYWxsKGVsLCBpLCBlbCkgfSkpXG4gICAgfSxcbiAgICBzbGljZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAkKHNsaWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpXG4gICAgfSxcblxuICAgIHJlYWR5OiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICAvLyBuZWVkIHRvIGNoZWNrIGlmIGRvY3VtZW50LmJvZHkgZXhpc3RzIGZvciBJRSBhcyB0aGF0IGJyb3dzZXIgcmVwb3J0c1xuICAgICAgLy8gZG9jdW1lbnQgcmVhZHkgd2hlbiBpdCBoYXNuJ3QgeWV0IGNyZWF0ZWQgdGhlIGJvZHkgZWxlbWVudFxuICAgICAgaWYgKHJlYWR5UkUudGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSAmJiBkb2N1bWVudC5ib2R5KSBjYWxsYmFjaygkKVxuICAgICAgZWxzZSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXsgY2FsbGJhY2soJCkgfSwgZmFsc2UpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihpZHgpe1xuICAgICAgcmV0dXJuIGlkeCA9PT0gdW5kZWZpbmVkID8gc2xpY2UuY2FsbCh0aGlzKSA6IHRoaXNbaWR4ID49IDAgPyBpZHggOiBpZHggKyB0aGlzLmxlbmd0aF1cbiAgICB9LFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmdldCgpIH0sXG4gICAgc2l6ZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLmxlbmd0aFxuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlICE9IG51bGwpXG4gICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpXG4gICAgICB9KVxuICAgIH0sXG4gICAgZWFjaDogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgZW1wdHlBcnJheS5ldmVyeS5jYWxsKHRoaXMsIGZ1bmN0aW9uKGVsLCBpZHgpe1xuICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbChlbCwgaWR4LCBlbCkgIT09IGZhbHNlXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSByZXR1cm4gdGhpcy5ub3QodGhpcy5ub3Qoc2VsZWN0b3IpKVxuICAgICAgcmV0dXJuICQoZmlsdGVyLmNhbGwodGhpcywgZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgIHJldHVybiB6ZXB0by5tYXRjaGVzKGVsZW1lbnQsIHNlbGVjdG9yKVxuICAgICAgfSkpXG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uKHNlbGVjdG9yLGNvbnRleHQpe1xuICAgICAgcmV0dXJuICQodW5pcSh0aGlzLmNvbmNhdCgkKHNlbGVjdG9yLGNvbnRleHQpKSkpXG4gICAgfSxcbiAgICBpczogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoID4gMCAmJiB6ZXB0by5tYXRjaGVzKHRoaXNbMF0sIHNlbGVjdG9yKVxuICAgIH0sXG4gICAgbm90OiBmdW5jdGlvbihzZWxlY3Rvcil7XG4gICAgICB2YXIgbm9kZXM9W11cbiAgICAgIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSAmJiBzZWxlY3Rvci5jYWxsICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIGlmICghc2VsZWN0b3IuY2FsbCh0aGlzLGlkeCkpIG5vZGVzLnB1c2godGhpcylcbiAgICAgICAgfSlcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZXhjbHVkZXMgPSB0eXBlb2Ygc2VsZWN0b3IgPT0gJ3N0cmluZycgPyB0aGlzLmZpbHRlcihzZWxlY3RvcikgOlxuICAgICAgICAgIChsaWtlQXJyYXkoc2VsZWN0b3IpICYmIGlzRnVuY3Rpb24oc2VsZWN0b3IuaXRlbSkpID8gc2xpY2UuY2FsbChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKVxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24oZWwpe1xuICAgICAgICAgIGlmIChleGNsdWRlcy5pbmRleE9mKGVsKSA8IDApIG5vZGVzLnB1c2goZWwpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gJChub2RlcylcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBpc09iamVjdChzZWxlY3RvcikgP1xuICAgICAgICAgICQuY29udGFpbnModGhpcywgc2VsZWN0b3IpIDpcbiAgICAgICAgICAkKHRoaXMpLmZpbmQoc2VsZWN0b3IpLnNpemUoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGVxOiBmdW5jdGlvbihpZHgpe1xuICAgICAgcmV0dXJuIGlkeCA9PT0gLTEgPyB0aGlzLnNsaWNlKGlkeCkgOiB0aGlzLnNsaWNlKGlkeCwgKyBpZHggKyAxKVxuICAgIH0sXG4gICAgZmlyc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgZWwgPSB0aGlzWzBdXG4gICAgICByZXR1cm4gZWwgJiYgIWlzT2JqZWN0KGVsKSA/IGVsIDogJChlbClcbiAgICB9LFxuICAgIGxhc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgZWwgPSB0aGlzW3RoaXMubGVuZ3RoIC0gMV1cbiAgICAgIHJldHVybiBlbCAmJiAhaXNPYmplY3QoZWwpID8gZWwgOiAkKGVsKVxuICAgIH0sXG4gICAgZmluZDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgdmFyIHJlc3VsdCwgJHRoaXMgPSB0aGlzXG4gICAgICBpZiAoIXNlbGVjdG9yKSByZXN1bHQgPSAkKClcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnb2JqZWN0JylcbiAgICAgICAgcmVzdWx0ID0gJChzZWxlY3RvcikuZmlsdGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyIG5vZGUgPSB0aGlzXG4gICAgICAgICAgcmV0dXJuIGVtcHR5QXJyYXkuc29tZS5jYWxsKCR0aGlzLCBmdW5jdGlvbihwYXJlbnQpe1xuICAgICAgICAgICAgcmV0dXJuICQuY29udGFpbnMocGFyZW50LCBub2RlKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICBlbHNlIGlmICh0aGlzLmxlbmd0aCA9PSAxKSByZXN1bHQgPSAkKHplcHRvLnFzYSh0aGlzWzBdLCBzZWxlY3RvcikpXG4gICAgICBlbHNlIHJlc3VsdCA9IHRoaXMubWFwKGZ1bmN0aW9uKCl7IHJldHVybiB6ZXB0by5xc2EodGhpcywgc2VsZWN0b3IpIH0pXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICBjbG9zZXN0OiBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCl7XG4gICAgICB2YXIgbm9kZXMgPSBbXSwgY29sbGVjdGlvbiA9IHR5cGVvZiBzZWxlY3RvciA9PSAnb2JqZWN0JyAmJiAkKHNlbGVjdG9yKVxuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKF8sIG5vZGUpe1xuICAgICAgICB3aGlsZSAobm9kZSAmJiAhKGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uLmluZGV4T2Yobm9kZSkgPj0gMCA6IHplcHRvLm1hdGNoZXMobm9kZSwgc2VsZWN0b3IpKSlcbiAgICAgICAgICBub2RlID0gbm9kZSAhPT0gY29udGV4dCAmJiAhaXNEb2N1bWVudChub2RlKSAmJiBub2RlLnBhcmVudE5vZGVcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZXMuaW5kZXhPZihub2RlKSA8IDApIG5vZGVzLnB1c2gobm9kZSlcbiAgICAgIH0pXG4gICAgICByZXR1cm4gJChub2RlcylcbiAgICB9LFxuICAgIHBhcmVudHM6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHZhciBhbmNlc3RvcnMgPSBbXSwgbm9kZXMgPSB0aGlzXG4gICAgICB3aGlsZSAobm9kZXMubGVuZ3RoID4gMClcbiAgICAgICAgbm9kZXMgPSAkLm1hcChub2RlcywgZnVuY3Rpb24obm9kZSl7XG4gICAgICAgICAgaWYgKChub2RlID0gbm9kZS5wYXJlbnROb2RlKSAmJiAhaXNEb2N1bWVudChub2RlKSAmJiBhbmNlc3RvcnMuaW5kZXhPZihub2RlKSA8IDApIHtcbiAgICAgICAgICAgIGFuY2VzdG9ycy5wdXNoKG5vZGUpXG4gICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIHJldHVybiBmaWx0ZXJlZChhbmNlc3RvcnMsIHNlbGVjdG9yKVxuICAgIH0sXG4gICAgcGFyZW50OiBmdW5jdGlvbihzZWxlY3Rvcil7XG4gICAgICByZXR1cm4gZmlsdGVyZWQodW5pcSh0aGlzLnBsdWNrKCdwYXJlbnROb2RlJykpLCBzZWxlY3RvcilcbiAgICB9LFxuICAgIGNoaWxkcmVuOiBmdW5jdGlvbihzZWxlY3Rvcil7XG4gICAgICByZXR1cm4gZmlsdGVyZWQodGhpcy5tYXAoZnVuY3Rpb24oKXsgcmV0dXJuIGNoaWxkcmVuKHRoaXMpIH0pLCBzZWxlY3RvcilcbiAgICB9LFxuICAgIGNvbnRlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuY29udGVudERvY3VtZW50IHx8IHNsaWNlLmNhbGwodGhpcy5jaGlsZE5vZGVzKSB9KVxuICAgIH0sXG4gICAgc2libGluZ3M6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHJldHVybiBmaWx0ZXJlZCh0aGlzLm1hcChmdW5jdGlvbihpLCBlbCl7XG4gICAgICAgIHJldHVybiBmaWx0ZXIuY2FsbChjaGlsZHJlbihlbC5wYXJlbnROb2RlKSwgZnVuY3Rpb24oY2hpbGQpeyByZXR1cm4gY2hpbGQhPT1lbCB9KVxuICAgICAgfSksIHNlbGVjdG9yKVxuICAgIH0sXG4gICAgZW1wdHk6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7IHRoaXMuaW5uZXJIVE1MID0gJycgfSlcbiAgICB9LFxuICAgIC8vIGBwbHVja2AgaXMgYm9ycm93ZWQgZnJvbSBQcm90b3R5cGUuanNcbiAgICBwbHVjazogZnVuY3Rpb24ocHJvcGVydHkpe1xuICAgICAgcmV0dXJuICQubWFwKHRoaXMsIGZ1bmN0aW9uKGVsKXsgcmV0dXJuIGVsW3Byb3BlcnR5XSB9KVxuICAgIH0sXG4gICAgc2hvdzogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiICYmICh0aGlzLnN0eWxlLmRpc3BsYXkgPSAnJylcbiAgICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUodGhpcywgJycpLmdldFByb3BlcnR5VmFsdWUoXCJkaXNwbGF5XCIpID09IFwibm9uZVwiKVxuICAgICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9IGRlZmF1bHREaXNwbGF5KHRoaXMubm9kZU5hbWUpXG4gICAgICB9KVxuICAgIH0sXG4gICAgcmVwbGFjZVdpdGg6IGZ1bmN0aW9uKG5ld0NvbnRlbnQpe1xuICAgICAgcmV0dXJuIHRoaXMuYmVmb3JlKG5ld0NvbnRlbnQpLnJlbW92ZSgpXG4gICAgfSxcbiAgICB3cmFwOiBmdW5jdGlvbihzdHJ1Y3R1cmUpe1xuICAgICAgdmFyIGZ1bmMgPSBpc0Z1bmN0aW9uKHN0cnVjdHVyZSlcbiAgICAgIGlmICh0aGlzWzBdICYmICFmdW5jKVxuICAgICAgICB2YXIgZG9tICAgPSAkKHN0cnVjdHVyZSkuZ2V0KDApLFxuICAgICAgICAgICAgY2xvbmUgPSBkb20ucGFyZW50Tm9kZSB8fCB0aGlzLmxlbmd0aCA+IDFcblxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpbmRleCl7XG4gICAgICAgICQodGhpcykud3JhcEFsbChcbiAgICAgICAgICBmdW5jID8gc3RydWN0dXJlLmNhbGwodGhpcywgaW5kZXgpIDpcbiAgICAgICAgICAgIGNsb25lID8gZG9tLmNsb25lTm9kZSh0cnVlKSA6IGRvbVxuICAgICAgICApXG4gICAgICB9KVxuICAgIH0sXG4gICAgd3JhcEFsbDogZnVuY3Rpb24oc3RydWN0dXJlKXtcbiAgICAgIGlmICh0aGlzWzBdKSB7XG4gICAgICAgICQodGhpc1swXSkuYmVmb3JlKHN0cnVjdHVyZSA9ICQoc3RydWN0dXJlKSlcbiAgICAgICAgdmFyIGNoaWxkcmVuXG4gICAgICAgIC8vIGRyaWxsIGRvd24gdG8gdGhlIGlubW9zdCBlbGVtZW50XG4gICAgICAgIHdoaWxlICgoY2hpbGRyZW4gPSBzdHJ1Y3R1cmUuY2hpbGRyZW4oKSkubGVuZ3RoKSBzdHJ1Y3R1cmUgPSBjaGlsZHJlbi5maXJzdCgpXG4gICAgICAgICQoc3RydWN0dXJlKS5hcHBlbmQodGhpcylcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICB3cmFwSW5uZXI6IGZ1bmN0aW9uKHN0cnVjdHVyZSl7XG4gICAgICB2YXIgZnVuYyA9IGlzRnVuY3Rpb24oc3RydWN0dXJlKVxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpbmRleCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKSwgY29udGVudHMgPSBzZWxmLmNvbnRlbnRzKCksXG4gICAgICAgICAgICBkb20gID0gZnVuYyA/IHN0cnVjdHVyZS5jYWxsKHRoaXMsIGluZGV4KSA6IHN0cnVjdHVyZVxuICAgICAgICBjb250ZW50cy5sZW5ndGggPyBjb250ZW50cy53cmFwQWxsKGRvbSkgOiBzZWxmLmFwcGVuZChkb20pXG4gICAgICB9KVxuICAgIH0sXG4gICAgdW53cmFwOiBmdW5jdGlvbigpe1xuICAgICAgdGhpcy5wYXJlbnQoKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykucmVwbGFjZVdpdGgoJCh0aGlzKS5jaGlsZHJlbigpKVxuICAgICAgfSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBjbG9uZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5jbG9uZU5vZGUodHJ1ZSkgfSlcbiAgICB9LFxuICAgIGhpZGU6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgIH0sXG4gICAgdG9nZ2xlOiBmdW5jdGlvbihzZXR0aW5nKXtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGVsID0gJCh0aGlzKVxuICAgICAgICA7KHNldHRpbmcgPT09IHVuZGVmaW5lZCA/IGVsLmNzcyhcImRpc3BsYXlcIikgPT0gXCJub25lXCIgOiBzZXR0aW5nKSA/IGVsLnNob3coKSA6IGVsLmhpZGUoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIHByZXY6IGZ1bmN0aW9uKHNlbGVjdG9yKXsgcmV0dXJuICQodGhpcy5wbHVjaygncHJldmlvdXNFbGVtZW50U2libGluZycpKS5maWx0ZXIoc2VsZWN0b3IgfHwgJyonKSB9LFxuICAgIG5leHQ6IGZ1bmN0aW9uKHNlbGVjdG9yKXsgcmV0dXJuICQodGhpcy5wbHVjaygnbmV4dEVsZW1lbnRTaWJsaW5nJykpLmZpbHRlcihzZWxlY3RvciB8fCAnKicpIH0sXG4gICAgaHRtbDogZnVuY3Rpb24oaHRtbCl7XG4gICAgICByZXR1cm4gMCBpbiBhcmd1bWVudHMgP1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaWR4KXtcbiAgICAgICAgICB2YXIgb3JpZ2luSHRtbCA9IHRoaXMuaW5uZXJIVE1MXG4gICAgICAgICAgJCh0aGlzKS5lbXB0eSgpLmFwcGVuZCggZnVuY0FyZyh0aGlzLCBodG1sLCBpZHgsIG9yaWdpbkh0bWwpIClcbiAgICAgICAgfSkgOlxuICAgICAgICAoMCBpbiB0aGlzID8gdGhpc1swXS5pbm5lckhUTUwgOiBudWxsKVxuICAgIH0sXG4gICAgdGV4dDogZnVuY3Rpb24odGV4dCl7XG4gICAgICByZXR1cm4gMCBpbiBhcmd1bWVudHMgP1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaWR4KXtcbiAgICAgICAgICB2YXIgbmV3VGV4dCA9IGZ1bmNBcmcodGhpcywgdGV4dCwgaWR4LCB0aGlzLnRleHRDb250ZW50KVxuICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBuZXdUZXh0ID09IG51bGwgPyAnJyA6ICcnK25ld1RleHRcbiAgICAgICAgfSkgOlxuICAgICAgICAoMCBpbiB0aGlzID8gdGhpcy5wbHVjaygndGV4dENvbnRlbnQnKS5qb2luKFwiXCIpIDogbnVsbClcbiAgICB9LFxuICAgIGF0dHI6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKXtcbiAgICAgIHZhciByZXN1bHRcbiAgICAgIHJldHVybiAodHlwZW9mIG5hbWUgPT0gJ3N0cmluZycgJiYgISgxIGluIGFyZ3VtZW50cykpID9cbiAgICAgICAgKDAgaW4gdGhpcyAmJiB0aGlzWzBdLm5vZGVUeXBlID09IDEgJiYgKHJlc3VsdCA9IHRoaXNbMF0uZ2V0QXR0cmlidXRlKG5hbWUpKSAhPSBudWxsID8gcmVzdWx0IDogdW5kZWZpbmVkKSA6XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIGlmICh0aGlzLm5vZGVUeXBlICE9PSAxKSByZXR1cm5cbiAgICAgICAgICBpZiAoaXNPYmplY3QobmFtZSkpIGZvciAoa2V5IGluIG5hbWUpIHNldEF0dHJpYnV0ZSh0aGlzLCBrZXksIG5hbWVba2V5XSlcbiAgICAgICAgICBlbHNlIHNldEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpKSlcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHJlbW92ZUF0dHI6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpeyB0aGlzLm5vZGVUeXBlID09PSAxICYmIG5hbWUuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZSl7XG4gICAgICAgIHNldEF0dHJpYnV0ZSh0aGlzLCBhdHRyaWJ1dGUpXG4gICAgICB9LCB0aGlzKX0pXG4gICAgfSxcbiAgICBwcm9wOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSl7XG4gICAgICBuYW1lID0gcHJvcE1hcFtuYW1lXSB8fCBuYW1lXG4gICAgICByZXR1cm4gKDEgaW4gYXJndW1lbnRzKSA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHRoaXNbbmFtZV0gPSBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIHRoaXNbbmFtZV0pXG4gICAgICAgIH0pIDpcbiAgICAgICAgKHRoaXNbMF0gJiYgdGhpc1swXVtuYW1lXSlcbiAgICB9LFxuICAgIHJlbW92ZVByb3A6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgbmFtZSA9IHByb3BNYXBbbmFtZV0gfHwgbmFtZVxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpeyBkZWxldGUgdGhpc1tuYW1lXSB9KVxuICAgIH0sXG4gICAgZGF0YTogZnVuY3Rpb24obmFtZSwgdmFsdWUpe1xuICAgICAgdmFyIGF0dHJOYW1lID0gJ2RhdGEtJyArIG5hbWUucmVwbGFjZShjYXBpdGFsUkUsICctJDEnKS50b0xvd2VyQ2FzZSgpXG5cbiAgICAgIHZhciBkYXRhID0gKDEgaW4gYXJndW1lbnRzKSA/XG4gICAgICAgIHRoaXMuYXR0cihhdHRyTmFtZSwgdmFsdWUpIDpcbiAgICAgICAgdGhpcy5hdHRyKGF0dHJOYW1lKVxuXG4gICAgICByZXR1cm4gZGF0YSAhPT0gbnVsbCA/IGRlc2VyaWFsaXplVmFsdWUoZGF0YSkgOiB1bmRlZmluZWRcbiAgICB9LFxuICAgIHZhbDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYgKDAgaW4gYXJndW1lbnRzKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9IFwiXCJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHRoaXMudmFsdWUgPSBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIHRoaXMudmFsdWUpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpc1swXSAmJiAodGhpc1swXS5tdWx0aXBsZSA/XG4gICAgICAgICAgICQodGhpc1swXSkuZmluZCgnb3B0aW9uJykuZmlsdGVyKGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnNlbGVjdGVkIH0pLnBsdWNrKCd2YWx1ZScpIDpcbiAgICAgICAgICAgdGhpc1swXS52YWx1ZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIG9mZnNldDogZnVuY3Rpb24oY29vcmRpbmF0ZXMpe1xuICAgICAgaWYgKGNvb3JkaW5hdGVzKSByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGNvb3JkcyA9IGZ1bmNBcmcodGhpcywgY29vcmRpbmF0ZXMsIGluZGV4LCAkdGhpcy5vZmZzZXQoKSksXG4gICAgICAgICAgICBwYXJlbnRPZmZzZXQgPSAkdGhpcy5vZmZzZXRQYXJlbnQoKS5vZmZzZXQoKSxcbiAgICAgICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgICB0b3A6ICBjb29yZHMudG9wICAtIHBhcmVudE9mZnNldC50b3AsXG4gICAgICAgICAgICAgIGxlZnQ6IGNvb3Jkcy5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICBpZiAoJHRoaXMuY3NzKCdwb3NpdGlvbicpID09ICdzdGF0aWMnKSBwcm9wc1sncG9zaXRpb24nXSA9ICdyZWxhdGl2ZSdcbiAgICAgICAgJHRoaXMuY3NzKHByb3BzKVxuICAgICAgfSlcbiAgICAgIGlmICghdGhpcy5sZW5ndGgpIHJldHVybiBudWxsXG4gICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICE9PSB0aGlzWzBdICYmICEkLmNvbnRhaW5zKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgdGhpc1swXSkpXG4gICAgICAgIHJldHVybiB7dG9wOiAwLCBsZWZ0OiAwfVxuICAgICAgdmFyIG9iaiA9IHRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IG9iai5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICB0b3A6IG9iai50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQsXG4gICAgICAgIHdpZHRoOiBNYXRoLnJvdW5kKG9iai53aWR0aCksXG4gICAgICAgIGhlaWdodDogTWF0aC5yb3VuZChvYmouaGVpZ2h0KVxuICAgICAgfVxuICAgIH0sXG4gICAgY3NzOiBmdW5jdGlvbihwcm9wZXJ0eSwgdmFsdWUpe1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpc1swXVxuICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKCFlbGVtZW50KSByZXR1cm5cbiAgICAgICAgICByZXR1cm4gZWxlbWVudC5zdHlsZVtjYW1lbGl6ZShwcm9wZXJ0eSldIHx8IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgJycpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVyblxuICAgICAgICAgIHZhciBwcm9wcyA9IHt9XG4gICAgICAgICAgdmFyIGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsICcnKVxuICAgICAgICAgICQuZWFjaChwcm9wZXJ0eSwgZnVuY3Rpb24oXywgcHJvcCl7XG4gICAgICAgICAgICBwcm9wc1twcm9wXSA9IChlbGVtZW50LnN0eWxlW2NhbWVsaXplKHByb3ApXSB8fCBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkpXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm4gcHJvcHNcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgY3NzID0gJydcbiAgICAgIGlmICh0eXBlKHByb3BlcnR5KSA9PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKVxuICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbigpeyB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KGRhc2hlcml6ZShwcm9wZXJ0eSkpIH0pXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjc3MgPSBkYXNoZXJpemUocHJvcGVydHkpICsgXCI6XCIgKyBtYXliZUFkZFB4KHByb3BlcnR5LCB2YWx1ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoa2V5IGluIHByb3BlcnR5KVxuICAgICAgICAgIGlmICghcHJvcGVydHlba2V5XSAmJiBwcm9wZXJ0eVtrZXldICE9PSAwKVxuICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCl7IHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkoZGFzaGVyaXplKGtleSkpIH0pXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgY3NzICs9IGRhc2hlcml6ZShrZXkpICsgJzonICsgbWF5YmVBZGRQeChrZXksIHByb3BlcnR5W2tleV0pICsgJzsnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXsgdGhpcy5zdHlsZS5jc3NUZXh0ICs9ICc7JyArIGNzcyB9KVxuICAgIH0sXG4gICAgaW5kZXg6IGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgcmV0dXJuIGVsZW1lbnQgPyB0aGlzLmluZGV4T2YoJChlbGVtZW50KVswXSkgOiB0aGlzLnBhcmVudCgpLmNoaWxkcmVuKCkuaW5kZXhPZih0aGlzWzBdKVxuICAgIH0sXG4gICAgaGFzQ2xhc3M6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgaWYgKCFuYW1lKSByZXR1cm4gZmFsc2VcbiAgICAgIHJldHVybiBlbXB0eUFycmF5LnNvbWUuY2FsbCh0aGlzLCBmdW5jdGlvbihlbCl7XG4gICAgICAgIHJldHVybiB0aGlzLnRlc3QoY2xhc3NOYW1lKGVsKSlcbiAgICAgIH0sIGNsYXNzUkUobmFtZSkpXG4gICAgfSxcbiAgICBhZGRDbGFzczogZnVuY3Rpb24obmFtZSl7XG4gICAgICBpZiAoIW5hbWUpIHJldHVybiB0aGlzXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgIGlmICghKCdjbGFzc05hbWUnIGluIHRoaXMpKSByZXR1cm5cbiAgICAgICAgY2xhc3NMaXN0ID0gW11cbiAgICAgICAgdmFyIGNscyA9IGNsYXNzTmFtZSh0aGlzKSwgbmV3TmFtZSA9IGZ1bmNBcmcodGhpcywgbmFtZSwgaWR4LCBjbHMpXG4gICAgICAgIG5ld05hbWUuc3BsaXQoL1xccysvZykuZm9yRWFjaChmdW5jdGlvbihrbGFzcyl7XG4gICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKGtsYXNzKSkgY2xhc3NMaXN0LnB1c2goa2xhc3MpXG4gICAgICAgIH0sIHRoaXMpXG4gICAgICAgIGNsYXNzTGlzdC5sZW5ndGggJiYgY2xhc3NOYW1lKHRoaXMsIGNscyArIChjbHMgPyBcIiBcIiA6IFwiXCIpICsgY2xhc3NMaXN0LmpvaW4oXCIgXCIpKVxuICAgICAgfSlcbiAgICB9LFxuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaWR4KXtcbiAgICAgICAgaWYgKCEoJ2NsYXNzTmFtZScgaW4gdGhpcykpIHJldHVyblxuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gY2xhc3NOYW1lKHRoaXMsICcnKVxuICAgICAgICBjbGFzc0xpc3QgPSBjbGFzc05hbWUodGhpcylcbiAgICAgICAgZnVuY0FyZyh0aGlzLCBuYW1lLCBpZHgsIGNsYXNzTGlzdCkuc3BsaXQoL1xccysvZykuZm9yRWFjaChmdW5jdGlvbihrbGFzcyl7XG4gICAgICAgICAgY2xhc3NMaXN0ID0gY2xhc3NMaXN0LnJlcGxhY2UoY2xhc3NSRShrbGFzcyksIFwiIFwiKVxuICAgICAgICB9KVxuICAgICAgICBjbGFzc05hbWUodGhpcywgY2xhc3NMaXN0LnRyaW0oKSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b2dnbGVDbGFzczogZnVuY3Rpb24obmFtZSwgd2hlbil7XG4gICAgICBpZiAoIW5hbWUpIHJldHVybiB0aGlzXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksIG5hbWVzID0gZnVuY0FyZyh0aGlzLCBuYW1lLCBpZHgsIGNsYXNzTmFtZSh0aGlzKSlcbiAgICAgICAgbmFtZXMuc3BsaXQoL1xccysvZykuZm9yRWFjaChmdW5jdGlvbihrbGFzcyl7XG4gICAgICAgICAgKHdoZW4gPT09IHVuZGVmaW5lZCA/ICEkdGhpcy5oYXNDbGFzcyhrbGFzcykgOiB3aGVuKSA/XG4gICAgICAgICAgICAkdGhpcy5hZGRDbGFzcyhrbGFzcykgOiAkdGhpcy5yZW1vdmVDbGFzcyhrbGFzcylcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBzY3JvbGxUb3A6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmICghdGhpcy5sZW5ndGgpIHJldHVyblxuICAgICAgdmFyIGhhc1Njcm9sbFRvcCA9ICdzY3JvbGxUb3AnIGluIHRoaXNbMF1cbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gaGFzU2Nyb2xsVG9wID8gdGhpc1swXS5zY3JvbGxUb3AgOiB0aGlzWzBdLnBhZ2VZT2Zmc2V0XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGhhc1Njcm9sbFRvcCA/XG4gICAgICAgIGZ1bmN0aW9uKCl7IHRoaXMuc2Nyb2xsVG9wID0gdmFsdWUgfSA6XG4gICAgICAgIGZ1bmN0aW9uKCl7IHRoaXMuc2Nyb2xsVG8odGhpcy5zY3JvbGxYLCB2YWx1ZSkgfSlcbiAgICB9LFxuICAgIHNjcm9sbExlZnQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmICghdGhpcy5sZW5ndGgpIHJldHVyblxuICAgICAgdmFyIGhhc1Njcm9sbExlZnQgPSAnc2Nyb2xsTGVmdCcgaW4gdGhpc1swXVxuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBoYXNTY3JvbGxMZWZ0ID8gdGhpc1swXS5zY3JvbGxMZWZ0IDogdGhpc1swXS5wYWdlWE9mZnNldFxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChoYXNTY3JvbGxMZWZ0ID9cbiAgICAgICAgZnVuY3Rpb24oKXsgdGhpcy5zY3JvbGxMZWZ0ID0gdmFsdWUgfSA6XG4gICAgICAgIGZ1bmN0aW9uKCl7IHRoaXMuc2Nyb2xsVG8odmFsdWUsIHRoaXMuc2Nyb2xsWSkgfSlcbiAgICB9LFxuICAgIHBvc2l0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5sZW5ndGgpIHJldHVyblxuXG4gICAgICB2YXIgZWxlbSA9IHRoaXNbMF0sXG4gICAgICAgIC8vIEdldCAqcmVhbCogb2Zmc2V0UGFyZW50XG4gICAgICAgIG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50KCksXG4gICAgICAgIC8vIEdldCBjb3JyZWN0IG9mZnNldHNcbiAgICAgICAgb2Zmc2V0ICAgICAgID0gdGhpcy5vZmZzZXQoKSxcbiAgICAgICAgcGFyZW50T2Zmc2V0ID0gcm9vdE5vZGVSRS50ZXN0KG9mZnNldFBhcmVudFswXS5ub2RlTmFtZSkgPyB7IHRvcDogMCwgbGVmdDogMCB9IDogb2Zmc2V0UGFyZW50Lm9mZnNldCgpXG5cbiAgICAgIC8vIFN1YnRyYWN0IGVsZW1lbnQgbWFyZ2luc1xuICAgICAgLy8gbm90ZTogd2hlbiBhbiBlbGVtZW50IGhhcyBtYXJnaW46IGF1dG8gdGhlIG9mZnNldExlZnQgYW5kIG1hcmdpbkxlZnRcbiAgICAgIC8vIGFyZSB0aGUgc2FtZSBpbiBTYWZhcmkgY2F1c2luZyBvZmZzZXQubGVmdCB0byBpbmNvcnJlY3RseSBiZSAwXG4gICAgICBvZmZzZXQudG9wICAtPSBwYXJzZUZsb2F0KCAkKGVsZW0pLmNzcygnbWFyZ2luLXRvcCcpICkgfHwgMFxuICAgICAgb2Zmc2V0LmxlZnQgLT0gcGFyc2VGbG9hdCggJChlbGVtKS5jc3MoJ21hcmdpbi1sZWZ0JykgKSB8fCAwXG5cbiAgICAgIC8vIEFkZCBvZmZzZXRQYXJlbnQgYm9yZGVyc1xuICAgICAgcGFyZW50T2Zmc2V0LnRvcCAgKz0gcGFyc2VGbG9hdCggJChvZmZzZXRQYXJlbnRbMF0pLmNzcygnYm9yZGVyLXRvcC13aWR0aCcpICkgfHwgMFxuICAgICAgcGFyZW50T2Zmc2V0LmxlZnQgKz0gcGFyc2VGbG9hdCggJChvZmZzZXRQYXJlbnRbMF0pLmNzcygnYm9yZGVyLWxlZnQtd2lkdGgnKSApIHx8IDBcblxuICAgICAgLy8gU3VidHJhY3QgdGhlIHR3byBvZmZzZXRzXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3A6ICBvZmZzZXQudG9wICAtIHBhcmVudE9mZnNldC50b3AsXG4gICAgICAgIGxlZnQ6IG9mZnNldC5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnRcbiAgICAgIH1cbiAgICB9LFxuICAgIG9mZnNldFBhcmVudDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50IHx8IGRvY3VtZW50LmJvZHlcbiAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAhcm9vdE5vZGVSRS50ZXN0KHBhcmVudC5ub2RlTmFtZSkgJiYgJChwYXJlbnQpLmNzcyhcInBvc2l0aW9uXCIpID09IFwic3RhdGljXCIpXG4gICAgICAgICAgcGFyZW50ID0gcGFyZW50Lm9mZnNldFBhcmVudFxuICAgICAgICByZXR1cm4gcGFyZW50XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8vIGZvciBub3dcbiAgJC5mbi5kZXRhY2ggPSAkLmZuLnJlbW92ZVxuXG4gIC8vIEdlbmVyYXRlIHRoZSBgd2lkdGhgIGFuZCBgaGVpZ2h0YCBmdW5jdGlvbnNcbiAgO1snd2lkdGgnLCAnaGVpZ2h0J10uZm9yRWFjaChmdW5jdGlvbihkaW1lbnNpb24pe1xuICAgIHZhciBkaW1lbnNpb25Qcm9wZXJ0eSA9XG4gICAgICBkaW1lbnNpb24ucmVwbGFjZSgvLi8sIGZ1bmN0aW9uKG0peyByZXR1cm4gbVswXS50b1VwcGVyQ2FzZSgpIH0pXG5cbiAgICAkLmZuW2RpbWVuc2lvbl0gPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICB2YXIgb2Zmc2V0LCBlbCA9IHRoaXNbMF1cbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gaXNXaW5kb3coZWwpID8gZWxbJ2lubmVyJyArIGRpbWVuc2lvblByb3BlcnR5XSA6XG4gICAgICAgIGlzRG9jdW1lbnQoZWwpID8gZWwuZG9jdW1lbnRFbGVtZW50WydzY3JvbGwnICsgZGltZW5zaW9uUHJvcGVydHldIDpcbiAgICAgICAgKG9mZnNldCA9IHRoaXMub2Zmc2V0KCkpICYmIG9mZnNldFtkaW1lbnNpb25dXG4gICAgICBlbHNlIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaWR4KXtcbiAgICAgICAgZWwgPSAkKHRoaXMpXG4gICAgICAgIGVsLmNzcyhkaW1lbnNpb24sIGZ1bmNBcmcodGhpcywgdmFsdWUsIGlkeCwgZWxbZGltZW5zaW9uXSgpKSlcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIHRyYXZlcnNlTm9kZShub2RlLCBmdW4pIHtcbiAgICBmdW4obm9kZSlcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKVxuICAgICAgdHJhdmVyc2VOb2RlKG5vZGUuY2hpbGROb2Rlc1tpXSwgZnVuKVxuICB9XG5cbiAgLy8gR2VuZXJhdGUgdGhlIGBhZnRlcmAsIGBwcmVwZW5kYCwgYGJlZm9yZWAsIGBhcHBlbmRgLFxuICAvLyBgaW5zZXJ0QWZ0ZXJgLCBgaW5zZXJ0QmVmb3JlYCwgYGFwcGVuZFRvYCwgYW5kIGBwcmVwZW5kVG9gIG1ldGhvZHMuXG4gIGFkamFjZW5jeU9wZXJhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKG9wZXJhdG9yLCBvcGVyYXRvckluZGV4KSB7XG4gICAgdmFyIGluc2lkZSA9IG9wZXJhdG9ySW5kZXggJSAyIC8vPT4gcHJlcGVuZCwgYXBwZW5kXG5cbiAgICAkLmZuW29wZXJhdG9yXSA9IGZ1bmN0aW9uKCl7XG4gICAgICAvLyBhcmd1bWVudHMgY2FuIGJlIG5vZGVzLCBhcnJheXMgb2Ygbm9kZXMsIFplcHRvIG9iamVjdHMgYW5kIEhUTUwgc3RyaW5nc1xuICAgICAgdmFyIGFyZ1R5cGUsIG5vZGVzID0gJC5tYXAoYXJndW1lbnRzLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBbXVxuICAgICAgICAgICAgYXJnVHlwZSA9IHR5cGUoYXJnKVxuICAgICAgICAgICAgaWYgKGFyZ1R5cGUgPT0gXCJhcnJheVwiKSB7XG4gICAgICAgICAgICAgIGFyZy5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsLm5vZGVUeXBlICE9PSB1bmRlZmluZWQpIHJldHVybiBhcnIucHVzaChlbClcbiAgICAgICAgICAgICAgICBlbHNlIGlmICgkLnplcHRvLmlzWihlbCkpIHJldHVybiBhcnIgPSBhcnIuY29uY2F0KGVsLmdldCgpKVxuICAgICAgICAgICAgICAgIGFyciA9IGFyci5jb25jYXQoemVwdG8uZnJhZ21lbnQoZWwpKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICByZXR1cm4gYXJyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXJnVHlwZSA9PSBcIm9iamVjdFwiIHx8IGFyZyA9PSBudWxsID9cbiAgICAgICAgICAgICAgYXJnIDogemVwdG8uZnJhZ21lbnQoYXJnKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHBhcmVudCwgY29weUJ5Q2xvbmUgPSB0aGlzLmxlbmd0aCA+IDFcbiAgICAgIGlmIChub2Rlcy5sZW5ndGggPCAxKSByZXR1cm4gdGhpc1xuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKF8sIHRhcmdldCl7XG4gICAgICAgIHBhcmVudCA9IGluc2lkZSA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnROb2RlXG5cbiAgICAgICAgLy8gY29udmVydCBhbGwgbWV0aG9kcyB0byBhIFwiYmVmb3JlXCIgb3BlcmF0aW9uXG4gICAgICAgIHRhcmdldCA9IG9wZXJhdG9ySW5kZXggPT0gMCA/IHRhcmdldC5uZXh0U2libGluZyA6XG4gICAgICAgICAgICAgICAgIG9wZXJhdG9ySW5kZXggPT0gMSA/IHRhcmdldC5maXJzdENoaWxkIDpcbiAgICAgICAgICAgICAgICAgb3BlcmF0b3JJbmRleCA9PSAyID8gdGFyZ2V0IDpcbiAgICAgICAgICAgICAgICAgbnVsbFxuXG4gICAgICAgIHZhciBwYXJlbnRJbkRvY3VtZW50ID0gJC5jb250YWlucyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHBhcmVudClcblxuICAgICAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpe1xuICAgICAgICAgIGlmIChjb3B5QnlDbG9uZSkgbm9kZSA9IG5vZGUuY2xvbmVOb2RlKHRydWUpXG4gICAgICAgICAgZWxzZSBpZiAoIXBhcmVudCkgcmV0dXJuICQobm9kZSkucmVtb3ZlKClcblxuICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdGFyZ2V0KVxuICAgICAgICAgIGlmIChwYXJlbnRJbkRvY3VtZW50KSB0cmF2ZXJzZU5vZGUobm9kZSwgZnVuY3Rpb24oZWwpe1xuICAgICAgICAgICAgaWYgKGVsLm5vZGVOYW1lICE9IG51bGwgJiYgZWwubm9kZU5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcgJiZcbiAgICAgICAgICAgICAgICghZWwudHlwZSB8fCBlbC50eXBlID09PSAndGV4dC9qYXZhc2NyaXB0JykgJiYgIWVsLnNyYyl7XG4gICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlbC5vd25lckRvY3VtZW50ID8gZWwub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyA6IHdpbmRvd1xuICAgICAgICAgICAgICB0YXJnZXRbJ2V2YWwnXS5jYWxsKHRhcmdldCwgZWwuaW5uZXJIVE1MKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIGFmdGVyICAgID0+IGluc2VydEFmdGVyXG4gICAgLy8gcHJlcGVuZCAgPT4gcHJlcGVuZFRvXG4gICAgLy8gYmVmb3JlICAgPT4gaW5zZXJ0QmVmb3JlXG4gICAgLy8gYXBwZW5kICAgPT4gYXBwZW5kVG9cbiAgICAkLmZuW2luc2lkZSA/IG9wZXJhdG9yKydUbycgOiAnaW5zZXJ0Jysob3BlcmF0b3JJbmRleCA/ICdCZWZvcmUnIDogJ0FmdGVyJyldID0gZnVuY3Rpb24oaHRtbCl7XG4gICAgICAkKGh0bWwpW29wZXJhdG9yXSh0aGlzKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH0pXG5cbiAgemVwdG8uWi5wcm90b3R5cGUgPSBaLnByb3RvdHlwZSA9ICQuZm5cblxuICAvLyBFeHBvcnQgaW50ZXJuYWwgQVBJIGZ1bmN0aW9ucyBpbiB0aGUgYCQuemVwdG9gIG5hbWVzcGFjZVxuICB6ZXB0by51bmlxID0gdW5pcVxuICB6ZXB0by5kZXNlcmlhbGl6ZVZhbHVlID0gZGVzZXJpYWxpemVWYWx1ZVxuICAkLnplcHRvID0gemVwdG9cblxuICByZXR1cm4gJFxufSkoKVxuXG47KGZ1bmN0aW9uKCQpe1xuICB2YXIgX3ppZCA9IDEsIHVuZGVmaW5lZCxcbiAgICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvbixcbiAgICAgIGlzU3RyaW5nID0gZnVuY3Rpb24ob2JqKXsgcmV0dXJuIHR5cGVvZiBvYmogPT0gJ3N0cmluZycgfSxcbiAgICAgIGhhbmRsZXJzID0ge30sXG4gICAgICBzcGVjaWFsRXZlbnRzPXt9LFxuICAgICAgZm9jdXNpblN1cHBvcnRlZCA9ICdvbmZvY3VzaW4nIGluIHdpbmRvdyxcbiAgICAgIGZvY3VzID0geyBmb2N1czogJ2ZvY3VzaW4nLCBibHVyOiAnZm9jdXNvdXQnIH0sXG4gICAgICBob3ZlciA9IHsgbW91c2VlbnRlcjogJ21vdXNlb3ZlcicsIG1vdXNlbGVhdmU6ICdtb3VzZW91dCcgfVxuXG4gIHNwZWNpYWxFdmVudHMuY2xpY2sgPSBzcGVjaWFsRXZlbnRzLm1vdXNlZG93biA9IHNwZWNpYWxFdmVudHMubW91c2V1cCA9IHNwZWNpYWxFdmVudHMubW91c2Vtb3ZlID0gJ01vdXNlRXZlbnRzJ1xuXG4gIGZ1bmN0aW9uIHppZChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuX3ppZCB8fCAoZWxlbWVudC5femlkID0gX3ppZCsrKVxuICB9XG4gIGZ1bmN0aW9uIGZpbmRIYW5kbGVycyhlbGVtZW50LCBldmVudCwgZm4sIHNlbGVjdG9yKSB7XG4gICAgZXZlbnQgPSBwYXJzZShldmVudClcbiAgICBpZiAoZXZlbnQubnMpIHZhciBtYXRjaGVyID0gbWF0Y2hlckZvcihldmVudC5ucylcbiAgICByZXR1cm4gKGhhbmRsZXJzW3ppZChlbGVtZW50KV0gfHwgW10pLmZpbHRlcihmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gaGFuZGxlclxuICAgICAgICAmJiAoIWV2ZW50LmUgIHx8IGhhbmRsZXIuZSA9PSBldmVudC5lKVxuICAgICAgICAmJiAoIWV2ZW50Lm5zIHx8IG1hdGNoZXIudGVzdChoYW5kbGVyLm5zKSlcbiAgICAgICAgJiYgKCFmbiAgICAgICB8fCB6aWQoaGFuZGxlci5mbikgPT09IHppZChmbikpXG4gICAgICAgICYmICghc2VsZWN0b3IgfHwgaGFuZGxlci5zZWwgPT0gc2VsZWN0b3IpXG4gICAgfSlcbiAgfVxuICBmdW5jdGlvbiBwYXJzZShldmVudCkge1xuICAgIHZhciBwYXJ0cyA9ICgnJyArIGV2ZW50KS5zcGxpdCgnLicpXG4gICAgcmV0dXJuIHtlOiBwYXJ0c1swXSwgbnM6IHBhcnRzLnNsaWNlKDEpLnNvcnQoKS5qb2luKCcgJyl9XG4gIH1cbiAgZnVuY3Rpb24gbWF0Y2hlckZvcihucykge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCcoPzpefCApJyArIG5zLnJlcGxhY2UoJyAnLCAnIC4qID8nKSArICcoPzogfCQpJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50Q2FwdHVyZShoYW5kbGVyLCBjYXB0dXJlU2V0dGluZykge1xuICAgIHJldHVybiBoYW5kbGVyLmRlbCAmJlxuICAgICAgKCFmb2N1c2luU3VwcG9ydGVkICYmIChoYW5kbGVyLmUgaW4gZm9jdXMpKSB8fFxuICAgICAgISFjYXB0dXJlU2V0dGluZ1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhbEV2ZW50KHR5cGUpIHtcbiAgICByZXR1cm4gaG92ZXJbdHlwZV0gfHwgKGZvY3VzaW5TdXBwb3J0ZWQgJiYgZm9jdXNbdHlwZV0pIHx8IHR5cGVcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZChlbGVtZW50LCBldmVudHMsIGZuLCBkYXRhLCBzZWxlY3RvciwgZGVsZWdhdG9yLCBjYXB0dXJlKXtcbiAgICB2YXIgaWQgPSB6aWQoZWxlbWVudCksIHNldCA9IChoYW5kbGVyc1tpZF0gfHwgKGhhbmRsZXJzW2lkXSA9IFtdKSlcbiAgICBldmVudHMuc3BsaXQoL1xccy8pLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgaWYgKGV2ZW50ID09ICdyZWFkeScpIHJldHVybiAkKGRvY3VtZW50KS5yZWFkeShmbilcbiAgICAgIHZhciBoYW5kbGVyICAgPSBwYXJzZShldmVudClcbiAgICAgIGhhbmRsZXIuZm4gICAgPSBmblxuICAgICAgaGFuZGxlci5zZWwgICA9IHNlbGVjdG9yXG4gICAgICAvLyBlbXVsYXRlIG1vdXNlZW50ZXIsIG1vdXNlbGVhdmVcbiAgICAgIGlmIChoYW5kbGVyLmUgaW4gaG92ZXIpIGZuID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciByZWxhdGVkID0gZS5yZWxhdGVkVGFyZ2V0XG4gICAgICAgIGlmICghcmVsYXRlZCB8fCAocmVsYXRlZCAhPT0gdGhpcyAmJiAhJC5jb250YWlucyh0aGlzLCByZWxhdGVkKSkpXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZXIuZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfVxuICAgICAgaGFuZGxlci5kZWwgICA9IGRlbGVnYXRvclxuICAgICAgdmFyIGNhbGxiYWNrICA9IGRlbGVnYXRvciB8fCBmblxuICAgICAgaGFuZGxlci5wcm94eSA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICBlID0gY29tcGF0aWJsZShlKVxuICAgICAgICBpZiAoZS5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpKSByZXR1cm5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgZGF0YVByb3BEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCAnZGF0YScpXG4gICAgICAgICAgaWYgKCFkYXRhUHJvcERlc2NyaXB0b3IgfHwgZGF0YVByb3BEZXNjcmlwdG9yLndyaXRhYmxlKVxuICAgICAgICAgICAgZS5kYXRhID0gZGF0YVxuICAgICAgICB9IGNhdGNoIChlKSB7fSAvLyB3aGVuIHVzaW5nIHN0cmljdCBtb2RlIGRhdGFQcm9wRGVzY3JpcHRvciB3aWxsIGJlIHVuZGVmaW5lZCB3aGVuIGUgaXMgSW5wdXRFdmVudCAoZXZlbiB0aG91Z2ggZGF0YSBwcm9wZXJ0eSBleGlzdHMpLiBTbyB3ZSBzdXJyb3VuZCB3aXRoIHRyeS9jYXRjaFxuICAgICAgICB2YXIgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkoZWxlbWVudCwgZS5fYXJncyA9PSB1bmRlZmluZWQgPyBbZV0gOiBbZV0uY29uY2F0KGUuX2FyZ3MpKVxuICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkgZS5wcmV2ZW50RGVmYXVsdCgpLCBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH1cbiAgICAgIGhhbmRsZXIuaSA9IHNldC5sZW5ndGhcbiAgICAgIHNldC5wdXNoKGhhbmRsZXIpXG4gICAgICBpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIGVsZW1lbnQpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihyZWFsRXZlbnQoaGFuZGxlci5lKSwgaGFuZGxlci5wcm94eSwgZXZlbnRDYXB0dXJlKGhhbmRsZXIsIGNhcHR1cmUpKVxuICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQsIGV2ZW50cywgZm4sIHNlbGVjdG9yLCBjYXB0dXJlKXtcbiAgICB2YXIgaWQgPSB6aWQoZWxlbWVudClcbiAgICA7KGV2ZW50cyB8fCAnJykuc3BsaXQoL1xccy8pLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgZmluZEhhbmRsZXJzKGVsZW1lbnQsIGV2ZW50LCBmbiwgc2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcil7XG4gICAgICAgIGRlbGV0ZSBoYW5kbGVyc1tpZF1baGFuZGxlci5pXVxuICAgICAgaWYgKCdyZW1vdmVFdmVudExpc3RlbmVyJyBpbiBlbGVtZW50KVxuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIocmVhbEV2ZW50KGhhbmRsZXIuZSksIGhhbmRsZXIucHJveHksIGV2ZW50Q2FwdHVyZShoYW5kbGVyLCBjYXB0dXJlKSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gICQuZXZlbnQgPSB7IGFkZDogYWRkLCByZW1vdmU6IHJlbW92ZSB9XG5cbiAgJC5wcm94eSA9IGZ1bmN0aW9uKGZuLCBjb250ZXh0KSB7XG4gICAgdmFyIGFyZ3MgPSAoMiBpbiBhcmd1bWVudHMpICYmIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuICAgIGlmIChpc0Z1bmN0aW9uKGZuKSkge1xuICAgICAgdmFyIHByb3h5Rm4gPSBmdW5jdGlvbigpeyByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJncyA/IGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkgOiBhcmd1bWVudHMpIH1cbiAgICAgIHByb3h5Rm4uX3ppZCA9IHppZChmbilcbiAgICAgIHJldHVybiBwcm94eUZuXG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb250ZXh0KSkge1xuICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgYXJncy51bnNoaWZ0KGZuW2NvbnRleHRdLCBmbilcbiAgICAgICAgcmV0dXJuICQucHJveHkuYXBwbHkobnVsbCwgYXJncylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAkLnByb3h5KGZuW2NvbnRleHRdLCBmbilcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdGVkIGZ1bmN0aW9uXCIpXG4gICAgfVxuICB9XG5cbiAgJC5mbi5iaW5kID0gZnVuY3Rpb24oZXZlbnQsIGRhdGEsIGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vbihldmVudCwgZGF0YSwgY2FsbGJhY2spXG4gIH1cbiAgJC5mbi51bmJpbmQgPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spe1xuICAgIHJldHVybiB0aGlzLm9mZihldmVudCwgY2FsbGJhY2spXG4gIH1cbiAgJC5mbi5vbmUgPSBmdW5jdGlvbihldmVudCwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vbihldmVudCwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrLCAxKVxuICB9XG5cbiAgdmFyIHJldHVyblRydWUgPSBmdW5jdGlvbigpe3JldHVybiB0cnVlfSxcbiAgICAgIHJldHVybkZhbHNlID0gZnVuY3Rpb24oKXtyZXR1cm4gZmFsc2V9LFxuICAgICAgaWdub3JlUHJvcGVydGllcyA9IC9eKFtBLVpdfHJldHVyblZhbHVlJHxsYXllcltYWV0kfHdlYmtpdE1vdmVtZW50W1hZXSQpLyxcbiAgICAgIGV2ZW50TWV0aG9kcyA9IHtcbiAgICAgICAgcHJldmVudERlZmF1bHQ6ICdpc0RlZmF1bHRQcmV2ZW50ZWQnLFxuICAgICAgICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246ICdpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCcsXG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbjogJ2lzUHJvcGFnYXRpb25TdG9wcGVkJ1xuICAgICAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBhdGlibGUoZXZlbnQsIHNvdXJjZSkge1xuICAgIGlmIChzb3VyY2UgfHwgIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgc291cmNlIHx8IChzb3VyY2UgPSBldmVudClcblxuICAgICAgJC5lYWNoKGV2ZW50TWV0aG9kcywgZnVuY3Rpb24obmFtZSwgcHJlZGljYXRlKSB7XG4gICAgICAgIHZhciBzb3VyY2VNZXRob2QgPSBzb3VyY2VbbmFtZV1cbiAgICAgICAgZXZlbnRbbmFtZV0gPSBmdW5jdGlvbigpe1xuICAgICAgICAgIHRoaXNbcHJlZGljYXRlXSA9IHJldHVyblRydWVcbiAgICAgICAgICByZXR1cm4gc291cmNlTWV0aG9kICYmIHNvdXJjZU1ldGhvZC5hcHBseShzb3VyY2UsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICBldmVudFtwcmVkaWNhdGVdID0gcmV0dXJuRmFsc2VcbiAgICAgIH0pXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGV2ZW50LnRpbWVTdGFtcCB8fCAoZXZlbnQudGltZVN0YW1wID0gRGF0ZS5ub3coKSlcbiAgICAgIH0gY2F0Y2ggKGlnbm9yZWQpIHsgfVxuXG4gICAgICBpZiAoc291cmNlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHVuZGVmaW5lZCA/IHNvdXJjZS5kZWZhdWx0UHJldmVudGVkIDpcbiAgICAgICAgICAncmV0dXJuVmFsdWUnIGluIHNvdXJjZSA/IHNvdXJjZS5yZXR1cm5WYWx1ZSA9PT0gZmFsc2UgOlxuICAgICAgICAgIHNvdXJjZS5nZXRQcmV2ZW50RGVmYXVsdCAmJiBzb3VyY2UuZ2V0UHJldmVudERlZmF1bHQoKSlcbiAgICAgICAgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZXZlbnRcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGV2ZW50KSB7XG4gICAgdmFyIGtleSwgcHJveHkgPSB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH1cbiAgICBmb3IgKGtleSBpbiBldmVudClcbiAgICAgIGlmICghaWdub3JlUHJvcGVydGllcy50ZXN0KGtleSkgJiYgZXZlbnRba2V5XSAhPT0gdW5kZWZpbmVkKSBwcm94eVtrZXldID0gZXZlbnRba2V5XVxuXG4gICAgcmV0dXJuIGNvbXBhdGlibGUocHJveHksIGV2ZW50KVxuICB9XG5cbiAgJC5mbi5kZWxlZ2F0ZSA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBldmVudCwgY2FsbGJhY2spe1xuICAgIHJldHVybiB0aGlzLm9uKGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2spXG4gIH1cbiAgJC5mbi51bmRlbGVnYXRlID0gZnVuY3Rpb24oc2VsZWN0b3IsIGV2ZW50LCBjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub2ZmKGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2spXG4gIH1cblxuICAkLmZuLmxpdmUgPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spe1xuICAgICQoZG9jdW1lbnQuYm9keSkuZGVsZWdhdGUodGhpcy5zZWxlY3RvciwgZXZlbnQsIGNhbGxiYWNrKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiAgJC5mbi5kaWUgPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spe1xuICAgICQoZG9jdW1lbnQuYm9keSkudW5kZWxlZ2F0ZSh0aGlzLnNlbGVjdG9yLCBldmVudCwgY2FsbGJhY2spXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gICQuZm4ub24gPSBmdW5jdGlvbihldmVudCwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrLCBvbmUpe1xuICAgIHZhciBhdXRvUmVtb3ZlLCBkZWxlZ2F0b3IsICR0aGlzID0gdGhpc1xuICAgIGlmIChldmVudCAmJiAhaXNTdHJpbmcoZXZlbnQpKSB7XG4gICAgICAkLmVhY2goZXZlbnQsIGZ1bmN0aW9uKHR5cGUsIGZuKXtcbiAgICAgICAgJHRoaXMub24odHlwZSwgc2VsZWN0b3IsIGRhdGEsIGZuLCBvbmUpXG4gICAgICB9KVxuICAgICAgcmV0dXJuICR0aGlzXG4gICAgfVxuXG4gICAgaWYgKCFpc1N0cmluZyhzZWxlY3RvcikgJiYgIWlzRnVuY3Rpb24oY2FsbGJhY2spICYmIGNhbGxiYWNrICE9PSBmYWxzZSlcbiAgICAgIGNhbGxiYWNrID0gZGF0YSwgZGF0YSA9IHNlbGVjdG9yLCBzZWxlY3RvciA9IHVuZGVmaW5lZFxuICAgIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkIHx8IGRhdGEgPT09IGZhbHNlKVxuICAgICAgY2FsbGJhY2sgPSBkYXRhLCBkYXRhID0gdW5kZWZpbmVkXG5cbiAgICBpZiAoY2FsbGJhY2sgPT09IGZhbHNlKSBjYWxsYmFjayA9IHJldHVybkZhbHNlXG5cbiAgICByZXR1cm4gJHRoaXMuZWFjaChmdW5jdGlvbihfLCBlbGVtZW50KXtcbiAgICAgIGlmIChvbmUpIGF1dG9SZW1vdmUgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgcmVtb3ZlKGVsZW1lbnQsIGUudHlwZSwgY2FsbGJhY2spXG4gICAgICAgIHJldHVybiBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9XG5cbiAgICAgIGlmIChzZWxlY3RvcikgZGVsZWdhdG9yID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciBldnQsIG1hdGNoID0gJChlLnRhcmdldCkuY2xvc2VzdChzZWxlY3RvciwgZWxlbWVudCkuZ2V0KDApXG4gICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaCAhPT0gZWxlbWVudCkge1xuICAgICAgICAgIGV2dCA9ICQuZXh0ZW5kKGNyZWF0ZVByb3h5KGUpLCB7Y3VycmVudFRhcmdldDogbWF0Y2gsIGxpdmVGaXJlZDogZWxlbWVudH0pXG4gICAgICAgICAgcmV0dXJuIChhdXRvUmVtb3ZlIHx8IGNhbGxiYWNrKS5hcHBseShtYXRjaCwgW2V2dF0uY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYWRkKGVsZW1lbnQsIGV2ZW50LCBjYWxsYmFjaywgZGF0YSwgc2VsZWN0b3IsIGRlbGVnYXRvciB8fCBhdXRvUmVtb3ZlKVxuICAgIH0pXG4gIH1cbiAgJC5mbi5vZmYgPSBmdW5jdGlvbihldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrKXtcbiAgICB2YXIgJHRoaXMgPSB0aGlzXG4gICAgaWYgKGV2ZW50ICYmICFpc1N0cmluZyhldmVudCkpIHtcbiAgICAgICQuZWFjaChldmVudCwgZnVuY3Rpb24odHlwZSwgZm4pe1xuICAgICAgICAkdGhpcy5vZmYodHlwZSwgc2VsZWN0b3IsIGZuKVxuICAgICAgfSlcbiAgICAgIHJldHVybiAkdGhpc1xuICAgIH1cblxuICAgIGlmICghaXNTdHJpbmcoc2VsZWN0b3IpICYmICFpc0Z1bmN0aW9uKGNhbGxiYWNrKSAmJiBjYWxsYmFjayAhPT0gZmFsc2UpXG4gICAgICBjYWxsYmFjayA9IHNlbGVjdG9yLCBzZWxlY3RvciA9IHVuZGVmaW5lZFxuXG4gICAgaWYgKGNhbGxiYWNrID09PSBmYWxzZSkgY2FsbGJhY2sgPSByZXR1cm5GYWxzZVxuXG4gICAgcmV0dXJuICR0aGlzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHJlbW92ZSh0aGlzLCBldmVudCwgY2FsbGJhY2ssIHNlbGVjdG9yKVxuICAgIH0pXG4gIH1cblxuICAkLmZuLnRyaWdnZXIgPSBmdW5jdGlvbihldmVudCwgYXJncyl7XG4gICAgZXZlbnQgPSAoaXNTdHJpbmcoZXZlbnQpIHx8ICQuaXNQbGFpbk9iamVjdChldmVudCkpID8gJC5FdmVudChldmVudCkgOiBjb21wYXRpYmxlKGV2ZW50KVxuICAgIGV2ZW50Ll9hcmdzID0gYXJnc1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIC8vIGhhbmRsZSBmb2N1cygpLCBibHVyKCkgYnkgY2FsbGluZyB0aGVtIGRpcmVjdGx5XG4gICAgICBpZiAoZXZlbnQudHlwZSBpbiBmb2N1cyAmJiB0eXBlb2YgdGhpc1tldmVudC50eXBlXSA9PSBcImZ1bmN0aW9uXCIpIHRoaXNbZXZlbnQudHlwZV0oKVxuICAgICAgLy8gaXRlbXMgaW4gdGhlIGNvbGxlY3Rpb24gbWlnaHQgbm90IGJlIERPTSBlbGVtZW50c1xuICAgICAgZWxzZSBpZiAoJ2Rpc3BhdGNoRXZlbnQnIGluIHRoaXMpIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudClcbiAgICAgIGVsc2UgJCh0aGlzKS50cmlnZ2VySGFuZGxlcihldmVudCwgYXJncylcbiAgICB9KVxuICB9XG5cbiAgLy8gdHJpZ2dlcnMgZXZlbnQgaGFuZGxlcnMgb24gY3VycmVudCBlbGVtZW50IGp1c3QgYXMgaWYgYW4gZXZlbnQgb2NjdXJyZWQsXG4gIC8vIGRvZXNuJ3QgdHJpZ2dlciBhbiBhY3R1YWwgZXZlbnQsIGRvZXNuJ3QgYnViYmxlXG4gICQuZm4udHJpZ2dlckhhbmRsZXIgPSBmdW5jdGlvbihldmVudCwgYXJncyl7XG4gICAgdmFyIGUsIHJlc3VsdFxuICAgIHRoaXMuZWFjaChmdW5jdGlvbihpLCBlbGVtZW50KXtcbiAgICAgIGUgPSBjcmVhdGVQcm94eShpc1N0cmluZyhldmVudCkgPyAkLkV2ZW50KGV2ZW50KSA6IGV2ZW50KVxuICAgICAgZS5fYXJncyA9IGFyZ3NcbiAgICAgIGUudGFyZ2V0ID0gZWxlbWVudFxuICAgICAgJC5lYWNoKGZpbmRIYW5kbGVycyhlbGVtZW50LCBldmVudC50eXBlIHx8IGV2ZW50KSwgZnVuY3Rpb24oaSwgaGFuZGxlcil7XG4gICAgICAgIHJlc3VsdCA9IGhhbmRsZXIucHJveHkoZSlcbiAgICAgICAgaWYgKGUuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSkgcmV0dXJuIGZhbHNlXG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLy8gc2hvcnRjdXQgbWV0aG9kcyBmb3IgYC5iaW5kKGV2ZW50LCBmbilgIGZvciBlYWNoIGV2ZW50IHR5cGVcbiAgOygnZm9jdXNpbiBmb2N1c291dCBmb2N1cyBibHVyIGxvYWQgcmVzaXplIHNjcm9sbCB1bmxvYWQgY2xpY2sgZGJsY2xpY2sgJytcbiAgJ21vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlICcrXG4gICdjaGFuZ2Ugc2VsZWN0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgZXJyb3InKS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAkLmZuW2V2ZW50XSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gKDAgaW4gYXJndW1lbnRzKSA/XG4gICAgICAgIHRoaXMuYmluZChldmVudCwgY2FsbGJhY2spIDpcbiAgICAgICAgdGhpcy50cmlnZ2VyKGV2ZW50KVxuICAgIH1cbiAgfSlcblxuICAkLkV2ZW50ID0gZnVuY3Rpb24odHlwZSwgcHJvcHMpIHtcbiAgICBpZiAoIWlzU3RyaW5nKHR5cGUpKSBwcm9wcyA9IHR5cGUsIHR5cGUgPSBwcm9wcy50eXBlXG4gICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoc3BlY2lhbEV2ZW50c1t0eXBlXSB8fCAnRXZlbnRzJyksIGJ1YmJsZXMgPSB0cnVlXG4gICAgaWYgKHByb3BzKSBmb3IgKHZhciBuYW1lIGluIHByb3BzKSAobmFtZSA9PSAnYnViYmxlcycpID8gKGJ1YmJsZXMgPSAhIXByb3BzW25hbWVdKSA6IChldmVudFtuYW1lXSA9IHByb3BzW25hbWVdKVxuICAgIGV2ZW50LmluaXRFdmVudCh0eXBlLCBidWJibGVzLCB0cnVlKVxuICAgIHJldHVybiBjb21wYXRpYmxlKGV2ZW50KVxuICB9XG5cbn0pKFplcHRvKVxuXG47KGZ1bmN0aW9uKCQpe1xuICB2YXIgY2FjaGUgPSBbXSwgdGltZW91dFxuXG4gICQuZm4ucmVtb3ZlID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICBpZih0aGlzLnBhcmVudE5vZGUpe1xuICAgICAgICBpZih0aGlzLnRhZ05hbWUgPT09ICdJTUcnKXtcbiAgICAgICAgICBjYWNoZS5wdXNoKHRoaXMpXG4gICAgICAgICAgdGhpcy5zcmMgPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFBRC9BQ3dBQUFBQUFRQUJBQUFDQURzPSdcbiAgICAgICAgICBpZiAodGltZW91dCkgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgY2FjaGUgPSBbXSB9LCA2MDAwMClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcylcbiAgICAgIH1cbiAgICB9KVxuICB9XG59KShaZXB0bylcblxuOyhmdW5jdGlvbigkKXtcbiAgdmFyIGRhdGEgPSB7fSwgZGF0YUF0dHIgPSAkLmZuLmRhdGEsIGNhbWVsaXplID0gJC5jYW1lbENhc2UsXG4gICAgZXhwID0gJC5leHBhbmRvID0gJ1plcHRvJyArICgrbmV3IERhdGUoKSksIGVtcHR5QXJyYXkgPSBbXVxuXG4gIC8vIEdldCB2YWx1ZSBmcm9tIG5vZGU6XG4gIC8vIDEuIGZpcnN0IHRyeSBrZXkgYXMgZ2l2ZW4sXG4gIC8vIDIuIHRoZW4gdHJ5IGNhbWVsaXplZCBrZXksXG4gIC8vIDMuIGZhbGwgYmFjayB0byByZWFkaW5nIFwiZGF0YS0qXCIgYXR0cmlidXRlLlxuICBmdW5jdGlvbiBnZXREYXRhKG5vZGUsIG5hbWUpIHtcbiAgICB2YXIgaWQgPSBub2RlW2V4cF0sIHN0b3JlID0gaWQgJiYgZGF0YVtpZF1cbiAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gc3RvcmUgfHwgc2V0RGF0YShub2RlKVxuICAgIGVsc2Uge1xuICAgICAgaWYgKHN0b3JlKSB7XG4gICAgICAgIGlmIChuYW1lIGluIHN0b3JlKSByZXR1cm4gc3RvcmVbbmFtZV1cbiAgICAgICAgdmFyIGNhbWVsTmFtZSA9IGNhbWVsaXplKG5hbWUpXG4gICAgICAgIGlmIChjYW1lbE5hbWUgaW4gc3RvcmUpIHJldHVybiBzdG9yZVtjYW1lbE5hbWVdXG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YUF0dHIuY2FsbCgkKG5vZGUpLCBuYW1lKVxuICAgIH1cbiAgfVxuXG4gIC8vIFN0b3JlIHZhbHVlIHVuZGVyIGNhbWVsaXplZCBrZXkgb24gbm9kZVxuICBmdW5jdGlvbiBzZXREYXRhKG5vZGUsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIGlkID0gbm9kZVtleHBdIHx8IChub2RlW2V4cF0gPSArKyQudXVpZCksXG4gICAgICBzdG9yZSA9IGRhdGFbaWRdIHx8IChkYXRhW2lkXSA9IGF0dHJpYnV0ZURhdGEobm9kZSkpXG4gICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkgc3RvcmVbY2FtZWxpemUobmFtZSldID0gdmFsdWVcbiAgICByZXR1cm4gc3RvcmVcbiAgfVxuXG4gIC8vIFJlYWQgYWxsIFwiZGF0YS0qXCIgYXR0cmlidXRlcyBmcm9tIGEgbm9kZVxuICBmdW5jdGlvbiBhdHRyaWJ1dGVEYXRhKG5vZGUpIHtcbiAgICB2YXIgc3RvcmUgPSB7fVxuICAgICQuZWFjaChub2RlLmF0dHJpYnV0ZXMgfHwgZW1wdHlBcnJheSwgZnVuY3Rpb24oaSwgYXR0cil7XG4gICAgICBpZiAoYXR0ci5uYW1lLmluZGV4T2YoJ2RhdGEtJykgPT0gMClcbiAgICAgICAgc3RvcmVbY2FtZWxpemUoYXR0ci5uYW1lLnJlcGxhY2UoJ2RhdGEtJywgJycpKV0gPVxuICAgICAgICAgICQuemVwdG8uZGVzZXJpYWxpemVWYWx1ZShhdHRyLnZhbHVlKVxuICAgIH0pXG4gICAgcmV0dXJuIHN0b3JlXG4gIH1cblxuICAkLmZuLmRhdGEgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cbiAgICAgIC8vIHNldCBtdWx0aXBsZSB2YWx1ZXMgdmlhIG9iamVjdFxuICAgICAgJC5pc1BsYWluT2JqZWN0KG5hbWUpID9cbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGksIG5vZGUpe1xuICAgICAgICAgICQuZWFjaChuYW1lLCBmdW5jdGlvbihrZXksIHZhbHVlKXsgc2V0RGF0YShub2RlLCBrZXksIHZhbHVlKSB9KVxuICAgICAgICB9KSA6XG4gICAgICAgIC8vIGdldCB2YWx1ZSBmcm9tIGZpcnN0IGVsZW1lbnRcbiAgICAgICAgKDAgaW4gdGhpcyA/IGdldERhdGEodGhpc1swXSwgbmFtZSkgOiB1bmRlZmluZWQpIDpcbiAgICAgIC8vIHNldCB2YWx1ZSBvbiBhbGwgZWxlbWVudHNcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbigpeyBzZXREYXRhKHRoaXMsIG5hbWUsIHZhbHVlKSB9KVxuICB9XG5cbiAgJC5kYXRhID0gZnVuY3Rpb24oZWxlbSwgbmFtZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gJChlbGVtKS5kYXRhKG5hbWUsIHZhbHVlKVxuICB9XG5cbiAgJC5oYXNEYXRhID0gZnVuY3Rpb24oZWxlbSkge1xuICAgIHZhciBpZCA9IGVsZW1bZXhwXSwgc3RvcmUgPSBpZCAmJiBkYXRhW2lkXVxuICAgIHJldHVybiBzdG9yZSA/ICEkLmlzRW1wdHlPYmplY3Qoc3RvcmUpIDogZmFsc2VcbiAgfVxuXG4gICQuZm4ucmVtb3ZlRGF0YSA9IGZ1bmN0aW9uKG5hbWVzKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lcyA9PSAnc3RyaW5nJykgbmFtZXMgPSBuYW1lcy5zcGxpdCgvXFxzKy8pXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyIGlkID0gdGhpc1tleHBdLCBzdG9yZSA9IGlkICYmIGRhdGFbaWRdXG4gICAgICBpZiAoc3RvcmUpICQuZWFjaChuYW1lcyB8fCBzdG9yZSwgZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgZGVsZXRlIHN0b3JlW25hbWVzID8gY2FtZWxpemUodGhpcykgOiBrZXldXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvLyBHZW5lcmF0ZSBleHRlbmRlZCBgcmVtb3ZlYCBhbmQgYGVtcHR5YCBmdW5jdGlvbnNcbiAgO1sncmVtb3ZlJywgJ2VtcHR5J10uZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKXtcbiAgICB2YXIgb3JpZ0ZuID0gJC5mblttZXRob2ROYW1lXVxuICAgICQuZm5bbWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbGVtZW50cyA9IHRoaXMuZmluZCgnKicpXG4gICAgICBpZiAobWV0aG9kTmFtZSA9PT0gJ3JlbW92ZScpIGVsZW1lbnRzID0gZWxlbWVudHMuYWRkKHRoaXMpXG4gICAgICBlbGVtZW50cy5yZW1vdmVEYXRhKClcbiAgICAgIHJldHVybiBvcmlnRm4uY2FsbCh0aGlzKVxuICAgIH1cbiAgfSlcbn0pKFplcHRvKVxuICByZXR1cm4gWmVwdG9cbn0pKVxuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IHJlcXVpcmUoXCIuLi9pbWFnZXMvc3VtbWVyLmpwZ1wiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IHJlcXVpcmUoXCIuLi9pbWFnZXMvc3Vuc2V0LmpwZ1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNtYWluIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDgwdmg7XFxyXFxufVxcclxcblxcclxcbiNpbWFnZSB7XFxyXFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcclxcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXHJcXG4gIGJhY2tncm91bmQtcG9zaXRpb24teTogMTAwJTtcXHJcXG4gIGhlaWdodDogNzV2aDtcXHJcXG59XFxyXFxuXFxyXFxuI3NlY3Rpb24ge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIGhlaWdodDogODB2aDtcXHJcXG59XFxyXFxuXFxyXFxuI3RlbXAsXFxyXFxuI2ZlZWwsXFxyXFxuI2Rlc2MsXFxyXFxuI3ByZXNzdXJlLFxcclxcbiNodW1pZGl0eSxcXHJcXG4jbWluVGVtcCxcXHJcXG4jbWF4VGVtcCxcXHJcXG4jd2luZCxcXHJcXG4jd2luZERpcixcXHJcXG4jY2xvdWRzLFxcclxcbiNzdW5yaXNlLFxcclxcbiNzdW5zZXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xcclxcbn1cXHJcXG5cXHJcXG4jaG9tZSB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8qIE1haW4gaW5wdXQgd3JhcHBlciAqL1xcclxcbi5hbGdvbGlhLXBsYWNlcyB7fVxcclxcblxcclxcbi8qIFRoZSBhbGdvbGlhLXBsYWNlcyBpbnB1dCAqL1xcclxcbi5hcC1pbnB1dCwgLmFwLWhpbnQge31cXHJcXG5cXHJcXG4vKiBUaGUgc3R5bGUgb2YgdGhlIHN2ZyBpY29ucyB3aGVuIHRoZSBpbnB1dCBpcyBvbiBob3ZlciAqL1xcclxcbi5hcC1pbnB1dDpob3ZlciB+IC5hcC1pbnB1dC1pY29uIHN2ZyxcXHJcXG4uYXAtaW5wdXQ6Zm9jdXMgfiAuYXAtaW5wdXQtaWNvbiBzdmcsXFxyXFxuLmFwLWlucHV0LWljb246aG92ZXIgc3ZnIHt9XFxyXFxuXFxyXFxuLyogVGhlIGRyb3Bkb3duIHN0eWxlICovXFxyXFxuLmFwLWRyb3Bkb3duLW1lbnUge31cXHJcXG5cXHJcXG4vKiBUaGUgc3VnZ2VzdGlvbnMgc3R5bGUgKi9cXHJcXG4uYXAtc3VnZ2VzdGlvbiB7XFxyXFxuICB0ZXh0LWFsaWduOiBzdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuLyogVGhlIGhpZ2hsaWdodGVkIG5hbWVzIHN0eWxlICovXFxyXFxuLmFwLXN1Z2dlc3Rpb24gZW0ge31cXHJcXG5cXHJcXG4vKiBUaGUgYWRkcmVzc2VzIHN0eWxlICovXFxyXFxuLmFwLWFkZHJlc3Mge31cXHJcXG5cXHJcXG4vKiBUaGUgaWNvbnMgb2YgZWFjaCBzdWdnZXN0aW9ucyAoIGNhbiBiZSBhIGJ1aWxkaW5nIG9yIGEgcGluICkgKi9cXHJcXG4uYXAtc3VnZ2VzdGlvbi1pY29uIHt9XFxyXFxuXFxyXFxuLyogVGhlIHN0eWxlIG9mIHRoZSBzdmcgaW5zaWRlIHRoZSAuYXAtc3VnZ2VzdGlvbi1pY29uICovXFxyXFxuLmFwLXN1Z2dlc3Rpb24taWNvbiBzdmcge31cXHJcXG5cXHJcXG4vKiBUaGUgaWNvbnMgaW5zaWRlIHRoZSBpbnB1dCAoIGNhbiBiZSBhIHBpbiBvciBhIGNyb3NzICkgKi9cXHJcXG4uYXAtaW5wdXQtaWNvbiB7cmlnaHQ6IDIzNXB4O31cXHJcXG5cXHJcXG4vKiBUaGUgc3R5bGUgb2YgdGhlIHN2ZyBpbnNpZGUgdGhlIC5hcC1pbnB1dC1pY29uICovXFxyXFxuLmFwLWlucHV0LWljb24gc3ZnIHt9XFxyXFxuXFxyXFxuLyogLmEtY3Vyc29yIGlzIHRoZSBjbGFzcyBhIHN1Z2dlc3Rpb24gZ28gb24gaG92ZXIgKi9cXHJcXG4uYXAtY3Vyc29yIHt9XFxyXFxuXFxyXFxuLyogVGhlIHN0eWxlIG9mIHRoZSBzdmcgaWNvbiwgd2hlbiB0aGUgLmFwLXN1Z2dlc3Rpb24gaXMgb24gaG92ZXIgKi9cXHJcXG4uYXAtY3Vyc29yIC5hcC1zdWdnZXN0aW9uLWljb24gc3ZnIHt9XFxyXFxuXFxyXFxuLyogVGhlIHN0eWxlcyBvZiB0aGUgQWxnb2xpYSBQbGFjZXMgaW5wdXQgZm9vdGVyICovXFxyXFxuLmFwLWZvb3RlciB7fVxcclxcblxcclxcbi8qIFRoZSBzdHlsZXMgb2YgdGhlIEFsZ29saWEgUGxhY2VzIGlucHV0IGZvb3RlciBsaW5rcyAqL1xcclxcbi5hcC1mb290ZXIgYSB7fVxcclxcblxcclxcbi8qIFRoZSBzdHlsZXMgb2YgdGhlIEFsZ29saWEgUGxhY2VzIGlucHV0IGZvb3RlciBzdmcgaWNvbnMgKi9cXHJcXG4uYXAtZm9vdGVyIGEgc3ZnIHt9XFxyXFxuXFxyXFxuLyogVGhlIHN0eWxlcyBvZiB0aGUgQWxnb2xpYSBQbGFjZXMgaW5wdXQgZm9vdGVyIG9uIGhvdmVyICovXFxyXFxuLmFwLWZvb3Rlcjpob3ZlciB7fVxcclxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcblxuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCAnJykuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgcmV0dXJuIFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIG9wdGlvbnMgPSB7fTtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGUsIG5vLXBhcmFtLXJlYXNzaWduXG5cblxuICB1cmwgPSB1cmwgJiYgdXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybDtcblxuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICdsaWdodHNlYWdyZWVuJyxcbiAgJ2ZvcmVzdGdyZWVuJyxcbiAgJ2dvbGRlbnJvZCcsXG4gICdkb2RnZXJibHVlJyxcbiAgJ2RhcmtvcmNoaWQnLFxuICAnY3JpbXNvbidcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gIC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG4gIHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuICAgIC8vIGlzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuICAgIC8vIGRvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnIubWVzc2FnZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgYXJnc1swXSA9ICh1c2VDb2xvcnMgPyAnJWMnIDogJycpXG4gICAgKyB0aGlzLm5hbWVzcGFjZVxuICAgICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKVxuICAgICsgYXJnc1swXVxuICAgICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKVxuICAgICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gIGlmICghdXNlQ29sb3JzKSByZXR1cm47XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKVxuXG4gIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0QyA9IDA7XG4gIGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmICgnJSUnID09PSBtYXRjaCkgcmV0dXJuO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbiAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICBsYXN0QyA9IGluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZVxuICAgICYmIGNvbnNvbGUubG9nXG4gICAgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICB0cnkge1xuICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHZhciByO1xuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7XG4gIH0gY2F0Y2goZSkge31cblxuICAvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG4iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Z1snZGVmYXVsdCddID0gY3JlYXRlRGVidWc7XG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtcbmV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5leHBvcnRzLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBQcmV2aW91cyBsb2cgdGltZXN0YW1wLlxuICovXG5cbnZhciBwcmV2VGltZTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG5cbiAgLy8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmluaXQpIHtcbiAgICBleHBvcnRzLmluaXQoZGVidWcpO1xuICB9XG5cbiAgcmV0dXJuIGRlYnVnO1xufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiLyohXG4gKiBAb3ZlcnZpZXcgZXM2LXByb21pc2UgLSBhIHRpbnkgaW1wbGVtZW50YXRpb24gb2YgUHJvbWlzZXMvQSsuXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNCBZZWh1ZGEgS2F0eiwgVG9tIERhbGUsIFN0ZWZhbiBQZW5uZXIgYW5kIGNvbnRyaWJ1dG9ycyAoQ29udmVyc2lvbiB0byBFUzYgQVBJIGJ5IEpha2UgQXJjaGliYWxkKVxuICogQGxpY2Vuc2UgICBMaWNlbnNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogICAgICAgICAgICBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3N0ZWZhbnBlbm5lci9lczYtcHJvbWlzZS9tYXN0ZXIvTElDRU5TRVxuICogQHZlcnNpb24gICB2NC4yLjgrMWU2OGRjZTZcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwuRVM2UHJvbWlzZSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb2JqZWN0T3JGdW5jdGlvbih4KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHg7XG4gIHJldHVybiB4ICE9PSBudWxsICYmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKTtcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuXG5cbnZhciBfaXNBcnJheSA9IHZvaWQgMDtcbmlmIChBcnJheS5pc0FycmF5KSB7XG4gIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbn0gZWxzZSB7XG4gIF9pc0FycmF5ID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xufVxuXG52YXIgaXNBcnJheSA9IF9pc0FycmF5O1xuXG52YXIgbGVuID0gMDtcbnZhciB2ZXJ0eE5leHQgPSB2b2lkIDA7XG52YXIgY3VzdG9tU2NoZWR1bGVyRm4gPSB2b2lkIDA7XG5cbnZhciBhc2FwID0gZnVuY3Rpb24gYXNhcChjYWxsYmFjaywgYXJnKSB7XG4gIHF1ZXVlW2xlbl0gPSBjYWxsYmFjaztcbiAgcXVldWVbbGVuICsgMV0gPSBhcmc7XG4gIGxlbiArPSAyO1xuICBpZiAobGVuID09PSAyKSB7XG4gICAgLy8gSWYgbGVuIGlzIDIsIHRoYXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIHNjaGVkdWxlIGFuIGFzeW5jIGZsdXNoLlxuICAgIC8vIElmIGFkZGl0aW9uYWwgY2FsbGJhY2tzIGFyZSBxdWV1ZWQgYmVmb3JlIHRoZSBxdWV1ZSBpcyBmbHVzaGVkLCB0aGV5XG4gICAgLy8gd2lsbCBiZSBwcm9jZXNzZWQgYnkgdGhpcyBmbHVzaCB0aGF0IHdlIGFyZSBzY2hlZHVsaW5nLlxuICAgIGlmIChjdXN0b21TY2hlZHVsZXJGbikge1xuICAgICAgY3VzdG9tU2NoZWR1bGVyRm4oZmx1c2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2hlZHVsZUZsdXNoKCk7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBzZXRTY2hlZHVsZXIoc2NoZWR1bGVGbikge1xuICBjdXN0b21TY2hlZHVsZXJGbiA9IHNjaGVkdWxlRm47XG59XG5cbmZ1bmN0aW9uIHNldEFzYXAoYXNhcEZuKSB7XG4gIGFzYXAgPSBhc2FwRm47XG59XG5cbnZhciBicm93c2VyV2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XG52YXIgYnJvd3Nlckdsb2JhbCA9IGJyb3dzZXJXaW5kb3cgfHwge307XG52YXIgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBicm93c2VyR2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgYnJvd3Nlckdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIGlzTm9kZSA9IHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYge30udG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nO1xuXG4vLyB0ZXN0IGZvciB3ZWIgd29ya2VyIGJ1dCBub3QgaW4gSUUxMFxudmFyIGlzV29ya2VyID0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgaW1wb3J0U2NyaXB0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJztcblxuLy8gbm9kZVxuZnVuY3Rpb24gdXNlTmV4dFRpY2soKSB7XG4gIC8vIG5vZGUgdmVyc2lvbiAwLjEwLnggZGlzcGxheXMgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHdoZW4gbmV4dFRpY2sgaXMgdXNlZCByZWN1cnNpdmVseVxuICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2N1am9qcy93aGVuL2lzc3Vlcy80MTAgZm9yIGRldGFpbHNcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gIH07XG59XG5cbi8vIHZlcnR4XG5mdW5jdGlvbiB1c2VWZXJ0eFRpbWVyKCkge1xuICBpZiAodHlwZW9mIHZlcnR4TmV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmVydHhOZXh0KGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHVzZVNldFRpbWVvdXQoKTtcbn1cblxuZnVuY3Rpb24gdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIoZmx1c2gpO1xuICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBub2RlLmRhdGEgPSBpdGVyYXRpb25zID0gKytpdGVyYXRpb25zICUgMjtcbiAgfTtcbn1cblxuLy8gd2ViIHdvcmtlclxuZnVuY3Rpb24gdXNlTWVzc2FnZUNoYW5uZWwoKSB7XG4gIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZmx1c2g7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHVzZVNldFRpbWVvdXQoKSB7XG4gIC8vIFN0b3JlIHNldFRpbWVvdXQgcmVmZXJlbmNlIHNvIGVzNi1wcm9taXNlIHdpbGwgYmUgdW5hZmZlY3RlZCBieVxuICAvLyBvdGhlciBjb2RlIG1vZGlmeWluZyBzZXRUaW1lb3V0IChsaWtlIHNpbm9uLnVzZUZha2VUaW1lcnMoKSlcbiAgdmFyIGdsb2JhbFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnbG9iYWxTZXRUaW1lb3V0KGZsdXNoLCAxKTtcbiAgfTtcbn1cblxudmFyIHF1ZXVlID0gbmV3IEFycmF5KDEwMDApO1xuZnVuY3Rpb24gZmx1c2goKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBxdWV1ZVtpXTtcbiAgICB2YXIgYXJnID0gcXVldWVbaSArIDFdO1xuXG4gICAgY2FsbGJhY2soYXJnKTtcblxuICAgIHF1ZXVlW2ldID0gdW5kZWZpbmVkO1xuICAgIHF1ZXVlW2kgKyAxXSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGxlbiA9IDA7XG59XG5cbmZ1bmN0aW9uIGF0dGVtcHRWZXJ0eCgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgdmVydHggPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpLnJlcXVpcmUoJ3ZlcnR4Jyk7XG4gICAgdmVydHhOZXh0ID0gdmVydHgucnVuT25Mb29wIHx8IHZlcnR4LnJ1bk9uQ29udGV4dDtcbiAgICByZXR1cm4gdXNlVmVydHhUaW1lcigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHVzZVNldFRpbWVvdXQoKTtcbiAgfVxufVxuXG52YXIgc2NoZWR1bGVGbHVzaCA9IHZvaWQgMDtcbi8vIERlY2lkZSB3aGF0IGFzeW5jIG1ldGhvZCB0byB1c2UgdG8gdHJpZ2dlcmluZyBwcm9jZXNzaW5nIG9mIHF1ZXVlZCBjYWxsYmFja3M6XG5pZiAoaXNOb2RlKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VOZXh0VGljaygpO1xufSBlbHNlIGlmIChCcm93c2VyTXV0YXRpb25PYnNlcnZlcikge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTXV0YXRpb25PYnNlcnZlcigpO1xufSBlbHNlIGlmIChpc1dvcmtlcikge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTWVzc2FnZUNoYW5uZWwoKTtcbn0gZWxzZSBpZiAoYnJvd3NlcldpbmRvdyA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSBhdHRlbXB0VmVydHgoKTtcbn0gZWxzZSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VTZXRUaW1lb3V0KCk7XG59XG5cbmZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgdmFyIHBhcmVudCA9IHRoaXM7XG5cbiAgdmFyIGNoaWxkID0gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9vcCk7XG5cbiAgaWYgKGNoaWxkW1BST01JU0VfSURdID09PSB1bmRlZmluZWQpIHtcbiAgICBtYWtlUHJvbWlzZShjaGlsZCk7XG4gIH1cblxuICB2YXIgX3N0YXRlID0gcGFyZW50Ll9zdGF0ZTtcblxuXG4gIGlmIChfc3RhdGUpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbX3N0YXRlIC0gMV07XG4gICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaW52b2tlQ2FsbGJhY2soX3N0YXRlLCBjaGlsZCwgY2FsbGJhY2ssIHBhcmVudC5fcmVzdWx0KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkO1xufVxuXG4vKipcbiAgYFByb21pc2UucmVzb2x2ZWAgcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSByZXNvbHZlZCB3aXRoIHRoZVxuICBwYXNzZWQgYHZhbHVlYC4gSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHJlc29sdmUoMSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKDEpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVzb2x2ZVxuICBAc3RhdGljXG4gIEBwYXJhbSB7QW55fSB2YWx1ZSB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aFxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVjb21lIGZ1bGZpbGxlZCB3aXRoIHRoZSBnaXZlblxuICBgdmFsdWVgXG4qL1xuZnVuY3Rpb24gcmVzb2x2ZSQxKG9iamVjdCkge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gIGlmIChvYmplY3QgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0LmNvbnN0cnVjdG9yID09PSBDb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3Rvcihub29wKTtcbiAgcmVzb2x2ZShwcm9taXNlLCBvYmplY3QpO1xuICByZXR1cm4gcHJvbWlzZTtcbn1cblxudmFyIFBST01JU0VfSUQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMik7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgUEVORElORyA9IHZvaWQgMDtcbnZhciBGVUxGSUxMRUQgPSAxO1xudmFyIFJFSkVDVEVEID0gMjtcblxuZnVuY3Rpb24gc2VsZkZ1bGZpbGxtZW50KCkge1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBjYW5ub3QgcmVzb2x2ZSBhIHByb21pc2Ugd2l0aCBpdHNlbGZcIik7XG59XG5cbmZ1bmN0aW9uIGNhbm5vdFJldHVybk93bigpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS4nKTtcbn1cblxuZnVuY3Rpb24gdHJ5VGhlbih0aGVuJCQxLCB2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKSB7XG4gIHRyeSB7XG4gICAgdGhlbiQkMS5jYWxsKHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlLCB0aGVuJCQxKSB7XG4gIGFzYXAoZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICB2YXIgc2VhbGVkID0gZmFsc2U7XG4gICAgdmFyIGVycm9yID0gdHJ5VGhlbih0aGVuJCQxLCB0aGVuYWJsZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAoc2VhbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICBpZiAodGhlbmFibGUgIT09IHZhbHVlKSB7XG4gICAgICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaWYgKHNlYWxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuXG4gICAgICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICB9LCAnU2V0dGxlOiAnICsgKHByb21pc2UuX2xhYmVsIHx8ICcgdW5rbm93biBwcm9taXNlJykpO1xuXG4gICAgaWYgKCFzZWFsZWQgJiYgZXJyb3IpIHtcbiAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICByZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH1cbiAgfSwgcHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlKSB7XG4gIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IEZVTEZJTExFRCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgIHJlamVjdChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgfSBlbHNlIHtcbiAgICBzdWJzY3JpYmUodGhlbmFibGUsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgcmV0dXJuIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkMSkge1xuICBpZiAobWF5YmVUaGVuYWJsZS5jb25zdHJ1Y3RvciA9PT0gcHJvbWlzZS5jb25zdHJ1Y3RvciAmJiB0aGVuJCQxID09PSB0aGVuICYmIG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IucmVzb2x2ZSA9PT0gcmVzb2x2ZSQxKSB7XG4gICAgaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoZW4kJDEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhlbiQkMSkpIHtcbiAgICAgIGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlLCB0aGVuJCQxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSkge1xuICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICByZWplY3QocHJvbWlzZSwgc2VsZkZ1bGZpbGxtZW50KCkpO1xuICB9IGVsc2UgaWYgKG9iamVjdE9yRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIHRoZW4kJDEgPSB2b2lkIDA7XG4gICAgdHJ5IHtcbiAgICAgIHRoZW4kJDEgPSB2YWx1ZS50aGVuO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlLCB0aGVuJCQxKTtcbiAgfSBlbHNlIHtcbiAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdWJsaXNoUmVqZWN0aW9uKHByb21pc2UpIHtcbiAgaWYgKHByb21pc2UuX29uZXJyb3IpIHtcbiAgICBwcm9taXNlLl9vbmVycm9yKHByb21pc2UuX3Jlc3VsdCk7XG4gIH1cblxuICBwdWJsaXNoKHByb21pc2UpO1xufVxuXG5mdW5jdGlvbiBmdWxmaWxsKHByb21pc2UsIHZhbHVlKSB7XG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHByb21pc2UuX3Jlc3VsdCA9IHZhbHVlO1xuICBwcm9taXNlLl9zdGF0ZSA9IEZVTEZJTExFRDtcblxuICBpZiAocHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoICE9PSAwKSB7XG4gICAgYXNhcChwdWJsaXNoLCBwcm9taXNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9taXNlLl9zdGF0ZSA9IFJFSkVDVEVEO1xuICBwcm9taXNlLl9yZXN1bHQgPSByZWFzb247XG5cbiAgYXNhcChwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBfc3Vic2NyaWJlcnMgPSBwYXJlbnQuX3N1YnNjcmliZXJzO1xuICB2YXIgbGVuZ3RoID0gX3N1YnNjcmliZXJzLmxlbmd0aDtcblxuXG4gIHBhcmVudC5fb25lcnJvciA9IG51bGw7XG5cbiAgX3N1YnNjcmliZXJzW2xlbmd0aF0gPSBjaGlsZDtcbiAgX3N1YnNjcmliZXJzW2xlbmd0aCArIEZVTEZJTExFRF0gPSBvbkZ1bGZpbGxtZW50O1xuICBfc3Vic2NyaWJlcnNbbGVuZ3RoICsgUkVKRUNURURdID0gb25SZWplY3Rpb247XG5cbiAgaWYgKGxlbmd0aCA9PT0gMCAmJiBwYXJlbnQuX3N0YXRlKSB7XG4gICAgYXNhcChwdWJsaXNoLCBwYXJlbnQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2gocHJvbWlzZSkge1xuICB2YXIgc3Vic2NyaWJlcnMgPSBwcm9taXNlLl9zdWJzY3JpYmVycztcbiAgdmFyIHNldHRsZWQgPSBwcm9taXNlLl9zdGF0ZTtcblxuICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGNoaWxkID0gdm9pZCAwLFxuICAgICAgY2FsbGJhY2sgPSB2b2lkIDAsXG4gICAgICBkZXRhaWwgPSBwcm9taXNlLl9yZXN1bHQ7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMykge1xuICAgIGNoaWxkID0gc3Vic2NyaWJlcnNbaV07XG4gICAgY2FsbGJhY2sgPSBzdWJzY3JpYmVyc1tpICsgc2V0dGxlZF07XG5cbiAgICBpZiAoY2hpbGQpIHtcbiAgICAgIGludm9rZUNhbGxiYWNrKHNldHRsZWQsIGNoaWxkLCBjYWxsYmFjaywgZGV0YWlsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soZGV0YWlsKTtcbiAgICB9XG4gIH1cblxuICBwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggPSAwO1xufVxuXG5mdW5jdGlvbiBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBwcm9taXNlLCBjYWxsYmFjaywgZGV0YWlsKSB7XG4gIHZhciBoYXNDYWxsYmFjayA9IGlzRnVuY3Rpb24oY2FsbGJhY2spLFxuICAgICAgdmFsdWUgPSB2b2lkIDAsXG4gICAgICBlcnJvciA9IHZvaWQgMCxcbiAgICAgIHN1Y2NlZWRlZCA9IHRydWU7XG5cbiAgaWYgKGhhc0NhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhbHVlID0gY2FsbGJhY2soZGV0YWlsKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBzdWNjZWVkZWQgPSBmYWxzZTtcbiAgICAgIGVycm9yID0gZTtcbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICAgIHJlamVjdChwcm9taXNlLCBjYW5ub3RSZXR1cm5Pd24oKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gZGV0YWlsO1xuICB9XG5cbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgLy8gbm9vcFxuICB9IGVsc2UgaWYgKGhhc0NhbGxiYWNrICYmIHN1Y2NlZWRlZCkge1xuICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKHN1Y2NlZWRlZCA9PT0gZmFsc2UpIHtcbiAgICByZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IEZVTEZJTExFRCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IFJFSkVDVEVEKSB7XG4gICAgcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplUHJvbWlzZShwcm9taXNlLCByZXNvbHZlcikge1xuICB0cnkge1xuICAgIHJlc29sdmVyKGZ1bmN0aW9uIHJlc29sdmVQcm9taXNlKHZhbHVlKSB7XG4gICAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiByZWplY3RQcm9taXNlKHJlYXNvbikge1xuICAgICAgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZWplY3QocHJvbWlzZSwgZSk7XG4gIH1cbn1cblxudmFyIGlkID0gMDtcbmZ1bmN0aW9uIG5leHRJZCgpIHtcbiAgcmV0dXJuIGlkKys7XG59XG5cbmZ1bmN0aW9uIG1ha2VQcm9taXNlKHByb21pc2UpIHtcbiAgcHJvbWlzZVtQUk9NSVNFX0lEXSA9IGlkKys7XG4gIHByb21pc2UuX3N0YXRlID0gdW5kZWZpbmVkO1xuICBwcm9taXNlLl9yZXN1bHQgPSB1bmRlZmluZWQ7XG4gIHByb21pc2UuX3N1YnNjcmliZXJzID0gW107XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRpb25FcnJvcigpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcignQXJyYXkgTWV0aG9kcyBtdXN0IGJlIHByb3ZpZGVkIGFuIEFycmF5Jyk7XG59XG5cbnZhciBFbnVtZXJhdG9yID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFbnVtZXJhdG9yKENvbnN0cnVjdG9yLCBpbnB1dCkge1xuICAgIHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICB0aGlzLnByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG5cbiAgICBpZiAoIXRoaXMucHJvbWlzZVtQUk9NSVNFX0lEXSkge1xuICAgICAgbWFrZVByb21pc2UodGhpcy5wcm9taXNlKTtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheShpbnB1dCkpIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuICAgICAgdGhpcy5fcmVtYWluaW5nID0gaW5wdXQubGVuZ3RoO1xuXG4gICAgICB0aGlzLl9yZXN1bHQgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpO1xuXG4gICAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMubGVuZ3RoIHx8IDA7XG4gICAgICAgIHRoaXMuX2VudW1lcmF0ZShpbnB1dCk7XG4gICAgICAgIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICBmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZWplY3QodGhpcy5wcm9taXNlLCB2YWxpZGF0aW9uRXJyb3IoKSk7XG4gICAgfVxuICB9XG5cbiAgRW51bWVyYXRvci5wcm90b3R5cGUuX2VudW1lcmF0ZSA9IGZ1bmN0aW9uIF9lbnVtZXJhdGUoaW5wdXQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgdGhpcy5fc3RhdGUgPT09IFBFTkRJTkcgJiYgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9lYWNoRW50cnkoaW5wdXRbaV0sIGkpO1xuICAgIH1cbiAgfTtcblxuICBFbnVtZXJhdG9yLnByb3RvdHlwZS5fZWFjaEVudHJ5ID0gZnVuY3Rpb24gX2VhY2hFbnRyeShlbnRyeSwgaSkge1xuICAgIHZhciBjID0gdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvcjtcbiAgICB2YXIgcmVzb2x2ZSQkMSA9IGMucmVzb2x2ZTtcblxuXG4gICAgaWYgKHJlc29sdmUkJDEgPT09IHJlc29sdmUkMSkge1xuICAgICAgdmFyIF90aGVuID0gdm9pZCAwO1xuICAgICAgdmFyIGVycm9yID0gdm9pZCAwO1xuICAgICAgdmFyIGRpZEVycm9yID0gZmFsc2U7XG4gICAgICB0cnkge1xuICAgICAgICBfdGhlbiA9IGVudHJ5LnRoZW47XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGRpZEVycm9yID0gdHJ1ZTtcbiAgICAgICAgZXJyb3IgPSBlO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3RoZW4gPT09IHRoZW4gJiYgZW50cnkuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgICAgIHRoaXMuX3NldHRsZWRBdChlbnRyeS5fc3RhdGUsIGksIGVudHJ5Ll9yZXN1bHQpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgX3RoZW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5fcmVtYWluaW5nLS07XG4gICAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IGVudHJ5O1xuICAgICAgfSBlbHNlIGlmIChjID09PSBQcm9taXNlJDEpIHtcbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgYyhub29wKTtcbiAgICAgICAgaWYgKGRpZEVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIGVudHJ5LCBfdGhlbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KHByb21pc2UsIGkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KG5ldyBjKGZ1bmN0aW9uIChyZXNvbHZlJCQxKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUkJDEoZW50cnkpO1xuICAgICAgICB9KSwgaSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChyZXNvbHZlJCQxKGVudHJ5KSwgaSk7XG4gICAgfVxuICB9O1xuXG4gIEVudW1lcmF0b3IucHJvdG90eXBlLl9zZXR0bGVkQXQgPSBmdW5jdGlvbiBfc2V0dGxlZEF0KHN0YXRlLCBpLCB2YWx1ZSkge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5wcm9taXNlO1xuXG5cbiAgICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IFBFTkRJTkcpIHtcbiAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuXG4gICAgICBpZiAoc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgICAgIHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZXN1bHRbaV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgfVxuICB9O1xuXG4gIEVudW1lcmF0b3IucHJvdG90eXBlLl93aWxsU2V0dGxlQXQgPSBmdW5jdGlvbiBfd2lsbFNldHRsZUF0KHByb21pc2UsIGkpIHtcbiAgICB2YXIgZW51bWVyYXRvciA9IHRoaXM7XG5cbiAgICBzdWJzY3JpYmUocHJvbWlzZSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBlbnVtZXJhdG9yLl9zZXR0bGVkQXQoRlVMRklMTEVELCBpLCB2YWx1ZSk7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgcmV0dXJuIGVudW1lcmF0b3IuX3NldHRsZWRBdChSRUpFQ1RFRCwgaSwgcmVhc29uKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRW51bWVyYXRvcjtcbn0oKTtcblxuLyoqXG4gIGBQcm9taXNlLmFsbGAgYWNjZXB0cyBhbiBhcnJheSBvZiBwcm9taXNlcywgYW5kIHJldHVybnMgYSBuZXcgcHJvbWlzZSB3aGljaFxuICBpcyBmdWxmaWxsZWQgd2l0aCBhbiBhcnJheSBvZiBmdWxmaWxsbWVudCB2YWx1ZXMgZm9yIHRoZSBwYXNzZWQgcHJvbWlzZXMsIG9yXG4gIHJlamVjdGVkIHdpdGggdGhlIHJlYXNvbiBvZiB0aGUgZmlyc3QgcGFzc2VkIHByb21pc2UgdG8gYmUgcmVqZWN0ZWQuIEl0IGNhc3RzIGFsbFxuICBlbGVtZW50cyBvZiB0aGUgcGFzc2VkIGl0ZXJhYmxlIHRvIHByb21pc2VzIGFzIGl0IHJ1bnMgdGhpcyBhbGdvcml0aG0uXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IHJlc29sdmUoMSk7XG4gIGxldCBwcm9taXNlMiA9IHJlc29sdmUoMik7XG4gIGxldCBwcm9taXNlMyA9IHJlc29sdmUoMyk7XG4gIGxldCBwcm9taXNlcyA9IFsgcHJvbWlzZTEsIHByb21pc2UyLCBwcm9taXNlMyBdO1xuXG4gIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKGFycmF5KXtcbiAgICAvLyBUaGUgYXJyYXkgaGVyZSB3b3VsZCBiZSBbIDEsIDIsIDMgXTtcbiAgfSk7XG4gIGBgYFxuXG4gIElmIGFueSBvZiB0aGUgYHByb21pc2VzYCBnaXZlbiB0byBgYWxsYCBhcmUgcmVqZWN0ZWQsIHRoZSBmaXJzdCBwcm9taXNlXG4gIHRoYXQgaXMgcmVqZWN0ZWQgd2lsbCBiZSBnaXZlbiBhcyBhbiBhcmd1bWVudCB0byB0aGUgcmV0dXJuZWQgcHJvbWlzZXMnc1xuICByZWplY3Rpb24gaGFuZGxlci4gRm9yIGV4YW1wbGU6XG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IHJlc29sdmUoMSk7XG4gIGxldCBwcm9taXNlMiA9IHJlamVjdChuZXcgRXJyb3IoXCIyXCIpKTtcbiAgbGV0IHByb21pc2UzID0gcmVqZWN0KG5ldyBFcnJvcihcIjNcIikpO1xuICBsZXQgcHJvbWlzZXMgPSBbIHByb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTMgXTtcblxuICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gQ29kZSBoZXJlIG5ldmVyIHJ1bnMgYmVjYXVzZSB0aGVyZSBhcmUgcmVqZWN0ZWQgcHJvbWlzZXMhXG4gIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgLy8gZXJyb3IubWVzc2FnZSA9PT0gXCIyXCJcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgYWxsXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBcnJheX0gZW50cmllcyBhcnJheSBvZiBwcm9taXNlc1xuICBAcGFyYW0ge1N0cmluZ30gbGFiZWwgb3B0aW9uYWwgc3RyaW5nIGZvciBsYWJlbGluZyB0aGUgcHJvbWlzZS5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdoZW4gYWxsIGBwcm9taXNlc2AgaGF2ZSBiZWVuXG4gIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQgaWYgYW55IG9mIHRoZW0gYmVjb21lIHJlamVjdGVkLlxuICBAc3RhdGljXG4qL1xuZnVuY3Rpb24gYWxsKGVudHJpZXMpIHtcbiAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yKHRoaXMsIGVudHJpZXMpLnByb21pc2U7XG59XG5cbi8qKlxuICBgUHJvbWlzZS5yYWNlYCByZXR1cm5zIGEgbmV3IHByb21pc2Ugd2hpY2ggaXMgc2V0dGxlZCBpbiB0aGUgc2FtZSB3YXkgYXMgdGhlXG4gIGZpcnN0IHBhc3NlZCBwcm9taXNlIHRvIHNldHRsZS5cblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDEnKTtcbiAgICB9LCAyMDApO1xuICB9KTtcblxuICBsZXQgcHJvbWlzZTIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlc29sdmUoJ3Byb21pc2UgMicpO1xuICAgIH0sIDEwMCk7XG4gIH0pO1xuXG4gIFByb21pc2UucmFjZShbcHJvbWlzZTEsIHByb21pc2UyXSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgIC8vIHJlc3VsdCA9PT0gJ3Byb21pc2UgMicgYmVjYXVzZSBpdCB3YXMgcmVzb2x2ZWQgYmVmb3JlIHByb21pc2UxXG4gICAgLy8gd2FzIHJlc29sdmVkLlxuICB9KTtcbiAgYGBgXG5cbiAgYFByb21pc2UucmFjZWAgaXMgZGV0ZXJtaW5pc3RpYyBpbiB0aGF0IG9ubHkgdGhlIHN0YXRlIG9mIHRoZSBmaXJzdFxuICBzZXR0bGVkIHByb21pc2UgbWF0dGVycy4gRm9yIGV4YW1wbGUsIGV2ZW4gaWYgb3RoZXIgcHJvbWlzZXMgZ2l2ZW4gdG8gdGhlXG4gIGBwcm9taXNlc2AgYXJyYXkgYXJndW1lbnQgYXJlIHJlc29sdmVkLCBidXQgdGhlIGZpcnN0IHNldHRsZWQgcHJvbWlzZSBoYXNcbiAgYmVjb21lIHJlamVjdGVkIGJlZm9yZSB0aGUgb3RoZXIgcHJvbWlzZXMgYmVjYW1lIGZ1bGZpbGxlZCwgdGhlIHJldHVybmVkXG4gIHByb21pc2Ugd2lsbCBiZWNvbWUgcmVqZWN0ZWQ6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlc29sdmUoJ3Byb21pc2UgMScpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuXG4gIGxldCBwcm9taXNlMiA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcigncHJvbWlzZSAyJykpO1xuICAgIH0sIDEwMCk7XG4gIH0pO1xuXG4gIFByb21pc2UucmFjZShbcHJvbWlzZTEsIHByb21pc2UyXSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdwcm9taXNlIDInIGJlY2F1c2UgcHJvbWlzZSAyIGJlY2FtZSByZWplY3RlZCBiZWZvcmVcbiAgICAvLyBwcm9taXNlIDEgYmVjYW1lIGZ1bGZpbGxlZFxuICB9KTtcbiAgYGBgXG5cbiAgQW4gZXhhbXBsZSByZWFsLXdvcmxkIHVzZSBjYXNlIGlzIGltcGxlbWVudGluZyB0aW1lb3V0czpcblxuICBgYGBqYXZhc2NyaXB0XG4gIFByb21pc2UucmFjZShbYWpheCgnZm9vLmpzb24nKSwgdGltZW91dCg1MDAwKV0pXG4gIGBgYFxuXG4gIEBtZXRob2QgcmFjZVxuICBAc3RhdGljXG4gIEBwYXJhbSB7QXJyYXl9IHByb21pc2VzIGFycmF5IG9mIHByb21pc2VzIHRvIG9ic2VydmVcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2Ugd2hpY2ggc2V0dGxlcyBpbiB0aGUgc2FtZSB3YXkgYXMgdGhlIGZpcnN0IHBhc3NlZFxuICBwcm9taXNlIHRvIHNldHRsZS5cbiovXG5mdW5jdGlvbiByYWNlKGVudHJpZXMpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICBpZiAoIWlzQXJyYXkoZW50cmllcykpIHtcbiAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKGZ1bmN0aW9uIChfLCByZWplY3QpIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhbiBhcnJheSB0byByYWNlLicpKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBsZW5ndGggPSBlbnRyaWVzLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQ29uc3RydWN0b3IucmVzb2x2ZShlbnRyaWVzW2ldKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gIGBQcm9taXNlLnJlamVjdGAgcmV0dXJucyBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCB0aGUgcGFzc2VkIGByZWFzb25gLlxuICBJdCBpcyBzaG9ydGhhbmQgZm9yIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgcmVqZWN0KG5ldyBFcnJvcignV0hPT1BTJykpO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIENvZGUgaGVyZSBkb2Vzbid0IHJ1biBiZWNhdXNlIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIVxuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAnV0hPT1BTJ1xuICB9KTtcbiAgYGBgXG5cbiAgSW5zdGVhZCBvZiB3cml0aW5nIHRoZSBhYm92ZSwgeW91ciBjb2RlIG5vdyBzaW1wbHkgYmVjb21lcyB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ1dIT09QUycpKTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIENvZGUgaGVyZSBkb2Vzbid0IHJ1biBiZWNhdXNlIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIVxuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAnV0hPT1BTJ1xuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCByZWplY3RcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FueX0gcmVhc29uIHZhbHVlIHRoYXQgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSByZWplY3RlZCB3aXRoIHRoZSBnaXZlbiBgcmVhc29uYC5cbiovXG5mdW5jdGlvbiByZWplY3QkMShyZWFzb24pIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gbmVlZHNSZXNvbHZlcigpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhIHJlc29sdmVyIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgcHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xufVxuXG5mdW5jdGlvbiBuZWVkc05ldygpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ1Byb21pc2UnOiBQbGVhc2UgdXNlIHRoZSAnbmV3JyBvcGVyYXRvciwgdGhpcyBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLlwiKTtcbn1cblxuLyoqXG4gIFByb21pc2Ugb2JqZWN0cyByZXByZXNlbnQgdGhlIGV2ZW50dWFsIHJlc3VsdCBvZiBhbiBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGVcbiAgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCwgd2hpY2hcbiAgcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2UncyBldmVudHVhbCB2YWx1ZSBvciB0aGUgcmVhc29uXG4gIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuXG4gIFRlcm1pbm9sb2d5XG4gIC0tLS0tLS0tLS0tXG5cbiAgLSBgcHJvbWlzZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHdpdGggYSBgdGhlbmAgbWV0aG9kIHdob3NlIGJlaGF2aW9yIGNvbmZvcm1zIHRvIHRoaXMgc3BlY2lmaWNhdGlvbi5cbiAgLSBgdGhlbmFibGVgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB0aGF0IGRlZmluZXMgYSBgdGhlbmAgbWV0aG9kLlxuICAtIGB2YWx1ZWAgaXMgYW55IGxlZ2FsIEphdmFTY3JpcHQgdmFsdWUgKGluY2x1ZGluZyB1bmRlZmluZWQsIGEgdGhlbmFibGUsIG9yIGEgcHJvbWlzZSkuXG4gIC0gYGV4Y2VwdGlvbmAgaXMgYSB2YWx1ZSB0aGF0IGlzIHRocm93biB1c2luZyB0aGUgdGhyb3cgc3RhdGVtZW50LlxuICAtIGByZWFzb25gIGlzIGEgdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2h5IGEgcHJvbWlzZSB3YXMgcmVqZWN0ZWQuXG4gIC0gYHNldHRsZWRgIHRoZSBmaW5hbCByZXN0aW5nIHN0YXRlIG9mIGEgcHJvbWlzZSwgZnVsZmlsbGVkIG9yIHJlamVjdGVkLlxuXG4gIEEgcHJvbWlzZSBjYW4gYmUgaW4gb25lIG9mIHRocmVlIHN0YXRlczogcGVuZGluZywgZnVsZmlsbGVkLCBvciByZWplY3RlZC5cblxuICBQcm9taXNlcyB0aGF0IGFyZSBmdWxmaWxsZWQgaGF2ZSBhIGZ1bGZpbGxtZW50IHZhbHVlIGFuZCBhcmUgaW4gdGhlIGZ1bGZpbGxlZFxuICBzdGF0ZS4gIFByb21pc2VzIHRoYXQgYXJlIHJlamVjdGVkIGhhdmUgYSByZWplY3Rpb24gcmVhc29uIGFuZCBhcmUgaW4gdGhlXG4gIHJlamVjdGVkIHN0YXRlLiAgQSBmdWxmaWxsbWVudCB2YWx1ZSBpcyBuZXZlciBhIHRoZW5hYmxlLlxuXG4gIFByb21pc2VzIGNhbiBhbHNvIGJlIHNhaWQgdG8gKnJlc29sdmUqIGEgdmFsdWUuICBJZiB0aGlzIHZhbHVlIGlzIGFsc28gYVxuICBwcm9taXNlLCB0aGVuIHRoZSBvcmlnaW5hbCBwcm9taXNlJ3Mgc2V0dGxlZCBzdGF0ZSB3aWxsIG1hdGNoIHRoZSB2YWx1ZSdzXG4gIHNldHRsZWQgc3RhdGUuICBTbyBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IHJlamVjdHMgd2lsbFxuICBpdHNlbGYgcmVqZWN0LCBhbmQgYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aWxsXG4gIGl0c2VsZiBmdWxmaWxsLlxuXG5cbiAgQmFzaWMgVXNhZ2U6XG4gIC0tLS0tLS0tLS0tLVxuXG4gIGBgYGpzXG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgLy8gb24gc3VjY2Vzc1xuICAgIHJlc29sdmUodmFsdWUpO1xuXG4gICAgLy8gb24gZmFpbHVyZVxuICAgIHJlamVjdChyZWFzb24pO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAvLyBvbiBmdWxmaWxsbWVudFxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyBvbiByZWplY3Rpb25cbiAgfSk7XG4gIGBgYFxuXG4gIEFkdmFuY2VkIFVzYWdlOlxuICAtLS0tLS0tLS0tLS0tLS1cblxuICBQcm9taXNlcyBzaGluZSB3aGVuIGFic3RyYWN0aW5nIGF3YXkgYXN5bmNocm9ub3VzIGludGVyYWN0aW9ucyBzdWNoIGFzXG4gIGBYTUxIdHRwUmVxdWVzdGBzLlxuXG4gIGBgYGpzXG4gIGZ1bmN0aW9uIGdldEpTT04odXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGhhbmRsZXI7XG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICB4aHIuc2VuZCgpO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSB0aGlzLkRPTkUpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZ2V0SlNPTjogYCcgKyB1cmwgKyAnYCBmYWlsZWQgd2l0aCBzdGF0dXM6IFsnICsgdGhpcy5zdGF0dXMgKyAnXScpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXRKU09OKCcvcG9zdHMuanNvbicpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgIC8vIG9uIHJlamVjdGlvblxuICB9KTtcbiAgYGBgXG5cbiAgVW5saWtlIGNhbGxiYWNrcywgcHJvbWlzZXMgYXJlIGdyZWF0IGNvbXBvc2FibGUgcHJpbWl0aXZlcy5cblxuICBgYGBqc1xuICBQcm9taXNlLmFsbChbXG4gICAgZ2V0SlNPTignL3Bvc3RzJyksXG4gICAgZ2V0SlNPTignL2NvbW1lbnRzJylcbiAgXSkudGhlbihmdW5jdGlvbih2YWx1ZXMpe1xuICAgIHZhbHVlc1swXSAvLyA9PiBwb3N0c0pTT05cbiAgICB2YWx1ZXNbMV0gLy8gPT4gY29tbWVudHNKU09OXG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9KTtcbiAgYGBgXG5cbiAgQGNsYXNzIFByb21pc2VcbiAgQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZXJcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAY29uc3RydWN0b3JcbiovXG5cbnZhciBQcm9taXNlJDEgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFByb21pc2UocmVzb2x2ZXIpIHtcbiAgICB0aGlzW1BST01JU0VfSURdID0gbmV4dElkKCk7XG4gICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fc3Vic2NyaWJlcnMgPSBbXTtcblxuICAgIGlmIChub29wICE9PSByZXNvbHZlcikge1xuICAgICAgdHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nICYmIG5lZWRzUmVzb2x2ZXIoKTtcbiAgICAgIHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlID8gaW5pdGlhbGl6ZVByb21pc2UodGhpcywgcmVzb2x2ZXIpIDogbmVlZHNOZXcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgVGhlIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsXG4gIHdoaWNoIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlXG4gIHJlYXNvbiB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cbiAgIGBgYGpzXG4gIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbih1c2VyKXtcbiAgICAvLyB1c2VyIGlzIGF2YWlsYWJsZVxuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHVzZXIgaXMgdW5hdmFpbGFibGUsIGFuZCB5b3UgYXJlIGdpdmVuIHRoZSByZWFzb24gd2h5XG4gIH0pO1xuICBgYGBcbiAgIENoYWluaW5nXG4gIC0tLS0tLS0tXG4gICBUaGUgcmV0dXJuIHZhbHVlIG9mIGB0aGVuYCBpcyBpdHNlbGYgYSBwcm9taXNlLiAgVGhpcyBzZWNvbmQsICdkb3duc3RyZWFtJ1xuICBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZmlyc3QgcHJvbWlzZSdzIGZ1bGZpbGxtZW50XG4gIG9yIHJlamVjdGlvbiBoYW5kbGVyLCBvciByZWplY3RlZCBpZiB0aGUgaGFuZGxlciB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuICAgYGBganNcbiAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgcmV0dXJuIHVzZXIubmFtZTtcbiAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHJldHVybiAnZGVmYXVsdCBuYW1lJztcbiAgfSkudGhlbihmdW5jdGlvbiAodXNlck5hbWUpIHtcbiAgICAvLyBJZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHVzZXJOYW1lYCB3aWxsIGJlIHRoZSB1c2VyJ3MgbmFtZSwgb3RoZXJ3aXNlIGl0XG4gICAgLy8gd2lsbCBiZSBgJ2RlZmF1bHQgbmFtZSdgXG4gIH0pO1xuICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScpO1xuICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jyk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gbmV2ZXIgcmVhY2hlZFxuICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgLy8gaWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGByZWFzb25gIHdpbGwgYmUgJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jy5cbiAgICAvLyBJZiBgZmluZFVzZXJgIHJlamVjdGVkLCBgcmVhc29uYCB3aWxsIGJlICdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jy5cbiAgfSk7XG4gIGBgYFxuICBJZiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIGRvZXMgbm90IHNwZWNpZnkgYSByZWplY3Rpb24gaGFuZGxlciwgcmVqZWN0aW9uIHJlYXNvbnMgd2lsbCBiZSBwcm9wYWdhdGVkIGZ1cnRoZXIgZG93bnN0cmVhbS5cbiAgIGBgYGpzXG4gIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgIHRocm93IG5ldyBQZWRhZ29naWNhbEV4Y2VwdGlvbignVXBzdHJlYW0gZXJyb3InKTtcbiAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAvLyBuZXZlciByZWFjaGVkXG4gIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gbmV2ZXIgcmVhY2hlZFxuICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgLy8gVGhlIGBQZWRnYWdvY2lhbEV4Y2VwdGlvbmAgaXMgcHJvcGFnYXRlZCBhbGwgdGhlIHdheSBkb3duIHRvIGhlcmVcbiAgfSk7XG4gIGBgYFxuICAgQXNzaW1pbGF0aW9uXG4gIC0tLS0tLS0tLS0tLVxuICAgU29tZXRpbWVzIHRoZSB2YWx1ZSB5b3Ugd2FudCB0byBwcm9wYWdhdGUgdG8gYSBkb3duc3RyZWFtIHByb21pc2UgY2FuIG9ubHkgYmVcbiAgcmV0cmlldmVkIGFzeW5jaHJvbm91c2x5LiBUaGlzIGNhbiBiZSBhY2hpZXZlZCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIHRoZVxuICBmdWxmaWxsbWVudCBvciByZWplY3Rpb24gaGFuZGxlci4gVGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIHRoZW4gYmUgcGVuZGluZ1xuICB1bnRpbCB0aGUgcmV0dXJuZWQgcHJvbWlzZSBpcyBzZXR0bGVkLiBUaGlzIGlzIGNhbGxlZCAqYXNzaW1pbGF0aW9uKi5cbiAgIGBgYGpzXG4gIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAvLyBUaGUgdXNlcidzIGNvbW1lbnRzIGFyZSBub3cgYXZhaWxhYmxlXG4gIH0pO1xuICBgYGBcbiAgIElmIHRoZSBhc3NpbWxpYXRlZCBwcm9taXNlIHJlamVjdHMsIHRoZW4gdGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIGFsc28gcmVqZWN0LlxuICAgYGBganNcbiAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xuICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgZnVsZmlsbHMsIHdlJ2xsIGhhdmUgdGhlIHZhbHVlIGhlcmVcbiAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgcmVqZWN0cywgd2UnbGwgaGF2ZSB0aGUgcmVhc29uIGhlcmVcbiAgfSk7XG4gIGBgYFxuICAgU2ltcGxlIEV4YW1wbGVcbiAgLS0tLS0tLS0tLS0tLS1cbiAgIFN5bmNocm9ub3VzIEV4YW1wbGVcbiAgIGBgYGphdmFzY3JpcHRcbiAgbGV0IHJlc3VsdDtcbiAgIHRyeSB7XG4gICAgcmVzdWx0ID0gZmluZFJlc3VsdCgpO1xuICAgIC8vIHN1Y2Nlc3NcbiAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAvLyBmYWlsdXJlXG4gIH1cbiAgYGBgXG4gICBFcnJiYWNrIEV4YW1wbGVcbiAgIGBgYGpzXG4gIGZpbmRSZXN1bHQoZnVuY3Rpb24ocmVzdWx0LCBlcnIpe1xuICAgIGlmIChlcnIpIHtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH1cbiAgfSk7XG4gIGBgYFxuICAgUHJvbWlzZSBFeGFtcGxlO1xuICAgYGBgamF2YXNjcmlwdFxuICBmaW5kUmVzdWx0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgIC8vIHN1Y2Nlc3NcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyBmYWlsdXJlXG4gIH0pO1xuICBgYGBcbiAgIEFkdmFuY2VkIEV4YW1wbGVcbiAgLS0tLS0tLS0tLS0tLS1cbiAgIFN5bmNocm9ub3VzIEV4YW1wbGVcbiAgIGBgYGphdmFzY3JpcHRcbiAgbGV0IGF1dGhvciwgYm9va3M7XG4gICB0cnkge1xuICAgIGF1dGhvciA9IGZpbmRBdXRob3IoKTtcbiAgICBib29rcyAgPSBmaW5kQm9va3NCeUF1dGhvcihhdXRob3IpO1xuICAgIC8vIHN1Y2Nlc3NcbiAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAvLyBmYWlsdXJlXG4gIH1cbiAgYGBgXG4gICBFcnJiYWNrIEV4YW1wbGVcbiAgIGBgYGpzXG4gICBmdW5jdGlvbiBmb3VuZEJvb2tzKGJvb2tzKSB7XG4gICB9XG4gICBmdW5jdGlvbiBmYWlsdXJlKHJlYXNvbikge1xuICAgfVxuICAgZmluZEF1dGhvcihmdW5jdGlvbihhdXRob3IsIGVycil7XG4gICAgaWYgKGVycikge1xuICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICBmaW5kQm9vb2tzQnlBdXRob3IoYXV0aG9yLCBmdW5jdGlvbihib29rcywgZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBmb3VuZEJvb2tzKGJvb2tzKTtcbiAgICAgICAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgICAgICAgIGZhaWx1cmUocmVhc29uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICB9XG4gICAgICAvLyBzdWNjZXNzXG4gICAgfVxuICB9KTtcbiAgYGBgXG4gICBQcm9taXNlIEV4YW1wbGU7XG4gICBgYGBqYXZhc2NyaXB0XG4gIGZpbmRBdXRob3IoKS5cbiAgICB0aGVuKGZpbmRCb29rc0J5QXV0aG9yKS5cbiAgICB0aGVuKGZ1bmN0aW9uKGJvb2tzKXtcbiAgICAgIC8vIGZvdW5kIGJvb2tzXG4gIH0pLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgfSk7XG4gIGBgYFxuICAgQG1ldGhvZCB0aGVuXG4gIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsZmlsbGVkXG4gIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0ZWRcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuXG4gIC8qKlxuICBgY2F0Y2hgIGlzIHNpbXBseSBzdWdhciBmb3IgYHRoZW4odW5kZWZpbmVkLCBvblJlamVjdGlvbilgIHdoaWNoIG1ha2VzIGl0IHRoZSBzYW1lXG4gIGFzIHRoZSBjYXRjaCBibG9jayBvZiBhIHRyeS9jYXRjaCBzdGF0ZW1lbnQuXG4gIGBgYGpzXG4gIGZ1bmN0aW9uIGZpbmRBdXRob3IoKXtcbiAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZG4ndCBmaW5kIHRoYXQgYXV0aG9yJyk7XG4gIH1cbiAgLy8gc3luY2hyb25vdXNcbiAgdHJ5IHtcbiAgZmluZEF1dGhvcigpO1xuICB9IGNhdGNoKHJlYXNvbikge1xuICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICB9XG4gIC8vIGFzeW5jIHdpdGggcHJvbWlzZXNcbiAgZmluZEF1dGhvcigpLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gIH0pO1xuICBgYGBcbiAgQG1ldGhvZCBjYXRjaFxuICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGlvblxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9XG4gICovXG5cblxuICBQcm9taXNlLnByb3RvdHlwZS5jYXRjaCA9IGZ1bmN0aW9uIF9jYXRjaChvblJlamVjdGlvbikge1xuICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3Rpb24pO1xuICB9O1xuXG4gIC8qKlxuICAgIGBmaW5hbGx5YCB3aWxsIGJlIGludm9rZWQgcmVnYXJkbGVzcyBvZiB0aGUgcHJvbWlzZSdzIGZhdGUganVzdCBhcyBuYXRpdmVcbiAgICB0cnkvY2F0Y2gvZmluYWxseSBiZWhhdmVzXG4gIFxuICAgIFN5bmNocm9ub3VzIGV4YW1wbGU6XG4gIFxuICAgIGBgYGpzXG4gICAgZmluZEF1dGhvcigpIHtcbiAgICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBBdXRob3IoKTtcbiAgICB9XG4gIFxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZmluZEF1dGhvcigpOyAvLyBzdWNjZWVkIG9yIGZhaWxcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICByZXR1cm4gZmluZE90aGVyQXV0aGVyKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIC8vIGFsd2F5cyBydW5zXG4gICAgICAvLyBkb2Vzbid0IGFmZmVjdCB0aGUgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIGBgYFxuICBcbiAgICBBc3luY2hyb25vdXMgZXhhbXBsZTpcbiAgXG4gICAgYGBganNcbiAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIHJldHVybiBmaW5kT3RoZXJBdXRoZXIoKTtcbiAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XG4gICAgICAvLyBhdXRob3Igd2FzIGVpdGhlciBmb3VuZCwgb3Igbm90XG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEBtZXRob2QgZmluYWxseVxuICAgIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgQHJldHVybiB7UHJvbWlzZX1cbiAgKi9cblxuXG4gIFByb21pc2UucHJvdG90eXBlLmZpbmFsbHkgPSBmdW5jdGlvbiBfZmluYWxseShjYWxsYmFjaykge1xuICAgIHZhciBwcm9taXNlID0gdGhpcztcbiAgICB2YXIgY29uc3RydWN0b3IgPSBwcm9taXNlLmNvbnN0cnVjdG9yO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aHJvdyByZWFzb247XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2UudGhlbihjYWxsYmFjaywgY2FsbGJhY2spO1xuICB9O1xuXG4gIHJldHVybiBQcm9taXNlO1xufSgpO1xuXG5Qcm9taXNlJDEucHJvdG90eXBlLnRoZW4gPSB0aGVuO1xuUHJvbWlzZSQxLmFsbCA9IGFsbDtcblByb21pc2UkMS5yYWNlID0gcmFjZTtcblByb21pc2UkMS5yZXNvbHZlID0gcmVzb2x2ZSQxO1xuUHJvbWlzZSQxLnJlamVjdCA9IHJlamVjdCQxO1xuUHJvbWlzZSQxLl9zZXRTY2hlZHVsZXIgPSBzZXRTY2hlZHVsZXI7XG5Qcm9taXNlJDEuX3NldEFzYXAgPSBzZXRBc2FwO1xuUHJvbWlzZSQxLl9hc2FwID0gYXNhcDtcblxuLypnbG9iYWwgc2VsZiovXG5mdW5jdGlvbiBwb2x5ZmlsbCgpIHtcbiAgdmFyIGxvY2FsID0gdm9pZCAwO1xuXG4gIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIGxvY2FsID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgIGxvY2FsID0gc2VsZjtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgbG9jYWwgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncG9seWZpbGwgZmFpbGVkIGJlY2F1c2UgZ2xvYmFsIG9iamVjdCBpcyB1bmF2YWlsYWJsZSBpbiB0aGlzIGVudmlyb25tZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIFAgPSBsb2NhbC5Qcm9taXNlO1xuXG4gIGlmIChQKSB7XG4gICAgdmFyIHByb21pc2VUb1N0cmluZyA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIHByb21pc2VUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChQLnJlc29sdmUoKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gc2lsZW50bHkgaWdub3JlZFxuICAgIH1cblxuICAgIGlmIChwcm9taXNlVG9TdHJpbmcgPT09ICdbb2JqZWN0IFByb21pc2VdJyAmJiAhUC5jYXN0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgbG9jYWwuUHJvbWlzZSA9IFByb21pc2UkMTtcbn1cblxuLy8gU3RyYW5nZSBjb21wYXQuLlxuUHJvbWlzZSQxLnBvbHlmaWxsID0gcG9seWZpbGw7XG5Qcm9taXNlJDEuUHJvbWlzZSA9IFByb21pc2UkMTtcblxucmV0dXJuIFByb21pc2UkMTtcblxufSkpKTtcblxuXG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVzNi1wcm9taXNlLm1hcFxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4iLCJcbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb3JFYWNoIChvYmosIGZuLCBjdHgpIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChmbikgIT09ICdbb2JqZWN0IEZ1bmN0aW9uXScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIHZhciBsID0gb2JqLmxlbmd0aDtcbiAgICBpZiAobCA9PT0gK2wpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGZuLmNhbGwoY3R4LCBvYmpbaV0sIGksIG9iaik7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBrIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKG9iaiwgaykpIHtcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGN0eCwgb2JqW2tdLCBrLCBvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuIiwidmFyIHdpbjtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICB3aW4gPSBzZWxmO1xufSBlbHNlIHtcbiAgICB3aW4gPSB7fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3aW47XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdHlwZXMgPSBbXG4gIHJlcXVpcmUoJy4vbmV4dFRpY2snKSxcbiAgcmVxdWlyZSgnLi9xdWV1ZU1pY3JvdGFzaycpLFxuICByZXF1aXJlKCcuL211dGF0aW9uLmpzJyksXG4gIHJlcXVpcmUoJy4vbWVzc2FnZUNoYW5uZWwnKSxcbiAgcmVxdWlyZSgnLi9zdGF0ZUNoYW5nZScpLFxuICByZXF1aXJlKCcuL3RpbWVvdXQnKVxuXTtcbnZhciBkcmFpbmluZztcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xudmFyIHF1ZXVlID0gW107XG52YXIgc2NoZWR1bGVkID0gZmFsc2U7XG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBkcmFpbmluZyA9IGZhbHNlO1xuICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcXVldWVJbmRleCA9IC0xO1xuICB9XG4gIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICBuZXh0VGljaygpO1xuICB9XG59XG5cbi8vbmFtZWQgbmV4dFRpY2sgZm9yIGxlc3MgY29uZnVzaW5nIHN0YWNrIHRyYWNlc1xuZnVuY3Rpb24gbmV4dFRpY2soKSB7XG4gIGlmIChkcmFpbmluZykge1xuICAgIHJldHVybjtcbiAgfVxuICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgZHJhaW5pbmcgPSB0cnVlO1xuICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgd2hpbGUgKGxlbikge1xuICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgIHF1ZXVlID0gW107XG4gICAgd2hpbGUgKGN1cnJlbnRRdWV1ZSAmJiArK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICB9XG4gICAgcXVldWVJbmRleCA9IC0xO1xuICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgfVxuICBjdXJyZW50UXVldWUgPSBudWxsO1xuICBxdWV1ZUluZGV4ID0gLTE7XG4gIGRyYWluaW5nID0gZmFsc2U7XG4gIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cbnZhciBzY2hlZHVsZURyYWluO1xudmFyIGkgPSAtMTtcbnZhciBsZW4gPSB0eXBlcy5sZW5ndGg7XG53aGlsZSAoKytpIDwgbGVuKSB7XG4gIGlmICh0eXBlc1tpXSAmJiB0eXBlc1tpXS50ZXN0ICYmIHR5cGVzW2ldLnRlc3QoKSkge1xuICAgIHNjaGVkdWxlRHJhaW4gPSB0eXBlc1tpXS5pbnN0YWxsKG5leHRUaWNrKTtcbiAgICBicmVhaztcbiAgfVxufVxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gIHRoaXMuZnVuID0gZnVuO1xuICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBmdW4gPSB0aGlzLmZ1bjtcbiAgdmFyIGFycmF5ID0gdGhpcy5hcnJheTtcbiAgc3dpdGNoIChhcnJheS5sZW5ndGgpIHtcbiAgY2FzZSAwOlxuICAgIHJldHVybiBmdW4oKTtcbiAgY2FzZSAxOlxuICAgIHJldHVybiBmdW4oYXJyYXlbMF0pO1xuICBjYXNlIDI6XG4gICAgcmV0dXJuIGZ1bihhcnJheVswXSwgYXJyYXlbMV0pO1xuICBjYXNlIDM6XG4gICAgcmV0dXJuIGZ1bihhcnJheVswXSwgYXJyYXlbMV0sIGFycmF5WzJdKTtcbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gZnVuLmFwcGx5KG51bGwsIGFycmF5KTtcbiAgfVxuXG59O1xubW9kdWxlLmV4cG9ydHMgPSBpbW1lZGlhdGU7XG5mdW5jdGlvbiBpbW1lZGlhdGUodGFzaykge1xuICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gIH1cbiAgcXVldWUucHVzaChuZXcgSXRlbSh0YXNrLCBhcmdzKSk7XG4gIGlmICghc2NoZWR1bGVkICYmICFkcmFpbmluZykge1xuICAgIHNjaGVkdWxlZCA9IHRydWU7XG4gICAgc2NoZWR1bGVEcmFpbigpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMudGVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAvLyB3ZSBjYW4gb25seSBnZXQgaGVyZSBpbiBJRTEwXG4gICAgLy8gd2hpY2ggZG9lc24ndCBoYW5kZWwgcG9zdE1lc3NhZ2Ugd2VsbFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG59O1xuXG5leHBvcnRzLmluc3RhbGwgPSBmdW5jdGlvbiAoZnVuYykge1xuICB2YXIgY2hhbm5lbCA9IG5ldyBnbG9iYWwuTWVzc2FnZUNoYW5uZWwoKTtcbiAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vYmFzZWQgb2ZmIHJzdnAgaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qc1xuLy9saWNlbnNlIGh0dHBzOi8vZ2l0aHViLmNvbS90aWxkZWlvL3JzdnAuanMvYmxvYi9tYXN0ZXIvTElDRU5TRVxuLy9odHRwczovL2dpdGh1Yi5jb20vdGlsZGVpby9yc3ZwLmpzL2Jsb2IvbWFzdGVyL2xpYi9yc3ZwL2FzYXAuanNcblxudmFyIE11dGF0aW9uID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG5cbmV4cG9ydHMudGVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE11dGF0aW9uO1xufTtcblxuZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24gKGhhbmRsZSkge1xuICB2YXIgY2FsbGVkID0gMDtcbiAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uKGhhbmRsZSk7XG4gIHZhciBlbGVtZW50ID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCB7XG4gICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBlbGVtZW50LmRhdGEgPSAoY2FsbGVkID0gKytjYWxsZWQgJSAyKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHlwZW9mIGdsb2JhbC5xdWV1ZU1pY3JvdGFzayA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbmV4cG9ydHMuaW5zdGFsbCA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZ2xvYmFsLnF1ZXVlTWljcm90YXNrKGZ1bmMpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ2RvY3VtZW50JyBpbiBnbG9iYWwgJiYgJ29ucmVhZHlzdGF0ZWNoYW5nZScgaW4gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xufTtcblxuZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24gKGhhbmRsZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICB2YXIgc2NyaXB0RWwgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0RWwub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaGFuZGxlKCk7XG5cbiAgICAgIHNjcmlwdEVsLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICBzY3JpcHRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdEVsKTtcbiAgICAgIHNjcmlwdEVsID0gbnVsbDtcbiAgICB9O1xuICAgIGdsb2JhbC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2NyaXB0RWwpO1xuXG4gICAgcmV0dXJuIGhhbmRsZTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydHMuaW5zdGFsbCA9IGZ1bmN0aW9uICh0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dCh0LCAwKTtcbiAgfTtcbn07IiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgaWYgKHN1cGVyQ3Rvcikge1xuICAgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICAgIH1cbiAgfVxufVxuIiwidmFyIGNvbnRhaW5lcnMgPSBbXTsgLy8gd2lsbCBzdG9yZSBjb250YWluZXIgSFRNTEVsZW1lbnQgcmVmZXJlbmNlc1xudmFyIHN0eWxlRWxlbWVudHMgPSBbXTsgLy8gd2lsbCBzdG9yZSB7cHJlcGVuZDogSFRNTEVsZW1lbnQsIGFwcGVuZDogSFRNTEVsZW1lbnR9XG5cbnZhciB1c2FnZSA9ICdpbnNlcnQtY3NzOiBZb3UgbmVlZCB0byBwcm92aWRlIGEgQ1NTIHN0cmluZy4gVXNhZ2U6IGluc2VydENzcyhjc3NTdHJpbmdbLCBvcHRpb25zXSkuJztcblxuZnVuY3Rpb24gaW5zZXJ0Q3NzKGNzcywgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYgKGNzcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih1c2FnZSk7XG4gICAgfVxuXG4gICAgdmFyIHBvc2l0aW9uID0gb3B0aW9ucy5wcmVwZW5kID09PSB0cnVlID8gJ3ByZXBlbmQnIDogJ2FwcGVuZCc7XG4gICAgdmFyIGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNvbnRhaW5lciA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICB2YXIgY29udGFpbmVySWQgPSBjb250YWluZXJzLmluZGV4T2YoY29udGFpbmVyKTtcblxuICAgIC8vIGZpcnN0IHRpbWUgd2Ugc2VlIHRoaXMgY29udGFpbmVyLCBjcmVhdGUgdGhlIG5lY2Vzc2FyeSBlbnRyaWVzXG4gICAgaWYgKGNvbnRhaW5lcklkID09PSAtMSkge1xuICAgICAgICBjb250YWluZXJJZCA9IGNvbnRhaW5lcnMucHVzaChjb250YWluZXIpIC0gMTtcbiAgICAgICAgc3R5bGVFbGVtZW50c1tjb250YWluZXJJZF0gPSB7fTtcbiAgICB9XG5cbiAgICAvLyB0cnkgdG8gZ2V0IHRoZSBjb3JyZXBvbmRpbmcgY29udGFpbmVyICsgcG9zaXRpb24gc3R5bGVFbGVtZW50LCBjcmVhdGUgaXQgb3RoZXJ3aXNlXG4gICAgdmFyIHN0eWxlRWxlbWVudDtcblxuICAgIGlmIChzdHlsZUVsZW1lbnRzW2NvbnRhaW5lcklkXSAhPT0gdW5kZWZpbmVkICYmIHN0eWxlRWxlbWVudHNbY29udGFpbmVySWRdW3Bvc2l0aW9uXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0eWxlRWxlbWVudCA9IHN0eWxlRWxlbWVudHNbY29udGFpbmVySWRdW3Bvc2l0aW9uXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZUVsZW1lbnQgPSBzdHlsZUVsZW1lbnRzW2NvbnRhaW5lcklkXVtwb3NpdGlvbl0gPSBjcmVhdGVTdHlsZUVsZW1lbnQoKTtcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09ICdwcmVwZW5kJykge1xuICAgICAgICAgICAgY29udGFpbmVyLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGNvbnRhaW5lci5jaGlsZE5vZGVzWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc3RyaXAgcG90ZW50aWFsIFVURi04IEJPTSBpZiBjc3Mgd2FzIHJlYWQgZnJvbSBhIGZpbGVcbiAgICBpZiAoY3NzLmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikgeyBjc3MgPSBjc3Muc3Vic3RyKDEsIGNzcy5sZW5ndGgpOyB9XG5cbiAgICAvLyBhY3R1YWxseSBhZGQgdGhlIHN0eWxlc2hlZXRcbiAgICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICAgICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCArPSBjc3NcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZUVsZW1lbnQudGV4dENvbnRlbnQgKz0gY3NzO1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZUVsZW1lbnQ7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQoKSB7XG4gICAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgIHJldHVybiBzdHlsZUVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0Q3NzO1xubW9kdWxlLmV4cG9ydHMuaW5zZXJ0Q3NzID0gaW5zZXJ0Q3NzO1xuIiwiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKCg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgaWYgKG1zID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtcyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHJldHVybiBwbHVyYWwobXMsIGQsICdkYXknKSB8fFxuICAgIHBsdXJhbChtcywgaCwgJ2hvdXInKSB8fFxuICAgIHBsdXJhbChtcywgbSwgJ21pbnV0ZScpIHx8XG4gICAgcGx1cmFsKG1zLCBzLCAnc2Vjb25kJykgfHxcbiAgICBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbiwgbmFtZSkge1xuICBpZiAobXMgPCBuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChtcyA8IG4gKiAxLjUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZTtcbiAgfVxuICByZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5c1NoaW07XG5pZiAoIU9iamVjdC5rZXlzKSB7XG5cdC8vIG1vZGlmaWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltXG5cdHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXHR2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXHR2YXIgaXNBcmdzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGdsb2JhbC1yZXF1aXJlXG5cdHZhciBpc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXHR2YXIgaGFzRG9udEVudW1CdWcgPSAhaXNFbnVtZXJhYmxlLmNhbGwoeyB0b1N0cmluZzogbnVsbCB9LCAndG9TdHJpbmcnKTtcblx0dmFyIGhhc1Byb3RvRW51bUJ1ZyA9IGlzRW51bWVyYWJsZS5jYWxsKGZ1bmN0aW9uICgpIHt9LCAncHJvdG90eXBlJyk7XG5cdHZhciBkb250RW51bXMgPSBbXG5cdFx0J3RvU3RyaW5nJyxcblx0XHQndG9Mb2NhbGVTdHJpbmcnLFxuXHRcdCd2YWx1ZU9mJyxcblx0XHQnaGFzT3duUHJvcGVydHknLFxuXHRcdCdpc1Byb3RvdHlwZU9mJyxcblx0XHQncHJvcGVydHlJc0VudW1lcmFibGUnLFxuXHRcdCdjb25zdHJ1Y3Rvcidcblx0XTtcblx0dmFyIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlID0gZnVuY3Rpb24gKG8pIHtcblx0XHR2YXIgY3RvciA9IG8uY29uc3RydWN0b3I7XG5cdFx0cmV0dXJuIGN0b3IgJiYgY3Rvci5wcm90b3R5cGUgPT09IG87XG5cdH07XG5cdHZhciBleGNsdWRlZEtleXMgPSB7XG5cdFx0JGFwcGxpY2F0aW9uQ2FjaGU6IHRydWUsXG5cdFx0JGNvbnNvbGU6IHRydWUsXG5cdFx0JGV4dGVybmFsOiB0cnVlLFxuXHRcdCRmcmFtZTogdHJ1ZSxcblx0XHQkZnJhbWVFbGVtZW50OiB0cnVlLFxuXHRcdCRmcmFtZXM6IHRydWUsXG5cdFx0JGlubmVySGVpZ2h0OiB0cnVlLFxuXHRcdCRpbm5lcldpZHRoOiB0cnVlLFxuXHRcdCRvbm1vemZ1bGxzY3JlZW5jaGFuZ2U6IHRydWUsXG5cdFx0JG9ubW96ZnVsbHNjcmVlbmVycm9yOiB0cnVlLFxuXHRcdCRvdXRlckhlaWdodDogdHJ1ZSxcblx0XHQkb3V0ZXJXaWR0aDogdHJ1ZSxcblx0XHQkcGFnZVhPZmZzZXQ6IHRydWUsXG5cdFx0JHBhZ2VZT2Zmc2V0OiB0cnVlLFxuXHRcdCRwYXJlbnQ6IHRydWUsXG5cdFx0JHNjcm9sbExlZnQ6IHRydWUsXG5cdFx0JHNjcm9sbFRvcDogdHJ1ZSxcblx0XHQkc2Nyb2xsWDogdHJ1ZSxcblx0XHQkc2Nyb2xsWTogdHJ1ZSxcblx0XHQkc2VsZjogdHJ1ZSxcblx0XHQkd2Via2l0SW5kZXhlZERCOiB0cnVlLFxuXHRcdCR3ZWJraXRTdG9yYWdlSW5mbzogdHJ1ZSxcblx0XHQkd2luZG93OiB0cnVlXG5cdH07XG5cdHZhciBoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWcgPSAoZnVuY3Rpb24gKCkge1xuXHRcdC8qIGdsb2JhbCB3aW5kb3cgKi9cblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICh2YXIgayBpbiB3aW5kb3cpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICghZXhjbHVkZWRLZXlzWyckJyArIGtdICYmIGhhcy5jYWxsKHdpbmRvdywgaykgJiYgd2luZG93W2tdICE9PSBudWxsICYmIHR5cGVvZiB3aW5kb3dba10gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKHdpbmRvd1trXSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0oKSk7XG5cdHZhciBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZUlmTm90QnVnZ3kgPSBmdW5jdGlvbiAobykge1xuXHRcdC8qIGdsb2JhbCB3aW5kb3cgKi9cblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc0F1dG9tYXRpb25FcXVhbGl0eUJ1Zykge1xuXHRcdFx0cmV0dXJuIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKG8pO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKG8pO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH07XG5cblx0a2V5c1NoaW0gPSBmdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuXHRcdHZhciBpc09iamVjdCA9IG9iamVjdCAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jztcblx0XHR2YXIgaXNGdW5jdGlvbiA9IHRvU3RyLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblx0XHR2YXIgaXNBcmd1bWVudHMgPSBpc0FyZ3Mob2JqZWN0KTtcblx0XHR2YXIgaXNTdHJpbmcgPSBpc09iamVjdCAmJiB0b1N0ci5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuXHRcdHZhciB0aGVLZXlzID0gW107XG5cblx0XHRpZiAoIWlzT2JqZWN0ICYmICFpc0Z1bmN0aW9uICYmICFpc0FyZ3VtZW50cykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmtleXMgY2FsbGVkIG9uIGEgbm9uLW9iamVjdCcpO1xuXHRcdH1cblxuXHRcdHZhciBza2lwUHJvdG8gPSBoYXNQcm90b0VudW1CdWcgJiYgaXNGdW5jdGlvbjtcblx0XHRpZiAoaXNTdHJpbmcgJiYgb2JqZWN0Lmxlbmd0aCA+IDAgJiYgIWhhcy5jYWxsKG9iamVjdCwgMCkpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcoaSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChpc0FyZ3VtZW50cyAmJiBvYmplY3QubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBvYmplY3QubGVuZ3RoOyArK2opIHtcblx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhqKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAodmFyIG5hbWUgaW4gb2JqZWN0KSB7XG5cdFx0XHRcdGlmICghKHNraXBQcm90byAmJiBuYW1lID09PSAncHJvdG90eXBlJykgJiYgaGFzLmNhbGwob2JqZWN0LCBuYW1lKSkge1xuXHRcdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcobmFtZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGhhc0RvbnRFbnVtQnVnKSB7XG5cdFx0XHR2YXIgc2tpcENvbnN0cnVjdG9yID0gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5KG9iamVjdCk7XG5cblx0XHRcdGZvciAodmFyIGsgPSAwOyBrIDwgZG9udEVudW1zLmxlbmd0aDsgKytrKSB7XG5cdFx0XHRcdGlmICghKHNraXBDb25zdHJ1Y3RvciAmJiBkb250RW51bXNba10gPT09ICdjb25zdHJ1Y3RvcicpICYmIGhhcy5jYWxsKG9iamVjdCwgZG9udEVudW1zW2tdKSkge1xuXHRcdFx0XHRcdHRoZUtleXMucHVzaChkb250RW51bXNba10pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGVLZXlzO1xuXHR9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBrZXlzU2hpbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGlzQXJncyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKTtcblxudmFyIG9yaWdLZXlzID0gT2JqZWN0LmtleXM7XG52YXIga2V5c1NoaW0gPSBvcmlnS2V5cyA/IGZ1bmN0aW9uIGtleXMobykgeyByZXR1cm4gb3JpZ0tleXMobyk7IH0gOiByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbnZhciBvcmlnaW5hbEtleXMgPSBPYmplY3Qua2V5cztcblxua2V5c1NoaW0uc2hpbSA9IGZ1bmN0aW9uIHNoaW1PYmplY3RLZXlzKCkge1xuXHRpZiAoT2JqZWN0LmtleXMpIHtcblx0XHR2YXIga2V5c1dvcmtzV2l0aEFyZ3VtZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBTYWZhcmkgNS4wIGJ1Z1xuXHRcdFx0dmFyIGFyZ3MgPSBPYmplY3Qua2V5cyhhcmd1bWVudHMpO1xuXHRcdFx0cmV0dXJuIGFyZ3MgJiYgYXJncy5sZW5ndGggPT09IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0fSgxLCAyKSk7XG5cdFx0aWYgKCFrZXlzV29ya3NXaXRoQXJndW1lbnRzKSB7XG5cdFx0XHRPYmplY3Qua2V5cyA9IGZ1bmN0aW9uIGtleXMob2JqZWN0KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG5cdFx0XHRcdGlmIChpc0FyZ3Mob2JqZWN0KSkge1xuXHRcdFx0XHRcdHJldHVybiBvcmlnaW5hbEtleXMoc2xpY2UuY2FsbChvYmplY3QpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxLZXlzKG9iamVjdCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRPYmplY3Qua2V5cyA9IGtleXNTaGltO1xuXHR9XG5cdHJldHVybiBPYmplY3Qua2V5cyB8fCBrZXlzU2hpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5c1NoaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0dmFyIHN0ciA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHR2YXIgaXNBcmdzID0gc3RyID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcblx0aWYgKCFpc0FyZ3MpIHtcblx0XHRpc0FyZ3MgPSBzdHIgIT09ICdbb2JqZWN0IEFycmF5XScgJiZcblx0XHRcdHZhbHVlICE9PSBudWxsICYmXG5cdFx0XHR0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG5cdFx0XHR0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJyAmJlxuXHRcdFx0dmFsdWUubGVuZ3RoID49IDAgJiZcblx0XHRcdHRvU3RyLmNhbGwodmFsdWUuY2FsbGVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblx0fVxuXHRyZXR1cm4gaXNBcmdzO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyB3ZSBuZWVkIHRvIGV4cG9ydCB1c2luZyBjb21tb25qcyBmb3IgZWFzZSBvZiB1c2FnZSBpbiBhbGxcbi8vIEphdmFTY3JpcHQgZW52aXJvbm1lbnRzXG4vLyBXZSB0aGVyZWZvcmUgbmVlZCB0byBpbXBvcnQgaW4gY29tbW9uanMgdG9vLiBzZWU6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrL2lzc3Vlcy80MDM5XG5cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jb21tb25qcyAqL1xudmFyIHBsYWNlcyA9IHJlcXVpcmUoJy4vc3JjL3BsYWNlcycpO1xuXG52YXIgdmVyc2lvbiA9IHJlcXVpcmUoJy4vc3JjL3ZlcnNpb24nKTsgLy8gbXVzdCB1c2UgbW9kdWxlLmV4cG9ydHMgdG8gYmUgY29tbW9uSlMgY29tcGF0aWJsZVxuXG5cbm1vZHVsZS5leHBvcnRzID0gcGxhY2VzW1wiZGVmYXVsdFwiXTtcbm1vZHVsZS5leHBvcnRzLnZlcnNpb24gPSB2ZXJzaW9uW1wiZGVmYXVsdFwiXTtcbi8qIGVzbGludC1lbmFibGUgaW1wb3J0L25vLWNvbW1vbmpzICovXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgaWYgKGVudW1lcmFibGVPbmx5KSBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSk7IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHsgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTsgfSBlbHNlIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIGV4dHJhY3RQYXJhbXMgPSBmdW5jdGlvbiBleHRyYWN0UGFyYW1zKF9yZWYpIHtcbiAgdmFyIGhpdHNQZXJQYWdlID0gX3JlZi5oaXRzUGVyUGFnZSxcbiAgICAgIHBvc3Rjb2RlU2VhcmNoID0gX3JlZi5wb3N0Y29kZVNlYXJjaCxcbiAgICAgIGFyb3VuZExhdExuZyA9IF9yZWYuYXJvdW5kTGF0TG5nLFxuICAgICAgYXJvdW5kUmFkaXVzID0gX3JlZi5hcm91bmRSYWRpdXMsXG4gICAgICBhcm91bmRMYXRMbmdWaWFJUCA9IF9yZWYuYXJvdW5kTGF0TG5nVmlhSVAsXG4gICAgICBpbnNpZGVCb3VuZGluZ0JveCA9IF9yZWYuaW5zaWRlQm91bmRpbmdCb3gsXG4gICAgICBpbnNpZGVQb2x5Z29uID0gX3JlZi5pbnNpZGVQb2x5Z29uLFxuICAgICAgZ2V0UmFua2luZ0luZm8gPSBfcmVmLmdldFJhbmtpbmdJbmZvLFxuICAgICAgY291bnRyaWVzID0gX3JlZi5jb3VudHJpZXMsXG4gICAgICBsYW5ndWFnZSA9IF9yZWYubGFuZ3VhZ2UsXG4gICAgICB0eXBlID0gX3JlZi50eXBlO1xuICB2YXIgZXh0cmFjdGVkID0ge1xuICAgIGNvdW50cmllczogY291bnRyaWVzLFxuICAgIGhpdHNQZXJQYWdlOiBoaXRzUGVyUGFnZSB8fCA1LFxuICAgIGxhbmd1YWdlOiBsYW5ndWFnZSB8fCBuYXZpZ2F0b3IubGFuZ3VhZ2Uuc3BsaXQoJy0nKVswXSxcbiAgICB0eXBlOiB0eXBlXG4gIH07XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY291bnRyaWVzKSkge1xuICAgIGV4dHJhY3RlZC5jb3VudHJpZXMgPSBleHRyYWN0ZWQuY291bnRyaWVzLm1hcChmdW5jdGlvbiAoY291bnRyeSkge1xuICAgICAgcmV0dXJuIGNvdW50cnkudG9Mb3dlckNhc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZXh0cmFjdGVkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgIGV4dHJhY3RlZC5sYW5ndWFnZSA9IGV4dHJhY3RlZC5sYW5ndWFnZS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgaWYgKGFyb3VuZExhdExuZykge1xuICAgIGV4dHJhY3RlZC5hcm91bmRMYXRMbmcgPSBhcm91bmRMYXRMbmc7XG4gIH0gZWxzZSBpZiAoYXJvdW5kTGF0TG5nVmlhSVAgIT09IHVuZGVmaW5lZCkge1xuICAgIGV4dHJhY3RlZC5hcm91bmRMYXRMbmdWaWFJUCA9IGFyb3VuZExhdExuZ1ZpYUlQO1xuICB9XG5cbiAgaWYgKHBvc3Rjb2RlU2VhcmNoKSB7XG4gICAgZXh0cmFjdGVkLnJlc3RyaWN0U2VhcmNoYWJsZUF0dHJpYnV0ZXMgPSAncG9zdGNvZGUnO1xuICB9XG5cbiAgcmV0dXJuIF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgZXh0cmFjdGVkKSwge30sIHtcbiAgICBhcm91bmRSYWRpdXM6IGFyb3VuZFJhZGl1cyxcbiAgICBpbnNpZGVCb3VuZGluZ0JveDogaW5zaWRlQm91bmRpbmdCb3gsXG4gICAgaW5zaWRlUG9seWdvbjogaW5zaWRlUG9seWdvbixcbiAgICBnZXRSYW5raW5nSW5mbzogZ2V0UmFua2luZ0luZm9cbiAgfSk7XG59O1xuXG52YXIgZXh0cmFjdENvbnRyb2xzID0gZnVuY3Rpb24gZXh0cmFjdENvbnRyb2xzKF9yZWYyKSB7XG4gIHZhciBfcmVmMiR1c2VEZXZpY2VMb2NhdGkgPSBfcmVmMi51c2VEZXZpY2VMb2NhdGlvbixcbiAgICAgIHVzZURldmljZUxvY2F0aW9uID0gX3JlZjIkdXNlRGV2aWNlTG9jYXRpID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYyJHVzZURldmljZUxvY2F0aSxcbiAgICAgIF9yZWYyJGNvbXB1dGVRdWVyeVBhciA9IF9yZWYyLmNvbXB1dGVRdWVyeVBhcmFtcyxcbiAgICAgIGNvbXB1dGVRdWVyeVBhcmFtcyA9IF9yZWYyJGNvbXB1dGVRdWVyeVBhciA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH0gOiBfcmVmMiRjb21wdXRlUXVlcnlQYXIsXG4gICAgICBmb3JtYXRJbnB1dFZhbHVlID0gX3JlZjIuZm9ybWF0SW5wdXRWYWx1ZSxcbiAgICAgIF9yZWYyJG9uSGl0cyA9IF9yZWYyLm9uSGl0cyxcbiAgICAgIG9uSGl0cyA9IF9yZWYyJG9uSGl0cyA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKCkge30gOiBfcmVmMiRvbkhpdHMsXG4gICAgICBfcmVmMiRvbkVycm9yID0gX3JlZjIub25FcnJvcixcbiAgICAgIG9uRXJyb3IgPSBfcmVmMiRvbkVycm9yID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoZSkge1xuICAgIHRocm93IGU7XG4gIH0gOiBfcmVmMiRvbkVycm9yLFxuICAgICAgb25SYXRlTGltaXRSZWFjaGVkID0gX3JlZjIub25SYXRlTGltaXRSZWFjaGVkLFxuICAgICAgb25JbnZhbGlkQ3JlZGVudGlhbHMgPSBfcmVmMi5vbkludmFsaWRDcmVkZW50aWFscztcbiAgcmV0dXJuIHtcbiAgICB1c2VEZXZpY2VMb2NhdGlvbjogdXNlRGV2aWNlTG9jYXRpb24sXG4gICAgY29tcHV0ZVF1ZXJ5UGFyYW1zOiBjb21wdXRlUXVlcnlQYXJhbXMsXG4gICAgZm9ybWF0SW5wdXRWYWx1ZTogZm9ybWF0SW5wdXRWYWx1ZSxcbiAgICBvbkhpdHM6IG9uSGl0cyxcbiAgICBvbkVycm9yOiBvbkVycm9yLFxuICAgIG9uUmF0ZUxpbWl0UmVhY2hlZDogb25SYXRlTGltaXRSZWFjaGVkLFxuICAgIG9uSW52YWxpZENyZWRlbnRpYWxzOiBvbkludmFsaWRDcmVkZW50aWFsc1xuICB9O1xufTtcblxudmFyIHBhcmFtcyA9IHt9O1xudmFyIGNvbnRyb2xzID0ge307XG5cbnZhciBjb25maWd1cmUgPSBmdW5jdGlvbiBjb25maWd1cmUoY29uZmlndXJhdGlvbikge1xuICBwYXJhbXMgPSBleHRyYWN0UGFyYW1zKF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgcGFyYW1zKSwgY29uZmlndXJhdGlvbikpO1xuICBjb250cm9scyA9IGV4dHJhY3RDb250cm9scyhfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIGNvbnRyb2xzKSwgY29uZmlndXJhdGlvbikpO1xuICByZXR1cm4ge1xuICAgIHBhcmFtczogcGFyYW1zLFxuICAgIGNvbnRyb2xzOiBjb250cm9sc1xuICB9O1xufTtcblxudmFyIF9kZWZhdWx0ID0gY29uZmlndXJlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gY3JlYXRlQXV0b2NvbXBsZXRlRGF0YXNldDtcblxudmFyIF9jcmVhdGVBdXRvY29tcGxldGVTb3VyY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2NyZWF0ZUF1dG9jb21wbGV0ZVNvdXJjZVwiKSk7XG5cbnZhciBfZGVmYXVsdFRlbXBsYXRlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZGVmYXVsdFRlbXBsYXRlc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgaWYgKGVudW1lcmFibGVPbmx5KSBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSk7IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHsgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTsgfSBlbHNlIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gY3JlYXRlQXV0b2NvbXBsZXRlRGF0YXNldChvcHRpb25zKSB7XG4gIHZhciB0ZW1wbGF0ZXMgPSBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIF9kZWZhdWx0VGVtcGxhdGVzW1wiZGVmYXVsdFwiXSksIG9wdGlvbnMudGVtcGxhdGVzKTtcblxuICB2YXIgc291cmNlID0gKDAsIF9jcmVhdGVBdXRvY29tcGxldGVTb3VyY2VbXCJkZWZhdWx0XCJdKShfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIG9wdGlvbnMpLCB7fSwge1xuICAgIGZvcm1hdElucHV0VmFsdWU6IHRlbXBsYXRlcy52YWx1ZSxcbiAgICB0ZW1wbGF0ZXM6IHVuZGVmaW5lZFxuICB9KSk7XG4gIHJldHVybiB7XG4gICAgc291cmNlOiBzb3VyY2UsXG4gICAgdGVtcGxhdGVzOiB0ZW1wbGF0ZXMsXG4gICAgZGlzcGxheUtleTogJ3ZhbHVlJyxcbiAgICBuYW1lOiAncGxhY2VzJyxcbiAgICBjYWNoZTogZmFsc2VcbiAgfTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gY3JlYXRlQXV0b2NvbXBsZXRlU291cmNlO1xuXG52YXIgX2NvbmZpZ3VyZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vY29uZmlndXJlXCIpKTtcblxudmFyIF9mb3JtYXRIaXQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2Zvcm1hdEhpdFwiKSk7XG5cbnZhciBfdmVyc2lvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmVyc2lvblwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgaWYgKGVudW1lcmFibGVPbmx5KSBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSk7IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHsgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTsgfSBlbHNlIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gY3JlYXRlQXV0b2NvbXBsZXRlU291cmNlKF9yZWYpIHtcbiAgdmFyIGFsZ29saWFzZWFyY2ggPSBfcmVmLmFsZ29saWFzZWFyY2gsXG4gICAgICBjbGllbnRPcHRpb25zID0gX3JlZi5jbGllbnRPcHRpb25zLFxuICAgICAgYXBpS2V5ID0gX3JlZi5hcGlLZXksXG4gICAgICBhcHBJZCA9IF9yZWYuYXBwSWQsXG4gICAgICBoaXRzUGVyUGFnZSA9IF9yZWYuaGl0c1BlclBhZ2UsXG4gICAgICBwb3N0Y29kZVNlYXJjaCA9IF9yZWYucG9zdGNvZGVTZWFyY2gsXG4gICAgICBhcm91bmRMYXRMbmcgPSBfcmVmLmFyb3VuZExhdExuZyxcbiAgICAgIGFyb3VuZFJhZGl1cyA9IF9yZWYuYXJvdW5kUmFkaXVzLFxuICAgICAgYXJvdW5kTGF0TG5nVmlhSVAgPSBfcmVmLmFyb3VuZExhdExuZ1ZpYUlQLFxuICAgICAgaW5zaWRlQm91bmRpbmdCb3ggPSBfcmVmLmluc2lkZUJvdW5kaW5nQm94LFxuICAgICAgaW5zaWRlUG9seWdvbiA9IF9yZWYuaW5zaWRlUG9seWdvbixcbiAgICAgIGdldFJhbmtpbmdJbmZvID0gX3JlZi5nZXRSYW5raW5nSW5mbyxcbiAgICAgIGNvdW50cmllcyA9IF9yZWYuY291bnRyaWVzLFxuICAgICAgZm9ybWF0SW5wdXRWYWx1ZSA9IF9yZWYuZm9ybWF0SW5wdXRWYWx1ZSxcbiAgICAgIF9yZWYkY29tcHV0ZVF1ZXJ5UGFyYSA9IF9yZWYuY29tcHV0ZVF1ZXJ5UGFyYW1zLFxuICAgICAgY29tcHV0ZVF1ZXJ5UGFyYW1zID0gX3JlZiRjb21wdXRlUXVlcnlQYXJhID09PSB2b2lkIDAgPyBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfSA6IF9yZWYkY29tcHV0ZVF1ZXJ5UGFyYSxcbiAgICAgIF9yZWYkdXNlRGV2aWNlTG9jYXRpbyA9IF9yZWYudXNlRGV2aWNlTG9jYXRpb24sXG4gICAgICB1c2VEZXZpY2VMb2NhdGlvbiA9IF9yZWYkdXNlRGV2aWNlTG9jYXRpbyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJHVzZURldmljZUxvY2F0aW8sXG4gICAgICBfcmVmJGxhbmd1YWdlID0gX3JlZi5sYW5ndWFnZSxcbiAgICAgIGxhbmd1YWdlID0gX3JlZiRsYW5ndWFnZSA9PT0gdm9pZCAwID8gbmF2aWdhdG9yLmxhbmd1YWdlLnNwbGl0KCctJylbMF0gOiBfcmVmJGxhbmd1YWdlLFxuICAgICAgX3JlZiRvbkhpdHMgPSBfcmVmLm9uSGl0cyxcbiAgICAgIG9uSGl0cyA9IF9yZWYkb25IaXRzID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoKSB7fSA6IF9yZWYkb25IaXRzLFxuICAgICAgX3JlZiRvbkVycm9yID0gX3JlZi5vbkVycm9yLFxuICAgICAgb25FcnJvciA9IF9yZWYkb25FcnJvciA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKGUpIHtcbiAgICB0aHJvdyBlO1xuICB9IDogX3JlZiRvbkVycm9yLFxuICAgICAgb25SYXRlTGltaXRSZWFjaGVkID0gX3JlZi5vblJhdGVMaW1pdFJlYWNoZWQsXG4gICAgICBvbkludmFsaWRDcmVkZW50aWFscyA9IF9yZWYub25JbnZhbGlkQ3JlZGVudGlhbHMsXG4gICAgICB0eXBlID0gX3JlZi50eXBlO1xuICB2YXIgcGxhY2VzQ2xpZW50ID0gYWxnb2xpYXNlYXJjaC5pbml0UGxhY2VzKGFwcElkLCBhcGlLZXksIGNsaWVudE9wdGlvbnMpO1xuICBwbGFjZXNDbGllbnQuYXMuYWRkQWxnb2xpYUFnZW50KFwiQWxnb2xpYSBQbGFjZXMgXCIuY29uY2F0KF92ZXJzaW9uW1wiZGVmYXVsdFwiXSkpO1xuICB2YXIgY29uZmlndXJhdGlvbiA9ICgwLCBfY29uZmlndXJlW1wiZGVmYXVsdFwiXSkoe1xuICAgIGhpdHNQZXJQYWdlOiBoaXRzUGVyUGFnZSxcbiAgICB0eXBlOiB0eXBlLFxuICAgIHBvc3Rjb2RlU2VhcmNoOiBwb3N0Y29kZVNlYXJjaCxcbiAgICBjb3VudHJpZXM6IGNvdW50cmllcyxcbiAgICBsYW5ndWFnZTogbGFuZ3VhZ2UsXG4gICAgYXJvdW5kTGF0TG5nOiBhcm91bmRMYXRMbmcsXG4gICAgYXJvdW5kUmFkaXVzOiBhcm91bmRSYWRpdXMsXG4gICAgYXJvdW5kTGF0TG5nVmlhSVA6IGFyb3VuZExhdExuZ1ZpYUlQLFxuICAgIGluc2lkZUJvdW5kaW5nQm94OiBpbnNpZGVCb3VuZGluZ0JveCxcbiAgICBpbnNpZGVQb2x5Z29uOiBpbnNpZGVQb2x5Z29uLFxuICAgIGdldFJhbmtpbmdJbmZvOiBnZXRSYW5raW5nSW5mbyxcbiAgICBmb3JtYXRJbnB1dFZhbHVlOiBmb3JtYXRJbnB1dFZhbHVlLFxuICAgIGNvbXB1dGVRdWVyeVBhcmFtczogY29tcHV0ZVF1ZXJ5UGFyYW1zLFxuICAgIHVzZURldmljZUxvY2F0aW9uOiB1c2VEZXZpY2VMb2NhdGlvbixcbiAgICBvbkhpdHM6IG9uSGl0cyxcbiAgICBvbkVycm9yOiBvbkVycm9yLFxuICAgIG9uUmF0ZUxpbWl0UmVhY2hlZDogb25SYXRlTGltaXRSZWFjaGVkLFxuICAgIG9uSW52YWxpZENyZWRlbnRpYWxzOiBvbkludmFsaWRDcmVkZW50aWFsc1xuICB9KTtcbiAgdmFyIHBhcmFtcyA9IGNvbmZpZ3VyYXRpb24ucGFyYW1zO1xuICB2YXIgY29udHJvbHMgPSBjb25maWd1cmF0aW9uLmNvbnRyb2xzO1xuICB2YXIgdXNlckNvb3JkcztcbiAgdmFyIHRyYWNrZXIgPSBudWxsO1xuXG4gIGlmIChjb250cm9scy51c2VEZXZpY2VMb2NhdGlvbikge1xuICAgIHRyYWNrZXIgPSBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbihmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciBjb29yZHMgPSBfcmVmMi5jb29yZHM7XG4gICAgICB1c2VyQ29vcmRzID0gXCJcIi5jb25jYXQoY29vcmRzLmxhdGl0dWRlLCBcIixcIikuY29uY2F0KGNvb3Jkcy5sb25naXR1ZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VhcmNoZXIocXVlcnksIGNiKSB7XG4gICAgdmFyIHNlYXJjaFBhcmFtcyA9IF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgcGFyYW1zKSwge30sIHtcbiAgICAgIHF1ZXJ5OiBxdWVyeVxuICAgIH0pO1xuXG4gICAgaWYgKHVzZXJDb29yZHMpIHtcbiAgICAgIHNlYXJjaFBhcmFtcy5hcm91bmRMYXRMbmcgPSB1c2VyQ29vcmRzO1xuICAgIH1cblxuICAgIHJldHVybiBwbGFjZXNDbGllbnQuc2VhcmNoKGNvbnRyb2xzLmNvbXB1dGVRdWVyeVBhcmFtcyhzZWFyY2hQYXJhbXMpKS50aGVuKGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICB2YXIgaGl0cyA9IGNvbnRlbnQuaGl0cy5tYXAoZnVuY3Rpb24gKGhpdCwgaGl0SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICgwLCBfZm9ybWF0SGl0W1wiZGVmYXVsdFwiXSkoe1xuICAgICAgICAgIGZvcm1hdElucHV0VmFsdWU6IGNvbnRyb2xzLmZvcm1hdElucHV0VmFsdWUsXG4gICAgICAgICAgaGl0OiBoaXQsXG4gICAgICAgICAgaGl0SW5kZXg6IGhpdEluZGV4LFxuICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICByYXdBbnN3ZXI6IGNvbnRlbnRcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnRyb2xzLm9uSGl0cyh7XG4gICAgICAgIGhpdHM6IGhpdHMsXG4gICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgcmF3QW5zd2VyOiBjb250ZW50XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaXRzO1xuICAgIH0pLnRoZW4oY2IpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnN0YXR1c0NvZGUgPT09IDQwMyAmJiBlLm1lc3NhZ2UgPT09ICdJbnZhbGlkIEFwcGxpY2F0aW9uLUlEIG9yIEFQSSBrZXknKSB7XG4gICAgICAgIGNvbnRyb2xzLm9uSW52YWxpZENyZWRlbnRpYWxzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAoZS5zdGF0dXNDb2RlID09PSA0MjkpIHtcbiAgICAgICAgY29udHJvbHMub25SYXRlTGltaXRSZWFjaGVkKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29udHJvbHMub25FcnJvcihlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlYXJjaGVyLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwYXJ0aWFsKSB7XG4gICAgdmFyIHVwZGF0ZWQgPSAoMCwgX2NvbmZpZ3VyZVtcImRlZmF1bHRcIl0pKF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCBwYXJhbXMpLCBjb250cm9scyksIHBhcnRpYWwpKTtcbiAgICBwYXJhbXMgPSB1cGRhdGVkLnBhcmFtcztcbiAgICBjb250cm9scyA9IHVwZGF0ZWQuY29udHJvbHM7XG5cbiAgICBpZiAoY29udHJvbHMudXNlRGV2aWNlTG9jYXRpb24gJiYgdHJhY2tlciA9PT0gbnVsbCkge1xuICAgICAgdHJhY2tlciA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgICB2YXIgY29vcmRzID0gX3JlZjMuY29vcmRzO1xuICAgICAgICB1c2VyQ29vcmRzID0gXCJcIi5jb25jYXQoY29vcmRzLmxhdGl0dWRlLCBcIixcIikuY29uY2F0KGNvb3Jkcy5sb25naXR1ZGUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghY29udHJvbHMudXNlRGV2aWNlTG9jYXRpb24gJiYgdHJhY2tlciAhPT0gbnVsbCkge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2godHJhY2tlcik7XG4gICAgICB0cmFja2VyID0gbnVsbDtcbiAgICAgIHVzZXJDb29yZHMgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gc2VhcmNoZXI7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jb25maWd1cmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2NvbmZpZ3VyZVwiKSk7XG5cbnZhciBfZm9ybWF0SGl0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9mb3JtYXRIaXRcIikpO1xuXG52YXIgX3ZlcnNpb24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZlcnNpb25cIikpO1xuXG52YXIgX2RlZmF1bHRUZW1wbGF0ZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2RlZmF1bHRUZW1wbGF0ZXNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBmaWx0ZXJBcHBsaWNhYmxlUGFyYW1zID0gZnVuY3Rpb24gZmlsdGVyQXBwbGljYWJsZVBhcmFtcyhwYXJhbXMpIHtcbiAgdmFyIGhpdHNQZXJQYWdlID0gcGFyYW1zLmhpdHNQZXJQYWdlLFxuICAgICAgYXJvdW5kTGF0TG5nID0gcGFyYW1zLmFyb3VuZExhdExuZyxcbiAgICAgIGdldFJhbmtpbmdJbmZvID0gcGFyYW1zLmdldFJhbmtpbmdJbmZvLFxuICAgICAgbGFuZ3VhZ2UgPSBwYXJhbXMubGFuZ3VhZ2U7XG4gIHZhciBmaWx0ZXJlZCA9IHt9O1xuXG4gIGlmICh0eXBlb2YgaGl0c1BlclBhZ2UgPT09ICdudW1iZXInKSB7XG4gICAgZmlsdGVyZWQuaGl0c1BlclBhZ2UgPSBoaXRzUGVyUGFnZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyZWQubGFuZ3VhZ2UgPSBsYW5ndWFnZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZ2V0UmFua2luZ0luZm8gPT09ICdib29sZWFuJykge1xuICAgIGZpbHRlcmVkLmdldFJhbmtpbmdJbmZvID0gZ2V0UmFua2luZ0luZm87XG4gIH1cblxuICBpZiAodHlwZW9mIGFyb3VuZExhdExuZyA9PT0gJ3N0cmluZycpIHtcbiAgICBmaWx0ZXJlZC5hcm91bmRMYXRMbmcgPSBhcm91bmRMYXRMbmc7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyZWQ7XG59O1xuXG52YXIgY3JlYXRlUmV2ZXJzZUdlb2NvZGluZ1NvdXJjZSA9IGZ1bmN0aW9uIGNyZWF0ZVJldmVyc2VHZW9jb2RpbmdTb3VyY2UoX3JlZikge1xuICB2YXIgYWxnb2xpYXNlYXJjaCA9IF9yZWYuYWxnb2xpYXNlYXJjaCxcbiAgICAgIGNsaWVudE9wdGlvbnMgPSBfcmVmLmNsaWVudE9wdGlvbnMsXG4gICAgICBhcGlLZXkgPSBfcmVmLmFwaUtleSxcbiAgICAgIGFwcElkID0gX3JlZi5hcHBJZCxcbiAgICAgIGhpdHNQZXJQYWdlID0gX3JlZi5oaXRzUGVyUGFnZSxcbiAgICAgIGFyb3VuZExhdExuZyA9IF9yZWYuYXJvdW5kTGF0TG5nLFxuICAgICAgZ2V0UmFua2luZ0luZm8gPSBfcmVmLmdldFJhbmtpbmdJbmZvLFxuICAgICAgX3JlZiRmb3JtYXRJbnB1dFZhbHVlID0gX3JlZi5mb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgZm9ybWF0SW5wdXRWYWx1ZSA9IF9yZWYkZm9ybWF0SW5wdXRWYWx1ZSA9PT0gdm9pZCAwID8gX2RlZmF1bHRUZW1wbGF0ZXNbXCJkZWZhdWx0XCJdLnZhbHVlIDogX3JlZiRmb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgX3JlZiRsYW5ndWFnZSA9IF9yZWYubGFuZ3VhZ2UsXG4gICAgICBsYW5ndWFnZSA9IF9yZWYkbGFuZ3VhZ2UgPT09IHZvaWQgMCA/IG5hdmlnYXRvci5sYW5ndWFnZS5zcGxpdCgnLScpWzBdIDogX3JlZiRsYW5ndWFnZSxcbiAgICAgIF9yZWYkb25IaXRzID0gX3JlZi5vbkhpdHMsXG4gICAgICBvbkhpdHMgPSBfcmVmJG9uSGl0cyA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKCkge30gOiBfcmVmJG9uSGl0cyxcbiAgICAgIF9yZWYkb25FcnJvciA9IF9yZWYub25FcnJvcixcbiAgICAgIG9uRXJyb3IgPSBfcmVmJG9uRXJyb3IgPT09IHZvaWQgMCA/IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhyb3cgZTtcbiAgfSA6IF9yZWYkb25FcnJvcixcbiAgICAgIG9uUmF0ZUxpbWl0UmVhY2hlZCA9IF9yZWYub25SYXRlTGltaXRSZWFjaGVkLFxuICAgICAgb25JbnZhbGlkQ3JlZGVudGlhbHMgPSBfcmVmLm9uSW52YWxpZENyZWRlbnRpYWxzO1xuICB2YXIgcGxhY2VzQ2xpZW50ID0gYWxnb2xpYXNlYXJjaC5pbml0UGxhY2VzKGFwcElkLCBhcGlLZXksIGNsaWVudE9wdGlvbnMpO1xuICBwbGFjZXNDbGllbnQuYXMuYWRkQWxnb2xpYUFnZW50KFwiQWxnb2xpYSBQbGFjZXMgXCIuY29uY2F0KF92ZXJzaW9uW1wiZGVmYXVsdFwiXSkpO1xuICB2YXIgY29uZmlndXJhdGlvbiA9ICgwLCBfY29uZmlndXJlW1wiZGVmYXVsdFwiXSkoe1xuICAgIGFwaUtleTogYXBpS2V5LFxuICAgIGFwcElkOiBhcHBJZCxcbiAgICBoaXRzUGVyUGFnZTogaGl0c1BlclBhZ2UsXG4gICAgYXJvdW5kTGF0TG5nOiBhcm91bmRMYXRMbmcsXG4gICAgZ2V0UmFua2luZ0luZm86IGdldFJhbmtpbmdJbmZvLFxuICAgIGxhbmd1YWdlOiBsYW5ndWFnZSxcbiAgICBmb3JtYXRJbnB1dFZhbHVlOiBmb3JtYXRJbnB1dFZhbHVlLFxuICAgIG9uSGl0czogb25IaXRzLFxuICAgIG9uRXJyb3I6IG9uRXJyb3IsXG4gICAgb25SYXRlTGltaXRSZWFjaGVkOiBvblJhdGVMaW1pdFJlYWNoZWQsXG4gICAgb25JbnZhbGlkQ3JlZGVudGlhbHM6IG9uSW52YWxpZENyZWRlbnRpYWxzXG4gIH0pO1xuICB2YXIgcGFyYW1zID0gZmlsdGVyQXBwbGljYWJsZVBhcmFtcyhjb25maWd1cmF0aW9uLnBhcmFtcyk7XG4gIHZhciBjb250cm9scyA9IGNvbmZpZ3VyYXRpb24uY29udHJvbHM7XG5cbiAgdmFyIHNlYXJjaGVyID0gZnVuY3Rpb24gc2VhcmNoZXIocXVlcnlBcm91bmRMYXRMbmcsIGNiKSB7XG4gICAgdmFyIGZpbmFsQXJvdW5kTGF0TG5nID0gcXVlcnlBcm91bmRMYXRMbmcgfHwgcGFyYW1zLmFyb3VuZExhdExuZztcblxuICAgIGlmICghZmluYWxBcm91bmRMYXRMbmcpIHtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcignQSBsb2NhdGlvbiBtdXN0IGJlIHByb3ZpZGVkIGZvciByZXZlcnNlIGdlb2NvZGluZycpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGxhY2VzQ2xpZW50LnJldmVyc2UoX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCBwYXJhbXMpLCB7fSwge1xuICAgICAgYXJvdW5kTGF0TG5nOiBmaW5hbEFyb3VuZExhdExuZ1xuICAgIH0pKS50aGVuKGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICB2YXIgaGl0cyA9IGNvbnRlbnQuaGl0cy5tYXAoZnVuY3Rpb24gKGhpdCwgaGl0SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICgwLCBfZm9ybWF0SGl0W1wiZGVmYXVsdFwiXSkoe1xuICAgICAgICAgIGZvcm1hdElucHV0VmFsdWU6IGNvbnRyb2xzLmZvcm1hdElucHV0VmFsdWUsXG4gICAgICAgICAgaGl0OiBoaXQsXG4gICAgICAgICAgaGl0SW5kZXg6IGhpdEluZGV4LFxuICAgICAgICAgIHF1ZXJ5OiBmaW5hbEFyb3VuZExhdExuZyxcbiAgICAgICAgICByYXdBbnN3ZXI6IGNvbnRlbnRcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnRyb2xzLm9uSGl0cyh7XG4gICAgICAgIGhpdHM6IGhpdHMsXG4gICAgICAgIHF1ZXJ5OiBmaW5hbEFyb3VuZExhdExuZyxcbiAgICAgICAgcmF3QW5zd2VyOiBjb250ZW50XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaXRzO1xuICAgIH0pLnRoZW4oY2IpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnN0YXR1c0NvZGUgPT09IDQwMyAmJiBlLm1lc3NhZ2UgPT09ICdJbnZhbGlkIEFwcGxpY2F0aW9uLUlEIG9yIEFQSSBrZXknKSB7XG4gICAgICAgIGNvbnRyb2xzLm9uSW52YWxpZENyZWRlbnRpYWxzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAoZS5zdGF0dXNDb2RlID09PSA0MjkpIHtcbiAgICAgICAgY29udHJvbHMub25SYXRlTGltaXRSZWFjaGVkKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29udHJvbHMub25FcnJvcihlKTtcbiAgICB9KTtcbiAgfTtcblxuICBzZWFyY2hlci5jb25maWd1cmUgPSBmdW5jdGlvbiAocGFydGlhbCkge1xuICAgIHZhciB1cGRhdGVkID0gKDAsIF9jb25maWd1cmVbXCJkZWZhdWx0XCJdKShfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgcGFyYW1zKSwgY29udHJvbHMpLCBwYXJ0aWFsKSk7XG4gICAgcGFyYW1zID0gZmlsdGVyQXBwbGljYWJsZVBhcmFtcyh1cGRhdGVkLnBhcmFtcyk7XG4gICAgY29udHJvbHMgPSB1cGRhdGVkLmNvbnRyb2xzO1xuICAgIHJldHVybiBzZWFyY2hlcjtcbiAgfTtcblxuICByZXR1cm4gc2VhcmNoZXI7XG59O1xuXG52YXIgX2RlZmF1bHQgPSBjcmVhdGVSZXZlcnNlR2VvY29kaW5nU291cmNlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2Zvcm1hdElucHV0VmFsdWUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2Zvcm1hdElucHV0VmFsdWVcIikpO1xuXG52YXIgX2Zvcm1hdERyb3Bkb3duVmFsdWUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2Zvcm1hdERyb3Bkb3duVmFsdWVcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vaWNvbnMvYWxnb2xpYS5zdmcnICovXG52YXIgYWxnb2xpYUxvZ28gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMTE3XFxcIiBoZWlnaHQ9XFxcIjE3XFxcIiB2aWV3Qm94PVxcXCIwIDAgMTMwIDE5XFxcIj48ZyBmaWxsPVxcXCJub25lXFxcIiBmaWxsLXJ1bGU9XFxcImV2ZW5vZGRcXFwiPjxnIGZpbGwtcnVsZT1cXFwibm9uemVyb1xcXCI+PHBhdGggZmlsbD1cXFwiIzU0NjhGRlxcXCIgZD1cXFwiTTU5LjM5OS4wNDRoMTMuMjk5YTIuMzcyIDIuMzcyIDAgMCAxIDIuMzc3IDIuMzY0djEzLjIzNGEyLjM3MiAyLjM3MiAwIDAgMS0yLjM3NyAyLjM2NEg1OS4zOTlhMi4zNzIgMi4zNzIgMCAwIDEtMi4zNzctMi4zNjRWMi40MDNBMi4zNjggMi4zNjggMCAwIDEgNTkuMzk5LjA0NHpcXFwiLz48cGF0aCBmaWxsPVxcXCIjRkZGXFxcIiBkPVxcXCJNNjYuMjU3IDQuNTgyYy0yLjgxNSAwLTUuMSAyLjI3Mi01LjEgNS4wNzggMCAyLjgwNiAyLjI4NCA1LjA3MiA1LjEgNS4wNzIgMi44MTUgMCA1LjEtMi4yNzIgNS4xLTUuMDc4IDAtMi44MDYtMi4yNzktNS4wNzItNS4xLTUuMDcyem0wIDguNjUyYy0xLjk4MyAwLTMuNTkzLTEuNjAyLTMuNTkzLTMuNTc0IDAtMS45NzIgMS42MS0zLjU3NCAzLjU5My0zLjU3NCAxLjk4MyAwIDMuNTkzIDEuNjAyIDMuNTkzIDMuNTc0YTMuNTgyIDMuNTgyIDAgMCAxLTMuNTkzIDMuNTc0em0wLTYuNDE4VjkuNDhjMCAuMDc2LjA4Mi4xMzEuMTUzLjA5M2wyLjM3Ny0xLjIyNmMuMDU1LS4wMjcuMDcxLS4wOTMuMDQ0LS4xNDdhMi45NiAyLjk2IDAgMCAwLTIuNDY1LTEuNDg3Yy0uMDU1IDAtLjExLjA0NC0uMTEuMTA0aC4wMDF6bS0zLjMzLTEuOTU2bC0uMzEyLS4zMWEuNzgzLjc4MyAwIDAgMC0xLjEwNiAwbC0uMzcyLjM3YS43NzMuNzczIDAgMCAwIDAgMS4xbC4zMDcuMzA1Yy4wNDkuMDUuMTIxLjAzOC4xNjQtLjAxLjE4MS0uMjQ2LjM3OC0uNDguNTk3LS42OTguMjI1LS4yMjMuNDU1LS40Mi43MDctLjU5OS4wNTUtLjAzMy4wNi0uMTA5LjAxNi0uMTU4aC0uMDAxem01LjAwMS0uODA2di0uNjE2YS43ODEuNzgxIDAgMCAwLS43ODMtLjc3OWgtMS44MjRhLjc4Ljc4IDAgMCAwLS43ODMuNzh2LjYzMWMwIC4wNzEuMDY2LjEyLjEzNy4xMDRhNS43MzYgNS43MzYgMCAwIDEgMS41ODgtLjIyM2MuNTIgMCAxLjAzNS4wNzEgMS41MzQuMjA3YS4xMDYuMTA2IDAgMCAwIC4xMzEtLjEwNHpcXFwiLz48cGF0aCBmaWxsPVxcXCIjMjUyQzYxXFxcIiBkPVxcXCJNNS4wMjcgMTAuMjQ2YzAgLjY5OC0uMjUyIDEuMjQ2LS43NTcgMS42NDQtLjUwNS4zOTctMS4yMDEuNTk2LTIuMDg5LjU5Ni0uODg4IDAtMS42MTUtLjEzOC0yLjE4MS0uNDE0di0xLjIxNGMuMzU4LjE2OC43MzkuMzAxIDEuMTQxLjM5Ny40MDMuMDk3Ljc3OC4xNDUgMS4xMjUuMTQ1LjUwOCAwIC44ODQtLjA5NyAxLjEyNS0uMjlhLjk0NS45NDUgMCAwIDAgLjM2My0uNzc5Ljk3OC45NzggMCAwIDAtLjMzMy0uNzQ3Yy0uMjIyLS4yMDQtLjY4LS40NDYtMS4zNzUtLjcyNUMxLjMzIDguNTcuODI1IDguMjQuNTMxIDcuODY1Yy0uMjk0LS4zNzItLjQ0LS44Mi0uNDQtMS4zNDMgMC0uNjU1LjIzMy0xLjE3LjY5OC0xLjU0Ny40NjUtLjM3NiAxLjA5LS41NjQgMS44NzUtLjU2NC43NTIgMCAxLjUuMTY1IDIuMjQ1LjQ5NGwtLjQwOCAxLjA0N2MtLjY5OC0uMjk0LTEuMzIxLS40NC0xLjg2OS0uNDQtLjQxNSAwLS43My4wOS0uOTQ1LjI3MWEuODkuODkgMCAwIDAtLjMyMi43MTdjMCAuMjA0LjA0My4zOC4xMjkuNTI0LjA4Ni4xNDUuMjI3LjI4Mi40MjQuNDExLjE5Ny4xMy41NTEuMyAxLjA2My41MS41NzcuMjQuOTk5LjQ2NCAxLjI2OC42NzEuMjY5LjIwOC40NjUuNDQyLjU5MS43MDQuMTI1LjI2MS4xODguNTcuMTg4LjkyNGwtLjAwMS4wMDJ6bTMuOTggMi4yNGMtLjkyNCAwLTEuNjQ2LS4yNjktMi4xNjctLjgwOC0uNTIxLS41MzktLjc4MS0xLjI4LS43ODEtMi4yMjYgMC0uOTcuMjQyLTEuNzMzLjcyNS0yLjI4OC40ODMtLjU1NSAxLjE0OC0uODMzIDEuOTkzLS44MzMuNzg0IDAgMS40MDQuMjM4IDEuODU4LjcxNC40NTUuNDc2LjY4MiAxLjEzMi42ODIgMS45NjZ2LjY4Mkg3LjM1OWMuMDE4LjU3Ny4xNzQgMS4wMi40NjcgMS4zMy4yOTQuMzEuNzA3LjQ2NCAxLjI0MS40NjQuMzUxIDAgLjY3OC0uMDMzLjk4LS4wOTlhNS4xIDUuMSAwIDAgMCAuOTc1LS4zM3YxLjAyNmEzLjg2NSAzLjg2NSAwIDAgMS0uOTM1LjMxMiA1LjcyMyA1LjcyMyAwIDAgMS0xLjA4LjA5MXptNy40Ni0uMTA3bC0uMjUyLS44MjdoLS4wNDNjLS4yODYuMzYyLS41NzUuNjA4LS44NjUuNzQtLjI5LjEzLS42NjIuMTk1LTEuMTE3LjE5NS0uNTg0IDAtMS4wMzktLjE1OC0xLjM2Ny0uNDczLS4zMjgtLjMxNS0uNDkxLS43Ni0uNDkxLTEuMzM3IDAtLjYxMi4yMjctMS4wNzQuNjgyLTEuMzg2LjQ1NS0uMzEyIDEuMTQ4LS40ODIgMi4wNzktLjUxbDEuMDI2LS4wMzJ2LS4zMTdjMC0uMzgtLjA4OS0uNjYzLS4yNjYtLjg1LS4xNzctLjE4OS0uNDUyLS4yODMtLjgyNC0uMjgzLS4zMDQgMC0uNTk2LjA0NS0uODc1LjEzNGE2LjY4IDYuNjggMCAwIDAtLjgwNi4zMTdsLS40MDgtLjkwMmE0LjQxNCA0LjQxNCAwIDAgMSAxLjA1OC0uMzg0IDQuODU2IDQuODU2IDAgMCAxIDEuMDg1LS4xMzJjLjc1NiAwIDEuMzI2LjE2NSAxLjcxMS40OTQuMzg1LjMzLjU3Ny44NDcuNTc3IDEuNTUydjQuMDAxaC0uOTA0em01LjY3Ny02LjA0OGMuMjU0IDAgLjQ2NC4wMTguNjI4LjA1NGwtLjEyNCAxLjE3NmEyLjM4MyAyLjM4MyAwIDAgMC0uNTU5LS4wNjRjLS41MDUgMC0uOTE0LjE2NS0xLjIyNy40OTQtLjMxMy4zMy0uNDcuNzU3LS40NyAxLjI4NHYzLjEwNEgxOS4xM1Y2LjQ0aC45ODhsLjE2NyAxLjA0N2guMDY0Yy4xOTctLjM1NC40NTQtLjYzNi43NzEtLjg0M2ExLjgzIDEuODMgMCAwIDEgMS4wMjMtLjMxMmguMDAxem00LjEyNSA2LjE1NWMtLjg5OSAwLTEuNTgyLS4yNjItMi4wNDktLjc4Ny0uNDY3LS41MjUtLjcwMS0xLjI3Ny0uNzAxLTIuMjU5IDAtLjk5OS4yNDQtMS43NjcuNzMzLTIuMzA0LjQ4OS0uNTM3IDEuMTk1LS44MDYgMi4xMTktLjgwNi42MjcgMCAxLjE5MS4xMTYgMS42OTIuMzVsLS4zODEgMS4wMTRjLS41MzQtLjIwOC0uOTc0LS4zMTItMS4zMjEtLjMxMi0xLjAyOCAwLTEuNTQyLjY4Mi0xLjU0MiAyLjA0NiAwIC42NjYuMTI4IDEuMTY2LjM4NCAxLjUwMS4yNTYuMzM1LjYzMS41MDIgMS4xMjUuNTAyYTMuMjMgMy4yMyAwIDAgMCAxLjU5NS0uNDE5djEuMTAxYTIuNTMgMi41MyAwIDAgMS0uNzIyLjI4NSA0LjM1NiA0LjM1NiAwIDAgMS0uOTMyLjA4NnYuMDAyem04LjI3Ny0uMTA3aC0xLjI2OFY4LjcyN2MwLS40NTgtLjA5Mi0uOC0uMjc3LTEuMDI2LS4xODQtLjIyNi0uNDc3LS4zMzgtLjg3OC0uMzM4LS41MyAwLS45MTkuMTU4LTEuMTY4LjQ3NS0uMjQ5LjMxNy0uMzczLjg0OC0uMzczIDEuNTkzdjIuOTVIMjkuMzJWNC4wMjJoMS4yNjJ2Mi4xMjJjMCAuMzQtLjAyMS43MDQtLjA2NCAxLjA5aC4wODFhMS43NiAxLjc2IDAgMCAxIC43MTctLjY2NmMuMzA2LS4xNTguNjYzLS4yMzYgMS4wNzItLjIzNiAxLjQzOSAwIDIuMTU5LjcyNSAyLjE1OSAyLjE3NXYzLjg3M2wtLjAwMS0uMDAyem03LjY0OC02LjA0OGMuNzQxIDAgMS4zMTkuMjcgMS43MzIuODA2LjQxNC41MzcuNjIgMS4yOTEuNjIgMi4yNjEgMCAuOTc0LS4yMDkgMS43MzItLjYyOCAyLjI3NS0uNDE5LjU0Mi0xLjAwMS44MTQtMS43NDYuODE0LS43NTIgMC0xLjMzNi0uMjctMS43NTEtLjgxaC0uMDg2bC0uMjMxLjcwM2gtLjk0NVY0LjAyM2gxLjI2MlY2LjAxbC0uMDIxLjY1NS0uMDMyLjU1M2guMDU0Yy40MDEtLjU5Ljk5Mi0uODg2IDEuNzcyLS44ODZ6bTIuOTE3LjEwN2gxLjM3NWwxLjIwOCAzLjM2OGMuMTgzLjQ4LjMwNC45MzEuMzY1IDEuMzU0aC4wNDNjLjAzMi0uMTk3LjA5MS0uNDM2LjE3Ny0uNzE3LjA4Ni0uMjguNTQxLTEuNjE2IDEuMzY0LTQuMDA0aDEuMzY0bC0yLjU0MSA2LjczYy0uNDYyIDEuMjM1LTEuMjMyIDEuODUzLTIuMzEgMS44NTMtLjI3OSAwLS41NTEtLjAzLS44MTYtLjA5di0xYy4xOS4wNDMuNDA2LjA2NC42NS4wNjQuNjA5IDAgMS4wMzctLjM1MyAxLjI4NC0xLjA1OGwuMjItLjU1OS0yLjM4NS01Ljk0aC4wMDJ6bS0zLjI0NC45MjRjLS41MDggMC0uODc1LjE1LTEuMDk4LjQ0OC0uMjI0LjMtLjMzOS44LS4zNDYgMS41MDF2LjA4NmMwIC43MjMuMTE1IDEuMjQ3LjM0NCAxLjU3MS4yMjkuMzI0LjYwMy40ODYgMS4xMjMuNDg2LjQ0OCAwIC43ODctLjE3NyAxLjAxOC0uNTMyLjIzMS0uMzU0LjM0Ni0uODY3LjM0Ni0xLjUzNiAwLTEuMzUtLjQ2Mi0yLjAyNS0xLjM4Ni0yLjAyNWwtLjAwMS4wMDF6bS0yNy4yOCA0LjE1N2MuNDU4IDAgLjgyNi0uMTI4IDEuMTA0LS4zODQuMjc4LS4yNTYuNDE2LS42MTUuNDE2LTEuMDc3di0uNTE2bC0uNzYzLjAzMmMtLjU5NC4wMjEtMS4wMjcuMTIxLTEuMjk3LjI5OHMtLjQwNi40NDgtLjQwNi44MTRjMCAuMjY1LjA3OS40Ny4yMzYuNjE1LjE1OC4xNDUuMzk0LjIxOC43MDkuMjE4aC4wMDF6TTguNzc1IDcuMjg3Yy0uNDAxIDAtLjcyMi4xMjctLjk2NC4zODFzLS4zODYuNjI1LS40MzIgMS4xMTJoMi42OTZjLS4wMDctLjQ5LS4xMjUtLjg2Mi0uMzU0LTEuMTE1LS4yMjktLjI1Mi0uNTQ0LS4zNzktLjk0NS0uMzc5bC0uMDAxLjAwMXpcXFwiLz48L2c+PHBhdGggZmlsbD1cXFwiIzU0NjhGRlxcXCIgZD1cXFwiTTEwMi4xNjIgMTMuNzg0YzAgMS40NTUtLjM3MiAyLjUxNy0xLjEyMyAzLjE5My0uNzUuNjc2LTEuODk1IDEuMDEzLTMuNDQgMS4wMTMtLjU2NCAwLTEuNzM2LS4xMDktMi42NzMtLjMxNmwuMzQ1LTEuNjg5Yy43ODMuMTYzIDEuODE5LjIwNyAyLjM2MS4yMDcuODYgMCAxLjQ3My0uMTc0IDEuODQtLjUyMy4zNjctLjM0OS41NDgtLjg2Ni41NDgtMS41NTN2LS4zNDlhNi4zNzQgNi4zNzQgMCAwIDEtLjgzOC4zMTYgNC4xNTEgNC4xNTEgMCAwIDEtMS4xOTQuMTU4IDQuNTE1IDQuNTE1IDAgMCAxLTEuNjE2LS4yNzggMy4zODUgMy4zODUgMCAwIDEtMS4yNTQtLjgxNyAzLjc0NCAzLjc0NCAwIDAgMS0uODExLTEuMzVjLS4xOTItLjU0LS4yOS0xLjUwNS0uMjktMi4yMTMgMC0uNjY1LjEwNC0xLjQ5OC4zMDctMi4wNTRhMy45MjUgMy45MjUgMCAwIDEgLjkwNC0xLjQzMyA0LjEyNCA0LjEyNCAwIDAgMSAxLjQ0MS0uOTI2IDUuMzEgNS4zMSAwIDAgMSAxLjk0NS0uMzY1Yy42OTYgMCAxLjMzNy4wODcgMS45NjEuMTkxYTE1Ljg2IDE1Ljg2IDAgMCAxIDEuNTg4LjMzMnY4LjQ1NmgtLjAwMXptLTUuOTU1LTQuMjA2YzAgLjg5My4xOTcgMS44ODUuNTkyIDIuMy4zOTQuNDEzLjkwNC42MiAxLjUyOC42Mi4zNCAwIC42NjMtLjA0OS45NjQtLjE0MmEyLjc1IDIuNzUgMCAwIDAgLjczNC0uMzMydi01LjI5YTguNTMxIDguNTMxIDAgMCAwLTEuNDEzLS4xOGMtLjc3OC0uMDIyLTEuMzY5LjI5NC0xLjc4Ni44MDEtLjQxMS41MDctLjYxOSAxLjM5NS0uNjE5IDIuMjIzem0xNi4xMjEgMGMwIC43Mi0uMTA0IDEuMjY0LS4zMTggMS44NThhNC4zODkgNC4zODkgMCAwIDEtLjkwNCAxLjUyYy0uMzg5LjQyLS44NTQuNzQ2LTEuNDAyLjk3NS0uNTQ4LjIzLTEuMzkxLjM2LTEuODEzLjM2LS40MjItLjAwNS0xLjI2LS4xMjUtMS44MDItLjM2YTQuMDg4IDQuMDg4IDAgMCAxLTEuMzk3LS45NzUgNC40ODYgNC40ODYgMCAwIDEtLjkwOS0xLjUyIDUuMDM3IDUuMDM3IDAgMCAxLS4zMjktMS44NThjMC0uNzE5LjA5OS0xLjQxLjMxOC0xLjk5OS4yMTktLjU4OC41MjYtMS4wOS45Mi0xLjUwOS4zOTQtLjQyLjg2NS0uNzQgMS40MDItLjk3YTQuNTQ3IDQuNTQ3IDAgMCAxIDEuNzg2LS4zMzggNC42OSA0LjY5IDAgMCAxIDEuNzkxLjMzOGMuNTQ4LjIzIDEuMDE5LjU1IDEuNDAyLjk3LjM4OS40Mi42OS45MjEuOTA5IDEuNTEuMjMuNTg3LjM0NSAxLjI4LjM0NSAxLjk5OGguMDAxem0tMi4xOTIuMDA1YzAtLjkyLS4yMDMtMS42ODktLjU5Ny0yLjIyMy0uMzk0LS41MzktLjk0OC0uODA2LTEuNjU0LS44MDYtLjcwNyAwLTEuMjYuMjY3LTEuNjU0LjgwNi0uMzk0LjU0LS41ODYgMS4zMDItLjU4NiAyLjIyMyAwIC45MzIuMTk3IDEuNTU4LjU5MiAyLjA5OC4zOTQuNTQ1Ljk0OC44MTIgMS42NTQuODEyLjcwNyAwIDEuMjYtLjI3MiAxLjY1NC0uODEyLjM5NC0uNTQ1LjU5Mi0xLjE2Ni41OTItMi4wOThoLS4wMDF6bTYuOTYzIDQuNzA4Yy0zLjUxMS4wMTYtMy41MTEtMi44MjItMy41MTEtMy4yNzRMMTEzLjU4My45NWwyLjE0Mi0uMzM4djEwLjAwM2MwIC4yNTYgMCAxLjg4IDEuMzc1IDEuODg1djEuNzkzaC0uMDAxek0xMjAuODczIDE0LjI5MWgtMi4xNTNWNS4wOTVsMi4xNTMtLjMzOHpNMTE5Ljc5NCAzLjc1Yy43MTggMCAxLjMwNC0uNTc5IDEuMzA0LTEuMjkyIDAtLjcxNC0uNTgxLTEuMjktMS4zMDQtMS4yOS0uNzIzIDAtMS4zMDQuNTc3LTEuMzA0IDEuMjkgMCAuNzE0LjU4NiAxLjI5MSAxLjMwNCAxLjI5MXptNi40MzEgMS4wMTJjLjcwNyAwIDEuMzA0LjA4NyAxLjc4Ni4yNjIuNDgyLjE3NC44NzEuNDIgMS4xNTYuNzMuMjg1LjMxMS40ODguNzM1LjYwOCAxLjE4Mi4xMjYuNDQ3LjE4Ni45MzcuMTg2IDEuNDc2djUuNDgxYTI1LjI0IDI1LjI0IDAgMCAxLTEuNDk1LjI1MWMtLjY2OC4wOTgtMS40MTkuMTQ3LTIuMjUxLjE0N2E2LjgyOSA2LjgyOSAwIDAgMS0xLjUxNy0uMTU4IDMuMjEzIDMuMjEzIDAgMCAxLTEuMTc4LS41MDcgMi40NTUgMi40NTUgMCAwIDEtLjc2MS0uOTA0Yy0uMTgxLS4zNy0uMjc0LS44OTMtLjI3NC0xLjQzOCAwLS41MjMuMTA0LS44NTUuMzA3LTEuMjE1LjIwOC0uMzYuNDg3LS42NTQuODM4LS44ODNhMy42MDkgMy42MDkgMCAwIDEgMS4yMjctLjQ5IDcuMDczIDcuMDczIDAgMCAxIDIuMjAyLS4xMDNjLjI2My4wMjcuNTM3LjA3Ni44MzMuMTQ3di0uMzQ5YzAtLjI0NS0uMDI3LS40NzktLjA4OC0uNjk3YTEuNDg2IDEuNDg2IDAgMCAwLS4zMDctLjU4M2MtLjE0OC0uMTY5LS4zNC0uMy0uNTgxLS4zOTJhMi41MzYgMi41MzYgMCAwIDAtLjkxNS0uMTYzYy0uNDkzIDAtLjk0Mi4wNi0xLjM1My4xMzEtLjQxMS4wNzEtLjc1LjE1My0xLjAwOC4yNDVsLS4yNTctMS43NDljLjI2OC0uMDkzLjY2OC0uMTg1IDEuMTgzLS4yNzhhOS4zMzUgOS4zMzUgMCAwIDEgMS42Ni0uMTQyaC0uMDAxem0uMTc5IDcuNzNjLjY1NyAwIDEuMTQ1LS4wMzggMS40ODQtLjEwNFYxMC4yMmE1LjA5NyA1LjA5NyAwIDAgMC0xLjk3OC0uMTA0Yy0uMjQxLjAzMy0uNDYuMDk4LS42NTIuMTkxYTEuMTY3IDEuMTY3IDAgMCAwLS40NjYuMzkyYy0uMTIxLjE3LS4xNzUuMjY3LS4xNzUuNTIzIDAgLjUwMS4xNzUuNzkuNDkzLjk4MS4zMjMuMTk2Ljc1LjI5IDEuMjkzLjI5aC4wMDF6TTg0LjEwOCA0LjgxNmMuNzA3IDAgMS4zMDQuMDg3IDEuNzg2LjI2Mi40ODIuMTc0Ljg3MS40MiAxLjE1Ni43My4yOS4zMTYuNDg3LjczNS42MDggMS4xODIuMTI2LjQ0Ny4xODYuOTM3LjE4NiAxLjQ3NnY1LjQ4MWEyNS4yNCAyNS4yNCAwIDAgMS0xLjQ5NS4yNTFjLS42NjguMDk4LTEuNDE5LjE0Ny0yLjI1MS4xNDdhNi44MjkgNi44MjkgMCAwIDEtMS41MTctLjE1OCAzLjIxMyAzLjIxMyAwIDAgMS0xLjE3OC0uNTA3IDIuNDU1IDIuNDU1IDAgMCAxLS43NjEtLjkwNGMtLjE4MS0uMzctLjI3NC0uODkzLS4yNzQtMS40MzggMC0uNTIzLjEwNC0uODU1LjMwNy0xLjIxNS4yMDgtLjM2LjQ4Ny0uNjU0LjgzOC0uODgzYTMuNjA5IDMuNjA5IDAgMCAxIDEuMjI3LS40OSA3LjA3MyA3LjA3MyAwIDAgMSAyLjIwMi0uMTAzYy4yNTcuMDI3LjUzNy4wNzYuODMzLjE0N3YtLjM0OWMwLS4yNDUtLjAyNy0uNDc5LS4wODgtLjY5N2ExLjQ4NiAxLjQ4NiAwIDAgMC0uMzA3LS41ODNjLS4xNDgtLjE2OS0uMzQtLjMtLjU4MS0uMzkyYTIuNTM2IDIuNTM2IDAgMCAwLS45MTUtLjE2M2MtLjQ5MyAwLS45NDIuMDYtMS4zNTMuMTMxLS40MTEuMDcxLS43NS4xNTMtMS4wMDguMjQ1bC0uMjU3LTEuNzQ5Yy4yNjgtLjA5My42NjgtLjE4NSAxLjE4My0uMjc4YTguODkgOC44OSAwIDAgMSAxLjY2LS4xNDJoLS4wMDF6bS4xODUgNy43MzZjLjY1NyAwIDEuMTQ1LS4wMzggMS40ODQtLjEwNFYxMC4yOGE1LjA5NyA1LjA5NyAwIDAgMC0xLjk3OC0uMTA0Yy0uMjQxLjAzMy0uNDYuMDk4LS42NTIuMTkxYTEuMTY3IDEuMTY3IDAgMCAwLS40NjYuMzkyYy0uMTIxLjE3LS4xNzUuMjY3LS4xNzUuNTIzIDAgLjUwMS4xNzUuNzkuNDkzLjk4MS4zMTguMTkxLjc1LjI5IDEuMjkzLjI5aC4wMDF6bTguNjgzIDEuNzM4Yy0zLjUxMS4wMTYtMy41MTEtMi44MjItMy41MTEtMy4yNzRMODkuNDYuOTQ4IDkxLjYwMi42MXYxMC4wMDNjMCAuMjU2IDAgMS44OCAxLjM3NSAxLjg4NXYxLjc5M2gtLjAwMXpcXFwiLz48L2c+PC9zdmc+XCI7XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL29zbS5zdmcnICovXG52YXIgb3NtTG9nbyA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIxMlxcXCIgaGVpZ2h0PVxcXCIxMlxcXCI+XFxuICA8cGF0aCBmaWxsPVxcXCIjNzk3OTc5XFxcIiBmaWxsLXJ1bGU9XFxcImV2ZW5vZGRcXFwiIGQ9XFxcIk02LjU3Ny41TDUuMzA0LjAwNSAyLjYyNyAxLjAyIDAgMGwuOTkyIDIuNzY3LS45ODYgMi42ODUuOTk4IDIuNzYtMSAyLjcxNy42MTMuMjIgMy4zOS0zLjQ1LjU2My4wNi43MjYtLjY5cy0uNzE3LS45Mi0uOTEtMS44NmMuMTkzLS4xNDYuMTg0LS4xNC4zNTUtLjI4NUM0LjEgMS45MyA2LjU4LjUgNi41OC41em0tNC4xNyAxMS4zNTRsLjIyLjEyIDIuNjgtMS4wNSAyLjYyIDEuMDQgMi42NDQtMS4wMyAxLjAyLTIuNzE3LS4zMy0uOTQ0cy0xLjEzIDEuMjYtMy40NC44NzhjLS4xNzQuMjktLjI1LjM3LS4yNS4zN3MtMS4xMS0uMzEtMS42ODMtLjg5Yy0uNTczLjU4LS43OTUuNzEtLjc5NS43MWwuMDguNjM0LTIuNzYgMi44OXptNi4yNi00LjM5NWMxLjgxNyAwIDMuMjktMS41MyAzLjI5LTMuNCAwLTEuODgtMS40NzMtMy40LTMuMjktMy40cy0zLjI5IDEuNTItMy4yOSAzLjRjMCAxLjg3IDEuNDczIDMuNCAzLjI5IDMuNHpcXFwiLz5cXG48L3N2Zz5cXG5cIjtcbnZhciBfZGVmYXVsdCA9IHtcbiAgZm9vdGVyOiBcIjxkaXYgY2xhc3M9XFxcImFwLWZvb3RlclxcXCI+XFxuICA8YSBocmVmPVxcXCJodHRwczovL3d3dy5hbGdvbGlhLmNvbS9wbGFjZXNcXFwiIHRpdGxlPVxcXCJTZWFyY2ggYnkgQWxnb2xpYVxcXCIgY2xhc3M9XFxcImFwLWZvb3Rlci1hbGdvbGlhXFxcIj5cIi5jb25jYXQoYWxnb2xpYUxvZ28udHJpbSgpLCBcIjwvYT5cXG4gIHVzaW5nIDxhIGhyZWY9XFxcImh0dHBzOi8vY29tbXVuaXR5LmFsZ29saWEuY29tL3BsYWNlcy9kb2N1bWVudGF0aW9uLmh0bWwjbGljZW5zZVxcXCIgY2xhc3M9XFxcImFwLWZvb3Rlci1vc21cXFwiIHRpdGxlPVxcXCJBbGdvbGlhIFBsYWNlcyBkYXRhIFxceEE5IE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzXFxcIj5cIikuY29uY2F0KG9zbUxvZ28udHJpbSgpLCBcIiA8c3Bhbj5kYXRhPC9zcGFuPjwvYT5cXG4gIDwvZGl2PlwiKSxcbiAgdmFsdWU6IF9mb3JtYXRJbnB1dFZhbHVlW1wiZGVmYXVsdFwiXSxcbiAgc3VnZ2VzdGlvbjogX2Zvcm1hdERyb3Bkb3duVmFsdWVbXCJkZWZhdWx0XCJdXG59O1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xudmFyIF9kZWZhdWx0ID0ge1xuICBtdWx0aUNvbnRhaW5lcnM6IFwiQWxnb2xpYSBQbGFjZXM6ICdjb250YWluZXInIG11c3QgcG9pbnQgdG8gYSBzaW5nbGUgPGlucHV0PiBlbGVtZW50LlxcbkV4YW1wbGU6IGluc3RhbnRpYXRlIHRoZSBsaWJyYXJ5IHR3aWNlIGlmIHlvdSB3YW50IHRvIGJpbmQgdHdvIDxpbnB1dHM+LlxcblxcblNlZSBodHRwczovL2NvbW11bml0eS5hbGdvbGlhLmNvbS9wbGFjZXMvZG9jdW1lbnRhdGlvbi5odG1sI2FwaS1vcHRpb25zLWNvbnRhaW5lclwiLFxuICBiYWRDb250YWluZXI6IFwiQWxnb2xpYSBQbGFjZXM6ICdjb250YWluZXInIG11c3QgcG9pbnQgdG8gYW4gPGlucHV0PiBlbGVtZW50LlxcblxcblNlZSBodHRwczovL2NvbW11bml0eS5hbGdvbGlhLmNvbS9wbGFjZXMvZG9jdW1lbnRhdGlvbi5odG1sI2FwaS1vcHRpb25zLWNvbnRhaW5lclwiLFxuICByYXRlTGltaXRSZWFjaGVkOiBcIkFsZ29saWEgUGxhY2VzOiBDdXJyZW50IHJhdGUgbGltaXQgcmVhY2hlZC5cXG5cXG5TaWduIHVwIGZvciBhIGZyZWUgMTAwLDAwMCBxdWVyaWVzL21vbnRoIGFjY291bnQgYXRcXG5odHRwczovL3d3dy5hbGdvbGlhLmNvbS91c2Vycy9zaWduX3VwL3BsYWNlcy5cXG5cXG5PciB1cGdyYWRlIHlvdXIgMTAwLDAwMCBxdWVyaWVzL21vbnRoIHBsYW4gYnkgY29udGFjdGluZyB1cyBhdFxcbmh0dHBzOi8vY29tbXVuaXR5LmFsZ29saWEuY29tL3BsYWNlcy9jb250YWN0Lmh0bWwuXCIsXG4gIGludmFsaWRDcmVkZW50aWFsczogXCJUaGUgQVBQIElEIG9yIEFQSSBrZXkgcHJvdmlkZWQgaXMgaW52YWxpZC5cIixcbiAgaW52YWxpZEFwcElkOiBcIllvdXIgQVBQIElEIGlzIGludmFsaWQuIEEgUGxhY2VzIEFQUCBJRCBzdGFydHMgd2l0aCAncGwnLiBZb3UgbXVzdCBjcmVhdGUgYSB2YWxpZCBQbGFjZXMgYXBwIGZpcnN0LlxcblxcbkNyZWF0ZSBhIGZyZWUgUGxhY2VzIGFwcCBoZXJlOiBodHRwczovL3d3dy5hbGdvbGlhLmNvbS91c2Vycy9zaWduX3VwL3BsYWNlc1wiXG59O1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZmluZENvdW50cnlDb2RlO1xuXG5mdW5jdGlvbiBmaW5kQ291bnRyeUNvZGUodGFncykge1xuICBmb3IgKHZhciB0YWdJbmRleCA9IDA7IHRhZ0luZGV4IDwgdGFncy5sZW5ndGg7IHRhZ0luZGV4KyspIHtcbiAgICB2YXIgdGFnID0gdGFnc1t0YWdJbmRleF07XG4gICAgdmFyIGZpbmQgPSB0YWcubWF0Y2goL2NvdW50cnlcXC8oLiopPy8pO1xuXG4gICAgaWYgKGZpbmQpIHtcbiAgICAgIHJldHVybiBmaW5kWzFdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZpbmRUeXBlO1xuXG5mdW5jdGlvbiBmaW5kVHlwZSh0YWdzKSB7XG4gIHZhciB0eXBlcyA9IHtcbiAgICBjb3VudHJ5OiAnY291bnRyeScsXG4gICAgY2l0eTogJ2NpdHknLFxuICAgICdhbWVuaXR5L2J1c19zdGF0aW9uJzogJ2J1c1N0b3AnLFxuICAgICdhbWVuaXR5L3Rvd25oYWxsJzogJ3Rvd25oYWxsJyxcbiAgICAncmFpbHdheS9zdGF0aW9uJzogJ3RyYWluU3RhdGlvbicsXG4gICAgJ2Flcm93YXkvYWVyb2Ryb21lJzogJ2FpcnBvcnQnLFxuICAgICdhZXJvd2F5L3Rlcm1pbmFsJzogJ2FpcnBvcnQnLFxuICAgICdhZXJvd2F5L2dhdGUnOiAnYWlycG9ydCdcbiAgfTtcblxuICBmb3IgKHZhciB0IGluIHR5cGVzKSB7XG4gICAgaWYgKHRhZ3MuaW5kZXhPZih0KSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB0eXBlc1t0XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gJ2FkZHJlc3MnO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmb3JtYXREcm9wZG93blZhbHVlO1xuXG4vKiBiYWJlbC1wbHVnaW4taW5saW5lLWltcG9ydCAnLi9pY29ucy9hZGRyZXNzLnN2ZycgKi9cbnZhciBhZGRyZXNzSWNvbiA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgdmlld0JveD1cXFwiMCAwIDE0IDIwXFxcIj48cGF0aCBkPVxcXCJNNyAwQzMuMTMgMCAwIDMuMTMgMCA3YzAgNS4yNSA3IDEzIDcgMTNzNy03Ljc1IDctMTNjMC0zLjg3LTMuMTMtNy03LTd6bTAgOS41QzUuNjIgOS41IDQuNSA4LjM4IDQuNSA3UzUuNjIgNC41IDcgNC41IDkuNSA1LjYyIDkuNSA3IDguMzggOS41IDcgOS41elxcXCIvPjwvc3ZnPlxcblwiO1xuXG4vKiBiYWJlbC1wbHVnaW4taW5saW5lLWltcG9ydCAnLi9pY29ucy9jaXR5LnN2ZycgKi9cbnZhciBjaXR5SWNvbiA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgdmlld0JveD1cXFwiMCAwIDE4IDE5XFxcIj48cGF0aCBkPVxcXCJNMTIgOVYzTDkgMCA2IDN2MkgwdjE0aDE4VjloLTZ6bS04IDhIMnYtMmgydjJ6bTAtNEgydi0yaDJ2MnptMC00SDJWN2gydjJ6bTYgOEg4di0yaDJ2MnptMC00SDh2LTJoMnYyem0wLTRIOFY3aDJ2MnptMC00SDhWM2gydjJ6bTYgMTJoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyelxcXCIvPjwvc3ZnPlxcblwiO1xuXG4vKiBiYWJlbC1wbHVnaW4taW5saW5lLWltcG9ydCAnLi9pY29ucy9jb3VudHJ5LnN2ZycgKi9cbnZhciBjb3VudHJ5SWNvbiA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgdmlld0JveD1cXFwiMCAwIDIwIDIwXFxcIj5cXG4gIDxwYXRoIGQ9XFxcIk0xMCAwQzQuNDggMCAwIDQuNDggMCAxMHM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTUuNTIgMCAxMCAwek05IDE3LjkzYy0zLjk1LS40OS03LTMuODUtNy03LjkzIDAtLjYyLjA4LTEuMjEuMjEtMS43OUw3IDEzdjFjMCAxLjEuOSAyIDIgMnYxLjkzem02LjktMi41NGMtLjI2LS44MS0xLTEuMzktMS45LTEuMzloLTF2LTNjMC0uNTUtLjQ1LTEtMS0xSDZWOGgyYy41NSAwIDEtLjQ1IDEtMVY1aDJjMS4xIDAgMi0uOSAyLTJ2LS40MWMyLjkzIDEuMTkgNSA0LjA2IDUgNy40MSAwIDIuMDgtLjggMy45Ny0yLjEgNS4zOXpcXFwiLz5cXG48L3N2Zz5cXG5cIjtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vaWNvbnMvYnVzLnN2ZycgKi9cbnZhciBidXNJY29uID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgNTQuOSA1MC41XFxcIj48cGF0aCBkPVxcXCJNOS42IDEyLjdIOC41Yy0yLjMgMC00LjEgMS45LTQuMSA0LjF2MS4xYzAgMi4yIDEuOCA0IDQgNC4xdjIxLjdoLS43Yy0xLjMgMC0yLjMgMS0yLjMgMi4zaDcuMWMwLTEuMy0xLTIuMy0yLjMtMi4zaC0uNVYyMi4xYzIuMi0uMSA0LTEuOSA0LTQuMXYtMS4xYzAtMi4zLTEuOC00LjItNC4xLTQuMnpNNDYgNy42aC03LjVjMC0xLjgtMS41LTMuMy0zLjMtMy4zaC0zLjZjLTEuOCAwLTMuMyAxLjUtMy4zIDMuM0gyMWMtMi41IDAtNC42IDItNC42IDQuNnYyNi4zYzAgMS43IDEuMyAzLjEgMyAzLjFoLjh2MS42YzAgMS43IDEuNCAzLjEgMy4xIDMuMSAxLjcgMCAzLTEuNCAzLTMuMXYtMS42aDE0LjN2MS42YzAgMS43IDEuNCAzLjEgMy4xIDMuMSAxLjcgMCAzLjEtMS40IDMuMS0zLjF2LTEuNmguOGMxLjcgMCAzLjEtMS40IDMuMS0zLjFWMTIuMmMtLjItMi41LTIuMi00LjYtNC43LTQuNnptLTI3LjQgNC42YzAtMS4zIDEuMS0yLjQgMi40LTIuNGgyNWMxLjMgMCAyLjQgMS4xIDIuNCAyLjR2LjNjMCAxLjMtMS4xIDIuNC0yLjQgMi40SDIxYy0xLjMgMC0yLjQtMS4xLTIuNC0yLjR2LS4zek0yMSAzOGMtMS41IDAtMi43LTEuMi0yLjctMi43IDAtMS41IDEuMi0yLjcgMi43LTIuNyAxLjUgMCAyLjcgMS4yIDIuNyAyLjcgMCAxLjUtMS4yIDIuNy0yLjcgMi43em0wLTEwLjFjLTEuMyAwLTIuNC0xLjEtMi40LTIuNHYtNi42YzAtMS4zIDEuMS0yLjQgMi40LTIuNGgyNWMxLjMgMCAyLjQgMS4xIDIuNCAyLjR2Ni42YzAgMS4zLTEuMSAyLjQtMi40IDIuNEgyMXptMjQuOCAxMGMtMS41IDAtMi43LTEuMi0yLjctMi43IDAtMS41IDEuMi0yLjcgMi43LTIuNyAxLjUgMCAyLjcgMS4yIDIuNyAyLjcgMCAxLjUtMS4yIDIuNy0yLjcgMi43elxcXCIvPjwvc3ZnPlxcblwiO1xuXG4vKiBiYWJlbC1wbHVnaW4taW5saW5lLWltcG9ydCAnLi9pY29ucy90cmFpbi5zdmcnICovXG52YXIgdHJhaW5JY29uID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMTUgMjBcXFwiPlxcbiAgPHBhdGggZD1cXFwiTTEzLjEwNSAyMGwtMi4zNjYtMy4zNTRINC4yNkwxLjkwNyAyMEgwbDMuMjk3LTQuNzg3Yy0xLjEtLjE3Ny0yLjE5Ni0xLjI4Ny0yLjE5NC0yLjY0MlYyLjY4QzEuMSAxLjI4IDIuMzE3LS4wMDIgMy45NzMgMGg3LjA2NWMxLjY0Ny0uMDAyIDIuODYzIDEuMjggMi44NiAyLjY3NnY5Ljg5NWMuMDAzIDEuMzYtMS4wOTQgMi40Ny0yLjE5NCAyLjY0N0wxNSAyMGgtMS44OTV6TTYuMTEgMmgyLjc4Yy4yNjQgMCAuNDcyLS4xMjMuNDcyLS4yN3YtLjQ2YzAtLjE0Ny0uMjItLjI2OC0uNDcyLS4yN0g2LjExYy0uMjUyLjAwMi0uNDcuMTIzLS40Ny4yN3YuNDZjMCAuMTQ2LjIwNi4yNy40Ny4yN3ptNi4yNiAzLjk1MlY0LjE3NWMtLjAwNC0uNzQtLjUtMS4zODctMS40MzYtMS4zODhINC4wNjZjLS45MzYgMC0xLjQzLjY0OC0xLjQzNiAxLjM4OHYxLjc3N2MtLjAwMi44Ni42NDQgMS4zODQgMS40MzYgMS4zODhoNi44NjhjLjc5My0uMDA0IDEuNDQtLjUyOCAxLjQzNi0xLjM4OHptLTguNDY1IDUuMzg2Yy0uNjktLjAwMy0xLjI1NC41NC0xLjI1MiAxLjIxLS4wMDIuNjczLjU2IDEuMjE3IDEuMjUyIDEuMjIyLjY5Ny0uMDA2IDEuMjYtLjU1IDEuMjYyLTEuMjItLjAwMi0uNjcyLS41NjUtMS4yMTUtMS4yNjItMS4yMTJ6bTguNDIgMS4yMWMtLjAwNS0uNjctLjU2Ny0xLjIxMy0xLjI2NS0xLjIxLS42OS0uMDAzLTEuMjUzLjU0LTEuMjUgMS4yMS0uMDAzLjY3My41NiAxLjIxNyAxLjI1IDEuMjIyLjY5OC0uMDA2IDEuMjYtLjU1IDEuMjY0LTEuMjJ6XFxcIi8+XFxuPC9zdmc+XFxuXCI7XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL3Rvd25oYWxsLnN2ZycgKi9cbnZhciB0b3duaGFsbEljb24gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAyNCAyNFxcXCI+PHBhdGggZD1cXFwiTTEyIC42TDIuNSA2LjloMTguOUwxMiAuNnpNMy44IDguMmMtLjcgMC0xLjMuNi0xLjMgMS4zdjguOEwuMyAyMi4xYy0uMi4zLS4zLjUtLjMuNiAwIC42LjguNiAxLjMuNmgyMS41Yy40IDAgMS4zIDAgMS4zLS42IDAtLjItLjEtLjMtLjMtLjZsLTIuMi0zLjhWOS41YzAtLjctLjYtMS4zLTEuMy0xLjNIMy44em0yLjUgMi41Yy43IDAgMS4xLjYgMS4zIDEuM3Y3LjZINS4xVjEyYzAtLjcuNS0xLjMgMS4yLTEuM3ptNS43IDBjLjcgMCAxLjMuNiAxLjMgMS4zdjcuNmgtMi41VjEyYy0uMS0uNy41LTEuMyAxLjItMS4zem01LjcgMGMuNyAwIDEuMy42IDEuMyAxLjN2Ny42aC0yLjVWMTJjLS4xLS43LjUtMS4zIDEuMi0xLjN6XFxcIi8+PC9zdmc+XFxuXCI7XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL3BsYW5lLnN2ZycgKi9cbnZhciBwbGFuZUljb24gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAyNCAyNFxcXCI+PHBhdGggZD1cXFwiTTIyLjkgMS4xczEuMy4zLTQuMyA2LjVsLjcgMy44LjItLjJjLjQtLjQgMS0uNCAxLjMgMCAuNC40LjQgMSAwIDEuM2wtMS4yIDEuMi4zIDEuNy4xLS4xYy40LS40IDEtLjQgMS4zIDAgLjQuNC40IDEgMCAxLjNsLTEuMSAxLjFjLjIgMS45LjMgMy42LjEgNC41IDAgMC0xLjIgMS4yLTEuOC41IDAgMC0yLjMtNy43LTMuOC0xMS4xLTUuOSA2LTYuNCA1LjYtNi40IDUuNnMxLjIgMy44LS4yIDUuMmwtMi4zLTQuM2guMWwtNC4zLTIuM2MxLjMtMS4zIDUuMi0uMiA1LjItLjJzLS41LS40IDUuNi02LjNDOC45IDcuNyAxLjIgNS41IDEuMiA1LjVjLS43LS43LjUtMS44LjUtMS44LjktLjIgMi42LS4xIDQuNS4xbDEuMS0xLjFjLjQtLjQgMS0uNCAxLjMgMCAuNC40LjQgMSAwIDEuM2wxLjcuMyAxLjItMS4yYy40LS40IDEtLjQgMS4zIDAgLjQuNC40IDEgMCAxLjNsLS4yLjIgMy44LjdjNi4yLTUuNSA2LjUtNC4yIDYuNS00LjJ6XFxcIi8+PC9zdmc+XFxuXCI7XG52YXIgaWNvbnMgPSB7XG4gIGFkZHJlc3M6IGFkZHJlc3NJY29uLFxuICBjaXR5OiBjaXR5SWNvbixcbiAgY291bnRyeTogY291bnRyeUljb24sXG4gIGJ1c1N0b3A6IGJ1c0ljb24sXG4gIHRyYWluU3RhdGlvbjogdHJhaW5JY29uLFxuICB0b3duaGFsbDogdG93bmhhbGxJY29uLFxuICBhaXJwb3J0OiBwbGFuZUljb25cbn07XG5cbmZ1bmN0aW9uIGZvcm1hdERyb3Bkb3duVmFsdWUoX3JlZikge1xuICB2YXIgdHlwZSA9IF9yZWYudHlwZSxcbiAgICAgIGhpZ2hsaWdodCA9IF9yZWYuaGlnaGxpZ2h0O1xuICB2YXIgbmFtZSA9IGhpZ2hsaWdodC5uYW1lLFxuICAgICAgYWRtaW5pc3RyYXRpdmUgPSBoaWdobGlnaHQuYWRtaW5pc3RyYXRpdmUsXG4gICAgICBjaXR5ID0gaGlnaGxpZ2h0LmNpdHksXG4gICAgICBjb3VudHJ5ID0gaGlnaGxpZ2h0LmNvdW50cnk7XG4gIHZhciBvdXQgPSBcIjxzcGFuIGNsYXNzPVxcXCJhcC1zdWdnZXN0aW9uLWljb25cXFwiPlwiLmNvbmNhdChpY29uc1t0eXBlXS50cmltKCksIFwiPC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJhcC1uYW1lXFxcIj5cIikuY29uY2F0KG5hbWUsIFwiPC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJhcC1hZGRyZXNzXFxcIj5cXG4gIFwiKS5jb25jYXQoW2NpdHksIGFkbWluaXN0cmF0aXZlLCBjb3VudHJ5XS5maWx0ZXIoZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgcmV0dXJuIHRva2VuICE9PSB1bmRlZmluZWQ7XG4gIH0pLmpvaW4oJywgJyksIFwiPC9zcGFuPlwiKS5yZXBsYWNlKC9cXHMqXFxuXFxzKi9nLCAnICcpO1xuICByZXR1cm4gb3V0O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmb3JtYXRIaXQ7XG5cbnZhciBfZmluZENvdW50cnlDb2RlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9maW5kQ291bnRyeUNvZGVcIikpO1xuXG52YXIgX2ZpbmRUeXBlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9maW5kVHlwZVwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgaWYgKGVudW1lcmFibGVPbmx5KSBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSk7IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHsgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTsgfSBlbHNlIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gZ2V0QmVzdEhpZ2hsaWdodGVkRm9ybShoaWdobGlnaHRlZFZhbHVlcykge1xuICB2YXIgZGVmYXVsdFZhbHVlID0gaGlnaGxpZ2h0ZWRWYWx1ZXNbMF0udmFsdWU7IC8vIGNvbGxlY3QgYWxsIG90aGVyIG1hdGNoZXNcblxuICB2YXIgYmVzdEF0dHJpYnV0ZXMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGhpZ2hsaWdodGVkVmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGhpZ2hsaWdodGVkVmFsdWVzW2ldLm1hdGNoTGV2ZWwgIT09ICdub25lJykge1xuICAgICAgYmVzdEF0dHJpYnV0ZXMucHVzaCh7XG4gICAgICAgIGluZGV4OiBpLFxuICAgICAgICB3b3JkczogaGlnaGxpZ2h0ZWRWYWx1ZXNbaV0ubWF0Y2hlZFdvcmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0gLy8gbm8gbWF0Y2hlcyBpbiB0aGlzIGF0dHJpYnV0ZSwgcmV0cmlldmUgZmlyc3QgdmFsdWVcblxuXG4gIGlmIChiZXN0QXR0cmlidXRlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICB9IC8vIHNvcnQgdGhlIG1hdGNoZXMgYnkgYGRlc2Mod29yZHMpLCBhc2MoaW5kZXgpYFxuXG5cbiAgYmVzdEF0dHJpYnV0ZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIGlmIChhLndvcmRzID4gYi53b3Jkcykge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH0gZWxzZSBpZiAoYS53b3JkcyA8IGIud29yZHMpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleDtcbiAgfSk7IC8vIGFuZCBhcHBlbmQgdGhlIGJlc3QgbWF0Y2ggdG8gdGhlIGZpcnN0IHZhbHVlXG5cbiAgcmV0dXJuIGJlc3RBdHRyaWJ1dGVzWzBdLmluZGV4ID09PSAwID8gXCJcIi5jb25jYXQoZGVmYXVsdFZhbHVlLCBcIiAoXCIpLmNvbmNhdChoaWdobGlnaHRlZFZhbHVlc1tiZXN0QXR0cmlidXRlc1sxXS5pbmRleF0udmFsdWUsIFwiKVwiKSA6IFwiXCIuY29uY2F0KGhpZ2hsaWdodGVkVmFsdWVzW2Jlc3RBdHRyaWJ1dGVzWzBdLmluZGV4XS52YWx1ZSwgXCIgKFwiKS5jb25jYXQoZGVmYXVsdFZhbHVlLCBcIilcIik7XG59XG5cbmZ1bmN0aW9uIGdldEJlc3RQb3N0Y29kZShwb3N0Y29kZXMsIGhpZ2hsaWdodGVkUG9zdGNvZGVzKSB7XG4gIHZhciBkZWZhdWx0VmFsdWUgPSBoaWdobGlnaHRlZFBvc3Rjb2Rlc1swXS52YWx1ZTsgLy8gY29sbGVjdCBhbGwgb3RoZXIgbWF0Y2hlc1xuXG4gIHZhciBiZXN0QXR0cmlidXRlcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgaGlnaGxpZ2h0ZWRQb3N0Y29kZXMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoaGlnaGxpZ2h0ZWRQb3N0Y29kZXNbaV0ubWF0Y2hMZXZlbCAhPT0gJ25vbmUnKSB7XG4gICAgICBiZXN0QXR0cmlidXRlcy5wdXNoKHtcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIHdvcmRzOiBoaWdobGlnaHRlZFBvc3Rjb2Rlc1tpXS5tYXRjaGVkV29yZHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfSAvLyBubyBtYXRjaGVzIGluIHRoaXMgYXR0cmlidXRlLCByZXRyaWV2ZSBmaXJzdCB2YWx1ZVxuXG5cbiAgaWYgKGJlc3RBdHRyaWJ1dGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0Y29kZTogcG9zdGNvZGVzWzBdLFxuICAgICAgaGlnaGxpZ2h0ZWRQb3N0Y29kZTogZGVmYXVsdFZhbHVlXG4gICAgfTtcbiAgfSAvLyBzb3J0IHRoZSBtYXRjaGVzIGJ5IGBkZXNjKHdvcmRzKWBcblxuXG4gIGJlc3RBdHRyaWJ1dGVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBpZiAoYS53b3JkcyA+IGIud29yZHMpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2UgaWYgKGEud29yZHMgPCBiLndvcmRzKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXg7XG4gIH0pO1xuICB2YXIgcG9zdGNvZGUgPSBwb3N0Y29kZXNbYmVzdEF0dHJpYnV0ZXNbMF0uaW5kZXhdO1xuICByZXR1cm4ge1xuICAgIHBvc3Rjb2RlOiBwb3N0Y29kZSxcbiAgICBoaWdobGlnaHRlZFBvc3Rjb2RlOiBoaWdobGlnaHRlZFBvc3Rjb2Rlc1tiZXN0QXR0cmlidXRlc1swXS5pbmRleF0udmFsdWVcbiAgfTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0SGl0KF9yZWYpIHtcbiAgdmFyIGZvcm1hdElucHV0VmFsdWUgPSBfcmVmLmZvcm1hdElucHV0VmFsdWUsXG4gICAgICBoaXQgPSBfcmVmLmhpdCxcbiAgICAgIGhpdEluZGV4ID0gX3JlZi5oaXRJbmRleCxcbiAgICAgIHF1ZXJ5ID0gX3JlZi5xdWVyeSxcbiAgICAgIHJhd0Fuc3dlciA9IF9yZWYucmF3QW5zd2VyO1xuXG4gIHRyeSB7XG4gICAgdmFyIG5hbWUgPSBoaXQubG9jYWxlX25hbWVzWzBdO1xuICAgIHZhciBjb3VudHJ5ID0gaGl0LmNvdW50cnk7XG4gICAgdmFyIGFkbWluaXN0cmF0aXZlID0gaGl0LmFkbWluaXN0cmF0aXZlICYmIGhpdC5hZG1pbmlzdHJhdGl2ZVswXSAhPT0gbmFtZSA/IGhpdC5hZG1pbmlzdHJhdGl2ZVswXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgY2l0eSA9IGhpdC5jaXR5ICYmIGhpdC5jaXR5WzBdICE9PSBuYW1lID8gaGl0LmNpdHlbMF0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIHN1YnVyYiA9IGhpdC5zdWJ1cmIgJiYgaGl0LnN1YnVyYlswXSAhPT0gbmFtZSA/IGhpdC5zdWJ1cmJbMF0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIGNvdW50eSA9IGhpdC5jb3VudHkgJiYgaGl0LmNvdW50eVswXSAhPT0gbmFtZSA/IGhpdC5jb3VudHlbMF0gOiB1bmRlZmluZWQ7XG5cbiAgICB2YXIgX3JlZjIgPSBoaXQucG9zdGNvZGUgJiYgaGl0LnBvc3Rjb2RlLmxlbmd0aCA/IGdldEJlc3RQb3N0Y29kZShoaXQucG9zdGNvZGUsIGhpdC5faGlnaGxpZ2h0UmVzdWx0LnBvc3Rjb2RlKSA6IHtcbiAgICAgIHBvc3Rjb2RlOiB1bmRlZmluZWQsXG4gICAgICBoaWdobGlnaHRlZFBvc3Rjb2RlOiB1bmRlZmluZWRcbiAgICB9LFxuICAgICAgICBwb3N0Y29kZSA9IF9yZWYyLnBvc3Rjb2RlLFxuICAgICAgICBoaWdobGlnaHRlZFBvc3Rjb2RlID0gX3JlZjIuaGlnaGxpZ2h0ZWRQb3N0Y29kZTtcblxuICAgIHZhciBoaWdobGlnaHQgPSB7XG4gICAgICBuYW1lOiBnZXRCZXN0SGlnaGxpZ2h0ZWRGb3JtKGhpdC5faGlnaGxpZ2h0UmVzdWx0LmxvY2FsZV9uYW1lcyksXG4gICAgICBjaXR5OiBjaXR5ID8gZ2V0QmVzdEhpZ2hsaWdodGVkRm9ybShoaXQuX2hpZ2hsaWdodFJlc3VsdC5jaXR5KSA6IHVuZGVmaW5lZCxcbiAgICAgIGFkbWluaXN0cmF0aXZlOiBhZG1pbmlzdHJhdGl2ZSA/IGdldEJlc3RIaWdobGlnaHRlZEZvcm0oaGl0Ll9oaWdobGlnaHRSZXN1bHQuYWRtaW5pc3RyYXRpdmUpIDogdW5kZWZpbmVkLFxuICAgICAgY291bnRyeTogY291bnRyeSA/IGhpdC5faGlnaGxpZ2h0UmVzdWx0LmNvdW50cnkudmFsdWUgOiB1bmRlZmluZWQsXG4gICAgICBzdWJ1cmI6IHN1YnVyYiA/IGdldEJlc3RIaWdobGlnaHRlZEZvcm0oaGl0Ll9oaWdobGlnaHRSZXN1bHQuc3VidXJiKSA6IHVuZGVmaW5lZCxcbiAgICAgIGNvdW50eTogY291bnR5ID8gZ2V0QmVzdEhpZ2hsaWdodGVkRm9ybShoaXQuX2hpZ2hsaWdodFJlc3VsdC5jb3VudHkpIDogdW5kZWZpbmVkLFxuICAgICAgcG9zdGNvZGU6IGhpZ2hsaWdodGVkUG9zdGNvZGVcbiAgICB9O1xuICAgIHZhciBzdWdnZXN0aW9uID0ge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGFkbWluaXN0cmF0aXZlOiBhZG1pbmlzdHJhdGl2ZSxcbiAgICAgIGNvdW50eTogY291bnR5LFxuICAgICAgY2l0eTogY2l0eSxcbiAgICAgIHN1YnVyYjogc3VidXJiLFxuICAgICAgY291bnRyeTogY291bnRyeSxcbiAgICAgIGNvdW50cnlDb2RlOiAoMCwgX2ZpbmRDb3VudHJ5Q29kZVtcImRlZmF1bHRcIl0pKGhpdC5fdGFncyksXG4gICAgICB0eXBlOiAoMCwgX2ZpbmRUeXBlW1wiZGVmYXVsdFwiXSkoaGl0Ll90YWdzKSxcbiAgICAgIGxhdGxuZzoge1xuICAgICAgICBsYXQ6IGhpdC5fZ2VvbG9jLmxhdCxcbiAgICAgICAgbG5nOiBoaXQuX2dlb2xvYy5sbmdcbiAgICAgIH0sXG4gICAgICBwb3N0Y29kZTogcG9zdGNvZGUsXG4gICAgICBwb3N0Y29kZXM6IGhpdC5wb3N0Y29kZSAmJiBoaXQucG9zdGNvZGUubGVuZ3RoID8gaGl0LnBvc3Rjb2RlIDogdW5kZWZpbmVkXG4gICAgfTsgLy8gdGhpcyBpcyB0aGUgdmFsdWUgdG8gcHV0IGluc2lkZSB0aGUgPGlucHV0IHZhbHVlPVxuXG4gICAgdmFyIHZhbHVlID0gZm9ybWF0SW5wdXRWYWx1ZShzdWdnZXN0aW9uKTtcbiAgICByZXR1cm4gX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCBzdWdnZXN0aW9uKSwge30sIHtcbiAgICAgIGhpZ2hsaWdodDogaGlnaGxpZ2h0LFxuICAgICAgaGl0OiBoaXQsXG4gICAgICBoaXRJbmRleDogaGl0SW5kZXgsXG4gICAgICBxdWVyeTogcXVlcnksXG4gICAgICByYXdBbnN3ZXI6IHJhd0Fuc3dlcixcbiAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSBvYmplY3QnLCBoaXQpO1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6ICdDb3VsZCBub3QgcGFyc2Ugb2JqZWN0J1xuICAgIH07XG4gIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZm9ybWF0SW5wdXRWYWx1ZTtcblxuZnVuY3Rpb24gZm9ybWF0SW5wdXRWYWx1ZShfcmVmKSB7XG4gIHZhciBhZG1pbmlzdHJhdGl2ZSA9IF9yZWYuYWRtaW5pc3RyYXRpdmUsXG4gICAgICBjaXR5ID0gX3JlZi5jaXR5LFxuICAgICAgY291bnRyeSA9IF9yZWYuY291bnRyeSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICB0eXBlID0gX3JlZi50eXBlO1xuICB2YXIgb3V0ID0gXCJcIi5jb25jYXQobmFtZSkuY29uY2F0KHR5cGUgIT09ICdjb3VudHJ5JyAmJiBjb3VudHJ5ICE9PSB1bmRlZmluZWQgPyAnLCcgOiAnJywgXCJcXG4gXCIpLmNvbmNhdChjaXR5ID8gXCJcIi5jb25jYXQoY2l0eSwgXCIsXCIpIDogJycsIFwiXFxuIFwiKS5jb25jYXQoYWRtaW5pc3RyYXRpdmUgPyBcIlwiLmNvbmNhdChhZG1pbmlzdHJhdGl2ZSwgXCIsXCIpIDogJycsIFwiXFxuIFwiKS5jb25jYXQoY291bnRyeSA/IGNvdW50cnkgOiAnJykucmVwbGFjZSgvXFxzKlxcblxccyovZywgJyAnKS50cmltKCk7XG4gIHJldHVybiBvdXQ7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHBvbHlmaWxsIGZvciBuYXZpZ2F0b3IubGFuZ3VhZ2UgKElFIDw9IDEwKVxuLy8gbm90IHBvbHlmaWxsZWQgYnkgaHR0cHM6Ly9jZG4ucG9seWZpbGwuaW8vdjIvZG9jcy9cbi8vIERlZmluZWQ6IGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RpbWVycy5odG1sI25hdmlnYXRvcmxhbmd1YWdlXG4vLyAgIHdpdGggYWxsb3dhYmxlIHZhbHVlcyBhdCBodHRwOi8vd3d3LmlldGYub3JnL3JmYy9iY3AvYmNwNDcudHh0XG4vLyBOb3RlIHRoYXQgdGhlIEhUTUwgc3BlYyBzdWdnZXN0cyB0aGF0IGFub255bWl6aW5nIHNlcnZpY2VzIHJldHVybiBcImVuLVVTXCIgYnkgZGVmYXVsdCBmb3Jcbi8vICAgdXNlciBwcml2YWN5IChzbyB5b3VyIGFwcCBtYXkgd2lzaCB0byBwcm92aWRlIGEgbWVhbnMgb2YgY2hhbmdpbmcgdGhlIGxvY2FsZSlcbmlmICghKCdsYW5ndWFnZScgaW4gbmF2aWdhdG9yKSkge1xuICBuYXZpZ2F0b3IubGFuZ3VhZ2UgPSAvLyBJRSAxMCBpbiBJRTggbW9kZSBvbiBXaW5kb3dzIDcgdXNlcyB1cHBlci1jYXNlIGluXG4gIC8vIG5hdmlnYXRvci51c2VyTGFuZ3VhZ2UgY291bnRyeSBjb2RlcyBidXQgcGVyXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9tczUzMzA1Mi5hc3B4ICh2aWFcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL21zNTM0NzEzLmFzcHgpLCB0aGV5XG4gIC8vIGFwcGVhciB0byBiZSBpbiBsb3dlciBjYXNlLCBzbyB3ZSBicmluZyB0aGVtIGludG8gaGFybW9ueSB3aXRoIG5hdmlnYXRvci5sYW5ndWFnZS5cbiAgbmF2aWdhdG9yLnVzZXJMYW5ndWFnZSAmJiBuYXZpZ2F0b3IudXNlckxhbmd1YWdlLnJlcGxhY2UoLy1bYS16XXsyfSQvLCBTdHJpbmcucHJvdG90eXBlLnRvVXBwZXJDYXNlKSB8fCAnZW4tVVMnOyAvLyBEZWZhdWx0IGZvciBhbm9ueW1pemluZyBzZXJ2aWNlczogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvdGltZXJzLmh0bWwjbmF2aWdhdG9ybGFuZ3VhZ2Vcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gcGxhY2VzO1xuXG52YXIgX2V2ZW50cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImV2ZW50c1wiKSk7XG5cbnZhciBfYWxnb2xpYXNlYXJjaExpdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJhbGdvbGlhc2VhcmNoL3NyYy9icm93c2VyL2J1aWxkcy9hbGdvbGlhc2VhcmNoTGl0ZVwiKSk7XG5cbnZhciBfYXV0b2NvbXBsZXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiYXV0b2NvbXBsZXRlLmpzXCIpKTtcblxucmVxdWlyZShcIi4vbmF2aWdhdG9yTGFuZ3VhZ2VcIik7XG5cbnZhciBfY3JlYXRlQXV0b2NvbXBsZXRlRGF0YXNldCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vY3JlYXRlQXV0b2NvbXBsZXRlRGF0YXNldFwiKSk7XG5cbnZhciBfaW5zZXJ0Q3NzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiaW5zZXJ0LWNzc1wiKSk7XG5cbnZhciBfZXJyb3JzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9lcnJvcnNcIikpO1xuXG52YXIgX2NyZWF0ZVJldmVyc2VHZW9jb2RpbmdTb3VyY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2NyZWF0ZVJldmVyc2VHZW9jb2RpbmdTb3VyY2VcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL2NsZWFyLnN2ZycgKi9cbnZhciBjbGVhckljb24gPSBcIjxzdmcgd2lkdGg9XFxcIjEyXFxcIiBoZWlnaHQ9XFxcIjEyXFxcIiB2aWV3Qm94PVxcXCIwIDAgMTIgMTJcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBhdGggZD1cXFwiTS41NjYgMS42OThMMCAxLjEzIDEuMTMyIDBsLjU2NS41NjZMNiA0Ljg2OCAxMC4zMDIuNTY2IDEwLjg2OCAwIDEyIDEuMTMybC0uNTY2LjU2NUw3LjEzMiA2bDQuMzAyIDQuMy41NjYuNTY4TDEwLjg2OCAxMmwtLjU2NS0uNTY2TDYgNy4xMzJsLTQuMyA0LjMwMkwxLjEzIDEyIDAgMTAuODY4bC41NjYtLjU2NUw0Ljg2OCA2IC41NjYgMS42OTh6XFxcIi8+PC9zdmc+XFxuXCI7XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL2FkZHJlc3Muc3ZnJyAqL1xudmFyIHBpbkljb24gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNCAyMFxcXCI+PHBhdGggZD1cXFwiTTcgMEMzLjEzIDAgMCAzLjEzIDAgN2MwIDUuMjUgNyAxMyA3IDEzczctNy43NSA3LTEzYzAtMy44Ny0zLjEzLTctNy03em0wIDkuNUM1LjYyIDkuNSA0LjUgOC4zOCA0LjUgN1M1LjYyIDQuNSA3IDQuNSA5LjUgNS42MiA5LjUgNyA4LjM4IDkuNSA3IDkuNXpcXFwiLz48L3N2Zz5cXG5cIjtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vcGxhY2VzLmNzcycgKi9cbnZhciBjc3MgPSBcIi5hbGdvbGlhLXBsYWNlcyB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmFwLWlucHV0LCAuYXAtaGludCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmctcmlnaHQ6IDM1cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDE2cHg7XFxuICBsaW5lLWhlaWdodDogNDBweDtcXG4gIGhlaWdodDogNDBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNDQ0M7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4uYXAtaW5wdXQ6Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4uYXAtaW5wdXQ6Oi1tcy1jbGVhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uYXAtaW5wdXQ6aG92ZXIgfiAuYXAtaW5wdXQtaWNvbiBzdmcsXFxuLmFwLWlucHV0OmZvY3VzIH4gLmFwLWlucHV0LWljb24gc3ZnLFxcbi5hcC1pbnB1dC1pY29uOmhvdmVyIHN2ZyB7XFxuICBmaWxsOiAjYWFhYWFhO1xcbn1cXG5cXG4uYXAtZHJvcGRvd24tbWVudSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XFxuICBib3gtc2hhZG93OiAwIDFweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAycHggNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgbWFyZ2luLXRvcDogM3B4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLmFwLXN1Z2dlc3Rpb24ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgaGVpZ2h0OiA0NnB4O1xcbiAgbGluZS1oZWlnaHQ6IDQ2cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDE4cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uYXAtc3VnZ2VzdGlvbiBlbSB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuLmFwLWFkZHJlc3Mge1xcbiAgZm9udC1zaXplOiBzbWFsbGVyO1xcbiAgbWFyZ2luLWxlZnQ6IDEycHg7XFxuICBjb2xvcjogI2FhYWFhYTtcXG59XFxuXFxuLmFwLXN1Z2dlc3Rpb24taWNvbiB7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICB3aWR0aDogMTRweDtcXG4gIGhlaWdodDogMjBweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcblxcbi5hcC1zdWdnZXN0aW9uLWljb24gc3ZnIHtcXG4gIGRpc3BsYXk6IGluaGVyaXQ7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC45KSB0cmFuc2xhdGVZKDJweCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45KSB0cmFuc2xhdGVZKDJweCk7XFxuICBmaWxsOiAjY2ZjZmNmO1xcbn1cXG5cXG4uYXAtaW5wdXQtaWNvbiB7XFxuICBib3JkZXI6IDA7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiAxNnB4O1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLmFwLWlucHV0LWljb24uYXAtaWNvbi1waW4ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYXAtaW5wdXQtaWNvbiBzdmcge1xcbiAgZmlsbDogI2NmY2ZjZjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgcmlnaHQ6IDA7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbn1cXG5cXG4uYXAtY3Vyc29yIHtcXG4gIGJhY2tncm91bmQ6ICNlZmVmZWY7XFxufVxcblxcbi5hcC1jdXJzb3IgLmFwLXN1Z2dlc3Rpb24taWNvbiBzdmcge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpIHRyYW5zbGF0ZVkoMnB4KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKSB0cmFuc2xhdGVZKDJweCk7XFxuICBmaWxsOiAjYWFhYWFhO1xcbn1cXG5cXG4uYXAtZm9vdGVyIHtcXG4gIG9wYWNpdHk6IC44O1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICBwYWRkaW5nOiAuNWVtIDFlbSAuNWVtIDA7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsaW5lLWhlaWdodDogMTJweDtcXG59XFxuXFxuLmFwLWZvb3RlciBhIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG4uYXAtZm9vdGVyIGEgc3ZnIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcblxcbi5hcC1mb290ZXI6aG92ZXIge1xcbiAgb3BhY2l0eTogMTtcXG59XFxuXCI7XG4oMCwgX2luc2VydENzc1tcImRlZmF1bHRcIl0pKGNzcywge1xuICBwcmVwZW5kOiB0cnVlXG59KTtcblxudmFyIGFwcGx5QXR0cmlidXRlcyA9IGZ1bmN0aW9uIGFwcGx5QXR0cmlidXRlcyhlbHQsIGF0dHJzKSB7XG4gIE9iamVjdC5lbnRyaWVzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIF9yZWYyID0gX3NsaWNlZFRvQXJyYXkoX3JlZiwgMiksXG4gICAgICAgIG5hbWUgPSBfcmVmMlswXSxcbiAgICAgICAgdmFsdWUgPSBfcmVmMlsxXTtcblxuICAgIGVsdC5zZXRBdHRyaWJ1dGUobmFtZSwgXCJcIi5jb25jYXQodmFsdWUpKTtcbiAgfSk7XG4gIHJldHVybiBlbHQ7XG59O1xuXG5mdW5jdGlvbiBwbGFjZXMob3B0aW9ucykge1xuICB2YXIgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIsXG4gICAgICBzdHlsZSA9IG9wdGlvbnMuc3R5bGUsXG4gICAgICBhY2Nlc3NpYmlsaXR5ID0gb3B0aW9ucy5hY2Nlc3NpYmlsaXR5LFxuICAgICAgX29wdGlvbnMkYXV0b2NvbXBsZXRlID0gb3B0aW9ucy5hdXRvY29tcGxldGVPcHRpb25zLFxuICAgICAgdXNlckF1dG9jb21wbGV0ZU9wdGlvbnMgPSBfb3B0aW9ucyRhdXRvY29tcGxldGUgPT09IHZvaWQgMCA/IHt9IDogX29wdGlvbnMkYXV0b2NvbXBsZXRlOyAvLyBtdWx0aXBsZSBET00gZWxlbWVudHMgdGFyZ2V0ZWRcblxuICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICBpZiAoY29udGFpbmVyLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihfZXJyb3JzW1wiZGVmYXVsdFwiXS5tdWx0aUNvbnRhaW5lcnMpO1xuICAgIH0gLy8gaWYgc2luZ2xlIG5vZGUgTm9kZUxpc3QgcmVjZWl2ZWQsIHJlc29sdmUgdG8gdGhlIGZpcnN0IG9uZVxuXG5cbiAgICByZXR1cm4gcGxhY2VzKF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgb3B0aW9ucyksIHt9LCB7XG4gICAgICBjb250YWluZXI6IGNvbnRhaW5lclswXVxuICAgIH0pKTtcbiAgfSAvLyBjb250YWluZXIgc2VudCBhcyBhIHN0cmluZywgcmVzb2x2ZSBpdCBmb3IgbXVsdGlwbGUgRE9NIGVsZW1lbnRzIGlzc3VlXG5cblxuICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgcmVzb2x2ZWRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbnRhaW5lcik7XG4gICAgcmV0dXJuIHBsYWNlcyhfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIG9wdGlvbnMpLCB7fSwge1xuICAgICAgY29udGFpbmVyOiByZXNvbHZlZENvbnRhaW5lclxuICAgIH0pKTtcbiAgfSAvLyBpZiBub3QgYW4gPGlucHV0PiwgZXJyb3JcblxuXG4gIGlmICghKGNvbnRhaW5lciBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKF9lcnJvcnNbXCJkZWZhdWx0XCJdLmJhZENvbnRhaW5lcik7XG4gIH1cblxuICB2YXIgcGxhY2VzSW5zdGFuY2UgPSBuZXcgX2V2ZW50c1tcImRlZmF1bHRcIl0oKTtcbiAgdmFyIHByZWZpeCA9IFwiYXBcIi5jb25jYXQoc3R5bGUgPT09IGZhbHNlID8gJy1ub3N0eWxlJyA6ICcnKTtcblxuICB2YXIgYXV0b2NvbXBsZXRlT3B0aW9ucyA9IF9vYmplY3RTcHJlYWQoe1xuICAgIGF1dG9zZWxlY3Q6IHRydWUsXG4gICAgaGludDogZmFsc2UsXG4gICAgY3NzQ2xhc3Nlczoge1xuICAgICAgcm9vdDogXCJhbGdvbGlhLXBsYWNlc1wiLmNvbmNhdChzdHlsZSA9PT0gZmFsc2UgPyAnLW5vc3R5bGUnIDogJycpLFxuICAgICAgcHJlZml4OiBwcmVmaXhcbiAgICB9LFxuICAgIGRlYnVnOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50J1xuICB9LCB1c2VyQXV0b2NvbXBsZXRlT3B0aW9ucyk7XG5cbiAgdmFyIGF1dG9jb21wbGV0ZURhdGFzZXQgPSAoMCwgX2NyZWF0ZUF1dG9jb21wbGV0ZURhdGFzZXRbXCJkZWZhdWx0XCJdKShfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIG9wdGlvbnMpLCB7fSwge1xuICAgIGFsZ29saWFzZWFyY2g6IF9hbGdvbGlhc2VhcmNoTGl0ZVtcImRlZmF1bHRcIl0sXG4gICAgb25IaXRzOiBmdW5jdGlvbiBvbkhpdHMoX3JlZjMpIHtcbiAgICAgIHZhciBoaXRzID0gX3JlZjMuaGl0cyxcbiAgICAgICAgICByYXdBbnN3ZXIgPSBfcmVmMy5yYXdBbnN3ZXIsXG4gICAgICAgICAgcXVlcnkgPSBfcmVmMy5xdWVyeTtcbiAgICAgIHJldHVybiBwbGFjZXNJbnN0YW5jZS5lbWl0KCdzdWdnZXN0aW9ucycsIHtcbiAgICAgICAgcmF3QW5zd2VyOiByYXdBbnN3ZXIsXG4gICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgc3VnZ2VzdGlvbnM6IGhpdHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25FcnJvcjogZnVuY3Rpb24gb25FcnJvcihlKSB7XG4gICAgICByZXR1cm4gcGxhY2VzSW5zdGFuY2UuZW1pdCgnZXJyb3InLCBlKTtcbiAgICB9LFxuICAgIG9uUmF0ZUxpbWl0UmVhY2hlZDogZnVuY3Rpb24gb25SYXRlTGltaXRSZWFjaGVkKCkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IHBsYWNlc0luc3RhbmNlLmxpc3RlbmVyQ291bnQoJ2xpbWl0Jyk7XG5cbiAgICAgIGlmIChsaXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coX2Vycm9yc1tcImRlZmF1bHRcIl0ucmF0ZUxpbWl0UmVhY2hlZCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcGxhY2VzSW5zdGFuY2UuZW1pdCgnbGltaXQnLCB7XG4gICAgICAgIG1lc3NhZ2U6IF9lcnJvcnNbXCJkZWZhdWx0XCJdLnJhdGVMaW1pdFJlYWNoZWRcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25JbnZhbGlkQ3JlZGVudGlhbHM6IGZ1bmN0aW9uIG9uSW52YWxpZENyZWRlbnRpYWxzKCkge1xuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hcHBJZCAmJiBvcHRpb25zLmFwcElkLnN0YXJ0c1dpdGgoJ3BsJykpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihfZXJyb3JzW1wiZGVmYXVsdFwiXS5pbnZhbGlkQ3JlZGVudGlhbHMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoX2Vycm9yc1tcImRlZmF1bHRcIl0uaW52YWxpZEFwcElkKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICB9XG4gICAgfSxcbiAgICBjb250YWluZXI6IHVuZGVmaW5lZFxuICB9KSk7XG4gIHZhciBhdXRvY29tcGxldGVJbnN0YW5jZSA9ICgwLCBfYXV0b2NvbXBsZXRlW1wiZGVmYXVsdFwiXSkoY29udGFpbmVyLCBhdXRvY29tcGxldGVPcHRpb25zLCBhdXRvY29tcGxldGVEYXRhc2V0KTtcbiAgdmFyIGF1dG9jb21wbGV0ZUNvbnRhaW5lciA9IGNvbnRhaW5lci5wYXJlbnROb2RlO1xuICB2YXIgYXV0b2NvbXBsZXRlQ2hhbmdlRXZlbnRzID0gWydzZWxlY3RlZCcsICdhdXRvY29tcGxldGVkJ107XG4gIGF1dG9jb21wbGV0ZUNoYW5nZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICBhdXRvY29tcGxldGVJbnN0YW5jZS5vbihcImF1dG9jb21wbGV0ZTpcIi5jb25jYXQoZXZlbnROYW1lKSwgZnVuY3Rpb24gKF8sIHN1Z2dlc3Rpb24pIHtcbiAgICAgIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgcmF3QW5zd2VyOiBzdWdnZXN0aW9uLnJhd0Fuc3dlcixcbiAgICAgICAgcXVlcnk6IHN1Z2dlc3Rpb24ucXVlcnksXG4gICAgICAgIHN1Z2dlc3Rpb246IHN1Z2dlc3Rpb24sXG4gICAgICAgIHN1Z2dlc3Rpb25JbmRleDogc3VnZ2VzdGlvbi5oaXRJbmRleFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBhdXRvY29tcGxldGVJbnN0YW5jZS5vbignYXV0b2NvbXBsZXRlOmN1cnNvcmNoYW5nZWQnLCBmdW5jdGlvbiAoXywgc3VnZ2VzdGlvbikge1xuICAgIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2N1cnNvcmNoYW5nZWQnLCB7XG4gICAgICByYXdBbnN3ZXI6IHN1Z2dlc3Rpb24ucmF3QW5zd2VyLFxuICAgICAgcXVlcnk6IHN1Z2dlc3Rpb24ucXVlcnksXG4gICAgICBzdWdnZXN0aW9uOiBzdWdnZXN0aW9uLFxuICAgICAgc3VnZ2VzdGlvbkluZGV4OiBzdWdnZXN0aW9uLmhpdEluZGV4XG4gICAgfSk7XG4gIH0pO1xuICB2YXIgY2xlYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgY2xlYXIuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICBjbGVhci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnY2xlYXInKTtcblxuICBpZiAoYWNjZXNzaWJpbGl0eSAmJiBhY2Nlc3NpYmlsaXR5LmNsZWFyQnV0dG9uICYmIGFjY2Vzc2liaWxpdHkuY2xlYXJCdXR0b24gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICBhcHBseUF0dHJpYnV0ZXMoY2xlYXIsIGFjY2Vzc2liaWxpdHkuY2xlYXJCdXR0b24pO1xuICB9XG5cbiAgY2xlYXIuY2xhc3NMaXN0LmFkZChcIlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0LWljb25cIikpO1xuICBjbGVhci5jbGFzc0xpc3QuYWRkKFwiXCIuY29uY2F0KHByZWZpeCwgXCItaWNvbi1jbGVhclwiKSk7XG4gIGNsZWFyLmlubmVySFRNTCA9IGNsZWFySWNvbjtcbiAgYXV0b2NvbXBsZXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsZWFyKTtcbiAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgdmFyIHBpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBwaW4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICBwaW4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ2ZvY3VzJyk7XG5cbiAgaWYgKGFjY2Vzc2liaWxpdHkgJiYgYWNjZXNzaWJpbGl0eS5waW5CdXR0b24gJiYgYWNjZXNzaWJpbGl0eS5waW5CdXR0b24gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICBhcHBseUF0dHJpYnV0ZXMocGluLCBhY2Nlc3NpYmlsaXR5LnBpbkJ1dHRvbik7XG4gIH1cblxuICBwaW4uY2xhc3NMaXN0LmFkZChcIlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0LWljb25cIikpO1xuICBwaW4uY2xhc3NMaXN0LmFkZChcIlwiLmNvbmNhdChwcmVmaXgsIFwiLWljb24tcGluXCIpKTtcbiAgcGluLmlubmVySFRNTCA9IHBpbkljb247XG4gIGF1dG9jb21wbGV0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwaW4pO1xuICBwaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgYXV0b2NvbXBsZXRlRGF0YXNldC5zb3VyY2UuY29uZmlndXJlKHtcbiAgICAgIHVzZURldmljZUxvY2F0aW9uOiB0cnVlXG4gICAgfSk7XG4gICAgYXV0b2NvbXBsZXRlSW5zdGFuY2UuZm9jdXMoKTtcbiAgICBwbGFjZXNJbnN0YW5jZS5lbWl0KCdsb2NhdGUnKTtcbiAgfSk7XG4gIGNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGF1dG9jb21wbGV0ZUluc3RhbmNlLmF1dG9jb21wbGV0ZS5zZXRWYWwoJycpO1xuICAgIGF1dG9jb21wbGV0ZUluc3RhbmNlLmZvY3VzKCk7XG4gICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBwaW4uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2NsZWFyJyk7XG4gIH0pO1xuICB2YXIgcHJldmlvdXNRdWVyeSA9ICcnO1xuXG4gIHZhciBpbnB1dExpc3RlbmVyID0gZnVuY3Rpb24gaW5wdXRMaXN0ZW5lcigpIHtcbiAgICB2YXIgcXVlcnkgPSBhdXRvY29tcGxldGVJbnN0YW5jZS52YWwoKTtcblxuICAgIGlmIChxdWVyeSA9PT0gJycpIHtcbiAgICAgIHBpbi5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICBjbGVhci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICBpZiAocHJldmlvdXNRdWVyeSAhPT0gcXVlcnkpIHtcbiAgICAgICAgcGxhY2VzSW5zdGFuY2UuZW1pdCgnY2xlYXInKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgcGluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgcHJldmlvdXNRdWVyeSA9IHF1ZXJ5O1xuICB9O1xuXG4gIGF1dG9jb21wbGV0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0XCIpKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0TGlzdGVuZXIpO1xuICB2YXIgYXV0b2NvbXBsZXRlSXNvbW9ycGhpY01ldGhvZHMgPSBbJ29wZW4nLCAnY2xvc2UnXTtcbiAgYXV0b2NvbXBsZXRlSXNvbW9ycGhpY01ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgIHBsYWNlc0luc3RhbmNlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9hdXRvY29tcGxldGVJbnN0YW5jZTtcblxuICAgICAgKF9hdXRvY29tcGxldGVJbnN0YW5jZSA9IGF1dG9jb21wbGV0ZUluc3RhbmNlLmF1dG9jb21wbGV0ZSlbbWV0aG9kTmFtZV0uYXBwbHkoX2F1dG9jb21wbGV0ZUluc3RhbmNlLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIHBsYWNlc0luc3RhbmNlLmdldFZhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXV0b2NvbXBsZXRlSW5zdGFuY2UudmFsKCk7XG4gIH07XG5cbiAgcGxhY2VzSW5zdGFuY2UuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX2F1dG9jb21wbGV0ZUluc3RhbmNlMjtcblxuICAgIGF1dG9jb21wbGV0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0XCIpKS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0TGlzdGVuZXIpO1xuXG4gICAgKF9hdXRvY29tcGxldGVJbnN0YW5jZTIgPSBhdXRvY29tcGxldGVJbnN0YW5jZS5hdXRvY29tcGxldGUpLmRlc3Ryb3kuYXBwbHkoX2F1dG9jb21wbGV0ZUluc3RhbmNlMiwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBwbGFjZXNJbnN0YW5jZS5zZXRWYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9hdXRvY29tcGxldGVJbnN0YW5jZTM7XG5cbiAgICBwcmV2aW91c1F1ZXJ5ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzBdO1xuXG4gICAgaWYgKHByZXZpb3VzUXVlcnkgPT09ICcnKSB7XG4gICAgICBwaW4uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgcGluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgKF9hdXRvY29tcGxldGVJbnN0YW5jZTMgPSBhdXRvY29tcGxldGVJbnN0YW5jZS5hdXRvY29tcGxldGUpLnNldFZhbC5hcHBseShfYXV0b2NvbXBsZXRlSW5zdGFuY2UzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHBsYWNlc0luc3RhbmNlLmF1dG9jb21wbGV0ZSA9IGF1dG9jb21wbGV0ZUluc3RhbmNlO1xuXG4gIHBsYWNlc0luc3RhbmNlLnNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcXVlcnkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICcnO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgYXV0b2NvbXBsZXRlRGF0YXNldC5zb3VyY2UocXVlcnksIHJlc29sdmUpO1xuICAgIH0pO1xuICB9O1xuXG4gIHBsYWNlc0luc3RhbmNlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChjb25maWd1cmF0aW9uKSB7XG4gICAgdmFyIHNhZmVDb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCBjb25maWd1cmF0aW9uKTtcblxuICAgIGRlbGV0ZSBzYWZlQ29uZmlnLm9uSGl0cztcbiAgICBkZWxldGUgc2FmZUNvbmZpZy5vbkVycm9yO1xuICAgIGRlbGV0ZSBzYWZlQ29uZmlnLm9uUmF0ZUxpbWl0UmVhY2hlZDtcbiAgICBkZWxldGUgc2FmZUNvbmZpZy5vbkludmFsaWRDcmVkZW50aWFscztcbiAgICBkZWxldGUgc2FmZUNvbmZpZy50ZW1wbGF0ZXM7XG4gICAgYXV0b2NvbXBsZXRlRGF0YXNldC5zb3VyY2UuY29uZmlndXJlKHNhZmVDb25maWcpO1xuICAgIHJldHVybiBwbGFjZXNJbnN0YW5jZTtcbiAgfTtcblxuICBwbGFjZXNJbnN0YW5jZS5yZXZlcnNlID0gKDAsIF9jcmVhdGVSZXZlcnNlR2VvY29kaW5nU291cmNlW1wiZGVmYXVsdFwiXSkoX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCBvcHRpb25zKSwge30sIHtcbiAgICBhbGdvbGlhc2VhcmNoOiBfYWxnb2xpYXNlYXJjaExpdGVbXCJkZWZhdWx0XCJdLFxuICAgIGZvcm1hdElucHV0VmFsdWU6IChvcHRpb25zLnRlbXBsYXRlcyB8fCB7fSkudmFsdWUsXG4gICAgb25IaXRzOiBmdW5jdGlvbiBvbkhpdHMoX3JlZjQpIHtcbiAgICAgIHZhciBoaXRzID0gX3JlZjQuaGl0cyxcbiAgICAgICAgICByYXdBbnN3ZXIgPSBfcmVmNC5yYXdBbnN3ZXIsXG4gICAgICAgICAgcXVlcnkgPSBfcmVmNC5xdWVyeTtcbiAgICAgIHJldHVybiBwbGFjZXNJbnN0YW5jZS5lbWl0KCdyZXZlcnNlJywge1xuICAgICAgICByYXdBbnN3ZXI6IHJhd0Fuc3dlcixcbiAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICBzdWdnZXN0aW9uczogaGl0c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbkVycm9yOiBmdW5jdGlvbiBvbkVycm9yKGUpIHtcbiAgICAgIHJldHVybiBwbGFjZXNJbnN0YW5jZS5lbWl0KCdlcnJvcicsIGUpO1xuICAgIH0sXG4gICAgb25SYXRlTGltaXRSZWFjaGVkOiBmdW5jdGlvbiBvblJhdGVMaW1pdFJlYWNoZWQoKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gcGxhY2VzSW5zdGFuY2UubGlzdGVuZXJDb3VudCgnbGltaXQnKTtcblxuICAgICAgaWYgKGxpc3RlbmVycyA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhfZXJyb3JzW1wiZGVmYXVsdFwiXS5yYXRlTGltaXRSZWFjaGVkKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwbGFjZXNJbnN0YW5jZS5lbWl0KCdsaW1pdCcsIHtcbiAgICAgICAgbWVzc2FnZTogX2Vycm9yc1tcImRlZmF1bHRcIl0ucmF0ZUxpbWl0UmVhY2hlZFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbkludmFsaWRDcmVkZW50aWFsczogZnVuY3Rpb24gb25JbnZhbGlkQ3JlZGVudGlhbHMoKSB7XG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmFwcElkICYmIG9wdGlvbnMuYXBwSWQuc3RhcnRzV2l0aCgncGwnKSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKF9lcnJvcnNbXCJkZWZhdWx0XCJdLmludmFsaWRDcmVkZW50aWFscyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihfZXJyb3JzW1wiZGVmYXVsdFwiXS5pbnZhbGlkQXBwSWQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgIH1cbiAgICB9XG4gIH0pKTtcbiAgcmV0dXJuIHBsYWNlc0luc3RhbmNlO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG52YXIgX2RlZmF1bHQgPSAnMS4xOS4wJztcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbWFwKG9iamVjdEtleXMob2JqKSwgZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG1hcChvYmpba10sIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbmZ1bmN0aW9uIG1hcCAoeHMsIGYpIHtcbiAgaWYgKHhzLm1hcCkgcmV0dXJuIHhzLm1hcChmKTtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzLnB1c2goZih4c1tpXSwgaSkpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmVzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc09sZElFID0gZnVuY3Rpb24gaXNPbGRJRSgpIHtcbiAgdmFyIG1lbW87XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSgpIHtcbiAgICBpZiAodHlwZW9mIG1lbW8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuICAgICAgLy8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuICAgICAgLy8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuICAgICAgLy8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG4gICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcbiAgICAgIG1lbW8gPSBCb29sZWFuKHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn0oKTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uIGdldFRhcmdldCgpIHtcbiAgdmFyIG1lbW8gPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtb1t0YXJnZXRdO1xuICB9O1xufSgpO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgdmFyIGF0dHJpYnV0ZXMgPSBvcHRpb25zLmF0dHJpYnV0ZXMgfHwge307XG5cbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIGF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5tZWRpYSA/IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIikuY29uY2F0KG9iai5jc3MsIFwifVwiKSA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCdtZWRpYScpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiBidG9hKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjAyNWZhYjM1ZjA3ODM3NjY1MTBjNzBjMTRiYWMzM2I2LmpwZ1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI2ZGM0YTY4NDRkNjkwOTc1YTYxODkyOTZmOGNjNTRlZS5qcGdcIjsiLCJpbXBvcnQgZG9tIGZyb20gJy4vanMvZG9tJztcbmltcG9ydCBldmVudHMgZnJvbSAnLi9qcy9ldmVudHMnO1xuaW1wb3J0IGF1dG9Db21wbGV0ZSBmcm9tICcuL2pzL3NlYXJjaCc7XG5pbXBvcnQgJy4vc3R5bGUvc3R5bGUuY3NzJztcblxuY29uc3QgZXZlbnQgPSBldmVudHMoKTtcbmF1dG9Db21wbGV0ZSgpO1xuY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdCcpO1xuc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQuZ2V0TG9jYXRpb24uYmluZCh0aGlzLCAnc2VhcmNoJykpO1xuXG5jb25zdCBzdWJtaXQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdDInKTtcbnN1Ym1pdDIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudC5nZXRGb3JlY2FzdC5iaW5kKHRoaXMpKTtcblxuY29uc3Qgc2VhcmNoMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gyJyk7XG5zZWFyY2gyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQuZ2V0TG9jYXRpb24uYmluZCh0aGlzLCAnc2VhcmNoQmFyJykpO1xuXG5jb25zdCBob21lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbWUnKTtcbmhvbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IGRvbSgpLnNob3coJ2FhYScpOyB9KTtcbiIsImltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XG5cbmNvbnN0IGRvbSA9IGZ1bmN0aW9uIGRvbSgpIHtcbiAgZnVuY3Rpb24gc2hvdyh2YWx1ZSkge1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB2YWx1ZSA9PT0gJ3NlYXJjaCc6XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY3Rpb24yJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHZhbHVlID09PSAnZm9yZWNhc3QnOlxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY3Rpb24yJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VjdGlvbjInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmaWxsQ2FyZChkYXRhKSB7XG4gICAgaGVscGVycygpLmFkZElubmVyVGV4dCgndGl0bGUnLCBgJHtkYXRhLm5hbWV9LCAke2RhdGEuc3lzLmNvdW50cnl9YCk7XG4gICAgaGVscGVycygpLmFkZElubmVyVGV4dCgndGVtcCcsIGA8aSBjbGFzcz1cImZhcyBmYS10aGVybW9tZXRlci1oYWxmIHRleHQtd2FybmluZyBteS0yXCI+PC9pPiBUZW1wOiAke2RhdGEubWFpbi50ZW1wfSBDZWxzaXVzYCk7XG4gICAgaGVscGVycygpLmFkZElubmVyVGV4dCgnZmVlbCcsIGA8aSBjbGFzcz1cImZhcyBmYS1tZXRlb3IgdGV4dC13YXJuaW5nIG15LTJcIj48L2k+IEZlZWw6ICR7ZGF0YS5tYWluLmZlZWxzX2xpa2V9IENlbHNpdXNgKTtcbiAgICBoZWxwZXJzKCkuYWRkSW5uZXJUZXh0KCdkZXNjJywgYDxpIGNsYXNzPVwiZmFzIGZhLWNsb3VkLXN1bi1yYWluIHRleHQtd2FybmluZyBteS0yXCI+PC9pPiAke2RhdGEud2VhdGhlclswXS5tYWlufWApO1xuICAgIGhlbHBlcnMoKS5hZGRJbm5lclRleHQoJ3ByZXNzdXJlJywgYDxpIGNsYXNzPVwiZmFzIGZhLWNvbXByZXNzLWFycm93cy1hbHQgdGV4dC13YXJuaW5nIG15LTJcIj48L2k+IFByZXNzdXJlOiAke2RhdGEubWFpbi5wcmVzc3VyZX0gaFBhYCk7XG4gICAgaGVscGVycygpLmFkZElubmVyVGV4dCgnaHVtaWRpdHknLCBgPGkgY2xhc3M9XCJmYXMgZmEtcGVyY2VudCB0ZXh0LXdhcm5pbmcgbXktMlwiPjwvaT4gSHVtaWRpdHk6ICR7ZGF0YS5tYWluLmh1bWlkaXR5fSVgKTtcbiAgICBoZWxwZXJzKCkuYWRkSW5uZXJUZXh0KCdtaW5UZW1wJywgYDxpIGNsYXNzPVwiZmFzIGZhLXRlbXBlcmF0dXJlLWxvdyB0ZXh0LXdhcm5pbmcgbXktMlwiPjwvaT4gTWluOiAke2RhdGEubWFpbi50ZW1wX21pbn0gQ2Vsc2l1c2ApO1xuICAgIGhlbHBlcnMoKS5hZGRJbm5lclRleHQoJ21heFRlbXAnLCBgPGkgY2xhc3M9XCJmYXMgZmEtdGVtcGVyYXR1cmUtaGlnaCB0ZXh0LXdhcm5pbmcgbXktMlwiPjwvaT4gTWF4OiAke2RhdGEubWFpbi50ZW1wX21heH0gQ2Vsc2l1c2ApO1xuICAgIGhlbHBlcnMoKS5hZGRJbm5lclRleHQoJ3dpbmQnLCBgPGkgY2xhc3M9XCJmYXMgZmEtd2luZCB0ZXh0LXdhcm5pbmcgbXktMlwiPjwvaT4gJHtkYXRhLndpbmQuc3BlZWR9IG1ldGVyL3NlY2ApO1xuICAgIGhlbHBlcnMoKS5hZGRJbm5lclRleHQoJ3dpbmREaXInLCBgPGkgY2xhc3M9XCJmYXMgZmEtY29tcGFzcyB0ZXh0LXdhcm5pbmcgbXktMlwiPjwvaT4gJHtkYXRhLndpbmQuZGVnfSBkZWdyZWVzYCk7XG4gICAgaGVscGVycygpLmFkZElubmVyVGV4dCgnY2xvdWRzJywgYDxpIGNsYXNzPVwiZmFzIGZhLWNsb3VkIHRleHQtd2FybmluZyBteS0yXCI+PC9pPiBDbG91ZHM6ICR7ZGF0YS5jbG91ZHMuYWxsfSVgKTtcbiAgICBoZWxwZXJzKCkuYWRkSW5uZXJUZXh0KCdzdW5yaXNlJywgYDxpIGNsYXNzPVwiZmFzIGZhLXN1biB0ZXh0LXdhcm5pbmcgbXktMlwiPjwvaT4gU3VucmlzZTogJHtuZXcgRGF0ZSgoZGF0YS5zeXMuc3VucmlzZSArIGRhdGEudGltZXpvbmUpICogMTAwMCkudG9VVENTdHJpbmcoKS5zbGljZSgtMTEsIC03KX0gQU1gKTtcbiAgICBoZWxwZXJzKCkuYWRkSW5uZXJUZXh0KCdzdW5zZXQnLCBgPGkgY2xhc3M9XCJmYXMgZmEtc3VuIHRleHQtd2FybmluZyBteS0yXCI+PC9pPiBTdW5zZXQ6ICR7bmV3IERhdGUoKGRhdGEuc3lzLnN1bnNldCArIGRhdGEudGltZXpvbmUpICogMTAwMCkudG9VVENTdHJpbmcoKS5zbGljZSgtMTEsIC03KX0gUE1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGltYWdlU3dpdGNoKGRhdGEsIGlkKSB7XG4gICAgY29uc3QgY29kZSA9IGRhdGEud2VhdGhlclswXS5pZDtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgY29kZSA+PSAyMDAgJiYgY29kZSA8PSAyMzI6XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi4vc3JjL2ltYWdlcy9saWdodGluZy5qcGcnKVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgY29kZSA+PSAzMDAgJiYgY29kZSA8PSAzMjE6XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi4vc3JjL2ltYWdlcy9kcml6emxlLmpwZycpXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBjb2RlID49IDUwMCAmJiBjb2RlIDw9IDUzMTpcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuLi9zcmMvaW1hZ2VzL3JhaW4uanBnJylcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGNvZGUgPj0gNjAwICYmIGNvZGUgPD0gNjIyOlxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4uL3NyYy9pbWFnZXMvc25vdy5qcGcnKVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgY29kZSA+PSA3MDEgJiYgY29kZSA8PSA3ODE6XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi4vc3JjL2ltYWdlcy9taXN0LmpwZycpXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBjb2RlID49IDgwMSAmJiBjb2RlIDw9IDgwNDpcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuLi9zcmMvaW1hZ2VzL3JhaW5jbG91ZHMuanBnJylcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGNvZGUgPT09IDgwMDpcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuLi9zcmMvaW1hZ2VzL3NoaW5pbmdzdW4uanBnJylcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4uL3NyYy9pbWFnZXMvYmx1ZXNreS5qcGcnKVwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhckZvcm1zKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2hpbmcnKS5yZXNldCgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZTZWFyY2gnKS5yZXNldCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2FyZChkYXRhKSB7XG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5TmFtZScpO1xuICAgIG5hbWUuaW5uZXJIVE1MID0gYCR7ZGF0YS5jaXR5Lm5hbWV9LCAke2RhdGEuY2l0eS5jb3VudHJ5fWA7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdycpO1xuICAgIHJvdy5pbm5lckhUTUwgPSAnJztcbiAgICBjb25zdCBmb3JlY2FzdEZpdmUgPSBkYXRhLmxpc3QuZmlsdGVyKCh2YWx1ZSwgaW5kZXgpID0+IGluZGV4ICUgOCA9PT0gMCk7XG4gICAgZm9yZWNhc3RGaXZlLmZvckVhY2goKGRheSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnQgPSBoZWxwZXJzKCkuY3JlYXRlRWxlbWVudCgnZGl2JywgJ2NvbC01Jyk7XG4gICAgICBjb25zdCBjYXJkID0gaGVscGVycygpLmNyZWF0ZUVsZW1lbnQoJ2RpdicsICdjYXJkIGJnLWRhcmsgdGV4dC13aGl0ZSB3LTEwMCBtYi0yIG14LTInKTtcbiAgICAgIGNvbnN0IGltZ0JnID0gaGVscGVycygpLmNyZWF0ZUVsZW1lbnQoJ2RpdicsICcnKTtcbiAgICAgIGltZ0JnLmlkID0gYGltYWdlcyR7aW5kZXggKyAxfWA7XG4gICAgICBpbWdCZy5zdHlsZSA9ICdiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO2JhY2tncm91bmQtcG9zaXRpb24teTogMTAwJTtoZWlnaHQ6IDc1dmg7JztcbiAgICAgIGNvbnN0IG92ZXIgPSBoZWxwZXJzKCkuY3JlYXRlRWxlbWVudCgnZGl2JywgJ2NhcmQtaW1nLW92ZXJsYXknKTtcbiAgICAgIGNvbnN0IGg1ID0gaGVscGVycygpLmNyZWF0ZUVsZW1lbnQoJ2g1JywgJ2NhcmQtdGl0bGUgdGV4dC1jZW50ZXIgdGV4dC13YXJuaW5nJyk7XG4gICAgICBoNS5pbm5lckhUTUwgPSBkYXkuZHRfdHh0LnNsaWNlKDAsIC05KTtcbiAgICAgIGNvbnN0IGxpc3RDb250ID0gaGVscGVycygpLmNyZWF0ZUVsZW1lbnQoJ2RpdicsICdkLWZsZXggZmxleC1yb3cganVzdGlmeS1jb250ZW50LWFyb3VuZCcpO1xuICAgICAgY29uc3QgdWwxID0gaGVscGVycygpLmNyZWF0ZUVsZW1lbnQoJ3VsJywgJ2xpc3QtZ3JvdXAgbGlzdC11bnN0eWxlZCcpO1xuICAgICAgY29uc3QgdWwyID0gaGVscGVycygpLmNyZWF0ZUVsZW1lbnQoJ3VsJywgJ2xpc3QtZ3JvdXAgbGlzdC11bnN0eWxlZCcpO1xuICAgICAgY29uc3QgdGVtcCA9IGhlbHBlcnMoKS5jcmVhdGVFbGVtZW50V2l0aElubmVyVGV4dCgnbGknLCAnbGlzdC1ncm91cC1pdGVtJywgYDxpIGNsYXNzPVwiZmFzIGZhLXRoZXJtb21ldGVyLWhhbGYgdGV4dC13YXJuaW5nIG15LTJcIj48L2k+IFRlbXA6ICR7ZGF5Lm1haW4udGVtcH0gQ2Vsc2l1c2ApO1xuICAgICAgY29uc3QgZmVlbCA9IGhlbHBlcnMoKS5jcmVhdGVFbGVtZW50V2l0aElubmVyVGV4dCgnbGknLCAnbGlzdC1ncm91cC1pdGVtJywgYDxpIGNsYXNzPVwiZmFzIGZhLW1ldGVvciB0ZXh0LXdhcm5pbmcgbXktMlwiPjwvaT4gRmVlbDogJHtkYXkubWFpbi5mZWVsc19saWtlfSBDZWxzaXVzYCk7XG4gICAgICBjb25zdCBwcmVzc3VyZSA9IGhlbHBlcnMoKS5jcmVhdGVFbGVtZW50V2l0aElubmVyVGV4dCgnbGknLCAnbGlzdC1ncm91cC1pdGVtJywgYDxpIGNsYXNzPVwiZmFzIGZhLWNvbXByZXNzLWFycm93cy1hbHQgdGV4dC13YXJuaW5nIG15LTJcIj48L2k+IFByZXNzdXJlOiAke2RheS5tYWluLnByZXNzdXJlfSBoUGFgKTtcbiAgICAgIGNvbnN0IGh1bWlkaXR5ID0gaGVscGVycygpLmNyZWF0ZUVsZW1lbnRXaXRoSW5uZXJUZXh0KCdsaScsICdsaXN0LWdyb3VwLWl0ZW0nLCBgPGkgY2xhc3M9XCJmYXMgZmEtcGVyY2VudCB0ZXh0LXdhcm5pbmcgbXktMlwiPjwvaT4gSHVtaWRpdHk6ICR7ZGF5Lm1haW4uaHVtaWRpdHl9JWApO1xuICAgICAgY29uc3QgZGVzYyA9IGhlbHBlcnMoKS5jcmVhdGVFbGVtZW50V2l0aElubmVyVGV4dCgnbGknLCAnbGlzdC1ncm91cC1pdGVtJywgYDxpIGNsYXNzPVwiZmFzIGZhLWNsb3VkLXN1bi1yYWluIHRleHQtd2FybmluZyBteS0yXCI+PC9pPiAke2RheS53ZWF0aGVyWzBdLm1haW59YCk7XG4gICAgICBjb25zdCBtaW5UZW1wID0gaGVscGVycygpLmNyZWF0ZUVsZW1lbnRXaXRoSW5uZXJUZXh0KCdsaScsICdsaXN0LWdyb3VwLWl0ZW0nLCBgPGkgY2xhc3M9XCJmYXMgZmEtdGVtcGVyYXR1cmUtbG93IHRleHQtd2FybmluZyBteS0yXCI+PC9pPiBNaW46ICR7ZGF5Lm1haW4udGVtcF9taW59IENlbHNpdXNgKTtcbiAgICAgIGNvbnN0IG1heFRlbXAgPSBoZWxwZXJzKCkuY3JlYXRlRWxlbWVudFdpdGhJbm5lclRleHQoJ2xpJywgJ2xpc3QtZ3JvdXAtaXRlbScsIGA8aSBjbGFzcz1cImZhcyBmYS10ZW1wZXJhdHVyZS1oaWdoIHRleHQtd2FybmluZyBteS0yXCI+PC9pPiBNYXg6ICR7ZGF5Lm1haW4udGVtcF9tYXh9IENlbHNpdXNgKTtcbiAgICAgIGNvbnN0IGNsb3VkcyA9IGhlbHBlcnMoKS5jcmVhdGVFbGVtZW50V2l0aElubmVyVGV4dCgnbGknLCAnbGlzdC1ncm91cC1pdGVtJywgYDxpIGNsYXNzPVwiZmFzIGZhLWNsb3VkIHRleHQtd2FybmluZyBteS0yXCI+PC9pPiBDbG91ZHM6ICR7ZGF5LmNsb3Vkcy5hbGx9JWApO1xuICAgICAgY29uc3Qgd2luZCA9IGhlbHBlcnMoKS5jcmVhdGVFbGVtZW50V2l0aElubmVyVGV4dCgnbGknLCAnbGlzdC1ncm91cC1pdGVtJywgYDxpIGNsYXNzPVwiZmFzIGZhLXdpbmQgdGV4dC13YXJuaW5nIG15LTJcIj48L2k+ICR7ZGF5LndpbmQuc3BlZWR9IG1ldGVyL3NlY2ApO1xuICAgICAgY29uc3Qgd2luZERpciA9IGhlbHBlcnMoKS5jcmVhdGVFbGVtZW50V2l0aElubmVyVGV4dCgnbGknLCAnbGlzdC1ncm91cC1pdGVtJywgYDxpIGNsYXNzPVwiZmFzIGZhLWNvbXBhc3MgdGV4dC13YXJuaW5nIG15LTJcIj48L2k+ICR7ZGF5LndpbmQuZGVnfSBkZWdyZWVzYCk7XG4gICAgICBjb25zdCBjb2xvciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xpc3QtZ3JvdXAtaXRlbScpO1xuXG4gICAgICB1bDIuYXBwZW5kQ2hpbGQobWluVGVtcCk7XG4gICAgICB1bDIuYXBwZW5kQ2hpbGQobWF4VGVtcCk7XG4gICAgICB1bDIuYXBwZW5kQ2hpbGQod2luZCk7XG4gICAgICB1bDIuYXBwZW5kQ2hpbGQod2luZERpcik7XG4gICAgICB1bDIuYXBwZW5kQ2hpbGQoY2xvdWRzKTtcblxuICAgICAgdWwxLmFwcGVuZENoaWxkKHRlbXApO1xuICAgICAgdWwxLmFwcGVuZENoaWxkKGZlZWwpO1xuICAgICAgdWwxLmFwcGVuZENoaWxkKGRlc2MpO1xuICAgICAgdWwxLmFwcGVuZENoaWxkKHByZXNzdXJlKTtcbiAgICAgIHVsMS5hcHBlbmRDaGlsZChodW1pZGl0eSk7XG5cbiAgICAgIGxpc3RDb250LmFwcGVuZENoaWxkKHVsMSk7XG4gICAgICBsaXN0Q29udC5hcHBlbmRDaGlsZCh1bDIpO1xuXG4gICAgICBvdmVyLmFwcGVuZENoaWxkKGg1KTtcbiAgICAgIG92ZXIuYXBwZW5kQ2hpbGQobGlzdENvbnQpO1xuXG4gICAgICBjYXJkLmFwcGVuZENoaWxkKGltZ0JnKTtcbiAgICAgIGNhcmQuYXBwZW5kQ2hpbGQob3Zlcik7XG5cbiAgICAgIGNvbnQuYXBwZW5kQ2hpbGQoY2FyZCk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY29udCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3IubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29sb3JbaV0uc3R5bGUgPSAnYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjEpOyc7XG4gICAgICB9XG5cblxuICAgICAgaW1hZ2VTd2l0Y2goZGF5LCAoYGltYWdlcyR7aW5kZXggKyAxfWApKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgYXN5bmMgZnVuY3Rpb24gY29udmVydGVyKGRhdGEpIHtcbiAgICBjb25zdCBkYXRhMiA9IGF3YWl0IGhlbHBlcnMoKS5nZXRGYWhyZW5oZWl0KGRhdGEubmFtZSk7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wJykuaW5uZXJIVE1MLmluY2x1ZGVzKCcgQ2Vsc2l1cycpKSB7XG4gICAgICBoZWxwZXJzKCkuYWRkSW5uZXJUZXh0KCd0ZW1wJywgYDxpIGNsYXNzPVwiZmFzIGZhLXRoZXJtb21ldGVyLWhhbGYgdGV4dC13YXJuaW5nIG15LTJcIj48L2k+IFRlbXA6ICR7ZGF0YTIubWFpbi50ZW1wfSAmIzg0NTdgKTtcbiAgICAgIGhlbHBlcnMoKS5hZGRJbm5lclRleHQoJ2ZlZWwnLCBgPGkgY2xhc3M9XCJmYXMgZmEtbWV0ZW9yIHRleHQtd2FybmluZyBteS0yXCI+PC9pPiBGZWVsOiAke2RhdGEyLm1haW4uZmVlbHNfbGlrZX0gJiM4NDU3YCk7XG4gICAgICBoZWxwZXJzKCkuYWRkSW5uZXJUZXh0KCdtaW5UZW1wJywgYDxpIGNsYXNzPVwiZmFzIGZhLXRlbXBlcmF0dXJlLWxvdyB0ZXh0LXdhcm5pbmcgbXktMlwiPjwvaT4gTWluOiAke2RhdGEyLm1haW4udGVtcF9taW59ICYjODQ1N2ApO1xuICAgICAgaGVscGVycygpLmFkZElubmVyVGV4dCgnbWF4VGVtcCcsIGA8aSBjbGFzcz1cImZhcyBmYS10ZW1wZXJhdHVyZS1oaWdoIHRleHQtd2FybmluZyBteS0yXCI+PC9pPiBNYXg6ICR7ZGF0YTIubWFpbi50ZW1wX21heH0gJiM4NDU3YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlbHBlcnMoKS5hZGRJbm5lclRleHQoJ3RlbXAnLCBgPGkgY2xhc3M9XCJmYXMgZmEtdGhlcm1vbWV0ZXItaGFsZiB0ZXh0LXdhcm5pbmcgbXktMlwiPjwvaT4gVGVtcDogJHtkYXRhLm1haW4udGVtcH0gQ2Vsc2l1c2ApO1xuICAgICAgaGVscGVycygpLmFkZElubmVyVGV4dCgnZmVlbCcsIGA8aSBjbGFzcz1cImZhcyBmYS1tZXRlb3IgdGV4dC13YXJuaW5nIG15LTJcIj48L2k+IEZlZWw6ICR7ZGF0YS5tYWluLmZlZWxzX2xpa2V9IENlbHNpdXNgKTtcbiAgICAgIGhlbHBlcnMoKS5hZGRJbm5lclRleHQoJ21pblRlbXAnLCBgPGkgY2xhc3M9XCJmYXMgZmEtdGVtcGVyYXR1cmUtbG93IHRleHQtd2FybmluZyBteS0yXCI+PC9pPiBNaW46ICR7ZGF0YS5tYWluLnRlbXBfbWlufSBDZWxzaXVzYCk7XG4gICAgICBoZWxwZXJzKCkuYWRkSW5uZXJUZXh0KCdtYXhUZW1wJywgYDxpIGNsYXNzPVwiZmFzIGZhLXRlbXBlcmF0dXJlLWhpZ2ggdGV4dC13YXJuaW5nIG15LTJcIj48L2k+IE1heDogJHtkYXRhLm1haW4udGVtcF9tYXh9IENlbHNpdXNgKTtcbiAgICB9XG4gIH1cblxuXG4gIHJldHVybiB7XG4gICAgc2hvdywgZmlsbENhcmQsIGltYWdlU3dpdGNoLCBjcmVhdGVDYXJkLCBjbGVhckZvcm1zLCBjb252ZXJ0ZXIsXG4gIH07XG59O1xuXG5leHBvcnQgeyBkb20gYXMgZGVmYXVsdCB9OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWFsZXJ0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuY29uc3QgZXZlbnRzID0gZnVuY3Rpb24gZXZlbnRzKCkge1xuICBmdW5jdGlvbiBzaG93RmxvdyhkYXRhKSB7XG4gICAgZG9tKCkuY2xlYXJGb3JtcygpO1xuICAgIGRvbSgpLmZpbGxDYXJkKGRhdGEpO1xuICAgIGRvbSgpLmltYWdlU3dpdGNoKGRhdGEsICdpbWFnZScpO1xuICAgIGRvbSgpLnNob3coJ3NlYXJjaCcpO1xuXG4gICAgY29uc3QgZmFyQ2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhckNlbCcpO1xuICAgIGZhckNlbC5vbmNsaWNrID0gZnVuY3Rpb24gY2hhbmdlVGVtcCgpIHsgZG9tKCkuY29udmVydGVyKGRhdGEpOyB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yZWNhc3RGbG93KGRhdGEpIHtcbiAgICBkb20oKS5jbGVhckZvcm1zKCk7XG4gICAgZG9tKCkuY3JlYXRlQ2FyZChkYXRhKTtcbiAgICBkb20oKS5zaG93KCdmb3JlY2FzdCcpO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0U2VhcmNoKGNpdHkpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZBUFBJRD05MDM1MDdmMTdkNzA3ZmVjZDM1MmQzODMwMWVmYmE3NyZ1bml0cz1tZXRyaWNgO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHsgbW9kZTogJ2NvcnMnIH0pO1xuICAgICAgY29uc3QgY2l0eURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBzaG93RmxvdyhjaXR5RGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKTtcbiAgICAgIGFsZXJ0KCdDb3VsZCBub3QgZmluZCB0aGUgbG9jYXRpb24nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMb2NhdGlvbihzZWFyY2hCYXIpIHtcbiAgICBjb25zdCBjaXR5ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlYXJjaEJhcikudmFsdWUpLnRvTG93ZXJDYXNlKCk7XG4gICAgZ2V0U2VhcmNoKGNpdHkpO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gnKS52YWx1ZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke3ZhbHVlfSZ1bml0cz1tZXRyaWMmYXBwaWQ9OTAzNTA3ZjE3ZDcwN2ZlY2QzNTJkMzgzMDFlZmJhNzdgO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHsgbW9kZTogJ2NvcnMnIH0pO1xuICAgICAgY29uc3QgY2l0eURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBmb3JlY2FzdEZsb3coY2l0eURhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XG4gICAgICBhbGVydCgnQ291bGQgbm90IGZpbmQgdGhlIGxvY2F0aW9uJyk7XG4gICAgfVxuICB9XG5cblxuICByZXR1cm4ge1xuICAgIGdldFNlYXJjaCwgc2hvd0Zsb3csIGdldEZvcmVjYXN0LCBnZXRMb2NhdGlvbixcbiAgfTtcbn07XG5cbmV4cG9ydCB7IGV2ZW50cyBhcyBkZWZhdWx0IH07IiwiLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWFsZXJ0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbmNvbnN0IGhlbHBlcnMgPSBmdW5jdGlvbiBoZWxwZXJzKCkge1xuICBjb25zdCBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTmFtZSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlRWxlbWVudFdpdGhJbm5lclRleHQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50V2l0aElubmVyVGV4dCh0YWcsIGNsYXNzTmFtZSwgdGV4dCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9O1xuXG4gIGNvbnN0IGFkZElubmVyVGV4dCA9IGZ1bmN0aW9uIGFkZElubmVyVGV4dChjbGFzc05hbWUsIHRleHQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2xhc3NOYW1lKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG4gICAgcmV0dXJuIGVsZW1lbnQuaW5uZXJIVE1MO1xuICB9O1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGdldEZhaHJlbmhlaXQoY2l0eSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JkFQUElEPTkwMzUwN2YxN2Q3MDdmZWNkMzUyZDM4MzAxZWZiYTc3JnVuaXRzPWltcGVyaWFsYDtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7IG1vZGU6ICdjb3JzJyB9KTtcbiAgICAgIGNvbnN0IGNpdHlGYWhyID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgcmV0dXJuIGNpdHlGYWhyO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XG4gICAgICBhbGVydCgnQ291bGQgbm90IGZpbmQgdGhlIGxvY2F0aW9uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRJbm5lclRleHQsIGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZUVsZW1lbnRXaXRoSW5uZXJUZXh0LCBnZXRGYWhyZW5oZWl0LFxuICB9O1xufTtcblxuXG5leHBvcnQgeyBoZWxwZXJzIGFzIGRlZmF1bHQgfTsiLCJjb25zdCBwbGFjZXMgPSByZXF1aXJlKCdwbGFjZXMuanMnKTtcblxuZnVuY3Rpb24gYXV0b0NvbXBsZXRlKCkge1xuICBjb25zdCBLRVkgPSAnZjcwOTNlNzg1M2JlNDkzZTQwN2Q0NmE0MzRmOWM1NGInO1xuICBjb25zdCBJRCA9ICdwbEJBS1lVR1kyRkknO1xuICBjb25zdCBwbGFjZXNBdXRvY29tcGxldGUgPSBwbGFjZXMoe1xuICAgIGFwcElkOiBJRCxcbiAgICBhcGlLZXk6IEtFWSxcbiAgICBjb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gnKSxcbiAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgIHZhbHVlKHN1Z2dlc3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHN1Z2dlc3Rpb24ubmFtZTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSkuY29uZmlndXJlKHtcbiAgICB0eXBlOiAnY2l0eScsXG4gICAgYXJvdW5kTGF0TG5nVmlhSVA6IHRydWUsXG4gIH0pO1xuICByZXR1cm4gcGxhY2VzQXV0b2NvbXBsZXRlO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGF1dG9Db21wbGV0ZTsiLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9