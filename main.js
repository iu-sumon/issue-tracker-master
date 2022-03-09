
// টাস্ক-২:

// ১১.আমাদের গিটহাব এ issue-tracker নামে একটা রিপোজিটরি আছে।সেখানে কোন একটা issue যোগ করার পর সেটাকে close করা যায়না। আবার ডিলিট ও করা যায় না। তো তোমার কাজ হচ্ছে সেই সাইটের বাগ ফিক্স করা। 

document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {

  const getInputValue = id => document.getElementById(id).value;

  const description = getInputValue('issueDescription'); //............get description

  const severity = getInputValue('issueSeverity');//....................get severity

  const assignedTo = getInputValue('issueAssignedTo'); //.................get assigned

  const id = Math.floor(Math.random() * 100000000) + '';//..................get id Randomly
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status }; //..........destructuring 

  let issues = [];

  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }

  issues.push(issue);

  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

//....................CLosed Issue....................\\
const closeIssue = (id) => {
  console.log(id);
  
  issues = JSON.parse(localStorage.getItem('issues'));

  const currentIssue = issues.find(issue => issue.id === id);
  console.log(currentIssue);
  currentIssue.description = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  document.getElementById(`closeIssueText-${id}`).style.textDecoration ="line-through";
}

//....................Delete Issue....................\\
const deleteIssue = id => {
  console.log(id);
  
  issues = JSON.parse(localStorage.getItem('issues'));

  const remainingIssues = issues.filter(issue => issue.id !== id);
  
   localStorage.setItem('issues', JSON.stringify(remainingIssues));
   fetchIssues();



   const issuesList = document.getElementById('issuesList');
   issuesList.removeChild(remainingIssues);
}

const fetchIssues = () => {

  issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (let i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `
                              <div class="well">

                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id="closeIssueText-${id}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>

                              <a href="#" onclick="closeIssue('${id}')" class="btn btn-warning">Close</a> 
                              <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>

                              </div>`;


  }
}
