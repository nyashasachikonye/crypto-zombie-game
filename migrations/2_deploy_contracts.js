// contracts arranged according to dependancies

//independent

var ERC721 = artifacts.require("./ERC721.sol"); //deployer problems // dont deploy an interface
var SafeMath = artifacts.require("./SafeMath.sol");

//dependent contracts
var Ownable = artifacts.require("./Ownable.sol"); //deployer problems
var ZombieFactory = artifacts.require("./ZombieFactory.sol");
var ZombieFeeding = artifacts.require("./ZombieFeeding.sol");
var ZombieHelper = artifacts.require("./ZombieHelper.sol");
var ZombieAttack = artifacts.require("./ZombieAttack.sol"); //deployer problems
var ZombieOwnership = artifacts.require("./ZombieOwnership.sol"); //deployer problems

// module.exports = function(deployer) {
//   deployer.deploy(ERC721).then(function() {
//     return deployer.deploy(SafeMath);
//   }).then(function(){
//     return deployer.deploy(Ownable);
//   }).then(function(){
//     return deployer.deploy(ZombieFactory);
//   }).then(function(){
//     return deployer.deploy(ZombieFeeding);
//   }).then(function(){
//     return deployer.deploy(ZombieHelper);
//   }).then(function(){
//     return deployer.deploy(ZombieAttack);
//   }).then(function(){
//     return deployer.deploy(ZombieOwnership);
//   });
// };

// module.exports = function(deployer) {
//   deployer.deploy(SafeMath).then(function() {
//     return deployer.deploy(ZombieFactory);
//   }).then(function(){
//     return deployer.deploy(ZombieFeeding);
//   }).then(function(){
//     return deployer.deploy(ZombieHelper);
//   });
// };


module.exports = function(deployer) {
  deployer.deploy(ERC721);
};
