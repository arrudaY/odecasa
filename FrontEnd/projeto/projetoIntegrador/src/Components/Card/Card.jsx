import Button from "../Button/Button";
import styles from "./Card.module.css";
import StarRating from "../StarRating/StarRating";
import Address from "../Address/Address";

const Card = () => {
    return(
        <main className={styles.cardContainer}>
            <div className={styles.cardDetail}>
                <h1 className={styles.title}>Detalhe da Reserva</h1>
                <img className={styles.image} src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
            </div>
            <div className={styles.cardContent}>
                <h2 className={styles.category}>Categoria</h2>
                <h3 className={styles.nameCategory}>Nome do Hotel</h3>
                <StarRating />
                <Address />
                <Button titulo="Confirmar reserva" />
            </div>
        </main>
    )
}

export default Card;