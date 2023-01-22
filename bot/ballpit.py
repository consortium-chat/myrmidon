import math
import random

balls = ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣"]
items = [
    "🦷",
    "🩲",
    "🪢",
    "👓",
    "👓",
    "👟",
    "🩴",
    "💄",
    "🪱",
    "🦗",
    "🍃",
    "🍀",
    "🪨",
    "🐚",
    "🍬",
    "🍭",
    "🧀",
    "⚾️",
    "🥎",
    "🎱",
    "🪀",
    "🧩",
    "💉",
    "🚬",
    "🔑",
    "📎",
    "🧷",
    "📌",
    "🪙",
    "🩹",
]


def ballpit_item() -> str:
    if random.random() < 0.0008:
        return random.choice(items)
    return random.choice(balls)


def ballpit_message(length: int) -> str:
    ball_count = int(5 + 10 * math.sqrt(length))
    message = ""
    for _ in range(ball_count):
        message += ballpit_item()
        message += " " * random.randint(0, 8)
    return message
