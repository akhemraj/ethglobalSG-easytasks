// SPDX-License-Identifier: MIT
pragma solidity >0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EasyTasks is Ownable {

    IERC20 public usdcToken;

    enum TaskType {
        ONLINE,
        OFFLINE
    }

    struct Task {
        address creator;
        string title;
        string description;
        TaskType taskType;
        uint256 budget;
        bool isCompleted;
        bool isOfferAccepted;
        address acceptedOfferer;
        uint256 acceptedAmount;

    }

    struct Offer {
        address offerer;
        uint256 offerAmount;
    }

    uint256 public taskCounter = 0;
    uint256[] public  allTasks;
    mapping(uint256 => Task) public tasks;
    mapping(uint256 => Offer[]) public taskOffers;
    mapping(address => uint256[]) public  payments; 

    event TaskCreated(uint256 indexed  taskId, address indexed  creator, string description, uint256 budget);
    event OfferSubmitted(uint256 indexed  taskId, address offerer, uint256 offerAmount);
    event OfferAccepted(uint256 indexed  taskId, address offerer, uint256 acceptedAmount);
    event TaskCompleted(uint256 indexed  taskId, address offerer);
    event PaymentSent(address from, address to, uint256 amount);

    constructor(address _usdcTokenAddress) Ownable(msg.sender) {
        usdcToken = IERC20(_usdcTokenAddress); // USDC ERC20 token address
    }

    // Create a new task
    function createTask(string memory _title, string memory _description, TaskType _taskType, uint256 _budget) external {
        require(_budget > 0, "Budget must be greater than 0");

        taskCounter++;
        tasks[taskCounter] = Task({
            creator: msg.sender,
            title: _title,
            description: _description,
            taskType: _taskType,
            budget: _budget,
            isCompleted: false,
            isOfferAccepted: false,
            acceptedOfferer: address(0),
            acceptedAmount: 0
        });
        allTasks.push(taskCounter);
        emit TaskCreated(taskCounter, msg.sender, _description, _budget);
    }

    // Submit an offer for a task
    function submitOffer(uint256 _taskId, uint256 _offerAmount) external {
        require(_offerAmount > 0, "Offer amount must be greater than 0");
        Task memory task = tasks[_taskId];
        require(task.creator != address(0), "Task does not exist");
        require(!task.isOfferAccepted, "Offer already accepted for this task");

        taskOffers[_taskId].push(Offer({
            offerer: msg.sender,
            offerAmount: _offerAmount
        }));

        emit OfferSubmitted(_taskId, msg.sender, _offerAmount);
    }

    // Accept an offer for a task
    function acceptOffer(uint256 _taskId, uint256 _offerIndex) external {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.creator, "Only task creator can accept offers");
        require(!task.isOfferAccepted, "Offer already accepted for this task");
        require(_offerIndex < taskOffers[_taskId].length, "Invalid offer index");

        Offer memory offer = taskOffers[_taskId][_offerIndex];
        task.isOfferAccepted = true;
        task.acceptedOfferer = offer.offerer;
        task.acceptedAmount = offer.offerAmount;
        usdcToken.transferFrom(task.creator, address(this), offer.offerAmount);

        emit OfferAccepted(_taskId, offer.offerer, offer.offerAmount);
    }

    // Mark task as completed and pay USDC
    function markTaskAsCompleted(uint256 _taskId) external {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.creator, "Only task creator can mark as completed");
        require(task.isOfferAccepted, "Offer must be accepted first");
        require(!task.isCompleted, "Task already completed");

        task.isCompleted = true;

        // Transfer USDC to the accepted offerer
        usdcToken.transfer(task.acceptedOfferer, task.acceptedAmount);
        payments[task.acceptedOfferer].push(task.acceptedAmount);
        emit TaskCompleted(_taskId, task.acceptedOfferer);
        emit PaymentSent(task.creator, task.acceptedOfferer, task.budget);
    }

    function getAllTasks() external view returns(uint256[] memory) {
        return  allTasks;
    } 

    function getAllTaskOffers(uint256 _taskId) external view returns(Offer[] memory) {
        return taskOffers[_taskId] ;
    }

    function getPaymentsOf(address _userAddress) external view returns (uint256[] memory) {
        return  payments[_userAddress];
    } 
}
