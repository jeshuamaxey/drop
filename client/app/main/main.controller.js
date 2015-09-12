'use strict';

angular.module('addItApp')
  .controller('MainCtrl', function($scope, $http, socket) {
    $scope.chatLog = [{
      from: 'me',
      text: 'I need some more washing powder'
    }, {
      from: 'addit',
      text: 'OK. I\'ve added Sunlight to your shopping list',
      actions: ['undo']
    }, {
      from: 'me',
      text: 'Thanks'
    }]
  });
