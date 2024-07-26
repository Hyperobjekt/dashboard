import { MemberstackProvider, useMemberstack } from '@memberstack/react';
import useAppStore, { CAN_VIEW_CITIES, CAN_VIEW_STATES, CAN_VIEW_TRACTS } from 'App/store';
import { useEffect } from 'react';
import shallow from 'zustand/shallow';

const config = {
  publicKey: process.env.REACT_APP_MEMBERSTACK_PUBLIC_KEY,
};

// Redirects to Memberstack login
const redirect = () =>
  window.location.replace('https://social-progresss-stupendous-site.webflow.io/login');

const Auth = ({ children }) => {
  const memberstack = useMemberstack();
  const [member, setMember] = useAppStore((state) => [state.member, state.setMember], shallow);

  useEffect(() => {
    // For testing purposes
    if (process.env.REACT_APP_DISABLE_AUTH?.toLowerCase() === 'true') {
      setMember({ permissions: [CAN_VIEW_STATES, CAN_VIEW_CITIES, CAN_VIEW_TRACTS] });
      return;
    }

    memberstack
      .getCurrentMember()
      .then(({ data: member }) => {
        if (member) {
          setMember(member);
        } else {
          redirect();
        }
      })
      .catch(() => {
        redirect();
      });
  }, [memberstack, setMember]);

  return children;
};

const AuthWrapper = ({ children }) => (
  <MemberstackProvider config={config}>
    <Auth>{children}</Auth>
  </MemberstackProvider>
);

export default AuthWrapper;
