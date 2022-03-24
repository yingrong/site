---
title: "Hugo 中的三个 Git 知识点"
date: 2020-05-20T22:23:53+08:00
author: yingrong
# draft: true
---

# Hugo 中的三个 Git 技巧



[**Using Git Worktree to Deploy GitHub Pages**](http://sangsoonam.github.io/2019/02/08/using-git-worktree-to-deploy-github-pages.html "Using Git Worktree to Deploy GitHub Pages")

[**Host on GitHub**](https://gohugo.io/hosting-and-deployment/hosting-on-github/ "Host on GitHub")



最近在用 hugo 配合 GitHub 搭建静态博客,参考以上两篇文章，学到了三个 git 小技巧。

## git submodule


就像网页中的 HTML 和 CSS，一个用来表示结构与内容，一个负责样式展示，可以在不改变html的情况下，修改css实现网页样式的改变。

在hugo中也一样，themes目录下存放网站主题，一般是一个个单独的仓库。而根目录下的其他文件则是我们自己控制的，比如content目录存放markdown格式的内容。

当一个项目的不同内容来源于不同的git仓库，就可以使用git的submodule 命令了。



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

## 孤儿分支

git checkout --orphan[^1] <new_branch>

部署到GitHub时，如果选择project方式部署，并且保留非public目录的话，那么需要一个单独的 gh-pages 分支来存放 public 下文件。

默认情况下，新建分支会保留原分支的历史。但 gh-pages 分支的内容 是hugo 生成的，没必要保留上级目录的历史。

通过下述命令可以让 gh-pages 成为一个“orphan”分支。


```shell
$ git checkout --orphan gh-pages
$ git reset --hard
$ git commit --allow-empty -m "Init"
$ git checkout master
```
这样，我们就新建了一个没有提交历史与文件的空 gh-pages 分支。
## git worktree
现在我们要求：gb-pages分支“只管理”public目录下的文件，而根目录下其他文件在 master 分支管理。

git worktree 结合 孤儿分支完美解决来这个问题。

```shell
$ git worktree add public gh-pages
$ echo public >> .gitignore
```
另外，如果主分支不想看到public目录下的文件与提交。可以把这个目录加到 .gitignore 文件中。

## 例：
hugo项目文件在跟目录，通过 master分支管理，
运行 Hugo build生成的文件在public目录，通过 gh-pages 分支管理。

![](img/hugo-git.png)

[^1]: orphan 1. adj. 孤儿的；无双亲的 2. n. 孤儿 3. vt. 使成孤儿

