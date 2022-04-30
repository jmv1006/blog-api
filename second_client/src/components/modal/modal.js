import { ModalContainer } from "./styles-modal";
import { PostActionButton } from "../post-detail-page/action-buttons/action-buttons-styles";

const Modal = (props) => {
    
    if(!props.isOpen) return null

    return(
        <ModalContainer>
            <div>{props.text}</div>
            <PostActionButton onClick={props.action}>{props.actionButtonText}</PostActionButton>
            <PostActionButton onClick={() => props.setIsOpen(false)}>Close</PostActionButton>
        </ModalContainer>
    )
}

export default Modal;