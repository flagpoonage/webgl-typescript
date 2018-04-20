import IViewCoordinates from "../types/IViewCoordinates";
import { EventEmitter } from "events";
import IStateScreenData from "../types/IStateScreenData";
import GameBoard from "./board";

/*

  View module provides the interface to show the currently viewable
  section of the game board

*/

export default class GameView extends EventEmitter {

  view_coordinates: IViewCoordinates
  screen_data: IStateScreenData
  gl: WebGLRenderingContext

  constructor (screen_data: IStateScreenData) {
    super();

    this.screen_data = screen_data;
    this.setViewCoordinates(this.screen_data);
  }

  setGlContext (gl: WebGLRenderingContext) {
    this.gl = gl;
  }

  setViewCoordinates (screen_data: IStateScreenData) {
    let view_x, view_y = 0;

    if (this.view_coordinates) {
      view_x = this.view_coordinates.view_x;
      view_y = this.view_coordinates.view_y;
    }

    this.view_coordinates = {
      view_height: screen_data.height,
      view_width: screen_data.width,
      view_x: view_x,
      view_y: view_y
    };

    this.emit('updateCoordinates', this.view_coordinates);
  }

  updateViewCoordinates (view_coordinates: IViewCoordinates) {
    this.view_coordinates = view_coordinates;
  }

  render (board: GameBoard) {
    this.gl.viewport(50, 0, 
      this.view_coordinates.view_width,
      this.view_coordinates.view_height);

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      
    board.render(this.gl);
  }

};