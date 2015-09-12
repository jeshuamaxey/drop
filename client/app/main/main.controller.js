'use strict';

angular.module('addItApp')
  .controller('MainCtrl', function($scope, $http, socket) {
    $scope.chatLog = [{
      from: 'me',
      text: 'I need some washing up liquid'
    }, {
      from: 'addit',
      concern: 'confirmation',
      text: 'OK. I\'ve added it',
      items: ['http://www.placecage.com/c/200/200'],
      actions: ['undo']
    }, {
      from: 'me',
      text: 'And some deturgent too'
    }, {
      from: 'addit',
      concern: 'confirmation',
      text: 'Sure it\'s in there',
      items: ['http://www.placecage.com/c/200/201'],
      actions: ['undo']
    }, {
      from: 'me',
      text: 'more'
    }, {
      from: 'addit',
      concern: 'decision',
      text: 'Is this enough?',
      items: ['http://www.placecage.com/c/200/202'],
      detail: '1L',
      actions: ['undo', 'no']
    }, {
      from: 'me',
      text: 'and some fabric softener'
    }, {
      from: 'addit',
      concern: 'confirmation',
      text: 'Safe',
      items: ['http://www.placecage.com/c/200/203'],
      detail: '1L',
      actions: ['undo']
    }, {
      from: 'addit',
      concern: 'choice',
      text: 'Any of these?',
      items: [
        'http://www.placecage.com/c/200/200',
        'http://www.placecage.com/c/201/200',
        'http://www.placecage.com/c/202/200'],
    }, {
      from: 'me',
      text: 'I need toiletries'
    }, {
      from: 'addit',
      concern: 'multi-choice',
      text: 'Which ones?',
      items: [
        'http://www.placecage.com/c/200/200',
        'http://www.placecage.com/c/201/200',
        'http://www.placecage.com/c/202/200']
    }];
  });
