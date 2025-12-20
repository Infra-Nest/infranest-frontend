#!/usr/bin/env python3
import sys
import re

commit_msg_file = sys.argv[1]
msg = open(commit_msg_file).read().strip()

pattern = (
    r"^(fix|feat|chore|docs|style|refactor|test)"
    r"\([a-zA-Z0-9_-]+\): "
    r"[\x20-\x7E]{1,120}$"
)

if not re.match(pattern, msg):
    print(
        "ERROR: Invalid commit message\n\n"
        "Expected format:\n"
        "  type(scope): Message\n\n"
        "Examples:\n"
        "  feat(auth): add login page\n"
        "  fix(core): handle null token\n\n"
        "Rules:\n"
        "- English (ASCII only)\n"
        "- Max 120 characters\n"
    )
    sys.exit(1)
