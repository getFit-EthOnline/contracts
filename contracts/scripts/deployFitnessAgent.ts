import {ethers} from "hardhat";


async function main() {
  if (!process.env.ORACLE_ADDRESS) {
    throw new Error("ORACLE_ADDRESS env variable is not set.");
  }
  const oracleAddress: string = process.env.ORACLE_ADDRESS;
  await deployFitnessAgent(oracleAddress);
}


async function deployFitnessAgent(oracleAddress: string) {
  const agent = await ethers.deployContract("FitnessAgent", [oracleAddress], {});

  await agent.waitForDeployment();

  console.log(`Fitness Agent contract deployed to ${agent.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
