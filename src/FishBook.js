const {join} = require('path');
const chalk = require('chalk');

async function bookshelf({delete: isDelete}) {
  if(isDelete) {
    await operatBook('delete');
  }
  else {
    await selectedBook();
  }
  return
}

async function add(path){
  const add = require(getPath('add'));
  await add(path);
  read();
}

async function chapter(page = 1, option){
  if (getCurrent) {
    const selectedChapter = require(getPath('chapter'));
    await selectedChapter(page, option.search);
    read();
  }
}

function read(){
  if (getCurrent) {
    require(getPath('read'))();
  }
}

async function setting(){
  const setting = require(getPath('setting'));
  await setting();
}

async function selectedBook() {
  const selectedBook = require(getPath('bookshelf'));
  await selectedBook();
  read();
}

async function operatBook({type}) {
  const operating = require(getPath('operatBook'));
  await operating(type);
  return
}

function getPath(name) {
  return join(__dirname, 'command', name);
}

function getCurrent() {
  const { current, book } = require(global.fishbook.bookshelfPath);
  if (current && book[current]) {
    return true;
  } else {
    console.log(chalk.red('\u26A0  未找到书籍, 请先添加书籍'));
    return false;
  }
}

module.exports = {
  bookshelf,
  add,
  chapter,
  read,
  setting
};
