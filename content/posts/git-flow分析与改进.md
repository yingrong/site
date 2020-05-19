---
title: "Git Flow 分析与改进"
date: 2020-05-15T22:52:21+08:00
lastmod: 2020-05-16T22:52:21+08:00 
author: yingrong
tags: [ "Git", "软件工程"]

# draft: true
---
## Git Flow 分支策略简介
**常用分支策略**: https://www.ibm.com/developerworks/cn/java/j-lo-git-mange/

**Git Flow** 介绍 https://nvie.com/posts/a-successful-git-branching-model/

为什么**不再建议**使用 Git Flow https://georgestocker.com/2020/03/04/please-stop-recommending-git-flow/

### 看图说话

![gitflow graph](https://nvie.com/img/git-model@2x.png)

1. 分支稳定性排序，哪个分支最稳定，为什么？
2. master 是否可以直接提交？
3. fix master 分支的 bug 时，是否可复用原来的 hotfix 分支？
4. 新建 release 分支之后，从 feature 分支 合并回 develop 分支的提交，是否要合并到 release 分支？
5. 多个 feature 分支直接是否可以合并？

## 常见问题及其可能的原因

> 常见问题:
* 分支合并时频繁发生冲突
* release 分支 bug 过多
* develop 分支不稳定

> 可能的原因：
* feature 分支存在时间过长
* feature 分支过多
* feature 分支之间有依赖关系
* release 版本特规划不合理
* 测试问题

## 改进 Git Flow

1. 特性分支合并回develop分支之前，预合并
2. 特性分支时间尽量短（一天以内）
3. 各特性分支之间尽量独立可测，无依赖（拆分功能，组织、排序）
4. 特性分支不要过多（控制WIP）

## 进一步优化

1. 频繁小步提交
2. rebase替代merge(注意：rebase 强大但不要滥用)
3. 测试保护
4. 持续集成
5. 单主干分支

## 举个例子

1. **开发新功能 foo**

```bash
    # 新的一天                                                            
    $(09:30 develop): git pull --rebase

    # 开卡，创建新分支
    $(10:00  develop): git checkout -b feature-foo

    # 频繁小步提交
    $(10:05 feature-foo): git commit
    $(10:07 feature-foo): git commit
    $(10:11 feature-foo): git commit
    $(10:30 feature-foo): git commit

    # 本地开发测试完成，准备合并
    $(10:30 feature-foo): git checkout develop
    $(10:30 develop): git pull --rebase
    $(10:30 develop): git checkout feature-foo
    $(10:40 feature-foo): git rebase develop
    
    # 结卡完成
    $(11:00 feature-foo): git checkout develop
    $(11:00 develop): git merge feature-foo
    $(11:00 develop): git pull --rebase
    $(11:01 develop): git push
    
    # 别忘了删除特性分支
    $(11:01 develop): git branch -d feature-foo
    # 提交测试
```

2. 合并冲突

   1. 找，和谁的哪次提交冲突了
   2. 协商解决
   3. 回归测试


