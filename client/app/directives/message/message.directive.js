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
        scope.doAction = function($event, msg) {
          switch(msg.action) {
            case 'undo':
              msg.action = 'removed';
              $($event.target).addClass('undone');
              break;
          }
        }
        scope.choose = function(item) {
          item.chosen = !item.chosen;
        };
        scope.makeDecision = function($event, action) {
          $($event.target).addClass('full-width');
          $($event.target).addClass('half-width');
          $($event.target).html('great!');
          $($event.target).css('background', '#7BC89E');
          $($event.target).siblings()[2].remove();
        }
        scope.toggleOnList = function(item) {
          item.onList = !item.onList;
        }
      }
    };
  });