type Actions = 'click' | 'submit' | 'focus' | 'blur';

type ButtonAction = { key: Actions; value: (event: Event) => void };
export default ButtonAction;
