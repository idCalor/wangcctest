module.exports = {
  rules:[
    {
      pattern: /\/api\/boyList.php$/,
      respondwith: './shop.json'
    },
    {
      pattern: /\/api\/boyList.php\?page=\d+$/,
      respondwith: './shopnewfree.json'
    },
    // {
    //   pattern: /\/api\/boyList.php\?page=\d+$/,
    //   respondwith: './home.more1.json'
    // },
    {
      pattern: /\/api\/boyList.php\?type=refresh$/,
      respondwith: './shop2.json'
    }
  ]

};
