# EFO Elastic app
This is a practice project integrating Elasticsearch (elasticsearch-browser) with an Angular app, using Material Design +Bootstrap for styling.  Example data was extracted from the [Experimental Factor Ontology](https://www.ebi.ac.uk/efo/) - a hierarchical set of terms describing human diseases and their relations.  Each record has EFO ID, the official disease name, a list of synonyms/alternative identifiers and a number of associated drug targets.

![Homepage screenshot](/docs/elastic-home.jpg)

## Technologies:
- Node.js (v.10.16.0)
- npm (v.6.9.0)
- Angular (v.8.1.2)
- MDB for Angular (v.8.1.0)
- Elasticsearch (v.7.1.0)
- Elasticsearch Node.js client (v.16.3.0)

## Features:
Records can be located by official EFO ID or by disease name.  Exact match in disease name is prioritised, followed by partial matches, then matches in known disease synonyms.  Results are weighted by known drug target associations from [Open Targets](https://www.targetvalidation.org/) data.  The effect of altering the weights given to each can be tested:
![Query weighting screenshot](/docs/elastic-weighting.jpg)

Results are returned as the query is entered with the typeahead/autocomplete search:
![Typeahead autocomplete gif](/docs/elastic-typeahead.gif)
    
## Learning outcomes:
- Using Rxjs - revision of Promises+Observables
- Elasticsearch - Practise using different search mechanisms.
- Incorporating searches with a user interface, e.g. autocomplete/type-ahead suggestions
  - Keyword and edge ngram analyzers are used for the type-ahead search - a maximum ngram length of 15 was needed, as biomedical terms are approximately 2/3rds longer on average than lay language
