#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
A script for gathering data in format suitable for bulk input into Elasticsearch index.
Combines disease codes with additional disease information from EBI Ontology Lookup Service
and associated drug interactions from Open Targets client.

@author: jderoberts
"""

from opentargets import OpenTargetsClient
import requests
import json

ot = OpenTargetsClient()

data = {}

#codes = ['EFO_0000249', 'EFO_0003885', 'EFO_0000685', 'EFO_0000313', 'EFO_0001071', 'EFO_0000305', 'EFO_0002890', 'EFO_0000478', 'EFO_1001516', 'EFO_0007460', 'Orphanet_2781', 'Orphanet_3261']

#uniqueEFOs - disease id extracted from every OpenTargets evidence object and reduced to set of unique values

codes = set()
with open('uniqueEFOs.txt') as infile:
    for line in infile:
        codes.add(line.rstrip())

otdata = ot.filter_associations()
j=0
k=len(codes)
for code in codes:
    j+=1
    #if (j>333) : exit()
    print(j,"/",k)
    label = otdata.filter(disease=code)[0]['disease']['efo_info']['label']
    assocs = otdata.filter(disease=code).total
    if 'EFO_' in code:
        url = 'https://www.ebi.ac.uk/ols/api/ontologies/efo/terms?iri=http://www.ebi.ac.uk/efo/'+code
    elif 'Orpha' in code:
        url = 'https://www.ebi.ac.uk/ols/api/ontologies/efo/terms?iri=http://www.orpha.net/ORDO/'+code
    elif 'HP_' in code:
        url = 'https://www.ebi.ac.uk/ols/api/ontologies/efo/terms?iri=http://purl.obolibrary.org/obo/'+code
    else:
        print("\t"+code)
        continue
 
    response = requests.get(url).json()
    try:
        synonyms = response['_embedded']['terms'][0]['synonyms']
    except KeyError as err:
        print(code)
        print(response)
        exit()
    if synonyms:
        if len(synonyms)>10:
            synonyms = synonyms[0:10]
        syn_string = '|'.join(synonyms)
    else:
        syn_string = ""
    data[code] = {'id':code,'label':label,'assocs':assocs,'synonyms':syn_string}

with open('fullEFO.json','w') as outfile:
    i = 0
    for elem in data:
        i+=1
        print(str(i)+"\t"+elem)
        #make an id line dict
        idline = {"index":{"_index":"efo"}}
        idline['index']['_id'] = i
        json.dump(idline,outfile)
        outfile.write("\n")
        json.dump(data[elem],outfile)
        outfile.write("\n")
