import importlib.util
import re
import sys
from pathlib import Path

TEST_SUITE_NAME = "Madlib Challenge Tests"

CHALLENGE_DIR = Path(__file__).resolve().parent.parent / "src" / "madlib_challenge"
MADLIB_PATH = CHALLENGE_DIR / "madlib.py"
MAIN_PATH = CHALLENGE_DIR / "main.py"


def main_source():
    return MAIN_PATH.read_text(encoding="utf-8")


def load_madlib():
    """Import madlib.py by file path, the way the tests need it."""
    spec = importlib.util.spec_from_file_location("madlib", MADLIB_PATH)
    module = importlib.util.module_from_spec(spec)
    sys.modules["madlib"] = module
    spec.loader.exec_module(module)
    return module


def test_1_creates_madlib_file():
    """1. creates a new file called madlib.py"""
    assert MADLIB_PATH.is_file(), "src/madlib_challenge/madlib.py does not exist yet."


def test_2_madlib_file_defines_madlib():
    """2. madlib.py defines a madlib function that runs without error"""
    if not MADLIB_PATH.is_file():
        raise AssertionError("madlib.py does not exist yet. Create it first.")

    module = load_madlib()
    madlib = getattr(module, "madlib", None)
    assert callable(madlib), "madlib.py does not define a function named madlib."

    madlib("Doctor", "Alice", "dance", "cat", True)


def test_3_main_imports_madlib():
    """3. main.py imports madlib instead of defining it"""
    source = main_source()

    assert re.search(r"^\s*from\s+madlib\s+import\b", source, re.M) or re.search(
        r"^\s*import\s+madlib\b", source, re.M
    ), "main.py never imports from madlib."

    assert not re.search(r"^\s*def\s+madlib\s*\(", source, re.M), (
        "main.py still defines madlib. Move the function to madlib.py."
    )

    assert "madlib(profession, name, verb, pet, story_continues)" in source, (
        "main.py should still call madlib(profession, name, verb, pet, story_continues)."
    )


def test_4_guards_the_entry_point():
    """4. main.py only runs the story when you run it directly"""
    source = main_source()

    assert re.search(
        r"""if\s+__name__\s*==\s*['"]__main__['"]\s*:""", source
    ), "main.py has no if __name__ == \"__main__\" guard."

    assert not re.search(r"^main\(\)", source, re.M), (
        "main() is still called at the top level. Move that call inside the guard."
    )


def test_5_imports_madlib_by_name():
    """5. main.py imports the madlib name explicitly, not with a star import"""
    source = main_source()

    assert not re.search(r"^\s*from\s+madlib\s+import\s+\*", source, re.M), (
        "Star imports hide where a name came from. Import madlib by name."
    )

    assert re.search(r"^\s*from\s+madlib\s+import\s+madlib\b", source, re.M) or (
        re.search(r"^\s*import\s+madlib\b", source, re.M)
        and "madlib.madlib(" in source
    ), "main.py should name madlib in its import, so a reader can see where it came from."


def test_6_removes_hard_coded_values():
    """6. main.py no longer hard-codes the story values"""
    source = main_source()

    leftovers = [
        value
        for value in ('"Wizard"', "'Wizard'", '"Harry"', "'Harry'", '"owl"', "'owl'")
        if value in source
    ]
    assert not leftovers, (
        f"main.py still hard-codes {', '.join(leftovers)}. Ask the user instead."
    )


def test_7_collects_five_inputs():
    """7. main.py collects all five values with input()"""
    source = main_source()

    calls = len(re.findall(r"\binput\s*\(", source))
    assert calls >= 5, f"Expected at least 5 input() calls in main.py, found {calls}."
