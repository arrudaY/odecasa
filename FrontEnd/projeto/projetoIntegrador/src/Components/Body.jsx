import styles from "./Body.module.css";

const Body = () => {

  return (
      <body>
        <div className={`back-color-3 ${styles.bodyContainer}`}>
            <h1>Body aqui!</h1>
        </div>
      </body>
  );
};

export default Body;