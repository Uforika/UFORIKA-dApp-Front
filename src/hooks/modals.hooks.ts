import { ModalContext } from '@contexts/modals.context';
import { useCallback, useContext } from 'react';
import { MODAL_TYPES } from '@constants/modals.constants';

interface Props {
  showModal: (type: MODAL_TYPES, props?: Record<string, unknown>) => void
  hideModal: (type: MODAL_TYPES) => void
  state: Record<string, unknown>
}

export const useModals = (): Props => {
  const { state, showModal, hideModal } = useContext(ModalContext);
  return { state, showModal, hideModal };
};

export const useConfirmModal = (text: string, onSuccess: () => void, onFailure: () => void): [() => void, () => void] => {
  const { showModal, hideModal } = useModals();

  const handleShowModal = useCallback(() => showModal(MODAL_TYPES.CONFIRM, {
    text,
    onSuccess,
    onFailure,
  }), [onFailure, onSuccess, text, showModal]);

  const handleHide = useCallback(() => hideModal(MODAL_TYPES.CONFIRM), [hideModal]);

  return [handleShowModal, handleHide];
};

export const useSuccessModal = (text: string, onSuccess: () => void): [() => void, () => void] => {
  const { showModal, hideModal } = useModals();

  const handleShowModal = useCallback(() => showModal(MODAL_TYPES.SUCCESS, {
    text,
    onSuccess,
  }), [onSuccess, text, showModal]);

  const handleHide = useCallback(() => hideModal(MODAL_TYPES.SUCCESS), [hideModal]);

  return [handleShowModal, handleHide];
};

export const useFailModal = (text: string, onSubmit: () => void): [() => void, () => void] => {
  const { showModal, hideModal } = useModals();

  const handleShowModal = useCallback(() => showModal(MODAL_TYPES.FAIL, {
    text,
    onSubmit,
  }), [onSubmit, text, showModal]);

  const handleHide = useCallback(() => hideModal(MODAL_TYPES.FAIL), [hideModal]);

  return [handleShowModal, handleHide];
};

export const useQrCodeModal = (address: string | null): [() => void, () => void] => {
  const { showModal, hideModal } = useModals();

  const handleShowModal = useCallback(() => showModal(MODAL_TYPES.QR_CODE, {
    address,
  }), [address, showModal]);

  const handleHide = useCallback(() => hideModal(MODAL_TYPES.QR_CODE), [hideModal]);

  return [handleShowModal, handleHide];
};
