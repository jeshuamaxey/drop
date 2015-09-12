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
      }
    };
  });