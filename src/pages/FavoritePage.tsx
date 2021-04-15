/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import FavoriteCategories from '../components/FavoriteCategories';
import FavoriteCardList from '../components/FavoriteCardList';
import categories from '../utils/categories';
import PIXABAY_API from '../utils/PIXABAY_API';
import ProfileCard from '../components/ProfileCard';
import { ArrowLeft, ArrowRight } from '../components/ArrowIcon';
import { FaArrowCircleUp } from 'react-icons/fa';

const Container = styled.div`
  padding: 1.8rem 5rem 5rem 4rem;
  /* background: #d4dbdd; */

  // 1200px 이하인 경우
  @media (max-width: 1500px) {
    padding: 1.8rem 4rem 4rem 3rem;
  }

  @media (max-width: 1200px) {
    padding: 1.6rem 2rem 2rem 1rem;
    h1 {
      margin-left: 1rem;
    }
  }

  @media (max-width: 922px) {
    padding: 1.6rem 1.8rem 1.8rem 0.9rem;
    h1 {
      font-size: 1.8em;
      margin-left: 1rem;
    }
  }

  @media (max-width: 576px) {
    padding: 0.2rem 1.2rem 1.2rem 0.25rem;
    h1 {
      font-size: 1.7em;
      text-align: center;
    }
  }

  li {
    display: block;
    border-bottom: 1px solid rgba(0, 0, 0, 0.048);
    margin-bottom: 30px;
  }
`;

const Categories = styled.div`
  margin: auto auto 50px 15px;

  .menu-item {
    user-select: none;
  }

  .scroll-menu-arrow {
    padding: 20px;
    cursor: pointer;
    @media (max-width: 922px) {
      display: none;
    }
  }

  .arrow-prev,
  .arrow-next {
    &:hover {
      fill: black;
    }
  }
`;

const ScrollIcon = styled(FaArrowCircleUp)`
  color: gray;
  opacity: 0.4;
  font-size: 2.5rem;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: black;
    transition: all 0.3s ease-in-out;
    bottom: 30px;
    opacity: 0.7;
  }
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

interface Selected {
  selected: string | number | null;
}

let pageNumber = 1;
const FavoritePage = (): JSX.Element => {
  const [imagesArray, setImagesArray] = useState<FetchImages[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selected, setSelected] = useState<Selected>({ selected: '' });

  const onSelect = (key: string | number | null) => {
    setSelected({ selected: key });
  };

  const fetchImages = (pageNum: number, query: string): void => {
    PIXABAY_API.get('/', {
      params: { page: pageNum, q: query },
    })
      .then((res) => {
        setImagesArray([...imagesArray, ...res.data.hits]);
        setTotalPages(Math.floor(res.data.totalHits / res.data.hits.length));
      })
      .catch((err) => console.log(err.name));
  };

  useEffect(() => {
    if (!imagesArray.length) {
      fetchImages(pageNumber, 'minimal');
    }
  });

  const breakPoints = {
    default: 6,
    1500: 5,
    1200: 4,
    922: 3,
    768: 3,
    576: 2,
  };

  return (
    <Container>
      <h1>CATEGORY</h1>
      <Categories>
        <ScrollMenu
          data={categories.map((category) => (
            <FavoriteCategories
              selected={(selected as unknown) as string}
              category={category}
              key={category.categoryName}
            />
          ))}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          onSelect={onSelect}
          alignCenter={false}
        />
      </Categories>
      <li />
      <h1>YOUR CARDS</h1>
      <InfiniteScroll
        dataLength={imagesArray.length}
        next={() => setTimeout(() => fetchImages(++pageNumber, 'minimal'), 1500)}
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
            className='masonry-grid'
            columnClassName='masonry-grid_column'
          >
            <ProfileCard />
            {imagesArray.map((item) => (
              <FavoriteCardList item={item} key={item.id} />
            ))}
          </Masonry>
        </MasLayout>
        <ScrollIcon onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      </InfiniteScroll>
    </Container>
  );
};

export default FavoritePage;
