/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import FavoriteCategories from '../components/FavoriteCategories';
import FavoriteCardList from '../components/FavoriteCardList';
import categories from '../utils/categories';
import PIXABAY_API from '../utils/PIXABAY_API';

const Container = styled.div`
  padding: 15px 15px 15px 0;
`;

const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: auto;
  margin: auto auto 15px 15px;
`;

const MasLayout = styled.div`
  .masonry-grid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: auto;
  }
  .masonry-grid_column {
    padding-left: 15px;
    background-clip: padding-box;
  }

  // TODO 필요시 img 태그 변경
  .masonry-grid_column > img {
    background: grey;
    margin-bottom: 15px;
  }
`;

const Loader = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/loading.gif`,
})`
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 100px;
  width: 100px;
`;

interface FetchImages {
  data: string[];
  id: number;
  webformatURL: string;
  tags: string;
}

interface Category {
  categoryName: string;
  imagePath: string;
}

let pageNumber = 1;
const FavoritePage = (): JSX.Element => {
  const [imagesArray, setImagesArray] = useState<FetchImages[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = (pageNum: number, query: string): void => {
    PIXABAY_API.get('/', {
      params: { page: pageNum, q: query },
    })
      .then(res => {
        setImagesArray([...imagesArray, ...res.data.hits]);
        setTotalPages(Math.ceil(res.data.totalHits / res.data.hits.length));
      })
      .catch(err => console.log(err.name));
  };

  useEffect(() => {
    if (!imagesArray.length) {
      fetchImages(pageNumber, 'minimal');
    }
  });

  const breakPoints = {
    default: 6,
    1200: 4,
    992: 3,
    768: 2,
    576: 2,
  };

  return (
    <Container>
      <Categories>
        {categories.map((category: Category) => (
          <FavoriteCategories category={category} key={category.categoryName} />
        ))}
      </Categories>
      <InfiniteScroll
        dataLength={imagesArray.length}
        next={() =>
          setTimeout(() => fetchImages(++pageNumber, 'minimal'), 1500)
        }
        hasMore={pageNumber < totalPages}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <MasLayout>
          <Masonry
            breakpointCols={breakPoints}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {imagesArray.map(item => (
              <FavoriteCardList item={item} key={item.id} />
            ))}
          </Masonry>
        </MasLayout>
      </InfiniteScroll>
    </Container>
  );
};

export default FavoritePage;
