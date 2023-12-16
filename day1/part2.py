import functools
import os

input_path = "input.txt"
with open(
    os.path.join(os.path.dirname(os.path.realpath(__file__)), input_path), "r"
) as f:
    lines = f.read().splitlines()

num_dict = {
    "o": ["one"],
    "t": ["two", "three"],
    "f": ["four", "five"],
    "s": ["six", "seven"],
    "e": ["eight"],
    "n": ["nine"],
}

num_table = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}


def line_to_num(line: str) -> list[int]:
    nums = []
    for idx, char in enumerate(line):
        if char.isdigit():
            nums.append(int(char))
        if char in num_dict:
            nums.extend(
                [
                    num_table[num]
                    for num in num_dict[char]
                    if line[idx : idx + len(num)] == num
                ]
            )
    return nums


line_nums = list(map(line_to_num, lines))


def num_sum(acc: int, nums: list[int]) -> int:
    return acc + nums[0] * 10 + nums[-1]


print(functools.reduce(num_sum, line_nums, 0))
