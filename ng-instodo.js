var app = angular.module('instodo', ['ui.tree', 'monospaced.elastic']);

app.controller('TodoController', ['$scope', function ($scope) {
    $scope.lists = [
        {title: 'List 1', deleted: false, edit: false, todos: [
            {done: false, deleted: false, edit: false, text: 'item 1'}, 
            {done: false, deleted: false, edit: false, text: 'item 2'}, 
            {done: false, deleted: false, edit: false, text: 'item 3'}] 
        }, 
        {title: 'List 2', deleted: false, edit: false, todos: [
            {done: false, deleted: false, edit: false, text: 'item A'}, 
            {done: false, deleted: false, edit: false, text: 'A really long todo item. This will be used to check that it doesn\'t break the layout. Cool.'}, 
            {done: false, deleted: false, edit: false, text: 'item C'}] 
        }, 
        {title: 'List 3', deleted: false, edit: false, todos: [
            {done: false, deleted: false, edit: false, text: 'item x'}, 
            {done: false, deleted: false, edit: false, text: 'item y'}, 
            {done: false, deleted: false, edit: false, text: 'item z'}] 
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