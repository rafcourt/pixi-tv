import {
    Application,
    Graphics,
    Text,
    TextStyle,
    Assets,
    Sprite,
    Container
  } from 'pixi.js';
import { LinkedList } from './lib/linkedlist';

export class Scroller{
    static ORIENTATIONS = ['horizontal','vertical']
    static ORIENTATION = {
        vertical:'vertical',
        horizontal:'horizontal'
    }
    constructor(children, xy = [0,0], orientationIndex = 0){
        this.orientation = Scroller.ORIENTATION[Scroller.ORIENTATIONS[orientationIndex]] 
        this.activeChild = null;
        [this.xMargin,this.yMargin] = xy;
        this.container = new Container();
        this.container.position.set(this.xMargin,this.yMargin);
        this.children = children;
        this.linkedlist = new LinkedList(this.children)
        return (async ()=>{
            await this.initialize(this.linkedlist)
            return this;
        })()
    }
    async initialize(){}
    update(){}
    scrollNext(){
        const current = this.linkedlist.getCurrent();
        if(this.linkedlist.hasNext(current)){
            let next = this.linkedlist.next(current);
            const xy = this.getCoordinates(next.data.container,1)
            this.scrollTo(xy);
            this.blur();
            this.setActiveChild(next.data);
            this.focus();
        }
    }
    scrollPrevious(){
        const current = this.linkedlist.getCurrent();
        if(this.linkedlist.hasPrevious(current)){
            const previous = this.linkedlist.previous(current);
            const xy = this.getCoordinates(previous.data.container,1)
            this.scrollTo(xy)
            this.blur();
            this.setActiveChild(previous.data);
            this.focus();
        }
    }
    scrollTo(xy){
        console.log(xy)
        this.container.position.set(...xy);
    }
    focus(){
        this.activeChild?.focus();
    }
    blur(){
        this.activeChild?.blur();
    }
    activate(){
        this.active = true
    }
    deActivate(){
        this.active = false
    }
    setActiveChild(child){
        if(!child)
            return
        this.activeChild?.deActivate();
        this.activeChild = child;
        this.activeChild.activate();
    }
    getCoordinates(container,direction){
        return this.orientation == Scroller.ORIENTATION.horizontal 
        ? [(-direction*container.x ) + this.xMargin,this.yMargin] 
        : [this.xMargin,(-direction*container.y) + this.yMargin];
    }
}