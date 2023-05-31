import { Octokit } from 'octokit';
import { config } from './config.js';

export const octokit = new Octokit({ auth: config.githubPAT });

export async function getReleases(owner: string, repo: string) {
  const { data: releases } = await octokit.rest.repos.listReleases({
    owner,
    repo,
    per_page: config.eventLimit,
  });

  return releases.map(({ name, tag_name, created_at, body }) => {
    return { name, tag_name, created_at, body };
  });
}
