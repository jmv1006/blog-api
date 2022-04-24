import { DeleteModal } from "./pop-up-modal-styles"

const PopUpModal = (props) => {
    return(
        <DeleteModal>
                Pop Up
                <button onClick={props.closeModal}>X</button>
            </DeleteModal>
    )
}

export default PopUpModal;