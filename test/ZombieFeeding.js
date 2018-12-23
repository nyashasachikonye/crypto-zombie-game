// ?? (initialise contracts)
var ZombieFactory = artifacts.require("../contracts/ZombieFactory.sol");
var ZombieFeeding = artifacts.require("../contracts/ZombieFeeding.sol");
var factoryInstance;
var feedingInstance;
var admin = web3.eth.accounts[0];

contract('ZombieFeeding', function(accounts){
  // 1. contract has a non 0x0 address [v]
  it('initializes the contract with the correct values', function(){
    return ZombieFeeding.deployed().then(function(instance){
      feedingInstance = instance;
      return feedingInstance.address
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has contract address');
    });
  });
});

//ZombieFeeding
//set a kitty contract address (also tests onlyOwner?)
// get Zombie to feed on a kitty
// create a new kitty zombie
