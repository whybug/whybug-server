FROM dockerfile/nodejs

# TODO: Move all installs to whybug/app-docker image

# Setup varnish.
RUN apt-get update
RUN apt-get install apt-transport-https
RUN curl https://repo.varnish-cache.org/ubuntu/GPG-key.txt | apt-key add -
RUN echo "deb https://repo.varnish-cache.org/ubuntu/ precise varnish-4.0" >> /etc/apt/sources.list.d/varnish-cache.list
RUN apt-get update
RUN apt-get -y install varnish
ADD config/varnish.vcl /etc/varnish/default.vcl

# Setup mysql.
RUN apt-get -y install mariadb-client-5.5

ADD . /src
WORKDIR /src
RUN bash -c "source ./envvars && bash bin/install.sh"
