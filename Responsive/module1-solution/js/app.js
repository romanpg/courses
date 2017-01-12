(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

//LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.text = "";
  $scope.food = "";

  $scope.check = function(){

  	if ($scope.food === ""){
  		$scope.text="Please enter data first";
  		return;
  	}
  	
  	var array = $scope.food.split(',');


  	if (array.length <= 3) {
  		$scope.text="Enjoy!";
  	}else{
  		$scope.text="Too much!";
  	}

  };


}

})();