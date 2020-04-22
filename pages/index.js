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

import web3 from 'web3';
import cryptoJs from 'crypto-js';

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

  const web3 = new Web3(Web3.givenProvider);
  var foodChainABI, foodChainContract, acc;

const start = () => {
  web3.eth.getAccounts(function(err, accounts) {
    account = accounts[0];
    web3.eth.defaultAccount = acc;
  })
  const http = new XMLHttpRequest();
  const url = 'http://localhost:8000';
  http.open("GET", url);
  http.send();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
    {
      var output = JSON.parse(this.response);
      foodChainCode = output.contracts[":FoodChain"].bytecode;
      var metadata = JSON.parse(output.contracts[":FoodChain"].metadata);
      foodChainABI = metadata.output.abi;
      foodChainContract = new web3.eth.Contract(foodChainABI);
    }
  }
}

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
