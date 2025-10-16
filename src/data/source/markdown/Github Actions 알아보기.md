---
title: Github Actions 알아보기
category: tech
---


# Github Actions 알아보기

밝혀두기: 해당 아티클은 GitHub Actions와 관련된 [깃허브 공식문서](https://docs.github.com/ko/actions/learn-github-actions/understanding-github-actions) 의 내용을 학습한 기록입니다.

중간 중간에 제가 깨달은(?) 부분이나 중요하다고 생각되는 문장들을 인용구 형식을 이용해 표현했으며 어렵지 않게 이해될 수 있는 부분은 원문이 그대로 타이핑되어 있습니다. 따라서 보시는 분들에 따라서는 공식문서를 보시는 것이 더 정확하거나 깔끔할 수 있습니다.

---

> Github Actions is a continuous integration and continuous delivery platform, that allows you to automate your build, test, and deployment pipeline.

You can create workflows that build and test every pull request to your repository, or deploy merged pull requests to production.

Github Actions goes beyond just DevOps and lets you run workflow when other events happen in your repository. For example, you can run a workflow to automatically add the appropriate labels whenever some creates a new issue in your repository.

## The components of Github Actions

You can configure a Github Actions `workflow` to be triggered when an `event` occurs in your repository, such as a pull request being opened or an issue being created.

Your `workflow` contains one or more `jobs` which can run in sequential order or in parallel.

Each `job` will run inside its own virtual machine runner, or inside a container, and has one or more `steps` that either run a script that you define or run an action, which is a reusable extension that can simplify your workflow.

> Workflow => Jobs => Steps\
(and a Step will run a script / action)

> Job 단위로 runner(virtual machine 또는 container)를 갖는다는 점에 주목할만 하다.

## Workflows

A workflow is a configurable automated process that will run one or more jobs.

Workflows are defined by a YAML file checked in to your repository and will run when triggered by an event in your repository, or they can be triggered manually, or at a defined schedule.

Workflows are defined in the `.github/workflows` directory in a repository, and a repository can have multiple workflows, each of which can perform a different set of tasks.

For example, you can have one workflow to build and test pull requests, another workflow to deploy your application every time a release is created, and still another workflow that adds a label every time someone opens a new issue.

You can even reference a workflow within another workflow!

## Events

An event is a specific activity in a repository that triggers a workflow run. For example, activity can originate from Github when someone create a pull request, opens an issue, or pushes a commit to a repository.

You can also trigger a workflow to run on a schedule, by posting to a REST API, or manually.

> Workflow는 깃허브를 통해 발생하는 [여러가지 이벤트(pull request, push, ..)](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)를 통해서 촉발시킬 수 있을 뿐 아니라 [REST API를 이용해서 원하는 시점에 수동적으로 발생](https://docs.github.com/en/free-pro-team@latest/rest/actions/workflow-runs?apiVersion=2022-11-28#re-run-a-workflow)시킬수도 있다.

## Jobs

> A `job` is a `set of steps` in a `workflow` that is executed on the same `runner`.

Each `step` is a either a `shell script` that will be executed, or an `action` that will be run.

Steps are executed in order and are dependent from one step to another. For example, you can have a step that build your application followed by a step that test the application that was built.

You can configure a `job's dependencies with other jobs`; by default, jobs have no dependencies and run in parallel with each other. When a job takes a dependency on another job, it will wait for the dependent job to complete before it can run.

For example, you may have multiple build jobs for different architectures that have no dependencies, and a packaging job that is dependent on those jobs. The build jobs will run in parallel, and when they have all completed successfully, the packaging job will run.

> 여러개의 build job이 존재하고 packaging job이 이 여러개의 build job들에 의존, 즉 모두 끝나야만 가능한 작업이라고 할때 packaging job은 build job에 dependent 하다고 할 수 있다. 하지만 build job끼리는 아무 의존성이 없다면 그들은 Parallel하게 진행시키고, packaging job은 이들을 모두 기다렸다가 진행될 수 있도록 만들 수 있다고 한다.

## Actions

An action is a custom application for the Github Actions platform that performs a complex but frequently repeated task.

Use an action to help reduce the amount of repetitive code that you write in your workflow files. An action can pull your git repository from Github, set up the correct toolchain for your build environment, or set up the authentication to your cloud provider.

> 그러니까, Action은 Github Actions 세계에서의 모듈, 익스텐션, 라이브러리, 프리셋 같은 것이다.

## Runners

A runner is a server that runs your workflows when they're triggered. Each runner can run a single job at a time. Github provides Ubuntu Linux, Microsoft Windows, and macOS runners to run your workflows; each workflows run executes in a fresh, newly-provisioned virtual machine.

Github also offers larger runners, which are available in larger configurations. If you need a different OS or require a specific hardware configuration, you can host your own runners.

---

이제 예제를 한번 살펴보자.
프로젝트의 `.github/workflows/learn-github-actions.yml` 경로에 아래와 같은 내용을 작성할 수 있다.

```yaml
name: learn-github-actions
run-name: ${{ github.actor }} is learning Github Actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '14'
      - run: npm install -g bats
      - run: bats -v
```

각각의 항목을 하나씩 뜯어보자.

<br/>

```yaml
name: learn-github-actions
```
먼저 깃허브 액션의 이름이다. 레포지토리의 `Actions` 탭에서 해당 이름으로 표기되는데, 표기하지 않으면 파일명으로 대체된다.

```yaml
run-name: ${{ github.actor }} is learning Github Actions
```
옵셔널이다. workflow가 실행될 때 표기되는 이름이다.

```yaml
on: [push]
```
언제 워크플로우가 실행되는지, 트리거를 표기한다.

```yaml
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      ...
```
`check-bats-version` 이 하나의 job에 해당한다. `runs-on` 속성으로 `runner`, 즉 해당 job이 어떤 환경에서 실행될지에 대한 정보를 명시해준다. 여기에서는 Ubuntu 리눅스로 실행환경을 설정했다.

```yaml
jobs:
  ...
  steps:
    -uses: actions/checkout@v3
    -uses: actions/setup-node@v3
      with:
        node-version: '14'
    - run:
      npm install -g bats
    - run:
      bats -v
```
`steps`는 job 내부에서 실행될 구체적인 작업과 관련된 내용이다. `uses` 키워드는 하나의 스텝에서 어떤 액션을 사용할지에 대한 내용을 명시해준다. 예제에서 사용된 actions/checkout@v3 이라는 액션은 runner에 해당 레포지토리를 'checkout' 시켜서 레포지토리의 내용을 기반으로 빌드나 테스트를 진행할 수 있도록 돕는다. checkout 이후 진행되는 setup-node 액션은 말 그대로 노드를 셋업한다.

`run` 키워드와 함께 입력된 명령어는 해당 job이 진행되고 있는 runner에게 전달되어 실행된다. 액션을 통해 node가 설치되었으므로 npm 명령어를 전달해 bats 패키지를 설치하고 사용할 수 있다.