FROM library/postgres
ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD admin
ENV POSTGRES_DB pokecards
COPY database/database.sql /docker-entrypoint-initdb.d/
RUN echo "host all all all $POSTGRESS_HOST_AUTH_METHOD" >> pg_hba.conf
VOLUME /opt/dbcustompost:/var/lib/postgresql/data