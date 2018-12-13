
//independent
//dont deploy these
var ERC721 = artifacts.require("./ERC721.sol"); //deployer problems // dont deploy an interface
var SafeMath = artifacts.require("./SafeMath.sol");
var Ownable = artifacts.require("./Ownable.sol"); //deployer problems


// //dependent contracts
var ZombieFactory = artifacts.require("./ZombieFactory.sol");
var ZombieFeeding = artifacts.require("./ZombieFeeding.sol");
var ZombieHelper = artifacts.require("./ZombieHelper.sol");
var ZombieAttack = artifacts.require("./ZombieAttack.sol");
var ZombieOwnership = artifacts.require("./ZombieOwnership.sol");

//deployments
module.exports = function(deployer) {
  deployer.deploy(ZombieFactory);
  deployer.deploy(ZombieFeeding);
  deployer.deploy(ZombieHelper);
  deployer.deploy(ZombieAttack);
  deployer.deploy(ZombieOwnership);
};
