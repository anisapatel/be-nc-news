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
  it("if passed an array of timestamps, it returns it converted into a javascript date object", () => {
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
    const expected = [{
      title: 'High Altitude Cooking',
      topic: 'cooking',
      author: 'happyamy2016',
      body: 'Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.',
      created_at: new Date(1527391948514)
    },
    {
      title: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
      topic: 'cooking',
      author: 'tickle122',
      body: "n 1686, the croissant was invented in Austria. That's a fun fact I'd probably never had known or maybe don't even really need to know, but now I do, thanks to Julia Rothman's Food Anatomy: The Curious Parts & Pieces of Our Edible World. Rothman has an entire series of illustrated Anatomy books, including Nature and Farm, packed with infographics, quirky facts, and maps that you can get lost in for hours—in a fun way, not in a boring textbook way. It makes you wonder why textbooks aren't this fun to read. Can someone look into this? Thanks.",
      created_at: new Date(1489238418573)
    }];
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
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389,
      }
     ];

    const lookupObj = {
      "They're not exactly dogs, are they?": 1
    };

    const output = [
      {
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        created_at: new Date(1511354163389),
        author: 'butter_bridge',
        article_id: 1
      }
    ];

    const keyToRename = ["created_by", "belongs_to"];

    const keyToInsert = ["author", "article_id"];

    expect(formatComments(testTargets, keyToRename, keyToInsert, lookupObj)).to.eql(
      output
    );
  })
  it("returns a formatted comment for multiple objects", () => {
    const testTargets = [
      {
        body: 'This is a bad article name',
        belongs_to: 'A',
        created_by: 'butter_bridge',
        votes: 1,
        created_at: 1038314163389,
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        belongs_to: 'B',
        created_by: 'icellusedkars',
        votes: 100,
        created_at: 1448282163389,
      }
     ];

     const lookupObj = {
       A: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
       B: "A history of suits"

     };

     const output = [{
        body: 'This is a bad article name',
        article_id: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
        author: 'butter_bridge',
        votes: 1,
        created_at: new Date(1038314163389),
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        article_id: 'A history of suits',
        author: 'icellusedkars',
        votes: 100,
        created_at: new Date(1448282163389),
      }];


    const keyToRename = ["created_by", "belongs_to"];

    const keyToInsert = ["author", "article_id"];

    expect(formatComments(testTargets, keyToRename, keyToInsert, lookupObj)).to.eql(
      output
    );
  })
  it("original input is not mutated", () => {
    const testTargets = [
      {
        body: 'This is a bad article name',
        belongs_to: 'A history of suits',
        created_by: 'butter_bridge',
        votes: 1,
        created_at: 1038314163389,
      }
     ];
  

    const refObj = {
      "A history of suits": 1
    };

    const output = [
      {
        body: 'This is a bad article name',
        votes: 1,
        created_at: new Date(1038314163389),
        author: 'butter_bridge',
        article_id: 'A history of suits'
      }
    ];

    const keyToRename = ["created_by", "belongs_to"];

    const keyToInsert = ["author", "article_id"];

   

    formatComments(testTargets, refObj, keyToRename, keyToInsert);

    expect(testTargets).to.eql([
      {
        body: 'This is a bad article name',
        belongs_to: 'A history of suits',
        created_by: 'butter_bridge',
        votes: 1,
        created_at: 1038314163389,
      }
     ]);
  });
});
