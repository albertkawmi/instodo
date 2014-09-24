var app = angular.module('instodo', ['ui.tree', 'monospaced.elastic']);

app.controller('TodoController', ['$scope', function ($scope) {
    $scope.lists = [
        {title: 'Adwords', deleted: false, edit: false, todos: [
            {done: false, deleted: false, edit: false, text: 'Check linking of Adwords to all Google Analytics accounts'}, 
            {done: false, deleted: false, edit: false, text: 'Shared Budgets'}, 
            {done: false, deleted: false, edit: false, text: 'Enhanced CPC'},
            {done: false, deleted: false, edit: false, text: 'Remarketing for single hotel with most traffic'},
            {done: false, deleted: false, edit: false, text: 'Location Extensions'},
            {done: false, deleted: false, edit: false, text: 'Call Extensions'},
            {done: false, deleted: false, edit: false, text: 'Site Extensions'},
            {done: false, deleted: false, edit: false, text: 'Mobile separate ads'},
            {done: false, deleted: false, edit: false, text: 'Mobile bid adjustments (+15%)'},
            {done: false, deleted: false, edit: false, text: 'Category landing pages e.g. Weddings'}] 
        }, 
        {title: 'Joomla Training', deleted: false, edit: false, todos: [
            {done: false, deleted: false, edit: false, text: 'Galleries'}, 
            {done: false, deleted: false, edit: false, text: 'Offers'}, 
            {done: false, deleted: false, edit: false, text: 'Documents'},
            {done: false, deleted: false, edit: false, text: 'Buttons and in-article links'},
            {done: false, deleted: false, edit: false, text: 'Other HTML - hr, is-introduction, heading tags, telephone links'}] 
        }, 
        {title: 'Google My Business', deleted: false, edit: false, todos: [
            {done: false, deleted: false, edit: false, text: 'Update hotel pages'}, 
            {done: false, deleted: false, edit: false, text: 'Add hotel reviews'}, 
            {done: false, deleted: false, edit: false, text: 'Verify location - with Graeme'}] 
    }];

    $scope.addList = function () {
        $scope.lists.push({
            title: 'New List',
            deleted: false,
            todos: []
        });
    };

    $scope.addTodo = function (list) {
        list.todos.push({
            text: list.todoText,
            done: false,
            deleted: false
        });
        list.todoText = '';
    };

    $scope.editSelected = function (lists, selected) {
        for (var i = 0; i < lists.length; i++) {
            var list = lists[i];
            for (var j = 0; j < list.todos.length; j++) {
                if (list.todos[j].edit) {
                    list.todos[j].edit = false;
                }
            }
        }
        selected.edit = true;
    };

    $scope.getId = function(lists, list, todos, todo) {
        return lists.indexOf(list)+"."+list.todos.indexOf(todo);
    }

    $scope.treeOptions = {
        accept: function(sourceNodeScope, destNodesScope, destIndex) {
        //console.log(sourceNodeScope.depth() + " -- " + destNodesScope.depth());
        if(sourceNodeScope.depth()===(destNodesScope.depth()+1)) {return true; }
        else { return false; }
    },
  };

}]);

// Handle Enter keypress to avoid line breaks
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
}); 

// Give input focus immediately on edit
app.directive('focusInput', function($timeout, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            focusValue: "=focusInput"
        },
        link: function($scope, $element, attrs) {
            $scope.$watch("focusValue", function(currentValue, previousValue) {
                if (currentValue === true && !previousValue) {
                    $element[0].focus();
                } else if (currentValue === false && previousValue) {
                    $element[0].blur();
                }
            })
        }
    }
});