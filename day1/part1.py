import functools
import os
import re

input_path = "input.txt"

with open(
    os.path.join(os.path.dirname(os.path.realpath(__file__)), input_path), "r"
) as file:
    games = file.read().splitlines()

games_number = list(map(lambda x: re.findall("\d", x), games))


def sum_num(acc, str_num_list: list[str]) -> int:
    current = int(str_num_list[0]) * 10 + int(str_num_list[-1])
    return acc + current


print(functools.reduce(sum_num, games_number, 0))
