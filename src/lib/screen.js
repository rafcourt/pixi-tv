import {Rail} from '../rail.js';
import API from '../lib/api.js';
import {KeyEventHandler} from '../keyEventHandler.js';
import {ScrollView} from '../scrollView.js';
import {
    Container
  } from 'pixi.js';

export class Screen{
    railHeight = 350
    constructor(endpoints){
        this.container = new Container();
        return (async ()=>{
            await this.initialize(endpoints)
            return this;
        })()
    }
    async initialize(endpoints){
        const railData = await Promise.all(endpoints.map(async endpointIdentifier => {
            return await this.fetchData(endpointIdentifier)
        })).then(async (responses)=>{
            return responses
        })
        const railElements = await Promise.all(railData.map(async (data, index) => {
            return await this.addRail({data:data.results, xy:[0, this.railHeight * index]})
        }))
        this.scrollView = await this.addScrollView({rails:railElements,xy:[64,100], orientation:1})
        this.scrollView.focus()
    }
    async addRail({data, xy}){
        return await new Rail(data, xy);
    }
    async addScrollView({rails, xy, orientation}){
        const scrollView = await new ScrollView(rails, xy, orientation);
        this.container.addChild(scrollView.container);
        return scrollView
    }
    async fetchData(endpointIdentifier){
        return await API.get({endpointIdentifier});
    }
    update(ticker, keyEventHandler){
        this.scrollView.update(ticker, keyEventHandler);
    }
}