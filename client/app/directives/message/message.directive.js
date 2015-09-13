'use strict';

angular.module('addItApp')
  .directive('message', function () {
    return {
      templateUrl: 'app/directives/message/message.html',
      restrict: 'EA',
      scope: {
        msg: '='
      },
      replace: true,
      link: function (scope, element, attrs) {
        scope.isFromMe = function(msg) {
          return msg.from === 'me';
        }
        scope.doAction = function(msg) {
          switch(msg.action) {
            case 'undo':
              msg.action = 're add';
              break;
            case 're add':
              msg.action = 'undo';
              break;
          }
        }
        scope.toggleOnList = function(item) {
          item.onList = !item.onList;
        }
      }
    };
  });