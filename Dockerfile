FROM dockerfile/nodejs

# Setup varnish.
RUN apt-get update 
RUN apt-get -y install varnish
ADD config/varnish.vcl /etc/varnish/default.vcl
RUN varnishd -f /etc/varnish/default.vcl -s malloc,100M -a 0.0.0.0:80 -n whybug

# Setup mysql.
RUN apt-get -y install mariadb-client-5.5


