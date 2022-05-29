import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const getRepoData = async () => {
  const data: Array<{ date: string; message: string }> = [];
  const commits = await octokit.repos.listCommits({
    owner: "decca-dev",
    repo: "cheb-larbi-games",
  });
  commits.data.map((commit) => {
    data.push({
      date: commit.commit.committer?.date!,
      message: commit.commit.message,
    });
  });

  return data;
};
