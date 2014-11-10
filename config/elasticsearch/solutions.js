module.exports = {
    "_all" : {"enabled" : false},
    "properties": {
      "client_ip": {"type": "string", "index" : "not_analyzed"},
      "code": {"type": "string", "index" : "not_analyzed"},
      "created_at": {"type": "date", "format": "dateOptionalTime"},
      "description": {"type": "string"},
      "file_path": {"type": "string", "index" : "not_analyzed"},
      "level": {"type": "string", "index" : "not_analyzed"},
      "line": {"type": "long", "index" : "not_analyzed"},
      "message": {"type": "string", "index" : "not_analyzed"},
      "os": {"type": "string", "index" : "not_analyzed"},
      "os_version": {"type": "string", "index" : "not_analyzed"},
      "programminglanguage": {"type": "string", "index" : "not_analyzed"},
      "programminglanguage_version": {"type": "string", "index" : "not_analyzed"},
      "protocol_version": {"type": "long", "index" : "not_analyzed"},
      "uuid": {"type": "string", "index" : "not_analyzed"}
    }
};
