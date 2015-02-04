var moviesApp = angular.module("MoviesApp", ["ui.bootstrap"])

moviesApp.controller("SearchController", ["$scope", "$http", "$modal", function($scope, $http, $modal){

    $scope.movies = {}
    $scope.searchTerm = "";
    $scope.loading = false
    $scope.selected = undefined;

try {
  $scope.terms = JSON.parse(window.localStorage.terms || []);
} catch(e){
  console.log('error', e);
  $scope.terms = []
}


  $scope.search = function() {
    $scope.loading = true

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

      if($scope.terms.indexOf($scope.searchTerm) == -1){

      $scope.terms.push($scope.searchTerm)
      window.localStorage.terms = JSON.stringify($scope.terms);

      }
      $scope.movies = data
      $scope.loading = false
    });
  }

  if ($scope.searchTerm) {
    $scope.search();
  }

}])
