angular.module('app.services')
    .service('Neo4j',['$resource','$http','appConfig', function($resource, $http, appConfig){
        'use strict';
        return $resource(appConfig.baseUrl + '/neo4j', {}, {
            'get': {
                method: 'GET'
            }
        });

        //var factory = {};
        //
        //factory.getNeoj4 = $resource(
        //    appConfig.baseUrl + '/neo4j',
        //    {},
        //    {
        //        'query': {
        //            method: 'GET',
        //            //transformResponse: function (data) {return JSON.parse(data).list},
        //            isArray: true //since your list property is an array
        //        }
        //    }
        //);
        //
        ////console.log(factory.getNeoj4.query());
        //
        //return factory;
    }]);