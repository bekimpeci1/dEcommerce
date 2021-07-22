const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledStore = require("../Ethereum/build/OnlineStore.json");

let accounts, store;


beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    store = await new web3.eth.Contract(compiledStore.abi)
            .deploy({data: '0x' + compiledStore.evm.bytecode.object})
            .send({from: accounts[0], gas: '1900000'});
            //createProduct(string memory name, string memory descripion, string memory category, uint price, uint quantity,string memory photoHash) 
    await store.methods.createProduct('Mace','E zeze','Kafshe','5000000000000',3,'QmXVgsbuW9URZXGNS2w1gUyRzKiLzTRNJ58KP6J4W3Dzyx').send({
        from: accounts[0],
        gas: '1900000'
    });
    await store.methods.buyProduct(0).send({
        from: accounts[0],
        gas: '2000000',
        value: '5000000000000'
    });
   
    });

describe('Products',  () => {
    it('Can add new Products', async() => {

        const product = await store.methods.storeProducts(0).call();
        assert.strictEqual('Mace',product.name)
 
    });

    it('Can Buy  a product', async() => {
       const owner = await store.methods.allPurchases(0).call();
       assert.strictEqual(owner.buyer, accounts[0]);
    })

    it('Can add a review for a product', async() => {
       // addReview(uint index, string memory title, string memory text, uint8 stars)
        await store.methods.addReview('0','Good Kitty','I love her','5').send({
            from: accounts[0],
            gas: '1500000'
        })
        //the method called returns an object of 3 values, the 1st[index 0] one is the title, 2nd[1] is text
        //and third[2] is stars
        const review = await store.methods.getReview(0,0).call();
        assert.strictEqual('5',review[2]);
    })

    it('Confirm that a product has arrived', async() => {
        //productHasArrived(uint purchaseID)
        await store.methods.productHasArrived(0).send({
            from: accounts[0],
            gas: '1500000'
        })
        const product = await store.methods.allPurchases(0).call();
        assert(product.timeArrived != 0);
    })
     it('Can return a product', async () => {
         //had to do it this way, because a product has first to arrive, if it wants to be returned
         //bad way to do it I know, but right now I can't think of anything else to make it work
         //if I put it into beforeEach it kinda seems like an overkill, because it would run for every test
         //and that is not needed;
        await store.methods.productHasArrived(0).send({
            from: accounts[0],
            gas: '1500000'
        })
         //function returnProduct(uint purchaseID) public checkIfBuyer(purchaseID)
         await store.methods.returnProduct(0).send({
             from: accounts[0],
             gas: '1500000'
         })
         const product = await store.methods.allPurchases(0).call();
         assert(product.hasReturned);
     })

     it('Confrms that the buyer wants to keep the item', async () => {
        await store.methods.confirmOwnerShip(0).send({
            from: accounts[0],
            gas: '1500000'
        })
        const product = await store.methods.allPurchases(0).call();
        assert(product.isCompleted);
     })
     it('Cant review a product without buying it', async () => {
         try {
            await store.methods.addReview('0','Bad Kitty','I hate her','1').send({
                from: accounts[1],
                gas: '1500000'
            })
            assert(false);
         } catch (error) {
             assert(error);
         }
     })
})