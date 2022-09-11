var poetry = [

        '"Fled is that music:—Do I wake or sleep?"  -Keats',

        '"Heard melodies are sweet, but those unheard are sweeter"  -Keats',

        '"\'Beauty is Truth, Truth Beauty,\'—that is all ye know on earth, and all ye need to know."  -Keats',

        '"Love is not love which alters when it alteration finds"  -Shakespeare',
        
        '"Water can be boiled in a pot, or if you have no pot, over a fire in your cupped hands."  -Jollimore',
        
        '"Is this world other than what I see?"  -Adonis',
        
        '"I\'ll tell you what I\'ll inherit: the margins"  -Doty',
        
        '"Without thinking at all I was my foolish aunt, I—we—were falling, falling"  -Bishop',
        
        '"In this short life That only lasts an hour How much — how little — is thin our power?"  -Dickinson',
        
        '"You\'re thinking about this too much. Slow down. Nothing bad will happen."  -Prufer',
        
        '"Let us go then, you and I, When the evening is spread out against the sky"  -Eliot'
        ];

var line = poetry[Math.floor(Math.random() * poetry.length)];

document.getElementById("quote").innerHTML = line;
