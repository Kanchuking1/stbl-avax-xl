// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GenTokens is ERC721Enumerable, FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    // State variables to store the last request ID, response, and error
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    uint64 subscriptionId = 1866;
    // Custom error type
    error UnexpectedRequestID(bytes32 requestId);

    // Event to log responses
    event Response(
        bytes32 indexed requestId,
        string character,
        bytes response,
        bytes err
    );

    // Fuji Router
    address router = 0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0;

    mapping(address => bytes32[]) public userGenRequests;
    mapping(address => bytes32[]) public userMintRequests;
    mapping(bytes32 => bool) public isRequestMint;
    mapping(bytes32 => uint256) public requestTokenId;
    mapping(bytes32 => string) public tempId;
    mapping(uint => string) private _tokenURIs;

    bool paused = false;

    string gensource =
        "const prompt = args[0];"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://cl-hack-avax-backend.onrender.com/generate?prompt=${prompt}`"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed')"
        "}"
        "const { data } = apiResponse;"
        "return Functions.encodeString(data.id);";

    string mintsource =
        "const id = args[0]"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://cl-hack-avax-backend.onrender.com/nft/${id}`"
        "})"
        "if (apiResponse.error) {"
        "throw Error('Request failed')"
        "}"
        "const { data } = apiResponse;"
        "return Functions.encodeString(data.metadata)";

    //Callback gas limit
    uint32 gasLimit = 300000;

    // donID - Hardcoded for Mumbai
    // Check to get the donID for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    bytes32 donID =
        0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000;

    /**
     * @notice Initializes the contract with the Chainlink router address and sets the contract owner
     */
    constructor()
        FunctionsClient(router)
        ConfirmedOwner(msg.sender)
        ERC721("GenTokens", "GT")
    {}

    function generateImage(string calldata prompt) external payable {
        require(!paused, "Contract is paused");
        require(msg.value >= 0.01 ether, "Not enough AVAX sent; check price!");
        string[] memory args = new string[](1);
        args[0] = prompt;
        bytes32 requestId = sendGenRequest(args);
        userGenRequests[msg.sender].push(requestId);
    }

    function mint(uint index) external payable {
        require(!paused, "Contract is paused");
        require(index < userGenRequests[msg.sender].length, "Invalid index");
        require(msg.value >= 0.01 ether, "Not enough AVAX sent; check price!");
        uint256 tokenId = totalSupply();
        _mint(msg.sender, tokenId + 1);
        string[] memory args = new string[](1);
        args[0] = Strings.toString(index);
        bytes32 requestId = sendMintRequest(args);
        userMintRequests[msg.sender].push(requestId);
        requestTokenId[requestId] = tokenId + 1;
    }

    /**
     * @notice Sends an HTTP request for character information
     * @param args The arguments to pass to the HTTP request
     * @return requestId The ID of the request
     */
    function sendMintRequest(
        string[] memory args
    ) private returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(mintsource); // Initialize the request with JS code
        req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        return s_lastRequestId;
    }

    /**
     * @notice Sends an HTTP request for character information
     * @param args The arguments to pass to the HTTP request
     * @return requestId The ID of the request
     */
    function sendGenRequest(
        string[] memory args
    ) private returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(gensource); // Initialize the request with JS code
        req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        return s_lastRequestId;
    }

    /**
     * @notice Callback function for fulfilling a request
     * @param requestId The ID of the request to fulfill
     * @param response The HTTP response data
     * @param err Any errors from the Functions request
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }
        // Update the contract's state variables with the response and any errors
        s_lastResponse = response;
        if (isRequestMint[requestId] == false) {
            tempId[requestId] = string(response);
        } else {
            _tokenURIs[requestTokenId[requestId]] = string(response);
        }
        s_lastError = err;

        // Emit an event to log the response
        emit Response(requestId, string(response), s_lastResponse, s_lastError);
    }

    function pause() external onlyOwner {
        paused = true;
    }

    function unpause() external onlyOwner {
        paused = false;
    }

    function getUserGenRequests(
        address user
    ) external view returns (bytes32[] memory) {
        return userGenRequests[user];
    }

    function getUserMintRequests(
        address user
    ) external view returns (bytes32[] memory) {
        return userMintRequests[user];
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function getTempId(
        bytes32 requestId
    ) external view returns (string memory) {
        return tempId[requestId];
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
