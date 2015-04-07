# Splunk Meteor API

This smart package exposes the official Splunk Software Development Kit for
Javascript from the node.js npm package: https://github.com/splunk/splunk-sdk-javascript

This uses version 1.7.0 of the splunk-sdk-javascript node.js package.

#### To use

``` splunkjs = Splunk() ```

### Example Meteor Method

#### Create the Splunk Service

```
var service = new Splunk.Service({
  username: 'splunk-user',
  password: 'password',
  scheme: 'https',
  host: 'splunk-server',
  port: '8089',
  version: '6.0'
})
```

#### Meteor method for querying Splunk Saved Searches

```
Meteor.methods({
  splunkSavedSearch: function(searchName) {
    var savedSearches = service.savedSearches({owner: 'splunk-user', app:
    'search'})

    savedSearches.fetch(function (error, result) {
      if (error) {
        console.log(error)
        return 'error'
      }

      if (result.item(searchName) != null) {
        var savedSearch = savedSearches.item(searchName)
        savedSearch.dispatch( function(error, job) {
          if (error) {
            console.log(error)
            return 'error'
          }

          job.track({
            period: 200
          }, {
            done: function(job) {
              job.results({
                count: 0
              }, function(error, results, job) {
                return {
                  fields: results.field,
                  rows: results.rows
                }
              })
            },
            failed: function(job) {
              console.log('job failed')
              return 'none'
            },
            error: function(error) {
              done(error)
              return 'none'
            }
          })
        })
      }
    })
  }
})

```
