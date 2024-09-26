Here’s the translated README in English:

# Comments Application

This is a simple application for creating and deleting comments, developed using React, Redux, and TypeScript. The application fetches a list of comments from the [DummyJSON API](https://dummyjson.com/comments) and allows users to add new comments and delete existing ones.

## Overview

- **Technologies:** React, Redux, TypeScript, Vite
- **Testing:** Vitest
- **Package Management:** Yarn

## Features

- Loading the list of comments when the application starts.
- Adding new comments.
- Deleting any comments.
- Preserving state upon page reload (scroll position, text in input fields).

## Installation

To run the application in your local environment, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MaksymSolokha/test-task-pics-io.git
   cd test-task-pics-io
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the application:

   ```bash
   yarn run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the address indicated in the console).

## Testing

To run the tests, use the command:

```bash
yarn test
```

To check coverage:

```bash
yarn test:coverage
```

## Deployment

The application is deployed on [Vercel](https://vercel.com/) at: [https://test-task-pics-io.vercel.app](https://test-task-pics-io.vercel.app). By simply connecting your repository, you can see updates in real time.

## Evaluation of the Solution

- **Codebase:** Easily understandable project structure and organization of the code.
- **Performance:** Optimization is used for loading and rendering.
- **Usability:** User-friendly interface.
- **User Experience:** Ease of use with intuitive design.
- **Maintainability:** Clear documentation and tests.
