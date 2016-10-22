(function () {
'use strict';

angular.module('data')
.component('items', {
  templateUrl: 'src/MenuApp/templates/items.html',
  bindings: {
    items: '<',
    categories: '<'
  }
});

})();
