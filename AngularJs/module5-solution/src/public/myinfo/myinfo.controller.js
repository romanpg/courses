(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);


MyInfoController.$inject = ['MenuService','ApiPath'];
function MyInfoController(MenuService, ApiPath) {
  this.basePath = ApiPath;
  this.user = MenuService.getUser();
  console.log(this.user);

}

})();
