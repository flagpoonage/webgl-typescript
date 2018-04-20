import ICoordinates from "../types/ICoordinates";

export default class Circle {
  coords: ICoordinates

  constructor(at: ICoordinates) {
    this.coords = at;
  }

}