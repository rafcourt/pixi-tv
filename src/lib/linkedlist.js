class LinkedListNode{
    constructor({data, previous = null, next = null}){
        this.data = data;
        this.previous = previous;
        this.next = next;
    }
}
export class LinkedList{
    constructor(array) {
        this.head = null;
        this.tail = null;
        this.list = this.createList(array);
    }
    createList(array){
        return array.reduce((list,element,index,array)=>{
            const previous = list[index-1];
            const node = new LinkedListNode({data:element,previous});
            if(index === 0){
                this.head = node
            }else if(index === array.length - 1){
                this.tail = node
            }
            if(previous){
                previous.next = node;
            }
            list.push(node);
            
            return list
        },[]);
    }
    reset(array){
        this.list = this.createList(array);
    }
    hasNext (node) {
        return (!!node.next);
    }
    hasPrevious (node) {
        return (!!node.previous);
    }
    next (node) {
        if(this.hasNext(node)) {
            this.setCurrent(node.next)
            return node.next;
        } else {
            return undefined;
        }
    }
    previous (node) {
        if(this.hasPrevious(node)) {
            this.setCurrent(node.previous)
            return node.previous;
        } else {
            return undefined;
        }
    }
    peek (index) {
        return this.array[index];
    }
    isEmpty () {
        return this.array.length === 0;
    }
    getLength () {
        return this.array.length;
    }
    setCurrent(node){
        this.current = node;
    }
       
    getCurrent(){
        return this.current;
    }
    async all(callback){
        let all = [];
        let current = this.head
        let index = 0
        while(this.hasNext(current)){
            all.push(callback(current,index++))
            current = current.next
        }
        return all
    }
}