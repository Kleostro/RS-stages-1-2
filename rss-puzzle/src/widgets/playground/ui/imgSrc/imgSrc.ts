const volumeOn = `<?xml version="1.0" ?><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M218.9,77.1a71.9,71.9,0,0,1,0,101.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M80,168H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H80l72-56V224Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="80" x2="80" y1="88" y2="168"/><path d="M190.6,105.4a31.9,31.9,0,0,1,0,45.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`;

const volumeOff = `<?xml version="1.0" ?><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#101820;}</style></defs><title/><g data-name="Layer 35" id="Layer_35"><path class="cls-1" d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z"/><path class="cls-1" d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z"/><rect class="cls-1" height="12" transform="translate(-3.77 22.9) rotate(-45)" width="2" x="24.76" y="10"/><rect class="cls-1" height="2" transform="translate(-3.77 22.9) rotate(-45)" width="12" x="19.76" y="15"/></g></svg>`;

const IMG_SRC = {
  volumeOn,
  volumeOff,
} as const;

export default IMG_SRC;
