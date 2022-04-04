import React, { FC, memo } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { DEFAULT_CRITERIA_MODE, DEFAULT_REVALIDATE_MODE, FIELD_NAMES } from '@constants/form.constants';
import { apiAuthLogin } from '@services/api/auth.api';
import { PATH_INDEX } from '@constants/routes.constants';
import Input from '@components/Input';
import { AttentionIcon } from '@constants/icons.constants';
import Button from '@components/Button';
import { showToast } from '@components/Toast';
import { TOAST_WARNING } from '@constants/toast.constants';
import * as yup from 'yup';
import { useConfirmModal } from '@hooks/modals.hooks';
import {
  confirmPasswordYup, emailYup, maxNumberYup, minNumberYup, passwordYup,
} from './validators';

type TForm = {
  email: string,
  password: string,
  passwordConfirmation: string,
  maxNum: number,
  minNum: number,
};

const schema = yup.object().shape({
  [FIELD_NAMES.EMAIL]: emailYup,
  [FIELD_NAMES.PASSWORD]: passwordYup,
  [FIELD_NAMES.PASSWORD_CONFIRM]: confirmPasswordYup,
  [FIELD_NAMES.MAX_NUM]: maxNumberYup(250),
  [FIELD_NAMES.MIN_NUM]: minNumberYup(50),
});

type Props = {
//
};

const AuthPage: FC<Props> = () => {
  const router = useRouter();

  const handleConfirmationSuccess = (): null => null;

  const handleConfirmationFailure = (): null => null;

  const [showConfirmModal] = useConfirmModal('Are you sure bla bla bla?', handleConfirmationSuccess, handleConfirmationFailure);

  const {
    register, handleSubmit, errors,
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: DEFAULT_REVALIDATE_MODE,
    criteriaMode: DEFAULT_CRITERIA_MODE,
  });

  const onSubmit = async (data: TForm) => {
    await apiAuthLogin(data.email, data.password);
    await router.push(PATH_INDEX);
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '4rem auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name={FIELD_NAMES.EMAIL}
          error={errors[FIELD_NAMES.EMAIL]?.message || ''}
          label="Email *"
          leftContent={AttentionIcon}
          placeholder="Email"
        />
        <Input
          register={register}
          name={FIELD_NAMES.MAX_NUM}
          error={errors[FIELD_NAMES.MIN_NUM]?.message || ''}
          label={<mark>Label node*</mark>}
          placeholder="maxNum"
        />
        <Input
          name="readonly"
          label="Readonly"
          placeholder="Readonly"
          readonly
        />
        <Input
          register={register}
          name={FIELD_NAMES.MIN_NUM}
          error={errors[FIELD_NAMES.MIN_NUM]?.message || ''}
          label="minNum *"
          rightContent={AttentionIcon}
          placeholder="minNum"
        />
        <Input
          register={register}
          name={FIELD_NAMES.PASSWORD}
          error={errors[FIELD_NAMES.PASSWORD]?.message || ''}
          label="Password *"
          type="password"
          placeholder="********"
        />
        <Input
          register={register}
          name={FIELD_NAMES.PASSWORD_CONFIRM}
          error={errors[FIELD_NAMES.PASSWORD_CONFIRM]?.message || ''}
          label="Confirm password *"
          type="password"
          placeholder="********"
        />
        <Button>Login</Button>
      </form>
      <button onClick={() => showConfirmModal()}>Modal</button>
      <button onClick={() => {
        //  You can pass not required 4th param handleFailure
        //  Toast would be with close button with this handler
        showToast('It is warning, bro!', TOAST_WARNING, handleConfirmationSuccess);
      }}
      >Toast
      </button>
    </div>
  );
};

export default memo(AuthPage);
