// Import the Octokit.js library
import { Octokit } from "@octokit/rest";

// Create an instance of the Octokit.js library
const octokit = new Octokit({
  auth: " YOUR ACCESS TOKEN",
});

// Get a list of all new contributors to the repository
async function getContributors() {
  const response = await octokit.request("GET /repos/{owner}/{repo}/contributors", {
    owner: "YOUR-USERNAME",
    repo: "REPO NAME",
  });

  return response.data;
}

// Add a new row to the table
function addNewRow(name, email, dateAdded, programContributedTo) {
  const row = document.createElement("tr");
  const nameCell = document.createElement("td");
  const emailCell = document.createElement("td");
  const dateAddedCell = document.createElement("td");
  const programContributedToCell = document.createElement("td");

  nameCell.textContent = name;
  emailCell.textContent = email;
  dateAddedCell.textContent = dateAdded;
  programContributedToCell.textContent = programContributedTo;

  row.appendChild(nameCell);
  row.appendChild(emailCell);
  row.appendChild(dateAddedCell);
  row.appendChild(programContributedToCell);

  table.appendChild(row);
}

// Listen for new contributors to be added to the repository
async function checkForNewContributors() {
  // Get a list of all new contributors to the repository
  const newContributors = await getContributors();

  // Add each new contributor to the table
  newContributors.forEach(contributor => {
    addNewRow(contributor.name, contributor.email, new Date(), contributor.contributions[0].repository.name);
  });
}

// Check for new contributors every 10 seconds
setInterval(checkForNewContributors, 10000);
