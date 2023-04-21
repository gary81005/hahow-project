import { CircularProgress, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

import { AbilitiesSetting, HeroCardList } from '../components';
import { ListAndProfileProvider } from '../context';
import useList from '../hooks/useListAndProfile';
import AlertInfo from '../components/AlertInfo';

const ListAndProfile = () => {
  const { id } = useParams();
  const { error, initLoading, isLoading, list, abilities, setIsLoading } = useList(id);

  return (
    <ListAndProfileProvider isLoading={isLoading} updateIsLoading={setIsLoading}>
      <Container disableGutters>
        {initLoading ? <CircularProgress /> : <HeroCardList heroId={id || ''} list={list} />}
        {id && abilities ? <AbilitiesSetting heroId={id} abilities={abilities} /> : null}
      </Container>
      {error && <AlertInfo alertOpen status="error" info={error} />}
    </ListAndProfileProvider>
  );
};

export default ListAndProfile;
