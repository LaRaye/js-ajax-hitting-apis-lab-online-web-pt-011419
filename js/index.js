// your code here
function getRepositories() {
  let userName = document.getElementById('username').value
  
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/${userName}/repos');
  req.send();
}

function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText)

  const repoList = "<ul>" + repos.map(repo => {
    return(`
      <li>
        <h2><a href="${repo.html_url}">${repo.name}</a></h2>
        <span><a href="#" data-repository="${repo.name}" data-username="${repo["owner"]["login"]}" onclick="getCommits(this)">Get Commits</a></span>
        <span><a href="#" data-repository="${repo.name}" data-username="${repo["owner"]["login"]}" onclick="getBranches(this)">Get Branches</a></span>
      </li>`
    )
  }).join('') + "</ul>"
  document.getElementById("repositories").innerHTML = repoList
}