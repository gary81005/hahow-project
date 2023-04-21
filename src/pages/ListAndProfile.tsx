import { CircularProgress, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

import { AbilitiesSetting, HeroCardList } from '../components';
import { ListAndProfileProvider } from '../context';
import useList from '../hooks/useListAndProfile';

const ListAndProfile = () => {
  const { id } = useParams();
  const { initLoading, isLoading, list, abilities, setIsLoading } = useList(id);

  return (
    <ListAndProfileProvider isLoading={isLoading} updateIsLoading={setIsLoading}>
      <Container disableGutters>
        {initLoading ? <CircularProgress /> : <HeroCardList heroId={id || ''} list={list} />}
        {id && abilities ? <AbilitiesSetting heroId={id} abilities={abilities} /> : null}
      </Container>
    </ListAndProfileProvider>
  );
};

export default ListAndProfile;
