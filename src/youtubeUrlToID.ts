const youtubeRegex =
  /(?:https?:)?\/{2}(?:www\.)?youtu\.?be(?:\/|\.com\/watch\?v=|\.com\/v\/|\.com\/embed\/)?([\w-]*)[?&]?.*/;
const youtubeUrlToID = (url: string) => {
  const result = url.match(youtubeRegex);
  if (result) return result[1];
  return null;
};

export default youtubeUrlToID;
