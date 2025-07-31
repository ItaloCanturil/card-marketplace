export type Card = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export type TradeCard = {
  id: string;
  cardId: string;
  tradeId: string;
  type: 'OFFERING' | 'RECEIVING';
  card: Card;
}

export type ITrade = {
  id: string;
  userId: string;
  createdAt: string;
  user: {
    name: string;
  };
  tradeCards: TradeCard[];
}