#!/usr/bin/env zx

await $`hugo`


let outOfGitStatus = await $`git status`
await syncToRemote(outOfGitStatus);

cd('public')
await $`pwd`

outOfGitStatus = await $`git status`
await syncToRemote(outOfGitStatus);


async function syncToRemote(outOfGitStatus) {
    let branchName = outOfGitStatus.toString().match(/On branch (.*)$/m)[1];

    if(/nothing added to commit but untracked files present/.test(outOfGitStatus)) {
        console.log(chalk.red('Please check you local file first!'))
        return;
    }

    if (/Changes not staged for commit/.test(outOfGitStatus)
    || /no changes added to commit/.test(outOfGitStatus)) {
        // need git add,commit,push
        await $`git add .`;
        await $`git commit -m 'commit ${branchName} ${new Date().toISOString()}'`;
        await $`git push`;
        return;
    } else if(/Changes to be committed/.test(outOfGitStatus)) {
        // need commit,push
        await $`git commit -m 'commit ${branchName} ${new Date().toISOString()}'`;
        await $`git push`;
        return; 
    } else if(/use "git push" to publish your local commits/.test(outOfGitStatus)) {
        await $`git push`
    } else {
        console.log(chalk.yellow(`unkown git log of git status: ${outOfGitStatus}`));
    }
}