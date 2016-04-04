angular.module('app.controllers')
    .controller('HomeController',['$scope','$cookies','$location', "Neo4j", "$http", "$timeout", function($scope, $cookies, $location, Neo4j, $http, $timeout){

        $scope.urrul = [];
        var arrayDonut = [];
        var thisObject = {
            label: null,
            value: null
        };

        var data = [];

        $scope.search = {
          attribute: ''
        };

        $scope.searchGet = function(){
            $location.path('/neo4j/' + $scope.search.attribute);
        };

        Neo4j.get().$promise.then(function(result) {

            var arrayLabel = result.label;
            var arrayValue = result.value;

            for (var i = 0; i < arrayLabel.length; i++){
                //data[arrayLabel[i]] = arrayValue[i];
                data.push({
                            label: arrayLabel[i],
                            value: arrayValue[i]
                        });
            }

            $scope.data = data;

            //result.label.forEach(function(row) {
            //    data.push({
            //        label: row.label,
            //        value: row.value
            //    });
            //
            //    console.log(data);
            //
            //})
            ;
        });


    }]);