Partner API Example
===================

This contains a sample Node JS app to support the client creation API on harleytherapy.com

Build & run with the following commands and a recent version of node (tested with 13.11.0).

```
yarn install
npx webpack
node dist/main.js
```

Response to the request will be to either create or retrieve a client matching exactly all the columns provided.

Client email and phone numbers are unique and cannot be re-used across multiple clients.

The response on success will be of the form:

```json
{
  "id": 1234,
  "handover_url": "https://mysever.com/?client_id=N2MwZDY2NDM4Mzg1NGNlZGVjZjdmYTMzMzZiMzRhZmZjZmNiMTcyZWNhYjI2YzRhNDVlNGExNzUyYjUzZWZjYiQkdzRGWEJ1NjZneVBnNlJJPS0tVWRqRVhSdS9vTWxBdWRZTS0tTXVNcUtpb3ljN3d2aGlsTTlHT1l4dz09"
}
```

The `handover_url` can be used to send the client to the harleytherapy.com site where they will proceed through a simple login/validation check vie their email (default) or mobile to access their account.

(c) 2021 Harley Therapy Platform Ltd