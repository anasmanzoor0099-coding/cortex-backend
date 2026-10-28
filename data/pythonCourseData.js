export const pythonCourseData = {
  title: 'Advanced Python Mastery',
  description: 'Level up from beginner to pro. Master Decorators, Generators, Asyncio, Concurrency, Memory Management, and Advanced OOP.',
  thumbnail: 'python',
  totalDuration: '18h 45m',
  modules: [
    {
      title: 'Decorators & Closures',
      duration: '2h 00m',
      notes: `### The Power of Functions
In Python, functions are first-class objects. This means they can be passed around as arguments, returned from other functions, and assigned to variables.

A **Closure** is a function object that remembers values in enclosing scopes even if they are not present in memory. 

A **Decorator** is a function that takes another function and extends its behavior without explicitly modifying it. 

\`\`\`python
def my_decorator(func):
    def wrapper():
        print("Before the function is called.")
        func()
        print("After the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
\`\`\`

### Real-World Use Cases
Decorators are used in web frameworks (Flask/Django) for routing, in authentication to check if a user is logged in, and for logging execution time.`,
      codeExample: 'import time\n\ndef timer_decorator(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f"{func.__name__} took {end - start:.4f}s")\n        return result\n    return wrapper\n\n@timer_decorator\ndef process_data():\n    time.sleep(1.5)\n    print("Data processed")\n\nprocess_data()',
      quiz: [{ question: 'What is the symbol used to apply a decorator?', options: ['#', '@', '$', '&'], correctAnswer: 1 }]
    },
    {
      title: 'Generators & Iterators',
      duration: '2h 30m',
      notes: `### Memory Efficiency
When you create a list (e.g., \`[x for x in range(1000000)]\`), Python allocates memory for all 1 million numbers at once.

**Generators** use the \`yield\` keyword to produce a sequence of results lazily. They only compute the next value when you ask for it, saving immense amounts of RAM.

\`\`\`python
def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1

counter = count_up_to(5)
print(next(counter)) # 1
print(next(counter)) # 2
\`\`\`

### Iterators vs Iterables
An **Iterable** is an object that can return an iterator (like a list). An **Iterator** is an object with a \`__next__\` method that keeps track of its current state. Generators are a simpler way to create iterators.`,
      codeExample: '# Generator expression (like list comprehension but with parentheses)\ngen = (x * x for x in range(1, 6))\n\nfor val in gen:\n    print(val)\n\n# Output: 1, 4, 9, 16, 25\n# The whole list was never stored in memory!',
      quiz: [{ question: 'Which keyword pauses a generator function and sends a value back?', options: ['return', 'yield', 'async', 'await'], correctAnswer: 1 }]
    },
    {
      title: 'Asynchronous Python (Asyncio)',
      duration: '3h 00m',
      notes: `### Concurrency vs Parallelism
By default, Python is synchronous. If you make a network request that takes 5 seconds, the program freezes.

**Asyncio** is a library to write concurrent code using the \`async\` / \`await\` syntax. It uses a single thread but switches between tasks when one is waiting for I/O (like network requests or reading files).

\`\`\`python
import asyncio

async def fetch_data():
    print("Start fetching...")
    await asyncio.sleep(2) # Non-blocking wait
    print("Data fetched!")
    return {"data": "mocked"}

async def main():
    await fetch_data()

asyncio.run(main())
\`\`\`

### When to use Asyncio?
Use it for **I/O bound** tasks (web scraping, API calls, database queries). Do NOT use it for CPU-bound tasks (heavy math, image processing).`,
      codeExample: 'import asyncio\n\nasync def task1():\n    await asyncio.sleep(1)\n    print("Task 1 Done")\n\nasync def task2():\n    await asyncio.sleep(2)\n    print("Task 2 Done")\n\nasync def main():\n    # Run both tasks AT THE SAME TIME\n    await asyncio.gather(task1(), task2())\n\nasyncio.run(main())',
      quiz: [{ question: 'What does await do?', options: ['Stops the program', 'Pauses the coroutine and yields control', 'Deletes the function', 'Creates a new thread'], correctAnswer: 1 }]
    },
    {
      title: 'Concurrency: Multithreading & Multiprocessing',
      duration: '3h 00m',
      notes: `### The GIL (Global Interpreter Lock)
Python has a GIL, which means only one thread can execute Python bytecode at a time. This is a major limitation. 

*   **Multithreading** (\`threading\` module) is good for **I/O-bound** tasks (like downloading files). The GIL is released during I/O operations.
*   **Multiprocessing** (\`multiprocessing\` module) bypasses the GIL by spawning entirely new Python processes. This is perfect for **CPU-bound** tasks (like heavy math or video rendering).

\`\`\`python
from multiprocessing import Pool

def square(x):
    return x * x

if __name__ == '__main__':
    with Pool(4) as p: # Uses 4 CPU cores
        print(p.map(square, [1, 2, 3, 4]))
\`\`\`

### When to use which?
*   Downloading 100 images? -> **Threading** (or Asyncio).
*   Calculating prime numbers up to 1 billion? -> **Multiprocessing**.`,
      codeExample: 'import time\nfrom multiprocessing import Process\n\ndef heavy_task(name):\n    print(f"Starting {name}")\n    time.sleep(2)\n    print(f"Finished {name}")\n\nif __name__ == "__main__":\n    p1 = Process(target=heavy_task, args=("Process 1",))\n    p2 = Process(target=heavy_task, args=("Process 2",))\n    p1.start()\n    p2.start()\n    p1.join()\n    p2.join()\n    print("Both processes completed")',
      quiz: [{ question: 'What does the GIL stand for?', options: ['Global Interpreter Lock', 'General Interface Language', 'Graphic Input Layer', 'Global Integration Logic'], correctAnswer: 0 }]
    },
    {
      title: 'Advanced Object-Oriented Programming',
      duration: '2h 30m',
      notes: `### Dunder (Magic) Methods
Python classes have special methods surrounded by double underscores. They allow your custom objects to behave like built-in types.

*   \`__str__\`: Defines what \`print(object)\` shows.
*   \`__repr__\`: Defines the official string representation (used in debugging).
*   \`__len__\`: Allows you to use \`len(object)\`.
*   \`__getitem__\`: Allows you to index your object like a list.

\`\`\`python
class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

    def __str__(self):
        return f"Book: {self.title}"

    def __len__(self):
        return self.pages

my_book = Book("Python Mastery", 300)
print(my_book)      # Book: Python Mastery
print(len(my_book)) # 300
\`\`\`

### Class Methods vs Static Methods
*   \`@classmethod\`: Takes \`cls\` as the first argument and can modify class state.
*   \`@staticmethod\`: Doesn't take \`self\` or \`cls\`. Just a regular function inside a class.`,
      codeExample: 'class Employee:\n    raise_amount = 1.05\n\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\n    @classmethod\n    def set_raise_amount(cls, amount):\n        cls.raise_amount = amount\n\n    def apply_raise(self):\n        self.salary = int(self.salary * self.raise_amount)\n\nEmployee.set_raise_amount(1.10)\nemp = Employee("Anas", 50000)\nemp.apply_raise()\nprint(emp.salary) # 55000',
      quiz: [{ question: 'Which dunder method allows the use of len(object)?', options: ['__size__', '__length__', '__len__', '__count__'], correctAnswer: 2 }]
    },
    {
      title: 'Memory Management & Garbage Collection',
      duration: '2h 15m',
      notes: `### Python Memory Model
Python manages memory automatically. Every object in Python has a reference count. When an object is created, its reference count is 1. When you assign it to another variable, the count increases. When a variable is deleted, the count decreases.

When the reference count reaches **zero**, Python's Garbage Collector automatically destroys the object and frees the memory.

\`\`\`python
import sys

a = [1, 2, 3]
print(sys.getrefcount(a)) # Output: 2 (a and the getrefcount argument)
b = a
print(sys.getrefcount(a)) # Output: 3
del b
print(sys.getrefcount(a)) # Output: 2
\`\`\`

### Circular References
If Object A points to Object B, and Object B points to Object A, their reference counts will never reach zero, causing a memory leak. Python has a "Cyclic Garbage Collector" that detects and cleans these up.`,
      codeExample: 'import gc\n\n# Force garbage collection\ngc.collect()\n\n# Disable garbage collection (rarely recommended)\n# gc.disable()\n\n# Check threshold for garbage collection\nprint(gc.get_threshold())',
      quiz: [{ question: 'How does Python primarily track memory?', options: ['Pointers', 'Reference Counting', 'Manual Allocation', 'Linked Lists'], correctAnswer: 1 }]
    },
    {
      title: 'Advanced Data Structures',
      duration: '2h 30m',
      notes: `### Beyond Lists and Dictionaries
Python's standard library provides highly optimized data structures in the \`collections\` module.

*   **\`Counter\`**: A dictionary subclass for counting hashable objects.
*   **\`defaultdict\`**: A dictionary that provides a default value for missing keys, preventing KeyErrors.
*   **\`deque\` (Double-Ended Queue)**: Like a list, but appending and popping from the *left* side is extremely fast (O(1) time complexity).

\`\`\`python
from collections import Counter, defaultdict, deque

# Counter
words = ["apple", "banana", "apple", "orange", "banana", "apple"]
count = Counter(words)
print(count) # Counter({'apple': 3, 'banana': 2, 'orange': 1})

# defaultdict
dd = defaultdict(int)
dd["new_key"] += 1
print(dd) # defaultdict(<class 'int'>, {'new_key': 1})
\`\`\`

### Why use deque?
A standard list takes O(n) time to insert at the beginning. A deque takes O(1) time. Use deque when you need a queue (FIFO) or stack (LIFO).`,
      codeExample: 'from collections import deque\n\nq = deque([1, 2, 3])\nq.append(4)      # Add to right\nq.appendleft(0)  # Add to left\nprint(q) # deque([0, 1, 2, 3, 4])\n\nq.pop()          # Remove from right\nq.popleft()      # Remove from left\nprint(q) # deque([1, 2, 3])',
      quiz: [{ question: 'Which data structure is best for fast insertions at both ends?', options: ['List', 'Tuple', 'Deque', 'Set'], correctAnswer: 2 }]
    },
    {
      title: 'Testing in Python (Unit Testing)',
      duration: '2h 15m',
      notes: `### Why Test?
Professional developers do not just write code; they write code that *proves* their other code works. Testing prevents bugs from reaching production.

### Pytest vs Unittest
Python has a built-in \`unittest\` module, but the industry standard is **Pytest** because it uses simple \`assert\` statements.

\`\`\`python
# test_math.py
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
\`\`\`
You run tests by typing \`pytest\` in the terminal.

### Test-Driven Development (TDD)
TDD is a workflow where you write the *test first*, watch it fail, and then write the code to make the test pass. This results in much cleaner architecture.`,
      codeExample: 'import pytest\n\ndef divide(a, b):\n    if b == 0:\n        raise ValueError("Cannot divide by zero")\n    return a / b\n\ndef test_divide():\n    assert divide(10, 2) == 5.0\n\ndef test_divide_by_zero():\n    with pytest.raises(ValueError):\n        divide(10, 0)',
      quiz: [{ question: 'Which keyword is used in Pytest to check if an error is raised?', options: ['pytest.raise', 'pytest.throws', 'pytest.raises', 'pytest.error'], correctAnswer: 2 }]
    },
    {
      title: 'Web Scraping (BeautifulSoup)',
      duration: '2h 45m',
      notes: `### Scraping the Web
Web scraping is the process of extracting data from websites. Python is the king of web scraping using two libraries: **Requests** (to download the HTML) and **BeautifulSoup** (to parse the HTML).

\`\`\`python
import requests
from bs4 import BeautifulSoup

url = "https://example.com"
response = requests.get(url)

soup = BeautifulSoup(response.text, 'html.parser')
title = soup.find('h1').text
print(title)
\`\`\`

### Ethical Scraping
Always check a website's \`robots.txt\` file (e.g., \`example.com/robots.txt\`) to see if they allow scraping. Do not spam their servers with thousands of requests per second.`,
      codeExample: 'import requests\nfrom bs4 import BeautifulSoup\n\nurl = "https://news.ycombinator.com/"\nresponse = requests.get(url)\nsoup = BeautifulSoup(response.text, "html.parser")\n\n# Find all headline links\nheadlines = soup.find_all("span", class_="titleline")\nfor h in headlines[:5]:\n    print(h.text)',
      quiz: [{ question: 'Which library is used to parse HTML in Python?', options: ['Pandas', 'NumPy', 'BeautifulSoup', 'Requests'], correctAnswer: 2 }]
    }
  ]
};