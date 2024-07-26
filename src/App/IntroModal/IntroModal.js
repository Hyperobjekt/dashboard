import { styled } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { Modal, Box, Button, Typography, Backdrop } from '@mui/material';
import shallow from 'zustand/shallow';
import { useDashboardStore } from '@hyperobjekt/react-dashboard';
import useIntroModalStore from './store';
import {
  Boxmodal,
  Container,
  Content,
  Description,
  Buttoncontainer,
  Label,
} from './IntroModal.styles';
import useAppStore from 'App/store';

const IntroModal = ({ ...props }) => {
  const [introModalOpen, setIntroModalOpen] = useIntroModalStore(
    (state) => [state.open, state.setOpen],
    shallow,
  );
  const setRegion = useDashboardStore((state) => state.setRegion);
  const [canViewStates, canViewCities, canViewTracts] = useAppStore(
    (state) => [state.canViewStates, state.canViewCities, state.canViewTracts],
    shallow,
  );
  const setAutoSwitchRegion = useDashboardStore((state) => state.setAutoSwitchRegion);

  const handleClose = (e) => {
    setIntroModalOpen(false);
    storeFirstVisit();
  };

  const handleViewStates = (e) => {
    setIntroModalOpen(false);
    storeFirstVisit();
  };

  const handleViewCities = (e) => {
    setAutoSwitchRegion(false);
    setRegion('cities');
    setIntroModalOpen(false);
    storeFirstVisit();
  };

  const handleViewTracts = (e) => {
    setAutoSwitchRegion(false);
    setRegion('tracts');
    setIntroModalOpen(false);
    storeFirstVisit();
  };

  const storeFirstVisit = () => {
    const firstVisit = localStorage.getItem('spi.firstVisit');
    if (!firstVisit) {
      localStorage.setItem('spi.firstVisit', new Date());
    }
  };

  return (
    <Modal
      open={introModalOpen}
      onClose={handleClose}
      aria-labelledby="intro-modal-title"
      aria-describedby="intro-modal-description"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        backdropFilter: 'blur(5px)',
      }}
      BackdropComponent={styled(Backdrop)({
        backgroundColor: 'transparent',
      })}
    >
      <Container>
        <Content>
          <Boxmodal
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box
              sx={{
                mt: 0.75,
                mr: 3,
              }}
            >
              <img
                src="/assets/img/spi-logo.png"
                alt="Social Progress Imperative logo"
                width="120"
              />
              <Typography id="intro-modal-title" style={visuallyHidden}>
                Social Progress Imperative
              </Typography>
            </Box>
            <Box>
              <Description id="intro-modal-description">
                This map presents Social Progress Index data, including dozens of indicators and
                demographics, for the 50 US states and 500 cities. Click a view below to get
                started.
              </Description>
            </Box>
          </Boxmodal>

          <Buttoncontainer
            sx={{
              width: '50%',
              mt: 3,
              mx: 'auto',
            }}
          >
            <Label>View data for 50 U.S. states</Label>
            <Button
              disabled={!canViewStates}
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              onClick={handleViewStates}
            >
              {canViewStates ? 'Go to states view' : 'Contact us for access'}
            </Button>

            <Label>View data for 500 U.S. cities</Label>
            <Button
              disabled={!canViewCities}
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              onClick={handleViewCities}
            >
              {canViewCities ? 'Go to cities view' : 'Contact us for access'}
            </Button>

            <>
              <Label>NEW: View data for Census tracts</Label>
              <Button
                disabled={!canViewTracts}
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                onClick={handleViewTracts}
              >
                {canViewTracts ? 'Go to tracts view' : 'Contact us for access'}
              </Button>
            </>
          </Buttoncontainer>
        </Content>
      </Container>
    </Modal>
  );
};

export default IntroModal;
