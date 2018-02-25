pragma solidity ^0.4.17; // version type is required

contract Inbox {
    string public message; // a 'get' message function is automatically created for you

    // Constructor function called upon creation
    function Inbox(string initialMessage) public { 
        message = initialMessage;
    }
    
    // Set message function used to change the value of message variable
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}