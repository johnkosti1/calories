import { useFormik } from 'formik';
import { ILogin } from '@toptal-calories/utils/types';
import * as Yup from 'yup';

export const useLoginForm = (submit: (values: ILogin) => void) =>
  useFormik<ILogin>({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required()
    }),
    onSubmit: (values: ILogin) => {
      submit(values);
    }
  });
