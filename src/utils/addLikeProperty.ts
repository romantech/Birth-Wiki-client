import { LikeCardsGeneral } from '../types/index';

const addLikeProperty = (likeCards: LikeCardsGeneral[]) => {
  if (likeCards !== null) {
    return likeCards.map((card) => {
      if (card.like === undefined) {
        card['like'] = true;
        return card;
      }
      return card;
    });
  }
  return likeCards;
};

export default addLikeProperty;
