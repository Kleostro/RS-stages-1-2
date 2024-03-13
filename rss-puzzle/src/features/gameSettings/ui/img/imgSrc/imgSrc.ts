const translateOn = `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.34315 3.65686L1 7.00001L4.34315 10.3432C7.46734 13.4674 12.5327 13.4674 15.6569 10.3432L19 7.00001L15.6569 3.65687C12.5327 0.532674 7.46734 0.53267 4.34315 3.65686Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 7.00001C12 8.10458 11.1046 9.00001 10 9.00001C8.89543 9.00001 8 8.10458 8 7.00001C8 5.89544 8.89543 5.00001 10 5.00001C11.1046 5.00001 12 5.89544 12 7.00001Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const translateOff = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.58579 8.58579C8.94772 8.22386 9.44771 8 10 8C11.1046 8 12 8.89543 12 10C12 10.5523 11.7761 11.0523 11.4142 11.4142M8.58579 8.58579L11.4142 11.4142M8.58579 8.58579L5.61839 5.61839M11.4142 11.4142L14.3816 14.3816M19 19L14.3816 14.3816M14.3816 14.3816C14.8327 14.0858 15.2604 13.7396 15.6569 13.3431L19 10L15.6569 6.65685C12.9291 3.92913 8.72168 3.58297 5.61839 5.61839M5.61839 5.61839L1 1M3 8L1 10L4.34315 13.3431C6.1601 15.1601 8.63361 15.9204 11 15.6239" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const IMG_SRC = {
  translateOn,
  translateOff,
} as const;

export default IMG_SRC;
