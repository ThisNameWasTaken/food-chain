import {
  TextField,
  Container,
  Button,
  CardContent,
  Card,
  Grid,
  makeStyles,
} from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 400,
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  buttonsContainer: {
    marginTop: theme.spacing(1),
  },
  button: {
    width: '100%',
    display: 'block',
    fontWeight: 'bold',
  },
}));

const Home = () => {
  const styles = useStyles();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(locationAction);
    console.log(data);
  };

  const [locationAction, setLocationAction] = useState(null);

  return (
    <div className="container">
      <main>
        <Container className={styles.container}>
          <Card className={styles.card}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <Grid container direction="column">
                  <Grid item>
                    <TextField
                      className={styles.textField}
                      variant="outlined"
                      label="Contact Address"
                      name="Contact Address"
                      inputRef={register({ required: true })}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={styles.textField}
                      variant="outlined"
                      label="Location ID"
                      name="Location ID"
                      inputRef={register({ required: true })}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={styles.textField}
                      variant="outlined"
                      label="Location Name"
                      name="Location Name"
                      inputRef={register({ required: true })}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={styles.textField}
                      variant="outlined"
                      label="Secret"
                      name="Secret"
                      inputRef={register({ required: true })}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={styles.textField}
                      variant="outlined"
                      label="Pass Phrase"
                      name="Pass Phrase"
                      inputRef={register({ required: true })}
                    />
                  </Grid>
                </Grid>

                <Grid className={styles.buttonsContainer} container spacing={1}>
                  <Grid item xs>
                    <Button
                      className={styles.button}
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={event => {
                        setLocationAction('add');
                      }}
                    >
                      Add location
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Button
                      className={styles.button}
                      variant="contained"
                      color="secondary"
                      type="submit"
                      onClick={event => {
                        setLocationAction('get');
                      }}
                    >
                      Get location
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </form>
          </Card>
        </Container>
      </main>
    </div>
  );
};

export default Home;
