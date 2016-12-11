var app = angular.module('NarrowItDownApp', []);
app.controller('NarrowItDownController', NarrowItDownController);
app.directive('foundItems', FoundItemsDirective);
app.service('NarrowItDownService', NarrowItDownService);


function FoundItemsDirective() {

  var ddo = {
    templateUrl : 'foundItems.html',
    restrict: 'AE',
    scope : {
      items : '<',
      onRemove : '&'
    }
  };
  return ddo;
};

/*function NarrowItDownDirectiveController () {
  var list = this;

};*/


NarrowItDownController.$inject = ['NarrowItDownService']
function NarrowItDownController(NarrowItDownService) {

  var ctrl = this;
  ctrl.found = [];

  ctrl.searchItems = function() {
    ctrl.found = NarrowItDownService.getFoundItems(ctrl.search);
    console.log(ctrl.found)
  };

  ctrl.removeItems = function(index) {
   NarrowItDownService.dontWantItems(ctrl.found, index);
  }

  ctrl.nothing = function() {
    if (ctrl.found.length > 0) {
      return false;
    } else {
      return true;
    }
  }

}

NarrowItDownService.$inject = ['$http']
function NarrowItDownService($http) {
  var service = this;

  var items = [];
  //var found = [];

  service.getFoundItems = function (searchItem) {
    var foundItems = [];
    
    $http({
      method: 'GET',
      url : ('https://davids-restaurant.herokuapp.com/menu_items.json')
    }).then(function (result) {
        // process result and only keep items that match
        
        var menu_items = result.data.menu_items;

        for (var i = 0; i < menu_items.length; i++) {
          if (menu_items[i].description.indexOf(searchItem) > -1) {
            foundItems.push(menu_items[i]);
          }
        }
    });

    return foundItems;
  };

  service.dontWantItems = function (array, index) {
    array.splice(index, 1);
  };

}
