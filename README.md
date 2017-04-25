#Build Suite

## Introduction
The Build Suite is an easy-to-use set of scripts to automate your build processes and adding some additional value to it. In a nutshell you configure your SVN and/or Git locations, your target environment (i.e. staging) and then hit the button to package a build and to deploy it to your environment and activate the new version.

The build suite is powered by [Grunt](http://gruntjs.com) - a popular and well-tested Javascript task runner. 

It is part of the [Community Suite](https://xchange.demandware.com/community/developer/community-suite) set of tools.

### License
Licensed under the current NDA and licensing agreement in place with your organization. (This is explicitly not open source licensing.)


### Support / Contributing

Feel free to create issues and enhancement requests or discuss on the existing ones, this will help us understanding in which area the biggest need is. Please refer to [Frequently asked Questions](https://bitbucket.org/demandware/build-suite/wiki/FAQ) before doing so.

For discussions please start a topic on the [Community Suite discussion board](https://xchange.demandware.com/community/developer/community-suite/content) or join the #ci-automation channel in the [Community Slack Team](https://sfcc-community.slack.com).



## Changelog

*Note:* Instead of using one of the releases linked below, it is recommended to pull the current head in order to benefit from our latest fixes and improvements.

### [unreleased]

#### Fixed
 - Business Manager login + Code activation (see #64)
 - Metadata import now completely supports CSRF  too (thanks @rzhornyk!)

#### Added
 - Command line parameter support for config placeholders (thanks @ast_osevastianovych!)

### [[1.1.1]](https://bitbucket.org/demandware/build-suite/commits/tag/1.1.1) - 2017-02-22

#### Added
 - More descriptive warning for missing cartridges

#### Changed
 - Business Manager requests to be CSRF compliant (see #34)
 - Indentation: Only whitespaces used from now on (as requested in #11) 

#### Fixed
 - Cert URL handling for two-factor-auth
 - URL encoding for Git credentials when using HTTPS (fixes #53) 
 - Code activation for two-factor auth
 - Client-side Javascript issues (decreased lodash version back to 3.10, fixes #58)
 - Behaviour of "ignoreEmpty" flag" (now able to skip missing cartridges again)
 

### [[1.1.0]](https://bitbucket.org/demandware/build-suite/commits/tag/1.1.0) - 2017-01-06
#### Added
- Command line parameter "--migrate" which prints configuration in the latest format.
- Additional Log output on repositories should make it easier to locate mistakes in configuration
- SiteGenesis Sample configuration! Full-fledged build now works OOTB
- Command line parameter "--print-config" for either printing complete or partial configuration data (e.g. "--print-config=cssmin")
- Empty directory check for site import (no more silently created empty Zip files!)

#### Removed
- Support for .properties files, removed migrate feature (Please run `grunt --migrate` BEFORE upgrading to this release)
- ESLint package dependency (will come back with new linting feature in future release)
- Legacy task names (e.g. RunProjectBuild). Please adapt to current naming convention.
- Lots of unused dependencies (solves #47, #48) 

#### Changed
- Internal property names have changed drastically. Origin of properties should be clearer now. Output and exports folders location now a property.
- Initialization and internal configuration structure cleanup (removed a lot of unnecessary and complicated mappings)

#### Fixed
- Two-factor auth now working for unzip and cleanup again.
- Clean task for parallel builds. Does not fail anymore, output folder structure was changed. (fixes #14)
- CSS Minification
- Fixed Git fetch mechanism when switching branch (again. solves #49)



### [[1.0.1]](https://bitbucket.org/demandware/build-suite/commits/tag/1.0.1) - 2017-01-02
#### Changed:
- Changed exlusion of hidden files (e.g. .project) into an opt-out option (solves #26)
- Fixed code quality issues (regarding linting the Build Suite itself), renamed config files (solved #35, #36)
- Changed Documentation (widely updated and improved)
- Changed SASS configuration, improved folder structure
#### Fixed:
- Restored "gitfetch" task in order to reduce update time for Git repositories
- Fixed Git fetch mechanism when switching branch (solved #40)
- Bugfix regarding repository names with dots (solved #9)
- Fixed JS/CSS merging (solved #38)
- Fixed syntax in config example files (solved #37)
#### Added:
- Restored and improved Storefront Toolkit Build Info feature! (solves #6)


### [[1.0.0]](https://bitbucket.org/demandware/build-suite/commits/tag/1.0.0) - 2016-04-26 
#### Removed:
- unused configuration parameters in configuration files
#### Changed:
- updated configuration file structure to benefit from JSON format
- restructured (demo) site import, extended functionality and configurability
#### Added:
- proper default values for less used configuration parameters
- documented copies of configuration files
- additional log output in case of errors to improve usability

### [[Grunt Branch]](https://bitbucket.org/demandware/build-suite/src/4ad8e2001b5a4200422ced9844df545dd6f45ae5/?at=grunt) - 2015-02-27
- Merged new features in to grunt branch including support for svn and two factor auth.
- IMPORTANT: ALL properties files are being moved to json files to support more advanced configuration.  A merge option exists to merge the global properties files.  The project repository folders should be converted by hand if you use any advanced options.  A sample file is provided. 
- Known Issues: Two factor auth will successfully push the archive to the remote server.  It is a known issue that it will not unzip nor activate.  We are working on that.


## Getting started


### Installation

1. We recommend to use either [Git Bash](https://git-for-windows.github.io/) or [Cygwin](https://www.cygwin.com/) on Windows environments. Nevertheless, Windows CMD should work too.
1. Node.js version 4.4 or higher is required. You can [download it here](https://nodejs.org/en/download/)
1. Open the command line in the root folder of this repository and type ```npm install```. Installation could take a while.

* Problems? Refer to the [Frequently asked Questions](https://bitbucket.org/demandware/build-suite/wiki/FAQ) section.
* See also: [Grunt Getting Started](http://gruntjs.com/getting-started).

### Quick Start

*See `build/projects/sitegenesis-sample` for a working OOTB SiteGenesis configuration example.*

1. Go to `build/projects` folder, make a copy of the `sample` folder in this directory. Rename folder to match your project name, open resulting folder.

1. Copy `build/config.json.sample` to `config.json`. Edit file, make `build.project.name` match the folder name from step 1. Set `build.project.version` to the code version name that will be used (e.g. 'build-suite-test')

1. Copy `build/projects/sample/config.json.min-sample` to `config.json`. Configure at least the following:

    * Set everything up to include your `dependencies` (e.g. CVS repositories, local folders or both).
    * Configure for your deployment `environment` (e.g. WebDAV endpoint and credentials).

1. Run a complete build and deploy with `grunt dist`! (By default, `dist` task runs `build`, `upload` and `activate`. For a list of available grunt tasks, run `grunt --help`.)


### Detailed Steps to run a build

1. Copy `config.json.sample`, rename it `config.json` and replace the sample values with your configuration settings. You can configure multiple projects to be processed from the same build suite installation.
 
    * The `build.project.name` property defines the project that is currently built. 
    * The `build.project.version` property represents the name of the code version that will be created and activated on the server.
   
1. Modify dependency file settings. Copy sample folder to match `build.project.name` and use one of the sample files as a templated for ```projects\${build.project.name}\config.json```.

    * The Build Suite currently supports SVN and Git. Be sure that the given tool is working properly using the corresponding command in the command line environment!
    * The dependency file can multiple SVN and/or Git repositories. Each repository can be configured separately.
    * Local repositories should be configured via relative paths. Note that the `build` folder is the CWD, so start with `../`.

1. If you want to use Git SSH URIs you need to setup the Git SSH key accordingly.

    * If your ssh key contains a passphrase (optional), you will need to use a password saver like ssh_agent so that you are not prompted for your passphrase which will hang the script when running in the UX Studio Plugin. (See https://help.github.com/articles/working-with-ssh-key-passphrases.)

    * It is also recommended that you set the GIT_SSH environment variable to the ssh executable that was included in your Git installation to avoid problems with the build script from hanging in UX Studio Plugin.

1. Modify environment settings. For the `webdav.server` property be sure to use the instance hostname with dashes so that you do not run into any SSL exceptions when connecting to the target environment with the Build Suite. E.g.: `instance-realm-customer.demandware.net`.

1. Test your configuration by calling e.g. `grunt build` and `grunt upload` afterwards.


## Documentation

### Contents of the cartridge

     -root
      |-build
      | |-projects
      | | |-sample								Folder names here represent the project name
      | | | |-config.json                       Project configuration.
      | | | |-config.json.min-sample            Minimum possible configuration template. Copy to config.json for basic use.
      | | | |-config.json.min-doc               Documentation for minimum config. Do NOT use as template!
      | | | |-config.json.full-sample           Full configuration template. Copy to config.json for advanced use.
      | | | `-config.json.full-doc              Full documentation for config. Do NOT use as template!
      | | `-sitegenesis-sample					SiteGenesis sample configuration (works OOTB)
      | |   |-config.json                       
      | |   |-Readme.md            				 
      | |
      | |-config.json                 			Global configuration file for current environment.
      | `-config.json.sample         			Template.  Copy this to config.json
      |
      |-grunt									Grunt Configuration and tasks
      | |-config 								Alias (alias.yml) and Configuration parameters (*.js)
      | |-lib									Miscellaneous Utilities
      | `-tasks									All Demandware specific task plugins
      |
      |-resources								Sample template for storefront toolkit
      |
      |-Gruntfile.js							Main Gruntfile 
      `-package.json							Node Package Manager dependencies


### Available Tasks

Most main tasks are defined in the aliases.yml build file. Call `grunt --help` to receive a list of available tasks.

#### Build

* `grunt build` performs a checkout and local build of the complete project
* `grunt upload` performs code upload of previously built project
* `grunt activate` activates the configured code version
* `grunt dist` performs build, upload, activate and cleans up uploaded file (call `grunt http:deleteUpload` to do this manually). 

#### Site Import 

An import of site configuration can be done after the build or dist task. 
To configure Site import, see [documented Config example](https://bitbucket.org/demandware/build-suite/src/bb1dd935bfe56021f828cc9872c0dfde1bedf18e/build/projects/sample/config.json.full-doc.js?at=master&fileviewer=file-view-default) and check against assumed folder structure below. The site import can be divided into two parts: 1. Configuration/Initialization and 2. Demo Site data (optional).

* `grunt initSite`: Site initialization/configuration import (default source folder: `sites/site_template`)
* `grunt initDemoSite`: Demo site import (default source folder: `sites/site_demo`)
* `grunt importSite`: Complete site import, including demo site (if given)
* `grunt importMeta`: Metadata import. Metadata is always read from configuration data (default: `sites/site_template/meta`)

#### Other tasks

* `grunt triggerReindex`: Trigger a Search Index rebuild for all Sites of the target environment
* `grunt exportUnits`: Trigger a site export for all Sites given in `settings.site_export.sites`
* `grunt` (without task name): Start Watch task, will constantly check for updates in JS+SCSS and rebuild automatically while running.


### Default repository structure

The structure below is assumed for a Git repository. All defaults stick to this scheme. If your structure differs, please adapt the corresponding folder settings. All of them are visible in the [documented project configuration example file](build/projects/sample/config.json.full-sample).

     -root
        |-cartridges                 (all Demandware cartridge projects)
        | |-app_sample
      | |-...
      | `-bm_plugin
        |
        `-sites
          |-site_template            (site template structure as defined for site import)
          | |-custom-objects
          | |-meta
          | `-sites
          |   |-site_a               (actual site definitions)
          |   `-site_b               (actual site definitions)
          |-site_demo
          | |-catalogs               (demo site data, example products/customer accounts etc.)
          | |-pricebooks
          | `-sites
          |   |-site_a               (actual site definitions)
          |   `-site_b               (actual site definitions)
          `-config                   (optional: target-instance based configurations that perform replace operations on init/demo data)
            |-dev_a                  (environment config folder)
            |-dev_b
            |-stg
            `-prd

#### SVN repository structure

The build system assumes a certain structure within a SVN repository. It elaborates the [Subversion Best Practices](http://svn.apache.org/repos/asf/subversion/trunk/doc/user/svn-best-practices.html). Inside the `trunk`, tags and branches folders assume the same folder structure as seen above in Git repositories.

     -project                       (all files for this project)
      |-branches                    (optional branches)
      | `-dev                       (sample branch)  
      |   |-cartridges
      |   `-sites
      |-tags                        (tags that were created on trunk or a branch)
      | |-1_0_0                     (sample tag )
      | | |-cartridges
      | | `-sites
      | |
      | `-1_1_0                     (another sample tag)
      |
      `-trunk                       (trunk, the main development branch.)
        |-cartridges                 
      `-sites

Note: `repository.branch` defaults to `"trunk"`. So if you don't have a `trunk` but files directly in the repository root, set `repository.branch` to `"."`. Accordingly, if you want to check out a branch, set the value to `"branches/myBranch"`.

### Repository configuration

Multiple repositories can be configured in the project configuration files (e.g. projects/sample/config.json). You will have to modify the "dependencies" array. The repository configuration structure is as follows:

     "dependencies": [
        {
          "repository": {
            "url": "https://bitbucket.org/demandware/sitegenesis.git",             URIs Can be SSH or HTTPS as well as absolute ('file://C:/...') or relative ('..') local paths. 
            "type": "git",                                                         git|svn|file (Existing Git repositories will be fetched instead of cloned again.)
            "branch" : "master",                                                   Branch or Tag name (optional)
            "username": "anonymous",                                               Username for SSH or HTTPS auth (we recommend using PSK though)
            "password": "secure"                                                   Password for SSH or HTTPS auth 
          },
          "source": {
            "path": "cartridges",                                                  Cartridges folder name (optional). IMPORTANT: This defaults to "cartridges", so you will have to enter "." to use the root directory.
            "glob": "**/*",                                                        Globbing pattern for source files (optional)
            "ignoreEmpty": false                                                   If set to true, no error is raised if no source files were found (optional)
          },
          "siteImport": {
            "enabled": "true",                                                     Enable/disable Site import for this repository (optional), defaults to true
            "initPath": "sites/site_template",                                     Name of source folder used for site configuration import (optional), displayed value is default
            "demoPath": "sites/site_demo",                                         Name of source folder used for demo site import (optional), displayed value is default
            "instancePath": "sites/config"                                         Instance configuration folder
          },
          "cartridges": [                                                   List of Cartridges that are included in the build. Enter folder names here.
            "app_storefront_core"
          ]
        }
     ]

## Site import

The Build Suite decides between two kinds of Site import:

 - Site Template / Configuration import (`importConfig` task)
 - Demo data import (`importDemo` task)

Both can be run together using the `importSite` task. `importMeta` can be used to import updated metadata (e.g. CustomObjects) only. 

The site import will only be created when `build.project.codeonly` is set to false. Note that the `build` task prepares the Site import while the import tasks only processes and uploads the site import data. ("Prepare" means that the site import data is checked out from the VCS and copied to a staging folder.)

While site templates can also be imported to PIG environments, demo data is meant to only be used for setting up Sandboxes with a representative dataset (e.g. content/catalog). 

### Site template

The site template is based on the site structure contained within the site import zip files. So the best way to create a site template is to export configuration data from an already configured instance via Business Manager and then unzip, select and modify the needed files.

The site template should be placed in the `sites/site_template` folder of your repository and contain configuration data only (e.g. basic Site setups and preferences).

Since each repository can contain a site template, the build process combines them all by copying the contents into the same directory and then compressing and uploading it. The idea behind this is that each project may define their own site. Please mind that files might get overwritten if they are in the same location. So it is a good idea to have all global files (e.g. metadata) in one cartridge and only site-related configuration in the corresponding site cartridges. 

It's recommended to have just configuration inside the site template structure, no content/catalog  data at all. Demo data should go in a separate directory (see below). 

The purpose behind this concept is to enable users to...

1. deploy the site template to a PIG in order to add new or update existing preferences along with a code release
2. deploy the site template along with demo data on a plain Sandbox in order to rapidly set up a development environment containing representative product catalogs, customer accounts, content libraries etc.

### Demo data

Demo data works similar to site templates and follows the same structure. Demo data should be placed under `sites/site_demo`. Please note there is a max upload size limit of 100 MByte over webdav.


### Meta data

Meta data is expected to be found in the site template. However, it is also fetched from demo data as a fallback.


## Supported Features

### Sass

By default, the `build` task looks for a `style.scss` file in the `scss` directory of every cartridge. The output, the complied `style.css` is put in `static/default/css` in the same cartridge. 
Two parts of this process are configurable in `build/projects/[projectname]/config.json`: You can change the file name from `style.scss` via `environment.sass.sourceFile` (target filename will always be the same with .css ending).
You can also change the source directory from `scss` to anything you want (e.g. `sass\source`). Since Site Genesis proposes a fixed folder structure for CSS files, the target directory is not configurable. Also, as we propose to use only one front-end cartridge providing CSS, the abovementioned properties are not configurable per cartridge but in a global manner only.


### Autoprefixer

[Autoprefixer](https://github.com/postcss/autoprefixer) parses CSS and adds vendor-prefixed CSS properties using the [Can I Use](http://caniuse.com) database.
The `build` task runs `autoprefixer` on all `.css` files. By default, `autoprefixer` target these browsers: `> 1%, last 2 versions, Firefox ESR, Opera 12.1`. The ability to configure specific browser targets will be added in the future.


### Resource optimization

The Build Suite allows you to concatenate and minify your CSS and Javascript resources. Resource optimization can be enabled via `settings['build.optimize.js']` and `settings['build.optimize.css']`.

Resource concatenation can be enabled via `settings['static.files.concatenate']`. If enabled, it is controlled via markups in ISML templates: Special comments have to be placed before and after an include block. Inside the first comment, the relative source path has to be defined along with the target filename. See below for details.

**Please note:** Only files in the same cartridge can be merged. Also, please be aware that target filenames have to be unique. In general we recommend to only use one storefront cartridge containing all static files. 


##### CSS example

```html

<!--- BEGIN CSS files to merge.(source_path=cartridge/static/default;targetfile=css/allinone.css) --->
<link rel="stylesheet" href="${URLUtils.staticURL('/css/example1.css')}" />
<link rel="stylesheet" media="print" href="${URLUtils.staticURL('/css/example2.css')}" />
<link rel="stylesheet" href="${URLUtils.staticURL('/css/example3.css')}" />
<!--- END CSS files to merge. --->
```

##### JS example

```html

<!--- BEGIN JS files to merge.(source_path=cartridge/static/default;targetfile=js/allinone.js) --->
<script src="${URLUtils.staticURL('/lib/example1.js')}" type="text/javascript"></script>
<script src="${URLUtils.staticURL('/lib/jquery/example2.js')}" type="text/javascript"></script>
<!--- END JS files to merge. --->
```

### Storefront Toolkit Build Info

The Build Suite can add information about the current build into the Storefront Toolkit. If enabled, the Build Suite will add an additional menu item to the Storefront Toolkit menu, which, when clicked, shows an overlay with information about the current build.

To enable this feature, open the global config.json file and have a look at the `storefront_build_information` section (please refer to sample file for example/default values):

- `enabled`: set to true or false to enable or disable the Build Info for the current target.
- `target_cartridge`: The (storefront) cartridge to add the template containing the Build Info output. The template is always placed in the default/debug template folder and will be named "build_info.isml".
- `target_template`: The template that should contain the include of the Build Info output. Not that you will not have to care about the layout or output, the template only adds an overlay that is shown when the corresponding menu item in the SF toolkit is clicked. (Please note that we are using inline Javascript here, so please choose a footer template.)

If you're using the standard SiteGenesis template structure, you will not have to change the `target_template` value.


### Two-factor authentication

Two-factor authentication (2FA) is needed for certain PIG instances. You will need the 2FA passphrase and a [certificate file](https://xchange.demandware.com/blogs/pnguyen06/2016/08/20/dw-tut-create-a-p12-certificate). The certificate file must be made available in the file system.

To activate 2FA:

- Make sure you can connect using 2FA (using a WebDAV client of your choice)
- Do NOT change the `environment.webdav.server` setting, it should still start with "staging"
- Edit your project's config.json file and add the following setting to "environment":

```
  two_factor: {
    enabled: true,
    password: 'secure',
    cert: 'certs/mycert.p12',
    url: 'cert.staging....'
  }
```

The certificate file path can be either absolute or relative. If relative, consider the build suite root as the root folder for your path.

### Unit Tests

(Unit tests are currently not supported. This feature will be recreated at a later point in time.)

### Linting

(Linting is currently not supported. This feature will be recreated at a later point in time.)


## Tips

#### Need to specific a version number or want have multiple source projects?

Specific parameters on the command line. This just works for build.project.version and a new property called build.project.number

`grunt dist --build.project.version=sg_community --build.project.number=14.8`

#### Need to use a folder other than `cartridges` for my code?

In `build/projects/[projectname]/config.json` file, set repository property `repository.source.path` to match your source folder name. Please note that this setting is **defaulting to `"cartridges"`**, so please set this value to `"."` if there is no such folder.

#### Need to specify which directories in your project to upload?

In `build/projects/[projectname]/config.json` file, set repository property `repository.source.glob` to select desired files/directories.
By default, it is set to upload everything `**/*`. Grunt's [globbing pattern](http://gruntjs.com/configuring-tasks#globbing-patterns) is used here.
**Note:** The curly brackets for "or" operation `{}` cannot be used per default due to the limitation of Java Properties file. If you want to use them, enter the globbing pattern as a CSV string.

Examples:
 * For example, to ignore a file, set `glob` to `['**/*','!filename']`.
 * To ignore a folder, set `glob` to `['**/*','!**/folder/**']`. 
 * To use curly brackets, enter a string instead of an array: `"'**/*','!filename'{.js,.css}"`
   

#### Use with Eclipse

Eclipse Running as: http://paultavares.wordpress.com/2014/01/06/setup-an-eclipse-run-external-tool-configuration-for-grunt/

  
#### Version numbers

The version numbers should contain 3 digits i.e. ```1_0_0``` where the first digit represents a major release, the second a minor point release/update and the third digit a hot fix update i.e. if you are doing multiple releases to UAT fixing small issues you will only update the bug fix/update number, if that passes release and is a small update then the minor revision number is updated and a new tag created. Release numbers should be separated by _ only.