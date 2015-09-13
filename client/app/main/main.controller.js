'use strict';

angular.module('addItApp')
  .controller('MainCtrl', function($scope, $http, $timeout) {
    $scope.messageIndex = 0;
    
    $scope.nextMessage = function() {
      $scope.chatLog.push({
        from: 'me',
        text: $scope.inputMessage
      });
      $scope.inputMessage = '';
      scrollToBottomOfChat();

      var url = '/api/messages/next?id=' + $scope.messageIndex;

      $http.get(url)
      .then(function(res) {
        $scope.chatLog.push(res.data);
        $scope.messageIndex++;
        scrollToBottomOfChat();
      });
    };

    $scope.chatLog = [];

    function scrollToBottomOfChat() {
      $timeout(function() {
        window.scrollTo(0, 1000000000000000);
      }, 10)
    }
    /*
    $scope.chatLog = [{
      from: 'me',
      text: 'I need some washing up liquid'
    }, {
      from: 'addit',
      concern: 'confirmation',
      text: 'OK. I\'ve added it',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }],
      actions: [{
        dodo: 'undo',
        undo: 're add'
      }]
    }, {
      from: 'me',
      text: 'And some deturgent too'
    }, {
      from: 'addit',
      concern: 'confirmation',
      text: 'Sure, it\'s in there',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }],
      actions: [{
        dodo: 'undo',
        undo: 're add'
      }]
    }, {
      from: 'me',
      text: 'more'
    }, {
      from: 'addit',
      concern: 'decision',
      text: 'Is this enough?',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }],
      detail: '2L bottle',
      actions: ['yes', 'no']
    }, {
      from: 'me',
      text: 'and some fabric softener'
    }, {
      from: 'addit',
      concern: 'confirmation',
      text: 'Safe',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }],
      detail: '2L bottle',
      actions: [{
        dodo: 'undo',
        undo: 're add'
      }]
    }, {
      from: 'addit',
      concern: 'choice',
      text: 'Any of these?',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }, {
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }, {
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }]
    }, {
      from: 'me',
      text: 'I need toiletries'
    }, {
      from: 'addit',
      concern: 'multi-choice',
      text: 'Which ones?',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }, {
        name: 'conditioner',
        src: 'http://www.placecage.com/c/201/201',
        quantity: 0
      }, {
        name: 'deodorant',
        src: 'http://www.placecage.com/c/202/201',
        quantity: 0
      }, {
        name: 'shaving foam',
        src: 'http://www.placecage.com/c/204/202',
        quantity: 0
      }]
    }, {
      from: 'me',
      text: 'travel size'
    }, {
      from: 'addit',
      concern: 'multi-choice',
      text: 'OK these are all 100ml',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }, {
        name: 'conditioner',
        src: 'http://www.placecage.com/c/201/201',
        quantity: 0
      }, {
        name: 'deodorant',
        src: 'http://www.placecage.com/c/202/201',
        quantity: 0
      }, {
        name: 'shaving foam',
        src: 'http://www.placecage.com/c/204/202',
        quantity: 0
      }]
    }];
    */
  });
