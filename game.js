require('./Module/FlappyBird/JSNative/libs/weapp-adapter')
require('./Module/FlappyBird/JSNative/libs/symbol')
require('./Module/FlappyBird/JSNative/Core')
require('./Module/FlappyBird/JSNative/native')
require('./Module/FlappyBird/JSNative/md5.min')
require('./Module/FlappyBird/JSNative/Std')
require('./Module/FlappyBird/JSNative/pixi.min.wx');
import {install} from './Module/FlappyBird/JSNative/unsafe-eval/install';
install(PIXI);
require('./Module/FlappyBird/JSNative/pixi-textinput');

// 游戏资源所在的域名，端口，起始路径
window.alittle_hostname = "127.0.0.1";
window.alittle_port = 80;
window.alittle_base_url = "ALittle/";
require('./Module/FlappyBird/JSNative/CEngine')

window.__ALITTLEAPI_SetupMainModule("Module/FlappyBird/", "FlappyBird")