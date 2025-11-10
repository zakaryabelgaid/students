const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

// C Programming Lessons Data
const cProgrammingLessons = [
  // LEVEL 1: Fundamentals
  {
    title: 'Variables & Data Types',
    content: `Think of variables like labeled boxes in a warehouse. Each box has a name (variable name) and can store specific types of items (data).

**What are Variables?**
Variables are containers that hold data. In C, you must declare a variable before using it, specifying its type.

**Key Concepts:**
- **Declaration**: Telling C about a variable \`int age;\`
- **Initialization**: Giving it a value \`age = 25;\`
- **Assignment**: Changing the value \`age = 26;\`

**Data Types Explained:**
- \`int\`: Whole numbers (e.g., 25, -10, 1000)
- \`float\`: Decimal numbers (e.g., 3.14, 2.5)
- \`char\`: Single character (e.g., 'A', 'z', '5')
- \`double\`: High-precision decimals (e.g., 3.14159265359)

**Why Different Types?**
Different data types use different amounts of memory and have different ranges. Choosing the right type makes your program efficient.`,
    level: 1,
    category: 'C Programming',
    topic: 'variables',
    estimatedTime: 30,
    codeExamples: [
      {
        title: 'Basic Variable Declaration',
        code: `#include <stdio.h>

int main() {
    // Integer variable
    int age = 25;
    
    // Floating point variable
    float height = 5.9;
    
    // Character variable
    char grade = 'A';
    
    // Display values
    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Grade: %c\\n", grade);
    
    return 0;
}`,
        explanation: 'This example shows how to declare and initialize different data types in C.'
      },
      {
        title: 'Variable Operations',
        code: `#include <stdio.h>

int main() {
    int a = 10;
    int b = 20;
    int sum, product;
    
    sum = a + b;
    product = a * b;
    
    printf("Sum: %d\\n", sum);
    printf("Product: %d\\n", product);
    
    return 0;
}`,
        explanation: 'Performing basic arithmetic operations with variables.'
      }
    ],
    exercises: [
      {
        title: 'Student Information',
        description: 'Create a program that stores and displays information about a student: name (string), age (integer), GPA (float), and grade (character).',
        solution: `#include <stdio.h>

int main() {
    char name[] = "Alice";
    int age = 20;
    float gpa = 3.8;
    char grade = 'A';
    
    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("GPA: %.1f\\n", gpa);
    printf("Grade: %c\\n", grade);
    
    return 0;
}`,
        difficulty: 'easy'
      }
    ]
  },
  {
    title: 'Conditions & Control Flow',
    content: `Control flow allows your program to make decisions. Think of it like a choose-your-own-adventure book where different paths lead to different outcomes.

**If-Else Statements:**
The \`if\` statement checks a condition. If true, it executes code; otherwise, it can execute alternative code with \`else\`.

**Comparison Operators:**
- \`==\`: Equal to
- \`!=\`: Not equal to
- \`>\`: Greater than
- \`<\`: Less than
- \`>=\`: Greater than or equal
- \`<=\`: Less than or equal

**Logical Operators:**
- \`&&\`: AND (both conditions must be true)
- \`||\`: OR (at least one condition must be true)
- \`!\`: NOT (reverses the condition)

**Switch Statements:**
Use \`switch\` when you have multiple conditions based on a single variable value.`,
    level: 1,
    category: 'C Programming',
    topic: 'conditions',
    estimatedTime: 35,
    prerequisites: [],
    codeExamples: [
      {
        title: 'If-Else Example',
        code: `#include <stdio.h>

int main() {
    int score = 85;
    
    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else if (score >= 70) {
        printf("Grade: C\\n");
    } else {
        printf("Grade: F\\n");
    }
    
    return 0;
}`,
        explanation: 'Using if-else to determine a grade based on score.'
      },
      {
        title: 'Switch Statement',
        code: `#include <stdio.h>

int main() {
    int day = 3;
    
    switch(day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        default:
            printf("Invalid day\\n");
    }
    
    return 0;
}`,
        explanation: 'Using switch statement for multiple conditions.'
      }
    ],
    exercises: [
      {
        title: 'Age Checker',
        description: 'Write a program that checks if a person is a minor (<18), adult (18-64), or senior (65+).',
        solution: `#include <stdio.h>

int main() {
    int age = 25;
    
    if (age < 18) {
        printf("Minor\\n");
    } else if (age < 65) {
        printf("Adult\\n");
    } else {
        printf("Senior\\n");
    }
    
    return 0;
}`,
        difficulty: 'easy'
      }
    ]
  },
  {
    title: 'Loops & Iteration',
    content: `Loops allow you to repeat code multiple times. Think of loops like a factory assembly line that repeats the same process.

**For Loop:**
Best when you know exactly how many times to repeat. Has initialization, condition, and increment.

**While Loop:**
Repeats as long as a condition is true. Good when you don't know the exact number of iterations.

**Do-While Loop:**
Similar to while, but always executes at least once before checking the condition.

**Loop Control:**
- \`break\`: Exits the loop immediately
- \`continue\`: Skips to the next iteration`,
    level: 1,
    category: 'C Programming',
    topic: 'loops',
    estimatedTime: 40,
    prerequisites: [],
    codeExamples: [
      {
        title: 'For Loop Example',
        code: `#include <stdio.h>

int main() {
    int i;
    
    // Print numbers 1 to 10
    for (i = 1; i <= 10; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    
    return 0;
}`,
        explanation: 'Using for loop to print numbers from 1 to 10.'
      },
      {
        title: 'While Loop Example',
        code: `#include <stdio.h>

int main() {
    int count = 0;
    
    while (count < 5) {
        printf("Count: %d\\n", count);
        count++;
    }
    
    return 0;
}`,
        explanation: 'Using while loop with a counter.'
      }
    ],
    exercises: [
      {
        title: 'Sum of Numbers',
        description: 'Write a program that calculates the sum of numbers from 1 to 100 using a loop.',
        solution: `#include <stdio.h>

int main() {
    int i, sum = 0;
    
    for (i = 1; i <= 100; i++) {
        sum += i;
    }
    
    printf("Sum: %d\\n", sum);
    
    return 0;
}`,
        difficulty: 'medium'
      }
    ]
  },
  {
    title: 'Arrays & Strings',
    content: `Arrays are like a row of lockers, each with a number. You can store multiple values of the same type in one variable.

**Arrays:**
- Fixed size collection of elements
- Indexed starting from 0
- All elements must be the same type

**Strings:**
In C, strings are arrays of characters ending with '\\0' (null terminator).

**Common Operations:**
- Accessing elements: \`array[index]\`
- Modifying elements: \`array[index] = value\`
- String functions: \`strlen()\`, \`strcpy()\`, \`strcat()\``,
    level: 1,
    category: 'C Programming',
    topic: 'arrays',
    estimatedTime: 45,
    prerequisites: [],
    codeExamples: [
      {
        title: 'Array Basics',
        code: `#include <stdio.h>

int main() {
    int numbers[5] = {10, 20, 30, 40, 50};
    int i;
    
    // Print all elements
    for (i = 0; i < 5; i++) {
        printf("numbers[%d] = %d\\n", i, numbers[i]);
    }
    
    return 0;
}`,
        explanation: 'Creating and accessing array elements.'
      },
      {
        title: 'String Operations',
        code: `#include <stdio.h>
#include <string.h>

int main() {
    char name[50] = "John";
    
    printf("Name: %s\\n", name);
    printf("Length: %lu\\n", strlen(name));
    
    strcat(name, " Doe");
    printf("Full name: %s\\n", name);
    
    return 0;
}`,
        explanation: 'Working with strings in C.'
      }
    ],
    exercises: [
      {
        title: 'Array Sum',
        description: 'Create an array of 10 integers, fill it with values, and calculate the sum of all elements.',
        solution: `#include <stdio.h>

int main() {
    int arr[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int i, sum = 0;
    
    for (i = 0; i < 10; i++) {
        sum += arr[i];
    }
    
    printf("Sum: %d\\n", sum);
    
    return 0;
}`,
        difficulty: 'medium'
      }
    ]
  },
  {
    title: 'Functions & Scope',
    content: `Functions are like recipes - reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.

**Function Structure:**
\`return_type function_name(parameters) { ... }\`

**Benefits:**
- Code reusability
- Better organization
- Easier debugging
- Modular programming

**Scope:**
- Local variables: Only accessible within the function
- Global variables: Accessible throughout the program
- Parameters: Pass data into functions`,
    level: 1,
    category: 'C Programming',
    topic: 'functions',
    estimatedTime: 40,
    prerequisites: [],
    codeExamples: [
      {
        title: 'Simple Function',
        code: `#include <stdio.h>

// Function declaration
int add(int a, int b);

int main() {
    int result = add(5, 3);
    printf("Sum: %d\\n", result);
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}`,
        explanation: 'Creating and using a simple function.'
      },
      {
        title: 'Function with Multiple Parameters',
        code: `#include <stdio.h>

void greet(char name[], int age) {
    printf("Hello, %s! You are %d years old.\\n", name, age);
}

int main() {
    greet("Alice", 25);
    greet("Bob", 30);
    return 0;
}`,
        explanation: 'Functions can take multiple parameters.'
      }
    ],
    exercises: [
      {
        title: 'Calculate Area',
        description: 'Write a function that calculates the area of a rectangle (length × width) and call it from main.',
        solution: `#include <stdio.h>

float calculateArea(float length, float width) {
    return length * width;
}

int main() {
    float area = calculateArea(5.0, 3.0);
    printf("Area: %.2f\\n", area);
    return 0;
}`,
        difficulty: 'easy'
      }
    ]
  },
  // LEVEL 2: Advanced Concepts
  {
    title: 'Pointers & Memory Management',
    content: `Pointers are like addresses - they tell you where data is stored in memory. Understanding pointers is crucial for advanced C programming.

**What are Pointers?**
Pointers store memory addresses. They "point" to where data is stored.

**Key Concepts:**
- \`*\`: Dereference operator (get value at address)
- \`&\`: Address-of operator (get address of variable)
- \`malloc()\`: Allocate memory dynamically
- \`free()\`: Release allocated memory

**Why Use Pointers?**
- Efficient memory usage
- Pass by reference
- Dynamic memory allocation
- Working with arrays and strings`,
    level: 2,
    category: 'C Programming',
    topic: 'pointers',
    estimatedTime: 50,
    prerequisites: [],
    codeExamples: [
      {
        title: 'Basic Pointers',
        code: `#include <stdio.h>

int main() {
    int num = 10;
    int *ptr = &num;  // ptr stores address of num
    
    printf("Value: %d\\n", num);
    printf("Address: %p\\n", &num);
    printf("Value via pointer: %d\\n", *ptr);
    
    *ptr = 20;  // Change value through pointer
    printf("New value: %d\\n", num);
    
    return 0;
}`,
        explanation: 'Basic pointer operations.'
      },
      {
        title: 'Dynamic Memory Allocation',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5, i;
    
    // Allocate memory
    arr = (int*)malloc(n * sizeof(int));
    
    // Use the array
    for (i = 0; i < n; i++) {
        arr[i] = i * 2;
    }
    
    // Print values
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    
    // Free memory
    free(arr);
    
    return 0;
}`,
        explanation: 'Dynamic memory allocation with malloc and free.'
      }
    ],
    exercises: [
      {
        title: 'Swap Function',
        description: 'Write a function that swaps two integers using pointers.',
        solution: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After: x=%d, y=%d\\n", x, y);
    return 0;
}`,
        difficulty: 'medium'
      }
    ]
  },
  {
    title: 'Structures & Unions',
    content: `Structures let you group related data together. Think of them like a form with multiple fields.

**Structures:**
- Group different data types together
- Create custom data types
- Access members with dot operator (.)

**Unions:**
Similar to structures, but all members share the same memory space. Only one member can be used at a time.

**Use Cases:**
- Representing complex data (student records, coordinates)
- Organizing related information
- Creating data structures`,
    level: 2,
    category: 'C Programming',
    topic: 'structures',
    estimatedTime: 45,
    prerequisites: [],
    codeExamples: [
      {
        title: 'Structure Example',
        code: `#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

int main() {
    struct Student s1;
    
    strcpy(s1.name, "Alice");
    s1.age = 20;
    s1.gpa = 3.8;
    
    printf("Name: %s\\n", s1.name);
    printf("Age: %d\\n", s1.age);
    printf("GPA: %.1f\\n", s1.gpa);
    
    return 0;
}`,
        explanation: 'Creating and using structures.'
      }
    ],
    exercises: [
      {
        title: 'Point Structure',
        description: 'Create a structure to represent a 2D point (x, y) and write a function to calculate distance between two points.',
        solution: `#include <stdio.h>
#include <math.h>

struct Point {
    float x;
    float y;
};

float distance(struct Point p1, struct Point p2) {
    return sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
}

int main() {
    struct Point p1 = {0, 0};
    struct Point p2 = {3, 4};
    
    printf("Distance: %.2f\\n", distance(p1, p2));
    return 0;
}`,
        difficulty: 'medium'
      }
    ]
  },
  {
    title: 'File Handling',
    content: `File handling allows your program to read from and write to files, making data persistent.

**File Operations:**
- \`fopen()\`: Open a file
- \`fclose()\`: Close a file
- \`fprintf()\`: Write formatted data
- \`fscanf()\`: Read formatted data
- \`fgets()\`: Read a line
- \`fputs()\`: Write a string

**File Modes:**
- \`"r"\`: Read mode
- \`"w"\`: Write mode (overwrites)
- \`"a"\`: Append mode
- \`"r+"\`: Read and write`,
    level: 2,
    category: 'C Programming',
    topic: 'files',
    estimatedTime: 40,
    prerequisites: [],
    codeExamples: [
      {
        title: 'Writing to File',
        code: `#include <stdio.h>

int main() {
    FILE *file = fopen("data.txt", "w");
    
    if (file == NULL) {
        printf("Error opening file\\n");
        return 1;
    }
    
    fprintf(file, "Hello, World!\\n");
    fprintf(file, "This is a test.\\n");
    
    fclose(file);
    printf("Data written successfully\\n");
    
    return 0;
}`,
        explanation: 'Writing data to a file.'
      },
      {
        title: 'Reading from File',
        code: `#include <stdio.h>

int main() {
    FILE *file = fopen("data.txt", "r");
    char line[100];
    
    if (file == NULL) {
        printf("Error opening file\\n");
        return 1;
    }
    
    while (fgets(line, sizeof(line), file)) {
        printf("%s", line);
    }
    
    fclose(file);
    return 0;
}`,
        explanation: 'Reading data from a file.'
      }
    ],
    exercises: [
      {
        title: 'Student Records',
        description: 'Write a program that saves student information (name, age, GPA) to a file and then reads it back.',
        solution: `#include <stdio.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

int main() {
    FILE *file;
    struct Student s;
    
    // Write
    file = fopen("students.txt", "w");
    fprintf(file, "Alice 20 3.8\\n");
    fprintf(file, "Bob 21 3.5\\n");
    fclose(file);
    
    // Read
    file = fopen("students.txt", "r");
    while (fscanf(file, "%s %d %f", s.name, &s.age, &s.gpa) != EOF) {
        printf("%s: Age %d, GPA %.1f\\n", s.name, s.age, s.gpa);
    }
    fclose(file);
    
    return 0;
}`,
        difficulty: 'hard'
      }
    ]
  },
  {
    title: 'Sorting Algorithms',
    content: `Sorting is organizing data in a specific order. Understanding sorting algorithms is fundamental to computer science.

**Common Algorithms:**
- **Bubble Sort**: Simple but slow, good for learning
- **Selection Sort**: Finds minimum and swaps
- **Insertion Sort**: Builds sorted array one element at a time
- **Quick Sort**: Fast, uses divide and conquer

**Time Complexity:**
- Bubble/Selection/Insertion: O(n²)
- Quick Sort: O(n log n) average case`,
    level: 2,
    category: 'C Programming',
    topic: 'sorting',
    estimatedTime: 50,
    prerequisites: [],
    codeExamples: [
      {
        title: 'Bubble Sort',
        code: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    int i, j, temp;
    for (i = 0; i < n-1; i++) {
        for (j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7, i;
    
    bubbleSort(arr, n);
    
    printf("Sorted array: ");
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    return 0;
}`,
        explanation: 'Implementing bubble sort algorithm.'
      }
    ],
    exercises: [
      {
        title: 'Selection Sort',
        description: 'Implement selection sort algorithm to sort an array of integers.',
        solution: `#include <stdio.h>

void selectionSort(int arr[], int n) {
    int i, j, min_idx, temp;
    for (i = 0; i < n-1; i++) {
        min_idx = i;
        for (j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = 5, i;
    
    selectionSort(arr, n);
    
    printf("Sorted: ");
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    return 0;
}`,
        difficulty: 'hard'
      }
    ]
  },
  {
    title: 'Recursion',
    content: `Recursion is when a function calls itself. Think of it like Russian nesting dolls - each doll contains a smaller version of itself.

**Key Concepts:**
- Base case: Condition that stops recursion
- Recursive case: Function calls itself
- Call stack: How recursive calls are managed

**Common Uses:**
- Factorial calculation
- Fibonacci sequence
- Tree traversals
- Divide and conquer algorithms

**Important:**
Always have a base case to prevent infinite recursion!`,
    level: 2,
    category: 'C Programming',
    topic: 'recursion',
    estimatedTime: 45,
    prerequisites: [],
    codeExamples: [
      {
        title: 'Factorial',
        code: `#include <stdio.h>

int factorial(int n) {
    // Base case
    if (n <= 1) {
        return 1;
    }
    // Recursive case
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    printf("Factorial of %d: %d\\n", num, factorial(num));
    return 0;
}`,
        explanation: 'Calculating factorial using recursion.'
      },
      {
        title: 'Fibonacci',
        code: `#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    int i;
    printf("Fibonacci sequence: ");
    for (i = 0; i < 10; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\\n");
    return 0;
}`,
        explanation: 'Generating Fibonacci sequence using recursion.'
      }
    ],
    exercises: [
      {
        title: 'Power Function',
        description: 'Write a recursive function to calculate x raised to the power of n (x^n).',
        solution: `#include <stdio.h>

int power(int x, int n) {
    if (n == 0) {
        return 1;
    }
    return x * power(x, n - 1);
}

int main() {
    printf("2^5 = %d\\n", power(2, 5));
    return 0;
}`,
        difficulty: 'medium'
      }
    ]
  },
  {
    title: 'Dynamic Data Structures',
    content: `Dynamic data structures grow and shrink as needed. Unlike arrays, they don't have a fixed size.

**Linked Lists:**
- Collection of nodes connected by pointers
- Each node contains data and a pointer to next node
- Can grow/shrink dynamically

**Operations:**
- Insert: Add new node
- Delete: Remove node
- Traverse: Visit all nodes
- Search: Find specific node

**Advantages:**
- Dynamic size
- Efficient insertion/deletion
- Memory efficient`,
    level: 2,
    category: 'C Programming',
    topic: 'data-structures',
    estimatedTime: 55,
    prerequisites: [],
    codeExamples: [
      {
        title: 'Linked List',
        code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void printList(struct Node* head) {
    while (head != NULL) {
        printf("%d -> ", head->data);
        head = head->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* head = NULL;
    struct Node* second = NULL;
    struct Node* third = NULL;
    
    head = (struct Node*)malloc(sizeof(struct Node));
    second = (struct Node*)malloc(sizeof(struct Node));
    third = (struct Node*)malloc(sizeof(struct Node));
    
    head->data = 1;
    head->next = second;
    
    second->data = 2;
    second->next = third;
    
    third->data = 3;
    third->next = NULL;
    
    printList(head);
    
    return 0;
}`,
        explanation: 'Creating and traversing a linked list.'
      }
    ],
    exercises: [
      {
        title: 'Insert at End',
        description: 'Write a function to insert a new node at the end of a linked list.',
        solution: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertEnd(struct Node** head, int data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = data;
    new_node->next = NULL;
    
    if (*head == NULL) {
        *head = new_node;
        return;
    }
    
    struct Node* last = *head;
    while (last->next != NULL) {
        last = last->next;
    }
    last->next = new_node;
}

int main() {
    struct Node* head = NULL;
    insertEnd(&head, 1);
    insertEnd(&head, 2);
    insertEnd(&head, 3);
    
    // Print list...
    return 0;
}`,
        difficulty: 'hard'
      }
    ]
  },
  {
    title: 'Trees & Advanced Algorithms',
    content: `Trees are hierarchical data structures. Think of a family tree or organizational chart.

**Binary Trees:**
- Each node has at most two children
- Left child < parent < right child (for BST)
- Efficient for searching and sorting

**Tree Traversals:**
- Inorder: Left, Root, Right
- Preorder: Root, Left, Right
- Postorder: Left, Right, Root

**Applications:**
- Expression trees
- Decision trees
- File systems
- Database indexing`,
    level: 2,
    category: 'C Programming',
    topic: 'trees',
    estimatedTime: 60,
    prerequisites: [],
    codeExamples: [
      {
        title: 'Binary Tree',
        code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

struct Node* createNode(int data) {
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

void inorder(struct Node* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

int main() {
    struct Node* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    root->left->right = createNode(5);
    
    printf("Inorder traversal: ");
    inorder(root);
    printf("\\n");
    
    return 0;
}`,
        explanation: 'Creating and traversing a binary tree.'
      }
    ],
    exercises: [
      {
        title: 'Tree Height',
        description: 'Write a function to calculate the height of a binary tree.',
        solution: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

int max(int a, int b) {
    return (a > b) ? a : b;
}

int height(struct Node* root) {
    if (root == NULL) {
        return -1;
    }
    return 1 + max(height(root->left), height(root->right));
}

int main() {
    // Create tree and calculate height
    return 0;
}`,
        difficulty: 'hard'
      }
    ]
  }
];

// Seed function
async function seedCProgramming() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/teacher-platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing C Programming lessons
    await Lesson.deleteMany({ category: 'C Programming' });
    console.log('Cleared existing C Programming lessons');

    // Insert new lessons
    const lessons = await Lesson.insertMany(cProgrammingLessons);
    console.log(`Successfully seeded ${lessons.length} C Programming lessons`);

    // Set prerequisites (pointers requires functions, etc.)
    const lessonMap = {};
    lessons.forEach(lesson => {
      lessonMap[lesson.topic] = lesson._id;
    });

    // Update prerequisites
    await Lesson.updateOne(
      { topic: 'pointers' },
      { $set: { prerequisites: [lessonMap['functions']] } }
    );

    await Lesson.updateOne(
      { topic: 'structures' },
      { $set: { prerequisites: [lessonMap['pointers']] } }
    );

    await Lesson.updateOne(
      { topic: 'recursion' },
      { $set: { prerequisites: [lessonMap['functions']] } }
    );

    await Lesson.updateOne(
      { topic: 'data-structures' },
      { $set: { prerequisites: [lessonMap['pointers'], lessonMap['structures']] } }
    );

    await Lesson.updateOne(
      { topic: 'trees' },
      { $set: { prerequisites: [lessonMap['data-structures'], lessonMap['recursion']] } }
    );

    console.log('Prerequisites set successfully');

    mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed if called directly
if (require.main === module) {
  seedCProgramming();
}

module.exports = seedCProgramming;

