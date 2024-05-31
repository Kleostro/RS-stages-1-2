const EMOJI_URL =
  'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json';

const getEmojiData = async (): Promise<unknown> => {
  const response = await fetch(EMOJI_URL);
  const data: unknown = await response.json();
  return data;
};

export default getEmojiData;
