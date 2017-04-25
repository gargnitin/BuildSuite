module.exports = {
    //Path to global configuration file
    configFile: 'build/config.json',
    
    //Configuration parameters for (Browser-based) Site/Meta import/export features
    impex: {
        site: {
            path:           "/on/demandware.store/Sites-Site/default/ViewSiteImpex-Status",
            selector:       "#unitSelection ~ table:nth-of-type(3)",
            importLabel:    "Site Import ({0})",
            exportLabel:    "Site Export ({0})"
        },
        meta: {
            path:               "/on/demandware.store/Sites-Site/default/ViewCustomizationImpex-Start",
            selector:           "form[name='ImpexForm'] > table:nth-child(6)",
            importLabel:        "Meta Data Import <{0}>",
            validationLabel:    "Meta Data Validation <{0}>"
        }
    },
    
    //Configuration parameters for WebDAV access
    webDav: {
        cartridge_root:     "/on/demandware.servlet/webdav/Sites/Cartridges/",
        impex_root:         "/on/demandware.servlet/webdav/Sites/ImpEx/",
        site_import_root:   "/on/demandware.servlet/webdav/Sites/ImpEx/src/instance/",
        meta_import_root:   "/on/demandware.servlet/webdav/Sites/ImpEx/src/customization/"
    },
    
    //Local folders (for output, checkout, cartridges and site-import data. output declared separately for clean task.)  
    folders: {
        repos:  'exports/<%= versionInfo.projectName %>/',
        code:   'output/<%= versionInfo.projectName %>/code/',
        site:   'output/<%= versionInfo.projectName %>/site_import/',
        output: 'output/<%= versionInfo.projectName %>/'
    }
};