import * as OpenCC from "opencc-js";
import { parseArgs } from "@std/cli/parse-args";
import * as path from "@std/path";
import { readFile, writeFile, stat, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import process from "node:process";

// ANSI formatting helpers
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

export interface ProcessOptions {
  ignoreCode?: boolean;
  to?: "tw" | "t" | "hk";
  staged?: boolean;
  changed?: boolean;
  since?: string;
  dryRun?: boolean;
  diff?: boolean;
  verbose?: boolean;
  help?: boolean;
}

export interface LintDifference {
  col: number;
  orig: string;
  conv: string;
}

export interface LintLineIssue {
  lineNum: number;
  rawLine: string;
  differences: LintDifference[];
}

export interface FileLintResult {
  filePath: string;
  issues: LintLineIssue[];
  totalChars: number;
}

/**
 * Creates OpenCC converter based on target variant.
 */
export function createConverter(to: "tw" | "t" | "hk" = "tw") {
  return OpenCC.Converter({ from: "cn", to });
}

/**
 * Transforms Markdown content to Traditional Chinese while protecting:
 * - Jekyll liquid tags ({% ... %} and {{ ... }})
 * - URLs in Markdown links ([...](url)) and images (![...](url))
 * - Autolinks (<https://...>)
 * - Standalone URLs (https://... or http://...)
 * - HTML link/media sources (href="..." and src="...")
 * - Jekyll Frontmatter keys (e.g. `title:`, `categories:`, `date:`)
 * - Optionally code blocks and inline code (if ignoreCode: true)
 */
export function transformMarkdown(
  content: string,
  converter: (s: string) => string,
  options: { ignoreCode?: boolean } = {},
): string {
  const protectedItems: { token: string; str: string }[] = [];
  let tokenIdx = 0;

  function protect(str: string): string {
    const token = `\x00__PROTECTED_TOKEN_${tokenIdx++}__\x00`;
    protectedItems.push({ token, str });
    return token;
  }

  let text = content;

  // 1. Protect Jekyll liquid tags: {% ... %} and {{ ... }}
  text = text.replace(/(\{%.*?%\}|\{\{.*?\}\})/gs, (m) => protect(m));

  // 2. If ignoreCode, protect fenced code blocks and inline code
  if (options.ignoreCode) {
    text = text.replace(/(```[\s\S]*?```|`[^`\n]+`)/g, (m) => protect(m));
  }

  // 3. Protect URLs in Markdown links & images: [text](URL "title") or ![alt](URL)
  text = text.replace(
    /(!?\[(?:[^\]\\]|\\.)*\])\(([^)\s]+)(?:\s+("[^"]*"|'[^']*'))?\)/g,
    (_full, label, url, title) => {
      const pUrl = protect(url);
      return `${label}(${pUrl}${title ? " " + title : ""})`;
    },
  );

  // 4. Protect autolinks <https://...> or <mailto:...>
  text = text.replace(/<(https?:\/\/[^\s>]+)>/g, (_full, url) => {
    return `<${protect(url)}>`;
  });

  // 5. Protect HTML tag attributes like src="..." and href="..."
  text = text.replace(
    /\b(src|href)=["']([^"'\r\n]+)["']/gi,
    (_full, attr, val) => `${attr}="${protect(val)}"`,
  );

  // 6. Protect standalone URLs: https://... or http://...
  text = text.replace(/\b(https?:\/\/[^\s<>()]+)/g, (full) => protect(full));

  // 7. Handle YAML frontmatter keys at file start
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  let frontmatterEnd = 0;
  let newFm = "";
  if (fmMatch) {
    frontmatterEnd = fmMatch[0].length;
    const fmLines = fmMatch[1].split(/\r?\n/);
    const convertedLines = fmLines.map((line) => {
      const kv = line.match(/^([a-zA-Z0-9_-]+:\s*)(.*)$/);
      if (kv) {
        // Keep key unchanged, convert value
        return kv[1] + converter(kv[2]);
      }
      return converter(line);
    });
    newFm = `---\n${convertedLines.join("\n")}\n---\n`;
  }

  // Convert the body
  const body = text.slice(frontmatterEnd);
  const convertedBody = converter(body);
  text = (frontmatterEnd > 0 ? newFm : "") + convertedBody;

  // Restore protected items in reverse order
  for (let i = protectedItems.length - 1; i >= 0; i--) {
    const { token, str } = protectedItems[i];
    text = text.replaceAll(token, str);
  }

  return text;
}

/**
 * Finds word differences between original string and converted string.
 */
function findDifferences(
  origStr: string,
  convStr: string,
  offset = 0,
): LintDifference[] {
  const diffs: LintDifference[] = [];
  const minLen = Math.min(origStr.length, convStr.length);
  let i = 0;

  while (i < minLen) {
    if (
      origStr[i] !== convStr[i] &&
      /[\u4e00-\u9fa5]/.test(origStr[i])
    ) {
      // Exclude legitimate Traditional Chinese characters that are over-converted by phrase matching
      // e.g. "了" in "為了" over-converted to "瞭", "干" in "干擾" over-converted to "幹", "里" in "亞里士多德"
      if (
        (origStr[i] === "了" && convStr[i] === "瞭") ||
        (origStr[i] === "干" && convStr[i] === "幹") ||
        (origStr[i] === "里" && convStr[i] === "裡")
      ) {
        i++;
        continue;
      }

      const start = i;
      let origWord = "";
      let convWord = "";
      while (
        i < minLen &&
        origStr[i] !== convStr[i] &&
        /[\u4e00-\u9fa5]/.test(origStr[i])
      ) {
        origWord += origStr[i];
        convWord += convStr[i];
        i++;
      }
      diffs.push({
        col: offset + start + 1,
        orig: origWord,
        conv: convWord,
      });
    } else {
      i++;
    }
  }

  return diffs;
}

/**
 * Lints Markdown content and reports Simplified Chinese characters that differ in Traditional.
 */
export function lintMarkdown(
  filePath: string,
  content: string,
  converter: (s: string) => string,
  options: { ignoreCode?: boolean } = {},
): FileLintResult {
  const issues: LintLineIssue[] = [];
  const lines = content.split(/\r?\n/);
  let inCodeBlock = false;
  let inFrontmatter = false;
  let totalChars = 0;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const rawLine = lines[lineIdx];
    const lineNum = lineIdx + 1;

    // Check frontmatter boundaries
    if (lineIdx === 0 && rawLine.trim() === "---") {
      inFrontmatter = true;
      continue;
    }
    if (inFrontmatter) {
      if (rawLine.trim() === "---") {
        inFrontmatter = false;
        continue;
      }
      // In frontmatter, only check value part, ignoring key
      const kv = rawLine.match(/^([a-zA-Z0-9_-]+:\s*)(.*)$/);
      if (kv) {
        const val = kv[2];
        const convVal = converter(val);
        const diffs = findDifferences(val, convVal, kv[1].length);
        if (diffs.length > 0) {
          issues.push({ lineNum, rawLine, differences: diffs });
          for (const d of diffs) totalChars += d.orig.length;
        }
        continue;
      }
    }

    // Check fenced code blocks
    if (rawLine.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock && options.ignoreCode) {
      continue;
    }

    // Mask URLs and liquid tags on this line to prevent false positives
    let maskedLine = rawLine;
    maskedLine = maskedLine.replace(
      /(https?:\/\/[^\s<>()]+)/g,
      (m) => " ".repeat(m.length),
    );
    maskedLine = maskedLine.replace(
      /(\{%.*?%\}|\{\{.*?\}\})/g,
      (m) => " ".repeat(m.length),
    );
    maskedLine = maskedLine.replace(
      /(!?\[(?:[^\]\\]|\\.)*\])\(([^)\s]+)(?:\s+("[^"]*"|'[^']*'))?\)/g,
      (_full, label, url, title) => {
        return label + "(" + " ".repeat(url.length) + (title ? " " + title : "") + ")";
      },
    );
    maskedLine = maskedLine.replace(
      /\b(src|href)=["']([^"'\r\n]+)["']/gi,
      (_full, attr, val) => `${attr}="${" ".repeat(val.length)}"`,
    );

    const convLine = converter(maskedLine);
    const diffs = findDifferences(maskedLine, convLine, 0);

    if (diffs.length > 0) {
      issues.push({ lineNum, rawLine, differences: diffs });
      for (const d of diffs) totalChars += d.orig.length;
    }
  }

  return { filePath, issues, totalChars };
}

/**
 * Gets markdown files currently staged in Git.
 */
export function getStagedMarkdownFiles(): string[] {
  try {
    const stdout = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACM"], {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    });
    return stdout
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.endsWith(".md") && f.length > 0);
  } catch {
    return [];
  }
}

/**
 * Gets markdown files changed relative to a git ref (e.g. origin/main, HEAD~1).
 */
export function getChangedMarkdownFiles(since = "origin/main"): string[] {
  try {
    const stdout = execFileSync("git", ["diff", "--name-only", "--diff-filter=ACM", since], {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    });
    return stdout
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.endsWith(".md") && f.length > 0);
  } catch {
    return [];
  }
}

/**
 * Discovers markdown files recursively using Node.js readdir.
 */
export async function collectFiles(targets: string[]): Promise<string[]> {
  const defaultTargets = ["_posts", "tools.md", "README.md"];
  const searchDirs = targets.length > 0 ? targets : defaultTargets;
  const files: string[] = [];

  for (const target of searchDirs) {
    try {
      const fileStat = await stat(target);
      if (fileStat.isFile()) {
        if (target.endsWith(".md")) files.push(target);
      } else if (fileStat.isDirectory()) {
        const entries = await readdir(target, { recursive: true, withFileTypes: true });
        for (const entry of entries) {
          if (entry.isFile() && entry.name.endsWith(".md")) {
            const parentDir = entry.parentPath || path.dirname(path.join(target, entry.name));
            files.push(path.join(parentDir, entry.name));
          }
        }
      }
    } catch {
      console.warn(`${c.yellow}Warning: Path not found: ${target}${c.reset}`);
    }
  }

  return files.sort();
}

/**
 * Executes the lint command.
 */
async function runLint(files: string[], options: ProcessOptions) {
  const converter = createConverter(options.to);
  let totalIssues = 0;
  let totalFilesWithIssues = 0;

  console.log(
    `${c.cyan}Checking ${files.length} markdown file(s) for Simplified Chinese (target: ${options.to || "tw"})...${c.reset}\n`,
  );

  for (const file of files) {
    let content: string;
    try {
      content = await readFile(file, "utf-8");
    } catch {
      continue;
    }

    const result = lintMarkdown(file, content, converter, {
      ignoreCode: options.ignoreCode,
    });

    if (result.issues.length > 0) {
      totalFilesWithIssues++;
      totalIssues += result.totalChars;

      console.log(
        `${c.red}✖ ${c.bold}${result.filePath}${c.reset} ${c.dim}(${result.totalChars} simplified characters in ${result.issues.length} lines)${c.reset}`,
      );

      // Display line details
      const maxLinesToDisplay = options.verbose ? result.issues.length : 5;
      for (let i = 0; i < Math.min(result.issues.length, maxLinesToDisplay); i++) {
        const issue = result.issues[i];
        const diffList = issue.differences
          .map((d) => `'${c.yellow}${d.orig}${c.reset}' -> '${c.green}${d.conv}${c.reset}'`)
          .join(", ");
        console.log(`  ${c.dim}Line ${issue.lineNum}:${c.reset} ${diffList}`);

        // Snippet preview
        const trimmed = issue.rawLine.trim();
        if (trimmed.length > 0 && options.verbose) {
          console.log(`  ${c.gray}| ${trimmed}${c.reset}`);
        }
      }

      if (!options.verbose && result.issues.length > maxLinesToDisplay) {
        console.log(
          `  ${c.dim}... and ${result.issues.length - maxLinesToDisplay} more lines (use --verbose to show all)${c.reset}`,
        );
      }
      console.log("");
    }
  }

  if (totalFilesWithIssues > 0) {
    console.error(
      `${c.red}${c.bold}Failed:${c.reset} Found ${c.yellow}${totalIssues}${c.reset} Simplified Chinese characters in ${c.yellow}${totalFilesWithIssues}${c.reset} file(s).`,
    );
    console.log(
      `💡 Run ${c.cyan}npm run convert:cn${c.reset} to automatically convert them to Traditional Chinese.\n`,
    );
    process.exit(1);
  } else {
    console.log(
      `${c.green}✔ All ${files.length} file(s) passed. No Simplified Chinese characters found.${c.reset}`,
    );
    process.exit(0);
  }
}

/**
 * Executes the convert command.
 */
async function runConvert(files: string[], options: ProcessOptions) {
  const converter = createConverter(options.to);
  let modifiedCount = 0;

  console.log(
    `${c.cyan}${options.dryRun ? "[DRY RUN] " : ""}Converting ${files.length} markdown file(s) to Traditional Chinese (target: ${options.to || "tw"})...${c.reset}\n`,
  );

  for (const file of files) {
    let original: string;
    try {
      original = await readFile(file, "utf-8");
    } catch {
      continue;
    }

    const converted = transformMarkdown(original, converter, {
      ignoreCode: options.ignoreCode,
    });

    if (original !== converted) {
      modifiedCount++;
      if (options.dryRun) {
        console.log(`${c.yellow}[Would update]${c.reset} ${file}`);
      } else {
        await writeFile(file, converted, "utf-8");
        console.log(`${c.green}[Updated]${c.reset} ${file}`);
      }
    }
  }

  console.log("");
  if (modifiedCount === 0) {
    console.log(`${c.green}✔ All files are already in Traditional Chinese. Nothing to update.${c.reset}`);
  } else if (options.dryRun) {
    console.log(
      `${c.yellow}Dry run complete: ${modifiedCount} file(s) would be updated.${c.reset}`,
    );
  } else {
    console.log(
      `${c.green}✔ Conversion complete: Successfully updated ${modifiedCount} file(s).${c.reset}`,
    );
  }
}

function printHelp() {
  console.log(`
${c.bold}Chinese Converter & Linter for Markdown (Node.js & TypeScript)${c.reset}
Ensures Markdown content uses Traditional Chinese compatible with LXGW WenKai Mono TC.

${c.bold}USAGE:${c.reset}
  node scripts/chinese.ts <subcommand> [targets...] [options]

${c.bold}SUBCOMMANDS:${c.reset}
  ${c.cyan}lint${c.reset}       Check markdown files for Simplified Chinese characters
  ${c.cyan}convert${c.reset}    Convert Simplified Chinese in markdown files to Traditional Chinese

${c.bold}OPTIONS:${c.reset}
  ${c.green}--staged${c.reset}         Only process files staged in git
  ${c.green}--changed${c.reset}        Only process files changed compared to origin/main
  ${c.green}--since=<ref>${c.reset}    Only process files changed compared to git <ref>
  ${c.green}--dry-run${c.reset}        (convert only) Preview changes without writing to disk
  ${c.green}--verbose, -v${c.reset}    (lint only) Show full line snippets for every issue
  ${c.green}--ignore-code${c.reset}    Leave code blocks and inline code untouched
  ${c.green}--to=<variant>${c.reset}   Target traditional variant: 'tw' (default), 't', or 'hk'
  -h, --help       Show this help message

${c.bold}EXAMPLES:${c.reset}
  ${c.dim}# Lint all posts${c.reset}
  npm run lint:cn

  ${c.dim}# Lint only git staged files before commit${c.reset}
  npm run lint:cn:staged

  ${c.dim}# Lint only files changed compared to origin/main (CI friendly)${c.reset}
  npm run lint:cn:changed

  ${c.dim}# Lint a specific file with verbose output${c.reset}
  node scripts/chinese.ts lint _posts/2025/2025-10-16-cf-worker-cpu.md -v

  ${c.dim}# Preview converting a file (dry-run)${c.reset}
  node scripts/chinese.ts convert _posts/2025/2025-10-16-cf-worker-cpu.md --dry-run

  ${c.dim}# Convert a specific file${c.reset}
  node scripts/chinese.ts convert _posts/2025/2025-10-16-cf-worker-cpu.md

  ${c.dim}# Convert all posts${c.reset}
  npm run convert:cn
`);
}

// Main CLI entry point
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  const args = parseArgs(process.argv.slice(2), {
    boolean: ["staged", "changed", "dry-run", "verbose", "ignore-code", "help"],
    string: ["to", "since"],
    alias: { h: "help", v: "verbose" },
    default: { to: "tw" },
  });

  if (args.help || args._.length === 0) {
    printHelp();
    process.exit(0);
  }

  const subcommand = String(args._[0]);
  const targets = args._.slice(1).map(String);

  let files: string[] = [];
  if (args.staged) {
    files = getStagedMarkdownFiles();
    if (files.length === 0) {
      console.log(`${c.green}No staged markdown files found.${c.reset}`);
      process.exit(0);
    }
  } else if (args.changed || args.since) {
    const ref = args.since || "origin/main";
    files = getChangedMarkdownFiles(ref);
    if (files.length === 0) {
      console.log(`${c.green}No changed markdown files found relative to ${ref}.${c.reset}`);
      process.exit(0);
    }
  } else {
    files = await collectFiles(targets);
    if (files.length === 0) {
      console.log(`${c.yellow}No markdown files found to process.${c.reset}`);
      process.exit(0);
    }
  }

  const options: ProcessOptions = {
    ignoreCode: args["ignore-code"],
    to: (args.to as "tw" | "t" | "hk") || "tw",
    staged: args.staged,
    changed: args.changed,
    since: args.since,
    dryRun: args["dry-run"],
    verbose: args.verbose,
  };

  if (subcommand === "lint" || subcommand === "check") {
    await runLint(files, options);
  } else if (subcommand === "convert" || subcommand === "fix") {
    await runConvert(files, options);
  } else {
    console.error(`${c.red}Unknown subcommand: ${subcommand}${c.reset}`);
    printHelp();
    process.exit(1);
  }
}
