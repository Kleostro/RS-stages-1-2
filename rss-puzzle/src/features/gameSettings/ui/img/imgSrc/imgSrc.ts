const translateOn = `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.34315 3.65686L1 7.00001L4.34315 10.3432C7.46734 13.4674 12.5327 13.4674 15.6569 10.3432L19 7.00001L15.6569 3.65687C12.5327 0.532674 7.46734 0.53267 4.34315 3.65686Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 7.00001C12 8.10458 11.1046 9.00001 10 9.00001C8.89543 9.00001 8 8.10458 8 7.00001C8 5.89544 8.89543 5.00001 10 5.00001C11.1046 5.00001 12 5.89544 12 7.00001Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const translateOff = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.58579 8.58579C8.94772 8.22386 9.44771 8 10 8C11.1046 8 12 8.89543 12 10C12 10.5523 11.7761 11.0523 11.4142 11.4142M8.58579 8.58579L11.4142 11.4142M8.58579 8.58579L5.61839 5.61839M11.4142 11.4142L14.3816 14.3816M19 19L14.3816 14.3816M14.3816 14.3816C14.8327 14.0858 15.2604 13.7396 15.6569 13.3431L19 10L15.6569 6.65685C12.9291 3.92913 8.72168 3.58297 5.61839 5.61839M5.61839 5.61839L1 1M3 8L1 10L4.34315 13.3431C6.1601 15.1601 8.63361 15.9204 11 15.6239" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const chooseGameImg = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 8C10.1046 8 11 8.89543 11 10C11 11.1046 10.1046 12 9 12C7.89543 12 7 11.1046 7 10C7 8.89543 7.89543 8 9 8Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.90136 4.7469C2.96492 4.20624 1.76749 4.52709 1.22684 5.46353L1.1851 5.53583C0.644237 6.47263 0.965207 7.67051 1.902 8.21137L2.1448 8.35155C2.71742 8.68215 3 9.3388 3 10C3 10.6612 2.71742 11.3179 2.1448 11.6485L1.902 11.7886C0.965208 12.3295 0.644237 13.5274 1.1851 14.4642L1.22684 14.5365C1.7675 15.4729 2.96492 15.7938 3.90136 15.2531L4.14546 15.1122C4.71803 14.7816 5.42331 14.863 5.9953 15.1946C6.56711 15.526 7 16.1005 7 16.7614V17.0427C7 18.1237 7.8763 19 8.95728 19H9.04273C10.1237 19 11 18.1237 11 17.0427V16.7614C11 16.1005 11.4329 15.5261 12.0047 15.1946C12.5767 14.863 13.282 14.7816 13.8545 15.1122L14.0986 15.2531C15.0351 15.7938 16.2325 15.4729 16.7732 14.5365L16.8149 14.4642C17.3558 13.5274 17.0348 12.3295 16.098 11.7886L15.8552 11.6485C15.2826 11.3179 15 10.6612 15 10C15 9.3388 15.2826 8.68215 15.8552 8.35155L16.098 8.21137C17.0348 7.6705 17.3558 6.47262 16.8149 5.53581L16.7732 5.46353C16.2325 4.52709 15.0351 4.20623 14.0986 4.74689L13.8545 4.88783C13.282 5.2184 12.5767 5.13699 12.0047 4.80541C11.4329 4.47395 11 3.89952 11 3.23859V2.95728C11 1.8763 10.1237 1 9.04273 1L8.95728 1C7.8763 1 7 1.8763 7 2.95727V3.23858C7 3.89952 6.56711 4.47395 5.9953 4.80542C5.42331 5.13699 4.71803 5.2184 4.14546 4.88783L3.90136 4.7469Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const logOutImg = `<svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 13H7C3.68629 13 1 15.6863 1 19M12 14L15 17M15 17L18 20M15 17L18 14M15 17L12 20M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const IMG_SRC = {
  translateOn,
  translateOff,
  chooseGameImg,
  logOutImg,
} as const;

export default IMG_SRC;
