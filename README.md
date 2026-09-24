# Modules

Split code across files, control what runs on import, and turn a hard-coded
program into an interactive one.

**Practicing:** modules, `import`, the `__main__` guard, `input()`

- [AI Use on This Assignment](#ai-use-on-this-assignment)
- [Setup](#setup)
- [Before You Start](#before-you-start)
- [Modify](#modify)
  - [Question 1: Stop the print from running on import](#question-1-stop-the-print-from-running-on-import)
- [Program Challenge](#program-challenge)
  - [Question 2: Madlib Challenge](#question-2-madlib-challenge)
- [Resources](#resources)
- [Submitting](#submitting)
- [Good luck!](#good-luck)

## AI Use on This Assignment

Use whichever mode matches where you are with this material. Both are fine,
and most people move between them as a concept clicks.

**Tutor mode.** The AI explains, questions, quizzes, and critiques, and you
write every line you submit. For this assignment that means asking it what
actually happens when Python imports a file, or having it quiz you on the
difference between running a file and importing it. Ask it a hundred questions
— that is the whole point. What you do not do is ask it for the code. Paste
this at the start of a chat and it will hold for the rest of the conversation:

> You are acting as a tutor. Your job is to explain what this coding question
> is asking, clarify confusing wording, and highlight the relevant concepts I
> need to know — but do not provide the full solution or code that directly
> answers the question. Instead, rephrase the problem in simpler terms,
> identify what is being tested, and suggest what steps or thought processes
> might help. Ask me guiding questions to make sure I am thinking critically.
> Do not write the final function, algorithm, or code implementation.

**Implementer mode.** You write a specification first, the AI writes code from
it, and then you verify that code line by line. For this assignment your spec
has to say which file each function lives in, what gets imported where, and
what should happen when someone imports your file instead of running it. If
what comes back does more than you asked for, reject it — over-delivery is a
defect, and catching it is part of the job.

You own every line either way, and you will be asked to explain it.

## Setup

Work in `development/mod-1`. Make a draft branch before you start.

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
git checkout -b draft
```

Run `pytest` for everything, or `pytest -k madlib` for one section. Scores land
in `scores/scores.json`.

You can also try things out by hand in `src/playground.py` and run it with
`python3 src/playground.py`. Nothing in there is graded, so print whatever you
like.

75% of tests passing counts as complete. Submit at that point even if it is not
perfect. Treat submitting as a checkpoint rather than a finish line, and come
back to improve it.

## Before You Start

Every `.py` file is a **module**: a file of Python code that another file can
import. Splitting a program into modules is how you keep each file small enough
to hold in your head.

Here is the thing that surprises everyone the first time. When you import a
module, Python *runs the whole file top to bottom*. Not just the definitions —
every line.

```python
def greet():
    return "hi"

print("this runs on import!")
```

Import that file and you get `this runs on import!` printed at you, whether you
wanted it or not. That is why Python has a guard:

```python
if __name__ == "__main__":
    print("this only runs when I run this file directly")
```

`__name__` is a variable Python sets for you. It is `"__main__"` when you run
the file yourself with `python3 file.py`, and it is the module's name when
somebody imports it. So that `if` is really asking: *am I the file being run,
or am I being imported?*

Put your definitions at the top level, and put the code that *does* something
inside the guard. Both questions below are a version of that idea.

## Modify

### Question 1: Stop the print from running on import

Open `src/modify.py`. It defines `only_one()` and then prints its result at the
top level, so that print fires the moment anybody imports the file. We want the
file to be usable as a module *and* still work when you run it directly.

Two things to do.

1. Add a second function called `another_function` that takes no parameters and
   returns the string `"No, you don't."`

2. Move the existing `print(only_one())` call inside an
   `if __name__ == "__main__":` guard.

Do not delete the print. After you are done, both of these should be true:

```sh
python3 src/modify.py
```

```text
I stand alone.
```

```sh
python3 -c "import sys; sys.path.insert(0, 'src'); import modify"
```

```text

```

That second one prints nothing at all. Importing a module should be quiet.

## Program Challenge

### Question 2: Madlib Challenge

In `src/madlib_challenge` there is a single `main.py` file with two functions:

- `madlib()` takes various inputs and prints a story.
- `main()` defines hard-coded values and calls `madlib()` with them.

Move into that folder and run the program to see how it works:

```sh
cd src/madlib_challenge
python3 main.py
```

Try changing the values to change the story!

This program is **hard-coded**: the values are written directly into the
source. To get a different result you have to edit the program itself. Let's
refactor it into an interactive madlib that asks the user instead.

**First, improve the separation of concerns by using modules.** Separation of
concerns means each file has one job: `madlib.py` will know how to tell a
story, and `main.py` will know how to gather input.

- Create a new file in the `madlib_challenge` directory called `madlib.py`
- Move the entire `madlib` function out of `main.py` and into `madlib.py`
- At the top of `main.py`, import it by name with `from madlib import madlib`

That import names exactly what it brings in. You may have seen
`from madlib import *`, which pulls in everything the module defines. Avoid it.
Picture yourself six months from now, staring at a `madlib(...)` call and
wondering where that name came from. The explicit import answers that.

**Second, guard the entry point.** `main()` is currently called at the top
level of `main.py`, so importing that file would start asking a person
questions. Move the call inside an `if __name__ == "__main__":` guard, exactly
like you did in question 1.

**Third, make the program dynamic** so the user can change the story every time
they run it. Python has a built-in function for this, so there is nothing to
install:

```python
answer = input("Choose a profession: ")
```

`input()` prints the prompt you give it, waits for the person to type something
and press enter, then returns what they typed **as a string**. Always.

Replace the hard-coded values for `profession`, `name`, `verb`, and `pet` with
`input()` calls. That is four. The fifth is `story_continues`, and it needs a
little more care. `madlib()` expects `True` or `False`, but `input()` only ever
hands you a string:

```python
answer = input("Should the story continue? Y or N: ")
story_continues = answer.upper() == "Y"
```

Read that second line carefully. What is on the right of the `=`, and what type
is it? Hmmmm.

When you are done, `python3 main.py` should ask you five questions and then tell
you a story you wrote.

## Resources

- [W3Schools: Python Modules](https://www.w3schools.com/python/python_modules.asp)
  — short, with examples
- [W3Schools: Python User Input](https://www.w3schools.com/python/python_user_input.asp)
- [Real Python: `if __name__ == "__main__"`](https://realpython.com/if-name-main-python/)
  — longer, and worth it once the short version makes sense

## Submitting

```sh
git add -A
git commit -m "your message"
git push
```

Open a pull request to your instructor for feedback.

## Good luck!

Splitting code into modules is the first step toward programs too big for one
file. That is every program you will write after this one. You got this!
