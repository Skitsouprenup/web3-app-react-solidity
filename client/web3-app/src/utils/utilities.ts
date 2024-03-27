export const shortenAccountId = (id: string | undefined) => {
  if(!id) return '';
  if(id.length < 12) return id;

  const left = id.substring(0, 7);
  const right = id.substring(id.length-5, id.length);

  return left + '...' + right;
}