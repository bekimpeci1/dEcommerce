import web3 from "./web3";
import OnlineStore from "./build/OnlineStore.json";

const instance = new web3.eth.Contract(
  OnlineStore.abi,
  "0xf72a54E56275f8E05D7907349cb5b68F3ACDE57f"
);

export default instance;