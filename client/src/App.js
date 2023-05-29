import React, { useState } from 'react';
import './App.css';
import { Modal, Spin, message } from 'antd';

import api from './services/api';
import { IPData } from './components/IPData/IPData';
import { SearchInput } from './components/SearchInput/SearchInput';
import { BlacklistModal } from './components/BlacklistModal/BlacklistModal';


/**
 * App Component
 *
 * The main component that represents the IP's Fraud App.
 *
 * @component
 * @returns {JSX.Element} The App component.
 */
function App() {
    const [ip, setIp] = useState('');
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleSearch = async () => {
        if (!ip) {
            message.warning('Debes ingresar una IP')
        } else {
            setIsLoading(true);
            setData(undefined); 
            try {
                const response = await api.get(`/context/${ip}`);
                setData(response?.data);
            } catch (error) {
                console.log(error)
                if (error?.response?.data?.error === 'La IP está en la lista negra.') {
                    Modal.warning({
                        title: 'Ip en Lista Negra',
                        content: 'La IP ingresada se encuentra en la lista negra'
                    });
                } else if (error?.response?.data?.error === 'Error al obtener el contexto.') {
                    Modal.error({
                        title: 'Error de búsqueda',
                        content: 'No se ha encontrado información, inténtalo de nuevo'
                    });
                } else if (error?.message === 'Request failed with status code 404') {
                    Modal.error({
                        title: 'Error en el servidor',
                        content: 'No se ha podido realizar la consulta al servidor, por favor inténtalo de nuevo.'
                    });
                }
            } finally {
                setIsLoading(false);
            }
        }

    };

    const handleAddToBlacklist = async () => {
        setIsOpenModal(false);
        try {
            const response = await api.post(`/blacklist/${data?.ip}`);
            const onOk = () => {
                setData();
                setIp('');
            };
            if (response.data.message === 'IP añadida a la lista negra.') {
                Modal.success({
                    title: 'IP añadida',
                    content: 'La IP se ha añadido correctamente a la lista negra',
                    onOk: onOk
                });
            }
        } catch (error) {
            console.error('Error al añadir la IP a la lista negra:', error);
            if (error.response.data.error === 'La IP ya está en la lista negra.') {
                Modal.warning({
                    title: 'Ip en Lista Negra',
                    content: 'La IP ingresada ya se encuentra en la lista negra'
                });
            }
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (

        <div className="app">
            <header className="app-header">
                <h1>IP's Fraud App</h1>
            </header>
            <div className="app-content">
                <SearchInput ip={ip} setIp={setIp} handleKeyPress={handleKeyPress} handleSearch={handleSearch} isLoading={isLoading} />
                <div className="data-list">
                    {isLoading ? <Spin /> : data ? <IPData data={data} /> : <h4>!Realiza una búsqueda!</h4>}

                    {data && (
                        <>
                            <button onClick={() => setIsOpenModal(true)}>Añadir IP a lista negra</button>
                            <BlacklistModal isOpenModal={isOpenModal} handleAddToBlacklist={handleAddToBlacklist} setIsOpenModal={setIsOpenModal} />
                        </>
                    )}
                </div>
            </div>
            <footer>
                <p>Desarrollado por Cristian Torres.</p>
            </footer>
        </div>
    );
}

export default App;
