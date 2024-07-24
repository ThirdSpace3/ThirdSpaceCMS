import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../hooks/AuthProvide';
import Display from '../components/logiciel/Display';

export default function Logiciel() {
  const { templateName } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if the user is logged in, if not redirect to login
  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <Display templateName={templateName} />
    </>
  );
}
