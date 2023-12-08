res = 0

def firstDigit(s):
    for i in range(len(s)):
        if s[i].isdigit():
            return s[i]

def lastDigit(s):
    for i in range(1, 1+len(s)):
        if s[-i].isdigit():
            return s[-i]

with open("day1/input.txt") as f:
    lines = f.readlines()

for line in lines:
    curr = int(firstDigit(line)) * 10 + int(lastDigit(line))
    res += curr

print(res)