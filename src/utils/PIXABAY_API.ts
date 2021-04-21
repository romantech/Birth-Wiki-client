import axios from 'axios';

const PIXABAY_API = axios.create({
  baseURL: `https://pixabay.com/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.REACT_APP_PIXABAY_API_KEY,
    safesearch: true,
    orientation: 'vertical',
    // per_page: 10,
  },
});

export default PIXABAY_API;

// interface FetchImages {
//   data: string[];
//   id: number;
//   webformatURL: string;
//   tags: string;
//   imgUrl: string;
// }

// let pageNumber = 1;

// interface FetchImages {
//   data: string[];
//   id: number;
//   webformatURL: string;
//   tags: string;
//   imgUrl: string;
// }

// const [imagesArray, setImagesArray] = useState<FetchImages[]>([]);
// const [totalPages, setTotalPages] = useState(0);

// const fetchImages = (pageNum: number, query: string): void => {
//   PIXABAY_API.get('/', {
//     params: { page: pageNum, q: query },
//   })
//     .then((res) => {
//       setImagesArray([...imagesArray, ...res.data.hits]);
//       setTotalPages(Math.floor(res.data.totalHits / res.data.hits.length));
//     })
//     .catch((err) => console.log(err.name));
// };

// useEffect(() => {
//   if (!imagesArray.length) {
//     fetchImages(pageNumber, 'minimal');
//   }
// });

// <InfiniteScroll
// dataLength={imagesArray.length}
// next={() => setTimeout(() => fetchImages(++pageNumber, 'minimal'), 1500)}
// hasMore={pageNumber < totalPages}
// loader={<Loader />}
// endMessage={
//   <p style={{ textAlign: 'center' }}>
//     <b>Yay! You have seen it all</b>
//   </p>
// }
// >
