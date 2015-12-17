# == Whybug
#
# The following volumes may be used with their descriptions next to them:
#
#   /config                     : Should contain your `config.php`, otherwise
#                                 default will be used
#   /opt/observium/html         : Provided to ease adding plugis (weathermap!)
#   /opt/observium/logs         : Would be nice to store these somewhere
#                                 non-volatile!
#   /opt/observium/rrd          : Will consume the most storage.
#   /var/run/mysqld/mysqld.sock : If your MySQL server is on the same host that
#                                 serves the container, setting 'localhost' in
#                                 observium config will look for the unix
#                                 socket instead of using TCP.
#
#
FROM phusion/baseimage:0.9.18
MAINTAINER Adrian Philipp <info@whybug.com>
EXPOSE 8000/tcp

# === phusion/baseimage pre-work
CMD ["/sbin/my_init"]

# === General System

# Avoid any interactive prompting
ENV DEBIAN_FRONTEND noninteractive

# Language specifics
ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# Install locales
RUN locale-gen en_US.UTF-8

# Install nodejs, also runs apt-get update
RUN curl --fail -ssL -o /tmp/setup-nodejs https://deb.nodesource.com/setup_4.x
RUN bash /tmp/setup-nodejs
RUN rm -f /tmp/setup-nodejs

# Install git
RUN apt-get install -y --no-install-recommends nodejs git

# Load code
RUN mkdir /opt/whybug-server
COPY ./package.json /opt/whybug-server/
COPY ./config /opt/whybug-server/config
COPY ./src /opt/whybug-server/src
COPY ./bin /opt/whybug-server/bin

#RUN cd /opt/ && git clone https://github.com/whybug/whybug-server.git
RUN cd /opt/whybug-server && ./bin/install.sh

# === Webserver - Apache + PHP5

#RUN php5enmod mcrypt && \
#    a2enmod rewrite

#RUN mkdir /etc/service/apache2
#COPY bin/service/apache2.sh /etc/service/apache2/run
#RUN chmod +x /etc/service/apache2/run

# Boot-time init scripts for phusion/baseimage
COPY ./config/my_init.d /etc/my_init.d/
RUN chmod +x /etc/my_init.d/*

#&& \
#    chown -R nobody:users /opt/observium && \
#    chown -R nobody:users /config && \
#    chmod 755 -R /opt/observium && \
#    chmod 755 -R /config

# Configure apache2 to serve Observium app
#COPY ["conf/apache2.conf", "conf/ports.conf", "/etc/apache2/"]
#COPY conf/apache-observium /etc/apache2/sites-available/000-default.conf
#COPY conf/rrdcached /etc/default/rrdcached
#RUN rm /etc/apache2/sites-available/default-ssl.conf && \
#    echo www-data > /etc/container_environment/APACHE_RUN_USER && \
#    echo www-data > /etc/container_environment/APACHE_RUN_GROUP && \
#    echo /var/log/apache2 > /etc/container_environment/APACHE_LOG_DIR && \
#    echo /var/lock/apache2 > /etc/container_environment/APACHE_LOCK_DIR && \
#    echo /var/run/apache2.pid > /etc/container_environment/APACHE_PID_FILE && \
#    echo /var/run/apache2 > /etc/container_environment/APACHE_RUN_DIR && \
#    chown -R www-data:www-data /var/log/apache2 && \
#    rm -Rf /var/www && \
#    ln -s /opt/observium/html /var/www

# === Cron and finishing
COPY config/cron.d /etc/cron.d/

# === phusion/baseimage post-work
# Clean up APT when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
