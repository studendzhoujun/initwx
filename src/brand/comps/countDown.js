/*
 * @Author: zhouJun 
 * @Date: 2018-03-06 15:50:41 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-03-12 14:50:41
 */

/**
 * CountDown vue倒计时
 *
 * @module CountDown
 */

class CountDown {
    constructor(){
      /**
       * 当前时间
       * @property _currentTime
       */
      this._currentTime = 0

      /**
       * 上次执行callback的时间
       * @property _lastTimeForCallback
       */
      this._lastTimeForCallback = 0

      /**
       * 上次setInterval的时间
       * @property _lastTimeForInterval
       */
      this._lastTimeForInterval = 0
  
      /**
       * setInterval
       * @property _timer
       */
      this._timer = null
  
      /**
       * create的倒计时列表
       * @property _instanceHash
       */
      this._instanceHash={}
  
      /**
       * 执行callback的时间间隔
       * @property _callbackInterval
       */
      this._callbackInterval = 0
  
      /**
       * CountDown setInterval的间隔
       * @property _timerInterval
       */
      this._timerInterval = 300
  
      /**
       * 执行callback的倒计时
       * @property _callbackCountDown
       */
      this._callbackCountDown=0
  
      /**
       * 定时执行的回调
       * @property _callback
       */
      this._callback = null
    }
     /**
       * 初始化
       *
       * @method init
       * @param options
       */
      init(options) {
        this._lastTimeForCallback = options.currentTime;
        this._currentTime = options.currentTime;
        this._lastTimeForInterval = +new Date();
        this._callback = options.callback;
        this._callbackInterval = options.interval;
        this._callbackCountDown = 0;
        this.obj = options.obj;
        this._run();
      }
      /**
       * 运行
       *
       * @method _run
       * @private
       */
      _run() {
        this._timer = setInterval(()=>{
          this._currentTime += +new Date() - this._lastTimeForInterval;
          this._lastTimeForInterval = +new Date();
  
          this._check();
        }, this._timerInterval);
      }
       /**
       * 判断检查，执行相应操作
       *
       * @method _check
       * @private
       */
      _check() {
        var self = this;
        for (var i in self._instanceHash) {
          if (!self._instanceHash.hasOwnProperty(i)) {
            continue;
          }
          //同步所有的倒计时显示
          self._sync(i);
        }
  
        //判断是否执行callback
        if (self._callbackCountDown >= self._callbackInterval) {
          self._callbackCountDown -= self._callbackInterval;
          self._lastTimeForCallback = self._currentTime - self._callbackCountDown;
  
          self._callback();
        } else {
          self._callbackCountDown = self._currentTime - self._lastTimeForCallback;
        }
      }
       /**
       * 立即执行回调
       *
       * @method execute
       */
      execute() {
        this._lastTimeForCallback = this._currentTime;
        this._callbackCountDown = 0;
        this._callback();
      }
       /**
       * 同步时间
       *
       * @method _sync
       * @param key
       * @private
       */
      _sync(key) {
        var self = this,
          item = self._instanceHash[key],
          span = item.expires <= self._currentTime ? 0 : item.expires - self._currentTime;
  
        //是否过期
        if (span === 0) {
          self.remove(key);//先remove，在执行回调，不然后面执行顺序会有错
          typeof item.timeout === 'function' && item.timeout();
        } else {
          if (typeof item.targetId === 'string') {
            self.obj[item.targetId]=CountDown.format(span, item.format, item.formatIgnore)
          }
        }
      }
       /**
       * 创建计时器
       *
       * @method create
       * @param id
       * @param options
       */
      create(id, options) {
        var self = this;
  
        if (self._instanceHash.hasOwnProperty(id)) {
          return;
        }
  
        self._instanceHash[id] = options;
      }
       /**
       * 根据ID重置计时器
       *
       * @param id {*} 计时器ID
       * @param options {Object} 要重置的内容
       */
      reset(id, options) {
        var self = this;
  
        if (!self._instanceHash.hasOwnProperty(id)) {
          return;
        }
  
        self._instanceHash[id] = CountDown.extend(self._instanceHash[id], options);
      }
      /**
       * 移除一个计时器
       *
       * @method remove
       * @param id
       */
      remove(id) {
        var self = this;
  
        if (!self._instanceHash.hasOwnProperty(id)) {
          return;
        }
        
        delete self._instanceHash[id];
      }
       /**
       * 获取当前时间
       *
       * @method getCurrentTime
       * @returns {number} 当前的时间戳
       */
      getCurrentTime () {
        return this._currentTime;
      }
      /**
       * 校正时间
       *
       * @method regulate
       * @param currentTime {int} 当前正确的事件戳
       */
      regulate(currentTime) {
        var self = this;
  
        self._currentTime = currentTime;
        self._lastTimeForCallback = currentTime;
        self._lastTimeForInterval = +new Date();
        self._callbackCountDown = 0;
  
        clearInterval(self._timer);
        self._run();
      }
       /**
       * 销毁 CountDown
       *
       * @method destroy
       */
      destroy () {
        clearInterval(this._timer);
        this._timer = null;
        for (var i in this._instanceHash) {
          this.remove(i);
        }
        this._instanceHash = {};
      }
       /**
       * 格式化时间
       *
       * @param timestamp {int} 当前的时间戳
       * @param format {string} 格式字符串
       * @param ignore {boolean} 是否忽略
       * @returns {string} 格式化后的时间字符串
       */
      static format(timestamp, format, ignore) {
        var result = '';
        if (timestamp < 0 || typeof format !== 'object') {
          return result;
        }
  
        if (Object.prototype.toString.call(ignore) !== '[object Boolean]') {
          ignore = true;
        }
  
        var timestampObject = {
          days: Math.floor(timestamp / 86400000),
          hours: Math.floor((timestamp % 86400000) / 3600000),
          minutes: Math.floor((timestamp % 3600000) / 60000),
          seconds: Math.floor((timestamp % 60000) / 1000)
        };
        var REGEX = {
          days: /{[Dd]}/g,
          hours: /{[Hh]{2}}|{[Hh]}/g,
          minutes: /{[Mm]{2}}|{[Mm]}/g,
          seconds: /{[Ss]{2}}|{[Ss]}/g
        };
        for (var i in format) {
          if (!format.hasOwnProperty(i)) {
            continue;
          }
          var value = timestampObject[i];
          if (value === 0 && result === '' && ignore && i !== 'seconds') {
            continue;
          }
          result += format[i].replace(REGEX[i], function () {
            if (value < 10 && arguments[0].length > 3) {
              value = '0' + value;
            }
            return value;
          });
        }
        return result;
      }
       /**
       * 对象的合并
       *
       * @returns {*}
       */
      static extend () {
        var dest = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
          var src = arguments[i];
          if (src) {
            for (var k in src) {
              dest[k] = src[k];
            }
          }
        }
        return dest;
      }
}

export default CountDown