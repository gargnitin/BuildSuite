module.exports = function() {
    return {
        options: {
            importInit: false,
            importDemo: false
        },
        default: { 
            options: {
                importInit: true,
                importDemo: true
            }
        },
        init: {
            options: {
                importInit: true
            }
        },
        demo: {
            options: {
                importDemo: true
            }
        }
    };
};
