#Build Suite - Sitegenesis Default Setup

This folder contains a default setup that can be used as a blueprint for Sitegenesis Projects. 

## How to run a build
1. In `build` folder, rename `config.json.sitegenesis` to `config.json`
1. Make sure your Bitbucket SSH certificate is setup properly. (Or configure HTTPS + Username + Password in `build/projects/sitegenesis/config.json` - see Documentation)
1. Run `grunt build`
1. A complete, CSS/JS-compiled SiteGenesis can be found in `output/code/sitegenesis`.

## How to deploy code
1. In `build/projects/sitegenesis/config.json`, set up your sandbox properly (WebDAV URL + Business Manager credentials)
1. Run `grunt dist` to deploy a vanilla SiteGenesis build to your Sandbox.
1. Run `grunt importSite` to import demo data. (Might take a while)

## How to deploy demo data
1. Make sure code deployment is working properly (see above)
1. in `build/config.json`, set `build.project.codeonly` to `false`
1. In `build/projects/sitegenesis/config.json`, set `dependencies.0.siteImport.enabled` to `true`


## Note
Please see the "sample" project folder containing documented and sample configuration files for both full-fledged and minimum setup.