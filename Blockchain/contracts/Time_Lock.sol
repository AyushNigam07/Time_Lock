// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Time_lock {
    struct users {
        uint256 _time;
        uint256 _amount;
    }
    mapping(address => users) public user;

    receive() external payable {}

    function add_users(
        address _user,
        uint256 value,
        uint256 time
    ) public payable {
        require(
            msg.sender == _user && msg.value != 0 && msg.value == value * 1e18
        );
        user[_user]._amount = value;
        user[_user]._time = block.timestamp + time;
    }

    function with_drawal(address user_addr) public payable {
        require(
            msg.sender == user_addr &&
                user[user_addr]._amount != 0 &&
                block.timestamp >= user[user_addr]._time,
            "requirement doesn't meet"
        );
        payable(user_addr).transfer(user[user_addr]._amount * 1e18);
        delete user[user_addr];
    }

    function check_time(address user_addr) public view returns (uint256) {
        require(msg.sender == user_addr, "requirement doesn't meet");
        if (block.timestamp >= user[user_addr]._time) {
            return user[user_addr]._time - block.timestamp;
        } else {
            return user[user_addr]._time - block.timestamp;
        }
    }

    function user_info(address user_addr) public view returns (users memory) {
        require(msg.sender == user_addr);
        return user[user_addr];
    }
}
