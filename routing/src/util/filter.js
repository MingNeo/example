
// dateformat util
const fmap = {
  'yyyy': function(date){return date.getFullYear()},
  'MM': function(date){return fix(date.getMonth() + 1); },
  'dd': function(date){ return fix(date.getDate()) },
  'HH': function(date){ return fix(date.getHours()) },
  'mm': function(date){ return fix(date.getMinutes())}
}

const trunk = new RegExp(Object.keys(fmap).join('|'),'g');

function fix(str){
  str = "" + (str || "");
  return str.length <= 1? "0" + str : str;
}


export default {

  // fomat date
  // ------------------
  // example: 
  // {1449737531544|format: 'yyyy年MM月dd日'}
  format ( value, format ){

    format = format || "yyyy-MM-dd HH:mm";
    if(!value) return;
    value = new Date(value);

    return format.replace( trunk, (cap) => fmap[cap]? fmap[cap](value): "");

  },

  split: {
    get: function(value, split){
      return value.join( split || "," );
    },
    set: function(value, split){
      return  value.split( split || "," );
    }
  }
  
}