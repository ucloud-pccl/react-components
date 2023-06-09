const fs = require('fs');
const path = require('path');
import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import { createSerializer } from 'jest-emotion';
import * as emotion from 'emotion';

expect.addSnapshotSerializer(createSerializer(emotion));
/**
 * implement if require.content is not supported
 */
if (typeof require.context === 'undefined') {
    require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
        const files = {};

        /**
         *
         * @param {directory} directory
         */
        function readDirectory(directory) {
            fs.readdirSync(directory).forEach(file => {
                const fullPath = path.resolve(directory, file);

                if (fs.statSync(fullPath).isDirectory()) {
                    if (scanSubDirectories) readDirectory(fullPath);

                    return;
                }

                if (!regularExpression.test(fullPath)) return;

                files[fullPath] = true;
            });
        }

        readDirectory(path.resolve(__dirname, base));

        /**
         *
         * @param {filename} file
         */
        function Module(file) {
            // eslint-disable-next-line global-require
            return require(file);
        }

        Module.keys = () => Object.keys(files);

        return Module;
    };
}

import React from 'react';

const demoTest = (ignoreList = []) => {
    const componentsName = module.parent.filename.match(/\/src\/components\/(\w*)\/.*/)[1];
    const demoFiles = require.context(`../../src/components/${componentsName}/__demo__`, true, /.*.jsx$/).keys();

    demoFiles.forEach(file => {
        const demoName = file.match(/^.*\/([^/]*)\.jsx?$/)[1];
        if (ignoreList.includes(demoName)) return;
        test(`${componentsName} demo -- ${demoName}`, () => {
            const Demo = require(file).default;
            if (Demo.__ignore__test) return;
            const component = render(<Demo />);
            const tree = renderToJson(component);
            expect(tree).toMatchSnapshot();
        });
    });
};

module.exports = demoTest;
