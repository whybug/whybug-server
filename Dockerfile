FROM dockerfile/nodejs

# Setup varnish.
RUN apt-get update
RUN apt-get -y install varnish
ADD config/varnish.vcl /etc/varnish/default.vcl

# Setup mysql.
RUN apt-get -y install mariadb-client-5.5

ADD . /src
WORKDIR /src
RUN bash -c "source ./envvars && bash bin/install.sh"
