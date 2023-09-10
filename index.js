const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new', 
  });

  const page = await browser.newPage();

  const searchTerm = await new Promise((resolve) => {
    rl.question('Enter your search query: ', resolve);
  });

  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
  await page.goto(searchUrl);


  const downloadPath = 'C:/Users/arjar/Downloads/';


  await page.screenshot({ path: `${downloadPath}search_results.png` });


  const screenshotFilePath = `${downloadPath}search_results.png`;
  if (fs.existsSync(screenshotFilePath)) {
    console.log(`Screenshot saved successfully at: ${screenshotFilePath}`);

  } else {
    console.log('Screenshot was not saved.');

  }


  console.log(`Search for "${searchTerm}" has occurred`);

  await browser.close();
}

main();
