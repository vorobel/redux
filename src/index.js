import './styles.css';
import {createStore} from 'redux';
// import {createStore} from './createStore';
import thunk from 'redux-thunk';
import { rootReducer } from './redux/rootReducer';
import {decrement, increment, asyncIncrement, changeTheme} from './redux/actions'
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

// function logger(state) {
//   return function(next) {
//     return function(action) {
//       console.log('Prev state', state.getState());
//       console.log('Action', action);
//       const newState = next(action);
//       console.log('New state', state.getState());
//       return newState;
//     }
//   }
// }

const store = createStore(rootReducer, applyMiddleware(thunk, logger));


addBtn.addEventListener('click', () => {
  store.dispatch(increment())
});
subBtn.addEventListener('click', () => {
  store.dispatch(decrement())
});
asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light') ? 'dark' : 'light'
  store.dispatch(changeTheme(newTheme))
  // document.body.classList.toggle('dark')
})

store.subscribe(() => {
  const state = store.getState();

  counter.textContent = state.counter;
  document.body.className = state.theme.value;
  [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
    btn.disabled = state.theme.disabled
  })
});

store.dispatch({ type: 'INIT_APPLICATION' })