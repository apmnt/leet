#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# ///

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from typing import Any


GRAPHQL_URL = "https://leetcode.com/graphql"

QUESTION_QUERY = """
query questionData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    questionFrontendId
    title
    titleSlug
    content
    exampleTestcases
    codeSnippets {
      lang
      langSlug
      code
    }
  }
}
""".strip()

EXTENSIONS_BY_LANG_SLUG = {
    "c": ".c",
    "cpp": ".cpp",
    "csharp": ".cs",
    "elixir": ".ex",
    "erlang": ".erl",
    "golang": ".go",
    "java": ".java",
    "javascript": ".js",
    "kotlin": ".kt",
    "mysql": ".sql",
    "oraclesql": ".sql",
    "pandas": ".py",
    "php": ".php",
    "postgresql": ".sql",
    "python": ".py",
    "python3": ".py",
    "racket": ".rkt",
    "ruby": ".rb",
    "rust": ".rs",
    "scala": ".scala",
    "swift": ".swift",
    "typescript": ".ts",
}


class ToolError(Exception):
    """Expected command-line failure."""


class PreBlockExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self._in_pre = False
        self._current: list[str] = []
        self.blocks: list[str] = []

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        if tag == "pre":
            self._in_pre = True
            self._current = []
        elif self._in_pre and tag == "br":
            self._current.append("\n")

    def handle_endtag(self, tag: str) -> None:
        if tag == "pre" and self._in_pre:
            self._in_pre = False
            self.blocks.append("".join(self._current))

    def handle_data(self, data: str) -> None:
        if self._in_pre:
            self._current.append(data)


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Fetch a LeetCode problem and create a local problem file matching "
            "the repo's '<number>-<slug>.ts' convention."
        )
    )
    parser.add_argument("problem", help="LeetCode problem URL or title slug")
    parser.add_argument(
        "-o",
        "--out-dir",
        default="problems",
        help="directory to write the generated file into (default: problems)",
    )
    parser.add_argument(
        "--lang",
        default="typescript",
        help="LeetCode language slug or name to use (default: typescript)",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="replace the target file if it already exists",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="print the generated file contents without writing anything",
    )
    parser.add_argument(
        "--list-langs",
        action="store_true",
        help="print available code snippet languages for the problem and exit",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=20.0,
        help="HTTP timeout in seconds (default: 20)",
    )
    return parser.parse_args(argv)


def parse_title_slug(value: str) -> str:
    value = value.strip()
    if not value:
        raise ToolError("problem URL or slug is required")

    parsed = urllib.parse.urlparse(value)
    if parsed.scheme and parsed.netloc:
        parts = [part for part in parsed.path.split("/") if part]
        try:
            problem_index = parts.index("problems")
        except ValueError as exc:
            raise ToolError("URL path does not contain '/problems/<slug>'") from exc

        if len(parts) <= problem_index + 1:
            raise ToolError("URL path does not include a problem slug")
        return normalize_slug(parts[problem_index + 1])

    return normalize_slug(value.strip("/"))


def normalize_slug(value: str) -> str:
    slug = value.strip().lower()
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
        raise ToolError(f"invalid LeetCode problem slug: {value!r}")
    return slug


def fetch_question(title_slug: str, timeout: float) -> dict[str, Any]:
    payload = {
        "operationName": "questionData",
        "query": QUESTION_QUERY,
        "variables": {"titleSlug": title_slug},
    }
    data = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        GRAPHQL_URL,
        data=data,
        headers={
            "Content-Type": "application/json",
            "Origin": "https://leetcode.com",
            "Referer": f"https://leetcode.com/problems/{title_slug}/",
            "User-Agent": (
                "Mozilla/5.0 (compatible; leetcode-problem-fetcher/1.0)"
            ),
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            raw_body = response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise ToolError(f"LeetCode returned HTTP {exc.code}: {body[:500]}") from exc
    except urllib.error.URLError as exc:
        raise ToolError(f"could not reach LeetCode: {exc.reason}") from exc

    try:
        body = json.loads(raw_body)
    except json.JSONDecodeError as exc:
        raise ToolError("LeetCode returned a non-JSON response") from exc

    errors = body.get("errors")
    if errors:
        messages = [str(error.get("message", error)) for error in errors]
        raise ToolError("LeetCode GraphQL error: " + "; ".join(messages))

    question = body.get("data", {}).get("question")
    if not question:
        raise ToolError(f"problem not found: {title_slug}")
    return question


def choose_snippet(
    snippets: list[dict[str, Any]], requested_lang: str
) -> dict[str, str]:
    wanted = normalize_lang_key(requested_lang)
    for snippet in snippets:
        lang_slug = str(snippet.get("langSlug", ""))
        lang = str(snippet.get("lang", ""))
        if wanted in {normalize_lang_key(lang_slug), normalize_lang_key(lang)}:
            code = snippet.get("code")
            if not isinstance(code, str) or not code.strip():
                raise ToolError(f"{requested_lang!r} snippet is empty")
            return {"lang": lang, "langSlug": lang_slug, "code": code}

    available = ", ".join(
        f"{snippet.get('lang')} ({snippet.get('langSlug')})"
        for snippet in snippets
    )
    raise ToolError(
        f"no {requested_lang!r} snippet found; available languages: {available}"
    )


def normalize_lang_key(value: str) -> str:
    return re.sub(r"[^a-z0-9]", "", value.lower())


def available_lang_lines(snippets: list[dict[str, Any]]) -> list[str]:
    return [
        f"{snippet.get('langSlug')}: {snippet.get('lang')}" for snippet in snippets
    ]


def extract_examples(content_html: str | None) -> list[str]:
    if not content_html:
        return []

    parser = PreBlockExtractor()
    parser.feed(content_html)

    examples: list[str] = []
    for block in parser.blocks:
        normalized = normalize_example_block(block)
        if "Input:" in normalized and "Output:" in normalized:
            examples.append(normalized)
    return examples


def normalize_example_block(block: str) -> str:
    text = html.unescape(block).replace("\xa0", " ")
    lines = [line.strip() for line in text.strip().splitlines()]

    normalized_lines: list[str] = []
    previous_was_blank = False
    for line in lines:
        if not line:
            if not previous_was_blank and normalized_lines:
                normalized_lines.append("")
            previous_was_blank = True
            continue

        normalized_lines.append(line)
        previous_was_blank = False

    while normalized_lines and not normalized_lines[-1]:
        normalized_lines.pop()

    return "\n".join(normalized_lines)


def render_examples(examples: list[str]) -> str:
    blocks: list[str] = []
    for example in examples:
        lines = example.splitlines()
        blocks.append("\n".join(f"// {line}" if line else "//" for line in lines))
    return "\n\n".join(blocks)


def parse_typescript_function_signature(code: str) -> tuple[str, list[str]] | None:
    match = re.search(
        r"\bfunction\s+([A-Za-z_$][\w$]*)\s*\((?P<params>[^)]*)\)",
        code,
        flags=re.MULTILINE,
    )
    if not match:
        return None

    params_text = match.group("params").strip()
    if not params_text:
        return (match.group(1), [])

    params: list[str] = []
    for raw_param in params_text.split(","):
        param = raw_param.strip()
        if not param:
            continue
        name_match = re.match(r"(?:\.\.\.)?([A-Za-z_$][\w$]*)", param)
        if name_match:
            params.append(name_match.group(1))

    return (match.group(1), params)


def extract_example_outputs(examples: list[str]) -> list[str]:
    outputs: list[str] = []
    for example in examples:
        match = re.search(r"^Output:\s*(.+)$", example, flags=re.MULTILINE)
        if match:
            outputs.append(format_typescript_literal(match.group(1).strip()))
    return outputs


def parse_example_testcase_inputs(
    example_testcases: Any, param_count: int
) -> list[list[str]]:
    if not isinstance(example_testcases, str) or param_count <= 0:
        return []

    values = [
        format_typescript_literal(line.strip())
        for line in example_testcases.splitlines()
        if line.strip()
    ]
    if len(values) % param_count != 0:
        return []

    return [
        values[index : index + param_count]
        for index in range(0, len(values), param_count)
    ]


def format_typescript_literal(value: str) -> str:
    normalized = value.strip()
    if normalized == "True":
        return "true"
    if normalized == "False":
        return "false"
    if normalized == "None":
        return "null"
    return normalized


def should_use_deep_equal(expected: str) -> bool:
    return expected.startswith("[") or expected.startswith("{")


def render_test_cases(question: dict[str, Any], code: str) -> str:
    signature = parse_typescript_function_signature(code)
    if not signature:
        return ""

    function_name, params = signature
    input_groups = parse_example_testcase_inputs(
        question.get("exampleTestcases"), len(params)
    )
    outputs = extract_example_outputs(extract_examples(question.get("content")))
    case_count = min(len(input_groups), len(outputs))
    if case_count == 0:
        return ""

    lines: list[str] = []
    for inputs, expected in zip(input_groups[:case_count], outputs[:case_count]):
        call = f"{function_name}({', '.join(inputs)})"
        if should_use_deep_equal(expected):
            comparison = (
                f"JSON.stringify({call}) === JSON.stringify({expected})"
            )
        else:
            comparison = f"{call} === {expected}"
        lines.append(
            f"console.log({comparison}, {', '.join(inputs)}, {call});"
        )
    return "\n".join(lines)


def format_code_snippet(code: str, lang_slug: str) -> str:
    lines = [line.rstrip() for line in code.strip().splitlines()]
    if lang_slug in {"javascript", "typescript"} and lines:
        stripped_last_line = lines[-1].strip()
        if stripped_last_line == "};":
            indent = lines[-1][: len(lines[-1]) - len(lines[-1].lstrip())]
            lines[-1] = f"{indent}}}"
    return "\n".join(lines)


def filename_for(question: dict[str, Any], lang_slug: str) -> str:
    problem_number = str(
        question.get("questionFrontendId") or question.get("questionId") or ""
    )
    title_slug = str(question.get("titleSlug") or "")
    prefix = sanitize_filename_part(problem_number)
    slug = sanitize_filename_part(title_slug)
    extension = EXTENSIONS_BY_LANG_SLUG.get(lang_slug, f".{lang_slug}")

    if not prefix:
        raise ToolError("problem response did not include a question number")
    if not slug:
        raise ToolError("problem response did not include a title slug")

    return f"{prefix}-{slug}{extension}"


def sanitize_filename_part(value: str) -> str:
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", value.lower())).strip("-")


def build_file_content(question: dict[str, Any], snippet: dict[str, str]) -> str:
    examples = extract_examples(question.get("content"))
    code = format_code_snippet(snippet["code"], snippet["langSlug"])
    tests = ""
    if snippet["langSlug"] in {"javascript", "typescript"}:
        tests = render_test_cases(question, code)

    sections = []
    rendered_examples = render_examples(examples)
    if rendered_examples:
        sections.append(rendered_examples)
    sections.append(code)
    if tests:
        sections.append(tests)

    return "\n\n".join(sections).rstrip() + "\n"


def write_problem_file(
    output_dir: Path,
    filename: str,
    content: str,
    overwrite: bool,
    dry_run: bool,
) -> Path:
    target_path = output_dir / filename
    if dry_run:
        print(content, end="")
        return target_path

    output_dir.mkdir(parents=True, exist_ok=True)
    if target_path.exists() and not overwrite:
        raise ToolError(f"{target_path} already exists; pass --overwrite to replace it")

    target_path.write_text(content, encoding="utf-8")
    return target_path


def run(argv: list[str]) -> int:
    args = parse_args(argv)
    try:
        title_slug = parse_title_slug(args.problem)
        question = fetch_question(title_slug, args.timeout)
        snippets = question.get("codeSnippets") or []
        if not isinstance(snippets, list) or not snippets:
            raise ToolError("problem response did not include code snippets")

        if args.list_langs:
            print("\n".join(available_lang_lines(snippets)))
            return 0

        snippet = choose_snippet(snippets, args.lang)
        content = build_file_content(question, snippet)
        filename = filename_for(question, snippet["langSlug"])
        target_path = write_problem_file(
            Path(args.out_dir), filename, content, args.overwrite, args.dry_run
        )

        if not args.dry_run:
            print(f"created {target_path}")
        return 0
    except ToolError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1


def main() -> None:
    raise SystemExit(run(sys.argv[1:]))


if __name__ == "__main__":
    main()
