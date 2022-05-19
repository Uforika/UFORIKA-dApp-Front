import React, { FC, memo } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LOGIN_PROVIDER } from '@helpers/wallets.helper';
import useWallet from '@hooks/wallet';
import Button from '@components/Button';
import Input from '@components/Input';
import { showToast } from '@components/Toast';
import { TOAST_MASSAGE_ERRORS } from '@constants/messages.constants';
import { TOAST_ERROR } from '@constants/toast.constants';
import { DEFAULT_CRITERIA_MODE, DEFAULT_REVALIDATE_MODE, FIELD_NAMES } from '@constants/form.constants';
import { emailYup } from './validators';
import styles from './styles.module.scss';

type Form = {
  email: string,
};

const EmailLogin: FC = () => {
  const { walletAuth } = useWallet();

  const schema = yup.object().shape({
    email: emailYup,
  });

  const {
    handleSubmit, formState: { errors }, control,
  } = useForm<Form>({
    resolver: yupResolver(schema),
    reValidateMode: DEFAULT_REVALIDATE_MODE,
    criteriaMode: DEFAULT_CRITERIA_MODE,
    defaultValues: { [FIELD_NAMES.EMAIL]: '' },
  });

  const onSubmit: SubmitHandler<Form> = async ({ email }: Form) => {
    try {
      await walletAuth(LOGIN_PROVIDER.EMAIL_PASSWORDLESS, email);
    } catch (error) {
      showToast(TOAST_MASSAGE_ERRORS.CLOSE_MODAL, TOAST_ERROR);
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Email</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, name, value } }) => (
              <Input
                name={name}
                placeholder="hello@exapmle.com"
                error={errors.email?.message || ''}
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
