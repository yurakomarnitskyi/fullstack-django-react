FROM python:latest

WORKDIR /root/my_app/

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY ./build /root/my_app/apps/build

COPY ./apps ./apps

CMD ["python", "apps/manage.py", "runserver", "0.0.0.0:8000"]