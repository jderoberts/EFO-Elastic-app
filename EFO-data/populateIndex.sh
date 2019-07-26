#!/bin/bash
curl -s -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/efo/_bulk?pretty' --data-binary @fullEFO.json
