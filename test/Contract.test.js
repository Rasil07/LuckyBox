const { assert } = require('chai');
const RasilToken = artifacts.require('./RasilToken');
const LuckyBox = artifacts.require('./LuckyBox');

require('chai').use(require('chai-as-promised')).should();

function toWei(n) {
  return web3.utils.toWei(n, 'ether');
}
function toEth(n) {
  return web3.utils.fromWei(n, 'ether');
}

contract('Contract', ([sender, accounts]) => {
  let rasilToken;
  let luckyBox;
  before(async () => {
    rasilToken = await RasilToken.deployed();
    luckyBox = await LuckyBox.deployed();
  });

  // Test Deployment
  contract('Deployment', async () => {
    it('deploys successfully', async () => {
      const rasilTokenAddress = await rasilToken.address;
      assert.notEqual(rasilTokenAddress, 0x0);
      assert.notEqual(rasilTokenAddress, '');
      assert.notEqual(rasilTokenAddress, null);
      assert.notEqual(rasilTokenAddress, undefined);
      const luckyBoxAddress = await luckyBox.address;
      assert.notEqual(luckyBoxAddress, 0x0);
      assert.notEqual(luckyBoxAddress, '');
      assert.notEqual(luckyBoxAddress, null);
      assert.notEqual(luckyBoxAddress, undefined);
    });
  });

  contract('Purchases Token', async () => {
    it('Purchases Token Successfully', async () => {
      await luckyBox.purchaseTokens({ from: sender, value: toWei('1') });
      const balanceOfSender = await rasilToken.balanceOf(sender.toString());
      assert.equal(toEth(balanceOfSender), 1000, 'Tokens minted not equal');
      assert.notEqual(toEth(balanceOfSender), 'error case not passed');
    });
  });
});
