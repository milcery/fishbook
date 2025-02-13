#!/usr/bin/env node

const {join} = require('path');
const {homedir} = require('os');
const {program} = require('commander');
const {version} = require('../package.json');

const fishBook = require('../src/FishBook');
const fileDetection = require('../src/utils/fileDetection');
const checkVersion = require('../src/utils/checkVersion');

const fishBookPath = homedir() + '/.fishBook';

global.fishbook = {
  fishBookPath,
  srcPath: join(__dirname, '..', 'src'),
  confPath: join(fishBookPath, 'fishBook.json'),
  bookshelfPath: join(fishBookPath, 'bookshelf.json'),
  bookPath: join(fishBookPath, 'book'),
  chapterPath: join(fishBookPath, '.chapter'),
}

fileDetection();

checkVersion().then(status => {
  if (status) {
    program
      .command('bookshelf')
      .description('书架')
      .option('-d, --delete', '删除书籍')
      .action(fishBook.bookshelf);

    program
      .command('add <path>')
      .description('添加书籍')
      .action(fishBook.add);

    program
      .command('chapter [page]')
      .description('查看目录')
      .option('-s, --search <chapterName>', '模糊搜索章节')
      .action(fishBook.chapter);

    program
      .command('read')
      .description('阅读')
      .action(fishBook.read);

    program
      .command('setting')
      .description('设置')
      .action(fishBook.setting);

    program
      .version(version, '-v, --version')
      .parse(process.argv);
  }
})

