export interface Emoji {
  emoji: string;
  description: string;
  category: string;
  aliases: string[];
  tags: string[];
  unicodeVersion: string;
  emojiVersion: string;
}

const isEmoji = (data: unknown): data is Emoji[] =>
  Array.isArray(data) && data.every((item) => typeof item === 'object');

export default isEmoji;
