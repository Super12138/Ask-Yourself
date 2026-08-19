import { defineConfig } from "oxfmt";

export default defineConfig({
    semi: true,
    singleQuote: false,
    printWidth: 100,
    tabWidth: 4,
    singleAttributePerLine: false,
    sortPackageJson: true,
    sortImports: {
        partitionByComment: true,
    },
    ignorePatterns: [
        "index.html",
        "pnpm-lock.yaml",
        "README.md",
    ],
    trailingComma: "es5",
});
