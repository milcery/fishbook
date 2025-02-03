const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const bookshelf = require('../container/bookshelf');
const saveConf = require('../utils/saveConf');

const bookshelfConf = require(global.fishbook.bookshelfPath);

// todo
const TYPE_ENUM = {
  delete: '删除',
}

module.exports = async type => {
  if (Object.keys(bookshelfConf.book).length === 0) {
    console.log(chalk.red('\u26A0  未找到书籍'));
    return
  }

  const bookName = await bookshelf();

  const { status } = await inquirer.prompt({
    type: 'confirm',
    name: 'status',
    message: `是否${TYPE_ENUM[type]}该小说？`,
    default: true
  });

  if(!status) {
    console.log(chalk.yellow('Warning: 已中止'));
    return
  }

  const book = bookshelfConf['book'][bookName];

  // todo
  if (type === 'delete') {
    delete bookshelfConf['book'][bookName];

    if (bookshelfConf.current === bookName) {
      bookshelfConf.current = Object.keys(bookshelfConf.book)[0] || '';
    }

    await Promise.all([
      saveConf(global.fishbook.bookshelfPath, bookshelfConf),
      unlink(book.path),
      unlink(book.chapterPath),
    ]);

    console.log(chalk.green(`\u{1F389}  删除成功!`));
  }

  return
}

function unlink(filePath) {
  return new Promise((resolve, rejects) => {
    fs.unlink(filePath, (err) => {
      if (err) rejects(err);
      resolve();
    });
  })
}
