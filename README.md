# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## React env setup for 2024 (Step by Step)

1. node -v(volta list)
2. npm create vite@latest sample-app -- --template react-swc-ts
3. npm run dev, build, preview
4. tsconfig.json(path alias)

```json
"compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
```

5. npm i -D vite-tsconfig-paths (これで vite.config.ts は編集する必要なし)
6. vite.config.ts

```ts
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()], //for path alias
});
```

7. npm install -D \
   vitest \
   happy-dom \
   @vitest/coverage-v8 \
   @testing-library/react \
   @testing-library/user-event \
   @testing-library/jest-dom

8. "coverage": "vitest run --coverage"

9. vite.config.ts

```ts
/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest-setup.ts"],
  },
});
```

10. vitest-setup.ts(import "@testing-library/jest-dom/vitest")

11. tsconfig.json

```json
{
  "include": ["src", "vitest-setup.ts"]
}
```

12. src/components/Count.tsx

```tsx
// TextInput.js
import { useState } from "react";

const TextInput = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter some text"
        aria-label="Text Input"
      />
      <p>Entered Text: {text}</p>
    </div>
  );
};

export default TextInput;
```

13. Count.test.tsx (and run coverage, test)

```tsx
// TextInput.test.js
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";

test("TextInput Component Test", async () => {
  const user = userEvent.setup();
  render(<TextInput />);

  const inputElement = screen.getByLabelText("Text Input");
  expect(screen.getByText("Entered Text:")).toBeInTheDocument();

  await user.type(inputElement, "Hello World");
  expect(screen.getByText("Entered Text: Hello World")).toBeInTheDocument();
});
```

14. npm install -D eslint, npx eslint --init

15. "lint": "eslint src" (added package.json), and npm run lint

16. .eslintrc.cjs

```cjs
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};
```

17. mod a App.tsx a tag rel="noreferrer"

18. add some eslint roles (optional)

19. npm i -D prettier

```js
/** @type {import("prettier").Config} */
const config = {};

export default config;
```

20. "lint": "eslint src"

21. "prettier plugin and settings.json format on save"

22. husky + lint-stataged

```cmd
git init
npm install --save-dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

23. pakage.json change and git add . git commit -m "init"

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,md}": ["prettier --write", "eslint --fix"]
  },
  "ignorePatterns": ["!.storybook"]
}
```

24. npx storybook init --builder @storybook/builder-vite

25. create storyBook directory and file (TextInput/TextInput.stories.tsx)

26. npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

27. tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

28. index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

29. check className utility

30. npx shadcn-ui@latest init

31. Would you like to use TypeScript (recommended)? no / yes
    Which style would you like to use? › Default
    Which color would you like to use as base color? › Slate
    Where is your global CSS file? › › src/index.css
    Do you want to use CSS variables for colors? › no / yes
    Where is your tailwind.config.js located? › tailwind.config.js
    Configure the import alias for components: › @/components
    Configure the import alias for utils: › @/lib/utils
    Are you using React Server Components? › no / yes (no)

32. mod tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
```

33. npx shadcn-ui@latest add button

34. github actions setup

35. .github/workflows/lint.yml & test.yml

```lint.yml
name: Lint

on: push

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run lint
```

```test.yml
name: Test

on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"

      - run: npm ci
      - run: npm run test
```

or lint_test.yml

```yml
name: Lint and Test

on: push

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install Dependencies
        run: npm ci

      - name: Run Lint
        run: npm run lint

      - name: Run Test
        run: npm run test
```

36. CD(Vite 静的ホスティング参照)

#### Reference

https://zenn.dev/tentel/articles/488dd8765fb059
https://zenn.dev/kazukix/articles/react-setup-2024
