'use strict';

var app = angular.module('calory-counter', ['ngResource']);

app.factory('Calory', function($resource) {
	var Calory = $resource('/calories/:id');

	Calory.prototype.destroy = function(callback) {
		return Calory.remove({id: this.id}, callback);
	};

	return Calory;
});

app.directive('jpShow', function() {
	return {
		link: function(scope, element, attr) {
			scope.$watch(attr.jpShow, function(value) {
				value ? $(element).slideDown() : $(element).slideUp();
			});
		}
	};
});

function CaloryCounterCtrl($scope, Calory) {
	$scope.calories = Calory.query();
	$scope.amount = 0;
	$scope.calory = {};

	$scope.$watch('calories', function() {
		$scope.amount = 0;
		angular.forEach($scope.calories, function(calory) {
			$scope.amount += calory.count;
		});
	}, true);

	$scope.submit = function() {
		$scope.showForm = false;
		Calory.save($scope.calory, function(calory) {
			$scope.calories.push(calory);
			$scope.calory = {};
		});
	};

	$scope.remove = function(calory) {
		calory.destroy(function() {
			$scope.calories.splice($scope.calories.indexOf(calory), 1);
		});
	};
}