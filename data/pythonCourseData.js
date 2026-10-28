export const pythonCourseData = {
  title: 'The Complete Python Masterclass: A to Z',
  description: 'From absolute beginner to professional developer. Master basics, OOP, decorators, async programming, and memory management.',
  thumbnail: 'python',
  totalDuration: '32h 45m',
  modules: [
    // --- LEVEL 1: A TO Z BASICS ---
    {
      title: 'Basics: Variables, Data Types & Operators',
      duration: '3h 00m',
      notes: `### Welcome to Python
Python is a high-level, interpreted programming language known for its clean syntax that reads almost like English. It is the most popular language for Data Science, AI, Web Development, and Automation.

### Variables and Memory
In Python, you don't need to explicitly declare the type of a variable. It is dynamically typed. When you write \`x = 5\`, Python creates an integer object in memory and binds the name \`x\` to it.

\`\`\`python
name = "Anas"       # String
age = 21            # Integer
height = 5.9        # Float
is_developer = True # Boolean
\`\`\`

### Core Data Types Deep Dive
1.  **Strings**: Immutable sequences of characters. You can use single quotes, double quotes, or triple quotes for multi-line strings.
2.  **Numbers**: Python supports Integers (unlimited size), Floating-point numbers (decimals), and Complex numbers.
3.  **Booleans**: Represent truth values (\`True\` or \`False\`). They are subclasses of integers (True is 1, False is 0).
4.  **NoneType**: Represents the absence of a value. It is a singleton object in Python (only one instance exists).

### Operators
*   **Arithmetic**: \`+\`, \`-\`, \`*\`, \`/\`, \`//\` (floor division), \`%\` (modulo), \`**\` (exponent).
*   **Comparison**: \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`.
*   **Logical**: \`and\`, \`or\`, \`not\`.
*   **Assignment**: \`=\`, \`+=\`, \`-=\`, \`*=\`.

### Type Casting
Sometimes you need to convert one type to another.
\`\`\`python
num_str = "100"
num_int = int(num_str) # Converts string to integer
print(num_int + 50) # Output: 150
\`\`\``,
      codeExample: 'name = "Anas"\nage = 21\nprint(f"My name is {name} and I am {age} years old.")\n\n# Checking types\nprint(type(name)) # <class \'str\'>\nprint(type(age))  # <class \'int\'>',
      quiz: [{ question: 'Which data type represents a decimal number?', options: ['int', 'str', 'float', 'bool'], correctAnswer: 2 }]
    },
    {
      title: 'Basics: Control Flow & Loops',
      duration: '3h 30m',
      notes: `### Making Decisions (If / Elif / Else)
Control flow allows your program to make decisions based on conditions. In Python, we use indentation (spaces) instead of curly braces \`{}\` to define blocks of code.

\`\`\`python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
else:
    print("Grade: C or below")
\`\`\`

### Loops: For and While
1.  **For Loop**: Used to iterate over a sequence (like a list, string, or range). It is a "for-each" loop.
\`\`\`python
for i in range(5): # Runs from 0 to 4
    print(i)
\`\`\`
2.  **While Loop**: Repeats as long as a condition is True. Be careful, as it can cause an infinite loop if the condition never becomes False.
\`\`\`python
count = 0
while count < 3:
    print("Hello")
    count += 1
\`\`\`

### Loop Control Statements
*   **\`break\`**: Exits the loop entirely.
*   **\`continue\`**: Skips the rest of the current iteration and jumps to the next one.
*   **\`else\` block in loops**: Executes only if the loop finished without hitting a \`break\`.`,
      codeExample: '# Printing even numbers\nfor i in range(1, 11):\n    if i % 2 != 0:\n        continue # Skip odd numbers\n    print(i)',
      quiz: [{ question: 'Which keyword is used to exit a loop immediately?', options: ['continue', 'pass', 'break', 'exit'], correctAnswer: 2 }]
    },
    {
      title: 'Basics: Data Structures & Functions',
      duration: '4h 00m',
      notes: `### Collections in Python
Python provides four built-in data structures:
1.  **List \`[]\`**: Ordered, mutable (changeable), allows duplicates.
2.  **Tuple \`()\`**: Ordered, immutable (unchangeable), allows duplicates.
3.  **Set \`{}\`**: Unordered, mutable, NO duplicates allowed.
4.  **Dictionary \`{key: value}\`**: Unordered, mutable, key-value pairs.

\`\`\`python
# Dictionary example
student = {"name": "Anas", "age": 21}
print(student["name"])
\`\`\`

### Functions
Functions are reusable blocks of code. They help you follow the **DRY** (Don't Repeat Yourself) principle.

\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Anas")) # Hello, Anas!
print(greet("Anas", "Hi")) # Hi, Anas!
\`\`\`

### *args and **kwargs
*   **\`*args\`**: Allows a function to accept any number of positional arguments as a tuple.
*   **\`**kwargs\`**: Allows a function to accept any number of keyword arguments as a dictionary.
\`\`\`python
def my_func(*args, **kwargs):
    print(args)
    print(kwargs)

my_func(1, 2, 3, name="Anas") 
# Output: (1, 2, 3) \n {'name': 'Anas'}
\`\`\``,
      codeExample: 'def calculate_total(*prices):\n    return sum(prices)\n\nprint(calculate_total(10.5, 20.0, 5.99))\n\n# Dictionary comprehension\nsquares = {x: x*x for x in range(5)}\nprint(squares) # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}',
      quiz: [{ question: 'Which data structure does NOT allow duplicate values?', options: ['List', 'Tuple', 'Set', 'Dictionary'], correctAnswer: 2 }]
    },

    // --- LEVEL 2: INTERMEDIATE ---
    {
      title: 'Intermediate: Object-Oriented Programming (OOP)',
      duration: '3h 45m',
      notes: `### Classes and Objects
OOP is a programming paradigm based on the concept of "objects", which can contain data (attributes) and code (methods). 
A **Class** is a blueprint. An **Object** is an instance of that blueprint.

\`\`\`python
class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"
    
    # __init__ is the constructor
    def __init__(self, name, age):
        # Instance attributes (unique to each instance)
        self.name = name
        self.age = age
        
    def bark(self):
        return f"{self.name} says Woof!"

my_dog = Dog("Tommy", 3)
print(my_dog.bark())
\`\`\`

### The 4 Pillars of OOP
1.  **Encapsulation**: Bundling data and methods within a single unit (class).
2.  **Abstraction**: Hiding complex implementation details and showing only essential features.
3.  **Inheritance**: A child class inherits properties from a parent class.
\`\`\`python
class Animal:
    def eat(self):
        print("Eating...")

class Cat(Animal): # Inherits from Animal
    def meow(self):
        print("Meow!")
\`\`\`
4.  **Polymorphism**: The ability of different classes to respond to the same method call in their own way.`,
      codeExample: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        print(f"Deposited {amount}. New balance: {self.balance}")\n\naccount = BankAccount("Anas", 500)\naccount.deposit(250)',
      quiz: [{ question: 'Which pillar of OOP allows a child class to acquire properties of a parent class?', options: ['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism'], correctAnswer: 2 }]
    },
    {
      title: 'Intermediate: Error Handling & File I/O',
      duration: '3h 00m',
      notes: `### Error Handling (Try / Except)
In real-world apps, things go wrong: a file is missing, a network connection drops, or a user enters invalid data. If unhandled, these crash your program. Python uses **Exceptions**.

\`\`\`python
try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("You cannot divide by zero!")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
finally:
    print("This block always runs, error or no error.")
\`\`\`

### File Handling
Python makes it easy to read and write files using the \`open()\` function. It's best practice to use the \`with\` statement, which automatically closes the file for you (even if an error occurs).

\`\`\`python
# Writing to a file
with open("notes.txt", "w") as file:
    file.write("Hello Cortex!\\n")
    file.write("Python is awesome.\\n")

# Reading from a file
with open("notes.txt", "r") as file:
    content = file.read()
    print(content)
\`\`\`

### File Modes
*   \`r\`: Read (default)
*   \`w\`: Write (overwrites existing file)
*   \`a\`: Append (adds to the end of the file)
*   \`b\`: Binary mode (for images, PDFs)`,
      codeExample: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Cannot divide by zero"\n    finally:\n        print("Division attempt finished.")\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))',
      quiz: [{ question: 'Which block is ALWAYS executed whether an error occurs or not?', options: ['except', 'else', 'finally', 'catch'], correctAnswer: 2 }]
    },
    {
      title: 'Intermediate: Advanced Functions (Lambda & Comprehensions)',
      duration: '3h 15m',
      notes: `### Lambda Functions
A lambda function is a small, anonymous function. It can take any number of arguments but can only have one expression. They are used for short, throwaway operations.

\`\`\`python
# Normal function
def add(x, y):
    return x + y

# Lambda function
add_lambda = lambda x, y: x + y
print(add_lambda(2, 3)) # 5
\`\`\`

### List Comprehensions
A concise way to create lists based on existing lists. It is faster and more readable than using a for loop with append().

\`\`\`python
# Normal way
squares = []
for i in range(10):
    squares.append(i * i)

# Comprehension way
squares = [i * i for i in range(10)]
\`\`\`

### Map, Filter, and Reduce
These are functional programming tools:
*   **Map**: Applies a function to all items in an iterable.
*   **Filter**: Filters items based on a condition.
*   **Reduce**: Applies a rolling computation (like sum) to sequential pairs.

\`\`\`python
from functools import reduce

nums = [1, 2, 3, 4]
doubled = list(map(lambda x: x * 2, nums)) # [2, 4, 6, 8]
evens = list(filter(lambda x: x % 2 == 0, nums)) # [2, 4]
total = reduce(lambda x, y: x + y, nums) # 10
\`\`\``,
      codeExample: '# Finding names starting with A\nnames = ["Anas", "Bob", "Alice", "Charlie"]\na_names = [name for name in names if name.startswith("A")]\nprint(a_names) # [\'Anas\', \'Alice\']',
      quiz: [{ question: 'What is the return type of a lambda function?', options: ['It must have explicit return', 'Implicit return of the expression', 'Always returns None', 'Returns a tuple'], correctAnswer: 1 }]
    },

    // --- LEVEL 3: PROFESSIONAL ---
    {
      title: 'Professional: Decorators & Generators',
      duration: '4h 00m',
      notes: `### Decorators
A decorator is a function that takes another function and extends its behavior without explicitly modifying it. It is heavily used in frameworks (like \`@app.route\` in Flask).

\`\`\`python
def my_decorator(func):
    def wrapper():
        print("Something before the function.")
        func()
        print("Something after the function.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
\`\`\`

### Generators and Yield
When you create a list of 1 million items, it takes massive memory. Generators use the \`yield\` keyword to produce items one at a time, lazily, using minimal memory.

\`\`\`python
def generate_numbers(n):
    for i in range(n):
        yield i * i

gen = generate_numbers(1000000)
print(next(gen)) # 0
print(next(gen)) # 1
\`\`\`
They are the foundation of efficient data processing in Python.`,
      codeExample: 'import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"Took {time.time() - start}s")\n        return result\n    return wrapper\n\n@timer\ndef heavy_task():\n    time.sleep(1)\n\nheavy_task()',
      quiz: [{ question: 'Which keyword turns a normal function into a generator?', options: ['return', 'yield', 'async', 'await'], correctAnswer: 1 }]
    },
    {
      title: 'Professional: Asyncio & Concurrency',
      duration: '4h 30m',
      notes: `### Synchronous vs Asynchronous
By default, Python is synchronous. If a task takes 5 seconds, it blocks everything else. 

**Asyncio** allows you to write concurrent code using the \`async\` and \`await\` keywords. It runs on a single thread but switches between tasks when waiting for I/O operations (like API calls or database queries).

\`\`\`python
import asyncio

async def fetch_data():
    print("Start fetching...")
    await asyncio.sleep(2) # Simulates a 2s network call
    print("Done fetching!")
    return {"data": "result"}

async def main():
    await fetch_data()

asyncio.run(main())
\`\`\`

### Concurrency: Threading vs Multiprocessing
Because of Python's GIL (Global Interpreter Lock), only one thread executes Python bytecode at a time.
*   **Threading**: Great for I/O-bound tasks (downloading files, web scraping). The GIL is released during I/O.
*   **Multiprocessing**: Bypasses the GIL by creating separate Python processes. Great for CPU-bound tasks (heavy math, video processing).

\`\`\`python
from multiprocessing import Pool

def square(x):
    return x * x

if __name__ == "__main__":
    with Pool(4) as p: # Uses 4 CPU cores
        print(p.map(square, [1, 2, 3, 4]))
\`\`\``,
      codeExample: 'import asyncio\n\nasync def task(name, seconds):\n    print(f"Starting {name}")\n    await asyncio.sleep(seconds)\n    print(f"Finished {name}")\n\nasync def main():\n    # Runs both tasks at the same time\n    await asyncio.gather(\n        task("Task 1", 2),\n        task("Task 2", 1)\n    )\n\nasyncio.run(main())',
      quiz: [{ question: 'Which is better for CPU-bound heavy tasks (like data crunching)?', options: ['Threading', 'Asyncio', 'Multiprocessing', 'Single-threading'], correctAnswer: 2 }]
    },
    {
      title: 'Professional: Advanced OOP & Dunder Methods',
      duration: '4h 15m',
      notes: `### Dunder (Magic) Methods
Python classes have special methods surrounded by double underscores. They allow your custom objects to behave like built-in Python types.

*   \`__init__\`: Constructor.
*   \`__str__\`: What \`print(object)\` shows.
*   \`__repr__\`: Official string representation (used in debugging).
*   \`__len__\`: Allows use of \`len(object)\`.
*   \`__getitem__\`: Allows indexing like a list.

\`\`\`python
class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        return len(self.songs)

    def __getitem__(self, index):
        return self.songs[index]

my_playlist = Playlist(["Song A", "Song B", "Song C"])
print(len(my_playlist)) # 3
print(my_playlist[1])   # Song B
\`\`\`

### Class Methods vs Static Methods
*   **@classmethod**: Takes \`cls\` as the first argument. Used to create factory methods or access class-level variables.
*   **@staticmethod**: Doesn't take \`self\` or \`cls\`. It behaves like a normal function but is placed inside the class for logical grouping.`,
      codeExample: 'class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n\n    def __repr__(self):\n        return f"Vector({self.x}, {self.y})"\n\nv1 = Vector(2, 3)\nv2 = Vector(5, 1)\nprint(v1 + v2) # Vector(7, 4)',
      quiz: [{ question: 'Which dunder method allows you to add two objects using the + operator?', options: ['__add__', '__plus__', '__sum__', '__concat__'], correctAnswer: 0 }]
    }
  ]
};