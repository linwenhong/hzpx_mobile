const env = 'daoen';

const Config = {
  app_id: 'wxb3a0df66e811b238',
  version: '1.0.4'
};

switch (env) {
  case 'daoen':
    Config.api_url = 'http://192.168.1.4:11050/api/';
    Config.file_url = 'http://192.168.1.4:11050/pc/';
    Config.base_url = 'http://localhost:8088';
    break;
  case 'jiabao':
    Config.api_url = 'http://192.168.1.13:50008/api/';
    Config.file_url = 'http://192.168.1.13:50008/pc/';
    Config.base_url = 'http://localhost:8088';
    break;
  case 'test':
    Config.api_url = 'http://api.hzjt.test.ywqian.com/api/';
    Config.file_url = 'http://api.hzjt.test.ywqian.com/pc/';
    Config.base_url = 'http://mob.hzjt.test.ywqian.com';
    break;
  case 'prod':
    Config.api_url = 'http://api.hzjt.test.ywqian.com/api/';
    Config.file_url = 'http://api.hzjt.test.ywqian.com/pc/';
    Config.base_url = 'http://mob.hzjt.test.ywqian.com';
    break;
  default:
    console.error('Config error')
}

export default Config;
