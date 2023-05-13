import Account from "./Account/Account";
import styles from "./Body.module.css";

const Body = () => {

  return (
      <body>
        <div className={styles.bodyContainer}>
            <h1>Body aqui!</h1>
            <Account />
        </div>
      </body>
  );
};

export default Body;