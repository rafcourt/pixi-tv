import {
    Application,
    Graphics,
    Text,
    TextStyle,
    Assets,
    Sprite,
    Container
  } from 'pixi.js';
import {Poster} from './poster.js';
import { Scroller } from './scroller';

//   const warriorsContainer = new Container();
// warriorsContainer.addChild(girlSprite);

// const guyTexture = await Assets.load('images/20241127_114508.jpg');
// const guySprite = Sprite.from(guyTexture);
// guySprite.scale.set(0.1, 0.1);
// guySprite.position.set(50,50)
// warriorsContainer.addChild(guySprite);
// warriorsContainer.position.set(200, 200);

export class Rail extends Scroller{
    active = false;
    activeChild = null;
    children = []
    constructor(children,xy){
        return super(children,xy);
    }
    async initialize(children){
        const posterWidth = 185;
        const margin = 10
        let all = [];
        await Promise.all(
            await children.all(
                async (currentPoster, index)=>{
                    return await this.createPosterElement({
                        posterData:currentPoster.data, 
                        index, 
                        posterWidth, 
                        margin  
                    })
                }
            )
        ).then((all)=>{
            this.linkedlist.reset(all);
            this.linkedlist.setCurrent(this.linkedlist.head);
        })
    }
    async createPosterElement({posterData, index, posterWidth, margin}){
        const posterPosition = [index * (posterWidth + margin), 0];
        const posterElement = await new Poster({
            scale: 1,
            image:`https://image.tmdb.org/t/p/w${posterWidth + posterData.poster_path}`,
            posterPosition
        })

        this.container.addChild(posterElement.container);

        if(index === 0) {
            this.setActiveChild(posterElement);
        }
        
        return posterElement;
    }
    update(ticker,keyEventHandler){
        if(keyEventHandler.keys.right.pressed){
            keyEventHandler.keys.right.pressed = false;
            this.scrollNext();
        }else if(keyEventHandler.keys.left.pressed){
            keyEventHandler.keys.left.pressed = false;
            this.scrollPrevious();
        }
    }
}