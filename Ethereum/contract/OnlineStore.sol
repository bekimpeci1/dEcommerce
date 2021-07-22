pragma solidity ^0.8.4;


contract OnlineStore{
    
    struct Reviews {
        string reviewerFirstName;
        string reviewerLastName;
        uint8 stars;
        string opinion;
    }
    
    
    struct Buyer {
        address payable buyer;
        string username;
    
    }
    
    struct Purchasement {
        uint productID;
        address payable buyer;
        bool isCompleted;
        bool hasReturned;
        uint timeArrived; 
    }
    
    //Add it in the createProduct fundtion, to add a value to photos
    
    struct Product {
        uint productID;
        address payable publisher;
        string name;
        string descripion;
        string category;
        uint price;
        string photo;
        uint starCount;
        bool isSold;
        uint quantity;
        mapping (uint => address) Buyers;
        uint buyerCount;
        mapping (address => bool) isBuyer;
        mapping (uint => Reviews) allReviews;
        uint reviewCount;
    }
    
   Product[] public storeProducts;
   Purchasement[] public allPurchases;
   address payable manager;
   
   constructor() {
       manager = payable(msg.sender);
   }
   
   
    function createProduct(string memory name, string memory descripion, string memory category, uint price, uint quantity,string memory photoHash)  public{
        Product storage newProduct= storeProducts.push();
        newProduct.publisher = payable(msg.sender);
        newProduct.name = name;
        newProduct.descripion = descripion;
        newProduct.category = category;
        newProduct.price = price;
        newProduct.productID = storeProducts.length - 1;
        newProduct.quantity = quantity;
        newProduct.photo = photoHash;
        newProduct.starCount = 0;
        
    }
    
    function storeProductsLength() public view returns(uint) {
        return storeProducts.length;
    }
   
    
    function addPurchase(uint productID) private {
        allPurchases.push(Purchasement({
            productID: productID,
            buyer: payable(msg.sender),
            isCompleted: false,
            hasReturned: false,
            timeArrived: 0
        }));
    }
    
    modifier checkIfBuyer(uint purchaseID)  {
        uint productID = allPurchases[purchaseID].productID;
        require(storeProducts[productID].isBuyer[msg.sender], 'You did not buy this product');
        _;
    }
    
    function addReview(uint index, string memory firstName, string memory lastName, string memory opinion, uint8 stars) public  checkIfBuyer(index){
        
        Product storage newProduct = storeProducts[index];
        newProduct.allReviews[newProduct.reviewCount].reviewerFirstName = firstName;
        newProduct.allReviews[newProduct.reviewCount].reviewerLastName = lastName;
        newProduct.allReviews[newProduct.reviewCount].stars = stars;
        newProduct.allReviews[newProduct.reviewCount].opinion = opinion;
        newProduct.reviewCount++;
        newProduct.starCount += stars;
    }
    
    function getReview(uint  index, uint review) public view  returns (string memory, string memory,  uint8 , string memory) {
        Product storage newProduct = storeProducts[index];
        return(
                newProduct.allReviews[review].reviewerFirstName,
                newProduct.allReviews[review].reviewerLastName,
                newProduct.allReviews[review].stars,
                newProduct.allReviews[review].opinion
            );
    }
    
    function getAvgReview(uint index) public view  returns(uint) {
        Product storage product = storeProducts[index];
        uint starCount = product.starCount;
        uint reviewCount = product.reviewCount;
        if(reviewCount > 0 ) return starCount/reviewCount;
        else return 0;
    }
    
    function buyProduct(uint productID) public payable{
        require(msg.value == storeProducts[productID].price, 'The money you sent is not equal to the price listed');
        require(!storeProducts[productID].isSold,'It\'s out of stock');
        storeProducts[productID].Buyers[storeProducts[productID].buyerCount] = msg.sender;
        storeProducts[productID].quantity--;
        storeProducts[productID].isBuyer[msg.sender] = true; 
        storeProducts[productID].buyerCount++;
        checkIfSoldOut(productID);
        addPurchase(productID);
    }
    
    
    
    function confirmOwnerShip(uint purchaseID) public payable checkIfBuyer(purchaseID) {
        uint productID = allPurchases[purchaseID].productID;
        storeProducts[productID].publisher.transfer(storeProducts[productID].price);
        allPurchases[purchaseID].isCompleted = true;
    }
   
   function checkIfSoldOut(uint productID) internal {
       if(storeProducts[productID].quantity == 0) {
           storeProducts[productID].isSold = true;
       } 
   }
   
  
   
   function returnProduct(uint purchaseID) public checkIfBuyer(purchaseID){
       uint productID = allPurchases[purchaseID].productID;
       require(block.timestamp < allPurchases[purchaseID].timeArrived + 1 days, 'You can\'t return this product anymore');
       storeProducts[productID].isBuyer[msg.sender] = false;
       if(storeProducts[productID].isSold) storeProducts[productID].isSold = false;
       allPurchases[purchaseID].hasReturned = true;
   }
   
   function productHasArrived(uint purchaseID) public{
      require(payable(msg.sender) == manager,'Only the manager can confirm delivires');
      allPurchases[purchaseID].timeArrived = block.timestamp;
   }
    
  
}