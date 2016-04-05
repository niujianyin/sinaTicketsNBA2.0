
fis.match('/*.sh', {
  release: false
});

fis.match('/images/*.{png,jpg,jpeg,gif}', {
  release: '/$0'
});

fis.match('/lib/*.js', {
  release: '/$0'
});


fis.match('**.html',{
  release: '/$0'
});

fis.match('/htmls/*.html', {
  isHtmlLike: false,
  release: false
});

fis.match('less/(*).less',{
  parser: fis.plugin('less'),
  rExt: '.css',
  release: '/css/$1'
});

fis.match('::packager', {
  spriter: fis.plugin('csssprites', {
    scale: 0.5,
    margin: 30
  })
})

// 对 CSS 进行图片合并
fis.match('less/(*).less', {
  useSprite: true
});

fis.match('/less\/(*).png', {
  useHash: false,
  release: '/images/$1.png'
});

//使用方法 fis3 release prod
fis.media('prod')
  .match('scripts/(**).js', {
    optimizer: fis.plugin('uglify-js'),
    release: '/scripts/$1'
  })
  .match('less/(*).less', {
    optimizer: fis.plugin('clean-css'),
    parser: fis.plugin('less'),
    rExt: '.css',
    release: '/css/$1'
  }).match('/less\/(*).png', {
    release: '/images/$1.png'
  }).match('/images/(**).{png,jpg,jpeg,gif}', {
    release: '/$0'
  }).match('**.png', {
    optimizer: fis.plugin('png-compressor')
  }).match('**.{js,css,less,png}', {
    useHash: true
  })
  // fis.match('**.html', {
  //   optimizer: fis.plugin('htmlmin')
  // });
