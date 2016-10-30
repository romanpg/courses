(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);


SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
  var reg = this;
  reg.found;
  

  reg.submit = function () {
    
    MenuService.getMenuItem().then(function (response) {
       var categories = response.data;
        var menu_items = categories.menu_items
        for (var i =0 ; i < menu_items.length ; i++) {
          if (menu_items[i].short_name === reg.user.menu) {
            console.log(menu_items[i]);
            reg.user.menu = menu_items[i];
            MenuService.setUser(reg.user);
            reg.found = true;
            reg.completed = true;
            return;

          }
        }
        reg.found = false;
        reg.completed = true;

    });
    
  };
}

})();
