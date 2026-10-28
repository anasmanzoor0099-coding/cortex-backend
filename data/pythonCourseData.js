export const pythonCourseData = {
  title: 'The Complete Python Masterclass: Beginner to Professional',
  description: 'Master Python from absolute beginner to professional level, including programming fundamentals, data structures, OOP, testing, algorithms, APIs, databases, automation, concurrency, security, and real-world projects.',
  thumbnail: 'python',
  totalDuration: '60h 00m',
  modules: [
    {
      title: 'Module 1: Introduction to Python',
      duration: '2h 00m',
      notes: `### What is Python?
Python is a high-level, general-purpose programming language used in web development, automation, data science, artificial intelligence, and scripting.

### Installing Python
Install Python from python.org and verify it in your terminal using \`python --version\` or \`py --version\` on Windows.

### Your first program
\`\`\`python
print("Hello, Python!")
print("Welcome to Cortex.")
\`\`\`

### Understanding print()
The \`print()\` function displays information in the terminal. You can print text, numbers, variables, and the results of expressions.

### Comments
Use \`#\` for single-line comments. Comments explain code and are ignored by the interpreter.

### Indentation
Python uses indentation to define code blocks. Use four spaces consistently.

### Running a Python file
Save your program as \`main.py\` and run \`python main.py\` in the terminal.`,
      codeExample: `print("Welcome to Python Masterclass!")

name = input("Enter your name: ")
print(f"Hello, {name}!")

print("Python is easy to read.")
print(10 + 20)
print(type(name))`,
      quiz: [
        {
          question: 'Which function displays output in Python?',
          options: ['display()', 'print()', 'echo()', 'write()'],
          correctAnswer: 1
        },
        {
          question: 'Which symbol starts a single-line comment?',
          options: ['//', '<!--', '#', '**'],
          correctAnswer: 2
        }
      ]
    },
    {
      title: 'Module 2: Variables and Data Types',
      duration: '2h 30m',
      notes: `### Variables
Variables are names that refer to objects. Python is dynamically typed, so you do not declare a variable's type before assigning a value.

### Basic data types
- \`str\`: text
- \`int\`: whole numbers
- \`float\`: decimal numbers
- \`bool\`: True or False
- \`NoneType\`: represents the absence of a value

### Example
\`\`\`python
name = "Anas"
age = 18
height = 5.6
is_student = True
result = None
\`\`\`

### Naming rules
Variable names cannot start with a number or contain spaces. Use descriptive names and the \`snake_case\` convention.

### Type checking
Use \`type(value)\` to inspect a value's type.

### Type conversion
Use \`int()\`, \`float()\`, \`str()\`, and \`bool()\` to convert values when appropriate. Invalid conversions can raise \`ValueError\`.

### Equality and identity
Use \`==\` to compare values and \`is\` to check object identity. For checking for None, use \`is None\`.`,
      codeExample: `student_name = "Anas"
age = 18
height = 5.6
is_student = True

print(type(student_name))
print(type(age))
print(type(height))
print(type(is_student))

number_text = "100"
number = int(number_text)

print(number + 50)
print(f"{student_name} is {age} years old.")`,
      quiz: [
        {
          question: 'Which data type represents a decimal number?',
          options: ['int', 'str', 'float', 'bool'],
          correctAnswer: 2
        },
        {
          question: 'What does int("25") return?',
          options: ['"25"', '25', '25.0', 'None'],
          correctAnswer: 1
        }
      ]
    },
    {
      title: 'Module 3: Operators and Expressions',
      duration: '2h 00m',
      notes: `### Arithmetic operators
- \`+\`: addition
- \`-\`: subtraction
- \`*\`: multiplication
- \`/\`: division
- \`//\`: floor division
- \`%\`: remainder
- \`**\`: exponentiation

### Comparison operators
Use \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, and \`<=\` to compare values.

### Logical operators
- \`and\`: both conditions must be true.
- \`or\`: at least one condition must be true.
- \`not\`: reverses a Boolean value.

### Assignment operators
Operators such as \`+=\`, \`-=\`, and \`*=\` update a variable.

### Operator precedence
Parentheses make complex expressions clearer and help you control evaluation order.

### Division by zero
Dividing by zero raises \`ZeroDivisionError\`. Validate inputs when calculations depend on user data.`,
      codeExample: `price = 500
discount_percent = 10

discount = price * discount_percent / 100
final_price = price - discount

print("Discount:", discount)
print("Final price:", final_price)

print(17 // 5)
print(17 % 5)
print(2 ** 4)

age = 18
print(age >= 18 and age < 60)`,
      quiz: [
        {
          question: 'What is the result of 17 % 5?',
          options: ['2', '3', '3.4', '12'],
          correctAnswer: 0
        },
        {
          question: 'Which operator performs exponentiation?',
          options: ['^', '**', '//', '%%'],
          correctAnswer: 1
        }
      ]
    },
    {
      title: 'Module 4: Strings and Text Formatting',
      duration: '2h 30m',
      notes: `### Strings
Strings represent text and are immutable sequences of Unicode characters.

### Creating strings
You can use single quotes, double quotes, or triple quotes for multiline text.

### Indexing and slicing
Indexes begin at zero. Negative indexes count backward from the end. The slice \`text[1:4]\` includes indexes 1, 2, and 3.

### Useful string methods
- \`.strip()\`: removes surrounding whitespace.
- \`.lower()\`: converts text to lowercase.
- \`.upper()\`: converts text to uppercase.
- \`.title()\`: capitalizes words.
- \`.replace()\`: replaces matching text.
- \`.split()\`: splits text into a list.
- \`.join()\`: joins strings together.

### f-strings
Use f-strings to insert variables into text and format numbers.

### String immutability
String methods return new strings rather than changing the original string.`,
      codeExample: `name = "  anas manzoor  "
clean_name = name.strip().title()

print(clean_name)
print(clean_name[0])
print(clean_name[-1])
print(clean_name[0:4])

languages = "Python,JavaScript,SQL".split(",")
print(languages)

print(" | ".join(languages))

price = 1250.567
print(f"Price: Rs. {price:.2f}")`,
      quiz: [
        {
          question: 'What does text[1:4] return?',
          options: [
            'Characters at indexes 1, 2, and 3',
            'Characters at indexes 1, 2, 3, and 4',
            'Only the fourth character',
            'The complete string'
          ],
          correctAnswer: 0
        },
        {
          question: 'Are Python strings mutable?',
          options: ['Yes, always', 'No, strings are immutable', 'Only numbers are immutable', 'Only long strings are mutable'],
          correctAnswer: 1
        }
      ]
    },
    {
      title: 'Module 5: Input, Output, and Conditions',
      duration: '2h 30m',
      notes: `### User input
The \`input()\` function reads text from the user and returns a string. Convert the value before performing numeric calculations.

### Conditional statements
Use \`if\`, \`elif\`, and \`else\` to make decisions.

### Example
\`\`\`python
marks = 85

if marks >= 90:
    print("Grade A")
elif marks >= 80:
    print("Grade B")
else:
    print("Keep practicing")
\`\`\`

### Boolean conditions
Conditions evaluate to True or False. Combine conditions with logical operators.

### Truthiness
Empty strings, empty collections, zero, and None are false-like in conditional expressions.

### Input validation
Use try/except to handle invalid numeric input. Give users helpful messages instead of allowing expected input errors to crash the program.`,
      codeExample: `raw_marks = input("Enter your marks: ").strip()

try:
    marks = float(raw_marks)

    if not 0 <= marks <= 100:
        print("Marks must be between 0 and 100.")
    elif marks >= 90:
        print("Grade: A")
    elif marks >= 80:
        print("Grade: B")
    elif marks >= 70:
        print("Grade: C")
    elif marks >= 60:
        print("Grade: D")
    else:
        print("Grade: F")

except ValueError:
    print("Please enter a valid number.")`,
      quiz: [
        {
          question: 'What type does input() return before conversion?',
          options: ['int', 'float', 'str', 'bool'],
          correctAnswer: 2
        },
        {
          question: 'Which keyword checks another condition after if?',
          options: ['otherwise', 'elif', 'repeat', 'nextif'],
          correctAnswer: 1
        }
      ]
    },
    {
      title: 'Module 6: Loops and Iteration',
      duration: '3h 00m',
      notes: `### for loops
A for loop iterates over an iterable such as a list, string, or range.

### range()
\`range(5)\` produces the numbers 0 through 4. You can specify a start, stop, and step.

### while loops
A while loop continues while its condition is true. Make sure the condition can eventually become false.

### Loop control
- \`break\`: exits the loop.
- \`continue\`: skips to the next iteration.
- \`pass\`: does nothing and can act as a placeholder.

### enumerate()
Use enumerate when you need both the index and the item.

### zip()
Use zip to iterate through corresponding items from multiple iterables.

### Loop else
A loop's else block executes if the loop finishes without encountering break.`,
      codeExample: `print("Even numbers from 1 to 20")

for number in range(1, 21):
    if number % 2 == 0:
        print(number)

print("Student scores")

scores = [78, 92, 65, 88]

for position, score in enumerate(scores, start=1):
    if score < 70:
        print(f"Student {position}: needs improvement")
        continue

    print(f"Student {position}: passed with {score}")`,
      quiz: [
        {
          question: 'Which keyword immediately exits a loop?',
          options: ['continue', 'pass', 'break', 'skip'],
          correctAnswer: 2
        },
        {
          question: 'What values are produced by range(3)?',
          options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', 'Only 3'],
          correctAnswer: 1
        }
      ]
    },
    {
      title: 'Module 7: Lists and Tuples',
      duration: '3h 00m',
      notes: `### Lists
Lists are ordered, mutable collections that allow duplicates.

### Common list methods
- \`append()\`: adds one item.
- \`extend()\`: adds items from an iterable.
- \`insert()\`: inserts at an index.
- \`remove()\`: removes a matching value.
- \`pop()\`: removes and returns an item.
- \`sort()\`: sorts the list in place.
- \`reverse()\`: reverses the list in place.

### Indexing and slicing
Access elements using indexes or create a slice with \`items[start:stop]\`.

### Tuples
Tuples are ordered and immutable. They are useful for fixed collections of values and support unpacking.

### Copying lists
Assigning a list to another variable creates another reference to the same list. Use \`copy()\` for a shallow copy.

### Common errors
Invalid indexes raise IndexError. Removing a value that is not present raises ValueError.`,
      codeExample: `tasks = ["Study", "Practice", "Review"]

tasks.append("Build a project")
tasks[1] = "Practice Python"

print(tasks)
print(tasks[0:2])

task_copy = tasks.copy()
task_copy.append("Write tests")

print("Original:", tasks)
print("Copy:", task_copy)

coordinates = (10, 20)
x, y = coordinates

print(f"x = {x}, y = {y}")`,
      quiz: [
        {
          question: 'Which collection is immutable?',
          options: ['List', 'Tuple', 'Set', 'Dictionary'],
          correctAnswer: 1
        },
        {
          question: 'Which list method adds an item to the end?',
          options: ['append()', 'remove()', 'clear()', 'index()'],
          correctAnswer: 0
        }
      ]
    },
    {
      title: 'Module 8: Dictionaries and Sets',
      duration: '3h 00m',
      notes: `### Dictionaries
Dictionaries store key-value pairs. Keys must be hashable, and values can be any type.

### Useful dictionary methods
- \`.get()\`: reads a value with an optional fallback.
- \`.items()\`: returns key-value pairs.
- \`.keys()\`: returns keys.
- \`.values()\`: returns values.
- \`.update()\`: updates entries.
- \`.pop()\`: removes a key and returns its value.

### Sets
Sets store unique hashable values. They are useful for removing duplicates and checking membership.

### Set operations
- Union: \`a | b\`
- Intersection: \`a & b\`
- Difference: \`a - b\`
- Symmetric difference: \`a ^ b\`

### Practical applications
Dictionaries are useful for records and configurations. Sets are useful for unique tags, permissions, and membership checks.`,
      codeExample: `student = {
    "name": "Anas",
    "course": "Software Engineering",
    "semester": 1
}

print(student.get("name"))
print(student.get("email", "Not provided"))

student["semester"] = 2

for key, value in student.items():
    print(f"{key}: {value}")

python_topics = {"variables", "loops", "functions"}
completed_topics = {"variables", "functions", "files"}

print("Completed:", python_topics & completed_topics)
print("Remaining:", python_topics - completed_topics)`,
      quiz: [
        {
          question: 'Which dictionary method provides a fallback for a missing key?',
          options: ['find()', 'get()', 'search()', 'locate()'],
          correctAnswer: 1
        },
        {
          question: 'Which collection automatically stores unique values?',
          options: ['List', 'Tuple', 'Set', 'String'],
          correctAnswer: 2
        }
      ]
    },
    {
      title: 'Module 9: Functions and Scope',
      duration: '3h 00m',
      notes: `### Defining functions
Use \`def\` to define reusable blocks of code. Parameters receive inputs, and return sends a result back to the caller.

### Parameters
Python supports positional arguments, keyword arguments, default parameters, and keyword-only parameters.

### Return values
A function without an explicit return statement returns None.

### Scope
Python uses the LEGB lookup order: Local, Enclosing, Global, and Built-in. Avoid unnecessary global state.

### Type hints and docstrings
Type hints document expected types and help development tools. They are not automatically enforced at runtime. Docstrings explain a function's purpose.

### Mutable default argument pitfall
Do not use a mutable list or dictionary as a default parameter unless shared state is intentional. Use None and create the collection inside the function instead.

### Reusability
Keep functions focused on one responsibility and give them meaningful names.`,
      codeExample: `def calculate_total(prices: list[float], tax_rate: float = 0.0) -> float:
    """Calculate the total after tax."""
    subtotal = sum(prices)
    return subtotal * (1 + tax_rate)

print(calculate_total([100.0, 50.0]))
print(calculate_total([100.0, 50.0], tax_rate=0.05))

def add_item(item, items=None):
    if items is None:
        items = []

    items.append(item)
    return items

print(add_item("Book"))
print(add_item("Pen"))`,
      quiz: [
        {
          question: 'What does a function return if it has no return statement?',
          options: ['0', 'False', 'None', 'An empty list'],
          correctAnswer: 2
        },
        {
          question: 'What does **kwargs collect?',
          options: [
            'Positional arguments in a list',
            'Keyword arguments in a dictionary',
            'Only integers',
            'Function return values'
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      title: 'Module 10: Comprehensions and Functional Tools',
      duration: '2h 30m',
      notes: `### List comprehensions
List comprehensions provide a concise way to create lists from iterables.

### Set and dictionary comprehensions
Use set comprehensions for unique results and dictionary comprehensions for key-value mappings.

### Lambda functions
A lambda is a small anonymous function containing one expression. Use def for complex logic.

### map() and filter()
map applies a function to items in an iterable. filter keeps items that pass a condition. Both return iterators in Python 3.

### Sorting
Use sorted() to create a new sorted list. Use a key function when sorting objects or dictionaries.

### reduce()
The functools.reduce function combines items into a single result. Prefer built-ins such as sum(), min(), and max() when they communicate the intention more clearly.`,
      codeExample: `numbers = [1, 2, 3, 4, 5, 6]

squares = [number ** 2 for number in numbers]
evens = [number for number in numbers if number % 2 == 0]

students = [
    {"name": "Sara", "score": 88},
    {"name": "Ali", "score": 74},
    {"name": "Mina", "score": 95}
]

ranked = sorted(
    students,
    key=lambda student: student["score"],
    reverse=True
)

print("Squares:", squares)
print("Even numbers:", evens)

for student in ranked:
    print(student["name"], student["score"])`,
      quiz: [
        {
          question: 'Which function returns a new sorted list?',
          options: ['sort()', 'sorted()', 'order()', 'rank()'],
          correctAnswer: 1
        },
        {
          question: 'How many expressions can a lambda function contain?',
          options: [
            'Exactly one expression',
            'Unlimited statements',
            'No expressions',
            'Only a return statement'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      title: '11. Modules, Packages, and Virtual Environments',
      duration: '1h 15m',
      notes: `
# Modules, Packages, and Virtual Environments

## 1. What is a module?

A module is a Python file containing reusable code. Instead of writing everything in one file, you can divide your program into smaller files.

For example, create a file named \`calculator.py\`:

\`\`\`python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b
\`\`\`

Create another file named \`main.py\` in the same directory:

\`\`\`python
import calculator

print(calculator.add(10, 5))
print(calculator.subtract(10, 5))
\`\`\`

Output:

\`\`\`text
15
5
\`\`\`

## 2. Importing specific functions

You can import only the functions you need.

\`\`\`python
from calculator import add

print(add(4, 6))
\`\`\`

Avoid importing everything with \`from module import *\` in professional projects because it can make names confusing.

## 3. Built-in modules

Python includes many useful modules.

\`\`\`python
import math
import random
from datetime import date

print(math.sqrt(81))
print(random.randint(1, 10))
print(date.today())
\`\`\`

- \`math\`: mathematical operations.
- \`random\`: pseudo-random values.
- \`datetime\`: dates and times.
- \`pathlib\`: filesystem paths.
- \`json\`: JSON data processing.

## 4. Packages

A package groups related Python modules into a directory. A typical project might look like this:

\`\`\`text
my_project/
    main.py
    utilities/
        __init__.py
        calculator.py
        formatting.py
\`\`\`

You can import a function using:

\`\`\`python
from utilities.calculator import add
\`\`\`

The \`__init__.py\` file is commonly used to mark a directory as a regular Python package.

## 5. Installing third-party packages

Python packages can be installed using pip.

\`\`\`bash
python -m pip install requests
\`\`\`

Check installed packages:

\`\`\`bash
python -m pip list
\`\`\`

## 6. Virtual environments

A virtual environment isolates project dependencies so that different projects can use different package versions.

Create one:

\`\`\`bash
python -m venv .venv
\`\`\`

Activate it on Windows PowerShell:

\`\`\`powershell
.\\.venv\\Scripts\\Activate.ps1
\`\`\`

On Windows Command Prompt:

\`\`\`bat
.venv\\Scripts\\activate.bat
\`\`\`

Install a package inside the environment:

\`\`\`bash
python -m pip install requests
\`\`\`

Save dependencies:

\`\`\`bash
python -m pip freeze > requirements.txt
\`\`\`

Install them later:

\`\`\`bash
python -m pip install -r requirements.txt
\`\`\`

Deactivate the environment with:

\`\`\`bash
deactivate
\`\`\`

## 7. Professional practices

- Use descriptive module names in lowercase.
- Keep each module focused on a clear responsibility.
- Avoid naming your files after standard-library modules, such as \`random.py\` or \`json.py\`.
- Keep virtual environments out of Git; add \`.venv/\` to \`.gitignore\`.
- Keep dependency information in \`requirements.txt\` when appropriate.

## Summary

Modules help you reuse code, packages organize related modules, pip installs external dependencies, and virtual environments isolate project requirements.
`,
      codeExample: `# Example: a reusable module

# calculator.py
def multiply(a, b):
    return a * b

# main.py
from calculator import multiply

result = multiply(7, 8)
print("Result:", result)

# Output:
# Result: 56`,
      quiz: [
        {
          question: 'What is a Python module?',
          options: [
            'A Python file containing reusable code',
            'A type of loop',
            'A database table',
            'A browser extension'
          ],
          correctAnswer: 0
        },
        {
          question: 'Which command creates a virtual environment named .venv?',
          options: [
            'pip create .venv',
            'python -m venv .venv',
            'python install venv',
            'venv --remove'
          ],
          correctAnswer: 1
        },
        {
          question: 'Which command saves installed package versions to requirements.txt?',
          options: [
            'python --save requirements.txt',
            'pip list > install',
            'python -m pip freeze > requirements.txt',
            'python -m requirements save'
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      title: '12. Exception Handling and Debugging',
      duration: '1h 20m',
      notes: `
# Exception Handling and Debugging

## 1. Errors and exceptions

Errors can stop a program from running correctly. Common examples include:

- \`SyntaxError\`: invalid Python syntax.
- \`NameError\`: using a name that has not been defined.
- \`TypeError\`: using an operation with an incompatible type.
- \`ValueError\`: a value has the wrong form.
- \`ZeroDivisionError\`: dividing a number by zero.
- \`FileNotFoundError\`: attempting to open a file that does not exist.

Example:

\`\`\`python
number = int("hello")
\`\`\`

This raises a \`ValueError\` because "hello" cannot be converted into an integer.

## 2. Using try and except

Use \`try\` to run code that might fail and \`except\` to handle a specific exception.

\`\`\`python
try:
    age = int(input("Enter your age: "))
    print("Next year:", age + 1)
except ValueError:
    print("Please enter a valid whole number.")
\`\`\`

If the user enters \`eighteen\`, the program handles the invalid input instead of terminating with an unhandled exception.

## 3. Handling multiple exception types

You can handle different exceptions separately.

\`\`\`python
try:
    number = int(input("Enter a number: "))
    result = 100 / number
except ValueError:
    print("Enter a valid integer.")
except ZeroDivisionError:
    print("The number cannot be zero.")
else:
    print("Result:", result)
finally:
    print("Operation finished.")
\`\`\`

- \`else\` runs when the \`try\` block completes without an exception.
- \`finally\` runs whether an exception occurred or not.

## 4. Raising exceptions

Use \`raise\` when your program detects an invalid situation.

\`\`\`python
def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("Amount must be positive.")

    if amount > balance:
        raise ValueError("Insufficient balance.")

    return balance - amount

print(withdraw(1000, 250))
\`\`\`

The function rejects invalid withdrawals rather than silently returning an incorrect result.

## 5. Custom exceptions

You can define an exception for a specific application rule.

\`\`\`python
class InsufficientBalanceError(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientBalanceError(
            "Not enough money in the account."
        )

    return balance - amount
\`\`\`

Custom exceptions are useful when built-in exception types do not clearly communicate a business rule.

## 6. Debugging with print and logging

A quick way to inspect a value is to print it.

\`\`\`python
total = 25 * 4
print("Debug total:", total)
\`\`\`

For larger programs, use the logging module:

\`\`\`python
import logging

logging.basicConfig(level=logging.INFO)

logging.info("Application started")
logging.warning("A recoverable problem occurred")
\`\`\`

Logging supports severity levels, filtering, and configurable output.

## 7. Debugging in VS Code

1. Open your Python project folder.
2. Select the Python interpreter.
3. Set a breakpoint by clicking beside a line number.
4. Start debugging with the Run and Debug panel.
5. Step through statements and inspect variables.
6. Read the traceback to identify where the exception originated.

A traceback is often the fastest way to locate a failure. Start with the last relevant line and follow the call chain when necessary.

## 8. Professional exception-handling rules

- Catch specific exceptions instead of using a bare \`except:\`.
- Do not silently ignore failures.
- Provide useful messages without exposing passwords, tokens, or internal secrets.
- Avoid using exceptions as a replacement for ordinary conditional logic.
- Log enough information to diagnose problems while protecting sensitive data.

## Summary

Exception handling allows applications to respond safely to expected failures. Debugging tools, tracebacks, logging, and meaningful exception types help you diagnose problems and maintain reliable software.
`,
      codeExample: `def divide_numbers(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("Error: division by zero is not allowed.")
        return None

print(divide_numbers(10, 2))
print(divide_numbers(10, 0))

# Output:
# 5.0
# Error: division by zero is not allowed.
# None`,
      quiz: [
        {
          question: 'Which exception commonly occurs when int("hello") is evaluated?',
          options: [
            'TypeError',
            'ValueError',
            'KeyError',
            'IndexError'
          ],
          correctAnswer: 1
        },
        {
          question: 'When does a finally block normally execute?',
          options: [
            'Only when an exception occurs',
            'Only when no exception occurs',
            'Whether or not an exception occurs',
            'Only when the program starts'
          ],
          correctAnswer: 2
        },
        {
          question: 'Which keyword is used to deliberately raise an exception?',
          options: [
            'throw',
            'error',
            'catch',
            'raise'
          ],
          correctAnswer: 3
        }
      ]
    },
    {
      title: '13. File Handling and Filesystem Paths',
      duration: '1h 25m',
      notes: `
# File Handling and Filesystem Paths

## 1. Why files matter

Programs often need to save information after they stop running. Files can store reports, settings, text, logs, and exported data.

Python's built-in \`open()\` function opens a file.

## 2. Writing a text file

\`\`\`python
with open("notes.txt", "w", encoding="utf-8") as file:
    file.write("Learning Python\\n")
    file.write("Practicing file handling\\n")
\`\`\`

The \`w\` mode creates a file if it does not exist and replaces its existing contents if it does.

## 3. Reading a file

\`\`\`python
with open("notes.txt", "r", encoding="utf-8") as file:
    content = file.read()

print(content)
\`\`\`

Other useful reading methods include:

- \`read()\`: reads the remaining contents as one string.
- \`readline()\`: reads one line.
- \`readlines()\`: returns the remaining lines as a list.
- Iterating over the file: processes it one line at a time.

\`\`\`python
with open("notes.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())
\`\`\`

## 4. File modes

| Mode | Meaning |
| --- | --- |
| \`r\` | Read an existing file |
| \`w\` | Write, replacing existing contents |
| \`a\` | Append to the end |
| \`x\` | Create a new file; fail if it exists |
| \`b\` | Binary mode modifier |
| \`+\` | Read and write modifier |

For example, append a new line:

\`\`\`python
with open("notes.txt", "a", encoding="utf-8") as file:
    file.write("New topic added\\n")
\`\`\`

## 5. Why use with?

The \`with\` statement manages the file's lifetime and closes it automatically, including when an exception occurs.

Prefer this:

\`\`\`python
with open("notes.txt", encoding="utf-8") as file:
    print(file.read())
\`\`\`

over manually opening a file and remembering to close it.

## 6. Filesystem paths with pathlib

The \`pathlib\` module provides an object-oriented way to work with paths.

\`\`\`python
from pathlib import Path

path = Path("data") / "report.txt"

print(path.name)
print(path.suffix)
print(path.exists())
\`\`\`

Create a directory:

\`\`\`python
Path("data").mkdir(parents=True, exist_ok=True)
\`\`\`

Write and read text:

\`\`\`python
path = Path("data") / "report.txt"
path.write_text("Monthly report", encoding="utf-8")

content = path.read_text(encoding="utf-8")
print(content)
\`\`\`

## 7. Handling file errors

A file may be missing, inaccessible, or located somewhere unexpected.

\`\`\`from pathlib import Path

path = Path("notes.txt")

try:
    content = path.read_text(encoding="utf-8")
except FileNotFoundError:
    print("The requested file does not exist.")
except PermissionError:
    print("You do not have permission to read this file.")
else:
    print(content)
\`\`\`

## 8. Working with binary files

Use binary mode for images, PDFs, and other non-text data.

\`\`\`python
with open("source.bin", "rb") as source:
    data = source.read()

with open("copy.bin", "wb") as destination:
    destination.write(data)
\`\`\`

Do not assume binary files can be decoded as UTF-8 text.

## 9. Safe and professional file handling

- Specify an encoding such as UTF-8 when working with text.
- Use \`with\` to manage file handles.
- Validate filenames and paths when accepting user input.
- Avoid overwriting important files unintentionally.
- Handle expected filesystem exceptions.
- Do not store passwords or API secrets in plain-text files committed to a public repository.

## Summary

File handling lets applications persist information. Understanding file modes, context managers, exceptions, and \`pathlib\` prepares you to build useful command-line tools and data-driven applications.
`,
      codeExample: `from pathlib import Path

folder = Path("data")
folder.mkdir(exist_ok=True)

file_path = folder / "student.txt"
file_path.write_text(
    "Student: Anas\\nCourse: Python",
    encoding="utf-8"
)

content = file_path.read_text(encoding="utf-8")
print(content)

# Output:
# Student: Anas
# Course: Python`,
      quiz: [
        {
          question: 'Which file mode replaces existing file contents?',
          options: [
            'r',
            'a',
            'w',
            'x'
          ],
          correctAnswer: 2
        },
        {
          question: 'What is the main benefit of using with open(...)?',
          options: [
            'It automatically closes the file when the block exits',
            'It encrypts every file',
            'It prevents all possible file errors',
            'It converts every file into JSON'
          ],
          correctAnswer: 0
        },
        {
          question: 'Which module provides the Path class?',
          options: [
            'os.pathfile',
            'pathlib',
            'filesystem',
            'filetools'
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      title: '14. Object-Oriented Programming Fundamentals',
      duration: '1h 30m',
      notes: `
# Object-Oriented Programming Fundamentals

## 1. What is OOP?

Object-Oriented Programming (OOP) organizes code around objects that combine data and behavior.

The four commonly discussed OOP principles are:
- Encapsulation: keeping data and related behavior together.
- Inheritance: deriving a class from another class.
- Polymorphism: using a common interface for different implementations.
- Abstraction: exposing essential behavior while hiding implementation details.

## 2. Classes and objects

A class defines the structure and behavior of objects. An object is an instance of a class.

\`\`\`python
class Student:
    def introduce(self):
        print("Hello, I am a student.")

student1 = Student()
student1.introduce()
\`\`\`

Output:

\`\`\`text
Hello, I am a student.
\`\`\`

## 3. The __init__ method

The \`__init__\` method initializes a newly created instance.

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"My name is {self.name} and I am {self.age}.")

student = Student("Ali", 19)
student.introduce()
\`\`\`

Here:
- \`self\` refers to the current instance.
- \`name\` and \`age\` are parameters.
- \`self.name\` and \`self.age\` are instance attributes.

## 4. Instance attributes and methods

Attributes store information; methods define behavior.

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive.")
        self.balance += amount

    def get_balance(self):
        return self.balance

account = BankAccount("Sara", 1000)
account.deposit(500)
print(account.get_balance())
\`\`\`

Output:

\`\`\`text
1500
\`\`\`

## 5. Class attributes

Class attributes are shared through the class unless an instance overrides them.

\`\`\`python
class Student:
    university = "IUB"

    def __init__(self, name):
        self.name = name

first = Student("Ali")
second = Student("Sara")

print(first.university)
print(second.university)
\`\`\`

Use class attributes for information that belongs to the class as a whole. Use instance attributes for data that differs between objects.

## 6. Encapsulation and properties

Python does not enforce strict private attributes in the same way as some languages. A leading underscore conventionally indicates an internal attribute.

Properties let you control how an attribute is accessed.

\`\`\`python
class Product:
    def __init__(self, price):
        self.price = price

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price cannot be negative.")
        self._price = value

product = Product(100)
product.price = 150
print(product.price)
\`\`\`

## 7. Composition

Composition means building an object using other objects.

\`\`\`python
class Engine:
    def start(self):
        print("Engine started")

class Car:
    def __init__(self):
        self.engine = Engine()

    def start(self):
        self.engine.start()
        print("Car is ready")

car = Car()
car.start()
\`\`\`

Composition is often preferable when objects have a relationship such as "has a" rather than "is a."

## 8. When should you use OOP?

OOP is helpful when a program has related entities with state and behavior, such as students, products, orders, or bank accounts. Small scripts do not always need classes.

## Summary

Classes define objects, instances hold their own state, methods implement behavior, and encapsulation and composition help organize maintainable programs.
`,
      codeExample: `class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def result(self):
        status = "Pass" if self.marks >= 50 else "Fail"
        return f"{self.name}: {status}"

student = Student("Ali", 82)
print(student.result())

# Output:
# Ali: Pass`,
      quiz: [
        {
          question: 'What is a class in Python?',
          options: [
            'A blueprint for creating objects',
            'A loop that repeats forever',
            'A file-reading mode',
            'A type of exception'
          ],
          correctAnswer: 0
        },
        {
          question: 'What does self usually refer to in an instance method?',
          options: [
            'The parent class only',
            'The current instance',
            'The Python interpreter',
            'A global variable'
          ],
          correctAnswer: 1
        },
        {
          question: 'Which OOP concept combines related data and behavior?',
          options: [
            'Iteration',
            'Compilation',
            'Encapsulation',
            'String formatting'
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      title: '15. Inheritance, Polymorphism, and Data Classes',
      duration: '1h 35m',
      notes: `
# Inheritance, Polymorphism, and Data Classes

## 1. What is inheritance?

Inheritance allows a class to extend or specialize another class.

\`\`\`python
class Animal:
    def speak(self):
        print("An animal makes a sound.")

class Dog(Animal):
    def bark(self):
        print("Woof!")

dog = Dog()
dog.speak()
dog.bark()
\`\`\`

The \`Dog\` class inherits the \`speak()\` method from \`Animal\`.

## 2. Overriding methods

A child class can provide its own implementation of an inherited method.

\`\`\`python
class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof"

class Cat(Animal):
    def speak(self):
        return "Meow"

for animal in [Dog(), Cat()]:
    print(animal.speak())
\`\`\`

Output:

\`\`\`text
Woof
Meow
\`\`\`

This demonstrates polymorphism: different object types respond to the same method call in their own ways.

## 3. Using super()

Use \`super()\` to call behavior from a parent class.

\`\`\`python
class Person:
    def __init__(self, name):
        self.name = name

class Student(Person):
    def __init__(self, name, student_id):
        super().__init__(name)
        self.student_id = student_id

student = Student("Sara", "SE101")
print(student.name, student.student_id)
\`\`\`

Output:

\`\`\`text
Sara SE101
\`\`\`

## 4. isinstance and method design

Use \`isinstance()\` when checking whether an object belongs to a class or its subclasses.

\`\`\`python
class Animal:
    pass

class Dog(Animal):
    pass

dog = Dog()
print(isinstance(dog, Dog))
print(isinstance(dog, Animal))
\`\`\`

Both expressions print \`True\`.

In Python, polymorphism often works without explicitly checking types. If an object supports the operation you need, your function can often use it directly.

## 5. Abstract base classes

The \`abc\` module lets you define abstract interfaces that subclasses must implement.

\`\`\`python
from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

class CardPayment(PaymentMethod):
    def pay(self, amount):
        return f"Paid {amount} by card"

payment = CardPayment()
print(payment.pay(500))
\`\`\`

A class that has not implemented all required abstract methods cannot be instantiated.

## 6. Data classes

A data class is useful for objects mainly intended to store data. Python can automatically generate methods such as \`__init__\` and \`__repr__\`.

\`\`\`python
from dataclasses import dataclass

@dataclass
class Course:
    title: str
    duration_hours: int
    published: bool = False

course = Course("Python Basics", 12)
print(course)
\`\`\`

Example output:

\`\`\`text
Course(title='Python Basics', duration_hours=12, published=False)
\`\`\`

## 7. Inheritance versus composition

Inheritance expresses an "is a" relationship, such as a Dog being an Animal. Composition expresses a "has a" relationship, such as a Car having an Engine.

Do not build long inheritance chains without a clear reason. Composition can be easier to maintain when behaviors need to be combined flexibly.

## 8. Professional design guidelines

- Give each class a clear responsibility.
- Avoid duplicating behavior across subclasses.
- Prefer clear method names and small methods.
- Use abstract classes when a shared interface needs enforcement.
- Use data classes for straightforward data containers.
- Add tests for important class behavior.

## Summary

Inheritance reuses and specializes behavior, polymorphism enables common interfaces, abstract base classes define contracts, and data classes simplify data-focused objects.
`,
      codeExample: `from dataclasses import dataclass

@dataclass
class Employee:
    name: str
    salary: int

class Manager(Employee):
    def describe(self):
        return f"{self.name} manages a team."

manager = Manager("Ayesha", 80000)
print(manager.describe())
print(manager.salary)

# Output:
# Ayesha manages a team.
# 80000`,
      quiz: [
        {
          question: 'Which function calls a method implementation from a parent class?',
          options: [
            'parent()',
            'super()',
            'inherit()',
            'base()'
          ],
          correctAnswer: 1
        },
        {
          question: 'What is polymorphism?',
          options: [
            'Converting every value into a string',
            'Preventing classes from having methods',
            'Different types responding to a common operation',
            'A way to delete Python packages'
          ],
          correctAnswer: 2
        },
        {
          question: 'What does @dataclass commonly generate automatically?',
          options: [
            'Methods such as __init__ and __repr__',
            'A web server',
            'A database connection',
            'A virtual environment'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      title: '16. Iterators, Generators, and Decorators',
      duration: '1h 40m',
      notes: `
# Iterators, Generators, and Decorators

## 1. Iterables and iterators

An iterable is an object you can loop over, such as a list, tuple, or string. An iterator produces values one at a time.

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
print(next(iterator))
\`\`\`

Output:

\`\`\`text
10
20
30
\`\`\`

Calling \`next()\` after the iterator is exhausted raises \`StopIteration\`. A normal \`for\` loop handles this process automatically.

## 2. Creating a custom iterator

A custom iterator implements \`__iter__()\` and \`__next__()\`.

\`\`\`python
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration

        value = self.current
        self.current -= 1
        return value

for number in Countdown(3):
    print(number)
\`\`\`

Output:

\`\`\`text
3
2
1
\`\`\`

## 3. Generators

Generators make iterator creation simpler. A function containing \`yield\` produces values one at a time and preserves its state between yields.

\`\`\`python
def count_up_to(limit):
    number = 1
    while number <= limit:
        yield number
        number += 1

for value in count_up_to(3):
    print(value)
\`\`\`

A generator can be memory-efficient because it does not need to build a complete list of results in advance.

## 4. Generator expressions

Generator expressions resemble list comprehensions but use parentheses.

\`\`\`python
squares = (number ** 2 for number in range(1, 6))

for square in squares:
    print(square)
\`\`\`

A generator is generally consumed as you iterate over it. If you need to reuse all values multiple times, a list may be more appropriate.

## 5. What is a decorator?

A decorator takes a function or class and returns a replacement or enhanced version. Decorators are often used for logging, timing, validation, and authorization.

\`\`\`python
def announce(function):
    def wrapper():
        print("Starting function")
        function()
        print("Function finished")
    return wrapper

@announce
def greet():
    print("Hello!")

greet()
\`\`\`

Output:

\`\`\`text
Starting function
Hello!
Function finished
\`\`\`

The syntax \`@announce\` is equivalent to assigning the decorated function using \`greet = announce(greet)\`.

## 6. Preserving function metadata

Use \`functools.wraps\` to preserve useful metadata such as the wrapped function's name and docstring.

\`\`\`python
from functools import wraps

def announce(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        print("Calling:", function.__name__)
        return function(*args, **kwargs)
    return wrapper

@announce
def add(a, b):
    return a + b

print(add(3, 4))
\`\`\`

The wrapper accepts arbitrary positional and keyword arguments and returns the original function's result.

## 7. Decorators with arguments

A decorator can accept configuration by using an outer function.

\`\`\`python
from functools import wraps

def repeat(times):
    def decorator(function):
        @wraps(function)
        def wrapper(*args, **kwargs):
            result = None
            for _ in range(times):
                result = function(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet():
    print("Hello")

greet()
\`\`\`

This calls \`greet()\` three times. The returned result is from the final call.

## 8. Practical considerations

- Use generators when producing a stream of values.
- Avoid consuming large iterables repeatedly without considering performance.
- Keep decorators focused on one responsibility.
- Preserve return values and function metadata.
- Be careful with exceptions inside wrappers; unexpected errors should not be silently swallowed.

## Summary

Iterators produce values one at a time, generators make lazy iteration easier, and decorators extend functions without changing their main implementation.
`,
      codeExample: `from functools import wraps

def log_call(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        print(f"Calling {function.__name__}")
        return function(*args, **kwargs)
    return wrapper

@log_call
def multiply(a, b):
    return a * b

print(multiply(6, 7))

# Output:
# Calling multiply
# 42`,
      quiz: [
        {
          question: 'Which keyword is used to produce values from a generator function?',
          options: [
            'yield',
            'emit',
            'generate',
            'pause'
          ],
          correctAnswer: 0
        },
        {
          question: 'What does next(iterator) do?',
          options: [
            'Deletes the iterator',
            'Returns the next available value',
            'Sorts every value',
            'Restarts iteration from the beginning'
          ],
          correctAnswer: 1
        },
        {
          question: 'What is a common purpose of a decorator?',
          options: [
            'To install Python',
            'To replace every loop with recursion',
            'To enhance or wrap a function',
            'To automatically create a database'
          ],
          correctAnswer: 2
        }
      ]
    },
      {
      title: '17. Type Hints and Modern Python',
      duration: '1h 30m',
      notes: `
# Type Hints and Modern Python

## 1. What are type hints?

Type hints describe the kinds of values a function expects and returns. They improve readability and help editors and static type checkers detect potential mistakes.

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b

print(add(5, 3))
\`\`\`

Output:

\`\`\`text
8
\`\`\`

Python does not automatically enforce these annotations at runtime. They are primarily documentation and tooling aids.

## 2. Common type annotations

\`\`\`python
name: str = "Anas"
age: int = 18
price: float = 99.5
is_active: bool = True
\`\`\`

Function examples:

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}"

def calculate_total(price: float, quantity: int) -> float:
    return price * quantity
\`\`\`

## 3. Typing collections

Modern Python supports built-in generic types.

\`\`\`python
def average(numbers: list[float]) -> float:
    return sum(numbers) / len(numbers)

scores: list[int] = [75, 80, 92]
student: dict[str, int] = {
    "Ali": 80,
    "Sara": 95
}
\`\`\`

For Python 3.9 and later, forms such as \`list[int]\` and \`dict[str, int]\` are supported.

## 4. Optional values and unions

Use a union when a value can have more than one type.

\`\`\`python
def find_user(user_id: int) -> str | None:
    if user_id == 1:
        return "Ali"
    return None

print(find_user(1))
print(find_user(99))
\`\`\`

The return type \`str | None\` means the function can return a string or \`None\`. This syntax requires Python 3.10 or later.

## 5. Type aliases

A type alias gives a reusable name to a type.

\`\`\`python
type StudentRecord = dict[str, str | int]

student: StudentRecord = {
    "name": "Sara",
    "marks": 92
}
\`\`\`

The \`type\` statement for aliases was introduced in Python 3.12. On older Python versions, you can use \`StudentRecord = dict[str, str | int]\` where the underlying type syntax is supported.

## 6. Typed data classes

Combine type hints with data classes for structured records.

\`\`\`python
from dataclasses import dataclass

@dataclass
class Product:
    name: str
    price: float
    in_stock: bool = True

product = Product("Keyboard", 2500.0)
print(product)
\`\`\`

Type hints do not automatically validate that a supplied price is positive. Add explicit validation if your application requires it.

## 7. Protocols and structural typing

A protocol describes the methods or attributes an object should provide, without requiring it to inherit from a particular base class.

\`\`\`python
from typing import Protocol

class Printable(Protocol):
    def display(self) -> str:
        ...

def show(item: Printable) -> None:
    print(item.display())

class Report:
    def display(self) -> str:
        return "Monthly report"

show(Report())
\`\`\`

Static type checkers can use this protocol to check whether an object supports the expected interface.

## 8. Modern Python practices

- Add type hints to public functions and important data structures.
- Keep annotations accurate when changing function behavior.
- Use \`None\` explicitly when a value may be absent.
- Consider tools such as mypy or Pyright for static checking.
- Do not assume type hints replace runtime validation of untrusted input.

## Summary

Type hints communicate intent, improve editor support, and help static analysis tools find mistakes. They are particularly useful as projects grow.
`,
      codeExample: `def calculate_average(scores: list[int]) -> float | None:
    if not scores:
        return None

    return sum(scores) / len(scores)

marks = [80, 90, 70]
average = calculate_average(marks)

print(average)

# Output:
# 80.0`,
      quiz: [
        {
          question: 'What does -> int usually indicate in a function definition?',
          options: [
            'The function must be called with an integer name',
            'The function is expected to return an integer',
            'The function cannot return a value',
            'Python automatically converts every result to an integer'
          ],
          correctAnswer: 1
        },
        {
          question: 'What does str | None represent in modern Python type hints?',
          options: [
            'A string containing the word None',
            'A list of strings',
            'Either a string or None',
            'An integer or a float'
          ],
          correctAnswer: 2
        },
        {
          question: 'Do type hints automatically enforce all types at runtime?',
          options: [
            'No, not by themselves',
            'Yes, in every Python program',
            'Only when using print()',
            'Only inside loops'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      title: '18. Testing and Code Quality',
      duration: '1h 40m',
      notes: `
# Testing and Code Quality

## 1. Why test software?

Testing checks whether a program behaves as expected. It helps detect regressions when code changes.

Common testing levels include:
- Unit testing: checks a small function or component.
- Integration testing: checks how components work together.
- End-to-end testing: checks a complete user workflow.

## 2. Assertions

An assertion checks a condition and raises AssertionError if the condition is false.

\`\`\`python
def add(a, b):
    return a + b

assert add(2, 3) == 5
assert add(-1, 1) == 0
\`\`\`

Assertions are useful in tests, but they should not be used as the only validation for important production input because Python can disable assertions with optimization settings.

## 3. Unit testing with unittest

Python includes a testing framework called \`unittest\`.

Create a file named \`test_calculator.py\`:

\`\`\`python
import unittest

def add(a, b):
    return a + b

class TestCalculator(unittest.TestCase):
    def test_add_positive_numbers(self):
        self.assertEqual(add(2, 3), 5)

    def test_add_negative_number(self):
        self.assertEqual(add(-2, 2), 0)

if __name__ == "__main__":
    unittest.main()
\`\`\`

Run the tests:

\`\`\`bash
python -m unittest test_calculator.py
\`\`\`

If all tests pass, the framework reports success. If one fails, it displays information about the failure.

## 4. Testing exceptions

Test that invalid operations raise the expected exception.

\`\`\`python
import unittest

def withdraw(balance, amount):
    if amount < 0:
        raise ValueError("Amount cannot be negative")
    return balance - amount

class TestWithdraw(unittest.TestCase):
    def test_negative_amount(self):
        with self.assertRaises(ValueError):
            withdraw(100, -5)
\`\`\`

Testing error conditions is as important as testing normal behavior.

## 5. Test-driven development

Test-driven development (TDD) commonly follows this cycle:

1. Write a test describing the desired behavior.
2. Run it and confirm that it fails for the expected reason.
3. Implement the smallest change that makes it pass.
4. Refactor while keeping the tests passing.

This is often called Red, Green, Refactor.

## 6. Code quality and formatting

Readable code is easier to maintain.

Prefer:

\`\`\`python
def calculate_total(price, quantity):
    return price * quantity
\`\`\`

over a compressed, unclear expression.

Helpful tools include:
- \`ruff\`: linting and many code-quality checks.
- \`black\`: automatic code formatting.
- \`mypy\`: static type checking.
- \`pytest\`: a popular third-party testing framework.

Install tools in a project virtual environment:

\`\`\`bash
python -m pip install pytest ruff
\`\`\`

Run them:

\`\`\`bash
python -m pytest
python -m ruff check .
\`\`\`

## 7. Test edge cases

A good test suite covers more than one ordinary input.

For a function that calculates an average, consider:
- A normal list of values.
- A list containing one value.
- Negative values, if permitted.
- An empty list.
- Unexpected input types, when relevant.

The expected behavior for every edge case should be clearly defined.

## 8. Maintainable projects

- Keep tests separate from application code when appropriate.
- Use descriptive test names.
- Make tests repeatable and independent.
- Avoid relying on live services for every unit test.
- Never include real passwords or API keys in test files.
- Run tests before pushing important changes.

## Summary

Testing verifies behavior, catches regressions, and supports confident refactoring. Formatting, linting, and meaningful tests are essential parts of professional development.
`,
      codeExample: `import unittest

def multiply(a, b):
    return a * b

class TestMultiply(unittest.TestCase):
    def test_positive_numbers(self):
        self.assertEqual(multiply(3, 4), 12)

    def test_zero(self):
        self.assertEqual(multiply(9, 0), 0)

if __name__ == "__main__":
    unittest.main()

# Run:
# python -m unittest test_calculator.py`,
      quiz: [
        {
          question: 'What is the main purpose of a unit test?',
          options: [
            'To publish an application',
            'To check a small unit of behavior',
            'To install a database',
            'To design a website layout'
          ],
          correctAnswer: 1
        },
        {
          question: 'Which command runs Python unittest tests in a file named test_calculator.py?',
          options: [
            'python test --all',
            'pip unittest test_calculator.py',
            'python -m unittest test_calculator.py',
            'python --run-tests-only'
          ],
          correctAnswer: 2
        },
        {
          question: 'What does TDD stand for?',
          options: [
            'Test-Driven Development',
            'Technical Data Deployment',
            'Type-Defined Design',
            'Test Database Directory'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      title: '19. Algorithms and Big-O Basics',
      duration: '1h 45m',
      notes: `
# Algorithms and Big-O Basics

## 1. What is an algorithm?

An algorithm is a sequence of steps used to solve a problem.

Examples include:
- Finding a value in a list.
- Sorting records by score.
- Finding the shortest path in a graph.
- Searching a database for matching records.

Good algorithms aim to produce correct results while using reasonable time and memory.

## 2. Time complexity

Big-O notation describes how an algorithm's resource usage grows as input size increases. It commonly expresses an upper-bound growth rate while ignoring constants and lower-order terms.

Common complexities include:

| Complexity | Name | Example |
| --- | --- | --- |
| O(1) | Constant | Accessing a list element by index |
| O(log n) | Logarithmic | Binary search on sorted data |
| O(n) | Linear | Scanning a list |
| O(n log n) | Linearithmic | Typical efficient comparison sorting |
| O(n²) | Quadratic | Comparing every pair in a simple nested loop |

These are simplified examples; actual complexity depends on the operation and its assumptions.

## 3. Linear search

Linear search checks elements one at a time.

\`\`\`python
def linear_search(items, target):
    for index, item in enumerate(items):
        if item == target:
            return index
    return -1

print(linear_search([4, 8, 12, 16], 12))
\`\`\`

Output:

\`\`\`text
2
\`\`\`

In the worst case, linear search examines every element, so its time complexity is O(n).

## 4. Binary search

Binary search repeatedly halves a sorted search range.

\`\`\`python
def binary_search(items, target):
    left = 0
    right = len(items) - 1

    while left <= right:
        middle = (left + right) // 2

        if items[middle] == target:
            return middle
        if items[middle] < target:
            left = middle + 1
        else:
            right = middle - 1

    return -1

print(binary_search([2, 4, 6, 8, 10, 12], 8))
\`\`\`

Output:

\`\`\`text
3
\`\`\`

Binary search requires sorted input. Its time complexity is O(log n), and this iterative implementation uses O(1) auxiliary space.

## 5. Sorting

Python provides the built-in \`sorted()\` function, which returns a new sorted list.

\`\`\`python
scores = [75, 92, 60, 88]

print(sorted(scores))
print(sorted(scores, reverse=True))
\`\`\`

Output:

\`\`\`text
[60, 75, 88, 92]
[92, 88, 75, 60]
\`\`\`

The list method \`sort()\` sorts a list in place and returns \`None\`.

Python's sorting algorithm, Timsort, has O(n log n) worst-case time complexity and can perform especially well on partially ordered data.

## 6. Space complexity

Space complexity describes how additional memory requirements grow with input size.

For example:

\`\`\`python
def total(numbers):
    result = 0
    for number in numbers:
        result += number
    return result
\`\`\`

This function uses a constant amount of extra storage, so its auxiliary space complexity is O(1), excluding the input.

A function that creates a second list containing every input element may require O(n) additional space.

## 7. Nested loops

Consider:

\`\`\`python
def print_pairs(items):
    for first in items:
        for second in items:
            print(first, second)
\`\`\`

For n elements, the body runs n multiplied by n times, giving O(n²) time complexity.

Nested loops are not automatically quadratic in every program; the number of iterations of each loop determines the analysis.

## 8. Choosing the right data structure

- Lists provide ordered collections and efficient indexed access.
- Dictionaries provide average-case O(1) key lookup under typical hashing assumptions.
- Sets provide efficient average-case membership tests.
- Heaps help manage priorities.
- Queues support first-in, first-out processing.

Choose structures based on the operations your program performs most often.

## 9. Practical algorithm analysis

When evaluating an algorithm:
1. Define the input size.
2. Count the operations that grow with that size.
3. Identify the dominant growth term.
4. Consider both time and auxiliary space.
5. Check whether the algorithm's assumptions are satisfied.

## Summary

Algorithm analysis helps predict how software scales. Learn to compare growth rates, select suitable data structures, and choose algorithms that meet your performance requirements.
`,
      codeExample: `def binary_search(items, target):
    left = 0
    right = len(items) - 1

    while left <= right:
        middle = (left + right) // 2

        if items[middle] == target:
            return middle
        elif items[middle] < target:
            left = middle + 1
        else:
            right = middle - 1

    return -1

numbers = [10, 20, 30, 40, 50]
print(binary_search(numbers, 40))

# Output:
# 3`,
      quiz: [
        {
          question: 'What is the worst-case time complexity of linear search?',
          options: [
            'O(1)',
            'O(log n)',
            'O(n)',
            'O(n²)'
          ],
          correctAnswer: 2
        },
        {
          question: 'What condition must be satisfied before using ordinary binary search?',
          options: [
            'The input must contain only strings',
            'The input must be sorted',
            'The input must have an even length',
            'The input must contain no duplicate values'
          ],
          correctAnswer: 1
        },
        {
          question: 'What does list.sort() do?',
          options: [
            'Sorts the list in place and returns None',
            'Always returns a new sorted list',
            'Deletes all duplicate values',
            'Sorts a dictionary by default'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      title: '20. Regular Expressions and Text Processing',
      duration: '1h 30m',
      notes: `
# Regular Expressions and Text Processing

## 1. What are regular expressions?

Regular expressions (regex) are patterns used to search, validate, extract, and replace text. Python provides the built-in \`re\` module.

\`\`\`python
import re

text = "Learn Python in 2026"
match = re.search(r"Python", text)

if match:
    print("Found:", match.group())
\`\`\`

Output:

\`\`\`text
Found: Python
\`\`\`

## 2. Common regex functions

- \`re.search()\`: finds the first match anywhere in the text.
- \`re.match()\`: checks for a match at the beginning.
- \`re.fullmatch()\`: checks whether the entire string matches.
- \`re.findall()\`: returns all non-overlapping matches.
- \`re.sub()\`: replaces matching text.
- \`re.split()\`: splits text using a pattern.

## 3. Pattern characters

| Pattern | Meaning |
| --- | --- |
| \`\\d\` | A digit |
| \`\\w\` | A word character |
| \`\\s\` | Whitespace |
| \`.\` | Any character except newline by default |
| \`^\` | Start of string or line, depending on flags |
| \`$\` | End of string or line, depending on flags |
| \`+\` | One or more repetitions |
| \`*\` | Zero or more repetitions |
| \`?\` | Zero or one repetition |
| \`{3}\` | Exactly three repetitions |
| \`[abc]\` | One character from the set |

Use raw strings such as \`r"\\d+"\` so Python does not interpret backslashes as ordinary string escapes.

## 4. Extracting numbers

\`\`\`python
import re

text = "Order 104 costs 250 rupees"
numbers = re.findall(r"\\d+", text)

print(numbers)
\`\`\`

Output:

\`\`\`text
['104', '250']
\`\`\`

The matches are strings. Convert them to integers if numeric calculations are required.

## 5. Replacing text

\`\`\`python
import re

message = "Python is difficult. Python is powerful."
updated = re.sub(r"Python", "Programming", message)

print(updated)
\`\`\`

Output:

\`\`\`text
Programming is difficult. Programming is powerful.
\`\`\`

You can use a replacement count to limit the number of substitutions.

## 6. Validating input

A simple pattern can validate a basic format.

\`\`\`python
import re

def valid_code(value):
    return re.fullmatch(r"[A-Z]{2}\\d{4}", value) is not None

print(valid_code("SE1234"))
print(valid_code("se1234"))
\`\`\`

Output:

\`\`\`text
True
False
\`\`\`

This pattern requires two uppercase letters followed by four digits.

Regex can check format, but it cannot prove that an email address exists or that a phone number is active. For complex formats, use appropriate validation libraries and business rules.

## 7. Groups and named groups

Parentheses capture parts of a match.

\`\`\`python
import re

text = "Student: Ali, ID: SE1234"
match = re.search(
    r"Student: (?P<name>\\w+), ID: (?P<id>\\w+)",
    text
)

if match:
    print(match.group("name"))
    print(match.group("id"))
\`\`\`

Named groups make extracted data easier to understand.

## 8. Cleaning text

\`\`\`python
import re

def normalize_text(text):
    text = text.lower().strip()
    text = re.sub(r"\\s+", " ", text)
    return text

print(normalize_text("  Learn   PYTHON   today  "))
\`\`\`

Output:

\`\`\`text
learn python today
\`\`\`

## 9. Regex safety and performance

- Prefer raw strings for regex patterns.
- Test patterns against both valid and invalid examples.
- Avoid unnecessarily complicated expressions.
- Be careful with patterns that can cause excessive backtracking on untrusted input.
- Use ordinary string methods when they are simpler than regex.

## Summary

Regular expressions provide powerful text-search and transformation tools. Learn common pattern symbols, matching functions, groups, and safe input validation.
`,
      codeExample: `import re

text = "Ali scored 85 marks and Sara scored 92 marks"

names = re.findall(r"[A-Z][a-z]+", text)
scores = re.findall(r"\\d+", text)

print("Names:", names)
print("Scores:", scores)

# Output:
# Names: ['Ali', 'Sara']
# Scores: ['85', '92']`,
      quiz: [
        {
          question: 'Which function returns all non-overlapping matches of a regex pattern?',
          options: [
            're.findall()',
            're.replace_all()',
            're.match_all()',
            're.collect()'
          ],
          correctAnswer: 0
        },
        {
          question: 'What does the regex pattern \\\\d+ match?',
          options: [
            'One or more whitespace characters',
            'One or more digits',
            'Exactly one letter',
            'Only punctuation marks'
          ],
          correctAnswer: 1
        },
        {
          question: 'What does re.sub() commonly do?',
          options: [
            'Sorts a list',
            'Opens a file',
            'Replaces text matching a pattern',
            'Creates a virtual environment'
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      title: '21. Dates, Times, and Logging',
      duration: '1h 35m',
      notes: `
# Dates, Times, and Logging

## 1. Working with dates

Python's \`datetime\` module provides classes for dates, times, and durations.

\`\`\`python
from datetime import date

today = date.today()
print(today)
print(today.year)
print(today.month)
print(today.day)
\`\`\`

The displayed date depends on the computer's local date.

## 2. Creating dates and times

\`\`\`python
from datetime import date, datetime, time

birthday = date(2008, 5, 15)
meeting = time(14, 30)
moment = datetime(2026, 10, 28, 14, 30)

print(birthday)
print(meeting)
print(moment)
\`\`\`

Date components use numeric values, and invalid dates raise an exception.

## 3. Formatting dates

Use \`strftime()\` to format date and time values.

\`\`\`python
from datetime import datetime

now = datetime.now()
formatted = now.strftime("%d-%m-%Y %H:%M")

print(formatted)
\`\`\`

Common formatting codes:

- \`%Y\`: four-digit year.
- \`%m\`: month number.
- \`%d\`: day of month.
- \`%H\`: hour in 24-hour format.
- \`%M\`: minute.
- \`%S\`: second.

Use \`strptime()\` to parse text that follows a known format.

\`\`\`python
from datetime import datetime

value = datetime.strptime("28-10-2026", "%d-%m-%Y")
print(value.date())
\`\`\`

## 4. Time differences

A \`timedelta\` represents a duration.

\`\`\`python
from datetime import date

start = date(2026, 1, 1)
end = date(2026, 12, 31)

difference = end - start
print(difference.days)
\`\`\`

This calculates the number of days between the two dates.

## 5. Time zones

Use timezone-aware datetimes when working with timestamps across regions.

\`\`\`python
from datetime import datetime, timezone

now_utc = datetime.now(timezone.utc)
print(now_utc.isoformat())
\`\`\`

For named time zones and daylight-saving rules, use \`zoneinfo\` where available.

\`\`\`python
from datetime import datetime
from zoneinfo import ZoneInfo

lahore_time = datetime.now(ZoneInfo("Asia/Karachi"))
print(lahore_time.isoformat())
\`\`\`

Avoid comparing naive and timezone-aware datetimes directly; Python generally rejects that comparison.

## 6. Why logging matters

Logging records events that help you understand application behavior and diagnose problems.

\`\`\`python
import logging

logging.basicConfig(level=logging.INFO)

logging.debug("Detailed diagnostic information")
logging.info("Application started")
logging.warning("Unexpected input received")
logging.error("Operation failed")
logging.critical("A critical failure occurred")
\`\`\`

By default, the root logger usually displays messages at WARNING level or higher unless configured otherwise. Setting INFO makes INFO and more severe messages visible.

## 7. Logging to a file

\`\`\`python
import logging

logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s: %(message)s"
)

logging.info("Application started")
logging.warning("Configuration value is missing")
\`\`\`

The log file can help diagnose problems after the program has finished.

## 8. Logging exceptions

Use \`logging.exception()\` inside an exception handler to include traceback information.

\`\`\`python
import logging

try:
    result = 10 / 0
except ZeroDivisionError:
    logging.exception("Calculation failed")
\`\`\`

Do not log passwords, authentication tokens, or other sensitive information.

## Summary

The datetime tools support date calculations and time-zone-aware timestamps. Logging provides configurable records of application events and failures.
`,
      codeExample: `from datetime import datetime, timedelta
import logging

logging.basicConfig(level=logging.INFO)

now = datetime.now()
tomorrow = now + timedelta(days=1)

print("Now:", now.strftime("%Y-%m-%d %H:%M"))
print("Tomorrow:", tomorrow.date())

logging.info("Date calculation completed")

# Output format:
# Now: current date and time
# Tomorrow: next calendar date`,
      quiz: [
        {
          question: 'Which method formats a datetime object as a string?',
          options: [
            'strptime()',
            'strftime()',
            'timeformat()',
            'dateprint()'
          ],
          correctAnswer: 1
        },
        {
          question: 'Which object represents a duration between dates or times?',
          options: [
            'timezone',
            'calendar',
            'timedelta',
            'timestamp_file'
          ],
          correctAnswer: 2
        },
        {
          question: 'Which logging method includes exception traceback information when called inside an exception handler?',
          options: [
            'logging.exception()',
            'logging.date()',
            'logging.format()',
            'logging.close()'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      title: '22. JSON, CSV, and Data Processing',
      duration: '1h 40m',
      notes: `
# JSON, CSV, and Data Processing

## 1. What is JSON?

JSON stands for JavaScript Object Notation. It is a common format for exchanging structured data between applications and APIs.

Python's built-in \`json\` module converts between JSON text and Python objects.

## 2. Converting Python objects to JSON

\`\`\`python
import json

student = {
    "name": "Ali",
    "marks": 88,
    "passed": True
}

json_text = json.dumps(student, indent=2)
print(json_text)
\`\`\`

The resulting JSON uses lowercase \`true\` and \`false\` for Boolean values.

## 3. Reading JSON

\`\`\`python
import json

json_text = '{"name": "Sara", "marks": 95}'
student = json.loads(json_text)

print(student["name"])
print(student["marks"])
\`\`\`

Important methods:
- \`json.dumps()\`: Python object to JSON string.
- \`json.loads()\`: JSON string to Python object.
- \`json.dump()\`: write JSON to a file-like object.
- \`json.load()\`: read JSON from a file-like object.

## 4. Saving JSON to a file

\`\`\`python
import json

settings = {
    "theme": "dark",
    "notifications": True
}

with open("settings.json", "w", encoding="utf-8") as file:
    json.dump(settings, file, indent=2)

with open("settings.json", "r", encoding="utf-8") as file:
    loaded_settings = json.load(file)

print(loaded_settings["theme"])
\`\`\`

JSON is useful for configuration files and structured data, but it is not a substitute for a database when you need concurrent updates, queries, and transactions.

## 5. Working with CSV

CSV stands for Comma-Separated Values. Python's built-in \`csv\` module handles quoted fields and delimiters more reliably than manually splitting strings.

Write a CSV file:

\`\`\`python
import csv

students = [
    ["Name", "Marks"],
    ["Ali", 85],
    ["Sara", 92]
]

with open("students.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerows(students)
\`\`\`

Read the file:

\`\`\`python
import csv

with open("students.csv", "r", newline="", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
\`\`\`

The CSV reader returns field values as strings.

## 6. Dictionary-based CSV files

\`\`\`python
import csv

records = [
    {"name": "Ali", "marks": 85},
    {"name": "Sara", "marks": 92}
]

with open("results.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(
        file,
        fieldnames=["name", "marks"]
    )
    writer.writeheader()
    writer.writerows(records)
\`\`\`

Read dictionary rows with \`csv.DictReader\`:

\`\`\`python
import csv

with open("results.csv", newline="", encoding="utf-8") as file:
    for row in csv.DictReader(file):
        print(row["name"], row["marks"])
\`\`\`

## 7. Data validation

External files may contain missing or invalid values. Validate data before calculations.

\`\`\`python
def parse_marks(value):
    try:
        marks = int(value)
    except ValueError:
        raise ValueError("Marks must be a whole number.")

    if not 0 <= marks <= 100:
        raise ValueError("Marks must be between 0 and 100.")

    return marks

print(parse_marks("85"))
\`\`\`

## 8. Handling malformed JSON

Invalid JSON raises \`json.JSONDecodeError\`.

\`\`\`python
import json

try:
    data = json.loads('{"name": }')
except json.JSONDecodeError:
    print("The JSON document is invalid.")
\`\`\`

Handle malformed data explicitly instead of assuming every input file is valid.

## 9. Data-processing workflow

A reliable data workflow usually involves:
1. Reading the input.
2. Validating required fields.
3. Converting values to appropriate types.
4. Cleaning or transforming the records.
5. Computing results.
6. Saving the output.
7. Reporting invalid records clearly.

## 10. Security considerations

- Treat imported files as untrusted input.
- Avoid loading untrusted Python pickle files; deserialization can execute code.
- Validate data before using it in business logic.
- Avoid putting secrets into exported files.
- When exporting user-controlled values to CSV, consider spreadsheet formula injection risks.

## Summary

JSON is useful for structured objects and configuration, while CSV is common for tabular data. The built-in modules help read and write both formats safely and consistently.
`,
      codeExample: `import json
from pathlib import Path

student = {
    "name": "Anas",
    "course": "Python",
    "completed_modules": 22
}

path = Path("student.json")
path.write_text(
    json.dumps(student, indent=2),
    encoding="utf-8"
)

loaded = json.loads(path.read_text(encoding="utf-8"))
print(loaded["name"])
print(loaded["completed_modules"])

# Output:
# Anas
# 22`,
      quiz: [
        {
          question: 'Which function converts a Python object into a JSON string?',
          options: [
            'json.loads()',
            'json.dumps()',
            'json.readfile()',
            'json.convert_text()'
          ],
          correctAnswer: 1
        },
        {
          question: 'Which module is designed to read and write CSV files?',
          options: [
            'table',
            'spreadsheet',
            'csv',
            'rows'
          ],
          correctAnswer: 2
        },
        {
          question: 'What exception is raised when json.loads() receives malformed JSON?',
          options: [
            'json.JSONDecodeError',
            'CSVError',
            'FileExistsError',
            'StopIteration'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      title: '23. HTTP Requests and Working with APIs',
      duration: '1h 45m',
      notes: `
# HTTP Requests and Working with APIs

## 1. What is an API?

An Application Programming Interface (API) allows software systems to communicate. A web API commonly sends and receives data over HTTP.

For example, a weather application can request weather information from a remote service instead of collecting all weather data itself.

## 2. HTTP fundamentals

Common HTTP methods include:

- GET: retrieve a resource.
- POST: submit data or create a resource.
- PUT: replace a resource.
- PATCH: partially update a resource.
- DELETE: delete a resource.

Common status codes:

- 200: request succeeded.
- 201: resource created.
- 400: bad request.
- 401: authentication required or invalid.
- 403: access forbidden.
- 404: resource not found.
- 429: too many requests.
- 500: server error.

The meaning of a status code can depend on the API's documented behavior.

## 3. Install the requests library

The \`requests\` package is not part of Python's standard library.

Install it inside your virtual environment:

\`\`\`bash
python -m pip install requests
\`\`\`

## 4. Making a GET request

\`\`\`python
import requests

url = "https://jsonplaceholder.typicode.com/posts/1"

response = requests.get(url, timeout=10)
response.raise_for_status()

post = response.json()

print(post["title"])
\`\`\`

This example calls a public demonstration API. The response is converted from JSON into Python data.

## 5. Handling HTTP errors

Network requests can fail because of timeouts, connection problems, or unsuccessful HTTP status codes.

\`\`\`python
import requests

try:
    response = requests.get(
        "https://jsonplaceholder.typicode.com/posts/1",
        timeout=10
    )
    response.raise_for_status()
    data = response.json()
    print(data)
except requests.Timeout:
    print("The request timed out.")
except requests.ConnectionError:
    print("Could not connect to the server.")
except requests.HTTPError as error:
    print("HTTP request failed:", error)
except requests.RequestException as error:
    print("Request failed:", error)
\`\`\`

Use timeouts so your program does not wait indefinitely for a response.

## 6. Sending query parameters

Query parameters are commonly used for searching and filtering.

\`\`\`python
import requests

response = requests.get(
    "https://jsonplaceholder.typicode.com/posts",
    params={"userId": 1},
    timeout=10
)
response.raise_for_status()

posts = response.json()
print("Posts found:", len(posts))
\`\`\`

Using the \`params\` argument lets Requests encode the query string correctly.

## 7. Sending JSON with POST

\`\`\`python
import requests

payload = {
    "title": "Learning Python",
    "body": "Practicing HTTP APIs",
    "userId": 1
}

response = requests.post(
    "https://jsonplaceholder.typicode.com/posts",
    json=payload,
    timeout=10
)
response.raise_for_status()

print(response.status_code)
print(response.json())
\`\`\`

The demonstration API may simulate creation rather than permanently storing the new resource.

## 8. Authentication and API keys

Some services require an API key or access token.

\`\`\`python
import os
import requests

api_key = os.getenv("MY_API_KEY")

if not api_key:
    raise RuntimeError("MY_API_KEY is not configured.")

headers = {
    "Authorization": f"Bearer {api_key}"
}

# Replace this with the documented URL of your authorized API.
url = "https://api.example.com/profile"

response = requests.get(
    url,
    headers=headers,
    timeout=10
)
response.raise_for_status()
\`\`\`

This is a template, not a working public endpoint. Set the environment variable before using it.

Never commit API keys or access tokens to a public GitHub repository.

## 9. Sessions and repeated requests

A session can reuse configuration and connections across multiple requests.

\`\`\`python
import requests

with requests.Session() as session:
    response = session.get(
        "https://jsonplaceholder.typicode.com/posts/1",
        timeout=10
    )
    response.raise_for_status()
    print(response.json()["id"])
\`\`\`

## 10. API best practices

- Read the API documentation first.
- Set timeouts.
- Handle HTTP and connection errors.
- Respect rate limits and usage terms.
- Validate response data before using it.
- Avoid sending private information to untrusted services.
- Keep credentials in environment variables or a secrets manager.

## Summary

HTTP APIs let Python programs communicate with remote services. Requests makes HTTP calls easier, while timeouts, error handling, authentication, and input validation make integrations more reliable.
`,
      codeExample: `import requests

def get_post(post_id):
    url = f"https://jsonplaceholder.typicode.com/posts/{post_id}"

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as error:
        print("API request failed:", error)
        return None

post = get_post(1)

if post is not None:
    print("Title:", post["title"])

# Requires:
# python -m pip install requests`,
      quiz: [
        {
          question: 'Which HTTP method is commonly used to retrieve a resource?',
          options: ['POST', 'DELETE', 'GET', 'PATCH'],
          correctAnswer: 2
        },
        {
          question: 'Why should an HTTP request use a timeout?',
          options: [
            'To prevent waiting indefinitely for a response',
            'To automatically create an API key',
            'To convert JSON into CSV',
            'To disable all server errors'
          ],
          correctAnswer: 0
        },
        {
          question: 'Which Requests method raises an exception for unsuccessful HTTP status codes?',
          options: [
            'response.json()',
            'response.raise_for_status()',
            'response.get_status()',
            'requests.check_all()'
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      title: '24. SQLite and Database Fundamentals',
      duration: '1h 50m',
      notes: `
# SQLite and Database Fundamentals

## 1. What is a database?

A database stores information in a structured form so an application can retrieve and update it.

A relational database organizes information into tables containing rows and columns.

SQLite is a lightweight relational database. Python includes the \`sqlite3\` module, so you do not need to install a separate database server to begin using it.

## 2. Creating a database connection

\`\`\`python
import sqlite3

connection = sqlite3.connect("students.db")
print("Database connected")
connection.close()
\`\`\`

SQLite creates the database file when it does not already exist.

For larger programs, use a context manager to manage transactions carefully and close connections when they are no longer needed.

## 3. Creating a table

\`\`\`python
import sqlite3

with sqlite3.connect("students.db") as connection:
    connection.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            marks INTEGER NOT NULL
        )
    """)
\`\`\`

The table defines:
- \`id\`: a unique identifier.
- \`name\`: required text.
- \`marks\`: required integer data.

## 4. Inserting records safely

Use parameterized queries instead of joining user input into SQL strings.

\`\`\`python
import sqlite3

with sqlite3.connect("students.db") as connection:
    connection.execute(
        "INSERT INTO students (name, marks) VALUES (?, ?)",
        ("Ali", 85)
    )
\`\`\`

The question-mark placeholders let SQLite bind values safely.

Never build SQL statements by directly concatenating untrusted input.

## 5. Reading records

\`\`\`python
import sqlite3

with sqlite3.connect("students.db") as connection:
    rows = connection.execute(
        "SELECT id, name, marks FROM students"
    ).fetchall()

for row in rows:
    print(row)
\`\`\`

Useful SQL clauses include:
- \`WHERE\`: filters rows.
- \`ORDER BY\`: sorts results.
- \`LIMIT\`: restricts the number of rows returned.
- \`GROUP BY\`: groups rows for aggregate calculations.

## 6. Updating and deleting records

\`\`\`python
import sqlite3

with sqlite3.connect("students.db") as connection:
    connection.execute(
        "UPDATE students SET marks = ? WHERE name = ?",
        (90, "Ali")
    )
\`\`\`

Delete a record using a specific condition:

\`\`\`python
with sqlite3.connect("students.db") as connection:
    connection.execute(
        "DELETE FROM students WHERE name = ?",
        ("Ali",)
    )
\`\`\`

Be careful with UPDATE or DELETE statements without a WHERE clause because they can affect every row.

## 7. Transactions

A transaction groups related database changes into a unit of work.

SQLite connections used as context managers commit successful transactions and roll back a transaction when an exception escapes the block. The connection itself should still be closed when you finish using it.

\`\`\`python
import sqlite3

connection = sqlite3.connect("bank.db")

try:
    with connection:
        connection.execute(
            "CREATE TABLE IF NOT EXISTS accounts "
            "(id INTEGER PRIMARY KEY, balance INTEGER NOT NULL)"
        )
finally:
    connection.close()
\`\`\`

Transactions are especially important when multiple changes must succeed or fail together.

## 8. Database relationships

Relational databases often connect tables using keys.

For example, an \`orders\` table may contain a \`customer_id\` that refers to a customer record. A foreign key expresses this relationship.

SQLite foreign-key enforcement should be enabled for connections when required:

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
connection.execute("PRAGMA foreign_keys = ON")
connection.close()
\`\`\`

## 9. SQL aggregation

\`\`\`python
import sqlite3

with sqlite3.connect("students.db") as connection:
    result = connection.execute(
        "SELECT COUNT(*), AVG(marks) FROM students"
    ).fetchone()

print("Student count:", result[0])
print("Average marks:", result[1])
\`\`\`

Aggregate functions such as COUNT, SUM, AVG, MIN, and MAX summarize records.

## 10. Professional database practices

- Use parameterized SQL queries.
- Add constraints to protect data integrity.
- Use transactions for related updates.
- Back up important data.
- Do not store plaintext passwords.
- Close database connections when finished.
- Consider PostgreSQL or another server database for applications requiring concurrent access, remote connections, or advanced deployment features.

## Summary

SQLite introduces relational database concepts without requiring a database server. Tables, SQL queries, parameter binding, transactions, and constraints are foundational skills for backend development.
`,
      codeExample: `import sqlite3

with sqlite3.connect("tasks.db") as connection:
    connection.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0
        )
    """)

    connection.execute(
        "INSERT INTO tasks (title) VALUES (?)",
        ("Learn SQLite",)
    )

    tasks = connection.execute(
        "SELECT id, title, completed FROM tasks"
    ).fetchall()

for task in tasks:
    print(task)

# Run the program more than once to observe
# how records persist in tasks.db.`,
      quiz: [
        {
          question: 'Which Python module provides built-in SQLite support?',
          options: ['sqlite3', 'databasekit', 'sqlserver', 'dbbrowser'],
          correctAnswer: 0
        },
        {
          question: 'Why are parameterized SQL queries important?',
          options: [
            'They automatically create a website',
            'They make every query run instantly',
            'They safely bind values and help prevent SQL injection',
            'They remove the need for database tables'
          ],
          correctAnswer: 2
        },
        {
          question: 'What is the purpose of a database transaction?',
          options: [
            'To convert SQL into HTML',
            'To group changes into a unit of work',
            'To replace every table',
            'To disable data validation'
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      title: '25. Asynchronous Programming and Concurrency',
      duration: '2h',
      notes: `
# Asynchronous Programming and Concurrency

## 1. What is concurrency?

Concurrency allows a program to make progress on multiple tasks during overlapping periods.

It is especially useful for I/O-bound work such as:
- Waiting for HTTP responses.
- Reading from network services.
- Handling many connections.
- Waiting for asynchronous database operations.

Concurrency is different from parallelism. Parallelism means multiple operations actually execute at the same time, often on different CPU cores.

## 2. Synchronous execution

In synchronous code, a task generally waits for the current operation to finish before moving to the next one.

\`\`\`python
import time

def task(name):
    print("Starting", name)
    time.sleep(1)
    print("Finished", name)

task("A")
task("B")
\`\`\`

The second task starts after the first finishes.

## 3. Creating an async function

Use \`async def\` to define a coroutine function.

\`\`\`python
import asyncio

async def greet():
    print("Hello from async Python")

asyncio.run(greet())
\`\`\`

Calling an async function creates a coroutine object. It does not execute the coroutine to completion until it is awaited or scheduled by an event loop.

## 4. Awaiting asynchronous operations

\`\`\`python
import asyncio

async def task(name):
    print("Starting", name)
    await asyncio.sleep(1)
    print("Finished", name)

async def main():
    await task("A")
    await task("B")

asyncio.run(main())
\`\`\`

Here the two tasks still run sequentially because each one is awaited before the next begins.

Use \`asyncio.sleep()\` rather than \`time.sleep()\` inside async code when you want to wait without blocking the event loop.

## 5. Running tasks concurrently

\`\`\`python
import asyncio

async def task(name):
    print("Starting", name)
    await asyncio.sleep(1)
    print("Finished", name)

async def main():
    await asyncio.gather(
        task("A"),
        task("B"),
        task("C")
    )

asyncio.run(main())
\`\`\`

The tasks can overlap while awaiting asynchronous operations, reducing total waiting time compared with sequential execution.

## 6. Using create_task

\`\`\`python
import asyncio

async def fetch_data():
    await asyncio.sleep(1)
    return {"status": "complete"}

async def main():
    task = asyncio.create_task(fetch_data())
    print("Task scheduled")

    result = await task
    print(result)

asyncio.run(main())
\`\`\`

Tasks schedule coroutines to run within the event loop. Keep references to important tasks and handle their exceptions.

## 7. Async context managers and iterators

Some network clients, database libraries, and streams provide asynchronous interfaces.

An asynchronous context manager uses \`async with\`, while asynchronous iteration uses \`async for\`.

These features are useful when the underlying resource supports asynchronous operations; they do not automatically make ordinary synchronous libraries asynchronous.

## 8. When to use threads or processes

- Asyncio: useful for many I/O-bound tasks when libraries support async operations.
- Threading: useful for concurrent I/O when working with synchronous libraries.
- Multiprocessing: useful for CPU-heavy work that benefits from multiple processes.

Python's Global Interpreter Lock affects CPU-bound threads in standard CPython builds, although implementation details can vary by Python version and build.

## 9. Common mistakes

- Forgetting to await a coroutine.
- Calling blocking functions such as \`time.sleep()\` in an async event loop.
- Assuming async code automatically runs on multiple CPU cores.
- Creating tasks without managing their lifecycle.
- Ignoring exceptions raised by background tasks.

## 10. Professional use cases

Asynchronous programming can help build chat services, API clients, network applications, and services that wait on many independent resources.

Use it only when its concurrency benefits justify the added complexity.

## Summary

Asyncio supports cooperative concurrency using coroutines, await, tasks, and an event loop. It is especially effective for I/O-bound applications when their libraries support asynchronous operations.
`,
      codeExample: `import asyncio

async def download_file(name, delay):
    print("Starting:", name)
    await asyncio.sleep(delay)
    print("Finished:", name)
    return name

async def main():
    results = await asyncio.gather(
        download_file("file_a", 2),
        download_file("file_b", 1),
        download_file("file_c", 1)
    )

    print("Completed:", results)

asyncio.run(main())

# The waiting periods overlap, so the tasks
# can finish sooner than sequential waiting.`,
      quiz: [
        {
          question: 'Which keyword pauses a coroutine until an awaitable completes?',
          options: ['yield', 'wait', 'await', 'pause'],
          correctAnswer: 2
        },
        {
          question: 'Which function is commonly used to run an async entry point?',
          options: [
            'asyncio.run()',
            'asyncio.start_program()',
            'asyncio.compile()',
            'asyncio.open_loop_file()'
          ],
          correctAnswer: 0
        },
        {
          question: 'Which workload often benefits from asyncio?',
          options: [
            'A purely mathematical loop that uses every CPU core',
            'I/O-bound tasks waiting for network responses',
            'A task that never waits for any operation',
            'A static text file that needs no processing'
          ],
          correctAnswer: 1
        }
      ]
    },
{
      title: '26. Memory, Performance, and Profiling',
      duration: '1h 45m',
      notes: `
# Memory, Performance, and Profiling

## 1. Why performance matters

Performance describes how efficiently a program uses time, memory, and other resources.

Before optimizing a program:
1. Confirm that it produces correct results.
2. Identify the slow operation.
3. Measure its performance.
4. Make a targeted improvement.
5. Measure again.

Avoid guessing which part of a program is slow.

## 2. Measuring execution time

Python's \`timeit\` module measures short pieces of code.

\`\`\`python
import timeit

elapsed = timeit.timeit(
    "sum(range(1000))",
    number=10000
)

print(f"Total time: {elapsed:.4f} seconds")
\`\`\`

The measured time depends on your computer, Python version, and system workload.

For a quick elapsed-time measurement:

\`\`\`python
from time import perf_counter

start = perf_counter()

total = sum(range(1_000_000))

elapsed = perf_counter() - start

print("Total:", total)
print("Seconds:", elapsed)
\`\`\`

## 3. Profiling a complete program

Profiling helps identify which functions consume the most execution time.

Run a Python file with:

\`\`\`bash
python -m cProfile -s cumulative main.py
\`\`\`

The cumulative column helps identify functions whose total time includes time spent in their calls.

Use profiling results to decide where optimization is worthwhile.

## 4. Big-O and performance

Consider membership checks in a list and a set.

\`\`\`python
items = list(range(10000))
item_set = set(items)

print(9999 in items)
print(9999 in item_set)
\`\`\`

List membership generally requires a linear scan in the worst case, O(n). Set membership is average-case O(1) under typical hashing assumptions.

Converting a list to a set has a cost, so it is most useful when repeated membership checks justify that initial work.

## 5. Generators and memory

A list stores all its elements at once.

\`\`\`numbers = [number * 2 for number in range(1000000)]
\`\`\`

A generator produces values as they are requested:

\`\`\`python
numbers = (number * 2 for number in range(1000000))

print(next(numbers))
print(next(numbers))
\`\`\`

Generators can reduce memory usage when processing large sequences that do not need to be stored completely.

## 6. Understanding object sizes

The \`sys.getsizeof()\` function reports the shallow size of an object.

\`\`\`python
import sys

values = [1, 2, 3, 4, 5]

print(sys.getsizeof(values))
\`\`\`

This does not include the complete memory used by all objects referenced by a container.

## 7. Caching repeated calculations

The \`functools.lru_cache\` decorator caches results for hashable arguments.

\`\`\`from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(30))
print(fibonacci.cache_info())
\`\`\`

Caching is effective when a function repeatedly receives the same arguments and its results remain valid.

Avoid caching functions whose results depend on changing external state unless you handle invalidation correctly.

## 8. Memory management

Python manages most object memory automatically through reference counting and garbage collection in standard CPython builds.

You should still:
- Release references to large objects when they are no longer needed.
- Avoid retaining unnecessary data in long-lived collections.
- Close files and network connections.
- Use generators for suitable streaming workloads.
- Profile memory when diagnosing leaks or excessive usage.

## 9. Practical optimization

- Choose appropriate data structures.
- Avoid repeated expensive work inside loops.
- Use built-in operations when they are clearer and efficient.
- Reduce unnecessary network and database calls.
- Profile before rewriting code.
- Keep tests running while optimizing.

## Summary

Performance engineering starts with measurement. Profiling, algorithm analysis, generators, suitable data structures, and caching can improve speed and memory use when applied to the right problems.
`,
      codeExample: `from functools import lru_cache
from time import perf_counter

@lru_cache(maxsize=None)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

start = perf_counter()
result = fibonacci(35)
elapsed = perf_counter() - start

print("Result:", result)
print(f"Elapsed: {elapsed:.6f} seconds")
print("Cache:", fibonacci.cache_info())

# The exact timing depends on your computer.`,
      quiz: [
        {
          question: 'Which module can profile function execution time?',
          options: ['cProfile', 'csv', 'pathlib', 'calendar'],
          correctAnswer: 0
        },
        {
          question: 'What is a common benefit of a generator?',
          options: [
            'It automatically encrypts data',
            'It makes every algorithm O(1)',
            'It can produce values without storing the entire sequence',
            'It replaces all database tables'
          ],
          correctAnswer: 2
        },
        {
          question: 'When should you optimize a slow program?',
          options: [
            'Before checking whether it works',
            'After measuring and identifying a meaningful bottleneck',
            'Only by adding more loops',
            'Without running tests'
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      title: '27. Python Security and Professional Practices',
      duration: '1h 50m',
      notes: `
# Python Security and Professional Practices

## 1. Why application security matters

Applications often process passwords, personal information, uploaded files, and external input. Incorrect handling can expose sensitive data or allow attackers to manipulate the application.

Security should be part of development from the beginning.

## 2. Validate untrusted input

Never assume input from a user, file, or API is safe.

\`\`\`python
def parse_age(value):
    try:
        age = int(value)
    except (TypeError, ValueError):
        raise ValueError("Age must be a whole number.")

    if not 0 <= age <= 120:
        raise ValueError("Age is outside the accepted range.")

    return age

print(parse_age("18"))
\`\`\`

Validation should match your application's actual business rules.

## 3. Store secrets safely

Do not hardcode API keys, database passwords, or authentication tokens into source code.

Use environment variables:

\`\`\`python
import os

api_key = os.getenv("MY_API_KEY")

if not api_key:
    raise RuntimeError("Required API key is missing.")
\`\`\`

For local development, a tool such as python-dotenv can load values from a local .env file. Keep that file out of Git and provide a safe example file such as .env.example without real secrets.

Environment variables are one way to supply secrets, but production systems may benefit from a dedicated secrets manager.

## 4. Password storage

Never store user passwords as plaintext or use a fast general-purpose hash such as plain SHA-256 as a password-storage solution.

Use a password-hashing algorithm designed for password storage, such as Argon2id, scrypt, or appropriately configured bcrypt.

For example, install a suitable library:

\`\`\`bash
python -m pip install argon2-cffi
\`\`\`

Example:

\`\`\`python
from argon2 import PasswordHasher

hasher = PasswordHasher()

password_hash = hasher.hash("replace-with-user-password")

try:
    hasher.verify(password_hash, "replace-with-user-password")
    print("Password verified")
except Exception:
    print("Password verification failed")
\`\`\`

In a real application, handle the library's specific verification exceptions and use secure registration and login flows.

## 5. SQL injection prevention

Never construct SQL statements by directly inserting untrusted values into query strings.

Unsafe pattern:

\`\`\`python
# Do not use this with untrusted input.
query = "SELECT * FROM users WHERE name = '" + name + "'"
\`\`\`

Safe pattern:

\`\`\`python
cursor.execute(
    "SELECT * FROM users WHERE name = ?",
    (name,)
)
\`\`\`

The placeholder syntax depends on the database driver. Always use that driver's parameter-binding mechanism.

## 6. Avoid unsafe deserialization

Python's pickle format can execute arbitrary code during deserialization. Do not unpickle data from untrusted users or external sources.

For simple data interchange, JSON is generally a safer option, although JSON data still requires validation.

## 7. Protect file operations

When an application accepts filenames, do not blindly trust user-provided paths.

\`\`\`python
from pathlib import Path

base_directory = Path("uploads").resolve()
filename = "report.txt"

target = (base_directory / filename).resolve()

if target != base_directory and base_directory not in target.parents:
    raise ValueError("Invalid file path")

print(target)
\`\`\`

This illustrates a path-containment check for a simple case. Production upload handling also needs filename policy, permissions, size limits, content validation, and race-condition considerations.

## 8. Dependency security

Third-party libraries can contain vulnerabilities.

Useful practices:
- Use a virtual environment for each project.
- Pin and review dependency versions.
- Remove unused dependencies.
- Monitor security advisories.
- Update vulnerable packages.
- Use automated dependency scanning when available.

## 9. Logging and error messages

Logs should help diagnose failures without exposing secrets.

Avoid logging:
- Passwords.
- Session cookies.
- Access tokens.
- Private personal information.
- Full sensitive request bodies.

Return appropriate, non-sensitive error messages to users while keeping useful diagnostic details in protected server logs.

## 10. Professional security checklist

Before releasing an application:
- Validate inputs.
- Authenticate and authorize protected actions.
- Use secure password hashing.
- Keep secrets outside source control.
- Use parameterized database queries.
- Apply reasonable rate limits to sensitive endpoints.
- Use HTTPS for network traffic.
- Keep dependencies updated.
- Back up important data.
- Test error-handling and access-control rules.

## Summary

Secure Python development requires safe input handling, secret management, secure password storage, parameterized SQL, careful file operations, and controlled error reporting.
`,
      codeExample: `import os
import sqlite3

def find_user(username):
    database_url = os.getenv("APP_DATABASE", "users.db")

    with sqlite3.connect(database_url) as connection:
        return connection.execute(
            "SELECT id, username FROM users WHERE username = ?",
            (username,)
        ).fetchone()

# Before running, create a users table.
# The parameterized query protects the username value
# from being interpreted as SQL syntax.`,
      quiz: [
        {
          question: 'How should an application store user passwords?',
          options: [
            'As plaintext strings',
            'Using a password-hashing algorithm designed for password storage',
            'In a public GitHub repository',
            'Using reversible Base64 encoding'
          ],
          correctAnswer: 1
        },
        {
          question: 'What is the preferred way to insert user values into SQL queries?',
          options: [
            'String concatenation',
            'Manual quote replacement only',
            'Parameterized queries',
            'Executing the value as a new SQL statement'
          ],
          correctAnswer: 2
        },
        {
          question: 'Why should secrets not be committed to a public repository?',
          options: [
            'They may be exposed and misused by others',
            'Python cannot read Git repositories',
            'Git automatically encrypts every secret',
            'Secrets make loops run slowly'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      title: '28. Packaging, CLI Tools, and Deployment',
      duration: '2h',
      notes: `
# Packaging, CLI Tools, and Deployment

## 1. Organizing a Python project

A professional project separates application code, tests, configuration, and documentation.

Example structure:

\`\`\`text
task_manager/
    pyproject.toml
    README.md
    src/
        task_manager/
            __init__.py
            main.py
    tests/
        test_main.py
\`\`\`

This is one possible layout. Small scripts may need less structure.

## 2. The main entry point

Python modules can check whether they are being executed directly.

\`\`\`python
def main():
    print("Task Manager started")

if __name__ == "__main__":
    main()
\`\`\`

This allows the module to be imported without automatically running the application.

## 3. Command-line arguments

The \`argparse\` module helps create command-line interfaces.

\`\`\`python
import argparse

parser = argparse.ArgumentParser(
    description="A simple greeting program"
)
parser.add_argument("name", help="Name to greet")

args = parser.parse_args()

print(f"Hello, {args.name}!")
\`\`\`

Save it as \`greet.py\` and run:

\`\`\`bash
python greet.py Anas
\`\`\`

Output:

\`\`\`text
Hello, Anas!
\`\`\`

Try \`python greet.py --help\` to view the generated help message.

## 4. Project dependencies

Create a virtual environment:

\`\`\`bash
python -m venv .venv
\`\`\`

Activate it on Windows PowerShell:

\`\`\`powershell
.\\.venv\\Scripts\\Activate.ps1
\`\`\`

Install project dependencies and record them when appropriate:

\`\`\`bash
python -m pip install requests
python -m pip freeze > requirements.txt
\`\`\`

The project should document which Python versions it supports. For reusable libraries and applications, a pyproject.toml file can define package metadata and dependencies.

## 5. Basic packaging with pyproject.toml

A minimal project configuration for a package can look like this:

\`\`\`toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "task-manager-demo"
version = "0.1.0"
description = "A beginner Python task manager"
requires-python = ">=3.10"

[tool.setuptools.packages.find]
where = ["src"]
\`\`\`

Package metadata and build settings should match your actual project. The configuration above assumes the package is located under the src directory.

## 6. Git and .gitignore

Use version control to track changes.

A Python project's .gitignore commonly includes:

\`\`\`text
.venv/
__pycache__/
*.py[cod]
.env
.pytest_cache/
dist/
build/
\`\`\`

Do not add real secrets or unnecessary generated files to your repository.

Typical commands:

\`\`\`bash
git init
git add .
git commit -m "Initial Python project"
\`\`\`

Only stage files that are appropriate to share.

## 7. Testing before release

Run your tests before packaging or deploying:

\`\`\`bash
python -m unittest discover
\`\`\`

If using pytest:

\`\`\`bash
python -m pytest
\`\`\`

Also run a linter if configured:

\`\`\`bash
python -m ruff check .
\`\`\`

## 8. Environment configuration

Different environments may require different settings. Read non-secret configuration from environment variables, and supply secrets through a secure configuration mechanism.

Do not rely on the current working directory being the same in every deployment environment. Resolve file paths deliberately when your application depends on files.

## 9. Deploying Python applications

Deployment depends on the type of application:
- A command-line tool can be packaged and distributed.
- A web API may use a framework such as Flask, FastAPI, or Django.
- A scheduled script may run through a scheduler or background job service.
- A data-processing application may run in a controlled worker environment.

Check your hosting provider's supported Python versions, build process, entry point, environment variables, file-system persistence, and network restrictions.

Some serverless platforms use temporary filesystems, so local files may not persist across invocations. Use managed storage or a database for durable application data.

## 10. Professional release checklist

- Document setup instructions in README.md.
- Define supported Python versions.
- Declare dependencies.
- Exclude secrets and generated files from Git.
- Run tests and static checks.
- Configure environment variables.
- Check logs and health endpoints after deployment.
- Maintain a rollback plan for important applications.

## Summary

Packaging and deployment turn a local script into software other people can install or run. Project structure, CLI arguments, dependency management, version control, tests, and environment configuration support reliable releases.
`,
      codeExample: `import argparse

def main():
    parser = argparse.ArgumentParser(
        description="Python course progress tracker"
    )
    parser.add_argument(
        "--completed",
        type=int,
        default=0,
        help="Number of completed modules"
    )
    parser.add_argument(
        "--total",
        type=int,
        default=32,
        help="Total number of modules"
    )

    args = parser.parse_args()

    if args.total <= 0:
        parser.error("--total must be greater than zero")

    if not 0 <= args.completed <= args.total:
        parser.error("--completed must be between 0 and --total")

    percentage = args.completed / args.total * 100
    print(f"Progress: {percentage:.1f}%")

if __name__ == "__main__":
    main()

# Example:
# python progress.py --completed 10 --total 32`,
      quiz: [
        {
          question: 'What is the purpose of argparse?',
          options: [
            'To create database tables automatically',
            'To parse command-line arguments',
            'To encrypt every file',
            'To replace Python modules'
          ],
          correctAnswer: 1
        },
        {
          question: 'Which file commonly declares Python project metadata and build configuration?',
          options: [
            'index.html',
            'requirements.lock only',
            'pyproject.toml',
            'python.exe'
          ],
          correctAnswer: 2
        },
        {
          question: 'Why should deployment configuration be tested on the target hosting platform?',
          options: [
            'Because Python syntax stops working online',
            'Because every platform permanently stores local files',
            'Because Git automatically configures every server',
            'Because supported runtimes, entry points, and filesystem behavior vary'
          ],
          correctAnswer: 3
        }
      ]
    },
   {
  title: 'Module 29: Python Expense Tracker',
  duration: '2 hours',
  notes: `# Python Expense Tracker

## Learning objectives
- Work with lists and dictionaries.
- Save and load JSON data.
- Validate user input.
- Calculate total expenses.

## How it works
The application lets users add expenses, view records, calculate total spending, and save records in a JSON file.

## Example: Save JSON data

    import json

    expenses = [
        {"category": "Food", "amount": 450},
        {"category": "Travel", "amount": 200}
    ]

    with open("expenses.json", "w") as file:
        json.dump(expenses, file, indent=4)

## Example: Calculate expenses

    total = sum(item["amount"] for item in expenses)
    print("Total:", total)

## Practice tasks
1. Add an expense category.
2. Reject negative amounts.
3. Display all saved expenses.
4. Calculate total spending.
5. Handle a missing JSON file.

## Challenge
Add a budget limit and warn the user when spending exceeds it.`,
  codeExample: 'import json\nfrom pathlib import Path\n\nFILE = Path("expenses.json")\n\ndef load_expenses():\n    try:\n        return json.loads(FILE.read_text(encoding="utf-8"))\n    except FileNotFoundError:\n        return []\n    except json.JSONDecodeError:\n        print("Invalid expense file.")\n        return []\n\ndef save_expenses(expenses):\n    FILE.write_text(json.dumps(expenses, indent=4), encoding="utf-8")\n\ndef main():\n    expenses = load_expenses()\n    while True:\n        print("\\n1. Add  2. View  3. Total  4. Exit")\n        choice = input("Choose: ").strip()\n        if choice == "1":\n            try:\n                amount = float(input("Amount: "))\n                if amount <= 0:\n                    print("Amount must be positive.")\n                    continue\n            except ValueError:\n                print("Enter a valid number.")\n                continue\n            category = input("Category: ").strip() or "Other"\n            expenses.append({"amount": amount, "category": category})\n            save_expenses(expenses)\n            print("Expense saved.")\n        elif choice == "2":\n            for expense in expenses:\n                print(expense)\n        elif choice == "3":\n            total = sum(item["amount"] for item in expenses)\n            print(f"Total: Rs. {total:.2f}")\n        elif choice == "4":\n            break\n        else:\n            print("Invalid choice.")\n\nif __name__ == "__main__":\n    main()',
  quiz: [
    {
      question: 'Which module handles JSON data?',
      options: ['random', 'json', 'math', 'time'],
      correctAnswer: 1
    },
    {
      question: 'Which function calculates a total?',
      options: ['sum()', 'input()', 'type()', 'open()'],
      correctAnswer: 0
    },
    {
      question: 'What does FileNotFoundError indicate?',
      options: ['Invalid number', 'Missing file', 'Invalid class', 'Network failure'],
      correctAnswer: 1
    }
  ]
},
{
  title: 'Module 30: API Data Dashboard',
  duration: '2 hours 30 minutes',
  notes: `# API Data Dashboard

## Learning objectives
- Understand HTTP requests and APIs.
- Read JSON responses.
- Filter and display data.
- Handle request errors.

## Install the requests package

    python -m pip install requests

## Request data from an API

    import requests

    response = requests.get(
        "https://jsonplaceholder.typicode.com/posts",
        timeout=10
    )
    response.raise_for_status()
    posts = response.json()

## Display posts

    for post in posts[:5]:
        print(post["id"], post["title"])

## Important concepts
- A timeout limits how long a request waits.
- JSON responses can become Python lists and dictionaries.
- HTTP errors should be handled.
- APIs may be unavailable or return unexpected data.

## Practice tasks
1. Search posts by title.
2. Filter posts by user ID.
3. Display the number of results.
4. Export results to JSON.

## Challenge
Build a small web dashboard that displays the retrieved posts.`,
  codeExample: 'import requests\n\ndef main():\n    url = "https://jsonplaceholder.typicode.com/posts"\n    try:\n        response = requests.get(url, timeout=10)\n        response.raise_for_status()\n        posts = response.json()\n        if not isinstance(posts, list):\n            print("Unexpected API response.")\n            return\n        query = input("Search title: ").strip().lower()\n        results = [\n            post for post in posts\n            if query in post.get("title", "").lower()\n        ]\n        print(f"Found {len(results)} posts.")\n        for post in results[:10]:\n            print(post.get("id"), post.get("title"))\n    except requests.RequestException as error:\n        print("Request failed:", error)\n    except ValueError:\n        print("Invalid JSON response.")\n\nif __name__ == "__main__":\n    main()',
  quiz: [
    {
      question: 'Which method reads JSON from a response?',
      options: ['response.json()', 'response.read_json_file()', 'response.python()', 'response.convert()'],
      correctAnswer: 0
    },
    {
      question: 'Why use a request timeout?',
      options: ['To sort data', 'To avoid waiting indefinitely', 'To create a database', 'To guarantee success'],
      correctAnswer: 1
    },
    {
      question: 'What does raise_for_status() do?',
      options: ['Sorts results', 'Deletes errors', 'Raises an exception for unsuccessful HTTP responses', 'Creates JSON'],
      correctAnswer: 2
    }
  ]
},
{
  title: 'Module 31: Object-Oriented Library Manager',
  duration: '2 hours 30 minutes',
  notes: `# Object-Oriented Library Manager

## Learning objectives
- Create classes and objects.
- Use constructors and instance attributes.
- Define methods.
- Apply business rules.

## Book class

    class Book:
        def __init__(self, book_id, title, author):
            self.book_id = book_id
            self.title = title
            self.author = author
            self.is_borrowed = False

## Library class
The library stores books and supports adding, listing, borrowing, and returning them.

## Example: Create an object

    book = Book(1, "Python Basics", "Alex Smith")
    print(book.title)

## Business rules
- A borrowed book cannot be borrowed again.
- An available book cannot be returned again.
- Book IDs must be unique.
- Missing book IDs should be handled safely.

## Practice tasks
1. Add a book.
2. List all books.
3. Borrow a book by ID.
4. Return a book by ID.
5. Reject duplicate IDs.

## Challenge
Add a Member class and limit each member to three borrowed books.`,
  codeExample: 'class Book:\n    def __init__(self, book_id, title, author):\n        self.book_id = book_id\n        self.title = title\n        self.author = author\n        self.is_borrowed = False\n\n    def __str__(self):\n        status = "Borrowed" if self.is_borrowed else "Available"\n        return f"{self.book_id}: {self.title} by {self.author} ({status})"\n\nclass Library:\n    def __init__(self):\n        self.books = {}\n\n    def add_book(self, book):\n        if book.book_id in self.books:\n            raise ValueError("Duplicate book ID.")\n        self.books[book.book_id] = book\n\n    def borrow(self, book_id):\n        book = self.books.get(book_id)\n        if book is None:\n            print("Book not found.")\n        elif book.is_borrowed:\n            print("Already borrowed.")\n        else:\n            book.is_borrowed = True\n            print("Borrowed successfully.")\n\n    def return_book(self, book_id):\n        book = self.books.get(book_id)\n        if book is None:\n            print("Book not found.")\n        elif not book.is_borrowed:\n            print("Book is already available.")\n        else:\n            book.is_borrowed = False\n            print("Returned successfully.")\n\n    def list_books(self):\n        for book in self.books.values():\n            print(book)\n\nif __name__ == "__main__":\n    library = Library()\n    library.add_book(Book(1, "Python Basics", "Alex Smith"))\n    library.add_book(Book(2, "Clean Code", "Robert Martin"))\n    library.list_books()\n    library.borrow(1)\n    library.return_book(1)\n    library.list_books()',
  quiz: [
    {
      question: 'What is the purpose of __init__?',
      options: ['Initialize an object', 'Delete a class', 'Install a package', 'Open a website'],
      correctAnswer: 0
    },
    {
      question: 'Why prevent borrowing an already borrowed book?',
      options: ['To rename it', 'To enforce business rules', 'To remove the class', 'To stop Python'],
      correctAnswer: 1
    },
    {
      question: 'Where does this Library class store books?',
      options: ['Automatically in SQLite', 'In a remote API', 'In an in-memory dictionary', 'In a CSV file'],
      correctAnswer: 2
    }
  ]
},
{
  title: 'Module 32: Professional Workflow, Testing, and Final Assessment',
  duration: '3 hours',
  notes: `# Module 32: Professional Python Development

## 1. Think like a professional developer

Professional development is more than writing code that works. Good software should be readable, maintainable, testable, secure, and documented.

A professional workflow usually follows these steps:

1. Understand the requirements.
2. Break the problem into small tasks.
3. Design the program structure.
4. Implement one feature at a time.
5. Test normal cases and edge cases.
6. Fix bugs and review the code.
7. Document the project.
8. Track changes with Git.
9. Deploy or distribute the finished project.

## 2. Write clean Python code

Use meaningful names, small functions, consistent formatting, and clear error messages.

\\\`\\\`\\\`python
def calculate_average(scores):
    if not scores:
        raise ValueError("Scores cannot be empty.")

    return sum(scores) / len(scores)


marks = [80, 75, 90]
print(f"Average: {calculate_average(marks):.2f}")
\\\`\\\`\\\`

Good practices:
- Use snake_case for functions and variables.
- Use PascalCase for class names.
- Avoid unnecessary global variables.
- Keep functions focused on one responsibility.
- Remove unused code and debug print statements.
- Avoid duplicating the same logic in multiple places.

## 3. Automated testing with unittest

Testing checks whether your code behaves as expected.

Create a file named test_calculator.py:

\\\`\\\`\\\`python
import unittest


def add(a, b):
    return a + b


def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero.")
    return a / b


class CalculatorTests(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)

    def test_divide(self):
        self.assertEqual(divide(10, 2), 5)

    def test_division_by_zero(self):
        with self.assertRaises(ValueError):
            divide(10, 0)


if __name__ == "__main__":
    unittest.main()
\\\`\\\`\\\`

Run the tests from your terminal:

\\\`\\\`\\\`bash
python -m unittest -v
\\\`\\\`\\\`

Test different types of situations:
- Normal inputs
- Empty inputs
- Invalid inputs
- Boundary values
- Missing files or network failures
- Unexpected errors

A passing test suite increases confidence, but it does not prove that every possible bug is absent.

## 4. Debugging and error handling

When a program fails:

1. Read the full traceback.
2. Identify the line where the failure occurred.
3. Understand the exception type.
4. Reproduce the problem with a small example.
5. Fix the underlying cause.
6. Add a test to prevent the same bug from returning.

Example:

\\\`\\\`\\\`python
def convert_to_integer(value):
    try:
        return int(value)
    except ValueError:
        print("Please enter a valid whole number.")
        return None


result = convert_to_integer("abc")
print(result)
\\\`\\\`\\\`

Catch specific exceptions whenever possible. Avoid using a broad except clause that hides programming errors.

## 5. Git and GitHub workflow

Git records changes to your project. GitHub hosts Git repositories online.

From your project directory, initialize and commit your work:

\\\`\\\`\\\`bash
git init
git add .
git commit -m "Complete Python masterclass project"
\\\`\\\`\\\`

After creating an empty repository on GitHub, connect it and push:

\\\`\\\`\\\`bash
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
\\\`\\\`\\\`

Replace YOUR_REPOSITORY_URL with your actual repository URL. If a remote already exists, inspect it with git remote -v before adding another.

Useful commands:

\\\`\\\`\\\`bash
git status
git log --oneline
git add .
git commit -m "Describe your changes"
git push
\\\`\\\`\\\`

## 6. Protect secrets and private data

Never commit passwords, database connection strings, API keys, email app passwords, or private credentials.

Use environment variables for secrets, keep local .env files out of Git, and provide a safe .env.example containing placeholder values only.

Example .gitignore:

\\\`\\\`\\\`text
.env
.venv/
__pycache__/
*.pyc
\\\`\\\`\\\`

If a secret is accidentally pushed, removing it from the latest file is not enough. Revoke or rotate the exposed credential immediately.

## 7. Virtual environments and dependencies

Create an isolated environment for each Python project:

\\\`\\\`\\\`bash
python -m venv .venv
\\\`\\\`\\\`

Activate it on Windows Command Prompt:

\\\`\\\`\\\`bat
.venv\\Scripts\\activate.bat
\\\`\\\`\\\`

Activate it on Windows PowerShell:

\\\`\\\`\\\`powershell
.\\.venv\\Scripts\\Activate.ps1
\\\`\\\`\\\`

Install project dependencies when needed and record them:

\\\`\\\`\\\`bash
python -m pip install requests
python -m pip freeze > requirements.txt
\\\`\\\`\\\`

A teammate can install the recorded dependencies with:

\\\`\\\`\\\`bash
python -m pip install -r requirements.txt
\\\`\\\`\\\`

## 8. Write a useful README

Every portfolio project should explain:
- What the project does
- Main features
- Technologies used
- Installation steps
- How to run the program
- How to run tests
- Example usage or screenshots
- Known limitations and future improvements

Keep the README accurate. Do not claim a feature works unless you have tested it.

## 9. Final assessment project

Build a Personal Finance Manager that combines skills from the course.

Required features:
- Add, list, and delete transactions.
- Validate amounts and transaction categories.
- Calculate total income, expenses, and balance.
- Save and load transactions.
- Handle missing or corrupted data files.
- Use classes or well-structured functions.
- Include automated unit tests.
- Document installation and usage.
- Publish the source code in a Git repository without secrets.

Suggested structure:

\\\`\\\`\\\`text
finance_manager/
    main.py
    models.py
    storage.py
    reports.py
    tests/
        test_reports.py
    README.md
    requirements.txt
    .gitignore
\\\`\\\`\\\`

Start with a simple working version. Add features gradually and test each one before moving forward.

## 10. Final completion checklist

- [ ] I understand variables, data types, operators, and control flow.
- [ ] I can work with strings, lists, tuples, dictionaries, and sets.
- [ ] I can write functions and use comprehensions.
- [ ] I understand classes, exceptions, files, and JSON.
- [ ] I can work with APIs and basic databases.
- [ ] I understand asynchronous programming at a basic level.
- [ ] I can test, debug, and document a Python program.
- [ ] I can use Git and push a project to GitHub.
- [ ] I can protect credentials and manage dependencies.
- [ ] I have completed and tested a practical project.

## Congratulations

You have reached the end of this A-to-Z Python course.

Finishing the lessons is the beginning, not the end. Build projects independently, read documentation, test your assumptions, and improve your code through feedback. Python proficiency comes from consistent practice.`,
  codeExample: 'import unittest\\n\\ndef calculate_average(scores):\\n    if not scores:\\n        raise ValueError("Scores cannot be empty.")\\n    return sum(scores) / len(scores)\\n\\nclass AverageTests(unittest.TestCase):\\n    def test_average(self):\\n        self.assertEqual(calculate_average([80, 70, 90]), 80)\\n\\n    def test_empty_scores(self):\\n        with self.assertRaises(ValueError):\\n            calculate_average([])\\n\\nif __name__ == "__main__":\\n    unittest.main()',
  quiz: [
    {
      question: 'Which command runs Python unit tests using the unittest module?',
      options: ['python -m unittest', 'python --delete-tests', 'git test all', 'pip run unittest'],
      correctAnswer: 0
    },
    {
      question: 'What should you do if an API key is accidentally published in a public repository?',
      options: ['Only rename the variable', 'Ignore it if the project works', 'Revoke or rotate the exposed key and remove the secret from the project', 'Add another copy of the key'],
      correctAnswer: 2
    },
    {
      question: 'What is the primary purpose of Git?',
      options: ['To replace Python', 'To track changes to files and support version control', 'To automatically fix every bug', 'To host databases only'],
      correctAnswer: 1
    },
    {
      question: 'Why should software be tested with invalid and boundary inputs?',
      options: ['To make the code longer', 'To avoid writing documentation', 'To ensure errors never happen anywhere', 'To discover incorrect behavior in edge cases'],
      correctAnswer: 3
    },
    {
      question: 'What is the purpose of a README file?',
      options: ['To explain the project and how to install, run, and test it', 'To store passwords', 'To replace all source code', 'To automatically deploy every project'],
      correctAnswer: 0
    }
  ]
}
  ]

};