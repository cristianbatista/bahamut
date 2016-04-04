angular.module('app').directive('donutchart', ['$timeout', function($timeout) {

    return {

        // required to make it work as an element
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        // observe and manipulate the DOM
        link: function($scope, element, attrs) {

            $timeout(function(){

                var data = $scope[attrs.data]

                Morris.Donut({
                    element: element,
                    data: data
                });

            });


        }

    }

}]);