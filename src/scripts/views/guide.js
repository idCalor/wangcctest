var guideTpl=require('../tpl/guide.string');

SPA.defineView('guide',{

  html:guideTpl,

  //插件列表
  plugins:[
    'delegated'

  ] ,

  //给模板绑定事件
  bindActions:{
    'goto.index':function(){
      console.log(111);
      //进入index视图
      SPA.open('index');

    }
  },

  //给视图绑定事件
  bindEvents:{
    //在视图还没打开的时候触发
    beforeShow:function(){
      // guide页面自己的交互操作
    }

  }

});
