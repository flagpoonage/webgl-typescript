export default class VerticeSet extends Array<number> {

  constructor (...points: number[]) {
    super();
    this.push(...points);
  }
  
  clear (): Array<number> {
    return this.splice(0, this.length);
  }

};