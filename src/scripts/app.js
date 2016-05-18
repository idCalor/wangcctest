require('./lib/spa.min.js');
require('./lib/swiper-3.3.1.min.js');
//views
require('./views/guide.js');
require('./views/shelf.js');
require('./views/shop.js');
require('./views/find.js');
require('./views/my.js');
require('./views/index.js');


//定义默认视图
SPA.config({
  // 默认进入guide
  indexView:'guide'
});
