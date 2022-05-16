import React, { FC, memo } from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { DEFAULT_CRITERIA_MODE, DEFAULT_REVALIDATE_MODE, FIELD_NAMES } from '@constants/form.constants';
import * as yup from 'yup';
import useWallet from '@hooks/wallet';
import { LOGIN_PROVIDER } from '@helpers/wallets.helper';
import { showToast } from '@components/Toast';
import { TOAST_MASSAGE_ERRORS } from '@constants/messages.constants';
import { TOAST_ERROR } from '@constants/toast.constants';
import { emailYup } from './validators';
import styles from './styles.module.scss';

type Form = {
  email: string,
};

const EmailLogin: FC = () => {
  const { walletAuth } = useWallet();

  const schema = yup.object().shape({
    [FIELD_NAMES.EMAIL]: emailYup,
  });

  const {
    handleSubmit, errors, control,
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: DEFAULT_REVALIDATE_MODE,
    criteriaMode: DEFAULT_CRITERIA_MODE,
    defaultValues: { [FIELD_NAMES.EMAIL]: '' },
  });
  const onSubmit = async (data: Form) => {
    try {
      await walletAuth(LOGIN_PROVIDER.EMAIL_PASSWORDLESS, data.email);
    } catch (error) {
      showToast(TOAST_MASSAGE_ERRORS.CLOSE_MODAL, TOAST_ERROR);
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Wallet</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <Controller
            control={control}
            name={FIELD_NAMES.EMAIL}
            render={({
              onChange, value, name,
            }) => (
              <Input
                name={name}
                placeholder="hello@exapmle.com"
                error={errors[FIELD_NAMES.EMAIL]?.message || ''}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <Button
          size="medium"
          secondary
        >
          Continue with Email
        </Button>
      </form>
    </div>
  );
};

export default memo(EmailLogin);
