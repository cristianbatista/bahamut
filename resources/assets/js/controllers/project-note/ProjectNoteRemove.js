angular.module('app.controllers')
    .controller('ProjectNoteRemoveController',
    ['$scope','$location', '$routeParams','ProjectNote',
        function($scope, $location, $routeParams, ProjectNote){

            $scope.projectNotedel = ProjectNote.get({
                id: $routeParams.id,
                noteId: $routeParams.noteId
            });

            $scope.remove = function(){

                $scope.projectNotedel.$delete({
                    id: $routeParams.id,
                    noteId: $scope.projectNotedel.id
                }).then(function(){
                    $location.path('/project/'+ $routeParams.id + '/notes');
                });

            }

        }]);