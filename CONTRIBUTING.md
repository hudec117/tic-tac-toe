# Contributing

## Required software

- [node](https://nodejs.org/en/)
- [git](https://git-scm.com/downloads)
  - Install with Credential Manager to simplify authentication

## Optional but recommend software

- [VS Code](https://code.visualstudio.com/)
  - Extensions: ESLint

## Cloning the repository

1. Open VS Code
2. Click on Source Control on left sidebar (Ctrl + Shift + G)
3. Click "Clone Repository"
4. Select to clone from GitHub and authenticate
5. Select "hudec117/tic-tac-toe" to clone and choose a suitable location
  - It will create a folder for the project so no need to create a new folder.
6. On the bottom right you'll be prompted to open the repository, click "Open"

## Creating branches

1. On the bottom left of VS Code you will most likely see the Version Control symbol with "master" next to it.
2. When you click on it you will be prompted to select another branch or create a new one.
3. Click "Create new branch..." and enter a name.
4. On the bottom left, you will now see the name of your branch.

## Folder Structure

- `.vscode` is where configuration regarding VS code is stored. This is automatically used by VS Code when you open the project.
- `src` is where we will keep all the code files for the project.

## Branching Strategy

- `master` will represent a release-able state of the software.
- `dev` will be used to merge feature branches.
- `hack` is for the "hack" submission.
- `feature/<feature>` will be used for feature branches.

Merging between the above branches will be done exclusively using Pull Requests on GitHub.

## Resources
- [Git Concepts & Workflows](https://livecodestream.dev/post/2020-08-21-git-concepts-and-workflow-for-beginners/)
- [Git resources on Blackboard](https://vle.aston.ac.uk/webapps/blackboard/content/listContent.jsp?course_id=_30013_1&content_id=_1997423_1)