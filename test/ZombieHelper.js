// ?? (initialise contracts)
var ZombieFactory = artifacts.require("../contracts/ZombieFactory.sol");
var ZombieFeeding = artifacts.require("../contracts/ZombieFeeding.sol");
var ZombieHelper = artifacts.require("../contracts/ZombieHelper.sol");
var factoryInstance;
var feedingInstance;
var admin = web3.eth.accounts[0];
var levelUpFee = 1000000000000000; //0.001 ETH

contract('ZombieHelper', function(accounts){
  // 1. contract has a non 0x0 address [v]
  it('initializes the contract with the correct values', function(){
    return ZombieHelper.deployed().then(function(instance){
      helperInstance = instance;
      return helperInstance.address
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has contract address');
    });
  });

  // level up a zombie [v]
  it('allows owner level up a zombie', function(){
      return ZombieHelper.deployed().then(function(instance){
        helperInstance = instance;
        return helperInstance.createRandomZombie("Deuteronomy") //careful of how i did this - i used helper instead of factory, is that okay?
      }).then(function(receipt){
          assert.equal(receipt.logs.length, 1, 'triggers one event');
          assert.equal(receipt.logs[0].event, 'NewZombie', 'should be the "NewZombie" event');
          assert.equal(receipt.logs[0].args.zombieId.toNumber(), '0', 'zombieId should be 0');
          assert.equal(receipt.logs[0].args.name, 'Deuteronomy', 'name should be Deuteronomy');
          return helperInstance.zombies(0)
        }).then(function(zombie){
          zombieInstance = zombie;
          assert.equal(zombieInstance[0], 'Deuteronomy', 'name should be Deuteronomy');
          assert.equal(zombieInstance[2].toNumber(),'1', 'Zombie level set to 1');
          assert.equal(zombieInstance[4].toNumber(),'0', 'Zombie lossCount set to 0');
          assert.equal(zombieInstance[5].toNumber(),'0', 'Zombie lossCount set to 0');
          return helperInstance.levelUp(0, {value: web3.toWei(0.001,'ether')})
        }).then(function(receipt){
            //nothing to do here actually so lets just get the zombie
            return helperInstance.zombies(0)
          }).then(function(zombie){
          zombieInstance = zombie;
          assert.equal(zombieInstance[0], 'Deuteronomy', 'name should be Deuteronomy');
          assert.equal(zombieInstance[2].toNumber(),'2', 'Zombie level set to 2'); //most important
          assert.equal(zombieInstance[4].toNumber(),'0', 'Zombie lossCount set to 0');
          assert.equal(zombieInstance[5].toNumber(),'0', 'Zombie lossCount set to 0');
    });
  });

  // ensure levelUp fee adjustable [v]
  it('can adjust the level up fee', function(){
    return ZombieHelper.deployed().then(function(instance){
      helperInstance = instance;
      return helperInstance.setLevelUpFee(web3.toWei(0.005,'ether'))
    }).then(function(receipt){
      //nothing jsut try to level up the zombie using old fee
      return helperInstance.levelUp(0, {value: web3.toWei(0.001,'ether')})
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'cannot level up zombie with incorrect ETH value');
      return helperInstance.levelUp(0, {value: web3.toWei(0.005,'ether')})
}).then(function(receipt){
    //nothing to do here actually so lets just get the zombie
    return helperInstance.zombies(0)
  }).then(function(zombie){
  zombieInstance = zombie;
  assert.equal(zombieInstance[0], 'Deuteronomy', 'name should be Deuteronomy');
  assert.equal(zombieInstance[2].toNumber(),'3', 'Zombie level set to 3'); //most important
  assert.equal(zombieInstance[4].toNumber(),'0', 'Zombie lossCount set to 0');
  assert.equal(zombieInstance[5].toNumber(),'0', 'Zombie lossCount set to 0');
    });
  });
});

//Zombie Helper
// ensure noone else can  set the level up fee
// change a zombies name
//change a zombies DNA
// print/list a addresses zombies army
//withdraw funds in the contract
