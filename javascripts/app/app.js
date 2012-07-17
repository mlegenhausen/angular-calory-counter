var app = angular.module('calory-counter', ['ngResource']);

app.factory('Calory', function($resource) {
	return $resource('http://localhost\\:3000/calories');
});

function CaloryCounterCtrl($scope, Calory) {
	var calories = $scope.calories = Calory.query();

	$scope.$watch('calories', function() {
		$scope.amount = 0;
		angular.forEach(calories, function(calory) {
			$scope.amount += calory.count;
		});
	}, true);

	$scope.submit = function() {
		Calory.save($scope.calory, function() {
			$scope.calories = Calory.query();
			$scope.showForm = false;
		});
	};
}