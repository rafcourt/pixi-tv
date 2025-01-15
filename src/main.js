import {
    Application,
    Graphics,
    Text,
    TextStyle,
    Assets,
    Sprite,
    Container
  } from 'pixi.js';

import {initDevtools} from '@pixi/devtools';
import {Rail} from './rail.js';
import API from './lib/api.js';
import {KeyEventHandler} from './keyEventHandler.js';
import {ScrollView} from './scrollView.js';
import { Screen } from './lib/screen.js';

(async() => {
    const app = new Application();
    await app.init({
        width:1280,
        height:720,
        backgroundColor: 0x000000,
        antialias:true,
    });
    initDevtools({
        app
      });
      app.canvas.style.position = 'absolute';
      app.canvas.style.top = '0px';
      app.canvas.style.left = '0px';
    document.body.appendChild(app.canvas);
    const keyEventHandler = new KeyEventHandler(app.stage.children);
const homeScreen = await new Screen(['trendingMovies','trendingShows']);
app.stage.addChild(homeScreen.container);
app.ticker.add((ticker) => {
  if(keyEventHandler.keys.space.pressed){
      keyEventHandler.keys.space.pressed = false;
      app.stage.removeChild(homeScreen.container);
  }else if(keyEventHandler.keys.enter.pressed){ 

    keyEventHandler.keys.enter.pressed = false;
    app.stage.addChild(homeScreen.container);
}else{
    homeScreen.update(ticker, keyEventHandler);
  }
})
})();

