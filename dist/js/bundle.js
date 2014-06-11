(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var GameCtrl = function($scope, Status, $location) {
  $scope.cards = [0,0,0,0,0,0,0,0,0];
  $scope.unique = Math.floor((Math.random()*9));
  $scope.cards[$scope.unique] = 1;
  $scope.selects = [];

  $scope.select = function(id) {
  	if ($scope.selects.length < 3) {
  		if ($scope.selects.indexOf(id) == -1) {
  			$scope.selects.push(id);

        if ($scope.cards[id] == 1) {
          Status.setStatus(true);
          $location.path('/gameover');
        } else if ($scope.selects.length == 3) {
          Status.setStatus(false);
          $location.path('/gameover');
        }
      }
  	} 
  }
};

module.exports = GameCtrl;
}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/controllers\\GameCtrl.js","/controllers")
},{"buffer":9,"ngpmcQ":12}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var GameoverCtrl = function($scope, Status, $location) {
  $scope.status = Status.getStatus();
};

module.exports = GameoverCtrl;
}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/controllers\\GameoverCtrl.js","/controllers")
},{"buffer":9,"ngpmcQ":12}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var angular = require('angular');
var GameCtrl = require('./controllers/GameCtrl');
var GameoverCtrl = require('./controllers/GameoverCtrl');
var Status = require('./services/Status');
require('./routes');

var app = angular.module('myApp', ['myApp.routes']);
app.controller('GameCtrl', GameCtrl);
app.controller('GameoverCtrl', GameoverCtrl);
app.factory('Status', Status);
}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_75922d4c.js","/")
},{"./controllers/GameCtrl":1,"./controllers/GameoverCtrl":2,"./routes":4,"./services/Status":5,"angular":7,"buffer":9,"ngpmcQ":12}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var angular = require('angular');
require('angular-route');

angular.module('myApp.routes', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {

		$routeProvider.when('/game', {
			templateUrl: 'views/game.html',
			controller: 'GameCtrl'
		});

		$routeProvider.when('/gameover', {
			templateUrl: 'views/gameover.html',
			controller: 'GameoverCtrl'
		});

		$routeProvider.otherwise({redirectTo: '/game'});
	}]);
}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/routes.js","/")
},{"angular":7,"angular-route":6,"buffer":9,"ngpmcQ":12}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var Status = function() {
  	var status = false;
    return {
    	getStatus: function() {
    		return status;
    	},
    	setStatus: function(val) {
    		status = val;
    	}
    };
};

module.exports = Status;
}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services\\Status.js","/services")
},{"buffer":9,"ngpmcQ":12}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * @license AngularJS v1.2.17-build.163+sha.fafcd62
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc module
 * @name ngRoute
 * @description
 *
 * # ngRoute
 *
 * The `ngRoute` module provides routing and deeplinking services and directives for angular apps.
 *
 * ## Example
 * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.
 *
 *
 * <div doc-module-components="ngRoute"></div>
 */
 /* global -ngRouteModule */
var ngRouteModule = angular.module('ngRoute', ['ng']).
                        provider('$route', $RouteProvider);

/**
 * @ngdoc provider
 * @name $routeProvider
 * @function
 *
 * @description
 *
 * Used for configuring routes.
 *
 * ## Example
 * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.
 *
 * ## Dependencies
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 */
function $RouteProvider(){
  function inherit(parent, extra) {
    return angular.extend(new (angular.extend(function() {}, {prototype:parent}))(), extra);
  }

  var routes = {};

  /**
   * @ngdoc method
   * @name $routeProvider#when
   *
   * @param {string} path Route path (matched against `$location.path`). If `$location.path`
   *    contains redundant trailing slash or is missing one, the route will still match and the
   *    `$location.path` will be updated to add or drop the trailing slash to exactly match the
   *    route definition.
   *
   *    * `path` can contain named groups starting with a colon: e.g. `:name`. All characters up
   *        to the next slash are matched and stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain named groups starting with a colon and ending with a star:
   *        e.g.`:name*`. All characters are eagerly stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain optional named groups with a question mark: e.g.`:name?`.
   *
   *    For example, routes like `/color/:color/largecode/:largecode*\/edit` will match
   *    `/color/brown/largecode/code/with/slashes/edit` and extract:
   *
   *    * `color: brown`
   *    * `largecode: code/with/slashes`.
   *
   *
   * @param {Object} route Mapping information to be assigned to `$route.current` on route
   *    match.
   *
   *    Object properties:
   *
   *    - `controller` – `{(string|function()=}` – Controller fn that should be associated with
   *      newly created scope or the name of a {@link angular.Module#controller registered
   *      controller} if passed as a string.
   *    - `controllerAs` – `{string=}` – A controller alias name. If present the controller will be
   *      published to scope under the `controllerAs` name.
   *    - `template` – `{string=|function()=}` – html template as a string or a function that
   *      returns an html template as a string which should be used by {@link
   *      ngRoute.directive:ngView ngView} or {@link ng.directive:ngInclude ngInclude} directives.
   *      This property takes precedence over `templateUrl`.
   *
   *      If `template` is a function, it will be called with the following parameters:
   *
   *      - `{Array.<Object>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `templateUrl` – `{string=|function()=}` – path or function that returns a path to an html
   *      template that should be used by {@link ngRoute.directive:ngView ngView}.
   *
   *      If `templateUrl` is a function, it will be called with the following parameters:
   *
   *      - `{Array.<Object>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `resolve` - `{Object.<string, function>=}` - An optional map of dependencies which should
   *      be injected into the controller. If any of these dependencies are promises, the router
   *      will wait for them all to be resolved or one to be rejected before the controller is
   *      instantiated.
   *      If all the promises are resolved successfully, the values of the resolved promises are
   *      injected and {@link ngRoute.$route#$routeChangeSuccess $routeChangeSuccess} event is
   *      fired. If any of the promises are rejected the
   *      {@link ngRoute.$route#$routeChangeError $routeChangeError} event is fired. The map object
   *      is:
   *
   *      - `key` – `{string}`: a name of a dependency to be injected into the controller.
   *      - `factory` - `{string|function}`: If `string` then it is an alias for a service.
   *        Otherwise if function, then it is {@link auto.$injector#invoke injected}
   *        and the return value is treated as the dependency. If the result is a promise, it is
   *        resolved before its value is injected into the controller. Be aware that
   *        `ngRoute.$routeParams` will still refer to the previous route within these resolve
   *        functions.  Use `$route.current.params` to access the new route parameters, instead.
   *
   *    - `redirectTo` – {(string|function())=} – value to update
   *      {@link ng.$location $location} path with and trigger route redirection.
   *
   *      If `redirectTo` is a function, it will be called with the following parameters:
   *
   *      - `{Object.<string>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route templateUrl.
   *      - `{string}` - current `$location.path()`
   *      - `{Object}` - current `$location.search()`
   *
   *      The custom `redirectTo` function is expected to return a string which will be used
   *      to update `$location.path()` and `$location.search()`.
   *
   *    - `[reloadOnSearch=true]` - {boolean=} - reload route when only `$location.search()`
   *      or `$location.hash()` changes.
   *
   *      If the option is set to `false` and url in the browser changes, then
   *      `$routeUpdate` event is broadcasted on the root scope.
   *
   *    - `[caseInsensitiveMatch=false]` - {boolean=} - match routes without being case sensitive
   *
   *      If the option is set to `true`, then the particular route can be matched without being
   *      case sensitive
   *
   * @returns {Object} self
   *
   * @description
   * Adds a new route definition to the `$route` service.
   */
  this.when = function(path, route) {
    routes[path] = angular.extend(
      {reloadOnSearch: true},
      route,
      path && pathRegExp(path, route)
    );

    // create redirection for trailing slashes
    if (path) {
      var redirectPath = (path[path.length-1] == '/')
            ? path.substr(0, path.length-1)
            : path +'/';

      routes[redirectPath] = angular.extend(
        {redirectTo: path},
        pathRegExp(redirectPath, route)
      );
    }

    return this;
  };

   /**
    * @param path {string} path
    * @param opts {Object} options
    * @return {?Object}
    *
    * @description
    * Normalizes the given path, returning a regular expression
    * and the original path.
    *
    * Inspired by pathRexp in visionmedia/express/lib/utils.js.
    */
  function pathRegExp(path, opts) {
    var insensitive = opts.caseInsensitiveMatch,
        ret = {
          originalPath: path,
          regexp: path
        },
        keys = ret.keys = [];

    path = path
      .replace(/([().])/g, '\\$1')
      .replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option){
        var optional = option === '?' ? option : null;
        var star = option === '*' ? option : null;
        keys.push({ name: key, optional: !!optional });
        slash = slash || '';
        return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (star && '(.+?)' || '([^/]+)')
          + (optional || '')
          + ')'
          + (optional || '');
      })
      .replace(/([\/$\*])/g, '\\$1');

    ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
    return ret;
  }

  /**
   * @ngdoc method
   * @name $routeProvider#otherwise
   *
   * @description
   * Sets route definition that will be used on route change when no other route definition
   * is matched.
   *
   * @param {Object} params Mapping information to be assigned to `$route.current`.
   * @returns {Object} self
   */
  this.otherwise = function(params) {
    this.when(null, params);
    return this;
  };


  this.$get = ['$rootScope',
               '$location',
               '$routeParams',
               '$q',
               '$injector',
               '$http',
               '$templateCache',
               '$sce',
      function($rootScope, $location, $routeParams, $q, $injector, $http, $templateCache, $sce) {

    /**
     * @ngdoc service
     * @name $route
     * @requires $location
     * @requires $routeParams
     *
     * @property {Object} current Reference to the current route definition.
     * The route definition contains:
     *
     *   - `controller`: The controller constructor as define in route definition.
     *   - `locals`: A map of locals which is used by {@link ng.$controller $controller} service for
     *     controller instantiation. The `locals` contain
     *     the resolved values of the `resolve` map. Additionally the `locals` also contain:
     *
     *     - `$scope` - The current route scope.
     *     - `$template` - The current route template HTML.
     *
     * @property {Object} routes Object with all route configuration Objects as its properties.
     *
     * @description
     * `$route` is used for deep-linking URLs to controllers and views (HTML partials).
     * It watches `$location.url()` and tries to map the path to an existing route definition.
     *
     * Requires the {@link ngRoute `ngRoute`} module to be installed.
     *
     * You can define routes through {@link ngRoute.$routeProvider $routeProvider}'s API.
     *
     * The `$route` service is typically used in conjunction with the
     * {@link ngRoute.directive:ngView `ngView`} directive and the
     * {@link ngRoute.$routeParams `$routeParams`} service.
     *
     * @example
     * This example shows how changing the URL hash causes the `$route` to match a route against the
     * URL, and the `ngView` pulls in the partial.
     *
     * Note that this example is using {@link ng.directive:script inlined templates}
     * to get it working on jsfiddle as well.
     *
     * <example name="$route-service" module="ngRouteExample"
     *          deps="angular-route.js" fixBase="true">
     *   <file name="index.html">
     *     <div ng-controller="MainController">
     *       Choose:
     *       <a href="Book/Moby">Moby</a> |
     *       <a href="Book/Moby/ch/1">Moby: Ch1</a> |
     *       <a href="Book/Gatsby">Gatsby</a> |
     *       <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
     *       <a href="Book/Scarlet">Scarlet Letter</a><br/>
     *
     *       <div ng-view></div>
     *
     *       <hr />
     *
     *       <pre>$location.path() = {{$location.path()}}</pre>
     *       <pre>$route.current.templateUrl = {{$route.current.templateUrl}}</pre>
     *       <pre>$route.current.params = {{$route.current.params}}</pre>
     *       <pre>$route.current.scope.name = {{$route.current.scope.name}}</pre>
     *       <pre>$routeParams = {{$routeParams}}</pre>
     *     </div>
     *   </file>
     *
     *   <file name="book.html">
     *     controller: {{name}}<br />
     *     Book Id: {{params.bookId}}<br />
     *   </file>
     *
     *   <file name="chapter.html">
     *     controller: {{name}}<br />
     *     Book Id: {{params.bookId}}<br />
     *     Chapter Id: {{params.chapterId}}
     *   </file>
     *
     *   <file name="script.js">
     *     angular.module('ngRouteExample', ['ngRoute'])
     *
     *      .controller('MainController', function($scope, $route, $routeParams, $location) {
     *          $scope.$route = $route;
     *          $scope.$location = $location;
     *          $scope.$routeParams = $routeParams;
     *      })
     *
     *      .controller('BookController', function($scope, $routeParams) {
     *          $scope.name = "BookController";
     *          $scope.params = $routeParams;
     *      })
     *
     *      .controller('ChapterController', function($scope, $routeParams) {
     *          $scope.name = "ChapterController";
     *          $scope.params = $routeParams;
     *      })
     *
     *     .config(function($routeProvider, $locationProvider) {
     *       $routeProvider
     *        .when('/Book/:bookId', {
     *         templateUrl: 'book.html',
     *         controller: 'BookController',
     *         resolve: {
     *           // I will cause a 1 second delay
     *           delay: function($q, $timeout) {
     *             var delay = $q.defer();
     *             $timeout(delay.resolve, 1000);
     *             return delay.promise;
     *           }
     *         }
     *       })
     *       .when('/Book/:bookId/ch/:chapterId', {
     *         templateUrl: 'chapter.html',
     *         controller: 'ChapterController'
     *       });
     *
     *       // configure html5 to get links working on jsfiddle
     *       $locationProvider.html5Mode(true);
     *     });
     *
     *   </file>
     *
     *   <file name="protractor.js" type="protractor">
     *     it('should load and compile correct template', function() {
     *       element(by.linkText('Moby: Ch1')).click();
     *       var content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: ChapterController/);
     *       expect(content).toMatch(/Book Id\: Moby/);
     *       expect(content).toMatch(/Chapter Id\: 1/);
     *
     *       element(by.partialLinkText('Scarlet')).click();
     *
     *       content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: BookController/);
     *       expect(content).toMatch(/Book Id\: Scarlet/);
     *     });
     *   </file>
     * </example>
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeStart
     * @eventType broadcast on root scope
     * @description
     * Broadcasted before a route change. At this  point the route services starts
     * resolving all of the dependencies needed for the route change to occur.
     * Typically this involves fetching the view template as well as any dependencies
     * defined in `resolve` route property. Once  all of the dependencies are resolved
     * `$routeChangeSuccess` is fired.
     *
     * @param {Object} angularEvent Synthetic event object.
     * @param {Route} next Future route information.
     * @param {Route} current Current route information.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeSuccess
     * @eventType broadcast on root scope
     * @description
     * Broadcasted after a route dependencies are resolved.
     * {@link ngRoute.directive:ngView ngView} listens for the directive
     * to instantiate the controller and render the view.
     *
     * @param {Object} angularEvent Synthetic event object.
     * @param {Route} current Current route information.
     * @param {Route|Undefined} previous Previous route information, or undefined if current is
     * first route entered.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeError
     * @eventType broadcast on root scope
     * @description
     * Broadcasted if any of the resolve promises are rejected.
     *
     * @param {Object} angularEvent Synthetic event object
     * @param {Route} current Current route information.
     * @param {Route} previous Previous route information.
     * @param {Route} rejection Rejection of the promise. Usually the error of the failed promise.
     */

    /**
     * @ngdoc event
     * @name $route#$routeUpdate
     * @eventType broadcast on root scope
     * @description
     *
     * The `reloadOnSearch` property has been set to false, and we are reusing the same
     * instance of the Controller.
     */

    var forceReload = false,
        $route = {
          routes: routes,

          /**
           * @ngdoc method
           * @name $route#reload
           *
           * @description
           * Causes `$route` service to reload the current route even if
           * {@link ng.$location $location} hasn't changed.
           *
           * As a result of that, {@link ngRoute.directive:ngView ngView}
           * creates new scope, reinstantiates the controller.
           */
          reload: function() {
            forceReload = true;
            $rootScope.$evalAsync(updateRoute);
          }
        };

    $rootScope.$on('$locationChangeSuccess', updateRoute);

    return $route;

    /////////////////////////////////////////////////////

    /**
     * @param on {string} current url
     * @param route {Object} route regexp to match the url against
     * @return {?Object}
     *
     * @description
     * Check if the route matches the current url.
     *
     * Inspired by match in
     * visionmedia/express/lib/router/router.js.
     */
    function switchRouteMatcher(on, route) {
      var keys = route.keys,
          params = {};

      if (!route.regexp) return null;

      var m = route.regexp.exec(on);
      if (!m) return null;

      for (var i = 1, len = m.length; i < len; ++i) {
        var key = keys[i - 1];

        var val = 'string' == typeof m[i]
              ? decodeURIComponent(m[i])
              : m[i];

        if (key && val) {
          params[key.name] = val;
        }
      }
      return params;
    }

    function updateRoute() {
      var next = parseRoute(),
          last = $route.current;

      if (next && last && next.$$route === last.$$route
          && angular.equals(next.pathParams, last.pathParams)
          && !next.reloadOnSearch && !forceReload) {
        last.params = next.params;
        angular.copy(last.params, $routeParams);
        $rootScope.$broadcast('$routeUpdate', last);
      } else if (next || last) {
        forceReload = false;
        $rootScope.$broadcast('$routeChangeStart', next, last);
        $route.current = next;
        if (next) {
          if (next.redirectTo) {
            if (angular.isString(next.redirectTo)) {
              $location.path(interpolate(next.redirectTo, next.params)).search(next.params)
                       .replace();
            } else {
              $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search()))
                       .replace();
            }
          }
        }

        $q.when(next).
          then(function() {
            if (next) {
              var locals = angular.extend({}, next.resolve),
                  template, templateUrl;

              angular.forEach(locals, function(value, key) {
                locals[key] = angular.isString(value) ?
                    $injector.get(value) : $injector.invoke(value);
              });

              if (angular.isDefined(template = next.template)) {
                if (angular.isFunction(template)) {
                  template = template(next.params);
                }
              } else if (angular.isDefined(templateUrl = next.templateUrl)) {
                if (angular.isFunction(templateUrl)) {
                  templateUrl = templateUrl(next.params);
                }
                templateUrl = $sce.getTrustedResourceUrl(templateUrl);
                if (angular.isDefined(templateUrl)) {
                  next.loadedTemplateUrl = templateUrl;
                  template = $http.get(templateUrl, {cache: $templateCache}).
                      then(function(response) { return response.data; });
                }
              }
              if (angular.isDefined(template)) {
                locals['$template'] = template;
              }
              return $q.all(locals);
            }
          }).
          // after route change
          then(function(locals) {
            if (next == $route.current) {
              if (next) {
                next.locals = locals;
                angular.copy(next.params, $routeParams);
              }
              $rootScope.$broadcast('$routeChangeSuccess', next, last);
            }
          }, function(error) {
            if (next == $route.current) {
              $rootScope.$broadcast('$routeChangeError', next, last, error);
            }
          });
      }
    }


    /**
     * @returns {Object} the current active route, by matching it against the URL
     */
    function parseRoute() {
      // Match a route
      var params, match;
      angular.forEach(routes, function(route, path) {
        if (!match && (params = switchRouteMatcher($location.path(), route))) {
          match = inherit(route, {
            params: angular.extend({}, $location.search(), params),
            pathParams: params});
          match.$$route = route;
        }
      });
      // No route matched; fallback to "otherwise" route
      return match || routes[null] && inherit(routes[null], {params: {}, pathParams:{}});
    }

    /**
     * @returns {string} interpolation of the redirect path with the parameters
     */
    function interpolate(string, params) {
      var result = [];
      angular.forEach((string||'').split(':'), function(segment, i) {
        if (i === 0) {
          result.push(segment);
        } else {
          var segmentMatch = segment.match(/(\w+)(.*)/);
          var key = segmentMatch[1];
          result.push(params[key]);
          result.push(segmentMatch[2] || '');
          delete params[key];
        }
      });
      return result.join('');
    }
  }];
}

ngRouteModule.provider('$routeParams', $RouteParamsProvider);


/**
 * @ngdoc service
 * @name $routeParams
 * @requires $route
 *
 * @description
 * The `$routeParams` service allows you to retrieve the current set of route parameters.
 *
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 *
 * The route parameters are a combination of {@link ng.$location `$location`}'s
 * {@link ng.$location#search `search()`} and {@link ng.$location#path `path()`}.
 * The `path` parameters are extracted when the {@link ngRoute.$route `$route`} path is matched.
 *
 * In case of parameter name collision, `path` params take precedence over `search` params.
 *
 * The service guarantees that the identity of the `$routeParams` object will remain unchanged
 * (but its properties will likely change) even when a route change occurs.
 *
 * Note that the `$routeParams` are only updated *after* a route change completes successfully.
 * This means that you cannot rely on `$routeParams` being correct in route resolve functions.
 * Instead you can use `$route.current.params` to access the new route's parameters.
 *
 * @example
 * ```js
 *  // Given:
 *  // URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
 *  // Route: /Chapter/:chapterId/Section/:sectionId
 *  //
 *  // Then
 *  $routeParams ==> {chapterId:1, sectionId:2, search:'moby'}
 * ```
 */
function $RouteParamsProvider() {
  this.$get = function() { return {}; };
}

ngRouteModule.directive('ngView', ngViewFactory);
ngRouteModule.directive('ngView', ngViewFillContentFactory);


/**
 * @ngdoc directive
 * @name ngView
 * @restrict ECA
 *
 * @description
 * # Overview
 * `ngView` is a directive that complements the {@link ngRoute.$route $route} service by
 * including the rendered template of the current route into the main layout (`index.html`) file.
 * Every time the current route changes, the included view changes with it according to the
 * configuration of the `$route` service.
 *
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 *
 * @animations
 * enter - animation is used to bring new content into the browser.
 * leave - animation is used to animate existing content away.
 *
 * The enter and leave animation occur concurrently.
 *
 * @scope
 * @priority 400
 * @param {string=} onload Expression to evaluate whenever the view updates.
 *
 * @param {string=} autoscroll Whether `ngView` should call {@link ng.$anchorScroll
 *                  $anchorScroll} to scroll the viewport after the view is updated.
 *
 *                  - If the attribute is not set, disable scrolling.
 *                  - If the attribute is set without value, enable scrolling.
 *                  - Otherwise enable scrolling only if the `autoscroll` attribute value evaluated
 *                    as an expression yields a truthy value.
 * @example
    <example name="ngView-directive" module="ngViewExample"
             deps="angular-route.js;angular-animate.js"
             animations="true" fixBase="true">
      <file name="index.html">
        <div ng-controller="MainCtrl as main">
          Choose:
          <a href="Book/Moby">Moby</a> |
          <a href="Book/Moby/ch/1">Moby: Ch1</a> |
          <a href="Book/Gatsby">Gatsby</a> |
          <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
          <a href="Book/Scarlet">Scarlet Letter</a><br/>

          <div class="view-animate-container">
            <div ng-view class="view-animate"></div>
          </div>
          <hr />

          <pre>$location.path() = {{main.$location.path()}}</pre>
          <pre>$route.current.templateUrl = {{main.$route.current.templateUrl}}</pre>
          <pre>$route.current.params = {{main.$route.current.params}}</pre>
          <pre>$route.current.scope.name = {{main.$route.current.scope.name}}</pre>
          <pre>$routeParams = {{main.$routeParams}}</pre>
        </div>
      </file>

      <file name="book.html">
        <div>
          controller: {{book.name}}<br />
          Book Id: {{book.params.bookId}}<br />
        </div>
      </file>

      <file name="chapter.html">
        <div>
          controller: {{chapter.name}}<br />
          Book Id: {{chapter.params.bookId}}<br />
          Chapter Id: {{chapter.params.chapterId}}
        </div>
      </file>

      <file name="animations.css">
        .view-animate-container {
          position:relative;
          height:100px!important;
          position:relative;
          background:white;
          border:1px solid black;
          height:40px;
          overflow:hidden;
        }

        .view-animate {
          padding:10px;
        }

        .view-animate.ng-enter, .view-animate.ng-leave {
          -webkit-transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;
          transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;

          display:block;
          width:100%;
          border-left:1px solid black;

          position:absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          padding:10px;
        }

        .view-animate.ng-enter {
          left:100%;
        }
        .view-animate.ng-enter.ng-enter-active {
          left:0;
        }
        .view-animate.ng-leave.ng-leave-active {
          left:-100%;
        }
      </file>

      <file name="script.js">
        angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])
          .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
              $routeProvider
                .when('/Book/:bookId', {
                  templateUrl: 'book.html',
                  controller: 'BookCtrl',
                  controllerAs: 'book'
                })
                .when('/Book/:bookId/ch/:chapterId', {
                  templateUrl: 'chapter.html',
                  controller: 'ChapterCtrl',
                  controllerAs: 'chapter'
                });

              // configure html5 to get links working on jsfiddle
              $locationProvider.html5Mode(true);
          }])
          .controller('MainCtrl', ['$route', '$routeParams', '$location',
            function($route, $routeParams, $location) {
              this.$route = $route;
              this.$location = $location;
              this.$routeParams = $routeParams;
          }])
          .controller('BookCtrl', ['$routeParams', function($routeParams) {
            this.name = "BookCtrl";
            this.params = $routeParams;
          }])
          .controller('ChapterCtrl', ['$routeParams', function($routeParams) {
            this.name = "ChapterCtrl";
            this.params = $routeParams;
          }]);

      </file>

      <file name="protractor.js" type="protractor">
        it('should load and compile correct template', function() {
          element(by.linkText('Moby: Ch1')).click();
          var content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: ChapterCtrl/);
          expect(content).toMatch(/Book Id\: Moby/);
          expect(content).toMatch(/Chapter Id\: 1/);

          element(by.partialLinkText('Scarlet')).click();

          content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: BookCtrl/);
          expect(content).toMatch(/Book Id\: Scarlet/);
        });
      </file>
    </example>
 */


/**
 * @ngdoc event
 * @name ngView#$viewContentLoaded
 * @eventType emit on the current ngView scope
 * @description
 * Emitted every time the ngView content is reloaded.
 */
ngViewFactory.$inject = ['$route', '$anchorScroll', '$animate'];
function ngViewFactory(   $route,   $anchorScroll,   $animate) {
  return {
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    link: function(scope, $element, attr, ctrl, $transclude) {
        var currentScope,
            currentElement,
            previousElement,
            autoScrollExp = attr.autoscroll,
            onloadExp = attr.onload || '';

        scope.$on('$routeChangeSuccess', update);
        update();

        function cleanupLastView() {
          if(previousElement) {
            previousElement.remove();
            previousElement = null;
          }
          if(currentScope) {
            currentScope.$destroy();
            currentScope = null;
          }
          if(currentElement) {
            $animate.leave(currentElement, function() {
              previousElement = null;
            });
            previousElement = currentElement;
            currentElement = null;
          }
        }

        function update() {
          var locals = $route.current && $route.current.locals,
              template = locals && locals.$template;

          if (angular.isDefined(template)) {
            var newScope = scope.$new();
            var current = $route.current;

            // Note: This will also link all children of ng-view that were contained in the original
            // html. If that content contains controllers, ... they could pollute/change the scope.
            // However, using ng-view on an element with additional content does not make sense...
            // Note: We can't remove them in the cloneAttchFn of $transclude as that
            // function is called before linking the content, which would apply child
            // directives to non existing elements.
            var clone = $transclude(newScope, function(clone) {
              $animate.enter(clone, null, currentElement || $element, function onNgViewEnter () {
                if (angular.isDefined(autoScrollExp)
                  && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                  $anchorScroll();
                }
              });
              cleanupLastView();
            });

            currentElement = clone;
            currentScope = current.scope = newScope;
            currentScope.$emit('$viewContentLoaded');
            currentScope.$eval(onloadExp);
          } else {
            cleanupLastView();
          }
        }
    }
  };
}

// This directive is called during the $transclude call of the first `ngView` directive.
// It will replace and compile the content of the element with the loaded template.
// We need this directive so that the element content is already filled when
// the link function of another directive on the same element as ngView
// is called.
ngViewFillContentFactory.$inject = ['$compile', '$controller', '$route'];
function ngViewFillContentFactory($compile, $controller, $route) {
  return {
    restrict: 'ECA',
    priority: -400,
    link: function(scope, $element) {
      var current = $route.current,
          locals = current.locals;

      $element.html(locals.$template);

      var link = $compile($element.contents());

      if (current.controller) {
        locals.$scope = scope;
        var controller = $controller(current.controller, locals);
        if (current.controllerAs) {
          scope[current.controllerAs] = controller;
        }
        $element.data('$ngControllerController', controller);
        $element.children().data('$ngControllerController', controller);
      }

      link(scope);
    }
  };
}


})(window, window.angular);

}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\angular-route\\angular-route.js","/..\\..\\node_modules\\angular-route")
},{"buffer":9,"ngpmcQ":12}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
require('./lib/angular.min.js');

module.exports = angular;

}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\angular\\index-browserify.js","/..\\..\\node_modules\\angular")
},{"./lib/angular.min.js":8,"buffer":9,"ngpmcQ":12}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 AngularJS v1.2.16
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(O,U,s){'use strict';function t(b){return function(){var a=arguments[0],c,a="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.2.16/"+(b?b+"/":"")+a;for(c=1;c<arguments.length;c++)a=a+(1==c?"?":"&")+"p"+(c-1)+"="+encodeURIComponent("function"==typeof arguments[c]?arguments[c].toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof arguments[c]?"undefined":"string"!=typeof arguments[c]?JSON.stringify(arguments[c]):arguments[c]);return Error(a)}}function ab(b){if(null==b||Ca(b))return!1;
var a=b.length;return 1===b.nodeType&&a?!0:w(b)||M(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function q(b,a,c){var d;if(b)if(P(b))for(d in b)"prototype"==d||("length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d))||a.call(c,b[d],d);else if(b.forEach&&b.forEach!==q)b.forEach(a,c);else if(ab(b))for(d=0;d<b.length;d++)a.call(c,b[d],d);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d);return b}function Qb(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);return a.sort()}function Sc(b,
a,c){for(var d=Qb(b),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function Rb(b){return function(a,c){b(c,a)}}function bb(){for(var b=ka.length,a;b;){b--;a=ka[b].charCodeAt(0);if(57==a)return ka[b]="A",ka.join("");if(90==a)ka[b]="0";else return ka[b]=String.fromCharCode(a+1),ka.join("")}ka.unshift("0");return ka.join("")}function Sb(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function D(b){var a=b.$$hashKey;q(arguments,function(a){a!==b&&q(a,function(a,c){b[c]=a})});Sb(b,a);return b}function Y(b){return parseInt(b,
10)}function Tb(b,a){return D(new (D(function(){},{prototype:b})),a)}function C(){}function Da(b){return b}function aa(b){return function(){return b}}function E(b){return"undefined"===typeof b}function B(b){return"undefined"!==typeof b}function X(b){return null!=b&&"object"===typeof b}function w(b){return"string"===typeof b}function vb(b){return"number"===typeof b}function Na(b){return"[object Date]"===wa.call(b)}function M(b){return"[object Array]"===wa.call(b)}function P(b){return"function"===typeof b}
function cb(b){return"[object RegExp]"===wa.call(b)}function Ca(b){return b&&b.document&&b.location&&b.alert&&b.setInterval}function Tc(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function Uc(b,a,c){var d=[];q(b,function(b,g,f){d.push(a.call(c,b,g,f))});return d}function db(b,a){if(b.indexOf)return b.indexOf(a);for(var c=0;c<b.length;c++)if(a===b[c])return c;return-1}function Oa(b,a){var c=db(b,a);0<=c&&b.splice(c,1);return a}function ba(b,a){if(Ca(b)||b&&b.$evalAsync&&b.$watch)throw Pa("cpws");
if(a){if(b===a)throw Pa("cpi");if(M(b))for(var c=a.length=0;c<b.length;c++)a.push(ba(b[c]));else{c=a.$$hashKey;q(a,function(b,c){delete a[c]});for(var d in b)a[d]=ba(b[d]);Sb(a,c)}}else(a=b)&&(M(b)?a=ba(b,[]):Na(b)?a=new Date(b.getTime()):cb(b)?a=RegExp(b.source):X(b)&&(a=ba(b,{})));return a}function Ub(b,a){a=a||{};for(var c in b)!b.hasOwnProperty(c)||"$"===c.charAt(0)&&"$"===c.charAt(1)||(a[c]=b[c]);return a}function xa(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;
var c=typeof b,d;if(c==typeof a&&"object"==c)if(M(b)){if(!M(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!xa(b[d],a[d]))return!1;return!0}}else{if(Na(b))return Na(a)&&b.getTime()==a.getTime();if(cb(b)&&cb(a))return b.toString()==a.toString();if(b&&b.$evalAsync&&b.$watch||a&&a.$evalAsync&&a.$watch||Ca(b)||Ca(a)||M(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!P(b[d])){if(!xa(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==s&&!P(a[d]))return!1;
return!0}return!1}function Vb(){return U.securityPolicy&&U.securityPolicy.isActive||U.querySelector&&!(!U.querySelector("[ng-csp]")&&!U.querySelector("[data-ng-csp]"))}function eb(b,a){var c=2<arguments.length?ya.call(arguments,2):[];return!P(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,c.concat(ya.call(arguments,0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Vc(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)?c=
s:Ca(a)?c="$WINDOW":a&&U===a?c="$DOCUMENT":a&&(a.$evalAsync&&a.$watch)&&(c="$SCOPE");return c}function qa(b,a){return"undefined"===typeof b?s:JSON.stringify(b,Vc,a?"  ":null)}function Wb(b){return w(b)?JSON.parse(b):b}function Qa(b){"function"===typeof b?b=!0:b&&0!==b.length?(b=K(""+b),b=!("f"==b||"0"==b||"false"==b||"no"==b||"n"==b||"[]"==b)):b=!1;return b}function ha(b){b=y(b).clone();try{b.empty()}catch(a){}var c=y("<div>").append(b).html();try{return 3===b[0].nodeType?K(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,
function(a,b){return"<"+K(b)})}catch(d){return K(c)}}function Xb(b){try{return decodeURIComponent(b)}catch(a){}}function Yb(b){var a={},c,d;q((b||"").split("&"),function(b){b&&(c=b.split("="),d=Xb(c[0]),B(d)&&(b=B(c[1])?Xb(c[1]):!0,a[d]?M(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Zb(b){var a=[];q(b,function(b,d){M(b)?q(b,function(b){a.push(za(d,!0)+(!0===b?"":"="+za(b,!0)))}):a.push(za(d,!0)+(!0===b?"":"="+za(b,!0)))});return a.length?a.join("&"):""}function wb(b){return za(b,
!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function za(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,a?"%20":"+")}function Wc(b,a){function c(a){a&&d.push(a)}var d=[b],e,g,f=["ng:app","ng-app","x-ng-app","data-ng-app"],h=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;q(f,function(a){f[a]=!0;c(U.getElementById(a));a=a.replace(":","\\:");b.querySelectorAll&&(q(b.querySelectorAll("."+a),c),q(b.querySelectorAll("."+
a+"\\:"),c),q(b.querySelectorAll("["+a+"]"),c))});q(d,function(a){if(!e){var b=h.exec(" "+a.className+" ");b?(e=a,g=(b[2]||"").replace(/\s+/g,",")):q(a.attributes,function(b){!e&&f[b.name]&&(e=a,g=b.value)})}});e&&a(e,g?[g]:[])}function $b(b,a){var c=function(){b=y(b);if(b.injector()){var c=b[0]===U?"document":ha(b);throw Pa("btstrpd",c);}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);a.unshift("ng");c=ac(a);c.invoke(["$rootScope","$rootElement","$compile","$injector","$animate",
function(a,b,c,d,e){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},d=/^NG_DEFER_BOOTSTRAP!/;if(O&&!d.test(O.name))return c();O.name=O.name.replace(d,"");Ea.resumeBootstrap=function(b){q(b,function(b){a.push(b)});c()}}function fb(b,a){a=a||"_";return b.replace(Xc,function(b,d){return(d?a:"")+b.toLowerCase()})}function xb(b,a,c){if(!b)throw Pa("areq",a||"?",c||"required");return b}function Ra(b,a,c){c&&M(b)&&(b=b[b.length-1]);xb(P(b),a,"not a function, got "+(b&&"object"==typeof b?
b.constructor.name||"Object":typeof b));return b}function Aa(b,a){if("hasOwnProperty"===b)throw Pa("badname",a);}function bc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,g=a.length,f=0;f<g;f++)d=a[f],b&&(b=(e=b)[d]);return!c&&P(b)?eb(e,b):b}function yb(b){var a=b[0];b=b[b.length-1];if(a===b)return y(a);var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return y(c)}function Yc(b){var a=t("$injector"),c=t("ng");b=b.angular||(b.angular={});b.$$minErr=b.$$minErr||t;return b.module||
(b.module=function(){var b={};return function(e,g,f){if("hasOwnProperty"===e)throw c("badname","module");g&&b.hasOwnProperty(e)&&(b[e]=null);return b[e]||(b[e]=function(){function b(a,d,e){return function(){c[e||"push"]([a,d,arguments]);return n}}if(!g)throw a("nomod",e);var c=[],d=[],m=b("$injector","invoke"),n={_invokeQueue:c,_runBlocks:d,requires:g,name:e,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:b("$provide","value"),constant:b("$provide",
"constant","unshift"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:m,run:function(a){d.push(a);return this}};f&&m(f);return n}())}}())}function Zc(b){D(b,{bootstrap:$b,copy:ba,extend:D,equals:xa,element:y,forEach:q,injector:ac,noop:C,bind:eb,toJson:qa,fromJson:Wb,identity:Da,isUndefined:E,isDefined:B,isString:w,isFunction:P,isObject:X,isNumber:vb,isElement:Tc,isArray:M,
version:$c,isDate:Na,lowercase:K,uppercase:Fa,callbacks:{counter:0},$$minErr:t,$$csp:Vb});Sa=Yc(O);try{Sa("ngLocale")}catch(a){Sa("ngLocale",[]).provider("$locale",ad)}Sa("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:bd});a.provider("$compile",cc).directive({a:cd,input:dc,textarea:dc,form:dd,script:ed,select:fd,style:gd,option:hd,ngBind:id,ngBindHtml:jd,ngBindTemplate:kd,ngClass:ld,ngClassEven:md,ngClassOdd:nd,ngCloak:od,ngController:pd,ngForm:qd,ngHide:rd,ngIf:sd,ngInclude:td,
ngInit:ud,ngNonBindable:vd,ngPluralize:wd,ngRepeat:xd,ngShow:yd,ngStyle:zd,ngSwitch:Ad,ngSwitchWhen:Bd,ngSwitchDefault:Cd,ngOptions:Dd,ngTransclude:Ed,ngModel:Fd,ngList:Gd,ngChange:Hd,required:ec,ngRequired:ec,ngValue:Id}).directive({ngInclude:Jd}).directive(zb).directive(fc);a.provider({$anchorScroll:Kd,$animate:Ld,$browser:Md,$cacheFactory:Nd,$controller:Od,$document:Pd,$exceptionHandler:Qd,$filter:gc,$interpolate:Rd,$interval:Sd,$http:Td,$httpBackend:Ud,$location:Vd,$log:Wd,$parse:Xd,$rootScope:Yd,
$q:Zd,$sce:$d,$sceDelegate:ae,$sniffer:be,$templateCache:ce,$timeout:de,$window:ee,$$rAF:fe,$$asyncCallback:ge})}])}function Ta(b){return b.replace(he,function(a,b,d,e){return e?d.toUpperCase():d}).replace(ie,"Moz$1")}function Ab(b,a,c,d){function e(b){var e=c&&b?[this.filter(b)]:[this],l=a,k,m,n,p,r,z;if(!d||null!=b)for(;e.length;)for(k=e.shift(),m=0,n=k.length;m<n;m++)for(p=y(k[m]),l?p.triggerHandler("$destroy"):l=!l,r=0,p=(z=p.children()).length;r<p;r++)e.push(Ga(z[r]));return g.apply(this,arguments)}
var g=Ga.fn[b],g=g.$original||g;e.$original=g;Ga.fn[b]=e}function N(b){if(b instanceof N)return b;w(b)&&(b=ca(b));if(!(this instanceof N)){if(w(b)&&"<"!=b.charAt(0))throw Bb("nosel");return new N(b)}if(w(b)){var a=b;b=U;var c;if(c=je.exec(a))b=[b.createElement(c[1])];else{var d=b,e;b=d.createDocumentFragment();c=[];if(Cb.test(a)){d=b.appendChild(d.createElement("div"));e=(ke.exec(a)||["",""])[1].toLowerCase();e=ea[e]||ea._default;d.innerHTML="<div>&#160;</div>"+e[1]+a.replace(le,"<$1></$2>")+e[2];
d.removeChild(d.firstChild);for(a=e[0];a--;)d=d.lastChild;a=0;for(e=d.childNodes.length;a<e;++a)c.push(d.childNodes[a]);d=b.firstChild;d.textContent=""}else c.push(d.createTextNode(a));b.textContent="";b.innerHTML="";b=c}Db(this,b);y(U.createDocumentFragment()).append(this)}else Db(this,b)}function Eb(b){return b.cloneNode(!0)}function Ha(b){hc(b);var a=0;for(b=b.childNodes||[];a<b.length;a++)Ha(b[a])}function ic(b,a,c,d){if(B(d))throw Bb("offargs");var e=la(b,"events");la(b,"handle")&&(E(a)?q(e,
function(a,c){Fb(b,c,a);delete e[c]}):q(a.split(" "),function(a){E(c)?(Fb(b,a,e[a]),delete e[a]):Oa(e[a]||[],c)}))}function hc(b,a){var c=b[gb],d=Ua[c];d&&(a?delete Ua[c].data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),ic(b)),delete Ua[c],b[gb]=s))}function la(b,a,c){var d=b[gb],d=Ua[d||-1];if(B(c))d||(b[gb]=d=++me,d=Ua[d]={}),d[a]=c;else return d&&d[a]}function jc(b,a,c){var d=la(b,"data"),e=B(c),g=!e&&B(a),f=g&&!X(a);d||f||la(b,"data",d={});if(e)d[a]=c;else if(g){if(f)return d&&d[a];
D(d,a)}else return d}function Gb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function hb(b,a){a&&b.setAttribute&&q(a.split(" "),function(a){b.setAttribute("class",ca((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+ca(a)+" "," ")))})}function ib(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");q(a.split(" "),function(a){a=ca(a);-1===c.indexOf(" "+a+" ")&&
(c+=a+" ")});b.setAttribute("class",ca(c))}}function Db(b,a){if(a){a=a.nodeName||!B(a.length)||Ca(a)?[a]:a;for(var c=0;c<a.length;c++)b.push(a[c])}}function kc(b,a){return jb(b,"$"+(a||"ngController")+"Controller")}function jb(b,a,c){b=y(b);9==b[0].nodeType&&(b=b.find("html"));for(a=M(a)?a:[a];b.length;){for(var d=b[0],e=0,g=a.length;e<g;e++)if((c=b.data(a[e]))!==s)return c;b=y(d.parentNode||11===d.nodeType&&d.host)}}function lc(b){for(var a=0,c=b.childNodes;a<c.length;a++)Ha(c[a]);for(;b.firstChild;)b.removeChild(b.firstChild)}
function mc(b,a){var c=kb[a.toLowerCase()];return c&&nc[b.nodeName]&&c}function ne(b,a){var c=function(c,e){c.preventDefault||(c.preventDefault=function(){c.returnValue=!1});c.stopPropagation||(c.stopPropagation=function(){c.cancelBubble=!0});c.target||(c.target=c.srcElement||U);if(E(c.defaultPrevented)){var g=c.preventDefault;c.preventDefault=function(){c.defaultPrevented=!0;g.call(c)};c.defaultPrevented=!1}c.isDefaultPrevented=function(){return c.defaultPrevented||!1===c.returnValue};var f=Ub(a[e||
c.type]||[]);q(f,function(a){a.call(b,c)});8>=S?(c.preventDefault=null,c.stopPropagation=null,c.isDefaultPrevented=null):(delete c.preventDefault,delete c.stopPropagation,delete c.isDefaultPrevented)};c.elem=b;return c}function Ia(b){var a=typeof b,c;"object"==a&&null!==b?"function"==typeof(c=b.$$hashKey)?c=b.$$hashKey():c===s&&(c=b.$$hashKey=bb()):c=b;return a+":"+c}function Va(b){q(b,this.put,this)}function oc(b){var a,c;"function"==typeof b?(a=b.$inject)||(a=[],b.length&&(c=b.toString().replace(oe,
""),c=c.match(pe),q(c[1].split(qe),function(b){b.replace(re,function(b,c,d){a.push(d)})})),b.$inject=a):M(b)?(c=b.length-1,Ra(b[c],"fn"),a=b.slice(0,c)):Ra(b,"fn",!0);return a}function ac(b){function a(a){return function(b,c){if(X(b))q(b,Rb(a));else return a(b,c)}}function c(a,b){Aa(a,"service");if(P(b)||M(b))b=n.instantiate(b);if(!b.$get)throw Wa("pget",a);return m[a+h]=b}function d(a,b){return c(a,{$get:b})}function e(a){var b=[],c,d,g,h;q(a,function(a){if(!k.get(a)){k.put(a,!0);try{if(w(a))for(c=
Sa(a),b=b.concat(e(c.requires)).concat(c._runBlocks),d=c._invokeQueue,g=0,h=d.length;g<h;g++){var f=d[g],l=n.get(f[0]);l[f[1]].apply(l,f[2])}else P(a)?b.push(n.invoke(a)):M(a)?b.push(n.invoke(a)):Ra(a,"module")}catch(m){throw M(a)&&(a=a[a.length-1]),m.message&&(m.stack&&-1==m.stack.indexOf(m.message))&&(m=m.message+"\n"+m.stack),Wa("modulerr",a,m.stack||m.message||m);}}});return b}function g(a,b){function c(d){if(a.hasOwnProperty(d)){if(a[d]===f)throw Wa("cdep",l.join(" <- "));return a[d]}try{return l.unshift(d),
a[d]=f,a[d]=b(d)}catch(e){throw a[d]===f&&delete a[d],e;}finally{l.shift()}}function d(a,b,e){var g=[],h=oc(a),f,l,k;l=0;for(f=h.length;l<f;l++){k=h[l];if("string"!==typeof k)throw Wa("itkn",k);g.push(e&&e.hasOwnProperty(k)?e[k]:c(k))}a.$inject||(a=a[f]);return a.apply(b,g)}return{invoke:d,instantiate:function(a,b){var c=function(){},e;c.prototype=(M(a)?a[a.length-1]:a).prototype;c=new c;e=d(a,c,b);return X(e)||P(e)?e:c},get:c,annotate:oc,has:function(b){return m.hasOwnProperty(b+h)||a.hasOwnProperty(b)}}}
var f={},h="Provider",l=[],k=new Va,m={$provide:{provider:a(c),factory:a(d),service:a(function(a,b){return d(a,["$injector",function(a){return a.instantiate(b)}])}),value:a(function(a,b){return d(a,aa(b))}),constant:a(function(a,b){Aa(a,"constant");m[a]=b;p[a]=b}),decorator:function(a,b){var c=n.get(a+h),d=c.$get;c.$get=function(){var a=r.invoke(d,c);return r.invoke(b,null,{$delegate:a})}}}},n=m.$injector=g(m,function(){throw Wa("unpr",l.join(" <- "));}),p={},r=p.$injector=g(p,function(a){a=n.get(a+
h);return r.invoke(a.$get,a)});q(e(b),function(a){r.invoke(a||C)});return r}function Kd(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;q(a,function(a){b||"a"!==K(a.nodeName)||(b=a)});return b}function g(){var b=c.hash(),d;b?(d=f.getElementById(b))?d.scrollIntoView():(d=e(f.getElementsByName(b)))?d.scrollIntoView():"top"===b&&a.scrollTo(0,0):a.scrollTo(0,0)}var f=a.document;b&&d.$watch(function(){return c.hash()},
function(){d.$evalAsync(g)});return g}]}function ge(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function se(b,a,c,d){function e(a){try{a.apply(null,ya.call(arguments,1))}finally{if(z--,0===z)for(;u.length;)try{u.pop()()}catch(b){c.error(b)}}}function g(a,b){(function T(){q(F,function(a){a()});v=b(T,a)})()}function f(){x=null;J!=h.url()&&(J=h.url(),q(ma,function(a){a(h.url())}))}var h=this,l=a[0],k=b.location,m=b.history,
n=b.setTimeout,p=b.clearTimeout,r={};h.isMock=!1;var z=0,u=[];h.$$completeOutstandingRequest=e;h.$$incOutstandingRequestCount=function(){z++};h.notifyWhenNoOutstandingRequests=function(a){q(F,function(a){a()});0===z?a():u.push(a)};var F=[],v;h.addPollFn=function(a){E(v)&&g(100,n);F.push(a);return a};var J=k.href,A=a.find("base"),x=null;h.url=function(a,c){k!==b.location&&(k=b.location);m!==b.history&&(m=b.history);if(a){if(J!=a)return J=a,d.history?c?m.replaceState(null,"",a):(m.pushState(null,"",
a),A.attr("href",A.attr("href"))):(x=a,c?k.replace(a):k.href=a),h}else return x||k.href.replace(/%27/g,"'")};var ma=[],L=!1;h.onUrlChange=function(a){if(!L){if(d.history)y(b).on("popstate",f);if(d.hashchange)y(b).on("hashchange",f);else h.addPollFn(f);L=!0}ma.push(a);return a};h.baseHref=function(){var a=A.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var Q={},da="",H=h.baseHref();h.cookies=function(a,b){var d,e,g,h;if(a)b===s?l.cookie=escape(a)+"=;path="+H+";expires=Thu, 01 Jan 1970 00:00:00 GMT":
w(b)&&(d=(l.cookie=escape(a)+"="+escape(b)+";path="+H).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(l.cookie!==da)for(da=l.cookie,d=da.split("; "),Q={},g=0;g<d.length;g++)e=d[g],h=e.indexOf("="),0<h&&(a=unescape(e.substring(0,h)),Q[a]===s&&(Q[a]=unescape(e.substring(h+1))));return Q}};h.defer=function(a,b){var c;z++;c=n(function(){delete r[c];e(a)},b||0);r[c]=!0;return c};h.defer.cancel=function(a){return r[a]?(delete r[a],
p(a),e(C),!0):!1}}function Md(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new se(b,d,a,c)}]}function Nd(){this.$get=function(){function b(b,d){function e(a){a!=n&&(p?p==a&&(p=a.n):p=a,g(a.n,a.p),g(a,n),n=a,n.n=null)}function g(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw t("$cacheFactory")("iid",b);var f=0,h=D({},d,{id:b}),l={},k=d&&d.capacity||Number.MAX_VALUE,m={},n=null,p=null;return a[b]={put:function(a,b){if(k<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});
e(c)}if(!E(b))return a in l||f++,l[a]=b,f>k&&this.remove(p.key),b},get:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return l[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;b==n&&(n=b.p);b==p&&(p=b.n);g(b.n,b.p);delete m[a]}delete l[a];f--},removeAll:function(){l={};f=0;m={};n=p=null},destroy:function(){m=h=l=null;delete a[b]},info:function(){return D({},h,{size:f})}}}var a={};b.info=function(){var b={};q(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};
return b}}function ce(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function cc(b,a){var c={},d="Directive",e=/^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,g=/(([\d\w\-_]+)(?:\:([^;]+))?;?)/,f=/^(on[a-z]+|formaction)$/;this.directive=function l(a,e){Aa(a,"directive");w(a)?(xb(e,"directiveFactory"),c.hasOwnProperty(a)||(c[a]=[],b.factory(a+d,["$injector","$exceptionHandler",function(b,d){var e=[];q(c[a],function(c,g){try{var f=b.invoke(c);P(f)?f={compile:aa(f)}:!f.compile&&f.link&&(f.compile=
aa(f.link));f.priority=f.priority||0;f.index=g;f.name=f.name||a;f.require=f.require||f.controller&&f.name;f.restrict=f.restrict||"A";e.push(f)}catch(l){d(l)}});return e}])),c[a].push(e)):q(a,Rb(l));return this};this.aHrefSanitizationWhitelist=function(b){return B(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return B(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};this.$get=["$injector","$interpolate",
"$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,m,n,p,r,z,u,F,v,J,A){function x(a,b,c,d,e){a instanceof y||(a=y(a));q(a,function(b,c){3==b.nodeType&&b.nodeValue.match(/\S+/)&&(a[c]=y(b).wrap("<span></span>").parent()[0])});var g=L(a,b,a,c,d,e);ma(a,"ng-scope");return function(b,c,d){xb(b,"scope");var e=c?Ja.clone.call(a):a;q(d,function(a,b){e.data("$"+b+"Controller",a)});d=0;for(var f=e.length;d<f;d++){var l=
e[d].nodeType;1!==l&&9!==l||e.eq(d).data("$scope",b)}c&&c(e,b);g&&g(b,e,e);return e}}function ma(a,b){try{a.addClass(b)}catch(c){}}function L(a,b,c,d,e,g){function f(a,c,d,e){var g,k,m,r,n,p,z;g=c.length;var I=Array(g);for(n=0;n<g;n++)I[n]=c[n];z=n=0;for(p=l.length;n<p;z++)k=I[z],c=l[n++],g=l[n++],m=y(k),c?(c.scope?(r=a.$new(),m.data("$scope",r)):r=a,(m=c.transclude)||!e&&b?c(g,r,k,d,Q(a,m||b)):c(g,r,k,d,e)):g&&g(a,k.childNodes,s,e)}for(var l=[],k,m,r,n,p=0;p<a.length;p++)k=new Hb,m=da(a[p],[],k,
0===p?d:s,e),(g=m.length?ia(m,a[p],k,b,c,null,[],[],g):null)&&g.scope&&ma(y(a[p]),"ng-scope"),k=g&&g.terminal||!(r=a[p].childNodes)||!r.length?null:L(r,g?g.transclude:b),l.push(g,k),n=n||g||k,g=null;return n?f:null}function Q(a,b){return function(c,d,e){var g=!1;c||(c=a.$new(),g=c.$$transcluded=!0);d=b(c,d,e);if(g)d.on("$destroy",eb(c,c.$destroy));return d}}function da(a,b,c,d,f){var k=c.$attr,l;switch(a.nodeType){case 1:T(b,na(Ka(a).toLowerCase()),"E",d,f);var m,r,n;l=a.attributes;for(var p=0,z=
l&&l.length;p<z;p++){var u=!1,F=!1;m=l[p];if(!S||8<=S||m.specified){r=m.name;n=na(r);W.test(n)&&(r=fb(n.substr(6),"-"));var J=n.replace(/(Start|End)$/,"");n===J+"Start"&&(u=r,F=r.substr(0,r.length-5)+"end",r=r.substr(0,r.length-6));n=na(r.toLowerCase());k[n]=r;c[n]=m=ca(m.value);mc(a,n)&&(c[n]=!0);N(a,b,m,n);T(b,n,"A",d,f,u,F)}}a=a.className;if(w(a)&&""!==a)for(;l=g.exec(a);)n=na(l[2]),T(b,n,"C",d,f)&&(c[n]=ca(l[3])),a=a.substr(l.index+l[0].length);break;case 3:t(b,a.nodeValue);break;case 8:try{if(l=
e.exec(a.nodeValue))n=na(l[1]),T(b,n,"M",d,f)&&(c[n]=ca(l[2]))}catch(x){}}b.sort(E);return b}function H(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ja("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return y(d)}function R(a,b,c){return function(d,e,g,f,l){e=H(e[0],b,c);return a(d,e,g,f,l)}}function ia(a,c,d,e,g,f,l,n,p){function u(a,b,c,d){if(a){c&&(a=R(a,c,d));a.require=G.require;if(Q===
G||G.$$isolateScope)a=qc(a,{isolateScope:!0});l.push(a)}if(b){c&&(b=R(b,c,d));b.require=G.require;if(Q===G||G.$$isolateScope)b=qc(b,{isolateScope:!0});n.push(b)}}function F(a,b,c){var d,e="data",g=!1;if(w(a)){for(;"^"==(d=a.charAt(0))||"?"==d;)a=a.substr(1),"^"==d&&(e="inheritedData"),g=g||"?"==d;d=null;c&&"data"===e&&(d=c[a]);d=d||b[e]("$"+a+"Controller");if(!d&&!g)throw ja("ctreq",a,t);}else M(a)&&(d=[],q(a,function(a){d.push(F(a,b,c))}));return d}function J(a,e,g,f,p){function u(a,b){var c;2>arguments.length&&
(b=a,a=s);D&&(c=lb);return p(a,b,c)}var I,x,v,A,R,H,lb={},da;I=c===g?d:Ub(d,new Hb(y(g),d.$attr));x=I.$$element;if(Q){var T=/^\s*([@=&])(\??)\s*(\w*)\s*$/;f=y(g);H=e.$new(!0);ia&&ia===Q.$$originalDirective?f.data("$isolateScope",H):f.data("$isolateScopeNoTemplate",H);ma(f,"ng-isolate-scope");q(Q.scope,function(a,c){var d=a.match(T)||[],g=d[3]||c,f="?"==d[2],d=d[1],l,m,n,p;H.$$isolateBindings[c]=d+g;switch(d){case "@":I.$observe(g,function(a){H[c]=a});I.$$observers[g].$$scope=e;I[g]&&(H[c]=b(I[g])(e));
break;case "=":if(f&&!I[g])break;m=r(I[g]);p=m.literal?xa:function(a,b){return a===b};n=m.assign||function(){l=H[c]=m(e);throw ja("nonassign",I[g],Q.name);};l=H[c]=m(e);H.$watch(function(){var a=m(e);p(a,H[c])||(p(a,l)?n(e,a=H[c]):H[c]=a);return l=a},null,m.literal);break;case "&":m=r(I[g]);H[c]=function(a){return m(e,a)};break;default:throw ja("iscp",Q.name,c,a);}})}da=p&&u;L&&q(L,function(a){var b={$scope:a===Q||a.$$isolateScope?H:e,$element:x,$attrs:I,$transclude:da},c;R=a.controller;"@"==R&&(R=
I[a.name]);c=z(R,b);lb[a.name]=c;D||x.data("$"+a.name+"Controller",c);a.controllerAs&&(b.$scope[a.controllerAs]=c)});f=0;for(v=l.length;f<v;f++)try{A=l[f],A(A.isolateScope?H:e,x,I,A.require&&F(A.require,x,lb),da)}catch(G){m(G,ha(x))}f=e;Q&&(Q.template||null===Q.templateUrl)&&(f=H);a&&a(f,g.childNodes,s,p);for(f=n.length-1;0<=f;f--)try{A=n[f],A(A.isolateScope?H:e,x,I,A.require&&F(A.require,x,lb),da)}catch(B){m(B,ha(x))}}p=p||{};for(var v=-Number.MAX_VALUE,A,L=p.controllerDirectives,Q=p.newIsolateScopeDirective,
ia=p.templateDirective,T=p.nonTlbTranscludeDirective,E=!1,D=p.hasElementTranscludeDirective,Z=d.$$element=y(c),G,t,V,Xa=e,O,N=0,S=a.length;N<S;N++){G=a[N];var ra=G.$$start,W=G.$$end;ra&&(Z=H(c,ra,W));V=s;if(v>G.priority)break;if(V=G.scope)A=A||G,G.templateUrl||(K("new/isolated scope",Q,G,Z),X(V)&&(Q=G));t=G.name;!G.templateUrl&&G.controller&&(V=G.controller,L=L||{},K("'"+t+"' controller",L[t],G,Z),L[t]=G);if(V=G.transclude)E=!0,G.$$tlb||(K("transclusion",T,G,Z),T=G),"element"==V?(D=!0,v=G.priority,
V=H(c,ra,W),Z=d.$$element=y(U.createComment(" "+t+": "+d[t]+" ")),c=Z[0],mb(g,y(ya.call(V,0)),c),Xa=x(V,e,v,f&&f.name,{nonTlbTranscludeDirective:T})):(V=y(Eb(c)).contents(),Z.empty(),Xa=x(V,e));if(G.template)if(K("template",ia,G,Z),ia=G,V=P(G.template)?G.template(Z,d):G.template,V=Y(V),G.replace){f=G;V=Cb.test(V)?y(V):[];c=V[0];if(1!=V.length||1!==c.nodeType)throw ja("tplrt",t,"");mb(g,Z,c);S={$attr:{}};V=da(c,[],S);var $=a.splice(N+1,a.length-(N+1));Q&&pc(V);a=a.concat(V).concat($);B(d,S);S=a.length}else Z.html(V);
if(G.templateUrl)K("template",ia,G,Z),ia=G,G.replace&&(f=G),J=C(a.splice(N,a.length-N),Z,d,g,Xa,l,n,{controllerDirectives:L,newIsolateScopeDirective:Q,templateDirective:ia,nonTlbTranscludeDirective:T}),S=a.length;else if(G.compile)try{O=G.compile(Z,d,Xa),P(O)?u(null,O,ra,W):O&&u(O.pre,O.post,ra,W)}catch(aa){m(aa,ha(Z))}G.terminal&&(J.terminal=!0,v=Math.max(v,G.priority))}J.scope=A&&!0===A.scope;J.transclude=E&&Xa;p.hasElementTranscludeDirective=D;return J}function pc(a){for(var b=0,c=a.length;b<c;b++)a[b]=
Tb(a[b],{$$isolateScope:!0})}function T(b,e,g,f,k,n,r){if(e===k)return null;k=null;if(c.hasOwnProperty(e)){var p;e=a.get(e+d);for(var z=0,u=e.length;z<u;z++)try{p=e[z],(f===s||f>p.priority)&&-1!=p.restrict.indexOf(g)&&(n&&(p=Tb(p,{$$start:n,$$end:r})),b.push(p),k=p)}catch(F){m(F)}}return k}function B(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;q(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});q(b,function(b,g){"class"==g?(ma(e,b),a["class"]=(a["class"]?
a["class"]+" ":"")+b):"style"==g?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==g.charAt(0)||a.hasOwnProperty(g)||(a[g]=b,d[g]=c[g])})}function C(a,b,c,d,e,g,f,l){var k=[],m,r,z=b[0],u=a.shift(),F=D({},u,{templateUrl:null,transclude:null,replace:null,$$originalDirective:u}),x=P(u.templateUrl)?u.templateUrl(b,c):u.templateUrl;b.empty();n.get(v.getTrustedResourceUrl(x),{cache:p}).success(function(n){var p,J;n=Y(n);if(u.replace){n=Cb.test(n)?y(n):[];p=n[0];if(1!=n.length||
1!==p.nodeType)throw ja("tplrt",u.name,x);n={$attr:{}};mb(d,b,p);var v=da(p,[],n);X(u.scope)&&pc(v);a=v.concat(a);B(c,n)}else p=z,b.html(n);a.unshift(F);m=ia(a,p,c,e,b,u,g,f,l);q(d,function(a,c){a==p&&(d[c]=b[0])});for(r=L(b[0].childNodes,e);k.length;){n=k.shift();J=k.shift();var A=k.shift(),R=k.shift(),v=b[0];if(J!==z){var H=J.className;l.hasElementTranscludeDirective&&u.replace||(v=Eb(p));mb(A,y(J),v);ma(y(v),H)}J=m.transclude?Q(n,m.transclude):R;m(r,n,v,d,J)}k=null}).error(function(a,b,c,d){throw ja("tpload",
d.url);});return function(a,b,c,d,e){k?(k.push(b),k.push(c),k.push(d),k.push(e)):m(r,b,c,d,e)}}function E(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function K(a,b,c,d){if(b)throw ja("multidir",b.name,c.name,a,ha(d));}function t(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:aa(function(a,b){var c=b.parent(),e=c.data("$binding")||[];e.push(d);ma(c.data("$binding",e),"ng-binding");a.$watch(d,function(a){b[0].nodeValue=a})})})}function O(a,b){if("srcdoc"==
b)return v.HTML;var c=Ka(a);if("xlinkHref"==b||"FORM"==c&&"action"==b||"IMG"!=c&&("src"==b||"ngSrc"==b))return v.RESOURCE_URL}function N(a,c,d,e){var g=b(d,!0);if(g){if("multiple"===e&&"SELECT"===Ka(a))throw ja("selmulti",ha(a));c.push({priority:100,compile:function(){return{pre:function(c,d,l){d=l.$$observers||(l.$$observers={});if(f.test(e))throw ja("nodomevents");if(g=b(l[e],!0,O(a,e)))l[e]=g(c),(d[e]||(d[e]=[])).$$inter=!0,(l.$$observers&&l.$$observers[e].$$scope||c).$watch(g,function(a,b){"class"===
e&&a!=b?l.$updateClass(a,b):l.$set(e,a)})}}}})}}function mb(a,b,c){var d=b[0],e=b.length,g=d.parentNode,f,l;if(a)for(f=0,l=a.length;f<l;f++)if(a[f]==d){a[f++]=c;l=f+e-1;for(var k=a.length;f<k;f++,l++)l<k?a[f]=a[l]:delete a[f];a.length-=e-1;break}g&&g.replaceChild(c,d);a=U.createDocumentFragment();a.appendChild(d);c[y.expando]=d[y.expando];d=1;for(e=b.length;d<e;d++)g=b[d],y(g).remove(),a.appendChild(g),delete b[d];b[0]=c;b.length=1}function qc(a,b){return D(function(){return a.apply(null,arguments)},
a,b)}var Hb=function(a,b){this.$$element=a;this.$attr=b||{}};Hb.prototype={$normalize:na,$addClass:function(a){a&&0<a.length&&J.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&J.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=rc(a,b),d=rc(b,a);0===c.length?J.removeClass(this.$$element,d):0===d.length?J.addClass(this.$$element,c):J.setClass(this.$$element,c,d)},$set:function(a,b,c,d){var e=mc(this.$$element[0],a);e&&(this.$$element.prop(a,b),d=e);this[a]=b;d?this.$attr[a]=
d:(d=this.$attr[a])||(this.$attr[a]=d=fb(a,"-"));e=Ka(this.$$element);if("A"===e&&"href"===a||"IMG"===e&&"src"===a)this[a]=b=A(b,"src"===a);!1!==c&&(null===b||b===s?this.$$element.removeAttr(d):this.$$element.attr(d,b));(c=this.$$observers)&&q(c[a],function(a){try{a(b)}catch(c){m(c)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers={}),e=d[a]||(d[a]=[]);e.push(b);u.$evalAsync(function(){e.$$inter||b(c[a])});return b}};var Z=b.startSymbol(),ra=b.endSymbol(),Y="{{"==Z||"}}"==ra?
Da:function(a){return a.replace(/\{\{/g,Z).replace(/}}/g,ra)},W=/^ngAttr[A-Z]/;return x}]}function na(b){return Ta(b.replace(te,""))}function rc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),g=0;a:for(;g<d.length;g++){for(var f=d[g],h=0;h<e.length;h++)if(f==e[h])continue a;c+=(0<c.length?" ":"")+f}return c}function Od(){var b={},a=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,d){Aa(a,"controller");X(a)?D(b,a):b[a]=d};this.$get=["$injector","$window",function(c,d){return function(e,g){var f,
h,l;w(e)&&(f=e.match(a),h=f[1],l=f[3],e=b.hasOwnProperty(h)?b[h]:bc(g.$scope,h,!0)||bc(d,h,!0),Ra(e,h,!0));f=c.instantiate(e,g);if(l){if(!g||"object"!=typeof g.$scope)throw t("$controller")("noscp",h||e.name,l);g.$scope[l]=f}return f}}]}function Pd(){this.$get=["$window",function(b){return y(b.document)}]}function Qd(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function sc(b){var a={},c,d,e;if(!b)return a;q(b.split("\n"),function(b){e=b.indexOf(":");c=K(ca(b.substr(0,
e)));d=ca(b.substr(e+1));c&&(a[c]=a[c]?a[c]+(", "+d):d)});return a}function tc(b){var a=X(b)?b:s;return function(c){a||(a=sc(b));return c?a[K(c)]||null:a}}function uc(b,a,c){if(P(c))return c(b,a);q(c,function(c){b=c(b,a)});return b}function Td(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d={"Content-Type":"application/json;charset=utf-8"},e=this.defaults={transformResponse:[function(d){w(d)&&(d=d.replace(c,""),b.test(d)&&a.test(d)&&(d=Wb(d)));return d}],transformRequest:[function(a){return X(a)&&
"[object File]"!==wa.call(a)&&"[object Blob]"!==wa.call(a)?qa(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ba(d),put:ba(d),patch:ba(d)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},g=this.interceptors=[],f=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,d,n,p){function r(a){function c(a){var b=D({},a,{data:uc(a.data,a.headers,d.transformResponse)});return 200<=a.status&&300>a.status?
b:n.reject(b)}var d={method:"get",transformRequest:e.transformRequest,transformResponse:e.transformResponse},g=function(a){function b(a){var c;q(a,function(b,d){P(b)&&(c=b(),null!=c?a[d]=c:delete a[d])})}var c=e.headers,d=D({},a.headers),g,f,c=D({},c.common,c[K(a.method)]);b(c);b(d);a:for(g in c){a=K(g);for(f in d)if(K(f)===a)continue a;d[g]=c[g]}return d}(a);D(d,a);d.headers=g;d.method=Fa(d.method);(a=Ib(d.url)?b.cookies()[d.xsrfCookieName||e.xsrfCookieName]:s)&&(g[d.xsrfHeaderName||e.xsrfHeaderName]=
a);var f=[function(a){g=a.headers;var b=uc(a.data,tc(g),a.transformRequest);E(a.data)&&q(g,function(a,b){"content-type"===K(b)&&delete g[b]});E(a.withCredentials)&&!E(e.withCredentials)&&(a.withCredentials=e.withCredentials);return z(a,b,g).then(c,c)},s],h=n.when(d);for(q(v,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var k=f.shift(),h=h.then(a,k)}h.success=function(a){h.then(function(b){a(b.data,
b.status,b.headers,d)});return h};h.error=function(a){h.then(null,function(b){a(b.data,b.status,b.headers,d)});return h};return h}function z(b,c,g){function f(a,b,c,e){v&&(200<=a&&300>a?v.put(s,[a,b,sc(c),e]):v.remove(s));l(b,a,c,e);d.$$phase||d.$apply()}function l(a,c,d,e){c=Math.max(c,0);(200<=c&&300>c?p.resolve:p.reject)({data:a,status:c,headers:tc(d),config:b,statusText:e})}function k(){var a=db(r.pendingRequests,b);-1!==a&&r.pendingRequests.splice(a,1)}var p=n.defer(),z=p.promise,v,q,s=u(b.url,
b.params);r.pendingRequests.push(b);z.then(k,k);(b.cache||e.cache)&&(!1!==b.cache&&"GET"==b.method)&&(v=X(b.cache)?b.cache:X(e.cache)?e.cache:F);if(v)if(q=v.get(s),B(q)){if(q.then)return q.then(k,k),q;M(q)?l(q[1],q[0],ba(q[2]),q[3]):l(q,200,{},"OK")}else v.put(s,z);E(q)&&a(b.method,s,c,f,g,b.timeout,b.withCredentials,b.responseType);return z}function u(a,b){if(!b)return a;var c=[];Sc(b,function(a,b){null===a||E(a)||(M(a)||(a=[a]),q(a,function(a){X(a)&&(a=qa(a));c.push(za(b)+"="+za(a))}))});0<c.length&&
(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var F=c("$http"),v=[];q(g,function(a){v.unshift(w(a)?p.get(a):p.invoke(a))});q(f,function(a,b){var c=w(a)?p.get(a):p.invoke(a);v.splice(b,0,{response:function(a){return c(n.when(a))},responseError:function(a){return c(n.reject(a))}})});r.pendingRequests=[];(function(a){q(arguments,function(a){r[a]=function(b,c){return r(D(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){q(arguments,function(a){r[a]=function(b,c,d){return r(D(d||
{},{method:a,url:b,data:c}))}})})("post","put");r.defaults=e;return r}]}function ue(b){if(8>=S&&(!b.match(/^(get|post|head|put|delete|options)$/i)||!O.XMLHttpRequest))return new O.ActiveXObject("Microsoft.XMLHTTP");if(O.XMLHttpRequest)return new O.XMLHttpRequest;throw t("$httpBackend")("noxhr");}function Ud(){this.$get=["$browser","$window","$document",function(b,a,c){return ve(b,ue,b.defer,a.angular.callbacks,c[0])}]}function ve(b,a,c,d,e){function g(a,b){var c=e.createElement("script"),d=function(){c.onreadystatechange=
c.onload=c.onerror=null;e.body.removeChild(c);b&&b()};c.type="text/javascript";c.src=a;S&&8>=S?c.onreadystatechange=function(){/loaded|complete/.test(c.readyState)&&d()}:c.onload=c.onerror=function(){d()};e.body.appendChild(c);return d}var f=-1;return function(e,l,k,m,n,p,r,z){function u(){v=f;A&&A();x&&x.abort()}function F(a,d,e,g,f){L&&c.cancel(L);A=x=null;0===d&&(d=e?200:"file"==sa(l).protocol?404:0);a(1223===d?204:d,e,g,f||"");b.$$completeOutstandingRequest(C)}var v;b.$$incOutstandingRequestCount();
l=l||b.url();if("jsonp"==K(e)){var J="_"+(d.counter++).toString(36);d[J]=function(a){d[J].data=a};var A=g(l.replace("JSON_CALLBACK","angular.callbacks."+J),function(){d[J].data?F(m,200,d[J].data):F(m,v||-2);d[J]=Ea.noop})}else{var x=a(e);x.open(e,l,!0);q(n,function(a,b){B(a)&&x.setRequestHeader(b,a)});x.onreadystatechange=function(){if(x&&4==x.readyState){var a=null,b=null;v!==f&&(a=x.getAllResponseHeaders(),b="response"in x?x.response:x.responseText);F(m,v||x.status,b,a,x.statusText||"")}};r&&(x.withCredentials=
!0);if(z)try{x.responseType=z}catch(s){if("json"!==z)throw s;}x.send(k||null)}if(0<p)var L=c(u,p);else p&&p.then&&p.then(u)}}function Rd(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function g(g,k,m){for(var n,p,r=0,z=[],u=g.length,F=!1,v=[];r<u;)-1!=(n=g.indexOf(b,r))&&-1!=(p=g.indexOf(a,n+f))?(r!=n&&z.push(g.substring(r,n)),z.push(r=c(F=g.substring(n+f,p))),
r.exp=F,r=p+h,F=!0):(r!=u&&z.push(g.substring(r)),r=u);(u=z.length)||(z.push(""),u=1);if(m&&1<z.length)throw vc("noconcat",g);if(!k||F)return v.length=u,r=function(a){try{for(var b=0,c=u,f;b<c;b++)"function"==typeof(f=z[b])&&(f=f(a),f=m?e.getTrusted(m,f):e.valueOf(f),null===f||E(f)?f="":"string"!=typeof f&&(f=qa(f))),v[b]=f;return v.join("")}catch(h){a=vc("interr",g,h.toString()),d(a)}},r.exp=g,r.parts=z,r}var f=b.length,h=a.length;g.startSymbol=function(){return b};g.endSymbol=function(){return a};
return g}]}function Sd(){this.$get=["$rootScope","$window","$q",function(b,a,c){function d(d,f,h,l){var k=a.setInterval,m=a.clearInterval,n=c.defer(),p=n.promise,r=0,z=B(l)&&!l;h=B(h)?h:0;p.then(null,null,d);p.$$intervalId=k(function(){n.notify(r++);0<h&&r>=h&&(n.resolve(r),m(p.$$intervalId),delete e[p.$$intervalId]);z||b.$apply()},f);e[p.$$intervalId]=n;return p}var e={};d.cancel=function(a){return a&&a.$$intervalId in e?(e[a.$$intervalId].reject("canceled"),clearInterval(a.$$intervalId),delete e[a.$$intervalId],
!0):!1};return d}]}function ad(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function wc(b){b=b.split("/");for(var a=b.length;a--;)b[a]=wb(b[a]);return b.join("/")}function xc(b,a,c){b=sa(b,c);a.$$protocol=
b.protocol;a.$$host=b.hostname;a.$$port=Y(b.port)||we[b.protocol]||null}function yc(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=sa(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):b.pathname);a.$$search=Yb(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function oa(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ya(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Jb(b){return b.substr(0,
Ya(b).lastIndexOf("/")+1)}function zc(b,a){this.$$html5=!0;a=a||"";var c=Jb(b);xc(b,this,b);this.$$parse=function(a){var e=oa(c,a);if(!w(e))throw Kb("ipthprfx",a,c);yc(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Zb(this.$$search),b=this.$$hash?"#"+wb(this.$$hash):"";this.$$url=wc(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$rewrite=function(d){var e;if((e=oa(b,d))!==s)return d=e,(e=oa(a,e))!==s?c+(oa("/",e)||e):b+d;if((e=oa(c,
d))!==s)return c+e;if(c==d+"/")return c}}function Lb(b,a){var c=Jb(b);xc(b,this,b);this.$$parse=function(d){var e=oa(b,d)||oa(c,d),e="#"==e.charAt(0)?oa(a,e):this.$$html5?e:"";if(!w(e))throw Kb("ihshprfx",d,a);yc(e,this,b);d=this.$$path;var g=/^\/?.*?:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));g.exec(e)||(d=(e=g.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Zb(this.$$search),e=this.$$hash?"#"+wb(this.$$hash):"";this.$$url=wc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=
b+(this.$$url?a+this.$$url:"")};this.$$rewrite=function(a){if(Ya(b)==Ya(a))return a}}function Ac(b,a){this.$$html5=!0;Lb.apply(this,arguments);var c=Jb(b);this.$$rewrite=function(d){var e;if(b==Ya(d))return d;if(e=oa(c,d))return b+a+e;if(c===d+"/")return c}}function nb(b){return function(){return this[b]}}function Bc(b,a){return function(c){if(E(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Vd(){var b="",a=!1;this.hashPrefix=function(a){return B(a)?(b=a,this):b};this.html5Mode=
function(b){return B(b)?(a=b,this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,g){function f(a){c.$broadcast("$locationChangeSuccess",h.absUrl(),a)}var h,l=d.baseHref(),k=d.url();a?(l=k.substring(0,k.indexOf("/",k.indexOf("//")+2))+(l||"/"),e=e.history?zc:Ac):(l=Ya(k),e=Lb);h=new e(l,"#"+b);h.$$parse(h.$$rewrite(k));g.on("click",function(a){if(!a.ctrlKey&&!a.metaKey&&2!=a.which){for(var b=y(a.target);"a"!==K(b[0].nodeName);)if(b[0]===g[0]||!(b=b.parent())[0])return;
var e=b.prop("href");X(e)&&"[object SVGAnimatedString]"===e.toString()&&(e=sa(e.animVal).href);var f=h.$$rewrite(e);e&&(!b.attr("target")&&f&&!a.isDefaultPrevented())&&(a.preventDefault(),f!=d.url()&&(h.$$parse(f),c.$apply(),O.angular["ff-684208-preventDefault"]=!0))}});h.absUrl()!=k&&d.url(h.absUrl(),!0);d.onUrlChange(function(a){h.absUrl()!=a&&(c.$evalAsync(function(){var b=h.absUrl();h.$$parse(a);c.$broadcast("$locationChangeStart",a,b).defaultPrevented?(h.$$parse(b),d.url(b)):f(b)}),c.$$phase||
c.$digest())});var m=0;c.$watch(function(){var a=d.url(),b=h.$$replace;m&&a==h.absUrl()||(m++,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",h.absUrl(),a).defaultPrevented?h.$$parse(a):(d.url(h.absUrl(),b),f(a))}));h.$$replace=!1;return m});return h}]}function Wd(){var b=!0,a=this;this.debugEnabled=function(a){return B(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:
a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||C;a=!1;try{a=!!e.apply}catch(l){}return a?function(){var a=[];q(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function fa(b,a){if("constructor"===b)throw Ba("isecfld",a);return b}function Za(b,
a){if(b){if(b.constructor===b)throw Ba("isecfn",a);if(b.document&&b.location&&b.alert&&b.setInterval)throw Ba("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw Ba("isecdom",a);}return b}function ob(b,a,c,d,e){e=e||{};a=a.split(".");for(var g,f=0;1<a.length;f++){g=fa(a.shift(),d);var h=b[g];h||(h={},b[g]=h);b=h;b.then&&e.unwrapPromises&&(ta(d),"$$v"in b||function(a){a.then(function(b){a.$$v=b})}(b),b.$$v===s&&(b.$$v={}),b=b.$$v)}g=fa(a.shift(),d);return b[g]=c}function Cc(b,
a,c,d,e,g,f){fa(b,g);fa(a,g);fa(c,g);fa(d,g);fa(e,g);return f.unwrapPromises?function(f,l){var k=l&&l.hasOwnProperty(b)?l:f,m;if(null==k)return k;(k=k[b])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!a)return k;if(null==k)return s;(k=k[a])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!c)return k;if(null==k)return s;(k=k[c])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!d)return k;if(null==
k)return s;(k=k[d])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!e)return k;if(null==k)return s;(k=k[e])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);return k}:function(g,f){var k=f&&f.hasOwnProperty(b)?f:g;if(null==k)return k;k=k[b];if(!a)return k;if(null==k)return s;k=k[a];if(!c)return k;if(null==k)return s;k=k[c];if(!d)return k;if(null==k)return s;k=k[d];return e?null==k?s:k=k[e]:k}}function xe(b,a){fa(b,a);return function(a,
d){return null==a?s:(d&&d.hasOwnProperty(b)?d:a)[b]}}function ye(b,a,c){fa(b,c);fa(a,c);return function(c,e){if(null==c)return s;c=(e&&e.hasOwnProperty(b)?e:c)[b];return null==c?s:c[a]}}function Dc(b,a,c){if(Mb.hasOwnProperty(b))return Mb[b];var d=b.split("."),e=d.length,g;if(a.unwrapPromises||1!==e)if(a.unwrapPromises||2!==e)if(a.csp)g=6>e?Cc(d[0],d[1],d[2],d[3],d[4],c,a):function(b,g){var f=0,h;do h=Cc(d[f++],d[f++],d[f++],d[f++],d[f++],c,a)(b,g),g=s,b=h;while(f<e);return h};else{var f="var p;\n";
q(d,function(b,d){fa(b,c);f+="if(s == null) return undefined;\ns="+(d?"s":'((k&&k.hasOwnProperty("'+b+'"))?k:s)')+'["'+b+'"];\n'+(a.unwrapPromises?'if (s && s.then) {\n pw("'+c.replace(/(["\r\n])/g,"\\$1")+'");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n':"")});var f=f+"return s;",h=new Function("s","k","pw",f);h.toString=aa(f);g=a.unwrapPromises?function(a,b){return h(a,b,ta)}:h}else g=ye(d[0],d[1],c);else g=xe(d[0],c);"hasOwnProperty"!==
b&&(Mb[b]=g);return g}function Xd(){var b={},a={csp:!1,unwrapPromises:!1,logPromiseWarnings:!0};this.unwrapPromises=function(b){return B(b)?(a.unwrapPromises=!!b,this):a.unwrapPromises};this.logPromiseWarnings=function(b){return B(b)?(a.logPromiseWarnings=b,this):a.logPromiseWarnings};this.$get=["$filter","$sniffer","$log",function(c,d,e){a.csp=d.csp;ta=function(b){a.logPromiseWarnings&&!Ec.hasOwnProperty(b)&&(Ec[b]=!0,e.warn("[$parse] Promise found in the expression `"+b+"`. Automatic unwrapping of promises in Angular expressions is deprecated."))};
return function(d){var e;switch(typeof d){case "string":if(b.hasOwnProperty(d))return b[d];e=new Nb(a);e=(new $a(e,c,a)).parse(d,!1);"hasOwnProperty"!==d&&(b[d]=e);return e;case "function":return d;default:return C}}}]}function Zd(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return ze(function(a){b.$evalAsync(a)},a)}]}function ze(b,a){function c(a){return a}function d(a){return f(a)}var e=function(){var f=[],k,m;return m={resolve:function(a){if(f){var c=f;f=s;k=g(a);c.length&&b(function(){for(var a,
b=0,d=c.length;b<d;b++)a=c[b],k.then(a[0],a[1],a[2])})}},reject:function(a){m.resolve(h(a))},notify:function(a){if(f){var c=f;f.length&&b(function(){for(var b,d=0,e=c.length;d<e;d++)b=c[d],b[2](a)})}},promise:{then:function(b,g,h){var m=e(),u=function(d){try{m.resolve((P(b)?b:c)(d))}catch(e){m.reject(e),a(e)}},F=function(b){try{m.resolve((P(g)?g:d)(b))}catch(c){m.reject(c),a(c)}},v=function(b){try{m.notify((P(h)?h:c)(b))}catch(d){a(d)}};f?f.push([u,F,v]):k.then(u,F,v);return m.promise},"catch":function(a){return this.then(null,
a)},"finally":function(a){function b(a,c){var d=e();c?d.resolve(a):d.reject(a);return d.promise}function d(e,g){var f=null;try{f=(a||c)()}catch(h){return b(h,!1)}return f&&P(f.then)?f.then(function(){return b(e,g)},function(a){return b(a,!1)}):b(e,g)}return this.then(function(a){return d(a,!0)},function(a){return d(a,!1)})}}}},g=function(a){return a&&P(a.then)?a:{then:function(c){var d=e();b(function(){d.resolve(c(a))});return d.promise}}},f=function(a){var b=e();b.reject(a);return b.promise},h=function(c){return{then:function(g,
f){var h=e();b(function(){try{h.resolve((P(f)?f:d)(c))}catch(b){h.reject(b),a(b)}});return h.promise}}};return{defer:e,reject:f,when:function(h,k,m,n){var p=e(),r,z=function(b){try{return(P(k)?k:c)(b)}catch(d){return a(d),f(d)}},u=function(b){try{return(P(m)?m:d)(b)}catch(c){return a(c),f(c)}},F=function(b){try{return(P(n)?n:c)(b)}catch(d){a(d)}};b(function(){g(h).then(function(a){r||(r=!0,p.resolve(g(a).then(z,u,F)))},function(a){r||(r=!0,p.resolve(u(a)))},function(a){r||p.notify(F(a))})});return p.promise},
all:function(a){var b=e(),c=0,d=M(a)?[]:{};q(a,function(a,e){c++;g(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise}}}function fe(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,g=e?
function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};g.supported=e;return g}]}function Yd(){var b=10,a=t("$rootScope"),c=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(d,e,g,f){function h(){this.$id=bb();this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this["this"]=this.$root=this;
this.$$destroyed=!1;this.$$asyncQueue=[];this.$$postDigestQueue=[];this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings={}}function l(b){if(p.$$phase)throw a("inprog",p.$$phase);p.$$phase=b}function k(a,b){var c=g(a);Ra(c,b);return c}function m(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function n(){}h.prototype={constructor:h,$new:function(a){a?(a=new h,a.$root=this.$root,a.$$asyncQueue=this.$$asyncQueue,a.$$postDigestQueue=
this.$$postDigestQueue):(a=function(){},a.prototype=this,a=new a,a.$id=bb());a["this"]=a;a.$$listeners={};a.$$listenerCount={};a.$parent=this;a.$$watchers=a.$$nextSibling=a.$$childHead=a.$$childTail=null;a.$$prevSibling=this.$$childTail;this.$$childHead?this.$$childTail=this.$$childTail.$$nextSibling=a:this.$$childHead=this.$$childTail=a;return a},$watch:function(a,b,d){var e=k(a,"watch"),g=this.$$watchers,f={fn:b,last:n,get:e,exp:a,eq:!!d};c=null;if(!P(b)){var h=k(b||C,"listener");f.fn=function(a,
b,c){h(c)}}if("string"==typeof a&&e.constant){var l=f.fn;f.fn=function(a,b,c){l.call(this,a,b,c);Oa(g,f)}}g||(g=this.$$watchers=[]);g.unshift(f);return function(){Oa(g,f);c=null}},$watchCollection:function(a,b){var c=this,d,e,f,h=1<b.length,l=0,k=g(a),m=[],n={},p=!0,q=0;return this.$watch(function(){d=k(c);var a,b;if(X(d))if(ab(d))for(e!==m&&(e=m,q=e.length=0,l++),a=d.length,q!==a&&(l++,e.length=q=a),b=0;b<a;b++)e[b]!==e[b]&&d[b]!==d[b]||e[b]===d[b]||(l++,e[b]=d[b]);else{e!==n&&(e=n={},q=0,l++);a=
0;for(b in d)d.hasOwnProperty(b)&&(a++,e.hasOwnProperty(b)?e[b]!==d[b]&&(l++,e[b]=d[b]):(q++,e[b]=d[b],l++));if(q>a)for(b in l++,e)e.hasOwnProperty(b)&&!d.hasOwnProperty(b)&&(q--,delete e[b])}else e!==d&&(e=d,l++);return l},function(){p?(p=!1,b(d,d,c)):b(d,f,c);if(h)if(X(d))if(ab(d)){f=Array(d.length);for(var a=0;a<d.length;a++)f[a]=d[a]}else for(a in f={},d)Fc.call(d,a)&&(f[a]=d[a]);else f=d})},$digest:function(){var d,g,f,h,k=this.$$asyncQueue,m=this.$$postDigestQueue,q,x,s=b,L,Q=[],y,H,R;l("$digest");
c=null;do{x=!1;for(L=this;k.length;){try{R=k.shift(),R.scope.$eval(R.expression)}catch(B){p.$$phase=null,e(B)}c=null}a:do{if(h=L.$$watchers)for(q=h.length;q--;)try{if(d=h[q])if((g=d.get(L))!==(f=d.last)&&!(d.eq?xa(g,f):"number"==typeof g&&"number"==typeof f&&isNaN(g)&&isNaN(f)))x=!0,c=d,d.last=d.eq?ba(g):g,d.fn(g,f===n?g:f,L),5>s&&(y=4-s,Q[y]||(Q[y]=[]),H=P(d.exp)?"fn: "+(d.exp.name||d.exp.toString()):d.exp,H+="; newVal: "+qa(g)+"; oldVal: "+qa(f),Q[y].push(H));else if(d===c){x=!1;break a}}catch(w){p.$$phase=
null,e(w)}if(!(h=L.$$childHead||L!==this&&L.$$nextSibling))for(;L!==this&&!(h=L.$$nextSibling);)L=L.$parent}while(L=h);if((x||k.length)&&!s--)throw p.$$phase=null,a("infdig",b,qa(Q));}while(x||k.length);for(p.$$phase=null;m.length;)try{m.shift()()}catch(T){e(T)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this!==p&&(q(this.$$listenerCount,eb(null,m,this)),a.$$childHead==this&&(a.$$childHead=this.$$nextSibling),a.$$childTail==this&&
(a.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=null,this.$$listeners={},this.$$watchers=this.$$asyncQueue=this.$$postDigestQueue=[],this.$destroy=this.$digest=this.$apply=C,this.$on=this.$watch=function(){return C})}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a){p.$$phase||
p.$$asyncQueue.length||f.defer(function(){p.$$asyncQueue.length&&p.$digest()});this.$$asyncQueue.push({scope:this,expression:a})},$$postDigest:function(a){this.$$postDigestQueue.push(a)},$apply:function(a){try{return l("$apply"),this.$eval(a)}catch(b){e(b)}finally{p.$$phase=null;try{p.$digest()}catch(c){throw e(c),c;}}},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);
var e=this;return function(){c[db(c,b)]=null;m(e,1,a)}},$emit:function(a,b){var c=[],d,g=this,f=!1,h={name:a,targetScope:g,stopPropagation:function(){f=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},l=[h].concat(ya.call(arguments,1)),k,m;do{d=g.$$listeners[a]||c;h.currentScope=g;k=0;for(m=d.length;k<m;k++)if(d[k])try{d[k].apply(null,l)}catch(n){e(n)}else d.splice(k,1),k--,m--;if(f)break;g=g.$parent}while(g);return h},$broadcast:function(a,b){for(var c=this,d=this,g={name:a,
targetScope:this,preventDefault:function(){g.defaultPrevented=!0},defaultPrevented:!1},f=[g].concat(ya.call(arguments,1)),h,k;c=d;){g.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,f)}catch(l){e(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}return g}};var p=new h;return p}]}function bd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*(https?|ftp|file):|data:image\//;
this.aHrefSanitizationWhitelist=function(a){return B(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return B(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,g;if(!S||8<=S)if(g=sa(c).href,""!==g&&!g.match(e))return"unsafe:"+g;return c}}}function Ae(b){if("self"===b)return b;if(w(b)){if(-1<b.indexOf("***"))throw ua("iwcard",b);b=b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08").replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return RegExp("^"+
b+"$")}if(cb(b))return RegExp("^"+b.source+"$");throw ua("imatcher");}function Gc(b){var a=[];B(b)&&q(b,function(b){a.push(Ae(b))});return a}function ae(){this.SCE_CONTEXTS=ga;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=Gc(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=Gc(b));return a};this.$get=["$injector",function(c){function d(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=
function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var e=function(a){throw ua("unsafe");};c.has("$sanitize")&&(e=c.get("$sanitize"));var g=d(),f={};f[ga.HTML]=d(g);f[ga.CSS]=d(g);f[ga.URL]=d(g);f[ga.JS]=d(g);f[ga.RESOURCE_URL]=d(f[ga.URL]);return{trustAs:function(a,b){var c=f.hasOwnProperty(a)?f[a]:null;if(!c)throw ua("icontext",a,b);if(null===b||b===s||""===b)return b;if("string"!==typeof b)throw ua("itype",a);return new c(b)},
getTrusted:function(c,d){if(null===d||d===s||""===d)return d;var g=f.hasOwnProperty(c)?f[c]:null;if(g&&d instanceof g)return d.$$unwrapTrustedValue();if(c===ga.RESOURCE_URL){var g=sa(d.toString()),m,n,p=!1;m=0;for(n=b.length;m<n;m++)if("self"===b[m]?Ib(g):b[m].exec(g.href)){p=!0;break}if(p)for(m=0,n=a.length;m<n;m++)if("self"===a[m]?Ib(g):a[m].exec(g.href)){p=!1;break}if(p)return d;throw ua("insecurl",d.toString());}if(c===ga.HTML)return e(d);throw ua("unsafe");},valueOf:function(a){return a instanceof
g?a.$$unwrapTrustedValue():a}}}]}function $d(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sniffer","$sceDelegate",function(a,c,d){if(b&&c.msie&&8>c.msieDocumentMode)throw ua("iequirks");var e=ba(ga);e.isEnabled=function(){return b};e.trustAs=d.trustAs;e.getTrusted=d.getTrusted;e.valueOf=d.valueOf;b||(e.trustAs=e.getTrusted=function(a,b){return b},e.valueOf=Da);e.parseAs=function(b,c){var d=a(c);return d.literal&&d.constant?d:function(a,c){return e.getTrusted(b,
d(a,c))}};var g=e.parseAs,f=e.getTrusted,h=e.trustAs;q(ga,function(a,b){var c=K(b);e[Ta("parse_as_"+c)]=function(b){return g(a,b)};e[Ta("get_trusted_"+c)]=function(b){return f(a,b)};e[Ta("trust_as_"+c)]=function(b){return h(a,b)}});return e}]}function be(){this.$get=["$window","$document",function(b,a){var c={},d=Y((/android (\d+)/.exec(K((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),g=a[0]||{},f=g.documentMode,h,l=/^(Moz|webkit|O|ms)(?=[A-Z])/,k=g.body&&g.body.style,
m=!1,n=!1;if(k){for(var p in k)if(m=l.exec(p)){h=m[0];h=h.substr(0,1).toUpperCase()+h.substr(1);break}h||(h="WebkitOpacity"in k&&"webkit");m=!!("transition"in k||h+"Transition"in k);n=!!("animation"in k||h+"Animation"in k);!d||m&&n||(m=w(g.body.style.webkitTransition),n=w(g.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hashchange:"onhashchange"in b&&(!f||7<f),hasEvent:function(a){if("input"==a&&9==S)return!1;if(E(c[a])){var b=g.createElement("div");c[a]="on"+
a in b}return c[a]},csp:Vb(),vendorPrefix:h,transitions:m,animations:n,android:d,msie:S,msieDocumentMode:f}}]}function de(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(b,a,c,d){function e(e,h,l){var k=c.defer(),m=k.promise,n=B(l)&&!l;h=a.defer(function(){try{k.resolve(e())}catch(a){k.reject(a),d(a)}finally{delete g[m.$$timeoutId]}n||b.$apply()},h);m.$$timeoutId=h;g[h]=k;return m}var g={};e.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),
delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return e}]}function sa(b,a){var c=b;S&&(W.setAttribute("href",c),c=W.href);W.setAttribute("href",c);return{href:W.href,protocol:W.protocol?W.protocol.replace(/:$/,""):"",host:W.host,search:W.search?W.search.replace(/^\?/,""):"",hash:W.hash?W.hash.replace(/^#/,""):"",hostname:W.hostname,port:W.port,pathname:"/"===W.pathname.charAt(0)?W.pathname:"/"+W.pathname}}function Ib(b){b=w(b)?sa(b):b;return b.protocol===Hc.protocol&&b.host===Hc.host}
function ee(){this.$get=aa(O)}function gc(b){function a(d,e){if(X(d)){var g={};q(d,function(b,c){g[c]=a(c,b)});return g}return b.factory(d+c,e)}var c="Filter";this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}];a("currency",Ic);a("date",Jc);a("filter",Be);a("json",Ce);a("limitTo",De);a("lowercase",Ee);a("number",Kc);a("orderBy",Lc);a("uppercase",Fe)}function Be(){return function(b,a,c){if(!M(b))return b;var d=typeof c,e=[];e.check=function(a){for(var b=0;b<e.length;b++)if(!e[b](a))return!1;
return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return Ea.equals(a,b)}:function(a,b){if(a&&b&&"object"===typeof a&&"object"===typeof b){for(var d in a)if("$"!==d.charAt(0)&&Fc.call(a,d)&&c(a[d],b[d]))return!0;return!1}b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var g=function(a,b){if("string"==typeof b&&"!"===b.charAt(0))return!g(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,b);case "object":switch(typeof b){case "object":return c(a,
b);default:for(var d in a)if("$"!==d.charAt(0)&&g(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(g(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var f in a)(function(b){"undefined"!=typeof a[b]&&e.push(function(c){return g("$"==b?c:c&&c[b],a[b])})})(f);break;case "function":e.push(a);break;default:return b}d=[];for(f=0;f<b.length;f++){var h=b[f];e.check(h)&&d.push(h)}return d}}function Ic(b){var a=
b.NUMBER_FORMATS;return function(b,d){E(d)&&(d=a.CURRENCY_SYM);return Mc(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,2).replace(/\u00A4/g,d)}}function Kc(b){var a=b.NUMBER_FORMATS;return function(b,d){return Mc(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Mc(b,a,c,d,e){if(null==b||!isFinite(b)||X(b))return"";var g=0>b;b=Math.abs(b);var f=b+"",h="",l=[],k=!1;if(-1!==f.indexOf("e")){var m=f.match(/([\d\.]+)e(-?)(\d+)/);m&&"-"==m[2]&&m[3]>e+1?f="0":(h=f,k=!0)}if(k)0<e&&(-1<b&&1>b)&&(h=b.toFixed(e));
else{f=(f.split(Nc)[1]||"").length;E(e)&&(e=Math.min(Math.max(a.minFrac,f),a.maxFrac));f=Math.pow(10,e);b=Math.round(b*f)/f;b=(""+b).split(Nc);f=b[0];b=b[1]||"";var m=0,n=a.lgSize,p=a.gSize;if(f.length>=n+p)for(m=f.length-n,k=0;k<m;k++)0===(m-k)%p&&0!==k&&(h+=c),h+=f.charAt(k);for(k=m;k<f.length;k++)0===(f.length-k)%n&&0!==k&&(h+=c),h+=f.charAt(k);for(;b.length<e;)b+="0";e&&"0"!==e&&(h+=d+b.substr(0,e))}l.push(g?a.negPre:a.posPre);l.push(h);l.push(g?a.negSuf:a.posSuf);return l.join("")}function Ob(b,
a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function $(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Ob(e,a,d)}}function pb(b,a){return function(c,d){var e=c["get"+b](),g=Fa(a?"SHORT"+b:b);return d[g][e]}}function Jc(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var g=0,f=0,h=b[8]?a.setUTCFullYear:a.setFullYear,l=b[8]?a.setUTCHours:a.setHours;b[9]&&(g=Y(b[9]+b[10]),f=Y(b[9]+b[11]));
h.call(a,Y(b[1]),Y(b[2])-1,Y(b[3]));g=Y(b[4]||0)-g;f=Y(b[5]||0)-f;h=Y(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));l.call(a,g,f,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e){var g="",f=[],h,l;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;w(c)&&(c=Ge.test(c)?Y(c):a(c));vb(c)&&(c=new Date(c));if(!Na(c))return c;for(;e;)(l=He.exec(e))?(f=f.concat(ya.call(l,1)),e=f.pop()):(f.push(e),e=null);q(f,function(a){h=
Ie[a];g+=h?h(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Ce(){return function(b){return qa(b,!0)}}function De(){return function(b,a){if(!M(b)&&!w(b))return b;a=Y(a);if(w(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function Lc(b){return function(a,c,d){function e(a,b){return Qa(b)?function(b,c){return a(c,b)}:a}
function g(a,b){var c=typeof a,d=typeof b;return c==d?("string"==c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!M(a)||!c)return a;c=M(c)?c:[c];c=Uc(c,function(a){var c=!1,d=a||Da;if(w(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);d=b(a);if(d.constant){var f=d();return e(function(a,b){return g(a[f],b[f])},c)}}return e(function(a,b){return g(d(a),d(b))},c)});for(var f=[],h=0;h<a.length;h++)f.push(a[h]);return f.sort(e(function(a,b){for(var d=
0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function va(b){P(b)&&(b={link:b});b.restrict=b.restrict||"AC";return aa(b)}function Oc(b,a,c,d){function e(a,c){c=c?"-"+fb(c,"-"):"";d.removeClass(b,(a?qb:rb)+c);d.addClass(b,(a?rb:qb)+c)}var g=this,f=b.parent().controller("form")||sb,h=0,l=g.$error={},k=[];g.$name=a.name||a.ngForm;g.$dirty=!1;g.$pristine=!0;g.$valid=!0;g.$invalid=!1;f.$addControl(g);b.addClass(La);e(!0);g.$addControl=function(a){Aa(a.$name,"input");k.push(a);a.$name&&
(g[a.$name]=a)};g.$removeControl=function(a){a.$name&&g[a.$name]===a&&delete g[a.$name];q(l,function(b,c){g.$setValidity(c,!0,a)});Oa(k,a)};g.$setValidity=function(a,b,c){var d=l[a];if(b)d&&(Oa(d,c),d.length||(h--,h||(e(b),g.$valid=!0,g.$invalid=!1),l[a]=!1,e(!0,a),f.$setValidity(a,!0,g)));else{h||e(b);if(d){if(-1!=db(d,c))return}else l[a]=d=[],h++,e(!1,a),f.$setValidity(a,!1,g);d.push(c);g.$valid=!1;g.$invalid=!0}};g.$setDirty=function(){d.removeClass(b,La);d.addClass(b,tb);g.$dirty=!0;g.$pristine=
!1;f.$setDirty()};g.$setPristine=function(){d.removeClass(b,tb);d.addClass(b,La);g.$dirty=!1;g.$pristine=!0;q(k,function(a){a.$setPristine()})}}function pa(b,a,c,d){b.$setValidity(a,c);return c?d:s}function Je(b,a,c){var d=c.prop("validity");X(d)&&b.$parsers.push(function(c){if(b.$error[a]||!(d.badInput||d.customError||d.typeMismatch)||d.valueMissing)return c;b.$setValidity(a,!1)})}function ub(b,a,c,d,e,g){var f=a.prop("validity");if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});
a.on("compositionend",function(){h=!1;l()})}var l=function(){if(!h){var e=a.val();Qa(c.ngTrim||"T")&&(e=ca(e));if(d.$viewValue!==e||f&&""===e&&!f.valueMissing)b.$$phase?d.$setViewValue(e):b.$apply(function(){d.$setViewValue(e)})}};if(e.hasEvent("input"))a.on("input",l);else{var k,m=function(){k||(k=g.defer(function(){l();k=null}))};a.on("keydown",function(a){a=a.keyCode;91===a||(15<a&&19>a||37<=a&&40>=a)||m()});if(e.hasEvent("paste"))a.on("paste cut",m)}a.on("change",l);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?
"":d.$viewValue)};var n=c.ngPattern;n&&((e=n.match(/^\/(.*)\/([gim]*)$/))?(n=RegExp(e[1],e[2]),e=function(a){return pa(d,"pattern",d.$isEmpty(a)||n.test(a),a)}):e=function(c){var e=b.$eval(n);if(!e||!e.test)throw t("ngPattern")("noregexp",n,e,ha(a));return pa(d,"pattern",d.$isEmpty(c)||e.test(c),c)},d.$formatters.push(e),d.$parsers.push(e));if(c.ngMinlength){var p=Y(c.ngMinlength);e=function(a){return pa(d,"minlength",d.$isEmpty(a)||a.length>=p,a)};d.$parsers.push(e);d.$formatters.push(e)}if(c.ngMaxlength){var r=
Y(c.ngMaxlength);e=function(a){return pa(d,"maxlength",d.$isEmpty(a)||a.length<=r,a)};d.$parsers.push(e);d.$formatters.push(e)}}function Pb(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!M(a)){if(w(a))return a.split(" ");if(X(a)){var b=[];q(a,function(a,c){a&&b.push(c)});return b}}return a}return{restrict:"AC",link:function(g,f,h){function l(a,b){var c=
f.data("$classCounts")||{},d=[];q(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});f.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===a||g.$index%2===a){var k=e(b||[]);if(!m){var r=l(k,1);h.$addClass(r)}else if(!xa(b,m)){var q=e(m),r=d(k,q),k=d(q,k),k=l(k,-1),r=l(r,1);0===r.length?c.removeClass(f,k):0===k.length?c.addClass(f,r):c.setClass(f,r,k)}}m=ba(b)}var m;g.$watch(h[b],k,!0);h.$observe("class",function(a){k(g.$eval(h[b]))});"ngClass"!==b&&g.$watch("$index",
function(c,d){var f=c&1;if(f!==d&1){var k=e(g.$eval(h[b]));f===a?(f=l(k,1),h.$addClass(f)):(f=l(k,-1),h.$removeClass(f))}})}}}]}var K=function(b){return w(b)?b.toLowerCase():b},Fc=Object.prototype.hasOwnProperty,Fa=function(b){return w(b)?b.toUpperCase():b},S,y,Ga,ya=[].slice,Ke=[].push,wa=Object.prototype.toString,Pa=t("ng"),Ea=O.angular||(O.angular={}),Sa,Ka,ka=["0","0","0"];S=Y((/msie (\d+)/.exec(K(navigator.userAgent))||[])[1]);isNaN(S)&&(S=Y((/trident\/.*; rv:(\d+)/.exec(K(navigator.userAgent))||
[])[1]));C.$inject=[];Da.$inject=[];var ca=function(){return String.prototype.trim?function(b){return w(b)?b.trim():b}:function(b){return w(b)?b.replace(/^\s\s*/,"").replace(/\s\s*$/,""):b}}();Ka=9>S?function(b){b=b.nodeName?b:b[0];return b.scopeName&&"HTML"!=b.scopeName?Fa(b.scopeName+":"+b.nodeName):b.nodeName}:function(b){return b.nodeName?b.nodeName:b[0].nodeName};var Xc=/[A-Z]/g,$c={full:"1.2.16",major:1,minor:2,dot:16,codeName:"badger-enumeration"},Ua=N.cache={},gb=N.expando="ng-"+(new Date).getTime(),
me=1,Pc=O.document.addEventListener?function(b,a,c){b.addEventListener(a,c,!1)}:function(b,a,c){b.attachEvent("on"+a,c)},Fb=O.document.removeEventListener?function(b,a,c){b.removeEventListener(a,c,!1)}:function(b,a,c){b.detachEvent("on"+a,c)};N._data=function(b){return this.cache[b[this.expando]]||{}};var he=/([\:\-\_]+(.))/g,ie=/^moz([A-Z])/,Bb=t("jqLite"),je=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Cb=/<|&#?\w+;/,ke=/<([\w:]+)/,le=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ea=
{option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ea.optgroup=ea.option;ea.tbody=ea.tfoot=ea.colgroup=ea.caption=ea.thead;ea.th=ea.td;var Ja=N.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===U.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),N(O).on("load",a))},toString:function(){var b=
[];q(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?y(this[b]):y(this[this.length+b])},length:0,push:Ke,sort:[].sort,splice:[].splice},kb={};q("multiple selected checked disabled readOnly required open".split(" "),function(b){kb[K(b)]=b});var nc={};q("input select option textarea button form details".split(" "),function(b){nc[Fa(b)]=!0});q({data:jc,inheritedData:jb,scope:function(b){return y(b).data("$scope")||jb(b.parentNode||b,["$isolateScope","$scope"])},
isolateScope:function(b){return y(b).data("$isolateScope")||y(b).data("$isolateScopeNoTemplate")},controller:kc,injector:function(b){return jb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Gb,css:function(b,a,c){a=Ta(a);if(B(c))b.style[a]=c;else{var d;8>=S&&(d=b.currentStyle&&b.currentStyle[a],""===d&&(d="auto"));d=d||b.style[a];8>=S&&(d=""===d?s:d);return d}},attr:function(b,a,c){var d=K(a);if(kb[d])if(B(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));
else return b[a]||(b.attributes.getNamedItem(a)||C).specified?d:s;else if(B(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?s:b},prop:function(b,a,c){if(B(c))b[a]=c;else return b[a]},text:function(){function b(b,d){var e=a[b.nodeType];if(E(d))return e?b[e]:"";b[e]=d}var a=[];9>S?(a[1]="innerText",a[3]="nodeValue"):a[1]=a[3]="textContent";b.$dv="";return b}(),val:function(b,a){if(E(a)){if("SELECT"===Ka(b)&&b.multiple){var c=[];q(b.options,function(a){a.selected&&
c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(E(a))return b.innerHTML;for(var c=0,d=b.childNodes;c<d.length;c++)Ha(d[c]);b.innerHTML=a},empty:lc},function(b,a){N.prototype[a]=function(a,d){var e,g;if(b!==lc&&(2==b.length&&b!==Gb&&b!==kc?a:d)===s){if(X(a)){for(e=0;e<this.length;e++)if(b===jc)b(this[e],a);else for(g in a)b(this[e],g,a[g]);return this}e=b.$dv;g=e===s?Math.min(this.length,1):this.length;for(var f=0;f<g;f++){var h=b(this[f],a,d);e=
e?e+h:h}return e}for(e=0;e<this.length;e++)b(this[e],a,d);return this}});q({removeData:hc,dealoc:Ha,on:function a(c,d,e,g){if(B(g))throw Bb("onargs");var f=la(c,"events"),h=la(c,"handle");f||la(c,"events",f={});h||la(c,"handle",h=ne(c,f));q(d.split(" "),function(d){var g=f[d];if(!g){if("mouseenter"==d||"mouseleave"==d){var m=U.body.contains||U.body.compareDocumentPosition?function(a,c){var d=9===a.nodeType?a.documentElement:a,e=c&&c.parentNode;return a===e||!!(e&&1===e.nodeType&&(d.contains?d.contains(e):
a.compareDocumentPosition&&a.compareDocumentPosition(e)&16))}:function(a,c){if(c)for(;c=c.parentNode;)if(c===a)return!0;return!1};f[d]=[];a(c,{mouseleave:"mouseout",mouseenter:"mouseover"}[d],function(a){var c=a.relatedTarget;c&&(c===this||m(this,c))||h(a,d)})}else Pc(c,d,h),f[d]=[];g=f[d]}g.push(e)})},off:ic,one:function(a,c,d){a=y(a);a.on(c,function g(){a.off(c,d);a.off(c,g)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;Ha(a);q(new N(c),function(c){d?e.insertBefore(c,d.nextSibling):
e.replaceChild(c,a);d=c})},children:function(a){var c=[];q(a.childNodes,function(a){1===a.nodeType&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){q(new N(c),function(c){1!==a.nodeType&&11!==a.nodeType||a.appendChild(c)})},prepend:function(a,c){if(1===a.nodeType){var d=a.firstChild;q(new N(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=y(c)[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:function(a){Ha(a);
var c=a.parentNode;c&&c.removeChild(a)},after:function(a,c){var d=a,e=a.parentNode;q(new N(c),function(a){e.insertBefore(a,d.nextSibling);d=a})},addClass:ib,removeClass:hb,toggleClass:function(a,c,d){c&&q(c.split(" "),function(c){var g=d;E(g)&&(g=!Gb(a,c));(g?ib:hb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){if(a.nextElementSibling)return a.nextElementSibling;for(a=a.nextSibling;null!=a&&1!==a.nodeType;)a=a.nextSibling;return a},find:function(a,c){return a.getElementsByTagName?
a.getElementsByTagName(c):[]},clone:Eb,triggerHandler:function(a,c,d){c=(la(a,"events")||{})[c];d=d||[];var e=[{preventDefault:C,stopPropagation:C}];q(c,function(c){c.apply(a,e.concat(d))})}},function(a,c){N.prototype[c]=function(c,e,g){for(var f,h=0;h<this.length;h++)E(f)?(f=a(this[h],c,e,g),B(f)&&(f=y(f))):Db(f,a(this[h],c,e,g));return B(f)?f:this};N.prototype.bind=N.prototype.on;N.prototype.unbind=N.prototype.off});Va.prototype={put:function(a,c){this[Ia(a)]=c},get:function(a){return this[Ia(a)]},
remove:function(a){var c=this[a=Ia(a)];delete this[a];return c}};var pe=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,qe=/,/,re=/^\s*(_?)(\S+?)\1\s*$/,oe=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Wa=t("$injector"),Le=t("$animate"),Ld=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Le("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?
a:null);return this.$$classNameFilter};this.$get=["$timeout","$$asyncCallback",function(a,d){return{enter:function(a,c,f,h){f?f.after(a):(c&&c[0]||(c=f.parent()),c.append(a));h&&d(h)},leave:function(a,c){a.remove();c&&d(c)},move:function(a,c,d,h){this.enter(a,c,d,h)},addClass:function(a,c,f){c=w(c)?c:M(c)?c.join(" "):"";q(a,function(a){ib(a,c)});f&&d(f)},removeClass:function(a,c,f){c=w(c)?c:M(c)?c.join(" "):"";q(a,function(a){hb(a,c)});f&&d(f)},setClass:function(a,c,f,h){q(a,function(a){ib(a,c);hb(a,
f)});h&&d(h)},enabled:C}}]}],ja=t("$compile");cc.$inject=["$provide","$$sanitizeUriProvider"];var te=/^(x[\:\-_]|data[\:\-_])/i,vc=t("$interpolate"),Me=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,we={http:80,https:443,ftp:21},Kb=t("$location");Ac.prototype=Lb.prototype=zc.prototype={$$html5:!1,$$replace:!1,absUrl:nb("$$absUrl"),url:function(a,c){if(E(a))return this.$$url;var d=Me.exec(a);d[1]&&this.path(decodeURIComponent(d[1]));(d[2]||d[1])&&this.search(d[3]||"");this.hash(d[5]||"",c);return this},protocol:nb("$$protocol"),
host:nb("$$host"),port:nb("$$port"),path:Bc("$$path",function(a){return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(w(a))this.$$search=Yb(a);else if(X(a))this.$$search=a;else throw Kb("isrcharg");break;default:E(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:Bc("$$hash",Da),replace:function(){this.$$replace=!0;return this}};var Ba=t("$parse"),Ec={},ta,Ma={"null":function(){return null},"true":function(){return!0},
"false":function(){return!1},undefined:C,"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return B(d)?B(e)?d+e:d:B(e)?e:s},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(B(d)?d:0)-(B(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"^":function(a,c,d,e){return d(a,c)^e(a,c)},"=":C,"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,
c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"&":function(a,c,d,e){return d(a,c)&e(a,c)},"|":function(a,c,d,e){return e(a,c)(a,c,d(a,c))},"!":function(a,c,d){return!d(a,c)}},Ne={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},
Nb=function(a){this.options=a};Nb.prototype={constructor:Nb,lex:function(a){this.text=a;this.index=0;this.ch=s;this.lastCh=":";this.tokens=[];var c;for(a=[];this.index<this.text.length;){this.ch=this.text.charAt(this.index);if(this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent(),this.was("{,")&&("{"===a[0]&&(c=this.tokens[this.tokens.length-1]))&&(c.json=-1===c.text.indexOf("."));
else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch,json:this.was(":[,")&&this.is("{[")||this.is("}]:,")}),this.is("{[")&&a.unshift(this.ch),this.is("}]")&&a.shift(),this.index++;else if(this.isWhitespace(this.ch)){this.index++;continue}else{var d=this.ch+this.peek(),e=d+this.peek(2),g=Ma[this.ch],f=Ma[d],h=Ma[e];h?(this.tokens.push({index:this.index,text:e,fn:h}),this.index+=3):f?(this.tokens.push({index:this.index,text:d,fn:f}),this.index+=2):g?(this.tokens.push({index:this.index,
text:this.ch,fn:g,json:this.was("[,:")&&this.is("+-")}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},was:function(a){return-1!==a.indexOf(this.lastCh)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===
a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=B(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw Ba("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=K(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=
d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,json:!0,fn:function(){return a}})},readIdent:function(){for(var a=this,c="",d=this.index,e,g,f,h;this.index<this.text.length;){h=this.text.charAt(this.index);if("."===h||this.isIdent(h)||this.isNumber(h))"."===h&&(e=this.index),c+=h;else break;
this.index++}if(e)for(g=this.index;g<this.text.length;){h=this.text.charAt(g);if("("===h){f=c.substr(e-d+1);c=c.substr(0,e-d);this.index=g;break}if(this.isWhitespace(h))g++;else break}d={index:d,text:c};if(Ma.hasOwnProperty(c))d.fn=Ma[c],d.json=Ma[c];else{var l=Dc(c,this.options,this.text);d.fn=D(function(a,c){return l(a,c)},{assign:function(d,e){return ob(d,c,e,a.text,a.options)}})}this.tokens.push(d);f&&(this.tokens.push({index:e,text:".",json:!1}),this.tokens.push({index:e+1,text:f,json:!1}))},
readString:function(a){var c=this.index;this.index++;for(var d="",e=a,g=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),e=e+f;if(g)"u"===f?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d=(g=Ne[f])?d+g:d+f,g=!1;else if("\\"===f)g=!0;else{if(f===a){this.index++;this.tokens.push({index:c,text:e,string:d,json:!0,fn:function(){return d}});return}d+=
f}this.index++}this.throwError("Unterminated quote",c)}};var $a=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};$a.ZERO=D(function(){return 0},{constant:!0});$a.prototype={constructor:$a,parse:function(a,c){this.text=a;this.json=c;this.tokens=this.lexer.lex(a);c&&(this.assignment=this.logicalOR,this.functionCall=this.fieldAccess=this.objectIndex=this.filterChain=function(){this.throwError("is not valid json",{text:a,index:0})});var d=c?this.primary():this.statements();0!==this.tokens.length&&
this.throwError("is an unexpected token",this.tokens[0]);d.literal=!!d.literal;d.constant=!!d.constant;return d},primary:function(){var a;if(this.expect("("))a=this.filterChain(),this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);c.json&&(a.constant=!0,a.literal=!0)}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?
(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw Ba("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw Ba("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var g=this.tokens[0],f=g.text;if(f===a||f===c||f===d||f===e||!(a||c||d||e))return g}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,
e))?(this.json&&!a.json&&this.throwError("is not valid json",a),this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},unaryFn:function(a,c){return D(function(d,e){return a(d,e,c)},{constant:c.constant})},ternaryFn:function(a,c,d){return D(function(e,g){return a(e,g)?c(e,g):d(e,g)},{constant:a.constant&&c.constant&&d.constant})},binaryFn:function(a,c,d){return D(function(e,g){return c(e,g,a,d)},{constant:a.constant&&d.constant})},
statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,g=0;g<a.length;g++){var f=a[g];f&&(e=f(c,d))}return e}},filterChain:function(){for(var a=this.expression(),c;;)if(c=this.expect("|"))a=this.binaryFn(a,c.fn,this.filter());else return a},filter:function(){for(var a=this.expect(),c=this.$filter(a.text),d=[];;)if(a=this.expect(":"))d.push(this.expression());else{var e=
function(a,e,h){h=[h];for(var l=0;l<d.length;l++)h.push(d[l](a,e));return c.apply(a,h)};return function(){return e}}},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),function(d,g){return a.assign(d,c(d,g),g)}):a},ternary:function(){var a=this.logicalOR(),c,d;if(this.expect("?")){c=this.ternary();
if(d=this.expect(":"))return this.ternaryFn(a,c,this.ternary());this.throwError("expected :",d)}else return a},logicalOR:function(){for(var a=this.logicalAND(),c;;)if(c=this.expect("||"))a=this.binaryFn(a,c.fn,this.logicalAND());else return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND());return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},
relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn($a.ZERO,a.fn,
this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},fieldAccess:function(a){var c=this,d=this.expect().text,e=Dc(d,this.options,this.text);return D(function(c,d,h){return e(h||a(c,d))},{assign:function(e,f,h){return ob(a(e,h),d,f,c.text,c.options)}})},objectIndex:function(a){var c=this,d=this.expression();this.consume("]");return D(function(e,g){var f=a(e,g),h=d(e,g),l;if(!f)return s;(f=Za(f[h],c.text))&&(f.then&&c.options.unwrapPromises)&&(l=f,"$$v"in f||(l.$$v=s,l.then(function(a){l.$$v=
a})),f=f.$$v);return f},{assign:function(e,g,f){var h=d(e,f);return Za(a(e,f),c.text)[h]=g}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this;return function(g,f){for(var h=[],l=c?c(g,f):g,k=0;k<d.length;k++)h.push(d[k](g,f));k=a(g,f,l)||C;Za(l,e.text);Za(k,e.text);h=k.apply?k.apply(l,h):k(h[0],h[1],h[2],h[3],h[4]);return Za(h,e.text)}},arrayDeclaration:function(){var a=[],c=!0;if("]"!==this.peekToken().text){do{if(this.peek("]"))break;
var d=this.expression();a.push(d);d.constant||(c=!1)}while(this.expect(","))}this.consume("]");return D(function(c,d){for(var f=[],h=0;h<a.length;h++)f.push(a[h](c,d));return f},{literal:!0,constant:c})},object:function(){var a=[],c=!0;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.expect(),d=d.string||d.text;this.consume(":");var e=this.expression();a.push({key:d,value:e});e.constant||(c=!1)}while(this.expect(","))}this.consume("}");return D(function(c,d){for(var e={},l=0;l<
a.length;l++){var k=a[l];e[k.key]=k.value(c,d)}return e},{literal:!0,constant:c})}};var Mb={},ua=t("$sce"),ga={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},W=U.createElement("a"),Hc=sa(O.location.href,!0);gc.$inject=["$provide"];Ic.$inject=["$locale"];Kc.$inject=["$locale"];var Nc=".",Ie={yyyy:$("FullYear",4),yy:$("FullYear",2,0,!0),y:$("FullYear",1),MMMM:pb("Month"),MMM:pb("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",
1),hh:$("Hours",2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",1),sss:$("Milliseconds",3),EEEE:pb("Day"),EEE:pb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Ob(Math[0<a?"floor":"ceil"](a/60),2)+Ob(Math.abs(a%60),2))}},He=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,Ge=/^\-?\d+$/;Jc.$inject=["$locale"];var Ee=aa(K),Fe=aa(Fa);Lc.$inject=
["$parse"];var cd=aa({restrict:"E",compile:function(a,c){8>=S&&(c.href||c.name||c.$set("href",""),a.append(U.createComment("IE fix")));if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var g="[object SVGAnimatedString]"===wa.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(g)||a.preventDefault()})}}}),zb={};q(kb,function(a,c){if("multiple"!=a){var d=na("ng-"+c);zb[d]=function(){return{priority:100,link:function(a,g,f){a.$watch(f[d],function(a){f.$set(c,!!a)})}}}}});q(["src",
"srcset","href"],function(a){var c=na("ng-"+a);zb[c]=function(){return{priority:99,link:function(d,e,g){var f=a,h=a;"href"===a&&"[object SVGAnimatedString]"===wa.call(e.prop("href"))&&(h="xlinkHref",g.$attr[h]="xlink:href",f=null);g.$observe(c,function(a){a&&(g.$set(h,a),S&&f&&e.prop(f,g[h]))})}}}});var sb={$addControl:C,$removeControl:C,$setValidity:C,$setDirty:C,$setPristine:C};Oc.$inject=["$element","$attrs","$scope","$animate"];var Qc=function(a){return["$timeout",function(c){return{name:"form",
restrict:a?"EAC":"E",controller:Oc,compile:function(){return{pre:function(a,e,g,f){if(!g.action){var h=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1};Pc(e[0],"submit",h);e.on("$destroy",function(){c(function(){Fb(e[0],"submit",h)},0,!1)})}var l=e.parent().controller("form"),k=g.name||g.ngForm;k&&ob(a,k,f,k);if(l)e.on("$destroy",function(){l.$removeControl(f);k&&ob(a,k,s,k);D(f,sb)})}}}}}]},dd=Qc(),qd=Qc(!0),Oe=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
Pe=/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,Qe=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Rc={text:ub,number:function(a,c,d,e,g,f){ub(a,c,d,e,g,f);e.$parsers.push(function(a){var c=e.$isEmpty(a);if(c||Qe.test(a))return e.$setValidity("number",!0),""===a?null:c?a:parseFloat(a);e.$setValidity("number",!1);return s});Je(e,"number",c);e.$formatters.push(function(a){return e.$isEmpty(a)?"":""+a});d.min&&(a=function(a){var c=parseFloat(d.min);return pa(e,"min",e.$isEmpty(a)||a>=c,a)},e.$parsers.push(a),
e.$formatters.push(a));d.max&&(a=function(a){var c=parseFloat(d.max);return pa(e,"max",e.$isEmpty(a)||a<=c,a)},e.$parsers.push(a),e.$formatters.push(a));e.$formatters.push(function(a){return pa(e,"number",e.$isEmpty(a)||vb(a),a)})},url:function(a,c,d,e,g,f){ub(a,c,d,e,g,f);a=function(a){return pa(e,"url",e.$isEmpty(a)||Oe.test(a),a)};e.$formatters.push(a);e.$parsers.push(a)},email:function(a,c,d,e,g,f){ub(a,c,d,e,g,f);a=function(a){return pa(e,"email",e.$isEmpty(a)||Pe.test(a),a)};e.$formatters.push(a);
e.$parsers.push(a)},radio:function(a,c,d,e){E(d.name)&&c.attr("name",bb());c.on("click",function(){c[0].checked&&a.$apply(function(){e.$setViewValue(d.value)})});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e){var g=d.ngTrueValue,f=d.ngFalseValue;w(g)||(g=!0);w(f)||(f=!1);c.on("click",function(){a.$apply(function(){e.$setViewValue(c[0].checked)})});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==g};
e.$formatters.push(function(a){return a===g});e.$parsers.push(function(a){return a?g:f})},hidden:C,button:C,submit:C,reset:C,file:C},dc=["$browser","$sniffer",function(a,c){return{restrict:"E",require:"?ngModel",link:function(d,e,g,f){f&&(Rc[K(g.type)]||Rc.text)(d,e,g,f,c,a)}}}],rb="ng-valid",qb="ng-invalid",La="ng-pristine",tb="ng-dirty",Re=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate",function(a,c,d,e,g,f){function h(a,c){c=c?"-"+fb(c,"-"):"";f.removeClass(e,(a?qb:rb)+c);
f.addClass(e,(a?rb:qb)+c)}this.$modelValue=this.$viewValue=Number.NaN;this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$name=d.name;var l=g(d.ngModel),k=l.assign;if(!k)throw t("ngModel")("nonassign",d.ngModel,ha(e));this.$render=C;this.$isEmpty=function(a){return E(a)||""===a||null===a||a!==a};var m=e.inheritedData("$formController")||sb,n=0,p=this.$error={};e.addClass(La);h(!0);this.$setValidity=function(a,c){p[a]!==
!c&&(c?(p[a]&&n--,n||(h(!0),this.$valid=!0,this.$invalid=!1)):(h(!1),this.$invalid=!0,this.$valid=!1,n++),p[a]=!c,h(c,a),m.$setValidity(a,c,this))};this.$setPristine=function(){this.$dirty=!1;this.$pristine=!0;f.removeClass(e,tb);f.addClass(e,La)};this.$setViewValue=function(d){this.$viewValue=d;this.$pristine&&(this.$dirty=!0,this.$pristine=!1,f.removeClass(e,La),f.addClass(e,tb),m.$setDirty());q(this.$parsers,function(a){d=a(d)});this.$modelValue!==d&&(this.$modelValue=d,k(a,d),q(this.$viewChangeListeners,
function(a){try{a()}catch(d){c(d)}}))};var r=this;a.$watch(function(){var c=l(a);if(r.$modelValue!==c){var d=r.$formatters,e=d.length;for(r.$modelValue=c;e--;)c=d[e](c);r.$viewValue!==c&&(r.$viewValue=c,r.$render())}return c})}],Fd=function(){return{require:["ngModel","^?form"],controller:Re,link:function(a,c,d,e){var g=e[0],f=e[1]||sb;f.$addControl(g);a.$on("$destroy",function(){f.$removeControl(g)})}}},Hd=aa({require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),
ec=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){d.required=!0;var g=function(a){if(d.required&&e.$isEmpty(a))e.$setValidity("required",!1);else return e.$setValidity("required",!0),a};e.$formatters.push(g);e.$parsers.unshift(g);d.$observe("required",function(){g(e.$viewValue)})}}}},Gd=function(){return{require:"ngModel",link:function(a,c,d,e){var g=(a=/\/(.*)\//.exec(d.ngList))&&RegExp(a[1])||d.ngList||",";e.$parsers.push(function(a){if(!E(a)){var c=[];a&&q(a.split(g),function(a){a&&
c.push(ca(a))});return c}});e.$formatters.push(function(a){return M(a)?a.join(", "):s});e.$isEmpty=function(a){return!a||!a.length}}}},Se=/^(true|false|\d+)$/,Id=function(){return{priority:100,compile:function(a,c){return Se.test(c.ngValue)?function(a,c,g){g.$set("value",a.$eval(g.ngValue))}:function(a,c,g){a.$watch(g.ngValue,function(a){g.$set("value",a)})}}}},id=va(function(a,c,d){c.addClass("ng-binding").data("$binding",d.ngBind);a.$watch(d.ngBind,function(a){c.text(a==s?"":a)})}),kd=["$interpolate",
function(a){return function(c,d,e){c=a(d.attr(e.$attr.ngBindTemplate));d.addClass("ng-binding").data("$binding",c);e.$observe("ngBindTemplate",function(a){d.text(a)})}}],jd=["$sce","$parse",function(a,c){return function(d,e,g){e.addClass("ng-binding").data("$binding",g.ngBindHtml);var f=c(g.ngBindHtml);d.$watch(function(){return(f(d)||"").toString()},function(c){e.html(a.getTrustedHtml(f(d))||"")})}}],ld=Pb("",!0),nd=Pb("Odd",0),md=Pb("Even",1),od=va({compile:function(a,c){c.$set("ngCloak",s);a.removeClass("ng-cloak")}}),
pd=[function(){return{scope:!0,controller:"@",priority:500}}],fc={};q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=na("ng-"+a);fc[c]=["$parse",function(d){return{compile:function(e,g){var f=d(g[c]);return function(c,d,e){d.on(K(a),function(a){c.$apply(function(){f(c,{$event:a})})})}}}}]});var sd=["$animate",function(a){return{transclude:"element",priority:600,terminal:!0,restrict:"A",
$$tlb:!0,link:function(c,d,e,g,f){var h,l,k;c.$watch(e.ngIf,function(g){Qa(g)?l||(l=c.$new(),f(l,function(c){c[c.length++]=U.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)})):(k&&(k.remove(),k=null),l&&(l.$destroy(),l=null),h&&(k=yb(h.clone),a.leave(k,function(){k=null}),h=null))})}}}],td=["$http","$templateCache","$anchorScroll","$animate","$sce",function(a,c,d,e,g){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:Ea.noop,compile:function(f,
h){var l=h.ngInclude||h.src,k=h.onload||"",m=h.autoscroll;return function(f,h,q,s,u){var F=0,v,y,A,x=function(){y&&(y.remove(),y=null);v&&(v.$destroy(),v=null);A&&(e.leave(A,function(){y=null}),y=A,A=null)};f.$watch(g.parseAsResourceUrl(l),function(g){var l=function(){!B(m)||m&&!f.$eval(m)||d()},q=++F;g?(a.get(g,{cache:c}).success(function(a){if(q===F){var c=f.$new();s.template=a;a=u(c,function(a){x();e.enter(a,null,h,l)});v=c;A=a;v.$emit("$includeContentLoaded");f.$eval(k)}}).error(function(){q===
F&&x()}),f.$emit("$includeContentRequested")):(x(),s.template=null)})}}}}],Jd=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,g){d.html(g.template);a(d.contents())(c)}}}],ud=va({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),vd=va({terminal:!0,priority:1E3}),wd=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,g,f){var h=f.count,l=f.$attr.when&&g.attr(f.$attr.when),k=f.offset||
0,m=e.$eval(l)||{},n={},p=c.startSymbol(),r=c.endSymbol(),s=/^when(Minus)?(.+)$/;q(f,function(a,c){s.test(c)&&(m[K(c.replace("when","").replace("Minus","-"))]=g.attr(f.$attr[c]))});q(m,function(a,e){n[e]=c(a.replace(d,p+h+"-"+k+r))});e.$watch(function(){var c=parseFloat(e.$eval(h));if(isNaN(c))return"";c in m||(c=a.pluralCat(c-k));return n[c](e,g,!0)},function(a){g.text(a)})}}}],xd=["$parse","$animate",function(a,c){var d=t("ngRepeat");return{transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,
link:function(e,g,f,h,l){var k=f.ngRepeat,m=k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),n,p,r,s,u,F,v={$id:Ia};if(!m)throw d("iexp",k);f=m[1];h=m[2];(m=m[3])?(n=a(m),p=function(a,c,d){F&&(v[F]=a);v[u]=c;v.$index=d;return n(e,v)}):(r=function(a,c){return Ia(c)},s=function(a){return a});m=f.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!m)throw d("iidexp",f);u=m[3]||m[1];F=m[2];var B={};e.$watchCollection(h,function(a){var f,h,m=g[0],n,v={},H,R,w,C,T,t,
E=[];if(ab(a))T=a,n=p||r;else{n=p||s;T=[];for(w in a)a.hasOwnProperty(w)&&"$"!=w.charAt(0)&&T.push(w);T.sort()}H=T.length;h=E.length=T.length;for(f=0;f<h;f++)if(w=a===T?f:T[f],C=a[w],C=n(w,C,f),Aa(C,"`track by` id"),B.hasOwnProperty(C))t=B[C],delete B[C],v[C]=t,E[f]=t;else{if(v.hasOwnProperty(C))throw q(E,function(a){a&&a.scope&&(B[a.id]=a)}),d("dupes",k,C);E[f]={id:C};v[C]=!1}for(w in B)B.hasOwnProperty(w)&&(t=B[w],f=yb(t.clone),c.leave(f),q(f,function(a){a.$$NG_REMOVED=!0}),t.scope.$destroy());
f=0;for(h=T.length;f<h;f++){w=a===T?f:T[f];C=a[w];t=E[f];E[f-1]&&(m=E[f-1].clone[E[f-1].clone.length-1]);if(t.scope){R=t.scope;n=m;do n=n.nextSibling;while(n&&n.$$NG_REMOVED);t.clone[0]!=n&&c.move(yb(t.clone),null,y(m));m=t.clone[t.clone.length-1]}else R=e.$new();R[u]=C;F&&(R[F]=w);R.$index=f;R.$first=0===f;R.$last=f===H-1;R.$middle=!(R.$first||R.$last);R.$odd=!(R.$even=0===(f&1));t.scope||l(R,function(a){a[a.length++]=U.createComment(" end ngRepeat: "+k+" ");c.enter(a,null,y(m));m=a;t.scope=R;t.clone=
a;v[t.id]=t})}B=v})}}}],yd=["$animate",function(a){return function(c,d,e){c.$watch(e.ngShow,function(c){a[Qa(c)?"removeClass":"addClass"](d,"ng-hide")})}}],rd=["$animate",function(a){return function(c,d,e){c.$watch(e.ngHide,function(c){a[Qa(c)?"addClass":"removeClass"](d,"ng-hide")})}}],zd=va(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&q(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),Ad=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases=
{}}],link:function(c,d,e,g){var f,h,l,k=[];c.$watch(e.ngSwitch||e.on,function(d){var n,p=k.length;if(0<p){if(l){for(n=0;n<p;n++)l[n].remove();l=null}l=[];for(n=0;n<p;n++){var r=h[n];k[n].$destroy();l[n]=r;a.leave(r,function(){l.splice(n,1);0===l.length&&(l=null)})}}h=[];k=[];if(f=g.cases["!"+d]||g.cases["?"])c.$eval(e.change),q(f,function(d){var e=c.$new();k.push(e);d.transclude(e,function(c){var e=d.element;h.push(c);a.enter(c,e.parent(),e)})})})}}}],Bd=va({transclude:"element",priority:800,require:"^ngSwitch",
link:function(a,c,d,e,g){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:g,element:c})}}),Cd=va({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,g){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:g,element:c})}}),Ed=va({link:function(a,c,d,e,g){if(!g)throw t("ngTransclude")("orphan",ha(c));g(function(a){c.empty();c.append(a)})}}),ed=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,
d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],Te=t("ngOptions"),Dd=aa({terminal:!0}),fd=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,e={$setViewValue:C};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var l=this,k={},m=e,n;l.databound=
d.ngModel;l.init=function(a,c,d){m=a;n=d};l.addOption=function(c){Aa(c,'"option value"');k[c]=!0;m.$viewValue==c&&(a.val(c),n.parent()&&n.remove())};l.removeOption=function(a){this.hasOption(a)&&(delete k[a],m.$viewValue==a&&this.renderUnknownOption(a))};l.renderUnknownOption=function(c){c="? "+Ia(c)+" ?";n.val(c);a.prepend(n);a.val(c);n.prop("selected",!0)};l.hasOption=function(a){return k.hasOwnProperty(a)};c.$on("$destroy",function(){l.renderUnknownOption=C})}],link:function(e,f,h,l){function k(a,
c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(A.parent()&&A.remove(),c.val(a),""===a&&w.prop("selected",!0)):E(a)&&w?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){A.parent()&&A.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;d.$render=function(){var a=new Va(d.$viewValue);q(c.find("option"),function(c){c.selected=B(a.get(c.value))})};a.$watch(function(){xa(e,d.$viewValue)||(e=ba(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=
[];q(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function n(e,f,g){function h(){var a={"":[]},c=[""],d,k,s,t,z;t=g.$modelValue;z=y(e)||[];var E=n?Qb(z):z,F,I,A;I={};s=!1;var D,H;if(r)if(w&&M(t))for(s=new Va([]),A=0;A<t.length;A++)I[m]=t[A],s.put(w(e,I),t[A]);else s=new Va(t);for(A=0;F=E.length,A<F;A++){k=A;if(n){k=E[A];if("$"===k.charAt(0))continue;I[n]=k}I[m]=z[k];d=p(e,I)||"";(k=a[d])||(k=a[d]=[],c.push(d));r?d=B(s.remove(w?w(e,I):q(e,I))):(w?(d={},d[m]=t,d=
w(e,d)===w(e,I)):d=t===q(e,I),s=s||d);D=l(e,I);D=B(D)?D:"";k.push({id:w?w(e,I):n?E[A]:A,label:D,selected:d})}r||(u||null===t?a[""].unshift({id:"",label:"",selected:!s}):s||a[""].unshift({id:"?",label:"",selected:!0}));I=0;for(E=c.length;I<E;I++){d=c[I];k=a[d];x.length<=I?(t={element:C.clone().attr("label",d),label:k.label},z=[t],x.push(z),f.append(t.element)):(z=x[I],t=z[0],t.label!=d&&t.element.attr("label",t.label=d));D=null;A=0;for(F=k.length;A<F;A++)s=k[A],(d=z[A+1])?(D=d.element,d.label!==s.label&&
D.text(d.label=s.label),d.id!==s.id&&D.val(d.id=s.id),d.selected!==s.selected&&D.prop("selected",d.selected=s.selected)):(""===s.id&&u?H=u:(H=v.clone()).val(s.id).attr("selected",s.selected).text(s.label),z.push({element:H,label:s.label,id:s.id,selected:s.selected}),D?D.after(H):t.element.append(H),D=H);for(A++;z.length>A;)z.pop().element.remove()}for(;x.length>I;)x.pop()[0].element.remove()}var k;if(!(k=t.match(d)))throw Te("iexp",t,ha(f));var l=c(k[2]||k[1]),m=k[4]||k[6],n=k[5],p=c(k[3]||""),q=
c(k[2]?k[1]:m),y=c(k[7]),w=k[8]?c(k[8]):null,x=[[{element:f,label:""}]];u&&(a(u)(e),u.removeClass("ng-scope"),u.remove());f.empty();f.on("change",function(){e.$apply(function(){var a,c=y(e)||[],d={},h,k,l,p,t,v,u;if(r)for(k=[],p=0,v=x.length;p<v;p++)for(a=x[p],l=1,t=a.length;l<t;l++){if((h=a[l].element)[0].selected){h=h.val();n&&(d[n]=h);if(w)for(u=0;u<c.length&&(d[m]=c[u],w(e,d)!=h);u++);else d[m]=c[h];k.push(q(e,d))}}else{h=f.val();if("?"==h)k=s;else if(""===h)k=null;else if(w)for(u=0;u<c.length;u++){if(d[m]=
c[u],w(e,d)==h){k=q(e,d);break}}else d[m]=c[h],n&&(d[n]=h),k=q(e,d);1<x[0].length&&x[0][1].id!==h&&(x[0][1].selected=!1)}g.$setViewValue(k)})});g.$render=h;e.$watch(h)}if(l[1]){var p=l[0];l=l[1];var r=h.multiple,t=h.ngOptions,u=!1,w,v=y(U.createElement("option")),C=y(U.createElement("optgroup")),A=v.clone();h=0;for(var x=f.children(),D=x.length;h<D;h++)if(""===x[h].value){w=u=x.eq(h);break}p.init(l,u,A);r&&(l.$isEmpty=function(a){return!a||0===a.length});t?n(e,f,l):r?m(e,f,l):k(e,f,l,p)}}}}],hd=["$interpolate",
function(a){var c={addOption:C,removeOption:C};return{restrict:"E",priority:100,compile:function(d,e){if(E(e.value)){var g=a(d.text(),!0);g||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),m=k.data("$selectController")||k.parent().data("$selectController");m&&m.databound?d.prop("selected",!1):m=c;g?a.$watch(g,function(a,c){e.$set("value",a);a!==c&&m.removeOption(c);m.addOption(a)}):m.addOption(e.value);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],gd=aa({restrict:"E",
terminal:!0});O.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):((Ga=O.jQuery)?(y=Ga,D(Ga.fn,{scope:Ja.scope,isolateScope:Ja.isolateScope,controller:Ja.controller,injector:Ja.injector,inheritedData:Ja.inheritedData}),Ab("remove",!0,!0,!1),Ab("empty",!1,!1,!1),Ab("html",!1,!1,!0)):y=N,Ea.element=y,Zc(Ea),y(U).ready(function(){Wc(U,$b)}))})(window,document);!angular.$$csp()&&angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>');
//# sourceMappingURL=angular.min.js.map

}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\angular\\lib\\angular.min.js","/..\\..\\node_modules\\angular\\lib")
},{"buffer":9,"ngpmcQ":12}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer\\index.js","/..\\..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer")
},{"base64-js":10,"buffer":9,"ieee754":11,"ngpmcQ":12}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer\\node_modules\\base64-js\\lib\\b64.js","/..\\..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer\\node_modules\\base64-js\\lib")
},{"buffer":9,"ngpmcQ":12}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer\\node_modules\\ieee754\\index.js","/..\\..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer\\node_modules\\ieee754")
},{"buffer":9,"ngpmcQ":12}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("ngpmcQ"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\process\\browser.js","/..\\..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\process")
},{"buffer":9,"ngpmcQ":12}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJEOlxceGFtcHBcXGh0ZG9jc1xcdW5pcXVlZmxpcFxcbm9kZV9tb2R1bGVzXFxndWxwLWJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiRDoveGFtcHAvaHRkb2NzL3VuaXF1ZWZsaXAvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvR2FtZUN0cmwuanMiLCJEOi94YW1wcC9odGRvY3MvdW5pcXVlZmxpcC9hcHAvc2NyaXB0cy9jb250cm9sbGVycy9HYW1lb3ZlckN0cmwuanMiLCJEOi94YW1wcC9odGRvY3MvdW5pcXVlZmxpcC9hcHAvc2NyaXB0cy9mYWtlXzc1OTIyZDRjLmpzIiwiRDoveGFtcHAvaHRkb2NzL3VuaXF1ZWZsaXAvYXBwL3NjcmlwdHMvcm91dGVzLmpzIiwiRDoveGFtcHAvaHRkb2NzL3VuaXF1ZWZsaXAvYXBwL3NjcmlwdHMvc2VydmljZXMvU3RhdHVzLmpzIiwiRDoveGFtcHAvaHRkb2NzL3VuaXF1ZWZsaXAvbm9kZV9tb2R1bGVzL2FuZ3VsYXItcm91dGUvYW5ndWxhci1yb3V0ZS5qcyIsIkQ6L3hhbXBwL2h0ZG9jcy91bmlxdWVmbGlwL25vZGVfbW9kdWxlcy9hbmd1bGFyL2luZGV4LWJyb3dzZXJpZnkuanMiLCJEOi94YW1wcC9odGRvY3MvdW5pcXVlZmxpcC9ub2RlX21vZHVsZXMvYW5ndWxhci9saWIvYW5ndWxhci5taW4uanMiLCJEOi94YW1wcC9odGRvY3MvdW5pcXVlZmxpcC9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJEOi94YW1wcC9odGRvY3MvdW5pcXVlZmxpcC9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzIiwiRDoveGFtcHAvaHRkb2NzL3VuaXF1ZWZsaXAvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwiRDoveGFtcHAvaHRkb2NzL3VuaXF1ZWZsaXAvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqNkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgR2FtZUN0cmwgPSBmdW5jdGlvbigkc2NvcGUsIFN0YXR1cywgJGxvY2F0aW9uKSB7XHJcbiAgJHNjb3BlLmNhcmRzID0gWzAsMCwwLDAsMCwwLDAsMCwwXTtcclxuICAkc2NvcGUudW5pcXVlID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSo5KSk7XHJcbiAgJHNjb3BlLmNhcmRzWyRzY29wZS51bmlxdWVdID0gMTtcclxuICAkc2NvcGUuc2VsZWN0cyA9IFtdO1xyXG5cclxuICAkc2NvcGUuc2VsZWN0ID0gZnVuY3Rpb24oaWQpIHtcclxuICBcdGlmICgkc2NvcGUuc2VsZWN0cy5sZW5ndGggPCAzKSB7XHJcbiAgXHRcdGlmICgkc2NvcGUuc2VsZWN0cy5pbmRleE9mKGlkKSA9PSAtMSkge1xyXG4gIFx0XHRcdCRzY29wZS5zZWxlY3RzLnB1c2goaWQpO1xyXG5cclxuICAgICAgICBpZiAoJHNjb3BlLmNhcmRzW2lkXSA9PSAxKSB7XHJcbiAgICAgICAgICBTdGF0dXMuc2V0U3RhdHVzKHRydWUpO1xyXG4gICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9nYW1lb3ZlcicpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLnNlbGVjdHMubGVuZ3RoID09IDMpIHtcclxuICAgICAgICAgIFN0YXR1cy5zZXRTdGF0dXMoZmFsc2UpO1xyXG4gICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9nYW1lb3ZlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIFx0fSBcclxuICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVDdHJsO1xufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJuZ3BtY1FcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb250cm9sbGVyc1xcXFxHYW1lQ3RybC5qc1wiLFwiL2NvbnRyb2xsZXJzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIEdhbWVvdmVyQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgU3RhdHVzLCAkbG9jYXRpb24pIHtcclxuICAkc2NvcGUuc3RhdHVzID0gU3RhdHVzLmdldFN0YXR1cygpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lb3ZlckN0cmw7XG59KS5jYWxsKHRoaXMscmVxdWlyZShcIm5ncG1jUVwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbnRyb2xsZXJzXFxcXEdhbWVvdmVyQ3RybC5qc1wiLFwiL2NvbnRyb2xsZXJzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnZhciBHYW1lQ3RybCA9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvR2FtZUN0cmwnKTtcclxudmFyIEdhbWVvdmVyQ3RybCA9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvR2FtZW92ZXJDdHJsJyk7XHJcbnZhciBTdGF0dXMgPSByZXF1aXJlKCcuL3NlcnZpY2VzL1N0YXR1cycpO1xyXG5yZXF1aXJlKCcuL3JvdXRlcycpO1xyXG5cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdteUFwcCcsIFsnbXlBcHAucm91dGVzJ10pO1xyXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCBHYW1lQ3RybCk7XHJcbmFwcC5jb250cm9sbGVyKCdHYW1lb3ZlckN0cmwnLCBHYW1lb3ZlckN0cmwpO1xyXG5hcHAuZmFjdG9yeSgnU3RhdHVzJywgU3RhdHVzKTtcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwibmdwbWNRXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvZmFrZV83NTkyMmQ0Yy5qc1wiLFwiL1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG5yZXF1aXJlKCdhbmd1bGFyLXJvdXRlJyk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAucm91dGVzJywgWyduZ1JvdXRlJ10pXHJcblxyXG5cdC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcblxyXG5cdFx0JHJvdXRlUHJvdmlkZXIud2hlbignL2dhbWUnLCB7XHJcblx0XHRcdHRlbXBsYXRlVXJsOiAndmlld3MvZ2FtZS5odG1sJyxcclxuXHRcdFx0Y29udHJvbGxlcjogJ0dhbWVDdHJsJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JHJvdXRlUHJvdmlkZXIud2hlbignL2dhbWVvdmVyJywge1xyXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2dhbWVvdmVyLmh0bWwnLFxyXG5cdFx0XHRjb250cm9sbGVyOiAnR2FtZW92ZXJDdHJsJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JHJvdXRlUHJvdmlkZXIub3RoZXJ3aXNlKHtyZWRpcmVjdFRvOiAnL2dhbWUnfSk7XHJcblx0fV0pO1xufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJuZ3BtY1FcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9yb3V0ZXMuanNcIixcIi9cIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgU3RhdHVzID0gZnVuY3Rpb24oKSB7XHJcbiAgXHR2YXIgc3RhdHVzID0gZmFsc2U7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgXHRnZXRTdGF0dXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgXHRcdHJldHVybiBzdGF0dXM7XHJcbiAgICBcdH0sXHJcbiAgICBcdHNldFN0YXR1czogZnVuY3Rpb24odmFsKSB7XHJcbiAgICBcdFx0c3RhdHVzID0gdmFsO1xyXG4gICAgXHR9XHJcbiAgICB9O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTdGF0dXM7XG59KS5jYWxsKHRoaXMscmVxdWlyZShcIm5ncG1jUVwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3NlcnZpY2VzXFxcXFN0YXR1cy5qc1wiLFwiL3NlcnZpY2VzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyoqXG4gKiBAbGljZW5zZSBBbmd1bGFySlMgdjEuMi4xNy1idWlsZC4xNjMrc2hhLmZhZmNkNjJcbiAqIChjKSAyMDEwLTIwMTQgR29vZ2xlLCBJbmMuIGh0dHA6Ly9hbmd1bGFyanMub3JnXG4gKiBMaWNlbnNlOiBNSVRcbiAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgYW5ndWxhciwgdW5kZWZpbmVkKSB7J3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ2RvYyBtb2R1bGVcbiAqIEBuYW1lIG5nUm91dGVcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqICMgbmdSb3V0ZVxuICpcbiAqIFRoZSBgbmdSb3V0ZWAgbW9kdWxlIHByb3ZpZGVzIHJvdXRpbmcgYW5kIGRlZXBsaW5raW5nIHNlcnZpY2VzIGFuZCBkaXJlY3RpdmVzIGZvciBhbmd1bGFyIGFwcHMuXG4gKlxuICogIyMgRXhhbXBsZVxuICogU2VlIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSNleGFtcGxlICRyb3V0ZX0gZm9yIGFuIGV4YW1wbGUgb2YgY29uZmlndXJpbmcgYW5kIHVzaW5nIGBuZ1JvdXRlYC5cbiAqXG4gKlxuICogPGRpdiBkb2MtbW9kdWxlLWNvbXBvbmVudHM9XCJuZ1JvdXRlXCI+PC9kaXY+XG4gKi9cbiAvKiBnbG9iYWwgLW5nUm91dGVNb2R1bGUgKi9cbnZhciBuZ1JvdXRlTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nUm91dGUnLCBbJ25nJ10pLlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIoJyRyb3V0ZScsICRSb3V0ZVByb3ZpZGVyKTtcblxuLyoqXG4gKiBAbmdkb2MgcHJvdmlkZXJcbiAqIEBuYW1lICRyb3V0ZVByb3ZpZGVyXG4gKiBAZnVuY3Rpb25cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBVc2VkIGZvciBjb25maWd1cmluZyByb3V0ZXMuXG4gKlxuICogIyMgRXhhbXBsZVxuICogU2VlIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSNleGFtcGxlICRyb3V0ZX0gZm9yIGFuIGV4YW1wbGUgb2YgY29uZmlndXJpbmcgYW5kIHVzaW5nIGBuZ1JvdXRlYC5cbiAqXG4gKiAjIyBEZXBlbmRlbmNpZXNcbiAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdSb3V0ZSBgbmdSb3V0ZWB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXG4gKi9cbmZ1bmN0aW9uICRSb3V0ZVByb3ZpZGVyKCl7XG4gIGZ1bmN0aW9uIGluaGVyaXQocGFyZW50LCBleHRyYSkge1xuICAgIHJldHVybiBhbmd1bGFyLmV4dGVuZChuZXcgKGFuZ3VsYXIuZXh0ZW5kKGZ1bmN0aW9uKCkge30sIHtwcm90b3R5cGU6cGFyZW50fSkpKCksIGV4dHJhKTtcbiAgfVxuXG4gIHZhciByb3V0ZXMgPSB7fTtcblxuICAvKipcbiAgICogQG5nZG9jIG1ldGhvZFxuICAgKiBAbmFtZSAkcm91dGVQcm92aWRlciN3aGVuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFJvdXRlIHBhdGggKG1hdGNoZWQgYWdhaW5zdCBgJGxvY2F0aW9uLnBhdGhgKS4gSWYgYCRsb2NhdGlvbi5wYXRoYFxuICAgKiAgICBjb250YWlucyByZWR1bmRhbnQgdHJhaWxpbmcgc2xhc2ggb3IgaXMgbWlzc2luZyBvbmUsIHRoZSByb3V0ZSB3aWxsIHN0aWxsIG1hdGNoIGFuZCB0aGVcbiAgICogICAgYCRsb2NhdGlvbi5wYXRoYCB3aWxsIGJlIHVwZGF0ZWQgdG8gYWRkIG9yIGRyb3AgdGhlIHRyYWlsaW5nIHNsYXNoIHRvIGV4YWN0bHkgbWF0Y2ggdGhlXG4gICAqICAgIHJvdXRlIGRlZmluaXRpb24uXG4gICAqXG4gICAqICAgICogYHBhdGhgIGNhbiBjb250YWluIG5hbWVkIGdyb3VwcyBzdGFydGluZyB3aXRoIGEgY29sb246IGUuZy4gYDpuYW1lYC4gQWxsIGNoYXJhY3RlcnMgdXBcbiAgICogICAgICAgIHRvIHRoZSBuZXh0IHNsYXNoIGFyZSBtYXRjaGVkIGFuZCBzdG9yZWQgaW4gYCRyb3V0ZVBhcmFtc2AgdW5kZXIgdGhlIGdpdmVuIGBuYW1lYFxuICAgKiAgICAgICAgd2hlbiB0aGUgcm91dGUgbWF0Y2hlcy5cbiAgICogICAgKiBgcGF0aGAgY2FuIGNvbnRhaW4gbmFtZWQgZ3JvdXBzIHN0YXJ0aW5nIHdpdGggYSBjb2xvbiBhbmQgZW5kaW5nIHdpdGggYSBzdGFyOlxuICAgKiAgICAgICAgZS5nLmA6bmFtZSpgLiBBbGwgY2hhcmFjdGVycyBhcmUgZWFnZXJseSBzdG9yZWQgaW4gYCRyb3V0ZVBhcmFtc2AgdW5kZXIgdGhlIGdpdmVuIGBuYW1lYFxuICAgKiAgICAgICAgd2hlbiB0aGUgcm91dGUgbWF0Y2hlcy5cbiAgICogICAgKiBgcGF0aGAgY2FuIGNvbnRhaW4gb3B0aW9uYWwgbmFtZWQgZ3JvdXBzIHdpdGggYSBxdWVzdGlvbiBtYXJrOiBlLmcuYDpuYW1lP2AuXG4gICAqXG4gICAqICAgIEZvciBleGFtcGxlLCByb3V0ZXMgbGlrZSBgL2NvbG9yLzpjb2xvci9sYXJnZWNvZGUvOmxhcmdlY29kZSpcXC9lZGl0YCB3aWxsIG1hdGNoXG4gICAqICAgIGAvY29sb3IvYnJvd24vbGFyZ2Vjb2RlL2NvZGUvd2l0aC9zbGFzaGVzL2VkaXRgIGFuZCBleHRyYWN0OlxuICAgKlxuICAgKiAgICAqIGBjb2xvcjogYnJvd25gXG4gICAqICAgICogYGxhcmdlY29kZTogY29kZS93aXRoL3NsYXNoZXNgLlxuICAgKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcm91dGUgTWFwcGluZyBpbmZvcm1hdGlvbiB0byBiZSBhc3NpZ25lZCB0byBgJHJvdXRlLmN1cnJlbnRgIG9uIHJvdXRlXG4gICAqICAgIG1hdGNoLlxuICAgKlxuICAgKiAgICBPYmplY3QgcHJvcGVydGllczpcbiAgICpcbiAgICogICAgLSBgY29udHJvbGxlcmAg4oCTIGB7KHN0cmluZ3xmdW5jdGlvbigpPX1gIOKAkyBDb250cm9sbGVyIGZuIHRoYXQgc2hvdWxkIGJlIGFzc29jaWF0ZWQgd2l0aFxuICAgKiAgICAgIG5ld2x5IGNyZWF0ZWQgc2NvcGUgb3IgdGhlIG5hbWUgb2YgYSB7QGxpbmsgYW5ndWxhci5Nb2R1bGUjY29udHJvbGxlciByZWdpc3RlcmVkXG4gICAqICAgICAgY29udHJvbGxlcn0gaWYgcGFzc2VkIGFzIGEgc3RyaW5nLlxuICAgKiAgICAtIGBjb250cm9sbGVyQXNgIOKAkyBge3N0cmluZz19YCDigJMgQSBjb250cm9sbGVyIGFsaWFzIG5hbWUuIElmIHByZXNlbnQgdGhlIGNvbnRyb2xsZXIgd2lsbCBiZVxuICAgKiAgICAgIHB1Ymxpc2hlZCB0byBzY29wZSB1bmRlciB0aGUgYGNvbnRyb2xsZXJBc2AgbmFtZS5cbiAgICogICAgLSBgdGVtcGxhdGVgIOKAkyBge3N0cmluZz18ZnVuY3Rpb24oKT19YCDigJMgaHRtbCB0ZW1wbGF0ZSBhcyBhIHN0cmluZyBvciBhIGZ1bmN0aW9uIHRoYXRcbiAgICogICAgICByZXR1cm5zIGFuIGh0bWwgdGVtcGxhdGUgYXMgYSBzdHJpbmcgd2hpY2ggc2hvdWxkIGJlIHVzZWQgYnkge0BsaW5rXG4gICAqICAgICAgbmdSb3V0ZS5kaXJlY3RpdmU6bmdWaWV3IG5nVmlld30gb3Ige0BsaW5rIG5nLmRpcmVjdGl2ZTpuZ0luY2x1ZGUgbmdJbmNsdWRlfSBkaXJlY3RpdmVzLlxuICAgKiAgICAgIFRoaXMgcHJvcGVydHkgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIGB0ZW1wbGF0ZVVybGAuXG4gICAqXG4gICAqICAgICAgSWYgYHRlbXBsYXRlYCBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcbiAgICpcbiAgICogICAgICAtIGB7QXJyYXkuPE9iamVjdD59YCAtIHJvdXRlIHBhcmFtZXRlcnMgZXh0cmFjdGVkIGZyb20gdGhlIGN1cnJlbnRcbiAgICogICAgICAgIGAkbG9jYXRpb24ucGF0aCgpYCBieSBhcHBseWluZyB0aGUgY3VycmVudCByb3V0ZVxuICAgKlxuICAgKiAgICAtIGB0ZW1wbGF0ZVVybGAg4oCTIGB7c3RyaW5nPXxmdW5jdGlvbigpPX1gIOKAkyBwYXRoIG9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHBhdGggdG8gYW4gaHRtbFxuICAgKiAgICAgIHRlbXBsYXRlIHRoYXQgc2hvdWxkIGJlIHVzZWQgYnkge0BsaW5rIG5nUm91dGUuZGlyZWN0aXZlOm5nVmlldyBuZ1ZpZXd9LlxuICAgKlxuICAgKiAgICAgIElmIGB0ZW1wbGF0ZVVybGAgaXMgYSBmdW5jdGlvbiwgaXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gICAqXG4gICAqICAgICAgLSBge0FycmF5LjxPYmplY3Q+fWAgLSByb3V0ZSBwYXJhbWV0ZXJzIGV4dHJhY3RlZCBmcm9tIHRoZSBjdXJyZW50XG4gICAqICAgICAgICBgJGxvY2F0aW9uLnBhdGgoKWAgYnkgYXBwbHlpbmcgdGhlIGN1cnJlbnQgcm91dGVcbiAgICpcbiAgICogICAgLSBgcmVzb2x2ZWAgLSBge09iamVjdC48c3RyaW5nLCBmdW5jdGlvbj49fWAgLSBBbiBvcHRpb25hbCBtYXAgb2YgZGVwZW5kZW5jaWVzIHdoaWNoIHNob3VsZFxuICAgKiAgICAgIGJlIGluamVjdGVkIGludG8gdGhlIGNvbnRyb2xsZXIuIElmIGFueSBvZiB0aGVzZSBkZXBlbmRlbmNpZXMgYXJlIHByb21pc2VzLCB0aGUgcm91dGVyXG4gICAqICAgICAgd2lsbCB3YWl0IGZvciB0aGVtIGFsbCB0byBiZSByZXNvbHZlZCBvciBvbmUgdG8gYmUgcmVqZWN0ZWQgYmVmb3JlIHRoZSBjb250cm9sbGVyIGlzXG4gICAqICAgICAgaW5zdGFudGlhdGVkLlxuICAgKiAgICAgIElmIGFsbCB0aGUgcHJvbWlzZXMgYXJlIHJlc29sdmVkIHN1Y2Nlc3NmdWxseSwgdGhlIHZhbHVlcyBvZiB0aGUgcmVzb2x2ZWQgcHJvbWlzZXMgYXJlXG4gICAqICAgICAgaW5qZWN0ZWQgYW5kIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSMkcm91dGVDaGFuZ2VTdWNjZXNzICRyb3V0ZUNoYW5nZVN1Y2Nlc3N9IGV2ZW50IGlzXG4gICAqICAgICAgZmlyZWQuIElmIGFueSBvZiB0aGUgcHJvbWlzZXMgYXJlIHJlamVjdGVkIHRoZVxuICAgKiAgICAgIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSMkcm91dGVDaGFuZ2VFcnJvciAkcm91dGVDaGFuZ2VFcnJvcn0gZXZlbnQgaXMgZmlyZWQuIFRoZSBtYXAgb2JqZWN0XG4gICAqICAgICAgaXM6XG4gICAqXG4gICAqICAgICAgLSBga2V5YCDigJMgYHtzdHJpbmd9YDogYSBuYW1lIG9mIGEgZGVwZW5kZW5jeSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBjb250cm9sbGVyLlxuICAgKiAgICAgIC0gYGZhY3RvcnlgIC0gYHtzdHJpbmd8ZnVuY3Rpb259YDogSWYgYHN0cmluZ2AgdGhlbiBpdCBpcyBhbiBhbGlhcyBmb3IgYSBzZXJ2aWNlLlxuICAgKiAgICAgICAgT3RoZXJ3aXNlIGlmIGZ1bmN0aW9uLCB0aGVuIGl0IGlzIHtAbGluayBhdXRvLiRpbmplY3RvciNpbnZva2UgaW5qZWN0ZWR9XG4gICAqICAgICAgICBhbmQgdGhlIHJldHVybiB2YWx1ZSBpcyB0cmVhdGVkIGFzIHRoZSBkZXBlbmRlbmN5LiBJZiB0aGUgcmVzdWx0IGlzIGEgcHJvbWlzZSwgaXQgaXNcbiAgICogICAgICAgIHJlc29sdmVkIGJlZm9yZSBpdHMgdmFsdWUgaXMgaW5qZWN0ZWQgaW50byB0aGUgY29udHJvbGxlci4gQmUgYXdhcmUgdGhhdFxuICAgKiAgICAgICAgYG5nUm91dGUuJHJvdXRlUGFyYW1zYCB3aWxsIHN0aWxsIHJlZmVyIHRvIHRoZSBwcmV2aW91cyByb3V0ZSB3aXRoaW4gdGhlc2UgcmVzb2x2ZVxuICAgKiAgICAgICAgZnVuY3Rpb25zLiAgVXNlIGAkcm91dGUuY3VycmVudC5wYXJhbXNgIHRvIGFjY2VzcyB0aGUgbmV3IHJvdXRlIHBhcmFtZXRlcnMsIGluc3RlYWQuXG4gICAqXG4gICAqICAgIC0gYHJlZGlyZWN0VG9gIOKAkyB7KHN0cmluZ3xmdW5jdGlvbigpKT19IOKAkyB2YWx1ZSB0byB1cGRhdGVcbiAgICogICAgICB7QGxpbmsgbmcuJGxvY2F0aW9uICRsb2NhdGlvbn0gcGF0aCB3aXRoIGFuZCB0cmlnZ2VyIHJvdXRlIHJlZGlyZWN0aW9uLlxuICAgKlxuICAgKiAgICAgIElmIGByZWRpcmVjdFRvYCBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcbiAgICpcbiAgICogICAgICAtIGB7T2JqZWN0LjxzdHJpbmc+fWAgLSByb3V0ZSBwYXJhbWV0ZXJzIGV4dHJhY3RlZCBmcm9tIHRoZSBjdXJyZW50XG4gICAqICAgICAgICBgJGxvY2F0aW9uLnBhdGgoKWAgYnkgYXBwbHlpbmcgdGhlIGN1cnJlbnQgcm91dGUgdGVtcGxhdGVVcmwuXG4gICAqICAgICAgLSBge3N0cmluZ31gIC0gY3VycmVudCBgJGxvY2F0aW9uLnBhdGgoKWBcbiAgICogICAgICAtIGB7T2JqZWN0fWAgLSBjdXJyZW50IGAkbG9jYXRpb24uc2VhcmNoKClgXG4gICAqXG4gICAqICAgICAgVGhlIGN1c3RvbSBgcmVkaXJlY3RUb2AgZnVuY3Rpb24gaXMgZXhwZWN0ZWQgdG8gcmV0dXJuIGEgc3RyaW5nIHdoaWNoIHdpbGwgYmUgdXNlZFxuICAgKiAgICAgIHRvIHVwZGF0ZSBgJGxvY2F0aW9uLnBhdGgoKWAgYW5kIGAkbG9jYXRpb24uc2VhcmNoKClgLlxuICAgKlxuICAgKiAgICAtIGBbcmVsb2FkT25TZWFyY2g9dHJ1ZV1gIC0ge2Jvb2xlYW49fSAtIHJlbG9hZCByb3V0ZSB3aGVuIG9ubHkgYCRsb2NhdGlvbi5zZWFyY2goKWBcbiAgICogICAgICBvciBgJGxvY2F0aW9uLmhhc2goKWAgY2hhbmdlcy5cbiAgICpcbiAgICogICAgICBJZiB0aGUgb3B0aW9uIGlzIHNldCB0byBgZmFsc2VgIGFuZCB1cmwgaW4gdGhlIGJyb3dzZXIgY2hhbmdlcywgdGhlblxuICAgKiAgICAgIGAkcm91dGVVcGRhdGVgIGV2ZW50IGlzIGJyb2FkY2FzdGVkIG9uIHRoZSByb290IHNjb3BlLlxuICAgKlxuICAgKiAgICAtIGBbY2FzZUluc2Vuc2l0aXZlTWF0Y2g9ZmFsc2VdYCAtIHtib29sZWFuPX0gLSBtYXRjaCByb3V0ZXMgd2l0aG91dCBiZWluZyBjYXNlIHNlbnNpdGl2ZVxuICAgKlxuICAgKiAgICAgIElmIHRoZSBvcHRpb24gaXMgc2V0IHRvIGB0cnVlYCwgdGhlbiB0aGUgcGFydGljdWxhciByb3V0ZSBjYW4gYmUgbWF0Y2hlZCB3aXRob3V0IGJlaW5nXG4gICAqICAgICAgY2FzZSBzZW5zaXRpdmVcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gc2VsZlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQWRkcyBhIG5ldyByb3V0ZSBkZWZpbml0aW9uIHRvIHRoZSBgJHJvdXRlYCBzZXJ2aWNlLlxuICAgKi9cbiAgdGhpcy53aGVuID0gZnVuY3Rpb24ocGF0aCwgcm91dGUpIHtcbiAgICByb3V0ZXNbcGF0aF0gPSBhbmd1bGFyLmV4dGVuZChcbiAgICAgIHtyZWxvYWRPblNlYXJjaDogdHJ1ZX0sXG4gICAgICByb3V0ZSxcbiAgICAgIHBhdGggJiYgcGF0aFJlZ0V4cChwYXRoLCByb3V0ZSlcbiAgICApO1xuXG4gICAgLy8gY3JlYXRlIHJlZGlyZWN0aW9uIGZvciB0cmFpbGluZyBzbGFzaGVzXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIHZhciByZWRpcmVjdFBhdGggPSAocGF0aFtwYXRoLmxlbmd0aC0xXSA9PSAnLycpXG4gICAgICAgICAgICA/IHBhdGguc3Vic3RyKDAsIHBhdGgubGVuZ3RoLTEpXG4gICAgICAgICAgICA6IHBhdGggKycvJztcblxuICAgICAgcm91dGVzW3JlZGlyZWN0UGF0aF0gPSBhbmd1bGFyLmV4dGVuZChcbiAgICAgICAge3JlZGlyZWN0VG86IHBhdGh9LFxuICAgICAgICBwYXRoUmVnRXhwKHJlZGlyZWN0UGF0aCwgcm91dGUpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gICAvKipcbiAgICAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9IHBhdGhcbiAgICAqIEBwYXJhbSBvcHRzIHtPYmplY3R9IG9wdGlvbnNcbiAgICAqIEByZXR1cm4gez9PYmplY3R9XG4gICAgKlxuICAgICogQGRlc2NyaXB0aW9uXG4gICAgKiBOb3JtYWxpemVzIHRoZSBnaXZlbiBwYXRoLCByZXR1cm5pbmcgYSByZWd1bGFyIGV4cHJlc3Npb25cbiAgICAqIGFuZCB0aGUgb3JpZ2luYWwgcGF0aC5cbiAgICAqXG4gICAgKiBJbnNwaXJlZCBieSBwYXRoUmV4cCBpbiB2aXNpb25tZWRpYS9leHByZXNzL2xpYi91dGlscy5qcy5cbiAgICAqL1xuICBmdW5jdGlvbiBwYXRoUmVnRXhwKHBhdGgsIG9wdHMpIHtcbiAgICB2YXIgaW5zZW5zaXRpdmUgPSBvcHRzLmNhc2VJbnNlbnNpdGl2ZU1hdGNoLFxuICAgICAgICByZXQgPSB7XG4gICAgICAgICAgb3JpZ2luYWxQYXRoOiBwYXRoLFxuICAgICAgICAgIHJlZ2V4cDogcGF0aFxuICAgICAgICB9LFxuICAgICAgICBrZXlzID0gcmV0LmtleXMgPSBbXTtcblxuICAgIHBhdGggPSBwYXRoXG4gICAgICAucmVwbGFjZSgvKFsoKS5dKS9nLCAnXFxcXCQxJylcbiAgICAgIC5yZXBsYWNlKC8oXFwvKT86KFxcdyspKFtcXD9cXCpdKT8vZywgZnVuY3Rpb24oXywgc2xhc2gsIGtleSwgb3B0aW9uKXtcbiAgICAgICAgdmFyIG9wdGlvbmFsID0gb3B0aW9uID09PSAnPycgPyBvcHRpb24gOiBudWxsO1xuICAgICAgICB2YXIgc3RhciA9IG9wdGlvbiA9PT0gJyonID8gb3B0aW9uIDogbnVsbDtcbiAgICAgICAga2V5cy5wdXNoKHsgbmFtZToga2V5LCBvcHRpb25hbDogISFvcHRpb25hbCB9KTtcbiAgICAgICAgc2xhc2ggPSBzbGFzaCB8fCAnJztcbiAgICAgICAgcmV0dXJuICcnXG4gICAgICAgICAgKyAob3B0aW9uYWwgPyAnJyA6IHNsYXNoKVxuICAgICAgICAgICsgJyg/OidcbiAgICAgICAgICArIChvcHRpb25hbCA/IHNsYXNoIDogJycpXG4gICAgICAgICAgKyAoc3RhciAmJiAnKC4rPyknIHx8ICcoW14vXSspJylcbiAgICAgICAgICArIChvcHRpb25hbCB8fCAnJylcbiAgICAgICAgICArICcpJ1xuICAgICAgICAgICsgKG9wdGlvbmFsIHx8ICcnKTtcbiAgICAgIH0pXG4gICAgICAucmVwbGFjZSgvKFtcXC8kXFwqXSkvZywgJ1xcXFwkMScpO1xuXG4gICAgcmV0LnJlZ2V4cCA9IG5ldyBSZWdFeHAoJ14nICsgcGF0aCArICckJywgaW5zZW5zaXRpdmUgPyAnaScgOiAnJyk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmdkb2MgbWV0aG9kXG4gICAqIEBuYW1lICRyb3V0ZVByb3ZpZGVyI290aGVyd2lzZVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogU2V0cyByb3V0ZSBkZWZpbml0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIG9uIHJvdXRlIGNoYW5nZSB3aGVuIG5vIG90aGVyIHJvdXRlIGRlZmluaXRpb25cbiAgICogaXMgbWF0Y2hlZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyBNYXBwaW5nIGluZm9ybWF0aW9uIHRvIGJlIGFzc2lnbmVkIHRvIGAkcm91dGUuY3VycmVudGAuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlbGZcbiAgICovXG4gIHRoaXMub3RoZXJ3aXNlID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgdGhpcy53aGVuKG51bGwsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cblxuICB0aGlzLiRnZXQgPSBbJyRyb290U2NvcGUnLFxuICAgICAgICAgICAgICAgJyRsb2NhdGlvbicsXG4gICAgICAgICAgICAgICAnJHJvdXRlUGFyYW1zJyxcbiAgICAgICAgICAgICAgICckcScsXG4gICAgICAgICAgICAgICAnJGluamVjdG9yJyxcbiAgICAgICAgICAgICAgICckaHR0cCcsXG4gICAgICAgICAgICAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgICAgICAgICAgICAgJyRzY2UnLFxuICAgICAgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvY2F0aW9uLCAkcm91dGVQYXJhbXMsICRxLCAkaW5qZWN0b3IsICRodHRwLCAkdGVtcGxhdGVDYWNoZSwgJHNjZSkge1xuXG4gICAgLyoqXG4gICAgICogQG5nZG9jIHNlcnZpY2VcbiAgICAgKiBAbmFtZSAkcm91dGVcbiAgICAgKiBAcmVxdWlyZXMgJGxvY2F0aW9uXG4gICAgICogQHJlcXVpcmVzICRyb3V0ZVBhcmFtc1xuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtPYmplY3R9IGN1cnJlbnQgUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHJvdXRlIGRlZmluaXRpb24uXG4gICAgICogVGhlIHJvdXRlIGRlZmluaXRpb24gY29udGFpbnM6XG4gICAgICpcbiAgICAgKiAgIC0gYGNvbnRyb2xsZXJgOiBUaGUgY29udHJvbGxlciBjb25zdHJ1Y3RvciBhcyBkZWZpbmUgaW4gcm91dGUgZGVmaW5pdGlvbi5cbiAgICAgKiAgIC0gYGxvY2Fsc2A6IEEgbWFwIG9mIGxvY2FscyB3aGljaCBpcyB1c2VkIGJ5IHtAbGluayBuZy4kY29udHJvbGxlciAkY29udHJvbGxlcn0gc2VydmljZSBmb3JcbiAgICAgKiAgICAgY29udHJvbGxlciBpbnN0YW50aWF0aW9uLiBUaGUgYGxvY2Fsc2AgY29udGFpblxuICAgICAqICAgICB0aGUgcmVzb2x2ZWQgdmFsdWVzIG9mIHRoZSBgcmVzb2x2ZWAgbWFwLiBBZGRpdGlvbmFsbHkgdGhlIGBsb2NhbHNgIGFsc28gY29udGFpbjpcbiAgICAgKlxuICAgICAqICAgICAtIGAkc2NvcGVgIC0gVGhlIGN1cnJlbnQgcm91dGUgc2NvcGUuXG4gICAgICogICAgIC0gYCR0ZW1wbGF0ZWAgLSBUaGUgY3VycmVudCByb3V0ZSB0ZW1wbGF0ZSBIVE1MLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtPYmplY3R9IHJvdXRlcyBPYmplY3Qgd2l0aCBhbGwgcm91dGUgY29uZmlndXJhdGlvbiBPYmplY3RzIGFzIGl0cyBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogYCRyb3V0ZWAgaXMgdXNlZCBmb3IgZGVlcC1saW5raW5nIFVSTHMgdG8gY29udHJvbGxlcnMgYW5kIHZpZXdzIChIVE1MIHBhcnRpYWxzKS5cbiAgICAgKiBJdCB3YXRjaGVzIGAkbG9jYXRpb24udXJsKClgIGFuZCB0cmllcyB0byBtYXAgdGhlIHBhdGggdG8gYW4gZXhpc3Rpbmcgcm91dGUgZGVmaW5pdGlvbi5cbiAgICAgKlxuICAgICAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdSb3V0ZSBgbmdSb3V0ZWB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIGRlZmluZSByb3V0ZXMgdGhyb3VnaCB7QGxpbmsgbmdSb3V0ZS4kcm91dGVQcm92aWRlciAkcm91dGVQcm92aWRlcn0ncyBBUEkuXG4gICAgICpcbiAgICAgKiBUaGUgYCRyb3V0ZWAgc2VydmljZSBpcyB0eXBpY2FsbHkgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZVxuICAgICAqIHtAbGluayBuZ1JvdXRlLmRpcmVjdGl2ZTpuZ1ZpZXcgYG5nVmlld2B9IGRpcmVjdGl2ZSBhbmQgdGhlXG4gICAgICoge0BsaW5rIG5nUm91dGUuJHJvdXRlUGFyYW1zIGAkcm91dGVQYXJhbXNgfSBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBUaGlzIGV4YW1wbGUgc2hvd3MgaG93IGNoYW5naW5nIHRoZSBVUkwgaGFzaCBjYXVzZXMgdGhlIGAkcm91dGVgIHRvIG1hdGNoIGEgcm91dGUgYWdhaW5zdCB0aGVcbiAgICAgKiBVUkwsIGFuZCB0aGUgYG5nVmlld2AgcHVsbHMgaW4gdGhlIHBhcnRpYWwuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgdGhpcyBleGFtcGxlIGlzIHVzaW5nIHtAbGluayBuZy5kaXJlY3RpdmU6c2NyaXB0IGlubGluZWQgdGVtcGxhdGVzfVxuICAgICAqIHRvIGdldCBpdCB3b3JraW5nIG9uIGpzZmlkZGxlIGFzIHdlbGwuXG4gICAgICpcbiAgICAgKiA8ZXhhbXBsZSBuYW1lPVwiJHJvdXRlLXNlcnZpY2VcIiBtb2R1bGU9XCJuZ1JvdXRlRXhhbXBsZVwiXG4gICAgICogICAgICAgICAgZGVwcz1cImFuZ3VsYXItcm91dGUuanNcIiBmaXhCYXNlPVwidHJ1ZVwiPlxuICAgICAqICAgPGZpbGUgbmFtZT1cImluZGV4Lmh0bWxcIj5cbiAgICAgKiAgICAgPGRpdiBuZy1jb250cm9sbGVyPVwiTWFpbkNvbnRyb2xsZXJcIj5cbiAgICAgKiAgICAgICBDaG9vc2U6XG4gICAgICogICAgICAgPGEgaHJlZj1cIkJvb2svTW9ieVwiPk1vYnk8L2E+IHxcbiAgICAgKiAgICAgICA8YSBocmVmPVwiQm9vay9Nb2J5L2NoLzFcIj5Nb2J5OiBDaDE8L2E+IHxcbiAgICAgKiAgICAgICA8YSBocmVmPVwiQm9vay9HYXRzYnlcIj5HYXRzYnk8L2E+IHxcbiAgICAgKiAgICAgICA8YSBocmVmPVwiQm9vay9HYXRzYnkvY2gvND9rZXk9dmFsdWVcIj5HYXRzYnk6IENoNDwvYT4gfFxuICAgICAqICAgICAgIDxhIGhyZWY9XCJCb29rL1NjYXJsZXRcIj5TY2FybGV0IExldHRlcjwvYT48YnIvPlxuICAgICAqXG4gICAgICogICAgICAgPGRpdiBuZy12aWV3PjwvZGl2PlxuICAgICAqXG4gICAgICogICAgICAgPGhyIC8+XG4gICAgICpcbiAgICAgKiAgICAgICA8cHJlPiRsb2NhdGlvbi5wYXRoKCkgPSB7eyRsb2NhdGlvbi5wYXRoKCl9fTwvcHJlPlxuICAgICAqICAgICAgIDxwcmU+JHJvdXRlLmN1cnJlbnQudGVtcGxhdGVVcmwgPSB7eyRyb3V0ZS5jdXJyZW50LnRlbXBsYXRlVXJsfX08L3ByZT5cbiAgICAgKiAgICAgICA8cHJlPiRyb3V0ZS5jdXJyZW50LnBhcmFtcyA9IHt7JHJvdXRlLmN1cnJlbnQucGFyYW1zfX08L3ByZT5cbiAgICAgKiAgICAgICA8cHJlPiRyb3V0ZS5jdXJyZW50LnNjb3BlLm5hbWUgPSB7eyRyb3V0ZS5jdXJyZW50LnNjb3BlLm5hbWV9fTwvcHJlPlxuICAgICAqICAgICAgIDxwcmU+JHJvdXRlUGFyYW1zID0ge3skcm91dGVQYXJhbXN9fTwvcHJlPlxuICAgICAqICAgICA8L2Rpdj5cbiAgICAgKiAgIDwvZmlsZT5cbiAgICAgKlxuICAgICAqICAgPGZpbGUgbmFtZT1cImJvb2suaHRtbFwiPlxuICAgICAqICAgICBjb250cm9sbGVyOiB7e25hbWV9fTxiciAvPlxuICAgICAqICAgICBCb29rIElkOiB7e3BhcmFtcy5ib29rSWR9fTxiciAvPlxuICAgICAqICAgPC9maWxlPlxuICAgICAqXG4gICAgICogICA8ZmlsZSBuYW1lPVwiY2hhcHRlci5odG1sXCI+XG4gICAgICogICAgIGNvbnRyb2xsZXI6IHt7bmFtZX19PGJyIC8+XG4gICAgICogICAgIEJvb2sgSWQ6IHt7cGFyYW1zLmJvb2tJZH19PGJyIC8+XG4gICAgICogICAgIENoYXB0ZXIgSWQ6IHt7cGFyYW1zLmNoYXB0ZXJJZH19XG4gICAgICogICA8L2ZpbGU+XG4gICAgICpcbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJzY3JpcHQuanNcIj5cbiAgICAgKiAgICAgYW5ndWxhci5tb2R1bGUoJ25nUm91dGVFeGFtcGxlJywgWyduZ1JvdXRlJ10pXG4gICAgICpcbiAgICAgKiAgICAgIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHJvdXRlLCAkcm91dGVQYXJhbXMsICRsb2NhdGlvbikge1xuICAgICAqICAgICAgICAgICRzY29wZS4kcm91dGUgPSAkcm91dGU7XG4gICAgICogICAgICAgICAgJHNjb3BlLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgKiAgICAgICAgICAkc2NvcGUuJHJvdXRlUGFyYW1zID0gJHJvdXRlUGFyYW1zO1xuICAgICAqICAgICAgfSlcbiAgICAgKlxuICAgICAqICAgICAgLmNvbnRyb2xsZXIoJ0Jvb2tDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkcm91dGVQYXJhbXMpIHtcbiAgICAgKiAgICAgICAgICAkc2NvcGUubmFtZSA9IFwiQm9va0NvbnRyb2xsZXJcIjtcbiAgICAgKiAgICAgICAgICAkc2NvcGUucGFyYW1zID0gJHJvdXRlUGFyYW1zO1xuICAgICAqICAgICAgfSlcbiAgICAgKlxuICAgICAqICAgICAgLmNvbnRyb2xsZXIoJ0NoYXB0ZXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkcm91dGVQYXJhbXMpIHtcbiAgICAgKiAgICAgICAgICAkc2NvcGUubmFtZSA9IFwiQ2hhcHRlckNvbnRyb2xsZXJcIjtcbiAgICAgKiAgICAgICAgICAkc2NvcGUucGFyYW1zID0gJHJvdXRlUGFyYW1zO1xuICAgICAqICAgICAgfSlcbiAgICAgKlxuICAgICAqICAgICAuY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAgICAqICAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICogICAgICAgIC53aGVuKCcvQm9vay86Ym9va0lkJywge1xuICAgICAqICAgICAgICAgdGVtcGxhdGVVcmw6ICdib29rLmh0bWwnLFxuICAgICAqICAgICAgICAgY29udHJvbGxlcjogJ0Jvb2tDb250cm9sbGVyJyxcbiAgICAgKiAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgKiAgICAgICAgICAgLy8gSSB3aWxsIGNhdXNlIGEgMSBzZWNvbmQgZGVsYXlcbiAgICAgKiAgICAgICAgICAgZGVsYXk6IGZ1bmN0aW9uKCRxLCAkdGltZW91dCkge1xuICAgICAqICAgICAgICAgICAgIHZhciBkZWxheSA9ICRxLmRlZmVyKCk7XG4gICAgICogICAgICAgICAgICAgJHRpbWVvdXQoZGVsYXkucmVzb2x2ZSwgMTAwMCk7XG4gICAgICogICAgICAgICAgICAgcmV0dXJuIGRlbGF5LnByb21pc2U7XG4gICAgICogICAgICAgICAgIH1cbiAgICAgKiAgICAgICAgIH1cbiAgICAgKiAgICAgICB9KVxuICAgICAqICAgICAgIC53aGVuKCcvQm9vay86Ym9va0lkL2NoLzpjaGFwdGVySWQnLCB7XG4gICAgICogICAgICAgICB0ZW1wbGF0ZVVybDogJ2NoYXB0ZXIuaHRtbCcsXG4gICAgICogICAgICAgICBjb250cm9sbGVyOiAnQ2hhcHRlckNvbnRyb2xsZXInXG4gICAgICogICAgICAgfSk7XG4gICAgICpcbiAgICAgKiAgICAgICAvLyBjb25maWd1cmUgaHRtbDUgdG8gZ2V0IGxpbmtzIHdvcmtpbmcgb24ganNmaWRkbGVcbiAgICAgKiAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICogICAgIH0pO1xuICAgICAqXG4gICAgICogICA8L2ZpbGU+XG4gICAgICpcbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJwcm90cmFjdG9yLmpzXCIgdHlwZT1cInByb3RyYWN0b3JcIj5cbiAgICAgKiAgICAgaXQoJ3Nob3VsZCBsb2FkIGFuZCBjb21waWxlIGNvcnJlY3QgdGVtcGxhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICBlbGVtZW50KGJ5LmxpbmtUZXh0KCdNb2J5OiBDaDEnKSkuY2xpY2soKTtcbiAgICAgKiAgICAgICB2YXIgY29udGVudCA9IGVsZW1lbnQoYnkuY3NzKCdbbmctdmlld10nKSkuZ2V0VGV4dCgpO1xuICAgICAqICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9jb250cm9sbGVyXFw6IENoYXB0ZXJDb250cm9sbGVyLyk7XG4gICAgICogICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL0Jvb2sgSWRcXDogTW9ieS8pO1xuICAgICAqICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9DaGFwdGVyIElkXFw6IDEvKTtcbiAgICAgKlxuICAgICAqICAgICAgIGVsZW1lbnQoYnkucGFydGlhbExpbmtUZXh0KCdTY2FybGV0JykpLmNsaWNrKCk7XG4gICAgICpcbiAgICAgKiAgICAgICBjb250ZW50ID0gZWxlbWVudChieS5jc3MoJ1tuZy12aWV3XScpKS5nZXRUZXh0KCk7XG4gICAgICogICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL2NvbnRyb2xsZXJcXDogQm9va0NvbnRyb2xsZXIvKTtcbiAgICAgKiAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvQm9vayBJZFxcOiBTY2FybGV0Lyk7XG4gICAgICogICAgIH0pO1xuICAgICAqICAgPC9maWxlPlxuICAgICAqIDwvZXhhbXBsZT5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBldmVudFxuICAgICAqIEBuYW1lICRyb3V0ZSMkcm91dGVDaGFuZ2VTdGFydFxuICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBCcm9hZGNhc3RlZCBiZWZvcmUgYSByb3V0ZSBjaGFuZ2UuIEF0IHRoaXMgIHBvaW50IHRoZSByb3V0ZSBzZXJ2aWNlcyBzdGFydHNcbiAgICAgKiByZXNvbHZpbmcgYWxsIG9mIHRoZSBkZXBlbmRlbmNpZXMgbmVlZGVkIGZvciB0aGUgcm91dGUgY2hhbmdlIHRvIG9jY3VyLlxuICAgICAqIFR5cGljYWxseSB0aGlzIGludm9sdmVzIGZldGNoaW5nIHRoZSB2aWV3IHRlbXBsYXRlIGFzIHdlbGwgYXMgYW55IGRlcGVuZGVuY2llc1xuICAgICAqIGRlZmluZWQgaW4gYHJlc29sdmVgIHJvdXRlIHByb3BlcnR5LiBPbmNlICBhbGwgb2YgdGhlIGRlcGVuZGVuY2llcyBhcmUgcmVzb2x2ZWRcbiAgICAgKiBgJHJvdXRlQ2hhbmdlU3VjY2Vzc2AgaXMgZmlyZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYW5ndWxhckV2ZW50IFN5bnRoZXRpYyBldmVudCBvYmplY3QuXG4gICAgICogQHBhcmFtIHtSb3V0ZX0gbmV4dCBGdXR1cmUgcm91dGUgaW5mb3JtYXRpb24uXG4gICAgICogQHBhcmFtIHtSb3V0ZX0gY3VycmVudCBDdXJyZW50IHJvdXRlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG5nZG9jIGV2ZW50XG4gICAgICogQG5hbWUgJHJvdXRlIyRyb3V0ZUNoYW5nZVN1Y2Nlc3NcbiAgICAgKiBAZXZlbnRUeXBlIGJyb2FkY2FzdCBvbiByb290IHNjb3BlXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogQnJvYWRjYXN0ZWQgYWZ0ZXIgYSByb3V0ZSBkZXBlbmRlbmNpZXMgYXJlIHJlc29sdmVkLlxuICAgICAqIHtAbGluayBuZ1JvdXRlLmRpcmVjdGl2ZTpuZ1ZpZXcgbmdWaWV3fSBsaXN0ZW5zIGZvciB0aGUgZGlyZWN0aXZlXG4gICAgICogdG8gaW5zdGFudGlhdGUgdGhlIGNvbnRyb2xsZXIgYW5kIHJlbmRlciB0aGUgdmlldy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbmd1bGFyRXZlbnQgU3ludGhldGljIGV2ZW50IG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge1JvdXRlfSBjdXJyZW50IEN1cnJlbnQgcm91dGUgaW5mb3JtYXRpb24uXG4gICAgICogQHBhcmFtIHtSb3V0ZXxVbmRlZmluZWR9IHByZXZpb3VzIFByZXZpb3VzIHJvdXRlIGluZm9ybWF0aW9uLCBvciB1bmRlZmluZWQgaWYgY3VycmVudCBpc1xuICAgICAqIGZpcnN0IHJvdXRlIGVudGVyZWQuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgZXZlbnRcbiAgICAgKiBAbmFtZSAkcm91dGUjJHJvdXRlQ2hhbmdlRXJyb3JcbiAgICAgKiBAZXZlbnRUeXBlIGJyb2FkY2FzdCBvbiByb290IHNjb3BlXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogQnJvYWRjYXN0ZWQgaWYgYW55IG9mIHRoZSByZXNvbHZlIHByb21pc2VzIGFyZSByZWplY3RlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbmd1bGFyRXZlbnQgU3ludGhldGljIGV2ZW50IG9iamVjdFxuICAgICAqIEBwYXJhbSB7Um91dGV9IGN1cnJlbnQgQ3VycmVudCByb3V0ZSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcGFyYW0ge1JvdXRlfSBwcmV2aW91cyBQcmV2aW91cyByb3V0ZSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcGFyYW0ge1JvdXRlfSByZWplY3Rpb24gUmVqZWN0aW9uIG9mIHRoZSBwcm9taXNlLiBVc3VhbGx5IHRoZSBlcnJvciBvZiB0aGUgZmFpbGVkIHByb21pc2UuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgZXZlbnRcbiAgICAgKiBAbmFtZSAkcm91dGUjJHJvdXRlVXBkYXRlXG4gICAgICogQGV2ZW50VHlwZSBicm9hZGNhc3Qgb24gcm9vdCBzY29wZVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogVGhlIGByZWxvYWRPblNlYXJjaGAgcHJvcGVydHkgaGFzIGJlZW4gc2V0IHRvIGZhbHNlLCBhbmQgd2UgYXJlIHJldXNpbmcgdGhlIHNhbWVcbiAgICAgKiBpbnN0YW5jZSBvZiB0aGUgQ29udHJvbGxlci5cbiAgICAgKi9cblxuICAgIHZhciBmb3JjZVJlbG9hZCA9IGZhbHNlLFxuICAgICAgICAkcm91dGUgPSB7XG4gICAgICAgICAgcm91dGVzOiByb3V0ZXMsXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAbmdkb2MgbWV0aG9kXG4gICAgICAgICAgICogQG5hbWUgJHJvdXRlI3JlbG9hZFxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAgICogQ2F1c2VzIGAkcm91dGVgIHNlcnZpY2UgdG8gcmVsb2FkIHRoZSBjdXJyZW50IHJvdXRlIGV2ZW4gaWZcbiAgICAgICAgICAgKiB7QGxpbmsgbmcuJGxvY2F0aW9uICRsb2NhdGlvbn0gaGFzbid0IGNoYW5nZWQuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBBcyBhIHJlc3VsdCBvZiB0aGF0LCB7QGxpbmsgbmdSb3V0ZS5kaXJlY3RpdmU6bmdWaWV3IG5nVmlld31cbiAgICAgICAgICAgKiBjcmVhdGVzIG5ldyBzY29wZSwgcmVpbnN0YW50aWF0ZXMgdGhlIGNvbnRyb2xsZXIuXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmVsb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvcmNlUmVsb2FkID0gdHJ1ZTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGV2YWxBc3luYyh1cGRhdGVSb3V0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3MnLCB1cGRhdGVSb3V0ZSk7XG5cbiAgICByZXR1cm4gJHJvdXRlO1xuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvbiB7c3RyaW5nfSBjdXJyZW50IHVybFxuICAgICAqIEBwYXJhbSByb3V0ZSB7T2JqZWN0fSByb3V0ZSByZWdleHAgdG8gbWF0Y2ggdGhlIHVybCBhZ2FpbnN0XG4gICAgICogQHJldHVybiB7P09iamVjdH1cbiAgICAgKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIENoZWNrIGlmIHRoZSByb3V0ZSBtYXRjaGVzIHRoZSBjdXJyZW50IHVybC5cbiAgICAgKlxuICAgICAqIEluc3BpcmVkIGJ5IG1hdGNoIGluXG4gICAgICogdmlzaW9ubWVkaWEvZXhwcmVzcy9saWIvcm91dGVyL3JvdXRlci5qcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzd2l0Y2hSb3V0ZU1hdGNoZXIob24sIHJvdXRlKSB7XG4gICAgICB2YXIga2V5cyA9IHJvdXRlLmtleXMsXG4gICAgICAgICAgcGFyYW1zID0ge307XG5cbiAgICAgIGlmICghcm91dGUucmVnZXhwKSByZXR1cm4gbnVsbDtcblxuICAgICAgdmFyIG0gPSByb3V0ZS5yZWdleHAuZXhlYyhvbik7XG4gICAgICBpZiAoIW0pIHJldHVybiBudWxsO1xuXG4gICAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gbS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpIC0gMV07XG5cbiAgICAgICAgdmFyIHZhbCA9ICdzdHJpbmcnID09IHR5cGVvZiBtW2ldXG4gICAgICAgICAgICAgID8gZGVjb2RlVVJJQ29tcG9uZW50KG1baV0pXG4gICAgICAgICAgICAgIDogbVtpXTtcblxuICAgICAgICBpZiAoa2V5ICYmIHZhbCkge1xuICAgICAgICAgIHBhcmFtc1trZXkubmFtZV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUm91dGUoKSB7XG4gICAgICB2YXIgbmV4dCA9IHBhcnNlUm91dGUoKSxcbiAgICAgICAgICBsYXN0ID0gJHJvdXRlLmN1cnJlbnQ7XG5cbiAgICAgIGlmIChuZXh0ICYmIGxhc3QgJiYgbmV4dC4kJHJvdXRlID09PSBsYXN0LiQkcm91dGVcbiAgICAgICAgICAmJiBhbmd1bGFyLmVxdWFscyhuZXh0LnBhdGhQYXJhbXMsIGxhc3QucGF0aFBhcmFtcylcbiAgICAgICAgICAmJiAhbmV4dC5yZWxvYWRPblNlYXJjaCAmJiAhZm9yY2VSZWxvYWQpIHtcbiAgICAgICAgbGFzdC5wYXJhbXMgPSBuZXh0LnBhcmFtcztcbiAgICAgICAgYW5ndWxhci5jb3B5KGxhc3QucGFyYW1zLCAkcm91dGVQYXJhbXMpO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRyb3V0ZVVwZGF0ZScsIGxhc3QpO1xuICAgICAgfSBlbHNlIGlmIChuZXh0IHx8IGxhc3QpIHtcbiAgICAgICAgZm9yY2VSZWxvYWQgPSBmYWxzZTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcm91dGVDaGFuZ2VTdGFydCcsIG5leHQsIGxhc3QpO1xuICAgICAgICAkcm91dGUuY3VycmVudCA9IG5leHQ7XG4gICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgaWYgKG5leHQucmVkaXJlY3RUbykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcobmV4dC5yZWRpcmVjdFRvKSkge1xuICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChpbnRlcnBvbGF0ZShuZXh0LnJlZGlyZWN0VG8sIG5leHQucGFyYW1zKSkuc2VhcmNoKG5leHQucGFyYW1zKVxuICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJGxvY2F0aW9uLnVybChuZXh0LnJlZGlyZWN0VG8obmV4dC5wYXRoUGFyYW1zLCAkbG9jYXRpb24ucGF0aCgpLCAkbG9jYXRpb24uc2VhcmNoKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRxLndoZW4obmV4dCkuXG4gICAgICAgICAgdGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgICAgIHZhciBsb2NhbHMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgbmV4dC5yZXNvbHZlKSxcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLCB0ZW1wbGF0ZVVybDtcblxuICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobG9jYWxzLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgbG9jYWxzW2tleV0gPSBhbmd1bGFyLmlzU3RyaW5nKHZhbHVlKSA/XG4gICAgICAgICAgICAgICAgICAgICRpbmplY3Rvci5nZXQodmFsdWUpIDogJGluamVjdG9yLmludm9rZSh2YWx1ZSk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh0ZW1wbGF0ZSA9IG5leHQudGVtcGxhdGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUobmV4dC5wYXJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh0ZW1wbGF0ZVVybCA9IG5leHQudGVtcGxhdGVVcmwpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0ZW1wbGF0ZVVybCkpIHtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsID0gdGVtcGxhdGVVcmwobmV4dC5wYXJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA9ICRzY2UuZ2V0VHJ1c3RlZFJlc291cmNlVXJsKHRlbXBsYXRlVXJsKTtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodGVtcGxhdGVVcmwpKSB7XG4gICAgICAgICAgICAgICAgICBuZXh0LmxvYWRlZFRlbXBsYXRlVXJsID0gdGVtcGxhdGVVcmw7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9ICRodHRwLmdldCh0ZW1wbGF0ZVVybCwge2NhY2hlOiAkdGVtcGxhdGVDYWNoZX0pLlxuICAgICAgICAgICAgICAgICAgICAgIHRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmRhdGE7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodGVtcGxhdGUpKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxzWyckdGVtcGxhdGUnXSA9IHRlbXBsYXRlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAkcS5hbGwobG9jYWxzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5cbiAgICAgICAgICAvLyBhZnRlciByb3V0ZSBjaGFuZ2VcbiAgICAgICAgICB0aGVuKGZ1bmN0aW9uKGxvY2Fscykge1xuICAgICAgICAgICAgaWYgKG5leHQgPT0gJHJvdXRlLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBuZXh0LmxvY2FscyA9IGxvY2FscztcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmNvcHkobmV4dC5wYXJhbXMsICRyb3V0ZVBhcmFtcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcm91dGVDaGFuZ2VTdWNjZXNzJywgbmV4dCwgbGFzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChuZXh0ID09ICRyb3V0ZS5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHJvdXRlQ2hhbmdlRXJyb3InLCBuZXh0LCBsYXN0LCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgY3VycmVudCBhY3RpdmUgcm91dGUsIGJ5IG1hdGNoaW5nIGl0IGFnYWluc3QgdGhlIFVSTFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBhcnNlUm91dGUoKSB7XG4gICAgICAvLyBNYXRjaCBhIHJvdXRlXG4gICAgICB2YXIgcGFyYW1zLCBtYXRjaDtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChyb3V0ZXMsIGZ1bmN0aW9uKHJvdXRlLCBwYXRoKSB7XG4gICAgICAgIGlmICghbWF0Y2ggJiYgKHBhcmFtcyA9IHN3aXRjaFJvdXRlTWF0Y2hlcigkbG9jYXRpb24ucGF0aCgpLCByb3V0ZSkpKSB7XG4gICAgICAgICAgbWF0Y2ggPSBpbmhlcml0KHJvdXRlLCB7XG4gICAgICAgICAgICBwYXJhbXM6IGFuZ3VsYXIuZXh0ZW5kKHt9LCAkbG9jYXRpb24uc2VhcmNoKCksIHBhcmFtcyksXG4gICAgICAgICAgICBwYXRoUGFyYW1zOiBwYXJhbXN9KTtcbiAgICAgICAgICBtYXRjaC4kJHJvdXRlID0gcm91dGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gTm8gcm91dGUgbWF0Y2hlZDsgZmFsbGJhY2sgdG8gXCJvdGhlcndpc2VcIiByb3V0ZVxuICAgICAgcmV0dXJuIG1hdGNoIHx8IHJvdXRlc1tudWxsXSAmJiBpbmhlcml0KHJvdXRlc1tudWxsXSwge3BhcmFtczoge30sIHBhdGhQYXJhbXM6e319KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBpbnRlcnBvbGF0aW9uIG9mIHRoZSByZWRpcmVjdCBwYXRoIHdpdGggdGhlIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnRlcnBvbGF0ZShzdHJpbmcsIHBhcmFtcykge1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgYW5ndWxhci5mb3JFYWNoKChzdHJpbmd8fCcnKS5zcGxpdCgnOicpLCBmdW5jdGlvbihzZWdtZW50LCBpKSB7XG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goc2VnbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHNlZ21lbnRNYXRjaCA9IHNlZ21lbnQubWF0Y2goLyhcXHcrKSguKikvKTtcbiAgICAgICAgICB2YXIga2V5ID0gc2VnbWVudE1hdGNoWzFdO1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcmFtc1trZXldKTtcbiAgICAgICAgICByZXN1bHQucHVzaChzZWdtZW50TWF0Y2hbMl0gfHwgJycpO1xuICAgICAgICAgIGRlbGV0ZSBwYXJhbXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICAgIH1cbiAgfV07XG59XG5cbm5nUm91dGVNb2R1bGUucHJvdmlkZXIoJyRyb3V0ZVBhcmFtcycsICRSb3V0ZVBhcmFtc1Byb3ZpZGVyKTtcblxuXG4vKipcbiAqIEBuZ2RvYyBzZXJ2aWNlXG4gKiBAbmFtZSAkcm91dGVQYXJhbXNcbiAqIEByZXF1aXJlcyAkcm91dGVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBgJHJvdXRlUGFyYW1zYCBzZXJ2aWNlIGFsbG93cyB5b3UgdG8gcmV0cmlldmUgdGhlIGN1cnJlbnQgc2V0IG9mIHJvdXRlIHBhcmFtZXRlcnMuXG4gKlxuICogUmVxdWlyZXMgdGhlIHtAbGluayBuZ1JvdXRlIGBuZ1JvdXRlYH0gbW9kdWxlIHRvIGJlIGluc3RhbGxlZC5cbiAqXG4gKiBUaGUgcm91dGUgcGFyYW1ldGVycyBhcmUgYSBjb21iaW5hdGlvbiBvZiB7QGxpbmsgbmcuJGxvY2F0aW9uIGAkbG9jYXRpb25gfSdzXG4gKiB7QGxpbmsgbmcuJGxvY2F0aW9uI3NlYXJjaCBgc2VhcmNoKClgfSBhbmQge0BsaW5rIG5nLiRsb2NhdGlvbiNwYXRoIGBwYXRoKClgfS5cbiAqIFRoZSBgcGF0aGAgcGFyYW1ldGVycyBhcmUgZXh0cmFjdGVkIHdoZW4gdGhlIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSBgJHJvdXRlYH0gcGF0aCBpcyBtYXRjaGVkLlxuICpcbiAqIEluIGNhc2Ugb2YgcGFyYW1ldGVyIG5hbWUgY29sbGlzaW9uLCBgcGF0aGAgcGFyYW1zIHRha2UgcHJlY2VkZW5jZSBvdmVyIGBzZWFyY2hgIHBhcmFtcy5cbiAqXG4gKiBUaGUgc2VydmljZSBndWFyYW50ZWVzIHRoYXQgdGhlIGlkZW50aXR5IG9mIHRoZSBgJHJvdXRlUGFyYW1zYCBvYmplY3Qgd2lsbCByZW1haW4gdW5jaGFuZ2VkXG4gKiAoYnV0IGl0cyBwcm9wZXJ0aWVzIHdpbGwgbGlrZWx5IGNoYW5nZSkgZXZlbiB3aGVuIGEgcm91dGUgY2hhbmdlIG9jY3Vycy5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlIGAkcm91dGVQYXJhbXNgIGFyZSBvbmx5IHVwZGF0ZWQgKmFmdGVyKiBhIHJvdXRlIGNoYW5nZSBjb21wbGV0ZXMgc3VjY2Vzc2Z1bGx5LlxuICogVGhpcyBtZWFucyB0aGF0IHlvdSBjYW5ub3QgcmVseSBvbiBgJHJvdXRlUGFyYW1zYCBiZWluZyBjb3JyZWN0IGluIHJvdXRlIHJlc29sdmUgZnVuY3Rpb25zLlxuICogSW5zdGVhZCB5b3UgY2FuIHVzZSBgJHJvdXRlLmN1cnJlbnQucGFyYW1zYCB0byBhY2Nlc3MgdGhlIG5ldyByb3V0ZSdzIHBhcmFtZXRlcnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiAgLy8gR2l2ZW46XG4gKiAgLy8gVVJMOiBodHRwOi8vc2VydmVyLmNvbS9pbmRleC5odG1sIy9DaGFwdGVyLzEvU2VjdGlvbi8yP3NlYXJjaD1tb2J5XG4gKiAgLy8gUm91dGU6IC9DaGFwdGVyLzpjaGFwdGVySWQvU2VjdGlvbi86c2VjdGlvbklkXG4gKiAgLy9cbiAqICAvLyBUaGVuXG4gKiAgJHJvdXRlUGFyYW1zID09PiB7Y2hhcHRlcklkOjEsIHNlY3Rpb25JZDoyLCBzZWFyY2g6J21vYnknfVxuICogYGBgXG4gKi9cbmZ1bmN0aW9uICRSb3V0ZVBhcmFtc1Byb3ZpZGVyKCkge1xuICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHt9OyB9O1xufVxuXG5uZ1JvdXRlTW9kdWxlLmRpcmVjdGl2ZSgnbmdWaWV3JywgbmdWaWV3RmFjdG9yeSk7XG5uZ1JvdXRlTW9kdWxlLmRpcmVjdGl2ZSgnbmdWaWV3JywgbmdWaWV3RmlsbENvbnRlbnRGYWN0b3J5KTtcblxuXG4vKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIG5nVmlld1xuICogQHJlc3RyaWN0IEVDQVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogIyBPdmVydmlld1xuICogYG5nVmlld2AgaXMgYSBkaXJlY3RpdmUgdGhhdCBjb21wbGVtZW50cyB0aGUge0BsaW5rIG5nUm91dGUuJHJvdXRlICRyb3V0ZX0gc2VydmljZSBieVxuICogaW5jbHVkaW5nIHRoZSByZW5kZXJlZCB0ZW1wbGF0ZSBvZiB0aGUgY3VycmVudCByb3V0ZSBpbnRvIHRoZSBtYWluIGxheW91dCAoYGluZGV4Lmh0bWxgKSBmaWxlLlxuICogRXZlcnkgdGltZSB0aGUgY3VycmVudCByb3V0ZSBjaGFuZ2VzLCB0aGUgaW5jbHVkZWQgdmlldyBjaGFuZ2VzIHdpdGggaXQgYWNjb3JkaW5nIHRvIHRoZVxuICogY29uZmlndXJhdGlvbiBvZiB0aGUgYCRyb3V0ZWAgc2VydmljZS5cbiAqXG4gKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nUm91dGUgYG5nUm91dGVgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICpcbiAqIEBhbmltYXRpb25zXG4gKiBlbnRlciAtIGFuaW1hdGlvbiBpcyB1c2VkIHRvIGJyaW5nIG5ldyBjb250ZW50IGludG8gdGhlIGJyb3dzZXIuXG4gKiBsZWF2ZSAtIGFuaW1hdGlvbiBpcyB1c2VkIHRvIGFuaW1hdGUgZXhpc3RpbmcgY29udGVudCBhd2F5LlxuICpcbiAqIFRoZSBlbnRlciBhbmQgbGVhdmUgYW5pbWF0aW9uIG9jY3VyIGNvbmN1cnJlbnRseS5cbiAqXG4gKiBAc2NvcGVcbiAqIEBwcmlvcml0eSA0MDBcbiAqIEBwYXJhbSB7c3RyaW5nPX0gb25sb2FkIEV4cHJlc3Npb24gdG8gZXZhbHVhdGUgd2hlbmV2ZXIgdGhlIHZpZXcgdXBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZz19IGF1dG9zY3JvbGwgV2hldGhlciBgbmdWaWV3YCBzaG91bGQgY2FsbCB7QGxpbmsgbmcuJGFuY2hvclNjcm9sbFxuICogICAgICAgICAgICAgICAgICAkYW5jaG9yU2Nyb2xsfSB0byBzY3JvbGwgdGhlIHZpZXdwb3J0IGFmdGVyIHRoZSB2aWV3IGlzIHVwZGF0ZWQuXG4gKlxuICogICAgICAgICAgICAgICAgICAtIElmIHRoZSBhdHRyaWJ1dGUgaXMgbm90IHNldCwgZGlzYWJsZSBzY3JvbGxpbmcuXG4gKiAgICAgICAgICAgICAgICAgIC0gSWYgdGhlIGF0dHJpYnV0ZSBpcyBzZXQgd2l0aG91dCB2YWx1ZSwgZW5hYmxlIHNjcm9sbGluZy5cbiAqICAgICAgICAgICAgICAgICAgLSBPdGhlcndpc2UgZW5hYmxlIHNjcm9sbGluZyBvbmx5IGlmIHRoZSBgYXV0b3Njcm9sbGAgYXR0cmlidXRlIHZhbHVlIGV2YWx1YXRlZFxuICogICAgICAgICAgICAgICAgICAgIGFzIGFuIGV4cHJlc3Npb24geWllbGRzIGEgdHJ1dGh5IHZhbHVlLlxuICogQGV4YW1wbGVcbiAgICA8ZXhhbXBsZSBuYW1lPVwibmdWaWV3LWRpcmVjdGl2ZVwiIG1vZHVsZT1cIm5nVmlld0V4YW1wbGVcIlxuICAgICAgICAgICAgIGRlcHM9XCJhbmd1bGFyLXJvdXRlLmpzO2FuZ3VsYXItYW5pbWF0ZS5qc1wiXG4gICAgICAgICAgICAgYW5pbWF0aW9ucz1cInRydWVcIiBmaXhCYXNlPVwidHJ1ZVwiPlxuICAgICAgPGZpbGUgbmFtZT1cImluZGV4Lmh0bWxcIj5cbiAgICAgICAgPGRpdiBuZy1jb250cm9sbGVyPVwiTWFpbkN0cmwgYXMgbWFpblwiPlxuICAgICAgICAgIENob29zZTpcbiAgICAgICAgICA8YSBocmVmPVwiQm9vay9Nb2J5XCI+TW9ieTwvYT4gfFxuICAgICAgICAgIDxhIGhyZWY9XCJCb29rL01vYnkvY2gvMVwiPk1vYnk6IENoMTwvYT4gfFxuICAgICAgICAgIDxhIGhyZWY9XCJCb29rL0dhdHNieVwiPkdhdHNieTwvYT4gfFxuICAgICAgICAgIDxhIGhyZWY9XCJCb29rL0dhdHNieS9jaC80P2tleT12YWx1ZVwiPkdhdHNieTogQ2g0PC9hPiB8XG4gICAgICAgICAgPGEgaHJlZj1cIkJvb2svU2NhcmxldFwiPlNjYXJsZXQgTGV0dGVyPC9hPjxici8+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlldy1hbmltYXRlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBuZy12aWV3IGNsYXNzPVwidmlldy1hbmltYXRlXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGhyIC8+XG5cbiAgICAgICAgICA8cHJlPiRsb2NhdGlvbi5wYXRoKCkgPSB7e21haW4uJGxvY2F0aW9uLnBhdGgoKX19PC9wcmU+XG4gICAgICAgICAgPHByZT4kcm91dGUuY3VycmVudC50ZW1wbGF0ZVVybCA9IHt7bWFpbi4kcm91dGUuY3VycmVudC50ZW1wbGF0ZVVybH19PC9wcmU+XG4gICAgICAgICAgPHByZT4kcm91dGUuY3VycmVudC5wYXJhbXMgPSB7e21haW4uJHJvdXRlLmN1cnJlbnQucGFyYW1zfX08L3ByZT5cbiAgICAgICAgICA8cHJlPiRyb3V0ZS5jdXJyZW50LnNjb3BlLm5hbWUgPSB7e21haW4uJHJvdXRlLmN1cnJlbnQuc2NvcGUubmFtZX19PC9wcmU+XG4gICAgICAgICAgPHByZT4kcm91dGVQYXJhbXMgPSB7e21haW4uJHJvdXRlUGFyYW1zfX08L3ByZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpbGU+XG5cbiAgICAgIDxmaWxlIG5hbWU9XCJib29rLmh0bWxcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICBjb250cm9sbGVyOiB7e2Jvb2submFtZX19PGJyIC8+XG4gICAgICAgICAgQm9vayBJZDoge3tib29rLnBhcmFtcy5ib29rSWR9fTxiciAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cImNoYXB0ZXIuaHRtbFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIGNvbnRyb2xsZXI6IHt7Y2hhcHRlci5uYW1lfX08YnIgLz5cbiAgICAgICAgICBCb29rIElkOiB7e2NoYXB0ZXIucGFyYW1zLmJvb2tJZH19PGJyIC8+XG4gICAgICAgICAgQ2hhcHRlciBJZDoge3tjaGFwdGVyLnBhcmFtcy5jaGFwdGVySWR9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cImFuaW1hdGlvbnMuY3NzXCI+XG4gICAgICAgIC52aWV3LWFuaW1hdGUtY29udGFpbmVyIHtcbiAgICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcbiAgICAgICAgICBoZWlnaHQ6MTAwcHghaW1wb3J0YW50O1xuICAgICAgICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xuICAgICAgICAgIGJhY2tncm91bmQ6d2hpdGU7XG4gICAgICAgICAgYm9yZGVyOjFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICBoZWlnaHQ6NDBweDtcbiAgICAgICAgICBvdmVyZmxvdzpoaWRkZW47XG4gICAgICAgIH1cblxuICAgICAgICAudmlldy1hbmltYXRlIHtcbiAgICAgICAgICBwYWRkaW5nOjEwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAudmlldy1hbmltYXRlLm5nLWVudGVyLCAudmlldy1hbmltYXRlLm5nLWxlYXZlIHtcbiAgICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246YWxsIGN1YmljLWJlemllcigwLjI1MCwgMC40NjAsIDAuNDUwLCAwLjk0MCkgMS41cztcbiAgICAgICAgICB0cmFuc2l0aW9uOmFsbCBjdWJpYy1iZXppZXIoMC4yNTAsIDAuNDYwLCAwLjQ1MCwgMC45NDApIDEuNXM7XG5cbiAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xuICAgICAgICAgIHdpZHRoOjEwMCU7XG4gICAgICAgICAgYm9yZGVyLWxlZnQ6MXB4IHNvbGlkIGJsYWNrO1xuXG4gICAgICAgICAgcG9zaXRpb246YWJzb2x1dGU7XG4gICAgICAgICAgdG9wOjA7XG4gICAgICAgICAgbGVmdDowO1xuICAgICAgICAgIHJpZ2h0OjA7XG4gICAgICAgICAgYm90dG9tOjA7XG4gICAgICAgICAgcGFkZGluZzoxMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnZpZXctYW5pbWF0ZS5uZy1lbnRlciB7XG4gICAgICAgICAgbGVmdDoxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC52aWV3LWFuaW1hdGUubmctZW50ZXIubmctZW50ZXItYWN0aXZlIHtcbiAgICAgICAgICBsZWZ0OjA7XG4gICAgICAgIH1cbiAgICAgICAgLnZpZXctYW5pbWF0ZS5uZy1sZWF2ZS5uZy1sZWF2ZS1hY3RpdmUge1xuICAgICAgICAgIGxlZnQ6LTEwMCU7XG4gICAgICAgIH1cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cInNjcmlwdC5qc1wiPlxuICAgICAgICBhbmd1bGFyLm1vZHVsZSgnbmdWaWV3RXhhbXBsZScsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSlcbiAgICAgICAgICAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLFxuICAgICAgICAgICAgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAgICAgICAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgICAgICAgICAgLndoZW4oJy9Cb29rLzpib29rSWQnLCB7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Jvb2suaHRtbCcsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQm9va0N0cmwnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAnYm9vaydcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC53aGVuKCcvQm9vay86Ym9va0lkL2NoLzpjaGFwdGVySWQnLCB7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NoYXB0ZXIuaHRtbCcsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhcHRlckN0cmwnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY2hhcHRlcidcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAvLyBjb25maWd1cmUgaHRtbDUgdG8gZ2V0IGxpbmtzIHdvcmtpbmcgb24ganNmaWRkbGVcbiAgICAgICAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgICAgICAgIH1dKVxuICAgICAgICAgIC5jb250cm9sbGVyKCdNYWluQ3RybCcsIFsnJHJvdXRlJywgJyRyb3V0ZVBhcmFtcycsICckbG9jYXRpb24nLFxuICAgICAgICAgICAgZnVuY3Rpb24oJHJvdXRlLCAkcm91dGVQYXJhbXMsICRsb2NhdGlvbikge1xuICAgICAgICAgICAgICB0aGlzLiRyb3V0ZSA9ICRyb3V0ZTtcbiAgICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgICAgICAgIHRoaXMuJHJvdXRlUGFyYW1zID0gJHJvdXRlUGFyYW1zO1xuICAgICAgICAgIH1dKVxuICAgICAgICAgIC5jb250cm9sbGVyKCdCb29rQ3RybCcsIFsnJHJvdXRlUGFyYW1zJywgZnVuY3Rpb24oJHJvdXRlUGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBcIkJvb2tDdHJsXCI7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcbiAgICAgICAgICB9XSlcbiAgICAgICAgICAuY29udHJvbGxlcignQ2hhcHRlckN0cmwnLCBbJyRyb3V0ZVBhcmFtcycsIGZ1bmN0aW9uKCRyb3V0ZVBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gXCJDaGFwdGVyQ3RybFwiO1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMgPSAkcm91dGVQYXJhbXM7XG4gICAgICAgICAgfV0pO1xuXG4gICAgICA8L2ZpbGU+XG5cbiAgICAgIDxmaWxlIG5hbWU9XCJwcm90cmFjdG9yLmpzXCIgdHlwZT1cInByb3RyYWN0b3JcIj5cbiAgICAgICAgaXQoJ3Nob3VsZCBsb2FkIGFuZCBjb21waWxlIGNvcnJlY3QgdGVtcGxhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50KGJ5LmxpbmtUZXh0KCdNb2J5OiBDaDEnKSkuY2xpY2soKTtcbiAgICAgICAgICB2YXIgY29udGVudCA9IGVsZW1lbnQoYnkuY3NzKCdbbmctdmlld10nKSkuZ2V0VGV4dCgpO1xuICAgICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9jb250cm9sbGVyXFw6IENoYXB0ZXJDdHJsLyk7XG4gICAgICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL0Jvb2sgSWRcXDogTW9ieS8pO1xuICAgICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9DaGFwdGVyIElkXFw6IDEvKTtcblxuICAgICAgICAgIGVsZW1lbnQoYnkucGFydGlhbExpbmtUZXh0KCdTY2FybGV0JykpLmNsaWNrKCk7XG5cbiAgICAgICAgICBjb250ZW50ID0gZWxlbWVudChieS5jc3MoJ1tuZy12aWV3XScpKS5nZXRUZXh0KCk7XG4gICAgICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL2NvbnRyb2xsZXJcXDogQm9va0N0cmwvKTtcbiAgICAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvQm9vayBJZFxcOiBTY2FybGV0Lyk7XG4gICAgICAgIH0pO1xuICAgICAgPC9maWxlPlxuICAgIDwvZXhhbXBsZT5cbiAqL1xuXG5cbi8qKlxuICogQG5nZG9jIGV2ZW50XG4gKiBAbmFtZSBuZ1ZpZXcjJHZpZXdDb250ZW50TG9hZGVkXG4gKiBAZXZlbnRUeXBlIGVtaXQgb24gdGhlIGN1cnJlbnQgbmdWaWV3IHNjb3BlXG4gKiBAZGVzY3JpcHRpb25cbiAqIEVtaXR0ZWQgZXZlcnkgdGltZSB0aGUgbmdWaWV3IGNvbnRlbnQgaXMgcmVsb2FkZWQuXG4gKi9cbm5nVmlld0ZhY3RvcnkuJGluamVjdCA9IFsnJHJvdXRlJywgJyRhbmNob3JTY3JvbGwnLCAnJGFuaW1hdGUnXTtcbmZ1bmN0aW9uIG5nVmlld0ZhY3RvcnkoICAgJHJvdXRlLCAgICRhbmNob3JTY3JvbGwsICAgJGFuaW1hdGUpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0VDQScsXG4gICAgdGVybWluYWw6IHRydWUsXG4gICAgcHJpb3JpdHk6IDQwMCxcbiAgICB0cmFuc2NsdWRlOiAnZWxlbWVudCcsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsICRlbGVtZW50LCBhdHRyLCBjdHJsLCAkdHJhbnNjbHVkZSkge1xuICAgICAgICB2YXIgY3VycmVudFNjb3BlLFxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQsXG4gICAgICAgICAgICBwcmV2aW91c0VsZW1lbnQsXG4gICAgICAgICAgICBhdXRvU2Nyb2xsRXhwID0gYXR0ci5hdXRvc2Nyb2xsLFxuICAgICAgICAgICAgb25sb2FkRXhwID0gYXR0ci5vbmxvYWQgfHwgJyc7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgdXBkYXRlKTtcbiAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2xlYW51cExhc3RWaWV3KCkge1xuICAgICAgICAgIGlmKHByZXZpb3VzRWxlbWVudCkge1xuICAgICAgICAgICAgcHJldmlvdXNFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgcHJldmlvdXNFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoY3VycmVudFNjb3BlKSB7XG4gICAgICAgICAgICBjdXJyZW50U2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgICAgIGN1cnJlbnRTY29wZSA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAkYW5pbWF0ZS5sZWF2ZShjdXJyZW50RWxlbWVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHByZXZpb3VzRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByZXZpb3VzRWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICB2YXIgbG9jYWxzID0gJHJvdXRlLmN1cnJlbnQgJiYgJHJvdXRlLmN1cnJlbnQubG9jYWxzLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGxvY2FscyAmJiBsb2NhbHMuJHRlbXBsYXRlO1xuXG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlKSkge1xuICAgICAgICAgICAgdmFyIG5ld1Njb3BlID0gc2NvcGUuJG5ldygpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSAkcm91dGUuY3VycmVudDtcblxuICAgICAgICAgICAgLy8gTm90ZTogVGhpcyB3aWxsIGFsc28gbGluayBhbGwgY2hpbGRyZW4gb2YgbmctdmlldyB0aGF0IHdlcmUgY29udGFpbmVkIGluIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgLy8gaHRtbC4gSWYgdGhhdCBjb250ZW50IGNvbnRhaW5zIGNvbnRyb2xsZXJzLCAuLi4gdGhleSBjb3VsZCBwb2xsdXRlL2NoYW5nZSB0aGUgc2NvcGUuXG4gICAgICAgICAgICAvLyBIb3dldmVyLCB1c2luZyBuZy12aWV3IG9uIGFuIGVsZW1lbnQgd2l0aCBhZGRpdGlvbmFsIGNvbnRlbnQgZG9lcyBub3QgbWFrZSBzZW5zZS4uLlxuICAgICAgICAgICAgLy8gTm90ZTogV2UgY2FuJ3QgcmVtb3ZlIHRoZW0gaW4gdGhlIGNsb25lQXR0Y2hGbiBvZiAkdHJhbnNjbHVkZSBhcyB0aGF0XG4gICAgICAgICAgICAvLyBmdW5jdGlvbiBpcyBjYWxsZWQgYmVmb3JlIGxpbmtpbmcgdGhlIGNvbnRlbnQsIHdoaWNoIHdvdWxkIGFwcGx5IGNoaWxkXG4gICAgICAgICAgICAvLyBkaXJlY3RpdmVzIHRvIG5vbiBleGlzdGluZyBlbGVtZW50cy5cbiAgICAgICAgICAgIHZhciBjbG9uZSA9ICR0cmFuc2NsdWRlKG5ld1Njb3BlLCBmdW5jdGlvbihjbG9uZSkge1xuICAgICAgICAgICAgICAkYW5pbWF0ZS5lbnRlcihjbG9uZSwgbnVsbCwgY3VycmVudEVsZW1lbnQgfHwgJGVsZW1lbnQsIGZ1bmN0aW9uIG9uTmdWaWV3RW50ZXIgKCkge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdXRvU2Nyb2xsRXhwKVxuICAgICAgICAgICAgICAgICAgJiYgKCFhdXRvU2Nyb2xsRXhwIHx8IHNjb3BlLiRldmFsKGF1dG9TY3JvbGxFeHApKSkge1xuICAgICAgICAgICAgICAgICAgJGFuY2hvclNjcm9sbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGNsZWFudXBMYXN0VmlldygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY2xvbmU7XG4gICAgICAgICAgICBjdXJyZW50U2NvcGUgPSBjdXJyZW50LnNjb3BlID0gbmV3U2NvcGU7XG4gICAgICAgICAgICBjdXJyZW50U2NvcGUuJGVtaXQoJyR2aWV3Q29udGVudExvYWRlZCcpO1xuICAgICAgICAgICAgY3VycmVudFNjb3BlLiRldmFsKG9ubG9hZEV4cCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNsZWFudXBMYXN0VmlldygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLy8gVGhpcyBkaXJlY3RpdmUgaXMgY2FsbGVkIGR1cmluZyB0aGUgJHRyYW5zY2x1ZGUgY2FsbCBvZiB0aGUgZmlyc3QgYG5nVmlld2AgZGlyZWN0aXZlLlxuLy8gSXQgd2lsbCByZXBsYWNlIGFuZCBjb21waWxlIHRoZSBjb250ZW50IG9mIHRoZSBlbGVtZW50IHdpdGggdGhlIGxvYWRlZCB0ZW1wbGF0ZS5cbi8vIFdlIG5lZWQgdGhpcyBkaXJlY3RpdmUgc28gdGhhdCB0aGUgZWxlbWVudCBjb250ZW50IGlzIGFscmVhZHkgZmlsbGVkIHdoZW5cbi8vIHRoZSBsaW5rIGZ1bmN0aW9uIG9mIGFub3RoZXIgZGlyZWN0aXZlIG9uIHRoZSBzYW1lIGVsZW1lbnQgYXMgbmdWaWV3XG4vLyBpcyBjYWxsZWQuXG5uZ1ZpZXdGaWxsQ29udGVudEZhY3RvcnkuJGluamVjdCA9IFsnJGNvbXBpbGUnLCAnJGNvbnRyb2xsZXInLCAnJHJvdXRlJ107XG5mdW5jdGlvbiBuZ1ZpZXdGaWxsQ29udGVudEZhY3RvcnkoJGNvbXBpbGUsICRjb250cm9sbGVyLCAkcm91dGUpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0VDQScsXG4gICAgcHJpb3JpdHk6IC00MDAsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICB2YXIgY3VycmVudCA9ICRyb3V0ZS5jdXJyZW50LFxuICAgICAgICAgIGxvY2FscyA9IGN1cnJlbnQubG9jYWxzO1xuXG4gICAgICAkZWxlbWVudC5odG1sKGxvY2Fscy4kdGVtcGxhdGUpO1xuXG4gICAgICB2YXIgbGluayA9ICRjb21waWxlKCRlbGVtZW50LmNvbnRlbnRzKCkpO1xuXG4gICAgICBpZiAoY3VycmVudC5jb250cm9sbGVyKSB7XG4gICAgICAgIGxvY2Fscy4kc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSAkY29udHJvbGxlcihjdXJyZW50LmNvbnRyb2xsZXIsIGxvY2Fscyk7XG4gICAgICAgIGlmIChjdXJyZW50LmNvbnRyb2xsZXJBcykge1xuICAgICAgICAgIHNjb3BlW2N1cnJlbnQuY29udHJvbGxlckFzXSA9IGNvbnRyb2xsZXI7XG4gICAgICAgIH1cbiAgICAgICAgJGVsZW1lbnQuZGF0YSgnJG5nQ29udHJvbGxlckNvbnRyb2xsZXInLCBjb250cm9sbGVyKTtcbiAgICAgICAgJGVsZW1lbnQuY2hpbGRyZW4oKS5kYXRhKCckbmdDb250cm9sbGVyQ29udHJvbGxlcicsIGNvbnRyb2xsZXIpO1xuICAgICAgfVxuXG4gICAgICBsaW5rKHNjb3BlKTtcbiAgICB9XG4gIH07XG59XG5cblxufSkod2luZG93LCB3aW5kb3cuYW5ndWxhcik7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwibmdwbWNRXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGFuZ3VsYXItcm91dGVcXFxcYW5ndWxhci1yb3V0ZS5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxhbmd1bGFyLXJvdXRlXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xucmVxdWlyZSgnLi9saWIvYW5ndWxhci5taW4uanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIm5ncG1jUVwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxhbmd1bGFyXFxcXGluZGV4LWJyb3dzZXJpZnkuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYW5ndWxhclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qXG4gQW5ndWxhckpTIHYxLjIuMTZcbiAoYykgMjAxMC0yMDE0IEdvb2dsZSwgSW5jLiBodHRwOi8vYW5ndWxhcmpzLm9yZ1xuIExpY2Vuc2U6IE1JVFxuKi9cbihmdW5jdGlvbihPLFUscyl7J3VzZSBzdHJpY3QnO2Z1bmN0aW9uIHQoYil7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGE9YXJndW1lbnRzWzBdLGMsYT1cIltcIisoYj9iK1wiOlwiOlwiXCIpK2ErXCJdIGh0dHA6Ly9lcnJvcnMuYW5ndWxhcmpzLm9yZy8xLjIuMTYvXCIrKGI/YitcIi9cIjpcIlwiKSthO2ZvcihjPTE7Yzxhcmd1bWVudHMubGVuZ3RoO2MrKylhPWErKDE9PWM/XCI/XCI6XCImXCIpK1wicFwiKyhjLTEpK1wiPVwiK2VuY29kZVVSSUNvbXBvbmVudChcImZ1bmN0aW9uXCI9PXR5cGVvZiBhcmd1bWVudHNbY10/YXJndW1lbnRzW2NdLnRvU3RyaW5nKCkucmVwbGFjZSgvIFxce1tcXHNcXFNdKiQvLFwiXCIpOlwidW5kZWZpbmVkXCI9PXR5cGVvZiBhcmd1bWVudHNbY10/XCJ1bmRlZmluZWRcIjpcInN0cmluZ1wiIT10eXBlb2YgYXJndW1lbnRzW2NdP0pTT04uc3RyaW5naWZ5KGFyZ3VtZW50c1tjXSk6YXJndW1lbnRzW2NdKTtyZXR1cm4gRXJyb3IoYSl9fWZ1bmN0aW9uIGFiKGIpe2lmKG51bGw9PWJ8fENhKGIpKXJldHVybiExO1xudmFyIGE9Yi5sZW5ndGg7cmV0dXJuIDE9PT1iLm5vZGVUeXBlJiZhPyEwOncoYil8fE0oYil8fDA9PT1hfHxcIm51bWJlclwiPT09dHlwZW9mIGEmJjA8YSYmYS0xIGluIGJ9ZnVuY3Rpb24gcShiLGEsYyl7dmFyIGQ7aWYoYilpZihQKGIpKWZvcihkIGluIGIpXCJwcm90b3R5cGVcIj09ZHx8KFwibGVuZ3RoXCI9PWR8fFwibmFtZVwiPT1kfHxiLmhhc093blByb3BlcnR5JiYhYi5oYXNPd25Qcm9wZXJ0eShkKSl8fGEuY2FsbChjLGJbZF0sZCk7ZWxzZSBpZihiLmZvckVhY2gmJmIuZm9yRWFjaCE9PXEpYi5mb3JFYWNoKGEsYyk7ZWxzZSBpZihhYihiKSlmb3IoZD0wO2Q8Yi5sZW5ndGg7ZCsrKWEuY2FsbChjLGJbZF0sZCk7ZWxzZSBmb3IoZCBpbiBiKWIuaGFzT3duUHJvcGVydHkoZCkmJmEuY2FsbChjLGJbZF0sZCk7cmV0dXJuIGJ9ZnVuY3Rpb24gUWIoYil7dmFyIGE9W10sYztmb3IoYyBpbiBiKWIuaGFzT3duUHJvcGVydHkoYykmJmEucHVzaChjKTtyZXR1cm4gYS5zb3J0KCl9ZnVuY3Rpb24gU2MoYixcbmEsYyl7Zm9yKHZhciBkPVFiKGIpLGU9MDtlPGQubGVuZ3RoO2UrKylhLmNhbGwoYyxiW2RbZV1dLGRbZV0pO3JldHVybiBkfWZ1bmN0aW9uIFJiKGIpe3JldHVybiBmdW5jdGlvbihhLGMpe2IoYyxhKX19ZnVuY3Rpb24gYmIoKXtmb3IodmFyIGI9a2EubGVuZ3RoLGE7Yjspe2ItLTthPWthW2JdLmNoYXJDb2RlQXQoMCk7aWYoNTc9PWEpcmV0dXJuIGthW2JdPVwiQVwiLGthLmpvaW4oXCJcIik7aWYoOTA9PWEpa2FbYl09XCIwXCI7ZWxzZSByZXR1cm4ga2FbYl09U3RyaW5nLmZyb21DaGFyQ29kZShhKzEpLGthLmpvaW4oXCJcIil9a2EudW5zaGlmdChcIjBcIik7cmV0dXJuIGthLmpvaW4oXCJcIil9ZnVuY3Rpb24gU2IoYixhKXthP2IuJCRoYXNoS2V5PWE6ZGVsZXRlIGIuJCRoYXNoS2V5fWZ1bmN0aW9uIEQoYil7dmFyIGE9Yi4kJGhhc2hLZXk7cShhcmd1bWVudHMsZnVuY3Rpb24oYSl7YSE9PWImJnEoYSxmdW5jdGlvbihhLGMpe2JbY109YX0pfSk7U2IoYixhKTtyZXR1cm4gYn1mdW5jdGlvbiBZKGIpe3JldHVybiBwYXJzZUludChiLFxuMTApfWZ1bmN0aW9uIFRiKGIsYSl7cmV0dXJuIEQobmV3IChEKGZ1bmN0aW9uKCl7fSx7cHJvdG90eXBlOmJ9KSksYSl9ZnVuY3Rpb24gQygpe31mdW5jdGlvbiBEYShiKXtyZXR1cm4gYn1mdW5jdGlvbiBhYShiKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gYn19ZnVuY3Rpb24gRShiKXtyZXR1cm5cInVuZGVmaW5lZFwiPT09dHlwZW9mIGJ9ZnVuY3Rpb24gQihiKXtyZXR1cm5cInVuZGVmaW5lZFwiIT09dHlwZW9mIGJ9ZnVuY3Rpb24gWChiKXtyZXR1cm4gbnVsbCE9YiYmXCJvYmplY3RcIj09PXR5cGVvZiBifWZ1bmN0aW9uIHcoYil7cmV0dXJuXCJzdHJpbmdcIj09PXR5cGVvZiBifWZ1bmN0aW9uIHZiKGIpe3JldHVyblwibnVtYmVyXCI9PT10eXBlb2YgYn1mdW5jdGlvbiBOYShiKXtyZXR1cm5cIltvYmplY3QgRGF0ZV1cIj09PXdhLmNhbGwoYil9ZnVuY3Rpb24gTShiKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT13YS5jYWxsKGIpfWZ1bmN0aW9uIFAoYil7cmV0dXJuXCJmdW5jdGlvblwiPT09dHlwZW9mIGJ9XG5mdW5jdGlvbiBjYihiKXtyZXR1cm5cIltvYmplY3QgUmVnRXhwXVwiPT09d2EuY2FsbChiKX1mdW5jdGlvbiBDYShiKXtyZXR1cm4gYiYmYi5kb2N1bWVudCYmYi5sb2NhdGlvbiYmYi5hbGVydCYmYi5zZXRJbnRlcnZhbH1mdW5jdGlvbiBUYyhiKXtyZXR1cm4hKCFifHwhKGIubm9kZU5hbWV8fGIucHJvcCYmYi5hdHRyJiZiLmZpbmQpKX1mdW5jdGlvbiBVYyhiLGEsYyl7dmFyIGQ9W107cShiLGZ1bmN0aW9uKGIsZyxmKXtkLnB1c2goYS5jYWxsKGMsYixnLGYpKX0pO3JldHVybiBkfWZ1bmN0aW9uIGRiKGIsYSl7aWYoYi5pbmRleE9mKXJldHVybiBiLmluZGV4T2YoYSk7Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspaWYoYT09PWJbY10pcmV0dXJuIGM7cmV0dXJuLTF9ZnVuY3Rpb24gT2EoYixhKXt2YXIgYz1kYihiLGEpOzA8PWMmJmIuc3BsaWNlKGMsMSk7cmV0dXJuIGF9ZnVuY3Rpb24gYmEoYixhKXtpZihDYShiKXx8YiYmYi4kZXZhbEFzeW5jJiZiLiR3YXRjaCl0aHJvdyBQYShcImNwd3NcIik7XG5pZihhKXtpZihiPT09YSl0aHJvdyBQYShcImNwaVwiKTtpZihNKGIpKWZvcih2YXIgYz1hLmxlbmd0aD0wO2M8Yi5sZW5ndGg7YysrKWEucHVzaChiYShiW2NdKSk7ZWxzZXtjPWEuJCRoYXNoS2V5O3EoYSxmdW5jdGlvbihiLGMpe2RlbGV0ZSBhW2NdfSk7Zm9yKHZhciBkIGluIGIpYVtkXT1iYShiW2RdKTtTYihhLGMpfX1lbHNlKGE9YikmJihNKGIpP2E9YmEoYixbXSk6TmEoYik/YT1uZXcgRGF0ZShiLmdldFRpbWUoKSk6Y2IoYik/YT1SZWdFeHAoYi5zb3VyY2UpOlgoYikmJihhPWJhKGIse30pKSk7cmV0dXJuIGF9ZnVuY3Rpb24gVWIoYixhKXthPWF8fHt9O2Zvcih2YXIgYyBpbiBiKSFiLmhhc093blByb3BlcnR5KGMpfHxcIiRcIj09PWMuY2hhckF0KDApJiZcIiRcIj09PWMuY2hhckF0KDEpfHwoYVtjXT1iW2NdKTtyZXR1cm4gYX1mdW5jdGlvbiB4YShiLGEpe2lmKGI9PT1hKXJldHVybiEwO2lmKG51bGw9PT1ifHxudWxsPT09YSlyZXR1cm4hMTtpZihiIT09YiYmYSE9PWEpcmV0dXJuITA7XG52YXIgYz10eXBlb2YgYixkO2lmKGM9PXR5cGVvZiBhJiZcIm9iamVjdFwiPT1jKWlmKE0oYikpe2lmKCFNKGEpKXJldHVybiExO2lmKChjPWIubGVuZ3RoKT09YS5sZW5ndGgpe2ZvcihkPTA7ZDxjO2QrKylpZigheGEoYltkXSxhW2RdKSlyZXR1cm4hMTtyZXR1cm4hMH19ZWxzZXtpZihOYShiKSlyZXR1cm4gTmEoYSkmJmIuZ2V0VGltZSgpPT1hLmdldFRpbWUoKTtpZihjYihiKSYmY2IoYSkpcmV0dXJuIGIudG9TdHJpbmcoKT09YS50b1N0cmluZygpO2lmKGImJmIuJGV2YWxBc3luYyYmYi4kd2F0Y2h8fGEmJmEuJGV2YWxBc3luYyYmYS4kd2F0Y2h8fENhKGIpfHxDYShhKXx8TShhKSlyZXR1cm4hMTtjPXt9O2ZvcihkIGluIGIpaWYoXCIkXCIhPT1kLmNoYXJBdCgwKSYmIVAoYltkXSkpe2lmKCF4YShiW2RdLGFbZF0pKXJldHVybiExO2NbZF09ITB9Zm9yKGQgaW4gYSlpZighYy5oYXNPd25Qcm9wZXJ0eShkKSYmXCIkXCIhPT1kLmNoYXJBdCgwKSYmYVtkXSE9PXMmJiFQKGFbZF0pKXJldHVybiExO1xucmV0dXJuITB9cmV0dXJuITF9ZnVuY3Rpb24gVmIoKXtyZXR1cm4gVS5zZWN1cml0eVBvbGljeSYmVS5zZWN1cml0eVBvbGljeS5pc0FjdGl2ZXx8VS5xdWVyeVNlbGVjdG9yJiYhKCFVLnF1ZXJ5U2VsZWN0b3IoXCJbbmctY3NwXVwiKSYmIVUucXVlcnlTZWxlY3RvcihcIltkYXRhLW5nLWNzcF1cIikpfWZ1bmN0aW9uIGViKGIsYSl7dmFyIGM9Mjxhcmd1bWVudHMubGVuZ3RoP3lhLmNhbGwoYXJndW1lbnRzLDIpOltdO3JldHVybiFQKGEpfHxhIGluc3RhbmNlb2YgUmVnRXhwP2E6Yy5sZW5ndGg/ZnVuY3Rpb24oKXtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD9hLmFwcGx5KGIsYy5jb25jYXQoeWEuY2FsbChhcmd1bWVudHMsMCkpKTphLmFwcGx5KGIsYyl9OmZ1bmN0aW9uKCl7cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGg/YS5hcHBseShiLGFyZ3VtZW50cyk6YS5jYWxsKGIpfX1mdW5jdGlvbiBWYyhiLGEpe3ZhciBjPWE7XCJzdHJpbmdcIj09PXR5cGVvZiBiJiZcIiRcIj09PWIuY2hhckF0KDApP2M9XG5zOkNhKGEpP2M9XCIkV0lORE9XXCI6YSYmVT09PWE/Yz1cIiRET0NVTUVOVFwiOmEmJihhLiRldmFsQXN5bmMmJmEuJHdhdGNoKSYmKGM9XCIkU0NPUEVcIik7cmV0dXJuIGN9ZnVuY3Rpb24gcWEoYixhKXtyZXR1cm5cInVuZGVmaW5lZFwiPT09dHlwZW9mIGI/czpKU09OLnN0cmluZ2lmeShiLFZjLGE/XCIgIFwiOm51bGwpfWZ1bmN0aW9uIFdiKGIpe3JldHVybiB3KGIpP0pTT04ucGFyc2UoYik6Yn1mdW5jdGlvbiBRYShiKXtcImZ1bmN0aW9uXCI9PT10eXBlb2YgYj9iPSEwOmImJjAhPT1iLmxlbmd0aD8oYj1LKFwiXCIrYiksYj0hKFwiZlwiPT1ifHxcIjBcIj09Ynx8XCJmYWxzZVwiPT1ifHxcIm5vXCI9PWJ8fFwiblwiPT1ifHxcIltdXCI9PWIpKTpiPSExO3JldHVybiBifWZ1bmN0aW9uIGhhKGIpe2I9eShiKS5jbG9uZSgpO3RyeXtiLmVtcHR5KCl9Y2F0Y2goYSl7fXZhciBjPXkoXCI8ZGl2PlwiKS5hcHBlbmQoYikuaHRtbCgpO3RyeXtyZXR1cm4gMz09PWJbMF0ubm9kZVR5cGU/SyhjKTpjLm1hdGNoKC9eKDxbXj5dKz4pLylbMV0ucmVwbGFjZSgvXjwoW1xcd1xcLV0rKS8sXG5mdW5jdGlvbihhLGIpe3JldHVyblwiPFwiK0soYil9KX1jYXRjaChkKXtyZXR1cm4gSyhjKX19ZnVuY3Rpb24gWGIoYil7dHJ5e3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoYil9Y2F0Y2goYSl7fX1mdW5jdGlvbiBZYihiKXt2YXIgYT17fSxjLGQ7cSgoYnx8XCJcIikuc3BsaXQoXCImXCIpLGZ1bmN0aW9uKGIpe2ImJihjPWIuc3BsaXQoXCI9XCIpLGQ9WGIoY1swXSksQihkKSYmKGI9QihjWzFdKT9YYihjWzFdKTohMCxhW2RdP00oYVtkXSk/YVtkXS5wdXNoKGIpOmFbZF09W2FbZF0sYl06YVtkXT1iKSl9KTtyZXR1cm4gYX1mdW5jdGlvbiBaYihiKXt2YXIgYT1bXTtxKGIsZnVuY3Rpb24oYixkKXtNKGIpP3EoYixmdW5jdGlvbihiKXthLnB1c2goemEoZCwhMCkrKCEwPT09Yj9cIlwiOlwiPVwiK3phKGIsITApKSl9KTphLnB1c2goemEoZCwhMCkrKCEwPT09Yj9cIlwiOlwiPVwiK3phKGIsITApKSl9KTtyZXR1cm4gYS5sZW5ndGg/YS5qb2luKFwiJlwiKTpcIlwifWZ1bmN0aW9uIHdiKGIpe3JldHVybiB6YShiLFxuITApLnJlcGxhY2UoLyUyNi9naSxcIiZcIikucmVwbGFjZSgvJTNEL2dpLFwiPVwiKS5yZXBsYWNlKC8lMkIvZ2ksXCIrXCIpfWZ1bmN0aW9uIHphKGIsYSl7cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChiKS5yZXBsYWNlKC8lNDAvZ2ksXCJAXCIpLnJlcGxhY2UoLyUzQS9naSxcIjpcIikucmVwbGFjZSgvJTI0L2csXCIkXCIpLnJlcGxhY2UoLyUyQy9naSxcIixcIikucmVwbGFjZSgvJTIwL2csYT9cIiUyMFwiOlwiK1wiKX1mdW5jdGlvbiBXYyhiLGEpe2Z1bmN0aW9uIGMoYSl7YSYmZC5wdXNoKGEpfXZhciBkPVtiXSxlLGcsZj1bXCJuZzphcHBcIixcIm5nLWFwcFwiLFwieC1uZy1hcHBcIixcImRhdGEtbmctYXBwXCJdLGg9L1xcc25nWzpcXC1dYXBwKDpcXHMqKFtcXHdcXGRfXSspOz8pP1xccy87cShmLGZ1bmN0aW9uKGEpe2ZbYV09ITA7YyhVLmdldEVsZW1lbnRCeUlkKGEpKTthPWEucmVwbGFjZShcIjpcIixcIlxcXFw6XCIpO2IucXVlcnlTZWxlY3RvckFsbCYmKHEoYi5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK2EpLGMpLHEoYi5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK1xuYStcIlxcXFw6XCIpLGMpLHEoYi5xdWVyeVNlbGVjdG9yQWxsKFwiW1wiK2ErXCJdXCIpLGMpKX0pO3EoZCxmdW5jdGlvbihhKXtpZighZSl7dmFyIGI9aC5leGVjKFwiIFwiK2EuY2xhc3NOYW1lK1wiIFwiKTtiPyhlPWEsZz0oYlsyXXx8XCJcIikucmVwbGFjZSgvXFxzKy9nLFwiLFwiKSk6cShhLmF0dHJpYnV0ZXMsZnVuY3Rpb24oYil7IWUmJmZbYi5uYW1lXSYmKGU9YSxnPWIudmFsdWUpfSl9fSk7ZSYmYShlLGc/W2ddOltdKX1mdW5jdGlvbiAkYihiLGEpe3ZhciBjPWZ1bmN0aW9uKCl7Yj15KGIpO2lmKGIuaW5qZWN0b3IoKSl7dmFyIGM9YlswXT09PVU/XCJkb2N1bWVudFwiOmhhKGIpO3Rocm93IFBhKFwiYnRzdHJwZFwiLGMpO31hPWF8fFtdO2EudW5zaGlmdChbXCIkcHJvdmlkZVwiLGZ1bmN0aW9uKGEpe2EudmFsdWUoXCIkcm9vdEVsZW1lbnRcIixiKX1dKTthLnVuc2hpZnQoXCJuZ1wiKTtjPWFjKGEpO2MuaW52b2tlKFtcIiRyb290U2NvcGVcIixcIiRyb290RWxlbWVudFwiLFwiJGNvbXBpbGVcIixcIiRpbmplY3RvclwiLFwiJGFuaW1hdGVcIixcbmZ1bmN0aW9uKGEsYixjLGQsZSl7YS4kYXBwbHkoZnVuY3Rpb24oKXtiLmRhdGEoXCIkaW5qZWN0b3JcIixkKTtjKGIpKGEpfSl9XSk7cmV0dXJuIGN9LGQ9L15OR19ERUZFUl9CT09UU1RSQVAhLztpZihPJiYhZC50ZXN0KE8ubmFtZSkpcmV0dXJuIGMoKTtPLm5hbWU9Ty5uYW1lLnJlcGxhY2UoZCxcIlwiKTtFYS5yZXN1bWVCb290c3RyYXA9ZnVuY3Rpb24oYil7cShiLGZ1bmN0aW9uKGIpe2EucHVzaChiKX0pO2MoKX19ZnVuY3Rpb24gZmIoYixhKXthPWF8fFwiX1wiO3JldHVybiBiLnJlcGxhY2UoWGMsZnVuY3Rpb24oYixkKXtyZXR1cm4oZD9hOlwiXCIpK2IudG9Mb3dlckNhc2UoKX0pfWZ1bmN0aW9uIHhiKGIsYSxjKXtpZighYil0aHJvdyBQYShcImFyZXFcIixhfHxcIj9cIixjfHxcInJlcXVpcmVkXCIpO3JldHVybiBifWZ1bmN0aW9uIFJhKGIsYSxjKXtjJiZNKGIpJiYoYj1iW2IubGVuZ3RoLTFdKTt4YihQKGIpLGEsXCJub3QgYSBmdW5jdGlvbiwgZ290IFwiKyhiJiZcIm9iamVjdFwiPT10eXBlb2YgYj9cbmIuY29uc3RydWN0b3IubmFtZXx8XCJPYmplY3RcIjp0eXBlb2YgYikpO3JldHVybiBifWZ1bmN0aW9uIEFhKGIsYSl7aWYoXCJoYXNPd25Qcm9wZXJ0eVwiPT09Yil0aHJvdyBQYShcImJhZG5hbWVcIixhKTt9ZnVuY3Rpb24gYmMoYixhLGMpe2lmKCFhKXJldHVybiBiO2E9YS5zcGxpdChcIi5cIik7Zm9yKHZhciBkLGU9YixnPWEubGVuZ3RoLGY9MDtmPGc7ZisrKWQ9YVtmXSxiJiYoYj0oZT1iKVtkXSk7cmV0dXJuIWMmJlAoYik/ZWIoZSxiKTpifWZ1bmN0aW9uIHliKGIpe3ZhciBhPWJbMF07Yj1iW2IubGVuZ3RoLTFdO2lmKGE9PT1iKXJldHVybiB5KGEpO3ZhciBjPVthXTtkb3thPWEubmV4dFNpYmxpbmc7aWYoIWEpYnJlYWs7Yy5wdXNoKGEpfXdoaWxlKGEhPT1iKTtyZXR1cm4geShjKX1mdW5jdGlvbiBZYyhiKXt2YXIgYT10KFwiJGluamVjdG9yXCIpLGM9dChcIm5nXCIpO2I9Yi5hbmd1bGFyfHwoYi5hbmd1bGFyPXt9KTtiLiQkbWluRXJyPWIuJCRtaW5FcnJ8fHQ7cmV0dXJuIGIubW9kdWxlfHxcbihiLm1vZHVsZT1mdW5jdGlvbigpe3ZhciBiPXt9O3JldHVybiBmdW5jdGlvbihlLGcsZil7aWYoXCJoYXNPd25Qcm9wZXJ0eVwiPT09ZSl0aHJvdyBjKFwiYmFkbmFtZVwiLFwibW9kdWxlXCIpO2cmJmIuaGFzT3duUHJvcGVydHkoZSkmJihiW2VdPW51bGwpO3JldHVybiBiW2VdfHwoYltlXT1mdW5jdGlvbigpe2Z1bmN0aW9uIGIoYSxkLGUpe3JldHVybiBmdW5jdGlvbigpe2NbZXx8XCJwdXNoXCJdKFthLGQsYXJndW1lbnRzXSk7cmV0dXJuIG59fWlmKCFnKXRocm93IGEoXCJub21vZFwiLGUpO3ZhciBjPVtdLGQ9W10sbT1iKFwiJGluamVjdG9yXCIsXCJpbnZva2VcIiksbj17X2ludm9rZVF1ZXVlOmMsX3J1bkJsb2NrczpkLHJlcXVpcmVzOmcsbmFtZTplLHByb3ZpZGVyOmIoXCIkcHJvdmlkZVwiLFwicHJvdmlkZXJcIiksZmFjdG9yeTpiKFwiJHByb3ZpZGVcIixcImZhY3RvcnlcIiksc2VydmljZTpiKFwiJHByb3ZpZGVcIixcInNlcnZpY2VcIiksdmFsdWU6YihcIiRwcm92aWRlXCIsXCJ2YWx1ZVwiKSxjb25zdGFudDpiKFwiJHByb3ZpZGVcIixcblwiY29uc3RhbnRcIixcInVuc2hpZnRcIiksYW5pbWF0aW9uOmIoXCIkYW5pbWF0ZVByb3ZpZGVyXCIsXCJyZWdpc3RlclwiKSxmaWx0ZXI6YihcIiRmaWx0ZXJQcm92aWRlclwiLFwicmVnaXN0ZXJcIiksY29udHJvbGxlcjpiKFwiJGNvbnRyb2xsZXJQcm92aWRlclwiLFwicmVnaXN0ZXJcIiksZGlyZWN0aXZlOmIoXCIkY29tcGlsZVByb3ZpZGVyXCIsXCJkaXJlY3RpdmVcIiksY29uZmlnOm0scnVuOmZ1bmN0aW9uKGEpe2QucHVzaChhKTtyZXR1cm4gdGhpc319O2YmJm0oZik7cmV0dXJuIG59KCkpfX0oKSl9ZnVuY3Rpb24gWmMoYil7RChiLHtib290c3RyYXA6JGIsY29weTpiYSxleHRlbmQ6RCxlcXVhbHM6eGEsZWxlbWVudDp5LGZvckVhY2g6cSxpbmplY3RvcjphYyxub29wOkMsYmluZDplYix0b0pzb246cWEsZnJvbUpzb246V2IsaWRlbnRpdHk6RGEsaXNVbmRlZmluZWQ6RSxpc0RlZmluZWQ6Qixpc1N0cmluZzp3LGlzRnVuY3Rpb246UCxpc09iamVjdDpYLGlzTnVtYmVyOnZiLGlzRWxlbWVudDpUYyxpc0FycmF5Ok0sXG52ZXJzaW9uOiRjLGlzRGF0ZTpOYSxsb3dlcmNhc2U6Syx1cHBlcmNhc2U6RmEsY2FsbGJhY2tzOntjb3VudGVyOjB9LCQkbWluRXJyOnQsJCRjc3A6VmJ9KTtTYT1ZYyhPKTt0cnl7U2EoXCJuZ0xvY2FsZVwiKX1jYXRjaChhKXtTYShcIm5nTG9jYWxlXCIsW10pLnByb3ZpZGVyKFwiJGxvY2FsZVwiLGFkKX1TYShcIm5nXCIsW1wibmdMb2NhbGVcIl0sW1wiJHByb3ZpZGVcIixmdW5jdGlvbihhKXthLnByb3ZpZGVyKHskJHNhbml0aXplVXJpOmJkfSk7YS5wcm92aWRlcihcIiRjb21waWxlXCIsY2MpLmRpcmVjdGl2ZSh7YTpjZCxpbnB1dDpkYyx0ZXh0YXJlYTpkYyxmb3JtOmRkLHNjcmlwdDplZCxzZWxlY3Q6ZmQsc3R5bGU6Z2Qsb3B0aW9uOmhkLG5nQmluZDppZCxuZ0JpbmRIdG1sOmpkLG5nQmluZFRlbXBsYXRlOmtkLG5nQ2xhc3M6bGQsbmdDbGFzc0V2ZW46bWQsbmdDbGFzc09kZDpuZCxuZ0Nsb2FrOm9kLG5nQ29udHJvbGxlcjpwZCxuZ0Zvcm06cWQsbmdIaWRlOnJkLG5nSWY6c2QsbmdJbmNsdWRlOnRkLFxubmdJbml0OnVkLG5nTm9uQmluZGFibGU6dmQsbmdQbHVyYWxpemU6d2QsbmdSZXBlYXQ6eGQsbmdTaG93OnlkLG5nU3R5bGU6emQsbmdTd2l0Y2g6QWQsbmdTd2l0Y2hXaGVuOkJkLG5nU3dpdGNoRGVmYXVsdDpDZCxuZ09wdGlvbnM6RGQsbmdUcmFuc2NsdWRlOkVkLG5nTW9kZWw6RmQsbmdMaXN0OkdkLG5nQ2hhbmdlOkhkLHJlcXVpcmVkOmVjLG5nUmVxdWlyZWQ6ZWMsbmdWYWx1ZTpJZH0pLmRpcmVjdGl2ZSh7bmdJbmNsdWRlOkpkfSkuZGlyZWN0aXZlKHpiKS5kaXJlY3RpdmUoZmMpO2EucHJvdmlkZXIoeyRhbmNob3JTY3JvbGw6S2QsJGFuaW1hdGU6TGQsJGJyb3dzZXI6TWQsJGNhY2hlRmFjdG9yeTpOZCwkY29udHJvbGxlcjpPZCwkZG9jdW1lbnQ6UGQsJGV4Y2VwdGlvbkhhbmRsZXI6UWQsJGZpbHRlcjpnYywkaW50ZXJwb2xhdGU6UmQsJGludGVydmFsOlNkLCRodHRwOlRkLCRodHRwQmFja2VuZDpVZCwkbG9jYXRpb246VmQsJGxvZzpXZCwkcGFyc2U6WGQsJHJvb3RTY29wZTpZZCxcbiRxOlpkLCRzY2U6JGQsJHNjZURlbGVnYXRlOmFlLCRzbmlmZmVyOmJlLCR0ZW1wbGF0ZUNhY2hlOmNlLCR0aW1lb3V0OmRlLCR3aW5kb3c6ZWUsJCRyQUY6ZmUsJCRhc3luY0NhbGxiYWNrOmdlfSl9XSl9ZnVuY3Rpb24gVGEoYil7cmV0dXJuIGIucmVwbGFjZShoZSxmdW5jdGlvbihhLGIsZCxlKXtyZXR1cm4gZT9kLnRvVXBwZXJDYXNlKCk6ZH0pLnJlcGxhY2UoaWUsXCJNb3okMVwiKX1mdW5jdGlvbiBBYihiLGEsYyxkKXtmdW5jdGlvbiBlKGIpe3ZhciBlPWMmJmI/W3RoaXMuZmlsdGVyKGIpXTpbdGhpc10sbD1hLGssbSxuLHAscix6O2lmKCFkfHxudWxsIT1iKWZvcig7ZS5sZW5ndGg7KWZvcihrPWUuc2hpZnQoKSxtPTAsbj1rLmxlbmd0aDttPG47bSsrKWZvcihwPXkoa1ttXSksbD9wLnRyaWdnZXJIYW5kbGVyKFwiJGRlc3Ryb3lcIik6bD0hbCxyPTAscD0oej1wLmNoaWxkcmVuKCkpLmxlbmd0aDtyPHA7cisrKWUucHVzaChHYSh6W3JdKSk7cmV0dXJuIGcuYXBwbHkodGhpcyxhcmd1bWVudHMpfVxudmFyIGc9R2EuZm5bYl0sZz1nLiRvcmlnaW5hbHx8ZztlLiRvcmlnaW5hbD1nO0dhLmZuW2JdPWV9ZnVuY3Rpb24gTihiKXtpZihiIGluc3RhbmNlb2YgTilyZXR1cm4gYjt3KGIpJiYoYj1jYShiKSk7aWYoISh0aGlzIGluc3RhbmNlb2YgTikpe2lmKHcoYikmJlwiPFwiIT1iLmNoYXJBdCgwKSl0aHJvdyBCYihcIm5vc2VsXCIpO3JldHVybiBuZXcgTihiKX1pZih3KGIpKXt2YXIgYT1iO2I9VTt2YXIgYztpZihjPWplLmV4ZWMoYSkpYj1bYi5jcmVhdGVFbGVtZW50KGNbMV0pXTtlbHNle3ZhciBkPWIsZTtiPWQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2M9W107aWYoQ2IudGVzdChhKSl7ZD1iLmFwcGVuZENoaWxkKGQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7ZT0oa2UuZXhlYyhhKXx8W1wiXCIsXCJcIl0pWzFdLnRvTG93ZXJDYXNlKCk7ZT1lYVtlXXx8ZWEuX2RlZmF1bHQ7ZC5pbm5lckhUTUw9XCI8ZGl2PiYjMTYwOzwvZGl2PlwiK2VbMV0rYS5yZXBsYWNlKGxlLFwiPCQxPjwvJDI+XCIpK2VbMl07XG5kLnJlbW92ZUNoaWxkKGQuZmlyc3RDaGlsZCk7Zm9yKGE9ZVswXTthLS07KWQ9ZC5sYXN0Q2hpbGQ7YT0wO2ZvcihlPWQuY2hpbGROb2Rlcy5sZW5ndGg7YTxlOysrYSljLnB1c2goZC5jaGlsZE5vZGVzW2FdKTtkPWIuZmlyc3RDaGlsZDtkLnRleHRDb250ZW50PVwiXCJ9ZWxzZSBjLnB1c2goZC5jcmVhdGVUZXh0Tm9kZShhKSk7Yi50ZXh0Q29udGVudD1cIlwiO2IuaW5uZXJIVE1MPVwiXCI7Yj1jfURiKHRoaXMsYik7eShVLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSkuYXBwZW5kKHRoaXMpfWVsc2UgRGIodGhpcyxiKX1mdW5jdGlvbiBFYihiKXtyZXR1cm4gYi5jbG9uZU5vZGUoITApfWZ1bmN0aW9uIEhhKGIpe2hjKGIpO3ZhciBhPTA7Zm9yKGI9Yi5jaGlsZE5vZGVzfHxbXTthPGIubGVuZ3RoO2ErKylIYShiW2FdKX1mdW5jdGlvbiBpYyhiLGEsYyxkKXtpZihCKGQpKXRocm93IEJiKFwib2ZmYXJnc1wiKTt2YXIgZT1sYShiLFwiZXZlbnRzXCIpO2xhKGIsXCJoYW5kbGVcIikmJihFKGEpP3EoZSxcbmZ1bmN0aW9uKGEsYyl7RmIoYixjLGEpO2RlbGV0ZSBlW2NdfSk6cShhLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihhKXtFKGMpPyhGYihiLGEsZVthXSksZGVsZXRlIGVbYV0pOk9hKGVbYV18fFtdLGMpfSkpfWZ1bmN0aW9uIGhjKGIsYSl7dmFyIGM9YltnYl0sZD1VYVtjXTtkJiYoYT9kZWxldGUgVWFbY10uZGF0YVthXTooZC5oYW5kbGUmJihkLmV2ZW50cy4kZGVzdHJveSYmZC5oYW5kbGUoe30sXCIkZGVzdHJveVwiKSxpYyhiKSksZGVsZXRlIFVhW2NdLGJbZ2JdPXMpKX1mdW5jdGlvbiBsYShiLGEsYyl7dmFyIGQ9YltnYl0sZD1VYVtkfHwtMV07aWYoQihjKSlkfHwoYltnYl09ZD0rK21lLGQ9VWFbZF09e30pLGRbYV09YztlbHNlIHJldHVybiBkJiZkW2FdfWZ1bmN0aW9uIGpjKGIsYSxjKXt2YXIgZD1sYShiLFwiZGF0YVwiKSxlPUIoYyksZz0hZSYmQihhKSxmPWcmJiFYKGEpO2R8fGZ8fGxhKGIsXCJkYXRhXCIsZD17fSk7aWYoZSlkW2FdPWM7ZWxzZSBpZihnKXtpZihmKXJldHVybiBkJiZkW2FdO1xuRChkLGEpfWVsc2UgcmV0dXJuIGR9ZnVuY3Rpb24gR2IoYixhKXtyZXR1cm4gYi5nZXRBdHRyaWJ1dGU/LTE8KFwiIFwiKyhiLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwiKStcIiBcIikucmVwbGFjZSgvW1xcblxcdF0vZyxcIiBcIikuaW5kZXhPZihcIiBcIithK1wiIFwiKTohMX1mdW5jdGlvbiBoYihiLGEpe2EmJmIuc2V0QXR0cmlidXRlJiZxKGEuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGEpe2Iuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixjYSgoXCIgXCIrKGIuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil8fFwiXCIpK1wiIFwiKS5yZXBsYWNlKC9bXFxuXFx0XS9nLFwiIFwiKS5yZXBsYWNlKFwiIFwiK2NhKGEpK1wiIFwiLFwiIFwiKSkpfSl9ZnVuY3Rpb24gaWIoYixhKXtpZihhJiZiLnNldEF0dHJpYnV0ZSl7dmFyIGM9KFwiIFwiKyhiLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwiKStcIiBcIikucmVwbGFjZSgvW1xcblxcdF0vZyxcIiBcIik7cShhLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihhKXthPWNhKGEpOy0xPT09Yy5pbmRleE9mKFwiIFwiK2ErXCIgXCIpJiZcbihjKz1hK1wiIFwiKX0pO2Iuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixjYShjKSl9fWZ1bmN0aW9uIERiKGIsYSl7aWYoYSl7YT1hLm5vZGVOYW1lfHwhQihhLmxlbmd0aCl8fENhKGEpP1thXTphO2Zvcih2YXIgYz0wO2M8YS5sZW5ndGg7YysrKWIucHVzaChhW2NdKX19ZnVuY3Rpb24ga2MoYixhKXtyZXR1cm4gamIoYixcIiRcIisoYXx8XCJuZ0NvbnRyb2xsZXJcIikrXCJDb250cm9sbGVyXCIpfWZ1bmN0aW9uIGpiKGIsYSxjKXtiPXkoYik7OT09YlswXS5ub2RlVHlwZSYmKGI9Yi5maW5kKFwiaHRtbFwiKSk7Zm9yKGE9TShhKT9hOlthXTtiLmxlbmd0aDspe2Zvcih2YXIgZD1iWzBdLGU9MCxnPWEubGVuZ3RoO2U8ZztlKyspaWYoKGM9Yi5kYXRhKGFbZV0pKSE9PXMpcmV0dXJuIGM7Yj15KGQucGFyZW50Tm9kZXx8MTE9PT1kLm5vZGVUeXBlJiZkLmhvc3QpfX1mdW5jdGlvbiBsYyhiKXtmb3IodmFyIGE9MCxjPWIuY2hpbGROb2RlczthPGMubGVuZ3RoO2ErKylIYShjW2FdKTtmb3IoO2IuZmlyc3RDaGlsZDspYi5yZW1vdmVDaGlsZChiLmZpcnN0Q2hpbGQpfVxuZnVuY3Rpb24gbWMoYixhKXt2YXIgYz1rYlthLnRvTG93ZXJDYXNlKCldO3JldHVybiBjJiZuY1tiLm5vZGVOYW1lXSYmY31mdW5jdGlvbiBuZShiLGEpe3ZhciBjPWZ1bmN0aW9uKGMsZSl7Yy5wcmV2ZW50RGVmYXVsdHx8KGMucHJldmVudERlZmF1bHQ9ZnVuY3Rpb24oKXtjLnJldHVyblZhbHVlPSExfSk7Yy5zdG9wUHJvcGFnYXRpb258fChjLnN0b3BQcm9wYWdhdGlvbj1mdW5jdGlvbigpe2MuY2FuY2VsQnViYmxlPSEwfSk7Yy50YXJnZXR8fChjLnRhcmdldD1jLnNyY0VsZW1lbnR8fFUpO2lmKEUoYy5kZWZhdWx0UHJldmVudGVkKSl7dmFyIGc9Yy5wcmV2ZW50RGVmYXVsdDtjLnByZXZlbnREZWZhdWx0PWZ1bmN0aW9uKCl7Yy5kZWZhdWx0UHJldmVudGVkPSEwO2cuY2FsbChjKX07Yy5kZWZhdWx0UHJldmVudGVkPSExfWMuaXNEZWZhdWx0UHJldmVudGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGMuZGVmYXVsdFByZXZlbnRlZHx8ITE9PT1jLnJldHVyblZhbHVlfTt2YXIgZj1VYihhW2V8fFxuYy50eXBlXXx8W10pO3EoZixmdW5jdGlvbihhKXthLmNhbGwoYixjKX0pOzg+PVM/KGMucHJldmVudERlZmF1bHQ9bnVsbCxjLnN0b3BQcm9wYWdhdGlvbj1udWxsLGMuaXNEZWZhdWx0UHJldmVudGVkPW51bGwpOihkZWxldGUgYy5wcmV2ZW50RGVmYXVsdCxkZWxldGUgYy5zdG9wUHJvcGFnYXRpb24sZGVsZXRlIGMuaXNEZWZhdWx0UHJldmVudGVkKX07Yy5lbGVtPWI7cmV0dXJuIGN9ZnVuY3Rpb24gSWEoYil7dmFyIGE9dHlwZW9mIGIsYztcIm9iamVjdFwiPT1hJiZudWxsIT09Yj9cImZ1bmN0aW9uXCI9PXR5cGVvZihjPWIuJCRoYXNoS2V5KT9jPWIuJCRoYXNoS2V5KCk6Yz09PXMmJihjPWIuJCRoYXNoS2V5PWJiKCkpOmM9YjtyZXR1cm4gYStcIjpcIitjfWZ1bmN0aW9uIFZhKGIpe3EoYix0aGlzLnB1dCx0aGlzKX1mdW5jdGlvbiBvYyhiKXt2YXIgYSxjO1wiZnVuY3Rpb25cIj09dHlwZW9mIGI/KGE9Yi4kaW5qZWN0KXx8KGE9W10sYi5sZW5ndGgmJihjPWIudG9TdHJpbmcoKS5yZXBsYWNlKG9lLFxuXCJcIiksYz1jLm1hdGNoKHBlKSxxKGNbMV0uc3BsaXQocWUpLGZ1bmN0aW9uKGIpe2IucmVwbGFjZShyZSxmdW5jdGlvbihiLGMsZCl7YS5wdXNoKGQpfSl9KSksYi4kaW5qZWN0PWEpOk0oYik/KGM9Yi5sZW5ndGgtMSxSYShiW2NdLFwiZm5cIiksYT1iLnNsaWNlKDAsYykpOlJhKGIsXCJmblwiLCEwKTtyZXR1cm4gYX1mdW5jdGlvbiBhYyhiKXtmdW5jdGlvbiBhKGEpe3JldHVybiBmdW5jdGlvbihiLGMpe2lmKFgoYikpcShiLFJiKGEpKTtlbHNlIHJldHVybiBhKGIsYyl9fWZ1bmN0aW9uIGMoYSxiKXtBYShhLFwic2VydmljZVwiKTtpZihQKGIpfHxNKGIpKWI9bi5pbnN0YW50aWF0ZShiKTtpZighYi4kZ2V0KXRocm93IFdhKFwicGdldFwiLGEpO3JldHVybiBtW2EraF09Yn1mdW5jdGlvbiBkKGEsYil7cmV0dXJuIGMoYSx7JGdldDpifSl9ZnVuY3Rpb24gZShhKXt2YXIgYj1bXSxjLGQsZyxoO3EoYSxmdW5jdGlvbihhKXtpZighay5nZXQoYSkpe2sucHV0KGEsITApO3RyeXtpZih3KGEpKWZvcihjPVxuU2EoYSksYj1iLmNvbmNhdChlKGMucmVxdWlyZXMpKS5jb25jYXQoYy5fcnVuQmxvY2tzKSxkPWMuX2ludm9rZVF1ZXVlLGc9MCxoPWQubGVuZ3RoO2c8aDtnKyspe3ZhciBmPWRbZ10sbD1uLmdldChmWzBdKTtsW2ZbMV1dLmFwcGx5KGwsZlsyXSl9ZWxzZSBQKGEpP2IucHVzaChuLmludm9rZShhKSk6TShhKT9iLnB1c2gobi5pbnZva2UoYSkpOlJhKGEsXCJtb2R1bGVcIil9Y2F0Y2gobSl7dGhyb3cgTShhKSYmKGE9YVthLmxlbmd0aC0xXSksbS5tZXNzYWdlJiYobS5zdGFjayYmLTE9PW0uc3RhY2suaW5kZXhPZihtLm1lc3NhZ2UpKSYmKG09bS5tZXNzYWdlK1wiXFxuXCIrbS5zdGFjayksV2EoXCJtb2R1bGVyclwiLGEsbS5zdGFja3x8bS5tZXNzYWdlfHxtKTt9fX0pO3JldHVybiBifWZ1bmN0aW9uIGcoYSxiKXtmdW5jdGlvbiBjKGQpe2lmKGEuaGFzT3duUHJvcGVydHkoZCkpe2lmKGFbZF09PT1mKXRocm93IFdhKFwiY2RlcFwiLGwuam9pbihcIiA8LSBcIikpO3JldHVybiBhW2RdfXRyeXtyZXR1cm4gbC51bnNoaWZ0KGQpLFxuYVtkXT1mLGFbZF09YihkKX1jYXRjaChlKXt0aHJvdyBhW2RdPT09ZiYmZGVsZXRlIGFbZF0sZTt9ZmluYWxseXtsLnNoaWZ0KCl9fWZ1bmN0aW9uIGQoYSxiLGUpe3ZhciBnPVtdLGg9b2MoYSksZixsLGs7bD0wO2ZvcihmPWgubGVuZ3RoO2w8ZjtsKyspe2s9aFtsXTtpZihcInN0cmluZ1wiIT09dHlwZW9mIGspdGhyb3cgV2EoXCJpdGtuXCIsayk7Zy5wdXNoKGUmJmUuaGFzT3duUHJvcGVydHkoayk/ZVtrXTpjKGspKX1hLiRpbmplY3R8fChhPWFbZl0pO3JldHVybiBhLmFwcGx5KGIsZyl9cmV0dXJue2ludm9rZTpkLGluc3RhbnRpYXRlOmZ1bmN0aW9uKGEsYil7dmFyIGM9ZnVuY3Rpb24oKXt9LGU7Yy5wcm90b3R5cGU9KE0oYSk/YVthLmxlbmd0aC0xXTphKS5wcm90b3R5cGU7Yz1uZXcgYztlPWQoYSxjLGIpO3JldHVybiBYKGUpfHxQKGUpP2U6Y30sZ2V0OmMsYW5ub3RhdGU6b2MsaGFzOmZ1bmN0aW9uKGIpe3JldHVybiBtLmhhc093blByb3BlcnR5KGIraCl8fGEuaGFzT3duUHJvcGVydHkoYil9fX1cbnZhciBmPXt9LGg9XCJQcm92aWRlclwiLGw9W10saz1uZXcgVmEsbT17JHByb3ZpZGU6e3Byb3ZpZGVyOmEoYyksZmFjdG9yeTphKGQpLHNlcnZpY2U6YShmdW5jdGlvbihhLGIpe3JldHVybiBkKGEsW1wiJGluamVjdG9yXCIsZnVuY3Rpb24oYSl7cmV0dXJuIGEuaW5zdGFudGlhdGUoYil9XSl9KSx2YWx1ZTphKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGQoYSxhYShiKSl9KSxjb25zdGFudDphKGZ1bmN0aW9uKGEsYil7QWEoYSxcImNvbnN0YW50XCIpO21bYV09YjtwW2FdPWJ9KSxkZWNvcmF0b3I6ZnVuY3Rpb24oYSxiKXt2YXIgYz1uLmdldChhK2gpLGQ9Yy4kZ2V0O2MuJGdldD1mdW5jdGlvbigpe3ZhciBhPXIuaW52b2tlKGQsYyk7cmV0dXJuIHIuaW52b2tlKGIsbnVsbCx7JGRlbGVnYXRlOmF9KX19fX0sbj1tLiRpbmplY3Rvcj1nKG0sZnVuY3Rpb24oKXt0aHJvdyBXYShcInVucHJcIixsLmpvaW4oXCIgPC0gXCIpKTt9KSxwPXt9LHI9cC4kaW5qZWN0b3I9ZyhwLGZ1bmN0aW9uKGEpe2E9bi5nZXQoYStcbmgpO3JldHVybiByLmludm9rZShhLiRnZXQsYSl9KTtxKGUoYiksZnVuY3Rpb24oYSl7ci5pbnZva2UoYXx8Qyl9KTtyZXR1cm4gcn1mdW5jdGlvbiBLZCgpe3ZhciBiPSEwO3RoaXMuZGlzYWJsZUF1dG9TY3JvbGxpbmc9ZnVuY3Rpb24oKXtiPSExfTt0aGlzLiRnZXQ9W1wiJHdpbmRvd1wiLFwiJGxvY2F0aW9uXCIsXCIkcm9vdFNjb3BlXCIsZnVuY3Rpb24oYSxjLGQpe2Z1bmN0aW9uIGUoYSl7dmFyIGI9bnVsbDtxKGEsZnVuY3Rpb24oYSl7Ynx8XCJhXCIhPT1LKGEubm9kZU5hbWUpfHwoYj1hKX0pO3JldHVybiBifWZ1bmN0aW9uIGcoKXt2YXIgYj1jLmhhc2goKSxkO2I/KGQ9Zi5nZXRFbGVtZW50QnlJZChiKSk/ZC5zY3JvbGxJbnRvVmlldygpOihkPWUoZi5nZXRFbGVtZW50c0J5TmFtZShiKSkpP2Quc2Nyb2xsSW50b1ZpZXcoKTpcInRvcFwiPT09YiYmYS5zY3JvbGxUbygwLDApOmEuc2Nyb2xsVG8oMCwwKX12YXIgZj1hLmRvY3VtZW50O2ImJmQuJHdhdGNoKGZ1bmN0aW9uKCl7cmV0dXJuIGMuaGFzaCgpfSxcbmZ1bmN0aW9uKCl7ZC4kZXZhbEFzeW5jKGcpfSk7cmV0dXJuIGd9XX1mdW5jdGlvbiBnZSgpe3RoaXMuJGdldD1bXCIkJHJBRlwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihiLGEpe3JldHVybiBiLnN1cHBvcnRlZD9mdW5jdGlvbihhKXtyZXR1cm4gYihhKX06ZnVuY3Rpb24oYil7cmV0dXJuIGEoYiwwLCExKX19XX1mdW5jdGlvbiBzZShiLGEsYyxkKXtmdW5jdGlvbiBlKGEpe3RyeXthLmFwcGx5KG51bGwseWEuY2FsbChhcmd1bWVudHMsMSkpfWZpbmFsbHl7aWYoei0tLDA9PT16KWZvcig7dS5sZW5ndGg7KXRyeXt1LnBvcCgpKCl9Y2F0Y2goYil7Yy5lcnJvcihiKX19fWZ1bmN0aW9uIGcoYSxiKXsoZnVuY3Rpb24gVCgpe3EoRixmdW5jdGlvbihhKXthKCl9KTt2PWIoVCxhKX0pKCl9ZnVuY3Rpb24gZigpe3g9bnVsbDtKIT1oLnVybCgpJiYoSj1oLnVybCgpLHEobWEsZnVuY3Rpb24oYSl7YShoLnVybCgpKX0pKX12YXIgaD10aGlzLGw9YVswXSxrPWIubG9jYXRpb24sbT1iLmhpc3RvcnksXG5uPWIuc2V0VGltZW91dCxwPWIuY2xlYXJUaW1lb3V0LHI9e307aC5pc01vY2s9ITE7dmFyIHo9MCx1PVtdO2guJCRjb21wbGV0ZU91dHN0YW5kaW5nUmVxdWVzdD1lO2guJCRpbmNPdXRzdGFuZGluZ1JlcXVlc3RDb3VudD1mdW5jdGlvbigpe3orK307aC5ub3RpZnlXaGVuTm9PdXRzdGFuZGluZ1JlcXVlc3RzPWZ1bmN0aW9uKGEpe3EoRixmdW5jdGlvbihhKXthKCl9KTswPT09ej9hKCk6dS5wdXNoKGEpfTt2YXIgRj1bXSx2O2guYWRkUG9sbEZuPWZ1bmN0aW9uKGEpe0UodikmJmcoMTAwLG4pO0YucHVzaChhKTtyZXR1cm4gYX07dmFyIEo9ay5ocmVmLEE9YS5maW5kKFwiYmFzZVwiKSx4PW51bGw7aC51cmw9ZnVuY3Rpb24oYSxjKXtrIT09Yi5sb2NhdGlvbiYmKGs9Yi5sb2NhdGlvbik7bSE9PWIuaGlzdG9yeSYmKG09Yi5oaXN0b3J5KTtpZihhKXtpZihKIT1hKXJldHVybiBKPWEsZC5oaXN0b3J5P2M/bS5yZXBsYWNlU3RhdGUobnVsbCxcIlwiLGEpOihtLnB1c2hTdGF0ZShudWxsLFwiXCIsXG5hKSxBLmF0dHIoXCJocmVmXCIsQS5hdHRyKFwiaHJlZlwiKSkpOih4PWEsYz9rLnJlcGxhY2UoYSk6ay5ocmVmPWEpLGh9ZWxzZSByZXR1cm4geHx8ay5ocmVmLnJlcGxhY2UoLyUyNy9nLFwiJ1wiKX07dmFyIG1hPVtdLEw9ITE7aC5vblVybENoYW5nZT1mdW5jdGlvbihhKXtpZighTCl7aWYoZC5oaXN0b3J5KXkoYikub24oXCJwb3BzdGF0ZVwiLGYpO2lmKGQuaGFzaGNoYW5nZSl5KGIpLm9uKFwiaGFzaGNoYW5nZVwiLGYpO2Vsc2UgaC5hZGRQb2xsRm4oZik7TD0hMH1tYS5wdXNoKGEpO3JldHVybiBhfTtoLmJhc2VIcmVmPWZ1bmN0aW9uKCl7dmFyIGE9QS5hdHRyKFwiaHJlZlwiKTtyZXR1cm4gYT9hLnJlcGxhY2UoL14oaHR0cHM/XFw6KT9cXC9cXC9bXlxcL10qLyxcIlwiKTpcIlwifTt2YXIgUT17fSxkYT1cIlwiLEg9aC5iYXNlSHJlZigpO2guY29va2llcz1mdW5jdGlvbihhLGIpe3ZhciBkLGUsZyxoO2lmKGEpYj09PXM/bC5jb29raWU9ZXNjYXBlKGEpK1wiPTtwYXRoPVwiK0grXCI7ZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIEdNVFwiOlxudyhiKSYmKGQ9KGwuY29va2llPWVzY2FwZShhKStcIj1cIitlc2NhcGUoYikrXCI7cGF0aD1cIitIKS5sZW5ndGgrMSw0MDk2PGQmJmMud2FybihcIkNvb2tpZSAnXCIrYStcIicgcG9zc2libHkgbm90IHNldCBvciBvdmVyZmxvd2VkIGJlY2F1c2UgaXQgd2FzIHRvbyBsYXJnZSAoXCIrZCtcIiA+IDQwOTYgYnl0ZXMpIVwiKSk7ZWxzZXtpZihsLmNvb2tpZSE9PWRhKWZvcihkYT1sLmNvb2tpZSxkPWRhLnNwbGl0KFwiOyBcIiksUT17fSxnPTA7ZzxkLmxlbmd0aDtnKyspZT1kW2ddLGg9ZS5pbmRleE9mKFwiPVwiKSwwPGgmJihhPXVuZXNjYXBlKGUuc3Vic3RyaW5nKDAsaCkpLFFbYV09PT1zJiYoUVthXT11bmVzY2FwZShlLnN1YnN0cmluZyhoKzEpKSkpO3JldHVybiBRfX07aC5kZWZlcj1mdW5jdGlvbihhLGIpe3ZhciBjO3orKztjPW4oZnVuY3Rpb24oKXtkZWxldGUgcltjXTtlKGEpfSxifHwwKTtyW2NdPSEwO3JldHVybiBjfTtoLmRlZmVyLmNhbmNlbD1mdW5jdGlvbihhKXtyZXR1cm4gclthXT8oZGVsZXRlIHJbYV0sXG5wKGEpLGUoQyksITApOiExfX1mdW5jdGlvbiBNZCgpe3RoaXMuJGdldD1bXCIkd2luZG93XCIsXCIkbG9nXCIsXCIkc25pZmZlclwiLFwiJGRvY3VtZW50XCIsZnVuY3Rpb24oYixhLGMsZCl7cmV0dXJuIG5ldyBzZShiLGQsYSxjKX1dfWZ1bmN0aW9uIE5kKCl7dGhpcy4kZ2V0PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYihiLGQpe2Z1bmN0aW9uIGUoYSl7YSE9biYmKHA/cD09YSYmKHA9YS5uKTpwPWEsZyhhLm4sYS5wKSxnKGEsbiksbj1hLG4ubj1udWxsKX1mdW5jdGlvbiBnKGEsYil7YSE9YiYmKGEmJihhLnA9YiksYiYmKGIubj1hKSl9aWYoYiBpbiBhKXRocm93IHQoXCIkY2FjaGVGYWN0b3J5XCIpKFwiaWlkXCIsYik7dmFyIGY9MCxoPUQoe30sZCx7aWQ6Yn0pLGw9e30saz1kJiZkLmNhcGFjaXR5fHxOdW1iZXIuTUFYX1ZBTFVFLG09e30sbj1udWxsLHA9bnVsbDtyZXR1cm4gYVtiXT17cHV0OmZ1bmN0aW9uKGEsYil7aWYoazxOdW1iZXIuTUFYX1ZBTFVFKXt2YXIgYz1tW2FdfHwobVthXT17a2V5OmF9KTtcbmUoYyl9aWYoIUUoYikpcmV0dXJuIGEgaW4gbHx8ZisrLGxbYV09YixmPmsmJnRoaXMucmVtb3ZlKHAua2V5KSxifSxnZXQ6ZnVuY3Rpb24oYSl7aWYoazxOdW1iZXIuTUFYX1ZBTFVFKXt2YXIgYj1tW2FdO2lmKCFiKXJldHVybjtlKGIpfXJldHVybiBsW2FdfSxyZW1vdmU6ZnVuY3Rpb24oYSl7aWYoazxOdW1iZXIuTUFYX1ZBTFVFKXt2YXIgYj1tW2FdO2lmKCFiKXJldHVybjtiPT1uJiYobj1iLnApO2I9PXAmJihwPWIubik7ZyhiLm4sYi5wKTtkZWxldGUgbVthXX1kZWxldGUgbFthXTtmLS19LHJlbW92ZUFsbDpmdW5jdGlvbigpe2w9e307Zj0wO209e307bj1wPW51bGx9LGRlc3Ryb3k6ZnVuY3Rpb24oKXttPWg9bD1udWxsO2RlbGV0ZSBhW2JdfSxpbmZvOmZ1bmN0aW9uKCl7cmV0dXJuIEQoe30saCx7c2l6ZTpmfSl9fX12YXIgYT17fTtiLmluZm89ZnVuY3Rpb24oKXt2YXIgYj17fTtxKGEsZnVuY3Rpb24oYSxlKXtiW2VdPWEuaW5mbygpfSk7cmV0dXJuIGJ9O2IuZ2V0PWZ1bmN0aW9uKGIpe3JldHVybiBhW2JdfTtcbnJldHVybiBifX1mdW5jdGlvbiBjZSgpe3RoaXMuJGdldD1bXCIkY2FjaGVGYWN0b3J5XCIsZnVuY3Rpb24oYil7cmV0dXJuIGIoXCJ0ZW1wbGF0ZXNcIil9XX1mdW5jdGlvbiBjYyhiLGEpe3ZhciBjPXt9LGQ9XCJEaXJlY3RpdmVcIixlPS9eXFxzKmRpcmVjdGl2ZVxcOlxccyooW1xcZFxcd1xcLV9dKylcXHMrKC4qKSQvLGc9LygoW1xcZFxcd1xcLV9dKykoPzpcXDooW147XSspKT87PykvLGY9L14ob25bYS16XSt8Zm9ybWFjdGlvbikkLzt0aGlzLmRpcmVjdGl2ZT1mdW5jdGlvbiBsKGEsZSl7QWEoYSxcImRpcmVjdGl2ZVwiKTt3KGEpPyh4YihlLFwiZGlyZWN0aXZlRmFjdG9yeVwiKSxjLmhhc093blByb3BlcnR5KGEpfHwoY1thXT1bXSxiLmZhY3RvcnkoYStkLFtcIiRpbmplY3RvclwiLFwiJGV4Y2VwdGlvbkhhbmRsZXJcIixmdW5jdGlvbihiLGQpe3ZhciBlPVtdO3EoY1thXSxmdW5jdGlvbihjLGcpe3RyeXt2YXIgZj1iLmludm9rZShjKTtQKGYpP2Y9e2NvbXBpbGU6YWEoZil9OiFmLmNvbXBpbGUmJmYubGluayYmKGYuY29tcGlsZT1cbmFhKGYubGluaykpO2YucHJpb3JpdHk9Zi5wcmlvcml0eXx8MDtmLmluZGV4PWc7Zi5uYW1lPWYubmFtZXx8YTtmLnJlcXVpcmU9Zi5yZXF1aXJlfHxmLmNvbnRyb2xsZXImJmYubmFtZTtmLnJlc3RyaWN0PWYucmVzdHJpY3R8fFwiQVwiO2UucHVzaChmKX1jYXRjaChsKXtkKGwpfX0pO3JldHVybiBlfV0pKSxjW2FdLnB1c2goZSkpOnEoYSxSYihsKSk7cmV0dXJuIHRoaXN9O3RoaXMuYUhyZWZTYW5pdGl6YXRpb25XaGl0ZWxpc3Q9ZnVuY3Rpb24oYil7cmV0dXJuIEIoYik/KGEuYUhyZWZTYW5pdGl6YXRpb25XaGl0ZWxpc3QoYiksdGhpcyk6YS5hSHJlZlNhbml0aXphdGlvbldoaXRlbGlzdCgpfTt0aGlzLmltZ1NyY1Nhbml0aXphdGlvbldoaXRlbGlzdD1mdW5jdGlvbihiKXtyZXR1cm4gQihiKT8oYS5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3QoYiksdGhpcyk6YS5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3QoKX07dGhpcy4kZ2V0PVtcIiRpbmplY3RvclwiLFwiJGludGVycG9sYXRlXCIsXG5cIiRleGNlcHRpb25IYW5kbGVyXCIsXCIkaHR0cFwiLFwiJHRlbXBsYXRlQ2FjaGVcIixcIiRwYXJzZVwiLFwiJGNvbnRyb2xsZXJcIixcIiRyb290U2NvcGVcIixcIiRkb2N1bWVudFwiLFwiJHNjZVwiLFwiJGFuaW1hdGVcIixcIiQkc2FuaXRpemVVcmlcIixmdW5jdGlvbihhLGIsbSxuLHAscix6LHUsRix2LEosQSl7ZnVuY3Rpb24geChhLGIsYyxkLGUpe2EgaW5zdGFuY2VvZiB5fHwoYT15KGEpKTtxKGEsZnVuY3Rpb24oYixjKXszPT1iLm5vZGVUeXBlJiZiLm5vZGVWYWx1ZS5tYXRjaCgvXFxTKy8pJiYoYVtjXT15KGIpLndyYXAoXCI8c3Bhbj48L3NwYW4+XCIpLnBhcmVudCgpWzBdKX0pO3ZhciBnPUwoYSxiLGEsYyxkLGUpO21hKGEsXCJuZy1zY29wZVwiKTtyZXR1cm4gZnVuY3Rpb24oYixjLGQpe3hiKGIsXCJzY29wZVwiKTt2YXIgZT1jP0phLmNsb25lLmNhbGwoYSk6YTtxKGQsZnVuY3Rpb24oYSxiKXtlLmRhdGEoXCIkXCIrYitcIkNvbnRyb2xsZXJcIixhKX0pO2Q9MDtmb3IodmFyIGY9ZS5sZW5ndGg7ZDxmO2QrKyl7dmFyIGw9XG5lW2RdLm5vZGVUeXBlOzEhPT1sJiY5IT09bHx8ZS5lcShkKS5kYXRhKFwiJHNjb3BlXCIsYil9YyYmYyhlLGIpO2cmJmcoYixlLGUpO3JldHVybiBlfX1mdW5jdGlvbiBtYShhLGIpe3RyeXthLmFkZENsYXNzKGIpfWNhdGNoKGMpe319ZnVuY3Rpb24gTChhLGIsYyxkLGUsZyl7ZnVuY3Rpb24gZihhLGMsZCxlKXt2YXIgZyxrLG0scixuLHAsejtnPWMubGVuZ3RoO3ZhciBJPUFycmF5KGcpO2ZvcihuPTA7bjxnO24rKylJW25dPWNbbl07ej1uPTA7Zm9yKHA9bC5sZW5ndGg7bjxwO3orKylrPUlbel0sYz1sW24rK10sZz1sW24rK10sbT15KGspLGM/KGMuc2NvcGU/KHI9YS4kbmV3KCksbS5kYXRhKFwiJHNjb3BlXCIscikpOnI9YSwobT1jLnRyYW5zY2x1ZGUpfHwhZSYmYj9jKGcscixrLGQsUShhLG18fGIpKTpjKGcscixrLGQsZSkpOmcmJmcoYSxrLmNoaWxkTm9kZXMscyxlKX1mb3IodmFyIGw9W10sayxtLHIsbixwPTA7cDxhLmxlbmd0aDtwKyspaz1uZXcgSGIsbT1kYShhW3BdLFtdLGssXG4wPT09cD9kOnMsZSksKGc9bS5sZW5ndGg/aWEobSxhW3BdLGssYixjLG51bGwsW10sW10sZyk6bnVsbCkmJmcuc2NvcGUmJm1hKHkoYVtwXSksXCJuZy1zY29wZVwiKSxrPWcmJmcudGVybWluYWx8fCEocj1hW3BdLmNoaWxkTm9kZXMpfHwhci5sZW5ndGg/bnVsbDpMKHIsZz9nLnRyYW5zY2x1ZGU6YiksbC5wdXNoKGcsayksbj1ufHxnfHxrLGc9bnVsbDtyZXR1cm4gbj9mOm51bGx9ZnVuY3Rpb24gUShhLGIpe3JldHVybiBmdW5jdGlvbihjLGQsZSl7dmFyIGc9ITE7Y3x8KGM9YS4kbmV3KCksZz1jLiQkdHJhbnNjbHVkZWQ9ITApO2Q9YihjLGQsZSk7aWYoZylkLm9uKFwiJGRlc3Ryb3lcIixlYihjLGMuJGRlc3Ryb3kpKTtyZXR1cm4gZH19ZnVuY3Rpb24gZGEoYSxiLGMsZCxmKXt2YXIgaz1jLiRhdHRyLGw7c3dpdGNoKGEubm9kZVR5cGUpe2Nhc2UgMTpUKGIsbmEoS2EoYSkudG9Mb3dlckNhc2UoKSksXCJFXCIsZCxmKTt2YXIgbSxyLG47bD1hLmF0dHJpYnV0ZXM7Zm9yKHZhciBwPTAsej1cbmwmJmwubGVuZ3RoO3A8ejtwKyspe3ZhciB1PSExLEY9ITE7bT1sW3BdO2lmKCFTfHw4PD1TfHxtLnNwZWNpZmllZCl7cj1tLm5hbWU7bj1uYShyKTtXLnRlc3QobikmJihyPWZiKG4uc3Vic3RyKDYpLFwiLVwiKSk7dmFyIEo9bi5yZXBsYWNlKC8oU3RhcnR8RW5kKSQvLFwiXCIpO249PT1KK1wiU3RhcnRcIiYmKHU9cixGPXIuc3Vic3RyKDAsci5sZW5ndGgtNSkrXCJlbmRcIixyPXIuc3Vic3RyKDAsci5sZW5ndGgtNikpO249bmEoci50b0xvd2VyQ2FzZSgpKTtrW25dPXI7Y1tuXT1tPWNhKG0udmFsdWUpO21jKGEsbikmJihjW25dPSEwKTtOKGEsYixtLG4pO1QoYixuLFwiQVwiLGQsZix1LEYpfX1hPWEuY2xhc3NOYW1lO2lmKHcoYSkmJlwiXCIhPT1hKWZvcig7bD1nLmV4ZWMoYSk7KW49bmEobFsyXSksVChiLG4sXCJDXCIsZCxmKSYmKGNbbl09Y2EobFszXSkpLGE9YS5zdWJzdHIobC5pbmRleCtsWzBdLmxlbmd0aCk7YnJlYWs7Y2FzZSAzOnQoYixhLm5vZGVWYWx1ZSk7YnJlYWs7Y2FzZSA4OnRyeXtpZihsPVxuZS5leGVjKGEubm9kZVZhbHVlKSluPW5hKGxbMV0pLFQoYixuLFwiTVwiLGQsZikmJihjW25dPWNhKGxbMl0pKX1jYXRjaCh4KXt9fWIuc29ydChFKTtyZXR1cm4gYn1mdW5jdGlvbiBIKGEsYixjKXt2YXIgZD1bXSxlPTA7aWYoYiYmYS5oYXNBdHRyaWJ1dGUmJmEuaGFzQXR0cmlidXRlKGIpKXtkb3tpZighYSl0aHJvdyBqYShcInV0ZXJkaXJcIixiLGMpOzE9PWEubm9kZVR5cGUmJihhLmhhc0F0dHJpYnV0ZShiKSYmZSsrLGEuaGFzQXR0cmlidXRlKGMpJiZlLS0pO2QucHVzaChhKTthPWEubmV4dFNpYmxpbmd9d2hpbGUoMDxlKX1lbHNlIGQucHVzaChhKTtyZXR1cm4geShkKX1mdW5jdGlvbiBSKGEsYixjKXtyZXR1cm4gZnVuY3Rpb24oZCxlLGcsZixsKXtlPUgoZVswXSxiLGMpO3JldHVybiBhKGQsZSxnLGYsbCl9fWZ1bmN0aW9uIGlhKGEsYyxkLGUsZyxmLGwsbixwKXtmdW5jdGlvbiB1KGEsYixjLGQpe2lmKGEpe2MmJihhPVIoYSxjLGQpKTthLnJlcXVpcmU9Ry5yZXF1aXJlO2lmKFE9PT1cbkd8fEcuJCRpc29sYXRlU2NvcGUpYT1xYyhhLHtpc29sYXRlU2NvcGU6ITB9KTtsLnB1c2goYSl9aWYoYil7YyYmKGI9UihiLGMsZCkpO2IucmVxdWlyZT1HLnJlcXVpcmU7aWYoUT09PUd8fEcuJCRpc29sYXRlU2NvcGUpYj1xYyhiLHtpc29sYXRlU2NvcGU6ITB9KTtuLnB1c2goYil9fWZ1bmN0aW9uIEYoYSxiLGMpe3ZhciBkLGU9XCJkYXRhXCIsZz0hMTtpZih3KGEpKXtmb3IoO1wiXlwiPT0oZD1hLmNoYXJBdCgwKSl8fFwiP1wiPT1kOylhPWEuc3Vic3RyKDEpLFwiXlwiPT1kJiYoZT1cImluaGVyaXRlZERhdGFcIiksZz1nfHxcIj9cIj09ZDtkPW51bGw7YyYmXCJkYXRhXCI9PT1lJiYoZD1jW2FdKTtkPWR8fGJbZV0oXCIkXCIrYStcIkNvbnRyb2xsZXJcIik7aWYoIWQmJiFnKXRocm93IGphKFwiY3RyZXFcIixhLHQpO31lbHNlIE0oYSkmJihkPVtdLHEoYSxmdW5jdGlvbihhKXtkLnB1c2goRihhLGIsYykpfSkpO3JldHVybiBkfWZ1bmN0aW9uIEooYSxlLGcsZixwKXtmdW5jdGlvbiB1KGEsYil7dmFyIGM7Mj5hcmd1bWVudHMubGVuZ3RoJiZcbihiPWEsYT1zKTtEJiYoYz1sYik7cmV0dXJuIHAoYSxiLGMpfXZhciBJLHgsdixBLFIsSCxsYj17fSxkYTtJPWM9PT1nP2Q6VWIoZCxuZXcgSGIoeShnKSxkLiRhdHRyKSk7eD1JLiQkZWxlbWVudDtpZihRKXt2YXIgVD0vXlxccyooW0A9Jl0pKFxcPz8pXFxzKihcXHcqKVxccyokLztmPXkoZyk7SD1lLiRuZXcoITApO2lhJiZpYT09PVEuJCRvcmlnaW5hbERpcmVjdGl2ZT9mLmRhdGEoXCIkaXNvbGF0ZVNjb3BlXCIsSCk6Zi5kYXRhKFwiJGlzb2xhdGVTY29wZU5vVGVtcGxhdGVcIixIKTttYShmLFwibmctaXNvbGF0ZS1zY29wZVwiKTtxKFEuc2NvcGUsZnVuY3Rpb24oYSxjKXt2YXIgZD1hLm1hdGNoKFQpfHxbXSxnPWRbM118fGMsZj1cIj9cIj09ZFsyXSxkPWRbMV0sbCxtLG4scDtILiQkaXNvbGF0ZUJpbmRpbmdzW2NdPWQrZztzd2l0Y2goZCl7Y2FzZSBcIkBcIjpJLiRvYnNlcnZlKGcsZnVuY3Rpb24oYSl7SFtjXT1hfSk7SS4kJG9ic2VydmVyc1tnXS4kJHNjb3BlPWU7SVtnXSYmKEhbY109YihJW2ddKShlKSk7XG5icmVhaztjYXNlIFwiPVwiOmlmKGYmJiFJW2ddKWJyZWFrO209cihJW2ddKTtwPW0ubGl0ZXJhbD94YTpmdW5jdGlvbihhLGIpe3JldHVybiBhPT09Yn07bj1tLmFzc2lnbnx8ZnVuY3Rpb24oKXtsPUhbY109bShlKTt0aHJvdyBqYShcIm5vbmFzc2lnblwiLElbZ10sUS5uYW1lKTt9O2w9SFtjXT1tKGUpO0guJHdhdGNoKGZ1bmN0aW9uKCl7dmFyIGE9bShlKTtwKGEsSFtjXSl8fChwKGEsbCk/bihlLGE9SFtjXSk6SFtjXT1hKTtyZXR1cm4gbD1hfSxudWxsLG0ubGl0ZXJhbCk7YnJlYWs7Y2FzZSBcIiZcIjptPXIoSVtnXSk7SFtjXT1mdW5jdGlvbihhKXtyZXR1cm4gbShlLGEpfTticmVhaztkZWZhdWx0OnRocm93IGphKFwiaXNjcFwiLFEubmFtZSxjLGEpO319KX1kYT1wJiZ1O0wmJnEoTCxmdW5jdGlvbihhKXt2YXIgYj17JHNjb3BlOmE9PT1RfHxhLiQkaXNvbGF0ZVNjb3BlP0g6ZSwkZWxlbWVudDp4LCRhdHRyczpJLCR0cmFuc2NsdWRlOmRhfSxjO1I9YS5jb250cm9sbGVyO1wiQFwiPT1SJiYoUj1cbklbYS5uYW1lXSk7Yz16KFIsYik7bGJbYS5uYW1lXT1jO0R8fHguZGF0YShcIiRcIithLm5hbWUrXCJDb250cm9sbGVyXCIsYyk7YS5jb250cm9sbGVyQXMmJihiLiRzY29wZVthLmNvbnRyb2xsZXJBc109Yyl9KTtmPTA7Zm9yKHY9bC5sZW5ndGg7Zjx2O2YrKyl0cnl7QT1sW2ZdLEEoQS5pc29sYXRlU2NvcGU/SDplLHgsSSxBLnJlcXVpcmUmJkYoQS5yZXF1aXJlLHgsbGIpLGRhKX1jYXRjaChHKXttKEcsaGEoeCkpfWY9ZTtRJiYoUS50ZW1wbGF0ZXx8bnVsbD09PVEudGVtcGxhdGVVcmwpJiYoZj1IKTthJiZhKGYsZy5jaGlsZE5vZGVzLHMscCk7Zm9yKGY9bi5sZW5ndGgtMTswPD1mO2YtLSl0cnl7QT1uW2ZdLEEoQS5pc29sYXRlU2NvcGU/SDplLHgsSSxBLnJlcXVpcmUmJkYoQS5yZXF1aXJlLHgsbGIpLGRhKX1jYXRjaChCKXttKEIsaGEoeCkpfX1wPXB8fHt9O2Zvcih2YXIgdj0tTnVtYmVyLk1BWF9WQUxVRSxBLEw9cC5jb250cm9sbGVyRGlyZWN0aXZlcyxRPXAubmV3SXNvbGF0ZVNjb3BlRGlyZWN0aXZlLFxuaWE9cC50ZW1wbGF0ZURpcmVjdGl2ZSxUPXAubm9uVGxiVHJhbnNjbHVkZURpcmVjdGl2ZSxFPSExLEQ9cC5oYXNFbGVtZW50VHJhbnNjbHVkZURpcmVjdGl2ZSxaPWQuJCRlbGVtZW50PXkoYyksRyx0LFYsWGE9ZSxPLE49MCxTPWEubGVuZ3RoO048UztOKyspe0c9YVtOXTt2YXIgcmE9Ry4kJHN0YXJ0LFc9Ry4kJGVuZDtyYSYmKFo9SChjLHJhLFcpKTtWPXM7aWYodj5HLnByaW9yaXR5KWJyZWFrO2lmKFY9Ry5zY29wZSlBPUF8fEcsRy50ZW1wbGF0ZVVybHx8KEsoXCJuZXcvaXNvbGF0ZWQgc2NvcGVcIixRLEcsWiksWChWKSYmKFE9RykpO3Q9Ry5uYW1lOyFHLnRlbXBsYXRlVXJsJiZHLmNvbnRyb2xsZXImJihWPUcuY29udHJvbGxlcixMPUx8fHt9LEsoXCInXCIrdCtcIicgY29udHJvbGxlclwiLExbdF0sRyxaKSxMW3RdPUcpO2lmKFY9Ry50cmFuc2NsdWRlKUU9ITAsRy4kJHRsYnx8KEsoXCJ0cmFuc2NsdXNpb25cIixULEcsWiksVD1HKSxcImVsZW1lbnRcIj09Vj8oRD0hMCx2PUcucHJpb3JpdHksXG5WPUgoYyxyYSxXKSxaPWQuJCRlbGVtZW50PXkoVS5jcmVhdGVDb21tZW50KFwiIFwiK3QrXCI6IFwiK2RbdF0rXCIgXCIpKSxjPVpbMF0sbWIoZyx5KHlhLmNhbGwoViwwKSksYyksWGE9eChWLGUsdixmJiZmLm5hbWUse25vblRsYlRyYW5zY2x1ZGVEaXJlY3RpdmU6VH0pKTooVj15KEViKGMpKS5jb250ZW50cygpLFouZW1wdHkoKSxYYT14KFYsZSkpO2lmKEcudGVtcGxhdGUpaWYoSyhcInRlbXBsYXRlXCIsaWEsRyxaKSxpYT1HLFY9UChHLnRlbXBsYXRlKT9HLnRlbXBsYXRlKFosZCk6Ry50ZW1wbGF0ZSxWPVkoViksRy5yZXBsYWNlKXtmPUc7Vj1DYi50ZXN0KFYpP3koVik6W107Yz1WWzBdO2lmKDEhPVYubGVuZ3RofHwxIT09Yy5ub2RlVHlwZSl0aHJvdyBqYShcInRwbHJ0XCIsdCxcIlwiKTttYihnLFosYyk7Uz17JGF0dHI6e319O1Y9ZGEoYyxbXSxTKTt2YXIgJD1hLnNwbGljZShOKzEsYS5sZW5ndGgtKE4rMSkpO1EmJnBjKFYpO2E9YS5jb25jYXQoVikuY29uY2F0KCQpO0IoZCxTKTtTPWEubGVuZ3RofWVsc2UgWi5odG1sKFYpO1xuaWYoRy50ZW1wbGF0ZVVybClLKFwidGVtcGxhdGVcIixpYSxHLFopLGlhPUcsRy5yZXBsYWNlJiYoZj1HKSxKPUMoYS5zcGxpY2UoTixhLmxlbmd0aC1OKSxaLGQsZyxYYSxsLG4se2NvbnRyb2xsZXJEaXJlY3RpdmVzOkwsbmV3SXNvbGF0ZVNjb3BlRGlyZWN0aXZlOlEsdGVtcGxhdGVEaXJlY3RpdmU6aWEsbm9uVGxiVHJhbnNjbHVkZURpcmVjdGl2ZTpUfSksUz1hLmxlbmd0aDtlbHNlIGlmKEcuY29tcGlsZSl0cnl7Tz1HLmNvbXBpbGUoWixkLFhhKSxQKE8pP3UobnVsbCxPLHJhLFcpOk8mJnUoTy5wcmUsTy5wb3N0LHJhLFcpfWNhdGNoKGFhKXttKGFhLGhhKFopKX1HLnRlcm1pbmFsJiYoSi50ZXJtaW5hbD0hMCx2PU1hdGgubWF4KHYsRy5wcmlvcml0eSkpfUouc2NvcGU9QSYmITA9PT1BLnNjb3BlO0oudHJhbnNjbHVkZT1FJiZYYTtwLmhhc0VsZW1lbnRUcmFuc2NsdWRlRGlyZWN0aXZlPUQ7cmV0dXJuIEp9ZnVuY3Rpb24gcGMoYSl7Zm9yKHZhciBiPTAsYz1hLmxlbmd0aDtiPGM7YisrKWFbYl09XG5UYihhW2JdLHskJGlzb2xhdGVTY29wZTohMH0pfWZ1bmN0aW9uIFQoYixlLGcsZixrLG4scil7aWYoZT09PWspcmV0dXJuIG51bGw7az1udWxsO2lmKGMuaGFzT3duUHJvcGVydHkoZSkpe3ZhciBwO2U9YS5nZXQoZStkKTtmb3IodmFyIHo9MCx1PWUubGVuZ3RoO3o8dTt6KyspdHJ5e3A9ZVt6XSwoZj09PXN8fGY+cC5wcmlvcml0eSkmJi0xIT1wLnJlc3RyaWN0LmluZGV4T2YoZykmJihuJiYocD1UYihwLHskJHN0YXJ0Om4sJCRlbmQ6cn0pKSxiLnB1c2gocCksaz1wKX1jYXRjaChGKXttKEYpfX1yZXR1cm4ga31mdW5jdGlvbiBCKGEsYil7dmFyIGM9Yi4kYXR0cixkPWEuJGF0dHIsZT1hLiQkZWxlbWVudDtxKGEsZnVuY3Rpb24oZCxlKXtcIiRcIiE9ZS5jaGFyQXQoMCkmJihiW2VdJiYoZCs9KFwic3R5bGVcIj09PWU/XCI7XCI6XCIgXCIpK2JbZV0pLGEuJHNldChlLGQsITAsY1tlXSkpfSk7cShiLGZ1bmN0aW9uKGIsZyl7XCJjbGFzc1wiPT1nPyhtYShlLGIpLGFbXCJjbGFzc1wiXT0oYVtcImNsYXNzXCJdP1xuYVtcImNsYXNzXCJdK1wiIFwiOlwiXCIpK2IpOlwic3R5bGVcIj09Zz8oZS5hdHRyKFwic3R5bGVcIixlLmF0dHIoXCJzdHlsZVwiKStcIjtcIitiKSxhLnN0eWxlPShhLnN0eWxlP2Euc3R5bGUrXCI7XCI6XCJcIikrYik6XCIkXCI9PWcuY2hhckF0KDApfHxhLmhhc093blByb3BlcnR5KGcpfHwoYVtnXT1iLGRbZ109Y1tnXSl9KX1mdW5jdGlvbiBDKGEsYixjLGQsZSxnLGYsbCl7dmFyIGs9W10sbSxyLHo9YlswXSx1PWEuc2hpZnQoKSxGPUQoe30sdSx7dGVtcGxhdGVVcmw6bnVsbCx0cmFuc2NsdWRlOm51bGwscmVwbGFjZTpudWxsLCQkb3JpZ2luYWxEaXJlY3RpdmU6dX0pLHg9UCh1LnRlbXBsYXRlVXJsKT91LnRlbXBsYXRlVXJsKGIsYyk6dS50ZW1wbGF0ZVVybDtiLmVtcHR5KCk7bi5nZXQodi5nZXRUcnVzdGVkUmVzb3VyY2VVcmwoeCkse2NhY2hlOnB9KS5zdWNjZXNzKGZ1bmN0aW9uKG4pe3ZhciBwLEo7bj1ZKG4pO2lmKHUucmVwbGFjZSl7bj1DYi50ZXN0KG4pP3kobik6W107cD1uWzBdO2lmKDEhPW4ubGVuZ3RofHxcbjEhPT1wLm5vZGVUeXBlKXRocm93IGphKFwidHBscnRcIix1Lm5hbWUseCk7bj17JGF0dHI6e319O21iKGQsYixwKTt2YXIgdj1kYShwLFtdLG4pO1godS5zY29wZSkmJnBjKHYpO2E9di5jb25jYXQoYSk7QihjLG4pfWVsc2UgcD16LGIuaHRtbChuKTthLnVuc2hpZnQoRik7bT1pYShhLHAsYyxlLGIsdSxnLGYsbCk7cShkLGZ1bmN0aW9uKGEsYyl7YT09cCYmKGRbY109YlswXSl9KTtmb3Iocj1MKGJbMF0uY2hpbGROb2RlcyxlKTtrLmxlbmd0aDspe249ay5zaGlmdCgpO0o9ay5zaGlmdCgpO3ZhciBBPWsuc2hpZnQoKSxSPWsuc2hpZnQoKSx2PWJbMF07aWYoSiE9PXope3ZhciBIPUouY2xhc3NOYW1lO2wuaGFzRWxlbWVudFRyYW5zY2x1ZGVEaXJlY3RpdmUmJnUucmVwbGFjZXx8KHY9RWIocCkpO21iKEEseShKKSx2KTttYSh5KHYpLEgpfUo9bS50cmFuc2NsdWRlP1EobixtLnRyYW5zY2x1ZGUpOlI7bShyLG4sdixkLEopfWs9bnVsbH0pLmVycm9yKGZ1bmN0aW9uKGEsYixjLGQpe3Rocm93IGphKFwidHBsb2FkXCIsXG5kLnVybCk7fSk7cmV0dXJuIGZ1bmN0aW9uKGEsYixjLGQsZSl7az8oay5wdXNoKGIpLGsucHVzaChjKSxrLnB1c2goZCksay5wdXNoKGUpKTptKHIsYixjLGQsZSl9fWZ1bmN0aW9uIEUoYSxiKXt2YXIgYz1iLnByaW9yaXR5LWEucHJpb3JpdHk7cmV0dXJuIDAhPT1jP2M6YS5uYW1lIT09Yi5uYW1lP2EubmFtZTxiLm5hbWU/LTE6MTphLmluZGV4LWIuaW5kZXh9ZnVuY3Rpb24gSyhhLGIsYyxkKXtpZihiKXRocm93IGphKFwibXVsdGlkaXJcIixiLm5hbWUsYy5uYW1lLGEsaGEoZCkpO31mdW5jdGlvbiB0KGEsYyl7dmFyIGQ9YihjLCEwKTtkJiZhLnB1c2goe3ByaW9yaXR5OjAsY29tcGlsZTphYShmdW5jdGlvbihhLGIpe3ZhciBjPWIucGFyZW50KCksZT1jLmRhdGEoXCIkYmluZGluZ1wiKXx8W107ZS5wdXNoKGQpO21hKGMuZGF0YShcIiRiaW5kaW5nXCIsZSksXCJuZy1iaW5kaW5nXCIpO2EuJHdhdGNoKGQsZnVuY3Rpb24oYSl7YlswXS5ub2RlVmFsdWU9YX0pfSl9KX1mdW5jdGlvbiBPKGEsYil7aWYoXCJzcmNkb2NcIj09XG5iKXJldHVybiB2LkhUTUw7dmFyIGM9S2EoYSk7aWYoXCJ4bGlua0hyZWZcIj09Ynx8XCJGT1JNXCI9PWMmJlwiYWN0aW9uXCI9PWJ8fFwiSU1HXCIhPWMmJihcInNyY1wiPT1ifHxcIm5nU3JjXCI9PWIpKXJldHVybiB2LlJFU09VUkNFX1VSTH1mdW5jdGlvbiBOKGEsYyxkLGUpe3ZhciBnPWIoZCwhMCk7aWYoZyl7aWYoXCJtdWx0aXBsZVwiPT09ZSYmXCJTRUxFQ1RcIj09PUthKGEpKXRocm93IGphKFwic2VsbXVsdGlcIixoYShhKSk7Yy5wdXNoKHtwcmlvcml0eToxMDAsY29tcGlsZTpmdW5jdGlvbigpe3JldHVybntwcmU6ZnVuY3Rpb24oYyxkLGwpe2Q9bC4kJG9ic2VydmVyc3x8KGwuJCRvYnNlcnZlcnM9e30pO2lmKGYudGVzdChlKSl0aHJvdyBqYShcIm5vZG9tZXZlbnRzXCIpO2lmKGc9YihsW2VdLCEwLE8oYSxlKSkpbFtlXT1nKGMpLChkW2VdfHwoZFtlXT1bXSkpLiQkaW50ZXI9ITAsKGwuJCRvYnNlcnZlcnMmJmwuJCRvYnNlcnZlcnNbZV0uJCRzY29wZXx8YykuJHdhdGNoKGcsZnVuY3Rpb24oYSxiKXtcImNsYXNzXCI9PT1cbmUmJmEhPWI/bC4kdXBkYXRlQ2xhc3MoYSxiKTpsLiRzZXQoZSxhKX0pfX19fSl9fWZ1bmN0aW9uIG1iKGEsYixjKXt2YXIgZD1iWzBdLGU9Yi5sZW5ndGgsZz1kLnBhcmVudE5vZGUsZixsO2lmKGEpZm9yKGY9MCxsPWEubGVuZ3RoO2Y8bDtmKyspaWYoYVtmXT09ZCl7YVtmKytdPWM7bD1mK2UtMTtmb3IodmFyIGs9YS5sZW5ndGg7ZjxrO2YrKyxsKyspbDxrP2FbZl09YVtsXTpkZWxldGUgYVtmXTthLmxlbmd0aC09ZS0xO2JyZWFrfWcmJmcucmVwbGFjZUNoaWxkKGMsZCk7YT1VLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTthLmFwcGVuZENoaWxkKGQpO2NbeS5leHBhbmRvXT1kW3kuZXhwYW5kb107ZD0xO2ZvcihlPWIubGVuZ3RoO2Q8ZTtkKyspZz1iW2RdLHkoZykucmVtb3ZlKCksYS5hcHBlbmRDaGlsZChnKSxkZWxldGUgYltkXTtiWzBdPWM7Yi5sZW5ndGg9MX1mdW5jdGlvbiBxYyhhLGIpe3JldHVybiBEKGZ1bmN0aW9uKCl7cmV0dXJuIGEuYXBwbHkobnVsbCxhcmd1bWVudHMpfSxcbmEsYil9dmFyIEhiPWZ1bmN0aW9uKGEsYil7dGhpcy4kJGVsZW1lbnQ9YTt0aGlzLiRhdHRyPWJ8fHt9fTtIYi5wcm90b3R5cGU9eyRub3JtYWxpemU6bmEsJGFkZENsYXNzOmZ1bmN0aW9uKGEpe2EmJjA8YS5sZW5ndGgmJkouYWRkQ2xhc3ModGhpcy4kJGVsZW1lbnQsYSl9LCRyZW1vdmVDbGFzczpmdW5jdGlvbihhKXthJiYwPGEubGVuZ3RoJiZKLnJlbW92ZUNsYXNzKHRoaXMuJCRlbGVtZW50LGEpfSwkdXBkYXRlQ2xhc3M6ZnVuY3Rpb24oYSxiKXt2YXIgYz1yYyhhLGIpLGQ9cmMoYixhKTswPT09Yy5sZW5ndGg/Si5yZW1vdmVDbGFzcyh0aGlzLiQkZWxlbWVudCxkKTowPT09ZC5sZW5ndGg/Si5hZGRDbGFzcyh0aGlzLiQkZWxlbWVudCxjKTpKLnNldENsYXNzKHRoaXMuJCRlbGVtZW50LGMsZCl9LCRzZXQ6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9bWModGhpcy4kJGVsZW1lbnRbMF0sYSk7ZSYmKHRoaXMuJCRlbGVtZW50LnByb3AoYSxiKSxkPWUpO3RoaXNbYV09YjtkP3RoaXMuJGF0dHJbYV09XG5kOihkPXRoaXMuJGF0dHJbYV0pfHwodGhpcy4kYXR0clthXT1kPWZiKGEsXCItXCIpKTtlPUthKHRoaXMuJCRlbGVtZW50KTtpZihcIkFcIj09PWUmJlwiaHJlZlwiPT09YXx8XCJJTUdcIj09PWUmJlwic3JjXCI9PT1hKXRoaXNbYV09Yj1BKGIsXCJzcmNcIj09PWEpOyExIT09YyYmKG51bGw9PT1ifHxiPT09cz90aGlzLiQkZWxlbWVudC5yZW1vdmVBdHRyKGQpOnRoaXMuJCRlbGVtZW50LmF0dHIoZCxiKSk7KGM9dGhpcy4kJG9ic2VydmVycykmJnEoY1thXSxmdW5jdGlvbihhKXt0cnl7YShiKX1jYXRjaChjKXttKGMpfX0pfSwkb2JzZXJ2ZTpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMsZD1jLiQkb2JzZXJ2ZXJzfHwoYy4kJG9ic2VydmVycz17fSksZT1kW2FdfHwoZFthXT1bXSk7ZS5wdXNoKGIpO3UuJGV2YWxBc3luYyhmdW5jdGlvbigpe2UuJCRpbnRlcnx8YihjW2FdKX0pO3JldHVybiBifX07dmFyIFo9Yi5zdGFydFN5bWJvbCgpLHJhPWIuZW5kU3ltYm9sKCksWT1cInt7XCI9PVp8fFwifX1cIj09cmE/XG5EYTpmdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKC9cXHtcXHsvZyxaKS5yZXBsYWNlKC99fS9nLHJhKX0sVz0vXm5nQXR0cltBLVpdLztyZXR1cm4geH1dfWZ1bmN0aW9uIG5hKGIpe3JldHVybiBUYShiLnJlcGxhY2UodGUsXCJcIikpfWZ1bmN0aW9uIHJjKGIsYSl7dmFyIGM9XCJcIixkPWIuc3BsaXQoL1xccysvKSxlPWEuc3BsaXQoL1xccysvKSxnPTA7YTpmb3IoO2c8ZC5sZW5ndGg7ZysrKXtmb3IodmFyIGY9ZFtnXSxoPTA7aDxlLmxlbmd0aDtoKyspaWYoZj09ZVtoXSljb250aW51ZSBhO2MrPSgwPGMubGVuZ3RoP1wiIFwiOlwiXCIpK2Z9cmV0dXJuIGN9ZnVuY3Rpb24gT2QoKXt2YXIgYj17fSxhPS9eKFxcUyspKFxccythc1xccysoXFx3KykpPyQvO3RoaXMucmVnaXN0ZXI9ZnVuY3Rpb24oYSxkKXtBYShhLFwiY29udHJvbGxlclwiKTtYKGEpP0QoYixhKTpiW2FdPWR9O3RoaXMuJGdldD1bXCIkaW5qZWN0b3JcIixcIiR3aW5kb3dcIixmdW5jdGlvbihjLGQpe3JldHVybiBmdW5jdGlvbihlLGcpe3ZhciBmLFxuaCxsO3coZSkmJihmPWUubWF0Y2goYSksaD1mWzFdLGw9ZlszXSxlPWIuaGFzT3duUHJvcGVydHkoaCk/YltoXTpiYyhnLiRzY29wZSxoLCEwKXx8YmMoZCxoLCEwKSxSYShlLGgsITApKTtmPWMuaW5zdGFudGlhdGUoZSxnKTtpZihsKXtpZighZ3x8XCJvYmplY3RcIiE9dHlwZW9mIGcuJHNjb3BlKXRocm93IHQoXCIkY29udHJvbGxlclwiKShcIm5vc2NwXCIsaHx8ZS5uYW1lLGwpO2cuJHNjb3BlW2xdPWZ9cmV0dXJuIGZ9fV19ZnVuY3Rpb24gUGQoKXt0aGlzLiRnZXQ9W1wiJHdpbmRvd1wiLGZ1bmN0aW9uKGIpe3JldHVybiB5KGIuZG9jdW1lbnQpfV19ZnVuY3Rpb24gUWQoKXt0aGlzLiRnZXQ9W1wiJGxvZ1wiLGZ1bmN0aW9uKGIpe3JldHVybiBmdW5jdGlvbihhLGMpe2IuZXJyb3IuYXBwbHkoYixhcmd1bWVudHMpfX1dfWZ1bmN0aW9uIHNjKGIpe3ZhciBhPXt9LGMsZCxlO2lmKCFiKXJldHVybiBhO3EoYi5zcGxpdChcIlxcblwiKSxmdW5jdGlvbihiKXtlPWIuaW5kZXhPZihcIjpcIik7Yz1LKGNhKGIuc3Vic3RyKDAsXG5lKSkpO2Q9Y2EoYi5zdWJzdHIoZSsxKSk7YyYmKGFbY109YVtjXT9hW2NdKyhcIiwgXCIrZCk6ZCl9KTtyZXR1cm4gYX1mdW5jdGlvbiB0YyhiKXt2YXIgYT1YKGIpP2I6cztyZXR1cm4gZnVuY3Rpb24oYyl7YXx8KGE9c2MoYikpO3JldHVybiBjP2FbSyhjKV18fG51bGw6YX19ZnVuY3Rpb24gdWMoYixhLGMpe2lmKFAoYykpcmV0dXJuIGMoYixhKTtxKGMsZnVuY3Rpb24oYyl7Yj1jKGIsYSl9KTtyZXR1cm4gYn1mdW5jdGlvbiBUZCgpe3ZhciBiPS9eXFxzKihcXFt8XFx7W15cXHtdKS8sYT0vW1xcfVxcXV1cXHMqJC8sYz0vXlxcKVxcXVxcfScsP1xcbi8sZD17XCJDb250ZW50LVR5cGVcIjpcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOFwifSxlPXRoaXMuZGVmYXVsdHM9e3RyYW5zZm9ybVJlc3BvbnNlOltmdW5jdGlvbihkKXt3KGQpJiYoZD1kLnJlcGxhY2UoYyxcIlwiKSxiLnRlc3QoZCkmJmEudGVzdChkKSYmKGQ9V2IoZCkpKTtyZXR1cm4gZH1dLHRyYW5zZm9ybVJlcXVlc3Q6W2Z1bmN0aW9uKGEpe3JldHVybiBYKGEpJiZcblwiW29iamVjdCBGaWxlXVwiIT09d2EuY2FsbChhKSYmXCJbb2JqZWN0IEJsb2JdXCIhPT13YS5jYWxsKGEpP3FhKGEpOmF9XSxoZWFkZXJzOntjb21tb246e0FjY2VwdDpcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKlwifSxwb3N0OmJhKGQpLHB1dDpiYShkKSxwYXRjaDpiYShkKX0seHNyZkNvb2tpZU5hbWU6XCJYU1JGLVRPS0VOXCIseHNyZkhlYWRlck5hbWU6XCJYLVhTUkYtVE9LRU5cIn0sZz10aGlzLmludGVyY2VwdG9ycz1bXSxmPXRoaXMucmVzcG9uc2VJbnRlcmNlcHRvcnM9W107dGhpcy4kZ2V0PVtcIiRodHRwQmFja2VuZFwiLFwiJGJyb3dzZXJcIixcIiRjYWNoZUZhY3RvcnlcIixcIiRyb290U2NvcGVcIixcIiRxXCIsXCIkaW5qZWN0b3JcIixmdW5jdGlvbihhLGIsYyxkLG4scCl7ZnVuY3Rpb24gcihhKXtmdW5jdGlvbiBjKGEpe3ZhciBiPUQoe30sYSx7ZGF0YTp1YyhhLmRhdGEsYS5oZWFkZXJzLGQudHJhbnNmb3JtUmVzcG9uc2UpfSk7cmV0dXJuIDIwMDw9YS5zdGF0dXMmJjMwMD5hLnN0YXR1cz9cbmI6bi5yZWplY3QoYil9dmFyIGQ9e21ldGhvZDpcImdldFwiLHRyYW5zZm9ybVJlcXVlc3Q6ZS50cmFuc2Zvcm1SZXF1ZXN0LHRyYW5zZm9ybVJlc3BvbnNlOmUudHJhbnNmb3JtUmVzcG9uc2V9LGc9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihhKXt2YXIgYztxKGEsZnVuY3Rpb24oYixkKXtQKGIpJiYoYz1iKCksbnVsbCE9Yz9hW2RdPWM6ZGVsZXRlIGFbZF0pfSl9dmFyIGM9ZS5oZWFkZXJzLGQ9RCh7fSxhLmhlYWRlcnMpLGcsZixjPUQoe30sYy5jb21tb24sY1tLKGEubWV0aG9kKV0pO2IoYyk7YihkKTthOmZvcihnIGluIGMpe2E9SyhnKTtmb3IoZiBpbiBkKWlmKEsoZik9PT1hKWNvbnRpbnVlIGE7ZFtnXT1jW2ddfXJldHVybiBkfShhKTtEKGQsYSk7ZC5oZWFkZXJzPWc7ZC5tZXRob2Q9RmEoZC5tZXRob2QpOyhhPUliKGQudXJsKT9iLmNvb2tpZXMoKVtkLnhzcmZDb29raWVOYW1lfHxlLnhzcmZDb29raWVOYW1lXTpzKSYmKGdbZC54c3JmSGVhZGVyTmFtZXx8ZS54c3JmSGVhZGVyTmFtZV09XG5hKTt2YXIgZj1bZnVuY3Rpb24oYSl7Zz1hLmhlYWRlcnM7dmFyIGI9dWMoYS5kYXRhLHRjKGcpLGEudHJhbnNmb3JtUmVxdWVzdCk7RShhLmRhdGEpJiZxKGcsZnVuY3Rpb24oYSxiKXtcImNvbnRlbnQtdHlwZVwiPT09SyhiKSYmZGVsZXRlIGdbYl19KTtFKGEud2l0aENyZWRlbnRpYWxzKSYmIUUoZS53aXRoQ3JlZGVudGlhbHMpJiYoYS53aXRoQ3JlZGVudGlhbHM9ZS53aXRoQ3JlZGVudGlhbHMpO3JldHVybiB6KGEsYixnKS50aGVuKGMsYyl9LHNdLGg9bi53aGVuKGQpO2ZvcihxKHYsZnVuY3Rpb24oYSl7KGEucmVxdWVzdHx8YS5yZXF1ZXN0RXJyb3IpJiZmLnVuc2hpZnQoYS5yZXF1ZXN0LGEucmVxdWVzdEVycm9yKTsoYS5yZXNwb25zZXx8YS5yZXNwb25zZUVycm9yKSYmZi5wdXNoKGEucmVzcG9uc2UsYS5yZXNwb25zZUVycm9yKX0pO2YubGVuZ3RoOyl7YT1mLnNoaWZ0KCk7dmFyIGs9Zi5zaGlmdCgpLGg9aC50aGVuKGEsayl9aC5zdWNjZXNzPWZ1bmN0aW9uKGEpe2gudGhlbihmdW5jdGlvbihiKXthKGIuZGF0YSxcbmIuc3RhdHVzLGIuaGVhZGVycyxkKX0pO3JldHVybiBofTtoLmVycm9yPWZ1bmN0aW9uKGEpe2gudGhlbihudWxsLGZ1bmN0aW9uKGIpe2EoYi5kYXRhLGIuc3RhdHVzLGIuaGVhZGVycyxkKX0pO3JldHVybiBofTtyZXR1cm4gaH1mdW5jdGlvbiB6KGIsYyxnKXtmdW5jdGlvbiBmKGEsYixjLGUpe3YmJigyMDA8PWEmJjMwMD5hP3YucHV0KHMsW2EsYixzYyhjKSxlXSk6di5yZW1vdmUocykpO2woYixhLGMsZSk7ZC4kJHBoYXNlfHxkLiRhcHBseSgpfWZ1bmN0aW9uIGwoYSxjLGQsZSl7Yz1NYXRoLm1heChjLDApOygyMDA8PWMmJjMwMD5jP3AucmVzb2x2ZTpwLnJlamVjdCkoe2RhdGE6YSxzdGF0dXM6YyxoZWFkZXJzOnRjKGQpLGNvbmZpZzpiLHN0YXR1c1RleHQ6ZX0pfWZ1bmN0aW9uIGsoKXt2YXIgYT1kYihyLnBlbmRpbmdSZXF1ZXN0cyxiKTstMSE9PWEmJnIucGVuZGluZ1JlcXVlc3RzLnNwbGljZShhLDEpfXZhciBwPW4uZGVmZXIoKSx6PXAucHJvbWlzZSx2LHEscz11KGIudXJsLFxuYi5wYXJhbXMpO3IucGVuZGluZ1JlcXVlc3RzLnB1c2goYik7ei50aGVuKGssayk7KGIuY2FjaGV8fGUuY2FjaGUpJiYoITEhPT1iLmNhY2hlJiZcIkdFVFwiPT1iLm1ldGhvZCkmJih2PVgoYi5jYWNoZSk/Yi5jYWNoZTpYKGUuY2FjaGUpP2UuY2FjaGU6Rik7aWYodilpZihxPXYuZ2V0KHMpLEIocSkpe2lmKHEudGhlbilyZXR1cm4gcS50aGVuKGssaykscTtNKHEpP2wocVsxXSxxWzBdLGJhKHFbMl0pLHFbM10pOmwocSwyMDAse30sXCJPS1wiKX1lbHNlIHYucHV0KHMseik7RShxKSYmYShiLm1ldGhvZCxzLGMsZixnLGIudGltZW91dCxiLndpdGhDcmVkZW50aWFscyxiLnJlc3BvbnNlVHlwZSk7cmV0dXJuIHp9ZnVuY3Rpb24gdShhLGIpe2lmKCFiKXJldHVybiBhO3ZhciBjPVtdO1NjKGIsZnVuY3Rpb24oYSxiKXtudWxsPT09YXx8RShhKXx8KE0oYSl8fChhPVthXSkscShhLGZ1bmN0aW9uKGEpe1goYSkmJihhPXFhKGEpKTtjLnB1c2goemEoYikrXCI9XCIremEoYSkpfSkpfSk7MDxjLmxlbmd0aCYmXG4oYSs9KC0xPT1hLmluZGV4T2YoXCI/XCIpP1wiP1wiOlwiJlwiKStjLmpvaW4oXCImXCIpKTtyZXR1cm4gYX12YXIgRj1jKFwiJGh0dHBcIiksdj1bXTtxKGcsZnVuY3Rpb24oYSl7di51bnNoaWZ0KHcoYSk/cC5nZXQoYSk6cC5pbnZva2UoYSkpfSk7cShmLGZ1bmN0aW9uKGEsYil7dmFyIGM9dyhhKT9wLmdldChhKTpwLmludm9rZShhKTt2LnNwbGljZShiLDAse3Jlc3BvbnNlOmZ1bmN0aW9uKGEpe3JldHVybiBjKG4ud2hlbihhKSl9LHJlc3BvbnNlRXJyb3I6ZnVuY3Rpb24oYSl7cmV0dXJuIGMobi5yZWplY3QoYSkpfX0pfSk7ci5wZW5kaW5nUmVxdWVzdHM9W107KGZ1bmN0aW9uKGEpe3EoYXJndW1lbnRzLGZ1bmN0aW9uKGEpe3JbYV09ZnVuY3Rpb24oYixjKXtyZXR1cm4gcihEKGN8fHt9LHttZXRob2Q6YSx1cmw6Yn0pKX19KX0pKFwiZ2V0XCIsXCJkZWxldGVcIixcImhlYWRcIixcImpzb25wXCIpOyhmdW5jdGlvbihhKXtxKGFyZ3VtZW50cyxmdW5jdGlvbihhKXtyW2FdPWZ1bmN0aW9uKGIsYyxkKXtyZXR1cm4gcihEKGR8fFxue30se21ldGhvZDphLHVybDpiLGRhdGE6Y30pKX19KX0pKFwicG9zdFwiLFwicHV0XCIpO3IuZGVmYXVsdHM9ZTtyZXR1cm4gcn1dfWZ1bmN0aW9uIHVlKGIpe2lmKDg+PVMmJighYi5tYXRjaCgvXihnZXR8cG9zdHxoZWFkfHB1dHxkZWxldGV8b3B0aW9ucykkL2kpfHwhTy5YTUxIdHRwUmVxdWVzdCkpcmV0dXJuIG5ldyBPLkFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtpZihPLlhNTEh0dHBSZXF1ZXN0KXJldHVybiBuZXcgTy5YTUxIdHRwUmVxdWVzdDt0aHJvdyB0KFwiJGh0dHBCYWNrZW5kXCIpKFwibm94aHJcIik7fWZ1bmN0aW9uIFVkKCl7dGhpcy4kZ2V0PVtcIiRicm93c2VyXCIsXCIkd2luZG93XCIsXCIkZG9jdW1lbnRcIixmdW5jdGlvbihiLGEsYyl7cmV0dXJuIHZlKGIsdWUsYi5kZWZlcixhLmFuZ3VsYXIuY2FsbGJhY2tzLGNbMF0pfV19ZnVuY3Rpb24gdmUoYixhLGMsZCxlKXtmdW5jdGlvbiBnKGEsYil7dmFyIGM9ZS5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpLGQ9ZnVuY3Rpb24oKXtjLm9ucmVhZHlzdGF0ZWNoYW5nZT1cbmMub25sb2FkPWMub25lcnJvcj1udWxsO2UuYm9keS5yZW1vdmVDaGlsZChjKTtiJiZiKCl9O2MudHlwZT1cInRleHQvamF2YXNjcmlwdFwiO2Muc3JjPWE7UyYmOD49Uz9jLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpey9sb2FkZWR8Y29tcGxldGUvLnRlc3QoYy5yZWFkeVN0YXRlKSYmZCgpfTpjLm9ubG9hZD1jLm9uZXJyb3I9ZnVuY3Rpb24oKXtkKCl9O2UuYm9keS5hcHBlbmRDaGlsZChjKTtyZXR1cm4gZH12YXIgZj0tMTtyZXR1cm4gZnVuY3Rpb24oZSxsLGssbSxuLHAscix6KXtmdW5jdGlvbiB1KCl7dj1mO0EmJkEoKTt4JiZ4LmFib3J0KCl9ZnVuY3Rpb24gRihhLGQsZSxnLGYpe0wmJmMuY2FuY2VsKEwpO0E9eD1udWxsOzA9PT1kJiYoZD1lPzIwMDpcImZpbGVcIj09c2EobCkucHJvdG9jb2w/NDA0OjApO2EoMTIyMz09PWQ/MjA0OmQsZSxnLGZ8fFwiXCIpO2IuJCRjb21wbGV0ZU91dHN0YW5kaW5nUmVxdWVzdChDKX12YXIgdjtiLiQkaW5jT3V0c3RhbmRpbmdSZXF1ZXN0Q291bnQoKTtcbmw9bHx8Yi51cmwoKTtpZihcImpzb25wXCI9PUsoZSkpe3ZhciBKPVwiX1wiKyhkLmNvdW50ZXIrKykudG9TdHJpbmcoMzYpO2RbSl09ZnVuY3Rpb24oYSl7ZFtKXS5kYXRhPWF9O3ZhciBBPWcobC5yZXBsYWNlKFwiSlNPTl9DQUxMQkFDS1wiLFwiYW5ndWxhci5jYWxsYmFja3MuXCIrSiksZnVuY3Rpb24oKXtkW0pdLmRhdGE/RihtLDIwMCxkW0pdLmRhdGEpOkYobSx2fHwtMik7ZFtKXT1FYS5ub29wfSl9ZWxzZXt2YXIgeD1hKGUpO3gub3BlbihlLGwsITApO3EobixmdW5jdGlvbihhLGIpe0IoYSkmJnguc2V0UmVxdWVzdEhlYWRlcihiLGEpfSk7eC5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtpZih4JiY0PT14LnJlYWR5U3RhdGUpe3ZhciBhPW51bGwsYj1udWxsO3YhPT1mJiYoYT14LmdldEFsbFJlc3BvbnNlSGVhZGVycygpLGI9XCJyZXNwb25zZVwiaW4geD94LnJlc3BvbnNlOngucmVzcG9uc2VUZXh0KTtGKG0sdnx8eC5zdGF0dXMsYixhLHguc3RhdHVzVGV4dHx8XCJcIil9fTtyJiYoeC53aXRoQ3JlZGVudGlhbHM9XG4hMCk7aWYoeil0cnl7eC5yZXNwb25zZVR5cGU9en1jYXRjaChzKXtpZihcImpzb25cIiE9PXopdGhyb3cgczt9eC5zZW5kKGt8fG51bGwpfWlmKDA8cCl2YXIgTD1jKHUscCk7ZWxzZSBwJiZwLnRoZW4mJnAudGhlbih1KX19ZnVuY3Rpb24gUmQoKXt2YXIgYj1cInt7XCIsYT1cIn19XCI7dGhpcy5zdGFydFN5bWJvbD1mdW5jdGlvbihhKXtyZXR1cm4gYT8oYj1hLHRoaXMpOmJ9O3RoaXMuZW5kU3ltYm9sPWZ1bmN0aW9uKGIpe3JldHVybiBiPyhhPWIsdGhpcyk6YX07dGhpcy4kZ2V0PVtcIiRwYXJzZVwiLFwiJGV4Y2VwdGlvbkhhbmRsZXJcIixcIiRzY2VcIixmdW5jdGlvbihjLGQsZSl7ZnVuY3Rpb24gZyhnLGssbSl7Zm9yKHZhciBuLHAscj0wLHo9W10sdT1nLmxlbmd0aCxGPSExLHY9W107cjx1OyktMSE9KG49Zy5pbmRleE9mKGIscikpJiYtMSE9KHA9Zy5pbmRleE9mKGEsbitmKSk/KHIhPW4mJnoucHVzaChnLnN1YnN0cmluZyhyLG4pKSx6LnB1c2gocj1jKEY9Zy5zdWJzdHJpbmcobitmLHApKSksXG5yLmV4cD1GLHI9cCtoLEY9ITApOihyIT11JiZ6LnB1c2goZy5zdWJzdHJpbmcocikpLHI9dSk7KHU9ei5sZW5ndGgpfHwoei5wdXNoKFwiXCIpLHU9MSk7aWYobSYmMTx6Lmxlbmd0aCl0aHJvdyB2YyhcIm5vY29uY2F0XCIsZyk7aWYoIWt8fEYpcmV0dXJuIHYubGVuZ3RoPXUscj1mdW5jdGlvbihhKXt0cnl7Zm9yKHZhciBiPTAsYz11LGY7YjxjO2IrKylcImZ1bmN0aW9uXCI9PXR5cGVvZihmPXpbYl0pJiYoZj1mKGEpLGY9bT9lLmdldFRydXN0ZWQobSxmKTplLnZhbHVlT2YoZiksbnVsbD09PWZ8fEUoZik/Zj1cIlwiOlwic3RyaW5nXCIhPXR5cGVvZiBmJiYoZj1xYShmKSkpLHZbYl09ZjtyZXR1cm4gdi5qb2luKFwiXCIpfWNhdGNoKGgpe2E9dmMoXCJpbnRlcnJcIixnLGgudG9TdHJpbmcoKSksZChhKX19LHIuZXhwPWcsci5wYXJ0cz16LHJ9dmFyIGY9Yi5sZW5ndGgsaD1hLmxlbmd0aDtnLnN0YXJ0U3ltYm9sPWZ1bmN0aW9uKCl7cmV0dXJuIGJ9O2cuZW5kU3ltYm9sPWZ1bmN0aW9uKCl7cmV0dXJuIGF9O1xucmV0dXJuIGd9XX1mdW5jdGlvbiBTZCgpe3RoaXMuJGdldD1bXCIkcm9vdFNjb3BlXCIsXCIkd2luZG93XCIsXCIkcVwiLGZ1bmN0aW9uKGIsYSxjKXtmdW5jdGlvbiBkKGQsZixoLGwpe3ZhciBrPWEuc2V0SW50ZXJ2YWwsbT1hLmNsZWFySW50ZXJ2YWwsbj1jLmRlZmVyKCkscD1uLnByb21pc2Uscj0wLHo9QihsKSYmIWw7aD1CKGgpP2g6MDtwLnRoZW4obnVsbCxudWxsLGQpO3AuJCRpbnRlcnZhbElkPWsoZnVuY3Rpb24oKXtuLm5vdGlmeShyKyspOzA8aCYmcj49aCYmKG4ucmVzb2x2ZShyKSxtKHAuJCRpbnRlcnZhbElkKSxkZWxldGUgZVtwLiQkaW50ZXJ2YWxJZF0pO3p8fGIuJGFwcGx5KCl9LGYpO2VbcC4kJGludGVydmFsSWRdPW47cmV0dXJuIHB9dmFyIGU9e307ZC5jYW5jZWw9ZnVuY3Rpb24oYSl7cmV0dXJuIGEmJmEuJCRpbnRlcnZhbElkIGluIGU/KGVbYS4kJGludGVydmFsSWRdLnJlamVjdChcImNhbmNlbGVkXCIpLGNsZWFySW50ZXJ2YWwoYS4kJGludGVydmFsSWQpLGRlbGV0ZSBlW2EuJCRpbnRlcnZhbElkXSxcbiEwKTohMX07cmV0dXJuIGR9XX1mdW5jdGlvbiBhZCgpe3RoaXMuJGdldD1mdW5jdGlvbigpe3JldHVybntpZDpcImVuLXVzXCIsTlVNQkVSX0ZPUk1BVFM6e0RFQ0lNQUxfU0VQOlwiLlwiLEdST1VQX1NFUDpcIixcIixQQVRURVJOUzpbe21pbkludDoxLG1pbkZyYWM6MCxtYXhGcmFjOjMscG9zUHJlOlwiXCIscG9zU3VmOlwiXCIsbmVnUHJlOlwiLVwiLG5lZ1N1ZjpcIlwiLGdTaXplOjMsbGdTaXplOjN9LHttaW5JbnQ6MSxtaW5GcmFjOjIsbWF4RnJhYzoyLHBvc1ByZTpcIlxcdTAwYTRcIixwb3NTdWY6XCJcIixuZWdQcmU6XCIoXFx1MDBhNFwiLG5lZ1N1ZjpcIilcIixnU2l6ZTozLGxnU2l6ZTozfV0sQ1VSUkVOQ1lfU1lNOlwiJFwifSxEQVRFVElNRV9GT1JNQVRTOntNT05USDpcIkphbnVhcnkgRmVicnVhcnkgTWFyY2ggQXByaWwgTWF5IEp1bmUgSnVseSBBdWd1c3QgU2VwdGVtYmVyIE9jdG9iZXIgTm92ZW1iZXIgRGVjZW1iZXJcIi5zcGxpdChcIiBcIiksU0hPUlRNT05USDpcIkphbiBGZWIgTWFyIEFwciBNYXkgSnVuIEp1bCBBdWcgU2VwIE9jdCBOb3YgRGVjXCIuc3BsaXQoXCIgXCIpLFxuREFZOlwiU3VuZGF5IE1vbmRheSBUdWVzZGF5IFdlZG5lc2RheSBUaHVyc2RheSBGcmlkYXkgU2F0dXJkYXlcIi5zcGxpdChcIiBcIiksU0hPUlREQVk6XCJTdW4gTW9uIFR1ZSBXZWQgVGh1IEZyaSBTYXRcIi5zcGxpdChcIiBcIiksQU1QTVM6W1wiQU1cIixcIlBNXCJdLG1lZGl1bTpcIk1NTSBkLCB5IGg6bW06c3MgYVwiLFwic2hvcnRcIjpcIk0vZC95eSBoOm1tIGFcIixmdWxsRGF0ZTpcIkVFRUUsIE1NTU0gZCwgeVwiLGxvbmdEYXRlOlwiTU1NTSBkLCB5XCIsbWVkaXVtRGF0ZTpcIk1NTSBkLCB5XCIsc2hvcnREYXRlOlwiTS9kL3l5XCIsbWVkaXVtVGltZTpcImg6bW06c3MgYVwiLHNob3J0VGltZTpcImg6bW0gYVwifSxwbHVyYWxDYXQ6ZnVuY3Rpb24oYil7cmV0dXJuIDE9PT1iP1wib25lXCI6XCJvdGhlclwifX19fWZ1bmN0aW9uIHdjKGIpe2I9Yi5zcGxpdChcIi9cIik7Zm9yKHZhciBhPWIubGVuZ3RoO2EtLTspYlthXT13YihiW2FdKTtyZXR1cm4gYi5qb2luKFwiL1wiKX1mdW5jdGlvbiB4YyhiLGEsYyl7Yj1zYShiLGMpO2EuJCRwcm90b2NvbD1cbmIucHJvdG9jb2w7YS4kJGhvc3Q9Yi5ob3N0bmFtZTthLiQkcG9ydD1ZKGIucG9ydCl8fHdlW2IucHJvdG9jb2xdfHxudWxsfWZ1bmN0aW9uIHljKGIsYSxjKXt2YXIgZD1cIi9cIiE9PWIuY2hhckF0KDApO2QmJihiPVwiL1wiK2IpO2I9c2EoYixjKTthLiQkcGF0aD1kZWNvZGVVUklDb21wb25lbnQoZCYmXCIvXCI9PT1iLnBhdGhuYW1lLmNoYXJBdCgwKT9iLnBhdGhuYW1lLnN1YnN0cmluZygxKTpiLnBhdGhuYW1lKTthLiQkc2VhcmNoPVliKGIuc2VhcmNoKTthLiQkaGFzaD1kZWNvZGVVUklDb21wb25lbnQoYi5oYXNoKTthLiQkcGF0aCYmXCIvXCIhPWEuJCRwYXRoLmNoYXJBdCgwKSYmKGEuJCRwYXRoPVwiL1wiK2EuJCRwYXRoKX1mdW5jdGlvbiBvYShiLGEpe2lmKDA9PT1hLmluZGV4T2YoYikpcmV0dXJuIGEuc3Vic3RyKGIubGVuZ3RoKX1mdW5jdGlvbiBZYShiKXt2YXIgYT1iLmluZGV4T2YoXCIjXCIpO3JldHVybi0xPT1hP2I6Yi5zdWJzdHIoMCxhKX1mdW5jdGlvbiBKYihiKXtyZXR1cm4gYi5zdWJzdHIoMCxcbllhKGIpLmxhc3RJbmRleE9mKFwiL1wiKSsxKX1mdW5jdGlvbiB6YyhiLGEpe3RoaXMuJCRodG1sNT0hMDthPWF8fFwiXCI7dmFyIGM9SmIoYik7eGMoYix0aGlzLGIpO3RoaXMuJCRwYXJzZT1mdW5jdGlvbihhKXt2YXIgZT1vYShjLGEpO2lmKCF3KGUpKXRocm93IEtiKFwiaXB0aHByZnhcIixhLGMpO3ljKGUsdGhpcyxiKTt0aGlzLiQkcGF0aHx8KHRoaXMuJCRwYXRoPVwiL1wiKTt0aGlzLiQkY29tcG9zZSgpfTt0aGlzLiQkY29tcG9zZT1mdW5jdGlvbigpe3ZhciBhPVpiKHRoaXMuJCRzZWFyY2gpLGI9dGhpcy4kJGhhc2g/XCIjXCIrd2IodGhpcy4kJGhhc2gpOlwiXCI7dGhpcy4kJHVybD13Yyh0aGlzLiQkcGF0aCkrKGE/XCI/XCIrYTpcIlwiKStiO3RoaXMuJCRhYnNVcmw9Yyt0aGlzLiQkdXJsLnN1YnN0cigxKX07dGhpcy4kJHJld3JpdGU9ZnVuY3Rpb24oZCl7dmFyIGU7aWYoKGU9b2EoYixkKSkhPT1zKXJldHVybiBkPWUsKGU9b2EoYSxlKSkhPT1zP2MrKG9hKFwiL1wiLGUpfHxlKTpiK2Q7aWYoKGU9b2EoYyxcbmQpKSE9PXMpcmV0dXJuIGMrZTtpZihjPT1kK1wiL1wiKXJldHVybiBjfX1mdW5jdGlvbiBMYihiLGEpe3ZhciBjPUpiKGIpO3hjKGIsdGhpcyxiKTt0aGlzLiQkcGFyc2U9ZnVuY3Rpb24oZCl7dmFyIGU9b2EoYixkKXx8b2EoYyxkKSxlPVwiI1wiPT1lLmNoYXJBdCgwKT9vYShhLGUpOnRoaXMuJCRodG1sNT9lOlwiXCI7aWYoIXcoZSkpdGhyb3cgS2IoXCJpaHNocHJmeFwiLGQsYSk7eWMoZSx0aGlzLGIpO2Q9dGhpcy4kJHBhdGg7dmFyIGc9L15cXC8/Lio/OihcXC8uKikvOzA9PT1lLmluZGV4T2YoYikmJihlPWUucmVwbGFjZShiLFwiXCIpKTtnLmV4ZWMoZSl8fChkPShlPWcuZXhlYyhkKSk/ZVsxXTpkKTt0aGlzLiQkcGF0aD1kO3RoaXMuJCRjb21wb3NlKCl9O3RoaXMuJCRjb21wb3NlPWZ1bmN0aW9uKCl7dmFyIGM9WmIodGhpcy4kJHNlYXJjaCksZT10aGlzLiQkaGFzaD9cIiNcIit3Yih0aGlzLiQkaGFzaCk6XCJcIjt0aGlzLiQkdXJsPXdjKHRoaXMuJCRwYXRoKSsoYz9cIj9cIitjOlwiXCIpK2U7dGhpcy4kJGFic1VybD1cbmIrKHRoaXMuJCR1cmw/YSt0aGlzLiQkdXJsOlwiXCIpfTt0aGlzLiQkcmV3cml0ZT1mdW5jdGlvbihhKXtpZihZYShiKT09WWEoYSkpcmV0dXJuIGF9fWZ1bmN0aW9uIEFjKGIsYSl7dGhpcy4kJGh0bWw1PSEwO0xiLmFwcGx5KHRoaXMsYXJndW1lbnRzKTt2YXIgYz1KYihiKTt0aGlzLiQkcmV3cml0ZT1mdW5jdGlvbihkKXt2YXIgZTtpZihiPT1ZYShkKSlyZXR1cm4gZDtpZihlPW9hKGMsZCkpcmV0dXJuIGIrYStlO2lmKGM9PT1kK1wiL1wiKXJldHVybiBjfX1mdW5jdGlvbiBuYihiKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1tiXX19ZnVuY3Rpb24gQmMoYixhKXtyZXR1cm4gZnVuY3Rpb24oYyl7aWYoRShjKSlyZXR1cm4gdGhpc1tiXTt0aGlzW2JdPWEoYyk7dGhpcy4kJGNvbXBvc2UoKTtyZXR1cm4gdGhpc319ZnVuY3Rpb24gVmQoKXt2YXIgYj1cIlwiLGE9ITE7dGhpcy5oYXNoUHJlZml4PWZ1bmN0aW9uKGEpe3JldHVybiBCKGEpPyhiPWEsdGhpcyk6Yn07dGhpcy5odG1sNU1vZGU9XG5mdW5jdGlvbihiKXtyZXR1cm4gQihiKT8oYT1iLHRoaXMpOmF9O3RoaXMuJGdldD1bXCIkcm9vdFNjb3BlXCIsXCIkYnJvd3NlclwiLFwiJHNuaWZmZXJcIixcIiRyb290RWxlbWVudFwiLGZ1bmN0aW9uKGMsZCxlLGcpe2Z1bmN0aW9uIGYoYSl7Yy4kYnJvYWRjYXN0KFwiJGxvY2F0aW9uQ2hhbmdlU3VjY2Vzc1wiLGguYWJzVXJsKCksYSl9dmFyIGgsbD1kLmJhc2VIcmVmKCksaz1kLnVybCgpO2E/KGw9ay5zdWJzdHJpbmcoMCxrLmluZGV4T2YoXCIvXCIsay5pbmRleE9mKFwiLy9cIikrMikpKyhsfHxcIi9cIiksZT1lLmhpc3Rvcnk/emM6QWMpOihsPVlhKGspLGU9TGIpO2g9bmV3IGUobCxcIiNcIitiKTtoLiQkcGFyc2UoaC4kJHJld3JpdGUoaykpO2cub24oXCJjbGlja1wiLGZ1bmN0aW9uKGEpe2lmKCFhLmN0cmxLZXkmJiFhLm1ldGFLZXkmJjIhPWEud2hpY2gpe2Zvcih2YXIgYj15KGEudGFyZ2V0KTtcImFcIiE9PUsoYlswXS5ub2RlTmFtZSk7KWlmKGJbMF09PT1nWzBdfHwhKGI9Yi5wYXJlbnQoKSlbMF0pcmV0dXJuO1xudmFyIGU9Yi5wcm9wKFwiaHJlZlwiKTtYKGUpJiZcIltvYmplY3QgU1ZHQW5pbWF0ZWRTdHJpbmddXCI9PT1lLnRvU3RyaW5nKCkmJihlPXNhKGUuYW5pbVZhbCkuaHJlZik7dmFyIGY9aC4kJHJld3JpdGUoZSk7ZSYmKCFiLmF0dHIoXCJ0YXJnZXRcIikmJmYmJiFhLmlzRGVmYXVsdFByZXZlbnRlZCgpKSYmKGEucHJldmVudERlZmF1bHQoKSxmIT1kLnVybCgpJiYoaC4kJHBhcnNlKGYpLGMuJGFwcGx5KCksTy5hbmd1bGFyW1wiZmYtNjg0MjA4LXByZXZlbnREZWZhdWx0XCJdPSEwKSl9fSk7aC5hYnNVcmwoKSE9ayYmZC51cmwoaC5hYnNVcmwoKSwhMCk7ZC5vblVybENoYW5nZShmdW5jdGlvbihhKXtoLmFic1VybCgpIT1hJiYoYy4kZXZhbEFzeW5jKGZ1bmN0aW9uKCl7dmFyIGI9aC5hYnNVcmwoKTtoLiQkcGFyc2UoYSk7Yy4kYnJvYWRjYXN0KFwiJGxvY2F0aW9uQ2hhbmdlU3RhcnRcIixhLGIpLmRlZmF1bHRQcmV2ZW50ZWQ/KGguJCRwYXJzZShiKSxkLnVybChiKSk6ZihiKX0pLGMuJCRwaGFzZXx8XG5jLiRkaWdlc3QoKSl9KTt2YXIgbT0wO2MuJHdhdGNoKGZ1bmN0aW9uKCl7dmFyIGE9ZC51cmwoKSxiPWguJCRyZXBsYWNlO20mJmE9PWguYWJzVXJsKCl8fChtKyssYy4kZXZhbEFzeW5jKGZ1bmN0aW9uKCl7Yy4kYnJvYWRjYXN0KFwiJGxvY2F0aW9uQ2hhbmdlU3RhcnRcIixoLmFic1VybCgpLGEpLmRlZmF1bHRQcmV2ZW50ZWQ/aC4kJHBhcnNlKGEpOihkLnVybChoLmFic1VybCgpLGIpLGYoYSkpfSkpO2guJCRyZXBsYWNlPSExO3JldHVybiBtfSk7cmV0dXJuIGh9XX1mdW5jdGlvbiBXZCgpe3ZhciBiPSEwLGE9dGhpczt0aGlzLmRlYnVnRW5hYmxlZD1mdW5jdGlvbihhKXtyZXR1cm4gQihhKT8oYj1hLHRoaXMpOmJ9O3RoaXMuJGdldD1bXCIkd2luZG93XCIsZnVuY3Rpb24oYyl7ZnVuY3Rpb24gZChhKXthIGluc3RhbmNlb2YgRXJyb3ImJihhLnN0YWNrP2E9YS5tZXNzYWdlJiYtMT09PWEuc3RhY2suaW5kZXhPZihhLm1lc3NhZ2UpP1wiRXJyb3I6IFwiK2EubWVzc2FnZStcIlxcblwiK2Euc3RhY2s6XG5hLnN0YWNrOmEuc291cmNlVVJMJiYoYT1hLm1lc3NhZ2UrXCJcXG5cIithLnNvdXJjZVVSTCtcIjpcIithLmxpbmUpKTtyZXR1cm4gYX1mdW5jdGlvbiBlKGEpe3ZhciBiPWMuY29uc29sZXx8e30sZT1iW2FdfHxiLmxvZ3x8QzthPSExO3RyeXthPSEhZS5hcHBseX1jYXRjaChsKXt9cmV0dXJuIGE/ZnVuY3Rpb24oKXt2YXIgYT1bXTtxKGFyZ3VtZW50cyxmdW5jdGlvbihiKXthLnB1c2goZChiKSl9KTtyZXR1cm4gZS5hcHBseShiLGEpfTpmdW5jdGlvbihhLGIpe2UoYSxudWxsPT1iP1wiXCI6Yil9fXJldHVybntsb2c6ZShcImxvZ1wiKSxpbmZvOmUoXCJpbmZvXCIpLHdhcm46ZShcIndhcm5cIiksZXJyb3I6ZShcImVycm9yXCIpLGRlYnVnOmZ1bmN0aW9uKCl7dmFyIGM9ZShcImRlYnVnXCIpO3JldHVybiBmdW5jdGlvbigpe2ImJmMuYXBwbHkoYSxhcmd1bWVudHMpfX0oKX19XX1mdW5jdGlvbiBmYShiLGEpe2lmKFwiY29uc3RydWN0b3JcIj09PWIpdGhyb3cgQmEoXCJpc2VjZmxkXCIsYSk7cmV0dXJuIGJ9ZnVuY3Rpb24gWmEoYixcbmEpe2lmKGIpe2lmKGIuY29uc3RydWN0b3I9PT1iKXRocm93IEJhKFwiaXNlY2ZuXCIsYSk7aWYoYi5kb2N1bWVudCYmYi5sb2NhdGlvbiYmYi5hbGVydCYmYi5zZXRJbnRlcnZhbCl0aHJvdyBCYShcImlzZWN3aW5kb3dcIixhKTtpZihiLmNoaWxkcmVuJiYoYi5ub2RlTmFtZXx8Yi5wcm9wJiZiLmF0dHImJmIuZmluZCkpdGhyb3cgQmEoXCJpc2VjZG9tXCIsYSk7fXJldHVybiBifWZ1bmN0aW9uIG9iKGIsYSxjLGQsZSl7ZT1lfHx7fTthPWEuc3BsaXQoXCIuXCIpO2Zvcih2YXIgZyxmPTA7MTxhLmxlbmd0aDtmKyspe2c9ZmEoYS5zaGlmdCgpLGQpO3ZhciBoPWJbZ107aHx8KGg9e30sYltnXT1oKTtiPWg7Yi50aGVuJiZlLnVud3JhcFByb21pc2VzJiYodGEoZCksXCIkJHZcImluIGJ8fGZ1bmN0aW9uKGEpe2EudGhlbihmdW5jdGlvbihiKXthLiQkdj1ifSl9KGIpLGIuJCR2PT09cyYmKGIuJCR2PXt9KSxiPWIuJCR2KX1nPWZhKGEuc2hpZnQoKSxkKTtyZXR1cm4gYltnXT1jfWZ1bmN0aW9uIENjKGIsXG5hLGMsZCxlLGcsZil7ZmEoYixnKTtmYShhLGcpO2ZhKGMsZyk7ZmEoZCxnKTtmYShlLGcpO3JldHVybiBmLnVud3JhcFByb21pc2VzP2Z1bmN0aW9uKGYsbCl7dmFyIGs9bCYmbC5oYXNPd25Qcm9wZXJ0eShiKT9sOmYsbTtpZihudWxsPT1rKXJldHVybiBrOyhrPWtbYl0pJiZrLnRoZW4mJih0YShnKSxcIiQkdlwiaW4ga3x8KG09ayxtLiQkdj1zLG0udGhlbihmdW5jdGlvbihhKXttLiQkdj1hfSkpLGs9ay4kJHYpO2lmKCFhKXJldHVybiBrO2lmKG51bGw9PWspcmV0dXJuIHM7KGs9a1thXSkmJmsudGhlbiYmKHRhKGcpLFwiJCR2XCJpbiBrfHwobT1rLG0uJCR2PXMsbS50aGVuKGZ1bmN0aW9uKGEpe20uJCR2PWF9KSksaz1rLiQkdik7aWYoIWMpcmV0dXJuIGs7aWYobnVsbD09aylyZXR1cm4gczsoaz1rW2NdKSYmay50aGVuJiYodGEoZyksXCIkJHZcImluIGt8fChtPWssbS4kJHY9cyxtLnRoZW4oZnVuY3Rpb24oYSl7bS4kJHY9YX0pKSxrPWsuJCR2KTtpZighZClyZXR1cm4gaztpZihudWxsPT1cbmspcmV0dXJuIHM7KGs9a1tkXSkmJmsudGhlbiYmKHRhKGcpLFwiJCR2XCJpbiBrfHwobT1rLG0uJCR2PXMsbS50aGVuKGZ1bmN0aW9uKGEpe20uJCR2PWF9KSksaz1rLiQkdik7aWYoIWUpcmV0dXJuIGs7aWYobnVsbD09aylyZXR1cm4gczsoaz1rW2VdKSYmay50aGVuJiYodGEoZyksXCIkJHZcImluIGt8fChtPWssbS4kJHY9cyxtLnRoZW4oZnVuY3Rpb24oYSl7bS4kJHY9YX0pKSxrPWsuJCR2KTtyZXR1cm4ga306ZnVuY3Rpb24oZyxmKXt2YXIgaz1mJiZmLmhhc093blByb3BlcnR5KGIpP2Y6ZztpZihudWxsPT1rKXJldHVybiBrO2s9a1tiXTtpZighYSlyZXR1cm4gaztpZihudWxsPT1rKXJldHVybiBzO2s9a1thXTtpZighYylyZXR1cm4gaztpZihudWxsPT1rKXJldHVybiBzO2s9a1tjXTtpZighZClyZXR1cm4gaztpZihudWxsPT1rKXJldHVybiBzO2s9a1tkXTtyZXR1cm4gZT9udWxsPT1rP3M6az1rW2VdOmt9fWZ1bmN0aW9uIHhlKGIsYSl7ZmEoYixhKTtyZXR1cm4gZnVuY3Rpb24oYSxcbmQpe3JldHVybiBudWxsPT1hP3M6KGQmJmQuaGFzT3duUHJvcGVydHkoYik/ZDphKVtiXX19ZnVuY3Rpb24geWUoYixhLGMpe2ZhKGIsYyk7ZmEoYSxjKTtyZXR1cm4gZnVuY3Rpb24oYyxlKXtpZihudWxsPT1jKXJldHVybiBzO2M9KGUmJmUuaGFzT3duUHJvcGVydHkoYik/ZTpjKVtiXTtyZXR1cm4gbnVsbD09Yz9zOmNbYV19fWZ1bmN0aW9uIERjKGIsYSxjKXtpZihNYi5oYXNPd25Qcm9wZXJ0eShiKSlyZXR1cm4gTWJbYl07dmFyIGQ9Yi5zcGxpdChcIi5cIiksZT1kLmxlbmd0aCxnO2lmKGEudW53cmFwUHJvbWlzZXN8fDEhPT1lKWlmKGEudW53cmFwUHJvbWlzZXN8fDIhPT1lKWlmKGEuY3NwKWc9Nj5lP0NjKGRbMF0sZFsxXSxkWzJdLGRbM10sZFs0XSxjLGEpOmZ1bmN0aW9uKGIsZyl7dmFyIGY9MCxoO2RvIGg9Q2MoZFtmKytdLGRbZisrXSxkW2YrK10sZFtmKytdLGRbZisrXSxjLGEpKGIsZyksZz1zLGI9aDt3aGlsZShmPGUpO3JldHVybiBofTtlbHNle3ZhciBmPVwidmFyIHA7XFxuXCI7XG5xKGQsZnVuY3Rpb24oYixkKXtmYShiLGMpO2YrPVwiaWYocyA9PSBudWxsKSByZXR1cm4gdW5kZWZpbmVkO1xcbnM9XCIrKGQ/XCJzXCI6JygoayYmay5oYXNPd25Qcm9wZXJ0eShcIicrYisnXCIpKT9rOnMpJykrJ1tcIicrYisnXCJdO1xcbicrKGEudW53cmFwUHJvbWlzZXM/J2lmIChzICYmIHMudGhlbikge1xcbiBwdyhcIicrYy5yZXBsYWNlKC8oW1wiXFxyXFxuXSkvZyxcIlxcXFwkMVwiKSsnXCIpO1xcbiBpZiAoIShcIiQkdlwiIGluIHMpKSB7XFxuIHA9cztcXG4gcC4kJHYgPSB1bmRlZmluZWQ7XFxuIHAudGhlbihmdW5jdGlvbih2KSB7cC4kJHY9djt9KTtcXG59XFxuIHM9cy4kJHZcXG59XFxuJzpcIlwiKX0pO3ZhciBmPWYrXCJyZXR1cm4gcztcIixoPW5ldyBGdW5jdGlvbihcInNcIixcImtcIixcInB3XCIsZik7aC50b1N0cmluZz1hYShmKTtnPWEudW53cmFwUHJvbWlzZXM/ZnVuY3Rpb24oYSxiKXtyZXR1cm4gaChhLGIsdGEpfTpofWVsc2UgZz15ZShkWzBdLGRbMV0sYyk7ZWxzZSBnPXhlKGRbMF0sYyk7XCJoYXNPd25Qcm9wZXJ0eVwiIT09XG5iJiYoTWJbYl09Zyk7cmV0dXJuIGd9ZnVuY3Rpb24gWGQoKXt2YXIgYj17fSxhPXtjc3A6ITEsdW53cmFwUHJvbWlzZXM6ITEsbG9nUHJvbWlzZVdhcm5pbmdzOiEwfTt0aGlzLnVud3JhcFByb21pc2VzPWZ1bmN0aW9uKGIpe3JldHVybiBCKGIpPyhhLnVud3JhcFByb21pc2VzPSEhYix0aGlzKTphLnVud3JhcFByb21pc2VzfTt0aGlzLmxvZ1Byb21pc2VXYXJuaW5ncz1mdW5jdGlvbihiKXtyZXR1cm4gQihiKT8oYS5sb2dQcm9taXNlV2FybmluZ3M9Yix0aGlzKTphLmxvZ1Byb21pc2VXYXJuaW5nc307dGhpcy4kZ2V0PVtcIiRmaWx0ZXJcIixcIiRzbmlmZmVyXCIsXCIkbG9nXCIsZnVuY3Rpb24oYyxkLGUpe2EuY3NwPWQuY3NwO3RhPWZ1bmN0aW9uKGIpe2EubG9nUHJvbWlzZVdhcm5pbmdzJiYhRWMuaGFzT3duUHJvcGVydHkoYikmJihFY1tiXT0hMCxlLndhcm4oXCJbJHBhcnNlXSBQcm9taXNlIGZvdW5kIGluIHRoZSBleHByZXNzaW9uIGBcIitiK1wiYC4gQXV0b21hdGljIHVud3JhcHBpbmcgb2YgcHJvbWlzZXMgaW4gQW5ndWxhciBleHByZXNzaW9ucyBpcyBkZXByZWNhdGVkLlwiKSl9O1xucmV0dXJuIGZ1bmN0aW9uKGQpe3ZhciBlO3N3aXRjaCh0eXBlb2YgZCl7Y2FzZSBcInN0cmluZ1wiOmlmKGIuaGFzT3duUHJvcGVydHkoZCkpcmV0dXJuIGJbZF07ZT1uZXcgTmIoYSk7ZT0obmV3ICRhKGUsYyxhKSkucGFyc2UoZCwhMSk7XCJoYXNPd25Qcm9wZXJ0eVwiIT09ZCYmKGJbZF09ZSk7cmV0dXJuIGU7Y2FzZSBcImZ1bmN0aW9uXCI6cmV0dXJuIGQ7ZGVmYXVsdDpyZXR1cm4gQ319fV19ZnVuY3Rpb24gWmQoKXt0aGlzLiRnZXQ9W1wiJHJvb3RTY29wZVwiLFwiJGV4Y2VwdGlvbkhhbmRsZXJcIixmdW5jdGlvbihiLGEpe3JldHVybiB6ZShmdW5jdGlvbihhKXtiLiRldmFsQXN5bmMoYSl9LGEpfV19ZnVuY3Rpb24gemUoYixhKXtmdW5jdGlvbiBjKGEpe3JldHVybiBhfWZ1bmN0aW9uIGQoYSl7cmV0dXJuIGYoYSl9dmFyIGU9ZnVuY3Rpb24oKXt2YXIgZj1bXSxrLG07cmV0dXJuIG09e3Jlc29sdmU6ZnVuY3Rpb24oYSl7aWYoZil7dmFyIGM9ZjtmPXM7az1nKGEpO2MubGVuZ3RoJiZiKGZ1bmN0aW9uKCl7Zm9yKHZhciBhLFxuYj0wLGQ9Yy5sZW5ndGg7YjxkO2IrKylhPWNbYl0say50aGVuKGFbMF0sYVsxXSxhWzJdKX0pfX0scmVqZWN0OmZ1bmN0aW9uKGEpe20ucmVzb2x2ZShoKGEpKX0sbm90aWZ5OmZ1bmN0aW9uKGEpe2lmKGYpe3ZhciBjPWY7Zi5sZW5ndGgmJmIoZnVuY3Rpb24oKXtmb3IodmFyIGIsZD0wLGU9Yy5sZW5ndGg7ZDxlO2QrKyliPWNbZF0sYlsyXShhKX0pfX0scHJvbWlzZTp7dGhlbjpmdW5jdGlvbihiLGcsaCl7dmFyIG09ZSgpLHU9ZnVuY3Rpb24oZCl7dHJ5e20ucmVzb2x2ZSgoUChiKT9iOmMpKGQpKX1jYXRjaChlKXttLnJlamVjdChlKSxhKGUpfX0sRj1mdW5jdGlvbihiKXt0cnl7bS5yZXNvbHZlKChQKGcpP2c6ZCkoYikpfWNhdGNoKGMpe20ucmVqZWN0KGMpLGEoYyl9fSx2PWZ1bmN0aW9uKGIpe3RyeXttLm5vdGlmeSgoUChoKT9oOmMpKGIpKX1jYXRjaChkKXthKGQpfX07Zj9mLnB1c2goW3UsRix2XSk6ay50aGVuKHUsRix2KTtyZXR1cm4gbS5wcm9taXNlfSxcImNhdGNoXCI6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMudGhlbihudWxsLFxuYSl9LFwiZmluYWxseVwiOmZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSxjKXt2YXIgZD1lKCk7Yz9kLnJlc29sdmUoYSk6ZC5yZWplY3QoYSk7cmV0dXJuIGQucHJvbWlzZX1mdW5jdGlvbiBkKGUsZyl7dmFyIGY9bnVsbDt0cnl7Zj0oYXx8YykoKX1jYXRjaChoKXtyZXR1cm4gYihoLCExKX1yZXR1cm4gZiYmUChmLnRoZW4pP2YudGhlbihmdW5jdGlvbigpe3JldHVybiBiKGUsZyl9LGZ1bmN0aW9uKGEpe3JldHVybiBiKGEsITEpfSk6YihlLGcpfXJldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24oYSl7cmV0dXJuIGQoYSwhMCl9LGZ1bmN0aW9uKGEpe3JldHVybiBkKGEsITEpfSl9fX19LGc9ZnVuY3Rpb24oYSl7cmV0dXJuIGEmJlAoYS50aGVuKT9hOnt0aGVuOmZ1bmN0aW9uKGMpe3ZhciBkPWUoKTtiKGZ1bmN0aW9uKCl7ZC5yZXNvbHZlKGMoYSkpfSk7cmV0dXJuIGQucHJvbWlzZX19fSxmPWZ1bmN0aW9uKGEpe3ZhciBiPWUoKTtiLnJlamVjdChhKTtyZXR1cm4gYi5wcm9taXNlfSxoPWZ1bmN0aW9uKGMpe3JldHVybnt0aGVuOmZ1bmN0aW9uKGcsXG5mKXt2YXIgaD1lKCk7YihmdW5jdGlvbigpe3RyeXtoLnJlc29sdmUoKFAoZik/ZjpkKShjKSl9Y2F0Y2goYil7aC5yZWplY3QoYiksYShiKX19KTtyZXR1cm4gaC5wcm9taXNlfX19O3JldHVybntkZWZlcjplLHJlamVjdDpmLHdoZW46ZnVuY3Rpb24oaCxrLG0sbil7dmFyIHA9ZSgpLHIsej1mdW5jdGlvbihiKXt0cnl7cmV0dXJuKFAoayk/azpjKShiKX1jYXRjaChkKXtyZXR1cm4gYShkKSxmKGQpfX0sdT1mdW5jdGlvbihiKXt0cnl7cmV0dXJuKFAobSk/bTpkKShiKX1jYXRjaChjKXtyZXR1cm4gYShjKSxmKGMpfX0sRj1mdW5jdGlvbihiKXt0cnl7cmV0dXJuKFAobik/bjpjKShiKX1jYXRjaChkKXthKGQpfX07YihmdW5jdGlvbigpe2coaCkudGhlbihmdW5jdGlvbihhKXtyfHwocj0hMCxwLnJlc29sdmUoZyhhKS50aGVuKHosdSxGKSkpfSxmdW5jdGlvbihhKXtyfHwocj0hMCxwLnJlc29sdmUodShhKSkpfSxmdW5jdGlvbihhKXtyfHxwLm5vdGlmeShGKGEpKX0pfSk7cmV0dXJuIHAucHJvbWlzZX0sXG5hbGw6ZnVuY3Rpb24oYSl7dmFyIGI9ZSgpLGM9MCxkPU0oYSk/W106e307cShhLGZ1bmN0aW9uKGEsZSl7YysrO2coYSkudGhlbihmdW5jdGlvbihhKXtkLmhhc093blByb3BlcnR5KGUpfHwoZFtlXT1hLC0tY3x8Yi5yZXNvbHZlKGQpKX0sZnVuY3Rpb24oYSl7ZC5oYXNPd25Qcm9wZXJ0eShlKXx8Yi5yZWplY3QoYSl9KX0pOzA9PT1jJiZiLnJlc29sdmUoZCk7cmV0dXJuIGIucHJvbWlzZX19fWZ1bmN0aW9uIGZlKCl7dGhpcy4kZ2V0PVtcIiR3aW5kb3dcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oYixhKXt2YXIgYz1iLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8Yi53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGIubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lLGQ9Yi5jYW5jZWxBbmltYXRpb25GcmFtZXx8Yi53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZXx8Yi5tb3pDYW5jZWxBbmltYXRpb25GcmFtZXx8Yi53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUsZT0hIWMsZz1lP1xuZnVuY3Rpb24oYSl7dmFyIGI9YyhhKTtyZXR1cm4gZnVuY3Rpb24oKXtkKGIpfX06ZnVuY3Rpb24oYil7dmFyIGM9YShiLDE2LjY2LCExKTtyZXR1cm4gZnVuY3Rpb24oKXthLmNhbmNlbChjKX19O2cuc3VwcG9ydGVkPWU7cmV0dXJuIGd9XX1mdW5jdGlvbiBZZCgpe3ZhciBiPTEwLGE9dChcIiRyb290U2NvcGVcIiksYz1udWxsO3RoaXMuZGlnZXN0VHRsPWZ1bmN0aW9uKGEpe2FyZ3VtZW50cy5sZW5ndGgmJihiPWEpO3JldHVybiBifTt0aGlzLiRnZXQ9W1wiJGluamVjdG9yXCIsXCIkZXhjZXB0aW9uSGFuZGxlclwiLFwiJHBhcnNlXCIsXCIkYnJvd3NlclwiLGZ1bmN0aW9uKGQsZSxnLGYpe2Z1bmN0aW9uIGgoKXt0aGlzLiRpZD1iYigpO3RoaXMuJCRwaGFzZT10aGlzLiRwYXJlbnQ9dGhpcy4kJHdhdGNoZXJzPXRoaXMuJCRuZXh0U2libGluZz10aGlzLiQkcHJldlNpYmxpbmc9dGhpcy4kJGNoaWxkSGVhZD10aGlzLiQkY2hpbGRUYWlsPW51bGw7dGhpc1tcInRoaXNcIl09dGhpcy4kcm9vdD10aGlzO1xudGhpcy4kJGRlc3Ryb3llZD0hMTt0aGlzLiQkYXN5bmNRdWV1ZT1bXTt0aGlzLiQkcG9zdERpZ2VzdFF1ZXVlPVtdO3RoaXMuJCRsaXN0ZW5lcnM9e307dGhpcy4kJGxpc3RlbmVyQ291bnQ9e307dGhpcy4kJGlzb2xhdGVCaW5kaW5ncz17fX1mdW5jdGlvbiBsKGIpe2lmKHAuJCRwaGFzZSl0aHJvdyBhKFwiaW5wcm9nXCIscC4kJHBoYXNlKTtwLiQkcGhhc2U9Yn1mdW5jdGlvbiBrKGEsYil7dmFyIGM9ZyhhKTtSYShjLGIpO3JldHVybiBjfWZ1bmN0aW9uIG0oYSxiLGMpe2RvIGEuJCRsaXN0ZW5lckNvdW50W2NdLT1iLDA9PT1hLiQkbGlzdGVuZXJDb3VudFtjXSYmZGVsZXRlIGEuJCRsaXN0ZW5lckNvdW50W2NdO3doaWxlKGE9YS4kcGFyZW50KX1mdW5jdGlvbiBuKCl7fWgucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpoLCRuZXc6ZnVuY3Rpb24oYSl7YT8oYT1uZXcgaCxhLiRyb290PXRoaXMuJHJvb3QsYS4kJGFzeW5jUXVldWU9dGhpcy4kJGFzeW5jUXVldWUsYS4kJHBvc3REaWdlc3RRdWV1ZT1cbnRoaXMuJCRwb3N0RGlnZXN0UXVldWUpOihhPWZ1bmN0aW9uKCl7fSxhLnByb3RvdHlwZT10aGlzLGE9bmV3IGEsYS4kaWQ9YmIoKSk7YVtcInRoaXNcIl09YTthLiQkbGlzdGVuZXJzPXt9O2EuJCRsaXN0ZW5lckNvdW50PXt9O2EuJHBhcmVudD10aGlzO2EuJCR3YXRjaGVycz1hLiQkbmV4dFNpYmxpbmc9YS4kJGNoaWxkSGVhZD1hLiQkY2hpbGRUYWlsPW51bGw7YS4kJHByZXZTaWJsaW5nPXRoaXMuJCRjaGlsZFRhaWw7dGhpcy4kJGNoaWxkSGVhZD90aGlzLiQkY2hpbGRUYWlsPXRoaXMuJCRjaGlsZFRhaWwuJCRuZXh0U2libGluZz1hOnRoaXMuJCRjaGlsZEhlYWQ9dGhpcy4kJGNoaWxkVGFpbD1hO3JldHVybiBhfSwkd2F0Y2g6ZnVuY3Rpb24oYSxiLGQpe3ZhciBlPWsoYSxcIndhdGNoXCIpLGc9dGhpcy4kJHdhdGNoZXJzLGY9e2ZuOmIsbGFzdDpuLGdldDplLGV4cDphLGVxOiEhZH07Yz1udWxsO2lmKCFQKGIpKXt2YXIgaD1rKGJ8fEMsXCJsaXN0ZW5lclwiKTtmLmZuPWZ1bmN0aW9uKGEsXG5iLGMpe2goYyl9fWlmKFwic3RyaW5nXCI9PXR5cGVvZiBhJiZlLmNvbnN0YW50KXt2YXIgbD1mLmZuO2YuZm49ZnVuY3Rpb24oYSxiLGMpe2wuY2FsbCh0aGlzLGEsYixjKTtPYShnLGYpfX1nfHwoZz10aGlzLiQkd2F0Y2hlcnM9W10pO2cudW5zaGlmdChmKTtyZXR1cm4gZnVuY3Rpb24oKXtPYShnLGYpO2M9bnVsbH19LCR3YXRjaENvbGxlY3Rpb246ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLGQsZSxmLGg9MTxiLmxlbmd0aCxsPTAsaz1nKGEpLG09W10sbj17fSxwPSEwLHE9MDtyZXR1cm4gdGhpcy4kd2F0Y2goZnVuY3Rpb24oKXtkPWsoYyk7dmFyIGEsYjtpZihYKGQpKWlmKGFiKGQpKWZvcihlIT09bSYmKGU9bSxxPWUubGVuZ3RoPTAsbCsrKSxhPWQubGVuZ3RoLHEhPT1hJiYobCsrLGUubGVuZ3RoPXE9YSksYj0wO2I8YTtiKyspZVtiXSE9PWVbYl0mJmRbYl0hPT1kW2JdfHxlW2JdPT09ZFtiXXx8KGwrKyxlW2JdPWRbYl0pO2Vsc2V7ZSE9PW4mJihlPW49e30scT0wLGwrKyk7YT1cbjA7Zm9yKGIgaW4gZClkLmhhc093blByb3BlcnR5KGIpJiYoYSsrLGUuaGFzT3duUHJvcGVydHkoYik/ZVtiXSE9PWRbYl0mJihsKyssZVtiXT1kW2JdKToocSsrLGVbYl09ZFtiXSxsKyspKTtpZihxPmEpZm9yKGIgaW4gbCsrLGUpZS5oYXNPd25Qcm9wZXJ0eShiKSYmIWQuaGFzT3duUHJvcGVydHkoYikmJihxLS0sZGVsZXRlIGVbYl0pfWVsc2UgZSE9PWQmJihlPWQsbCsrKTtyZXR1cm4gbH0sZnVuY3Rpb24oKXtwPyhwPSExLGIoZCxkLGMpKTpiKGQsZixjKTtpZihoKWlmKFgoZCkpaWYoYWIoZCkpe2Y9QXJyYXkoZC5sZW5ndGgpO2Zvcih2YXIgYT0wO2E8ZC5sZW5ndGg7YSsrKWZbYV09ZFthXX1lbHNlIGZvcihhIGluIGY9e30sZClGYy5jYWxsKGQsYSkmJihmW2FdPWRbYV0pO2Vsc2UgZj1kfSl9LCRkaWdlc3Q6ZnVuY3Rpb24oKXt2YXIgZCxnLGYsaCxrPXRoaXMuJCRhc3luY1F1ZXVlLG09dGhpcy4kJHBvc3REaWdlc3RRdWV1ZSxxLHgscz1iLEwsUT1bXSx5LEgsUjtsKFwiJGRpZ2VzdFwiKTtcbmM9bnVsbDtkb3t4PSExO2ZvcihMPXRoaXM7ay5sZW5ndGg7KXt0cnl7Uj1rLnNoaWZ0KCksUi5zY29wZS4kZXZhbChSLmV4cHJlc3Npb24pfWNhdGNoKEIpe3AuJCRwaGFzZT1udWxsLGUoQil9Yz1udWxsfWE6ZG97aWYoaD1MLiQkd2F0Y2hlcnMpZm9yKHE9aC5sZW5ndGg7cS0tOyl0cnl7aWYoZD1oW3FdKWlmKChnPWQuZ2V0KEwpKSE9PShmPWQubGFzdCkmJiEoZC5lcT94YShnLGYpOlwibnVtYmVyXCI9PXR5cGVvZiBnJiZcIm51bWJlclwiPT10eXBlb2YgZiYmaXNOYU4oZykmJmlzTmFOKGYpKSl4PSEwLGM9ZCxkLmxhc3Q9ZC5lcT9iYShnKTpnLGQuZm4oZyxmPT09bj9nOmYsTCksNT5zJiYoeT00LXMsUVt5XXx8KFFbeV09W10pLEg9UChkLmV4cCk/XCJmbjogXCIrKGQuZXhwLm5hbWV8fGQuZXhwLnRvU3RyaW5nKCkpOmQuZXhwLEgrPVwiOyBuZXdWYWw6IFwiK3FhKGcpK1wiOyBvbGRWYWw6IFwiK3FhKGYpLFFbeV0ucHVzaChIKSk7ZWxzZSBpZihkPT09Yyl7eD0hMTticmVhayBhfX1jYXRjaCh3KXtwLiQkcGhhc2U9XG5udWxsLGUodyl9aWYoIShoPUwuJCRjaGlsZEhlYWR8fEwhPT10aGlzJiZMLiQkbmV4dFNpYmxpbmcpKWZvcig7TCE9PXRoaXMmJiEoaD1MLiQkbmV4dFNpYmxpbmcpOylMPUwuJHBhcmVudH13aGlsZShMPWgpO2lmKCh4fHxrLmxlbmd0aCkmJiFzLS0pdGhyb3cgcC4kJHBoYXNlPW51bGwsYShcImluZmRpZ1wiLGIscWEoUSkpO313aGlsZSh4fHxrLmxlbmd0aCk7Zm9yKHAuJCRwaGFzZT1udWxsO20ubGVuZ3RoOyl0cnl7bS5zaGlmdCgpKCl9Y2F0Y2goVCl7ZShUKX19LCRkZXN0cm95OmZ1bmN0aW9uKCl7aWYoIXRoaXMuJCRkZXN0cm95ZWQpe3ZhciBhPXRoaXMuJHBhcmVudDt0aGlzLiRicm9hZGNhc3QoXCIkZGVzdHJveVwiKTt0aGlzLiQkZGVzdHJveWVkPSEwO3RoaXMhPT1wJiYocSh0aGlzLiQkbGlzdGVuZXJDb3VudCxlYihudWxsLG0sdGhpcykpLGEuJCRjaGlsZEhlYWQ9PXRoaXMmJihhLiQkY2hpbGRIZWFkPXRoaXMuJCRuZXh0U2libGluZyksYS4kJGNoaWxkVGFpbD09dGhpcyYmXG4oYS4kJGNoaWxkVGFpbD10aGlzLiQkcHJldlNpYmxpbmcpLHRoaXMuJCRwcmV2U2libGluZyYmKHRoaXMuJCRwcmV2U2libGluZy4kJG5leHRTaWJsaW5nPXRoaXMuJCRuZXh0U2libGluZyksdGhpcy4kJG5leHRTaWJsaW5nJiYodGhpcy4kJG5leHRTaWJsaW5nLiQkcHJldlNpYmxpbmc9dGhpcy4kJHByZXZTaWJsaW5nKSx0aGlzLiRwYXJlbnQ9dGhpcy4kJG5leHRTaWJsaW5nPXRoaXMuJCRwcmV2U2libGluZz10aGlzLiQkY2hpbGRIZWFkPXRoaXMuJCRjaGlsZFRhaWw9dGhpcy4kcm9vdD1udWxsLHRoaXMuJCRsaXN0ZW5lcnM9e30sdGhpcy4kJHdhdGNoZXJzPXRoaXMuJCRhc3luY1F1ZXVlPXRoaXMuJCRwb3N0RGlnZXN0UXVldWU9W10sdGhpcy4kZGVzdHJveT10aGlzLiRkaWdlc3Q9dGhpcy4kYXBwbHk9Qyx0aGlzLiRvbj10aGlzLiR3YXRjaD1mdW5jdGlvbigpe3JldHVybiBDfSl9fSwkZXZhbDpmdW5jdGlvbihhLGIpe3JldHVybiBnKGEpKHRoaXMsYil9LCRldmFsQXN5bmM6ZnVuY3Rpb24oYSl7cC4kJHBoYXNlfHxcbnAuJCRhc3luY1F1ZXVlLmxlbmd0aHx8Zi5kZWZlcihmdW5jdGlvbigpe3AuJCRhc3luY1F1ZXVlLmxlbmd0aCYmcC4kZGlnZXN0KCl9KTt0aGlzLiQkYXN5bmNRdWV1ZS5wdXNoKHtzY29wZTp0aGlzLGV4cHJlc3Npb246YX0pfSwkJHBvc3REaWdlc3Q6ZnVuY3Rpb24oYSl7dGhpcy4kJHBvc3REaWdlc3RRdWV1ZS5wdXNoKGEpfSwkYXBwbHk6ZnVuY3Rpb24oYSl7dHJ5e3JldHVybiBsKFwiJGFwcGx5XCIpLHRoaXMuJGV2YWwoYSl9Y2F0Y2goYil7ZShiKX1maW5hbGx5e3AuJCRwaGFzZT1udWxsO3RyeXtwLiRkaWdlc3QoKX1jYXRjaChjKXt0aHJvdyBlKGMpLGM7fX19LCRvbjpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMuJCRsaXN0ZW5lcnNbYV07Y3x8KHRoaXMuJCRsaXN0ZW5lcnNbYV09Yz1bXSk7Yy5wdXNoKGIpO3ZhciBkPXRoaXM7ZG8gZC4kJGxpc3RlbmVyQ291bnRbYV18fChkLiQkbGlzdGVuZXJDb3VudFthXT0wKSxkLiQkbGlzdGVuZXJDb3VudFthXSsrO3doaWxlKGQ9ZC4kcGFyZW50KTtcbnZhciBlPXRoaXM7cmV0dXJuIGZ1bmN0aW9uKCl7Y1tkYihjLGIpXT1udWxsO20oZSwxLGEpfX0sJGVtaXQ6ZnVuY3Rpb24oYSxiKXt2YXIgYz1bXSxkLGc9dGhpcyxmPSExLGg9e25hbWU6YSx0YXJnZXRTY29wZTpnLHN0b3BQcm9wYWdhdGlvbjpmdW5jdGlvbigpe2Y9ITB9LHByZXZlbnREZWZhdWx0OmZ1bmN0aW9uKCl7aC5kZWZhdWx0UHJldmVudGVkPSEwfSxkZWZhdWx0UHJldmVudGVkOiExfSxsPVtoXS5jb25jYXQoeWEuY2FsbChhcmd1bWVudHMsMSkpLGssbTtkb3tkPWcuJCRsaXN0ZW5lcnNbYV18fGM7aC5jdXJyZW50U2NvcGU9ZztrPTA7Zm9yKG09ZC5sZW5ndGg7azxtO2srKylpZihkW2tdKXRyeXtkW2tdLmFwcGx5KG51bGwsbCl9Y2F0Y2gobil7ZShuKX1lbHNlIGQuc3BsaWNlKGssMSksay0tLG0tLTtpZihmKWJyZWFrO2c9Zy4kcGFyZW50fXdoaWxlKGcpO3JldHVybiBofSwkYnJvYWRjYXN0OmZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPXRoaXMsZD10aGlzLGc9e25hbWU6YSxcbnRhcmdldFNjb3BlOnRoaXMscHJldmVudERlZmF1bHQ6ZnVuY3Rpb24oKXtnLmRlZmF1bHRQcmV2ZW50ZWQ9ITB9LGRlZmF1bHRQcmV2ZW50ZWQ6ITF9LGY9W2ddLmNvbmNhdCh5YS5jYWxsKGFyZ3VtZW50cywxKSksaCxrO2M9ZDspe2cuY3VycmVudFNjb3BlPWM7ZD1jLiQkbGlzdGVuZXJzW2FdfHxbXTtoPTA7Zm9yKGs9ZC5sZW5ndGg7aDxrO2grKylpZihkW2hdKXRyeXtkW2hdLmFwcGx5KG51bGwsZil9Y2F0Y2gobCl7ZShsKX1lbHNlIGQuc3BsaWNlKGgsMSksaC0tLGstLTtpZighKGQ9Yy4kJGxpc3RlbmVyQ291bnRbYV0mJmMuJCRjaGlsZEhlYWR8fGMhPT10aGlzJiZjLiQkbmV4dFNpYmxpbmcpKWZvcig7YyE9PXRoaXMmJiEoZD1jLiQkbmV4dFNpYmxpbmcpOyljPWMuJHBhcmVudH1yZXR1cm4gZ319O3ZhciBwPW5ldyBoO3JldHVybiBwfV19ZnVuY3Rpb24gYmQoKXt2YXIgYj0vXlxccyooaHR0cHM/fGZ0cHxtYWlsdG98dGVsfGZpbGUpOi8sYT0vXlxccyooaHR0cHM/fGZ0cHxmaWxlKTp8ZGF0YTppbWFnZVxcLy87XG50aGlzLmFIcmVmU2FuaXRpemF0aW9uV2hpdGVsaXN0PWZ1bmN0aW9uKGEpe3JldHVybiBCKGEpPyhiPWEsdGhpcyk6Yn07dGhpcy5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3Q9ZnVuY3Rpb24oYil7cmV0dXJuIEIoYik/KGE9Yix0aGlzKTphfTt0aGlzLiRnZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oYyxkKXt2YXIgZT1kP2E6YixnO2lmKCFTfHw4PD1TKWlmKGc9c2EoYykuaHJlZixcIlwiIT09ZyYmIWcubWF0Y2goZSkpcmV0dXJuXCJ1bnNhZmU6XCIrZztyZXR1cm4gY319fWZ1bmN0aW9uIEFlKGIpe2lmKFwic2VsZlwiPT09YilyZXR1cm4gYjtpZih3KGIpKXtpZigtMTxiLmluZGV4T2YoXCIqKipcIikpdGhyb3cgdWEoXCJpd2NhcmRcIixiKTtiPWIucmVwbGFjZSgvKFstKClcXFtcXF17fSs/Ki4kXFxefCw6IzwhXFxcXF0pL2csXCJcXFxcJDFcIikucmVwbGFjZSgvXFx4MDgvZyxcIlxcXFx4MDhcIikucmVwbGFjZShcIlxcXFwqXFxcXCpcIixcIi4qXCIpLnJlcGxhY2UoXCJcXFxcKlwiLFwiW146Ly4/JjtdKlwiKTtyZXR1cm4gUmVnRXhwKFwiXlwiK1xuYitcIiRcIil9aWYoY2IoYikpcmV0dXJuIFJlZ0V4cChcIl5cIitiLnNvdXJjZStcIiRcIik7dGhyb3cgdWEoXCJpbWF0Y2hlclwiKTt9ZnVuY3Rpb24gR2MoYil7dmFyIGE9W107QihiKSYmcShiLGZ1bmN0aW9uKGIpe2EucHVzaChBZShiKSl9KTtyZXR1cm4gYX1mdW5jdGlvbiBhZSgpe3RoaXMuU0NFX0NPTlRFWFRTPWdhO3ZhciBiPVtcInNlbGZcIl0sYT1bXTt0aGlzLnJlc291cmNlVXJsV2hpdGVsaXN0PWZ1bmN0aW9uKGEpe2FyZ3VtZW50cy5sZW5ndGgmJihiPUdjKGEpKTtyZXR1cm4gYn07dGhpcy5yZXNvdXJjZVVybEJsYWNrbGlzdD1mdW5jdGlvbihiKXthcmd1bWVudHMubGVuZ3RoJiYoYT1HYyhiKSk7cmV0dXJuIGF9O3RoaXMuJGdldD1bXCIkaW5qZWN0b3JcIixmdW5jdGlvbihjKXtmdW5jdGlvbiBkKGEpe3ZhciBiPWZ1bmN0aW9uKGEpe3RoaXMuJCR1bndyYXBUcnVzdGVkVmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gYX19O2EmJihiLnByb3RvdHlwZT1uZXcgYSk7Yi5wcm90b3R5cGUudmFsdWVPZj1cbmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJCR1bndyYXBUcnVzdGVkVmFsdWUoKX07Yi5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kJHVud3JhcFRydXN0ZWRWYWx1ZSgpLnRvU3RyaW5nKCl9O3JldHVybiBifXZhciBlPWZ1bmN0aW9uKGEpe3Rocm93IHVhKFwidW5zYWZlXCIpO307Yy5oYXMoXCIkc2FuaXRpemVcIikmJihlPWMuZ2V0KFwiJHNhbml0aXplXCIpKTt2YXIgZz1kKCksZj17fTtmW2dhLkhUTUxdPWQoZyk7ZltnYS5DU1NdPWQoZyk7ZltnYS5VUkxdPWQoZyk7ZltnYS5KU109ZChnKTtmW2dhLlJFU09VUkNFX1VSTF09ZChmW2dhLlVSTF0pO3JldHVybnt0cnVzdEFzOmZ1bmN0aW9uKGEsYil7dmFyIGM9Zi5oYXNPd25Qcm9wZXJ0eShhKT9mW2FdOm51bGw7aWYoIWMpdGhyb3cgdWEoXCJpY29udGV4dFwiLGEsYik7aWYobnVsbD09PWJ8fGI9PT1zfHxcIlwiPT09YilyZXR1cm4gYjtpZihcInN0cmluZ1wiIT09dHlwZW9mIGIpdGhyb3cgdWEoXCJpdHlwZVwiLGEpO3JldHVybiBuZXcgYyhiKX0sXG5nZXRUcnVzdGVkOmZ1bmN0aW9uKGMsZCl7aWYobnVsbD09PWR8fGQ9PT1zfHxcIlwiPT09ZClyZXR1cm4gZDt2YXIgZz1mLmhhc093blByb3BlcnR5KGMpP2ZbY106bnVsbDtpZihnJiZkIGluc3RhbmNlb2YgZylyZXR1cm4gZC4kJHVud3JhcFRydXN0ZWRWYWx1ZSgpO2lmKGM9PT1nYS5SRVNPVVJDRV9VUkwpe3ZhciBnPXNhKGQudG9TdHJpbmcoKSksbSxuLHA9ITE7bT0wO2ZvcihuPWIubGVuZ3RoO208bjttKyspaWYoXCJzZWxmXCI9PT1iW21dP0liKGcpOmJbbV0uZXhlYyhnLmhyZWYpKXtwPSEwO2JyZWFrfWlmKHApZm9yKG09MCxuPWEubGVuZ3RoO208bjttKyspaWYoXCJzZWxmXCI9PT1hW21dP0liKGcpOmFbbV0uZXhlYyhnLmhyZWYpKXtwPSExO2JyZWFrfWlmKHApcmV0dXJuIGQ7dGhyb3cgdWEoXCJpbnNlY3VybFwiLGQudG9TdHJpbmcoKSk7fWlmKGM9PT1nYS5IVE1MKXJldHVybiBlKGQpO3Rocm93IHVhKFwidW5zYWZlXCIpO30sdmFsdWVPZjpmdW5jdGlvbihhKXtyZXR1cm4gYSBpbnN0YW5jZW9mXG5nP2EuJCR1bndyYXBUcnVzdGVkVmFsdWUoKTphfX19XX1mdW5jdGlvbiAkZCgpe3ZhciBiPSEwO3RoaXMuZW5hYmxlZD1mdW5jdGlvbihhKXthcmd1bWVudHMubGVuZ3RoJiYoYj0hIWEpO3JldHVybiBifTt0aGlzLiRnZXQ9W1wiJHBhcnNlXCIsXCIkc25pZmZlclwiLFwiJHNjZURlbGVnYXRlXCIsZnVuY3Rpb24oYSxjLGQpe2lmKGImJmMubXNpZSYmOD5jLm1zaWVEb2N1bWVudE1vZGUpdGhyb3cgdWEoXCJpZXF1aXJrc1wiKTt2YXIgZT1iYShnYSk7ZS5pc0VuYWJsZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gYn07ZS50cnVzdEFzPWQudHJ1c3RBcztlLmdldFRydXN0ZWQ9ZC5nZXRUcnVzdGVkO2UudmFsdWVPZj1kLnZhbHVlT2Y7Ynx8KGUudHJ1c3RBcz1lLmdldFRydXN0ZWQ9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYn0sZS52YWx1ZU9mPURhKTtlLnBhcnNlQXM9ZnVuY3Rpb24oYixjKXt2YXIgZD1hKGMpO3JldHVybiBkLmxpdGVyYWwmJmQuY29uc3RhbnQ/ZDpmdW5jdGlvbihhLGMpe3JldHVybiBlLmdldFRydXN0ZWQoYixcbmQoYSxjKSl9fTt2YXIgZz1lLnBhcnNlQXMsZj1lLmdldFRydXN0ZWQsaD1lLnRydXN0QXM7cShnYSxmdW5jdGlvbihhLGIpe3ZhciBjPUsoYik7ZVtUYShcInBhcnNlX2FzX1wiK2MpXT1mdW5jdGlvbihiKXtyZXR1cm4gZyhhLGIpfTtlW1RhKFwiZ2V0X3RydXN0ZWRfXCIrYyldPWZ1bmN0aW9uKGIpe3JldHVybiBmKGEsYil9O2VbVGEoXCJ0cnVzdF9hc19cIitjKV09ZnVuY3Rpb24oYil7cmV0dXJuIGgoYSxiKX19KTtyZXR1cm4gZX1dfWZ1bmN0aW9uIGJlKCl7dGhpcy4kZ2V0PVtcIiR3aW5kb3dcIixcIiRkb2N1bWVudFwiLGZ1bmN0aW9uKGIsYSl7dmFyIGM9e30sZD1ZKCgvYW5kcm9pZCAoXFxkKykvLmV4ZWMoSygoYi5uYXZpZ2F0b3J8fHt9KS51c2VyQWdlbnQpKXx8W10pWzFdKSxlPS9Cb3hlZS9pLnRlc3QoKGIubmF2aWdhdG9yfHx7fSkudXNlckFnZW50KSxnPWFbMF18fHt9LGY9Zy5kb2N1bWVudE1vZGUsaCxsPS9eKE1venx3ZWJraXR8T3xtcykoPz1bQS1aXSkvLGs9Zy5ib2R5JiZnLmJvZHkuc3R5bGUsXG5tPSExLG49ITE7aWYoayl7Zm9yKHZhciBwIGluIGspaWYobT1sLmV4ZWMocCkpe2g9bVswXTtoPWguc3Vic3RyKDAsMSkudG9VcHBlckNhc2UoKStoLnN1YnN0cigxKTticmVha31ofHwoaD1cIldlYmtpdE9wYWNpdHlcImluIGsmJlwid2Via2l0XCIpO209ISEoXCJ0cmFuc2l0aW9uXCJpbiBrfHxoK1wiVHJhbnNpdGlvblwiaW4gayk7bj0hIShcImFuaW1hdGlvblwiaW4ga3x8aCtcIkFuaW1hdGlvblwiaW4gayk7IWR8fG0mJm58fChtPXcoZy5ib2R5LnN0eWxlLndlYmtpdFRyYW5zaXRpb24pLG49dyhnLmJvZHkuc3R5bGUud2Via2l0QW5pbWF0aW9uKSl9cmV0dXJue2hpc3Rvcnk6ISghYi5oaXN0b3J5fHwhYi5oaXN0b3J5LnB1c2hTdGF0ZXx8ND5kfHxlKSxoYXNoY2hhbmdlOlwib25oYXNoY2hhbmdlXCJpbiBiJiYoIWZ8fDc8ZiksaGFzRXZlbnQ6ZnVuY3Rpb24oYSl7aWYoXCJpbnB1dFwiPT1hJiY5PT1TKXJldHVybiExO2lmKEUoY1thXSkpe3ZhciBiPWcuY3JlYXRlRWxlbWVudChcImRpdlwiKTtjW2FdPVwib25cIitcbmEgaW4gYn1yZXR1cm4gY1thXX0sY3NwOlZiKCksdmVuZG9yUHJlZml4OmgsdHJhbnNpdGlvbnM6bSxhbmltYXRpb25zOm4sYW5kcm9pZDpkLG1zaWU6Uyxtc2llRG9jdW1lbnRNb2RlOmZ9fV19ZnVuY3Rpb24gZGUoKXt0aGlzLiRnZXQ9W1wiJHJvb3RTY29wZVwiLFwiJGJyb3dzZXJcIixcIiRxXCIsXCIkZXhjZXB0aW9uSGFuZGxlclwiLGZ1bmN0aW9uKGIsYSxjLGQpe2Z1bmN0aW9uIGUoZSxoLGwpe3ZhciBrPWMuZGVmZXIoKSxtPWsucHJvbWlzZSxuPUIobCkmJiFsO2g9YS5kZWZlcihmdW5jdGlvbigpe3RyeXtrLnJlc29sdmUoZSgpKX1jYXRjaChhKXtrLnJlamVjdChhKSxkKGEpfWZpbmFsbHl7ZGVsZXRlIGdbbS4kJHRpbWVvdXRJZF19bnx8Yi4kYXBwbHkoKX0saCk7bS4kJHRpbWVvdXRJZD1oO2dbaF09aztyZXR1cm4gbX12YXIgZz17fTtlLmNhbmNlbD1mdW5jdGlvbihiKXtyZXR1cm4gYiYmYi4kJHRpbWVvdXRJZCBpbiBnPyhnW2IuJCR0aW1lb3V0SWRdLnJlamVjdChcImNhbmNlbGVkXCIpLFxuZGVsZXRlIGdbYi4kJHRpbWVvdXRJZF0sYS5kZWZlci5jYW5jZWwoYi4kJHRpbWVvdXRJZCkpOiExfTtyZXR1cm4gZX1dfWZ1bmN0aW9uIHNhKGIsYSl7dmFyIGM9YjtTJiYoVy5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsYyksYz1XLmhyZWYpO1cuc2V0QXR0cmlidXRlKFwiaHJlZlwiLGMpO3JldHVybntocmVmOlcuaHJlZixwcm90b2NvbDpXLnByb3RvY29sP1cucHJvdG9jb2wucmVwbGFjZSgvOiQvLFwiXCIpOlwiXCIsaG9zdDpXLmhvc3Qsc2VhcmNoOlcuc2VhcmNoP1cuc2VhcmNoLnJlcGxhY2UoL15cXD8vLFwiXCIpOlwiXCIsaGFzaDpXLmhhc2g/Vy5oYXNoLnJlcGxhY2UoL14jLyxcIlwiKTpcIlwiLGhvc3RuYW1lOlcuaG9zdG5hbWUscG9ydDpXLnBvcnQscGF0aG5hbWU6XCIvXCI9PT1XLnBhdGhuYW1lLmNoYXJBdCgwKT9XLnBhdGhuYW1lOlwiL1wiK1cucGF0aG5hbWV9fWZ1bmN0aW9uIEliKGIpe2I9dyhiKT9zYShiKTpiO3JldHVybiBiLnByb3RvY29sPT09SGMucHJvdG9jb2wmJmIuaG9zdD09PUhjLmhvc3R9XG5mdW5jdGlvbiBlZSgpe3RoaXMuJGdldD1hYShPKX1mdW5jdGlvbiBnYyhiKXtmdW5jdGlvbiBhKGQsZSl7aWYoWChkKSl7dmFyIGc9e307cShkLGZ1bmN0aW9uKGIsYyl7Z1tjXT1hKGMsYil9KTtyZXR1cm4gZ31yZXR1cm4gYi5mYWN0b3J5KGQrYyxlKX12YXIgYz1cIkZpbHRlclwiO3RoaXMucmVnaXN0ZXI9YTt0aGlzLiRnZXQ9W1wiJGluamVjdG9yXCIsZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGIpe3JldHVybiBhLmdldChiK2MpfX1dO2EoXCJjdXJyZW5jeVwiLEljKTthKFwiZGF0ZVwiLEpjKTthKFwiZmlsdGVyXCIsQmUpO2EoXCJqc29uXCIsQ2UpO2EoXCJsaW1pdFRvXCIsRGUpO2EoXCJsb3dlcmNhc2VcIixFZSk7YShcIm51bWJlclwiLEtjKTthKFwib3JkZXJCeVwiLExjKTthKFwidXBwZXJjYXNlXCIsRmUpfWZ1bmN0aW9uIEJlKCl7cmV0dXJuIGZ1bmN0aW9uKGIsYSxjKXtpZighTShiKSlyZXR1cm4gYjt2YXIgZD10eXBlb2YgYyxlPVtdO2UuY2hlY2s9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPTA7YjxlLmxlbmd0aDtiKyspaWYoIWVbYl0oYSkpcmV0dXJuITE7XG5yZXR1cm4hMH07XCJmdW5jdGlvblwiIT09ZCYmKGM9XCJib29sZWFuXCI9PT1kJiZjP2Z1bmN0aW9uKGEsYil7cmV0dXJuIEVhLmVxdWFscyhhLGIpfTpmdW5jdGlvbihhLGIpe2lmKGEmJmImJlwib2JqZWN0XCI9PT10eXBlb2YgYSYmXCJvYmplY3RcIj09PXR5cGVvZiBiKXtmb3IodmFyIGQgaW4gYSlpZihcIiRcIiE9PWQuY2hhckF0KDApJiZGYy5jYWxsKGEsZCkmJmMoYVtkXSxiW2RdKSlyZXR1cm4hMDtyZXR1cm4hMX1iPShcIlwiK2IpLnRvTG93ZXJDYXNlKCk7cmV0dXJuLTE8KFwiXCIrYSkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGIpfSk7dmFyIGc9ZnVuY3Rpb24oYSxiKXtpZihcInN0cmluZ1wiPT10eXBlb2YgYiYmXCIhXCI9PT1iLmNoYXJBdCgwKSlyZXR1cm4hZyhhLGIuc3Vic3RyKDEpKTtzd2l0Y2godHlwZW9mIGEpe2Nhc2UgXCJib29sZWFuXCI6Y2FzZSBcIm51bWJlclwiOmNhc2UgXCJzdHJpbmdcIjpyZXR1cm4gYyhhLGIpO2Nhc2UgXCJvYmplY3RcIjpzd2l0Y2godHlwZW9mIGIpe2Nhc2UgXCJvYmplY3RcIjpyZXR1cm4gYyhhLFxuYik7ZGVmYXVsdDpmb3IodmFyIGQgaW4gYSlpZihcIiRcIiE9PWQuY2hhckF0KDApJiZnKGFbZF0sYikpcmV0dXJuITB9cmV0dXJuITE7Y2FzZSBcImFycmF5XCI6Zm9yKGQ9MDtkPGEubGVuZ3RoO2QrKylpZihnKGFbZF0sYikpcmV0dXJuITA7cmV0dXJuITE7ZGVmYXVsdDpyZXR1cm4hMX19O3N3aXRjaCh0eXBlb2YgYSl7Y2FzZSBcImJvb2xlYW5cIjpjYXNlIFwibnVtYmVyXCI6Y2FzZSBcInN0cmluZ1wiOmE9eyQ6YX07Y2FzZSBcIm9iamVjdFwiOmZvcih2YXIgZiBpbiBhKShmdW5jdGlvbihiKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgYVtiXSYmZS5wdXNoKGZ1bmN0aW9uKGMpe3JldHVybiBnKFwiJFwiPT1iP2M6YyYmY1tiXSxhW2JdKX0pfSkoZik7YnJlYWs7Y2FzZSBcImZ1bmN0aW9uXCI6ZS5wdXNoKGEpO2JyZWFrO2RlZmF1bHQ6cmV0dXJuIGJ9ZD1bXTtmb3IoZj0wO2Y8Yi5sZW5ndGg7ZisrKXt2YXIgaD1iW2ZdO2UuY2hlY2soaCkmJmQucHVzaChoKX1yZXR1cm4gZH19ZnVuY3Rpb24gSWMoYil7dmFyIGE9XG5iLk5VTUJFUl9GT1JNQVRTO3JldHVybiBmdW5jdGlvbihiLGQpe0UoZCkmJihkPWEuQ1VSUkVOQ1lfU1lNKTtyZXR1cm4gTWMoYixhLlBBVFRFUk5TWzFdLGEuR1JPVVBfU0VQLGEuREVDSU1BTF9TRVAsMikucmVwbGFjZSgvXFx1MDBBNC9nLGQpfX1mdW5jdGlvbiBLYyhiKXt2YXIgYT1iLk5VTUJFUl9GT1JNQVRTO3JldHVybiBmdW5jdGlvbihiLGQpe3JldHVybiBNYyhiLGEuUEFUVEVSTlNbMF0sYS5HUk9VUF9TRVAsYS5ERUNJTUFMX1NFUCxkKX19ZnVuY3Rpb24gTWMoYixhLGMsZCxlKXtpZihudWxsPT1ifHwhaXNGaW5pdGUoYil8fFgoYikpcmV0dXJuXCJcIjt2YXIgZz0wPmI7Yj1NYXRoLmFicyhiKTt2YXIgZj1iK1wiXCIsaD1cIlwiLGw9W10saz0hMTtpZigtMSE9PWYuaW5kZXhPZihcImVcIikpe3ZhciBtPWYubWF0Y2goLyhbXFxkXFwuXSspZSgtPykoXFxkKykvKTttJiZcIi1cIj09bVsyXSYmbVszXT5lKzE/Zj1cIjBcIjooaD1mLGs9ITApfWlmKGspMDxlJiYoLTE8YiYmMT5iKSYmKGg9Yi50b0ZpeGVkKGUpKTtcbmVsc2V7Zj0oZi5zcGxpdChOYylbMV18fFwiXCIpLmxlbmd0aDtFKGUpJiYoZT1NYXRoLm1pbihNYXRoLm1heChhLm1pbkZyYWMsZiksYS5tYXhGcmFjKSk7Zj1NYXRoLnBvdygxMCxlKTtiPU1hdGgucm91bmQoYipmKS9mO2I9KFwiXCIrYikuc3BsaXQoTmMpO2Y9YlswXTtiPWJbMV18fFwiXCI7dmFyIG09MCxuPWEubGdTaXplLHA9YS5nU2l6ZTtpZihmLmxlbmd0aD49bitwKWZvcihtPWYubGVuZ3RoLW4saz0wO2s8bTtrKyspMD09PShtLWspJXAmJjAhPT1rJiYoaCs9YyksaCs9Zi5jaGFyQXQoayk7Zm9yKGs9bTtrPGYubGVuZ3RoO2srKykwPT09KGYubGVuZ3RoLWspJW4mJjAhPT1rJiYoaCs9YyksaCs9Zi5jaGFyQXQoayk7Zm9yKDtiLmxlbmd0aDxlOyliKz1cIjBcIjtlJiZcIjBcIiE9PWUmJihoKz1kK2Iuc3Vic3RyKDAsZSkpfWwucHVzaChnP2EubmVnUHJlOmEucG9zUHJlKTtsLnB1c2goaCk7bC5wdXNoKGc/YS5uZWdTdWY6YS5wb3NTdWYpO3JldHVybiBsLmpvaW4oXCJcIil9ZnVuY3Rpb24gT2IoYixcbmEsYyl7dmFyIGQ9XCJcIjswPmImJihkPVwiLVwiLGI9LWIpO2ZvcihiPVwiXCIrYjtiLmxlbmd0aDxhOyliPVwiMFwiK2I7YyYmKGI9Yi5zdWJzdHIoYi5sZW5ndGgtYSkpO3JldHVybiBkK2J9ZnVuY3Rpb24gJChiLGEsYyxkKXtjPWN8fDA7cmV0dXJuIGZ1bmN0aW9uKGUpe2U9ZVtcImdldFwiK2JdKCk7aWYoMDxjfHxlPi1jKWUrPWM7MD09PWUmJi0xMj09YyYmKGU9MTIpO3JldHVybiBPYihlLGEsZCl9fWZ1bmN0aW9uIHBiKGIsYSl7cmV0dXJuIGZ1bmN0aW9uKGMsZCl7dmFyIGU9Y1tcImdldFwiK2JdKCksZz1GYShhP1wiU0hPUlRcIitiOmIpO3JldHVybiBkW2ddW2VdfX1mdW5jdGlvbiBKYyhiKXtmdW5jdGlvbiBhKGEpe3ZhciBiO2lmKGI9YS5tYXRjaChjKSl7YT1uZXcgRGF0ZSgwKTt2YXIgZz0wLGY9MCxoPWJbOF0/YS5zZXRVVENGdWxsWWVhcjphLnNldEZ1bGxZZWFyLGw9Yls4XT9hLnNldFVUQ0hvdXJzOmEuc2V0SG91cnM7Yls5XSYmKGc9WShiWzldK2JbMTBdKSxmPVkoYls5XStiWzExXSkpO1xuaC5jYWxsKGEsWShiWzFdKSxZKGJbMl0pLTEsWShiWzNdKSk7Zz1ZKGJbNF18fDApLWc7Zj1ZKGJbNV18fDApLWY7aD1ZKGJbNl18fDApO2I9TWF0aC5yb3VuZCgxRTMqcGFyc2VGbG9hdChcIjAuXCIrKGJbN118fDApKSk7bC5jYWxsKGEsZyxmLGgsYil9cmV0dXJuIGF9dmFyIGM9L14oXFxkezR9KS0/KFxcZFxcZCktPyhcXGRcXGQpKD86VChcXGRcXGQpKD86Oj8oXFxkXFxkKSg/Ojo/KFxcZFxcZCkoPzpcXC4oXFxkKykpPyk/KT8oWnwoWystXSkoXFxkXFxkKTo/KFxcZFxcZCkpPyk/JC87cmV0dXJuIGZ1bmN0aW9uKGMsZSl7dmFyIGc9XCJcIixmPVtdLGgsbDtlPWV8fFwibWVkaXVtRGF0ZVwiO2U9Yi5EQVRFVElNRV9GT1JNQVRTW2VdfHxlO3coYykmJihjPUdlLnRlc3QoYyk/WShjKTphKGMpKTt2YihjKSYmKGM9bmV3IERhdGUoYykpO2lmKCFOYShjKSlyZXR1cm4gYztmb3IoO2U7KShsPUhlLmV4ZWMoZSkpPyhmPWYuY29uY2F0KHlhLmNhbGwobCwxKSksZT1mLnBvcCgpKTooZi5wdXNoKGUpLGU9bnVsbCk7cShmLGZ1bmN0aW9uKGEpe2g9XG5JZVthXTtnKz1oP2goYyxiLkRBVEVUSU1FX0ZPUk1BVFMpOmEucmVwbGFjZSgvKF4nfCckKS9nLFwiXCIpLnJlcGxhY2UoLycnL2csXCInXCIpfSk7cmV0dXJuIGd9fWZ1bmN0aW9uIENlKCl7cmV0dXJuIGZ1bmN0aW9uKGIpe3JldHVybiBxYShiLCEwKX19ZnVuY3Rpb24gRGUoKXtyZXR1cm4gZnVuY3Rpb24oYixhKXtpZighTShiKSYmIXcoYikpcmV0dXJuIGI7YT1ZKGEpO2lmKHcoYikpcmV0dXJuIGE/MDw9YT9iLnNsaWNlKDAsYSk6Yi5zbGljZShhLGIubGVuZ3RoKTpcIlwiO3ZhciBjPVtdLGQsZTthPmIubGVuZ3RoP2E9Yi5sZW5ndGg6YTwtYi5sZW5ndGgmJihhPS1iLmxlbmd0aCk7MDxhPyhkPTAsZT1hKTooZD1iLmxlbmd0aCthLGU9Yi5sZW5ndGgpO2Zvcig7ZDxlO2QrKyljLnB1c2goYltkXSk7cmV0dXJuIGN9fWZ1bmN0aW9uIExjKGIpe3JldHVybiBmdW5jdGlvbihhLGMsZCl7ZnVuY3Rpb24gZShhLGIpe3JldHVybiBRYShiKT9mdW5jdGlvbihiLGMpe3JldHVybiBhKGMsYil9OmF9XG5mdW5jdGlvbiBnKGEsYil7dmFyIGM9dHlwZW9mIGEsZD10eXBlb2YgYjtyZXR1cm4gYz09ZD8oXCJzdHJpbmdcIj09YyYmKGE9YS50b0xvd2VyQ2FzZSgpLGI9Yi50b0xvd2VyQ2FzZSgpKSxhPT09Yj8wOmE8Yj8tMToxKTpjPGQ/LTE6MX1pZighTShhKXx8IWMpcmV0dXJuIGE7Yz1NKGMpP2M6W2NdO2M9VWMoYyxmdW5jdGlvbihhKXt2YXIgYz0hMSxkPWF8fERhO2lmKHcoYSkpe2lmKFwiK1wiPT1hLmNoYXJBdCgwKXx8XCItXCI9PWEuY2hhckF0KDApKWM9XCItXCI9PWEuY2hhckF0KDApLGE9YS5zdWJzdHJpbmcoMSk7ZD1iKGEpO2lmKGQuY29uc3RhbnQpe3ZhciBmPWQoKTtyZXR1cm4gZShmdW5jdGlvbihhLGIpe3JldHVybiBnKGFbZl0sYltmXSl9LGMpfX1yZXR1cm4gZShmdW5jdGlvbihhLGIpe3JldHVybiBnKGQoYSksZChiKSl9LGMpfSk7Zm9yKHZhciBmPVtdLGg9MDtoPGEubGVuZ3RoO2grKylmLnB1c2goYVtoXSk7cmV0dXJuIGYuc29ydChlKGZ1bmN0aW9uKGEsYil7Zm9yKHZhciBkPVxuMDtkPGMubGVuZ3RoO2QrKyl7dmFyIGU9Y1tkXShhLGIpO2lmKDAhPT1lKXJldHVybiBlfXJldHVybiAwfSxkKSl9fWZ1bmN0aW9uIHZhKGIpe1AoYikmJihiPXtsaW5rOmJ9KTtiLnJlc3RyaWN0PWIucmVzdHJpY3R8fFwiQUNcIjtyZXR1cm4gYWEoYil9ZnVuY3Rpb24gT2MoYixhLGMsZCl7ZnVuY3Rpb24gZShhLGMpe2M9Yz9cIi1cIitmYihjLFwiLVwiKTpcIlwiO2QucmVtb3ZlQ2xhc3MoYiwoYT9xYjpyYikrYyk7ZC5hZGRDbGFzcyhiLChhP3JiOnFiKStjKX12YXIgZz10aGlzLGY9Yi5wYXJlbnQoKS5jb250cm9sbGVyKFwiZm9ybVwiKXx8c2IsaD0wLGw9Zy4kZXJyb3I9e30saz1bXTtnLiRuYW1lPWEubmFtZXx8YS5uZ0Zvcm07Zy4kZGlydHk9ITE7Zy4kcHJpc3RpbmU9ITA7Zy4kdmFsaWQ9ITA7Zy4kaW52YWxpZD0hMTtmLiRhZGRDb250cm9sKGcpO2IuYWRkQ2xhc3MoTGEpO2UoITApO2cuJGFkZENvbnRyb2w9ZnVuY3Rpb24oYSl7QWEoYS4kbmFtZSxcImlucHV0XCIpO2sucHVzaChhKTthLiRuYW1lJiZcbihnW2EuJG5hbWVdPWEpfTtnLiRyZW1vdmVDb250cm9sPWZ1bmN0aW9uKGEpe2EuJG5hbWUmJmdbYS4kbmFtZV09PT1hJiZkZWxldGUgZ1thLiRuYW1lXTtxKGwsZnVuY3Rpb24oYixjKXtnLiRzZXRWYWxpZGl0eShjLCEwLGEpfSk7T2EoayxhKX07Zy4kc2V0VmFsaWRpdHk9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWxbYV07aWYoYilkJiYoT2EoZCxjKSxkLmxlbmd0aHx8KGgtLSxofHwoZShiKSxnLiR2YWxpZD0hMCxnLiRpbnZhbGlkPSExKSxsW2FdPSExLGUoITAsYSksZi4kc2V0VmFsaWRpdHkoYSwhMCxnKSkpO2Vsc2V7aHx8ZShiKTtpZihkKXtpZigtMSE9ZGIoZCxjKSlyZXR1cm59ZWxzZSBsW2FdPWQ9W10saCsrLGUoITEsYSksZi4kc2V0VmFsaWRpdHkoYSwhMSxnKTtkLnB1c2goYyk7Zy4kdmFsaWQ9ITE7Zy4kaW52YWxpZD0hMH19O2cuJHNldERpcnR5PWZ1bmN0aW9uKCl7ZC5yZW1vdmVDbGFzcyhiLExhKTtkLmFkZENsYXNzKGIsdGIpO2cuJGRpcnR5PSEwO2cuJHByaXN0aW5lPVxuITE7Zi4kc2V0RGlydHkoKX07Zy4kc2V0UHJpc3RpbmU9ZnVuY3Rpb24oKXtkLnJlbW92ZUNsYXNzKGIsdGIpO2QuYWRkQ2xhc3MoYixMYSk7Zy4kZGlydHk9ITE7Zy4kcHJpc3RpbmU9ITA7cShrLGZ1bmN0aW9uKGEpe2EuJHNldFByaXN0aW5lKCl9KX19ZnVuY3Rpb24gcGEoYixhLGMsZCl7Yi4kc2V0VmFsaWRpdHkoYSxjKTtyZXR1cm4gYz9kOnN9ZnVuY3Rpb24gSmUoYixhLGMpe3ZhciBkPWMucHJvcChcInZhbGlkaXR5XCIpO1goZCkmJmIuJHBhcnNlcnMucHVzaChmdW5jdGlvbihjKXtpZihiLiRlcnJvclthXXx8IShkLmJhZElucHV0fHxkLmN1c3RvbUVycm9yfHxkLnR5cGVNaXNtYXRjaCl8fGQudmFsdWVNaXNzaW5nKXJldHVybiBjO2IuJHNldFZhbGlkaXR5KGEsITEpfSl9ZnVuY3Rpb24gdWIoYixhLGMsZCxlLGcpe3ZhciBmPWEucHJvcChcInZhbGlkaXR5XCIpO2lmKCFlLmFuZHJvaWQpe3ZhciBoPSExO2Eub24oXCJjb21wb3NpdGlvbnN0YXJ0XCIsZnVuY3Rpb24oYSl7aD0hMH0pO1xuYS5vbihcImNvbXBvc2l0aW9uZW5kXCIsZnVuY3Rpb24oKXtoPSExO2woKX0pfXZhciBsPWZ1bmN0aW9uKCl7aWYoIWgpe3ZhciBlPWEudmFsKCk7UWEoYy5uZ1RyaW18fFwiVFwiKSYmKGU9Y2EoZSkpO2lmKGQuJHZpZXdWYWx1ZSE9PWV8fGYmJlwiXCI9PT1lJiYhZi52YWx1ZU1pc3NpbmcpYi4kJHBoYXNlP2QuJHNldFZpZXdWYWx1ZShlKTpiLiRhcHBseShmdW5jdGlvbigpe2QuJHNldFZpZXdWYWx1ZShlKX0pfX07aWYoZS5oYXNFdmVudChcImlucHV0XCIpKWEub24oXCJpbnB1dFwiLGwpO2Vsc2V7dmFyIGssbT1mdW5jdGlvbigpe2t8fChrPWcuZGVmZXIoZnVuY3Rpb24oKXtsKCk7az1udWxsfSkpfTthLm9uKFwia2V5ZG93blwiLGZ1bmN0aW9uKGEpe2E9YS5rZXlDb2RlOzkxPT09YXx8KDE1PGEmJjE5PmF8fDM3PD1hJiY0MD49YSl8fG0oKX0pO2lmKGUuaGFzRXZlbnQoXCJwYXN0ZVwiKSlhLm9uKFwicGFzdGUgY3V0XCIsbSl9YS5vbihcImNoYW5nZVwiLGwpO2QuJHJlbmRlcj1mdW5jdGlvbigpe2EudmFsKGQuJGlzRW1wdHkoZC4kdmlld1ZhbHVlKT9cblwiXCI6ZC4kdmlld1ZhbHVlKX07dmFyIG49Yy5uZ1BhdHRlcm47biYmKChlPW4ubWF0Y2goL15cXC8oLiopXFwvKFtnaW1dKikkLykpPyhuPVJlZ0V4cChlWzFdLGVbMl0pLGU9ZnVuY3Rpb24oYSl7cmV0dXJuIHBhKGQsXCJwYXR0ZXJuXCIsZC4kaXNFbXB0eShhKXx8bi50ZXN0KGEpLGEpfSk6ZT1mdW5jdGlvbihjKXt2YXIgZT1iLiRldmFsKG4pO2lmKCFlfHwhZS50ZXN0KXRocm93IHQoXCJuZ1BhdHRlcm5cIikoXCJub3JlZ2V4cFwiLG4sZSxoYShhKSk7cmV0dXJuIHBhKGQsXCJwYXR0ZXJuXCIsZC4kaXNFbXB0eShjKXx8ZS50ZXN0KGMpLGMpfSxkLiRmb3JtYXR0ZXJzLnB1c2goZSksZC4kcGFyc2Vycy5wdXNoKGUpKTtpZihjLm5nTWlubGVuZ3RoKXt2YXIgcD1ZKGMubmdNaW5sZW5ndGgpO2U9ZnVuY3Rpb24oYSl7cmV0dXJuIHBhKGQsXCJtaW5sZW5ndGhcIixkLiRpc0VtcHR5KGEpfHxhLmxlbmd0aD49cCxhKX07ZC4kcGFyc2Vycy5wdXNoKGUpO2QuJGZvcm1hdHRlcnMucHVzaChlKX1pZihjLm5nTWF4bGVuZ3RoKXt2YXIgcj1cblkoYy5uZ01heGxlbmd0aCk7ZT1mdW5jdGlvbihhKXtyZXR1cm4gcGEoZCxcIm1heGxlbmd0aFwiLGQuJGlzRW1wdHkoYSl8fGEubGVuZ3RoPD1yLGEpfTtkLiRwYXJzZXJzLnB1c2goZSk7ZC4kZm9ybWF0dGVycy5wdXNoKGUpfX1mdW5jdGlvbiBQYihiLGEpe2I9XCJuZ0NsYXNzXCIrYjtyZXR1cm5bXCIkYW5pbWF0ZVwiLGZ1bmN0aW9uKGMpe2Z1bmN0aW9uIGQoYSxiKXt2YXIgYz1bXSxkPTA7YTpmb3IoO2Q8YS5sZW5ndGg7ZCsrKXtmb3IodmFyIGU9YVtkXSxtPTA7bTxiLmxlbmd0aDttKyspaWYoZT09YlttXSljb250aW51ZSBhO2MucHVzaChlKX1yZXR1cm4gY31mdW5jdGlvbiBlKGEpe2lmKCFNKGEpKXtpZih3KGEpKXJldHVybiBhLnNwbGl0KFwiIFwiKTtpZihYKGEpKXt2YXIgYj1bXTtxKGEsZnVuY3Rpb24oYSxjKXthJiZiLnB1c2goYyl9KTtyZXR1cm4gYn19cmV0dXJuIGF9cmV0dXJue3Jlc3RyaWN0OlwiQUNcIixsaW5rOmZ1bmN0aW9uKGcsZixoKXtmdW5jdGlvbiBsKGEsYil7dmFyIGM9XG5mLmRhdGEoXCIkY2xhc3NDb3VudHNcIil8fHt9LGQ9W107cShhLGZ1bmN0aW9uKGEpe2lmKDA8Ynx8Y1thXSljW2FdPShjW2FdfHwwKStiLGNbYV09PT0rKDA8YikmJmQucHVzaChhKX0pO2YuZGF0YShcIiRjbGFzc0NvdW50c1wiLGMpO3JldHVybiBkLmpvaW4oXCIgXCIpfWZ1bmN0aW9uIGsoYil7aWYoITA9PT1hfHxnLiRpbmRleCUyPT09YSl7dmFyIGs9ZShifHxbXSk7aWYoIW0pe3ZhciByPWwoaywxKTtoLiRhZGRDbGFzcyhyKX1lbHNlIGlmKCF4YShiLG0pKXt2YXIgcT1lKG0pLHI9ZChrLHEpLGs9ZChxLGspLGs9bChrLC0xKSxyPWwociwxKTswPT09ci5sZW5ndGg/Yy5yZW1vdmVDbGFzcyhmLGspOjA9PT1rLmxlbmd0aD9jLmFkZENsYXNzKGYscik6Yy5zZXRDbGFzcyhmLHIsayl9fW09YmEoYil9dmFyIG07Zy4kd2F0Y2goaFtiXSxrLCEwKTtoLiRvYnNlcnZlKFwiY2xhc3NcIixmdW5jdGlvbihhKXtrKGcuJGV2YWwoaFtiXSkpfSk7XCJuZ0NsYXNzXCIhPT1iJiZnLiR3YXRjaChcIiRpbmRleFwiLFxuZnVuY3Rpb24oYyxkKXt2YXIgZj1jJjE7aWYoZiE9PWQmMSl7dmFyIGs9ZShnLiRldmFsKGhbYl0pKTtmPT09YT8oZj1sKGssMSksaC4kYWRkQ2xhc3MoZikpOihmPWwoaywtMSksaC4kcmVtb3ZlQ2xhc3MoZikpfX0pfX19XX12YXIgSz1mdW5jdGlvbihiKXtyZXR1cm4gdyhiKT9iLnRvTG93ZXJDYXNlKCk6Yn0sRmM9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxGYT1mdW5jdGlvbihiKXtyZXR1cm4gdyhiKT9iLnRvVXBwZXJDYXNlKCk6Yn0sUyx5LEdhLHlhPVtdLnNsaWNlLEtlPVtdLnB1c2gsd2E9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxQYT10KFwibmdcIiksRWE9Ty5hbmd1bGFyfHwoTy5hbmd1bGFyPXt9KSxTYSxLYSxrYT1bXCIwXCIsXCIwXCIsXCIwXCJdO1M9WSgoL21zaWUgKFxcZCspLy5leGVjKEsobmF2aWdhdG9yLnVzZXJBZ2VudCkpfHxbXSlbMV0pO2lzTmFOKFMpJiYoUz1ZKCgvdHJpZGVudFxcLy4qOyBydjooXFxkKykvLmV4ZWMoSyhuYXZpZ2F0b3IudXNlckFnZW50KSl8fFxuW10pWzFdKSk7Qy4kaW5qZWN0PVtdO0RhLiRpbmplY3Q9W107dmFyIGNhPWZ1bmN0aW9uKCl7cmV0dXJuIFN0cmluZy5wcm90b3R5cGUudHJpbT9mdW5jdGlvbihiKXtyZXR1cm4gdyhiKT9iLnRyaW0oKTpifTpmdW5jdGlvbihiKXtyZXR1cm4gdyhiKT9iLnJlcGxhY2UoL15cXHNcXHMqLyxcIlwiKS5yZXBsYWNlKC9cXHNcXHMqJC8sXCJcIik6Yn19KCk7S2E9OT5TP2Z1bmN0aW9uKGIpe2I9Yi5ub2RlTmFtZT9iOmJbMF07cmV0dXJuIGIuc2NvcGVOYW1lJiZcIkhUTUxcIiE9Yi5zY29wZU5hbWU/RmEoYi5zY29wZU5hbWUrXCI6XCIrYi5ub2RlTmFtZSk6Yi5ub2RlTmFtZX06ZnVuY3Rpb24oYil7cmV0dXJuIGIubm9kZU5hbWU/Yi5ub2RlTmFtZTpiWzBdLm5vZGVOYW1lfTt2YXIgWGM9L1tBLVpdL2csJGM9e2Z1bGw6XCIxLjIuMTZcIixtYWpvcjoxLG1pbm9yOjIsZG90OjE2LGNvZGVOYW1lOlwiYmFkZ2VyLWVudW1lcmF0aW9uXCJ9LFVhPU4uY2FjaGU9e30sZ2I9Ti5leHBhbmRvPVwibmctXCIrKG5ldyBEYXRlKS5nZXRUaW1lKCksXG5tZT0xLFBjPU8uZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcj9mdW5jdGlvbihiLGEsYyl7Yi5hZGRFdmVudExpc3RlbmVyKGEsYywhMSl9OmZ1bmN0aW9uKGIsYSxjKXtiLmF0dGFjaEV2ZW50KFwib25cIithLGMpfSxGYj1PLmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXI/ZnVuY3Rpb24oYixhLGMpe2IucmVtb3ZlRXZlbnRMaXN0ZW5lcihhLGMsITEpfTpmdW5jdGlvbihiLGEsYyl7Yi5kZXRhY2hFdmVudChcIm9uXCIrYSxjKX07Ti5fZGF0YT1mdW5jdGlvbihiKXtyZXR1cm4gdGhpcy5jYWNoZVtiW3RoaXMuZXhwYW5kb11dfHx7fX07dmFyIGhlPS8oW1xcOlxcLVxcX10rKC4pKS9nLGllPS9ebW96KFtBLVpdKS8sQmI9dChcImpxTGl0ZVwiKSxqZT0vXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8sQ2I9Lzx8JiM/XFx3KzsvLGtlPS88KFtcXHc6XSspLyxsZT0vPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbXFx3Ol0rKVtePl0qKVxcLz4vZ2ksZWE9XG57b3B0aW9uOlsxLCc8c2VsZWN0IG11bHRpcGxlPVwibXVsdGlwbGVcIj4nLFwiPC9zZWxlY3Q+XCJdLHRoZWFkOlsxLFwiPHRhYmxlPlwiLFwiPC90YWJsZT5cIl0sY29sOlsyLFwiPHRhYmxlPjxjb2xncm91cD5cIixcIjwvY29sZ3JvdXA+PC90YWJsZT5cIl0sdHI6WzIsXCI8dGFibGU+PHRib2R5PlwiLFwiPC90Ym9keT48L3RhYmxlPlwiXSx0ZDpbMyxcIjx0YWJsZT48dGJvZHk+PHRyPlwiLFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCJdLF9kZWZhdWx0OlswLFwiXCIsXCJcIl19O2VhLm9wdGdyb3VwPWVhLm9wdGlvbjtlYS50Ym9keT1lYS50Zm9vdD1lYS5jb2xncm91cD1lYS5jYXB0aW9uPWVhLnRoZWFkO2VhLnRoPWVhLnRkO3ZhciBKYT1OLnByb3RvdHlwZT17cmVhZHk6ZnVuY3Rpb24oYil7ZnVuY3Rpb24gYSgpe2N8fChjPSEwLGIoKSl9dmFyIGM9ITE7XCJjb21wbGV0ZVwiPT09VS5yZWFkeVN0YXRlP3NldFRpbWVvdXQoYSk6KHRoaXMub24oXCJET01Db250ZW50TG9hZGVkXCIsYSksTihPKS5vbihcImxvYWRcIixhKSl9LHRvU3RyaW5nOmZ1bmN0aW9uKCl7dmFyIGI9XG5bXTtxKHRoaXMsZnVuY3Rpb24oYSl7Yi5wdXNoKFwiXCIrYSl9KTtyZXR1cm5cIltcIitiLmpvaW4oXCIsIFwiKStcIl1cIn0sZXE6ZnVuY3Rpb24oYil7cmV0dXJuIDA8PWI/eSh0aGlzW2JdKTp5KHRoaXNbdGhpcy5sZW5ndGgrYl0pfSxsZW5ndGg6MCxwdXNoOktlLHNvcnQ6W10uc29ydCxzcGxpY2U6W10uc3BsaWNlfSxrYj17fTtxKFwibXVsdGlwbGUgc2VsZWN0ZWQgY2hlY2tlZCBkaXNhYmxlZCByZWFkT25seSByZXF1aXJlZCBvcGVuXCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGIpe2tiW0soYildPWJ9KTt2YXIgbmM9e307cShcImlucHV0IHNlbGVjdCBvcHRpb24gdGV4dGFyZWEgYnV0dG9uIGZvcm0gZGV0YWlsc1wiLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihiKXtuY1tGYShiKV09ITB9KTtxKHtkYXRhOmpjLGluaGVyaXRlZERhdGE6amIsc2NvcGU6ZnVuY3Rpb24oYil7cmV0dXJuIHkoYikuZGF0YShcIiRzY29wZVwiKXx8amIoYi5wYXJlbnROb2RlfHxiLFtcIiRpc29sYXRlU2NvcGVcIixcIiRzY29wZVwiXSl9LFxuaXNvbGF0ZVNjb3BlOmZ1bmN0aW9uKGIpe3JldHVybiB5KGIpLmRhdGEoXCIkaXNvbGF0ZVNjb3BlXCIpfHx5KGIpLmRhdGEoXCIkaXNvbGF0ZVNjb3BlTm9UZW1wbGF0ZVwiKX0sY29udHJvbGxlcjprYyxpbmplY3RvcjpmdW5jdGlvbihiKXtyZXR1cm4gamIoYixcIiRpbmplY3RvclwiKX0scmVtb3ZlQXR0cjpmdW5jdGlvbihiLGEpe2IucmVtb3ZlQXR0cmlidXRlKGEpfSxoYXNDbGFzczpHYixjc3M6ZnVuY3Rpb24oYixhLGMpe2E9VGEoYSk7aWYoQihjKSliLnN0eWxlW2FdPWM7ZWxzZXt2YXIgZDs4Pj1TJiYoZD1iLmN1cnJlbnRTdHlsZSYmYi5jdXJyZW50U3R5bGVbYV0sXCJcIj09PWQmJihkPVwiYXV0b1wiKSk7ZD1kfHxiLnN0eWxlW2FdOzg+PVMmJihkPVwiXCI9PT1kP3M6ZCk7cmV0dXJuIGR9fSxhdHRyOmZ1bmN0aW9uKGIsYSxjKXt2YXIgZD1LKGEpO2lmKGtiW2RdKWlmKEIoYykpYz8oYlthXT0hMCxiLnNldEF0dHJpYnV0ZShhLGQpKTooYlthXT0hMSxiLnJlbW92ZUF0dHJpYnV0ZShkKSk7XG5lbHNlIHJldHVybiBiW2FdfHwoYi5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbShhKXx8Qykuc3BlY2lmaWVkP2Q6cztlbHNlIGlmKEIoYykpYi5zZXRBdHRyaWJ1dGUoYSxjKTtlbHNlIGlmKGIuZ2V0QXR0cmlidXRlKXJldHVybiBiPWIuZ2V0QXR0cmlidXRlKGEsMiksbnVsbD09PWI/czpifSxwcm9wOmZ1bmN0aW9uKGIsYSxjKXtpZihCKGMpKWJbYV09YztlbHNlIHJldHVybiBiW2FdfSx0ZXh0OmZ1bmN0aW9uKCl7ZnVuY3Rpb24gYihiLGQpe3ZhciBlPWFbYi5ub2RlVHlwZV07aWYoRShkKSlyZXR1cm4gZT9iW2VdOlwiXCI7YltlXT1kfXZhciBhPVtdOzk+Uz8oYVsxXT1cImlubmVyVGV4dFwiLGFbM109XCJub2RlVmFsdWVcIik6YVsxXT1hWzNdPVwidGV4dENvbnRlbnRcIjtiLiRkdj1cIlwiO3JldHVybiBifSgpLHZhbDpmdW5jdGlvbihiLGEpe2lmKEUoYSkpe2lmKFwiU0VMRUNUXCI9PT1LYShiKSYmYi5tdWx0aXBsZSl7dmFyIGM9W107cShiLm9wdGlvbnMsZnVuY3Rpb24oYSl7YS5zZWxlY3RlZCYmXG5jLnB1c2goYS52YWx1ZXx8YS50ZXh0KX0pO3JldHVybiAwPT09Yy5sZW5ndGg/bnVsbDpjfXJldHVybiBiLnZhbHVlfWIudmFsdWU9YX0saHRtbDpmdW5jdGlvbihiLGEpe2lmKEUoYSkpcmV0dXJuIGIuaW5uZXJIVE1MO2Zvcih2YXIgYz0wLGQ9Yi5jaGlsZE5vZGVzO2M8ZC5sZW5ndGg7YysrKUhhKGRbY10pO2IuaW5uZXJIVE1MPWF9LGVtcHR5OmxjfSxmdW5jdGlvbihiLGEpe04ucHJvdG90eXBlW2FdPWZ1bmN0aW9uKGEsZCl7dmFyIGUsZztpZihiIT09bGMmJigyPT1iLmxlbmd0aCYmYiE9PUdiJiZiIT09a2M/YTpkKT09PXMpe2lmKFgoYSkpe2ZvcihlPTA7ZTx0aGlzLmxlbmd0aDtlKyspaWYoYj09PWpjKWIodGhpc1tlXSxhKTtlbHNlIGZvcihnIGluIGEpYih0aGlzW2VdLGcsYVtnXSk7cmV0dXJuIHRoaXN9ZT1iLiRkdjtnPWU9PT1zP01hdGgubWluKHRoaXMubGVuZ3RoLDEpOnRoaXMubGVuZ3RoO2Zvcih2YXIgZj0wO2Y8ZztmKyspe3ZhciBoPWIodGhpc1tmXSxhLGQpO2U9XG5lP2UraDpofXJldHVybiBlfWZvcihlPTA7ZTx0aGlzLmxlbmd0aDtlKyspYih0aGlzW2VdLGEsZCk7cmV0dXJuIHRoaXN9fSk7cSh7cmVtb3ZlRGF0YTpoYyxkZWFsb2M6SGEsb246ZnVuY3Rpb24gYShjLGQsZSxnKXtpZihCKGcpKXRocm93IEJiKFwib25hcmdzXCIpO3ZhciBmPWxhKGMsXCJldmVudHNcIiksaD1sYShjLFwiaGFuZGxlXCIpO2Z8fGxhKGMsXCJldmVudHNcIixmPXt9KTtofHxsYShjLFwiaGFuZGxlXCIsaD1uZShjLGYpKTtxKGQuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGQpe3ZhciBnPWZbZF07aWYoIWcpe2lmKFwibW91c2VlbnRlclwiPT1kfHxcIm1vdXNlbGVhdmVcIj09ZCl7dmFyIG09VS5ib2R5LmNvbnRhaW5zfHxVLmJvZHkuY29tcGFyZURvY3VtZW50UG9zaXRpb24/ZnVuY3Rpb24oYSxjKXt2YXIgZD05PT09YS5ub2RlVHlwZT9hLmRvY3VtZW50RWxlbWVudDphLGU9YyYmYy5wYXJlbnROb2RlO3JldHVybiBhPT09ZXx8ISEoZSYmMT09PWUubm9kZVR5cGUmJihkLmNvbnRhaW5zP2QuY29udGFpbnMoZSk6XG5hLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uJiZhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGUpJjE2KSl9OmZ1bmN0aW9uKGEsYyl7aWYoYylmb3IoO2M9Yy5wYXJlbnROb2RlOylpZihjPT09YSlyZXR1cm4hMDtyZXR1cm4hMX07ZltkXT1bXTthKGMse21vdXNlbGVhdmU6XCJtb3VzZW91dFwiLG1vdXNlZW50ZXI6XCJtb3VzZW92ZXJcIn1bZF0sZnVuY3Rpb24oYSl7dmFyIGM9YS5yZWxhdGVkVGFyZ2V0O2MmJihjPT09dGhpc3x8bSh0aGlzLGMpKXx8aChhLGQpfSl9ZWxzZSBQYyhjLGQsaCksZltkXT1bXTtnPWZbZF19Zy5wdXNoKGUpfSl9LG9mZjppYyxvbmU6ZnVuY3Rpb24oYSxjLGQpe2E9eShhKTthLm9uKGMsZnVuY3Rpb24gZygpe2Eub2ZmKGMsZCk7YS5vZmYoYyxnKX0pO2Eub24oYyxkKX0scmVwbGFjZVdpdGg6ZnVuY3Rpb24oYSxjKXt2YXIgZCxlPWEucGFyZW50Tm9kZTtIYShhKTtxKG5ldyBOKGMpLGZ1bmN0aW9uKGMpe2Q/ZS5pbnNlcnRCZWZvcmUoYyxkLm5leHRTaWJsaW5nKTpcbmUucmVwbGFjZUNoaWxkKGMsYSk7ZD1jfSl9LGNoaWxkcmVuOmZ1bmN0aW9uKGEpe3ZhciBjPVtdO3EoYS5jaGlsZE5vZGVzLGZ1bmN0aW9uKGEpezE9PT1hLm5vZGVUeXBlJiZjLnB1c2goYSl9KTtyZXR1cm4gY30sY29udGVudHM6ZnVuY3Rpb24oYSl7cmV0dXJuIGEuY29udGVudERvY3VtZW50fHxhLmNoaWxkTm9kZXN8fFtdfSxhcHBlbmQ6ZnVuY3Rpb24oYSxjKXtxKG5ldyBOKGMpLGZ1bmN0aW9uKGMpezEhPT1hLm5vZGVUeXBlJiYxMSE9PWEubm9kZVR5cGV8fGEuYXBwZW5kQ2hpbGQoYyl9KX0scHJlcGVuZDpmdW5jdGlvbihhLGMpe2lmKDE9PT1hLm5vZGVUeXBlKXt2YXIgZD1hLmZpcnN0Q2hpbGQ7cShuZXcgTihjKSxmdW5jdGlvbihjKXthLmluc2VydEJlZm9yZShjLGQpfSl9fSx3cmFwOmZ1bmN0aW9uKGEsYyl7Yz15KGMpWzBdO3ZhciBkPWEucGFyZW50Tm9kZTtkJiZkLnJlcGxhY2VDaGlsZChjLGEpO2MuYXBwZW5kQ2hpbGQoYSl9LHJlbW92ZTpmdW5jdGlvbihhKXtIYShhKTtcbnZhciBjPWEucGFyZW50Tm9kZTtjJiZjLnJlbW92ZUNoaWxkKGEpfSxhZnRlcjpmdW5jdGlvbihhLGMpe3ZhciBkPWEsZT1hLnBhcmVudE5vZGU7cShuZXcgTihjKSxmdW5jdGlvbihhKXtlLmluc2VydEJlZm9yZShhLGQubmV4dFNpYmxpbmcpO2Q9YX0pfSxhZGRDbGFzczppYixyZW1vdmVDbGFzczpoYix0b2dnbGVDbGFzczpmdW5jdGlvbihhLGMsZCl7YyYmcShjLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihjKXt2YXIgZz1kO0UoZykmJihnPSFHYihhLGMpKTsoZz9pYjpoYikoYSxjKX0pfSxwYXJlbnQ6ZnVuY3Rpb24oYSl7cmV0dXJuKGE9YS5wYXJlbnROb2RlKSYmMTEhPT1hLm5vZGVUeXBlP2E6bnVsbH0sbmV4dDpmdW5jdGlvbihhKXtpZihhLm5leHRFbGVtZW50U2libGluZylyZXR1cm4gYS5uZXh0RWxlbWVudFNpYmxpbmc7Zm9yKGE9YS5uZXh0U2libGluZztudWxsIT1hJiYxIT09YS5ub2RlVHlwZTspYT1hLm5leHRTaWJsaW5nO3JldHVybiBhfSxmaW5kOmZ1bmN0aW9uKGEsYyl7cmV0dXJuIGEuZ2V0RWxlbWVudHNCeVRhZ05hbWU/XG5hLmdldEVsZW1lbnRzQnlUYWdOYW1lKGMpOltdfSxjbG9uZTpFYix0cmlnZ2VySGFuZGxlcjpmdW5jdGlvbihhLGMsZCl7Yz0obGEoYSxcImV2ZW50c1wiKXx8e30pW2NdO2Q9ZHx8W107dmFyIGU9W3twcmV2ZW50RGVmYXVsdDpDLHN0b3BQcm9wYWdhdGlvbjpDfV07cShjLGZ1bmN0aW9uKGMpe2MuYXBwbHkoYSxlLmNvbmNhdChkKSl9KX19LGZ1bmN0aW9uKGEsYyl7Ti5wcm90b3R5cGVbY109ZnVuY3Rpb24oYyxlLGcpe2Zvcih2YXIgZixoPTA7aDx0aGlzLmxlbmd0aDtoKyspRShmKT8oZj1hKHRoaXNbaF0sYyxlLGcpLEIoZikmJihmPXkoZikpKTpEYihmLGEodGhpc1toXSxjLGUsZykpO3JldHVybiBCKGYpP2Y6dGhpc307Ti5wcm90b3R5cGUuYmluZD1OLnByb3RvdHlwZS5vbjtOLnByb3RvdHlwZS51bmJpbmQ9Ti5wcm90b3R5cGUub2ZmfSk7VmEucHJvdG90eXBlPXtwdXQ6ZnVuY3Rpb24oYSxjKXt0aGlzW0lhKGEpXT1jfSxnZXQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXNbSWEoYSldfSxcbnJlbW92ZTpmdW5jdGlvbihhKXt2YXIgYz10aGlzW2E9SWEoYSldO2RlbGV0ZSB0aGlzW2FdO3JldHVybiBjfX07dmFyIHBlPS9eZnVuY3Rpb25cXHMqW15cXChdKlxcKFxccyooW15cXCldKilcXCkvbSxxZT0vLC8scmU9L15cXHMqKF8/KShcXFMrPylcXDFcXHMqJC8sb2U9LygoXFwvXFwvLiokKXwoXFwvXFwqW1xcc1xcU10qP1xcKlxcLykpL21nLFdhPXQoXCIkaW5qZWN0b3JcIiksTGU9dChcIiRhbmltYXRlXCIpLExkPVtcIiRwcm92aWRlXCIsZnVuY3Rpb24oYSl7dGhpcy4kJHNlbGVjdG9ycz17fTt0aGlzLnJlZ2lzdGVyPWZ1bmN0aW9uKGMsZCl7dmFyIGU9YytcIi1hbmltYXRpb25cIjtpZihjJiZcIi5cIiE9Yy5jaGFyQXQoMCkpdGhyb3cgTGUoXCJub3Rjc2VsXCIsYyk7dGhpcy4kJHNlbGVjdG9yc1tjLnN1YnN0cigxKV09ZTthLmZhY3RvcnkoZSxkKX07dGhpcy5jbGFzc05hbWVGaWx0ZXI9ZnVuY3Rpb24oYSl7MT09PWFyZ3VtZW50cy5sZW5ndGgmJih0aGlzLiQkY2xhc3NOYW1lRmlsdGVyPWEgaW5zdGFuY2VvZiBSZWdFeHA/XG5hOm51bGwpO3JldHVybiB0aGlzLiQkY2xhc3NOYW1lRmlsdGVyfTt0aGlzLiRnZXQ9W1wiJHRpbWVvdXRcIixcIiQkYXN5bmNDYWxsYmFja1wiLGZ1bmN0aW9uKGEsZCl7cmV0dXJue2VudGVyOmZ1bmN0aW9uKGEsYyxmLGgpe2Y/Zi5hZnRlcihhKTooYyYmY1swXXx8KGM9Zi5wYXJlbnQoKSksYy5hcHBlbmQoYSkpO2gmJmQoaCl9LGxlYXZlOmZ1bmN0aW9uKGEsYyl7YS5yZW1vdmUoKTtjJiZkKGMpfSxtb3ZlOmZ1bmN0aW9uKGEsYyxkLGgpe3RoaXMuZW50ZXIoYSxjLGQsaCl9LGFkZENsYXNzOmZ1bmN0aW9uKGEsYyxmKXtjPXcoYyk/YzpNKGMpP2Muam9pbihcIiBcIik6XCJcIjtxKGEsZnVuY3Rpb24oYSl7aWIoYSxjKX0pO2YmJmQoZil9LHJlbW92ZUNsYXNzOmZ1bmN0aW9uKGEsYyxmKXtjPXcoYyk/YzpNKGMpP2Muam9pbihcIiBcIik6XCJcIjtxKGEsZnVuY3Rpb24oYSl7aGIoYSxjKX0pO2YmJmQoZil9LHNldENsYXNzOmZ1bmN0aW9uKGEsYyxmLGgpe3EoYSxmdW5jdGlvbihhKXtpYihhLGMpO2hiKGEsXG5mKX0pO2gmJmQoaCl9LGVuYWJsZWQ6Q319XX1dLGphPXQoXCIkY29tcGlsZVwiKTtjYy4kaW5qZWN0PVtcIiRwcm92aWRlXCIsXCIkJHNhbml0aXplVXJpUHJvdmlkZXJcIl07dmFyIHRlPS9eKHhbXFw6XFwtX118ZGF0YVtcXDpcXC1fXSkvaSx2Yz10KFwiJGludGVycG9sYXRlXCIpLE1lPS9eKFteXFw/I10qKShcXD8oW14jXSopKT8oIyguKikpPyQvLHdlPXtodHRwOjgwLGh0dHBzOjQ0MyxmdHA6MjF9LEtiPXQoXCIkbG9jYXRpb25cIik7QWMucHJvdG90eXBlPUxiLnByb3RvdHlwZT16Yy5wcm90b3R5cGU9eyQkaHRtbDU6ITEsJCRyZXBsYWNlOiExLGFic1VybDpuYihcIiQkYWJzVXJsXCIpLHVybDpmdW5jdGlvbihhLGMpe2lmKEUoYSkpcmV0dXJuIHRoaXMuJCR1cmw7dmFyIGQ9TWUuZXhlYyhhKTtkWzFdJiZ0aGlzLnBhdGgoZGVjb2RlVVJJQ29tcG9uZW50KGRbMV0pKTsoZFsyXXx8ZFsxXSkmJnRoaXMuc2VhcmNoKGRbM118fFwiXCIpO3RoaXMuaGFzaChkWzVdfHxcIlwiLGMpO3JldHVybiB0aGlzfSxwcm90b2NvbDpuYihcIiQkcHJvdG9jb2xcIiksXG5ob3N0Om5iKFwiJCRob3N0XCIpLHBvcnQ6bmIoXCIkJHBvcnRcIikscGF0aDpCYyhcIiQkcGF0aFwiLGZ1bmN0aW9uKGEpe3JldHVyblwiL1wiPT1hLmNoYXJBdCgwKT9hOlwiL1wiK2F9KSxzZWFyY2g6ZnVuY3Rpb24oYSxjKXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAwOnJldHVybiB0aGlzLiQkc2VhcmNoO2Nhc2UgMTppZih3KGEpKXRoaXMuJCRzZWFyY2g9WWIoYSk7ZWxzZSBpZihYKGEpKXRoaXMuJCRzZWFyY2g9YTtlbHNlIHRocm93IEtiKFwiaXNyY2hhcmdcIik7YnJlYWs7ZGVmYXVsdDpFKGMpfHxudWxsPT09Yz9kZWxldGUgdGhpcy4kJHNlYXJjaFthXTp0aGlzLiQkc2VhcmNoW2FdPWN9dGhpcy4kJGNvbXBvc2UoKTtyZXR1cm4gdGhpc30saGFzaDpCYyhcIiQkaGFzaFwiLERhKSxyZXBsYWNlOmZ1bmN0aW9uKCl7dGhpcy4kJHJlcGxhY2U9ITA7cmV0dXJuIHRoaXN9fTt2YXIgQmE9dChcIiRwYXJzZVwiKSxFYz17fSx0YSxNYT17XCJudWxsXCI6ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbH0sXCJ0cnVlXCI6ZnVuY3Rpb24oKXtyZXR1cm4hMH0sXG5cImZhbHNlXCI6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sdW5kZWZpbmVkOkMsXCIrXCI6ZnVuY3Rpb24oYSxjLGQsZSl7ZD1kKGEsYyk7ZT1lKGEsYyk7cmV0dXJuIEIoZCk/QihlKT9kK2U6ZDpCKGUpP2U6c30sXCItXCI6ZnVuY3Rpb24oYSxjLGQsZSl7ZD1kKGEsYyk7ZT1lKGEsYyk7cmV0dXJuKEIoZCk/ZDowKS0oQihlKT9lOjApfSxcIipcIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpKmUoYSxjKX0sXCIvXCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKS9lKGEsYyl9LFwiJVwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYyklZShhLGMpfSxcIl5cIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpXmUoYSxjKX0sXCI9XCI6QyxcIj09PVwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYyk9PT1lKGEsYyl9LFwiIT09XCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKSE9PWUoYSxjKX0sXCI9PVwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYyk9PWUoYSxcbmMpfSxcIiE9XCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKSE9ZShhLGMpfSxcIjxcIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpPGUoYSxjKX0sXCI+XCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKT5lKGEsYyl9LFwiPD1cIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpPD1lKGEsYyl9LFwiPj1cIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpPj1lKGEsYyl9LFwiJiZcIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpJiZlKGEsYyl9LFwifHxcIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpfHxlKGEsYyl9LFwiJlwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYykmZShhLGMpfSxcInxcIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZShhLGMpKGEsYyxkKGEsYykpfSxcIiFcIjpmdW5jdGlvbihhLGMsZCl7cmV0dXJuIWQoYSxjKX19LE5lPXtuOlwiXFxuXCIsZjpcIlxcZlwiLHI6XCJcXHJcIix0OlwiXFx0XCIsdjpcIlxcdlwiLFwiJ1wiOlwiJ1wiLCdcIic6J1wiJ30sXG5OYj1mdW5jdGlvbihhKXt0aGlzLm9wdGlvbnM9YX07TmIucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpOYixsZXg6ZnVuY3Rpb24oYSl7dGhpcy50ZXh0PWE7dGhpcy5pbmRleD0wO3RoaXMuY2g9czt0aGlzLmxhc3RDaD1cIjpcIjt0aGlzLnRva2Vucz1bXTt2YXIgYztmb3IoYT1bXTt0aGlzLmluZGV4PHRoaXMudGV4dC5sZW5ndGg7KXt0aGlzLmNoPXRoaXMudGV4dC5jaGFyQXQodGhpcy5pbmRleCk7aWYodGhpcy5pcyhcIlxcXCInXCIpKXRoaXMucmVhZFN0cmluZyh0aGlzLmNoKTtlbHNlIGlmKHRoaXMuaXNOdW1iZXIodGhpcy5jaCl8fHRoaXMuaXMoXCIuXCIpJiZ0aGlzLmlzTnVtYmVyKHRoaXMucGVlaygpKSl0aGlzLnJlYWROdW1iZXIoKTtlbHNlIGlmKHRoaXMuaXNJZGVudCh0aGlzLmNoKSl0aGlzLnJlYWRJZGVudCgpLHRoaXMud2FzKFwieyxcIikmJihcIntcIj09PWFbMF0mJihjPXRoaXMudG9rZW5zW3RoaXMudG9rZW5zLmxlbmd0aC0xXSkpJiYoYy5qc29uPS0xPT09Yy50ZXh0LmluZGV4T2YoXCIuXCIpKTtcbmVsc2UgaWYodGhpcy5pcyhcIigpe31bXS4sOzo/XCIpKXRoaXMudG9rZW5zLnB1c2goe2luZGV4OnRoaXMuaW5kZXgsdGV4dDp0aGlzLmNoLGpzb246dGhpcy53YXMoXCI6WyxcIikmJnRoaXMuaXMoXCJ7W1wiKXx8dGhpcy5pcyhcIn1dOixcIil9KSx0aGlzLmlzKFwie1tcIikmJmEudW5zaGlmdCh0aGlzLmNoKSx0aGlzLmlzKFwifV1cIikmJmEuc2hpZnQoKSx0aGlzLmluZGV4Kys7ZWxzZSBpZih0aGlzLmlzV2hpdGVzcGFjZSh0aGlzLmNoKSl7dGhpcy5pbmRleCsrO2NvbnRpbnVlfWVsc2V7dmFyIGQ9dGhpcy5jaCt0aGlzLnBlZWsoKSxlPWQrdGhpcy5wZWVrKDIpLGc9TWFbdGhpcy5jaF0sZj1NYVtkXSxoPU1hW2VdO2g/KHRoaXMudG9rZW5zLnB1c2goe2luZGV4OnRoaXMuaW5kZXgsdGV4dDplLGZuOmh9KSx0aGlzLmluZGV4Kz0zKTpmPyh0aGlzLnRva2Vucy5wdXNoKHtpbmRleDp0aGlzLmluZGV4LHRleHQ6ZCxmbjpmfSksdGhpcy5pbmRleCs9Mik6Zz8odGhpcy50b2tlbnMucHVzaCh7aW5kZXg6dGhpcy5pbmRleCxcbnRleHQ6dGhpcy5jaCxmbjpnLGpzb246dGhpcy53YXMoXCJbLDpcIikmJnRoaXMuaXMoXCIrLVwiKX0pLHRoaXMuaW5kZXgrPTEpOnRoaXMudGhyb3dFcnJvcihcIlVuZXhwZWN0ZWQgbmV4dCBjaGFyYWN0ZXIgXCIsdGhpcy5pbmRleCx0aGlzLmluZGV4KzEpfXRoaXMubGFzdENoPXRoaXMuY2h9cmV0dXJuIHRoaXMudG9rZW5zfSxpczpmdW5jdGlvbihhKXtyZXR1cm4tMSE9PWEuaW5kZXhPZih0aGlzLmNoKX0sd2FzOmZ1bmN0aW9uKGEpe3JldHVybi0xIT09YS5pbmRleE9mKHRoaXMubGFzdENoKX0scGVlazpmdW5jdGlvbihhKXthPWF8fDE7cmV0dXJuIHRoaXMuaW5kZXgrYTx0aGlzLnRleHQubGVuZ3RoP3RoaXMudGV4dC5jaGFyQXQodGhpcy5pbmRleCthKTohMX0saXNOdW1iZXI6ZnVuY3Rpb24oYSl7cmV0dXJuXCIwXCI8PWEmJlwiOVwiPj1hfSxpc1doaXRlc3BhY2U6ZnVuY3Rpb24oYSl7cmV0dXJuXCIgXCI9PT1hfHxcIlxcclwiPT09YXx8XCJcXHRcIj09PWF8fFwiXFxuXCI9PT1hfHxcIlxcdlwiPT09YXx8XCJcXHUwMGEwXCI9PT1cbmF9LGlzSWRlbnQ6ZnVuY3Rpb24oYSl7cmV0dXJuXCJhXCI8PWEmJlwielwiPj1hfHxcIkFcIjw9YSYmXCJaXCI+PWF8fFwiX1wiPT09YXx8XCIkXCI9PT1hfSxpc0V4cE9wZXJhdG9yOmZ1bmN0aW9uKGEpe3JldHVyblwiLVwiPT09YXx8XCIrXCI9PT1hfHx0aGlzLmlzTnVtYmVyKGEpfSx0aHJvd0Vycm9yOmZ1bmN0aW9uKGEsYyxkKXtkPWR8fHRoaXMuaW5kZXg7Yz1CKGMpP1wicyBcIitjK1wiLVwiK3RoaXMuaW5kZXgrXCIgW1wiK3RoaXMudGV4dC5zdWJzdHJpbmcoYyxkKStcIl1cIjpcIiBcIitkO3Rocm93IEJhKFwibGV4ZXJyXCIsYSxjLHRoaXMudGV4dCk7fSxyZWFkTnVtYmVyOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPVwiXCIsYz10aGlzLmluZGV4O3RoaXMuaW5kZXg8dGhpcy50ZXh0Lmxlbmd0aDspe3ZhciBkPUsodGhpcy50ZXh0LmNoYXJBdCh0aGlzLmluZGV4KSk7aWYoXCIuXCI9PWR8fHRoaXMuaXNOdW1iZXIoZCkpYSs9ZDtlbHNle3ZhciBlPXRoaXMucGVlaygpO2lmKFwiZVwiPT1kJiZ0aGlzLmlzRXhwT3BlcmF0b3IoZSkpYSs9XG5kO2Vsc2UgaWYodGhpcy5pc0V4cE9wZXJhdG9yKGQpJiZlJiZ0aGlzLmlzTnVtYmVyKGUpJiZcImVcIj09YS5jaGFyQXQoYS5sZW5ndGgtMSkpYSs9ZDtlbHNlIGlmKCF0aGlzLmlzRXhwT3BlcmF0b3IoZCl8fGUmJnRoaXMuaXNOdW1iZXIoZSl8fFwiZVwiIT1hLmNoYXJBdChhLmxlbmd0aC0xKSlicmVhaztlbHNlIHRoaXMudGhyb3dFcnJvcihcIkludmFsaWQgZXhwb25lbnRcIil9dGhpcy5pbmRleCsrfWEqPTE7dGhpcy50b2tlbnMucHVzaCh7aW5kZXg6Yyx0ZXh0OmEsanNvbjohMCxmbjpmdW5jdGlvbigpe3JldHVybiBhfX0pfSxyZWFkSWRlbnQ6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcyxjPVwiXCIsZD10aGlzLmluZGV4LGUsZyxmLGg7dGhpcy5pbmRleDx0aGlzLnRleHQubGVuZ3RoOyl7aD10aGlzLnRleHQuY2hhckF0KHRoaXMuaW5kZXgpO2lmKFwiLlwiPT09aHx8dGhpcy5pc0lkZW50KGgpfHx0aGlzLmlzTnVtYmVyKGgpKVwiLlwiPT09aCYmKGU9dGhpcy5pbmRleCksYys9aDtlbHNlIGJyZWFrO1xudGhpcy5pbmRleCsrfWlmKGUpZm9yKGc9dGhpcy5pbmRleDtnPHRoaXMudGV4dC5sZW5ndGg7KXtoPXRoaXMudGV4dC5jaGFyQXQoZyk7aWYoXCIoXCI9PT1oKXtmPWMuc3Vic3RyKGUtZCsxKTtjPWMuc3Vic3RyKDAsZS1kKTt0aGlzLmluZGV4PWc7YnJlYWt9aWYodGhpcy5pc1doaXRlc3BhY2UoaCkpZysrO2Vsc2UgYnJlYWt9ZD17aW5kZXg6ZCx0ZXh0OmN9O2lmKE1hLmhhc093blByb3BlcnR5KGMpKWQuZm49TWFbY10sZC5qc29uPU1hW2NdO2Vsc2V7dmFyIGw9RGMoYyx0aGlzLm9wdGlvbnMsdGhpcy50ZXh0KTtkLmZuPUQoZnVuY3Rpb24oYSxjKXtyZXR1cm4gbChhLGMpfSx7YXNzaWduOmZ1bmN0aW9uKGQsZSl7cmV0dXJuIG9iKGQsYyxlLGEudGV4dCxhLm9wdGlvbnMpfX0pfXRoaXMudG9rZW5zLnB1c2goZCk7ZiYmKHRoaXMudG9rZW5zLnB1c2goe2luZGV4OmUsdGV4dDpcIi5cIixqc29uOiExfSksdGhpcy50b2tlbnMucHVzaCh7aW5kZXg6ZSsxLHRleHQ6Zixqc29uOiExfSkpfSxcbnJlYWRTdHJpbmc6ZnVuY3Rpb24oYSl7dmFyIGM9dGhpcy5pbmRleDt0aGlzLmluZGV4Kys7Zm9yKHZhciBkPVwiXCIsZT1hLGc9ITE7dGhpcy5pbmRleDx0aGlzLnRleHQubGVuZ3RoOyl7dmFyIGY9dGhpcy50ZXh0LmNoYXJBdCh0aGlzLmluZGV4KSxlPWUrZjtpZihnKVwidVwiPT09Zj8oZj10aGlzLnRleHQuc3Vic3RyaW5nKHRoaXMuaW5kZXgrMSx0aGlzLmluZGV4KzUpLGYubWF0Y2goL1tcXGRhLWZdezR9L2kpfHx0aGlzLnRocm93RXJyb3IoXCJJbnZhbGlkIHVuaWNvZGUgZXNjYXBlIFtcXFxcdVwiK2YrXCJdXCIpLHRoaXMuaW5kZXgrPTQsZCs9U3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChmLDE2KSkpOmQ9KGc9TmVbZl0pP2QrZzpkK2YsZz0hMTtlbHNlIGlmKFwiXFxcXFwiPT09ZilnPSEwO2Vsc2V7aWYoZj09PWEpe3RoaXMuaW5kZXgrKzt0aGlzLnRva2Vucy5wdXNoKHtpbmRleDpjLHRleHQ6ZSxzdHJpbmc6ZCxqc29uOiEwLGZuOmZ1bmN0aW9uKCl7cmV0dXJuIGR9fSk7cmV0dXJufWQrPVxuZn10aGlzLmluZGV4Kyt9dGhpcy50aHJvd0Vycm9yKFwiVW50ZXJtaW5hdGVkIHF1b3RlXCIsYyl9fTt2YXIgJGE9ZnVuY3Rpb24oYSxjLGQpe3RoaXMubGV4ZXI9YTt0aGlzLiRmaWx0ZXI9Yzt0aGlzLm9wdGlvbnM9ZH07JGEuWkVSTz1EKGZ1bmN0aW9uKCl7cmV0dXJuIDB9LHtjb25zdGFudDohMH0pOyRhLnByb3RvdHlwZT17Y29uc3RydWN0b3I6JGEscGFyc2U6ZnVuY3Rpb24oYSxjKXt0aGlzLnRleHQ9YTt0aGlzLmpzb249Yzt0aGlzLnRva2Vucz10aGlzLmxleGVyLmxleChhKTtjJiYodGhpcy5hc3NpZ25tZW50PXRoaXMubG9naWNhbE9SLHRoaXMuZnVuY3Rpb25DYWxsPXRoaXMuZmllbGRBY2Nlc3M9dGhpcy5vYmplY3RJbmRleD10aGlzLmZpbHRlckNoYWluPWZ1bmN0aW9uKCl7dGhpcy50aHJvd0Vycm9yKFwiaXMgbm90IHZhbGlkIGpzb25cIix7dGV4dDphLGluZGV4OjB9KX0pO3ZhciBkPWM/dGhpcy5wcmltYXJ5KCk6dGhpcy5zdGF0ZW1lbnRzKCk7MCE9PXRoaXMudG9rZW5zLmxlbmd0aCYmXG50aGlzLnRocm93RXJyb3IoXCJpcyBhbiB1bmV4cGVjdGVkIHRva2VuXCIsdGhpcy50b2tlbnNbMF0pO2QubGl0ZXJhbD0hIWQubGl0ZXJhbDtkLmNvbnN0YW50PSEhZC5jb25zdGFudDtyZXR1cm4gZH0scHJpbWFyeTpmdW5jdGlvbigpe3ZhciBhO2lmKHRoaXMuZXhwZWN0KFwiKFwiKSlhPXRoaXMuZmlsdGVyQ2hhaW4oKSx0aGlzLmNvbnN1bWUoXCIpXCIpO2Vsc2UgaWYodGhpcy5leHBlY3QoXCJbXCIpKWE9dGhpcy5hcnJheURlY2xhcmF0aW9uKCk7ZWxzZSBpZih0aGlzLmV4cGVjdChcIntcIikpYT10aGlzLm9iamVjdCgpO2Vsc2V7dmFyIGM9dGhpcy5leHBlY3QoKTsoYT1jLmZuKXx8dGhpcy50aHJvd0Vycm9yKFwibm90IGEgcHJpbWFyeSBleHByZXNzaW9uXCIsYyk7Yy5qc29uJiYoYS5jb25zdGFudD0hMCxhLmxpdGVyYWw9ITApfWZvcih2YXIgZDtjPXRoaXMuZXhwZWN0KFwiKFwiLFwiW1wiLFwiLlwiKTspXCIoXCI9PT1jLnRleHQ/KGE9dGhpcy5mdW5jdGlvbkNhbGwoYSxkKSxkPW51bGwpOlwiW1wiPT09Yy50ZXh0P1xuKGQ9YSxhPXRoaXMub2JqZWN0SW5kZXgoYSkpOlwiLlwiPT09Yy50ZXh0PyhkPWEsYT10aGlzLmZpZWxkQWNjZXNzKGEpKTp0aGlzLnRocm93RXJyb3IoXCJJTVBPU1NJQkxFXCIpO3JldHVybiBhfSx0aHJvd0Vycm9yOmZ1bmN0aW9uKGEsYyl7dGhyb3cgQmEoXCJzeW50YXhcIixjLnRleHQsYSxjLmluZGV4KzEsdGhpcy50ZXh0LHRoaXMudGV4dC5zdWJzdHJpbmcoYy5pbmRleCkpO30scGVla1Rva2VuOmZ1bmN0aW9uKCl7aWYoMD09PXRoaXMudG9rZW5zLmxlbmd0aCl0aHJvdyBCYShcInVlb2VcIix0aGlzLnRleHQpO3JldHVybiB0aGlzLnRva2Vuc1swXX0scGVlazpmdW5jdGlvbihhLGMsZCxlKXtpZigwPHRoaXMudG9rZW5zLmxlbmd0aCl7dmFyIGc9dGhpcy50b2tlbnNbMF0sZj1nLnRleHQ7aWYoZj09PWF8fGY9PT1jfHxmPT09ZHx8Zj09PWV8fCEoYXx8Y3x8ZHx8ZSkpcmV0dXJuIGd9cmV0dXJuITF9LGV4cGVjdDpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4oYT10aGlzLnBlZWsoYSxjLGQsXG5lKSk/KHRoaXMuanNvbiYmIWEuanNvbiYmdGhpcy50aHJvd0Vycm9yKFwiaXMgbm90IHZhbGlkIGpzb25cIixhKSx0aGlzLnRva2Vucy5zaGlmdCgpLGEpOiExfSxjb25zdW1lOmZ1bmN0aW9uKGEpe3RoaXMuZXhwZWN0KGEpfHx0aGlzLnRocm93RXJyb3IoXCJpcyB1bmV4cGVjdGVkLCBleHBlY3RpbmcgW1wiK2ErXCJdXCIsdGhpcy5wZWVrKCkpfSx1bmFyeUZuOmZ1bmN0aW9uKGEsYyl7cmV0dXJuIEQoZnVuY3Rpb24oZCxlKXtyZXR1cm4gYShkLGUsYyl9LHtjb25zdGFudDpjLmNvbnN0YW50fSl9LHRlcm5hcnlGbjpmdW5jdGlvbihhLGMsZCl7cmV0dXJuIEQoZnVuY3Rpb24oZSxnKXtyZXR1cm4gYShlLGcpP2MoZSxnKTpkKGUsZyl9LHtjb25zdGFudDphLmNvbnN0YW50JiZjLmNvbnN0YW50JiZkLmNvbnN0YW50fSl9LGJpbmFyeUZuOmZ1bmN0aW9uKGEsYyxkKXtyZXR1cm4gRChmdW5jdGlvbihlLGcpe3JldHVybiBjKGUsZyxhLGQpfSx7Y29uc3RhbnQ6YS5jb25zdGFudCYmZC5jb25zdGFudH0pfSxcbnN0YXRlbWVudHM6ZnVuY3Rpb24oKXtmb3IodmFyIGE9W107OylpZigwPHRoaXMudG9rZW5zLmxlbmd0aCYmIXRoaXMucGVlayhcIn1cIixcIilcIixcIjtcIixcIl1cIikmJmEucHVzaCh0aGlzLmZpbHRlckNoYWluKCkpLCF0aGlzLmV4cGVjdChcIjtcIikpcmV0dXJuIDE9PT1hLmxlbmd0aD9hWzBdOmZ1bmN0aW9uKGMsZCl7Zm9yKHZhciBlLGc9MDtnPGEubGVuZ3RoO2crKyl7dmFyIGY9YVtnXTtmJiYoZT1mKGMsZCkpfXJldHVybiBlfX0sZmlsdGVyQ2hhaW46ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5leHByZXNzaW9uKCksYzs7KWlmKGM9dGhpcy5leHBlY3QoXCJ8XCIpKWE9dGhpcy5iaW5hcnlGbihhLGMuZm4sdGhpcy5maWx0ZXIoKSk7ZWxzZSByZXR1cm4gYX0sZmlsdGVyOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMuZXhwZWN0KCksYz10aGlzLiRmaWx0ZXIoYS50ZXh0KSxkPVtdOzspaWYoYT10aGlzLmV4cGVjdChcIjpcIikpZC5wdXNoKHRoaXMuZXhwcmVzc2lvbigpKTtlbHNle3ZhciBlPVxuZnVuY3Rpb24oYSxlLGgpe2g9W2hdO2Zvcih2YXIgbD0wO2w8ZC5sZW5ndGg7bCsrKWgucHVzaChkW2xdKGEsZSkpO3JldHVybiBjLmFwcGx5KGEsaCl9O3JldHVybiBmdW5jdGlvbigpe3JldHVybiBlfX19LGV4cHJlc3Npb246ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5hc3NpZ25tZW50KCl9LGFzc2lnbm1lbnQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnRlcm5hcnkoKSxjLGQ7cmV0dXJuKGQ9dGhpcy5leHBlY3QoXCI9XCIpKT8oYS5hc3NpZ258fHRoaXMudGhyb3dFcnJvcihcImltcGxpZXMgYXNzaWdubWVudCBidXQgW1wiK3RoaXMudGV4dC5zdWJzdHJpbmcoMCxkLmluZGV4KStcIl0gY2FuIG5vdCBiZSBhc3NpZ25lZCB0b1wiLGQpLGM9dGhpcy50ZXJuYXJ5KCksZnVuY3Rpb24oZCxnKXtyZXR1cm4gYS5hc3NpZ24oZCxjKGQsZyksZyl9KTphfSx0ZXJuYXJ5OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5sb2dpY2FsT1IoKSxjLGQ7aWYodGhpcy5leHBlY3QoXCI/XCIpKXtjPXRoaXMudGVybmFyeSgpO1xuaWYoZD10aGlzLmV4cGVjdChcIjpcIikpcmV0dXJuIHRoaXMudGVybmFyeUZuKGEsYyx0aGlzLnRlcm5hcnkoKSk7dGhpcy50aHJvd0Vycm9yKFwiZXhwZWN0ZWQgOlwiLGQpfWVsc2UgcmV0dXJuIGF9LGxvZ2ljYWxPUjpmdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLmxvZ2ljYWxBTkQoKSxjOzspaWYoYz10aGlzLmV4cGVjdChcInx8XCIpKWE9dGhpcy5iaW5hcnlGbihhLGMuZm4sdGhpcy5sb2dpY2FsQU5EKCkpO2Vsc2UgcmV0dXJuIGF9LGxvZ2ljYWxBTkQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVxdWFsaXR5KCksYztpZihjPXRoaXMuZXhwZWN0KFwiJiZcIikpYT10aGlzLmJpbmFyeUZuKGEsYy5mbix0aGlzLmxvZ2ljYWxBTkQoKSk7cmV0dXJuIGF9LGVxdWFsaXR5OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5yZWxhdGlvbmFsKCksYztpZihjPXRoaXMuZXhwZWN0KFwiPT1cIixcIiE9XCIsXCI9PT1cIixcIiE9PVwiKSlhPXRoaXMuYmluYXJ5Rm4oYSxjLmZuLHRoaXMuZXF1YWxpdHkoKSk7cmV0dXJuIGF9LFxucmVsYXRpb25hbDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuYWRkaXRpdmUoKSxjO2lmKGM9dGhpcy5leHBlY3QoXCI8XCIsXCI+XCIsXCI8PVwiLFwiPj1cIikpYT10aGlzLmJpbmFyeUZuKGEsYy5mbix0aGlzLnJlbGF0aW9uYWwoKSk7cmV0dXJuIGF9LGFkZGl0aXZlOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMubXVsdGlwbGljYXRpdmUoKSxjO2M9dGhpcy5leHBlY3QoXCIrXCIsXCItXCIpOylhPXRoaXMuYmluYXJ5Rm4oYSxjLmZuLHRoaXMubXVsdGlwbGljYXRpdmUoKSk7cmV0dXJuIGF9LG11bHRpcGxpY2F0aXZlOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMudW5hcnkoKSxjO2M9dGhpcy5leHBlY3QoXCIqXCIsXCIvXCIsXCIlXCIpOylhPXRoaXMuYmluYXJ5Rm4oYSxjLmZuLHRoaXMudW5hcnkoKSk7cmV0dXJuIGF9LHVuYXJ5OmZ1bmN0aW9uKCl7dmFyIGE7cmV0dXJuIHRoaXMuZXhwZWN0KFwiK1wiKT90aGlzLnByaW1hcnkoKTooYT10aGlzLmV4cGVjdChcIi1cIikpP3RoaXMuYmluYXJ5Rm4oJGEuWkVSTyxhLmZuLFxudGhpcy51bmFyeSgpKTooYT10aGlzLmV4cGVjdChcIiFcIikpP3RoaXMudW5hcnlGbihhLmZuLHRoaXMudW5hcnkoKSk6dGhpcy5wcmltYXJ5KCl9LGZpZWxkQWNjZXNzOmZ1bmN0aW9uKGEpe3ZhciBjPXRoaXMsZD10aGlzLmV4cGVjdCgpLnRleHQsZT1EYyhkLHRoaXMub3B0aW9ucyx0aGlzLnRleHQpO3JldHVybiBEKGZ1bmN0aW9uKGMsZCxoKXtyZXR1cm4gZShofHxhKGMsZCkpfSx7YXNzaWduOmZ1bmN0aW9uKGUsZixoKXtyZXR1cm4gb2IoYShlLGgpLGQsZixjLnRleHQsYy5vcHRpb25zKX19KX0sb2JqZWN0SW5kZXg6ZnVuY3Rpb24oYSl7dmFyIGM9dGhpcyxkPXRoaXMuZXhwcmVzc2lvbigpO3RoaXMuY29uc3VtZShcIl1cIik7cmV0dXJuIEQoZnVuY3Rpb24oZSxnKXt2YXIgZj1hKGUsZyksaD1kKGUsZyksbDtpZighZilyZXR1cm4gczsoZj1aYShmW2hdLGMudGV4dCkpJiYoZi50aGVuJiZjLm9wdGlvbnMudW53cmFwUHJvbWlzZXMpJiYobD1mLFwiJCR2XCJpbiBmfHwobC4kJHY9cyxsLnRoZW4oZnVuY3Rpb24oYSl7bC4kJHY9XG5hfSkpLGY9Zi4kJHYpO3JldHVybiBmfSx7YXNzaWduOmZ1bmN0aW9uKGUsZyxmKXt2YXIgaD1kKGUsZik7cmV0dXJuIFphKGEoZSxmKSxjLnRleHQpW2hdPWd9fSl9LGZ1bmN0aW9uQ2FsbDpmdW5jdGlvbihhLGMpe3ZhciBkPVtdO2lmKFwiKVwiIT09dGhpcy5wZWVrVG9rZW4oKS50ZXh0KXtkbyBkLnB1c2godGhpcy5leHByZXNzaW9uKCkpO3doaWxlKHRoaXMuZXhwZWN0KFwiLFwiKSl9dGhpcy5jb25zdW1lKFwiKVwiKTt2YXIgZT10aGlzO3JldHVybiBmdW5jdGlvbihnLGYpe2Zvcih2YXIgaD1bXSxsPWM/YyhnLGYpOmcsaz0wO2s8ZC5sZW5ndGg7aysrKWgucHVzaChkW2tdKGcsZikpO2s9YShnLGYsbCl8fEM7WmEobCxlLnRleHQpO1phKGssZS50ZXh0KTtoPWsuYXBwbHk/ay5hcHBseShsLGgpOmsoaFswXSxoWzFdLGhbMl0saFszXSxoWzRdKTtyZXR1cm4gWmEoaCxlLnRleHQpfX0sYXJyYXlEZWNsYXJhdGlvbjpmdW5jdGlvbigpe3ZhciBhPVtdLGM9ITA7aWYoXCJdXCIhPT10aGlzLnBlZWtUb2tlbigpLnRleHQpe2Rve2lmKHRoaXMucGVlayhcIl1cIikpYnJlYWs7XG52YXIgZD10aGlzLmV4cHJlc3Npb24oKTthLnB1c2goZCk7ZC5jb25zdGFudHx8KGM9ITEpfXdoaWxlKHRoaXMuZXhwZWN0KFwiLFwiKSl9dGhpcy5jb25zdW1lKFwiXVwiKTtyZXR1cm4gRChmdW5jdGlvbihjLGQpe2Zvcih2YXIgZj1bXSxoPTA7aDxhLmxlbmd0aDtoKyspZi5wdXNoKGFbaF0oYyxkKSk7cmV0dXJuIGZ9LHtsaXRlcmFsOiEwLGNvbnN0YW50OmN9KX0sb2JqZWN0OmZ1bmN0aW9uKCl7dmFyIGE9W10sYz0hMDtpZihcIn1cIiE9PXRoaXMucGVla1Rva2VuKCkudGV4dCl7ZG97aWYodGhpcy5wZWVrKFwifVwiKSlicmVhazt2YXIgZD10aGlzLmV4cGVjdCgpLGQ9ZC5zdHJpbmd8fGQudGV4dDt0aGlzLmNvbnN1bWUoXCI6XCIpO3ZhciBlPXRoaXMuZXhwcmVzc2lvbigpO2EucHVzaCh7a2V5OmQsdmFsdWU6ZX0pO2UuY29uc3RhbnR8fChjPSExKX13aGlsZSh0aGlzLmV4cGVjdChcIixcIikpfXRoaXMuY29uc3VtZShcIn1cIik7cmV0dXJuIEQoZnVuY3Rpb24oYyxkKXtmb3IodmFyIGU9e30sbD0wO2w8XG5hLmxlbmd0aDtsKyspe3ZhciBrPWFbbF07ZVtrLmtleV09ay52YWx1ZShjLGQpfXJldHVybiBlfSx7bGl0ZXJhbDohMCxjb25zdGFudDpjfSl9fTt2YXIgTWI9e30sdWE9dChcIiRzY2VcIiksZ2E9e0hUTUw6XCJodG1sXCIsQ1NTOlwiY3NzXCIsVVJMOlwidXJsXCIsUkVTT1VSQ0VfVVJMOlwicmVzb3VyY2VVcmxcIixKUzpcImpzXCJ9LFc9VS5jcmVhdGVFbGVtZW50KFwiYVwiKSxIYz1zYShPLmxvY2F0aW9uLmhyZWYsITApO2djLiRpbmplY3Q9W1wiJHByb3ZpZGVcIl07SWMuJGluamVjdD1bXCIkbG9jYWxlXCJdO0tjLiRpbmplY3Q9W1wiJGxvY2FsZVwiXTt2YXIgTmM9XCIuXCIsSWU9e3l5eXk6JChcIkZ1bGxZZWFyXCIsNCkseXk6JChcIkZ1bGxZZWFyXCIsMiwwLCEwKSx5OiQoXCJGdWxsWWVhclwiLDEpLE1NTU06cGIoXCJNb250aFwiKSxNTU06cGIoXCJNb250aFwiLCEwKSxNTTokKFwiTW9udGhcIiwyLDEpLE06JChcIk1vbnRoXCIsMSwxKSxkZDokKFwiRGF0ZVwiLDIpLGQ6JChcIkRhdGVcIiwxKSxISDokKFwiSG91cnNcIiwyKSxIOiQoXCJIb3Vyc1wiLFxuMSksaGg6JChcIkhvdXJzXCIsMiwtMTIpLGg6JChcIkhvdXJzXCIsMSwtMTIpLG1tOiQoXCJNaW51dGVzXCIsMiksbTokKFwiTWludXRlc1wiLDEpLHNzOiQoXCJTZWNvbmRzXCIsMiksczokKFwiU2Vjb25kc1wiLDEpLHNzczokKFwiTWlsbGlzZWNvbmRzXCIsMyksRUVFRTpwYihcIkRheVwiKSxFRUU6cGIoXCJEYXlcIiwhMCksYTpmdW5jdGlvbihhLGMpe3JldHVybiAxMj5hLmdldEhvdXJzKCk/Yy5BTVBNU1swXTpjLkFNUE1TWzFdfSxaOmZ1bmN0aW9uKGEpe2E9LTEqYS5nZXRUaW1lem9uZU9mZnNldCgpO3JldHVybiBhPSgwPD1hP1wiK1wiOlwiXCIpKyhPYihNYXRoWzA8YT9cImZsb29yXCI6XCJjZWlsXCJdKGEvNjApLDIpK09iKE1hdGguYWJzKGElNjApLDIpKX19LEhlPS8oKD86W155TWRIaG1zYVpFJ10rKXwoPzonKD86W14nXXwnJykqJyl8KD86RSt8eSt8TSt8ZCt8SCt8aCt8bSt8cyt8YXxaKSkoLiopLyxHZT0vXlxcLT9cXGQrJC87SmMuJGluamVjdD1bXCIkbG9jYWxlXCJdO3ZhciBFZT1hYShLKSxGZT1hYShGYSk7TGMuJGluamVjdD1cbltcIiRwYXJzZVwiXTt2YXIgY2Q9YWEoe3Jlc3RyaWN0OlwiRVwiLGNvbXBpbGU6ZnVuY3Rpb24oYSxjKXs4Pj1TJiYoYy5ocmVmfHxjLm5hbWV8fGMuJHNldChcImhyZWZcIixcIlwiKSxhLmFwcGVuZChVLmNyZWF0ZUNvbW1lbnQoXCJJRSBmaXhcIikpKTtpZighYy5ocmVmJiYhYy54bGlua0hyZWYmJiFjLm5hbWUpcmV0dXJuIGZ1bmN0aW9uKGEsYyl7dmFyIGc9XCJbb2JqZWN0IFNWR0FuaW1hdGVkU3RyaW5nXVwiPT09d2EuY2FsbChjLnByb3AoXCJocmVmXCIpKT9cInhsaW5rOmhyZWZcIjpcImhyZWZcIjtjLm9uKFwiY2xpY2tcIixmdW5jdGlvbihhKXtjLmF0dHIoZyl8fGEucHJldmVudERlZmF1bHQoKX0pfX19KSx6Yj17fTtxKGtiLGZ1bmN0aW9uKGEsYyl7aWYoXCJtdWx0aXBsZVwiIT1hKXt2YXIgZD1uYShcIm5nLVwiK2MpO3piW2RdPWZ1bmN0aW9uKCl7cmV0dXJue3ByaW9yaXR5OjEwMCxsaW5rOmZ1bmN0aW9uKGEsZyxmKXthLiR3YXRjaChmW2RdLGZ1bmN0aW9uKGEpe2YuJHNldChjLCEhYSl9KX19fX19KTtxKFtcInNyY1wiLFxuXCJzcmNzZXRcIixcImhyZWZcIl0sZnVuY3Rpb24oYSl7dmFyIGM9bmEoXCJuZy1cIithKTt6YltjXT1mdW5jdGlvbigpe3JldHVybntwcmlvcml0eTo5OSxsaW5rOmZ1bmN0aW9uKGQsZSxnKXt2YXIgZj1hLGg9YTtcImhyZWZcIj09PWEmJlwiW29iamVjdCBTVkdBbmltYXRlZFN0cmluZ11cIj09PXdhLmNhbGwoZS5wcm9wKFwiaHJlZlwiKSkmJihoPVwieGxpbmtIcmVmXCIsZy4kYXR0cltoXT1cInhsaW5rOmhyZWZcIixmPW51bGwpO2cuJG9ic2VydmUoYyxmdW5jdGlvbihhKXthJiYoZy4kc2V0KGgsYSksUyYmZiYmZS5wcm9wKGYsZ1toXSkpfSl9fX19KTt2YXIgc2I9eyRhZGRDb250cm9sOkMsJHJlbW92ZUNvbnRyb2w6Qywkc2V0VmFsaWRpdHk6Qywkc2V0RGlydHk6Qywkc2V0UHJpc3RpbmU6Q307T2MuJGluamVjdD1bXCIkZWxlbWVudFwiLFwiJGF0dHJzXCIsXCIkc2NvcGVcIixcIiRhbmltYXRlXCJdO3ZhciBRYz1mdW5jdGlvbihhKXtyZXR1cm5bXCIkdGltZW91dFwiLGZ1bmN0aW9uKGMpe3JldHVybntuYW1lOlwiZm9ybVwiLFxucmVzdHJpY3Q6YT9cIkVBQ1wiOlwiRVwiLGNvbnRyb2xsZXI6T2MsY29tcGlsZTpmdW5jdGlvbigpe3JldHVybntwcmU6ZnVuY3Rpb24oYSxlLGcsZil7aWYoIWcuYWN0aW9uKXt2YXIgaD1mdW5jdGlvbihhKXthLnByZXZlbnREZWZhdWx0P2EucHJldmVudERlZmF1bHQoKTphLnJldHVyblZhbHVlPSExfTtQYyhlWzBdLFwic3VibWl0XCIsaCk7ZS5vbihcIiRkZXN0cm95XCIsZnVuY3Rpb24oKXtjKGZ1bmN0aW9uKCl7RmIoZVswXSxcInN1Ym1pdFwiLGgpfSwwLCExKX0pfXZhciBsPWUucGFyZW50KCkuY29udHJvbGxlcihcImZvcm1cIiksaz1nLm5hbWV8fGcubmdGb3JtO2smJm9iKGEsayxmLGspO2lmKGwpZS5vbihcIiRkZXN0cm95XCIsZnVuY3Rpb24oKXtsLiRyZW1vdmVDb250cm9sKGYpO2smJm9iKGEsayxzLGspO0QoZixzYil9KX19fX19XX0sZGQ9UWMoKSxxZD1RYyghMCksT2U9L14oZnRwfGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3KkApPyhcXFMrKSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlQCFcXC1cXC9dKSk/JC8sXG5QZT0vXlthLXowLTkhIyQlJicqKy89P15fYHt8fX4uLV0rQFthLXowLTktXSsoXFwuW2EtejAtOS1dKykqJC9pLFFlPS9eXFxzKihcXC18XFwrKT8oXFxkK3woXFxkKihcXC5cXGQqKSkpXFxzKiQvLFJjPXt0ZXh0OnViLG51bWJlcjpmdW5jdGlvbihhLGMsZCxlLGcsZil7dWIoYSxjLGQsZSxnLGYpO2UuJHBhcnNlcnMucHVzaChmdW5jdGlvbihhKXt2YXIgYz1lLiRpc0VtcHR5KGEpO2lmKGN8fFFlLnRlc3QoYSkpcmV0dXJuIGUuJHNldFZhbGlkaXR5KFwibnVtYmVyXCIsITApLFwiXCI9PT1hP251bGw6Yz9hOnBhcnNlRmxvYXQoYSk7ZS4kc2V0VmFsaWRpdHkoXCJudW1iZXJcIiwhMSk7cmV0dXJuIHN9KTtKZShlLFwibnVtYmVyXCIsYyk7ZS4kZm9ybWF0dGVycy5wdXNoKGZ1bmN0aW9uKGEpe3JldHVybiBlLiRpc0VtcHR5KGEpP1wiXCI6XCJcIithfSk7ZC5taW4mJihhPWZ1bmN0aW9uKGEpe3ZhciBjPXBhcnNlRmxvYXQoZC5taW4pO3JldHVybiBwYShlLFwibWluXCIsZS4kaXNFbXB0eShhKXx8YT49YyxhKX0sZS4kcGFyc2Vycy5wdXNoKGEpLFxuZS4kZm9ybWF0dGVycy5wdXNoKGEpKTtkLm1heCYmKGE9ZnVuY3Rpb24oYSl7dmFyIGM9cGFyc2VGbG9hdChkLm1heCk7cmV0dXJuIHBhKGUsXCJtYXhcIixlLiRpc0VtcHR5KGEpfHxhPD1jLGEpfSxlLiRwYXJzZXJzLnB1c2goYSksZS4kZm9ybWF0dGVycy5wdXNoKGEpKTtlLiRmb3JtYXR0ZXJzLnB1c2goZnVuY3Rpb24oYSl7cmV0dXJuIHBhKGUsXCJudW1iZXJcIixlLiRpc0VtcHR5KGEpfHx2YihhKSxhKX0pfSx1cmw6ZnVuY3Rpb24oYSxjLGQsZSxnLGYpe3ViKGEsYyxkLGUsZyxmKTthPWZ1bmN0aW9uKGEpe3JldHVybiBwYShlLFwidXJsXCIsZS4kaXNFbXB0eShhKXx8T2UudGVzdChhKSxhKX07ZS4kZm9ybWF0dGVycy5wdXNoKGEpO2UuJHBhcnNlcnMucHVzaChhKX0sZW1haWw6ZnVuY3Rpb24oYSxjLGQsZSxnLGYpe3ViKGEsYyxkLGUsZyxmKTthPWZ1bmN0aW9uKGEpe3JldHVybiBwYShlLFwiZW1haWxcIixlLiRpc0VtcHR5KGEpfHxQZS50ZXN0KGEpLGEpfTtlLiRmb3JtYXR0ZXJzLnB1c2goYSk7XG5lLiRwYXJzZXJzLnB1c2goYSl9LHJhZGlvOmZ1bmN0aW9uKGEsYyxkLGUpe0UoZC5uYW1lKSYmYy5hdHRyKFwibmFtZVwiLGJiKCkpO2Mub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7Y1swXS5jaGVja2VkJiZhLiRhcHBseShmdW5jdGlvbigpe2UuJHNldFZpZXdWYWx1ZShkLnZhbHVlKX0pfSk7ZS4kcmVuZGVyPWZ1bmN0aW9uKCl7Y1swXS5jaGVja2VkPWQudmFsdWU9PWUuJHZpZXdWYWx1ZX07ZC4kb2JzZXJ2ZShcInZhbHVlXCIsZS4kcmVuZGVyKX0sY2hlY2tib3g6ZnVuY3Rpb24oYSxjLGQsZSl7dmFyIGc9ZC5uZ1RydWVWYWx1ZSxmPWQubmdGYWxzZVZhbHVlO3coZyl8fChnPSEwKTt3KGYpfHwoZj0hMSk7Yy5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXthLiRhcHBseShmdW5jdGlvbigpe2UuJHNldFZpZXdWYWx1ZShjWzBdLmNoZWNrZWQpfSl9KTtlLiRyZW5kZXI9ZnVuY3Rpb24oKXtjWzBdLmNoZWNrZWQ9ZS4kdmlld1ZhbHVlfTtlLiRpc0VtcHR5PWZ1bmN0aW9uKGEpe3JldHVybiBhIT09Z307XG5lLiRmb3JtYXR0ZXJzLnB1c2goZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT1nfSk7ZS4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uKGEpe3JldHVybiBhP2c6Zn0pfSxoaWRkZW46QyxidXR0b246QyxzdWJtaXQ6QyxyZXNldDpDLGZpbGU6Q30sZGM9W1wiJGJyb3dzZXJcIixcIiRzbmlmZmVyXCIsZnVuY3Rpb24oYSxjKXtyZXR1cm57cmVzdHJpY3Q6XCJFXCIscmVxdWlyZTpcIj9uZ01vZGVsXCIsbGluazpmdW5jdGlvbihkLGUsZyxmKXtmJiYoUmNbSyhnLnR5cGUpXXx8UmMudGV4dCkoZCxlLGcsZixjLGEpfX19XSxyYj1cIm5nLXZhbGlkXCIscWI9XCJuZy1pbnZhbGlkXCIsTGE9XCJuZy1wcmlzdGluZVwiLHRiPVwibmctZGlydHlcIixSZT1bXCIkc2NvcGVcIixcIiRleGNlcHRpb25IYW5kbGVyXCIsXCIkYXR0cnNcIixcIiRlbGVtZW50XCIsXCIkcGFyc2VcIixcIiRhbmltYXRlXCIsZnVuY3Rpb24oYSxjLGQsZSxnLGYpe2Z1bmN0aW9uIGgoYSxjKXtjPWM/XCItXCIrZmIoYyxcIi1cIik6XCJcIjtmLnJlbW92ZUNsYXNzKGUsKGE/cWI6cmIpK2MpO1xuZi5hZGRDbGFzcyhlLChhP3JiOnFiKStjKX10aGlzLiRtb2RlbFZhbHVlPXRoaXMuJHZpZXdWYWx1ZT1OdW1iZXIuTmFOO3RoaXMuJHBhcnNlcnM9W107dGhpcy4kZm9ybWF0dGVycz1bXTt0aGlzLiR2aWV3Q2hhbmdlTGlzdGVuZXJzPVtdO3RoaXMuJHByaXN0aW5lPSEwO3RoaXMuJGRpcnR5PSExO3RoaXMuJHZhbGlkPSEwO3RoaXMuJGludmFsaWQ9ITE7dGhpcy4kbmFtZT1kLm5hbWU7dmFyIGw9ZyhkLm5nTW9kZWwpLGs9bC5hc3NpZ247aWYoIWspdGhyb3cgdChcIm5nTW9kZWxcIikoXCJub25hc3NpZ25cIixkLm5nTW9kZWwsaGEoZSkpO3RoaXMuJHJlbmRlcj1DO3RoaXMuJGlzRW1wdHk9ZnVuY3Rpb24oYSl7cmV0dXJuIEUoYSl8fFwiXCI9PT1hfHxudWxsPT09YXx8YSE9PWF9O3ZhciBtPWUuaW5oZXJpdGVkRGF0YShcIiRmb3JtQ29udHJvbGxlclwiKXx8c2Isbj0wLHA9dGhpcy4kZXJyb3I9e307ZS5hZGRDbGFzcyhMYSk7aCghMCk7dGhpcy4kc2V0VmFsaWRpdHk9ZnVuY3Rpb24oYSxjKXtwW2FdIT09XG4hYyYmKGM/KHBbYV0mJm4tLSxufHwoaCghMCksdGhpcy4kdmFsaWQ9ITAsdGhpcy4kaW52YWxpZD0hMSkpOihoKCExKSx0aGlzLiRpbnZhbGlkPSEwLHRoaXMuJHZhbGlkPSExLG4rKykscFthXT0hYyxoKGMsYSksbS4kc2V0VmFsaWRpdHkoYSxjLHRoaXMpKX07dGhpcy4kc2V0UHJpc3RpbmU9ZnVuY3Rpb24oKXt0aGlzLiRkaXJ0eT0hMTt0aGlzLiRwcmlzdGluZT0hMDtmLnJlbW92ZUNsYXNzKGUsdGIpO2YuYWRkQ2xhc3MoZSxMYSl9O3RoaXMuJHNldFZpZXdWYWx1ZT1mdW5jdGlvbihkKXt0aGlzLiR2aWV3VmFsdWU9ZDt0aGlzLiRwcmlzdGluZSYmKHRoaXMuJGRpcnR5PSEwLHRoaXMuJHByaXN0aW5lPSExLGYucmVtb3ZlQ2xhc3MoZSxMYSksZi5hZGRDbGFzcyhlLHRiKSxtLiRzZXREaXJ0eSgpKTtxKHRoaXMuJHBhcnNlcnMsZnVuY3Rpb24oYSl7ZD1hKGQpfSk7dGhpcy4kbW9kZWxWYWx1ZSE9PWQmJih0aGlzLiRtb2RlbFZhbHVlPWQsayhhLGQpLHEodGhpcy4kdmlld0NoYW5nZUxpc3RlbmVycyxcbmZ1bmN0aW9uKGEpe3RyeXthKCl9Y2F0Y2goZCl7YyhkKX19KSl9O3ZhciByPXRoaXM7YS4kd2F0Y2goZnVuY3Rpb24oKXt2YXIgYz1sKGEpO2lmKHIuJG1vZGVsVmFsdWUhPT1jKXt2YXIgZD1yLiRmb3JtYXR0ZXJzLGU9ZC5sZW5ndGg7Zm9yKHIuJG1vZGVsVmFsdWU9YztlLS07KWM9ZFtlXShjKTtyLiR2aWV3VmFsdWUhPT1jJiYoci4kdmlld1ZhbHVlPWMsci4kcmVuZGVyKCkpfXJldHVybiBjfSl9XSxGZD1mdW5jdGlvbigpe3JldHVybntyZXF1aXJlOltcIm5nTW9kZWxcIixcIl4/Zm9ybVwiXSxjb250cm9sbGVyOlJlLGxpbms6ZnVuY3Rpb24oYSxjLGQsZSl7dmFyIGc9ZVswXSxmPWVbMV18fHNiO2YuJGFkZENvbnRyb2woZyk7YS4kb24oXCIkZGVzdHJveVwiLGZ1bmN0aW9uKCl7Zi4kcmVtb3ZlQ29udHJvbChnKX0pfX19LEhkPWFhKHtyZXF1aXJlOlwibmdNb2RlbFwiLGxpbms6ZnVuY3Rpb24oYSxjLGQsZSl7ZS4kdmlld0NoYW5nZUxpc3RlbmVycy5wdXNoKGZ1bmN0aW9uKCl7YS4kZXZhbChkLm5nQ2hhbmdlKX0pfX0pLFxuZWM9ZnVuY3Rpb24oKXtyZXR1cm57cmVxdWlyZTpcIj9uZ01vZGVsXCIsbGluazpmdW5jdGlvbihhLGMsZCxlKXtpZihlKXtkLnJlcXVpcmVkPSEwO3ZhciBnPWZ1bmN0aW9uKGEpe2lmKGQucmVxdWlyZWQmJmUuJGlzRW1wdHkoYSkpZS4kc2V0VmFsaWRpdHkoXCJyZXF1aXJlZFwiLCExKTtlbHNlIHJldHVybiBlLiRzZXRWYWxpZGl0eShcInJlcXVpcmVkXCIsITApLGF9O2UuJGZvcm1hdHRlcnMucHVzaChnKTtlLiRwYXJzZXJzLnVuc2hpZnQoZyk7ZC4kb2JzZXJ2ZShcInJlcXVpcmVkXCIsZnVuY3Rpb24oKXtnKGUuJHZpZXdWYWx1ZSl9KX19fX0sR2Q9ZnVuY3Rpb24oKXtyZXR1cm57cmVxdWlyZTpcIm5nTW9kZWxcIixsaW5rOmZ1bmN0aW9uKGEsYyxkLGUpe3ZhciBnPShhPS9cXC8oLiopXFwvLy5leGVjKGQubmdMaXN0KSkmJlJlZ0V4cChhWzFdKXx8ZC5uZ0xpc3R8fFwiLFwiO2UuJHBhcnNlcnMucHVzaChmdW5jdGlvbihhKXtpZighRShhKSl7dmFyIGM9W107YSYmcShhLnNwbGl0KGcpLGZ1bmN0aW9uKGEpe2EmJlxuYy5wdXNoKGNhKGEpKX0pO3JldHVybiBjfX0pO2UuJGZvcm1hdHRlcnMucHVzaChmdW5jdGlvbihhKXtyZXR1cm4gTShhKT9hLmpvaW4oXCIsIFwiKTpzfSk7ZS4kaXNFbXB0eT1mdW5jdGlvbihhKXtyZXR1cm4hYXx8IWEubGVuZ3RofX19fSxTZT0vXih0cnVlfGZhbHNlfFxcZCspJC8sSWQ9ZnVuY3Rpb24oKXtyZXR1cm57cHJpb3JpdHk6MTAwLGNvbXBpbGU6ZnVuY3Rpb24oYSxjKXtyZXR1cm4gU2UudGVzdChjLm5nVmFsdWUpP2Z1bmN0aW9uKGEsYyxnKXtnLiRzZXQoXCJ2YWx1ZVwiLGEuJGV2YWwoZy5uZ1ZhbHVlKSl9OmZ1bmN0aW9uKGEsYyxnKXthLiR3YXRjaChnLm5nVmFsdWUsZnVuY3Rpb24oYSl7Zy4kc2V0KFwidmFsdWVcIixhKX0pfX19fSxpZD12YShmdW5jdGlvbihhLGMsZCl7Yy5hZGRDbGFzcyhcIm5nLWJpbmRpbmdcIikuZGF0YShcIiRiaW5kaW5nXCIsZC5uZ0JpbmQpO2EuJHdhdGNoKGQubmdCaW5kLGZ1bmN0aW9uKGEpe2MudGV4dChhPT1zP1wiXCI6YSl9KX0pLGtkPVtcIiRpbnRlcnBvbGF0ZVwiLFxuZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGMsZCxlKXtjPWEoZC5hdHRyKGUuJGF0dHIubmdCaW5kVGVtcGxhdGUpKTtkLmFkZENsYXNzKFwibmctYmluZGluZ1wiKS5kYXRhKFwiJGJpbmRpbmdcIixjKTtlLiRvYnNlcnZlKFwibmdCaW5kVGVtcGxhdGVcIixmdW5jdGlvbihhKXtkLnRleHQoYSl9KX19XSxqZD1bXCIkc2NlXCIsXCIkcGFyc2VcIixmdW5jdGlvbihhLGMpe3JldHVybiBmdW5jdGlvbihkLGUsZyl7ZS5hZGRDbGFzcyhcIm5nLWJpbmRpbmdcIikuZGF0YShcIiRiaW5kaW5nXCIsZy5uZ0JpbmRIdG1sKTt2YXIgZj1jKGcubmdCaW5kSHRtbCk7ZC4kd2F0Y2goZnVuY3Rpb24oKXtyZXR1cm4oZihkKXx8XCJcIikudG9TdHJpbmcoKX0sZnVuY3Rpb24oYyl7ZS5odG1sKGEuZ2V0VHJ1c3RlZEh0bWwoZihkKSl8fFwiXCIpfSl9fV0sbGQ9UGIoXCJcIiwhMCksbmQ9UGIoXCJPZGRcIiwwKSxtZD1QYihcIkV2ZW5cIiwxKSxvZD12YSh7Y29tcGlsZTpmdW5jdGlvbihhLGMpe2MuJHNldChcIm5nQ2xvYWtcIixzKTthLnJlbW92ZUNsYXNzKFwibmctY2xvYWtcIil9fSksXG5wZD1bZnVuY3Rpb24oKXtyZXR1cm57c2NvcGU6ITAsY29udHJvbGxlcjpcIkBcIixwcmlvcml0eTo1MDB9fV0sZmM9e307cShcImNsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZW1vdmUgbW91c2VlbnRlciBtb3VzZWxlYXZlIGtleWRvd24ga2V5dXAga2V5cHJlc3Mgc3VibWl0IGZvY3VzIGJsdXIgY29weSBjdXQgcGFzdGVcIi5zcGxpdChcIiBcIiksZnVuY3Rpb24oYSl7dmFyIGM9bmEoXCJuZy1cIithKTtmY1tjXT1bXCIkcGFyc2VcIixmdW5jdGlvbihkKXtyZXR1cm57Y29tcGlsZTpmdW5jdGlvbihlLGcpe3ZhciBmPWQoZ1tjXSk7cmV0dXJuIGZ1bmN0aW9uKGMsZCxlKXtkLm9uKEsoYSksZnVuY3Rpb24oYSl7Yy4kYXBwbHkoZnVuY3Rpb24oKXtmKGMseyRldmVudDphfSl9KX0pfX19fV19KTt2YXIgc2Q9W1wiJGFuaW1hdGVcIixmdW5jdGlvbihhKXtyZXR1cm57dHJhbnNjbHVkZTpcImVsZW1lbnRcIixwcmlvcml0eTo2MDAsdGVybWluYWw6ITAscmVzdHJpY3Q6XCJBXCIsXG4kJHRsYjohMCxsaW5rOmZ1bmN0aW9uKGMsZCxlLGcsZil7dmFyIGgsbCxrO2MuJHdhdGNoKGUubmdJZixmdW5jdGlvbihnKXtRYShnKT9sfHwobD1jLiRuZXcoKSxmKGwsZnVuY3Rpb24oYyl7Y1tjLmxlbmd0aCsrXT1VLmNyZWF0ZUNvbW1lbnQoXCIgZW5kIG5nSWY6IFwiK2UubmdJZitcIiBcIik7aD17Y2xvbmU6Y307YS5lbnRlcihjLGQucGFyZW50KCksZCl9KSk6KGsmJihrLnJlbW92ZSgpLGs9bnVsbCksbCYmKGwuJGRlc3Ryb3koKSxsPW51bGwpLGgmJihrPXliKGguY2xvbmUpLGEubGVhdmUoayxmdW5jdGlvbigpe2s9bnVsbH0pLGg9bnVsbCkpfSl9fX1dLHRkPVtcIiRodHRwXCIsXCIkdGVtcGxhdGVDYWNoZVwiLFwiJGFuY2hvclNjcm9sbFwiLFwiJGFuaW1hdGVcIixcIiRzY2VcIixmdW5jdGlvbihhLGMsZCxlLGcpe3JldHVybntyZXN0cmljdDpcIkVDQVwiLHByaW9yaXR5OjQwMCx0ZXJtaW5hbDohMCx0cmFuc2NsdWRlOlwiZWxlbWVudFwiLGNvbnRyb2xsZXI6RWEubm9vcCxjb21waWxlOmZ1bmN0aW9uKGYsXG5oKXt2YXIgbD1oLm5nSW5jbHVkZXx8aC5zcmMsaz1oLm9ubG9hZHx8XCJcIixtPWguYXV0b3Njcm9sbDtyZXR1cm4gZnVuY3Rpb24oZixoLHEscyx1KXt2YXIgRj0wLHYseSxBLHg9ZnVuY3Rpb24oKXt5JiYoeS5yZW1vdmUoKSx5PW51bGwpO3YmJih2LiRkZXN0cm95KCksdj1udWxsKTtBJiYoZS5sZWF2ZShBLGZ1bmN0aW9uKCl7eT1udWxsfSkseT1BLEE9bnVsbCl9O2YuJHdhdGNoKGcucGFyc2VBc1Jlc291cmNlVXJsKGwpLGZ1bmN0aW9uKGcpe3ZhciBsPWZ1bmN0aW9uKCl7IUIobSl8fG0mJiFmLiRldmFsKG0pfHxkKCl9LHE9KytGO2c/KGEuZ2V0KGcse2NhY2hlOmN9KS5zdWNjZXNzKGZ1bmN0aW9uKGEpe2lmKHE9PT1GKXt2YXIgYz1mLiRuZXcoKTtzLnRlbXBsYXRlPWE7YT11KGMsZnVuY3Rpb24oYSl7eCgpO2UuZW50ZXIoYSxudWxsLGgsbCl9KTt2PWM7QT1hO3YuJGVtaXQoXCIkaW5jbHVkZUNvbnRlbnRMb2FkZWRcIik7Zi4kZXZhbChrKX19KS5lcnJvcihmdW5jdGlvbigpe3E9PT1cbkYmJngoKX0pLGYuJGVtaXQoXCIkaW5jbHVkZUNvbnRlbnRSZXF1ZXN0ZWRcIikpOih4KCkscy50ZW1wbGF0ZT1udWxsKX0pfX19fV0sSmQ9W1wiJGNvbXBpbGVcIixmdW5jdGlvbihhKXtyZXR1cm57cmVzdHJpY3Q6XCJFQ0FcIixwcmlvcml0eTotNDAwLHJlcXVpcmU6XCJuZ0luY2x1ZGVcIixsaW5rOmZ1bmN0aW9uKGMsZCxlLGcpe2QuaHRtbChnLnRlbXBsYXRlKTthKGQuY29udGVudHMoKSkoYyl9fX1dLHVkPXZhKHtwcmlvcml0eTo0NTAsY29tcGlsZTpmdW5jdGlvbigpe3JldHVybntwcmU6ZnVuY3Rpb24oYSxjLGQpe2EuJGV2YWwoZC5uZ0luaXQpfX19fSksdmQ9dmEoe3Rlcm1pbmFsOiEwLHByaW9yaXR5OjFFM30pLHdkPVtcIiRsb2NhbGVcIixcIiRpbnRlcnBvbGF0ZVwiLGZ1bmN0aW9uKGEsYyl7dmFyIGQ9L3t9L2c7cmV0dXJue3Jlc3RyaWN0OlwiRUFcIixsaW5rOmZ1bmN0aW9uKGUsZyxmKXt2YXIgaD1mLmNvdW50LGw9Zi4kYXR0ci53aGVuJiZnLmF0dHIoZi4kYXR0ci53aGVuKSxrPWYub2Zmc2V0fHxcbjAsbT1lLiRldmFsKGwpfHx7fSxuPXt9LHA9Yy5zdGFydFN5bWJvbCgpLHI9Yy5lbmRTeW1ib2woKSxzPS9ed2hlbihNaW51cyk/KC4rKSQvO3EoZixmdW5jdGlvbihhLGMpe3MudGVzdChjKSYmKG1bSyhjLnJlcGxhY2UoXCJ3aGVuXCIsXCJcIikucmVwbGFjZShcIk1pbnVzXCIsXCItXCIpKV09Zy5hdHRyKGYuJGF0dHJbY10pKX0pO3EobSxmdW5jdGlvbihhLGUpe25bZV09YyhhLnJlcGxhY2UoZCxwK2grXCItXCIraytyKSl9KTtlLiR3YXRjaChmdW5jdGlvbigpe3ZhciBjPXBhcnNlRmxvYXQoZS4kZXZhbChoKSk7aWYoaXNOYU4oYykpcmV0dXJuXCJcIjtjIGluIG18fChjPWEucGx1cmFsQ2F0KGMtaykpO3JldHVybiBuW2NdKGUsZywhMCl9LGZ1bmN0aW9uKGEpe2cudGV4dChhKX0pfX19XSx4ZD1bXCIkcGFyc2VcIixcIiRhbmltYXRlXCIsZnVuY3Rpb24oYSxjKXt2YXIgZD10KFwibmdSZXBlYXRcIik7cmV0dXJue3RyYW5zY2x1ZGU6XCJlbGVtZW50XCIscHJpb3JpdHk6MUUzLHRlcm1pbmFsOiEwLCQkdGxiOiEwLFxubGluazpmdW5jdGlvbihlLGcsZixoLGwpe3ZhciBrPWYubmdSZXBlYXQsbT1rLm1hdGNoKC9eXFxzKihbXFxzXFxTXSs/KVxccytpblxccysoW1xcc1xcU10rPykoPzpcXHMrdHJhY2tcXHMrYnlcXHMrKFtcXHNcXFNdKz8pKT9cXHMqJC8pLG4scCxyLHMsdSxGLHY9eyRpZDpJYX07aWYoIW0pdGhyb3cgZChcImlleHBcIixrKTtmPW1bMV07aD1tWzJdOyhtPW1bM10pPyhuPWEobSkscD1mdW5jdGlvbihhLGMsZCl7RiYmKHZbRl09YSk7dlt1XT1jO3YuJGluZGV4PWQ7cmV0dXJuIG4oZSx2KX0pOihyPWZ1bmN0aW9uKGEsYyl7cmV0dXJuIElhKGMpfSxzPWZ1bmN0aW9uKGEpe3JldHVybiBhfSk7bT1mLm1hdGNoKC9eKD86KFtcXCRcXHddKyl8XFwoKFtcXCRcXHddKylcXHMqLFxccyooW1xcJFxcd10rKVxcKSkkLyk7aWYoIW0pdGhyb3cgZChcImlpZGV4cFwiLGYpO3U9bVszXXx8bVsxXTtGPW1bMl07dmFyIEI9e307ZS4kd2F0Y2hDb2xsZWN0aW9uKGgsZnVuY3Rpb24oYSl7dmFyIGYsaCxtPWdbMF0sbix2PXt9LEgsUix3LEMsVCx0LFxuRT1bXTtpZihhYihhKSlUPWEsbj1wfHxyO2Vsc2V7bj1wfHxzO1Q9W107Zm9yKHcgaW4gYSlhLmhhc093blByb3BlcnR5KHcpJiZcIiRcIiE9dy5jaGFyQXQoMCkmJlQucHVzaCh3KTtULnNvcnQoKX1IPVQubGVuZ3RoO2g9RS5sZW5ndGg9VC5sZW5ndGg7Zm9yKGY9MDtmPGg7ZisrKWlmKHc9YT09PVQ/ZjpUW2ZdLEM9YVt3XSxDPW4odyxDLGYpLEFhKEMsXCJgdHJhY2sgYnlgIGlkXCIpLEIuaGFzT3duUHJvcGVydHkoQykpdD1CW0NdLGRlbGV0ZSBCW0NdLHZbQ109dCxFW2ZdPXQ7ZWxzZXtpZih2Lmhhc093blByb3BlcnR5KEMpKXRocm93IHEoRSxmdW5jdGlvbihhKXthJiZhLnNjb3BlJiYoQlthLmlkXT1hKX0pLGQoXCJkdXBlc1wiLGssQyk7RVtmXT17aWQ6Q307dltDXT0hMX1mb3IodyBpbiBCKUIuaGFzT3duUHJvcGVydHkodykmJih0PUJbd10sZj15Yih0LmNsb25lKSxjLmxlYXZlKGYpLHEoZixmdW5jdGlvbihhKXthLiQkTkdfUkVNT1ZFRD0hMH0pLHQuc2NvcGUuJGRlc3Ryb3koKSk7XG5mPTA7Zm9yKGg9VC5sZW5ndGg7ZjxoO2YrKyl7dz1hPT09VD9mOlRbZl07Qz1hW3ddO3Q9RVtmXTtFW2YtMV0mJihtPUVbZi0xXS5jbG9uZVtFW2YtMV0uY2xvbmUubGVuZ3RoLTFdKTtpZih0LnNjb3BlKXtSPXQuc2NvcGU7bj1tO2RvIG49bi5uZXh0U2libGluZzt3aGlsZShuJiZuLiQkTkdfUkVNT1ZFRCk7dC5jbG9uZVswXSE9biYmYy5tb3ZlKHliKHQuY2xvbmUpLG51bGwseShtKSk7bT10LmNsb25lW3QuY2xvbmUubGVuZ3RoLTFdfWVsc2UgUj1lLiRuZXcoKTtSW3VdPUM7RiYmKFJbRl09dyk7Ui4kaW5kZXg9ZjtSLiRmaXJzdD0wPT09ZjtSLiRsYXN0PWY9PT1ILTE7Ui4kbWlkZGxlPSEoUi4kZmlyc3R8fFIuJGxhc3QpO1IuJG9kZD0hKFIuJGV2ZW49MD09PShmJjEpKTt0LnNjb3BlfHxsKFIsZnVuY3Rpb24oYSl7YVthLmxlbmd0aCsrXT1VLmNyZWF0ZUNvbW1lbnQoXCIgZW5kIG5nUmVwZWF0OiBcIitrK1wiIFwiKTtjLmVudGVyKGEsbnVsbCx5KG0pKTttPWE7dC5zY29wZT1SO3QuY2xvbmU9XG5hO3ZbdC5pZF09dH0pfUI9dn0pfX19XSx5ZD1bXCIkYW5pbWF0ZVwiLGZ1bmN0aW9uKGEpe3JldHVybiBmdW5jdGlvbihjLGQsZSl7Yy4kd2F0Y2goZS5uZ1Nob3csZnVuY3Rpb24oYyl7YVtRYShjKT9cInJlbW92ZUNsYXNzXCI6XCJhZGRDbGFzc1wiXShkLFwibmctaGlkZVwiKX0pfX1dLHJkPVtcIiRhbmltYXRlXCIsZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGMsZCxlKXtjLiR3YXRjaChlLm5nSGlkZSxmdW5jdGlvbihjKXthW1FhKGMpP1wiYWRkQ2xhc3NcIjpcInJlbW92ZUNsYXNzXCJdKGQsXCJuZy1oaWRlXCIpfSl9fV0semQ9dmEoZnVuY3Rpb24oYSxjLGQpe2EuJHdhdGNoKGQubmdTdHlsZSxmdW5jdGlvbihhLGQpe2QmJmEhPT1kJiZxKGQsZnVuY3Rpb24oYSxkKXtjLmNzcyhkLFwiXCIpfSk7YSYmYy5jc3MoYSl9LCEwKX0pLEFkPVtcIiRhbmltYXRlXCIsZnVuY3Rpb24oYSl7cmV0dXJue3Jlc3RyaWN0OlwiRUFcIixyZXF1aXJlOlwibmdTd2l0Y2hcIixjb250cm9sbGVyOltcIiRzY29wZVwiLGZ1bmN0aW9uKCl7dGhpcy5jYXNlcz1cbnt9fV0sbGluazpmdW5jdGlvbihjLGQsZSxnKXt2YXIgZixoLGwsaz1bXTtjLiR3YXRjaChlLm5nU3dpdGNofHxlLm9uLGZ1bmN0aW9uKGQpe3ZhciBuLHA9ay5sZW5ndGg7aWYoMDxwKXtpZihsKXtmb3Iobj0wO248cDtuKyspbFtuXS5yZW1vdmUoKTtsPW51bGx9bD1bXTtmb3Iobj0wO248cDtuKyspe3ZhciByPWhbbl07a1tuXS4kZGVzdHJveSgpO2xbbl09cjthLmxlYXZlKHIsZnVuY3Rpb24oKXtsLnNwbGljZShuLDEpOzA9PT1sLmxlbmd0aCYmKGw9bnVsbCl9KX19aD1bXTtrPVtdO2lmKGY9Zy5jYXNlc1tcIiFcIitkXXx8Zy5jYXNlc1tcIj9cIl0pYy4kZXZhbChlLmNoYW5nZSkscShmLGZ1bmN0aW9uKGQpe3ZhciBlPWMuJG5ldygpO2sucHVzaChlKTtkLnRyYW5zY2x1ZGUoZSxmdW5jdGlvbihjKXt2YXIgZT1kLmVsZW1lbnQ7aC5wdXNoKGMpO2EuZW50ZXIoYyxlLnBhcmVudCgpLGUpfSl9KX0pfX19XSxCZD12YSh7dHJhbnNjbHVkZTpcImVsZW1lbnRcIixwcmlvcml0eTo4MDAscmVxdWlyZTpcIl5uZ1N3aXRjaFwiLFxubGluazpmdW5jdGlvbihhLGMsZCxlLGcpe2UuY2FzZXNbXCIhXCIrZC5uZ1N3aXRjaFdoZW5dPWUuY2FzZXNbXCIhXCIrZC5uZ1N3aXRjaFdoZW5dfHxbXTtlLmNhc2VzW1wiIVwiK2QubmdTd2l0Y2hXaGVuXS5wdXNoKHt0cmFuc2NsdWRlOmcsZWxlbWVudDpjfSl9fSksQ2Q9dmEoe3RyYW5zY2x1ZGU6XCJlbGVtZW50XCIscHJpb3JpdHk6ODAwLHJlcXVpcmU6XCJebmdTd2l0Y2hcIixsaW5rOmZ1bmN0aW9uKGEsYyxkLGUsZyl7ZS5jYXNlc1tcIj9cIl09ZS5jYXNlc1tcIj9cIl18fFtdO2UuY2FzZXNbXCI/XCJdLnB1c2goe3RyYW5zY2x1ZGU6ZyxlbGVtZW50OmN9KX19KSxFZD12YSh7bGluazpmdW5jdGlvbihhLGMsZCxlLGcpe2lmKCFnKXRocm93IHQoXCJuZ1RyYW5zY2x1ZGVcIikoXCJvcnBoYW5cIixoYShjKSk7ZyhmdW5jdGlvbihhKXtjLmVtcHR5KCk7Yy5hcHBlbmQoYSl9KX19KSxlZD1bXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGEpe3JldHVybntyZXN0cmljdDpcIkVcIix0ZXJtaW5hbDohMCxjb21waWxlOmZ1bmN0aW9uKGMsXG5kKXtcInRleHQvbmctdGVtcGxhdGVcIj09ZC50eXBlJiZhLnB1dChkLmlkLGNbMF0udGV4dCl9fX1dLFRlPXQoXCJuZ09wdGlvbnNcIiksRGQ9YWEoe3Rlcm1pbmFsOiEwfSksZmQ9W1wiJGNvbXBpbGVcIixcIiRwYXJzZVwiLGZ1bmN0aW9uKGEsYyl7dmFyIGQ9L15cXHMqKFtcXHNcXFNdKz8pKD86XFxzK2FzXFxzKyhbXFxzXFxTXSs/KSk/KD86XFxzK2dyb3VwXFxzK2J5XFxzKyhbXFxzXFxTXSs/KSk/XFxzK2ZvclxccysoPzooW1xcJFxcd11bXFwkXFx3XSopfCg/OlxcKFxccyooW1xcJFxcd11bXFwkXFx3XSopXFxzKixcXHMqKFtcXCRcXHddW1xcJFxcd10qKVxccypcXCkpKVxccytpblxccysoW1xcc1xcU10rPykoPzpcXHMrdHJhY2tcXHMrYnlcXHMrKFtcXHNcXFNdKz8pKT8kLyxlPXskc2V0Vmlld1ZhbHVlOkN9O3JldHVybntyZXN0cmljdDpcIkVcIixyZXF1aXJlOltcInNlbGVjdFwiLFwiP25nTW9kZWxcIl0sY29udHJvbGxlcjpbXCIkZWxlbWVudFwiLFwiJHNjb3BlXCIsXCIkYXR0cnNcIixmdW5jdGlvbihhLGMsZCl7dmFyIGw9dGhpcyxrPXt9LG09ZSxuO2wuZGF0YWJvdW5kPVxuZC5uZ01vZGVsO2wuaW5pdD1mdW5jdGlvbihhLGMsZCl7bT1hO249ZH07bC5hZGRPcHRpb249ZnVuY3Rpb24oYyl7QWEoYywnXCJvcHRpb24gdmFsdWVcIicpO2tbY109ITA7bS4kdmlld1ZhbHVlPT1jJiYoYS52YWwoYyksbi5wYXJlbnQoKSYmbi5yZW1vdmUoKSl9O2wucmVtb3ZlT3B0aW9uPWZ1bmN0aW9uKGEpe3RoaXMuaGFzT3B0aW9uKGEpJiYoZGVsZXRlIGtbYV0sbS4kdmlld1ZhbHVlPT1hJiZ0aGlzLnJlbmRlclVua25vd25PcHRpb24oYSkpfTtsLnJlbmRlclVua25vd25PcHRpb249ZnVuY3Rpb24oYyl7Yz1cIj8gXCIrSWEoYykrXCIgP1wiO24udmFsKGMpO2EucHJlcGVuZChuKTthLnZhbChjKTtuLnByb3AoXCJzZWxlY3RlZFwiLCEwKX07bC5oYXNPcHRpb249ZnVuY3Rpb24oYSl7cmV0dXJuIGsuaGFzT3duUHJvcGVydHkoYSl9O2MuJG9uKFwiJGRlc3Ryb3lcIixmdW5jdGlvbigpe2wucmVuZGVyVW5rbm93bk9wdGlvbj1DfSl9XSxsaW5rOmZ1bmN0aW9uKGUsZixoLGwpe2Z1bmN0aW9uIGsoYSxcbmMsZCxlKXtkLiRyZW5kZXI9ZnVuY3Rpb24oKXt2YXIgYT1kLiR2aWV3VmFsdWU7ZS5oYXNPcHRpb24oYSk/KEEucGFyZW50KCkmJkEucmVtb3ZlKCksYy52YWwoYSksXCJcIj09PWEmJncucHJvcChcInNlbGVjdGVkXCIsITApKTpFKGEpJiZ3P2MudmFsKFwiXCIpOmUucmVuZGVyVW5rbm93bk9wdGlvbihhKX07Yy5vbihcImNoYW5nZVwiLGZ1bmN0aW9uKCl7YS4kYXBwbHkoZnVuY3Rpb24oKXtBLnBhcmVudCgpJiZBLnJlbW92ZSgpO2QuJHNldFZpZXdWYWx1ZShjLnZhbCgpKX0pfSl9ZnVuY3Rpb24gbShhLGMsZCl7dmFyIGU7ZC4kcmVuZGVyPWZ1bmN0aW9uKCl7dmFyIGE9bmV3IFZhKGQuJHZpZXdWYWx1ZSk7cShjLmZpbmQoXCJvcHRpb25cIiksZnVuY3Rpb24oYyl7Yy5zZWxlY3RlZD1CKGEuZ2V0KGMudmFsdWUpKX0pfTthLiR3YXRjaChmdW5jdGlvbigpe3hhKGUsZC4kdmlld1ZhbHVlKXx8KGU9YmEoZC4kdmlld1ZhbHVlKSxkLiRyZW5kZXIoKSl9KTtjLm9uKFwiY2hhbmdlXCIsZnVuY3Rpb24oKXthLiRhcHBseShmdW5jdGlvbigpe3ZhciBhPVxuW107cShjLmZpbmQoXCJvcHRpb25cIiksZnVuY3Rpb24oYyl7Yy5zZWxlY3RlZCYmYS5wdXNoKGMudmFsdWUpfSk7ZC4kc2V0Vmlld1ZhbHVlKGEpfSl9KX1mdW5jdGlvbiBuKGUsZixnKXtmdW5jdGlvbiBoKCl7dmFyIGE9e1wiXCI6W119LGM9W1wiXCJdLGQsayxzLHQsejt0PWcuJG1vZGVsVmFsdWU7ej15KGUpfHxbXTt2YXIgRT1uP1FiKHopOnosRixJLEE7ST17fTtzPSExO3ZhciBELEg7aWYocilpZih3JiZNKHQpKWZvcihzPW5ldyBWYShbXSksQT0wO0E8dC5sZW5ndGg7QSsrKUlbbV09dFtBXSxzLnB1dCh3KGUsSSksdFtBXSk7ZWxzZSBzPW5ldyBWYSh0KTtmb3IoQT0wO0Y9RS5sZW5ndGgsQTxGO0ErKyl7az1BO2lmKG4pe2s9RVtBXTtpZihcIiRcIj09PWsuY2hhckF0KDApKWNvbnRpbnVlO0lbbl09a31JW21dPXpba107ZD1wKGUsSSl8fFwiXCI7KGs9YVtkXSl8fChrPWFbZF09W10sYy5wdXNoKGQpKTtyP2Q9QihzLnJlbW92ZSh3P3coZSxJKTpxKGUsSSkpKToodz8oZD17fSxkW21dPXQsZD1cbncoZSxkKT09PXcoZSxJKSk6ZD10PT09cShlLEkpLHM9c3x8ZCk7RD1sKGUsSSk7RD1CKEQpP0Q6XCJcIjtrLnB1c2goe2lkOnc/dyhlLEkpOm4/RVtBXTpBLGxhYmVsOkQsc2VsZWN0ZWQ6ZH0pfXJ8fCh1fHxudWxsPT09dD9hW1wiXCJdLnVuc2hpZnQoe2lkOlwiXCIsbGFiZWw6XCJcIixzZWxlY3RlZDohc30pOnN8fGFbXCJcIl0udW5zaGlmdCh7aWQ6XCI/XCIsbGFiZWw6XCJcIixzZWxlY3RlZDohMH0pKTtJPTA7Zm9yKEU9Yy5sZW5ndGg7STxFO0krKyl7ZD1jW0ldO2s9YVtkXTt4Lmxlbmd0aDw9ST8odD17ZWxlbWVudDpDLmNsb25lKCkuYXR0cihcImxhYmVsXCIsZCksbGFiZWw6ay5sYWJlbH0sej1bdF0seC5wdXNoKHopLGYuYXBwZW5kKHQuZWxlbWVudCkpOih6PXhbSV0sdD16WzBdLHQubGFiZWwhPWQmJnQuZWxlbWVudC5hdHRyKFwibGFiZWxcIix0LmxhYmVsPWQpKTtEPW51bGw7QT0wO2ZvcihGPWsubGVuZ3RoO0E8RjtBKyspcz1rW0FdLChkPXpbQSsxXSk/KEQ9ZC5lbGVtZW50LGQubGFiZWwhPT1zLmxhYmVsJiZcbkQudGV4dChkLmxhYmVsPXMubGFiZWwpLGQuaWQhPT1zLmlkJiZELnZhbChkLmlkPXMuaWQpLGQuc2VsZWN0ZWQhPT1zLnNlbGVjdGVkJiZELnByb3AoXCJzZWxlY3RlZFwiLGQuc2VsZWN0ZWQ9cy5zZWxlY3RlZCkpOihcIlwiPT09cy5pZCYmdT9IPXU6KEg9di5jbG9uZSgpKS52YWwocy5pZCkuYXR0cihcInNlbGVjdGVkXCIscy5zZWxlY3RlZCkudGV4dChzLmxhYmVsKSx6LnB1c2goe2VsZW1lbnQ6SCxsYWJlbDpzLmxhYmVsLGlkOnMuaWQsc2VsZWN0ZWQ6cy5zZWxlY3RlZH0pLEQ/RC5hZnRlcihIKTp0LmVsZW1lbnQuYXBwZW5kKEgpLEQ9SCk7Zm9yKEErKzt6Lmxlbmd0aD5BOyl6LnBvcCgpLmVsZW1lbnQucmVtb3ZlKCl9Zm9yKDt4Lmxlbmd0aD5JOyl4LnBvcCgpWzBdLmVsZW1lbnQucmVtb3ZlKCl9dmFyIGs7aWYoIShrPXQubWF0Y2goZCkpKXRocm93IFRlKFwiaWV4cFwiLHQsaGEoZikpO3ZhciBsPWMoa1syXXx8a1sxXSksbT1rWzRdfHxrWzZdLG49a1s1XSxwPWMoa1szXXx8XCJcIikscT1cbmMoa1syXT9rWzFdOm0pLHk9YyhrWzddKSx3PWtbOF0/YyhrWzhdKTpudWxsLHg9W1t7ZWxlbWVudDpmLGxhYmVsOlwiXCJ9XV07dSYmKGEodSkoZSksdS5yZW1vdmVDbGFzcyhcIm5nLXNjb3BlXCIpLHUucmVtb3ZlKCkpO2YuZW1wdHkoKTtmLm9uKFwiY2hhbmdlXCIsZnVuY3Rpb24oKXtlLiRhcHBseShmdW5jdGlvbigpe3ZhciBhLGM9eShlKXx8W10sZD17fSxoLGssbCxwLHQsdix1O2lmKHIpZm9yKGs9W10scD0wLHY9eC5sZW5ndGg7cDx2O3ArKylmb3IoYT14W3BdLGw9MSx0PWEubGVuZ3RoO2w8dDtsKyspe2lmKChoPWFbbF0uZWxlbWVudClbMF0uc2VsZWN0ZWQpe2g9aC52YWwoKTtuJiYoZFtuXT1oKTtpZih3KWZvcih1PTA7dTxjLmxlbmd0aCYmKGRbbV09Y1t1XSx3KGUsZCkhPWgpO3UrKyk7ZWxzZSBkW21dPWNbaF07ay5wdXNoKHEoZSxkKSl9fWVsc2V7aD1mLnZhbCgpO2lmKFwiP1wiPT1oKWs9cztlbHNlIGlmKFwiXCI9PT1oKWs9bnVsbDtlbHNlIGlmKHcpZm9yKHU9MDt1PGMubGVuZ3RoO3UrKyl7aWYoZFttXT1cbmNbdV0sdyhlLGQpPT1oKXtrPXEoZSxkKTticmVha319ZWxzZSBkW21dPWNbaF0sbiYmKGRbbl09aCksaz1xKGUsZCk7MTx4WzBdLmxlbmd0aCYmeFswXVsxXS5pZCE9PWgmJih4WzBdWzFdLnNlbGVjdGVkPSExKX1nLiRzZXRWaWV3VmFsdWUoayl9KX0pO2cuJHJlbmRlcj1oO2UuJHdhdGNoKGgpfWlmKGxbMV0pe3ZhciBwPWxbMF07bD1sWzFdO3ZhciByPWgubXVsdGlwbGUsdD1oLm5nT3B0aW9ucyx1PSExLHcsdj15KFUuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSksQz15KFUuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpKSxBPXYuY2xvbmUoKTtoPTA7Zm9yKHZhciB4PWYuY2hpbGRyZW4oKSxEPXgubGVuZ3RoO2g8RDtoKyspaWYoXCJcIj09PXhbaF0udmFsdWUpe3c9dT14LmVxKGgpO2JyZWFrfXAuaW5pdChsLHUsQSk7ciYmKGwuJGlzRW1wdHk9ZnVuY3Rpb24oYSl7cmV0dXJuIWF8fDA9PT1hLmxlbmd0aH0pO3Q/bihlLGYsbCk6cj9tKGUsZixsKTprKGUsZixsLHApfX19fV0saGQ9W1wiJGludGVycG9sYXRlXCIsXG5mdW5jdGlvbihhKXt2YXIgYz17YWRkT3B0aW9uOkMscmVtb3ZlT3B0aW9uOkN9O3JldHVybntyZXN0cmljdDpcIkVcIixwcmlvcml0eToxMDAsY29tcGlsZTpmdW5jdGlvbihkLGUpe2lmKEUoZS52YWx1ZSkpe3ZhciBnPWEoZC50ZXh0KCksITApO2d8fGUuJHNldChcInZhbHVlXCIsZC50ZXh0KCkpfXJldHVybiBmdW5jdGlvbihhLGQsZSl7dmFyIGs9ZC5wYXJlbnQoKSxtPWsuZGF0YShcIiRzZWxlY3RDb250cm9sbGVyXCIpfHxrLnBhcmVudCgpLmRhdGEoXCIkc2VsZWN0Q29udHJvbGxlclwiKTttJiZtLmRhdGFib3VuZD9kLnByb3AoXCJzZWxlY3RlZFwiLCExKTptPWM7Zz9hLiR3YXRjaChnLGZ1bmN0aW9uKGEsYyl7ZS4kc2V0KFwidmFsdWVcIixhKTthIT09YyYmbS5yZW1vdmVPcHRpb24oYyk7bS5hZGRPcHRpb24oYSl9KTptLmFkZE9wdGlvbihlLnZhbHVlKTtkLm9uKFwiJGRlc3Ryb3lcIixmdW5jdGlvbigpe20ucmVtb3ZlT3B0aW9uKGUudmFsdWUpfSl9fX19XSxnZD1hYSh7cmVzdHJpY3Q6XCJFXCIsXG50ZXJtaW5hbDohMH0pO08uYW5ndWxhci5ib290c3RyYXA/Y29uc29sZS5sb2coXCJXQVJOSU5HOiBUcmllZCB0byBsb2FkIGFuZ3VsYXIgbW9yZSB0aGFuIG9uY2UuXCIpOigoR2E9Ty5qUXVlcnkpPyh5PUdhLEQoR2EuZm4se3Njb3BlOkphLnNjb3BlLGlzb2xhdGVTY29wZTpKYS5pc29sYXRlU2NvcGUsY29udHJvbGxlcjpKYS5jb250cm9sbGVyLGluamVjdG9yOkphLmluamVjdG9yLGluaGVyaXRlZERhdGE6SmEuaW5oZXJpdGVkRGF0YX0pLEFiKFwicmVtb3ZlXCIsITAsITAsITEpLEFiKFwiZW1wdHlcIiwhMSwhMSwhMSksQWIoXCJodG1sXCIsITEsITEsITApKTp5PU4sRWEuZWxlbWVudD15LFpjKEVhKSx5KFUpLnJlYWR5KGZ1bmN0aW9uKCl7V2MoVSwkYil9KSl9KSh3aW5kb3csZG9jdW1lbnQpOyFhbmd1bGFyLiQkY3NwKCkmJmFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkuZmluZChcImhlYWRcIikucHJlcGVuZCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPkBjaGFyc2V0IFwiVVRGLThcIjtbbmdcXFxcOmNsb2FrXSxbbmctY2xvYWtdLFtkYXRhLW5nLWNsb2FrXSxbeC1uZy1jbG9ha10sLm5nLWNsb2FrLC54LW5nLWNsb2FrLC5uZy1oaWRle2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50O31uZ1xcXFw6Zm9ybXtkaXNwbGF5OmJsb2NrO30ubmctYW5pbWF0ZS1ibG9jay10cmFuc2l0aW9uc3t0cmFuc2l0aW9uOjBzIGFsbCFpbXBvcnRhbnQ7LXdlYmtpdC10cmFuc2l0aW9uOjBzIGFsbCFpbXBvcnRhbnQ7fTwvc3R5bGU+Jyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbmd1bGFyLm1pbi5qcy5tYXBcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJuZ3BtY1FcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYW5ndWxhclxcXFxsaWJcXFxcYW5ndWxhci5taW4uanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYW5ndWxhclxcXFxsaWJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5fdXNlVHlwZWRBcnJheXNgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAoY29tcGF0aWJsZSBkb3duIHRvIElFNilcbiAqL1xuQnVmZmVyLl91c2VUeXBlZEFycmF5cyA9IChmdW5jdGlvbiAoKSB7XG4gIC8vIERldGVjdCBpZiBicm93c2VyIHN1cHBvcnRzIFR5cGVkIEFycmF5cy4gU3VwcG9ydGVkIGJyb3dzZXJzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssXG4gIC8vIENocm9tZSA3KywgU2FmYXJpIDUuMSssIE9wZXJhIDExLjYrLCBpT1MgNC4yKy4gSWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmdcbiAgLy8gcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLCB0aGVuIHRoYXQncyB0aGUgc2FtZSBhcyBubyBgVWludDhBcnJheWAgc3VwcG9ydFxuICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBhZGQgYWxsIHRoZSBub2RlIEJ1ZmZlciBBUEkgbWV0aG9kcy4gVGhpcyBpcyBhbiBpc3N1ZVxuICAvLyBpbiBGaXJlZm94IDQtMjkuIE5vdyBmaXhlZDogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4XG4gIHRyeSB7XG4gICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigwKVxuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheShidWYpXG4gICAgYXJyLmZvbyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH1cbiAgICByZXR1cm4gNDIgPT09IGFyci5mb28oKSAmJlxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nIC8vIENocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn0pKClcblxuLyoqXG4gKiBDbGFzczogQnVmZmVyXG4gKiA9PT09PT09PT09PT09XG4gKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBhcmUgYXVnbWVudGVkXG4gKiB3aXRoIGZ1bmN0aW9uIHByb3BlcnRpZXMgZm9yIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBBUEkgZnVuY3Rpb25zLiBXZSB1c2VcbiAqIGBVaW50OEFycmF5YCBzbyB0aGF0IHNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0IHJldHVybnNcbiAqIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIEJ5IGF1Z21lbnRpbmcgdGhlIGluc3RhbmNlcywgd2UgY2FuIGF2b2lkIG1vZGlmeWluZyB0aGUgYFVpbnQ4QXJyYXlgXG4gKiBwcm90b3R5cGUuXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlciAoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSlcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKVxuXG4gIHZhciB0eXBlID0gdHlwZW9mIHN1YmplY3RcblxuICAvLyBXb3JrYXJvdW5kOiBub2RlJ3MgYmFzZTY0IGltcGxlbWVudGF0aW9uIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBzdHJpbmdzXG4gIC8vIHdoaWxlIGJhc2U2NC1qcyBkb2VzIG5vdC5cbiAgaWYgKGVuY29kaW5nID09PSAnYmFzZTY0JyAmJiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHN1YmplY3QgPSBzdHJpbmd0cmltKHN1YmplY3QpXG4gICAgd2hpbGUgKHN1YmplY3QubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgICAgc3ViamVjdCA9IHN1YmplY3QgKyAnPSdcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSBsZW5ndGhcbiAgdmFyIGxlbmd0aFxuICBpZiAodHlwZSA9PT0gJ251bWJlcicpXG4gICAgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QpXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKVxuICAgIGxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHN1YmplY3QsIGVuY29kaW5nKVxuICBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0JylcbiAgICBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdC5sZW5ndGgpIC8vIGFzc3VtZSB0aGF0IG9iamVjdCBpcyBhcnJheS1saWtlXG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuJylcblxuICB2YXIgYnVmXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgLy8gUHJlZmVycmVkOiBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIGJ1ZiA9IEJ1ZmZlci5fYXVnbWVudChuZXcgVWludDhBcnJheShsZW5ndGgpKVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gVEhJUyBpbnN0YW5jZSBvZiBCdWZmZXIgKGNyZWF0ZWQgYnkgYG5ld2ApXG4gICAgYnVmID0gdGhpc1xuICAgIGJ1Zi5sZW5ndGggPSBsZW5ndGhcbiAgICBidWYuX2lzQnVmZmVyID0gdHJ1ZVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgdHlwZW9mIHN1YmplY3QuYnl0ZUxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBTcGVlZCBvcHRpbWl6YXRpb24gLS0gdXNlIHNldCBpZiB3ZSdyZSBjb3B5aW5nIGZyb20gYSB0eXBlZCBhcnJheVxuICAgIGJ1Zi5fc2V0KHN1YmplY3QpXG4gIH0gZWxzZSBpZiAoaXNBcnJheWlzaChzdWJqZWN0KSkge1xuICAgIC8vIFRyZWF0IGFycmF5LWlzaCBvYmplY3RzIGFzIGEgYnl0ZSBhcnJheVxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSlcbiAgICAgICAgYnVmW2ldID0gc3ViamVjdC5yZWFkVUludDgoaSlcbiAgICAgIGVsc2VcbiAgICAgICAgYnVmW2ldID0gc3ViamVjdFtpXVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGJ1Zi53cml0ZShzdWJqZWN0LCAwLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiAhQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiAhbm9aZXJvKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBidWZbaV0gPSAwXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG4vLyBTVEFUSUMgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIChiKSB7XG4gIHJldHVybiAhIShiICE9PSBudWxsICYmIGIgIT09IHVuZGVmaW5lZCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmJ5dGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyLCBlbmNvZGluZykge1xuICB2YXIgcmV0XG4gIHN0ciA9IHN0ciArICcnXG4gIHN3aXRjaCAoZW5jb2RpbmcgfHwgJ3V0ZjgnKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggLyAyXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IHV0ZjhUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBiYXNlNjRUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoICogMlxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiAobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgYXNzZXJ0KGlzQXJyYXkobGlzdCksICdVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0LCBbdG90YWxMZW5ndGhdKVxcbicgK1xuICAgICAgJ2xpc3Qgc2hvdWxkIGJlIGFuIEFycmF5LicpXG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoMClcbiAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBsaXN0WzBdXG4gIH1cblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHRvdGFsTGVuZ3RoICE9PSAnbnVtYmVyJykge1xuICAgIHRvdGFsTGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0b3RhbExlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHRvdGFsTGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIGl0ZW0uY29weShidWYsIHBvcylcbiAgICBwb3MgKz0gaXRlbS5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cbi8vIEJVRkZFUiBJTlNUQU5DRSBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBfaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBhc3NlcnQoc3RyTGVuICUgMiA9PT0gMCwgJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBieXRlID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGFzc2VydCghaXNOYU4oYnl0ZSksICdJbnZhbGlkIGhleCBzdHJpbmcnKVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGVcbiAgfVxuICBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGkgKiAyXG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIF91dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfYmluYXJ5V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gX2FzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBfYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIFN1cHBvcnQgYm90aCAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpXG4gIC8vIGFuZCB0aGUgbGVnYWN5IChzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBpZiAoIWlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIH0gZWxzZSB7ICAvLyBsZWdhY3lcbiAgICB2YXIgc3dhcCA9IGVuY29kaW5nXG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBvZmZzZXQgPSBsZW5ndGhcbiAgICBsZW5ndGggPSBzd2FwXG4gIH1cblxuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKVxuXG4gIHZhciByZXRcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuXG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKVxuICBzdGFydCA9IE51bWJlcihzdGFydCkgfHwgMFxuICBlbmQgPSAoZW5kICE9PSB1bmRlZmluZWQpXG4gICAgPyBOdW1iZXIoZW5kKVxuICAgIDogZW5kID0gc2VsZi5sZW5ndGhcblxuICAvLyBGYXN0cGF0aCBlbXB0eSBzdHJpbmdzXG4gIGlmIChlbmQgPT09IHN0YXJ0KVxuICAgIHJldHVybiAnJ1xuXG4gIHZhciByZXRcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRfc3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXNcblxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAoIXRhcmdldF9zdGFydCkgdGFyZ2V0X3N0YXJ0ID0gMFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ3NvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0JylcbiAgYXNzZXJ0KHRhcmdldF9zdGFydCA+PSAwICYmIHRhcmdldF9zdGFydCA8IHRhcmdldC5sZW5ndGgsXG4gICAgICAndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgc291cmNlLmxlbmd0aCwgJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKVxuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0IDwgZW5kIC0gc3RhcnQpXG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCArIHN0YXJ0XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG5cbiAgaWYgKGxlbiA8IDEwMCB8fCAhQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICB0YXJnZXRbaSArIHRhcmdldF9zdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuX3NldCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksIHRhcmdldF9zdGFydClcbiAgfVxufVxuXG5mdW5jdGlvbiBfYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIF91dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmVzID0gJydcbiAgdmFyIHRtcCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIGlmIChidWZbaV0gPD0gMHg3Rikge1xuICAgICAgcmVzICs9IGRlY29kZVV0ZjhDaGFyKHRtcCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgICAgIHRtcCA9ICcnXG4gICAgfSBlbHNlIHtcbiAgICAgIHRtcCArPSAnJScgKyBidWZbaV0udG9TdHJpbmcoMTYpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcyArIGRlY29kZVV0ZjhDaGFyKHRtcClcbn1cblxuZnVuY3Rpb24gX2FzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKVxuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBfYmluYXJ5U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gX2FzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKVxufVxuXG5mdW5jdGlvbiBfaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpKzFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IGNsYW1wKHN0YXJ0LCBsZW4sIDApXG4gIGVuZCA9IGNsYW1wKGVuZCwgbGVuLCBsZW4pXG5cbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICByZXR1cm4gQnVmZmVyLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCkpXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICB2YXIgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkLCB0cnVlKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47IGkrKykge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICAgIHJldHVybiBuZXdCdWZcbiAgfVxufVxuXG4vLyBgZ2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy5yZWFkVUludDgob2Zmc2V0KVxufVxuXG4vLyBgc2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodiwgb2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy53cml0ZVVJbnQ4KHYsIG9mZnNldClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuZnVuY3Rpb24gX3JlYWRVSW50MTYgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsXG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XVxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4XG4gIH0gZWxzZSB7XG4gICAgdmFsID0gYnVmW29mZnNldF0gPDwgOFxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkVUludDMyIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbFxuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pXG4gICAgICB2YWwgPSBidWZbb2Zmc2V0ICsgMl0gPDwgMTZcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgOFxuICAgIHZhbCB8PSBidWZbb2Zmc2V0XVxuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKVxuICAgICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXQgKyAzXSA8PCAyNCA+Pj4gMClcbiAgfSBlbHNlIHtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCA9IGJ1ZltvZmZzZXQgKyAxXSA8PCAxNlxuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAyXSA8PCA4XG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDNdXG4gICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXRdIDw8IDI0ID4+PiAwKVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCxcbiAgICAgICAgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIHZhciBuZWcgPSB0aGlzW29mZnNldF0gJiAweDgwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5mdW5jdGlvbiBfcmVhZEludDE2IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpXG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmZmZiAtIHZhbCArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRJbnQzMiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKVxuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwMDAwMFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZmZmZmZmZiAtIHZhbCArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRGbG9hdCAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZERvdWJsZSAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmYpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm5cblxuICB0aGlzW29mZnNldF0gPSB2YWx1ZVxufVxuXG5mdW5jdGlvbiBfd3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDIpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID1cbiAgICAgICAgKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgICAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmZmZmZilcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCA0KTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9XG4gICAgICAgICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZiwgLTB4ODApXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIHRoaXMud3JpdGVVSW50OCh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydClcbiAgZWxzZVxuICAgIHRoaXMud3JpdGVVSW50OCgweGZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmYsIC0weDgwMDApXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICBfd3JpdGVVSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgX3dyaXRlVUludDE2KGJ1ZiwgMHhmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgX3dyaXRlVUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbiAgZWxzZVxuICAgIF93cml0ZVVJbnQzMihidWYsIDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLFxuICAgICAgICAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGZpbGwodmFsdWUsIHN0YXJ0PTAsIGVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gIGlmICghdmFsdWUpIHZhbHVlID0gMFxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQpIGVuZCA9IHRoaXMubGVuZ3RoXG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLmNoYXJDb2RlQXQoMClcbiAgfVxuXG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSksICd2YWx1ZSBpcyBub3QgYSBudW1iZXInKVxuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnZW5kIDwgc3RhcnQnKVxuXG4gIC8vIEZpbGwgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCB0aGlzLmxlbmd0aCwgJ3N0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHRoaXMubGVuZ3RoLCAnZW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgdGhpc1tpXSA9IHZhbHVlXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3V0ID0gW11cbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBvdXRbaV0gPSB0b0hleCh0aGlzW2ldKVxuICAgIGlmIChpID09PSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTKSB7XG4gICAgICBvdXRbaSArIDFdID0gJy4uLidcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgb3V0LmpvaW4oJyAnKSArICc+J1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYEFycmF5QnVmZmVyYCB3aXRoIHRoZSAqY29waWVkKiBtZW1vcnkgb2YgdGhlIGJ1ZmZlciBpbnN0YW5jZS5cbiAqIEFkZGVkIGluIE5vZGUgMC4xMi4gT25seSBhdmFpbGFibGUgaW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IEFycmF5QnVmZmVyLlxuICovXG5CdWZmZXIucHJvdG90eXBlLnRvQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgICAgcmV0dXJuIChuZXcgQnVmZmVyKHRoaXMpKS5idWZmZXJcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJ1Zi5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSlcbiAgICAgICAgYnVmW2ldID0gdGhpc1tpXVxuICAgICAgcmV0dXJuIGJ1Zi5idWZmZXJcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpXG4gIH1cbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG52YXIgQlAgPSBCdWZmZXIucHJvdG90eXBlXG5cbi8qKlxuICogQXVnbWVudCBhIFVpbnQ4QXJyYXkgKmluc3RhbmNlKiAobm90IHRoZSBVaW50OEFycmF5IGNsYXNzISkgd2l0aCBCdWZmZXIgbWV0aG9kc1xuICovXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5faXNCdWZmZXIgPSB0cnVlXG5cbiAgLy8gc2F2ZSByZWZlcmVuY2UgdG8gb3JpZ2luYWwgVWludDhBcnJheSBnZXQvc2V0IG1ldGhvZHMgYmVmb3JlIG92ZXJ3cml0aW5nXG4gIGFyci5fZ2V0ID0gYXJyLmdldFxuICBhcnIuX3NldCA9IGFyci5zZXRcblxuICAvLyBkZXByZWNhdGVkLCB3aWxsIGJlIHJlbW92ZWQgaW4gbm9kZSAwLjEzK1xuICBhcnIuZ2V0ID0gQlAuZ2V0XG4gIGFyci5zZXQgPSBCUC5zZXRcblxuICBhcnIud3JpdGUgPSBCUC53cml0ZVxuICBhcnIudG9TdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9Mb2NhbGVTdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9KU09OID0gQlAudG9KU09OXG4gIGFyci5jb3B5ID0gQlAuY29weVxuICBhcnIuc2xpY2UgPSBCUC5zbGljZVxuICBhcnIucmVhZFVJbnQ4ID0gQlAucmVhZFVJbnQ4XG4gIGFyci5yZWFkVUludDE2TEUgPSBCUC5yZWFkVUludDE2TEVcbiAgYXJyLnJlYWRVSW50MTZCRSA9IEJQLnJlYWRVSW50MTZCRVxuICBhcnIucmVhZFVJbnQzMkxFID0gQlAucmVhZFVJbnQzMkxFXG4gIGFyci5yZWFkVUludDMyQkUgPSBCUC5yZWFkVUludDMyQkVcbiAgYXJyLnJlYWRJbnQ4ID0gQlAucmVhZEludDhcbiAgYXJyLnJlYWRJbnQxNkxFID0gQlAucmVhZEludDE2TEVcbiAgYXJyLnJlYWRJbnQxNkJFID0gQlAucmVhZEludDE2QkVcbiAgYXJyLnJlYWRJbnQzMkxFID0gQlAucmVhZEludDMyTEVcbiAgYXJyLnJlYWRJbnQzMkJFID0gQlAucmVhZEludDMyQkVcbiAgYXJyLnJlYWRGbG9hdExFID0gQlAucmVhZEZsb2F0TEVcbiAgYXJyLnJlYWRGbG9hdEJFID0gQlAucmVhZEZsb2F0QkVcbiAgYXJyLnJlYWREb3VibGVMRSA9IEJQLnJlYWREb3VibGVMRVxuICBhcnIucmVhZERvdWJsZUJFID0gQlAucmVhZERvdWJsZUJFXG4gIGFyci53cml0ZVVJbnQ4ID0gQlAud3JpdGVVSW50OFxuICBhcnIud3JpdGVVSW50MTZMRSA9IEJQLndyaXRlVUludDE2TEVcbiAgYXJyLndyaXRlVUludDE2QkUgPSBCUC53cml0ZVVJbnQxNkJFXG4gIGFyci53cml0ZVVJbnQzMkxFID0gQlAud3JpdGVVSW50MzJMRVxuICBhcnIud3JpdGVVSW50MzJCRSA9IEJQLndyaXRlVUludDMyQkVcbiAgYXJyLndyaXRlSW50OCA9IEJQLndyaXRlSW50OFxuICBhcnIud3JpdGVJbnQxNkxFID0gQlAud3JpdGVJbnQxNkxFXG4gIGFyci53cml0ZUludDE2QkUgPSBCUC53cml0ZUludDE2QkVcbiAgYXJyLndyaXRlSW50MzJMRSA9IEJQLndyaXRlSW50MzJMRVxuICBhcnIud3JpdGVJbnQzMkJFID0gQlAud3JpdGVJbnQzMkJFXG4gIGFyci53cml0ZUZsb2F0TEUgPSBCUC53cml0ZUZsb2F0TEVcbiAgYXJyLndyaXRlRmxvYXRCRSA9IEJQLndyaXRlRmxvYXRCRVxuICBhcnIud3JpdGVEb3VibGVMRSA9IEJQLndyaXRlRG91YmxlTEVcbiAgYXJyLndyaXRlRG91YmxlQkUgPSBCUC53cml0ZURvdWJsZUJFXG4gIGFyci5maWxsID0gQlAuZmlsbFxuICBhcnIuaW5zcGVjdCA9IEJQLmluc3BlY3RcbiAgYXJyLnRvQXJyYXlCdWZmZXIgPSBCUC50b0FycmF5QnVmZmVyXG5cbiAgcmV0dXJuIGFyclxufVxuXG4vLyBzbGljZShzdGFydCwgZW5kKVxuZnVuY3Rpb24gY2xhbXAgKGluZGV4LCBsZW4sIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICBpbmRleCA9IH5+aW5kZXg7ICAvLyBDb2VyY2UgdG8gaW50ZWdlci5cbiAgaWYgKGluZGV4ID49IGxlbikgcmV0dXJuIGxlblxuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4XG4gIGluZGV4ICs9IGxlblxuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIGNvZXJjZSAobGVuZ3RoKSB7XG4gIC8vIENvZXJjZSBsZW5ndGggdG8gYSBudW1iZXIgKHBvc3NpYmx5IE5hTiksIHJvdW5kIHVwXG4gIC8vIGluIGNhc2UgaXQncyBmcmFjdGlvbmFsIChlLmcuIDEyMy40NTYpIHRoZW4gZG8gYVxuICAvLyBkb3VibGUgbmVnYXRlIHRvIGNvZXJjZSBhIE5hTiB0byAwLiBFYXN5LCByaWdodD9cbiAgbGVuZ3RoID0gfn5NYXRoLmNlaWwoK2xlbmd0aClcbiAgcmV0dXJuIGxlbmd0aCA8IDAgPyAwIDogbGVuZ3RoXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkgKHN1YmplY3QpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChzdWJqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdWJqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuICB9KShzdWJqZWN0KVxufVxuXG5mdW5jdGlvbiBpc0FycmF5aXNoIChzdWJqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5KHN1YmplY3QpIHx8IEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSB8fFxuICAgICAgc3ViamVjdCAmJiB0eXBlb2Ygc3ViamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBzdWJqZWN0Lmxlbmd0aCA9PT0gJ251bWJlcidcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBpZiAoYiA8PSAweDdGKVxuICAgICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpXG4gICAgZWxzZSB7XG4gICAgICB2YXIgc3RhcnQgPSBpXG4gICAgICBpZiAoYiA+PSAweEQ4MDAgJiYgYiA8PSAweERGRkYpIGkrK1xuICAgICAgdmFyIGggPSBlbmNvZGVVUklDb21wb25lbnQoc3RyLnNsaWNlKHN0YXJ0LCBpKzEpKS5zdWJzdHIoMSkuc3BsaXQoJyUnKVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBoLmxlbmd0aDsgaisrKVxuICAgICAgICBieXRlQXJyYXkucHVzaChwYXJzZUludChoW2pdLCAxNikpXG4gICAgfVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KHN0cilcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBwb3NcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSlcbiAgICAgIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gZGVjb2RlVXRmOENoYXIgKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpIC8vIFVURiA4IGludmFsaWQgY2hhclxuICB9XG59XG5cbi8qXG4gKiBXZSBoYXZlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGludGVnZXIuIFRoaXMgbWVhbnMgdGhhdCBpdFxuICogaXMgbm9uLW5lZ2F0aXZlLiBJdCBoYXMgbm8gZnJhY3Rpb25hbCBjb21wb25lbnQgYW5kIHRoYXQgaXQgZG9lcyBub3RcbiAqIGV4Y2VlZCB0aGUgbWF4aW11bSBhbGxvd2VkIHZhbHVlLlxuICovXG5mdW5jdGlvbiB2ZXJpZnVpbnQgKHZhbHVlLCBtYXgpIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlID49IDAsICdzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlJylcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jylcbn1cblxuZnVuY3Rpb24gdmVyaWZzaW50ICh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jylcbn1cblxuZnVuY3Rpb24gdmVyaWZJRUVFNzU0ICh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJylcbn1cblxuZnVuY3Rpb24gYXNzZXJ0ICh0ZXN0LCBtZXNzYWdlKSB7XG4gIGlmICghdGVzdCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgJ0ZhaWxlZCBhc3NlcnRpb24nKVxufVxuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIm5ncG1jUVwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxndWxwLWJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclxcXFxpbmRleC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxndWxwLWJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbnZhciBsb29rdXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG4gIHZhciBBcnIgPSAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKVxuICAgID8gVWludDhBcnJheVxuICAgIDogQXJyYXlcblxuXHR2YXIgUExVUyAgID0gJysnLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIICA9ICcvJy5jaGFyQ29kZUF0KDApXG5cdHZhciBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKVxuXHR2YXIgTE9XRVIgID0gJ2EnLmNoYXJDb2RlQXQoMClcblx0dmFyIFVQUEVSICA9ICdBJy5jaGFyQ29kZUF0KDApXG5cblx0ZnVuY3Rpb24gZGVjb2RlIChlbHQpIHtcblx0XHR2YXIgY29kZSA9IGVsdC5jaGFyQ29kZUF0KDApXG5cdFx0aWYgKGNvZGUgPT09IFBMVVMpXG5cdFx0XHRyZXR1cm4gNjIgLy8gJysnXG5cdFx0aWYgKGNvZGUgPT09IFNMQVNIKVxuXHRcdFx0cmV0dXJuIDYzIC8vICcvJ1xuXHRcdGlmIChjb2RlIDwgTlVNQkVSKVxuXHRcdFx0cmV0dXJuIC0xIC8vbm8gbWF0Y2hcblx0XHRpZiAoY29kZSA8IE5VTUJFUiArIDEwKVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBOVU1CRVIgKyAyNiArIDI2XG5cdFx0aWYgKGNvZGUgPCBVUFBFUiArIDI2KVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBVUFBFUlxuXHRcdGlmIChjb2RlIDwgTE9XRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gTE9XRVIgKyAyNlxuXHR9XG5cblx0ZnVuY3Rpb24gYjY0VG9CeXRlQXJyYXkgKGI2NCkge1xuXHRcdHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyXG5cblx0XHRpZiAoYjY0Lmxlbmd0aCAlIDQgPiAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuXHRcdH1cblxuXHRcdC8vIHRoZSBudW1iZXIgb2YgZXF1YWwgc2lnbnMgKHBsYWNlIGhvbGRlcnMpXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuXHRcdC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuXHRcdC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lLCB0aGVuIHRoZSB0aHJlZSBjaGFyYWN0ZXJzIGJlZm9yZSBpdCByZXByZXNlbnQgMiBieXRlc1xuXHRcdC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2Vcblx0XHR2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXHRcdHBsYWNlSG9sZGVycyA9ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAyKSA/IDIgOiAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMSkgPyAxIDogMFxuXG5cdFx0Ly8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5cdFx0YXJyID0gbmV3IEFycihiNjQubGVuZ3RoICogMyAvIDQgLSBwbGFjZUhvbGRlcnMpXG5cblx0XHQvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG5cdFx0bCA9IHBsYWNlSG9sZGVycyA+IDAgPyBiNjQubGVuZ3RoIC0gNCA6IGI2NC5sZW5ndGhcblxuXHRcdHZhciBMID0gMFxuXG5cdFx0ZnVuY3Rpb24gcHVzaCAodikge1xuXHRcdFx0YXJyW0wrK10gPSB2XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxOCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCAxMikgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA8PCA2KSB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAzKSlcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMDAwKSA+PiAxNilcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMCkgPj4gOClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPj4gNClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxMCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCA0KSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpID4+IDIpXG5cdFx0XHRwdXNoKCh0bXAgPj4gOCkgJiAweEZGKVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH1cblxuXHRcdHJldHVybiBhcnJcblx0fVxuXG5cdGZ1bmN0aW9uIHVpbnQ4VG9CYXNlNjQgKHVpbnQ4KSB7XG5cdFx0dmFyIGksXG5cdFx0XHRleHRyYUJ5dGVzID0gdWludDgubGVuZ3RoICUgMywgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcblx0XHRcdG91dHB1dCA9IFwiXCIsXG5cdFx0XHR0ZW1wLCBsZW5ndGhcblxuXHRcdGZ1bmN0aW9uIGVuY29kZSAobnVtKSB7XG5cdFx0XHRyZXR1cm4gbG9va3VwLmNoYXJBdChudW0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcblx0XHRcdHJldHVybiBlbmNvZGUobnVtID4+IDE4ICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDEyICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDYgJiAweDNGKSArIGVuY29kZShudW0gJiAweDNGKVxuXHRcdH1cblxuXHRcdC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcblx0XHRmb3IgKGkgPSAwLCBsZW5ndGggPSB1aW50OC5sZW5ndGggLSBleHRyYUJ5dGVzOyBpIDwgbGVuZ3RoOyBpICs9IDMpIHtcblx0XHRcdHRlbXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArICh1aW50OFtpICsgMl0pXG5cdFx0XHRvdXRwdXQgKz0gdHJpcGxldFRvQmFzZTY0KHRlbXApXG5cdFx0fVxuXG5cdFx0Ly8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuXHRcdHN3aXRjaCAoZXh0cmFCeXRlcykge1xuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHR0ZW1wID0gdWludDhbdWludDgubGVuZ3RoIC0gMV1cblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDIpXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPDwgNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gJz09J1xuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHR0ZW1wID0gKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDJdIDw8IDgpICsgKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMTApXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPj4gNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDIpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9J1xuXHRcdFx0XHRicmVha1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXRcblx0fVxuXG5cdGV4cG9ydHMudG9CeXRlQXJyYXkgPSBiNjRUb0J5dGVBcnJheVxuXHRleHBvcnRzLmZyb21CeXRlQXJyYXkgPSB1aW50OFRvQmFzZTY0XG59KHR5cGVvZiBleHBvcnRzID09PSAndW5kZWZpbmVkJyA/ICh0aGlzLmJhc2U2NGpzID0ge30pIDogZXhwb3J0cykpXG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwibmdwbWNRXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGd1bHAtYnJvd3NlcmlmeVxcXFxub2RlX21vZHVsZXNcXFxcYnJvd3NlcmlmeVxcXFxub2RlX21vZHVsZXNcXFxcYnVmZmVyXFxcXG5vZGVfbW9kdWxlc1xcXFxiYXNlNjQtanNcXFxcbGliXFxcXGI2NC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxndWxwLWJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclxcXFxub2RlX21vZHVsZXNcXFxcYmFzZTY0LWpzXFxcXGxpYlwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sXG4gICAgICBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxLFxuICAgICAgZU1heCA9ICgxIDw8IGVMZW4pIC0gMSxcbiAgICAgIGVCaWFzID0gZU1heCA+PiAxLFxuICAgICAgbkJpdHMgPSAtNyxcbiAgICAgIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMCxcbiAgICAgIGQgPSBpc0xFID8gLTEgOiAxLFxuICAgICAgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXTtcblxuICBpICs9IGQ7XG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSk7XG4gIHMgPj49ICgtbkJpdHMpO1xuICBuQml0cyArPSBlTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KTtcblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKTtcbiAgZSA+Pj0gKC1uQml0cyk7XG4gIG5CaXRzICs9IG1MZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpO1xuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhcztcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpO1xuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbik7XG4gICAgZSA9IGUgLSBlQmlhcztcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKTtcbn07XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbihidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgYyxcbiAgICAgIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDEsXG4gICAgICBlTWF4ID0gKDEgPDwgZUxlbikgLSAxLFxuICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXG4gICAgICBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMCksXG4gICAgICBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSksXG4gICAgICBkID0gaXNMRSA/IDEgOiAtMSxcbiAgICAgIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDA7XG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSk7XG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDA7XG4gICAgZSA9IGVNYXg7XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpO1xuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLTtcbiAgICAgIGMgKj0gMjtcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKys7XG4gICAgICBjIC89IDI7XG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMDtcbiAgICAgIGUgPSBlTWF4O1xuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSBlICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpO1xuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG07XG4gIGVMZW4gKz0gbUxlbjtcbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KTtcblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjg7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIm5ncG1jUVwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxndWxwLWJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclxcXFxub2RlX21vZHVsZXNcXFxcaWVlZTc1NFxcXFxpbmRleC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxndWxwLWJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclxcXFxub2RlX21vZHVsZXNcXFxcaWVlZTc1NFwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIm5ncG1jUVwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxndWxwLWJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXHByb2Nlc3NcXFxcYnJvd3Nlci5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxndWxwLWJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXHByb2Nlc3NcIikiXX0=
