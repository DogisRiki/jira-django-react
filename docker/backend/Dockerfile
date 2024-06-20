FROM python:3.11.5

RUN apt-get update && apt-get install -y curl

RUN mkdir -p /home/django/app/.pytest_cache /home/django/app/.ruff_cache /home/django/app/.mypy_cache
COPY ./backend/pyproject.toml ./backend/poetry.lock /home/django/app/

ENV POETRY_VIRTUALENVS_CREATE=false
ENV POETRY_HOME=/home/poetry
ENV PATH=${POETRY_HOME}/bin:${PATH}
ENV PYTHONPATH="/home/django/app/src:/home/django/app/tests:${PYTHONPATH}"

RUN curl -sSL https://install.python-poetry.org | python3 -

WORKDIR /home/django/app
RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction