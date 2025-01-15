import { Scroller } from './scroller';
  
  export class ScrollView extends Scroller{
    constructor (rails,xy,orientationIndex=0){
        return super(rails,xy,orientationIndex);
    }
    async initialize(children){
        let rail = children.head;
        this.container.addChild(rail.data.container);
        while(children.hasNext(rail)){
            rail = rail.next;
            this.container.addChild(rail.data.container);
        }
        this.setActiveChild(children.head.data);
        children.setCurrent(children.head);
    }
    update(ticker,keyEventHandler){
        if(keyEventHandler.keys.down.pressed){
            keyEventHandler.keys.down.pressed = false;
            this.scrollNext();
        }else if(keyEventHandler.keys.up.pressed){
            keyEventHandler.keys.up.pressed = false;
            this.scrollPrevious();
        }else{
            this.activeChild?.update(ticker,keyEventHandler);
        }
    }
}