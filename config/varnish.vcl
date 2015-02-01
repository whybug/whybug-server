vcl 4.0;

backend default {
  .host = "0.0.0.0";
  .port = "8000";
}

# Only allow purging from specific IPs      
acl local {
    "localhost";
    "127.0.0.1";
}

sub vcl_recv {
    # Check if we may purge (only localhost)
    if (req.method == "PURGE") {
        if (!client.ip ~ local) {
            return(synth(405,"Not allowed."));
        }
        return (purge);
    }
}

sub vcl_deliver {
    # remove some headers added by varnish
    unset resp.http.Via;
    unset resp.http.X-Varnish;
}
