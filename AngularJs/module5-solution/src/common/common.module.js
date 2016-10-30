(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'http://romanpg-angularjs.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
