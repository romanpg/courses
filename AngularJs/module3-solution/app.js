(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', foundItemsDirective);


  function foundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }


  function FoundItemsDirectiveController() {
    var list = this;

  }


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {

    var ctrl = this;
    ctrl.search="";
    ctrl.found = new Array();

    ctrl.getMatchedMenuItems = function() {

      var promise = MenuSearchService.getMatchedMenuItems(ctrl.search);

      promise.then(function (response) {
        console.log("Hello",response);
        ctrl.found = response;

      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });

    }

    ctrl.removeItem = function(item){
      MenuSearchService.removeItem(item);
    }

  }


  MenuSearchService.$inject = ['$http']
  function MenuSearchService($http) {

    var foundItems = new Array();

    this.getMatchedMenuItems= function (search){
      console.log(search);
      var response = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      });
      return response.then(function(result){
        var categories = result.data;
        var menu_items = categories.menu_items
        for (var i =0 ; i < menu_items.length ; i++) {
          if (menu_items[i].description.search(search) != -1) {
            foundItems.push(menu_items[i]);

          }

        }
        return foundItems;

      });

    };

    this.removeItem = function (item){
      foundItems.splice(item,1);
    }


  }




})();
