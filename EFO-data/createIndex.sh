#!/bin/bash
curl -X PUT "localhost:9200/efo" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": {
        "kw_analyzer": {
          "tokenizer": "kw_tokenizer",
          "filter": [
            "lowercase"
          ]
        },
        "autocomplete_analyzer": {
          "tokenizer": "autocomplete_tokenizer",
          "filter": [
            "lowercase"
          ]
        },
        "autocomplete_search": {
          "tokenizer": "lowercase"
        }
      },
      "tokenizer": {
        "kw_tokenizer": {
          "type": "keyword"
        },
        "autocomplete_tokenizer": {
          "type": "edge_ngram",
          "min_gram": 3,
          "max_gram": 15,
          "token_chars": [
            "letter"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
    "id": {"type": "keyword"},
    "label": {
      "type": "text",
      "fields": {
        "edgengram": {
          "type": "text",
          "analyzer": "autocomplete_analyzer",
          "search_analyzer": "autocomplete_search"
        }
      }
    },
    "synonyms": {
      "type": "text",
      "analyzer": "autocomplete_analyzer",
      "search_analyzer": "autocomplete_search"
    },
    "assocs": {"type": "integer"}
    }
  }
}
'

