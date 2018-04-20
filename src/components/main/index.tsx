import './index.css';

import * as React from 'react';
import { connect } from 'react-redux';
import Canvas from '../canvas';
import IStateScreenData from '../../types/IStateScreenData';
import IState from '../../types/IState';
import { Dispatch } from 'redux';

interface Props {
  onResize: (width: number, height: number) => void,
  dispatch: Dispatch<any>
  screen_data: IStateScreenData
}

let throttled: boolean = false;

const Main = connect(

  (state: IState) => state,

  dispatch => ({
    dispatch,
    onResize: (width, height) => dispatch({
      type: 'WINDOW_RESIZE',
      width: width,
      height: height
    })
  })

)(class MainComponent extends React.Component<Props, any> {

  constructor (props) {
    super(props);

    window.addEventListener('resize', this.throttledResize.bind(this));
  }

  throttledResize () {
    if (throttled) {
      return;
    }

    throttled = true;

    window.requestAnimationFrame(() => {
      this.props.onResize(window.innerWidth, window.innerHeight);
      throttled = false;
    })
  }

  render () {
    return (
      <div id="root">
        <Canvas dispatch={this.props.dispatch} screenData={this.props.screen_data} />
      </div>
    );
  }

});

export default Main;