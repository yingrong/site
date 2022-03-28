#!/usr/bin/env zx

console.log('hello')
await $`hugo`
await $`cd public`
let gst = await $`git status`
// console.log(gst)
await syncToRemote(gst);

// await $`git status`
// .pipe(syncToRemote);

async function syncToRemote(gitOut) {

    if (/Changes not staged for commit/.test(gitOut)) {
        // need git add,commit,push
        await $`git add .`
        .pipe($`git commit -m 'commit public $(new Date)'`)
        .pipe($`git push`)
        return;
    } else if(/Changes to be committed/.test(gitOut)) {
        // need commit,push
        await $`git commit -m 'commit public $(new Date)'`
        .pipe($`git push`)
        return; 
    }
    return true;
}