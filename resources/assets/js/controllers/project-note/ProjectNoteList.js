angular.module('app.controllers')
    .controller('ProjectNoteListController',['$scope', '$routeParams', 'ProjectNote',function($scope, $routeParams, Teste){

        $scope.testes = Teste.query({id: $routeParams.id});

    }]);