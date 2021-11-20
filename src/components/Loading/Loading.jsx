import React from 'react';
import Loader from 'react-loader-spinner';

function Loading() {
  return (
    <>
      <Loader type="ThreeDots" color="#ea4c89" height={100} width={100} timeout={3000} />
    </>
  );
}

export default Loading;
