import os
import re
import functools

input_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "input.txt")
LIMITS = {"red": 12, "green": 13, "blue": 14}


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


def solve(acc: int, elem: tuple[int, list[dict[str, int]]]) -> int:
    idx, game = elem
    max_red = 0
    max_green = 0
    max_blue = 0

    for cards in game:
        max_red = max(max_red, cards.get("red", 0))
        max_green = max(max_green, cards.get("green", 0))
        max_blue = max(max_blue, cards.get("blue", 0))

    if (
        max_red <= LIMITS["red"]
        and max_green <= LIMITS["green"]
        and max_blue <= LIMITS["blue"]
    ):
        acc += idx
    return acc


print(functools.reduce(solve, enumerate(games, start=1), 0))
