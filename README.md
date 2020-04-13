# This is the mutation-genome-separator!

## Requirements
this is a node script and needs `npm` installed to run (see https://nodejs.org/en/download/)

## Setup
1. clone this repository
2. install npm
3. use a terminal to navigate to the directory you cloned this repository to
4. run `npm i`
5. run `npm run separate <input> <output>` as discribed below

## Input and Output
* This script expects to take in an input directory path and an output directory path (both are referenced locally from where you run the script)

* You will run this using the following:
`npm run separate <input directory path> <output directory path>`

* If I have all my input files in a directory called "test" and want the output to go to a directory called "out" and both exist in the same directory I clone this project to (assume the project clones into a new sub-directory), I'd run the command
`npm run separate ../test ../out`

* In the input directory you should have one or more .txt files that are formatted like the below snippet

```
#OUT: 21 SS p1 72 HLAKIR_slimulate_numberplaceholder.txt
Mutations:
0 0 m1 0 0 0.5 p-1 1 24 T
31 1 m1 2 0 0.5 p-1 1 14 T
45 5 m1 6 0 0.5 p-1 1 13 T
60 8 m1 9 0 0.5 p-1 1 8 T
83 9 m1 11 0 0.5 p-1 1 1 T
Genomes:
p1:0 A 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
p1:1 A 24 1 25 26 2 27 28 14 29 30 16 17 22 23
p1:2 A 31 1 25 32 2 33 4 5 34 7 11 35 12 36 14 37 18 22 38 39
p1:3 A 31 1 25 32 2 33 4 5 6 7 8 9 10 11 12 13 14 15 29 40 16 17 20 22 41
p1:4 A 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 42 43 29 16 17 20 22 44
```

* These files MUST have the lines with "Mutations:" and "Genomes:" heading the respective sections
* After the script runs you will have two files in the output directory, called Mutations.txt and Genomes.txt
* If you run this command twice with the same output file the Mutations.txt and Genomes.txt files will be replaced with the second output
* This script is asynchronous so the order of the output cannot be guaranteed to be the same every time
