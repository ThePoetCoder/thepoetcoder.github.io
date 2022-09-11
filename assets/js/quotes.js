var total_lines = 11;
var random_line = Math.floor(Math.random() * total_lines);

var quote_element = document.getElementById("quote");
var quote_link = document.getElementById("quote-link");

var quote;
var link;

switch (random_line) {
    case 0: 
      quote = '"Fled is that music:—Do I wake or sleep?"  -Keats';
      link = 'https://www.poetryfoundation.org/poems/44479/ode-to-a-nightingale';
      break;
                
    case 1: 
      quote = '"Heard melodies are sweet, but those unheard are sweeter"  -Keats';
      link = 'https://www.poetryfoundation.org/poems/44477/ode-on-a-grecian-urn';
      break;
                
    case 2: 
      quote = '"\'Beauty is Truth, Truth Beauty,\'—that is all ye know on earth, and all ye need to know."  -Keats';
      link = 'https://www.poetryfoundation.org/poems/44477/ode-on-a-grecian-urn';
      break;

    case 3: 
      quote = '"Love is not love which alters when it alteration finds"  -Shakespeare';
      link = 'https://www.poetryfoundation.org/poems/45106/sonnet-116-let-me-not-to-the-marriage-of-true-minds';
      break;
                
    case 4: 
      quote = '"Water can be boiled in a pot, or if you have no pot, over a fire in your cupped hands."  -Jollimore';
      link = 'https://www.troyjollimore.com/';
      break;

    case 5: 
      quote = '"Is this world other than what I see?"  -Adonis';
      link = 'https://www.poetryfoundation.org/poets/adonis';
      break;
                
    case 6: 
      quote = '"I\'ll tell you what I\'ll inherit: the margins"  -Doty';
      link = 'https://www.poetryfoundation.org/poems/44139/homo-will-not-inherit';
      break;
                
    case 7: 
      quote = '"Without thinking at all I was my foolish aunt, I—we—were falling, falling"  -Bishop';
      link = 'https://poets.org/poem/waiting-room';
      break;

    case 8: 
      quote = '"In this short life That only lasts an hour How much — how little — is within our power?"  -Dickinson';
      link = 'https://www.poetryfoundation.org/poems/56456/in-this-short-life-that-only-lasts-an-hour-1292';
      break;
                    
    case 9: 
      quote = '"You\'re thinking about this too much. Slow down. Nothing bad will happen."  -Prufer';
      link = 'https://www.poetryfoundation.org/poetrymagazine/poems/52972/in-a-beautiful-country';
      break;
                    
    case 10: 
      quote = '"Let us go then, you and I, When the evening is spread out against the sky"  -Eliot';
      link = 'https://www.poetryfoundation.org/poetrymagazine/poems/44212/the-love-song-of-j-alfred-prufrock';
      break;

    default:
      quote = '"Fled is that music:—Do I wake or sleep?"  -Keats';
      link = 'https://www.poetryfoundation.org/poems/44479/ode-to-a-nightingale';
      break;
}

quote_element.innerHTML = quote;
quote_link.setAttribute('href', link);
