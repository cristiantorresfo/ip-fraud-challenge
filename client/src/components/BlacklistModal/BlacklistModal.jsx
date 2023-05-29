import { Modal } from "antd";

export const BlacklistModal = ({ handleAddToBlacklist, setIsOpenModal, isOpenModal }) => {
    return (
      <Modal
        open={isOpenModal}
        title="Añadir a Lista negra"
        onOk={handleAddToBlacklist}
        onCancel={() => setIsOpenModal(false)}
        
      >
        <p>¿Seguro que desea agregar esta IP a la lista negra?</p>
      </Modal>
    );
  }
  