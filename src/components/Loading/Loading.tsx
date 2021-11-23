import Loader from 'react-loader-spinner';

const Loading = () => {
  return (
    <>
      <Loader type="ThreeDots" color="#ea4c89" height={100} width={100} timeout={3000} />
    </>
  );
};

export default Loading;
