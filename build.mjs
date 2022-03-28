#!/usr/bin/env zx

await $`hugo`

cd('public')
await $`pwd`


let outOfGitStatus = await $`git status`
await syncToRemote(outOfGitStatus);


async function syncToRemote(outOfGitStatus) {
    if (/Changes not staged for commit/.test(outOfGitStatus)) {
        // need git add,commit,push
        await $`git add .`;
        await $`git commit -m 'commit public $(new Date)'`;
        await $`git push`;
        return;
    } else if(/Changes to be committed/.test(outOfGitStatus)) {
        // need commit,push
        await $`git commit -m 'commit public $(new Date)'`;
        await $`git push`;
        return; 
    } else {
        
    }
}