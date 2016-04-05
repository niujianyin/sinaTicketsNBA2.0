var util = {};
util.debug = true;
util.log = function(){
  if(util.debug){
    console.log.apply(console, arguments);
  }
}
// doT模板初始参数修改
doT.templateSettings = {
  evaluate:    /\<\%([\s\S]+?)\%\>/g,
  interpolate: /\<\%=([\s\S]+?)\%\>/g,
  varname: 'it'
};