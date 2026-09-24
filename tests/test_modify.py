import re
import subprocess
import sys
from pathlib import Path

TEST_SUITE_NAME = "Modify Tests"

SRC = Path(__file__).resolve().parent.parent / "src"
MODIFY = SRC / "modify.py"


def run(code):
    """Run a snippet in a fresh interpreter with src/ importable."""
    return subprocess.run(
        [sys.executable, "-c", code],
        cwd=SRC,
        capture_output=True,
        text=True,
    )


def test_importing_prints_nothing():
    """modify.py - prints nothing when another file imports it"""
    result = run("import modify")
    assert result.returncode == 0, result.stderr
    assert result.stdout.strip() == "", (
        "Importing modify.py printed something. Module-level code runs on "
        "import, so the print needs to move under a __main__ guard."
    )


def test_running_directly_still_prints():
    """modify.py - guards the print and still prints when run directly"""
    source = MODIFY.read_text(encoding="utf-8")
    assert re.search(
        r"""if\s+__name__\s*==\s*['"]__main__['"]\s*:""", source
    ), 'modify.py has no if __name__ == "__main__" guard.'

    result = subprocess.run(
        [sys.executable, str(MODIFY)], capture_output=True, text=True
    )
    assert result.returncode == 0, result.stderr
    assert "I stand alone." in result.stdout, (
        "Running modify.py directly should still print. Guard the print, "
        "do not delete it."
    )


def test_has_both_functions():
    """modify.py - defines both only_one and another_function"""
    import modify

    assert callable(getattr(modify, "only_one", None))
    assert callable(getattr(modify, "another_function", None))


def test_return_values():
    """modify.py - both functions return the right string"""
    import modify

    assert modify.only_one() == "I stand alone."
    assert modify.another_function() == "No, you don't."
