import { useCallback, useState } from 'react';

import { AbilitiesSettings, UserNoti } from '../components/types';
import { updateHeroProfile } from '../services/heroes';
import { useListAndProfileContext } from '../context';
import { Abilities } from '../services/types';

function useAbilitiesSetting(heroId: string) {
  const { updateStatus } = useListAndProfileContext();
  const [abilitiesSettings, setAbilitiesSettings] = useState<AbilitiesSettings>({
    titles: [],
    values: null,
    remain: 0,
  });

  const [userNoti, setUserNoti] = useState<UserNoti>({
    alertOpen: false,
    status: 'warning',
    info: null,
    hasChanged: false,
  });

  const { values, remain } = abilitiesSettings;
  const { hasChanged } = userNoti;

  const handleAdd = (type: string) => {
    setAbilitiesSettings((prev) => ({
      ...prev,
      remain: remain - 1,
      values: {
        ...prev.values,
        [type]: values && values?.[type] !== undefined ? values[type] + 1 : 0,
      },
    }));
    setUserNoti((prev) => ({
      ...prev,
      hasChanged: true,
    }));
  };

  const handleMinus = (type: string) => {
    setAbilitiesSettings((prev) => ({
      ...prev,
      remain: remain + 1,
      values: {
        ...prev.values,
        [type]: values && values?.[type] !== undefined ? values[type] - 1 : 0,
      },
    }));
    setUserNoti((prev) => ({
      ...prev,
      hasChanged: true,
    }));
  };

  const checkValidate = () => {
    // check abilities is changed or not
    if (!hasChanged) {
      setUserNoti((prev) => ({
        ...prev,
        alertOpen: true,
        status: 'warning',
        info: '請先調整能力值',
      }));
      return false;
    }
    // check remain points is 0 or not
    if (remain !== 0) {
      setUserNoti((prev) => ({
        ...prev,
        alertOpen: true,
        status: 'warning',
        info: '請使用完剩餘點數',
      }));
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
          setUserNoti({
            alertOpen: true,
            status: 'success',
            info: '更新成功',
            hasChanged: false,
          });
        })
        .catch(() => {
          setUserNoti((prev) => ({
            ...prev,
            alertOpen: true,
            status: 'error',
            info: '更新失敗',
          }));
        })
        .finally(() => {
          if (updateStatus) {
            updateStatus(false);
          }
        });
    }
  };

  const handleClose = () => {
    setUserNoti((prev) => ({
      ...prev,
      alertOpen: false,
    }));
  };

  const resetAbilities = useCallback((abilities: Abilities) => {
    const abilitiesTitle = Object.keys(abilities);
    setAbilitiesSettings({
      titles: abilitiesTitle,
      values: abilities,
      remain: 0,
    });
    setUserNoti({
      alertOpen: false,
      status: 'warning',
      info: 'null',
      hasChanged: false,
    });
  }, []);

  return {
    abilitiesSettings,
    userNoti,
    handleAdd,
    handleClose,
    handleMinus,
    handleSave,
    resetAbilities,
  };
}

export default useAbilitiesSetting;
