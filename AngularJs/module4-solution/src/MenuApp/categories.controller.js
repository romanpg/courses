(function () {
'use strict';

angular.module('data')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['$stateParams', 'categories']
function CategoriesController($stateParams, categories) {

  this.categories = categories.data;

}

})();
