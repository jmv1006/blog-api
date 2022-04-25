import { DeleteModal } from "./pop-up-modal-styles"

const PopUpModal = (props) => {

    return(
        <DeleteModal>
            <div>{props.text}</div>
        </DeleteModal>
    )
}

export default PopUpModal;