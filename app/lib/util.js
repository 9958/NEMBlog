var crypto = require('crypto');
var settings = require('../../config/settings');

/**
 * Created with IntelliJ IDEA.
 * User: willerce
 * Date: 8/4/12
 * Time: 3:48 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * for tdate
 * @param date date type
 * @param friendly is Friendly data format
 * @return {String} date to string
 */
exports.format_date = function(date, friendly) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  if (friendly) {
    var now = new Date();
    var mseconds = -(date.getTime() - now.getTime());
    var time_std = [ 1000, 60 * 1000, 60 * 60 * 1000, 24 * 60 * 60 * 1000 ];
    if (mseconds < time_std[3]) {
      if (mseconds > 0 && mseconds < time_std[1]) {
        return Math.floor(mseconds / time_std[0]).toString() + ' 秒前';
      }
      if (mseconds > time_std[1] && mseconds < time_std[2]) {
        return Math.floor(mseconds / time_std[1]).toString() + ' 分钟前';
      }
      if (mseconds > time_std[2]) {
        return Math.floor(mseconds / time_std[2]).toString() + ' 小时前';
      }
    }
  }

  hour = ((hour < 10) ? '0' : '') + hour;
  minute = ((minute < 10) ? '0' : '') + minute;
  second = ((second < 10) ? '0' : '') + second;

  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
};

/**
 * md5 hash
 *
 * @param str
 * @returns md5 str
 */
exports.md5 = function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
};


/**
 * 加密函数
 * @param str 源串
 * @param secret  因子
 * @returns str
 */
exports.encrypt = function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
};

/**
 * 解密
 * @param str
 * @param secret
 * @returns str
 */
exports.decrypt = function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};



/**
 * 发送邮件
 * @param to
 * @param subject
 * @returns html
 */
exports.send_email = function(to,subject,html){
    var mail = require('nodemailer');  //包含发送邮件所需module
    //发送邮件
    mail.SMTP = settings.smtp;
    mail.send_mail(
        {
            sender:settings.smtp.user,   //发送邮件的地址
            to:to,     //发给谁
            subject:subject,               //主题
            html:html
        },
        //回调函数，用户判断发送是否成功，如果失败，输出失败原因。
        function(error,success){
            if(!error){
                console.log('message success');
                }else{
                console.log('failed'+error);
            }
        }
    );
};

/**
 * 是否在数组里
 * @param stringToSearch
 * @param arrayToSearch
 */
exports.in_array = function(stringToSearch, arrayToSearch) {
	for (s = 0; s < arrayToSearch.length; s++) {
		thisEntry = arrayToSearch[s].toString();
		if (thisEntry == stringToSearch) {
			return true;
		}
	}
	return false;
};

/**
 * 获取字符串中所有的A标签
 * @param htmlstr
 */
exports.getAHref = function(htmlstr){
    var reg = /<a.+?href=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
    var arr = [];
    while(tem=reg.exec(htmlstr)){
        arr.push(tem[2]);
    }
    return arr;
};


exports.formatErrors = function(errorsIn) {
    var errors = {};
    var a, e;

    for(a = 0; a < errorsIn.length; a++) {
      e = errorsIn[a];

      errors[e.property] = errors[e.property] || [];
      errors[e.property].push(e.msg);
    }
    return errors;
};
