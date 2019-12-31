export default {
  methods: {
    /* 异步验证混入函数
    * beforeValid 非必填 返回true 表示直接通过验证
    * params 非必填 默认传参source对象 如果传入，就用 params 函数返回的 参数。
    */
    formValid (rule, value, callback, source) {
      if (typeof rule.beforeValid === 'function' && rule.beforeValid.call(this)) {
        callback();
        return;
      }
      if (!this._currentValue) this._currentValue = {};
      if (this._currentValue[rule.url] === value) {
        callback(this._errorMsg);
        return;
      }
      let params = Object.assign({}, source);
      // 有的接口返回的是 true ， 但是要验证通过。也就是说翻转。
      let isReverse = false;
      if (typeof rule.params === 'function') {
        params = rule.params.call(this, value);
        if (params.reverse) {
          isReverse = true;
          delete params.reverse;
        }
      }

      if (rule.url) {
        this.validating = this.Http(rule.url, params).then(result => {
          delete this._errorMsg;
          if ((result.data && !isReverse) || (!result.data && isReverse)) {
            this._errorMsg = result.message || rule.message;
            if (rule.errorCallback) {
              rule.errorCallback.call(this);
            }
            callback(this._errorMsg);
          } else {
            if (rule.callback) {
              rule.callback.call(this);
            }
            callback();
          }
        }).catch(errors => {
          this._errorMsg = errors.res.message || rule.message;
          if (rule.errorCallback) {
            rule.errorCallback.call(this);
          }
          callback(this._errorMsg);
        }).finally(() => {
          this.validating = false;
          this._currentValue[rule.url] = value;
        });
      } else {
        this._errorMsg = '异步验证缺少参数:[url]';
        this.$message(this._errorMsg);
        callback(this._errorMsg);
      }
    }
  }
};