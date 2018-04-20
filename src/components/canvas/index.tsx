import * as React from 'react';
import Game from '../../engine/game';
import { Dispatch } from 'react-redux';
import IStateScreenData from '../../types/IStateScreenData';

interface Props {

  dispatch: Dispatch<any>
  screenData: IStateScreenData

};

let is_mounted = false;

export default class Canvas extends React.Component<Props, any> {

  canvas: HTMLCanvasElement

  constructor (props) {
    super(props);
  }

  shouldComponentUpdate (props: Props) {
    if (props.screenData.width !== this.props.screenData.width || 
        props.screenData.height !== this.props.screenData.height) {
      // Rerender the canvas if the height or width changes.
      return true;
    }

    // Otherwise the canvas will be updated in the game engine.
    return false;
  }

  setCanvas (el) {
    if (this.canvas) {
      Game.updateScreen(this.props.screenData);
    }
    else {
      this.canvas = el;
      Game.start(this.canvas, this.props.screenData, this.props.dispatch);
    }
  }

  render () {
    return (
      <canvas ref={this.setCanvas.bind(this)} width={this.props.screenData.width} height={this.props.screenData.height}>
      </canvas>
    );
  }

}