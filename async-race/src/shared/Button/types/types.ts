type ActionsType =
  | 'click'
  | 'submit'
  | 'focus'
  | 'blur'
  | 'keydown'
  | 'keyup'
  | 'change'
  | 'hover'
  | 'touchstart'
  | 'touchmove'
  | 'touchend'
  | 'touchcancel'
  | 'contextmenu'
  | 'input'
  | 'load'
  | 'scroll'
  | 'resize'
  | 'animationstart'
  | 'animationiteration'
  | 'animationend'
  | 'transitionstart'
  | 'transitionend'
  | 'transitioncancel'
  | 'transitionrun';

type ButtonActionType = { key: ActionsType; value: () => void };
export default ButtonActionType;
