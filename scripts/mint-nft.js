import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const process = require("process");

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () =>{
  console.log('Lokked in as ${client.user.tag}!')
})

require("dotenv").config()
client.login(process.env.TOKEN)
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

client.on("messageCreate", msg=>{
  if (msg.content=="ping") {
    msg.reply("pong")
  }
})

client.on('messageCreate', function(message){
    var Attachment = message.attachments.toJSON()[0]["url"];
    console.log(Attachment);
});

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

export const testAuthentication = () => {
  const url = `https://api.pinata.cloud/data/testAuthentication`;
  return axios
      .get(url, {
          headers: {
              pinata_api_key: 'process.env.PUBLIC_KEY',
              pinata_secret_api_key: 'process.env.PRIVATE_KEY'
          }
      })
      .then(function (response) {
          console.log("ok")
      })
      .catch(function (error) {
         console.log("error in authentication")
      });
};

const Hash = require('ipfs-only-hash')

func = async () => {   
  let bgImage = await import(Attachment);

  const endOfPrefix = src.indexOf(",");
  const cleanStrData = src.slice(endOfPrefix+1);
  const imageData = Buffer.from(cleanStrData, "base64");
  const imageHash = await Hash.of(imageData);
  console.log("CID: " + imageHash)
  }

  // const { cid } = ipfs.add(buf, {
  //   pin: false
  // })
  
  await ipfs.pin.add(imageHash)

export const pinFileToIPFS = (pinataApiKey, pinataSecretApiKey) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append('file', fs.createReadStream(.../my-nft/nft-metadata.json));

    return axios.post(url,
        data,
        {
            maxContentLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'pinata_api_key': process.env.PUBLIC_KEY,
                'pinata_secret_api_key': process.env.PRIVATE_KEY
            }
        }
    ).then(function (response) {
        console.log("pinned")
    }).catch(function (error) {
        console.log("error")
    });
};

// const pinataSDK = require('@pinata/sdk');
// var metadata = process.argv[2]
// var edition = process.argv[3]
// const pinata = pinataSDK(PUBLIC_KEY, PRIVATE_KEY);
// var newMetadata = JSON.parse(metadata) 
// newMetadata["name"] = newMetadata["name"] + ` #${edition} of ${newMetadata["total_editions"]}`;
// const options = {};
// pinata.pinJSONToIPFS(newMetadata, options).then((result) => {
//     console.log(result["IpfsHash"])
// }).catch((err) => {
//     console.log(err)
// });    

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "process.env.contractAddress"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  }
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              )
              client.on("messageCreate", function(messageCreate) {
                message.channel.send("The hash of your transaction is: ", hash);
              })
            
          } else {
            console.log("Something went wrong!",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Transaction failed:", err)
    })
}
mintNFT(
  IpfsHash
)
