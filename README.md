# E-ditor

# React Query, Zustand, TypeScript & Vite Boilerplate

E-ditor is a Notion clone project that aims to replicate some of the core features of Notion.

## Stack

![E-ditor Logo](<./public/Black%20And%20White%20Aesthetic%20Minimalist%20Modern%20Simple%20Typography%20Coconut%20Cosmetics%20Logo%20(1).png>)

| Tool        | Purpose                                           |
| ----------- | ------------------------------------------------- |
| React       | A JavaScript library for building user interfaces |
| React Query | Data synchronization library for React            |
| Zustand     | Minimalist state management                       |
| TypeScript  | Static typing for JavaScript                      |
| Vite        | Build tool and development server                 |

## Features

:white_check_mark: Faster build with Vite

:white_check_mark: State management using Zustand

:white_check_mark: Data fetching using React Query and Axios

:white_check_mark: TypeScript for static typing

:white_check_mark: Pre-configured with ESLint and Prettier for code linting and formatting

:white_check_mark: Includes example components to get started quickly

## Required Versions

| Tool       | Version |
| ---------- | ------- |
| NodeJS     | >=16    |
| TypeScript | >=4.9.4 |

## Getting Started

### Clone the repository

```
git clone https://github.com/slimani-amine/softy-editor-frontend
cd softy-editor-frontend
```

### Installing Dependencies

```
npm install
```

### Running Locally

To run the project locally, simply execute:

```
npm run dev
```

## Scripts

| Command     | Description                                                                   |
| ----------- | ----------------------------------------------------------------------------- |
| `start`     | Run `build:css` then watch TailwindCSS and Vite concurrently                  |
| `watch:css` | Watch for changes in `index.css` and output to `styles.css` using TailwindCSS |
| `build:css` | Build CSS using TailwindCSS from `index.css` to `styles.css`                  |
| `build`     | Run TypeScript compiler, build CSS and then Vite build                        |
| `preview`   | Run Vite preview                                                              |
| `lint`      | Lint TypeScript files using ESLint                                            |
| `lint:fix`  | Fix linting issues in TypeScript files using ESLint                           |
| `format`    | Format `.ts`, `.tsx`, and `.json` files using Prettier                        |
| `test`      | Run Jest tests                                                                |
| `release`   | Run `standard-version` for versioning                                         |
| `commit`    | Use `git-cz` for commits                                                      |
| `prepare`   | Set up Husky for git hooks in a production environment                        |

## Project Structure

Here's a basic overview of the significant folders in the boilerplate:

```
├── public
└── src
  ├── assets
  ├── lib
  ├── pages
  ├── routes
  ├── services
  ├── store
  └── shared
    ├── config
    ├── conponents
    ├── features
    ├── helpers
    ├── hooks
    ├── layout
    ├── types
    ├── providers
    ├── utils
```

| Folder     | Description                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| **`src/`** | Contains the main source code for the application.                                                    |
| `lib`      | Miscellaneous utility functions, helpers, and other standalone pieces of logic.                       |
| `pages`    | Components representing full pages in the application, typically corresponding to routes.             |
| `routes`   | Configuration and components related to routing in the application.                                   |
| `services` | Functions or classes that handle tasks like API calls, data processing,or other "service"-like tasks. |
| `store`    | Zustand st ores for state management, holding                                                         |
| `shared`   | All shared components hooks types utils providers ...                                                 |

## Features

| Tool/Library | Description                                                 |
| ------------ | ----------------------------------------------------------- |
| React Query  | Helps in fetching, caching, and updating asynchronous data. |
| Zustand      | For simple and scalable state management.                   |
| TypeScript   | For type-safe code and scalability.                         |
| Vite         | For faster builds and a smoother developer experience.      |

## License

[MIT](https://choosealicense.com/licenses/mit/)
