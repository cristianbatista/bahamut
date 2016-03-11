angular.module('app.services')
    .service('Neo4j',['$resource','appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl + '/neo4j/:id', {id: '@id'},{
            update: {
                method: 'PUT'
            }
        });
    }]);