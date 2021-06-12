var RasilToken = artifacts.require('RasilToken');
var LuckyBox = artifacts.require('LuckyBox');

module.exports = async function (deployer) {
  deployer.deploy(RasilToken).then((res) => deployer.deploy(LuckyBox, res.address));
};
