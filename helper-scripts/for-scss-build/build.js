const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

const copy = (src, dest) => {
    const stat = fs.statSync(src);

    if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }

        const entries = fs.readdirSync(src);
        for (const entry of entries) {
            const srcPath = path.join(src, entry);
            const destPath = path.join(dest, entry);

            copy(srcPath, destPath);
        }
    } else if (path.extname(src) !== '.scss') {
        fs.copyFileSync(src, dest);
    }
};

const cleanDir = (dir) => {
    if (fs.existsSync(dir)) {
        const entries = fs.readdirSync(dir);
        for (const entry of entries) {
            const entryPath = path.join(dir, entry);
            const stat = fs.statSync(entryPath);

            if (stat.isDirectory()) {
                cleanDir(entryPath);
            } else {
                fs.unlinkSync(entryPath);
            }
        }
        fs.rmdirSync(dir);
    }
};

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
} else {
    cleanDir(distDir);
}

copy(srcDir, distDir);

console.log('Build completed!');
