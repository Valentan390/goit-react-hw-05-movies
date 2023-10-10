import React from 'react';
import styles from './Loader.module.css';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={styles.Spinner}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#000000"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
