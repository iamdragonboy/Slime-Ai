import axios from "axios";

export async function verifyLTC(txHash, usdPrice) {
  const url = `https://api.blockcypher.com/v1/ltc/main/txs/${txHash}?token=${process.env.BLOCKCYPHER_TOKEN}`;
  const { data } = await axios.get(url);
  const ltc = data.outputs.reduce((a,o)=>a+o.value,0)/1e8;
  return ltc > 0;
}
