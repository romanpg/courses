(function () {
'use strict';

angular.module('data')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['$stateParams', 'items']
function ItemsController($stateParams, items) {

  this.listItems = items.data.menu_items;

}

})();
