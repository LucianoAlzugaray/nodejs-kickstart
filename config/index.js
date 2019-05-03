let path = require('path');
let fs = require('fs');

async function getConfigFiles() {
    return new Promise((resolve, reject) => {
        fs.readdir(__dirname, (err, files) => {
            if (err) reject(err);
            else resolve(files);
        })
    })
}

async function mergeFiles(configFiles) {
    return new Promise ((resolve, reject) => {
        let configuration = {}
        try {
            for (file of configFiles) {
                if (file == 'index.js') continue;
                configuration[file.slice(0,-3)] = require(path.join(__dirname, file))
            }
            resolve(configuration);
        } catch(e) {
            reject(e);
        }
    })
}

async function  readConfig() {
    let configFiles = await getConfigFiles();
    return await mergeFiles(configFiles);
}

module.exports = readConfig()