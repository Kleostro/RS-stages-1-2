type Actions = 'click' | 'submit' | 'focus' | 'blur';

type ButtonAction = { key: Actions; value: () => void };
export default ButtonAction;
