const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../helper-functions")

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts()
    const { log, deploy } = deployments

    log("---------------------")

    const boxV2 = await deploy("BoxV2", {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("---------------------")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(boxV2.address, [])
    }
}
