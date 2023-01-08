type Image = {
  id: string;
  author: string;
  height: number;
  width: number;
  url: string;
  download_url: string;
};

export const getImages = async (counter: number) => {
  console.log('fetching images');
  console.log('counter', counter);
  const resp = await fetch(
    `https://picsum.photos/v2/list?page=2&limit=${counter}`
  );
  const data = (await resp.json()) as Image[];
  return data;
};
