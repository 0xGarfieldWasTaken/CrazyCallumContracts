pragma solidity ^0.8.0;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract CrazyCallum is ERC721A, Ownable, Pausable {
    uint256 public mint1price = 0.005 ether;
    uint256 public mint2price = 0.010 ether;
    uint256 public mint4price = 0.020 ether;
    uint256 public discount2price = 0.005 ether;
    uint256 public discount4price = 0.015 ether;
    uint256 public constant maxCallums = 10;

    string public constant baseURI = "ipfs://QmaAggELteSxwZSeLgMmsLk7kB3zWWg2EU7iWF3jQXaQkQ/";

    mapping (address => bool) freeMintUsed;

    constructor() ERC721A("Crazy Callum", "CRZCAL", 100) {
        _pause();
    }

    function freeMintCallum() public payable whenNotPaused {
        require(freeMintUsed[msg.sender] == false, 'Free Mint Used');
        unchecked { require(totalSupply() + 1 <= maxCallums, 'MAX_REACHED'); }
        _safeMint(msg.sender, 1);
        freeMintUsed[msg.sender] = true;
    }

    function mintCallum() public payable whenNotPaused {
        require(mint1price <= msg.value, 'LOW_ETHER');
        unchecked { require(totalSupply() + 1 <= maxCallums, 'MAX_REACHED'); }
        _safeMint(msg.sender, 1);
    }

    function mint2CallumSupportingFreeMint() public payable whenNotPaused {
        require(freeMintUsed[msg.sender] == false, 'Free Mint Used');
        require(discount2price <= msg.value, 'LOW_ETHER');
        unchecked { require(totalSupply() + 1 <= maxCallums, 'MAX_REACHED'); }
        _safeMint(msg.sender, 2);
        freeMintUsed[msg.sender] = true;
    }

    function mint2Callums() public payable whenNotPaused {
        require(mint2price <= msg.value, 'LOW_ETHER');
        unchecked { require(totalSupply() + 2 <= maxCallums, 'MAX_REACHED'); }
        _safeMint(msg.sender, 2);
    }

    function mint4CallumSupportingFreeMint() public payable whenNotPaused {
        require(freeMintUsed[msg.sender] == false, 'Free Mint Used');
        require(discount4price <= msg.value, 'LOW_ETHER');
        unchecked { require(totalSupply() + 1 <= maxCallums, 'MAX_REACHED'); }
        _safeMint(msg.sender, 4);
        freeMintUsed[msg.sender] = true;
    }

    function mint4Callums() public payable whenNotPaused {
        require(mint4price <= msg.value, 'LOW_ETHER');
        unchecked { require(totalSupply() + 4 <= maxCallums, 'MAX_REACHED'); }
        _safeMint(msg.sender, 4);
    }

    function setPrice(uint256 newPrice) public onlyOwner {
        mint1price = newPrice;
    }

    function set2Price(uint256 newPrice) public onlyOwner {
        mint2price = newPrice;
    }

    function set4Price(uint256 newPrice) public onlyOwner {
        mint4price = newPrice;
    }

    function set2DiscountPrice(uint256 newPrice) public onlyOwner {
        discount2price = newPrice;
    }

    function set4DiscountPrice(uint256 newPrice) public onlyOwner {
        discount4price = newPrice;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function _baseURI() internal pure override returns (string memory) {
        return baseURI;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function getFreeMintUsed(address account) public view returns (bool){
        return freeMintUsed[account];
    }
}