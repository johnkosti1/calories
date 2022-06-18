import styles from './client-auth.module.scss';

/* eslint-disable-next-line */
export interface ClientAuthProps {}

export function Login(props: ClientAuthProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Login!</h1>
    </div>
  );
}

export default Login;
