
/**
 * 使用:
 *    notify.notify(msg) 开始进度条
 *    notify.show(msg)   显示信息
 *    notify.showError(msg) 显示错误 , show的简便接口
 */

import Regular from 'regularjs';
import _ from '../util/helper';

const tpl = `
<div class="m-notify m-notify-{position}">
  {#list messages as msg}
  <div class="notify notify-{msg.type||'info'}" r-animation='on: enter; class: animated fadeInX; on: leave; class: animated bounceOut fast; '>
    <div class="glyphicon glyphicon-{this.iconMap[msg.type]}"></div>
    <!--<span class="notify_close" on-click={this.clear(msg)}>×</span>-->
    <h4 class="notify_title" r-hide={!msg.title}>{msg.title}</h4>
    <p class="notify_message">{msg.message}</p>
  </div>
  {/list}
</div>
`;

var Notify = Regular.extend({
  template: tpl,
  //默认时间 
      
  // icon对应
  iconMap: {
    "error": "remove-circle",
    "success": "ok-sign",
    "warning": "warning-sign",
    "info": "info-sign"
  },
  config (data){
    _.extend(data, {
      messages: [],
      duration: 3000,
      position: 'right'
    })
  },
  // 初始化后的函数
  init (){
    // 证明不是内嵌组件
    if(this.$root == this) this.$inject(document.body);
  },
  /**
   * 增加一个提醒，添加到队伍前方
   * @param  {String|Object} message 消息或消息对象
   *      -type: error, info ,warning, success, 默认为info
   *      -title: 信息标题，默认为空
   *      -message: notify的内容
   *      -duration: 信息停留时间，-1 为无限. 默认2秒
   * @return {Function}              不等待定时器，删除掉此提醒
   */
  notify (message){
    if(typeof message === "string"){
      message = {
        message: message
      }
    }
    _.extend(message,{
      type: 'info',
      duration: this.data.duration
    })

    this.$update(function(data){
      data.messages.unshift(message)
    })

    var clearFn = this.clear.bind(this, message);

    if(message.duration!==-1){
      this.$timeout(clearFn, message.duration );
    }

    return clearFn;
  },
  /**
   * 与notify一致，但是会清理所有消息，用于唯一的消息提醒
   * @param  {String|Object} message 消息或消息对象
   * @return {Function}              不等待定时器，删除掉此提醒
   */
  show: function(message){
    this._clearTotal();
    return this.notify(message);
  },

  clear: function(message){
    var messages = this.data.messages,
      len = messages.length; 

    for( ;len--; ){
      if(message === messages[len]) messages.splice(len, 1);
    }
  },
  _clearTotal: function(){
    this.data.messages = []
  }
  // 使用timeout模块
}).use('$timeout');

  
  // 单例, 直接初始化
let notify = new Notify({});

export {notify, Notify}





