// ?? (initialise contracts)
var ZombieFactory = artifacts.require("../contracts/ZombieFactory.sol");

contract('ZombieFactory', function(accounts){
  it('initializes the contract with the correct values', function(){
    return ZombieFactory.deployed().then(function(instance){
      factoryInstance = instance;
      return ZombieFactory.address
      // return factoryInstance.createRandomZombie("Genesis")
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has contract address');
    });
  });
});
//ZombieFactory
// contract has a non 0x0 address
// create a random zombie
//make sure owner cant create two or more zombies
// ensure zombie added to zombie array with the correct values
// ensure mapping to owner createRandomZombie
// ensure owner count incremented
// ensure newZombie event fired
// ??(ensure the DNA is the correct length)
// ??(ensure the DNA is random and unique)

//ZombieFeeding
//set a kitty contract address (also tests onlyOwner?)
// get Zombie to feed on a kitty
// create a new kitty zombie

//Zombie Helper
// ensure levelUp fee adjustable
// level up a zombie
// change a zombies name
//change a zombies DNA
// print/list a addresses zombies army
//withdraw funds in the contract
