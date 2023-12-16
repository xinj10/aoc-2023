import functools
import os
import re

input_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "input.txt")


def parse_game(game: str) -> list[dict[str, int]]:
    rounds = game.split(":")[1].strip().split(";")

    def read_rgb(round: str) -> dict[str, int]:
        rgb = {}
        cards = round.split(",")
        for card in cards:
            if card[-1] == "d":
                rgb["red"] = int(re.findall(r"\d+", card)[0])
            elif card[-1] == "n":
                rgb["green"] = int(re.findall(r"\d+", card)[0])
            else:
                rgb["blue"] = int(re.findall(r"\d+", card)[0])
        return rgb

    return list(map(read_rgb, rounds))


with open(input_path, "r") as f:
    games = list(map(parse_game, f.readlines()))


def solve(acc: int, elem: list[dict[str, int]]) -> int:
    max_red = 1
    max_green = 1
    max_blue = 1

    for cards in elem:
        max_red = max(max_red, cards.get("red", 0))
        max_green = max(max_green, cards.get("green", 0))
        max_blue = max(max_blue, cards.get("blue", 0))

    return acc + max_red * max_green * max_blue


print(functools.reduce(solve, games, 0))
