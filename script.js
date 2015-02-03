var moviesApp = angular.module("MoviesApp", ["ui.bootstrap"])

moviesApp.controller("SearchController", ["$scope", "$http", function($scope, $http){
    $scope.loading = false

  $scope.search = function() {

    $scope.loading = true
    $scope.movies = {}
    // $scope.searchTerm = {}

    if ($scope.searchTerm <= 1) {
      $scope.movies.Error = "Must provide more than one character"
      return
    }
    var req = {
      url: "http://www.omdbapi.com",
      params: {
        s: $scope.searchTerm,
        type: $scope.searchType
      }
    }
    $http(req).success(function(data){
      $scope.loading = false
      $scope.movies = data
    });

  }
}])
