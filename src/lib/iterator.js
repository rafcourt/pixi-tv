export class ListIterator{
    constructor(array) {
        this.array = array || [];
        this.reset();
    }
    reset () {
        this.currentIndex = 0;
    }
    hasNext () {
        return (this.currentIndex < this.array.length);
    }
    next () {
        if(this.hasNext()) {
            return this.array[this.currentIndex++];
        } else {
            return undefined;
        }
    }
    peek () {
        return this.array[this.currentIndex];
    }
    getPointer () {
        return this.currentIndex;
    }
    isEmpty () {
        return this.array.length === 0;
    }
    getLength () {
        return this.array.length;
    }
}