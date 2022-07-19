# Atlas Documentation Search - Serverless API on AWS

This project uses the [Serverless Framework](https://github.com/serverless/) to
run an HTTP API. The API uses Node.js running on AWS Lambda.

We're using this to perform resource-intensive compute tasks that Atlas
Functions are currently unable to handle:

- Given an HTML string, return the document in plain text (``html2text``)

## Usage

### Deployment

```
$ serverless deploy
```

The deploy should take around 1 minute to complete.

After deploying, you should see output similar to:

```bash
Deploying skunkworks-atlas-docs-search to stage dev (us-east-1)

✔ Service deployed to stack skunkworks-atlas-docs-search-dev (152s)

endpoint: POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/html2text
functions:
  html2text: skunkworks-atlas-docs-search-dev-html2text (1.5 MB)
```

_Note_: Currently the API is public and can be invoked by anyone. For production deployments, we'll want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl -X POST \
  https://xxxxxxx.execute-api.us-east-1.amazonaws.com/html2text \
  --data '{
    "html": "<p>Hello, Skunkworks!</p>"
  }'
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
{
  "text": "Hello, Skunkworks!",
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local -f html2text --path mock-request-json.json
```

Which should result in response similar to the following:

```json
{
    "statusCode": 200,
    "body": "{\n  \"text\": \"TEST PLS IGNORE\\n\\nThis is paragraph content. There are multiple sentences.\"\n}"
}
```
