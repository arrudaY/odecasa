import styles from './Address.module.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';
import api from "../../Services/api";

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
            <p>
                <FaMapMarkerAlt />
                Rua das Flores, 123. Bairro: Centro, Cidade. Brasil
                {/* {address} */}
            </p>
        </div>
    )
}

export default Address;
