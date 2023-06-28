import styles from './Address.module.css';
import { useState } from 'react';
import api from "../../Services/api";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

const Address = () => {
    const [address, setAddress] = useState('');

    async function getAddress() {
        try {
            const response = await api.get('/endereco', {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                }  
            })
            console.log("response", response.data);
            setAddress(response.data.address);
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className={styles.addressContainer}>
            <FmdGoodOutlinedIcon fontSize='small'/>
            <p>
                Rua das Flores, 123 - Centro, Salvador - Brasil
                {/* {address} */}
            </p>
        </div>
    )
}

export default Address;
