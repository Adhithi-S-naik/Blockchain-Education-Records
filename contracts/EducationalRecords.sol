pragma solidity ^0.8.0;

contract EducationalRecords {
    struct Record {
        string studentName;
        string institutionName;
        string courseName;
        string grade;
        uint date;
    }

    mapping(address => Record[]) public records;

    function addRecord(
        string memory studentName,
        string memory institutionName,
        string memory courseName,
        string memory grade
    ) public {
        records[msg.sender].push(Record(studentName, institutionName, courseName, grade, block.timestamp));
    }

    function getRecords(address user) public view returns (Record[] memory) {
        return records[user];
    }
}
