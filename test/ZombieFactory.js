// ?? (initialise contracts)
var ZombieFactory = artifacts.require("../contracts/ZombieFactory.sol");
var factoryInstance;
var admin = web3.eth.accounts[0];

//ZombieFactory Tests
contract('ZombieFactory', function(accounts){

  // 1. contract has a non 0x0 address [v]
  it('initializes the contract with the correct values', function(){
    return ZombieFactory.deployed().then(function(instance){
      factoryInstance = instance;
      return factoryInstance.address
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has contract address');
    });
  });
});

// 2. create a random zombie [v]
it('facilitates the creation of a random zombie', function(){
  return ZombieFactory.deployed().then(function(instance){
    factoryInstance = instance;
    return factoryInstance.createRandomZombie("Genesis")
// 2.b. ensure newZombie event fired [v]
  }).then(function(receipt){
    assert.equal(receipt.logs.length, 1, 'triggers one event');
    assert.equal(receipt.logs[0].event, 'NewZombie', 'should be the "NewZombie" event');
    assert.equal(receipt.logs[0].args.zombieId.toNumber(), '0', 'zombieId should be 1');
    assert.equal(receipt.logs[0].args.name, 'Genesis', 'name should be Genesis');
    return factoryInstance.zombies(0);
// 2.c. ensure zombie added to zombie array with the correct values [v]
  }).then(function(zombie){
    zombieInstance = zombie;
    assert.equal(zombieInstance[0], 'Genesis', 'name should be Genesis');
    assert.equal(zombieInstance[2].toNumber(),'1', 'Zombie level set to 1');
    assert.equal(zombieInstance[4].toNumber(),'0', 'Zombie lossCount set to 0');
    assert.equal(zombieInstance[5].toNumber(),'0', 'Zombie lossCount set to 0');
    return factoryInstance.createRandomZombie("Exodus")
// 2.d. make sure owner cant create two or more zombies [v]
  }).then(assert.fail).catch(function(error){
    assert(error.message.indexOf('revert') >= 0, 'cannot spawn more than one zombie from the same account');
    return factoryInstance.zombieToOwner(0)
  }).then(function(address){
// 2.e. ensure mapping to owner createRandomZombie [v]
    assert.equal(address, admin, "spawned zombie belongs to the correct owner");
  });
});
// UNIMPLEMENTED TESTS
// ensure owner count incremented (x)
// ??(ensure the DNA is the correct length)
// ??(ensure the DNA is random and unique)
