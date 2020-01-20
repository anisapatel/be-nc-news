const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it("if passed an empty array, it returns an empty array", () => {
    const input = [];
    const actual = formatDates(input);
    const expected = [];
    expect(actual).to.eql(expected);
  })
  xit("if passed an array of timestamps, it returns it converted into a javascript date object", () => {
    const input =  [{
      title: 'High Altitude Cooking',
      topic: 'cooking',
      author: 'happyamy2016',
      body: 'Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.',
      created_at: 1527391948514
    },
    {
      title: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
      topic: 'cooking',
      author: 'tickle122',
      body: "n 1686, the croissant was invented in Austria. That's a fun fact I'd probably never had known or maybe don't even really need to know, but now I do, thanks to Julia Rothman's Food Anatomy: The Curious Parts & Pieces of Our Edible World. Rothman has an entire series of illustrated Anatomy books, including Nature and Farm, packed with infographics, quirky facts, and maps that you can get lost in for hours—in a fun way, not in a boring textbook way. It makes you wonder why textbooks aren't this fun to read. Can someone look into this? Thanks.",
      created_at: 1489238418573
    }]
    const actual = formatDates(input);
    const expected = ["27/4/2018 4:32", "11/2/2017 13:20"];
    expect(actual).to.eql(expected);
  })
  it("does not mutate original input", () => {
    const input =  [{
      title: 'High Altitude Cooking',
      topic: 'cooking',
      author: 'happyamy2016',
      body: 'Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.',
      created_at: 1527391948514
    },
    {
      title: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
      topic: 'cooking',
      author: 'tickle122',
      body: "n 1686, the croissant was invented in Austria. That's a fun fact I'd probably never had known or maybe don't even really need to know, but now I do, thanks to Julia Rothman's Food Anatomy: The Curious Parts & Pieces of Our Edible World. Rothman has an entire series of illustrated Anatomy books, including Nature and Farm, packed with infographics, quirky facts, and maps that you can get lost in for hours—in a fun way, not in a boring textbook way. It makes you wonder why textbooks aren't this fun to read. Can someone look into this? Thanks.",
      created_at: 1489238418573
    }]
    const actual = formatDates(input);
    expect(actual).to.not.eql(input);

  })
  it("applies the js date object to the function", () => {
    const input =  [{
      title: 'High Altitude Cooking',
      topic: 'cooking',
      author: 'happyamy2016',
      body: 'Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.',
      created_at: 1527391948514
    },
    {
      title: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
      topic: 'cooking',
      author: 'tickle122',
      body: "n 1686, the croissant was invented in Austria. That's a fun fact I'd probably never had known or maybe don't even really need to know, but now I do, thanks to Julia Rothman's Food Anatomy: The Curious Parts & Pieces of Our Edible World. Rothman has an entire series of illustrated Anatomy books, including Nature and Farm, packed with infographics, quirky facts, and maps that you can get lost in for hours—in a fun way, not in a boring textbook way. It makes you wonder why textbooks aren't this fun to read. Can someone look into this? Thanks.",
      created_at: 1489238418573
    }]
    expect(new Date(input.created_at) instanceof Date).to.eql(true);

  })

});

describe('makeRefObj', () => {
  it("takes the title and maps it to the article_id", () => {
    const testTitle = [
      { article_id: 1, title: 'A' }
    ];

    const referenceObj = { A: 1 }

    const keyToReplace = "title";

    const keyToInsert = "article_id";

    expect(makeRefObj(testTitle, keyToReplace, keyToInsert)).to.eql(referenceObj);
  });
  it("works for multiple objects", () => {
    const testTitle = [
      { article_id: 1, title: 'A' },
      { article_id: 2, title: 'B' }
      
    ];

    const referenceObj = {
      A: 1,
      B: 2
    };

    const keyToReplace = "title";

    const keyToInsert = "article_id";

    expect(makeRefObj(testTitle, keyToReplace, keyToInsert)).to.eql(referenceObj);
  
});
});

describe('formatComments', () => {
  it("for single item in the array with a ref object, it returns a formatted comment", () => {
    const testTargets = [
      {
        body: 'This is a bad article name',
        belongs_to: 'A',
        created_by: 'butter_bridge',
        votes: 1,
        created_at: 1038314163389,
      }
     ];
  

    const lookupObj = {
      A: 1
    };

    const output = [
      {
        body: 'This is a bad article name',
        article_id: 'A',
        author: 'butter_bridge',
        votes: 1,
        created_at: new Date(1038314163389),
      }
    ];

    const keyToReplace = "created_by";

    const keyToInsert = "author";

    expect(keyReplace(testTargets, lookupObj, keyToReplace, keyToInsert)).to.eql(
      output
    );
  });
  xit("original input is not mutated", () => {
    const testTargets = [
      {
        shop_name: "Corwin, Moen and Brakus",
        owner: "firstname-a",
        slogan: "Face to face full-range functionalities"
      }
    ];

    const lookupObj = {
      "firstname-a": 1
    };

    const newKey = "owner_id";

    const keyToDelete = "owner";

    keyReplace(testTargets, lookupObj, newKey, keyToDelete);

    expect(testTargets).to.eql(testTargets);
  });
});
