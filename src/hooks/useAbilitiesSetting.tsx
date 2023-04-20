import { useEffect } from 'react';
import { useImmer } from 'use-immer';

import { AbilitiesSettings, UserNoti } from '../components/types';
import { updateHeroProfile } from '../services/heroes';
import { useListAndProfileContext } from '../context';
import { Abilities } from '../services/types';

function useAbilitiesSetting(heroId: string, abilities: Abilities) {
  const { updateStatus } = useListAndProfileContext();
  const [abilitiesSettings, setAbilitiesSettings] = useImmer<AbilitiesSettings>({
    titles: [],
    values: null,
    remain: 0,
  });

  const [userNoti, setUserNoti] = useImmer<UserNoti>({
    alertOpen: false,
    status: 'warning',
    info: null,
    hasChanged: false,
  });

  const { values, remain } = abilitiesSettings;
  const { hasChanged } = userNoti;

  const handleAdd = (type: string) => {
    setAbilitiesSettings((draft) => {
      draft.remain = remain - 1;
      draft.values = {
        ...draft.values,
        [type]: values && values?.[type] !== undefined ? values[type] + 1 : 0,
      };
    });

    setUserNoti((draft) => {
      draft.hasChanged = true;
    });
  };

  const handleMinus = (type: string) => {
    setAbilitiesSettings((draft) => {
      draft.remain = remain + 1;
      draft.values = {
        ...draft.values,
        [type]: values && values?.[type] !== undefined ? values[type] - 1 : 0,
      };
    });

    setUserNoti((draft) => {
      draft.hasChanged = true;
    });
  };

  const checkValidate = () => {
    // check abilities is changed or not
    if (!hasChanged) {
      setUserNoti((draft) => {
        draft.alertOpen = true;
        draft.status = 'warning';
        draft.info = '請先調整能力值';
      });
      return false;
    }
    // check remain points is 0 or not
    if (remain !== 0) {
      setUserNoti((draft) => {
        draft.alertOpen = true;
        draft.status = 'warning';
        draft.info = '請使用完剩餘點數';
      });
      return false;
    }

    return true;
  };

  // save button click handle, it will check validation first. It will call update api if pass
  const handleSave = () => {
    if (values && checkValidate()) {
      if (updateStatus) {
        updateStatus(true);
      }
      updateHeroProfile({ heroId, abilities: values })
        .then(() => {
          setUserNoti((draft) => {
            draft.alertOpen = true;
            draft.status = 'success';
            draft.info = '更新成功';
            draft.hasChanged = false;
          });
        })
        .catch(() => {
          setUserNoti((draft) => {
            draft.alertOpen = true;
            draft.status = 'error';
            draft.info = '更新失敗';
          });
        })
        .finally(() => {
          if (updateStatus) {
            updateStatus(false);
          }
        });
    }
  };

  const handleClose = () => {
    setUserNoti((draft) => {
      draft.alertOpen = false;
    });
  };

  useEffect(() => {
    const abilitiesTitle = Object.keys(abilities);
    setAbilitiesSettings((draft) => {
      draft.titles = abilitiesTitle;
      draft.remain = 0;
      draft.values = abilities;
    });
    setUserNoti((draft) => {
      draft.alertOpen = false;
      draft.status = 'warning';
      draft.info = null;
      draft.hasChanged = false;
    });
  }, [abilities, setAbilitiesSettings, setUserNoti]);

  return {
    abilitiesSettings,
    userNoti,
    handleAdd,
    handleClose,
    handleMinus,
    handleSave,
  };
}

export default useAbilitiesSetting;
