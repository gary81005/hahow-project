import { Hero } from '../../services/types';

export type CardProps = {
  selected: boolean;
  disabled: boolean;
};

export interface HeroCardListProps {
  heroId: string;
  list: Hero[];
}
