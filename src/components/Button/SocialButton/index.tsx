import React, { MouseEventHandler, ReactNode } from 'react';
import SocialLogin from 'react-social-login';

interface Props {
  triggerLogin: MouseEventHandler<HTMLButtonElement> | undefined;
  children: ReactNode;
  
}

const SocialButton = ({triggerLogin,children, ...prop}: any) => {
    return (
      <button onClick={triggerLogin} {...prop}>
        {children}
      </button>
  );
};

export default SocialLogin(SocialButton);



