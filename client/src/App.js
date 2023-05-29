import React, { useState } from 'react';
import './App.css';
import api from './services/api';
import { Modal, Spin } from 'antd';
import { IPData } from './components/IPData/IPData';
import { SearchInput } from './components/SearchInput/SearchInput';
import { BlacklistModal } from './components/BlacklistModal/BlacklistModal';

function App() {
    const [ip, setIp] = useState('');
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        setData(undefined); // Limpiar los datos previos
        try {
            const response = await api.get(`/context/${ip}`);
            setData(response.data);
        } catch (error) {
            if (error.response.data.error === 'La IP está en la lista negra.') {
                Modal.warning({
                    title: 'Ip en Lista Negra',
                    content: 'La IP ingresada se encuentra en la lista negra'
                });
            } else if (error.response.data.error === 'Error al obtener el contexto.') {
                Modal.warning({
                    title: 'Error de búsqueda',
                    content: 'No se ha encontrado información, inténtalo de nuevo'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToBlacklist = async () => {
        setIsOpenModal(false);
        try {
            const response = await api.post(`/blacklist/${ip}`);
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
                <SearchInput ip={ip} setIp={setIp} handleKeyPress={handleKeyPress} handleSearch={handleSearch} />
                <div className="data-list">
                    {isLoading ? <Spin /> : data ? <IPData data={data} /> : <h3>Realiza una búsqueda!</h3>}
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
