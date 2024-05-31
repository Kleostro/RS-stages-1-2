const formattedText = (text: string): string =>
  text
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

export default formattedText;
