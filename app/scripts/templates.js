define(['handlebars'], function(Handlebars) {

this["Baitel"] = this["Baitel"] || {};
this["Baitel"]["Templates"] = this["Baitel"]["Templates"] || {};

this["Baitel"]["Templates"]["schedule"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h2>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>";
  return buffer;
  };

return this["Baitel"]["Templates"];

});