import {
  TextField,
  Container,
  Button,
  CardContent,
  Card,
  Grid,
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
    width: "100%"
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
  }
}));

const Home = () => {
  const styles = useStyles();

  const { register, handleSubmit, errors, setValue, getValues } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  // /** @type {Eth.Contract} */
  let foodChainContract;
  let foodChainCode;
  let account;
  let foodChainABI;
  let web3;

  useEffect(() => {
    console.log(Web3.givenProvider);
    console.log(window.ethereum);

    (async function start() {
      web3 = await (async function initWeb3() {
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
      })();

      web3.eth.getAccounts(function(err, accounts) {
        if (err) throw err;

        console.log({ accounts });

        account = accounts[0];
        web3.eth.defaultAccount = account;
      });

      console.log(FoodChain);
      foodChainCode = FoodChain.bytecode;
      foodChainABI = FoodChain.abi;
      foodChainContract = new web3.eth.Contract(foodChainABI);
    })();
  }, []);

  let _contract;

  async function getTrailCount() {
    async function getNetworkData() {
      const id = await web3.eth.net.getId();

      const networkId = id;
      return networkId ? FoodChain.networks[networkId] : null;
    }

    async function getContract() {
      if (_contract) {
        return _contract;
      } else {
        if (!web3) {
          return null;
        }
        const networkData = await getNetworkData();
        console.log({ networkData });
        if (!networkData) {
          return null;
        }

        _contract = new web3.eth.Contract(FoodChain.abi, networkData.address);
        console.log({ _contract });
        return _contract;
      }
    }

    const contract = await getContract();
    console.log({ contract });
    const trailCCount = await contract.methods.GetTrailCount().call();
    console.log("trail count", trailCCount);
    // console.log('trail count', contract.methods.GetTrailCount());
    return null;
  }

  async function createContract() {
    console.log(foodChainCode);

    const deployedContract = await foodChainContract
      .deploy({ data: foodChainCode })
      .send({ from: account, data: foodChainCode, gas: 3000000 })
      .on("confirmation", function(confirmationNumber, receipt) {});

    const contractAddress = deployedContract.options.address;
    setValue("Contract Address", contractAddress);
  }

  function addNewLocation() {
    const formData = getValues();
    const contractAddress = formData["Contract Address"];

    const deployedFoodChain = new web3.eth.Contract(
      foodChainABI,
      contractAddress,
      { from: account, gas: 3000000 }
    );

    const locationId = formData["Location ID"];
    const locationName = formData["Location Name"];
    const locationSecret = formData["Secret"];
    const passPhrase = formData["Pass Phrase"];

    const encryptedSecret = CryptoJS.AES.encrypt(
      locationSecret,
      passPhrase
    ).toString();

    deployedFoodChain.methods
      .AddNewLocation(locationId, locationName, encryptedSecret)
      .send({ from: account });
  }

  async function getCurrentLocation() {
    const formData = getValues();
    const contractAddress = formData["Contract Address"];

    const deployedFoodChain = new web3.eth.Contract(
      foodChainABI,
      contractAddress,
      { from: web3.eth.defaultAccount, gas: 3000000 }
    );

    const passPhrase = formData["Pass Phrase"];
    const trailCount = await deployedFoodChain.methods.GetTrailCount().call();
    const returnValues = await deployedFoodChain.methods
      .GetLocation(trailCount - 1)
      .call();

    setValue("Location Name", returnValues[0]);
    setValue("Location ID", returnValues[1]);

    const encryptedSecret = returnValues[4];
    const decryptedSecret = CryptoJS.AES.decrypt(
      encryptedSecret,
      passPhrase
    ).toString(CryptoJS.enc.Utf8);

    setValue("Secret", decryptedSecret);
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
                      label="Contract Address"
                      name="Contract Address"
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
                      onClick={event => {
                        createContract();
                      }}
                    >
                      Create Contract
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      className={styles.button}
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={async event => {
                        // addNewLocation();
                        // console.log('trailcount', await getTrailCount());
                        getTrailCount();
                      }}
                    >
                      Add location
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      className={styles.button}
                      variant="contained"
                      color="secondary"
                      type="submit"
                      onClick={event => {
                        getCurrentLocation();
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
