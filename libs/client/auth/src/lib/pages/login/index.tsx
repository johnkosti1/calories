import { Alert, Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import { trans } from '@calories/utils';
import { Loader } from '@toptal-calories/client-shared';

import { useLogin } from '../../hooks/useLogin';
import { useLoginForm } from '../../hooks/useLoginForm';

export function LoginPage(props: any) {
  console.log('props', props);

  const { isLoading, submit, error } = useLogin();

  const {
    handleSubmit,
    handleChange,
    values,
    handleBlur,
    touched,
    errors
  } = useLoginForm(submit);

  return (
    <Container>
      <Container maxWidth='xs' component='main' style={{ position: 'relative' }}>
        <Card sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}>
          <Loader loading={isLoading} />
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography component='h1' variant='h5'>
                {trans('loginTitle')}
              </Typography>
              <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='username'
                  label={trans('username')}
                  name='username'
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label={trans('password')}
                  type='password'
                  id='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                {error && <Alert severity="error">{error}</Alert>}

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3 }}
                >
                  {trans('login')}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
}

export async function getStaticProps() {
  return {
    props: {
      hello: 'world 11111'
    }, // will be passed to the page component as props
  }
}

export default LoginPage;
