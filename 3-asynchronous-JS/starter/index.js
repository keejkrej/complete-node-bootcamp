const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('File not found.');
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file.');
            resolve('Success!');
        });
    });
};

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1Pro = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res2Pro = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res3Pro = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Image saved to file!');
    } catch (err) {
        console.log(err);
        throw err;
    }
    return '2';
};

const main = async () => {
    try {
        console.log('1');
        const x = await getDogPic();
        console.log(x);
        console.log('3');
    } catch (err) {
        console.log('error');
    }
}

main();