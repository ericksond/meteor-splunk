Package.describe({
  name: 'ericksond:splunk-sdk',
  version: '0.0.1',
  summary: 'Splunk SDK Wrapper for Meteor',
  git: 'https://github.com/ericksond/meteor-splunk',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('splunk.js', 'server');
  api.export('Splunk')
});

Npm.depends({ 'splunk-sdk': '1.7.0' })
