import ModalSuccess from 'src/modules/ModalSuccess';
import ModalFail from 'src/modules/ModalFail';
import ModalConfirm from 'src/modules/ModalConfirm';
import ModalQrCode from 'src/modules/ModalQrCode';
import { MODAL_TYPES } from '@constants/modals.constants';

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.CONFIRM]: ModalConfirm,
  [MODAL_TYPES.SUCCESS]: ModalSuccess,
  [MODAL_TYPES.QR_CODE]: ModalQrCode,
  [MODAL_TYPES.FAIL]: ModalFail,
};
