FROM python:alpine

COPY requirements.txt /tmp/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /tmp/requirements.txt


WORKDIR /app/robot

COPY tests /tests

ENTRYPOINT [ "robot" ]
