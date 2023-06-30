import styles from './Address.module.css';
import { useState } from 'react';
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

const Address = () => {
    const { produto } = useContext(ProdContext);

    return(
        <div className={styles.addressContainer}>
            <FmdGoodOutlinedIcon fontSize='small'/>
            <p>{produto.endereco.endereco}</p>
        </div>
    )
}

export default Address;
