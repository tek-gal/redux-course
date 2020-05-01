import { combineReducers } from 'redux';
import { INCREMENT, DECREMENT, CHANGE_THEME, ENABLE_BUTTONS, DISABLE_BUTTONS } from './types';

function counterReducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

function buttonsStateReducer(state = { disabled: false }, action) {
  switch (action.type) {
    case ENABLE_BUTTONS:
      return { ...state, disabled: false };
    case DISABLE_BUTTONS:
      return { ...state, disabled: true };
    default:
      return state;
  }
}

function themeReducer(state = { value: 'light' }, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

export default combineReducers({
    counter: counterReducer,
    theme: themeReducer,
    buttonsState: buttonsStateReducer,
});
