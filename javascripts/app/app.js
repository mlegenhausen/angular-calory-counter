var app = angular.module('calory-counter', ['ngResource']);

app.factory('Calory', function($resource) {
	var Calory = $resource('http://localhost\\:3000/calories/:id');

	Calory.prototype.destroy = function(callback) {
		return Calory.remove({id: this.id}, callback);
	};

	return Calory;
});

function CaloryCounterCtrl($scope, Calory) {
	$scope.calories = Calory.query();

	$scope.$watch('calories', function() {
		$scope.amount = 0;
		angular.forEach($scope.calories, function(calory) {
			$scope.amount += calory.count;
		});
	}, true);

	$scope.submit = function() {
		Calory.save($scope.calory, function() {
			$scope.calories = Calory.query();
			$scope.showForm = false;
			$scope.calory = {};
		});
	};

	$scope.remove = function(calory) {
		calory.destroy(function() {
			$scope.calories.splice($scope.calories.indexOf(calory), 1);
		});
	};
}