import './styles.css';
import rootReducer from './redux/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import { increment, decrement, asyncIncrement, changeTheme, disableButtons } from './redux/actions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

// const logger = (state) => (next) => (action) => {
//   console.log('state', state)
//   console.log('action', action)
//   return next(action);
// };

const store = createStore(
  rootReducer,
  composeWithDevTools(
      applyMiddleware(thunk, logger),
  ),
);

addBtn.addEventListener('click', () => {
  store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
  store.dispatch(decrement());
});


store.subscribe(() => {
  const state = store.getState();
  counter.textContent = state.counter;

  document.body.className = state.theme.value;
  addBtn.disabled = state.buttonsState.disabled;
  subBtn.disabled = state.buttonsState.disabled;
  themeBtn.disabled = state.buttonsState.disabled;
});

store.dispatch({ type: '__INIT__' });

asyncBtn.addEventListener('click', () => {
  store.dispatch(disableButtons());
  store.dispatch(asyncIncrement());
});

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('dark')
    ? 'light'
    : 'dark';
  store.dispatch(changeTheme(newTheme));
});
