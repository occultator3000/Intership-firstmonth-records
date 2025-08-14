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
使用：

1.首先将手机和电脑连接同一局域网（Wi-Fi），手机的主机IP设置成电脑的主机ip，端口设置成8888

手机打开浏览器,charles看到已经成功连接上charles

![连接手机](https://github.com/occultator3000/Intership-firstmonth-records/blob/main/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/images/charles%E8%BF%9E%E6%8E%A5%E6%89%8B%E6%9C%BA.png)

2.将Charles设置成系统的代理服务器。

![设置代理](https://github.com/occultator3000/Intership-firstmonth-records/blob/main/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/images/Charles%E8%AE%BE%E7%BD%AE%E7%B3%BB%E7%BB%9F%E6%9C%8D%E5%8A%A1%E4%BB%A3%E7%90%86.png)

3.对网络请求进行过滤，只监控向指定目录服务器上发送的请求。


在主界面的中部的 Filter 栏中填入需要过滤出来的关键字。例如我们的服务器的地址是：[http://baidu.com](http://baidu.com/) , 那么只需要在 Filter 栏中填入 要筛选的地址 即可。

![过滤网络](https://github.com/occultator3000/Intership-firstmonth-records/blob/main/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/images/%E8%BF%87%E6%BB%A4%E7%BD%91%E7%BB%9C.png)


4.Charels 设置 Proxy

Proxy -> SSL Proxying Settings...勾选Enable SSL Proxying，点击Add
Host设置要抓取的https接口，比如想抓：https://www.baidu.com/（当Host为 *，默认抓取全部https请求 ）

![设置抓包接口](https://github.com/occultator3000/Intership-firstmonth-records/blob/main/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/images/%E8%AE%BE%E7%BD%AE%E4%BB%A3%E7%90%86.png)

**安装 Charles 证书（抓 HTTPS 必须）**

（1）电脑上安装证书

- 打开 `Help → SSL Proxying → Install Charles Root Certificate`
- 安装到系统信任（Mac Keychain / Windows 受信任证书）
  
![安装证书](https://github.com/occultator3000/Intership-firstmonth-records/blob/main/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/images/%E5%AE%89%E8%A3%85%E8%AF%81%E4%B9%A6.png)

![信任](https://github.com/occultator3000/Intership-firstmonth-records/blob/main/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/images/%E4%BF%A1%E4%BB%BBCharles.png)

（2）手机上安装证书

- 手机上浏览器访问：`chls.pro/ssl`
- 下载证书并安装
- **iOS 特别步骤**：
  - 设置 → 通用 → 关于本机 → 证书信任设置 → 信任 Charles 证书
- **Android 特别步骤**：
  - 安装到用户证书（某些新版本 Android 对第三方证书有限制）

5.模拟慢速网络

模拟慢速网络或者高延迟的网络，以测试在移动网络下，应用的表现是否正常，在 Charles 的菜单上，选择 “Proxy”–>“Throttle Setting” 项，在之后弹出的对话框中，我们可以勾选上 “Enable Throttling”（节流调节），并且可以设置 Throttle Preset 的类型。

![模拟慢速网络](https://github.com/occultator3000/Intership-firstmonth-records/blob/main/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/images/%E6%85%A2%E9%80%9F%E7%BD%91%E7%BB%9C.png)

6.修改网络请求内容

有些时候为了调试服务器的接口，需要反复尝试不同参数的网络请求。Charles 可以方便地提供网络请求的修改和重发功能。只需要在以往的网络请求上点击右键，选择 “Compose”，即可创建一个可编辑的网络请求。

使用 Charles 的 Repeat 功能来简单地测试服务器的并发处理能力，方法如下。

![compose网络](https://github.com/occultator3000/Intership-firstmonth-records/blob/main/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/images/%E7%BC%96%E8%BE%91%E7%BD%91%E7%BB%9C.png)

在想打压的网络请求上（POST 或 GET 请求均可）右击，然后选择 「Repeat Advanced」菜单项，设置repeat次数即可


7.修改服务器返回内容

想让服务器返回一些指定的内容，方便调试一些特殊情况。例如列表页面为空的情况，数据异常的情况，部分耗时的网络请求超时的情况等。

根据具体的需求，Charles 提供了 Map 功能、 Rewrite 功能以及 Breakpoints 功能，都可以达到修改服务器返回内容的目的。这三者在功能上的差异是：
Map 功能适合长期地将某一些请求重定向到另一个网络地址或本地文件。

Rewrite 功能适合对网络请求进行一些正则替换。

Breakpoints 功能适合做一些临时性的修改。

（1）Map 功能

Charles 的 Map 功能分 Map Remote 和 Map Local 两种，

Map Remote 是将指定的网络请求重定向到另一个网址请求地址，

Map Local 是将指定的网络请求重定向到本地文件。

在 Charles 的菜单中，选择 “Tools”–>“Map Remote” 或 “Map Local” 即可进入到相应功能的设置页面。

（2）Rewrite 功能

Rewrite功能适合对某一类网络请求进行一些正则替换，以达到修改结果的目的。
可以重写接口所有元素的内容：header、host、url、path、query param、response status、body。

点击Charles菜单栏Tools中的Rewrite，弹出Rewrite Settings框，勾选左上角的Enable Rewrite选项，并点击Add，左侧边框出现Untitled Set，在右侧的Name栏可以对此次的Rewrite进行重命名。

在右侧Location栏点击Add，在弹出的Edit Location对话框中，填入相关参数，最后点击OK

接着，在右侧Rules栏点击Add，在弹出的Rewrite Rule对话框中，填入相关参数，最后点击OK

![rewrite](https://github.com/occultator3000/Intership-firstmonth-records/blob/main/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/images/rewrite.png)


