const messageDateFormatting = (date: number): string => {
  const newDate = new Date(date);
  const hours = newDate.getHours().toString().padStart(2, '0');
  const minutes = newDate.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export default messageDateFormatting;
