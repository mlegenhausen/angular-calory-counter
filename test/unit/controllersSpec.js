'use strict';

describe('CaloryCounter App', function() {
    var testData = [
        {
            id: '1',
            product: 'Apple',
            count: 100
        }, 
        {
            id: '2',
            product: 'Pizza',
            count: 1250
        }
    ];

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('calory-counter'));

    describe('CaloryCounterCtrl', function(){
        var scope, $httpBackend, ctrl;
     
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/calories').respond(angular.copy(testData));
            scope = $rootScope.$new();
            ctrl = $controller(CaloryCounterCtrl, {$scope: scope});
        }));
     
        it('should create model with 2 calories fetched from xhr', function() {
            expect(scope.calories).toEqual([]);
            expect(scope.amount).toEqual(0);
            $httpBackend.flush();
            expect(scope.calories).toEqualData(testData);
            expect(scope.amount).toEqual(1350);
        });

        it('should save new calory, hide form and update amount', function() {
            $httpBackend.flush();
            scope.showForm = true;

            $httpBackend.expectPOST('/calories', {
                product: 'Water',
                count: 10
            }).respond({
                id: '3',
                product: 'Water',
                count: 10
            });
            scope.calory.product = 'Water';
            scope.calory.count = 10;
            scope.submit();
            expect(scope.showForm).toEqual(false);
            $httpBackend.flush();
            expect(scope.calories.length).toEqual(3);
            expect(scope.calory).toEqualData({});
            expect(scope.amount).toEqual(1360);
        });

        it('should remove calory and update amount', function() {
            $httpBackend.flush();
            $httpBackend.expectDELETE('/calories/1').respond({});
            scope.remove(scope.calories[0]);

            $httpBackend.flush();
            expect(scope.calories).toEqualData([
                {
                    id: '2',
                    product: 'Pizza',
                    count: 1250
                }
            ]);
            expect(scope.amount).toEqual(1250);
        });
    });
});


