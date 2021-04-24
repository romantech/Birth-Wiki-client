import { LikeCardsGeneral } from '../types/index';

const addLikeProperty = (likeCards: LikeCardsGeneral[]) => {
  if (likeCards.length !== 0) {
    return likeCards.map((card) => {
      if (card.like === undefined) {
        card['like'] = true;
        return card;
      }
      return card;
    });
  }
};

export default addLikeProperty;
