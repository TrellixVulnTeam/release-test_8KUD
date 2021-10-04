import * as core from '@actions/core';
import * as github from '@actions/github';

const { context } = github;
const { repository } = context.payload;
const { owner } = repository;

const gh = github.getOctokit(process.env.GITHUB_TOKEN);
const args = { owner: owner.name || owner.login, repo: repository.name };

(async function run() {
  const { message } = context.payload.head_commit;

  const branch = message.replace(message.slice(message.indexOf('\n\n')), '').split(`${process.env.ORGANIZATION}/`)[1]

  console.log('branch', branch);
  console.log('commits', context.payload.commits);
  // console.log('context', context);
  // try {
  //   const tag = await gh.rest.git.getTag({ ...args, tag_sha: '023153772d82d3c64241aad9a8c9a33ea865c80d' });
  //   // const tag = gh.rest.git.getTag({ ...args, tag_sha: context.payload.commits[0].id });
  //   console.log('tag', tag)
  //
  // } catch (e) {
  //   console.log(e);
  // }


  const tags = await gh.rest.repos.listTags({ ...args }).then((res) => res.data);
  console.log('tags', tags);
  // console.log('tag', tags.find(({ commit }) => commit.sha === context.payload.commits[0].id))
}());
