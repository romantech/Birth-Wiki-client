import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
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

interface FetchImages {
  data: string[];
  id: number;
  webformatURL: string;
  tag: string;
}

interface Category {
  categoryName: string;
  imagePath: string;
}

const FavoritePage = (): JSX.Element => {
  const [imagesArray, setImagesArray] = useState<FetchImages[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = (pageNum: number, query: string): void => {
    PIXABAY_API.get('/', {
      params: { page: pageNum, q: query },
    })
      .then(res => {
        setImagesArray([...imagesArray, ...res.data.hits]);
        setTotalPages(res.data.totalHits / res.data.hits.length);
      })
      .catch(err => console.log(err.name));
  };

  useEffect(() => {
    fetchImages(1, 'minimal');
  }, []);

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
    </Container>
  );
};

export default FavoritePage;
