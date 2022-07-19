#!/bin/bash

#TODO replace the group name and cluster name so this actually works
curl --user "{service account public key}:{service account private key}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/${GROUP_ID}/clusters/${PROJECT_NAME}/fts/indexes?pretty=true" \
     --data-binary @$1