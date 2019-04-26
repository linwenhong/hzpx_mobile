const env = 'test';

const Config = {

};

switch (env) {
  case 'daoen':
    Config.api_url = 'http://192.168.1.4:11050/api/';
    Config.file_url = 'http://192.168.1.4:11050/pc/';
    Config.base_url = 'http://localhost:8088/';
    break;
  case 'jiabao':
    Config.api_url = 'http://192.168.1.13:50008/api/';
    Config.file_url = 'http://192.168.1.13:50008/pc/';
    Config.base_url = 'http://localhost:8088/';
    break;
  case 'test':
    Config.api_url = 'http://api.hzjt.test.ywqian.com/api/';
    Config.file_url = 'http://api.hzjt.test.ywqian.com/pc/';
    Config.base_url = 'http://mob.hzjt.test.ywqian.com/';
    break;
  case 'prod':
    Config.api_url = 'http://192.168.1.4:11050/pc/';
    Config.base_url = 'http://localhost:8081/';
    break;
  default:
    console.error('Config error')
}

module.exports = Config;
