(function () {
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBroughtController', AlreadyBroughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService){
  this.items = ShoppingListCheckOffService.getItems();
  this.buyItem = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  }
 
}

AlreadyBroughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBroughtController (ShoppingListCheckOffService){
  this.items = ShoppingListCheckOffService.getBouhtItems();

}


function ShoppingListCheckOffService(){

  var items = [{
      name: "cookies",
      quantity: "1"
    },{
      name: "bananas",
      quantity: "2"
    },{
      name: "eggs",
      quantity: "3"
    },{
      name: "sugar",
      quantity: "4"
    },{
      name: "bottle of water",
      quantity: "5"
    }];

    var boughtItems = [];

    this.buyItem = function(indexItem){
      var item = items[indexItem];
      items.splice(indexItem, 1);
      boughtItems.push(item);
    }


  this.removeItem = function (itemIdex) {
    items.splice(itemIdex, 1);
  };

  this.getItems = function () {
    return items;
  };

  this.getBouhtItems = function () {
    return boughtItems;
  };


}



})();
