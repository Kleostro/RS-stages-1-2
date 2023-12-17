import CLASS_LIST from './class-list';

const modal = document.querySelector('.menu__modal');
const modalOverlay = document.querySelector('.menu__modal-overlay');
const modalContent = document.querySelector('.menu__modal-content');

let isModalOpen = false;

export const toggleModal = () => {
  if (isModalOpen) {
    modal.classList.remove(CLASS_LIST.modalVisible);
    modalOverlay.classList.remove(CLASS_LIST.modalOverlayVisible);
    modalContent.classList.remove(CLASS_LIST.modalContentVisible);
    document.body.classList.remove(CLASS_LIST.stopScroll);
    isModalOpen = false;
  } else {
    modal.classList.add(CLASS_LIST.modalVisible);
    modalOverlay.classList.add(CLASS_LIST.modalOverlayVisible);
    modalContent.classList.add(CLASS_LIST.modalContentVisible);
    document.body.classList.add(CLASS_LIST.stopScroll);
    isModalOpen = true;
  }
};

document.addEventListener('click', (e) => {
  if (!e.target.closest('.menu__modal-content') && !e.target.closest('.menu__list-item') && modalContent.classList.contains(CLASS_LIST.modalContentVisible)) toggleModal();
});

export default toggleModal;
