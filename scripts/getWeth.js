const { getNamedAccounts, ethers } = require("hardhat")

const AMOUNT = ethers.utils.parseEther("1")

const getWeth = async () => {
    const { deployer } = await getNamedAccounts()
    //call the deposit function on the weth contract
    //we need the abi and the contract address
    //Contract address: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2

    const iweth = await ethers.getContractAt(
        "IWeth",
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        deployer
    )
    const tx = await iweth.deposit({ value: AMOUNT })
    await tx.wait(1)
    const wethBalance = await iweth.balanceOf(deployer)
    console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth, AMOUNT }
