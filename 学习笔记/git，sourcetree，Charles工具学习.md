# git学习

[git学习文档](https://www.runoob.com/git/git-workflow.html)

## 工作流程

1、**克隆仓库**

参与一个已有的项目，首先需要将远程仓库克隆到本地：

```bash
git clone https://github.com/username/repo.git
cd repo
```

2、**创建新分支**

为了避免直接在 main 或 master 分支上进行开发，通常会创建一个新的分支：

```bash
git checkout -b new-feature
```

3、**工作目录**

在工作目录中进行代码编辑、添加新文件或删除不需要的文件。

4、**暂存文件**

将修改过的文件添加到暂存区，以便进行下一步的提交操作：

（**工作区->暂存区**）

```bash
git add filename
# 或者添加所有修改的文件
git add .
git status             # 查看哪些文件在暂存区中
```

5、**提交更改**

将暂存区的更改提交到本地仓库，并添加提交信息：

（**暂存区 -> 版本库**）

```bash
git commit -m "Add new feature"  # 将暂存区的更改提交到本地版本库
git log                          # 查看提交历史
git diff                         # 查看工作区和暂存区之间的差异
git diff --cached                # 查看暂存区和最后一次提交之间的差异
```

6、**拉取最新更改**

在推送本地更改之前，最好从远程仓库拉取最新的更改，以避免冲突：

```bash
git pull origin main
# 或者如果在新的分支上工作
git pull origin new-feature
```

7、**推送更改**

将本地的提交推送到远程仓库：

（**版本库 -> 远程仓库**）

```bash
git push origin new-feature
```

8、**创建 Pull Request（PR）**

在 GitHub 或其他托管平台上创建 Pull Request，邀请团队成员进行代码审查。PR 合并后，你的更改就会合并到主分支。

9、**合并更改**

在 PR 审核通过并合并后，可以将远程仓库的主分支合并到本地分支：

```bash
git checkout main
git pull origin main
git merge new-feature
```

10、**删除分支**

如果不再需要新功能分支，可以将其删除：

```bash
git branch -d new-feature
```

或者从远程仓库删除分支：

```bash
git push origin --delete new-feature
```

## 基本操作

### 创建仓库

使用当前目录作为 Git 仓库，只需使它初始化。该命令执行完后会在当前目录生成一个 .git 目录。

```bash
git init
```

使用我们指定目录作为Git仓库。

```bash
git init newrepo
```

### 提交与修改

| 命令                                | 说明                                     |
| :---------------------------------- | :--------------------------------------- |
| `git add`                           | 添加文件到暂存区                         |
| `git status`                        | 查看仓库当前的状态，显示有变更的文件。   |
| `git diff`                          | 比较文件的不同，即暂存区和工作区的差异。 |
| `git difftool`                      | 使用外部差异工具查看和比较文件的更改。   |
| `git range-diff`                    | 比较两个提交范围之间的差异。             |
| `git commit`                        | 提交暂存区到本地仓库。                   |
| `git reset`                         | 回退版本。                               |
| `git rm`                            | 将文件从暂存区和工作区中删除。           |
| `git mv`                            | 移动或重命名工作区文件。                 |
| `git notes`                         | 添加注释。                               |
| `git checkout`                      | 分支切换。                               |
| `git switch （Git 2.23 版本引入）`  | 更清晰地切换分支。                       |
| `git restore （Git 2.23 版本引入）` | 恢复或撤销文件的更改。                   |
| `git show`                          | 显示 Git 对象的详细信息。                |

### 提交日志

~~~bash
git log						# 查看历史提交记录
git blame <file>	# 以列表形式查看指定文件的历史修改记录
git shortlog			# 生成简洁的提交日志摘要
git describe			# 生成一个可读的字符串，该字符串基于 Git 的标签系统来描述当前的提交
~~~

### 远程操作

~~~bash
git remote		# 远程仓库操作
git fetch			# 从远程获取代码库
git pull			# 下载远程代码并合并
git push			# 上传远程代码并合并
git submodule	# 管理包含其他 Git 仓库的项目
~~~

### 分支管理

| **命令**        | **用法示例**                                                 |
| :-------------- | :----------------------------------------------------------- |
| `git branch`    | `git branch`：列出所有分支 <br/> `git branch new-branch`：创建新分支 <br/>`git branch -d old-branch`：删除分支 |
| `git checkout`  | `git checkout branch-name`：切换分支<br/> `git checkout file.txt`：恢复文件到工作区<br/> `git checkout <commit-hash>`：检出特定提交 |
| `git switch`    | `git switch branch-name`：切换到指定分支<br/> `git switch -c new-branch`：创建并切换到新分支 |
| `git merge`     | `git merge branch-name`：将指定分支的更改合并到当前分支      |
| `git mergetool` | `git mergetool`：使用默认合并工具解决冲突 <br/>`git mergetool --tool=<tool-name>`：指定合并工具。 |
| `git log`       | `git log`：显示提交历史 <br/>`git log --oneline`：以简洁模式显示提交历史 |
| `git stash`     | `git stash`：保存当前更改<br/> `git stash pop`：恢复最近保存的更改<br/> `git stash list`：列出所有保存的更改 |
| `git tag`       | `git tag`：列出所有标签<br/> `git tag v1.0`：创建一个新标签<br/> `git tag -d v1.0`：删除标签 |
| `git worktree`  | `git worktree add <path> branch-name`：在指定路径添加新的工作区并切换到指定分支<br/> `git worktree remove <path>`：删除工作区 |

# sourcetree使用

[学习博客](https://www.cnblogs.com/Can-daydayup/p/13128633.html)

## Charles工具使用

[学习博客](https://www.cnblogs.com/Uni-Hoang/p/13796852.html)

# Charles功能总结

- 截取 Http 和 Https 网络封包。
- 支持重发网络请求，方便后端调试。
- 支持修改网络请求参数。
- 支持网络请求的截获并动态修改。
- 支持模拟慢速网络。
- Structure 视图将网络请求按访问的域名分类。
- Sequence 视图将网络请求按访问的时间排序。
- Map 功能适合长期地将某一些请求重定向到另一个网络地址或本地文件。
- Rewrite 功能适合对网络请求进行一些正则替换。
- Breakpoints 功能适合做一些临时性的修改。
