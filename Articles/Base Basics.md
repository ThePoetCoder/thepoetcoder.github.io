# Base Basics

In modern society we most often refer to numbers in base 10, also known as [the decimal numeral system]([https://en.m.wikipedia.org/wiki/Decimal](https://en.m.wikipedia.org/wiki/Decimal)), but 10 is far from the only useful base, especially when it comes to computers. You may have heard that the numbers computers operate on are all 0s and 1s and may even know words like “bytes”, “binary”, and “hex” are involved somehow, but are unsure of when and where to use them and why they are useful. If this sounds like you, then read on.

## Important Bases in Computing

The top 3 most important bases in computing are as follows:

- Binary - base 2. Used at the lowest levels of computing. As base 2 it includes only 2 numbers, being 0 and 1. With those 2 numbers you can write any other number in the world. You can also video chat your grandparents across the world. 0 and 1 roughly translate to “Off” and “On” down at the transistor level, which is relatively easy to do with electricity. So we took [Boolean logic]([https://en.m.wikipedia.org/wiki/Boolean_algebra](https://en.m.wikipedia.org/wiki/Boolean_algebra)) (which is also confined to two values - True and False) and combined it with what are essentially millions of light switches and managed to create computers. Simple!
- Hexadecimal - base 16. Called “hex” for short sometimes. It includes only 16 “numbers” - 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, and f. This numbering system is useful for computing because it works so well alongside binary; it is the bridge for humans to work with binary easier. With 16 digits to choose from, you can represent an 8-digit binary number with only 2 digits in hex. An 8-digit binary number is something we call a “byte” and you will notice the text representation of bytes in Python is very similar to hex. This all cuts down on how much you, the programmer, need to take in to work with the data you have. For example, hex is often used for describing colors, so which would you rather understand as being “red”:
    - Binary - “11111111 11111111 11111111”
    - Hex - “ffffff”
    
    It makes an even bigger difference when you start including 0s in the binary. Now let’s examine that same number as bytes:
    
    - Bytes - b’\xff\xff\xff’
    
    Notice how similar it looks to the hex representation?
    
- Decimal - base 10. It has 10 numbers, being 0 - 9. Computers really only care about this because we care about this, and we need them to convert in and out of it constantly.

## What is a Base?

Let’s take a step back to understand what we mean when we use the word “base” as it relates to numbers. A base for a number is the context in which to understand that number. *Said otherwise, without a base, the number has no meaning*. 

Let’s take a very simple example of why base matter so much. Pretend I made you an offer to trade 10 apples of yours for 10 apples of mine. Sounds pretty fair, right? But before trading I mention to you that I’ll be counting 10 apples in binary and you'll be counting 10 apples in hexadecimal. You might be confused, but 10 = 10, right? Actually 10 in binary is only 2 in decimal, while 10 in hexadecimal is 16 in decimal. How is this possible?

Let’s consider the decimal form we’re most familiar with and take an example number, like 538. The number 538 in decimal is a quick way of saying:

```markdown
500 + 30 + 8
```

which itself is a quick way of saying:

```markdown
5 * 10^2 + 3 * 10^1 + 8 * 10^0
```

The key thing to notice here is that with each successive number we add to the left, we multiply that number by 10 and increase the exponent by 1. So each number is multiplied by exponentially more than the numbers to its right are. And the reason we are using 10 here is because we said this is a base 10 number; that’s what the base means! It is the base of the exponent that increases with each number.

The same idea works for any number in any base. Let’s use our 10 apples ≠ 10 apples example from above:

```markdown
10 in decimal =
1 * 10^1 + 0 * 10^0

10 in binary =
1 * 2^1 + 0 * 2^0 =
2 in decimal

10 in hexadecimal =
1 * 16^1 + 0 * 16^0 =
16 in decimal
```

See how the only thing changing each time is the base of each exponent? So now you can understand why it is not enough to know only what the number is; you also have to know what base it’s in.

## What is endianness?

A number’s endianness determines the order in which numbers appear as far as which side is bigger and which is smaller. It is another part of the context you need to know before truly understanding the number in front of you. To work with a number’s endianness you need to know:

- How many digits are grouped together
- The way in which they are ordered

There are 2 main types of endianness to choose from, Big-Endian and Little-Endian. Because we read from left to right, the left side is the “end” in question for a number’s *end*ianness. This piece of the context answers the question “Does the biggest / most significant number go first (Big-Endian), or does the smallest / least significant number go first (Little-Endian)?” For example, take the number 538 again; in our standard decimal system each group is only 1 digit and the numbers are Big-Endian because the left side has the biggest number (500 is larger than 8). If decimal were Little-Endian, the way to express the number 538 would be 835; same number, but different way of expressing it.

These context rules are the kinds of things we take for granted in our day to day life (read left to right, big numbers come before smaller numbers) but computers do not have any of that context of growing up in a society and learning things through osmosis. It’s like trying to explain our numbers to an alien. They need to be explicitly told every single instruction. Including the context in which to understand those instructions. Inherently this all boils down to the difference between a number and the many different ways it can be expressed.

In binary, the endianness is unique from computer to computer, but they are usually grouped as bytes (8 binary digits strung together). Following that, the more human way to work with binary (hexadecimal) is grouped into pairs of digits, and each pair represents a single byte. Let’s show the number 538 in binary and hexadecimal:

```markdown
Big-Endian - Binary
    00000010 00011010
Big-Endian - Hexadecimal
    021a

Little-Endian - Binary
    00011010 00000010
Little-Endian - Hexadecimal
    1a02
```

Notice how the groups switched when it went to Little-Endian?

## How can we convert between bases in Python?

Python includes a handful of built-in transformations you can use to switch between different bases, but in my opinion they are all a little spread out and hard to remember. So I came up with the following code with some standard and sensible names that I keep in a local public repository, ready to import whenever it’s needed. I’ve included it here for your purposes, feel free to check out what it can do and use however you please.

```python
def int_to_bytes(i):
    h = int_to_hex(i)
    return hex_to_bytes(h)

def int_to_hex(i):
    assert i >= 0
    h = "{:X}".format(i)
    if len(h) % 2 == 1:
        h = "0" + h  # 2 hex chars per byte.
    return h.lower()

def int_to_bin(i):
    result = []
    while i:
        i, remainder = divmod(i, 256)
        result.append(f'{remainder:0>8b}')
    result = " ".join(reversed(result))
    return result

def hex_to_bin(h):
    i = hex_to_int(h)
    return int_to_bin(i)

def hex_to_bytes(h):
    return bytes.fromhex(h)

def hex_to_int(h):
    return int(h, 16)

def bytes_to_bin(b, endian='big'):
    i = bytes_to_int(b, endian)
    return int_to_bin(i)

def bytes_to_hex(b):
    return b.hex()

def bytes_to_int(b, endian='big'):
    return int.from_bytes(b, endian)

def bin_to_bytes(b):
    h = bin_to_hex(b)
    return hex_to_bytes(h)

def bin_to_hex(b):
    i = bin_to_int(b)
    return int_to_hex(i)

def bin_to_int(b):
    b = str(b).replace(" ", "")
    return int(b, 2)

def switch_endian_hex(h):
    return ''.join(h[i-2:i] for i in range(len(h), 0, -2))

def switch_endian_bytes(b):
    h = bytes_to_hex(b)
    result = switch_endian_hex(h)
    return hex_to_bytes(result)

def switch_endian_bin(b):
    h = bin_to_hex(b)
    sh = switch_endian_hex(h)
    return hex_to_bin(sh)
```

And just for some fun and experimentation, here is another little function to understand bases even better. This function takes in any 2 integers and returns what the 1st number would be in the base of the 2nd number:

```python
def base_conv(num, base):
    conv = []
    while num:
        num, remainder = divmod(num, base)
        conv.append(str(remainder))
    conv = reversed(conv)
    return list(conv)
```

It returns a big-endian list of numbers, where each number represents one digit in the base number provided. For example, if you pass in 538 in base 16, it returns `['2', '1', '10']` which is equivalent to displaying `021a` in hexadecimal, where the leading 0 is ignored, then 2, then 1, then ‘a’ which is the 10th digit. For my conversion here I don’t use the alphabet so that you are not even limited to the number of letters in the alphabet to create your bases, and can come up with some truly odd ways to express everyday numbers.

## And that's basically it
In this article we’ve discussed many things, from different ways to represent numbers, to bases and endians, and you walk away with some ready-to-use Python functions to put that knowledge to good use. Most importantly, now you know why there are only 10 types of programmers in the world; those who understand binary and those who do not.
