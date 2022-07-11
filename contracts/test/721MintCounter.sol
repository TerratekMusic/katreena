//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";


contract PlatziPunk is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public maxSupply;

    constructor(uint256 _maxSupply) ERC721("Ktreenas", "K3s") {
        maxSupply = _maxSupply;
    }

    function mint() public {
        uint256 current = _tokenIds.current();
        require(current < maxSupply);
        +
        _safeMint(msg.sender, current);
    }

    //funciones override para soportar el enumerable
        function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}