const projectName = 'random-quote-machine';
let quotesData;

var currentQuote = '',
    currentAuthor = '',
    currentRelease = 0,
    currentAuthorImg = '';

function getQuotes() {
    return $.ajax({
        headers: {
            Accept: 'application/json'
        },
        url:
            'https://gist.githubusercontent.com/Pilvorm/f1aba266bafb87402fe944c0ff6baf04/raw/quotes.json',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === 'string') {
                quotesData = JSON.parse(jsonQuotes);
                console.log('quotesData');
                console.log(quotesData);
            }
        }
    });
}

function getRandomQuote() {
    return quotesData.quotes[ Math.floor(Math.random() * quotesData.quotes.length) ];
}

function getQuote() {
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;
    currentRelease = randomQuote.release;
    currentAuthorImg = randomQuote.authorImg;

    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentQuote + '"\n\n' + currentAuthor + ' (' + randomQuote.release + ')')
    );

    $('.quote-text').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#text').text(randomQuote.quote);
    });

    $('.quote-author').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#author').html(randomQuote.author + ' (' + randomQuote.release + ')');
    });

    $('.author-image').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $(this).attr('src', randomQuote.authorImg);
    });
}

$(document).ready(function () {
    getQuotes().then(() => {
        getQuote();
    });

    $('#new-quote').on('click', getQuote);
});
