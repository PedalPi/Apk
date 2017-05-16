# Remove letters

Install dependencies:
```bash
sudo apt-get install uni2ascii
pip install fonttools
```

Add unicode letters in letters-in-unicode.txt

Convert unicode letters in ascii:
```bash
uni2ascii -a P letters-in-unicode.txt > letters-in-ascii.txt
```

Generate new font without letters not listed in `letters-in-unicode.txt`:
```bash
pyftsubset NotoColorEmoji-unhinted/NotoColorEmoji.ttf --output-file=../src/assets/font/NotoColorEmoji-light.ttf --unicodes-file=letters-in-ascii.txt
```
