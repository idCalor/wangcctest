// 引入模板
var shelfTpl = require('../tpl/shelf.string');

// 定义一个视图
SPA.defineView('shelf', {
  // 将模板写在body里
  html: shelfTpl

});
