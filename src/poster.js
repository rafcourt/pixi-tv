import {
    Assets,
    Sprite,
    Graphics,
    Container,
  } from 'pixi.js';


export class Poster{
    active = false
    constructor({scale = 1, image, posterPosition = [0,0]}){
        this.container = new Container();
        this.highlight = new Graphics();
        this.dimensions = {}
        return (async ()=>{
            await this.inititialize({scale, image, posterPosition})
            return this;
        })()
    }
    async inititialize({scale = 1, image, posterPosition = [0,0]}){
        const texture = await Assets.load(image);
        const sprite = Sprite.from(texture);
        sprite.scale.set(scale,scale);
        sprite.eventMode = 'static';
        sprite.cursor = 'pointer';
        sprite.on('pointerdown', (a,b,c)=>{
            debugger
        });
        this.container.position.set(...posterPosition)
        sprite.position.set(0,0)
        this.dimensions = {
            x:posterPosition.x,
            y:0,
            width:sprite.width,
            height:sprite.height
        }
        this.highlight.rect(this.dimensions.x,this.dimensions.y,this.dimensions.width,this.dimensions.height)
        this.highlight.eventMode = 'static';
        this.highlight.cursor = 'pointer';
        this.container.addChild(this.highlight)
        this.container.addChild(sprite)
    }
    focus(){
        this.highlight
        .rect(this.dimensions.x,this.dimensions.y,this.dimensions.width,this.dimensions.height)
        .setStrokeStyle ({
            width: 8,
            color: '#ff0000ff'
        })
        .stroke()
        this.activate();
    }
    blur(){
        this.highlight.clear()
        this.deActivate();
    }
    activate(){
        this.active = true
    }
    deActivate(){
        this.active = false
    }
}
