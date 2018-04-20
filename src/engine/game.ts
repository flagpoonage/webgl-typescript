import { Dispatch } from "redux";
import GameView from './view';
import GameBoard from './board';
import IStateScreenData from "../types/IStateScreenData";
import IViewCoordinates from "../types/IViewCoordinates";

/*
  
  Game master controller

*/
class Game {

  screen_data: IStateScreenData
  mounted: boolean
  canvas: HTMLCanvasElement
  context: WebGLRenderingContext
  dispatch: Dispatch<any>
  view: GameView
  board: GameBoard
  last_loop: number
  fps_step: number

  constructor () {
    this.mounted = false;
    this.start = this.start.bind(this);
    this.enterLoop = this.enterLoop.bind(this);
  }

  start (canvas: HTMLCanvasElement, screen_data: IStateScreenData, dispatch: Dispatch<any>) {
    if (this.mounted) {
      return;
    }

    this.fps_step = 1000 / 100; // Bit higher, we're targeting 60
    this.last_loop = 0;
    this.screen_data = screen_data;
    
    this.mountDispatch(dispatch);
    this.mountCanvas(canvas);
    this.mountView();
    this.mountBoard();

    this.enterLoop();
  }

  enterLoop () {
    window.requestAnimationFrame(this.enterLoop);

    let now = performance.now();

    if (now - this.last_loop < this.fps_step) {
      return;
    }

    this.board.update((new Date()).getTime());
    this.view.render(this.board);
  }

  mountBoard () {
    this.board = new GameBoard(this.context);
  }

  mountView () {
    this.view = new GameView(this.screen_data);
    this.view.setGlContext(this.context);
  }

  mountDispatch (dispatch: Dispatch<any>) {
    this.dispatch = dispatch;
  }

  mountCanvas (canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    
    this.canvas.addEventListener('click', e => {
      console.log('Canvas clicked');
    });

    this.context = canvas.getContext('webgl');
    this.context.clearColor(0.15, 0.1, 0, 1);
  }

  updateScreen (screen_data: IStateScreenData) {
    this.screen_data = screen_data;
    this.view.setViewCoordinates(this.screen_data);
  }

}

export default new Game();