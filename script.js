let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

displayJobs();

function addJob() {
  let company = document.getElementById("company").value;
  let role = document.getElementById("role").value;
  let status = document.getElementById("status").value;

  if (company === "" || role === "") {
    alert("Please fill all fields");
    return;
  }

  let job = {
    company,
    role,
    status
  };

  jobs.push(job);

  localStorage.setItem("jobs", JSON.stringify(jobs));

  displayJobs();

  document.getElementById("company").value = "";
  document.getElementById("role").value = "";
}

function displayJobs(filteredJobs = jobs) {
  let jobList = document.getElementById("jobList");

  jobList.innerHTML = "";

  filteredJobs.forEach((job, index) => {
    jobList.innerHTML += `
      <div class="job-card">
        <h3>${job.company}</h3>
        <p><strong>Role:</strong> ${job.role}</p>
        <p><strong>Status:</strong> ${job.status}</p>

        <button class="delete-btn" onclick="deleteJob(${index})">
          Delete
        </button>
      </div>
    `;
  });
}

function deleteJob(index) {
  jobs.splice(index, 1);

  localStorage.setItem("jobs", JSON.stringify(jobs));

  displayJobs();
}

function searchJob() {
  let searchValue = document
    .getElementById("search")
    .value
    .toLowerCase();

  let filteredJobs = jobs.filter(job =>
    job.company.toLowerCase().includes(searchValue)
  );

  displayJobs(filteredJobs);
}