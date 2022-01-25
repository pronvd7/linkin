import React from 'react';
import Link from 'next/link';
import styles from "../styles/main.module.css";
export const Main = () => {
  return (
  <div className={styles.Main}>
    <div className={styles.App}>
      <div className={styles.container}>
        <h1 className={styles.comingsoon}>
        Luxury Bio Link
          <br />
          Coming Soon...
        </h1>
        <div className={styles.optin}> 
       <p>Want to be the first to know when we launch?</p>
       <Link href="/signup"><a><button className={styles.login}>Sign Up Here</button> </a></Link> 
       <Link href="/admin"><a><button className={styles.login}>Sign In Here</button></a></Link> 
      </div> 
      </div> 
    
    </div>
  </div>    
  );
};

export default Main;