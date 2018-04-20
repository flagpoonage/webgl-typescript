import IState from "../types/IState";
import { Action } from "redux";

export default (state: IState, action: any): IState => {
  let newstate = Object.assign({}, state);
  
  switch (action.type) {
    case 'WINDOW_RESIZE':
      newstate.screen_data = Object.assign({}, {
        width: action.width,
        height: action.height 
      });
  }

  return newstate;
}