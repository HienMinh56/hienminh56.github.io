fetch('/stats').then(r => r.json()).then(repos => {
    const stats = repos.pop();
    document.querySelectorAll('.stat').forEach((stat, i) => stat.textContent = stats[i]);
    document.querySelectorAll('.star').forEach((star, i) => star.textContent = repos[i][0]);
    document.querySelectorAll('.fork').forEach((fork, i) => fork.textContent = repos[i][1]);
});