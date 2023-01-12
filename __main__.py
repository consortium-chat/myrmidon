import threading

from dotenv import load_dotenv

load_dotenv()


def main():
    from bot import bot
    from events import events_loop

    bot_thread = threading.Thread(target=bot.run)
    events_thread = threading.Thread(target=events_loop)

    bot_thread.start()
    events_thread.start()

    bot_thread.join()
    events_thread.join()


if __name__ == "__main__":
    main()
