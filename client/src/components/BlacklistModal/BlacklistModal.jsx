import { Modal } from "antd";

/**
 * Component representing a modal for adding an IP address to the blacklist.
 *
 * @component
 * @param {Function} handleAddToBlacklist - Function to be executed when confirming the addition to the blacklist.
 * @param {Function} setIsOpenModal - Function to set the open or close state of the modal.
 * @param {boolean} isOpenModal - Boolean value indicating whether the modal is open or closed.
 * @returns {JSX.Element} The rendered BlacklistModal component.
 */
export const BlacklistModal = ({ handleAddToBlacklist, setIsOpenModal, isOpenModal }) => {
  return (
    <Modal
      open={isOpenModal}
      title="Agregar a lista negra"
      onOk={handleAddToBlacklist}
      cancelText='Cancelar'
      onCancel={() => setIsOpenModal(false)}
    >
      <p>¿Estás seguro que deseas agregar esta IP a la lista negra?</p>
    </Modal>
  );
}
