const getEmojiData = async (): Promise<unknown> => {
  const response = await fetch(
    'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json',
  );
  const data: unknown = await response.json();
  return data;
};

export default getEmojiData;
