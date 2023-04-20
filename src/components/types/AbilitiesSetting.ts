import { Abilities } from '../../services/types';

export interface AbilitiesSettingProps {
  heroId: string;
  abilities: Abilities;
}

export interface UserNoti {
  alertOpen: boolean;
  status: 'warning' | 'success' | 'error';
  info: string | null;
  hasChanged: boolean;
}

export interface AbilitiesSettings {
  titles: string[];
  values: Abilities | null;
  remain: number;
}
