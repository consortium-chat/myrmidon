# Myrmidon

## Installation

1. Install [Python 3.11] and [Poetry]. I recommend using [pyenv] to manage your Python
   versions.

3. Clone this repository and `cd` into it.

4. Run `poetry install` to install dependencies.

5. Copy the `.env-template` file to `.env` and fill in the values. You can generate a
   new Discord token in the [Discord Developer Portal].

6. Run `poetry run python bot` to start the bot.

7. In a separate terminal, run `poetry run python events` to start the scheduled events
   loop.

[Python 3.11]: https://www.python.org/downloads
[Poetry]: https://python-poetry.org
[pyenv]: https://github.com/pyenv/pyenv
[Discord Developer Portal]: https://discord.com/developers/applications

## License

[MIT](license.txt)
