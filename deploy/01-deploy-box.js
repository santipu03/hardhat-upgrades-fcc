const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../helper-functions")

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts()
    const { log, deploy } = deployments

    log("---------------------")

    const box = await deploy("Box", {
        from: deployer,
        args: [],
        waitConfirmations: network.config.blockConfirmations || 1,
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "BoxProxyAdmin",
                artifact: "BoxProxyAdmin",
            },
        },
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(box.address, [])
    }
}
