---
title: "Hugo 中的三个 Git 知识点"
date: 2020-05-20T22:23:53+08:00
author: yingrong
tags: [ "Git", "hugo"]
# draft: true
---

Hugo 中的三个 Git 技巧
======================

最近在用 hugo 配合 GitHub 搭建静态博客，学到了三个 git 小技巧。

## 1 git submodule


``` shell
$ tree -aL 1
  .
  ├── .git
  ├── .gitignore
  ├── archetypes
  ├── config.toml
  ├── content
  ├── data
  ├── layouts
  ├── public
  ├── resources
  ├── static
  └── themes
$ cd themes
$ git submodule add https://github.com/dillonzq/LoveIt.git themes/LoveIt
$ tree -aL 1
  .
  ├── .git
  ├── .gitignore
  ├── .gitmodules
  ├── archetypes
  ├── config.toml
  ├── content
  ├── data
  ├── layouts
  ├── public
  ├── resources
  ├── static
  └── themes
$ cat .gitmodules
  [submodule "themes/LoveIt"]
    path = themes/LoveIt
    url = https://github.com/dillonzq/LoveIt.git

```

## 2 git checkout --orphan gb-pages

场景：当使用Hugo等静态网站生成工具时，我们的文件有两类，一类是用于生成静态网站的源文件，一类是生成的用于部署的文件。

















<!-- 





git checkout --orphan branch-name
=====================

# git checkout --orphan branch-name #

Git DAG 有向无环图。

hugo git

git submodule
git checkout --orphan
git worktree add dirpath branch
git worktree add dirpath orphan-branch




orphan 
1. adj. 孤儿的；无双亲的
2. n. 孤儿
3. vt. 使成孤儿

sss
---

## SSS ##

  * 正常新建分支是什么情况？正常情况下，新建的分支的继承原分支的历史。举个例子。
  1. on branch 1，git history
  gcb newbranch git history
  
  git commit new git history
  
  如果新分支标记为 orphan。那么它没有历史。新的提交会是第一个提交。

  
  回到了它的字面含义：孤儿，没有父节点。
  
  ---
  
  怎么实现
  
  1. git branch new   git checkout --orphan new
  2. git checkout --orphan




[Using Git Worktree to Deploy GitHub Pages](http://sangsoonam.github.io/2019/02/08/using-git-worktree-to-deploy-github-pages.html "Using Git Worktree to Deploy GitHub Pages")
[host on GitHub](https://gohugo.io/hosting-and-deployment/hosting-on-github/ "Host on GitHub")


[^1 -->
