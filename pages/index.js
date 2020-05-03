import {
  TextField,
  Container,
  Button,
  CardContent,
  Card,
  Grid,
  Typography,
  makeStyles
} from "@material-ui/core";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import Web3 from "web3";
import * as CryptoJS from "crypto-js";

import FoodChain from "../contracts/FoodChain.json";
import Migrations from "../contracts/Migrations.json";

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 400,
    display: "flex",
    height: "calc(var(--vh, 1vh) * 100)",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "100%",
    marginBottom: theme.spacing(1)
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(1)
  },
  buttonsContainer: {
    marginTop: theme.spacing(1)
  },
  button: {
    width: "100%",
    display: "block",
    fontWeight: "bold"
  },
  createContractButton: {
    background: "#73BFB8"
  },
  locationInfo: {
    padding: theme.spacing(0.5, 1)
  }
}));

function BottomCard() {}

const Home = () => {
  const styles = useStyles();

  const [account, setAccount] = useState(null);
  const [locationDetails, setLocationDetails] = useState({
    id: "",
    name: "",
    secret: ""
  });

  const { register, handleSubmit, errors, setValue, getValues } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  // /** @type {Eth.Contract} */
  let web3 = null;
  let contract = null;

  async function initWeb3() {
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      await window.ethereum.enable();
      // @ts-ignore
      return new Web3(window.ethereum);
      // @ts-ignore
    } else if (window.web3) {
      // @ts-ignore
      return new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return null;
    }
  }

  async function getNetworkData() {
    const id = await web3.eth.net.getId();

    const networkId = id;
    console.log("NETWORKID", networkId, FoodChain.networks[networkId]);
    return networkId ? FoodChain.networks[networkId] : null;
  }

  async function getContract() {
    if (!!contract) {
      return contract;
    } else {
      if (!web3) {
        web3 = await initWeb3();
      }
      const networkData = await getNetworkData();

      console.log(networkData);

      contract = new web3.eth.Contract(FoodChain.abi, networkData.address);
      return contract;
    }
  }

  useEffect(() => {
    (async () => {
      web3 = await initWeb3();

      web3.eth.getAccounts(function(err, accounts) {
        if (err) throw err;
        setAccount(accounts[0]);
        web3.eth.defaultAccount = account;
      });

      // const latest = await web3.eth.getBlockNumber();

      // for (var i = 0; i < 10; i++) {
      //   web3.eth.getBlock(latest - i).then(console.log);
      // }
    })();
  }, []);

  async function addNewLocation() {
    const formData = getValues();
    const locationId = formData["Location ID"];
    const locationName = formData["Location Name"];
    const locationSecret = formData["Secret"];
    const passPhrase = formData["Pass Phrase"];

    const deployedFoodChain = await getContract();

    const encryptedSecret = CryptoJS.AES.encrypt(
      locationSecret,
      passPhrase
    ).toString();

    if (account == null) {
      web3.eth.getAccounts(function(err, accounts) {
        if (err) throw err;
        // account = accounts[0];
        setAccount(accounts[0]);
        web3.eth.defaultAccount = account;
      });
    }

    console.log({ account });

    const result = await deployedFoodChain.methods
      .AddNewLocation(locationId, locationName, encryptedSecret)
      .send({ from: account, gas: 200000 });
  }

  async function getCurrentLocation() {
    const formData = getValues();
    console.log({ formData });
    const passPhrase = formData["Pass Phrase Copy"];

    console.log({ passPhrase });

    const deployedFoodChain = await getContract();

    const trailCount = await deployedFoodChain.methods.GetTrailCount().call();
    const returnedValues = await deployedFoodChain.methods
      .GetLocation(trailCount - 1)
      .call();

    console.log({ returnedValues });

    const encryptedSecret = returnedValues[4];
    const decryptedSecret = CryptoJS.AES.decrypt(
      encryptedSecret,
      passPhrase
    ).toString(CryptoJS.enc.Utf8);

    console.log({ encryptedSecret });
    console.log({ decryptedSecret });

    setLocationDetails({
      id: returnedValues[1],
      name: returnedValues[0],
      secret: decryptedSecret
    });
  }

  return (
    <div className="container">
      <main>
        {/* M-a scos de pe skype Am vzt:)) suna ma cand intri */}
        <Container className={styles.container}>
          <Grid container direction="row">
            <Card className={styles.card}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                  <Grid container direction="column">
                    <Grid item>
                      <TextField
                        className={styles.textField}
                        variant="outlined"
                        label="Location ID"
                        name="Location ID"
                        inputRef={register()}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        className={styles.textField}
                        variant="outlined"
                        label="Location Name"
                        name="Location Name"
                        inputRef={register()}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        className={styles.textField}
                        variant="outlined"
                        label="Secret"
                        name="Secret"
                        inputRef={register()}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        className={styles.textField}
                        variant="outlined"
                        label="Pass Phrase"
                        name="Pass Phrase"
                        inputRef={register()}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    className={styles.buttonsContainer}
                    container
                    spacing={1}
                    wrap="wrap"
                  >
                    <Grid item xs={12}>
                      <Button
                        className={styles.button}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={addNewLocation}
                      >
                        Add location
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </form>
            </Card>
            <Card className={styles.card}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                  <Grid container direction="column">
                    <Grid item>
                      <TextField
                        className={styles.textField}
                        variant="outlined"
                        label="Pass Phrase"
                        name="Pass Phrase Copy"
                        inputRef={register()}
                        color="secondary"
                      />
                    </Grid>
                  </Grid>

                  <Typography className={styles.locationInfo}>
                    <b>Location ID:</b> {locationDetails.id}
                  </Typography>
                  <Typography className={styles.locationInfo}>
                    <b>Location Name:</b> {locationDetails.name}
                  </Typography>
                  <Typography className={styles.locationInfo}>
                    <b>Secret:</b> {locationDetails.secret}
                  </Typography>

                  <Grid
                    className={styles.buttonsContainer}
                    container
                    spacing={1}
                    wrap="wrap"
                  >
                    <Grid item xs={12}>
                      <Button
                        className={styles.button}
                        variant="contained"
                        color="secondary"
                        onClick={getCurrentLocation}
                        type="submit"
                      >
                        Get location
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </form>
            </Card>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Home;
