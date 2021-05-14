
export const ENV = {
    isProductionMode: true
}

export const CommonUtil = {

  isFakeDatabase : function () {
    return true;
  },

  isAuthenticated : function () {
    const userStr = localStorage.getItem('user');
    console.log(' isAuthenticated user : ' + userStr)
    if(CommonUtil.isJsonString(userStr)){
      console.log(' isAuthenticated, result is true, user data is Json String : ' + userStr)
      return true;
    }
    console.log(' isAuthenticated, result is false')
    return false;
  },

  getJWTToken : function () {
    if(CommonUtil.isAuthenticated) {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(' getJWTToken for user : '+ user)
      return (user && user.token) ? user.token : '';
    }
    else {
      console.log(' user not logedin, retun empty for JWTToken.')
      return '';
    }
  },

  getCurrentLocale: function () {
    return localStorage.getItem('locale') == null ? 'en' : localStorage.getItem('locale');
  },
  setCurrentLocale: function (locale) {
    localStorage.setItem('locale', locale);
  },

  isNumeric : function (value) {
    return /^\d+$/.test(value);
  }
  ,
  isEmpty: function (str) {
    if (!str || str === null || str === '' || str.length === 0 || str === 'undefined') {
      console.log('CommonUtil.isEmpty(), input str is empty : ' + str)
      return true;
    }
    console.log('CommonUtil.isEmpty(), input str is not empty : ' + str)
  },

  nvl: function (arg1, arg2) {
    if (CommonUtil.isEmpty(arg1))
      return arg2;
    return arg1;
  },

  isJsonString: function (str) {
      if(CommonUtil.isEmpty(str)){
        return false;
      }
      if (typeof str !== 'string') {
        return false;
      }
      try {
          const result = JSON.parse(str);
          const type = Object.prototype.toString.call(result);
          return type === '[object Object]'
              || type === '[object Array]';
      } catch (err) {
          return false;
      }
  }
}
