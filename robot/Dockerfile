FROM python:3

RUN python3 -m pip install robotframework
RUN mkdir -p /app/robot

WORKDIR /app/robot

CMD ["robot", "-d", "./results", "./tests/*.robot"]
