const env = 'local';

const Config = {

};

switch (env) {
  case 'local':
    Config.api_url = 'http://192.168.1.4:11050/pc/';
    Config.base_url = 'http://localhost:8081/';
    break;
  case 'test':
    Config.api_url = 'http://192.168.1.4:11050/pc/';
    Config.base_url = 'http://localhost:8081/';
    break;
  case 'prod':
    Config.api_url = 'http://192.168.1.4:11050/pc/';
    Config.base_url = 'http://localhost:8081/';
    break;
  default:
    console.error('Config error')
}

module.exports = Config;
