import ModalConfirm from '@modules/modals/ModalConfirm';
import ModalSuccess from '@modules/modals/ModalSuccess';
import ModalFail from '@modules/modals/ModalFail';
import { MODAL_TYPES } from '@constants/modals.constants';

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.CONFIRM]: ModalConfirm,
  [MODAL_TYPES.SUCCESS]: ModalSuccess,
  [MODAL_TYPES.FAIL]: ModalFail,
};
