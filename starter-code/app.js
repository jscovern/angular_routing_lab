angular.module('wineApp', ['ngRoute'])
////////////
// ROUTES //
////////////

.config(function($routeProvider,$locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: "/templates/wines-index.html",
            controller: 'WinesIndexCtrlHttp'
        })
        .when('/wines/:id', {
            templateUrl: 'templates/wines-show.html',
            controller: 'WinesShowCtrlHttp'
        });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
})

/////////////////
// CONTROLLERS //
/////////////////

.controller('WinesIndexCtrlHttp',function($scope, WineFactory) {
    this.$inject = [$scope,WineFactory];
    WineFactory.query().then(function(response) {
        $scope.all = response.data;
    });
})

.controller('WinesShowCtrlHttp',function($scope,$routeParams,WineFactory) {
    this.$inject = [$scope,$routeParams,WineFactory];
    WineFactory.get($routeParams.id).then(function(response) {
        $scope.showWine = response.data;
    });
})
////////////
// MODELS //
////////////

.factory('WineFactory', function($http){
    var WineFactory = {};
    this.inject=["$http"];
    WineFactory.query = function(){
        return $http.get('http://daretoexplore.herokuapp.com/wines/');
    };
    WineFactory.get = function(id){
        return $http.get('http://daretoexplore.herokuapp.com/wines/'+id);
    };
    return WineFactory;
  });